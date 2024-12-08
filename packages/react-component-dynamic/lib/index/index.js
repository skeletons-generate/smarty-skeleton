import "react";
const g = Math.floor(1e3 / 60);
function p(i, e) {
  const t = new MessageChannel(), s = t.port1, r = t.port2, u = e && e.timeout || -1;
  let a = i, d = 0;
  const N = performance.now();
  let l = 0;
  const m = (n) => {
    d = n + g, a && s.postMessage("task");
  };
  return r.onmessage = () => {
    const n = () => {
      const h = d - performance.now();
      return h > 0 ? h : 0;
    };
    let o = !1;
    if (u > 0 && (o = performance.now() - N > u), !!a) {
      if (n() <= 1 && !o) {
        l = requestAnimationFrame(m);
        return;
      }
      a({
        didTimeout: o,
        timeRemaining: n
      }), a = null;
    }
  }, l = requestAnimationFrame(m), l;
}
const f = () => typeof requestIdleCallback == "function" ? requestIdleCallback : p, b = f();
function E(i, e) {
  document.body.appendChild(i), document.head.insertBefore("");
  const s = window.location.origin + window.location.pathname + "-" + e;
  localStorage.setItem(s, JSON.stringify(i && i.outerHTML));
}
class c {
  constructor({ targetNode: e, config: t = {} }) {
    this.targetNode = e.cloneNode(!0), this.nodeQueue = [this.targetNode], this.isInterrupted = !1, this.id = this.targetNode.id, this.config = t, this.minWidth = t.minWidth || 10, this.minHeight = t.minHeight || 10, this.minGap = t.minGap || 0.5, this.defaultBgColor = t.defaultBgColor;
  }
  interrupt() {
    this.isInterrupted = !0;
  }
  saveSkeleton() {
    this.isInterrupted || E(this.targetNode, this.id);
  }
  isBackgroundSet(e) {
    if (e.nodeType !== Node.ELEMENT_NODE)
      return;
    const t = window.getComputedStyle(e);
    return t.background !== "rgba(0, 0, 0, 0)" || t.backgroundImage !== "none" || t.backgroundColor !== "rgba(0, 0, 0, 0)";
  }
  handleLeafNode(e) {
    e.nodeType === Node.ELEMENT_NODE ? e && this.addClassNames(e, ["ske-bg"]) : e.nodeType === Node.TEXT_NODE ? e && this.addClassNames(e.parentElement, ["ske-bg"]) : (e.nodeType, Node.COMMENT_NODE);
  }
  addClassNames(e, t) {
    Array.from(e.parentElement.classList || []).includes("ske-bg") || e.classList.add(...t);
  }
  handleIsInEnumableTags(e) {
    let t = !1;
    if (e.nodeType !== Node.ELEMENT_NODE)
      return t;
    if (e.childNodes && Array.from(e.childNodes).some(
      (s) => s.nodeType === Node.TEXT_NODE && !!s.nodeValue.trim()
    )) {
      this.addClassNames(e, ["ske-bg"]);
      const s = getComputedStyle(e);
      e.style.display = s.display, t = !0;
    }
    if (["SVG"].includes(e.tagName.toUpperCase()) && (this.addClassNames(e, ["ske-bg"]), e.innerHTML = "", t = !0), ["I", "TH", "TD", "A", "CANVAS"].includes(e.tagName.toUpperCase()) && (this.addClassNames(e, ["ske-bg"]), t = !0), (e.tagName === "IMG" || /base64/.test(e.src) || e.tagName === "FIGURE") && (e.removeAttribute("src"), this.addClassNames(e, ["ske-bg", "ske-btn"]), t = !0), e.tagName === "SPAN") {
      this.addClassNames(e, ["ske-bg"]);
      const s = getComputedStyle(e);
      e.style.display = s.display, t = !0;
    }
    return ["LABEL", "INPUT"].includes(e.tagName) && (this.addClassNames(e, ["ske-bg", "ske-input"]), t = !0), e.nodeType === Node.ELEMENT_NODE && (e.tagName === "BUTTON" || e.tagName === "A" && e.getAttribute("role") === "button") && (this.addClassNames(e, ["ske-bg", "ske-btn"]), t = !0), e.tagName === "TEXTAREA" && (this.addClassNames(e, ["ske-bg", "ske-btn"]), t = !0), t;
  }
  getIsVisible(e) {
    const t = window.getComputedStyle(e);
    return t.display !== "none" && t.visibility !== "hidden" && t.opacity !== "0";
  }
  performTraverseNode(e) {
    if (!e || this.isInterrupted || e.nodeType !== Node.ELEMENT_NODE || !this.getIsVisible(e))
      return;
    if (this.handleIsInEnumableTags(e), !e.hasChildNodes) {
      this.handleLeafNode(e);
      return;
    }
    const s = e.childNodes;
    for (let r = 0; r < s.length; r++)
      this.nodeQueue.push(s[r]);
  }
  performWorkUnit() {
    if (!this.isInterrupted) {
      if (this.nodeQueue.length === 0) {
        this.saveSkeleton();
        return;
      }
      b((e) => {
        for (console.log(e, "deadline123"); this.nodeQueue.length && !e.didTimeout && e.timeRemaining() > 0; ) {
          const t = this.nodeQueue.shift();
          this.performTraverseNode(t);
        }
        this.performWorkUnit();
      });
    }
  }
}
const y = c = (i) => {
  const e = document.getElementById(i);
  e && new c({ targetNode: e }).performWorkUnit();
};
export {
  y as default
};
