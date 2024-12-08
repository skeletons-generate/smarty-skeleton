var Ut = Object.defineProperty;
var Yt = (O, u, l) => u in O ? Ut(O, u, { enumerable: !0, configurable: !0, writable: !0, value: l }) : O[u] = l;
var k = (O, u, l) => Yt(O, typeof u != "symbol" ? u + "" : u, l);
import ye, { useEffect as zt } from "react";
const Ht = Math.floor(1e3 / 60);
function Vt(O, u) {
  const l = new MessageChannel(), m = l.port1, S = l.port2, p = u && u.timeout || -1;
  let _ = O, b = 0;
  const I = performance.now();
  let N = 0;
  const B = (h) => {
    b = h + Ht, _ && m.postMessage("task");
  };
  return S.onmessage = () => {
    const h = () => {
      const A = b - performance.now();
      return A > 0 ? A : 0;
    };
    let y = !1;
    if (p > 0 && (y = performance.now() - I > p), !!_) {
      if (h() <= 1 && !y) {
        N = requestAnimationFrame(B);
        return;
      }
      _({
        didTimeout: y,
        timeRemaining: h
      }), _ = null;
    }
  }, N = requestAnimationFrame(B), N;
}
const Gt = () => typeof requestIdleCallback == "function" ? requestIdleCallback : Vt, Qt = Gt();
var ae = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Kt(O) {
  return O && O.__esModule && Object.prototype.hasOwnProperty.call(O, "default") ? O.default : O;
}
function se(O) {
  throw new Error('Could not dynamically require "' + O + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var ke = { exports: {} };
/*!
    localForage -- Offline Storage, Improved
    Version 1.10.0
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/
(function(O, u) {
  (function(l) {
    O.exports = l();
  })(function() {
    return function l(m, S, p) {
      function _(N, B) {
        if (!S[N]) {
          if (!m[N]) {
            var h = typeof se == "function" && se;
            if (!B && h) return h(N, !0);
            if (b) return b(N, !0);
            var y = new Error("Cannot find module '" + N + "'");
            throw y.code = "MODULE_NOT_FOUND", y;
          }
          var A = S[N] = { exports: {} };
          m[N][0].call(A.exports, function(L) {
            var W = m[N][1][L];
            return _(W || L);
          }, A, A.exports, l, m, S, p);
        }
        return S[N].exports;
      }
      for (var b = typeof se == "function" && se, I = 0; I < p.length; I++) _(p[I]);
      return _;
    }({ 1: [function(l, m, S) {
      (function(p) {
        var _ = p.MutationObserver || p.WebKitMutationObserver, b;
        if (_) {
          var I = 0, N = new _(L), B = p.document.createTextNode("");
          N.observe(B, {
            characterData: !0
          }), b = function() {
            B.data = I = ++I % 2;
          };
        } else if (!p.setImmediate && typeof p.MessageChannel < "u") {
          var h = new p.MessageChannel();
          h.port1.onmessage = L, b = function() {
            h.port2.postMessage(0);
          };
        } else "document" in p && "onreadystatechange" in p.document.createElement("script") ? b = function() {
          var C = p.document.createElement("script");
          C.onreadystatechange = function() {
            L(), C.onreadystatechange = null, C.parentNode.removeChild(C), C = null;
          }, p.document.documentElement.appendChild(C);
        } : b = function() {
          setTimeout(L, 0);
        };
        var y, A = [];
        function L() {
          y = !0;
          for (var C, V, M = A.length; M; ) {
            for (V = A, A = [], C = -1; ++C < M; )
              V[C]();
            M = A.length;
          }
          y = !1;
        }
        m.exports = W;
        function W(C) {
          A.push(C) === 1 && !y && b();
        }
      }).call(this, typeof ae < "u" ? ae : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, {}], 2: [function(l, m, S) {
      var p = l(1);
      function _() {
      }
      var b = {}, I = ["REJECTED"], N = ["FULFILLED"], B = ["PENDING"];
      m.exports = h;
      function h(v) {
        if (typeof v != "function")
          throw new TypeError("resolver must be a function");
        this.state = B, this.queue = [], this.outcome = void 0, v !== _ && W(this, v);
      }
      h.prototype.catch = function(v) {
        return this.then(null, v);
      }, h.prototype.then = function(v, T) {
        if (typeof v != "function" && this.state === N || typeof T != "function" && this.state === I)
          return this;
        var w = new this.constructor(_);
        if (this.state !== B) {
          var D = this.state === N ? v : T;
          A(w, D, this.outcome);
        } else
          this.queue.push(new y(w, v, T));
        return w;
      };
      function y(v, T, w) {
        this.promise = v, typeof T == "function" && (this.onFulfilled = T, this.callFulfilled = this.otherCallFulfilled), typeof w == "function" && (this.onRejected = w, this.callRejected = this.otherCallRejected);
      }
      y.prototype.callFulfilled = function(v) {
        b.resolve(this.promise, v);
      }, y.prototype.otherCallFulfilled = function(v) {
        A(this.promise, this.onFulfilled, v);
      }, y.prototype.callRejected = function(v) {
        b.reject(this.promise, v);
      }, y.prototype.otherCallRejected = function(v) {
        A(this.promise, this.onRejected, v);
      };
      function A(v, T, w) {
        p(function() {
          var D;
          try {
            D = T(w);
          } catch ($) {
            return b.reject(v, $);
          }
          D === v ? b.reject(v, new TypeError("Cannot resolve promise with itself")) : b.resolve(v, D);
        });
      }
      b.resolve = function(v, T) {
        var w = C(L, T);
        if (w.status === "error")
          return b.reject(v, w.value);
        var D = w.value;
        if (D)
          W(v, D);
        else {
          v.state = N, v.outcome = T;
          for (var $ = -1, U = v.queue.length; ++$ < U; )
            v.queue[$].callFulfilled(T);
        }
        return v;
      }, b.reject = function(v, T) {
        v.state = I, v.outcome = T;
        for (var w = -1, D = v.queue.length; ++w < D; )
          v.queue[w].callRejected(T);
        return v;
      };
      function L(v) {
        var T = v && v.then;
        if (v && (typeof v == "object" || typeof v == "function") && typeof T == "function")
          return function() {
            T.apply(v, arguments);
          };
      }
      function W(v, T) {
        var w = !1;
        function D(z) {
          w || (w = !0, b.reject(v, z));
        }
        function $(z) {
          w || (w = !0, b.resolve(v, z));
        }
        function U() {
          T($, D);
        }
        var Y = C(U);
        Y.status === "error" && D(Y.value);
      }
      function C(v, T) {
        var w = {};
        try {
          w.value = v(T), w.status = "success";
        } catch (D) {
          w.status = "error", w.value = D;
        }
        return w;
      }
      h.resolve = V;
      function V(v) {
        return v instanceof this ? v : b.resolve(new this(_), v);
      }
      h.reject = M;
      function M(v) {
        var T = new this(_);
        return b.reject(T, v);
      }
      h.all = Z;
      function Z(v) {
        var T = this;
        if (Object.prototype.toString.call(v) !== "[object Array]")
          return this.reject(new TypeError("must be an array"));
        var w = v.length, D = !1;
        if (!w)
          return this.resolve([]);
        for (var $ = new Array(w), U = 0, Y = -1, z = new this(_); ++Y < w; )
          G(v[Y], Y);
        return z;
        function G(ee, ne) {
          T.resolve(ee).then(ue, function(J) {
            D || (D = !0, b.reject(z, J));
          });
          function ue(J) {
            $[ne] = J, ++U === w && !D && (D = !0, b.resolve(z, $));
          }
        }
      }
      h.race = j;
      function j(v) {
        var T = this;
        if (Object.prototype.toString.call(v) !== "[object Array]")
          return this.reject(new TypeError("must be an array"));
        var w = v.length, D = !1;
        if (!w)
          return this.resolve([]);
        for (var $ = -1, U = new this(_); ++$ < w; )
          Y(v[$]);
        return U;
        function Y(z) {
          T.resolve(z).then(function(G) {
            D || (D = !0, b.resolve(U, G));
          }, function(G) {
            D || (D = !0, b.reject(U, G));
          });
        }
      }
    }, { 1: 1 }], 3: [function(l, m, S) {
      (function(p) {
        typeof p.Promise != "function" && (p.Promise = l(2));
      }).call(this, typeof ae < "u" ? ae : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, { 2: 2 }], 4: [function(l, m, S) {
      var p = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
        return typeof e;
      } : function(e) {
        return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      };
      function _(e, r) {
        if (!(e instanceof r))
          throw new TypeError("Cannot call a class as a function");
      }
      function b() {
        try {
          if (typeof indexedDB < "u")
            return indexedDB;
          if (typeof webkitIndexedDB < "u")
            return webkitIndexedDB;
          if (typeof mozIndexedDB < "u")
            return mozIndexedDB;
          if (typeof OIndexedDB < "u")
            return OIndexedDB;
          if (typeof msIndexedDB < "u")
            return msIndexedDB;
        } catch {
          return;
        }
      }
      var I = b();
      function N() {
        try {
          if (!I || !I.open)
            return !1;
          var e = typeof openDatabase < "u" && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform), r = typeof fetch == "function" && fetch.toString().indexOf("[native code") !== -1;
          return (!e || r) && typeof indexedDB < "u" && // some outdated implementations of IDB that appear on Samsung
          // and HTC Android devices <4.4 are missing IDBKeyRange
          // See: https://github.com/mozilla/localForage/issues/128
          // See: https://github.com/mozilla/localForage/issues/272
          typeof IDBKeyRange < "u";
        } catch {
          return !1;
        }
      }
      function B(e, r) {
        e = e || [], r = r || {};
        try {
          return new Blob(e, r);
        } catch (n) {
          if (n.name !== "TypeError")
            throw n;
          for (var t = typeof BlobBuilder < "u" ? BlobBuilder : typeof MSBlobBuilder < "u" ? MSBlobBuilder : typeof MozBlobBuilder < "u" ? MozBlobBuilder : WebKitBlobBuilder, o = new t(), i = 0; i < e.length; i += 1)
            o.append(e[i]);
          return o.getBlob(r.type);
        }
      }
      typeof Promise > "u" && l(3);
      var h = Promise;
      function y(e, r) {
        r && e.then(function(t) {
          r(null, t);
        }, function(t) {
          r(t);
        });
      }
      function A(e, r, t) {
        typeof r == "function" && e.then(r), typeof t == "function" && e.catch(t);
      }
      function L(e) {
        return typeof e != "string" && (console.warn(e + " used as a key, but it is not a string."), e = String(e)), e;
      }
      function W() {
        if (arguments.length && typeof arguments[arguments.length - 1] == "function")
          return arguments[arguments.length - 1];
      }
      var C = "local-forage-detect-blob-support", V = void 0, M = {}, Z = Object.prototype.toString, j = "readonly", v = "readwrite";
      function T(e) {
        for (var r = e.length, t = new ArrayBuffer(r), o = new Uint8Array(t), i = 0; i < r; i++)
          o[i] = e.charCodeAt(i);
        return t;
      }
      function w(e) {
        return new h(function(r) {
          var t = e.transaction(C, v), o = B([""]);
          t.objectStore(C).put(o, "key"), t.onabort = function(i) {
            i.preventDefault(), i.stopPropagation(), r(!1);
          }, t.oncomplete = function() {
            var i = navigator.userAgent.match(/Chrome\/(\d+)/), n = navigator.userAgent.match(/Edge\//);
            r(n || !i || parseInt(i[1], 10) >= 43);
          };
        }).catch(function() {
          return !1;
        });
      }
      function D(e) {
        return typeof V == "boolean" ? h.resolve(V) : w(e).then(function(r) {
          return V = r, V;
        });
      }
      function $(e) {
        var r = M[e.name], t = {};
        t.promise = new h(function(o, i) {
          t.resolve = o, t.reject = i;
        }), r.deferredOperations.push(t), r.dbReady ? r.dbReady = r.dbReady.then(function() {
          return t.promise;
        }) : r.dbReady = t.promise;
      }
      function U(e) {
        var r = M[e.name], t = r.deferredOperations.pop();
        if (t)
          return t.resolve(), t.promise;
      }
      function Y(e, r) {
        var t = M[e.name], o = t.deferredOperations.pop();
        if (o)
          return o.reject(r), o.promise;
      }
      function z(e, r) {
        return new h(function(t, o) {
          if (M[e.name] = M[e.name] || _e(), e.db)
            if (r)
              $(e), e.db.close();
            else
              return t(e.db);
          var i = [e.name];
          r && i.push(e.version);
          var n = I.open.apply(I, i);
          r && (n.onupgradeneeded = function(a) {
            var s = n.result;
            try {
              s.createObjectStore(e.storeName), a.oldVersion <= 1 && s.createObjectStore(C);
            } catch (f) {
              if (f.name === "ConstraintError")
                console.warn('The database "' + e.name + '" has been upgraded from version ' + a.oldVersion + " to version " + a.newVersion + ', but the storage "' + e.storeName + '" already exists.');
              else
                throw f;
            }
          }), n.onerror = function(a) {
            a.preventDefault(), o(n.error);
          }, n.onsuccess = function() {
            var a = n.result;
            a.onversionchange = function(s) {
              s.target.close();
            }, t(a), U(e);
          };
        });
      }
      function G(e) {
        return z(e, !1);
      }
      function ee(e) {
        return z(e, !0);
      }
      function ne(e, r) {
        if (!e.db)
          return !0;
        var t = !e.db.objectStoreNames.contains(e.storeName), o = e.version < e.db.version, i = e.version > e.db.version;
        if (o && (e.version !== r && console.warn('The database "' + e.name + `" can't be downgraded from version ` + e.db.version + " to version " + e.version + "."), e.version = e.db.version), i || t) {
          if (t) {
            var n = e.db.version + 1;
            n > e.version && (e.version = n);
          }
          return !0;
        }
        return !1;
      }
      function ue(e) {
        return new h(function(r, t) {
          var o = new FileReader();
          o.onerror = t, o.onloadend = function(i) {
            var n = btoa(i.target.result || "");
            r({
              __local_forage_encoded_blob: !0,
              data: n,
              type: e.type
            });
          }, o.readAsBinaryString(e);
        });
      }
      function J(e) {
        var r = T(atob(e.data));
        return B([r], { type: e.type });
      }
      function be(e) {
        return e && e.__local_forage_encoded_blob;
      }
      function Ye(e) {
        var r = this, t = r._initReady().then(function() {
          var o = M[r._dbInfo.name];
          if (o && o.dbReady)
            return o.dbReady;
        });
        return A(t, e, e), t;
      }
      function ze(e) {
        $(e);
        for (var r = M[e.name], t = r.forages, o = 0; o < t.length; o++) {
          var i = t[o];
          i._dbInfo.db && (i._dbInfo.db.close(), i._dbInfo.db = null);
        }
        return e.db = null, G(e).then(function(n) {
          return e.db = n, ne(e) ? ee(e) : n;
        }).then(function(n) {
          e.db = r.db = n;
          for (var a = 0; a < t.length; a++)
            t[a]._dbInfo.db = n;
        }).catch(function(n) {
          throw Y(e, n), n;
        });
      }
      function Q(e, r, t, o) {
        o === void 0 && (o = 1);
        try {
          var i = e.db.transaction(e.storeName, r);
          t(null, i);
        } catch (n) {
          if (o > 0 && (!e.db || n.name === "InvalidStateError" || n.name === "NotFoundError"))
            return h.resolve().then(function() {
              if (!e.db || n.name === "NotFoundError" && !e.db.objectStoreNames.contains(e.storeName) && e.version <= e.db.version)
                return e.db && (e.version = e.db.version + 1), ee(e);
            }).then(function() {
              return ze(e).then(function() {
                Q(e, r, t, o - 1);
              });
            }).catch(t);
          t(n);
        }
      }
      function _e() {
        return {
          // Running localForages sharing a database.
          forages: [],
          // Shared database.
          db: null,
          // Database readiness (promise).
          dbReady: null,
          // Deferred operations on the database.
          deferredOperations: []
        };
      }
      function He(e) {
        var r = this, t = {
          db: null
        };
        if (e)
          for (var o in e)
            t[o] = e[o];
        var i = M[t.name];
        i || (i = _e(), M[t.name] = i), i.forages.push(r), r._initReady || (r._initReady = r.ready, r.ready = Ye);
        var n = [];
        function a() {
          return h.resolve();
        }
        for (var s = 0; s < i.forages.length; s++) {
          var f = i.forages[s];
          f !== r && n.push(f._initReady().catch(a));
        }
        var c = i.forages.slice(0);
        return h.all(n).then(function() {
          return t.db = i.db, G(t);
        }).then(function(d) {
          return t.db = d, ne(t, r._defaultConfig.version) ? ee(t) : d;
        }).then(function(d) {
          t.db = i.db = d, r._dbInfo = t;
          for (var g = 0; g < c.length; g++) {
            var E = c[g];
            E !== r && (E._dbInfo.db = t.db, E._dbInfo.version = t.version);
          }
        });
      }
      function Ve(e, r) {
        var t = this;
        e = L(e);
        var o = new h(function(i, n) {
          t.ready().then(function() {
            Q(t._dbInfo, j, function(a, s) {
              if (a)
                return n(a);
              try {
                var f = s.objectStore(t._dbInfo.storeName), c = f.get(e);
                c.onsuccess = function() {
                  var d = c.result;
                  d === void 0 && (d = null), be(d) && (d = J(d)), i(d);
                }, c.onerror = function() {
                  n(c.error);
                };
              } catch (d) {
                n(d);
              }
            });
          }).catch(n);
        });
        return y(o, r), o;
      }
      function Ge(e, r) {
        var t = this, o = new h(function(i, n) {
          t.ready().then(function() {
            Q(t._dbInfo, j, function(a, s) {
              if (a)
                return n(a);
              try {
                var f = s.objectStore(t._dbInfo.storeName), c = f.openCursor(), d = 1;
                c.onsuccess = function() {
                  var g = c.result;
                  if (g) {
                    var E = g.value;
                    be(E) && (E = J(E));
                    var R = e(E, g.key, d++);
                    R !== void 0 ? i(R) : g.continue();
                  } else
                    i();
                }, c.onerror = function() {
                  n(c.error);
                };
              } catch (g) {
                n(g);
              }
            });
          }).catch(n);
        });
        return y(o, r), o;
      }
      function Qe(e, r, t) {
        var o = this;
        e = L(e);
        var i = new h(function(n, a) {
          var s;
          o.ready().then(function() {
            return s = o._dbInfo, Z.call(r) === "[object Blob]" ? D(s.db).then(function(f) {
              return f ? r : ue(r);
            }) : r;
          }).then(function(f) {
            Q(o._dbInfo, v, function(c, d) {
              if (c)
                return a(c);
              try {
                var g = d.objectStore(o._dbInfo.storeName);
                f === null && (f = void 0);
                var E = g.put(f, e);
                d.oncomplete = function() {
                  f === void 0 && (f = null), n(f);
                }, d.onabort = d.onerror = function() {
                  var R = E.error ? E.error : E.transaction.error;
                  a(R);
                };
              } catch (R) {
                a(R);
              }
            });
          }).catch(a);
        });
        return y(i, t), i;
      }
      function Ke(e, r) {
        var t = this;
        e = L(e);
        var o = new h(function(i, n) {
          t.ready().then(function() {
            Q(t._dbInfo, v, function(a, s) {
              if (a)
                return n(a);
              try {
                var f = s.objectStore(t._dbInfo.storeName), c = f.delete(e);
                s.oncomplete = function() {
                  i();
                }, s.onerror = function() {
                  n(c.error);
                }, s.onabort = function() {
                  var d = c.error ? c.error : c.transaction.error;
                  n(d);
                };
              } catch (d) {
                n(d);
              }
            });
          }).catch(n);
        });
        return y(o, r), o;
      }
      function Xe(e) {
        var r = this, t = new h(function(o, i) {
          r.ready().then(function() {
            Q(r._dbInfo, v, function(n, a) {
              if (n)
                return i(n);
              try {
                var s = a.objectStore(r._dbInfo.storeName), f = s.clear();
                a.oncomplete = function() {
                  o();
                }, a.onabort = a.onerror = function() {
                  var c = f.error ? f.error : f.transaction.error;
                  i(c);
                };
              } catch (c) {
                i(c);
              }
            });
          }).catch(i);
        });
        return y(t, e), t;
      }
      function je(e) {
        var r = this, t = new h(function(o, i) {
          r.ready().then(function() {
            Q(r._dbInfo, j, function(n, a) {
              if (n)
                return i(n);
              try {
                var s = a.objectStore(r._dbInfo.storeName), f = s.count();
                f.onsuccess = function() {
                  o(f.result);
                }, f.onerror = function() {
                  i(f.error);
                };
              } catch (c) {
                i(c);
              }
            });
          }).catch(i);
        });
        return y(t, e), t;
      }
      function Je(e, r) {
        var t = this, o = new h(function(i, n) {
          if (e < 0) {
            i(null);
            return;
          }
          t.ready().then(function() {
            Q(t._dbInfo, j, function(a, s) {
              if (a)
                return n(a);
              try {
                var f = s.objectStore(t._dbInfo.storeName), c = !1, d = f.openKeyCursor();
                d.onsuccess = function() {
                  var g = d.result;
                  if (!g) {
                    i(null);
                    return;
                  }
                  e === 0 || c ? i(g.key) : (c = !0, g.advance(e));
                }, d.onerror = function() {
                  n(d.error);
                };
              } catch (g) {
                n(g);
              }
            });
          }).catch(n);
        });
        return y(o, r), o;
      }
      function qe(e) {
        var r = this, t = new h(function(o, i) {
          r.ready().then(function() {
            Q(r._dbInfo, j, function(n, a) {
              if (n)
                return i(n);
              try {
                var s = a.objectStore(r._dbInfo.storeName), f = s.openKeyCursor(), c = [];
                f.onsuccess = function() {
                  var d = f.result;
                  if (!d) {
                    o(c);
                    return;
                  }
                  c.push(d.key), d.continue();
                }, f.onerror = function() {
                  i(f.error);
                };
              } catch (d) {
                i(d);
              }
            });
          }).catch(i);
        });
        return y(t, e), t;
      }
      function Ze(e, r) {
        r = W.apply(this, arguments);
        var t = this.config();
        e = typeof e != "function" && e || {}, e.name || (e.name = e.name || t.name, e.storeName = e.storeName || t.storeName);
        var o = this, i;
        if (!e.name)
          i = h.reject("Invalid arguments");
        else {
          var n = e.name === t.name && o._dbInfo.db, a = n ? h.resolve(o._dbInfo.db) : G(e).then(function(s) {
            var f = M[e.name], c = f.forages;
            f.db = s;
            for (var d = 0; d < c.length; d++)
              c[d]._dbInfo.db = s;
            return s;
          });
          e.storeName ? i = a.then(function(s) {
            if (s.objectStoreNames.contains(e.storeName)) {
              var f = s.version + 1;
              $(e);
              var c = M[e.name], d = c.forages;
              s.close();
              for (var g = 0; g < d.length; g++) {
                var E = d[g];
                E._dbInfo.db = null, E._dbInfo.version = f;
              }
              var R = new h(function(x, F) {
                var P = I.open(e.name, f);
                P.onerror = function(H) {
                  var re = P.result;
                  re.close(), F(H);
                }, P.onupgradeneeded = function() {
                  var H = P.result;
                  H.deleteObjectStore(e.storeName);
                }, P.onsuccess = function() {
                  var H = P.result;
                  H.close(), x(H);
                };
              });
              return R.then(function(x) {
                c.db = x;
                for (var F = 0; F < d.length; F++) {
                  var P = d[F];
                  P._dbInfo.db = x, U(P._dbInfo);
                }
              }).catch(function(x) {
                throw (Y(e, x) || h.resolve()).catch(function() {
                }), x;
              });
            }
          }) : i = a.then(function(s) {
            $(e);
            var f = M[e.name], c = f.forages;
            s.close();
            for (var d = 0; d < c.length; d++) {
              var g = c[d];
              g._dbInfo.db = null;
            }
            var E = new h(function(R, x) {
              var F = I.deleteDatabase(e.name);
              F.onerror = function() {
                var P = F.result;
                P && P.close(), x(F.error);
              }, F.onblocked = function() {
                console.warn('dropInstance blocked for database "' + e.name + '" until all open connections are closed');
              }, F.onsuccess = function() {
                var P = F.result;
                P && P.close(), R(P);
              };
            });
            return E.then(function(R) {
              f.db = R;
              for (var x = 0; x < c.length; x++) {
                var F = c[x];
                U(F._dbInfo);
              }
            }).catch(function(R) {
              throw (Y(e, R) || h.resolve()).catch(function() {
              }), R;
            });
          });
        }
        return y(i, r), i;
      }
      var et = {
        _driver: "asyncStorage",
        _initStorage: He,
        _support: N(),
        iterate: Ge,
        getItem: Ve,
        setItem: Qe,
        removeItem: Ke,
        clear: Xe,
        length: je,
        key: Je,
        keys: qe,
        dropInstance: Ze
      };
      function tt() {
        return typeof openDatabase == "function";
      }
      var K = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", rt = "~~local_forage_type~", Ee = /^~~local_forage_type~([^~]+)~/, oe = "__lfsc__:", fe = oe.length, ce = "arbf", le = "blob", we = "si08", Se = "ui08", Ie = "uic8", Ne = "si16", Te = "si32", Re = "ur16", xe = "ui32", De = "fl32", Ae = "fl64", Be = fe + ce.length, Ce = Object.prototype.toString;
      function Oe(e) {
        var r = e.length * 0.75, t = e.length, o, i = 0, n, a, s, f;
        e[e.length - 1] === "=" && (r--, e[e.length - 2] === "=" && r--);
        var c = new ArrayBuffer(r), d = new Uint8Array(c);
        for (o = 0; o < t; o += 4)
          n = K.indexOf(e[o]), a = K.indexOf(e[o + 1]), s = K.indexOf(e[o + 2]), f = K.indexOf(e[o + 3]), d[i++] = n << 2 | a >> 4, d[i++] = (a & 15) << 4 | s >> 2, d[i++] = (s & 3) << 6 | f & 63;
        return c;
      }
      function de(e) {
        var r = new Uint8Array(e), t = "", o;
        for (o = 0; o < r.length; o += 3)
          t += K[r[o] >> 2], t += K[(r[o] & 3) << 4 | r[o + 1] >> 4], t += K[(r[o + 1] & 15) << 2 | r[o + 2] >> 6], t += K[r[o + 2] & 63];
        return r.length % 3 === 2 ? t = t.substring(0, t.length - 1) + "=" : r.length % 3 === 1 && (t = t.substring(0, t.length - 2) + "=="), t;
      }
      function nt(e, r) {
        var t = "";
        if (e && (t = Ce.call(e)), e && (t === "[object ArrayBuffer]" || e.buffer && Ce.call(e.buffer) === "[object ArrayBuffer]")) {
          var o, i = oe;
          e instanceof ArrayBuffer ? (o = e, i += ce) : (o = e.buffer, t === "[object Int8Array]" ? i += we : t === "[object Uint8Array]" ? i += Se : t === "[object Uint8ClampedArray]" ? i += Ie : t === "[object Int16Array]" ? i += Ne : t === "[object Uint16Array]" ? i += Re : t === "[object Int32Array]" ? i += Te : t === "[object Uint32Array]" ? i += xe : t === "[object Float32Array]" ? i += De : t === "[object Float64Array]" ? i += Ae : r(new Error("Failed to get type for BinaryArray"))), r(i + de(o));
        } else if (t === "[object Blob]") {
          var n = new FileReader();
          n.onload = function() {
            var a = rt + e.type + "~" + de(this.result);
            r(oe + le + a);
          }, n.readAsArrayBuffer(e);
        } else
          try {
            r(JSON.stringify(e));
          } catch (a) {
            console.error("Couldn't convert value into a JSON string: ", e), r(null, a);
          }
      }
      function ot(e) {
        if (e.substring(0, fe) !== oe)
          return JSON.parse(e);
        var r = e.substring(Be), t = e.substring(fe, Be), o;
        if (t === le && Ee.test(r)) {
          var i = r.match(Ee);
          o = i[1], r = r.substring(i[0].length);
        }
        var n = Oe(r);
        switch (t) {
          case ce:
            return n;
          case le:
            return B([n], { type: o });
          case we:
            return new Int8Array(n);
          case Se:
            return new Uint8Array(n);
          case Ie:
            return new Uint8ClampedArray(n);
          case Ne:
            return new Int16Array(n);
          case Re:
            return new Uint16Array(n);
          case Te:
            return new Int32Array(n);
          case xe:
            return new Uint32Array(n);
          case De:
            return new Float32Array(n);
          case Ae:
            return new Float64Array(n);
          default:
            throw new Error("Unkown type: " + t);
        }
      }
      var he = {
        serialize: nt,
        deserialize: ot,
        stringToBuffer: Oe,
        bufferToString: de
      };
      function Le(e, r, t, o) {
        e.executeSql("CREATE TABLE IF NOT EXISTS " + r.storeName + " (id INTEGER PRIMARY KEY, key unique, value)", [], t, o);
      }
      function it(e) {
        var r = this, t = {
          db: null
        };
        if (e)
          for (var o in e)
            t[o] = typeof e[o] != "string" ? e[o].toString() : e[o];
        var i = new h(function(n, a) {
          try {
            t.db = openDatabase(t.name, String(t.version), t.description, t.size);
          } catch (s) {
            return a(s);
          }
          t.db.transaction(function(s) {
            Le(s, t, function() {
              r._dbInfo = t, n();
            }, function(f, c) {
              a(c);
            });
          }, a);
        });
        return t.serializer = he, i;
      }
      function X(e, r, t, o, i, n) {
        e.executeSql(t, o, i, function(a, s) {
          s.code === s.SYNTAX_ERR ? a.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?", [r.storeName], function(f, c) {
            c.rows.length ? n(f, s) : Le(f, r, function() {
              f.executeSql(t, o, i, n);
            }, n);
          }, n) : n(a, s);
        }, n);
      }
      function at(e, r) {
        var t = this;
        e = L(e);
        var o = new h(function(i, n) {
          t.ready().then(function() {
            var a = t._dbInfo;
            a.db.transaction(function(s) {
              X(s, a, "SELECT * FROM " + a.storeName + " WHERE key = ? LIMIT 1", [e], function(f, c) {
                var d = c.rows.length ? c.rows.item(0).value : null;
                d && (d = a.serializer.deserialize(d)), i(d);
              }, function(f, c) {
                n(c);
              });
            });
          }).catch(n);
        });
        return y(o, r), o;
      }
      function st(e, r) {
        var t = this, o = new h(function(i, n) {
          t.ready().then(function() {
            var a = t._dbInfo;
            a.db.transaction(function(s) {
              X(s, a, "SELECT * FROM " + a.storeName, [], function(f, c) {
                for (var d = c.rows, g = d.length, E = 0; E < g; E++) {
                  var R = d.item(E), x = R.value;
                  if (x && (x = a.serializer.deserialize(x)), x = e(x, R.key, E + 1), x !== void 0) {
                    i(x);
                    return;
                  }
                }
                i();
              }, function(f, c) {
                n(c);
              });
            });
          }).catch(n);
        });
        return y(o, r), o;
      }
      function Pe(e, r, t, o) {
        var i = this;
        e = L(e);
        var n = new h(function(a, s) {
          i.ready().then(function() {
            r === void 0 && (r = null);
            var f = r, c = i._dbInfo;
            c.serializer.serialize(r, function(d, g) {
              g ? s(g) : c.db.transaction(function(E) {
                X(E, c, "INSERT OR REPLACE INTO " + c.storeName + " (key, value) VALUES (?, ?)", [e, d], function() {
                  a(f);
                }, function(R, x) {
                  s(x);
                });
              }, function(E) {
                if (E.code === E.QUOTA_ERR) {
                  if (o > 0) {
                    a(Pe.apply(i, [e, f, t, o - 1]));
                    return;
                  }
                  s(E);
                }
              });
            });
          }).catch(s);
        });
        return y(n, t), n;
      }
      function ut(e, r, t) {
        return Pe.apply(this, [e, r, t, 1]);
      }
      function ft(e, r) {
        var t = this;
        e = L(e);
        var o = new h(function(i, n) {
          t.ready().then(function() {
            var a = t._dbInfo;
            a.db.transaction(function(s) {
              X(s, a, "DELETE FROM " + a.storeName + " WHERE key = ?", [e], function() {
                i();
              }, function(f, c) {
                n(c);
              });
            });
          }).catch(n);
        });
        return y(o, r), o;
      }
      function ct(e) {
        var r = this, t = new h(function(o, i) {
          r.ready().then(function() {
            var n = r._dbInfo;
            n.db.transaction(function(a) {
              X(a, n, "DELETE FROM " + n.storeName, [], function() {
                o();
              }, function(s, f) {
                i(f);
              });
            });
          }).catch(i);
        });
        return y(t, e), t;
      }
      function lt(e) {
        var r = this, t = new h(function(o, i) {
          r.ready().then(function() {
            var n = r._dbInfo;
            n.db.transaction(function(a) {
              X(a, n, "SELECT COUNT(key) as c FROM " + n.storeName, [], function(s, f) {
                var c = f.rows.item(0).c;
                o(c);
              }, function(s, f) {
                i(f);
              });
            });
          }).catch(i);
        });
        return y(t, e), t;
      }
      function dt(e, r) {
        var t = this, o = new h(function(i, n) {
          t.ready().then(function() {
            var a = t._dbInfo;
            a.db.transaction(function(s) {
              X(s, a, "SELECT key FROM " + a.storeName + " WHERE id = ? LIMIT 1", [e + 1], function(f, c) {
                var d = c.rows.length ? c.rows.item(0).key : null;
                i(d);
              }, function(f, c) {
                n(c);
              });
            });
          }).catch(n);
        });
        return y(o, r), o;
      }
      function ht(e) {
        var r = this, t = new h(function(o, i) {
          r.ready().then(function() {
            var n = r._dbInfo;
            n.db.transaction(function(a) {
              X(a, n, "SELECT key FROM " + n.storeName, [], function(s, f) {
                for (var c = [], d = 0; d < f.rows.length; d++)
                  c.push(f.rows.item(d).key);
                o(c);
              }, function(s, f) {
                i(f);
              });
            });
          }).catch(i);
        });
        return y(t, e), t;
      }
      function vt(e) {
        return new h(function(r, t) {
          e.transaction(function(o) {
            o.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function(i, n) {
              for (var a = [], s = 0; s < n.rows.length; s++)
                a.push(n.rows.item(s).name);
              r({
                db: e,
                storeNames: a
              });
            }, function(i, n) {
              t(n);
            });
          }, function(o) {
            t(o);
          });
        });
      }
      function mt(e, r) {
        r = W.apply(this, arguments);
        var t = this.config();
        e = typeof e != "function" && e || {}, e.name || (e.name = e.name || t.name, e.storeName = e.storeName || t.storeName);
        var o = this, i;
        return e.name ? i = new h(function(n) {
          var a;
          e.name === t.name ? a = o._dbInfo.db : a = openDatabase(e.name, "", "", 0), e.storeName ? n({
            db: a,
            storeNames: [e.storeName]
          }) : n(vt(a));
        }).then(function(n) {
          return new h(function(a, s) {
            n.db.transaction(function(f) {
              function c(R) {
                return new h(function(x, F) {
                  f.executeSql("DROP TABLE IF EXISTS " + R, [], function() {
                    x();
                  }, function(P, H) {
                    F(H);
                  });
                });
              }
              for (var d = [], g = 0, E = n.storeNames.length; g < E; g++)
                d.push(c(n.storeNames[g]));
              h.all(d).then(function() {
                a();
              }).catch(function(R) {
                s(R);
              });
            }, function(f) {
              s(f);
            });
          });
        }) : i = h.reject("Invalid arguments"), y(i, r), i;
      }
      var gt = {
        _driver: "webSQLStorage",
        _initStorage: it,
        _support: tt(),
        iterate: st,
        getItem: at,
        setItem: ut,
        removeItem: ft,
        clear: ct,
        length: lt,
        key: dt,
        keys: ht,
        dropInstance: mt
      };
      function pt() {
        try {
          return typeof localStorage < "u" && "setItem" in localStorage && // in IE8 typeof localStorage.setItem === 'object'
          !!localStorage.setItem;
        } catch {
          return !1;
        }
      }
      function Me(e, r) {
        var t = e.name + "/";
        return e.storeName !== r.storeName && (t += e.storeName + "/"), t;
      }
      function yt() {
        var e = "_localforage_support_test";
        try {
          return localStorage.setItem(e, !0), localStorage.removeItem(e), !1;
        } catch {
          return !0;
        }
      }
      function bt() {
        return !yt() || localStorage.length > 0;
      }
      function _t(e) {
        var r = this, t = {};
        if (e)
          for (var o in e)
            t[o] = e[o];
        return t.keyPrefix = Me(e, r._defaultConfig), bt() ? (r._dbInfo = t, t.serializer = he, h.resolve()) : h.reject();
      }
      function Et(e) {
        var r = this, t = r.ready().then(function() {
          for (var o = r._dbInfo.keyPrefix, i = localStorage.length - 1; i >= 0; i--) {
            var n = localStorage.key(i);
            n.indexOf(o) === 0 && localStorage.removeItem(n);
          }
        });
        return y(t, e), t;
      }
      function wt(e, r) {
        var t = this;
        e = L(e);
        var o = t.ready().then(function() {
          var i = t._dbInfo, n = localStorage.getItem(i.keyPrefix + e);
          return n && (n = i.serializer.deserialize(n)), n;
        });
        return y(o, r), o;
      }
      function St(e, r) {
        var t = this, o = t.ready().then(function() {
          for (var i = t._dbInfo, n = i.keyPrefix, a = n.length, s = localStorage.length, f = 1, c = 0; c < s; c++) {
            var d = localStorage.key(c);
            if (d.indexOf(n) === 0) {
              var g = localStorage.getItem(d);
              if (g && (g = i.serializer.deserialize(g)), g = e(g, d.substring(a), f++), g !== void 0)
                return g;
            }
          }
        });
        return y(o, r), o;
      }
      function It(e, r) {
        var t = this, o = t.ready().then(function() {
          var i = t._dbInfo, n;
          try {
            n = localStorage.key(e);
          } catch {
            n = null;
          }
          return n && (n = n.substring(i.keyPrefix.length)), n;
        });
        return y(o, r), o;
      }
      function Nt(e) {
        var r = this, t = r.ready().then(function() {
          for (var o = r._dbInfo, i = localStorage.length, n = [], a = 0; a < i; a++) {
            var s = localStorage.key(a);
            s.indexOf(o.keyPrefix) === 0 && n.push(s.substring(o.keyPrefix.length));
          }
          return n;
        });
        return y(t, e), t;
      }
      function Tt(e) {
        var r = this, t = r.keys().then(function(o) {
          return o.length;
        });
        return y(t, e), t;
      }
      function Rt(e, r) {
        var t = this;
        e = L(e);
        var o = t.ready().then(function() {
          var i = t._dbInfo;
          localStorage.removeItem(i.keyPrefix + e);
        });
        return y(o, r), o;
      }
      function xt(e, r, t) {
        var o = this;
        e = L(e);
        var i = o.ready().then(function() {
          r === void 0 && (r = null);
          var n = r;
          return new h(function(a, s) {
            var f = o._dbInfo;
            f.serializer.serialize(r, function(c, d) {
              if (d)
                s(d);
              else
                try {
                  localStorage.setItem(f.keyPrefix + e, c), a(n);
                } catch (g) {
                  (g.name === "QuotaExceededError" || g.name === "NS_ERROR_DOM_QUOTA_REACHED") && s(g), s(g);
                }
            });
          });
        });
        return y(i, t), i;
      }
      function Dt(e, r) {
        if (r = W.apply(this, arguments), e = typeof e != "function" && e || {}, !e.name) {
          var t = this.config();
          e.name = e.name || t.name, e.storeName = e.storeName || t.storeName;
        }
        var o = this, i;
        return e.name ? i = new h(function(n) {
          e.storeName ? n(Me(e, o._defaultConfig)) : n(e.name + "/");
        }).then(function(n) {
          for (var a = localStorage.length - 1; a >= 0; a--) {
            var s = localStorage.key(a);
            s.indexOf(n) === 0 && localStorage.removeItem(s);
          }
        }) : i = h.reject("Invalid arguments"), y(i, r), i;
      }
      var At = {
        _driver: "localStorageWrapper",
        _initStorage: _t,
        _support: pt(),
        iterate: St,
        getItem: wt,
        setItem: xt,
        removeItem: Rt,
        clear: Et,
        length: Tt,
        key: It,
        keys: Nt,
        dropInstance: Dt
      }, Bt = function(r, t) {
        return r === t || typeof r == "number" && typeof t == "number" && isNaN(r) && isNaN(t);
      }, Ct = function(r, t) {
        for (var o = r.length, i = 0; i < o; ) {
          if (Bt(r[i], t))
            return !0;
          i++;
        }
        return !1;
      }, Fe = Array.isArray || function(e) {
        return Object.prototype.toString.call(e) === "[object Array]";
      }, te = {}, $e = {}, q = {
        INDEXEDDB: et,
        WEBSQL: gt,
        LOCALSTORAGE: At
      }, Ot = [q.INDEXEDDB._driver, q.WEBSQL._driver, q.LOCALSTORAGE._driver], ie = ["dropInstance"], ve = ["clear", "getItem", "iterate", "key", "keys", "length", "removeItem", "setItem"].concat(ie), Lt = {
        description: "",
        driver: Ot.slice(),
        name: "localforage",
        // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
        // we can use without a prompt.
        size: 4980736,
        storeName: "keyvaluepairs",
        version: 1
      };
      function Pt(e, r) {
        e[r] = function() {
          var t = arguments;
          return e.ready().then(function() {
            return e[r].apply(e, t);
          });
        };
      }
      function me() {
        for (var e = 1; e < arguments.length; e++) {
          var r = arguments[e];
          if (r)
            for (var t in r)
              r.hasOwnProperty(t) && (Fe(r[t]) ? arguments[0][t] = r[t].slice() : arguments[0][t] = r[t]);
        }
        return arguments[0];
      }
      var Mt = function() {
        function e(r) {
          _(this, e);
          for (var t in q)
            if (q.hasOwnProperty(t)) {
              var o = q[t], i = o._driver;
              this[t] = i, te[i] || this.defineDriver(o);
            }
          this._defaultConfig = me({}, Lt), this._config = me({}, this._defaultConfig, r), this._driverSet = null, this._initDriver = null, this._ready = !1, this._dbInfo = null, this._wrapLibraryMethodsWithReady(), this.setDriver(this._config.driver).catch(function() {
          });
        }
        return e.prototype.config = function(t) {
          if ((typeof t > "u" ? "undefined" : p(t)) === "object") {
            if (this._ready)
              return new Error("Can't call config() after localforage has been used.");
            for (var o in t) {
              if (o === "storeName" && (t[o] = t[o].replace(/\W/g, "_")), o === "version" && typeof t[o] != "number")
                return new Error("Database version must be a number.");
              this._config[o] = t[o];
            }
            return "driver" in t && t.driver ? this.setDriver(this._config.driver) : !0;
          } else return typeof t == "string" ? this._config[t] : this._config;
        }, e.prototype.defineDriver = function(t, o, i) {
          var n = new h(function(a, s) {
            try {
              var f = t._driver, c = new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");
              if (!t._driver) {
                s(c);
                return;
              }
              for (var d = ve.concat("_initStorage"), g = 0, E = d.length; g < E; g++) {
                var R = d[g], x = !Ct(ie, R);
                if ((x || t[R]) && typeof t[R] != "function") {
                  s(c);
                  return;
                }
              }
              var F = function() {
                for (var re = function(Wt) {
                  return function() {
                    var kt = new Error("Method " + Wt + " is not implemented by the current driver"), We = h.reject(kt);
                    return y(We, arguments[arguments.length - 1]), We;
                  };
                }, ge = 0, $t = ie.length; ge < $t; ge++) {
                  var pe = ie[ge];
                  t[pe] || (t[pe] = re(pe));
                }
              };
              F();
              var P = function(re) {
                te[f] && console.info("Redefining LocalForage driver: " + f), te[f] = t, $e[f] = re, a();
              };
              "_support" in t ? t._support && typeof t._support == "function" ? t._support().then(P, s) : P(!!t._support) : P(!0);
            } catch (H) {
              s(H);
            }
          });
          return A(n, o, i), n;
        }, e.prototype.driver = function() {
          return this._driver || null;
        }, e.prototype.getDriver = function(t, o, i) {
          var n = te[t] ? h.resolve(te[t]) : h.reject(new Error("Driver not found."));
          return A(n, o, i), n;
        }, e.prototype.getSerializer = function(t) {
          var o = h.resolve(he);
          return A(o, t), o;
        }, e.prototype.ready = function(t) {
          var o = this, i = o._driverSet.then(function() {
            return o._ready === null && (o._ready = o._initDriver()), o._ready;
          });
          return A(i, t, t), i;
        }, e.prototype.setDriver = function(t, o, i) {
          var n = this;
          Fe(t) || (t = [t]);
          var a = this._getSupportedDrivers(t);
          function s() {
            n._config.driver = n.driver();
          }
          function f(g) {
            return n._extend(g), s(), n._ready = n._initStorage(n._config), n._ready;
          }
          function c(g) {
            return function() {
              var E = 0;
              function R() {
                for (; E < g.length; ) {
                  var x = g[E];
                  return E++, n._dbInfo = null, n._ready = null, n.getDriver(x).then(f).catch(R);
                }
                s();
                var F = new Error("No available storage method found.");
                return n._driverSet = h.reject(F), n._driverSet;
              }
              return R();
            };
          }
          var d = this._driverSet !== null ? this._driverSet.catch(function() {
            return h.resolve();
          }) : h.resolve();
          return this._driverSet = d.then(function() {
            var g = a[0];
            return n._dbInfo = null, n._ready = null, n.getDriver(g).then(function(E) {
              n._driver = E._driver, s(), n._wrapLibraryMethodsWithReady(), n._initDriver = c(a);
            });
          }).catch(function() {
            s();
            var g = new Error("No available storage method found.");
            return n._driverSet = h.reject(g), n._driverSet;
          }), A(this._driverSet, o, i), this._driverSet;
        }, e.prototype.supports = function(t) {
          return !!$e[t];
        }, e.prototype._extend = function(t) {
          me(this, t);
        }, e.prototype._getSupportedDrivers = function(t) {
          for (var o = [], i = 0, n = t.length; i < n; i++) {
            var a = t[i];
            this.supports(a) && o.push(a);
          }
          return o;
        }, e.prototype._wrapLibraryMethodsWithReady = function() {
          for (var t = 0, o = ve.length; t < o; t++)
            Pt(this, ve[t]);
        }, e.prototype.createInstance = function(t) {
          return new e(t);
        }, e;
      }(), Ft = new Mt();
      m.exports = Ft;
    }, { 3: 3 }] }, {}, [4])(4);
  });
})(ke);
var Xt = ke.exports;
const Ue = /* @__PURE__ */ Kt(Xt);
class jt {
  constructor({ root: u, config: l = {} }) {
    k(this, "getPositionStyles", function(u) {
      const { w: l, h: m, x: S, y: p } = u;
      return [
        "position: absolute",
        `width:${l}%`,
        `height:${m}%`,
        `left:${S}%`,
        `top:${p}%`
      ];
    });
    k(this, "isBackgroundSet", function(u) {
      if (u.nodeType !== Node.ELEMENT_NODE)
        return;
      const l = window.getComputedStyle(u);
      return l.background !== "rgba(0, 0, 0, 0)" || l.backgroundImage !== "none" || l.backgroundColor !== "rgba(0, 0, 0, 0)";
    });
    k(this, "hasBorder", function(u) {
      if (u.nodeType !== Node.ELEMENT_NODE)
        return;
      const l = window.getComputedStyle(u);
      return l.borderTopColor !== "rgba(0, 0, 0, 0)" || // 或者其他非transparent的颜色
      l.borderRightColor !== "rgba(0, 0, 0, 0)" || l.borderBottomColor !== "rgba(0, 0, 0, 0)" || l.borderLeftColor !== "rgba(0, 0, 0, 0)" || l.borderTopWidth !== "0px" || l.borderRightWidth !== "0px" || l.borderBottomWidth !== "0px" || l.borderLeftWidth !== "0px" || l.borderTopStyle !== "none" || l.borderRightStyle !== "none" || l.borderBottomStyle !== "none" || l.borderLeftStyle !== "none";
    });
    k(this, "getPosition", function(u, l) {
      let { width: m, height: S, top: p, left: _ } = u.getBoundingClientRect();
      return m > 5 && S > 5 && p < RT && _ < RL && _ + m < RL + RW ? (m = Number((m / RW * 100).toFixed(2)), S = Number((S / RH * 100).toFixed(2)), _ = Number(((_ - RL) / RW * 100).toFixed(2)), p = Number(((p - RT) / RH * 100).toFixed(2)), { w: m, h: S, y: p, x: _ }) : null;
    });
    k(this, "addBgs", function({ node: u, skeId: l }) {
      const m = this.getPosition(u);
      if (!m)
        return null;
      const S = l || "", { borderRadius: p, background: _, backgroundColor: b } = getComputedStyle(
        u,
        null
      ), N = this.getPositionStyles(m).concat([
        `background-color:${b}`,
        `border-radius:${p}`
      ]).join(";");
      this.Bgs += `<div data-ske-id="${S}" style="${N}"></div>`;
    });
    k(this, "addBorders", function({ node: u, skeId: l }) {
      const m = this.getPosition(u);
      if (!m)
        return null;
      const S = l || "", p = this.getPositionStyles(m), {
        borderRadius: _,
        backgroundColor: b,
        borderWidth: I,
        borderStyle: N,
        borderColor: B
        //变成灰色系列
      } = getComputedStyle(u, null), h = p.concat([
        `background-color:${b}`,
        `border-radius:${_}`
      ]).concat([
        `border-width:${I}`,
        `border-style:${N}`,
        "border-color:#f4f4f4",
        `border-radius:${_}`
      ]).join(";");
      this.Borders += `<div  data-ske-id="${S}" style="${h}"></div>`;
    });
    k(this, "mergeDiv", function({ node: u, skeId: l, pid: m, position: S }) {
      const { borderRadius: p } = getComputedStyle(u, null), _ = {
        position: S,
        pid: m,
        skeId: l,
        borderRadius: p
      };
      if (!this.SkeBoxes.length) {
        this.SkeBoxes.push(_);
        return;
      }
      const b = this.SkeBoxes[this.SkeBoxes.length - 1], { w: I, h: N, x: B, y: h } = b.position, { borderRadius: y } = b, { w: A, h: L, x: W, y: C } = S, V = Math.abs(B + I - W), M = Math.abs(h + N - C);
      if ((V < 0.5 || M < 0.5) && m == b.pid) {
        let Z = {
          x: Math.min(B, W),
          y: Math.min(h, C),
          w: Math.max(B + I, W + A) - Math.min(B, W),
          h: Math.max(h + N, C + L) - Math.min(h, C)
        };
        this.SkeBoxes[SkeBoxes.length - 1] = {
          position: Z,
          borderRadius: Math.max(y, p),
          //都使用第一个borderRaduis
          skeId: l,
          pid: m
        };
        return;
      }
      this.SkeBoxes.push(_);
    });
    k(this, "createDiv", function({ node: u, skeId: l, pid: m, isText: S }) {
      if (!u)
        return;
      const p = this.getPosition(u, S);
      p && this.mergeDiv({ node: u, skeId: l, pid: m, position: p });
    });
    k(this, "handleLeafNode", function({ node: u, skeId: l, pid: m }) {
      u.nodeType === Node.ELEMENT_NODE ? u && this.createDiv({ node: u, skeId: l, pid: m }) : u.nodeType === Node.TEXT_NODE ? u && this.createDiv({ node: u.parentElement, skeId: l, pid: m }) : (u.nodeType, Node.COMMENT_NODE);
    });
    k(this, "handleIsInEnumableTags", function({ node: u }) {
      let l = !1;
      return u.nodeType != Node.ELEMENT_NODE || (u.childNodes && Array.from(u.childNodes).some((m) => m.nodeType === Node.TEXT_NODE) && (l = !0), u.tagName === "svg" && (l = !0), u.tagName === "A" && (l = !0), (u.tagName === "IMG" || /base64/.test(u.src) || u.tagName === "FIGURE") && (l = !0), (u.tagName === "INPUT" || u.tagName == "TEXTAREA") && (l = !0), u.tagName === "CANVAS" && (l = !0), u.nodeType === Node.ELEMENT_NODE && (u.tagName === "BUTTON" || u.tagName === "A" && u.getAttribute("role") === "button") && (l = !0)), l;
    });
    k(this, "getIsVisible", function(u) {
      const l = window.getComputedStyle(u);
      return l.display !== "none" && l.visibility !== "hidden" && l.opacity !== "0" && u.offsetWidth > 0 && u.offsetHeight > 0;
    });
    k(this, "performTraverseNode", function({ node: u, skeId: l, pid: m }) {
      if (!u || isInterrupted || !this.getIsVisible(u))
        return;
      if (u.childNodes && Array.from(u.childNodes).some((I) => I.nodeType === Node.TEXT_NODE)) {
        this.createDiv({ node: u, skeId: l, pid: m, isText: !0 });
        return;
      }
      const p = this.handleIsInEnumableTags({ node: u });
      if (p) {
        this.createDiv({ node: u, skeId: l, pid: m, isInEnumableTags: p });
        return;
      }
      if (this.isBackgroundSet(u) && this.addBgs({ node: u, skeId: l }), this.hasBorder(u) && this.addBorders({ node: u, skeId: l }), !u.hasChildNodes) {
        this.handleLeafNode({ node: u, skeId: l, pid: m });
        return;
      }
      const _ = u.childNodes, b = m++;
      for (let I = 0; I < _.length; I++) {
        const N = _[I], B = l + N.id;
        this.nodeQueue.push({
          node: N,
          skeId: B,
          pid: b
        });
      }
    });
    k(this, "saveSke", function() {
      if (this.isInterrupted)
        return;
      const u = this.SkeBoxes.reduce((S, p) => {
        const { skeId: _, position: b, borderRadius: I } = p, B = this.getPositionStyles(b).concat([
          `border-radius:${I}`
        ]);
        return S + `<div data-ske-id="${_ || ""}" class="skeleton-common" 
        style="${B.join(";")}" ></div>`;
      }, ""), l = this.Bgs + this.Borders + u, m = document.createElement("div");
      return m.style.position = "relative", m.style.minWidth = `${this.minW}px`, m.style.minHeight = `${this.minH}px`, m.style.maxWidth = `${this.maxW}px`, m.innerHTML = l, this.putCacheDOM(m), this.insertCacheDOM(m), this.insertCss(), l;
    });
    k(this, "performWorkUnit", function() {
      if (!this.isInterrupted) {
        if (this.nodeQueue.length === 0) {
          this.saveSke();
          return;
        }
        Qt((u) => {
          let l;
          for (; (l = this.nodeQueue.shift()) && !u.didTimeout && u.timeRemaining() > 0; )
            this.performTraverseNode(l);
          this.performWorkUnit();
        });
      }
    });
    this.nodeQueue = [{ node: u, skeId: u.id, pid: 0 }], this.isInterrupted = !1, this.SkeBoxes = [], this.Bgs = "", this.Borders = "";
    const {
      width: m,
      height: S,
      top: p,
      left: _
    } = u.getBoundingClientRect();
    this.minW = l.minW || m, this.maxW = l.maxW || 1600, this.minH = l.minH || S;
    const I = window.location.origin + window.location.pathname + "-" + id;
    this.cacheKey = I;
  }
  putCacheDOM(u) {
    u && Ue.setItem(
      `${this.cacheKey}`,
      JSON.stringify(u && u.outerHTML)
    ).then(function() {
    });
  }
  insertCacheDOM(u) {
    u && document.body.append(appendDiv);
  }
  insertCss() {
    const u = document.createElement("style");
    u.innerHTML = `.skeleton-common {
      position: absolute;
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
    `, document.head.append(u);
  }
}
function Jt({ id: O }) {
  const l = window.location.origin + window.location.pathname + "-" + O;
  let m;
  try {
    m = JSON.parse(Ue.getItem(l) || "{}");
  } catch (S) {
    console.log(S);
  }
  return m;
}
const qt = ({ id: O, loading: u, children: l }) => {
  const m = Jt(O);
  return zt(() => {
    new jt({ id: O, root }).performTraverseNode();
  }, []), u && m ? /* @__PURE__ */ ye.createElement("div", { dangerouslySetInnerHTML: { __html: m } }) : l;
}, rr = () => /* @__PURE__ */ ye.createElement(qt, { loading: !0, id: "test" }, /* @__PURE__ */ ye.createElement("div", null, "测试"));
export {
  rr as default
};
