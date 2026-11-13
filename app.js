(() => {
  'use strict';

  const CONFIG_KEY = 'preguntado-ipet49-config-v1';
  const RANKING_KEY = 'preguntado-ipet49-ranking-v1';
  const DEFAULT_DATA = structuredClone(window.PREGUNTADO_DATA);
  const STATIC_API_URL = String(window.PREGUNTADO_API_URL || '').trim();
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
  const COLOR_CYCLE = ['#34d399', '#fbbf24', '#60a5fa', '#fb7185', '#a78bfa', '#22d3ee', '#f97316', '#f472b6'];

  let config = loadConfig();
  let selectedRouletteId = config.roulettes[0]?.id || '';
  let selectedCategoryId = config.roulettes[0]?.categories[0]?.id || '';
  let activeRoulette = null;
  let game = null;
  let currentQuestion = null;
  let timerInterval = null;
  let wheelRotation = 0;
  let wheelAnimating = false;
  let spinFrameId = null;
  let questionTransitionTimer = null;
  let toastTimeout = null;
  let cloudRanking = null;
  let sheetErrorMessage = '';
  let adminSessionHash = '';
  let sharedBankStatus = '';
  let sharedStateLoading = false;
  let sharedSaveChain = Promise.resolve();
  let startingGame = false;

  function getApiEndpoint() {
    return STATIC_API_URL || String(config?.settings?.sheetEndpoint || '').trim();
  }

  function loadConfig() {
    try {
      const stored = JSON.parse(localStorage.getItem(CONFIG_KEY));
      if (stored && Array.isArray(stored.roulettes) && stored.roulettes.length) {
        return {
          schemaVersion: DEFAULT_DATA.schemaVersion,
          ...DEFAULT_DATA,
          ...stored,
          settings: { ...DEFAULT_DATA.settings, ...(stored.settings || {}) },
          roulettes: stored.roulettes.map((roulette) => ({
            ...roulette,
            categories: Array.isArray(roulette.categories) ? roulette.categories.map((category) => ({
              ...category,
              questions: Array.isArray(category.questions) ? category.questions : []
            })) : []
          }))
        };
      }
    } catch (error) {
      console.warn('No se pudo leer la configuración guardada.', error);
    }
    return structuredClone(DEFAULT_DATA);
  }

  function saveConfig(message = '') {
    if (STATIC_API_URL) config.settings.sheetEndpoint = STATIC_API_URL;
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
    renderHome();
    refreshRankingStatus();
    if (message) showToast(message);
    if (adminSessionHash && getApiEndpoint()) {
      sharedSaveChain = sharedSaveChain.then(() => publishSharedConfig()).catch((error) => {
        sharedBankStatus = `No se compartieron los cambios: ${error.message}`;
        $('#settings-saved-status').textContent = sharedBankStatus;
        showToast(sharedBankStatus);
      });
    }
  }

  function localRanking() {
    try {
      const entries = JSON.parse(localStorage.getItem(RANKING_KEY) || '[]');
      return Array.isArray(entries) ? entries : [];
    } catch {
      return [];
    }
  }

  function sortRanking(entries) {
    const byId = new Map();
    entries.forEach((entry) => {
      if (!entry || !entry.name) return;
      const id = entry.id || `${entry.name}-${entry.score}-${entry.date || ''}`;
      const existing = byId.get(id);
      if (!existing || Number(entry.score) > Number(existing.score)) byId.set(id, entry);
    });
    return [...byId.values()].sort((a, b) => Number(b.score) - Number(a.score) || String(a.date || '').localeCompare(String(b.date || ''))).slice(0, 50);
  }

  function renderHome() {
    const settings = config.settings;
    document.title = settings.title || 'Preguntado IPET N°49';
    $('#home-title').textContent = settings.title || 'Preguntado IPET N°49';
    $('#home-subtitle').textContent = settings.subtitle || '';
    $('#stat-roulettes').textContent = String(config.roulettes.length);
    $('#stat-questions').textContent = String(settings.questionsPerGame);
    $('#home-message').textContent = sharedBankStatus || (config.roulettes.length ? 'Podés jugar desde el celular o la computadora.' : 'Agregá al menos una ruleta desde Administración.');
    $('#start-game').disabled = config.roulettes.length === 0 || sharedStateLoading;
  }

  function showScreen(screenId) {
    $$('.screen').forEach((screen) => screen.classList.toggle('active', screen.id === screenId));
    $('#main-content').focus?.({ preventScroll: true });
  }

  function showToast(message) {
    const toast = $('#toast');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove('show'), 2500);
  }

  function makeId(prefix) {
    const suffix = window.crypto?.randomUUID ? crypto.randomUUID().slice(0, 8) : `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
    return `${prefix}-${suffix}`;
  }

  function activeQuestions(roulette) {
    return (roulette?.categories || []).flatMap((category) => (category.questions || [])
      .filter((question) => question.active !== false)
      .map((question) => ({ ...question, categoryId: category.id, categoryName: category.name, categoryColor: category.color })));
  }

  function showRouletteSelection() {
    const grid = $('#roulette-grid');
    grid.replaceChildren();
    config.roulettes.forEach((roulette) => {
      const count = activeQuestions(roulette).length;
      const button = document.createElement('button');
      button.className = 'roulette-card';
      button.type = 'button';
      button.disabled = count === 0;

      const icon = document.createElement('span');
      icon.className = 'roulette-icon';
      icon.textContent = roulette.icon || '🎯';
      const copy = document.createElement('span');
      copy.className = 'roulette-copy';
      const title = document.createElement('strong');
      title.textContent = roulette.name;
      const description = document.createElement('small');
      description.textContent = `${roulette.description || 'Preguntas para aprender jugando'} · ${count} preguntas`;
      copy.append(title, description);
      const arrow = document.createElement('span');
      arrow.className = 'roulette-arrow';
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '→';
      button.append(icon, copy, arrow);
      button.addEventListener('click', () => beginGame(roulette.id));
      grid.append(button);
    });
    showScreen('screen-roulette');
  }

  function beginGame(rouletteId) {
    const roulette = config.roulettes.find((entry) => entry.id === rouletteId);
    const count = activeQuestions(roulette).length;
    if (!roulette || count === 0) {
      showToast('Esta ruleta todavía no tiene preguntas activas.');
      return;
    }
    activeRoulette = roulette;
    const limit = Math.max(1, Number(config.settings.questionsPerGame) || 20);
    game = {
      player: ($('#player-name').value.trim() || 'Jugador').slice(0, 28),
      score: 0,
      correct: 0,
      answered: 0,
      total: Math.min(limit, count),
      rouletteId: roulette.id,
      usedQuestionIds: new Set()
    };
    $('#end-game').hidden = false;
    wheelRotation = 0;
    $('#wheel-title').textContent = `Ruleta ${roulette.name}`;
    $('#wheel-caption').textContent = roulette.description || 'La ruleta elige una categoría para vos.';
    $('#wheel-eyebrow').textContent = `02 · ${roulette.name}`;
    $('#wheel-score').textContent = '0';
    $('#wheel-progress').textContent = `0 / ${game.total}`;
    updateWheel();
    showScreen('screen-wheel');
  }

  function categoriesForNextQuestion() {
    if (!activeRoulette || !game) return [];
    return activeRoulette.categories.filter((category) => (category.questions || []).some((question) =>
      question.active !== false && !game.usedQuestionIds.has(question.id)));
  }

  function updateWheel() {
    const categories = categoriesForNextQuestion();
    const canvas = $('#wheel-canvas');
    const box = canvas.getBoundingClientRect();
    const size = Math.max(230, Math.floor(box.width || 420));
    const ratio = Math.max(1, window.devicePixelRatio || 1);
    canvas.width = size * ratio;
    canvas.height = size * ratio;
    const context = canvas.getContext('2d');
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, size, size);
    if (!categories.length) return;

    const center = size / 2;
    const radius = size / 2 - 7;
    const arc = (Math.PI * 2) / categories.length;
    context.save();
    context.translate(center, center);
    context.rotate(wheelRotation);
    categories.forEach((category, index) => {
      const start = -Math.PI / 2 + index * arc;
      const end = start + arc;
      const color = category.color || COLOR_CYCLE[index % COLOR_CYCLE.length];
      context.beginPath();
      context.moveTo(0, 0);
      context.arc(0, 0, radius, start, end);
      context.closePath();
      context.fillStyle = color;
      context.fill();
      context.lineWidth = Math.max(1.5, size / 270);
      context.strokeStyle = 'rgba(14, 25, 43, .72)';
      context.stroke();
    });
    context.beginPath();
    context.arc(0, 0, radius, 0, Math.PI * 2);
    context.lineWidth = Math.max(4, size / 95);
    context.strokeStyle = '#e9f4ee';
    context.stroke();
    context.restore();

    // Keep the text upright and inside each sector, even when the wheel is spinning.
    const labelRadius = radius * .57;
    const fontSize = Math.max(8, Math.min(13, 145 / categories.length, size / 28));
    const maxLabelWidth = Math.max(28, 2 * labelRadius * Math.sin(arc / 2) * .84);
    context.font = `800 ${fontSize}px "DM Sans", Segoe UI, sans-serif`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = '#102038';
    context.lineJoin = 'round';
    context.lineWidth = Math.max(1, fontSize * .12);
    context.strokeStyle = 'rgba(255, 255, 255, .38)';
    categories.forEach((category, index) => {
      const middle = -Math.PI / 2 + (index + .5) * arc + wheelRotation;
      const x = center + Math.cos(middle) * labelRadius;
      const y = center + Math.sin(middle) * labelRadius;
      const lines = wrapWheelLabel(category.name, context, maxLabelWidth, 3);
      const lineHeight = fontSize * 1.12;
      const firstLineY = y - ((lines.length - 1) * lineHeight) / 2;
      lines.forEach((line, lineIndex) => {
        const lineY = firstLineY + lineIndex * lineHeight;
        context.strokeText(line, x, lineY, maxLabelWidth);
        context.fillText(line, x, lineY, maxLabelWidth);
      });
    });
  }

  function wrapWheelLabel(value, context, maxWidth, maxLines) {
    const words = String(value || '').trim().split(/\s+/).filter(Boolean);
    const lines = [];
    let line = '';
    words.forEach((word) => {
      const candidate = line ? `${line} ${word}` : word;
      if (context.measureText(candidate).width <= maxWidth) {
        line = candidate;
        return;
      }
      if (line) lines.push(line);
      if (context.measureText(word).width <= maxWidth) {
        line = word;
        return;
      }
      let chunk = '';
      [...word].forEach((character) => {
        if (chunk && context.measureText(chunk + character).width > maxWidth) {
          lines.push(chunk);
          chunk = character;
        } else chunk += character;
      });
      line = chunk;
    });
    if (line) lines.push(line);
    if (lines.length <= maxLines) return lines.length ? lines : [''];
    const visible = lines.slice(0, maxLines);
    let last = visible[maxLines - 1];
    while (last.length > 1 && context.measureText(`${last}…`).width > maxWidth) last = last.slice(0, -1);
    visible[maxLines - 1] = `${last}…`;
    return visible;
  }

  function spinWheel() {
    if (wheelAnimating || !game) return;
    const categories = categoriesForNextQuestion();
    if (!categories.length) {
      finishGame();
      return;
    }
    wheelAnimating = true;
    $('#spin-wheel').disabled = true;
    const selectedIndex = Math.floor(Math.random() * categories.length);
    const selectedCategory = categories[selectedIndex];
    const arc = (Math.PI * 2) / categories.length;
    const startRotation = wheelRotation;
    let endRotation = Math.ceil(startRotation / (Math.PI * 2)) * Math.PI * 2 + Math.PI * 2 * 5 - (selectedIndex + .5) * arc;
    while (endRotation <= startRotation) endRotation += Math.PI * 2;
    const startTime = performance.now();
    const duration = 3000;

    function animate(now) {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      wheelRotation = startRotation + (endRotation - startRotation) * eased;
      updateWheel();
      if (progress < 1) {
        spinFrameId = requestAnimationFrame(animate);
        return;
      }
      spinFrameId = null;
      wheelRotation %= Math.PI * 2;
      wheelAnimating = false;
      $('#spin-wheel').disabled = false;
      updateWheel();
      questionTransitionTimer = setTimeout(() => {
        questionTransitionTimer = null;
        if (game) showQuestion(selectedCategory);
      }, 320);
    }
    spinFrameId = requestAnimationFrame(animate);
  }

  function showQuestion(category) {
    const questions = (category.questions || []).filter((question) => question.active !== false && !game.usedQuestionIds.has(question.id));
    if (!questions.length) {
      updateWheel();
      showScreen('screen-wheel');
      return;
    }
    currentQuestion = questions[Math.floor(Math.random() * questions.length)];
    game.usedQuestionIds.add(currentQuestion.id);
    $('#question-category').textContent = category.name;
    $('#question-category').style.borderColor = `${category.color || '#66e1b2'}66`;
    $('#question-category').style.color = category.color || '#c5f8e4';
    $('#question-text').textContent = currentQuestion.text;
    $('#question-count').textContent = `Pregunta ${game.answered + 1} de ${game.total}`;
    $('#question-score').textContent = String(game.score);
    $('#progress-fill').style.width = `${(game.answered / game.total) * 100}%`;
    $('#answer-feedback').textContent = '';
    $('#answer-feedback').className = 'answer-feedback';
    $('#next-question').hidden = true;
    $('#next-question').textContent = game.answered + 1 >= game.total ? 'Ver resultado →' : 'Seguir →';

    const answerList = $('#answer-list');
    answerList.replaceChildren();
    currentQuestion.options.forEach((optionText, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'answer-option';
      const letter = document.createElement('span');
      letter.className = 'answer-letter';
      letter.textContent = LETTERS[index] || String(index + 1);
      const text = document.createElement('span');
      text.textContent = optionText;
      button.append(letter, text);
      button.addEventListener('click', () => submitAnswer(index));
      answerList.append(button);
    });

    const seconds = Math.max(5, Number(config.settings.secondsPerQuestion) || 20);
    game.timeLeft = seconds;
    updateTimer();
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      game.timeLeft -= 1;
      updateTimer();
      if (game.timeLeft <= 0) submitAnswer(null, true);
    }, 1000);
    showScreen('screen-question');
    $('#question-text').focus({ preventScroll: true });
  }

  function updateTimer() {
    $('#time-left').textContent = String(Math.max(0, game?.timeLeft ?? 0));
    $('#timer-chip').classList.toggle('urgent', (game?.timeLeft ?? 99) <= 5);
  }

  function submitAnswer(selectedIndex, timedOut = false) {
    if (!game || !currentQuestion || game.answerResolved) return;
    game.answerResolved = true;
    clearInterval(timerInterval);
    const correct = selectedIndex === currentQuestion.correctIndex;
    if (correct) {
      game.score += Number(config.settings.pointsCorrect) || 0;
      game.correct += 1;
    } else if (!timedOut) {
      game.score = Math.max(0, game.score + (Number(config.settings.pointsIncorrect) || 0));
    }
    game.answered += 1;
    $$('.answer-option').forEach((button, index) => {
      button.disabled = true;
      if (index === currentQuestion.correctIndex) button.classList.add('correct');
      else if (index === selectedIndex) button.classList.add('incorrect');
    });
    const feedback = $('#answer-feedback');
    feedback.classList.add(correct ? 'good' : 'bad');
    if (timedOut) feedback.textContent = `Se terminó el tiempo. La respuesta era: ${currentQuestion.options[currentQuestion.correctIndex]}`;
    else if (correct) feedback.textContent = `¡Correcto! +${Number(config.settings.pointsCorrect) || 0} puntos.`;
    else feedback.textContent = `La respuesta era: ${currentQuestion.options[currentQuestion.correctIndex]}.`;

    $('#question-score').textContent = String(game.score);
    $('#progress-fill').style.width = `${(game.answered / game.total) * 100}%`;
    $('#next-question').textContent = game.answered >= game.total ? 'Ver resultado →' : 'Seguir →';
    $('#next-question').hidden = false;
  }

  function continueGame() {
    if (!game) return;
    if (game.answered >= game.total) {
      finishGame();
      return;
    }
    game.answerResolved = false;
    $('#wheel-score').textContent = String(game.score);
    $('#wheel-progress').textContent = `${game.answered} / ${game.total}`;
    updateWheel();
    showScreen('screen-wheel');
  }

  function cancelPendingQuestion() {
    clearInterval(timerInterval);
    if (spinFrameId !== null) cancelAnimationFrame(spinFrameId);
    if (questionTransitionTimer !== null) clearTimeout(questionTransitionTimer);
    spinFrameId = null;
    questionTransitionTimer = null;
    wheelAnimating = false;
    $('#spin-wheel').disabled = false;
  }

  function endGameEarly() {
    if (!game) return;
    const hasAnswered = game.answered > 0;
    const message = hasAnswered
      ? '¿Querés terminar ahora? Se guardará el puntaje parcial de las preguntas respondidas.'
      : '¿Querés terminar la partida? Todavía no hay respuestas y no se guardará un puntaje.';
    if (!window.confirm(message)) return;
    cancelPendingQuestion();
    if (hasAnswered) {
      finishGame();
      return;
    }
    game = null;
    currentQuestion = null;
    activeRoulette = null;
    $('#end-game').hidden = true;
    showScreen('screen-home');
    showToast('Partida terminada sin guardar puntaje.');
  }

  function newResultId() {
    return window.crypto?.randomUUID ? crypto.randomUUID() : makeId('partida');
  }

  async function finishGame() {
    if (!game) return;
    clearInterval(timerInterval);
    $('#end-game').hidden = true;
    const result = {
      id: newResultId(),
      name: game.player,
      score: game.score,
      correct: game.correct,
      total: game.answered,
      roulette: activeRoulette?.name || '',
      date: new Date().toISOString()
    };
    const entries = sortRanking([result, ...localRanking()]);
    localStorage.setItem(RANKING_KEY, JSON.stringify(entries));
    $('#finish-name').textContent = game.player;
    $('#finish-score').textContent = String(game.score);
    $('#finish-summary').textContent = `Respondiste bien ${game.correct} de ${game.answered} preguntas en ${activeRoulette?.name || 'la ruleta'}.`;
    $('#result-sync').textContent = getApiEndpoint() ? 'Enviando puntaje a Google Sheets…' : 'Puntaje guardado en este dispositivo.';
    $('#result-sync').classList.toggle('connected', !getApiEndpoint());
    showScreen('screen-finish');
    renderRanking();
    game = null;
    currentQuestion = null;
    if (getApiEndpoint()) {
      const sent = await postResult(result);
      if (sent) {
        $('#result-sync').textContent = 'Puntaje enviado a Google Sheets.';
        $('#result-sync').classList.add('connected');
        setTimeout(refreshRanking, 900);
      } else {
        $('#result-sync').textContent = sheetErrorMessage
          ? `No se pudo confirmar el envío: ${sheetErrorMessage} El puntaje quedó guardado en este dispositivo.`
          : 'No se pudo enviar. El puntaje quedó guardado en este dispositivo.';
        $('#result-sync').classList.remove('connected');
      }
    }
  }

  async function postResult(result) {
    const endpoint = getApiEndpoint();
    if (!endpoint) return false;
    try {
      sheetErrorMessage = '';
      await postThroughForm(endpoint, { action: 'score', ...result });
      const confirmation = await jsonp(endpoint, { action: 'check', id: result.id });
      if (confirmation.error) throw new Error(confirmation.error);
      if (!confirmation.exists) throw new Error('La hoja no confirmó este puntaje. Revisá el script y volvé a implementarlo.');
      return true;
    } catch (error) {
      console.warn('No se pudo enviar el puntaje a Google Sheets.', error);
      sheetErrorMessage = error.message || 'Error de conexión.';
      return false;
    }
  }

  function postThroughForm(url, payload) {
    return new Promise((resolve, reject) => {
      const frameName = makeId('ranking-frame').replace(/[^A-Za-z0-9_]/g, '_');
      const frame = document.createElement('iframe');
      frame.name = frameName;
      frame.title = 'Envío de puntaje';
      frame.style.display = 'none';
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = url;
      form.target = frameName;
      form.enctype = 'application/x-www-form-urlencoded';
      form.style.display = 'none';
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'payload';
      input.value = JSON.stringify(payload);
      form.append(input);
      let sent = false;
      let finished = false;
      const timeout = setTimeout(() => {
        if (finished) return;
        finished = true;
        frame.remove();
        form.remove();
        reject(new Error('Apps Script no respondió al envío.'));
      }, 15000);
      frame.addEventListener('load', () => {
        if (!sent) {
          sent = true;
          form.submit();
          return;
        }
        if (finished) return;
        finished = true;
        clearTimeout(timeout);
        frame.remove();
        form.remove();
        resolve();
      });
      document.body.append(frame, form);
      frame.src = 'about:blank';
    });
  }

  function jsonp(url, parameters = {}) {
    return new Promise((resolve, reject) => {
      const callback = `__preguntado_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      const script = document.createElement('script');
      let finished = false;
      const cleanup = () => {
        if (finished) return;
        finished = true;
        clearTimeout(timeout);
        delete window[callback];
        script.remove();
      };
      const timeout = setTimeout(() => {
        cleanup();
        reject(new Error('La hoja no respondió a tiempo.'));
      }, 9000);
      window[callback] = (data) => {
        cleanup();
        resolve(data);
      };
      script.onerror = () => {
        cleanup();
        reject(new Error('No se pudo abrir la conexión con la hoja.'));
      };
      const requestUrl = new URL(url);
      Object.entries(parameters).forEach(([key, value]) => requestUrl.searchParams.set(key, String(value)));
      requestUrl.searchParams.set('callback', callback);
      requestUrl.searchParams.set('_', String(Date.now()));
      script.src = requestUrl.toString();
      document.head.append(script);
    });
  }

  async function fetchSheetRanking() {
    const endpoint = getApiEndpoint();
    if (!endpoint) return null;
    const data = await jsonp(endpoint, { action: 'ranking' });
    if (data?.error) throw new Error(data.error);
    const rows = Array.isArray(data) ? data : data?.ranking;
    if (!Array.isArray(rows)) throw new Error('La respuesta de Google Sheets no tiene el formato esperado.');
    return rows.map((row) => ({
      id: String(row.id || ''),
      name: String(row.name || row.nombre || 'Jugador'),
      score: Number(row.score ?? row.puntaje ?? 0),
      total: Number(row.total ?? row.preguntas ?? 0),
      roulette: String(row.roulette || row.ruleta || ''),
      date: String(row.date || row.fecha || '')
    }));
  }

  async function hashPin(pin) {
    if (!window.crypto?.subtle) throw new Error('El PIN compartido requiere abrir el sitio por HTTPS.');
    const bytes = new TextEncoder().encode(String(pin));
    const digest = await window.crypto.subtle.digest('SHA-256', bytes);
    return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
  }

  function mergeSharedConfig(remoteConfig) {
    const endpoint = getApiEndpoint();
    const merged = {
      ...structuredClone(DEFAULT_DATA),
      ...remoteConfig,
      settings: {
        ...DEFAULT_DATA.settings,
        ...(remoteConfig.settings || {}),
        adminPin: DEFAULT_DATA.settings.adminPin,
        sheetEndpoint: endpoint
      },
      roulettes: remoteConfig.roulettes.map((roulette) => ({
        ...roulette,
        categories: (roulette.categories || []).map((category) => ({
          ...category,
          questions: Array.isArray(category.questions) ? category.questions : []
        }))
      }))
    };
    return merged;
  }

  async function publishSharedConfig({ quiet = false } = {}) {
    const endpoint = getApiEndpoint();
    if (!endpoint || !adminSessionHash) throw new Error('Volvé a ingresar el PIN de administración.');
    const revision = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const sharedConfig = structuredClone(config);
    if (sharedConfig.settings) {
      delete sharedConfig.settings.adminPin;
      delete sharedConfig.settings.sheetEndpoint;
    }
    sharedConfig.sharedRevision = revision;
    await postThroughForm(endpoint, { action: 'config', pinHash: adminSessionHash, config: sharedConfig });
    const response = await jsonp(endpoint, { action: 'config', revision });
    if (response.error) throw new Error(response.error);
    if (response.config?.sharedRevision !== revision) throw new Error('Google Sheets no confirmó los cambios compartidos.');
    config.sharedRevision = revision;
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
    sharedBankStatus = '';
    if (!quiet) {
      $('#settings-saved-status').textContent = 'Cambios guardados para todos los dispositivos.';
      showToast('Cambios publicados para todos.');
    }
    return true;
  }

  async function loadSharedState() {
    const endpoint = getApiEndpoint();
    if (!endpoint) return;
    sharedStateLoading = true;
    renderHome();
    try {
      const response = await jsonp(endpoint, { action: 'config' });
      if (response.error) throw new Error(response.error);
      if (!Object.prototype.hasOwnProperty.call(response, 'config')) {
        throw new Error('Apps Script está desactualizado. Reemplazá Code.gs y publicá una nueva versión.');
      }
      if (response.config) {
        config = mergeSharedConfig(response.config);
        selectedRouletteId = config.roulettes[0]?.id || '';
        selectedCategoryId = config.roulettes[0]?.categories[0]?.id || '';
        localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
        sharedBankStatus = '';
        renderHome();
      }
    } catch (error) {
      sharedBankStatus = `No se pudo sincronizar el banco: ${error.message}`;
      renderHome();
    }
    try {
      cloudRanking = await fetchSheetRanking();
    } catch (error) {
      cloudRanking = null;
      if (!sharedBankStatus) sharedBankStatus = `No se pudo cargar el ranking: ${error.message}`;
    }
    renderRanking();
    sharedStateLoading = false;
    renderHome();
  }

  async function refreshRanking() {
    const button = $('#refresh-ranking');
    button.disabled = true;
    button.textContent = 'Actualizando…';
    try {
      const remote = await fetchSheetRanking();
      cloudRanking = remote;
      renderRanking();
      if (remote) showToast('Ranking de Google Sheets actualizado.');
    } catch (error) {
      cloudRanking = null;
      renderRanking();
      $('#ranking-connection').textContent = error.message || 'No se pudo actualizar la hoja';
      $('#ranking-dot').classList.remove('connected');
      showToast(`No se pudo actualizar: ${error.message || 'revisá la URL de Sheets.'}`);
    } finally {
      button.disabled = false;
      button.textContent = 'Actualizar ranking';
    }
  }

  function renderRanking() {
    const entries = cloudRanking !== null ? sortRanking(cloudRanking) : sortRanking(localRanking());
    const list = $('#ranking-list');
    list.replaceChildren();
    entries.slice(0, 10).forEach((entry, index) => {
      const row = document.createElement('li');
      const place = document.createElement('span');
      place.className = 'ranking-place';
      place.textContent = `${index + 1}.`;
      const name = document.createElement('span');
      name.className = 'ranking-player';
      name.textContent = entry.name;
      name.title = entry.name;
      const score = document.createElement('span');
      score.className = 'ranking-points';
      score.textContent = `${Number(entry.score) || 0} pts`;
      row.append(place, name, score);
      list.append(row);
    });
    $('#ranking-empty').hidden = entries.length > 0;
    $('#ranking-scope').textContent = cloudRanking ? 'Puntajes compartidos desde Google Sheets' : 'En este dispositivo';
    refreshRankingStatus();
  }

  function refreshRankingStatus() {
    const connected = Boolean(getApiEndpoint());
    $('#ranking-dot').classList.toggle('connected', connected && cloudRanking !== null);
    if (connected && cloudRanking === null) $('#ranking-connection').textContent = 'Google Sheets configurado';
    else if (connected) $('#ranking-connection').textContent = 'Conectado a Google Sheets';
    else $('#ranking-connection').textContent = 'Ranking guardado en este dispositivo';
  }

  function openRanking() {
    if (window.matchMedia('(max-width: 760px)').matches) {
      $('#ranking-panel').classList.add('mobile-open');
      $('#mobile-scrim').classList.add('visible');
      $('#ranking-toggle').setAttribute('aria-expanded', 'true');
    } else {
      $('#ranking-panel').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    if (getApiEndpoint()) refreshRanking();
  }

  function closeRanking() {
    $('#ranking-panel').classList.remove('mobile-open');
    $('#mobile-scrim').classList.remove('visible');
    $('#ranking-toggle').setAttribute('aria-expanded', 'false');
  }

  function exportRankingCsv() {
    const entries = sortRanking(cloudRanking !== null ? cloudRanking : localRanking());
    if (!entries.length) {
      showToast('Todavía no hay puntajes para descargar.');
      return;
    }
    const quote = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
    const lines = [
      ['Puesto', 'Nombre', 'Puntaje', 'Aciertos', 'Preguntas', 'Ruleta', 'Fecha'].map(quote).join(';'),
      ...entries.map((entry, index) => [index + 1, entry.name, entry.score, entry.correct ?? '', entry.total ?? '', entry.roulette ?? '', entry.date ?? ''].map(quote).join(';'))
    ];
    downloadFile(`ranking-ipet49-${new Date().toISOString().slice(0, 10)}.csv`, `\uFEFF${lines.join('\r\n')}`, 'text/csv;charset=utf-8');
  }

  function downloadFile(filename, content, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1200);
  }

  function openAdmin() {
    if (game) {
      showToast('Terminá la partida antes de cambiar la administración.');
      return;
    }
    $('#admin-pin-entry').value = '';
    $('#pin-error').textContent = '';
    $('#pin-dialog').showModal();
    setTimeout(() => $('#admin-pin-entry').focus(), 60);
  }

  async function enterAdmin() {
    const pin = $('#admin-pin-entry').value;
    const button = $('#pin-submit');
    button.disabled = true;
    $('#pin-error').textContent = '';
    try {
      const endpoint = getApiEndpoint();
      if (endpoint) {
        const candidateHash = await hashPin(pin);
        const result = await jsonp(endpoint, { action: 'auth', pinHash: candidateHash });
        if (result.error) throw new Error(result.error);
        if (!Object.prototype.hasOwnProperty.call(result, 'authorized')) {
          throw new Error('Apps Script está desactualizado. Reemplazá Code.gs y publicá una nueva versión.');
        }
        if (!result.authorized) throw new Error('La contraseña no coincide. Probá otra vez.');
        adminSessionHash = candidateHash;
        if (!result.configReady) await publishSharedConfig({ quiet: true });
      } else {
        if (pin !== String(config.settings.adminPin || '4949')) throw new Error('La contraseña no coincide. Probá otra vez.');
        adminSessionHash = '';
      }
      $('#pin-dialog').close();
      renderAdmin();
      $('#admin-dialog').showModal();
    } catch (error) {
      $('#pin-error').textContent = error.message || 'No se pudo validar el PIN.';
      $('#admin-pin-entry').select();
    } finally {
      button.disabled = false;
    }
  }

  async function changeAdminPin(newPin) {
    const endpoint = getApiEndpoint();
    if (!endpoint || !adminSessionHash) {
      config.settings.adminPin = newPin;
      return;
    }
    const newPinHash = await hashPin(newPin);
    await postThroughForm(endpoint, { action: 'setPin', currentPinHash: adminSessionHash, newPinHash });
    const confirmation = await jsonp(endpoint, { action: 'auth', pinHash: newPinHash });
    if (confirmation.error) throw new Error(confirmation.error);
    if (!confirmation.authorized) throw new Error('Google Sheets no confirmó el cambio del PIN.');
    adminSessionHash = newPinHash;
  }

  function fillSelect(select, items, selectedId) {
    select.replaceChildren();
    items.forEach((item) => {
      const option = document.createElement('option');
      option.value = item.id;
      option.textContent = item.name;
      select.append(option);
    });
    if (items.some((item) => item.id === selectedId)) select.value = selectedId;
    else if (items[0]) select.value = items[0].id;
  }

  function currentAdminRoulette() {
    return config.roulettes.find((roulette) => roulette.id === selectedRouletteId) || config.roulettes[0] || null;
  }

  function currentAdminCategory() {
    const roulette = currentAdminRoulette();
    return roulette?.categories.find((category) => category.id === selectedCategoryId) || roulette?.categories[0] || null;
  }

  function renderAdmin() {
    const roulette = currentAdminRoulette();
    if (!roulette) return;
    selectedRouletteId = roulette.id;
    if (!roulette.categories.some((category) => category.id === selectedCategoryId)) selectedCategoryId = roulette.categories[0]?.id || '';
    fillSelect($('#admin-roulette-select'), config.roulettes, selectedRouletteId);
    $('#admin-roulette-name').value = roulette.name || '';
    fillSelect($('#admin-category-select'), roulette.categories, selectedCategoryId);
    renderCategoryEditor();
    renderQuestionEditors();
    renderSettingsEditor();
  }

  function renderCategoryEditor() {
    const category = currentAdminCategory();
    $('#category-name').value = category?.name || '';
    $('#category-color').value = category?.color || COLOR_CYCLE[0];
    $('#delete-category').disabled = !category || (currentAdminRoulette()?.categories.length || 0) <= 1;
  }

  function renderQuestionEditors() {
    const category = currentAdminCategory();
    const list = $('#question-editor-list');
    list.replaceChildren();
    const questions = category?.questions || [];
    $('#question-list-count').textContent = `${questions.length} ${questions.length === 1 ? 'pregunta' : 'preguntas'} en esta categoría.`;
    questions.forEach((question, index) => list.append(buildQuestionEditor(question, index)));
  }

  function buildQuestionEditor(question, index) {
    const details = document.createElement('details');
    details.className = 'question-editor';
    const summary = document.createElement('summary');
    summary.textContent = `${String(index + 1).padStart(2, '0')} · ${question.text || 'Pregunta sin título'}`;
    details.append(summary);

    const fields = document.createElement('div');
    fields.className = 'question-edit-fields';
    const promptLabel = document.createElement('label');
    promptLabel.className = 'field-label';
    promptLabel.textContent = 'Pregunta';
    const prompt = document.createElement('textarea');
    prompt.maxLength = 500;
    prompt.value = question.text || '';
    promptLabel.append(prompt);
    const optionsLabel = document.createElement('label');
    optionsLabel.className = 'field-label';
    optionsLabel.textContent = 'Respuestas (una por línea)';
    const optionsInput = document.createElement('textarea');
    optionsInput.className = 'options-textarea';
    optionsInput.maxLength = 1000;
    optionsInput.value = (question.options || []).join('\n');
    optionsLabel.append(optionsInput);
    const actions = document.createElement('div');
    actions.className = 'question-edit-actions';
    const correctLabel = document.createElement('label');
    correctLabel.className = 'field-label';
    correctLabel.textContent = 'Respuesta correcta';
    const correctSelect = document.createElement('select');
    (question.options || []).forEach((optionText, optionIndex) => {
      const option = document.createElement('option');
      option.value = String(optionIndex);
      option.textContent = `${LETTERS[optionIndex] || optionIndex + 1}) ${optionText}`;
      correctSelect.append(option);
    });
    correctSelect.value = String(question.correctIndex || 0);
    optionsInput.addEventListener('input', () => {
      const previousIndex = Number(correctSelect.value) || 0;
      const currentOptions = optionsInput.value.split('\n').map((value) => value.trim()).filter(Boolean);
      correctSelect.replaceChildren();
      currentOptions.forEach((optionText, optionIndex) => {
        const option = document.createElement('option');
        option.value = String(optionIndex);
        option.textContent = `${LETTERS[optionIndex] || optionIndex + 1}) ${optionText}`;
        correctSelect.append(option);
      });
      if (currentOptions.length) correctSelect.value = String(Math.min(previousIndex, currentOptions.length - 1));
    });
    correctLabel.append(correctSelect);
    const actionButtons = document.createElement('div');
    actionButtons.className = 'button-row';
    actionButtons.style.marginTop = '0';
    const save = document.createElement('button');
    save.className = 'button button-primary';
    save.type = 'button';
    save.textContent = 'Guardar';
    save.addEventListener('click', () => {
      const options = optionsInput.value.split('\n').map((value) => value.trim()).filter(Boolean);
      const text = prompt.value.trim();
      const correctIndex = Number(correctSelect.value);
      if (!text || options.length < 2 || correctIndex >= options.length) {
        showToast('Completá la pregunta, al menos dos respuestas y la correcta.');
        return;
      }
      question.text = text;
      question.options = options;
      question.correctIndex = correctIndex;
      saveConfig('Pregunta guardada.');
      renderAdmin();
    });
    const remove = document.createElement('button');
    remove.className = 'button button-danger-outline';
    remove.type = 'button';
    remove.textContent = 'Eliminar';
    remove.addEventListener('click', () => {
      if (!window.confirm('¿Eliminar esta pregunta del banco?')) return;
      const category = currentAdminCategory();
      category.questions = category.questions.filter((entry) => entry.id !== question.id);
      saveConfig('Pregunta eliminada.');
      renderAdmin();
    });
    actionButtons.append(save, remove);
    actions.append(correctLabel, actionButtons);
    fields.append(promptLabel, optionsLabel, actions);
    details.append(fields);
    return details;
  }

  function renderSettingsEditor() {
    $('#setting-title').value = config.settings.title || '';
    $('#setting-subtitle').value = config.settings.subtitle || '';
    $('#setting-questions').value = String(config.settings.questionsPerGame ?? 20);
    $('#setting-seconds').value = String(config.settings.secondsPerQuestion ?? 20);
    $('#setting-correct').value = String(config.settings.pointsCorrect ?? 1);
    $('#setting-incorrect').value = String(config.settings.pointsIncorrect ?? 0);
    $('#setting-pin').value = '';
    $('#setting-pin').placeholder = 'Dejar vacío para conservarlo';
    $('#setting-sheet-url').value = getApiEndpoint();
    $('#setting-sheet-url').readOnly = Boolean(STATIC_API_URL);
  }

  async function saveSettings() {
    const title = $('#setting-title').value.trim();
    const subtitle = $('#setting-subtitle').value.trim();
    const questions = Number($('#setting-questions').value);
    const seconds = Number($('#setting-seconds').value);
    const correct = Number($('#setting-correct').value);
    const incorrect = Number($('#setting-incorrect').value);
    const pin = $('#setting-pin').value.trim();
    const endpoint = STATIC_API_URL || $('#setting-sheet-url').value.trim();
    if (!title || !Number.isInteger(questions) || questions < 1 || questions > 100 || !Number.isInteger(seconds) || seconds < 5 || seconds > 180 || !Number.isFinite(correct) || !Number.isFinite(incorrect)) {
      showToast('Revisá el título, la duración y los puntos.');
      return;
    }
    if (endpoint) {
      try {
        if (new URL(endpoint).protocol !== 'https:') throw new Error('https');
      } catch {
        showToast('La URL de Google Sheets debe empezar con https://');
        return;
      }
    }
    if (pin && (pin.length < 4 || pin.length > 64)) {
      showToast('La contraseña debe tener entre 4 y 64 caracteres.');
      return;
    }
    if (pin) {
      try {
        await changeAdminPin(pin);
      } catch (error) {
        showToast(`No se pudo cambiar el PIN: ${error.message}`);
        return;
      }
    }
    config.settings.title = title;
    config.settings.subtitle = subtitle;
    config.settings.questionsPerGame = questions;
    config.settings.secondsPerQuestion = seconds;
    config.settings.pointsCorrect = correct;
    config.settings.pointsIncorrect = incorrect;
    if (pin && !getApiEndpoint()) config.settings.adminPin = pin;
    config.settings.sheetEndpoint = endpoint;
    cloudRanking = null;
    saveConfig(getApiEndpoint() && adminSessionHash ? 'Publicando cambios para todos…' : 'Configuración guardada en este navegador.');
    $('#settings-saved-status').textContent = getApiEndpoint() && adminSessionHash ? 'Publicando cambios compartidos…' : 'Cambios guardados en este navegador.';
    renderSettingsEditor();
  }

  function addRoulette() {
    const roulette = {
      id: makeId('ruleta'),
      name: 'Nueva ruleta',
      icon: '🎯',
      description: 'Preguntas para aprender jugando',
      categories: [{ id: makeId('categoria'), name: 'Nueva categoría', color: COLOR_CYCLE[config.roulettes.length % COLOR_CYCLE.length], questions: [] }]
    };
    config.roulettes.push(roulette);
    selectedRouletteId = roulette.id;
    selectedCategoryId = roulette.categories[0].id;
    saveConfig('Ruleta agregada.');
    renderAdmin();
  }

  function renameRoulette() {
    const roulette = currentAdminRoulette();
    const name = $('#admin-roulette-name').value.trim();
    if (!roulette || !name) {
      showToast('Escribí un nombre para la ruleta.');
      return;
    }
    roulette.name = name.slice(0, 48);
    saveConfig('Nombre de ruleta actualizado.');
    renderAdmin();
  }

  function deleteRoulette() {
    if (config.roulettes.length <= 1) {
      showToast('Dejá al menos una ruleta en el juego.');
      return;
    }
    const roulette = currentAdminRoulette();
    if (!roulette || !window.confirm(`¿Eliminar la ruleta “${roulette.name}” y sus preguntas?`)) return;
    config.roulettes = config.roulettes.filter((entry) => entry.id !== roulette.id);
    selectedRouletteId = config.roulettes[0].id;
    selectedCategoryId = config.roulettes[0].categories[0]?.id || '';
    saveConfig('Ruleta eliminada.');
    renderAdmin();
  }

  function addCategory() {
    const roulette = currentAdminRoulette();
    if (!roulette) return;
    const category = { id: makeId('categoria'), name: 'Nueva categoría', color: COLOR_CYCLE[roulette.categories.length % COLOR_CYCLE.length], questions: [] };
    roulette.categories.push(category);
    selectedCategoryId = category.id;
    saveConfig('Categoría agregada.');
    renderAdmin();
  }

  function saveCategory() {
    const category = currentAdminCategory();
    const name = $('#category-name').value.trim();
    if (!category || !name) {
      showToast('Escribí un nombre para la categoría.');
      return;
    }
    category.name = name.slice(0, 42);
    category.color = $('#category-color').value;
    saveConfig('Categoría guardada.');
    renderAdmin();
  }

  function deleteCategory() {
    const roulette = currentAdminRoulette();
    const category = currentAdminCategory();
    if (!roulette || !category || roulette.categories.length <= 1) {
      showToast('Dejá al menos una categoría en cada ruleta.');
      return;
    }
    if (!window.confirm(`¿Eliminar “${category.name}” y sus preguntas?`)) return;
    roulette.categories = roulette.categories.filter((entry) => entry.id !== category.id);
    selectedCategoryId = roulette.categories[0].id;
    saveConfig('Categoría eliminada.');
    renderAdmin();
  }

  function addQuestion() {
    const category = currentAdminCategory();
    if (!category) {
      showToast('Agregá una categoría antes de sumar preguntas.');
      return;
    }
    const question = { id: makeId('pregunta'), text: 'Escribí una pregunta nueva', options: ['Opción 1', 'Opción 2', 'Opción 3'], correctIndex: 0 };
    category.questions.push(question);
    saveConfig('Pregunta agregada.');
    renderAdmin();
    const editors = $$('.question-editor', $('#question-editor-list'));
    editors.at(-1)?.setAttribute('open', '');
    editors.at(-1)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function exportData() {
    const exportConfig = structuredClone(config);
    if (exportConfig.settings && getApiEndpoint()) delete exportConfig.settings.adminPin;
    downloadFile('banco-preguntas-ipet49.json', JSON.stringify(exportConfig, null, 2), 'application/json;charset=utf-8');
    $('#backup-status').textContent = 'Se descargó una copia del banco y la configuración.';
  }

  function importData(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result));
        if (!data || !Array.isArray(data.roulettes) || !data.roulettes.length) throw new Error('Formato inválido');
        const hasBadCategory = data.roulettes.some((roulette) => !Array.isArray(roulette.categories));
        if (hasBadCategory) throw new Error('Categorías inválidas');
        data.settings = { ...DEFAULT_DATA.settings, ...(data.settings || {}) };
        data.roulettes.forEach((roulette) => roulette.categories.forEach((category) => {
          if (!Array.isArray(category.questions)) category.questions = [];
          category.questions.forEach((question) => {
            if (!Array.isArray(question.options) || question.options.length < 2 || !Number.isInteger(Number(question.correctIndex))) throw new Error('Preguntas inválidas');
          });
        }));
        config = data;
        selectedRouletteId = config.roulettes[0].id;
        selectedCategoryId = config.roulettes[0].categories[0]?.id || '';
        cloudRanking = null;
        saveConfig('Banco de preguntas cargado.');
        renderAdmin();
        $('#backup-status').textContent = 'El banco importado quedó guardado en este navegador.';
      } catch {
        $('#backup-status').textContent = 'No se pudo cargar el archivo. Usá una copia JSON de este juego.';
      }
      $('#import-data').value = '';
    };
    reader.readAsText(file);
  }

  function restoreDefaults() {
    if (!window.confirm('¿Restaurar el banco inicial? Se reemplazarán todas las ruletas y preguntas editadas.')) return;
    config = structuredClone(DEFAULT_DATA);
    selectedRouletteId = config.roulettes[0]?.id || '';
    selectedCategoryId = config.roulettes[0]?.categories[0]?.id || '';
    cloudRanking = null;
    saveConfig('Banco inicial restaurado.');
    renderAdmin();
    $('#backup-status').textContent = 'Se restauró el banco inicial.';
  }

  async function testSheetConnection() {
    const endpoint = $('#setting-sheet-url').value.trim();
    const status = $('#sheet-test-result');
    if (!endpoint) {
      status.textContent = 'Pegá primero la URL del servicio de Google Apps Script.';
      return;
    }
    status.textContent = 'Probando conexión…';
    try {
      const data = await jsonp(endpoint, { action: 'config' });
      if (data?.error) throw new Error(data.error);
      if (!Object.prototype.hasOwnProperty.call(data, 'config')) throw new Error('Apps Script está desactualizado. Reemplazá Code.gs y publicá una nueva versión.');
      status.textContent = 'Conexión compartida lista. El banco, el PIN y el ranking usarán la misma hoja.';
      status.style.color = '#81eabf';
    } catch (error) {
      status.textContent = error.message || 'Revisá la URL, el ID de la hoja y los permisos de implementación.';
      status.style.color = '#ffadba';
    }
  }

  function switchAdminTab(tabName) {
    $$('.admin-tab').forEach((button) => button.classList.toggle('active', button.dataset.adminTab === tabName));
    $$('.admin-view').forEach((view) => view.classList.toggle('active', view.id === `admin-view-${tabName}`));
  }

  function bindEvents() {
    $('#start-game').addEventListener('click', async () => {
      if (startingGame) return;
      const name = $('#player-name').value.trim();
      if (!name) {
        $('#home-message').textContent = 'Escribí tu nombre o apodo para empezar.';
        $('#home-message').style.color = '#ffadba';
        $('#player-name').focus();
        return;
      }
      $('#home-message').style.color = '';
      if (getApiEndpoint()) {
        startingGame = true;
        $('#start-game').disabled = true;
        try {
          await loadSharedState();
        } finally {
          startingGame = false;
          $('#start-game').disabled = config.roulettes.length === 0;
        }
      }
      showRouletteSelection();
    });
    $('#player-name').addEventListener('keydown', (event) => { if (event.key === 'Enter') $('#start-game').click(); });
    $$('[data-go-home]').forEach((button) => button.addEventListener('click', () => showScreen('screen-home')));
    $('#home-link').addEventListener('click', (event) => { event.preventDefault(); if (!game) showScreen('screen-home'); });
    $('#change-roulette').addEventListener('click', () => {
      if (!game) {
        showRouletteSelection();
        return;
      }
      if (!window.confirm('Cambiar de ruleta terminará esta partida. ¿Querés continuar?')) return;
      cancelPendingQuestion();
      if (game.answered > 0) {
        finishGame();
        return;
      }
      game = null;
      currentQuestion = null;
      activeRoulette = null;
      $('#end-game').hidden = true;
      showRouletteSelection();
    });
    $('#spin-wheel').addEventListener('click', spinWheel);
    $('#end-game').addEventListener('click', endGameEarly);
    $('#next-question').addEventListener('click', continueGame);
    $('#play-again').addEventListener('click', () => { game = null; showScreen('screen-home'); $('#player-name').focus(); });
    $('#finish-ranking').addEventListener('click', openRanking);
    $('#ranking-toggle').addEventListener('click', openRanking);
    $('#ranking-close').addEventListener('click', closeRanking);
    $('#mobile-scrim').addEventListener('click', closeRanking);
    $('#refresh-ranking').addEventListener('click', refreshRanking);
    $('#admin-open').addEventListener('click', openAdmin);
    $('#pin-submit').addEventListener('click', enterAdmin);
    $('#admin-pin-entry').addEventListener('keydown', (event) => { if (event.key === 'Enter') enterAdmin(); });
    $('#admin-close').addEventListener('click', () => $('#admin-dialog').close());
    $('#admin-roulette-select').addEventListener('change', (event) => {
      selectedRouletteId = event.target.value;
      selectedCategoryId = currentAdminRoulette()?.categories[0]?.id || '';
      renderAdmin();
    });
    $('#admin-category-select').addEventListener('change', (event) => {
      selectedCategoryId = event.target.value;
      renderCategoryEditor();
      renderQuestionEditors();
    });
    $('#add-roulette').addEventListener('click', addRoulette);
    $('#rename-roulette').addEventListener('click', renameRoulette);
    $('#delete-roulette').addEventListener('click', deleteRoulette);
    $('#add-category').addEventListener('click', addCategory);
    $('#save-category').addEventListener('click', saveCategory);
    $('#delete-category').addEventListener('click', deleteCategory);
    $('#add-question').addEventListener('click', addQuestion);
    $('#save-settings').addEventListener('click', saveSettings);
    $('#save-settings-bottom').addEventListener('click', saveSettings);
    $('#test-sheet').addEventListener('click', testSheetConnection);
    $('#export-data').addEventListener('click', exportData);
    $('#import-data').addEventListener('change', (event) => importData(event.target.files[0]));
    $('#export-ranking').addEventListener('click', exportRankingCsv);
    $('#restore-defaults').addEventListener('click', restoreDefaults);
    $$('.admin-tab').forEach((button) => button.addEventListener('click', () => switchAdminTab(button.dataset.adminTab)));
    window.addEventListener('resize', () => { if ($('#screen-wheel').classList.contains('active') && !wheelAnimating) updateWheel(); });
    window.addEventListener('keydown', (event) => {
      if (!$('#screen-question').classList.contains('active') || game?.answerResolved || event.altKey || event.ctrlKey || event.metaKey) return;
      const optionIndex = Number(event.key) - 1;
      if (optionIndex >= 0 && optionIndex < currentQuestion.options.length) $$('.answer-option')[optionIndex]?.click();
    });
  }

  sharedStateLoading = Boolean(getApiEndpoint());
  bindEvents();
  renderHome();
  renderRanking();
  if (getApiEndpoint()) loadSharedState();
})();
