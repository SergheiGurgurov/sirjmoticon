var Rt = Object.defineProperty;
var Ft = (t, e, n) =>
  e in t
    ? Rt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n })
    : (t[e] = n);
var G = (t, e, n) => (Ft(t, typeof e != "symbol" ? e + "" : e, n), n);
(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) o(s);
  new MutationObserver((s) => {
    for (const r of s)
      if (r.type === "childList")
        for (const a of r.addedNodes)
          a.tagName === "LINK" && a.rel === "modulepreload" && o(a);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(s) {
    const r = {};
    return (
      s.integrity && (r.integrity = s.integrity),
      s.referrerPolicy && (r.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (r.credentials = "include")
        : s.crossOrigin === "anonymous"
        ? (r.credentials = "omit")
        : (r.credentials = "same-origin"),
      r
    );
  }
  function o(s) {
    if (s.ep) return;
    s.ep = !0;
    const r = n(s);
    fetch(s.href, r);
  }
})();
function $() {}
const ht = (t) => t;
function gt(t) {
  return t();
}
function ot() {
  return Object.create(null);
}
function A(t) {
  t.forEach(gt);
}
function V(t) {
  return typeof t == "function";
}
function Y(t, e) {
  return t != t
    ? e == e
    : t !== e || (t && typeof t == "object") || typeof t == "function";
}
let z;
function it(t, e) {
  return t === e
    ? !0
    : (z || (z = document.createElement("a")), (z.href = e), t === z.href);
}
function qt(t) {
  return Object.keys(t).length === 0;
}
function At(t, ...e) {
  if (t == null) {
    for (const o of e) o(void 0);
    return $;
  }
  const n = t.subscribe(...e);
  return n.unsubscribe ? () => n.unsubscribe() : n;
}
function Lt(t, e, n) {
  t.$$.on_destroy.push(At(e, n));
}
function ct(t) {
  const e = typeof t == "string" && t.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
  return e ? [parseFloat(e[1]), e[2] || "px"] : [t, "px"];
}
const _t = typeof window < "u";
let mt = _t ? () => window.performance.now() : () => Date.now(),
  Z = _t ? (t) => requestAnimationFrame(t) : $;
const R = new Set();
function yt(t) {
  R.forEach((e) => {
    e.c(t) || (R.delete(e), e.f());
  }),
    R.size !== 0 && Z(yt);
}
function $t(t) {
  let e;
  return (
    R.size === 0 && Z(yt),
    {
      promise: new Promise((n) => {
        R.add((e = { c: t, f: n }));
      }),
      abort() {
        R.delete(e);
      },
    }
  );
}
function k(t, e) {
  t.appendChild(e);
}
function wt(t) {
  if (!t) return document;
  const e = t.getRootNode ? t.getRootNode() : t.ownerDocument;
  return e && e.host ? e : t.ownerDocument;
}
function Pt(t) {
  const e = E("style");
  return (e.textContent = "/* empty */"), jt(wt(t), e), e.sheet;
}
function jt(t, e) {
  return k(t.head || t, e), e.sheet;
}
function tt(t, e, n) {
  t.insertBefore(e, n || null);
}
function B(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function E(t) {
  return document.createElement(t);
}
function bt(t) {
  return document.createTextNode(t);
}
function vt() {
  return bt(" ");
}
function S(t, e, n) {
  n == null
    ? t.removeAttribute(e)
    : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function Bt(t) {
  return Array.from(t.childNodes);
}
function Ut(t, e) {
  (e = "" + e), t.data !== e && (t.data = e);
}
function zt(t, e, { bubbles: n = !1, cancelable: o = !1 } = {}) {
  return new CustomEvent(t, { detail: e, bubbles: n, cancelable: o });
}
const W = new Map();
let I = 0;
function Dt(t) {
  let e = 5381,
    n = t.length;
  for (; n--; ) e = ((e << 5) - e) ^ t.charCodeAt(n);
  return e >>> 0;
}
function Wt(t, e) {
  const n = { stylesheet: Pt(e), rules: {} };
  return W.set(t, n), n;
}
function xt(t, e, n, o, s, r, a, l = 0) {
  const c = 16.666 / o;
  let i = `{
`;
  for (let _ = 0; _ <= 1; _ += c) {
    const g = e + (n - e) * r(_);
    i +=
      _ * 100 +
      `%{${a(g, 1 - g)}}
`;
  }
  const f =
      i +
      `100% {${a(n, 1 - n)}}
}`,
    u = `__svelte_${Dt(f)}_${l}`,
    p = wt(t),
    { stylesheet: d, rules: h } = W.get(p) || Wt(p, t);
  h[u] ||
    ((h[u] = !0), d.insertRule(`@keyframes ${u} ${f}`, d.cssRules.length));
  const m = t.style.animation || "";
  return (
    (t.style.animation = `${
      m ? `${m}, ` : ""
    }${u} ${o}ms linear ${s}ms 1 both`),
    (I += 1),
    u
  );
}
function Q(t, e) {
  const n = (t.style.animation || "").split(", "),
    o = n.filter(
      e ? (r) => r.indexOf(e) < 0 : (r) => r.indexOf("__svelte") === -1
    ),
    s = n.length - o.length;
  s && ((t.style.animation = o.join(", ")), (I -= s), I || It());
}
function It() {
  Z(() => {
    I ||
      (W.forEach((t) => {
        const { ownerNode: e } = t.stylesheet;
        e && B(e);
      }),
      W.clear());
  });
}
function Vt(t, e, n, o) {
  if (!e) return $;
  const s = t.getBoundingClientRect();
  if (
    e.left === s.left &&
    e.right === s.right &&
    e.top === s.top &&
    e.bottom === s.bottom
  )
    return $;
  const {
    delay: r = 0,
    duration: a = 300,
    easing: l = ht,
    start: c = mt() + r,
    end: i = c + a,
    tick: f = $,
    css: u,
  } = n(t, { from: e, to: s }, o);
  let p = !0,
    d = !1,
    h;
  function m() {
    u && (h = xt(t, 0, 1, a, r, l, u)), r || (d = !0);
  }
  function _() {
    u && Q(t, h), (p = !1);
  }
  return (
    $t((g) => {
      if ((!d && g >= c && (d = !0), d && g >= i && (f(1, 0), _()), !p))
        return !1;
      if (d) {
        const v = g - c,
          x = 0 + 1 * l(v / a);
        f(x, 1 - x);
      }
      return !0;
    }),
    m(),
    f(0, 1),
    _
  );
}
function Tt(t) {
  const e = getComputedStyle(t);
  if (e.position !== "absolute" && e.position !== "fixed") {
    const { width: n, height: o } = e,
      s = t.getBoundingClientRect();
    (t.style.position = "absolute"),
      (t.style.width = n),
      (t.style.height = o),
      Jt(t, s);
  }
}
function Jt(t, e) {
  const n = t.getBoundingClientRect();
  if (e.left !== n.left || e.top !== n.top) {
    const o = getComputedStyle(t),
      s = o.transform === "none" ? "" : o.transform;
    t.style.transform = `${s} translate(${e.left - n.left}px, ${
      e.top - n.top
    }px)`;
  }
}
let et;
function j(t) {
  et = t;
}
const N = [],
  lt = [];
let F = [];
const at = [],
  Kt = Promise.resolve();
let X = !1;
function Gt() {
  X || ((X = !0), Kt.then(St));
}
function q(t) {
  F.push(t);
}
const H = new Set();
let M = 0;
function St() {
  if (M !== 0) return;
  const t = et;
  do {
    try {
      for (; M < N.length; ) {
        const e = N[M];
        M++, j(e), Ht(e.$$);
      }
    } catch (e) {
      throw ((N.length = 0), (M = 0), e);
    }
    for (j(null), N.length = 0, M = 0; lt.length; ) lt.pop()();
    for (let e = 0; e < F.length; e += 1) {
      const n = F[e];
      H.has(n) || (H.add(n), n());
    }
    F.length = 0;
  } while (N.length);
  for (; at.length; ) at.pop()();
  (X = !1), H.clear(), j(t);
}
function Ht(t) {
  if (t.fragment !== null) {
    t.update(), A(t.before_update);
    const e = t.dirty;
    (t.dirty = [-1]),
      t.fragment && t.fragment.p(t.ctx, e),
      t.after_update.forEach(q);
  }
}
function Qt(t) {
  const e = [],
    n = [];
  F.forEach((o) => (t.indexOf(o) === -1 ? e.push(o) : n.push(o))),
    n.forEach((o) => o()),
    (F = e);
}
let P;
function Xt() {
  return (
    P ||
      ((P = Promise.resolve()),
      P.then(() => {
        P = null;
      })),
    P
  );
}
function ft(t, e, n) {
  t.dispatchEvent(zt(`${e ? "intro" : "outro"}${n}`));
}
const D = new Set();
let C;
function Yt() {
  C = { r: 0, c: [], p: C };
}
function Zt() {
  C.r || A(C.c), (C = C.p);
}
function T(t, e) {
  t && t.i && (D.delete(t), t.i(e));
}
function nt(t, e, n, o) {
  if (t && t.o) {
    if (D.has(t)) return;
    D.add(t),
      C.c.push(() => {
        D.delete(t), o && (n && t.d(1), o());
      }),
      t.o(e);
  } else o && o();
}
const te = { duration: 0 };
function kt(t, e, n) {
  const o = { direction: "in" };
  let s = e(t, n, o),
    r = !1,
    a,
    l,
    c = 0;
  function i() {
    a && Q(t, a);
  }
  function f() {
    const {
      delay: p = 0,
      duration: d = 300,
      easing: h = ht,
      tick: m = $,
      css: _,
    } = s || te;
    _ && (a = xt(t, 0, 1, d, p, h, _, c++)), m(0, 1);
    const g = mt() + p,
      v = g + d;
    l && l.abort(),
      (r = !0),
      q(() => ft(t, !0, "start")),
      (l = $t((x) => {
        if (r) {
          if (x >= v) return m(1, 0), ft(t, !0, "end"), i(), (r = !1);
          if (x >= g) {
            const L = h((x - g) / d);
            m(L, 1 - L);
          }
        }
        return r;
      }));
  }
  let u = !1;
  return {
    start() {
      u || ((u = !0), Q(t), V(s) ? ((s = s(o)), Xt().then(f)) : f());
    },
    invalidate() {
      u = !1;
    },
    end() {
      r && (i(), (r = !1));
    },
  };
}
function ut(t) {
  return (t == null ? void 0 : t.length) !== void 0 ? t : Array.from(t);
}
function ee(t, e) {
  nt(t, 1, 1, () => {
    e.delete(t.key);
  });
}
function ne(t, e) {
  t.f(), ee(t, e);
}
function re(t, e, n, o, s, r, a, l, c, i, f, u) {
  let p = t.length,
    d = r.length,
    h = p;
  const m = {};
  for (; h--; ) m[t[h].key] = h;
  const _ = [],
    g = new Map(),
    v = new Map(),
    x = [];
  for (h = d; h--; ) {
    const y = u(s, r, h),
      w = n(y);
    let b = a.get(w);
    b ? o && x.push(() => b.p(y, e)) : ((b = i(w, y)), b.c()),
      g.set(w, (_[h] = b)),
      w in m && v.set(w, Math.abs(h - m[w]));
  }
  const L = new Set(),
    st = new Set();
  function K(y) {
    T(y, 1), y.m(l, f), a.set(y.key, y), (f = y.first), d--;
  }
  for (; p && d; ) {
    const y = _[d - 1],
      w = t[p - 1],
      b = y.key,
      U = w.key;
    y === w
      ? ((f = y.first), p--, d--)
      : g.has(U)
      ? !a.has(b) || L.has(b)
        ? K(y)
        : st.has(U)
        ? p--
        : v.get(b) > v.get(U)
        ? (st.add(b), K(y))
        : (L.add(U), p--)
      : (c(w, a), p--);
  }
  for (; p--; ) {
    const y = t[p];
    g.has(y.key) || c(y, a);
  }
  for (; d; ) K(_[d - 1]);
  return A(x), _;
}
function se(t) {
  t && t.c();
}
function Ct(t, e, n) {
  const { fragment: o, after_update: s } = t.$$;
  o && o.m(e, n),
    q(() => {
      const r = t.$$.on_mount.map(gt).filter(V);
      t.$$.on_destroy ? t.$$.on_destroy.push(...r) : A(r), (t.$$.on_mount = []);
    }),
    s.forEach(q);
}
function Et(t, e) {
  const n = t.$$;
  n.fragment !== null &&
    (Qt(n.after_update),
    A(n.on_destroy),
    n.fragment && n.fragment.d(e),
    (n.on_destroy = n.fragment = null),
    (n.ctx = []));
}
function oe(t, e) {
  t.$$.dirty[0] === -1 && (N.push(t), Gt(), t.$$.dirty.fill(0)),
    (t.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
}
function Mt(t, e, n, o, s, r, a = null, l = [-1]) {
  const c = et;
  j(t);
  const i = (t.$$ = {
    fragment: null,
    ctx: [],
    props: r,
    update: $,
    not_equal: s,
    bound: ot(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (c ? c.$$.context : [])),
    callbacks: ot(),
    dirty: l,
    skip_bound: !1,
    root: e.target || c.$$.root,
  });
  a && a(i.root);
  let f = !1;
  if (
    ((i.ctx = n
      ? n(t, e.props || {}, (u, p, ...d) => {
          const h = d.length ? d[0] : p;
          return (
            i.ctx &&
              s(i.ctx[u], (i.ctx[u] = h)) &&
              (!i.skip_bound && i.bound[u] && i.bound[u](h), f && oe(t, u)),
            p
          );
        })
      : []),
    i.update(),
    (f = !0),
    A(i.before_update),
    (i.fragment = o ? o(i.ctx) : !1),
    e.target)
  ) {
    if (e.hydrate) {
      const u = Bt(e.target);
      i.fragment && i.fragment.l(u), u.forEach(B);
    } else i.fragment && i.fragment.c();
    e.intro && T(t.$$.fragment), Ct(t, e.target, e.anchor), St();
  }
  j(c);
}
class Ot {
  constructor() {
    G(this, "$$");
    G(this, "$$set");
  }
  $destroy() {
    Et(this, 1), (this.$destroy = $);
  }
  $on(e, n) {
    if (!V(n)) return $;
    const o = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
    return (
      o.push(n),
      () => {
        const s = o.indexOf(n);
        s !== -1 && o.splice(s, 1);
      }
    );
  }
  $set(e) {
    this.$$set &&
      !qt(e) &&
      ((this.$$.skip_bound = !0), this.$$set(e), (this.$$.skip_bound = !1));
  }
}
const ie = "4";
typeof window < "u" &&
  (window.__svelte || (window.__svelte = { v: new Set() })).v.add(ie);
function rt(t) {
  const e = t - 1;
  return e * e * e + 1;
}
function ce(t, { from: e, to: n }, o = {}) {
  const s = getComputedStyle(t),
    r = s.transform === "none" ? "" : s.transform,
    [a, l] = s.transformOrigin.split(" ").map(parseFloat),
    c = e.left + (e.width * a) / n.width - (n.left + a),
    i = e.top + (e.height * l) / n.height - (n.top + l),
    {
      delay: f = 0,
      duration: u = (d) => Math.sqrt(d) * 120,
      easing: p = rt,
    } = o;
  return {
    delay: f,
    duration: V(u) ? u(Math.sqrt(c * c + i * i)) : u,
    easing: p,
    css: (d, h) => {
      const m = h * c,
        _ = h * i,
        g = d + (h * e.width) / n.width,
        v = d + (h * e.height) / n.height;
      return `transform: ${r} translate(${m}px, ${_}px) scale(${g}, ${v});`;
    },
  };
}
function le(
  t,
  {
    delay: e = 0,
    duration: n = 400,
    easing: o = rt,
    x: s = 0,
    y: r = 0,
    opacity: a = 0,
  } = {}
) {
  const l = getComputedStyle(t),
    c = +l.opacity,
    i = l.transform === "none" ? "" : l.transform,
    f = c * (1 - a),
    [u, p] = ct(s),
    [d, h] = ct(r);
  return {
    delay: e,
    duration: n,
    easing: o,
    css: (m, _) => `
			transform: ${i} translate(${(1 - m) * u}${p}, ${(1 - m) * d}${h});
			opacity: ${c - f * _}`,
  };
}
function ae(
  t,
  { delay: e = 0, duration: n = 400, easing: o = rt, axis: s = "y" } = {}
) {
  const r = getComputedStyle(t),
    a = +r.opacity,
    l = s === "y" ? "height" : "width",
    c = parseFloat(r[l]),
    i = s === "y" ? ["top", "bottom"] : ["left", "right"],
    f = i.map((g) => `${g[0].toUpperCase()}${g.slice(1)}`),
    u = parseFloat(r[`padding${f[0]}`]),
    p = parseFloat(r[`padding${f[1]}`]),
    d = parseFloat(r[`margin${f[0]}`]),
    h = parseFloat(r[`margin${f[1]}`]),
    m = parseFloat(r[`border${f[0]}Width`]),
    _ = parseFloat(r[`border${f[1]}Width`]);
  return {
    delay: e,
    duration: n,
    easing: o,
    css: (g) =>
      `overflow: hidden;opacity: ${Math.min(g * 20, 1) * a};${l}: ${
        g * c
      }px;padding-${i[0]}: ${g * u}px;padding-${i[1]}: ${g * p}px;margin-${
        i[0]
      }: ${g * d}px;margin-${i[1]}: ${g * h}px;border-${i[0]}-width: ${
        g * m
      }px;border-${i[1]}-width: ${g * _}px;`,
  };
}
function fe(t) {
  let e, n, o, s, r, a, l;
  return {
    c() {
      (e = E("div")),
        (n = E("span")),
        (o = bt(t[1])),
        (s = vt()),
        (r = E("img")),
        S(n, "class", "score svelte-12p0f35"),
        it(r.src, (a = t[0])) || S(r, "src", a),
        S(r, "alt", "none"),
        S(r, "class", "svelte-12p0f35"),
        S(e, "class", "card svelte-12p0f35");
    },
    m(c, i) {
      tt(c, e, i), k(e, n), k(n, o), k(e, s), k(e, r);
    },
    p(c, [i]) {
      i & 2 && Ut(o, c[1]), i & 1 && !it(r.src, (a = c[0])) && S(r, "src", a);
    },
    i(c) {
      c &&
        (l ||
          q(() => {
            (l = kt(e, le, { y: 50, duration: 2e3 })), l.start();
          }));
    },
    o: $,
    d(c) {
      c && B(e);
    },
  };
}
function ue(t, e, n) {
  let { image: o = "" } = e,
    { score: s = 0 } = e;
  return (
    (t.$$set = (r) => {
      "image" in r && n(0, (o = r.image)), "score" in r && n(1, (s = r.score));
    }),
    [o, s]
  );
}
class de extends Ot {
  constructor(e) {
    super(), Mt(this, e, ue, fe, Y, { image: 0, score: 1 });
  }
}
const O = [];
function pe(t, e = $) {
  let n;
  const o = new Set();
  function s(l) {
    if (Y(t, l) && ((t = l), n)) {
      const c = !O.length;
      for (const i of o) i[1](), O.push(i, t);
      if (c) {
        for (let i = 0; i < O.length; i += 2) O[i][0](O[i + 1]);
        O.length = 0;
      }
    }
  }
  function r(l) {
    s(l(t));
  }
  function a(l, c = $) {
    const i = [l, c];
    return (
      o.add(i),
      o.size === 1 && (n = e(s, r) || $),
      l(t),
      () => {
        o.delete(i), o.size === 0 && n && (n(), (n = null));
      }
    );
  }
  return { set: s, update: r, subscribe: a };
}
const Nt = pe([]);
function dt(t, e, n) {
  const o = t.slice();
  return (o[2] = e[n]), o;
}
function pt(t, e) {
  let n,
    o,
    s,
    r,
    a,
    l,
    c = $,
    i;
  return (
    (s = new de({ props: { image: e[2].imageUrl, score: e[2].score } })),
    {
      key: t,
      first: null,
      c() {
        (n = E("div")),
          (o = E("div")),
          se(s.$$.fragment),
          (a = vt()),
          (this.first = n);
      },
      m(f, u) {
        tt(f, n, u), k(n, o), Ct(s, o, null), k(n, a), (i = !0);
      },
      p(f, u) {
        e = f;
        const p = {};
        u & 1 && (p.image = e[2].imageUrl),
          u & 1 && (p.score = e[2].score),
          s.$set(p);
      },
      r() {
        l = n.getBoundingClientRect();
      },
      f() {
        Tt(n), c();
      },
      a() {
        c(), (c = Vt(n, l, ce, { duration: e[1] }));
      },
      i(f) {
        i ||
          (T(s.$$.fragment, f),
          f &&
            (r ||
              q(() => {
                (r = kt(o, ae, {})), r.start();
              })),
          (i = !0));
      },
      o(f) {
        nt(s.$$.fragment, f), (i = !1);
      },
      d(f) {
        f && B(n), Et(s);
      },
    }
  );
}
function he(t) {
  let e,
    n = [],
    o = new Map(),
    s,
    r = ut(t[0]);
  const a = (l) => l[2].contestant;
  for (let l = 0; l < r.length; l += 1) {
    let c = dt(t, r, l),
      i = a(c);
    o.set(i, (n[l] = pt(i, c)));
  }
  return {
    c() {
      e = E("div");
      for (let l = 0; l < n.length; l += 1) n[l].c();
      S(e, "class", "cardContainer svelte-rrjxyt");
    },
    m(l, c) {
      tt(l, e, c);
      for (let i = 0; i < n.length; i += 1) n[i] && n[i].m(e, null);
      s = !0;
    },
    p(l, [c]) {
      if (c & 1) {
        (r = ut(l[0])), Yt();
        for (let i = 0; i < n.length; i += 1) n[i].r();
        n = re(n, c, a, 1, l, r, o, e, ne, pt, null, dt);
        for (let i = 0; i < n.length; i += 1) n[i].a();
        Zt();
      }
    },
    i(l) {
      if (!s) {
        for (let c = 0; c < r.length; c += 1) T(n[c]);
        s = !0;
      }
    },
    o(l) {
      for (let c = 0; c < n.length; c += 1) nt(n[c]);
      s = !1;
    },
    d(l) {
      l && B(e);
      for (let c = 0; c < n.length; c += 1) n[c].d();
    },
  };
}
function ge(t, e, n) {
  let o;
  return Lt(t, Nt, (r) => n(0, (o = r))), [o, (r) => 30 * Math.sqrt(r)];
}
class _e extends Ot {
  constructor(e) {
    super(), Mt(this, e, ge, he, Y, {});
  }
}
function me(t, e) {
  return typeof e == "object" && e !== null && e.dataType === "Map"
    ? new Map(e.value)
    : e;
}
function ye(t) {
  return JSON.parse(t, me);
}
var $e = window.location.protocol == "https:" ? "wss:" : "ws:",
  J = new WebSocket(`${$e}//${window.location.host}/overnightlive`);
J.addEventListener("message", function (t) {
  const e = ye(t.data);
  if (e.type == "scoreboard-update") {
    console.log("Received Socket Message:", e);
    const n = e.data,
      o = Array.from(n.list)
        .map(([s, r]) => r)
        .sort((s, r) => r.score - s.score);
    Nt.set(o);
  } else e.type == "canvas-update", console.log("Received Socket Message:", e);
});
J.addEventListener("open", function (t) {
  console.log("Connected to server");
});
J.addEventListener("close", function (t) {
  console.log("Server connection closed: ", t.reason);
});
J.addEventListener("error", function (t) {
  console.log("WebSocket error: ", t);
});
new _e({ target: document.querySelector("body") });
