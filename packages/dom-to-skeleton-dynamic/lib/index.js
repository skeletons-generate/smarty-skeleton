const G = Math.floor(16.666666666666668);
function q(u, b) {
  const k = new MessageChannel(), d = k.port1, x = k.port2, T = b && b.timeout || -1;
  let f = u, w = 0;
  const S = performance.now();
  let p = 0;
  const C = (h) => {
    w = h + G, f && d.postMessage("task");
  };
  return x.onmessage = () => {
    const h = () => {
      const m = w - performance.now();
      return m > 0 ? m : 0;
    };
    let E = !1;
    if (T > 0 && (E = performance.now() - S > T), !!f) {
      if (h() <= 1 && !E) {
        p = requestAnimationFrame(C);
        return;
      }
      f({
        didTimeout: E,
        timeRemaining: h
      }), f = null;
    }
  }, p = requestAnimationFrame(C), p;
}
const H = () => typeof requestIdleCallback == "function" ? requestIdleCallback : q, P = H();
function U(u) {
  console.log(u, "root99999", u && u.id, u);
  let b = [{ node: u, skeId: u.id, pid: 0 }], k = !1, d = [], x = "", T = "", f = function(e) {
    const { w: t, h: o, x: r, y: n } = e;
    return [
      "position: fixed",
      `width:${t}%`,
      `height:${o}%`,
      `left:${r}%`,
      `top:${n}%`
    ];
  }, w = function(e) {
    if (e.nodeType !== Node.ELEMENT_NODE)
      return;
    const t = window.getComputedStyle(e);
    return t.background !== "rgba(0, 0, 0, 0)" || t.backgroundImage !== "none" || t.backgroundColor !== "rgba(0, 0, 0, 0)";
  }, S = function(e) {
    if (e.nodeType !== Node.ELEMENT_NODE)
      return;
    const t = window.getComputedStyle(e);
    return t.borderTopColor !== "rgba(0, 0, 0, 0)" || // 或者其他非transparent的颜色
    t.borderRightColor !== "rgba(0, 0, 0, 0)" || t.borderBottomColor !== "rgba(0, 0, 0, 0)" || t.borderLeftColor !== "rgba(0, 0, 0, 0)" || t.borderTopWidth !== "0px" || t.borderRightWidth !== "0px" || t.borderBottomWidth !== "0px" || t.borderLeftWidth !== "0px" || t.borderTopStyle !== "none" || t.borderRightStyle !== "none" || t.borderBottomStyle !== "none" || t.borderLeftStyle !== "none";
  }, p = function(e, t) {
    let { width: o, height: r, top: n, left: s } = e.getBoundingClientRect();
    const { innerWidth: a, innerHeight: i } = window;
    return o > 5 && r > 5 && n < i && s < a && s + o < a ? (o = Number((o / a * 100).toFixed(2)), r = Number((r / i * 100).toFixed(2)), s = Number((s / a * 100).toFixed(2)), n = Number((n / i * 100).toFixed(2)), { w: o, h: r, y: n, x: s }) : null;
  }, C = function({ node: e, skeId: t }) {
    const o = p(e);
    if (!o)
      return null;
    const r = t || "", { borderRadius: n, background: s, backgroundColor: a } = getComputedStyle(
      e,
      null
    ), l = f(o).concat([
      `background-color:${a}`,
      `border-radius:${n}`
    ]).join(";");
    x += `<div data-ske-id="${r}" style="${l}"></div>`;
  }, h = function({ node: e, skeId: t }) {
    const o = p(e);
    if (!o)
      return null;
    const r = t || "", n = f(o), {
      borderRadius: s,
      backgroundColor: a,
      borderWidth: i,
      borderStyle: l,
      borderColor: c
      //变成灰色系列
    } = getComputedStyle(e, null), g = n.concat([
      `background-color:${a}`,
      `border-radius:${s}`
    ]).concat([
      `border-width:${i}`,
      `border-style:${l}`,
      "border-color:#f4f4f4",
      `border-radius:${s}`
    ]).join(";");
    T += `<div  data-ske-id="${r}" style="${g}"></div>`;
  }, E = function({ node: e, skeId: t, pid: o, position: r }) {
    const { borderRadius: n } = getComputedStyle(e, null), s = {
      position: r,
      pid: o,
      skeId: t,
      borderRadius: n
    };
    if (!d.length) {
      d.push(s);
      return;
    }
    const a = d[d.length - 1], { w: i, h: l, x: c, y: g } = a.position, { borderRadius: _ } = a, { w: F, h: W, x: y, y: N } = r, I = Math.abs(c + i - y), $ = Math.abs(g + l - N);
    if (console.log(e.parentElement.className, c + i - y, g + l - N, c, i, g, l, I, $, y, N, "xGapYgap", o, a.pid), (I < 0.5 || $ < 0.5) && o == a.pid) {
      let V = {
        x: Math.min(c, y),
        y: Math.min(g, N),
        w: Math.max(c + i, y + F) - Math.min(c, y),
        h: Math.max(g + l, N + W) - Math.min(g, N)
      };
      d[d.length - 1] = {
        position: V,
        borderRadius: Math.max(_, n),
        //都使用第一个borderRaduis
        skeId: t,
        pid: o
      };
      return;
    }
    d.push(s);
  }, m = function({ node: e, skeId: t, pid: o, isText: r }) {
    if (!e)
      return;
    const n = p(e);
    n && E({ node: e, skeId: t, pid: o, position: n });
  }, v = function({ node: e, skeId: t, pid: o }) {
    e.nodeType === Node.ELEMENT_NODE ? e && m({ node: e, skeId: t, pid: o }) : e.nodeType === Node.TEXT_NODE ? e && m({ node: e.parentElement, skeId: t, pid: o }) : (e.nodeType, Node.COMMENT_NODE);
  }, R = function({ node: e }) {
    let t = !1;
    return e.nodeType != Node.ELEMENT_NODE || (e.childNodes && Array.from(e.childNodes).some((o) => o.nodeType === Node.TEXT_NODE) && (t = !0), e.tagName === "svg" && (t = !0), e.tagName === "A" && (t = !0), (e.tagName === "IMG" || /base64/.test(e.src) || e.tagName === "FIGURE") && (t = !0), (e.tagName === "INPUT" || e.tagName == "TEXTAREA") && (t = !0), e.tagName === "CANVAS" && (t = !0), e.nodeType === Node.ELEMENT_NODE && (e.tagName === "BUTTON" || e.tagName === "A" && e.getAttribute("role") === "button") && (t = !0)), t;
  }, B = function(e) {
    const t = window.getComputedStyle(e);
    return t.display !== "none" && t.visibility !== "hidden" && t.opacity !== "0" && e.offsetWidth > 0 && e.offsetHeight > 0;
  }, D = function({ node: e, skeId: t, pid: o }) {
    if (!e || k || !B(e))
      return;
    if (e.childNodes && Array.from(e.childNodes).some((i) => i.nodeType === Node.TEXT_NODE)) {
      m({ node: e, skeId: t, pid: o, isText: !0 });
      return;
    }
    if (R({ node: e })) {
      m({ node: e, skeId: t, pid: o });
      return;
    }
    if (w(e) && C({ node: e, skeId: t }), S(e) && h({ node: e, skeId: t }), !e.hasChildNodes) {
      v({ node: e, skeId: t, pid: o });
      return;
    }
    const s = e.childNodes, a = o++;
    for (let i = 0; i < s.length; i++) {
      const l = s[i], c = t + l.id;
      b.push({
        node: l,
        skeId: c,
        pid: a
      });
    }
  }, A = function() {
    console.log(d, "SkeBoxes");
    const e = d.reduce((o, r) => {
      const { skeId: n, position: s, borderRadius: a } = r, l = f(s).concat([
        `border-radius:${a}`
      ]);
      return o + `<div data-ske-id="${n || ""}" class="skeleton-common" 
    style="${l.join(";")}" ></div>`;
    }, ""), t = x + T + e;
    return console.log(t, "skesskes"), L(t), O(), t;
  };
  function L(e) {
    if (!e)
      return;
    const t = document.createElement("div");
    t.style.position = "fixed", t.style.zIndex = "1000000", t.innerHTML = e, document.body.append(t);
  }
  function O() {
    const e = document.createElement("style");
    e.innerHTML = `.skeleton-common {
  position: fixed;
  background:#e9e9e9 linear-gradient(90deg, rgba(0, 0, 0, 0.06) 50%, rgba(0, 0, 0, 0.15) 50%, rgba(0, 0, 0, 0.06) 63%);
  background-size: 400% 100%;
  animation-name: loading;
  animation-duration: 1.4s;
  animation-timing-function: ease;
  animation-iteration-count: infinite;
}

@keyframes loading {
  0% {
    background-position: 100% 50%;
  }
  to {
    background-position: 0% 50%;
  }
}

@keyframes opacity {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}
`, document.head.append(e);
  }
  let M = function() {
    if (b.length === 0) {
      A();
      return;
    }
    P((e) => {
      let t;
      for (; (t = b.shift()) && !e.didTimeout && e.timeRemaining() > 0; )
        D(t);
      M();
    });
  };
  M();
}
export {
  U as default
};
