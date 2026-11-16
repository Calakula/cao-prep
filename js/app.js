/* UI: навигация, главная, страницы квизов, тесты, карточки */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const byId = (id) => DATA.quizzes.find((q) => q.id === id);
  const store = {
    get(k) { try { return JSON.parse(localStorage.getItem("coa." + k)); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem("coa." + k, JSON.stringify(v)); } catch (e) {} }
  };
  const page = document.body.dataset.page;
  const current = document.body.dataset.quiz || "";

  /* ---------- Навигация ---------- */
  function renderNav() {
    const nav = $("#nav");
    if (!nav) return;
    const groups = DATA.groups.map((g) =>
      `<div class="mg"><div class="mg-t">${esc(g.name)}</div>${g.ids.map((id) => {
        const q = byId(id);
        return `<a class="mi ${id === current ? "on" : ""}" href="${id}.html"><span>${q.emoji}</span>${esc(q.short)}</a>`;
      }).join("")}</div>`).join("");
    nav.innerHTML = `
      <header class="top">
        <a class="brand" href="index.html"><span class="bheart">♥</span> COA Prep</a>
        <nav class="links">
          <a href="index.html" class="${page === "home" ? "on" : ""}">Главная</a>
          <a href="all.html" class="${page === "all" ? "on" : ""}">🎲 Общий тест</a>
          <button id="menuBtn" aria-expanded="false" aria-controls="menuPanel">☰ Все страницы</button>
        </nav>
      </header>
      <div id="menuPanel" class="panel" hidden>
        <div class="panel-in">
          <a class="mi wide ${page === "home" ? "on" : ""}" href="index.html"><span>🏠</span>Главная</a>
          <a class="mi wide ${page === "all" ? "on" : ""}" href="all.html"><span>🎲</span>Общий тест (все вопросы вперемешку)</a>
          ${groups}
        </div>
      </div>`;
    const btn = $("#menuBtn"), panel = $("#menuPanel");
    const toggle = (open) => {
      panel.hidden = !open;
      btn.setAttribute("aria-expanded", open);
      btn.textContent = open ? "✕ Закрыть" : "☰ Все страницы";
    };
    btn.addEventListener("click", () => toggle(panel.hidden));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") toggle(false); });
    document.addEventListener("click", (e) => { if (!panel.hidden && !panel.contains(e.target) && e.target !== btn) toggle(false); });
  }

  /* ---------- Летающие сердечки ---------- */
  function hearts() {
    const box = document.createElement("div");
    box.className = "float-hearts";
    box.setAttribute("aria-hidden", "true");
    for (let i = 0; i < 16; i++) {
      const s = document.createElement("span");
      s.textContent = ["♥", "♡", "❤", "💗"][i % 4];
      s.style.left = Math.random() * 100 + "%";
      s.style.fontSize = 12 + Math.random() * 22 + "px";
      s.style.animationDuration = 12 + Math.random() * 14 + "s";
      s.style.animationDelay = -Math.random() * 20 + "s";
      box.appendChild(s);
    }
    document.body.prepend(box);
  }

  /* ---------- Главная ---------- */
  const WISHES = [
    "Ты справишься на отлично! ✨",
    "Каждый вопрос — просто ещё один шаг к пятёрке 🌸",
    "Выдохни. Ты всё знаешь, а что не знаешь — выучишь сегодня 💪",
    "Удачи на Endterm! Я верю в тебя 🍀",
    "Пусть все ответы сами прыгают в голову 🧠💗",
    "Ты умный, красивый и обязательно сдашь 😎",
    "Маленькими шагами — до большого результата 🌷",
    "Сегодня — подготовка, завтра — победа 🏆"
  ];

  function renderHome() {
    // дополнительные фото: img/us2.jpg, us3.jpg, us4.jpg (если файла нет — скрывается)
    const gal = $("#gallery");
    if (gal) for (let n = 2; n <= 4; n++) {
      const d = document.createElement("div");
      d.className = "mini";
      d.innerHTML = `<img src="img/us${n}.jpg" alt="" onerror="this.parentNode.remove()">`;
      gal.appendChild(d);
    }
    // ротация пожеланий
    const w = $("#wish");
    if (w) {
      let i = 0;
      const show = () => { w.classList.remove("in"); void w.offsetWidth; w.textContent = WISHES[i % WISHES.length]; w.classList.add("in"); i++; };
      show(); setInterval(show, 4200);
    }
    // карточки страниц
    const grid = $("#cards");
    if (!grid) return;
    grid.innerHTML = DATA.quizzes.map((q) => {
      const best = store.get("best." + q.id);
      return `<a class="qcard" href="${q.id}.html">
        <div class="qe">${q.emoji}</div>
        <div class="qt">${esc(q.title)}</div>
        <div class="qm">${q.questions.length} вопросов${best != null ? ` · лучший: <b>${best}%</b>` : ""}</div>
        <div class="qgo">Открыть →</div></a>`;
    }).join("");
    const allBest = store.get("best.all");
    const total = Core.buildAll(DATA.quizzes).length;
    const a = $("#allcount");
    if (a) a.textContent = `${total} уникальных вопросов` + (allBest != null ? ` · лучший: ${allBest}%` : "");
  }

  /* ---------- Вспомогательное ---------- */
  function ansHTML(q) {
    return Core.answerLines(q).map((l) => `<div class="ans-line">${esc(l)}</div>`).join("");
  }
  function imgNote(q) {
    return q.img ? `<div class="img-note">🖼️ ${esc(q.img)} (в оригинале здесь картинка)</div>` : "";
  }
  function pct(a, b) { return b ? Math.round((a / b) * 100) : 0; }
  function verdict(p) {
    if (p === 100) return "Идеально! Ты просто гений 💖";
    if (p >= 85) return "Отлично! Ещё чуть-чуть — и будет 100% 🌟";
    if (p >= 60) return "Хорошо, но давай повторим ошибки 💪";
    return "Не расстраивайся — повторим и всё получится 🌷";
  }

  /* ---------- ТЕСТ ---------- */
  function runTest(root, questions, opts) {
    opts = opts || {};
    const list = Core.shuffle(questions).map(Core.prepare);
    const results = [];
    let idx = 0;

    function question() {
      const q = list[idx];
      const n = list.length;
      let selected = q.t === "order" ? [] : q.t === "match" ? new Array(q.pairs.length).fill("") : [];
      let checked = false;
      const multiN = q.t === "multi" ? q.a.length : 0;

      root.innerHTML = `
        <div class="t-head"><div class="t-prog"><i style="width:${(idx / n) * 100}%"></i></div>
          <div class="t-count">Вопрос ${idx + 1} из ${n}${q.src ? ` · <span class="src">${esc(q.src.join(", "))}</span>` : ""}</div></div>
        <div class="q-box">
          <h3 class="q-text">${esc(Core.clean(q.q))}</h3>${imgNote(q)}
          ${multiN ? `<div class="hint">Выбери ответов: <b>${multiN}</b></div>` : q.t === "match" ? `<div class="hint">Подбери ответ к каждому описанию</div>` : q.t === "order" ? `<div class="hint">Нажимай по порядку, начиная с первого</div>` : ""}
          <div id="body"></div>
          <div id="fb"></div>
          <div class="t-actions"><button class="btn" id="check" disabled>Проверить</button><button class="btn ghost" id="skip" title="Пропустить (засчитается как ошибка)">Не знаю</button></div>
        </div>`;
      const body = $("#body", root), checkBtn = $("#check", root), fb = $("#fb", root);

      const ready = () => {
        if (q.t === "mcq") return selected.length === 1;
        if (q.t === "multi") return selected.length === multiN;
        if (q.t === "match") return selected.every(Boolean);
        return selected.length === q.seq.length;
      };
      const refresh = () => { checkBtn.disabled = checked || !ready(); };

      if (q.t === "mcq" || q.t === "multi") {
        body.innerHTML = q.o.map((o, i) => `<label class="opt" data-v="${i}"><input type="${q.t === "mcq" ? "radio" : "checkbox"}" name="o"><span class="k">${String.fromCharCode(65 + i)}</span><span class="ot">${esc(o)}</span></label>`).join("");
        body.querySelectorAll("label.opt").forEach((lab) => {
          const inp = lab.querySelector("input");
          inp.addEventListener("change", () => {
            if (checked) return;
            selected = [...body.querySelectorAll("input:checked")].map((x) => q.o[+x.closest("label").dataset.v]);
            body.querySelectorAll("label.opt").forEach((l) => l.classList.toggle("sel", l.querySelector("input").checked));
            if (q.t === "multi" && selected.length > multiN) { inp.checked = false; selected = selected.filter((s) => s !== q.o[+lab.dataset.v]); lab.classList.remove("sel"); }
            refresh();
          });
        });
      } else if (q.t === "match") {
        body.innerHTML = q.pairs.map((p, i) => `<div class="mrow"><div class="mdesc">${esc(p[0])}</div>
          <select data-i="${i}"><option value="">— выбери —</option>${q.pool.map((o) => `<option value="${esc(o)}">${esc(o)}</option>`).join("")}</select></div>`).join("");
        body.querySelectorAll("select").forEach((s) => s.addEventListener("change", () => { selected[+s.dataset.i] = s.value; refresh(); }));
      } else if (q.t === "order") {
        const draw = () => {
          body.innerHTML = `<div class="o-seq">${q.seq.map((_, i) => `<div class="o-slot ${selected[i] ? "f" : ""}"><b>${i + 1}</b>${selected[i] ? esc(selected[i]) : ""}</div>`).join("")}</div>
            <div class="o-pool">${q.pool.map((p) => `<button class="chip" ${selected.includes(p) || checked ? "disabled" : ""} data-v="${esc(p)}">${esc(p)}</button>`).join("")}</div>
            <button class="btn ghost small" id="reset" ${checked ? "disabled" : ""}>↺ Сбросить</button>`;
          body.querySelectorAll(".chip").forEach((c) => c.addEventListener("click", () => { selected.push(c.dataset.v); draw(); refresh(); }));
          const r = $("#reset", body); r && r.addEventListener("click", () => { selected = []; draw(); refresh(); });
        };
        draw();
      }

      function finish(skipped) {
        if (checked) return;
        checked = true;
        const ok = skipped ? false : Core.grade(q, selected);
        results.push({ q, ok, given: skipped ? null : selected });
        // подсветка
        if (q.t === "mcq" || q.t === "multi") {
          body.querySelectorAll("label.opt").forEach((l) => {
            const t = q.o[+l.dataset.v];
            l.classList.add("locked");
            if (q.a.includes(t)) l.classList.add("right");
            else if (selected.includes(t)) l.classList.add("wrong");
          });
        } else if (q.t === "match") {
          body.querySelectorAll("select").forEach((s) => {
            s.disabled = true;
            const good = s.value === q.pairs[+s.dataset.i][1];
            s.classList.add(good ? "right" : "wrong");
          });
        } else if (q.t === "order") {
          body.querySelectorAll(".o-slot").forEach((s, i) => s.classList.add(selected[i] === q.seq[i] ? "right" : "wrong"));
          body.querySelectorAll("button").forEach((b) => (b.disabled = true));
        }
        const last = idx === n - 1;
        const noteHTML = q.note ? `<div class="note">${esc(q.note)}</div>` : "";
        fb.innerHTML = ok
          ? `<div class="fb good"><div class="fb-t">Верно! 💖</div>${noteHTML}</div>`
          : `<div class="fb bad"><div class="fb-t">${skipped ? "Запоминаем 📌" : "Почти! Правильный ответ:"}</div>${ansHTML(q)}${noteHTML}</div>`;
        checkBtn.disabled = false;
        checkBtn.textContent = last ? "Результат →" : "Дальше →";
        checkBtn.onclick = () => { idx++; idx < n ? question() : summary(); };
        $("#skip", root).hidden = true;
        checkBtn.focus();
      }
      checkBtn.onclick = () => finish(false);
      $("#skip", root).onclick = () => finish(true);
      refresh();
    }

    function summary() {
      const good = results.filter((r) => r.ok).length;
      const p = pct(good, results.length);
      if (opts.bestKey && !opts.noSave) {
        const prev = store.get("best." + opts.bestKey);
        if (prev == null || p > prev) store.set("best." + opts.bestKey, p);
      }
      const wrong = results.filter((r) => !r.ok);
      root.innerHTML = `
        <div class="sum">
          <div class="ring" style="--p:${p}"><div><b>${p}%</b><small>${good} / ${results.length}</small></div></div>
          <h3>${verdict(p)}</h3>
          <div class="t-actions center">
            <button class="btn" id="again">🔀 Заново (всё перемешается)</button>
            ${wrong.length ? `<button class="btn ghost" id="redo">Повторить ошибки (${wrong.length})</button>` : ""}
          </div>
          ${wrong.length ? `<h4 class="sec">Над чем поработать</h4>${wrong.map((r) => `<div class="mist"><div class="mq">${esc(Core.clean(r.q.q))}</div>${ansHTML(r.q)}</div>`).join("")}` : `<p class="muted">Ни одной ошибки — так держать!</p>`}
        </div>`;
      $("#again", root).onclick = () => runTest(root, questions, opts);
      const redo = $("#redo", root);
      redo && (redo.onclick = () => runTest(root, wrong.map((r) => questions.find((x) => x.q === r.q.q && x.t === r.q.t) || r.q), { ...opts, noSave: true }));
      root.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    question();
  }

  /* ---------- Карточки ---------- */
  function runCards(root, questions) {
    let deck = Core.shuffle(questions);
    const total = deck.length;
    let known = 0, flipped = false;

    function draw() {
      if (!deck.length) {
        root.innerHTML = `<div class="sum"><div class="bigemoji">🎉</div><h3>Ты прошёл все карточки!</h3><p class="muted">${total} из ${total} запомнено. Умничка 💗</p>
          <div class="t-actions center"><button class="btn" id="rs">🔀 Заново</button></div></div>`;
        $("#rs", root).onclick = () => runCards(root, questions);
        return;
      }
      const q = deck[0];
      flipped = false;
      root.innerHTML = `
        <div class="t-head"><div class="t-prog"><i style="width:${(known / total) * 100}%"></i></div>
          <div class="t-count">Запомнено ${known} из ${total} · осталось ${deck.length}</div></div>
        <div class="flip" id="flip" tabindex="0" role="button" aria-label="Перевернуть карточку">
          <div class="flip-in">
            <div class="face front"><small>Вопрос</small><div class="ft">${esc(Core.clean(q.q))}</div>${imgNote(q)}<span class="tap">нажми, чтобы увидеть ответ</span></div>
            <div class="face back"><small>Ответ</small><div class="fa">${ansHTML(q)}</div>${q.note ? `<div class="note">${esc(q.note)}</div>` : ""}</div>
          </div>
        </div>
        <div class="t-actions center">
          <button class="btn ghost" id="no">↻ Ещё раз</button>
          <button class="btn" id="yes">✓ Запомнил</button>
        </div>
        <div class="hint center">Клавиши: пробел — перевернуть · ← ещё раз · → запомнил</div>`;
      const f = $("#flip", root);
      const flip = () => { flipped = !flipped; f.classList.toggle("on", flipped); };
      f.onclick = flip;
      $("#yes", root).onclick = () => { deck.shift(); known++; draw(); };
      $("#no", root).onclick = () => {
        const c = deck.shift();
        deck.splice(Math.min(deck.length, 3 + Math.floor(Math.random() * 3)), 0, c);
        draw();
      };
    }
    // клавиатура (один раз на страницу)
    if (!runCards.bound) {
      runCards.bound = true;
      document.addEventListener("keydown", (e) => {
        const r = $("#flip");
        if (!r || e.target.closest("input,select,textarea")) return;
        if (e.key === " ") { e.preventDefault(); r.click(); }
        if (e.key === "ArrowRight") $("#yes") && $("#yes").click();
        if (e.key === "ArrowLeft") $("#no") && $("#no").click();
      });
    }
    draw();
  }

  /* ---------- Страница квиза ---------- */
  function renderQuiz() {
    const qz = byId(current);
    const main = $("#main");
    if (!qz || !main) return;
    const idx = DATA.quizzes.indexOf(qz);
    const prev = DATA.quizzes[idx - 1], next = DATA.quizzes[idx + 1];
    const best = store.get("best." + qz.id);

    main.innerHTML = `
      <section class="hero-sm"><div class="he">${qz.emoji}</div><h1>${esc(qz.title)}</h1>
        <p>${qz.questions.length} вопросов${best != null ? ` · твой лучший результат: <b>${best}%</b>` : ""}</p></section>
      <div class="tabs" role="tablist">
        <button data-tab="theory" role="tab">📖 Теория</button>
        <button data-tab="cards" role="tab">🃏 Карточки</button>
        <button data-tab="test" role="tab">✅ Тест</button>
        <button data-tab="answers" role="tab">📋 Все ответы</button>
      </div>
      <section id="pane" class="pane"></section>
      <div class="pager">
        ${prev ? `<a href="${prev.id}.html">← ${esc(prev.short)}</a>` : "<span></span>"}
        ${next ? `<a href="${next.id}.html">${esc(next.short)} →</a>` : "<span></span>"}
      </div>`;

    const pane = $("#pane");
    const tabs = [...main.querySelectorAll(".tabs button")];
    function show(tab) {
      if (!["theory", "cards", "test", "answers"].includes(tab)) tab = "theory";
      tabs.forEach((b) => b.classList.toggle("on", b.dataset.tab === tab));
      history.replaceState(null, "", "#" + tab);
      if (tab === "theory") {
        pane.innerHTML = qz.theory.map((s) => `<div class="th"><h3>${esc(s.h)}</h3><ul>${s.items.map((i) => `<li>${i}</li>`).join("")}</ul></div>`).join("") +
          `<div class="t-actions center"><button class="btn" data-go="cards">Учить карточки →</button><button class="btn ghost" data-go="test">Сразу к тесту</button></div>`;
        pane.querySelectorAll("[data-go]").forEach((b) => b.onclick = () => show(b.dataset.go));
      } else if (tab === "cards") {
        runCards(pane, qz.questions);
      } else if (tab === "test") {
        runTest(pane, qz.questions, { bestKey: qz.id });
      } else {
        pane.innerHTML = qz.questions.map((q, i) => `<div class="ans-card"><div class="mq"><b>${i + 1}.</b> ${esc(Core.clean(q.q))}</div>${imgNote(q)}${ansHTML(q)}${q.note ? `<div class="note">${esc(q.note)}</div>` : ""}</div>`).join("");
      }
    }
    tabs.forEach((b) => b.onclick = () => show(b.dataset.tab));
    show((location.hash || "#theory").slice(1));
  }

  /* ---------- Общий тест ---------- */
  function renderAll() {
    const main = $("#main");
    if (!main) return;
    const all = Core.buildAll(DATA.quizzes);
    main.innerHTML = `
      <section class="hero-sm"><div class="he">🎲</div><h1>Общий тест</h1>
        <p>${all.length} уникальных вопросов из всех квизов, Midterm и Endterm. Порядок вопросов и вариантов ответов меняется при каждом запуске.</p></section>
      <div class="tabs"><button data-tab="test" class="on">✅ Тест</button><button data-tab="cards">🃏 Карточки</button></div>
      <div class="setup" id="setup"></div>
      <section id="pane" class="pane"></section>`;
    const pane = $("#pane"), setup = $("#setup");
    const tabs = [...main.querySelectorAll(".tabs button")];
    let tab = "test";

    function pickPool() {
      const ids = [...setup.querySelectorAll("input[type=checkbox]:checked")].map((x) => x.value);
      const pool = Core.buildAll(DATA.quizzes.filter((q) => ids.includes(q.id)));
      return pool;
    }
    function start() {
      const pool = pickPool();
      const lim = +$("#lim", setup).value;
      let q = Core.shuffle(pool);
      if (lim && lim < q.length) q = q.slice(0, lim);
      if (!q.length) { pane.innerHTML = `<p class="muted center">Выбери хотя бы один набор вопросов 💗</p>`; return; }
      const full = q.length === all.length;
      tab === "test" ? runTest(pane, q, { bestKey: full ? "all" : null, noSave: !full }) : runCards(pane, q);
    }
    setup.innerHTML = `
      <details open><summary>⚙️ Что включить в тест</summary>
        <div class="checks">${DATA.quizzes.map((q) => `<label class="chk"><input type="checkbox" value="${q.id}" checked><span>${q.emoji} ${esc(q.short)}</span></label>`).join("")}</div>
        <div class="row"><label>Количество вопросов:
          <select id="lim"><option value="0">Все</option><option value="10">10</option><option value="20">20</option><option value="30">30</option><option value="50">50</option></select></label>
          <button class="btn" id="go">▶ Начать</button></div>
      </details>`;
    $("#go", setup).onclick = start;
    tabs.forEach((b) => b.onclick = () => { tab = b.dataset.tab; tabs.forEach((x) => x.classList.toggle("on", x === b)); start(); });
    start();
  }

  /* ---------- Запуск ---------- */
  renderNav();
  hearts();
  if (page === "home") renderHome();
  if (page === "quiz") renderQuiz();
  if (page === "all") renderAll();
})();
