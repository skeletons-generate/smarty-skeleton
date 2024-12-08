const d = Math.floor(16.666666666666668);
function b(u, c) {
  const r = new MessageChannel(), f = r.port1, m = r.port2, a = c && c.timeout || -1;
  let e = u, l = 0;
  const p = performance.now();
  let t = 0;
  const i = (n) => {
    l = n + d, e && f.postMessage("task");
  };
  return m.onmessage = () => {
    const n = () => {
      const s = l - performance.now();
      return s > 0 ? s : 0;
    };
    let o = !1;
    if (a > 0 && (o = performance.now() - p > a), !!e) {
      if (n() <= 1 && !o) {
        t = requestAnimationFrame(i);
        return;
      }
      e({
        didTimeout: o,
        timeRemaining: n
      }), e = null;
    }
  }, t = requestAnimationFrame(i), t;
}
const C = () => typeof cancelIdleCallback == "function" ? cancelIdleCallback : typeof cancelAnimationFrame == "function" ? cancelAnimationFrame : () => ({}), k = C(), g = () => typeof requestIdleCallback == "function" ? requestIdleCallback : b, A = g();
export {
  k as cancelIdleCall,
  A as idleCallback
};
