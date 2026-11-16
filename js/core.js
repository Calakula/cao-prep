/* Чистая логика (без DOM): перемешивание, проверка ответов, дедупликация */
const Core = (function () {
  const shuffle = (a) => {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const clean = (q) => q.replace(/\s*\[Image-based question\]/i, "").trim();

  // Копия вопроса с перемешанным порядком вариантов
  function prepare(q) {
    const c = { ...q };
    if (q.t === "mcq" || q.t === "multi") c.o = shuffle(q.o);
    if (q.t === "match") { c.pairs = shuffle(q.pairs); c.pool = shuffle(q.pool); }
    if (q.t === "order") { c.pool = shuffle(q.seq); }
    return c;
  }

  const sameSet = (a, b) => a.length === b.length && a.every((x) => b.includes(x));

  // ans: mcq/multi -> массив выбранных текстов; match -> массив по индексу пар; order -> массив по порядку
  function grade(q, ans) {
    if (!ans) return false;
    if (q.t === "mcq" || q.t === "multi") return sameSet(ans, q.a);
    if (q.t === "match") return q.pairs.every((p, i) => ans[i] === p[1]);
    if (q.t === "order") return ans.length === q.seq.length && q.seq.every((s, i) => ans[i] === s);
    return false;
  }

  // Правильный ответ строками
  function answerLines(q) {
    if (q.t === "mcq" || q.t === "multi") return q.a.slice();
    if (q.t === "match") return q.pairs.map((p) => p[0] + "  →  " + p[1]);
    if (q.t === "order") return q.seq.map((s, i) => i + 1 + ". " + s);
    return [];
  }

  // Объединить все квизы в один набор без повторов
  function buildAll(quizzes) {
    const map = new Map();
    for (const qz of quizzes) {
      for (const q of qz.questions) {
        const key = q.t + "|" + clean(q.q).toLowerCase() + "|" + (q.t === "mcq" || q.t === "multi" ? q.a.slice().sort().join("~") : "");
        if (map.has(key)) {
          const e = map.get(key);
          if (!e.src.includes(qz.short)) e.src.push(qz.short);
        } else {
          map.set(key, { ...q, src: [qz.short] });
        }
      }
    }
    return [...map.values()];
  }

  return { shuffle, clean, prepare, grade, answerLines, buildAll };
})();
if (typeof module !== "undefined") module.exports = Core;
