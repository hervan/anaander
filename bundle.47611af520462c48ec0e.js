!function(n) {
    function e(o) {
        if (t[o]) return t[o].exports;
        var i = t[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return n[o].call(i.exports, i, i.exports, e), i.l = !0, i.exports;
    }
    var t = {};
    e.m = n, e.c = t, e.i = function(n) {
        return n;
    }, e.d = function(n, t, o) {
        e.o(n, t) || Object.defineProperty(n, t, {
            configurable: !1,
            enumerable: !0,
            get: o
        });
    }, e.n = function(n) {
        var t = n && n.__esModule ? function() {
            return n.default;
        } : function() {
            return n;
        };
        return e.d(t, "a", t), t;
    }, e.o = function(n, e) {
        return Object.prototype.hasOwnProperty.call(n, e);
    }, e.p = "", e(e.s = 183);
}([ function(n, e, t) {
    "use strict";
    function o(n, e, t, o, r, a, s, l) {
        if (i(e), !n) {
            var c;
            if (void 0 === e) c = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings."); else {
                var u = [ t, o, r, a, s, l ], d = 0;
                c = new Error(e.replace(/%s/g, function() {
                    return u[d++];
                })), c.name = "Invariant Violation";
            }
            throw c.framesToPop = 1, c;
        }
    }
    var i = function(n) {};
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    var o = t(6), i = o;
    n.exports = i;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        for (var e = arguments.length - 1, t = "Minified React error #" + n + "; visit http://facebook.github.io/react/docs/error-decoder.html?invariant=" + n, o = 0; o < e; o++) t += "&args[]=" + encodeURIComponent(arguments[o + 1]);
        t += " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
        var i = new Error(t);
        throw i.name = "Invariant Violation", i.framesToPop = 1, i;
    }
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        if (null === n || void 0 === n) throw new TypeError("Object.assign cannot be called with null or undefined");
        return Object(n);
    }
    function i() {
        try {
            if (!Object.assign) return !1;
            var n = new String("abc");
            if (n[5] = "de", "5" === Object.getOwnPropertyNames(n)[0]) return !1;
            for (var e = {}, t = 0; t < 10; t++) e["_" + String.fromCharCode(t)] = t;
            if ("0123456789" !== Object.getOwnPropertyNames(e).map(function(n) {
                return e[n];
            }).join("")) return !1;
            var o = {};
            return "abcdefghijklmnopqrst".split("").forEach(function(n) {
                o[n] = n;
            }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, o)).join("");
        } catch (n) {
            return !1;
        }
    }
    var r = Object.getOwnPropertySymbols, a = Object.prototype.hasOwnProperty, s = Object.prototype.propertyIsEnumerable;
    n.exports = i() ? Object.assign : function(n, e) {
        for (var t, i, l = o(n), c = 1; c < arguments.length; c++) {
            t = Object(arguments[c]);
            for (var u in t) a.call(t, u) && (l[u] = t[u]);
            if (r) {
                i = r(t);
                for (var d = 0; d < i.length; d++) s.call(t, i[d]) && (l[i[d]] = t[i[d]]);
            }
        }
        return l;
    };
}, function(n, e, t) {
    "use strict";
    function o(n, e) {
        return 1 === n.nodeType && n.getAttribute(m) === String(e) || 8 === n.nodeType && n.nodeValue === " react-text: " + e + " " || 8 === n.nodeType && n.nodeValue === " react-empty: " + e + " ";
    }
    function i(n) {
        for (var e; e = n._renderedComponent; ) n = e;
        return n;
    }
    function r(n, e) {
        var t = i(n);
        t._hostNode = e, e[b] = t;
    }
    function a(n) {
        var e = n._hostNode;
        e && (delete e[b], n._hostNode = null);
    }
    function s(n, e) {
        if (!(n._flags & h.hasCachedChildNodes)) {
            var t = n._renderedChildren, a = e.firstChild;
            n: for (var s in t) if (t.hasOwnProperty(s)) {
                var l = t[s], c = i(l)._domID;
                if (0 !== c) {
                    for (;null !== a; a = a.nextSibling) if (o(a, c)) {
                        r(l, a);
                        continue n;
                    }
                    d("32", c);
                }
            }
            n._flags |= h.hasCachedChildNodes;
        }
    }
    function l(n) {
        if (n[b]) return n[b];
        for (var e = []; !n[b]; ) {
            if (e.push(n), !n.parentNode) return null;
            n = n.parentNode;
        }
        for (var t, o; n && (o = n[b]); n = e.pop()) t = o, e.length && s(o, n);
        return t;
    }
    function c(n) {
        var e = l(n);
        return null != e && e._hostNode === n ? e : null;
    }
    function u(n) {
        if (void 0 === n._hostNode && d("33"), n._hostNode) return n._hostNode;
        for (var e = []; !n._hostNode; ) e.push(n), n._hostParent || d("34"), n = n._hostParent;
        for (;e.length; n = e.pop()) s(n, n._hostNode);
        return n._hostNode;
    }
    var d = t(2), p = t(15), f = t(59), m = (t(0), p.ID_ATTRIBUTE_NAME), h = f, b = "__reactInternalInstance$" + Math.random().toString(36).slice(2), g = {
        getClosestInstanceFromNode: l,
        getInstanceFromNode: c,
        getNodeFromInstance: u,
        precacheChildNodes: s,
        precacheNode: r,
        uncacheNode: a
    };
    n.exports = g;
}, function(n, e, t) {
    "use strict";
    var o = !("undefined" == typeof window || !window.document || !window.document.createElement), i = {
        canUseDOM: o,
        canUseWorkers: "undefined" != typeof Worker,
        canUseEventListeners: o && !(!window.addEventListener && !window.attachEvent),
        canUseViewport: o && !!window.screen,
        isInWorker: !o
    };
    n.exports = i;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        return function() {
            return n;
        };
    }
    var i = function() {};
    i.thatReturns = o, i.thatReturnsFalse = o(!1), i.thatReturnsTrue = o(!0), i.thatReturnsNull = o(null), 
    i.thatReturnsThis = function() {
        return this;
    }, i.thatReturnsArgument = function(n) {
        return n;
    }, n.exports = i;
}, function(n, e, t) {
    "use strict";
    var o = null;
    n.exports = {
        debugTool: o
    };
}, function(n, e, t) {
    "use strict";
    n.exports = t(17);
}, function(n, e, t) {
    "use strict";
    function o() {
        M.ReactReconcileTransaction && w || u("123");
    }
    function i() {
        this.reinitializeTransaction(), this.dirtyComponentsLength = null, this.callbackQueue = p.getPooled(), 
        this.reconcileTransaction = M.ReactReconcileTransaction.getPooled(!0);
    }
    function r(n, e, t, i, r, a) {
        return o(), w.batchedUpdates(n, e, t, i, r, a);
    }
    function a(n, e) {
        return n._mountOrder - e._mountOrder;
    }
    function s(n) {
        var e = n.dirtyComponentsLength;
        e !== g.length && u("124", e, g.length), g.sort(a), x++;
        for (var t = 0; t < e; t++) {
            var o = g[t], i = o._pendingCallbacks;
            o._pendingCallbacks = null;
            var r;
            if (m.logTopLevelRenders) {
                var s = o;
                o._currentElement.type.isReactTopLevelWrapper && (s = o._renderedComponent), r = "React update: " + s.getName(), 
                console.time(r);
            }
            if (h.performUpdateIfNecessary(o, n.reconcileTransaction, x), r && console.timeEnd(r), 
            i) for (var l = 0; l < i.length; l++) n.callbackQueue.enqueue(i[l], o.getPublicInstance());
        }
    }
    function l(n) {
        if (o(), !w.isBatchingUpdates) return void w.batchedUpdates(l, n);
        g.push(n), null == n._updateBatchNumber && (n._updateBatchNumber = x + 1);
    }
    function c(n, e) {
        w.isBatchingUpdates || u("125"), v.enqueue(n, e), y = !0;
    }
    var u = t(2), d = t(3), p = t(57), f = t(13), m = t(62), h = t(16), b = t(27), g = (t(0), 
    []), x = 0, v = p.getPooled(), y = !1, w = null, k = {
        initialize: function() {
            this.dirtyComponentsLength = g.length;
        },
        close: function() {
            this.dirtyComponentsLength !== g.length ? (g.splice(0, this.dirtyComponentsLength), 
            C()) : g.length = 0;
        }
    }, A = {
        initialize: function() {
            this.callbackQueue.reset();
        },
        close: function() {
            this.callbackQueue.notifyAll();
        }
    }, E = [ k, A ];
    d(i.prototype, b, {
        getTransactionWrappers: function() {
            return E;
        },
        destructor: function() {
            this.dirtyComponentsLength = null, p.release(this.callbackQueue), this.callbackQueue = null, 
            M.ReactReconcileTransaction.release(this.reconcileTransaction), this.reconcileTransaction = null;
        },
        perform: function(n, e, t) {
            return b.perform.call(this, this.reconcileTransaction.perform, this.reconcileTransaction, n, e, t);
        }
    }), f.addPoolingTo(i);
    var C = function() {
        for (;g.length || y; ) {
            if (g.length) {
                var n = i.getPooled();
                n.perform(s, null, n), i.release(n);
            }
            if (y) {
                y = !1;
                var e = v;
                v = p.getPooled(), e.notifyAll(), p.release(e);
            }
        }
    }, _ = {
        injectReconcileTransaction: function(n) {
            n || u("126"), M.ReactReconcileTransaction = n;
        },
        injectBatchingStrategy: function(n) {
            n || u("127"), "function" != typeof n.batchedUpdates && u("128"), "boolean" != typeof n.isBatchingUpdates && u("129"), 
            w = n;
        }
    }, M = {
        ReactReconcileTransaction: null,
        batchedUpdates: r,
        enqueueUpdate: l,
        flushBatchedUpdates: C,
        injection: _,
        asap: c
    };
    n.exports = M;
}, function(n, e, t) {
    "use strict";
    function o(n, e, t, o) {
        this.dispatchConfig = n, this._targetInst = e, this.nativeEvent = t;
        var i = this.constructor.Interface;
        for (var r in i) if (i.hasOwnProperty(r)) {
            var s = i[r];
            s ? this[r] = s(t) : "target" === r ? this.target = o : this[r] = t[r];
        }
        var l = null != t.defaultPrevented ? t.defaultPrevented : !1 === t.returnValue;
        return this.isDefaultPrevented = l ? a.thatReturnsTrue : a.thatReturnsFalse, this.isPropagationStopped = a.thatReturnsFalse, 
        this;
    }
    var i = t(3), r = t(13), a = t(6), s = (t(1), [ "dispatchConfig", "_targetInst", "nativeEvent", "isDefaultPrevented", "isPropagationStopped", "_dispatchListeners", "_dispatchInstances" ]), l = {
        type: null,
        target: null,
        currentTarget: a.thatReturnsNull,
        eventPhase: null,
        bubbles: null,
        cancelable: null,
        timeStamp: function(n) {
            return n.timeStamp || Date.now();
        },
        defaultPrevented: null,
        isTrusted: null
    };
    i(o.prototype, {
        preventDefault: function() {
            this.defaultPrevented = !0;
            var n = this.nativeEvent;
            n && (n.preventDefault ? n.preventDefault() : "unknown" != typeof n.returnValue && (n.returnValue = !1), 
            this.isDefaultPrevented = a.thatReturnsTrue);
        },
        stopPropagation: function() {
            var n = this.nativeEvent;
            n && (n.stopPropagation ? n.stopPropagation() : "unknown" != typeof n.cancelBubble && (n.cancelBubble = !0), 
            this.isPropagationStopped = a.thatReturnsTrue);
        },
        persist: function() {
            this.isPersistent = a.thatReturnsTrue;
        },
        isPersistent: a.thatReturnsFalse,
        destructor: function() {
            var n = this.constructor.Interface;
            for (var e in n) this[e] = null;
            for (var t = 0; t < s.length; t++) this[s[t]] = null;
        }
    }), o.Interface = l, o.augmentClass = function(n, e) {
        var t = this, o = function() {};
        o.prototype = t.prototype;
        var a = new o();
        i(a, n.prototype), n.prototype = a, n.prototype.constructor = n, n.Interface = i({}, t.Interface, e), 
        n.augmentClass = t.augmentClass, r.addPoolingTo(n, r.fourArgumentPooler);
    }, r.addPoolingTo(o, r.fourArgumentPooler), n.exports = o;
}, function(n, e, t) {
    "use strict";
    var o = {
        current: null
    };
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        return (n + 1) % 2;
    }
    function i(n, e) {
        return e < 1 ? n.team : (n.team + 1) % e;
    }
    function r(n) {
        let {round: round,  team: team,  side: side} = n.turn, e = n.players.filter(e => e.usedActions < e.cities.length + 1 && u(n, e.team).length > 0).map(n => n.team);
        if (0 === e.length) round++, team = -1, side = o(side); else do {
            team = i({
                round: round,
                team: team,
                side: side
            }, n.players.length);
        } while (!e.some(n => n === team));
        return Object.assign({}, n, {
            turn: {
                round: round,
                team: team,
                side: side
            }
        });
    }
    function a(n) {
        return n.players.filter(n => n.swarmSize > 0).length < 2;
    }
    function s(n, e) {
        return n.row * e + n.col;
    }
    function l(n, e, t = n.turn.team) {
        const o = n.terrains[s(e, n.boardSize)].topMeeple;
        return -1 !== o && n.meeples[o].team === t && c(n, o).every(n => n.team === t);
    }
    function c(n, e, t = []) {
        const o = n.meeples[e];
        return o ? -1 !== o.topsMeeple ? c(n, o.topsMeeple, [ ...t, o ]) : [ ...t, o ] : t;
    }
    function u(n, e) {
        return n.terrains.filter(t => d(n, t.position, e)).map(e => n.meeples[e.topMeeple]);
    }
    function d(n, e, t) {
        const o = n.terrains[s(e, n.boardSize)], i = o.topMeeple, r = n.meeples[i];
        return -1 !== i && r.team === (void 0 !== t ? t : n.turn.team) && r.side === n.turn.side;
    }
    function p(n, e, t) {
        let o = t || [];
        const i = n.terrains[s(e, n.boardSize)], r = n.meeples[i.topMeeple];
        return d(n, e) && !o.some(t => e.row === n.meeples[t].position.row && e.col === n.meeples[t].position.col) && ("city" === i.construction.type && i.construction.team !== r.team && i.spaceLeft > 0 ? 0 === o.length && o.push(r.key) : (o.push(r.key), 
        o = f(e, n.boardSize).reduce((e, t) => p(n, t, e), o))), o.sort((e, t) => s(n.meeples[e].position, n.boardSize) - s(n.meeples[t].position, n.boardSize));
    }
    function f(n, e) {
        return h(n, e).concat(b(n, e));
    }
    function m(n, e) {
        return n.row >= 0 && n.col >= 0 && n.row < e && n.col < e;
    }
    function h(n, e) {
        const t = [];
        return m(n, e) ? (n.row > 0 && t.push({
            row: n.row - 1,
            col: n.col
        }), n.col > 0 && t.push({
            row: n.row,
            col: n.col - 1
        }), n.row < e - 1 && t.push({
            row: n.row + 1,
            col: n.col
        }), n.col < e - 1 && t.push({
            row: n.row,
            col: n.col + 1
        }), t) : t;
    }
    function b(n, e) {
        const t = [];
        return m(n, e) ? (n.row > 0 && n.col > 0 && t.push({
            row: n.row - 1,
            col: n.col - 1
        }), n.row > 0 && n.col < e - 1 && t.push({
            row: n.row - 1,
            col: n.col + 1
        }), n.row < e - 1 && n.col > 0 && t.push({
            row: n.row + 1,
            col: n.col - 1
        }), n.row < e - 1 && n.col < e - 1 && t.push({
            row: n.row + 1,
            col: n.col + 1
        }), t) : t;
    }
    function g(n, e) {
        if (n.turn.team !== e.team) return Object.assign({}, n, {
            outcome: [ {
                type: "invalid",
                explanation: F.NotYourTurn
            } ]
        });
        if (n.players[n.turn.team].usedActions > n.players[n.turn.team].cities.length) return Object.assign({}, n, {
            outcome: [ {
                type: "invalid",
                explanation: F.NoActions
            } ]
        });
        if (0 === e.selection.length) return Object.assign({}, n, {
            outcome: [ {
                type: "invalid",
                explanation: F.NoSelection
            } ]
        });
        const t = x(n, e.action, e.selection);
        if (t.outcome.some(n => "invalid" !== n.type) && t.players[t.turn.team].usedActions++, 
        a(t)) return Object.assign({}, t, {
            outcome: [ {
                type: "gameover"
            } ]
        });
        {
            const n = r(t);
            return n.turn.side !== t.turn.side ? (n.players = n.players.map(n => Object.assign({}, n, {
                usedActions: 0
            })), Object.assign({}, r(n), {
                outcome: [ {
                    type: "action",
                    action: e.action
                } ]
            })) : Object.assign({}, n, {
                outcome: [ {
                    type: "action",
                    action: e.action
                } ]
            });
        }
    }
    function x(n, e, t) {
        const o = t.map(e => s(n.meeples[e].position, n.boardSize));
        return (e === O.right || e === O.down ? o.reverse() : o).map(e => n.terrains[e].topMeeple).reduce((n, t) => _(n, e, t), Object.assign({}, n, {
            outcome: []
        }));
    }
    function v(n, e) {
        const t = n.meeples.slice(), i = n.players[n.turn.team], r = n.terrains[s(e, n.boardSize)], a = t[r.topMeeple];
        for (let c of z.filter((n, e) => "blueprint" === i.buildingPhase[e])) {
            let {i: i,  piece: piece,  shape: shape} = c, u = [ ...shape ];
            for (let c = 0; c < 2; c++) {
                for (let c = 0; c < 4; c++) {
                    const c = u.map(n => ({
                        row: e.row + n.row,
                        col: e.col + n.col
                    }));
                    if (c.every(e => m(e, n.boardSize) && "emptysite" === n.terrains[s(e, n.boardSize)].construction.type && l(n, e))) {
                        const e = n.terrains.slice(), l = o(a.side);
                        c.forEach(o => {
                            const i = t[e[s(o, n.boardSize)].topMeeple];
                            i.side = l;
                            t[i.key] = i;
                        }), r.construction = {
                            type: "building",
                            team: n.turn.team,
                            blueprint: piece,
                            name: j[piece]
                        }, e[s(r.position, n.boardSize)] = r;
                        const u = n.players.slice();
                        return i.buildingPhase[i] = "built", u[i.team] = i, Object.assign({}, n, {
                            players: u,
                            terrains: e,
                            meeples: t,
                            outcome: [ ...n.outcome, {
                                type: "action",
                                action: O.explore
                            } ]
                        });
                    }
                    u = S(u);
                }
                u = N(u);
            }
        }
        return a.side = o(a.side), t[a.key] = a, Object.assign({}, n, {
            meeples: t
        });
    }
    function y(n, e) {
        if (l(n, e)) {
            const t = n.terrains.slice(), o = n.players.slice(), i = n.terrains[s(e, n.boardSize)], r = o[n.turn.team];
            return L[i.geography].resources.forEach(n => {
                r.resources[n] += i.resources[n];
                i.resources[n] = 0;
            }), t[s(e, n.boardSize)] = i, o[n.turn.team] = r, v(Object.assign({}, n, {
                terrains: t,
                players: o,
                outcome: [ ...n.outcome, {
                    type: "action",
                    action: O.explore
                } ]
            }), e);
        }
        return Object.assign({}, n, {
            outcome: [ ...n.outcome, {
                type: "invalid",
                explanation: F.NotOnGround
            } ]
        });
    }
    function w(n, e, t) {
        const o = n.players.slice(), i = n.meeples.slice();
        return t.team < o.length && o[t.team].swarmSize--, t.team = e.team, o[e.team].swarmSize++, 
        e.resistance += t.resistance, i[e.key] = e, i[t.key] = t, Object.assign({}, n, {
            players: o,
            meeples: i
        });
    }
    function k(n, e, t) {
        const o = n.players.slice(), i = n.meeples.slice(), r = n.terrains.slice(), a = r[s(e.position, n.boardSize)];
        return t.resistance -= e.strength, e.resistance -= t.strength, t.resistance <= 0 && (t.key = -1, 
        e.topsMeeple = t.topsMeeple, e.faith += t.faith, a.spaceLeft++, t.team < o.length && o[t.team].swarmSize--), 
        e.resistance <= 0 && (e.key = -1, a.topMeeple = e.topsMeeple, t.faith += e.faith, 
        a.spaceLeft++, o[e.team].swarmSize--), Object.assign({}, n, {
            players: o,
            meeples: i,
            terrains: r
        });
    }
    function A(n, e) {
        const t = n.meeples[n.terrains[s(e, n.boardSize)].topMeeple], o = n.meeples[t.topsMeeple];
        return t.faith > o.faith + o.strength ? w(n, t, o) : k(n, t, o);
    }
    function E(n, e, t) {
        const o = n.terrains[s(t, n.boardSize)];
        if ("city" !== o.construction.type) return n;
        const i = o.construction;
        if (c(n, e.key).reduce((n, e) => n + e.strength, 0) >= i.defense) {
            const r = n.players.slice();
            if (i.team !== I.default) {
                const n = r[i.team];
                n.cities.splice(n.cities.findIndex(n => n === i.key), 1), r[n.team] = n;
            }
            i.team = e.team;
            const a = n.terrains.slice();
            a[s(t, n.boardSize)] = Object.assign({}, o, {
                construction: i
            });
            const l = r[e.team];
            "notbuilt" === l.buildingPhase[o.geography - 2] && (l.buildingPhase[o.geography - 2] = "blueprint"), 
            l.cities.push(i.key), r[l.team] = l;
            const c = n.meeples.slice();
            return e.strength += Math.floor(Math.sqrt(e.strength * i.defense)), c[e.key] = e, 
            Object.assign({}, n, {
                terrains: a,
                meeples: c,
                players: r
            });
        }
        return n;
    }
    function C(n, e, t) {
        const i = Object.assign({}, t.position), r = Object.assign({}, t.position);
        switch (e) {
          case O.up:
            r.row = i.row - 1;
            break;

          case O.left:
            r.col = i.col - 1;
            break;

          case O.down:
            r.row = i.row + 1;
            break;

          case O.right:
            r.col = i.col + 1;
        }
        if (!h(i, n.boardSize).some(n => n.row === r.row && n.col === r.col)) return Object.assign({}, n, {
            outcome: [ ...n.outcome, {
                type: "invalid",
                explanation: F.OutOfBoard
            } ]
        });
        const a = n.terrains[s(i, n.boardSize)], c = n.terrains[s(r, n.boardSize)];
        if (c.spaceLeft < 1) return Object.assign({}, n, {
            outcome: [ ...n.outcome, {
                type: "invalid",
                explanation: F.TerrainIsCrowded
            } ]
        });
        a.topMeeple = t.topsMeeple, a.spaceLeft++;
        const u = n.meeples.slice();
        if (t.side = o(t.side), -1 !== a.topMeeple) {
            const e = u[a.topMeeple];
            e.team < n.players.length && (e.side = e.team > t.team ? n.turn.side : t.side, u[a.topMeeple] = e);
        } else L[a.geography].resources.forEach(n => a.resources[n]++);
        t.topsMeeple = c.topMeeple, t.position = r, u[t.key] = t, c.topMeeple = t.key, c.spaceLeft--;
        const d = n.terrains.slice();
        d[s(i, n.boardSize)] = a, d[s(r, n.boardSize)] = c;
        const p = Object.assign({}, n, {
            terrains: d,
            meeples: u,
            outcome: [ ...n.outcome, {
                type: "action",
                action: e
            } ]
        });
        let f = p;
        -1 !== t.topsMeeple && u[t.key].team !== u[t.topsMeeple].team && (f = A(p, r));
        let m = f;
        return "city" === c.construction.type && c.construction.team !== t.team && l(f, t.position) && (m = E(f, t, r)), 
        m;
    }
    function _(n, e, t) {
        if (t < 0 || !(t < n.meeples.length)) return Object.assign({}, n, {
            outcome: [ ...n.outcome, {
                type: "invalid",
                explanation: F.MeepleNotAvailable
            } ]
        });
        const i = n.meeples[t];
        if (!d(n, i.position)) return Object.assign({}, n, {
            outcome: [ ...n.outcome, {
                type: "invalid",
                explanation: F.MeepleNotAvailable
            } ]
        });
        const r = n.meeples.slice();
        switch (e) {
          case O.hold:
            return i.side = o(i.side), i.resistance++, r[t] = i, Object.assign({}, n, {
                meeples: r,
                outcome: [ ...n.outcome, {
                    type: "action",
                    action: e
                } ]
            });

          case O.explore:
            return y(n, i.position);

          case O.up:
          case O.left:
          case O.down:
          case O.right:
            return C(n, e, i);
        }
    }
    function M(n) {
        return Object.assign({}, n, {
            turn: {
                round: 0,
                side: U.heads,
                team: n.players.length > 0 ? n.players[0].team : I.default
            }
        });
    }
    function N(n) {
        return n.map(({row: row,  col: col}) => ({
            row: row,
            col: -1 * col
        }));
    }
    function S(n) {
        return n.map(({row: row,  col: col}) => ({
            row: -1 * col,
            col: row
        }));
    }
    function T(n = 0, e = 32) {
        const t = [ "Argos", "Athens", "Byblos", "Damascus", "Luxor", "Jericho", "Beirut", "Plovdiv", "Aleppo", "Sidon", "Rey", "Jerusalem", "Luoyang", "Varanasi", "Balkh", "Xi'an", "Handan", "Beijing", "Zibo", "Susa", "Gaziantep", "Tyre", "Jenin", "Homs", "Erbil", "Kirkuk", "Jaffa", "Hebron", "Gaza", "Kutaisi", "Chania", "Thebes", "Larnaca", "Trikala", "Chalcis", "Lisbon", "Gadir", "Patras", "Chios", "Nicosia", "Zadar", "Mtskheta", "Mytilene" ], o = new Array(), i = Math.ceil(Math.sqrt(5 * n)), r = e / i, a = Math.PI * Math.pow((r - .5) / 2, 2), l = [ ...Array(Math.pow(i, 2)).keys() ].map(n => ({
            row: Math.round(r / 2 + r * Math.floor(n / i)),
            col: Math.round(r / 2 + r * (n % i))
        }));
        let c = 0;
        for (;l.length > 0 && c < Math.pow(i, 2); ) {
            const n = l.splice(Math.floor(Math.random() * l.length), 1)[0];
            if (!o[s(n, e)]) {
                const i = [ n ];
                let l = Math.pow(r, 2);
                do {
                    l--;
                    let n, t = a;
                    do {
                        t--, n = h(i[Math.floor(Math.random() * i.length)], e).filter(n => i.every(e => e.row !== n.row || e.col !== n.col)).filter(n => !o[s(n, e)]).filter(n => f(n, e).every(n => !o[s(n, e)])).find((n, e, t) => Math.random() < 1 / (t.length - e));
                    } while (!n && t > 0);
                    t > 0 && i.push(n);
                } while (l > 0 && Math.random() > (1 - Math.tanh((a - i.length) / Math.sqrt(2))) / 2);
                let c;
                do {
                    c = i[Math.floor(Math.random() * i.length)];
                } while (4 !== h(c, e).length || !h(c, e).every(n => m(n, e)));
                i.push(...f(c, e).filter(n => i.every(e => e.row !== n.row || e.col !== n.col)));
                const u = Math.ceil(5 * Math.random()) + 1, d = [];
                i.forEach(n => {
                    let r = u;
                    let a = {
                        type: "emptysite"
                    };
                    n.row === c.row && n.col === c.col && (r--, a = {
                        type: "city",
                        key: s(n, e),
                        name: t.splice(Math.floor(Math.random() * t.length), 1)[0],
                        defense: 10 + r * Math.ceil(5 * Math.random()),
                        team: I.default
                    });
                    o[s(n, e)] = {
                        geography: u,
                        position: n,
                        spaceLeft: r,
                        topMeeple: -1,
                        resources: [ ...Array(4).keys() ].map(n => 0),
                        construction: a
                    };
                    d.push(...f(n, e).filter(n => i.every(e => n.row !== e.row || n.col !== e.col)).filter(t => m(n, e)).filter(n => !o[s(n, e)]));
                }), d.forEach(n => {
                    o[s(n, e)] = {
                        geography: R.desert,
                        position: n,
                        spaceLeft: 1,
                        topMeeple: -1,
                        resources: [ ...Array(4).keys() ].map(n => 0),
                        construction: {
                            type: "emptysite"
                        }
                    };
                });
            }
            c++;
        }
        let u = n;
        const d = new Array();
        for (let n = 0; n < e; n++) for (let t = 0; t < e; t++) {
            const i = {
                row: n,
                col: t
            }, r = o[s(i, e)] ? o[s(i, e)] : {
                geography: f(i, e).every(n => void 0 === o[s(n, e)] || o[s(n, e)].geography === R.sea || o[s(n, e)].geography === R.desert) ? R.sea : R.desert,
                position: i,
                spaceLeft: 1,
                topMeeple: -1,
                resources: [ ...Array(4).keys() ].map(n => 0),
                construction: {
                    type: "emptysite"
                }
            };
            r.geography;
            let a = -1, l = r.geography === R.sea ? 0 : r.spaceLeft;
            if ("emptysite" === r.construction.type && Math.random() < .1 * (l - 1)) {
                const n = {
                    key: u++,
                    position: i,
                    team: I.default,
                    side: U.heads,
                    strength: Math.ceil(5 * Math.random()),
                    resistance: Math.ceil(15 * Math.random()),
                    faith: Math.ceil(15 * Math.random()),
                    topsMeeple: -1
                };
                a = n.key, l--, d[n.key] = n;
            }
            o[s(i, e)] = Object.assign({}, r, {
                spaceLeft: l,
                topMeeple: a
            });
        }
        const p = new Array();
        u = 0;
        for (let t = I.info; t < n; t++) {
            let n;
            do {
                n = {
                    row: Math.floor(Math.random() * (e - 2)) + 1,
                    col: Math.floor(Math.random() * (e - 2)) + 1
                };
            } while ("emptysite" !== o[s(n, e)].construction.type || o[s(n, e)].topMeeple > -1 || o[s(n, e)].spaceLeft < 1);
            const i = {
                key: u++,
                position: n,
                team: t,
                side: U.heads,
                strength: 10 + Math.ceil(5 * Math.random()),
                resistance: 20 + Math.ceil(10 * Math.random()),
                faith: 20 + Math.ceil(10 * Math.random()),
                topsMeeple: -1
            };
            o[s(n, e)].topMeeple = i.key, o[s(n, e)].spaceLeft--, d[i.key] = i, p[t] = {
                team: t,
                cities: [],
                swarmSize: d.filter(n => n.team === t).length,
                buildingPhase: [ ...Array(5).keys() ].map(n => "notbuilt"),
                usedActions: 0,
                resources: [ ...Array(4).keys() ].map(n => 0)
            };
        }
        return {
            boardSize: e,
            players: p,
            terrains: o,
            meeples: d,
            turn: {
                round: 0,
                team: I.default,
                side: U.none
            },
            outcome: [ {
                type: "none"
            } ]
        };
    }
    function P(n) {
        const e = (n, e, t = -1) => {
            const o = (n + e) % 7;
            return {
                position: {
                    row: n,
                    col: e
                },
                geography: o,
                spaceLeft: o,
                topMeeple: t,
                resources: [ ...Array(4).keys() ].map(n => 0),
                construction: {
                    type: "emptysite"
                }
            };
        };
        return [ M(T(5)), {
            boardSize: 32,
            players: [],
            terrains: [ ...Array(32).keys() ].reduce((n, t) => n.concat([ ...Array(32).keys() ].map(n => e(t, n))), []),
            meeples: [],
            turn: {
                round: 0,
                team: I.info,
                side: U.heads
            },
            outcome: [ {
                type: "none"
            } ]
        }, {
            boardSize: 3,
            players: [],
            terrains: [ ...Array(3).keys() ].reduce((n, t) => n.concat([ ...Array(3).keys() ].map(n => 1 === t && 1 === n ? e(t, n, 0) : e(t, n))), []),
            meeples: [ {
                key: 0,
                position: {
                    row: 1,
                    col: 1
                },
                team: I.info,
                side: U.heads,
                strength: 10,
                resistance: 30,
                faith: 30,
                topsMeeple: -1
            } ],
            turn: {
                round: 0,
                team: I.info,
                side: U.heads
            },
            outcome: [ {
                type: "none"
            } ]
        }, {
            boardSize: 6,
            players: [],
            terrains: [ ...Array(6).keys() ].reduce((n, t) => n.concat([ ...Array(6).keys() ].map(n => t === n ? e(t, n, t) : e(t, n))), []),
            meeples: [ {
                key: 0,
                position: {
                    row: 0,
                    col: 0
                },
                team: I.info,
                side: U.heads,
                strength: 10,
                resistance: 30,
                faith: 30,
                topsMeeple: -1
            }, {
                key: 1,
                position: {
                    row: 1,
                    col: 1
                },
                team: I.warning,
                side: U.heads,
                strength: 10,
                resistance: 30,
                faith: 30,
                topsMeeple: -1
            }, {
                key: 2,
                position: {
                    row: 2,
                    col: 2
                },
                team: I.success,
                side: U.heads,
                strength: 10,
                resistance: 30,
                faith: 30,
                topsMeeple: -1
            }, {
                key: 3,
                position: {
                    row: 3,
                    col: 3
                },
                team: I.danger,
                side: U.heads,
                strength: 10,
                resistance: 30,
                faith: 30,
                topsMeeple: -1
            }, {
                key: 4,
                position: {
                    row: 4,
                    col: 4
                },
                team: I.primary,
                side: U.heads,
                strength: 10,
                resistance: 30,
                faith: 30,
                topsMeeple: -1
            }, {
                key: 5,
                position: {
                    row: 5,
                    col: 5
                },
                team: I.default,
                side: U.heads,
                strength: 5,
                resistance: 15,
                faith: 15,
                topsMeeple: -1
            } ],
            turn: {
                round: 0,
                team: I.info,
                side: U.heads
            },
            outcome: [ {
                type: "none"
            } ]
        }, {
            boardSize: 4,
            players: [ {
                team: I.info,
                cities: [],
                swarmSize: 1,
                buildingPhase: [ ...Array(5).keys() ].map(n => "notbuilt"),
                usedActions: 0,
                resources: [ ...Array(4).keys() ].map(n => 0)
            } ],
            terrains: [ ...Array(4).keys() ].reduce((n, t) => n.concat([ ...Array(4).keys() ].map(n => 1 === t && 1 === n ? e(t, n, 0) : e(t, n))), []),
            meeples: [ {
                key: 0,
                position: {
                    row: 1,
                    col: 1
                },
                team: I.info,
                side: U.heads,
                strength: 10,
                resistance: 30,
                faith: 30,
                topsMeeple: -1
            } ],
            turn: {
                round: 0,
                team: I.info,
                side: U.heads
            },
            outcome: [ {
                type: "none"
            } ]
        }, {
            boardSize: 4,
            players: [ {
                team: I.info,
                cities: [],
                swarmSize: 1,
                buildingPhase: [ ...Array(5).keys() ].map(n => "notbuilt"),
                usedActions: 0,
                resources: [ ...Array(4).keys() ].map(n => 0)
            } ],
            terrains: [ ...Array(4).keys() ].reduce((n, t) => n.concat([ ...Array(4).keys() ].map(n => 1 === t && 2 === n ? e(t, n, 0) : 1 === t && 1 === n ? e(t, n, 1) : e(t, n))), []),
            meeples: [ {
                key: 0,
                position: {
                    row: 1,
                    col: 2
                },
                team: I.info,
                side: U.heads,
                strength: 10,
                resistance: 30,
                faith: 30,
                topsMeeple: -1
            }, {
                key: 1,
                position: {
                    row: 1,
                    col: 1
                },
                team: I.default,
                side: U.heads,
                strength: 10,
                resistance: 30,
                faith: 30,
                topsMeeple: -1
            } ],
            turn: {
                round: 0,
                team: I.info,
                side: U.heads
            },
            outcome: [ {
                type: "none"
            } ]
        }, {
            boardSize: 4,
            players: [ {
                team: I.info,
                cities: [],
                swarmSize: 1,
                buildingPhase: [ ...Array(5).keys() ].map(n => "notbuilt"),
                usedActions: 0,
                resources: [ ...Array(4).keys() ].map(n => 0)
            } ],
            terrains: [ ...Array(4).keys() ].reduce((n, t) => n.concat([ ...Array(4).keys() ].map(n => 3 === t && 2 === n ? e(t, n, 0) : 1 === t && 1 === n ? e(t, n, 1) : e(t, n))), []),
            meeples: [ {
                key: 0,
                position: {
                    row: 3,
                    col: 2
                },
                team: I.info,
                side: U.heads,
                strength: 10,
                resistance: 30,
                faith: 30,
                topsMeeple: -1
            }, {
                key: 1,
                position: {
                    row: 1,
                    col: 1
                },
                team: I.default,
                side: U.heads,
                strength: 5,
                resistance: 15,
                faith: 15,
                topsMeeple: -1
            } ],
            turn: {
                round: 0,
                team: I.info,
                side: U.heads
            },
            outcome: [ {
                type: "none"
            } ]
        }, {
            boardSize: 4,
            players: [ {
                team: I.info,
                cities: [],
                swarmSize: 1,
                buildingPhase: [ ...Array(5).keys() ].map(n => "notbuilt"),
                usedActions: 0,
                resources: [ ...Array(4).keys() ].map(n => 0)
            } ],
            terrains: [ ...Array(4).keys() ].reduce((n, t) => n.concat([ ...Array(4).keys() ].map(n => 3 === t && 2 === n ? e(t, n, 0) : 1 === t && 1 === n ? e(t, n, 1) : e(t, n))), []),
            meeples: [ {
                key: 0,
                position: {
                    row: 3,
                    col: 2
                },
                team: I.info,
                side: U.heads,
                strength: 10,
                resistance: 30,
                faith: 30,
                topsMeeple: -1
            }, {
                key: 1,
                position: {
                    row: 1,
                    col: 1
                },
                team: I.default,
                side: U.heads,
                strength: 10,
                resistance: 20,
                faith: 20,
                topsMeeple: -1
            } ],
            turn: {
                round: 0,
                team: I.info,
                side: U.heads
            },
            outcome: [ {
                type: "none"
            } ]
        }, {
            boardSize: 4,
            players: [ {
                team: I.info,
                cities: [],
                swarmSize: 1,
                buildingPhase: [ ...Array(5).keys() ].map(n => "notbuilt"),
                usedActions: 0,
                resources: [ ...Array(4).keys() ].map(n => 0)
            } ],
            terrains: [ ...Array(4).keys() ].reduce((n, t) => n.concat([ ...Array(4).keys() ].map(n => 3 === t && 2 === n ? e(t, n, 0) : 1 === t && 1 === n ? e(t, n, 1) : e(t, n))), []),
            meeples: [ {
                key: 0,
                position: {
                    row: 3,
                    col: 2
                },
                team: I.info,
                side: U.heads,
                strength: 10,
                resistance: 30,
                faith: 30,
                topsMeeple: -1
            }, {
                key: 1,
                position: {
                    row: 1,
                    col: 1
                },
                team: I.default,
                side: U.heads,
                strength: 10,
                resistance: 10,
                faith: 20,
                topsMeeple: -1
            } ],
            turn: {
                round: 0,
                team: I.info,
                side: U.heads
            },
            outcome: [ {
                type: "none"
            } ]
        }, {
            boardSize: 6,
            players: [ {
                team: I.info,
                cities: [],
                swarmSize: 5,
                buildingPhase: [ ...Array(5).keys() ].map(n => "notbuilt"),
                usedActions: 0,
                resources: [ ...Array(4).keys() ].map(n => 0)
            } ],
            terrains: [ e(0, 0), e(0, 1), e(0, 2), e(0, 3), e(0, 4, 5), e(0, 5), e(1, 0), e(1, 1, 6), e(1, 2, 0), e(1, 3), e(1, 4), e(1, 5), e(2, 0), e(2, 1), e(2, 2), e(2, 3, 1), e(2, 4), e(2, 5), e(3, 0), e(3, 1, 4), e(3, 2, 3), e(3, 3, 2), e(3, 4), e(3, 5), e(4, 0), e(4, 1), e(4, 2), e(4, 3), e(4, 4), e(4, 5), e(5, 0), e(5, 1), e(5, 2), e(5, 3), e(5, 4), e(5, 5) ],
            meeples: [ {
                key: 0,
                position: {
                    row: 1,
                    col: 2
                },
                team: I.info,
                side: U.heads,
                strength: 10,
                resistance: 30,
                faith: 30,
                topsMeeple: -1
            }, {
                key: 1,
                position: {
                    row: 2,
                    col: 3
                },
                team: I.info,
                side: U.heads,
                strength: 10,
                resistance: 30,
                faith: 30,
                topsMeeple: -1
            }, {
                key: 2,
                position: {
                    row: 3,
                    col: 3
                },
                team: I.info,
                side: U.heads,
                strength: 10,
                resistance: 30,
                faith: 30,
                topsMeeple: -1
            }, {
                key: 3,
                position: {
                    row: 3,
                    col: 2
                },
                team: I.info,
                side: U.heads,
                strength: 10,
                resistance: 30,
                faith: 30,
                topsMeeple: -1
            }, {
                key: 4,
                position: {
                    row: 3,
                    col: 1
                },
                team: I.info,
                side: U.heads,
                strength: 10,
                resistance: 30,
                faith: 30,
                topsMeeple: -1
            }, {
                key: 5,
                position: {
                    row: 0,
                    col: 4
                },
                team: I.default,
                side: U.heads,
                strength: 5,
                resistance: 15,
                faith: 15,
                topsMeeple: -1
            }, {
                key: 6,
                position: {
                    row: 1,
                    col: 1
                },
                team: I.default,
                side: U.heads,
                strength: 5,
                resistance: 15,
                faith: 15,
                topsMeeple: -1
            } ],
            turn: {
                round: 0,
                team: I.info,
                side: U.heads
            },
            outcome: [ {
                type: "none"
            } ]
        }, {
            boardSize: 8,
            players: [],
            terrains: [ e(0, 0), e(0, 1), e(0, 2), e(0, 3), e(0, 4), e(0, 5), e(0, 6), e(0, 7), e(1, 0), e(1, 1, 5), e(1, 2), e(1, 3), e(1, 4), e(1, 5), e(1, 6, 0), e(1, 7), e(2, 0), e(2, 1, 6), e(2, 2), e(2, 3), e(2, 4), e(2, 5), e(2, 6), e(2, 7), e(3, 0), e(3, 1, 7), e(3, 2, 11), e(3, 3, 12), e(3, 4), e(3, 5), e(3, 6, 1), e(3, 7), e(4, 0), e(4, 1, 8), e(4, 2), e(4, 3), e(4, 4, 13), e(4, 5), e(4, 6, 2), e(4, 7), e(5, 0), e(5, 1, 9), e(5, 2), e(5, 3), e(5, 4, 14), e(5, 5), e(5, 6, 3), e(5, 7), e(6, 0), e(6, 1, 10), e(6, 2), e(6, 3), e(6, 4, 15), e(6, 5), e(6, 6, 4), e(6, 7), e(7, 0), e(7, 1), e(7, 2), e(7, 3), e(7, 4), e(7, 5), e(7, 6), e(7, 7) ],
            meeples: [ {
                key: 0,
                position: {
                    row: 1,
                    col: 6
                },
                team: I.default,
                side: U.heads,
                strength: 5,
                resistance: 15,
                faith: 15,
                topsMeeple: -1
            }, {
                key: 1,
                position: {
                    row: 3,
                    col: 6
                },
                team: I.default,
                side: U.heads,
                strength: 5,
                resistance: 15,
                faith: 15,
                topsMeeple: -1
            }, {
                key: 2,
                position: {
                    row: 4,
                    col: 6
                },
                team: I.default,
                side: U.heads,
                strength: 5,
                resistance: 15,
                faith: 15,
                topsMeeple: -1
            }, {
                key: 3,
                position: {
                    row: 5,
                    col: 6
                },
                team: I.default,
                side: U.heads,
                strength: 5,
                resistance: 15,
                faith: 15,
                topsMeeple: -1
            }, {
                key: 4,
                position: {
                    row: 6,
                    col: 6
                },
                team: I.default,
                side: U.heads,
                strength: 5,
                resistance: 15,
                faith: 15,
                topsMeeple: -1
            }, {
                key: 5,
                position: {
                    row: 1,
                    col: 1
                },
                team: I.default,
                side: U.heads,
                strength: 5,
                resistance: 15,
                faith: 15,
                topsMeeple: -1
            }, {
                key: 6,
                position: {
                    row: 2,
                    col: 1
                },
                team: I.default,
                side: U.heads,
                strength: 5,
                resistance: 15,
                faith: 15,
                topsMeeple: -1
            }, {
                key: 7,
                position: {
                    row: 3,
                    col: 1
                },
                team: I.default,
                side: U.heads,
                strength: 5,
                resistance: 15,
                faith: 15,
                topsMeeple: -1
            }, {
                key: 8,
                position: {
                    row: 4,
                    col: 1
                },
                team: I.default,
                side: U.heads,
                strength: 5,
                resistance: 15,
                faith: 15,
                topsMeeple: -1
            }, {
                key: 9,
                position: {
                    row: 5,
                    col: 1
                },
                team: I.default,
                side: U.heads,
                strength: 5,
                resistance: 15,
                faith: 15,
                topsMeeple: -1
            }, {
                key: 10,
                position: {
                    row: 6,
                    col: 1
                },
                team: I.default,
                side: U.heads,
                strength: 5,
                resistance: 15,
                faith: 15,
                topsMeeple: -1
            }, {
                key: 11,
                position: {
                    row: 3,
                    col: 2
                },
                team: I.default,
                side: U.heads,
                strength: 5,
                resistance: 15,
                faith: 15,
                topsMeeple: -1
            }, {
                key: 12,
                position: {
                    row: 3,
                    col: 3
                },
                team: I.default,
                side: U.heads,
                strength: 5,
                resistance: 15,
                faith: 15,
                topsMeeple: -1
            }, {
                key: 13,
                position: {
                    row: 4,
                    col: 4
                },
                team: I.default,
                side: U.heads,
                strength: 5,
                resistance: 15,
                faith: 15,
                topsMeeple: -1
            }, {
                key: 14,
                position: {
                    row: 5,
                    col: 4
                },
                team: I.default,
                side: U.heads,
                strength: 5,
                resistance: 15,
                faith: 15,
                topsMeeple: -1
            }, {
                key: 15,
                position: {
                    row: 6,
                    col: 4
                },
                team: I.default,
                side: U.heads,
                strength: 5,
                resistance: 15,
                faith: 15,
                topsMeeple: -1
            } ],
            turn: {
                round: 0,
                team: I.info,
                side: U.heads
            },
            outcome: [ {
                type: "none"
            } ]
        }, {
            boardSize: 6,
            players: [ {
                team: I.info,
                cities: [],
                swarmSize: 2,
                buildingPhase: [ ...Array(5).keys() ].map(n => "notbuilt"),
                usedActions: 0,
                resources: [ ...Array(4).keys() ].map(n => 0)
            } ],
            terrains: [ e(0, 0), e(0, 1), e(0, 2), e(0, 3), e(0, 4), e(0, 5), e(1, 0), e(1, 1), e(1, 2), e(1, 3), e(1, 4), e(1, 5), e(2, 0), e(2, 1), e(2, 2, 1), e(2, 3, 0), e(2, 4), e(2, 5), e(3, 0), e(3, 1), e(3, 2), e(3, 3, 2), e(3, 4), e(3, 5), e(4, 0), e(4, 1, 3), e(4, 2), e(4, 3), e(4, 4), e(4, 5), e(5, 0), e(5, 1), e(5, 2), e(5, 3), e(5, 4), e(5, 5) ],
            meeples: [ {
                key: 0,
                position: {
                    row: 2,
                    col: 3
                },
                team: I.info,
                side: U.heads,
                strength: 10,
                resistance: 30,
                faith: 30,
                topsMeeple: -1
            }, {
                key: 1,
                position: {
                    row: 2,
                    col: 2
                },
                team: I.warning,
                side: U.heads,
                strength: 5,
                resistance: 10,
                faith: 30,
                topsMeeple: -1
            }, {
                key: 2,
                position: {
                    row: 3,
                    col: 3
                },
                team: I.success,
                side: U.heads,
                strength: 5,
                resistance: 15,
                faith: 15,
                topsMeeple: -1
            }, {
                key: 3,
                position: {
                    row: 4,
                    col: 1
                },
                team: I.default,
                side: U.heads,
                strength: 5,
                resistance: 15,
                faith: 15,
                topsMeeple: -1
            } ],
            turn: {
                round: 0,
                team: I.info,
                side: U.heads
            },
            outcome: [ {
                type: "none"
            } ]
        } ][n];
    }
    t.d(e, "e", function() {
        return I;
    }), t.d(e, "m", function() {
        return O;
    }), t.d(e, "l", function() {
        return R;
    }), t.d(e, "k", function() {
        return U;
    }), e.g = s, e.j = c, e.i = u, e.f = d, e.h = p, e.d = g, e.b = M, e.a = T, e.c = P;
    var I;
    !function(n) {
        n[n.info = 0] = "info", n[n.warning = 1] = "warning", n[n.success = 2] = "success", 
        n[n.danger = 3] = "danger", n[n.primary = 4] = "primary", n[n.default = 5] = "default";
    }(I || (I = {}));
    var O;
    !function(n) {
        n[n.up = 0] = "up", n[n.left = 1] = "left", n[n.down = 2] = "down", n[n.right = 3] = "right", 
        n[n.hold = 4] = "hold", n[n.explore = 5] = "explore";
    }(O || (O = {}));
    var R;
    !function(n) {
        n[n.sea = 0] = "sea", n[n.desert = 1] = "desert", n[n.swamp = 2] = "swamp", n[n.mountain = 3] = "mountain", 
        n[n.forest = 4] = "forest", n[n.plains = 5] = "plains", n[n.valley = 6] = "valley";
    }(R || (R = {}));
    var D;
    !function(n) {
        n[n.fuel = 0] = "fuel", n[n.food = 1] = "food", n[n.ore = 2] = "ore", n[n.silicon = 3] = "silicon";
    }(D || (D = {}));
    const L = [ {
        type: "sea",
        piece: null,
        resources: []
    }, {
        type: "desert",
        piece: null,
        resources: [ D.fuel, D.silicon ]
    }, {
        type: "swamp",
        piece: "i",
        resources: [ D.fuel, D.ore ]
    }, {
        type: "mountain",
        piece: "l",
        resources: [ D.ore, D.silicon ]
    }, {
        type: "forest",
        piece: "o",
        resources: [ D.food, D.ore ]
    }, {
        type: "plains",
        piece: "s",
        resources: [ D.fuel, D.food ]
    }, {
        type: "valley",
        piece: "t",
        resources: [ D.food, D.silicon ]
    } ];
    e.n = L;
    const z = [ {
        i: 0,
        piece: "i",
        shape: [ {
            row: 0,
            col: 0
        }, {
            row: 1,
            col: 0
        }, {
            row: 2,
            col: 0
        }, {
            row: 3,
            col: 0
        } ]
    }, {
        i: 1,
        piece: "l",
        shape: [ {
            row: 0,
            col: 0
        }, {
            row: 1,
            col: 0
        }, {
            row: 2,
            col: 0
        }, {
            row: 2,
            col: 1
        } ]
    }, {
        i: 2,
        piece: "o",
        shape: [ {
            row: 0,
            col: 0
        }, {
            row: 1,
            col: 0
        }, {
            row: 1,
            col: 1
        }, {
            row: 0,
            col: 1
        } ]
    }, {
        i: 3,
        piece: "s",
        shape: [ {
            row: 0,
            col: 0
        }, {
            row: 1,
            col: 0
        }, {
            row: 1,
            col: 1
        }, {
            row: 2,
            col: 1
        } ]
    }, {
        i: 4,
        piece: "t",
        shape: [ {
            row: 0,
            col: 0
        }, {
            row: 1,
            col: 0
        }, {
            row: 2,
            col: 0
        }, {
            row: 1,
            col: 1
        } ]
    } ];
    var U;
    !function(n) {
        n[n.heads = 0] = "heads", n[n.tails = 1] = "tails", n[n.none = 2] = "none";
    }(U || (U = {}));
    const j = {
        i: "power plant",
        l: "research facility",
        o: "school",
        s: "station",
        t: "hospital"
    }, F = {
        MeepleNotAvailable: "choose a meeple of your own team and with the current turn side up.",
        OutOfBoard: "keep your meeples inside the board.",
        NotYourTurn: "wait for your turn to begin.",
        TerrainIsCrowded: "move to a terrain with space available.",
        NotOnGround: "only meeples on the ground can explore the terrain",
        NoSelection: "please select meeples before choosing the action",
        NoActions: "you need to control more cities to perform more actions"
    };
}, function(n, e, t) {
    "use strict";
    var o = t(2), i = (t(0), function(n) {
        var e = this;
        if (e.instancePool.length) {
            var t = e.instancePool.pop();
            return e.call(t, n), t;
        }
        return new e(n);
    }), r = function(n, e) {
        var t = this;
        if (t.instancePool.length) {
            var o = t.instancePool.pop();
            return t.call(o, n, e), o;
        }
        return new t(n, e);
    }, a = function(n, e, t) {
        var o = this;
        if (o.instancePool.length) {
            var i = o.instancePool.pop();
            return o.call(i, n, e, t), i;
        }
        return new o(n, e, t);
    }, s = function(n, e, t, o) {
        var i = this;
        if (i.instancePool.length) {
            var r = i.instancePool.pop();
            return i.call(r, n, e, t, o), r;
        }
        return new i(n, e, t, o);
    }, l = function(n) {
        var e = this;
        n instanceof e || o("25"), n.destructor(), e.instancePool.length < e.poolSize && e.instancePool.push(n);
    }, c = 10, u = i, d = function(n, e) {
        var t = n;
        return t.instancePool = [], t.getPooled = e || u, t.poolSize || (t.poolSize = c), 
        t.release = l, t;
    }, p = {
        addPoolingTo: d,
        oneArgumentPooler: i,
        twoArgumentPooler: r,
        threeArgumentPooler: a,
        fourArgumentPooler: s
    };
    n.exports = p;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        if (b) {
            var e = n.node, t = n.children;
            if (t.length) for (var o = 0; o < t.length; o++) g(e, t[o], null); else null != n.html ? d(e, n.html) : null != n.text && f(e, n.text);
        }
    }
    function i(n, e) {
        n.parentNode.replaceChild(e.node, n), o(e);
    }
    function r(n, e) {
        b ? n.children.push(e) : n.node.appendChild(e.node);
    }
    function a(n, e) {
        b ? n.html = e : d(n.node, e);
    }
    function s(n, e) {
        b ? n.text = e : f(n.node, e);
    }
    function l() {
        return this.node.nodeName;
    }
    function c(n) {
        return {
            node: n,
            children: [],
            html: null,
            text: null,
            toString: l
        };
    }
    var u = t(32), d = t(29), p = t(40), f = t(74), m = 1, h = 11, b = "undefined" != typeof document && "number" == typeof document.documentMode || "undefined" != typeof navigator && "string" == typeof navigator.userAgent && /\bEdge\/\d/.test(navigator.userAgent), g = p(function(n, e, t) {
        e.node.nodeType === h || e.node.nodeType === m && "object" === e.node.nodeName.toLowerCase() && (null == e.node.namespaceURI || e.node.namespaceURI === u.html) ? (o(e), 
        n.insertBefore(e.node, t)) : (n.insertBefore(e.node, t), o(e));
    });
    c.insertTreeBefore = g, c.replaceChildWithTree = i, c.queueChild = r, c.queueHTML = a, 
    c.queueText = s, n.exports = c;
}, function(n, e, t) {
    "use strict";
    function o(n, e) {
        return (n & e) === e;
    }
    var i = t(2), r = (t(0), {
        MUST_USE_PROPERTY: 1,
        HAS_BOOLEAN_VALUE: 4,
        HAS_NUMERIC_VALUE: 8,
        HAS_POSITIVE_NUMERIC_VALUE: 24,
        HAS_OVERLOADED_BOOLEAN_VALUE: 32,
        injectDOMPropertyConfig: function(n) {
            var e = r, t = n.Properties || {}, a = n.DOMAttributeNamespaces || {}, l = n.DOMAttributeNames || {}, c = n.DOMPropertyNames || {}, u = n.DOMMutationMethods || {};
            n.isCustomAttribute && s._isCustomAttributeFunctions.push(n.isCustomAttribute);
            for (var d in t) {
                s.properties.hasOwnProperty(d) && i("48", d);
                var p = d.toLowerCase(), f = t[d], m = {
                    attributeName: p,
                    attributeNamespace: null,
                    propertyName: d,
                    mutationMethod: null,
                    mustUseProperty: o(f, e.MUST_USE_PROPERTY),
                    hasBooleanValue: o(f, e.HAS_BOOLEAN_VALUE),
                    hasNumericValue: o(f, e.HAS_NUMERIC_VALUE),
                    hasPositiveNumericValue: o(f, e.HAS_POSITIVE_NUMERIC_VALUE),
                    hasOverloadedBooleanValue: o(f, e.HAS_OVERLOADED_BOOLEAN_VALUE)
                };
                if (m.hasBooleanValue + m.hasNumericValue + m.hasOverloadedBooleanValue <= 1 || i("50", d), 
                l.hasOwnProperty(d)) {
                    var h = l[d];
                    m.attributeName = h;
                }
                a.hasOwnProperty(d) && (m.attributeNamespace = a[d]), c.hasOwnProperty(d) && (m.propertyName = c[d]), 
                u.hasOwnProperty(d) && (m.mutationMethod = u[d]), s.properties[d] = m;
            }
        }
    }), a = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", s = {
        ID_ATTRIBUTE_NAME: "data-reactid",
        ROOT_ATTRIBUTE_NAME: "data-reactroot",
        ATTRIBUTE_NAME_START_CHAR: a,
        ATTRIBUTE_NAME_CHAR: a + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040",
        properties: {},
        getPossibleStandardName: null,
        _isCustomAttributeFunctions: [],
        isCustomAttribute: function(n) {
            for (var e = 0; e < s._isCustomAttributeFunctions.length; e++) {
                if ((0, s._isCustomAttributeFunctions[e])(n)) return !0;
            }
            return !1;
        },
        injection: r
    };
    n.exports = s;
}, function(n, e, t) {
    "use strict";
    function o() {
        i.attachRefs(this, this._currentElement);
    }
    var i = t(142), r = (t(7), t(1), {
        mountComponent: function(n, e, t, i, r, a) {
            var s = n.mountComponent(e, t, i, r, a);
            return n._currentElement && null != n._currentElement.ref && e.getReactMountReady().enqueue(o, n), 
            s;
        },
        getHostNode: function(n) {
            return n.getHostNode();
        },
        unmountComponent: function(n, e) {
            i.detachRefs(n, n._currentElement), n.unmountComponent(e);
        },
        receiveComponent: function(n, e, t, r) {
            var a = n._currentElement;
            if (e !== a || r !== n._context) {
                var s = i.shouldUpdateRefs(a, e);
                s && i.detachRefs(n, a), n.receiveComponent(e, t, r), s && n._currentElement && null != n._currentElement.ref && t.getReactMountReady().enqueue(o, n);
            }
        },
        performUpdateIfNecessary: function(n, e, t) {
            n._updateBatchNumber === t && n.performUpdateIfNecessary(e);
        }
    });
    n.exports = r;
}, function(n, e, t) {
    "use strict";
    var o = t(3), i = t(172), r = t(47), a = t(177), s = t(173), l = t(174), c = t(18), u = t(175), d = t(178), p = t(179), f = (t(1), 
    c.createElement), m = c.createFactory, h = c.cloneElement, b = o, g = {
        Children: {
            map: i.map,
            forEach: i.forEach,
            count: i.count,
            toArray: i.toArray,
            only: p
        },
        Component: r,
        PureComponent: a,
        createElement: f,
        cloneElement: h,
        isValidElement: c.isValidElement,
        PropTypes: u,
        createClass: s.createClass,
        createFactory: m,
        createMixin: function(n) {
            return n;
        },
        DOM: l,
        version: d,
        __spread: b
    };
    n.exports = g;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        return void 0 !== n.ref;
    }
    function i(n) {
        return void 0 !== n.key;
    }
    var r = t(3), a = t(11), s = (t(1), t(79), Object.prototype.hasOwnProperty), l = t(77), c = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
    }, u = function(n, e, t, o, i, r, a) {
        var s = {
            $$typeof: l,
            type: n,
            key: e,
            ref: t,
            props: a,
            _owner: r
        };
        return s;
    };
    u.createElement = function(n, e, t) {
        var r, l = {}, d = null, p = null, f = null, m = null;
        if (null != e) {
            o(e) && (p = e.ref), i(e) && (d = "" + e.key), f = void 0 === e.__self ? null : e.__self, 
            m = void 0 === e.__source ? null : e.__source;
            for (r in e) s.call(e, r) && !c.hasOwnProperty(r) && (l[r] = e[r]);
        }
        var h = arguments.length - 2;
        if (1 === h) l.children = t; else if (h > 1) {
            for (var b = Array(h), g = 0; g < h; g++) b[g] = arguments[g + 2];
            l.children = b;
        }
        if (n && n.defaultProps) {
            var x = n.defaultProps;
            for (r in x) void 0 === l[r] && (l[r] = x[r]);
        }
        return u(n, d, p, f, m, a.current, l);
    }, u.createFactory = function(n) {
        var e = u.createElement.bind(null, n);
        return e.type = n, e;
    }, u.cloneAndReplaceKey = function(n, e) {
        return u(n.type, e, n.ref, n._self, n._source, n._owner, n.props);
    }, u.cloneElement = function(n, e, t) {
        var l, d = r({}, n.props), p = n.key, f = n.ref, m = n._self, h = n._source, b = n._owner;
        if (null != e) {
            o(e) && (f = e.ref, b = a.current), i(e) && (p = "" + e.key);
            var g;
            n.type && n.type.defaultProps && (g = n.type.defaultProps);
            for (l in e) s.call(e, l) && !c.hasOwnProperty(l) && (void 0 === e[l] && void 0 !== g ? d[l] = g[l] : d[l] = e[l]);
        }
        var x = arguments.length - 2;
        if (1 === x) d.children = t; else if (x > 1) {
            for (var v = Array(x), y = 0; y < x; y++) v[y] = arguments[y + 2];
            d.children = v;
        }
        return u(n.type, p, f, m, h, b, d);
    }, u.isValidElement = function(n) {
        return "object" == typeof n && null !== n && n.$$typeof === l;
    }, n.exports = u;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        for (var e = arguments.length - 1, t = "Minified React error #" + n + "; visit http://facebook.github.io/react/docs/error-decoder.html?invariant=" + n, o = 0; o < e; o++) t += "&args[]=" + encodeURIComponent(arguments[o + 1]);
        t += " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
        var i = new Error(t);
        throw i.name = "Invariant Violation", i.framesToPop = 1, i;
    }
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    var o = {};
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        return "button" === n || "input" === n || "select" === n || "textarea" === n;
    }
    function i(n, e, t) {
        switch (n) {
          case "onClick":
          case "onClickCapture":
          case "onDoubleClick":
          case "onDoubleClickCapture":
          case "onMouseDown":
          case "onMouseDownCapture":
          case "onMouseMove":
          case "onMouseMoveCapture":
          case "onMouseUp":
          case "onMouseUpCapture":
            return !(!t.disabled || !o(e));

          default:
            return !1;
        }
    }
    var r = t(2), a = t(33), s = t(34), l = t(38), c = t(68), u = t(69), d = (t(0), 
    {}), p = null, f = function(n, e) {
        n && (s.executeDispatchesInOrder(n, e), n.isPersistent() || n.constructor.release(n));
    }, m = function(n) {
        return f(n, !0);
    }, h = function(n) {
        return f(n, !1);
    }, b = function(n) {
        return "." + n._rootNodeID;
    }, g = {
        injection: {
            injectEventPluginOrder: a.injectEventPluginOrder,
            injectEventPluginsByName: a.injectEventPluginsByName
        },
        putListener: function(n, e, t) {
            "function" != typeof t && r("94", e, typeof t);
            var o = b(n);
            (d[e] || (d[e] = {}))[o] = t;
            var i = a.registrationNameModules[e];
            i && i.didPutListener && i.didPutListener(n, e, t);
        },
        getListener: function(n, e) {
            var t = d[e];
            if (i(e, n._currentElement.type, n._currentElement.props)) return null;
            var o = b(n);
            return t && t[o];
        },
        deleteListener: function(n, e) {
            var t = a.registrationNameModules[e];
            t && t.willDeleteListener && t.willDeleteListener(n, e);
            var o = d[e];
            if (o) {
                delete o[b(n)];
            }
        },
        deleteAllListeners: function(n) {
            var e = b(n);
            for (var t in d) if (d.hasOwnProperty(t) && d[t][e]) {
                var o = a.registrationNameModules[t];
                o && o.willDeleteListener && o.willDeleteListener(n, t), delete d[t][e];
            }
        },
        extractEvents: function(n, e, t, o) {
            for (var i, r = a.plugins, s = 0; s < r.length; s++) {
                var l = r[s];
                if (l) {
                    var u = l.extractEvents(n, e, t, o);
                    u && (i = c(i, u));
                }
            }
            return i;
        },
        enqueueEvents: function(n) {
            n && (p = c(p, n));
        },
        processEventQueue: function(n) {
            var e = p;
            p = null, n ? u(e, m) : u(e, h), p && r("95"), l.rethrowCaughtError();
        },
        __purge: function() {
            d = {};
        },
        __getListenerBank: function() {
            return d;
        }
    };
    n.exports = g;
}, function(n, e, t) {
    "use strict";
    function o(n, e, t) {
        var o = e.dispatchConfig.phasedRegistrationNames[t];
        return g(n, o);
    }
    function i(n, e, t) {
        var i = o(n, t, e);
        i && (t._dispatchListeners = h(t._dispatchListeners, i), t._dispatchInstances = h(t._dispatchInstances, n));
    }
    function r(n) {
        n && n.dispatchConfig.phasedRegistrationNames && m.traverseTwoPhase(n._targetInst, i, n);
    }
    function a(n) {
        if (n && n.dispatchConfig.phasedRegistrationNames) {
            var e = n._targetInst, t = e ? m.getParentInstance(e) : null;
            m.traverseTwoPhase(t, i, n);
        }
    }
    function s(n, e, t) {
        if (t && t.dispatchConfig.registrationName) {
            var o = t.dispatchConfig.registrationName, i = g(n, o);
            i && (t._dispatchListeners = h(t._dispatchListeners, i), t._dispatchInstances = h(t._dispatchInstances, n));
        }
    }
    function l(n) {
        n && n.dispatchConfig.registrationName && s(n._targetInst, null, n);
    }
    function c(n) {
        b(n, r);
    }
    function u(n) {
        b(n, a);
    }
    function d(n, e, t, o) {
        m.traverseEnterLeave(t, o, s, n, e);
    }
    function p(n) {
        b(n, l);
    }
    var f = t(21), m = t(34), h = t(68), b = t(69), g = (t(1), f.getListener), x = {
        accumulateTwoPhaseDispatches: c,
        accumulateTwoPhaseDispatchesSkipTarget: u,
        accumulateDirectDispatches: p,
        accumulateEnterLeaveDispatches: d
    };
    n.exports = x;
}, function(n, e, t) {
    "use strict";
    var o = {
        remove: function(n) {
            n._reactInternalInstance = void 0;
        },
        get: function(n) {
            return n._reactInternalInstance;
        },
        has: function(n) {
            return void 0 !== n._reactInternalInstance;
        },
        set: function(n, e) {
            n._reactInternalInstance = e;
        }
    };
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n, e, t, o) {
        return i.call(this, n, e, t, o);
    }
    var i = t(10), r = t(43), a = {
        view: function(n) {
            if (n.view) return n.view;
            var e = r(n);
            if (e.window === e) return e;
            var t = e.ownerDocument;
            return t ? t.defaultView || t.parentWindow : window;
        },
        detail: function(n) {
            return n.detail || 0;
        }
    };
    i.augmentClass(o, a), n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        return Object.prototype.hasOwnProperty.call(n, h) || (n[h] = f++, d[n[h]] = {}), 
        d[n[h]];
    }
    var i, r = t(3), a = t(33), s = t(134), l = t(67), c = t(167), u = t(44), d = {}, p = !1, f = 0, m = {
        topAbort: "abort",
        topAnimationEnd: c("animationend") || "animationend",
        topAnimationIteration: c("animationiteration") || "animationiteration",
        topAnimationStart: c("animationstart") || "animationstart",
        topBlur: "blur",
        topCanPlay: "canplay",
        topCanPlayThrough: "canplaythrough",
        topChange: "change",
        topClick: "click",
        topCompositionEnd: "compositionend",
        topCompositionStart: "compositionstart",
        topCompositionUpdate: "compositionupdate",
        topContextMenu: "contextmenu",
        topCopy: "copy",
        topCut: "cut",
        topDoubleClick: "dblclick",
        topDrag: "drag",
        topDragEnd: "dragend",
        topDragEnter: "dragenter",
        topDragExit: "dragexit",
        topDragLeave: "dragleave",
        topDragOver: "dragover",
        topDragStart: "dragstart",
        topDrop: "drop",
        topDurationChange: "durationchange",
        topEmptied: "emptied",
        topEncrypted: "encrypted",
        topEnded: "ended",
        topError: "error",
        topFocus: "focus",
        topInput: "input",
        topKeyDown: "keydown",
        topKeyPress: "keypress",
        topKeyUp: "keyup",
        topLoadedData: "loadeddata",
        topLoadedMetadata: "loadedmetadata",
        topLoadStart: "loadstart",
        topMouseDown: "mousedown",
        topMouseMove: "mousemove",
        topMouseOut: "mouseout",
        topMouseOver: "mouseover",
        topMouseUp: "mouseup",
        topPaste: "paste",
        topPause: "pause",
        topPlay: "play",
        topPlaying: "playing",
        topProgress: "progress",
        topRateChange: "ratechange",
        topScroll: "scroll",
        topSeeked: "seeked",
        topSeeking: "seeking",
        topSelectionChange: "selectionchange",
        topStalled: "stalled",
        topSuspend: "suspend",
        topTextInput: "textInput",
        topTimeUpdate: "timeupdate",
        topTouchCancel: "touchcancel",
        topTouchEnd: "touchend",
        topTouchMove: "touchmove",
        topTouchStart: "touchstart",
        topTransitionEnd: c("transitionend") || "transitionend",
        topVolumeChange: "volumechange",
        topWaiting: "waiting",
        topWheel: "wheel"
    }, h = "_reactListenersID" + String(Math.random()).slice(2), b = r({}, s, {
        ReactEventListener: null,
        injection: {
            injectReactEventListener: function(n) {
                n.setHandleTopLevel(b.handleTopLevel), b.ReactEventListener = n;
            }
        },
        setEnabled: function(n) {
            b.ReactEventListener && b.ReactEventListener.setEnabled(n);
        },
        isEnabled: function() {
            return !(!b.ReactEventListener || !b.ReactEventListener.isEnabled());
        },
        listenTo: function(n, e) {
            for (var t = e, i = o(t), r = a.registrationNameDependencies[n], s = 0; s < r.length; s++) {
                var l = r[s];
                i.hasOwnProperty(l) && i[l] || ("topWheel" === l ? u("wheel") ? b.ReactEventListener.trapBubbledEvent("topWheel", "wheel", t) : u("mousewheel") ? b.ReactEventListener.trapBubbledEvent("topWheel", "mousewheel", t) : b.ReactEventListener.trapBubbledEvent("topWheel", "DOMMouseScroll", t) : "topScroll" === l ? u("scroll", !0) ? b.ReactEventListener.trapCapturedEvent("topScroll", "scroll", t) : b.ReactEventListener.trapBubbledEvent("topScroll", "scroll", b.ReactEventListener.WINDOW_HANDLE) : "topFocus" === l || "topBlur" === l ? (u("focus", !0) ? (b.ReactEventListener.trapCapturedEvent("topFocus", "focus", t), 
                b.ReactEventListener.trapCapturedEvent("topBlur", "blur", t)) : u("focusin") && (b.ReactEventListener.trapBubbledEvent("topFocus", "focusin", t), 
                b.ReactEventListener.trapBubbledEvent("topBlur", "focusout", t)), i.topBlur = !0, 
                i.topFocus = !0) : m.hasOwnProperty(l) && b.ReactEventListener.trapBubbledEvent(l, m[l], t), 
                i[l] = !0);
            }
        },
        trapBubbledEvent: function(n, e, t) {
            return b.ReactEventListener.trapBubbledEvent(n, e, t);
        },
        trapCapturedEvent: function(n, e, t) {
            return b.ReactEventListener.trapCapturedEvent(n, e, t);
        },
        supportsEventPageXY: function() {
            if (!document.createEvent) return !1;
            var n = document.createEvent("MouseEvent");
            return null != n && "pageX" in n;
        },
        ensureScrollValueMonitoring: function() {
            if (void 0 === i && (i = b.supportsEventPageXY()), !i && !p) {
                var n = l.refreshScrollValues;
                b.ReactEventListener.monitorScrollValue(n), p = !0;
            }
        }
    });
    n.exports = b;
}, function(n, e, t) {
    "use strict";
    function o(n, e, t, o) {
        return i.call(this, n, e, t, o);
    }
    var i = t(24), r = t(67), a = t(42), s = {
        screenX: null,
        screenY: null,
        clientX: null,
        clientY: null,
        ctrlKey: null,
        shiftKey: null,
        altKey: null,
        metaKey: null,
        getModifierState: a,
        button: function(n) {
            var e = n.button;
            return "which" in n ? e : 2 === e ? 2 : 4 === e ? 1 : 0;
        },
        buttons: null,
        relatedTarget: function(n) {
            return n.relatedTarget || (n.fromElement === n.srcElement ? n.toElement : n.fromElement);
        },
        pageX: function(n) {
            return "pageX" in n ? n.pageX : n.clientX + r.currentScrollLeft;
        },
        pageY: function(n) {
            return "pageY" in n ? n.pageY : n.clientY + r.currentScrollTop;
        }
    };
    i.augmentClass(o, s), n.exports = o;
}, function(n, e, t) {
    "use strict";
    var o = t(2), i = (t(0), {}), r = {
        reinitializeTransaction: function() {
            this.transactionWrappers = this.getTransactionWrappers(), this.wrapperInitData ? this.wrapperInitData.length = 0 : this.wrapperInitData = [], 
            this._isInTransaction = !1;
        },
        _isInTransaction: !1,
        getTransactionWrappers: null,
        isInTransaction: function() {
            return !!this._isInTransaction;
        },
        perform: function(n, e, t, i, r, a, s, l) {
            this.isInTransaction() && o("27");
            var c, u;
            try {
                this._isInTransaction = !0, c = !0, this.initializeAll(0), u = n.call(e, t, i, r, a, s, l), 
                c = !1;
            } finally {
                try {
                    if (c) try {
                        this.closeAll(0);
                    } catch (n) {} else this.closeAll(0);
                } finally {
                    this._isInTransaction = !1;
                }
            }
            return u;
        },
        initializeAll: function(n) {
            for (var e = this.transactionWrappers, t = n; t < e.length; t++) {
                var o = e[t];
                try {
                    this.wrapperInitData[t] = i, this.wrapperInitData[t] = o.initialize ? o.initialize.call(this) : null;
                } finally {
                    if (this.wrapperInitData[t] === i) try {
                        this.initializeAll(t + 1);
                    } catch (n) {}
                }
            }
        },
        closeAll: function(n) {
            this.isInTransaction() || o("28");
            for (var e = this.transactionWrappers, t = n; t < e.length; t++) {
                var r, a = e[t], s = this.wrapperInitData[t];
                try {
                    r = !0, s !== i && a.close && a.close.call(this, s), r = !1;
                } finally {
                    if (r) try {
                        this.closeAll(t + 1);
                    } catch (n) {}
                }
            }
            this.wrapperInitData.length = 0;
        }
    };
    n.exports = r;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        var e = "" + n, t = r.exec(e);
        if (!t) return e;
        var o, i = "", a = 0, s = 0;
        for (a = t.index; a < e.length; a++) {
            switch (e.charCodeAt(a)) {
              case 34:
                o = "&quot;";
                break;

              case 38:
                o = "&amp;";
                break;

              case 39:
                o = "&#x27;";
                break;

              case 60:
                o = "&lt;";
                break;

              case 62:
                o = "&gt;";
                break;

              default:
                continue;
            }
            s !== a && (i += e.substring(s, a)), s = a + 1, i += o;
        }
        return s !== a ? i + e.substring(s, a) : i;
    }
    function i(n) {
        return "boolean" == typeof n || "number" == typeof n ? "" + n : o(n);
    }
    var r = /["'&<>]/;
    n.exports = i;
}, function(n, e, t) {
    "use strict";
    var o, i = t(5), r = t(32), a = /^[ \r\n\t\f]/, s = /<(!--|link|noscript|meta|script|style)[ \r\n\t\f\/>]/, l = t(40), c = l(function(n, e) {
        if (n.namespaceURI !== r.svg || "innerHTML" in n) n.innerHTML = e; else {
            o = o || document.createElement("div"), o.innerHTML = "<svg>" + e + "</svg>";
            for (var t = o.firstChild; t.firstChild; ) n.appendChild(t.firstChild);
        }
    });
    if (i.canUseDOM) {
        var u = document.createElement("div");
        u.innerHTML = " ", "" === u.innerHTML && (c = function(n, e) {
            if (n.parentNode && n.parentNode.replaceChild(n, n), a.test(e) || "<" === e[0] && s.test(e)) {
                n.innerHTML = String.fromCharCode(65279) + e;
                var t = n.firstChild;
                1 === t.data.length ? n.removeChild(t) : t.deleteData(0, 1);
            } else n.innerHTML = e;
        }), u = null;
    }
    n.exports = c;
}, function(n, e, t) {
    "use strict";
    function o(n, e) {
        return n === e ? 0 !== n || 0 !== e || 1 / n == 1 / e : n !== n && e !== e;
    }
    function i(n, e) {
        if (o(n, e)) return !0;
        if ("object" != typeof n || null === n || "object" != typeof e || null === e) return !1;
        var t = Object.keys(n), i = Object.keys(e);
        if (t.length !== i.length) return !1;
        for (var a = 0; a < t.length; a++) if (!r.call(e, t[a]) || !o(n[t[a]], e[t[a]])) return !1;
        return !0;
    }
    var r = Object.prototype.hasOwnProperty;
    n.exports = i;
}, function(n, e, t) {
    "use strict";
    function o(n, e) {
        return Array.isArray(e) && (e = e[1]), e ? e.nextSibling : n.firstChild;
    }
    function i(n, e, t) {
        u.insertTreeBefore(n, e, t);
    }
    function r(n, e, t) {
        Array.isArray(e) ? s(n, e[0], e[1], t) : h(n, e, t);
    }
    function a(n, e) {
        if (Array.isArray(e)) {
            var t = e[1];
            e = e[0], l(n, e, t), n.removeChild(t);
        }
        n.removeChild(e);
    }
    function s(n, e, t, o) {
        for (var i = e; ;) {
            var r = i.nextSibling;
            if (h(n, i, o), i === t) break;
            i = r;
        }
    }
    function l(n, e, t) {
        for (;;) {
            var o = e.nextSibling;
            if (o === t) break;
            n.removeChild(o);
        }
    }
    function c(n, e, t) {
        var o = n.parentNode, i = n.nextSibling;
        i === e ? t && h(o, document.createTextNode(t), i) : t ? (m(i, t), l(o, i, e)) : l(o, n, e);
    }
    var u = t(14), d = t(111), p = (t(4), t(7), t(40)), f = t(29), m = t(74), h = p(function(n, e, t) {
        n.insertBefore(e, t);
    }), b = d.dangerouslyReplaceNodeWithMarkup, g = {
        dangerouslyReplaceNodeWithMarkup: b,
        replaceDelimitedText: c,
        processUpdates: function(n, e) {
            for (var t = 0; t < e.length; t++) {
                var s = e[t];
                switch (s.type) {
                  case "INSERT_MARKUP":
                    i(n, s.content, o(n, s.afterNode));
                    break;

                  case "MOVE_EXISTING":
                    r(n, s.fromNode, o(n, s.afterNode));
                    break;

                  case "SET_MARKUP":
                    f(n, s.content);
                    break;

                  case "TEXT_CONTENT":
                    m(n, s.content);
                    break;

                  case "REMOVE_NODE":
                    a(n, s.fromNode);
                }
            }
        }
    };
    n.exports = g;
}, function(n, e, t) {
    "use strict";
    var o = {
        html: "http://www.w3.org/1999/xhtml",
        mathml: "http://www.w3.org/1998/Math/MathML",
        svg: "http://www.w3.org/2000/svg"
    };
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o() {
        if (s) for (var n in l) {
            var e = l[n], t = s.indexOf(n);
            if (t > -1 || a("96", n), !c.plugins[t]) {
                e.extractEvents || a("97", n), c.plugins[t] = e;
                var o = e.eventTypes;
                for (var r in o) i(o[r], e, r) || a("98", r, n);
            }
        }
    }
    function i(n, e, t) {
        c.eventNameDispatchConfigs.hasOwnProperty(t) && a("99", t), c.eventNameDispatchConfigs[t] = n;
        var o = n.phasedRegistrationNames;
        if (o) {
            for (var i in o) if (o.hasOwnProperty(i)) {
                var s = o[i];
                r(s, e, t);
            }
            return !0;
        }
        return !!n.registrationName && (r(n.registrationName, e, t), !0);
    }
    function r(n, e, t) {
        c.registrationNameModules[n] && a("100", n), c.registrationNameModules[n] = e, c.registrationNameDependencies[n] = e.eventTypes[t].dependencies;
    }
    var a = t(2), s = (t(0), null), l = {}, c = {
        plugins: [],
        eventNameDispatchConfigs: {},
        registrationNameModules: {},
        registrationNameDependencies: {},
        possibleRegistrationNames: null,
        injectEventPluginOrder: function(n) {
            s && a("101"), s = Array.prototype.slice.call(n), o();
        },
        injectEventPluginsByName: function(n) {
            var e = !1;
            for (var t in n) if (n.hasOwnProperty(t)) {
                var i = n[t];
                l.hasOwnProperty(t) && l[t] === i || (l[t] && a("102", t), l[t] = i, e = !0);
            }
            e && o();
        },
        getPluginModuleForEvent: function(n) {
            var e = n.dispatchConfig;
            if (e.registrationName) return c.registrationNameModules[e.registrationName] || null;
            if (void 0 !== e.phasedRegistrationNames) {
                var t = e.phasedRegistrationNames;
                for (var o in t) if (t.hasOwnProperty(o)) {
                    var i = c.registrationNameModules[t[o]];
                    if (i) return i;
                }
            }
            return null;
        },
        _resetEventPlugins: function() {
            s = null;
            for (var n in l) l.hasOwnProperty(n) && delete l[n];
            c.plugins.length = 0;
            var e = c.eventNameDispatchConfigs;
            for (var t in e) e.hasOwnProperty(t) && delete e[t];
            var o = c.registrationNameModules;
            for (var i in o) o.hasOwnProperty(i) && delete o[i];
        }
    };
    n.exports = c;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        return "topMouseUp" === n || "topTouchEnd" === n || "topTouchCancel" === n;
    }
    function i(n) {
        return "topMouseMove" === n || "topTouchMove" === n;
    }
    function r(n) {
        return "topMouseDown" === n || "topTouchStart" === n;
    }
    function a(n, e, t, o) {
        var i = n.type || "unknown-event";
        n.currentTarget = g.getNodeFromInstance(o), e ? h.invokeGuardedCallbackWithCatch(i, t, n) : h.invokeGuardedCallback(i, t, n), 
        n.currentTarget = null;
    }
    function s(n, e) {
        var t = n._dispatchListeners, o = n._dispatchInstances;
        if (Array.isArray(t)) for (var i = 0; i < t.length && !n.isPropagationStopped(); i++) a(n, e, t[i], o[i]); else t && a(n, e, t, o);
        n._dispatchListeners = null, n._dispatchInstances = null;
    }
    function l(n) {
        var e = n._dispatchListeners, t = n._dispatchInstances;
        if (Array.isArray(e)) {
            for (var o = 0; o < e.length && !n.isPropagationStopped(); o++) if (e[o](n, t[o])) return t[o];
        } else if (e && e(n, t)) return t;
        return null;
    }
    function c(n) {
        var e = l(n);
        return n._dispatchInstances = null, n._dispatchListeners = null, e;
    }
    function u(n) {
        var e = n._dispatchListeners, t = n._dispatchInstances;
        Array.isArray(e) && m("103"), n.currentTarget = e ? g.getNodeFromInstance(t) : null;
        var o = e ? e(n) : null;
        return n.currentTarget = null, n._dispatchListeners = null, n._dispatchInstances = null, 
        o;
    }
    function d(n) {
        return !!n._dispatchListeners;
    }
    var p, f, m = t(2), h = t(38), b = (t(0), t(1), {
        injectComponentTree: function(n) {
            p = n;
        },
        injectTreeTraversal: function(n) {
            f = n;
        }
    }), g = {
        isEndish: o,
        isMoveish: i,
        isStartish: r,
        executeDirectDispatch: u,
        executeDispatchesInOrder: s,
        executeDispatchesInOrderStopAtTrue: c,
        hasDispatches: d,
        getInstanceFromNode: function(n) {
            return p.getInstanceFromNode(n);
        },
        getNodeFromInstance: function(n) {
            return p.getNodeFromInstance(n);
        },
        isAncestor: function(n, e) {
            return f.isAncestor(n, e);
        },
        getLowestCommonAncestor: function(n, e) {
            return f.getLowestCommonAncestor(n, e);
        },
        getParentInstance: function(n) {
            return f.getParentInstance(n);
        },
        traverseTwoPhase: function(n, e, t) {
            return f.traverseTwoPhase(n, e, t);
        },
        traverseEnterLeave: function(n, e, t, o, i) {
            return f.traverseEnterLeave(n, e, t, o, i);
        },
        injection: b
    };
    n.exports = g;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        var e = /[=:]/g, t = {
            "=": "=0",
            ":": "=2"
        };
        return "$" + ("" + n).replace(e, function(n) {
            return t[n];
        });
    }
    function i(n) {
        var e = /(=0|=2)/g, t = {
            "=0": "=",
            "=2": ":"
        };
        return ("" + ("." === n[0] && "$" === n[1] ? n.substring(2) : n.substring(1))).replace(e, function(n) {
            return t[n];
        });
    }
    var r = {
        escape: o,
        unescape: i
    };
    n.exports = r;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        null != n.checkedLink && null != n.valueLink && s("87");
    }
    function i(n) {
        o(n), (null != n.value || null != n.onChange) && s("88");
    }
    function r(n) {
        o(n), (null != n.checked || null != n.onChange) && s("89");
    }
    function a(n) {
        if (n) {
            var e = n.getName();
            if (e) return " Check the render method of `" + e + "`.";
        }
        return "";
    }
    var s = t(2), l = t(17), c = t(140), u = (t(0), t(1), {
        button: !0,
        checkbox: !0,
        image: !0,
        hidden: !0,
        radio: !0,
        reset: !0,
        submit: !0
    }), d = {
        value: function(n, e, t) {
            return !n[e] || u[n.type] || n.onChange || n.readOnly || n.disabled ? null : new Error("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.");
        },
        checked: function(n, e, t) {
            return !n[e] || n.onChange || n.readOnly || n.disabled ? null : new Error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
        },
        onChange: l.PropTypes.func
    }, p = {}, f = {
        checkPropTypes: function(n, e, t) {
            for (var o in d) {
                if (d.hasOwnProperty(o)) var i = d[o](e, o, n, "prop", null, c);
                if (i instanceof Error && !(i.message in p)) {
                    p[i.message] = !0;
                    a(t);
                }
            }
        },
        getValue: function(n) {
            return n.valueLink ? (i(n), n.valueLink.value) : n.value;
        },
        getChecked: function(n) {
            return n.checkedLink ? (r(n), n.checkedLink.value) : n.checked;
        },
        executeOnChange: function(n, e) {
            return n.valueLink ? (i(n), n.valueLink.requestChange(e.target.value)) : n.checkedLink ? (r(n), 
            n.checkedLink.requestChange(e.target.checked)) : n.onChange ? n.onChange.call(void 0, e) : void 0;
        }
    };
    n.exports = f;
}, function(n, e, t) {
    "use strict";
    var o = t(2), i = (t(0), !1), r = {
        replaceNodeWithMarkup: null,
        processChildrenUpdates: null,
        injection: {
            injectEnvironment: function(n) {
                i && o("104"), r.replaceNodeWithMarkup = n.replaceNodeWithMarkup, r.processChildrenUpdates = n.processChildrenUpdates, 
                i = !0;
            }
        }
    };
    n.exports = r;
}, function(n, e, t) {
    "use strict";
    function o(n, e, t) {
        try {
            e(t);
        } catch (n) {
            null === i && (i = n);
        }
    }
    var i = null, r = {
        invokeGuardedCallback: o,
        invokeGuardedCallbackWithCatch: o,
        rethrowCaughtError: function() {
            if (i) {
                var n = i;
                throw i = null, n;
            }
        }
    };
    n.exports = r;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        l.enqueueUpdate(n);
    }
    function i(n) {
        var e = typeof n;
        if ("object" !== e) return e;
        var t = n.constructor && n.constructor.name || e, o = Object.keys(n);
        return o.length > 0 && o.length < 20 ? t + " (keys: " + o.join(", ") + ")" : t;
    }
    function r(n, e) {
        var t = s.get(n);
        if (!t) {
            return null;
        }
        return t;
    }
    var a = t(2), s = (t(11), t(23)), l = (t(7), t(9)), c = (t(0), t(1), {
        isMounted: function(n) {
            var e = s.get(n);
            return !!e && !!e._renderedComponent;
        },
        enqueueCallback: function(n, e, t) {
            c.validateCallback(e, t);
            var i = r(n);
            if (!i) return null;
            i._pendingCallbacks ? i._pendingCallbacks.push(e) : i._pendingCallbacks = [ e ], 
            o(i);
        },
        enqueueCallbackInternal: function(n, e) {
            n._pendingCallbacks ? n._pendingCallbacks.push(e) : n._pendingCallbacks = [ e ], 
            o(n);
        },
        enqueueForceUpdate: function(n) {
            var e = r(n, "forceUpdate");
            e && (e._pendingForceUpdate = !0, o(e));
        },
        enqueueReplaceState: function(n, e) {
            var t = r(n, "replaceState");
            t && (t._pendingStateQueue = [ e ], t._pendingReplaceState = !0, o(t));
        },
        enqueueSetState: function(n, e) {
            var t = r(n, "setState");
            if (t) {
                (t._pendingStateQueue || (t._pendingStateQueue = [])).push(e), o(t);
            }
        },
        enqueueElementInternal: function(n, e, t) {
            n._pendingElement = e, n._context = t, o(n);
        },
        validateCallback: function(n, e) {
            n && "function" != typeof n && a("122", e, i(n));
        }
    });
    n.exports = c;
}, function(n, e, t) {
    "use strict";
    var o = function(n) {
        return "undefined" != typeof MSApp && MSApp.execUnsafeLocalFunction ? function(e, t, o, i) {
            MSApp.execUnsafeLocalFunction(function() {
                return n(e, t, o, i);
            });
        } : n;
    };
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        var e, t = n.keyCode;
        return "charCode" in n ? 0 === (e = n.charCode) && 13 === t && (e = 13) : e = t, 
        e >= 32 || 13 === e ? e : 0;
    }
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        var e = this, t = e.nativeEvent;
        if (t.getModifierState) return t.getModifierState(n);
        var o = r[n];
        return !!o && !!t[o];
    }
    function i(n) {
        return o;
    }
    var r = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey"
    };
    n.exports = i;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        var e = n.target || n.srcElement || window;
        return e.correspondingUseElement && (e = e.correspondingUseElement), 3 === e.nodeType ? e.parentNode : e;
    }
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n, e) {
        if (!r.canUseDOM || e && !("addEventListener" in document)) return !1;
        var t = "on" + n, o = t in document;
        if (!o) {
            var a = document.createElement("div");
            a.setAttribute(t, "return;"), o = "function" == typeof a[t];
        }
        return !o && i && "wheel" === n && (o = document.implementation.hasFeature("Events.wheel", "3.0")), 
        o;
    }
    var i, r = t(5);
    r.canUseDOM && (i = document.implementation && document.implementation.hasFeature && !0 !== document.implementation.hasFeature("", "")), 
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n, e) {
        var t = null === n || !1 === n, o = null === e || !1 === e;
        if (t || o) return t === o;
        var i = typeof n, r = typeof e;
        return "string" === i || "number" === i ? "string" === r || "number" === r : "object" === r && n.type === e.type && n.key === e.key;
    }
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    var o = (t(3), t(6)), i = (t(1), o);
    n.exports = i;
}, function(n, e, t) {
    "use strict";
    function o(n, e, t) {
        this.props = n, this.context = e, this.refs = a, this.updater = t || r;
    }
    var i = t(19), r = t(48), a = (t(79), t(20));
    t(0), t(1);
    o.prototype.isReactComponent = {}, o.prototype.setState = function(n, e) {
        "object" != typeof n && "function" != typeof n && null != n && i("85"), this.updater.enqueueSetState(this, n), 
        e && this.updater.enqueueCallback(this, e, "setState");
    }, o.prototype.forceUpdate = function(n) {
        this.updater.enqueueForceUpdate(this), n && this.updater.enqueueCallback(this, n, "forceUpdate");
    };
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n, e) {
    }
    var i = (t(1), {
        isMounted: function(n) {
            return !1;
        },
        enqueueCallback: function(n, e) {},
        enqueueForceUpdate: function(n) {
            o(n, "forceUpdate");
        },
        enqueueReplaceState: function(n, e) {
            o(n, "replaceState");
        },
        enqueueSetState: function(n, e) {
            o(n, "setState");
        }
    });
    n.exports = i;
}, function(n, e, t) {
    "use strict";
    var o = t(8), i = (t.n(o), t(12)), r = t(85), a = t(86), s = t(89), l = t(90), c = t(91);
    t.d(e, "b", function() {
        return u;
    });
    var u;
    !function(n) {
        n[n.tutorial = 0] = "tutorial", n[n.setup = 1] = "setup", n[n.play = 2] = "play", 
        n[n.end = 3] = "end";
    }(u || (u = {}));
    class d extends o.Component {
         constructor() {
            super(), window.clearInterval(this.refresher), this.refresher = window.setInterval(() => this.dequeuePlay(), 85);
            const n = 1, e = 1, o = 32;
            this.state = {
                game: t.i(i.a)(n + e, o),
                mode: u.setup,
                playerCount: n,
                computerCount: e,
                boardSize: o,
                selection: [],
                zoom: {
                    scale: 1,
                    origin: {
                        x: 0,
                        y: 0
                    }
                },
                playQueue: [ [], [], [], [], [], [] ]
            }, this.wheel = this.wheel.bind(this), window.removeEventListener("mousewheel", this.wheel), 
            window.addEventListener("mousewheel", this.wheel);
        }
         setup(n, e) {
            switch (n) {
              case "setup":
                const o = 1, r = 1, a = 32;
                this.setState({
                    game: t.i(i.a)(o + r, a),
                    mode: u.setup,
                    playerCount: o,
                    computerCount: r,
                    boardSize: a,
                    selection: [],
                    zoom: {
                        scale: 1,
                        origin: {
                            x: 0,
                            y: 0
                        }
                    },
                    playQueue: [ [], [], [], [], [], [] ]
                });
                break;

              case "rearrange":
                this.setState({
                    game: t.i(i.a)(this.state.playerCount + this.state.computerCount, this.state.boardSize),
                    zoom: {
                        scale: 1,
                        origin: {
                            x: 0,
                            y: 0
                        }
                    }
                });
                break;

              case "-player":
                this.state.playerCount > 0 && this.state.playerCount + this.state.computerCount > 1 && this.setState({
                    game: t.i(i.a)(this.state.playerCount - 1 + this.state.computerCount, this.state.boardSize),
                    playerCount: this.state.playerCount - 1
                });
                break;

              case "+player":
                this.state.playerCount + this.state.computerCount < 5 && this.setState({
                    game: t.i(i.a)(this.state.playerCount + 1 + this.state.computerCount, this.state.boardSize),
                    playerCount: this.state.playerCount + 1
                });
                break;

              case "-computer":
                this.state.computerCount > 0 && this.state.playerCount + this.state.computerCount > 1 && this.setState({
                    game: t.i(i.a)(this.state.playerCount + (this.state.computerCount - 1), this.state.boardSize),
                    computerCount: this.state.computerCount - 1
                });
                break;

              case "+computer":
                this.state.playerCount + this.state.computerCount < 5 && this.setState({
                    game: t.i(i.a)(this.state.playerCount + (this.state.computerCount + 1), this.state.boardSize),
                    computerCount: this.state.computerCount + 1
                });
                break;

              case "-size":
                this.state.boardSize > this.state.playerCount + this.state.computerCount + 3 && this.setState({
                    game: t.i(i.a)(this.state.playerCount + this.state.computerCount, this.state.boardSize - 4),
                    boardSize: this.state.boardSize - 4,
                    zoom: {
                        scale: 1,
                        origin: {
                            x: 0,
                            y: 0
                        }
                    }
                });
                break;

              case "+size":
                this.setState({
                    game: t.i(i.a)(this.state.playerCount + this.state.computerCount, this.state.boardSize + 4),
                    boardSize: this.state.boardSize + 4,
                    zoom: {
                        scale: 1,
                        origin: {
                            x: 0,
                            y: 0
                        }
                    }
                });
                break;

              case "begin":
                this.setState({
                    game: t.i(i.b)(this.state.game),
                    mode: u.play,
                    zoom: {
                        scale: 1,
                        origin: {
                            x: 0,
                            y: 0
                        }
                    }
                }), this.autoSelect();
                break;

              case "tutorial":
                const s = e || {
                    index: 0
                };
                this.setState({
                    game: t.i(i.c)(s.index),
                    mode: u.tutorial,
                    zoom: {
                        scale: 1,
                        origin: {
                            x: 0,
                            y: 0
                        }
                    },
                    param: s
                });
            }
        }
         enqueuePlay(n, e) {
            const t = this.state.playQueue;
            this.state.selection.length > 0 && t[n].push({
                team: n,
                action: e,
                selection: this.state.selection
            }), this.setState({
                playQueue: t,
                selection: []
            });
        }
         dequeuePlay() {
            const n = this.state.playQueue;
            if (this.state.game.players.length > 0 && n[this.state.game.turn.team].length > 0) {
                const e = n[this.state.game.turn.team].shift(), o = t.i(i.d)(this.state.game, e), r = "gameover" === o.outcome[0].type ? u.end : this.state.mode;
                this.setState({
                    game: o,
                    mode: r,
                    playQueue: n,
                    selection: []
                }), o.turn.team !== i.e.default && 0 === n[this.state.game.turn.team].length && this.autoSelect();
            }
        }
         select(n) {
            if (this.state.game.turn.team !== i.e.default) if (t.i(i.f)(this.state.game, n)) {
                const e = this.state.game.terrains[t.i(i.g)(n, this.state.game.boardSize)], o = this.state.game.meeples[e.topMeeple];
                "city" === e.construction.type && e.construction.team !== o.team ? this.setState({
                    selection: [ e.topMeeple ]
                }) : this.state.selection.some(e => n.row === this.state.game.meeples[e].position.row && n.col === this.state.game.meeples[e].position.col) ? this.setState({
                    selection: [ o.key ]
                }) : this.setState({
                    selection: t.i(i.h)(this.state.game, n)
                });
            } else this.setState({
                selection: []
            });
        }
         autoSelect() {
            const n = t.i(i.i)(this.state.game);
            if (n.length > 0) {
                const e = n.map(n => ({
                    p: n.position,
                    s: t.i(i.h)(this.state.game, n.position).length
                })).reduce((n, e) => e.s > n.s ? e : "city" !== this.state.game.terrains[t.i(i.g)(e.p, this.state.game.boardSize)].construction.type && "city" === this.state.game.terrains[t.i(i.g)(n.p, this.state.game.boardSize)].construction.type ? e : n);
                this.setState({
                    selection: t.i(i.h)(this.state.game, e.p)
                });
            }
        }
         wheel(n) {
            const e = document.getElementById("board");
            if (e) if (n.currentTarget.id === e.id) {
                const e = {
                    scale: Math.max(1, this.state.zoom.scale * (n.wheelDelta > 0 ? 1.15 : .85)),
                    origin: {
                        x: n.x,
                        y: n.y
                    }
                };
                this.setState({
                    zoom: e
                });
            } else window.removeEventListener("mousewheel", this.wheel), e.addEventListener("mousewheel", this.wheel);
        }
         componentWillUnmount() {
            window.clearInterval(this.refresher);
        }
         render() {
            let n;
            switch (this.state.mode) {
              case u.tutorial:
                n = o.createElement(c.a, {
                    setup: this.setup.bind(this),
                    enqueuePlay: this.enqueuePlay.bind(this),
                    lesson: this.state.param
                });
                break;

              case u.setup:
                n = o.createElement(s.a, {
                    game: this.state.game,
                    playerCount: this.state.playerCount,
                    computerCount: this.state.computerCount,
                    boardSize: this.state.boardSize,
                    setup: this.setup.bind(this)
                });
                break;

              default:
                n = o.createElement(l.a, {
                    setup: this.setup.bind(this),
                    enqueuePlay: this.enqueuePlay.bind(this),
                    select: this.select.bind(this),
                    game: this.state.game,
                    mode: this.state.mode
                });
            }
            const e = {
                display: "inline-block",
                margin: "1vmin",
                width: "36vmin",
                height: "95vmin",
                overflow: "hidden"
            }, t = this.state.mode === u.play || this.state.mode === u.end ? o.createElement(a.a, {
                setup: this.setup.bind(this),
                enqueuePlay: this.enqueuePlay.bind(this),
                select: this.select.bind(this),
                selection: this.state.selection,
                game: this.state.game
            }) : null;
            return o.createElement("div", null, o.createElement(r.a, {
                setup: this.setup.bind(this),
                enqueuePlay: this.enqueuePlay.bind(this),
                game: this.state.game,
                select: this.select.bind(this),
                selection: this.state.selection,
                zoom: this.state.zoom
            }), o.createElement("div", {
                style: {
                    display: "inline-block",
                    width: "76vmin"
                }
            }, o.createElement("div", {
                style: e
            }, n), o.createElement("div", {
                style: e
            }, t)));
        }
    }
    e.a = d;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        if ("emptysite" !== n.construction.type && n.construction.team !== a.e.default) return a.e[n.construction.team];
        switch (n.geography) {
          case a.l.sea:
            return "info";

          case a.l.swamp:
            return "default";

          case a.l.mountain:
            return "danger";

          case a.l.forest:
            return "success";

          case a.l.valley:
            return "primary";

          case a.l.plains:
            return "nocolor";

          case a.l.desert:
          default:
            return "warning";
        }
    }
    function i(n) {
        switch (n) {
          case "i":
            return "🏭";

          case "l":
            return "📡";

          case "o":
            return "🏫";

          case "s":
            return "🚉";

          case "t":
            return "🏥";

          default:
            return "🏗";
        }
    }
    var r = t(8), a = (t.n(r), t(12));
    e.b = i;
    const s = n => r.createElement("div", {
        className: "terrain is-" + o(n.terrain) + (n.selected ? " selected" : ""),
        style: {
            top: 45 * n.terrain.position.row,
            left: 45 * n.terrain.position.col,
            opacity: .5
        },
        onClick: () => n.select(n.terrain.position)
    }, "city" === n.terrain.construction.type ? r.createElement("span", {
        className: "is-" + a.e[n.terrain.construction.team],
        style: {
            fontSize: "2.25rem",
            color: a.e[n.terrain.construction.team]
        }
    }, "🏙️") : "building" === n.terrain.construction.type ? r.createElement("span", {
        className: "building is-" + a.e[n.terrain.construction.team]
    }, i(n.terrain.construction.blueprint), "️") : null);
    e.a = s;
}, function(n, e) {
    n.exports = function() {
        var n = [];
        return n.toString = function() {
            for (var n = [], e = 0; e < this.length; e++) {
                var t = this[e];
                t[2] ? n.push("@media " + t[2] + "{" + t[1] + "}") : n.push(t[1]);
            }
            return n.join("");
        }, n.i = function(e, t) {
            "string" == typeof e && (e = [ [ null, e, "" ] ]);
            for (var o = {}, i = 0; i < this.length; i++) {
                var r = this[i][0];
                "number" == typeof r && (o[r] = !0);
            }
            for (i = 0; i < e.length; i++) {
                var a = e[i];
                "number" == typeof a[0] && o[a[0]] || (t && !a[2] ? a[2] = t : t && (a[2] = "(" + a[2] + ") and (" + t + ")"), 
                n.push(a));
            }
        }, n;
    };
}, function(n, e, t) {
    "use strict";
    var o = t(6), i = {
        listen: function(n, e, t) {
            return n.addEventListener ? (n.addEventListener(e, t, !1), {
                remove: function() {
                    n.removeEventListener(e, t, !1);
                }
            }) : n.attachEvent ? (n.attachEvent("on" + e, t), {
                remove: function() {
                    n.detachEvent("on" + e, t);
                }
            }) : void 0;
        },
        capture: function(n, e, t) {
            return n.addEventListener ? (n.addEventListener(e, t, !0), {
                remove: function() {
                    n.removeEventListener(e, t, !0);
                }
            }) : {
                remove: o
            };
        },
        registerDefault: function() {}
    };
    n.exports = i;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        try {
            n.focus();
        } catch (n) {}
    }
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o() {
        if ("undefined" == typeof document) return null;
        try {
            return document.activeElement || document.body;
        } catch (n) {
            return document.body;
        }
    }
    n.exports = o;
}, function(n, e) {
    function t() {
        throw new Error("setTimeout has not been defined");
    }
    function o() {
        throw new Error("clearTimeout has not been defined");
    }
    function i(n) {
        if (u === setTimeout) return setTimeout(n, 0);
        if ((u === t || !u) && setTimeout) return u = setTimeout, setTimeout(n, 0);
        try {
            return u(n, 0);
        } catch (e) {
            try {
                return u.call(null, n, 0);
            } catch (e) {
                return u.call(this, n, 0);
            }
        }
    }
    function r(n) {
        if (d === clearTimeout) return clearTimeout(n);
        if ((d === o || !d) && clearTimeout) return d = clearTimeout, clearTimeout(n);
        try {
            return d(n);
        } catch (e) {
            try {
                return d.call(null, n);
            } catch (e) {
                return d.call(this, n);
            }
        }
    }
    function a() {
        h && f && (h = !1, f.length ? m = f.concat(m) : b = -1, m.length && s());
    }
    function s() {
        if (!h) {
            var n = i(a);
            h = !0;
            for (var e = m.length; e; ) {
                for (f = m, m = []; ++b < e; ) f && f[b].run();
                b = -1, e = m.length;
            }
            f = null, h = !1, r(n);
        }
    }
    function l(n, e) {
        this.fun = n, this.array = e;
    }
    function c() {}
    var u, d, p = n.exports = {};
    !function() {
        try {
            u = "function" == typeof setTimeout ? setTimeout : t;
        } catch (n) {
            u = t;
        }
        try {
            d = "function" == typeof clearTimeout ? clearTimeout : o;
        } catch (n) {
            d = o;
        }
    }();
    var f, m = [], h = !1, b = -1;
    p.nextTick = function(n) {
        var e = new Array(arguments.length - 1);
        if (arguments.length > 1) for (var t = 1; t < arguments.length; t++) e[t - 1] = arguments[t];
        m.push(new l(n, e)), 1 !== m.length || h || i(s);
    }, l.prototype.run = function() {
        this.fun.apply(null, this.array);
    }, p.title = "browser", p.browser = !0, p.env = {}, p.argv = [], p.version = "", 
    p.versions = {}, p.on = c, p.addListener = c, p.once = c, p.off = c, p.removeListener = c, 
    p.removeAllListeners = c, p.emit = c, p.binding = function(n) {
        throw new Error("process.binding is not supported");
    }, p.cwd = function() {
        return "/";
    }, p.chdir = function(n) {
        throw new Error("process.chdir is not supported");
    }, p.umask = function() {
        return 0;
    };
}, function(n, e, t) {
    "use strict";
    function o(n, e) {
        return n + e.charAt(0).toUpperCase() + e.substring(1);
    }
    var i = {
        animationIterationCount: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridRow: !0,
        gridColumn: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0
    }, r = [ "Webkit", "ms", "Moz", "O" ];
    Object.keys(i).forEach(function(n) {
        r.forEach(function(e) {
            i[o(e, n)] = i[n];
        });
    });
    var a = {
        background: {
            backgroundAttachment: !0,
            backgroundColor: !0,
            backgroundImage: !0,
            backgroundPositionX: !0,
            backgroundPositionY: !0,
            backgroundRepeat: !0
        },
        backgroundPosition: {
            backgroundPositionX: !0,
            backgroundPositionY: !0
        },
        border: {
            borderWidth: !0,
            borderStyle: !0,
            borderColor: !0
        },
        borderBottom: {
            borderBottomWidth: !0,
            borderBottomStyle: !0,
            borderBottomColor: !0
        },
        borderLeft: {
            borderLeftWidth: !0,
            borderLeftStyle: !0,
            borderLeftColor: !0
        },
        borderRight: {
            borderRightWidth: !0,
            borderRightStyle: !0,
            borderRightColor: !0
        },
        borderTop: {
            borderTopWidth: !0,
            borderTopStyle: !0,
            borderTopColor: !0
        },
        font: {
            fontStyle: !0,
            fontVariant: !0,
            fontWeight: !0,
            fontSize: !0,
            lineHeight: !0,
            fontFamily: !0
        },
        outline: {
            outlineWidth: !0,
            outlineStyle: !0,
            outlineColor: !0
        }
    }, s = {
        isUnitlessNumber: i,
        shorthandPropertyExpansions: a
    };
    n.exports = s;
}, function(n, e, t) {
    "use strict";
    function o(n, e) {
        if (!(n instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    var i = t(2), r = t(13), a = (t(0), function() {
        function n(e) {
            o(this, n), this._callbacks = null, this._contexts = null, this._arg = e;
        }
        return n.prototype.enqueue = function(n, e) {
            this._callbacks = this._callbacks || [], this._callbacks.push(n), this._contexts = this._contexts || [], 
            this._contexts.push(e);
        }, n.prototype.notifyAll = function() {
            var n = this._callbacks, e = this._contexts, t = this._arg;
            if (n && e) {
                n.length !== e.length && i("24"), this._callbacks = null, this._contexts = null;
                for (var o = 0; o < n.length; o++) n[o].call(e[o], t);
                n.length = 0, e.length = 0;
            }
        }, n.prototype.checkpoint = function() {
            return this._callbacks ? this._callbacks.length : 0;
        }, n.prototype.rollback = function(n) {
            this._callbacks && this._contexts && (this._callbacks.length = n, this._contexts.length = n);
        }, n.prototype.reset = function() {
            this._callbacks = null, this._contexts = null;
        }, n.prototype.destructor = function() {
            this.reset();
        }, n;
    }());
    n.exports = r.addPoolingTo(a);
}, function(n, e, t) {
    "use strict";
    function o(n) {
        return !!c.hasOwnProperty(n) || !l.hasOwnProperty(n) && (s.test(n) ? (c[n] = !0, 
        !0) : (l[n] = !0, !1));
    }
    function i(n, e) {
        return null == e || n.hasBooleanValue && !e || n.hasNumericValue && isNaN(e) || n.hasPositiveNumericValue && e < 1 || n.hasOverloadedBooleanValue && !1 === e;
    }
    var r = t(15), a = (t(4), t(7), t(168)), s = (t(1), new RegExp("^[" + r.ATTRIBUTE_NAME_START_CHAR + "][" + r.ATTRIBUTE_NAME_CHAR + "]*$")), l = {}, c = {}, u = {
        createMarkupForID: function(n) {
            return r.ID_ATTRIBUTE_NAME + "=" + a(n);
        },
        setAttributeForID: function(n, e) {
            n.setAttribute(r.ID_ATTRIBUTE_NAME, e);
        },
        createMarkupForRoot: function() {
            return r.ROOT_ATTRIBUTE_NAME + '=""';
        },
        setAttributeForRoot: function(n) {
            n.setAttribute(r.ROOT_ATTRIBUTE_NAME, "");
        },
        createMarkupForProperty: function(n, e) {
            var t = r.properties.hasOwnProperty(n) ? r.properties[n] : null;
            if (t) {
                if (i(t, e)) return "";
                var o = t.attributeName;
                return t.hasBooleanValue || t.hasOverloadedBooleanValue && !0 === e ? o + '=""' : o + "=" + a(e);
            }
            return r.isCustomAttribute(n) ? null == e ? "" : n + "=" + a(e) : null;
        },
        createMarkupForCustomAttribute: function(n, e) {
            return o(n) && null != e ? n + "=" + a(e) : "";
        },
        setValueForProperty: function(n, e, t) {
            var o = r.properties.hasOwnProperty(e) ? r.properties[e] : null;
            if (o) {
                var a = o.mutationMethod;
                if (a) a(n, t); else {
                    if (i(o, t)) return void this.deleteValueForProperty(n, e);
                    if (o.mustUseProperty) n[o.propertyName] = t; else {
                        var s = o.attributeName, l = o.attributeNamespace;
                        l ? n.setAttributeNS(l, s, "" + t) : o.hasBooleanValue || o.hasOverloadedBooleanValue && !0 === t ? n.setAttribute(s, "") : n.setAttribute(s, "" + t);
                    }
                }
            } else if (r.isCustomAttribute(e)) return void u.setValueForAttribute(n, e, t);
        },
        setValueForAttribute: function(n, e, t) {
            if (o(e)) {
                null == t ? n.removeAttribute(e) : n.setAttribute(e, "" + t);
            }
        },
        deleteValueForAttribute: function(n, e) {
            n.removeAttribute(e);
        },
        deleteValueForProperty: function(n, e) {
            var t = r.properties.hasOwnProperty(e) ? r.properties[e] : null;
            if (t) {
                var o = t.mutationMethod;
                if (o) o(n, void 0); else if (t.mustUseProperty) {
                    var i = t.propertyName;
                    t.hasBooleanValue ? n[i] = !1 : n[i] = "";
                } else n.removeAttribute(t.attributeName);
            } else r.isCustomAttribute(e) && n.removeAttribute(e);
        }
    };
    n.exports = u;
}, function(n, e, t) {
    "use strict";
    var o = {
        hasCachedChildNodes: 1
    };
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o() {
        if (this._rootNodeID && this._wrapperState.pendingUpdate) {
            this._wrapperState.pendingUpdate = !1;
            var n = this._currentElement.props, e = s.getValue(n);
            null != e && i(this, Boolean(n.multiple), e);
        }
    }
    function i(n, e, t) {
        var o, i, r = l.getNodeFromInstance(n).options;
        if (e) {
            for (o = {}, i = 0; i < t.length; i++) o["" + t[i]] = !0;
            for (i = 0; i < r.length; i++) {
                var a = o.hasOwnProperty(r[i].value);
                r[i].selected !== a && (r[i].selected = a);
            }
        } else {
            for (o = "" + t, i = 0; i < r.length; i++) if (r[i].value === o) return void (r[i].selected = !0);
            r.length && (r[0].selected = !0);
        }
    }
    function r(n) {
        var e = this._currentElement.props, t = s.executeOnChange(e, n);
        return this._rootNodeID && (this._wrapperState.pendingUpdate = !0), c.asap(o, this), 
        t;
    }
    var a = t(3), s = t(36), l = t(4), c = t(9), u = (t(1), !1), d = {
        getHostProps: function(n, e) {
            return a({}, e, {
                onChange: n._wrapperState.onChange,
                value: void 0
            });
        },
        mountWrapper: function(n, e) {
            var t = s.getValue(e);
            n._wrapperState = {
                pendingUpdate: !1,
                initialValue: null != t ? t : e.defaultValue,
                listeners: null,
                onChange: r.bind(n),
                wasMultiple: Boolean(e.multiple)
            }, void 0 === e.value || void 0 === e.defaultValue || u || (u = !0);
        },
        getSelectValueContext: function(n) {
            return n._wrapperState.initialValue;
        },
        postUpdateWrapper: function(n) {
            var e = n._currentElement.props;
            n._wrapperState.initialValue = void 0;
            var t = n._wrapperState.wasMultiple;
            n._wrapperState.wasMultiple = Boolean(e.multiple);
            var o = s.getValue(e);
            null != o ? (n._wrapperState.pendingUpdate = !1, i(n, Boolean(e.multiple), o)) : t !== Boolean(e.multiple) && (null != e.defaultValue ? i(n, Boolean(e.multiple), e.defaultValue) : i(n, Boolean(e.multiple), e.multiple ? [] : ""));
        }
    };
    n.exports = d;
}, function(n, e, t) {
    "use strict";
    var o, i = {
        injectEmptyComponentFactory: function(n) {
            o = n;
        }
    }, r = {
        create: function(n) {
            return o(n);
        }
    };
    r.injection = i, n.exports = r;
}, function(n, e, t) {
    "use strict";
    var o = {
        logTopLevelRenders: !1
    };
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        return s || a("111", n.type), new s(n);
    }
    function i(n) {
        return new l(n);
    }
    function r(n) {
        return n instanceof l;
    }
    var a = t(2), s = (t(0), null), l = null, c = {
        injectGenericComponentClass: function(n) {
            s = n;
        },
        injectTextComponentClass: function(n) {
            l = n;
        }
    }, u = {
        createInternalComponent: o,
        createInstanceForText: i,
        isTextComponent: r,
        injection: c
    };
    n.exports = u;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        return r(document.documentElement, n);
    }
    var i = t(127), r = t(96), a = t(53), s = t(54), l = {
        hasSelectionCapabilities: function(n) {
            var e = n && n.nodeName && n.nodeName.toLowerCase();
            return e && ("input" === e && "text" === n.type || "textarea" === e || "true" === n.contentEditable);
        },
        getSelectionInformation: function() {
            var n = s();
            return {
                focusedElem: n,
                selectionRange: l.hasSelectionCapabilities(n) ? l.getSelection(n) : null
            };
        },
        restoreSelection: function(n) {
            var e = s(), t = n.focusedElem, i = n.selectionRange;
            e !== t && o(t) && (l.hasSelectionCapabilities(t) && l.setSelection(t, i), a(t));
        },
        getSelection: function(n) {
            var e;
            if ("selectionStart" in n) e = {
                start: n.selectionStart,
                end: n.selectionEnd
            }; else if (document.selection && n.nodeName && "input" === n.nodeName.toLowerCase()) {
                var t = document.selection.createRange();
                t.parentElement() === n && (e = {
                    start: -t.moveStart("character", -n.value.length),
                    end: -t.moveEnd("character", -n.value.length)
                });
            } else e = i.getOffsets(n);
            return e || {
                start: 0,
                end: 0
            };
        },
        setSelection: function(n, e) {
            var t = e.start, o = e.end;
            if (void 0 === o && (o = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(o, n.value.length); else if (document.selection && n.nodeName && "input" === n.nodeName.toLowerCase()) {
                var r = n.createTextRange();
                r.collapse(!0), r.moveStart("character", t), r.moveEnd("character", o - t), r.select();
            } else i.setOffsets(n, e);
        }
    };
    n.exports = l;
}, function(n, e, t) {
    "use strict";
    function o(n, e) {
        for (var t = Math.min(n.length, e.length), o = 0; o < t; o++) if (n.charAt(o) !== e.charAt(o)) return o;
        return n.length === e.length ? -1 : t;
    }
    function i(n) {
        return n ? n.nodeType === R ? n.documentElement : n.firstChild : null;
    }
    function r(n) {
        return n.getAttribute && n.getAttribute(P) || "";
    }
    function a(n, e, t, o, i) {
        var r;
        if (w.logTopLevelRenders) {
            var a = n._currentElement.props.child, s = a.type;
            r = "React mount: " + ("string" == typeof s ? s : s.displayName || s.name), console.time(r);
        }
        var l = E.mountComponent(n, t, null, v(n, e), i, 0);
        r && console.timeEnd(r), n._renderedComponent._topLevelWrapper = n, j._mountImageIntoNode(l, e, n, o, t);
    }
    function s(n, e, t, o) {
        var i = _.ReactReconcileTransaction.getPooled(!t && y.useCreateElement);
        i.perform(a, null, n, e, i, t, o), _.ReactReconcileTransaction.release(i);
    }
    function l(n, e, t) {
        for (E.unmountComponent(n, t), e.nodeType === R && (e = e.documentElement); e.lastChild; ) e.removeChild(e.lastChild);
    }
    function c(n) {
        var e = i(n);
        if (e) {
            var t = x.getInstanceFromNode(e);
            return !(!t || !t._hostParent);
        }
    }
    function u(n) {
        return !(!n || n.nodeType !== O && n.nodeType !== R && n.nodeType !== D);
    }
    function d(n) {
        var e = i(n), t = e && x.getInstanceFromNode(e);
        return t && !t._hostParent ? t : null;
    }
    function p(n) {
        var e = d(n);
        return e ? e._hostContainerInfo._topLevelWrapper : null;
    }
    var f = t(2), m = t(14), h = t(15), b = t(17), g = t(25), x = (t(11), t(4)), v = t(121), y = t(123), w = t(62), k = t(23), A = (t(7), 
    t(137)), E = t(16), C = t(39), _ = t(9), M = t(20), N = t(72), S = (t(0), t(29)), T = t(45), P = (t(1), 
    h.ID_ATTRIBUTE_NAME), I = h.ROOT_ATTRIBUTE_NAME, O = 1, R = 9, D = 11, L = {}, z = 1, U = function() {
        this.rootID = z++;
    };
    U.prototype.isReactComponent = {}, U.prototype.render = function() {
        return this.props.child;
    }, U.isReactTopLevelWrapper = !0;
    var j = {
        TopLevelWrapper: U,
        _instancesByReactRootID: L,
        scrollMonitor: function(n, e) {
            e();
        },
        _updateRootComponent: function(n, e, t, o, i) {
            return j.scrollMonitor(o, function() {
                C.enqueueElementInternal(n, e, t), i && C.enqueueCallbackInternal(n, i);
            }), n;
        },
        _renderNewRootComponent: function(n, e, t, o) {
            u(e) || f("37"), g.ensureScrollValueMonitoring();
            var i = N(n, !1);
            _.batchedUpdates(s, i, e, t, o);
            var r = i._instance.rootID;
            return L[r] = i, i;
        },
        renderSubtreeIntoContainer: function(n, e, t, o) {
            return null != n && k.has(n) || f("38"), j._renderSubtreeIntoContainer(n, e, t, o);
        },
        _renderSubtreeIntoContainer: function(n, e, t, o) {
            C.validateCallback(o, "ReactDOM.render"), b.isValidElement(e) || f("39", "string" == typeof e ? " Instead of passing a string like 'div', pass React.createElement('div') or <div />." : "function" == typeof e ? " Instead of passing a class like Foo, pass React.createElement(Foo) or <Foo />." : null != e && void 0 !== e.props ? " This may be caused by unintentionally loading two independent copies of React." : "");
            var a, s = b.createElement(U, {
                child: e
            });
            if (n) {
                var l = k.get(n);
                a = l._processChildContext(l._context);
            } else a = M;
            var u = p(t);
            if (u) {
                var d = u._currentElement, m = d.props.child;
                if (T(m, e)) {
                    var h = u._renderedComponent.getPublicInstance(), g = o && function() {
                        o.call(h);
                    };
                    return j._updateRootComponent(u, s, a, t, g), h;
                }
                j.unmountComponentAtNode(t);
            }
            var x = i(t), v = x && !!r(x), y = c(t), w = v && !u && !y, A = j._renderNewRootComponent(s, t, w, a)._renderedComponent.getPublicInstance();
            return o && o.call(A), A;
        },
        render: function(n, e, t) {
            return j._renderSubtreeIntoContainer(null, n, e, t);
        },
        unmountComponentAtNode: function(n) {
            u(n) || f("40");
            var e = p(n);
            if (!e) {
                c(n), 1 === n.nodeType && n.hasAttribute(I);
                return !1;
            }
            return delete L[e._instance.rootID], _.batchedUpdates(l, e, n, !1), !0;
        },
        _mountImageIntoNode: function(n, e, t, r, a) {
            if (u(e) || f("41"), r) {
                var s = i(e);
                if (A.canReuseMarkup(n, s)) return void x.precacheNode(t, s);
                var l = s.getAttribute(A.CHECKSUM_ATTR_NAME);
                s.removeAttribute(A.CHECKSUM_ATTR_NAME);
                var c = s.outerHTML;
                s.setAttribute(A.CHECKSUM_ATTR_NAME, l);
                var d = n, p = o(d, c), h = " (client) " + d.substring(p - 20, p + 20) + "\n (server) " + c.substring(p - 20, p + 20);
                e.nodeType === R && f("42", h);
            }
            if (e.nodeType === R && f("43"), a.useCreateElement) {
                for (;e.lastChild; ) e.removeChild(e.lastChild);
                m.insertTreeBefore(e, n, null);
            } else S(e, n), x.precacheNode(t, e.firstChild);
        }
    };
    n.exports = j;
}, function(n, e, t) {
    "use strict";
    var o = t(2), i = t(17), r = (t(0), {
        HOST: 0,
        COMPOSITE: 1,
        EMPTY: 2,
        getType: function(n) {
            return null === n || !1 === n ? r.EMPTY : i.isValidElement(n) ? "function" == typeof n.type ? r.COMPOSITE : r.HOST : void o("26", n);
        }
    });
    n.exports = r;
}, function(n, e, t) {
    "use strict";
    var o = {
        currentScrollLeft: 0,
        currentScrollTop: 0,
        refreshScrollValues: function(n) {
            o.currentScrollLeft = n.x, o.currentScrollTop = n.y;
        }
    };
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n, e) {
        return null == e && i("30"), null == n ? e : Array.isArray(n) ? Array.isArray(e) ? (n.push.apply(n, e), 
        n) : (n.push(e), n) : Array.isArray(e) ? [ n ].concat(e) : [ n, e ];
    }
    var i = t(2);
    t(0);
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n, e, t) {
        Array.isArray(n) ? n.forEach(e, t) : n && e.call(t, n);
    }
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        for (var e; (e = n._renderedNodeType) === i.COMPOSITE; ) n = n._renderedComponent;
        return e === i.HOST ? n._renderedComponent : e === i.EMPTY ? null : void 0;
    }
    var i = t(66);
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o() {
        return !r && i.canUseDOM && (r = "textContent" in document.documentElement ? "textContent" : "innerText"), 
        r;
    }
    var i = t(5), r = null;
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        if (n) {
            var e = n.getName();
            if (e) return " Check the render method of `" + e + "`.";
        }
        return "";
    }
    function i(n) {
        return "function" == typeof n && void 0 !== n.prototype && "function" == typeof n.prototype.mountComponent && "function" == typeof n.prototype.receiveComponent;
    }
    function r(n, e) {
        var t;
        if (null === n || !1 === n) t = c.create(r); else if ("object" == typeof n) {
            var s = n, l = s.type;
            if ("function" != typeof l && "string" != typeof l) {
                var p = "";
                p += o(s._owner), a("130", null == l ? l : typeof l, p);
            }
            "string" == typeof s.type ? t = u.createInternalComponent(s) : i(s.type) ? (t = new s.type(s), 
            t.getHostNode || (t.getHostNode = t.getNativeNode)) : t = new d(s);
        } else "string" == typeof n || "number" == typeof n ? t = u.createInstanceForText(n) : a("131", typeof n);
        return t._mountIndex = 0, t._mountImage = null, t;
    }
    var a = t(2), s = t(3), l = t(118), c = t(61), u = t(63), d = (t(165), t(0), t(1), 
    function(n) {
        this.construct(n);
    });
    s(d.prototype, l, {
        _instantiateReactComponent: r
    }), n.exports = r;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        var e = n && n.nodeName && n.nodeName.toLowerCase();
        return "input" === e ? !!i[n.type] : "textarea" === e;
    }
    var i = {
        color: !0,
        date: !0,
        datetime: !0,
        "datetime-local": !0,
        email: !0,
        month: !0,
        number: !0,
        password: !0,
        range: !0,
        search: !0,
        tel: !0,
        text: !0,
        time: !0,
        url: !0,
        week: !0
    };
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    var o = t(5), i = t(28), r = t(29), a = function(n, e) {
        if (e) {
            var t = n.firstChild;
            if (t && t === n.lastChild && 3 === t.nodeType) return void (t.nodeValue = e);
        }
        n.textContent = e;
    };
    o.canUseDOM && ("textContent" in document.documentElement || (a = function(n, e) {
        if (3 === n.nodeType) return void (n.nodeValue = e);
        r(n, i(e));
    })), n.exports = a;
}, function(n, e, t) {
    "use strict";
    function o(n, e) {
        return n && "object" == typeof n && null != n.key ? c.escape(n.key) : e.toString(36);
    }
    function i(n, e, t, r) {
        var p = typeof n;
        if ("undefined" !== p && "boolean" !== p || (n = null), null === n || "string" === p || "number" === p || "object" === p && n.$$typeof === s) return t(r, n, "" === e ? u + o(n, 0) : e), 
        1;
        var f, m, h = 0, b = "" === e ? u : e + d;
        if (Array.isArray(n)) for (var g = 0; g < n.length; g++) f = n[g], m = b + o(f, g), 
        h += i(f, m, t, r); else {
            var x = l(n);
            if (x) {
                var v, y = x.call(n);
                if (x !== n.entries) for (var w = 0; !(v = y.next()).done; ) f = v.value, m = b + o(f, w++), 
                h += i(f, m, t, r); else for (;!(v = y.next()).done; ) {
                    var k = v.value;
                    k && (f = k[1], m = b + c.escape(k[0]) + d + o(f, 0), h += i(f, m, t, r));
                }
            } else if ("object" === p) {
                var A = "", E = String(n);
                a("31", "[object Object]" === E ? "object with keys {" + Object.keys(n).join(", ") + "}" : E, A);
            }
        }
        return h;
    }
    function r(n, e, t) {
        return null == n ? 0 : i(n, "", e, t);
    }
    var a = t(2), s = (t(11), t(133)), l = t(164), c = (t(0), t(35)), u = (t(1), "."), d = ":";
    n.exports = r;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        var e = Function.prototype.toString, t = Object.prototype.hasOwnProperty, o = RegExp("^" + e.call(t).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
        try {
            var i = e.call(n);
            return o.test(i);
        } catch (n) {
            return !1;
        }
    }
    function i(n) {
        var e = c(n);
        if (e) {
            var t = e.childIDs;
            u(n), t.forEach(i);
        }
    }
    function r(n, e, t) {
        return "\n    in " + (n || "Unknown") + (e ? " (at " + e.fileName.replace(/^.*[\\\/]/, "") + ":" + e.lineNumber + ")" : t ? " (created by " + t + ")" : "");
    }
    function a(n) {
        return null == n ? "#empty" : "string" == typeof n || "number" == typeof n ? "#text" : "string" == typeof n.type ? n.type : n.type.displayName || n.type.name || "Unknown";
    }
    function s(n) {
        var e, t = C.getDisplayName(n), o = C.getElement(n), i = C.getOwnerID(n);
        return i && (e = C.getDisplayName(i)), r(t, o && o._source, e);
    }
    var l, c, u, d, p, f, m, h = t(19), b = t(11), g = (t(0), t(1), "function" == typeof Array.from && "function" == typeof Map && o(Map) && null != Map.prototype && "function" == typeof Map.prototype.keys && o(Map.prototype.keys) && "function" == typeof Set && o(Set) && null != Set.prototype && "function" == typeof Set.prototype.keys && o(Set.prototype.keys));
    if (g) {
        var x = new Map(), v = new Set();
        l = function(n, e) {
            x.set(n, e);
        }, c = function(n) {
            return x.get(n);
        }, u = function(n) {
            x.delete(n);
        }, d = function() {
            return Array.from(x.keys());
        }, p = function(n) {
            v.add(n);
        }, f = function(n) {
            v.delete(n);
        }, m = function() {
            return Array.from(v.keys());
        };
    } else {
        var y = {}, w = {}, k = function(n) {
            return "." + n;
        }, A = function(n) {
            return parseInt(n.substr(1), 10);
        };
        l = function(n, e) {
            var t = k(n);
            y[t] = e;
        }, c = function(n) {
            var e = k(n);
            return y[e];
        }, u = function(n) {
            var e = k(n);
            delete y[e];
        }, d = function() {
            return Object.keys(y).map(A);
        }, p = function(n) {
            var e = k(n);
            w[e] = !0;
        }, f = function(n) {
            var e = k(n);
            delete w[e];
        }, m = function() {
            return Object.keys(w).map(A);
        };
    }
    var E = [], C = {
        onSetChildren: function(n, e) {
            var t = c(n);
            t || h("144"), t.childIDs = e;
            for (var o = 0; o < e.length; o++) {
                var i = e[o], r = c(i);
                r || h("140"), null == r.childIDs && "object" == typeof r.element && null != r.element && h("141"), 
                r.isMounted || h("71"), null == r.parentID && (r.parentID = n), r.parentID !== n && h("142", i, r.parentID, n);
            }
        },
        onBeforeMountComponent: function(n, e, t) {
            l(n, {
                element: e,
                parentID: t,
                text: null,
                childIDs: [],
                isMounted: !1,
                updateCount: 0
            });
        },
        onBeforeUpdateComponent: function(n, e) {
            var t = c(n);
            t && t.isMounted && (t.element = e);
        },
        onMountComponent: function(n) {
            var e = c(n);
            e || h("144"), e.isMounted = !0, 0 === e.parentID && p(n);
        },
        onUpdateComponent: function(n) {
            var e = c(n);
            e && e.isMounted && e.updateCount++;
        },
        onUnmountComponent: function(n) {
            var e = c(n);
            if (e) {
                e.isMounted = !1;
                0 === e.parentID && f(n);
            }
            E.push(n);
        },
        purgeUnmountedComponents: function() {
            if (!C._preventPurging) {
                for (var n = 0; n < E.length; n++) {
                    i(E[n]);
                }
                E.length = 0;
            }
        },
        isMounted: function(n) {
            var e = c(n);
            return !!e && e.isMounted;
        },
        getCurrentStackAddendum: function(n) {
            var e = "";
            if (n) {
                var t = a(n), o = n._owner;
                e += r(t, n._source, o && o.getName());
            }
            var i = b.current, s = i && i._debugID;
            return e += C.getStackAddendumByID(s);
        },
        getStackAddendumByID: function(n) {
            for (var e = ""; n; ) e += s(n), n = C.getParentID(n);
            return e;
        },
        getChildIDs: function(n) {
            var e = c(n);
            return e ? e.childIDs : [];
        },
        getDisplayName: function(n) {
            var e = C.getElement(n);
            return e ? a(e) : null;
        },
        getElement: function(n) {
            var e = c(n);
            return e ? e.element : null;
        },
        getOwnerID: function(n) {
            var e = C.getElement(n);
            return e && e._owner ? e._owner._debugID : null;
        },
        getParentID: function(n) {
            var e = c(n);
            return e ? e.parentID : null;
        },
        getSource: function(n) {
            var e = c(n), t = e ? e.element : null;
            return null != t ? t._source : null;
        },
        getText: function(n) {
            var e = C.getElement(n);
            return "string" == typeof e ? e : "number" == typeof e ? "" + e : null;
        },
        getUpdateCount: function(n) {
            var e = c(n);
            return e ? e.updateCount : 0;
        },
        getRootIDs: m,
        getRegisteredIDs: d
    };
    n.exports = C;
}, function(n, e, t) {
    "use strict";
    var o = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    var o = {};
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    var o = !1;
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        var e = n && (i && n[i] || n[r]);
        if ("function" == typeof e) return e;
    }
    var i = "function" == typeof Symbol && Symbol.iterator, r = "@@iterator";
    n.exports = o;
}, function(n, e) {
    function t(n, e) {
        for (var t = 0; t < n.length; t++) {
            var o = n[t], i = p[o.id];
            if (i) {
                i.refs++;
                for (var r = 0; r < i.parts.length; r++) i.parts[r](o.parts[r]);
                for (;r < o.parts.length; r++) i.parts.push(l(o.parts[r], e));
            } else {
                for (var a = [], r = 0; r < o.parts.length; r++) a.push(l(o.parts[r], e));
                p[o.id] = {
                    id: o.id,
                    refs: 1,
                    parts: a
                };
            }
        }
    }
    function o(n) {
        for (var e = [], t = {}, o = 0; o < n.length; o++) {
            var i = n[o], r = i[0], a = i[1], s = i[2], l = i[3], c = {
                css: a,
                media: s,
                sourceMap: l
            };
            t[r] ? t[r].parts.push(c) : e.push(t[r] = {
                id: r,
                parts: [ c ]
            });
        }
        return e;
    }
    function i(n, e) {
        var t = h(), o = x[x.length - 1];
        if ("top" === n.insertAt) o ? o.nextSibling ? t.insertBefore(e, o.nextSibling) : t.appendChild(e) : t.insertBefore(e, t.firstChild), 
        x.push(e); else {
            if ("bottom" !== n.insertAt) throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
            t.appendChild(e);
        }
    }
    function r(n) {
        n.parentNode.removeChild(n);
        var e = x.indexOf(n);
        e >= 0 && x.splice(e, 1);
    }
    function a(n) {
        var e = document.createElement("style");
        return e.type = "text/css", i(n, e), e;
    }
    function s(n) {
        var e = document.createElement("link");
        return e.rel = "stylesheet", i(n, e), e;
    }
    function l(n, e) {
        var t, o, i;
        if (e.singleton) {
            var l = g++;
            t = b || (b = a(e)), o = c.bind(null, t, l, !1), i = c.bind(null, t, l, !0);
        } else n.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (t = s(e), 
        o = d.bind(null, t), i = function() {
            r(t), t.href && URL.revokeObjectURL(t.href);
        }) : (t = a(e), o = u.bind(null, t), i = function() {
            r(t);
        });
        return o(n), function(e) {
            if (e) {
                if (e.css === n.css && e.media === n.media && e.sourceMap === n.sourceMap) return;
                o(n = e);
            } else i();
        };
    }
    function c(n, e, t, o) {
        var i = t ? "" : o.css;
        if (n.styleSheet) n.styleSheet.cssText = v(e, i); else {
            var r = document.createTextNode(i), a = n.childNodes;
            a[e] && n.removeChild(a[e]), a.length ? n.insertBefore(r, a[e]) : n.appendChild(r);
        }
    }
    function u(n, e) {
        var t = e.css, o = e.media;
        if (o && n.setAttribute("media", o), n.styleSheet) n.styleSheet.cssText = t; else {
            for (;n.firstChild; ) n.removeChild(n.firstChild);
            n.appendChild(document.createTextNode(t));
        }
    }
    function d(n, e) {
        var t = e.css, o = e.sourceMap;
        o && (t += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(o)))) + " */");
        var i = new Blob([ t ], {
            type: "text/css"
        }), r = n.href;
        n.href = URL.createObjectURL(i), r && URL.revokeObjectURL(r);
    }
    var p = {}, f = function(n) {
        var e;
        return function() {
            return void 0 === e && (e = n.apply(this, arguments)), e;
        };
    }, m = f(function() {
        return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
    }), h = f(function() {
        return document.head || document.getElementsByTagName("head")[0];
    }), b = null, g = 0, x = [];
    n.exports = function(n, e) {
        if ("undefined" != typeof DEBUG && DEBUG && "object" != typeof document) throw new Error("The style-loader cannot be used in a non-browser environment");
        e = e || {}, void 0 === e.singleton && (e.singleton = m()), void 0 === e.insertAt && (e.insertAt = "bottom");
        var i = o(n);
        return t(i, e), function(n) {
            for (var r = [], a = 0; a < i.length; a++) {
                var s = i[a], l = p[s.id];
                l.refs--, r.push(l);
            }
            if (n) {
                t(o(n), e);
            }
            for (var a = 0; a < r.length; a++) {
                var l = r[a];
                if (0 === l.refs) {
                    for (var c = 0; c < l.parts.length; c++) l.parts[c]();
                    delete p[l.id];
                }
            }
        };
    };
    var v = function() {
        var n = [];
        return function(e, t) {
            return n[e] = t, n.filter(Boolean).join("\n");
        };
    }();
}, function(n, e, t) {
    "use strict";
    n.exports = t(119);
}, function(n, e, t) {
    var o = t(92);
    "string" == typeof o && (o = [ [ n.i, o, "" ] ]);
    t(81)(o, {});
    o.locals && (n.exports = o.locals);
}, function(n, e, t) {
    var o = t(93);
    "string" == typeof o && (o = [ [ n.i, o, "" ] ]);
    t(81)(o, {});
    o.locals && (n.exports = o.locals);
}, function(n, e, t) {
    "use strict";
    var o = t(8), i = (t.n(o), t(12)), r = t(87), a = t(50);
    const s = [ [ {
        row: 0,
        col: 0
    } ], [ {
        row: -9,
        col: -9
    }, {
        row: 9,
        col: 9
    } ], [ {
        row: -13,
        col: -13
    }, {
        row: 0,
        col: 0
    }, {
        row: 13,
        col: 13
    } ], [ {
        row: -10,
        col: -10
    }, {
        row: -10,
        col: 10
    }, {
        row: 10,
        col: -10
    }, {
        row: 10,
        col: 10
    } ], [ {
        row: -14,
        col: -14
    }, {
        row: -14,
        col: 14
    }, {
        row: 0,
        col: 0
    }, {
        row: 14,
        col: -14
    }, {
        row: 14,
        col: 14
    } ], [ {
        row: -14,
        col: -14
    }, {
        row: -14,
        col: 14
    }, {
        row: 0,
        col: -14
    }, {
        row: 0,
        col: 14
    }, {
        row: 14,
        col: -14
    }, {
        row: 14,
        col: 14
    } ] ], l = n => o.createElement("div", {
        style: {
            display: "inline-block",
            margin: "2vmin",
            width: "95vmin",
            height: "95vmin",
            overflow: "hidden"
        }
    }, o.createElement("div", {
        id: "board",
        style: {
            transformOrigin: `${n.zoom.origin.x}px ${n.zoom.origin.y}px`,
            transform: `scale(${16 * n.zoom.scale / n.game.boardSize}, ` + `${16 * n.zoom.scale / n.game.boardSize})`
        }
    }, o.createElement("div", {
        key: "terrains",
        className: "board"
    }, n.game.terrains.map(e => o.createElement(a.a, {
        key: "row" + e.position.row + "col" + e.position.col,
        terrain: e,
        selected: n.selection.some(n => n === e.topMeeple),
        enqueuePlay: n.enqueuePlay,
        select: n.select
    }))), o.createElement("div", {
        key: "meeples",
        className: "board"
    }, n.game.terrains.filter(n => -1 !== n.topMeeple).map(e => t.i(i.j)(n.game, e.topMeeple)).reduce((n, e) => [ ...n, ...e.map((n, t) => ({
        m: n,
        p: t,
        l: e.length
    })) ], new Array()).sort((n, e) => n.m.key - e.m.key).map(e => o.createElement(r.a, {
        key: e.m.key,
        meeple: e.m,
        translation: s[e.l - 1][e.p],
        scale: 1.4 - e.l / 7,
        select: n.select
    })))));
    e.a = l;
}, function(n, e, t) {
    "use strict";
    var o = t(8), i = (t.n(o), t(12)), r = t(88);
    const a = n => o.createElement("div", null, n.game.players.filter(e => e.team >= n.game.turn.team).concat(n.game.players.filter(e => e.team < n.game.turn.team)).map(e => o.createElement(r.a, {
        key: e.team,
        player: e,
        swarm: n.game.meeples.filter(n => -1 !== n.key && n.team === e.team),
        empire: e.cities.map(e => n.game.terrains[e]).filter(({construction: construction}) => "city" === construction.type).map(n => ({
            city: n.construction,
            spaceLeft: n.spaceLeft
        })).concat(n.game.meeples.filter(n => -1 !== n.key && n.team === e.team && -1 === n.topsMeeple).map(e => n.game.terrains[t.i(i.g)(e.position, n.game.boardSize)]).filter(({construction: construction}) => "city" === construction.type && construction.team !== e.team).map(n => ({
            city: n.construction,
            spaceLeft: n.spaceLeft
        }))),
        setup: n.setup,
        enqueuePlay: n.enqueuePlay,
        select: n.select,
        selection: n.selection,
        active: e.team === n.game.turn.team
    })));
    e.a = a;
}, function(n, e, t) {
    "use strict";
    var o = t(8), i = (t.n(o), t(12));
    const r = n => o.createElement("div", {
        style: {
            pointerEvents: "none"
        }
    }, o.createElement("span", {
        className: "icon is-medium meeple is-" + i.e[n.meeple.team],
        style: {
            top: 45 * n.meeple.position.row + 7 + n.translation.row,
            left: 45 * n.meeple.position.col + 7 + n.translation.col,
            transform: "scale(" + n.scale + ")",
            opacity: .5 + n.meeple.resistance / 20
        }
    }, o.createElement("i", {
        className: "fa fa-user-circle" + (n.meeple.side === i.k.heads ? "-o" : "")
    })));
    e.a = r;
}, function(n, e, t) {
    "use strict";
    var o = t(8), i = (t.n(o), t(12)), r = t(50);
    const a = n => o.createElement("div", {
        className: "player is-" + i.e[n.player.team],
        style: {
            opacity: 0 === n.player.swarmSize ? .1 : 1,
            transition: "opacity 1s"
        }
    }, o.createElement("div", null, "general ", i.e[n.player.team], " ", n.player.swarmSize > 0 ? "" : "is dead :("), o.createElement("div", null, o.createElement("div", {
        className: "player-view"
    }, o.createElement("div", {
        className: "player-actions"
    }, o.createElement("a", {
        className: "button is-large is-outlined is-" + i.e[n.player.team],
        style: {
            borderColor: "transparent"
        },
        onClick: () => n.enqueuePlay(n.player.team, i.m.hold)
    }, o.createElement("span", {
        className: "icon is-large"
    }, o.createElement("i", {
        className: "fa fa-hand-paper-o"
    }))), o.createElement("a", {
        className: "button is-large is-outlined is-" + i.e[n.player.team],
        style: {
            borderColor: "transparent"
        },
        onClick: () => n.enqueuePlay(n.player.team, i.m.up)
    }, o.createElement("span", {
        className: "icon is-large"
    }, o.createElement("i", {
        className: "fa fa-hand-o-up"
    }))), o.createElement("a", {
        className: "button is-large is-outlined is-" + i.e[n.player.team],
        style: {
            borderColor: "transparent"
        },
        onClick: () => n.enqueuePlay(n.player.team, i.m.explore)
    }, o.createElement("span", {
        className: "icon is-large"
    }, o.createElement("i", {
        className: "fa fa-hand-rock-o"
    })))), o.createElement("div", {
        className: "player-actions"
    }, o.createElement("a", {
        className: "button is-large is-outlined is-" + i.e[n.player.team],
        style: {
            borderColor: "transparent"
        },
        onClick: () => n.enqueuePlay(n.player.team, i.m.left)
    }, o.createElement("span", {
        className: "icon is-large"
    }, o.createElement("i", {
        className: "fa fa-hand-o-left"
    }))), o.createElement("a", {
        className: "button is-large is-outlined is-" + i.e[n.player.team],
        style: {
            borderColor: "transparent"
        },
        onClick: () => n.enqueuePlay(n.player.team, i.m.down)
    }, o.createElement("span", {
        className: "icon is-large"
    }, o.createElement("i", {
        className: "fa fa-hand-o-down"
    }))), o.createElement("a", {
        className: "button is-large is-outlined is-" + i.e[n.player.team],
        style: {
            borderColor: "transparent"
        },
        onClick: () => n.enqueuePlay(n.player.team, i.m.right)
    }, o.createElement("span", {
        className: "icon is-large"
    }, o.createElement("i", {
        className: "fa fa-hand-o-right"
    }))))), o.createElement("div", {
        className: "meeple-view"
    }, n.swarm.map(e => o.createElement("div", {
        key: e.key,
        style: {
            display: "inline-block"
        }
    }, o.createElement("a", {
        onClick: () => n.select(e.position),
        className: "button is-large is-outlined",
        style: {
            textDecoration: "none",
            borderColor: "transparent"
        }
    }, o.createElement("span", {
        className: "icon is-large" + (n.selection.some(n => e.key === n) ? " selected" : "") + " is-" + i.e[e.team],
        style: {
            opacity: .5 + e.resistance / 20
        }
    }, o.createElement("i", {
        className: "fa fa-user-circle" + (e.side === i.k.heads ? "-o" : "")
    }))), o.createElement("div", {
        className: "meeple-stats"
    }, o.createElement("div", null, "⚔️️", e.strength), o.createElement("div", null, "🛡️", e.resistance), o.createElement("div", null, "🙏️", e.faith))))), o.createElement("div", {
        className: "cities-view"
    }, n.empire.map(({city: city,  spaceLeft: spaceLeft}) => o.createElement("div", {
        key: city.key,
        style: {
            display: "inline-block"
        }
    }, o.createElement("div", {
        style: {
            textAlign: "center"
        }
    }, city.name), o.createElement("a", {
        className: "button is-large is-outlined",
        style: {
            textDecoration: "none",
            textAlign: "center",
            borderColor: "transparent"
        }
    }, o.createElement("span", {
        className: "icon is-large is-" + i.e[city.team],
        style: {
            opacity: .5 + city.defense / 20
        }
    }, "🏙️")), o.createElement("div", {
        style: {
            textAlign: "center"
        }
    }, "🛡️", city.defense, "👥️", spaceLeft)))), o.createElement("div", {
        className: "buildings-view"
    }, o.createElement("span", null, i.n.filter(({piece: piece}) => null !== piece).filter((e, t) => "built" === n.player.buildingPhase[t]).map(({piece: piece}, e) => o.createElement("a", {
        key: e,
        className: "button is-large is-outlined is-" + i.e[n.player.team],
        style: {
            borderColor: "transparent"
        }
    }, o.createElement("span", {
        className: "icon is-large"
    }, o.createElement("span", {
        className: "fa building"
    }, t.i(r.b)(piece), "️")))), " ", i.n.filter(({piece: piece}) => null !== piece).filter((e, t) => "blueprint" === n.player.buildingPhase[t]).map(({piece: piece}, e) => o.createElement("a", {
        key: e,
        className: "button is-large is-outlined is-" + i.e[n.player.team],
        style: {
            borderColor: "transparent"
        }
    }, o.createElement("span", {
        className: "icon is-large"
    }, o.createElement("span", {
        className: "fa artifact"
    }, piece))))))));
    e.a = a;
}, function(n, e, t) {
    "use strict";
    var o = t(8);
    t.n(o);
    class i extends o.Component {
         constructor(n) {
            super(n), this.eventListener = this.eventListener.bind(this), document.removeEventListener("keypress", this.eventListener), 
            document.addEventListener("keypress", this.eventListener);
        }
         eventListener(n) {
            switch (n.key) {
              case "q":
                this.props.setup("-player");
                break;

              case "w":
                this.props.setup("rearrange");
                break;

              case "e":
                this.props.setup("+player");
                break;

              case "a":
                this.props.setup("-computer");
                break;

              case "s":
                this.props.setup("rearrange");
                break;

              case "d":
                this.props.setup("+computer");
                break;

              case "z":
                this.props.setup("-size");
                break;

              case "x":
                this.props.setup("rearrange");
                break;

              case "c":
                this.props.setup("+size");
                break;

              case " ":
                this.props.setup("begin");
                break;

              case "/":
              case "?":
                this.props.setup("tutorial");
            }
        }
         componentWillUnmount() {
            document.removeEventListener("keypress", this.eventListener);
        }
         render() {
            let n, e;
            return n = o.createElement("div", null, o.createElement("p", null, o.createElement("a", {
                className: "is-link",
                onClick: () => this.props.setup("-player")
            }, o.createElement("span", {
                className: "icon"
            }, o.createElement("i", {
                className: "fa fa-minus"
            }))), " ", o.createElement("a", {
                className: "is-link",
                onClick: () => this.props.setup("rearrange")
            }, this.props.playerCount), " ", o.createElement("a", {
                className: "is-link",
                onClick: () => this.props.setup("+player")
            }, o.createElement("span", {
                className: "icon"
            }, o.createElement("i", {
                className: "fa fa-plus"
            }))), "  human players"), o.createElement("p", null, o.createElement("a", {
                className: "is-link",
                onClick: () => this.props.setup("-computer")
            }, o.createElement("span", {
                className: "icon"
            }, o.createElement("i", {
                className: "fa fa-minus"
            }))), " ", o.createElement("a", {
                className: "is-link",
                onClick: () => this.props.setup("rearrange")
            }, this.props.computerCount), " ", o.createElement("a", {
                className: "is-link",
                onClick: () => this.props.setup("+computer")
            }, o.createElement("span", {
                className: "icon"
            }, o.createElement("i", {
                className: "fa fa-plus"
            }))), "  automatic players"), o.createElement("p", null, o.createElement("a", {
                className: "is-link",
                onClick: () => this.props.setup("-size")
            }, o.createElement("span", {
                className: "icon"
            }, o.createElement("i", {
                className: "fa fa-minus"
            }))), " ", o.createElement("a", {
                className: "is-link",
                onClick: () => this.props.setup("rearrange")
            }, this.props.boardSize), " ", o.createElement("a", {
                className: "is-link",
                onClick: () => this.props.setup("+size")
            }, o.createElement("span", {
                className: "icon"
            }, o.createElement("i", {
                className: "fa fa-plus"
            }))), "  board size")), e = o.createElement("p", null, "click ", o.createElement("a", {
                className: "is-link",
                onClick: () => this.props.setup("begin")
            }, "here"), " to begin.", o.createElement("br", null), "(or click ", o.createElement("a", {
                className: "is-link",
                onClick: () => this.props.setup("tutorial")
            }, "here"), " for a short tutorial.)"), o.createElement("div", {
                className: "notification"
            }, o.createElement("h1", {
                className: "title is-2"
            }, "anaander"), o.createElement("h2", {
                className: "is-2"
            }, n), o.createElement("span", null, e));
        }
    }
    e.a = i;
}, function(n, e, t) {
    "use strict";
    var o = t(8), i = (t.n(o), t(12)), r = t(49);
    class a extends o.Component {
         constructor(n) {
            super(n), document.removeEventListener("keypress", this.eventListener), this.eventListener = this.eventListener.bind(this), 
            document.addEventListener("keypress", this.eventListener);
        }
         eventListener(n) {
            switch (n.key) {
              case "q":
                this.props.enqueuePlay(this.props.game.turn.team, i.m.hold);
                break;

              case "w":
                this.props.enqueuePlay(this.props.game.turn.team, i.m.up);
                break;

              case "e":
                this.props.enqueuePlay(this.props.game.turn.team, i.m.explore);
                break;

              case "a":
                this.props.enqueuePlay(this.props.game.turn.team, i.m.left);
                break;

              case "s":
                this.props.enqueuePlay(this.props.game.turn.team, i.m.down);
                break;

              case "d":
                this.props.enqueuePlay(this.props.game.turn.team, i.m.right);
                break;

              case "/":
              case "?":
                this.props.setup("setup");
            }
        }
         componentDidUpdate(n) {
            n.mode !== r.b.end && this.props.mode === r.b.end && (window.clearTimeout(this.refresher), 
            this.animateEnding = this.animateEnding.bind(this), this.refresher = window.setTimeout(this.animateEnding, 300));
        }
         componentWillUnmount() {
            window.clearTimeout(this.refresher), document.removeEventListener("keypress", this.eventListener);
        }
         animateEnding() {
            if (this.props.mode === r.b.end) {
                let n = 5;
                const e = this.props.game.meeples.filter(n => -1 !== n.key && n.team === this.props.game.turn.team && n.side === this.props.game.turn.side);
                if (e.length > 0) {
                    const t = e.map(n => [ (n.position.row + 1) / (this.props.game.boardSize + 1), (n.position.col + 1) / (this.props.game.boardSize + 1), (this.props.game.boardSize - n.position.row) / (this.props.game.boardSize + 1), (this.props.game.boardSize - n.position.col) / (this.props.game.boardSize + 1) ]).reduce((n, t) => t.map((t, o) => n[o] + t / e.length), [ 0, 0, 0, 0 ]), o = t.map((n, e) => n * Math.max(n, t[(e + 2) % 4]) / Math.min(n, t[(e + 2) % 4])), r = Math.max(t[0], t[2]) / Math.min(t[0], t[2]) + Math.max(t[1], t[3]) / Math.min(t[1], t[3]);
                    let a = Math.random() * r, s = 0;
                    for (;a > 0; ) a -= o[s++];
                    const l = s - 1;
                    n = Math.random() * t[l] * 32;
                    for (let e = 0; e < n; e++) Math.random() < 1 / n ? (this.props.select(this.props.game.meeples.find(n => n.team === this.props.game.turn.team && n.side === this.props.game.turn.side).position), 
                    this.props.enqueuePlay(this.props.game.turn.team, i.m.explore)) : (this.props.select(this.props.game.meeples.find(n => n.team === this.props.game.turn.team && n.side === this.props.game.turn.side).position), 
                    this.props.enqueuePlay(this.props.game.turn.team, l));
                }
                window.clearTimeout(this.refresher), this.refresher = window.setTimeout(this.animateEnding, 85 * n);
            }
        }
         render() {
            let n, e;
            if (this.props.mode === r.b.end) n = o.createElement("p", null, "general ", o.createElement("span", {
                className: "is-" + i.e[this.props.game.turn.team]
            }, i.e[this.props.game.turn.team]), " won the game!"), e = o.createElement("p", null, "click ", o.createElement("a", {
                className: "is-link",
                onClick: () => this.props.setup("setup")
            }, "here"), " to play a new game."); else {
                n = o.createElement("p", null, "it's general ", o.createElement("span", {
                    className: "is-" + i.e[this.props.game.turn.team]
                }, i.e[this.props.game.turn.team]), "'s turn.");
                let t = this.props.game.outcome[0];
                switch (t.type) {
                  case "invalid":
                    e = o.createElement("p", null, t.explanation);
                    break;

                  case "action":
                  case "none":
                  default:
                    const n = o.createElement("span", {
                        className: "icon"
                    }, o.createElement("i", {
                        className: "fa fa-user-circle" + (this.props.game.turn.side === i.k.heads ? "-o" : "") + " is-" + i.e[this.props.game.turn.team]
                    }));
                    e = o.createElement("p", null, "choose an action for these meeples: ", n);
                }
            }
            return o.createElement("div", {
                className: "notification"
            }, o.createElement("h1", {
                className: "title is-2"
            }, "anaander"), o.createElement("h2", {
                className: "subtitle is-4"
            }, n), o.createElement("span", null, e));
        }
    }
    e.a = a;
}, function(n, e, t) {
    "use strict";
    var o = t(8), i = (t.n(o), t(12));
    class r extends o.Component {
         constructor(n, e) {
            super(n, e), this.state = {
                step: -1,
                autoplay: !0
            }, this.loadStep = this.loadStep.bind(this), window.clearInterval(this.refresher), 
            this.autoplay = this.autoplay.bind(this), this.refresher = window.setInterval(this.autoplay, 1e3), 
            document.removeEventListener("keypress", this.eventListener), this.eventListener = this.eventListener.bind(this), 
            document.addEventListener("keypress", this.eventListener);
        }
         componentWillUnmount() {
            window.clearInterval(this.refresher), document.removeEventListener("keypress", this.eventListener);
        }
         autoplay() {
            if (this.state.autoplay) {
                const n = a[this.props.lesson.index][2], e = this.state.step + 1;
                n.length > 0 ? e < a[this.props.lesson.index][2].length ? this.playStep(e) : this.loadLesson(this.props.lesson.index) : this.playStep(e);
            }
        }
         loadLesson(n, e = !0) {
            this.setState({
                step: -1,
                autoplay: e
            }), this.props.setup("tutorial", {
                index: n
            });
        }
         playStep(n) {
            this.setState({
                step: n
            });
            const e = a[this.props.lesson.index][2];
            if (e.length > 0) {
                const [t,  o] = e[n];
                this.props.enqueuePlay(t, o);
            } else this.props.enqueuePlay(n % 5, [ i.m.up, i.m.left, i.m.down, i.m.right, i.m.explore ][Math.floor(5 * Math.random())]);
        }
         loadStep(n) {
            this.loadLesson(this.props.lesson.index, !1);
            for (let e = 0; e <= n; e++) this.playStep(e);
        }
         eventListener(n) {
            const e = this.props.lesson;
            if (e) {
                const t = a[e.index][2];
                switch (n.key) {
                  case "w":
                    e.index > 0 && this.loadLesson(e.index - 1);
                    break;

                  case "a":
                    t.length > 0 && this.loadStep((this.state.step - 1 + t.length) % t.length);
                    break;

                  case "s":
                    e.index < a.length - 1 && this.loadLesson(e.index + 1);
                    break;

                  case "d":
                    t.length > 0 && this.loadStep((this.state.step + 1) % t.length);
                    break;

                  case "/":
                  case "?":
                    this.props.setup("setup");
                }
            }
        }
         render() {
            let n;
            return n = o.createElement("div", {
                className: "content"
            }, a.map(([n,  e,  t], r) => o.createElement("div", {
                key: r,
                className: "title is-6"
            }, this.props.lesson && r === this.props.lesson.index ? o.createElement("div", null, o.createElement("strong", null, n), e, o.createElement("p", null, t ? t.map(([n,  e], t) => o.createElement("a", {
                key: t,
                className: "button is-small is-" + i.e[n] + (t !== this.state.step ? " is-outlined" : ""),
                onClick: () => this.loadStep(t)
            }, o.createElement("span", {
                className: "icon is-small"
            }, o.createElement("i", {
                className: "fa fa-hand-o-" + i.m[e]
            })))) : null)) : o.createElement("div", {
                onClick: () => this.loadLesson(r)
            }, n)))), o.createElement("div", {
                className: "notification"
            }, o.createElement("h1", {
                className: "title is-2"
            }, "anaander tutorial"), o.createElement("h2", {
                className: "subtitle is-4"
            }, "(click ", o.createElement("a", {
                className: "is-link",
                onClick: () => this.props.setup("setup")
            }, "here"), " to go back.)"), n);
        }
    }
    e.a = r;
    const a = [ [ o.createElement("div", null, "welcome to anaander, a game about post-human armies with a shared mind—veeeeeeery loosely based on Ancillary Justice, first novel in the Imperial Radch series by Ann Leckie, where multiple bodies and soldiers form a shared consciousness for single entities, like spaceships, or like the Lord of the Radch herself."), o.createElement("span", null, "click on the paragraph below (clicking on paragraphs will give you details about their instructions)."), [] ], [ o.createElement("div", null, "that is the board, and those tiny squares are terrain tiles."), o.createElement("span", null, "the board is usually made of 32×32 squares. hover your mouse over the tiles and you’ll see the geography of that terrain, matching its pale color."), [] ], [ o.createElement("div", null, "that is a meeple."), o.createElement("span", null, "it’s like a pawn inside a circle. also, they’re located on top of a terrain tile."), [] ], [ o.createElement("div", null, "and those are the other colors a meeple can have."), o.createElement("span", null, "blue, yellow, green, red and teal are meeples that belong to the player who has been assigned that specific color. the black meeple is a ", o.createElement("em", null, "neutral"), " one."), [] ], [ o.createElement("div", null, "that is how a meeple moves."), o.createElement("span", null, "one at a time, it’s moving in each of the possible directions: up, right, down, and left—no diagonals allowed. these buttons below are the commands you have to issue when you wish to take that action during the game. from now on, they’ll appear in these instructions so that you learn how to take these actions; if you want to examine more carefully the moves taken, you may push them any time, it will pause the animation and take you to the selected step for closer inspection."), [ [ i.e.info, i.m.right ], [ i.e.info, i.m.down ], [ i.e.info, i.m.left ], [ i.e.info, i.m.up ] ] ], [ o.createElement("div", null, "a meeple moved on top of another meeple!"), o.createElement("span", null, "that’s because the neutral meeple was standing in the way of the blue meeple, so the blue meeple climbed on top of the neutral meeple. they’re occupying the same terrain now. on a future turn, only the top meeple is free to move out of this square. other meeples have to wait until there’s no other meeple on top of them."), [ [ i.e.info, i.m.left ], [ i.e.info, i.m.right ] ] ], [ o.createElement("div", null, "a meeple changed its color!"), o.createElement("span", null, "it was a ", o.createElement("em", null, "conversion"), ", it got converted to another player’s cause! how? when you mouse over these meeples, pay attention to their stats, particularly ", o.createElement("em", null, "faith"), ". neutral meeple’s faith was much lower than blue meeple’s faith. so the first thing a meeple does when it moves on top of another meeple is to try to convert it, and if it’s successful, it will change its color ", o.createElement("em", null, "peacefully"), "(notice how the converted meeple didn’t change its stats after conversion)."), [ [ i.e.info, i.m.up ], [ i.e.info, i.m.up ], [ i.e.info, i.m.left ], [ i.e.info, i.m.left ] ] ], [ o.createElement("div", null, "so what happens if two meeples are stronger in their faith? things get ", o.createElement("i", null, "unpeaceful"), "?"), o.createElement("span", null, "yeah, they’ll hit each other with their ", o.createElement("em", null, "strength"), " (another stat shown when you move your mouse over meeples). after a hit, a meeple loses ", o.createElement("em", null, "resistance"), " equal to the hit taken, so each meeple leaves the encounter weaker. there's a difference here to conversion—while both meeples hit each other's resistance, only the meeple that's moving on top of the other can try to convert the other. also notice that each meeple only strikes the other ", o.createElement("em", null, "once"), ", in the event that another meeple climbed on top of another meeple. if you want to hit that meeple again, you first have to move away from that tile (and from the top of that meeple), and move back on top of it (or wait for it to move on top of you later, at the risk of being converted)."), [ [ i.e.info, i.m.up ], [ i.e.info, i.m.up ], [ i.e.info, i.m.left ], [ i.e.info, i.m.left ] ] ], [ o.createElement("div", null, "eventually a meeple’s resistance will reach zero."), o.createElement("span", null, "well, if that happens… the meeple dies! sad, but obvious, isn’t it? by the way, that needs to happen quite a lot if you want to win the game—you need to remove every opponent’s meeple from the game in order to remove that player from the game, which in turn will make you the winner if you manage to eliminate all players from game. well, except you, just to be clear: in case you eliminate your last opponent ", o.createElement("em", null, "and"), " you get killed at the same time, the game is a tie."), [ [ i.e.info, i.m.up ], [ i.e.info, i.m.up ], [ i.e.info, i.m.left ], [ i.e.info, i.m.left ] ] ], [ o.createElement("div", null, "now, regarding all those meeples you converted, here comes the core mechanic of the game—", o.createElement("i", null, "the swarm"), "."), o.createElement("span", null, "the swarm is the collective of all meeples of your color. they move as a single entity, each meeple performing the same action assigned that round to the swarm by the player. that is, as long as they can perform the action; all restrictions to individual meeples apply to each meeple in the swarm as well."), [ [ i.e.info, i.m.right ], [ i.e.info, i.m.down ], [ i.e.info, i.m.left ], [ i.e.info, i.m.up ] ] ], [ o.createElement("div", null, "speaking of movement restrictions, let’s talk about them."), o.createElement("span", null, "we mentioned about how ", o.createElement("em", null, "meeples on top of other meeples"), " will block meeples from taking an action; a meeple ", o.createElement("em", null, "can’t leave the board"), " from the edges, as it would obviously fall from the board; and there’s the ", o.createElement("em", null, "terrain"), " restriction—each geography has a maximum meeple capacity. whenever a meeple in any of these situations tries to move, it doesn’t complete the action; if it happens as part of the swarm movement, the other meeples in the swarm are unaffected and may try to complete their own movements, as explained in the previous lesson of the tutorial."), [] ] ];
}, function(n, e, t) {
    e = n.exports = t(51)(), e.push([ n.i, '/*! bulma.io v0.3.2 | MIT License | github.com/jgthms/bulma */\n@-webkit-keyframes spinAround {\n  from {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  to {\n    -webkit-transform: rotate(359deg);\n            transform: rotate(359deg);\n  }\n}\n@keyframes spinAround {\n  from {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  to {\n    -webkit-transform: rotate(359deg);\n            transform: rotate(359deg);\n  }\n}\n\n/*! minireset.css v0.0.2 | MIT License | github.com/jgthms/minireset.css */\nhtml,\nbody,\np,\nol,\nul,\nli,\ndl,\ndt,\ndd,\nblockquote,\nfigure,\nfieldset,\nlegend,\ntextarea,\npre,\niframe,\nhr,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  margin: 0;\n  padding: 0;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: 100%;\n  font-weight: normal;\n}\n\nul {\n  list-style: none;\n}\n\nbutton,\ninput,\nselect,\ntextarea {\n  margin: 0;\n}\n\nhtml {\n  box-sizing: border-box;\n}\n\n* {\n  box-sizing: inherit;\n}\n\n*:before, *:after {\n  box-sizing: inherit;\n}\n\nimg,\nembed,\nobject,\naudio,\nvideo {\n  height: auto;\n  max-width: 100%;\n}\n\niframe {\n  border: 0;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\ntd,\nth {\n  padding: 0;\n  text-align: left;\n}\n\nhtml {\n  background-color: white;\n  font-size: 14px;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  min-width: 300px;\n  overflow-x: hidden;\n  overflow-y: scroll;\n  text-rendering: optimizeLegibility;\n}\n\narticle,\naside,\nfigure,\nfooter,\nheader,\nhgroup,\nsection {\n  display: block;\n}\n\nbody,\nbutton,\ninput,\nselect,\ntextarea {\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;\n}\n\ncode,\npre {\n  -moz-osx-font-smoothing: auto;\n  -webkit-font-smoothing: auto;\n  font-family: "Inconsolata", "Consolas", "Monaco", monospace;\n}\n\nbody {\n  color: #4a4a4a;\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n}\n\na {\n  color: #00d1b2;\n  cursor: pointer;\n  text-decoration: none;\n  -webkit-transition: none 86ms ease-out;\n  transition: none 86ms ease-out;\n}\n\na:hover {\n  color: #363636;\n}\n\ncode {\n  background-color: whitesmoke;\n  color: #ff3860;\n  font-size: 0.8em;\n  font-weight: normal;\n  padding: 0.25em 0.5em 0.25em;\n}\n\nhr {\n  background-color: #dbdbdb;\n  border: none;\n  display: block;\n  height: 1px;\n  margin: 1.5rem 0;\n}\n\nimg {\n  max-width: 100%;\n}\n\ninput[type="checkbox"],\ninput[type="radio"] {\n  vertical-align: baseline;\n}\n\nsmall {\n  font-size: 0.8em;\n}\n\nspan {\n  font-style: inherit;\n  font-weight: inherit;\n}\n\nstrong {\n  color: #363636;\n  font-weight: 700;\n}\n\npre {\n  background-color: whitesmoke;\n  color: #4a4a4a;\n  font-size: 0.8em;\n  white-space: pre;\n  word-wrap: normal;\n}\n\npre code {\n  background: none;\n  color: inherit;\n  display: block;\n  font-size: 1em;\n  overflow-x: auto;\n  padding: 1.25rem 1.5rem;\n}\n\ntable {\n  width: 100%;\n}\n\ntable td,\ntable th {\n  text-align: left;\n  vertical-align: top;\n}\n\ntable th {\n  color: #363636;\n}\n\n.is-block {\n  display: block;\n}\n\n@media screen and (max-width: 768px) {\n  .is-block-mobile {\n    display: block !important;\n  }\n}\n\n@media screen and (min-width: 769px) {\n  .is-block-tablet {\n    display: block !important;\n  }\n}\n\n@media screen and (min-width: 769px) and (max-width: 999px) {\n  .is-block-tablet-only {\n    display: block !important;\n  }\n}\n\n@media screen and (max-width: 999px) {\n  .is-block-touch {\n    display: block !important;\n  }\n}\n\n@media screen and (min-width: 1000px) {\n  .is-block-desktop {\n    display: block !important;\n  }\n}\n\n@media screen and (min-width: 1000px) and (max-width: 1191px) {\n  .is-block-desktop-only {\n    display: block !important;\n  }\n}\n\n@media screen and (min-width: 1192px) {\n  .is-block-widescreen {\n    display: block !important;\n  }\n}\n\n.is-flex {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n@media screen and (max-width: 768px) {\n  .is-flex-mobile {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n}\n\n@media screen and (min-width: 769px) {\n  .is-flex-tablet {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n}\n\n@media screen and (min-width: 769px) and (max-width: 999px) {\n  .is-flex-tablet-only {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n}\n\n@media screen and (max-width: 999px) {\n  .is-flex-touch {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n}\n\n@media screen and (min-width: 1000px) {\n  .is-flex-desktop {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n}\n\n@media screen and (min-width: 1000px) and (max-width: 1191px) {\n  .is-flex-desktop-only {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n}\n\n@media screen and (min-width: 1192px) {\n  .is-flex-widescreen {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n}\n\n.is-inline {\n  display: inline;\n}\n\n@media screen and (max-width: 768px) {\n  .is-inline-mobile {\n    display: inline !important;\n  }\n}\n\n@media screen and (min-width: 769px) {\n  .is-inline-tablet {\n    display: inline !important;\n  }\n}\n\n@media screen and (min-width: 769px) and (max-width: 999px) {\n  .is-inline-tablet-only {\n    display: inline !important;\n  }\n}\n\n@media screen and (max-width: 999px) {\n  .is-inline-touch {\n    display: inline !important;\n  }\n}\n\n@media screen and (min-width: 1000px) {\n  .is-inline-desktop {\n    display: inline !important;\n  }\n}\n\n@media screen and (min-width: 1000px) and (max-width: 1191px) {\n  .is-inline-desktop-only {\n    display: inline !important;\n  }\n}\n\n@media screen and (min-width: 1192px) {\n  .is-inline-widescreen {\n    display: inline !important;\n  }\n}\n\n.is-inline-block {\n  display: inline-block;\n}\n\n@media screen and (max-width: 768px) {\n  .is-inline-block-mobile {\n    display: inline-block !important;\n  }\n}\n\n@media screen and (min-width: 769px) {\n  .is-inline-block-tablet {\n    display: inline-block !important;\n  }\n}\n\n@media screen and (min-width: 769px) and (max-width: 999px) {\n  .is-inline-block-tablet-only {\n    display: inline-block !important;\n  }\n}\n\n@media screen and (max-width: 999px) {\n  .is-inline-block-touch {\n    display: inline-block !important;\n  }\n}\n\n@media screen and (min-width: 1000px) {\n  .is-inline-block-desktop {\n    display: inline-block !important;\n  }\n}\n\n@media screen and (min-width: 1000px) and (max-width: 1191px) {\n  .is-inline-block-desktop-only {\n    display: inline-block !important;\n  }\n}\n\n@media screen and (min-width: 1192px) {\n  .is-inline-block-widescreen {\n    display: inline-block !important;\n  }\n}\n\n.is-inline-flex {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n}\n\n@media screen and (max-width: 768px) {\n  .is-inline-flex-mobile {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important;\n  }\n}\n\n@media screen and (min-width: 769px) {\n  .is-inline-flex-tablet {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important;\n  }\n}\n\n@media screen and (min-width: 769px) and (max-width: 999px) {\n  .is-inline-flex-tablet-only {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important;\n  }\n}\n\n@media screen and (max-width: 999px) {\n  .is-inline-flex-touch {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important;\n  }\n}\n\n@media screen and (min-width: 1000px) {\n  .is-inline-flex-desktop {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important;\n  }\n}\n\n@media screen and (min-width: 1000px) and (max-width: 1191px) {\n  .is-inline-flex-desktop-only {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important;\n  }\n}\n\n@media screen and (min-width: 1192px) {\n  .is-inline-flex-widescreen {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important;\n  }\n}\n\n.is-clearfix:after {\n  clear: both;\n  content: " ";\n  display: table;\n}\n\n.is-pulled-left {\n  float: left;\n}\n\n.is-pulled-right {\n  float: right;\n}\n\n.is-clipped {\n  overflow: hidden !important;\n}\n\n.is-overlay {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.has-text-centered {\n  text-align: center;\n}\n\n.has-text-left {\n  text-align: left;\n}\n\n.has-text-right {\n  text-align: right;\n}\n\n.is-hidden {\n  display: none !important;\n}\n\n@media screen and (max-width: 768px) {\n  .is-hidden-mobile {\n    display: none !important;\n  }\n}\n\n@media screen and (min-width: 769px) {\n  .is-hidden-tablet {\n    display: none !important;\n  }\n}\n\n@media screen and (min-width: 769px) and (max-width: 999px) {\n  .is-hidden-tablet-only {\n    display: none !important;\n  }\n}\n\n@media screen and (max-width: 999px) {\n  .is-hidden-touch {\n    display: none !important;\n  }\n}\n\n@media screen and (min-width: 1000px) {\n  .is-hidden-desktop {\n    display: none !important;\n  }\n}\n\n@media screen and (min-width: 1000px) and (max-width: 1191px) {\n  .is-hidden-desktop-only {\n    display: none !important;\n  }\n}\n\n@media screen and (min-width: 1192px) {\n  .is-hidden-widescreen {\n    display: none !important;\n  }\n}\n\n.is-disabled {\n  pointer-events: none;\n}\n\n.is-marginless {\n  margin: 0 !important;\n}\n\n.is-paddingless {\n  padding: 0 !important;\n}\n\n.is-unselectable {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.box {\n  background-color: white;\n  border-radius: 5px;\n  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);\n  display: block;\n  padding: 1.25rem;\n}\n\n.box:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n\na.box:hover, a.box:focus {\n  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px #00d1b2;\n}\n\na.box:active {\n  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2), 0 0 0 1px #00d1b2;\n}\n\n.button {\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border: none;\n  border-radius: 3px;\n  box-shadow: none;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  font-size: 1rem;\n  height: 2.285em;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  line-height: 1.5;\n  padding-left: 0.75em;\n  padding-right: 0.75em;\n  position: relative;\n  vertical-align: top;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  background-color: white;\n  border: 1px solid #dbdbdb;\n  color: #363636;\n  cursor: pointer;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding-left: 0.75em;\n  padding-right: 0.75em;\n  text-align: center;\n  white-space: nowrap;\n}\n\n.button:focus, .button.is-focused, .button:active, .button.is-active {\n  outline: none;\n}\n\n.button[disabled], .button.is-disabled {\n  pointer-events: none;\n}\n\n.button strong {\n  color: inherit;\n}\n\n.button .icon:first-child:not(:last-child) {\n  margin-left: -0.25rem;\n  margin-right: 0.5rem;\n}\n\n.button .icon:last-child:not(:first-child) {\n  margin-left: 0.5rem;\n  margin-right: -0.25rem;\n}\n\n.button .icon:first-child:last-child {\n  margin-left: calc(-1px + -0.25rem);\n  margin-right: calc(-1px + -0.25rem);\n}\n\n.button .icon.is-small:first-child:not(:last-child) {\n  margin-left: 0rem;\n}\n\n.button .icon.is-small:last-child:not(:first-child) {\n  margin-right: 0rem;\n}\n\n.button .icon.is-small:first-child:last-child {\n  margin-left: calc(-1px + 0rem);\n  margin-right: calc(-1px + 0rem);\n}\n\n.button .icon.is-medium:first-child:not(:last-child) {\n  margin-left: -0.5rem;\n}\n\n.button .icon.is-medium:last-child:not(:first-child) {\n  margin-right: -0.5rem;\n}\n\n.button .icon.is-medium:first-child:last-child {\n  margin-left: calc(-1px + -0.5rem);\n  margin-right: calc(-1px + -0.5rem);\n}\n\n.button .icon.is-large:first-child:not(:last-child) {\n  margin-left: -1rem;\n}\n\n.button .icon.is-large:last-child:not(:first-child) {\n  margin-right: -1rem;\n}\n\n.button .icon.is-large:first-child:last-child {\n  margin-left: calc(-1px + -1rem);\n  margin-right: calc(-1px + -1rem);\n}\n\n.button:hover, .button.is-hovered {\n  border-color: #b5b5b5;\n  color: #363636;\n}\n\n.button:focus, .button.is-focused {\n  border-color: #00d1b2;\n  box-shadow: 0 0 0.5em rgba(0, 209, 178, 0.25);\n  color: #363636;\n}\n\n.button:active, .button.is-active {\n  border-color: #4a4a4a;\n  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2);\n  color: #363636;\n}\n\n.button.is-link {\n  background-color: transparent;\n  border-color: transparent;\n  color: #4a4a4a;\n  text-decoration: underline;\n}\n\n.button.is-link:hover, .button.is-link.is-hovered, .button.is-link:focus, .button.is-link.is-focused, .button.is-link:active, .button.is-link.is-active {\n  background-color: whitesmoke;\n  color: #363636;\n}\n\n.button.is-white {\n  background-color: white;\n  border-color: transparent;\n  color: #0a0a0a;\n}\n\n.button.is-white:hover, .button.is-white.is-hovered {\n  background-color: #f9f9f9;\n  border-color: transparent;\n  color: #0a0a0a;\n}\n\n.button.is-white:focus, .button.is-white.is-focused {\n  border-color: transparent;\n  box-shadow: 0 0 0.5em rgba(255, 255, 255, 0.25);\n  color: #0a0a0a;\n}\n\n.button.is-white:active, .button.is-white.is-active {\n  background-color: #f2f2f2;\n  border-color: transparent;\n  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2);\n  color: #0a0a0a;\n}\n\n.button.is-white.is-inverted {\n  background-color: #0a0a0a;\n  color: white;\n}\n\n.button.is-white.is-inverted:hover {\n  background-color: black;\n}\n\n.button.is-white.is-loading:after {\n  border-color: transparent transparent #0a0a0a #0a0a0a !important;\n}\n\n.button.is-white.is-outlined {\n  background-color: transparent;\n  border-color: white;\n  color: white;\n}\n\n.button.is-white.is-outlined:hover, .button.is-white.is-outlined:focus {\n  background-color: white;\n  border-color: white;\n  color: #0a0a0a;\n}\n\n.button.is-white.is-outlined.is-loading:after {\n  border-color: transparent transparent white white !important;\n}\n\n.button.is-white.is-inverted.is-outlined {\n  background-color: transparent;\n  border-color: #0a0a0a;\n  color: #0a0a0a;\n}\n\n.button.is-white.is-inverted.is-outlined:hover, .button.is-white.is-inverted.is-outlined:focus {\n  background-color: #0a0a0a;\n  color: white;\n}\n\n.button.is-black {\n  background-color: #0a0a0a;\n  border-color: transparent;\n  color: white;\n}\n\n.button.is-black:hover, .button.is-black.is-hovered {\n  background-color: #040404;\n  border-color: transparent;\n  color: white;\n}\n\n.button.is-black:focus, .button.is-black.is-focused {\n  border-color: transparent;\n  box-shadow: 0 0 0.5em rgba(10, 10, 10, 0.25);\n  color: white;\n}\n\n.button.is-black:active, .button.is-black.is-active {\n  background-color: black;\n  border-color: transparent;\n  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2);\n  color: white;\n}\n\n.button.is-black.is-inverted {\n  background-color: white;\n  color: #0a0a0a;\n}\n\n.button.is-black.is-inverted:hover {\n  background-color: #f2f2f2;\n}\n\n.button.is-black.is-loading:after {\n  border-color: transparent transparent white white !important;\n}\n\n.button.is-black.is-outlined {\n  background-color: transparent;\n  border-color: #0a0a0a;\n  color: #0a0a0a;\n}\n\n.button.is-black.is-outlined:hover, .button.is-black.is-outlined:focus {\n  background-color: #0a0a0a;\n  border-color: #0a0a0a;\n  color: white;\n}\n\n.button.is-black.is-outlined.is-loading:after {\n  border-color: transparent transparent #0a0a0a #0a0a0a !important;\n}\n\n.button.is-black.is-inverted.is-outlined {\n  background-color: transparent;\n  border-color: white;\n  color: white;\n}\n\n.button.is-black.is-inverted.is-outlined:hover, .button.is-black.is-inverted.is-outlined:focus {\n  background-color: white;\n  color: #0a0a0a;\n}\n\n.button.is-light {\n  background-color: whitesmoke;\n  border-color: transparent;\n  color: #363636;\n}\n\n.button.is-light:hover, .button.is-light.is-hovered {\n  background-color: #eeeeee;\n  border-color: transparent;\n  color: #363636;\n}\n\n.button.is-light:focus, .button.is-light.is-focused {\n  border-color: transparent;\n  box-shadow: 0 0 0.5em rgba(245, 245, 245, 0.25);\n  color: #363636;\n}\n\n.button.is-light:active, .button.is-light.is-active {\n  background-color: #e8e8e8;\n  border-color: transparent;\n  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2);\n  color: #363636;\n}\n\n.button.is-light.is-inverted {\n  background-color: #363636;\n  color: whitesmoke;\n}\n\n.button.is-light.is-inverted:hover {\n  background-color: #292929;\n}\n\n.button.is-light.is-loading:after {\n  border-color: transparent transparent #363636 #363636 !important;\n}\n\n.button.is-light.is-outlined {\n  background-color: transparent;\n  border-color: whitesmoke;\n  color: whitesmoke;\n}\n\n.button.is-light.is-outlined:hover, .button.is-light.is-outlined:focus {\n  background-color: whitesmoke;\n  border-color: whitesmoke;\n  color: #363636;\n}\n\n.button.is-light.is-outlined.is-loading:after {\n  border-color: transparent transparent whitesmoke whitesmoke !important;\n}\n\n.button.is-light.is-inverted.is-outlined {\n  background-color: transparent;\n  border-color: #363636;\n  color: #363636;\n}\n\n.button.is-light.is-inverted.is-outlined:hover, .button.is-light.is-inverted.is-outlined:focus {\n  background-color: #363636;\n  color: whitesmoke;\n}\n\n.button.is-dark {\n  background-color: #363636;\n  border-color: transparent;\n  color: whitesmoke;\n}\n\n.button.is-dark:hover, .button.is-dark.is-hovered {\n  background-color: #2f2f2f;\n  border-color: transparent;\n  color: whitesmoke;\n}\n\n.button.is-dark:focus, .button.is-dark.is-focused {\n  border-color: transparent;\n  box-shadow: 0 0 0.5em rgba(54, 54, 54, 0.25);\n  color: whitesmoke;\n}\n\n.button.is-dark:active, .button.is-dark.is-active {\n  background-color: #292929;\n  border-color: transparent;\n  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2);\n  color: whitesmoke;\n}\n\n.button.is-dark.is-inverted {\n  background-color: whitesmoke;\n  color: #363636;\n}\n\n.button.is-dark.is-inverted:hover {\n  background-color: #e8e8e8;\n}\n\n.button.is-dark.is-loading:after {\n  border-color: transparent transparent whitesmoke whitesmoke !important;\n}\n\n.button.is-dark.is-outlined {\n  background-color: transparent;\n  border-color: #363636;\n  color: #363636;\n}\n\n.button.is-dark.is-outlined:hover, .button.is-dark.is-outlined:focus {\n  background-color: #363636;\n  border-color: #363636;\n  color: whitesmoke;\n}\n\n.button.is-dark.is-outlined.is-loading:after {\n  border-color: transparent transparent #363636 #363636 !important;\n}\n\n.button.is-dark.is-inverted.is-outlined {\n  background-color: transparent;\n  border-color: whitesmoke;\n  color: whitesmoke;\n}\n\n.button.is-dark.is-inverted.is-outlined:hover, .button.is-dark.is-inverted.is-outlined:focus {\n  background-color: whitesmoke;\n  color: #363636;\n}\n\n.button.is-primary {\n  background-color: #00d1b2;\n  border-color: transparent;\n  color: #fff;\n}\n\n.button.is-primary:hover, .button.is-primary.is-hovered {\n  background-color: #00c4a7;\n  border-color: transparent;\n  color: #fff;\n}\n\n.button.is-primary:focus, .button.is-primary.is-focused {\n  border-color: transparent;\n  box-shadow: 0 0 0.5em rgba(0, 209, 178, 0.25);\n  color: #fff;\n}\n\n.button.is-primary:active, .button.is-primary.is-active {\n  background-color: #00b89c;\n  border-color: transparent;\n  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2);\n  color: #fff;\n}\n\n.button.is-primary.is-inverted {\n  background-color: #fff;\n  color: #00d1b2;\n}\n\n.button.is-primary.is-inverted:hover {\n  background-color: #f2f2f2;\n}\n\n.button.is-primary.is-loading:after {\n  border-color: transparent transparent #fff #fff !important;\n}\n\n.button.is-primary.is-outlined {\n  background-color: transparent;\n  border-color: #00d1b2;\n  color: #00d1b2;\n}\n\n.button.is-primary.is-outlined:hover, .button.is-primary.is-outlined:focus {\n  background-color: #00d1b2;\n  border-color: #00d1b2;\n  color: #fff;\n}\n\n.button.is-primary.is-outlined.is-loading:after {\n  border-color: transparent transparent #00d1b2 #00d1b2 !important;\n}\n\n.button.is-primary.is-inverted.is-outlined {\n  background-color: transparent;\n  border-color: #fff;\n  color: #fff;\n}\n\n.button.is-primary.is-inverted.is-outlined:hover, .button.is-primary.is-inverted.is-outlined:focus {\n  background-color: #fff;\n  color: #00d1b2;\n}\n\n.button.is-info {\n  background-color: #3273dc;\n  border-color: transparent;\n  color: #fff;\n}\n\n.button.is-info:hover, .button.is-info.is-hovered {\n  background-color: #276cda;\n  border-color: transparent;\n  color: #fff;\n}\n\n.button.is-info:focus, .button.is-info.is-focused {\n  border-color: transparent;\n  box-shadow: 0 0 0.5em rgba(50, 115, 220, 0.25);\n  color: #fff;\n}\n\n.button.is-info:active, .button.is-info.is-active {\n  background-color: #2366d1;\n  border-color: transparent;\n  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2);\n  color: #fff;\n}\n\n.button.is-info.is-inverted {\n  background-color: #fff;\n  color: #3273dc;\n}\n\n.button.is-info.is-inverted:hover {\n  background-color: #f2f2f2;\n}\n\n.button.is-info.is-loading:after {\n  border-color: transparent transparent #fff #fff !important;\n}\n\n.button.is-info.is-outlined {\n  background-color: transparent;\n  border-color: #3273dc;\n  color: #3273dc;\n}\n\n.button.is-info.is-outlined:hover, .button.is-info.is-outlined:focus {\n  background-color: #3273dc;\n  border-color: #3273dc;\n  color: #fff;\n}\n\n.button.is-info.is-outlined.is-loading:after {\n  border-color: transparent transparent #3273dc #3273dc !important;\n}\n\n.button.is-info.is-inverted.is-outlined {\n  background-color: transparent;\n  border-color: #fff;\n  color: #fff;\n}\n\n.button.is-info.is-inverted.is-outlined:hover, .button.is-info.is-inverted.is-outlined:focus {\n  background-color: #fff;\n  color: #3273dc;\n}\n\n.button.is-success {\n  background-color: #23d160;\n  border-color: transparent;\n  color: #fff;\n}\n\n.button.is-success:hover, .button.is-success.is-hovered {\n  background-color: #22c65b;\n  border-color: transparent;\n  color: #fff;\n}\n\n.button.is-success:focus, .button.is-success.is-focused {\n  border-color: transparent;\n  box-shadow: 0 0 0.5em rgba(35, 209, 96, 0.25);\n  color: #fff;\n}\n\n.button.is-success:active, .button.is-success.is-active {\n  background-color: #20bc56;\n  border-color: transparent;\n  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2);\n  color: #fff;\n}\n\n.button.is-success.is-inverted {\n  background-color: #fff;\n  color: #23d160;\n}\n\n.button.is-success.is-inverted:hover {\n  background-color: #f2f2f2;\n}\n\n.button.is-success.is-loading:after {\n  border-color: transparent transparent #fff #fff !important;\n}\n\n.button.is-success.is-outlined {\n  background-color: transparent;\n  border-color: #23d160;\n  color: #23d160;\n}\n\n.button.is-success.is-outlined:hover, .button.is-success.is-outlined:focus {\n  background-color: #23d160;\n  border-color: #23d160;\n  color: #fff;\n}\n\n.button.is-success.is-outlined.is-loading:after {\n  border-color: transparent transparent #23d160 #23d160 !important;\n}\n\n.button.is-success.is-inverted.is-outlined {\n  background-color: transparent;\n  border-color: #fff;\n  color: #fff;\n}\n\n.button.is-success.is-inverted.is-outlined:hover, .button.is-success.is-inverted.is-outlined:focus {\n  background-color: #fff;\n  color: #23d160;\n}\n\n.button.is-warning {\n  background-color: #ffdd57;\n  border-color: transparent;\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.button.is-warning:hover, .button.is-warning.is-hovered {\n  background-color: #ffdb4a;\n  border-color: transparent;\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.button.is-warning:focus, .button.is-warning.is-focused {\n  border-color: transparent;\n  box-shadow: 0 0 0.5em rgba(255, 221, 87, 0.25);\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.button.is-warning:active, .button.is-warning.is-active {\n  background-color: #ffd83d;\n  border-color: transparent;\n  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2);\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.button.is-warning.is-inverted {\n  background-color: rgba(0, 0, 0, 0.7);\n  color: #ffdd57;\n}\n\n.button.is-warning.is-inverted:hover {\n  background-color: rgba(0, 0, 0, 0.7);\n}\n\n.button.is-warning.is-loading:after {\n  border-color: transparent transparent rgba(0, 0, 0, 0.7) rgba(0, 0, 0, 0.7) !important;\n}\n\n.button.is-warning.is-outlined {\n  background-color: transparent;\n  border-color: #ffdd57;\n  color: #ffdd57;\n}\n\n.button.is-warning.is-outlined:hover, .button.is-warning.is-outlined:focus {\n  background-color: #ffdd57;\n  border-color: #ffdd57;\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.button.is-warning.is-outlined.is-loading:after {\n  border-color: transparent transparent #ffdd57 #ffdd57 !important;\n}\n\n.button.is-warning.is-inverted.is-outlined {\n  background-color: transparent;\n  border-color: rgba(0, 0, 0, 0.7);\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.button.is-warning.is-inverted.is-outlined:hover, .button.is-warning.is-inverted.is-outlined:focus {\n  background-color: rgba(0, 0, 0, 0.7);\n  color: #ffdd57;\n}\n\n.button.is-danger {\n  background-color: #ff3860;\n  border-color: transparent;\n  color: #fff;\n}\n\n.button.is-danger:hover, .button.is-danger.is-hovered {\n  background-color: #ff2b56;\n  border-color: transparent;\n  color: #fff;\n}\n\n.button.is-danger:focus, .button.is-danger.is-focused {\n  border-color: transparent;\n  box-shadow: 0 0 0.5em rgba(255, 56, 96, 0.25);\n  color: #fff;\n}\n\n.button.is-danger:active, .button.is-danger.is-active {\n  background-color: #ff1f4b;\n  border-color: transparent;\n  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2);\n  color: #fff;\n}\n\n.button.is-danger.is-inverted {\n  background-color: #fff;\n  color: #ff3860;\n}\n\n.button.is-danger.is-inverted:hover {\n  background-color: #f2f2f2;\n}\n\n.button.is-danger.is-loading:after {\n  border-color: transparent transparent #fff #fff !important;\n}\n\n.button.is-danger.is-outlined {\n  background-color: transparent;\n  border-color: #ff3860;\n  color: #ff3860;\n}\n\n.button.is-danger.is-outlined:hover, .button.is-danger.is-outlined:focus {\n  background-color: #ff3860;\n  border-color: #ff3860;\n  color: #fff;\n}\n\n.button.is-danger.is-outlined.is-loading:after {\n  border-color: transparent transparent #ff3860 #ff3860 !important;\n}\n\n.button.is-danger.is-inverted.is-outlined {\n  background-color: transparent;\n  border-color: #fff;\n  color: #fff;\n}\n\n.button.is-danger.is-inverted.is-outlined:hover, .button.is-danger.is-inverted.is-outlined:focus {\n  background-color: #fff;\n  color: #ff3860;\n}\n\n.button.is-small {\n  border-radius: 2px;\n  font-size: 0.75rem;\n}\n\n.button.is-small .icon:first-child:not(:last-child) {\n  margin-left: -0.375rem;\n  margin-right: 0.375rem;\n}\n\n.button.is-small .icon:last-child:not(:first-child) {\n  margin-left: 0.375rem;\n  margin-right: -0.375rem;\n}\n\n.button.is-small .icon:first-child:last-child {\n  margin-left: calc(-1px + -0.375rem);\n  margin-right: calc(-1px + -0.375rem);\n}\n\n.button.is-small .icon.is-small:first-child:not(:last-child) {\n  margin-left: -0.125rem;\n}\n\n.button.is-small .icon.is-small:last-child:not(:first-child) {\n  margin-right: -0.125rem;\n}\n\n.button.is-small .icon.is-small:first-child:last-child {\n  margin-left: calc(-1px + -0.125rem);\n  margin-right: calc(-1px + -0.125rem);\n}\n\n.button.is-small .icon.is-medium:first-child:not(:last-child) {\n  margin-left: -0.625rem;\n}\n\n.button.is-small .icon.is-medium:last-child:not(:first-child) {\n  margin-right: -0.625rem;\n}\n\n.button.is-small .icon.is-medium:first-child:last-child {\n  margin-left: calc(-1px + -0.625rem);\n  margin-right: calc(-1px + -0.625rem);\n}\n\n.button.is-small .icon.is-large:first-child:not(:last-child) {\n  margin-left: -1.125rem;\n}\n\n.button.is-small .icon.is-large:last-child:not(:first-child) {\n  margin-right: -1.125rem;\n}\n\n.button.is-small .icon.is-large:first-child:last-child {\n  margin-left: calc(-1px + -1.125rem);\n  margin-right: calc(-1px + -1.125rem);\n}\n\n.button.is-medium {\n  font-size: 1.25rem;\n}\n\n.button.is-medium .icon:first-child:not(:last-child) {\n  margin-left: -0.125rem;\n  margin-right: 0.625rem;\n}\n\n.button.is-medium .icon:last-child:not(:first-child) {\n  margin-left: 0.625rem;\n  margin-right: -0.125rem;\n}\n\n.button.is-medium .icon:first-child:last-child {\n  margin-left: calc(-1px + -0.125rem);\n  margin-right: calc(-1px + -0.125rem);\n}\n\n.button.is-medium .icon.is-small:first-child:not(:last-child) {\n  margin-left: 0.125rem;\n}\n\n.button.is-medium .icon.is-small:last-child:not(:first-child) {\n  margin-right: 0.125rem;\n}\n\n.button.is-medium .icon.is-small:first-child:last-child {\n  margin-left: calc(-1px + 0.125rem);\n  margin-right: calc(-1px + 0.125rem);\n}\n\n.button.is-medium .icon.is-medium:first-child:not(:last-child) {\n  margin-left: -0.375rem;\n}\n\n.button.is-medium .icon.is-medium:last-child:not(:first-child) {\n  margin-right: -0.375rem;\n}\n\n.button.is-medium .icon.is-medium:first-child:last-child {\n  margin-left: calc(-1px + -0.375rem);\n  margin-right: calc(-1px + -0.375rem);\n}\n\n.button.is-medium .icon.is-large:first-child:not(:last-child) {\n  margin-left: -0.875rem;\n}\n\n.button.is-medium .icon.is-large:last-child:not(:first-child) {\n  margin-right: -0.875rem;\n}\n\n.button.is-medium .icon.is-large:first-child:last-child {\n  margin-left: calc(-1px + -0.875rem);\n  margin-right: calc(-1px + -0.875rem);\n}\n\n.button.is-large {\n  font-size: 1.5rem;\n}\n\n.button.is-large .icon:first-child:not(:last-child) {\n  margin-left: 0rem;\n  margin-right: 0.75rem;\n}\n\n.button.is-large .icon:last-child:not(:first-child) {\n  margin-left: 0.75rem;\n  margin-right: 0rem;\n}\n\n.button.is-large .icon:first-child:last-child {\n  margin-left: calc(-1px + 0rem);\n  margin-right: calc(-1px + 0rem);\n}\n\n.button.is-large .icon.is-small:first-child:not(:last-child) {\n  margin-left: 0.25rem;\n}\n\n.button.is-large .icon.is-small:last-child:not(:first-child) {\n  margin-right: 0.25rem;\n}\n\n.button.is-large .icon.is-small:first-child:last-child {\n  margin-left: calc(-1px + 0.25rem);\n  margin-right: calc(-1px + 0.25rem);\n}\n\n.button.is-large .icon.is-medium:first-child:not(:last-child) {\n  margin-left: -0.25rem;\n}\n\n.button.is-large .icon.is-medium:last-child:not(:first-child) {\n  margin-right: -0.25rem;\n}\n\n.button.is-large .icon.is-medium:first-child:last-child {\n  margin-left: calc(-1px + -0.25rem);\n  margin-right: calc(-1px + -0.25rem);\n}\n\n.button.is-large .icon.is-large:first-child:not(:last-child) {\n  margin-left: -0.75rem;\n}\n\n.button.is-large .icon.is-large:last-child:not(:first-child) {\n  margin-right: -0.75rem;\n}\n\n.button.is-large .icon.is-large:first-child:last-child {\n  margin-left: calc(-1px + -0.75rem);\n  margin-right: calc(-1px + -0.75rem);\n}\n\n.button[disabled], .button.is-disabled {\n  opacity: 0.5;\n}\n\n.button.is-fullwidth {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 100%;\n}\n\n.button.is-loading {\n  color: transparent !important;\n  pointer-events: none;\n}\n\n.button.is-loading:after {\n  -webkit-animation: spinAround 500ms infinite linear;\n          animation: spinAround 500ms infinite linear;\n  border: 2px solid #dbdbdb;\n  border-radius: 290486px;\n  border-right-color: transparent;\n  border-top-color: transparent;\n  content: "";\n  display: block;\n  height: 1rem;\n  position: relative;\n  width: 1rem;\n  left: 50%;\n  margin-left: -8px;\n  margin-top: -8px;\n  position: absolute;\n  top: 50%;\n  position: absolute !important;\n}\n\n.content {\n  color: #4a4a4a;\n}\n\n.content:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n\n.content li + li {\n  margin-top: 0.25em;\n}\n\n.content p:not(:last-child),\n.content ol:not(:last-child),\n.content ul:not(:last-child),\n.content blockquote:not(:last-child),\n.content table:not(:last-child) {\n  margin-bottom: 1em;\n}\n\n.content h1,\n.content h2,\n.content h3,\n.content h4,\n.content h5,\n.content h6 {\n  color: #363636;\n  font-weight: 400;\n  line-height: 1.125;\n}\n\n.content h1 {\n  font-size: 2em;\n  margin-bottom: 0.5em;\n}\n\n.content h1:not(:first-child) {\n  margin-top: 1em;\n}\n\n.content h2 {\n  font-size: 1.75em;\n  margin-bottom: 0.5714em;\n}\n\n.content h2:not(:first-child) {\n  margin-top: 1.1428em;\n}\n\n.content h3 {\n  font-size: 1.5em;\n  margin-bottom: 0.6666em;\n}\n\n.content h3:not(:first-child) {\n  margin-top: 1.3333em;\n}\n\n.content h4 {\n  font-size: 1.25em;\n  margin-bottom: 0.8em;\n}\n\n.content h5 {\n  font-size: 1.125em;\n  margin-bottom: 0.8888em;\n}\n\n.content h6 {\n  font-size: 1em;\n  margin-bottom: 1em;\n}\n\n.content blockquote {\n  background-color: whitesmoke;\n  border-left: 5px solid #dbdbdb;\n  padding: 1.25em 1.5em;\n}\n\n.content ol {\n  list-style: decimal outside;\n  margin-left: 2em;\n  margin-right: 2em;\n  margin-top: 1em;\n}\n\n.content ul {\n  list-style: disc outside;\n  margin-left: 2em;\n  margin-right: 2em;\n  margin-top: 1em;\n}\n\n.content ul ul {\n  list-style-type: circle;\n  margin-top: 0.5em;\n}\n\n.content ul ul ul {\n  list-style-type: square;\n}\n\n.content table {\n  width: 100%;\n}\n\n.content table td,\n.content table th {\n  border: 1px solid #dbdbdb;\n  border-width: 0 0 1px;\n  padding: 0.5em 0.75em;\n  vertical-align: top;\n}\n\n.content table th {\n  color: #363636;\n  text-align: left;\n}\n\n.content table tr:hover {\n  background-color: whitesmoke;\n}\n\n.content table thead td,\n.content table thead th {\n  border-width: 0 0 2px;\n  color: #363636;\n}\n\n.content table tfoot td,\n.content table tfoot th {\n  border-width: 2px 0 0;\n  color: #363636;\n}\n\n.content table tbody tr:last-child td,\n.content table tbody tr:last-child th {\n  border-bottom-width: 0;\n}\n\n.content.is-small {\n  font-size: 0.75rem;\n}\n\n.content.is-medium {\n  font-size: 1.25rem;\n}\n\n.content.is-large {\n  font-size: 1.5rem;\n}\n\n.input,\n.textarea {\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border: none;\n  border-radius: 3px;\n  box-shadow: none;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  font-size: 1rem;\n  height: 2.285em;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  line-height: 1.5;\n  padding-left: 0.75em;\n  padding-right: 0.75em;\n  position: relative;\n  vertical-align: top;\n  background-color: white;\n  border: 1px solid #dbdbdb;\n  color: #363636;\n  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);\n  max-width: 100%;\n  width: 100%;\n}\n\n.input:focus, .input.is-focused, .input:active, .input.is-active,\n.textarea:focus,\n.textarea.is-focused,\n.textarea:active,\n.textarea.is-active {\n  outline: none;\n}\n\n.input[disabled], .input.is-disabled,\n.textarea[disabled],\n.textarea.is-disabled {\n  pointer-events: none;\n}\n\n.input:hover, .input.is-hovered,\n.textarea:hover,\n.textarea.is-hovered {\n  border-color: #b5b5b5;\n}\n\n.input:focus, .input.is-focused, .input:active, .input.is-active,\n.textarea:focus,\n.textarea.is-focused,\n.textarea:active,\n.textarea.is-active {\n  border-color: #00d1b2;\n}\n\n.input[disabled], .input.is-disabled,\n.textarea[disabled],\n.textarea.is-disabled {\n  background-color: whitesmoke;\n  border-color: whitesmoke;\n  box-shadow: none;\n  color: #7a7a7a;\n}\n\n.input[disabled]::-moz-placeholder, .input.is-disabled::-moz-placeholder,\n.textarea[disabled]::-moz-placeholder,\n.textarea.is-disabled::-moz-placeholder {\n  color: rgba(54, 54, 54, 0.3);\n}\n\n.input[disabled]::-webkit-input-placeholder, .input.is-disabled::-webkit-input-placeholder,\n.textarea[disabled]::-webkit-input-placeholder,\n.textarea.is-disabled::-webkit-input-placeholder {\n  color: rgba(54, 54, 54, 0.3);\n}\n\n.input[disabled]:-moz-placeholder, .input.is-disabled:-moz-placeholder,\n.textarea[disabled]:-moz-placeholder,\n.textarea.is-disabled:-moz-placeholder {\n  color: rgba(54, 54, 54, 0.3);\n}\n\n.input[disabled]:-ms-input-placeholder, .input.is-disabled:-ms-input-placeholder,\n.textarea[disabled]:-ms-input-placeholder,\n.textarea.is-disabled:-ms-input-placeholder {\n  color: rgba(54, 54, 54, 0.3);\n}\n\n.input[type="search"],\n.textarea[type="search"] {\n  border-radius: 290486px;\n}\n\n.input.is-white,\n.textarea.is-white {\n  border-color: white;\n}\n\n.input.is-black,\n.textarea.is-black {\n  border-color: #0a0a0a;\n}\n\n.input.is-light,\n.textarea.is-light {\n  border-color: whitesmoke;\n}\n\n.input.is-dark,\n.textarea.is-dark {\n  border-color: #363636;\n}\n\n.input.is-primary,\n.textarea.is-primary {\n  border-color: #00d1b2;\n}\n\n.input.is-info,\n.textarea.is-info {\n  border-color: #3273dc;\n}\n\n.input.is-success,\n.textarea.is-success {\n  border-color: #23d160;\n}\n\n.input.is-warning,\n.textarea.is-warning {\n  border-color: #ffdd57;\n}\n\n.input.is-danger,\n.textarea.is-danger {\n  border-color: #ff3860;\n}\n\n.input.is-small,\n.textarea.is-small {\n  border-radius: 2px;\n  font-size: 0.75rem;\n}\n\n.input.is-medium,\n.textarea.is-medium {\n  font-size: 1.25rem;\n}\n\n.input.is-large,\n.textarea.is-large {\n  font-size: 1.5rem;\n}\n\n.input.is-fullwidth,\n.textarea.is-fullwidth {\n  display: block;\n  width: 100%;\n}\n\n.input.is-inline,\n.textarea.is-inline {\n  display: inline;\n  width: auto;\n}\n\n.textarea {\n  display: block;\n  line-height: 1.25;\n  max-height: 600px;\n  max-width: 100%;\n  min-height: 120px;\n  min-width: 100%;\n  padding: 10px;\n  resize: vertical;\n}\n\n.checkbox,\n.radio {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  position: relative;\n  vertical-align: top;\n}\n\n.checkbox input,\n.radio input {\n  cursor: pointer;\n  margin-right: 0.5em;\n}\n\n.checkbox:hover,\n.radio:hover {\n  color: #363636;\n}\n\n.checkbox.is-disabled,\n.radio.is-disabled {\n  color: #7a7a7a;\n  pointer-events: none;\n}\n\n.checkbox.is-disabled input,\n.radio.is-disabled input {\n  pointer-events: none;\n}\n\n.radio + .radio {\n  margin-left: 0.5em;\n}\n\n.select {\n  display: inline-block;\n  height: 2.5em;\n  position: relative;\n  vertical-align: top;\n}\n\n.select:after {\n  border: 1px solid #00d1b2;\n  border-right: 0;\n  border-top: 0;\n  content: " ";\n  display: block;\n  height: 0.5em;\n  pointer-events: none;\n  position: absolute;\n  -webkit-transform: rotate(-45deg);\n          transform: rotate(-45deg);\n  width: 0.5em;\n  margin-top: -0.375em;\n  right: 1.125em;\n  top: 50%;\n  z-index: 4;\n}\n\n.select select {\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border: none;\n  border-radius: 3px;\n  box-shadow: none;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  font-size: 1rem;\n  height: 2.285em;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  line-height: 1.5;\n  padding-left: 0.75em;\n  padding-right: 0.75em;\n  position: relative;\n  vertical-align: top;\n  background-color: white;\n  border: 1px solid #dbdbdb;\n  color: #363636;\n  cursor: pointer;\n  display: block;\n  font-size: 1em;\n  outline: none;\n  padding-right: 2.5em;\n}\n\n.select select:focus, .select select.is-focused, .select select:active, .select select.is-active {\n  outline: none;\n}\n\n.select select[disabled], .select select.is-disabled {\n  pointer-events: none;\n}\n\n.select select:hover, .select select.is-hovered {\n  border-color: #b5b5b5;\n}\n\n.select select:focus, .select select.is-focused, .select select:active, .select select.is-active {\n  border-color: #00d1b2;\n}\n\n.select select[disabled], .select select.is-disabled {\n  background-color: whitesmoke;\n  border-color: whitesmoke;\n  box-shadow: none;\n  color: #7a7a7a;\n}\n\n.select select[disabled]::-moz-placeholder, .select select.is-disabled::-moz-placeholder {\n  color: rgba(54, 54, 54, 0.3);\n}\n\n.select select[disabled]::-webkit-input-placeholder, .select select.is-disabled::-webkit-input-placeholder {\n  color: rgba(54, 54, 54, 0.3);\n}\n\n.select select[disabled]:-moz-placeholder, .select select.is-disabled:-moz-placeholder {\n  color: rgba(54, 54, 54, 0.3);\n}\n\n.select select[disabled]:-ms-input-placeholder, .select select.is-disabled:-ms-input-placeholder {\n  color: rgba(54, 54, 54, 0.3);\n}\n\n.select select:hover {\n  border-color: #b5b5b5;\n}\n\n.select select::ms-expand {\n  display: none;\n}\n\n.select:hover:after {\n  border-color: #363636;\n}\n\n.select.is-small {\n  border-radius: 2px;\n  font-size: 0.75rem;\n}\n\n.select.is-medium {\n  font-size: 1.25rem;\n}\n\n.select.is-large {\n  font-size: 1.5rem;\n}\n\n.select.is-fullwidth {\n  width: 100%;\n}\n\n.select.is-fullwidth select {\n  width: 100%;\n}\n\n.label {\n  color: #363636;\n  display: block;\n  font-weight: bold;\n}\n\n.label:not(:last-child) {\n  margin-bottom: 0.5em;\n}\n\n.help {\n  display: block;\n  font-size: 0.75rem;\n  margin-top: 5px;\n}\n\n.help.is-white {\n  color: white;\n}\n\n.help.is-black {\n  color: #0a0a0a;\n}\n\n.help.is-light {\n  color: whitesmoke;\n}\n\n.help.is-dark {\n  color: #363636;\n}\n\n.help.is-primary {\n  color: #00d1b2;\n}\n\n.help.is-info {\n  color: #3273dc;\n}\n\n.help.is-success {\n  color: #23d160;\n}\n\n.help.is-warning {\n  color: #ffdd57;\n}\n\n.help.is-danger {\n  color: #ff3860;\n}\n\n@media screen and (max-width: 768px) {\n  .control-label {\n    margin-bottom: 0.5em;\n  }\n}\n\n@media screen and (min-width: 769px) {\n  .control-label {\n    -ms-flex-preferred-size: 0;\n        flex-basis: 0;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    -ms-flex-negative: 0;\n        flex-shrink: 0;\n    margin-right: 1.5em;\n    padding-top: 0.5em;\n    text-align: right;\n  }\n}\n\n.control {\n  position: relative;\n  text-align: left;\n}\n\n.control:not(:last-child) {\n  margin-bottom: 0.75rem;\n}\n\n.control.has-addons {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n\n.control.has-addons .button,\n.control.has-addons .input,\n.control.has-addons .select {\n  border-radius: 0;\n  margin-right: -1px;\n  width: auto;\n}\n\n.control.has-addons .button:hover,\n.control.has-addons .input:hover,\n.control.has-addons .select:hover {\n  z-index: 2;\n}\n\n.control.has-addons .button:focus, .control.has-addons .button:active,\n.control.has-addons .input:focus,\n.control.has-addons .input:active,\n.control.has-addons .select:focus,\n.control.has-addons .select:active {\n  z-index: 3;\n}\n\n.control.has-addons .button:first-child,\n.control.has-addons .input:first-child,\n.control.has-addons .select:first-child {\n  border-radius: 3px 0 0 3px;\n}\n\n.control.has-addons .button:first-child select,\n.control.has-addons .input:first-child select,\n.control.has-addons .select:first-child select {\n  border-radius: 3px 0 0 3px;\n}\n\n.control.has-addons .button:last-child,\n.control.has-addons .input:last-child,\n.control.has-addons .select:last-child {\n  border-radius: 0 3px 3px 0;\n}\n\n.control.has-addons .button:last-child select,\n.control.has-addons .input:last-child select,\n.control.has-addons .select:last-child select {\n  border-radius: 0 3px 3px 0;\n}\n\n.control.has-addons .button.is-expanded,\n.control.has-addons .input.is-expanded,\n.control.has-addons .select.is-expanded {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n}\n\n.control.has-addons .select select:hover {\n  z-index: 2;\n}\n\n.control.has-addons .select select:focus, .control.has-addons .select select:active {\n  z-index: 3;\n}\n\n.control.has-addons.has-addons-centered {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.control.has-addons.has-addons-right {\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n\n.control.has-addons.has-addons-fullwidth .button,\n.control.has-addons.has-addons-fullwidth .input,\n.control.has-addons.has-addons-fullwidth .select {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n}\n\n.control.has-icon .icon {\n  color: #dbdbdb;\n  pointer-events: none;\n  position: absolute;\n  top: 1.25rem;\n  z-index: 4;\n}\n\n.control.has-icon .input:focus + .icon {\n  color: #7a7a7a;\n}\n\n.control.has-icon .input.is-small + .icon {\n  top: 0.9375rem;\n}\n\n.control.has-icon .input.is-medium + .icon {\n  top: 1.5625rem;\n}\n\n.control.has-icon .input.is-large + .icon {\n  top: 1.875rem;\n}\n\n.control.has-icon:not(.has-icon-right) .icon {\n  left: 1.25rem;\n  -webkit-transform: translateX(-50%) translateY(-50%);\n          transform: translateX(-50%) translateY(-50%);\n}\n\n.control.has-icon:not(.has-icon-right) .input {\n  padding-left: 2.5em;\n}\n\n.control.has-icon:not(.has-icon-right) .input.is-small + .icon {\n  left: 0.9375rem;\n}\n\n.control.has-icon:not(.has-icon-right) .input.is-medium + .icon {\n  left: 1.5625rem;\n}\n\n.control.has-icon:not(.has-icon-right) .input.is-large + .icon {\n  left: 1.875rem;\n}\n\n.control.has-icon.has-icon-right .icon {\n  right: 1.25rem;\n  -webkit-transform: translateX(50%) translateY(-50%);\n          transform: translateX(50%) translateY(-50%);\n}\n\n.control.has-icon.has-icon-right .input {\n  padding-right: 2.5em;\n}\n\n.control.has-icon.has-icon-right .input.is-small + .icon {\n  right: 0.9375rem;\n}\n\n.control.has-icon.has-icon-right .input.is-medium + .icon {\n  right: 1.5625rem;\n}\n\n.control.has-icon.has-icon-right .input.is-large + .icon {\n  right: 1.875rem;\n}\n\n.control.is-grouped {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n\n.control.is-grouped > .control {\n  -ms-flex-preferred-size: 0;\n      flex-basis: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n}\n\n.control.is-grouped > .control:not(:last-child) {\n  margin-bottom: 0;\n  margin-right: 0.75rem;\n}\n\n.control.is-grouped > .control.is-expanded {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 1;\n      flex-shrink: 1;\n}\n\n.control.is-grouped.is-grouped-centered {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.control.is-grouped.is-grouped-right {\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n\n@media screen and (min-width: 769px) {\n  .control.is-horizontal {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n  }\n  .control.is-horizontal > .control {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-preferred-size: 0;\n        flex-basis: 0;\n    -webkit-box-flex: 5;\n        -ms-flex-positive: 5;\n            flex-grow: 5;\n    -ms-flex-negative: 1;\n        flex-shrink: 1;\n  }\n}\n\n.control.is-loading:after {\n  -webkit-animation: spinAround 500ms infinite linear;\n          animation: spinAround 500ms infinite linear;\n  border: 2px solid #dbdbdb;\n  border-radius: 290486px;\n  border-right-color: transparent;\n  border-top-color: transparent;\n  content: "";\n  display: block;\n  height: 1rem;\n  position: relative;\n  width: 1rem;\n  position: absolute !important;\n  right: 0.75em;\n  top: 0.75em;\n}\n\n.icon {\n  display: inline-block;\n  font-size: 21px;\n  height: 1.5rem;\n  line-height: 1.5rem;\n  text-align: center;\n  vertical-align: top;\n  width: 1.5rem;\n}\n\n.icon .fa {\n  font-size: inherit;\n  line-height: inherit;\n}\n\n.icon.is-small {\n  display: inline-block;\n  font-size: 14px;\n  height: 1rem;\n  line-height: 1rem;\n  text-align: center;\n  vertical-align: top;\n  width: 1rem;\n}\n\n.icon.is-medium {\n  display: inline-block;\n  font-size: 28px;\n  height: 2rem;\n  line-height: 2rem;\n  text-align: center;\n  vertical-align: top;\n  width: 2rem;\n}\n\n.icon.is-large {\n  display: inline-block;\n  font-size: 42px;\n  height: 3rem;\n  line-height: 3rem;\n  text-align: center;\n  vertical-align: top;\n  width: 3rem;\n}\n\n.image {\n  display: block;\n  position: relative;\n}\n\n.image img {\n  display: block;\n  height: auto;\n  width: 100%;\n}\n\n.image.is-square img, .image.is-1by1 img, .image.is-4by3 img, .image.is-3by2 img, .image.is-16by9 img, .image.is-2by1 img {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  height: 100%;\n  width: 100%;\n}\n\n.image.is-square, .image.is-1by1 {\n  padding-top: 100%;\n}\n\n.image.is-4by3 {\n  padding-top: 75%;\n}\n\n.image.is-3by2 {\n  padding-top: 66.6666%;\n}\n\n.image.is-16by9 {\n  padding-top: 56.25%;\n}\n\n.image.is-2by1 {\n  padding-top: 50%;\n}\n\n.image.is-16x16 {\n  height: 16px;\n  width: 16px;\n}\n\n.image.is-24x24 {\n  height: 24px;\n  width: 24px;\n}\n\n.image.is-32x32 {\n  height: 32px;\n  width: 32px;\n}\n\n.image.is-48x48 {\n  height: 48px;\n  width: 48px;\n}\n\n.image.is-64x64 {\n  height: 64px;\n  width: 64px;\n}\n\n.image.is-96x96 {\n  height: 96px;\n  width: 96px;\n}\n\n.image.is-128x128 {\n  height: 128px;\n  width: 128px;\n}\n\n.notification {\n  background-color: whitesmoke;\n  border-radius: 3px;\n  padding: 1.25rem 2.5rem 1.25rem 1.5rem;\n  position: relative;\n}\n\n.notification:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n\n.notification code,\n.notification pre {\n  background: white;\n}\n\n.notification pre code {\n  background: transparent;\n}\n\n.notification .delete {\n  position: absolute;\n  right: 0.5em;\n  top: 0.5em;\n}\n\n.notification .title,\n.notification .subtitle,\n.notification .content {\n  color: inherit;\n}\n\n.notification.is-white {\n  background-color: white;\n  color: #0a0a0a;\n}\n\n.notification.is-black {\n  background-color: #0a0a0a;\n  color: white;\n}\n\n.notification.is-light {\n  background-color: whitesmoke;\n  color: #363636;\n}\n\n.notification.is-dark {\n  background-color: #363636;\n  color: whitesmoke;\n}\n\n.notification.is-primary {\n  background-color: #00d1b2;\n  color: #fff;\n}\n\n.notification.is-info {\n  background-color: #3273dc;\n  color: #fff;\n}\n\n.notification.is-success {\n  background-color: #23d160;\n  color: #fff;\n}\n\n.notification.is-warning {\n  background-color: #ffdd57;\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.notification.is-danger {\n  background-color: #ff3860;\n  color: #fff;\n}\n\n.progress {\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  border: none;\n  border-radius: 290486px;\n  display: block;\n  height: 1rem;\n  overflow: hidden;\n  padding: 0;\n  width: 100%;\n}\n\n.progress:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n\n.progress::-webkit-progress-bar {\n  background-color: #dbdbdb;\n}\n\n.progress::-webkit-progress-value {\n  background-color: #4a4a4a;\n}\n\n.progress::-moz-progress-bar {\n  background-color: #4a4a4a;\n}\n\n.progress.is-white::-webkit-progress-value {\n  background-color: white;\n}\n\n.progress.is-white::-moz-progress-bar {\n  background-color: white;\n}\n\n.progress.is-black::-webkit-progress-value {\n  background-color: #0a0a0a;\n}\n\n.progress.is-black::-moz-progress-bar {\n  background-color: #0a0a0a;\n}\n\n.progress.is-light::-webkit-progress-value {\n  background-color: whitesmoke;\n}\n\n.progress.is-light::-moz-progress-bar {\n  background-color: whitesmoke;\n}\n\n.progress.is-dark::-webkit-progress-value {\n  background-color: #363636;\n}\n\n.progress.is-dark::-moz-progress-bar {\n  background-color: #363636;\n}\n\n.progress.is-primary::-webkit-progress-value {\n  background-color: #00d1b2;\n}\n\n.progress.is-primary::-moz-progress-bar {\n  background-color: #00d1b2;\n}\n\n.progress.is-info::-webkit-progress-value {\n  background-color: #3273dc;\n}\n\n.progress.is-info::-moz-progress-bar {\n  background-color: #3273dc;\n}\n\n.progress.is-success::-webkit-progress-value {\n  background-color: #23d160;\n}\n\n.progress.is-success::-moz-progress-bar {\n  background-color: #23d160;\n}\n\n.progress.is-warning::-webkit-progress-value {\n  background-color: #ffdd57;\n}\n\n.progress.is-warning::-moz-progress-bar {\n  background-color: #ffdd57;\n}\n\n.progress.is-danger::-webkit-progress-value {\n  background-color: #ff3860;\n}\n\n.progress.is-danger::-moz-progress-bar {\n  background-color: #ff3860;\n}\n\n.progress.is-small {\n  height: 0.75rem;\n}\n\n.progress.is-medium {\n  height: 1.25rem;\n}\n\n.progress.is-large {\n  height: 1.5rem;\n}\n\n.table {\n  background-color: white;\n  color: #363636;\n  margin-bottom: 1.5rem;\n  width: 100%;\n}\n\n.table td,\n.table th {\n  border: 1px solid #dbdbdb;\n  border-width: 0 0 1px;\n  padding: 0.5em 0.75em;\n  vertical-align: top;\n}\n\n.table td.is-narrow,\n.table th.is-narrow {\n  white-space: nowrap;\n  width: 1%;\n}\n\n.table th {\n  color: #363636;\n  text-align: left;\n}\n\n.table tr:hover {\n  background-color: #fafafa;\n}\n\n.table thead td,\n.table thead th {\n  border-width: 0 0 2px;\n  color: #7a7a7a;\n}\n\n.table tfoot td,\n.table tfoot th {\n  border-width: 2px 0 0;\n  color: #7a7a7a;\n}\n\n.table tbody tr:last-child td,\n.table tbody tr:last-child th {\n  border-bottom-width: 0;\n}\n\n.table.is-bordered td,\n.table.is-bordered th {\n  border-width: 1px;\n}\n\n.table.is-bordered tr:last-child td,\n.table.is-bordered tr:last-child th {\n  border-bottom-width: 1px;\n}\n\n.table.is-narrow td,\n.table.is-narrow th {\n  padding: 0.25em 0.5em;\n}\n\n.table.is-striped tbody tr:nth-child(even) {\n  background-color: #fafafa;\n}\n\n.table.is-striped tbody tr:nth-child(even):hover {\n  background-color: whitesmoke;\n}\n\n.tag {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  background-color: whitesmoke;\n  border-radius: 290486px;\n  color: #4a4a4a;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  font-size: 0.75rem;\n  height: 2em;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  line-height: 1.5;\n  padding-left: 0.875em;\n  padding-right: 0.875em;\n  vertical-align: top;\n  white-space: nowrap;\n}\n\n.tag .delete {\n  margin-left: 0.25em;\n  margin-right: -0.5em;\n}\n\n.tag.is-white {\n  background-color: white;\n  color: #0a0a0a;\n}\n\n.tag.is-black {\n  background-color: #0a0a0a;\n  color: white;\n}\n\n.tag.is-light {\n  background-color: whitesmoke;\n  color: #363636;\n}\n\n.tag.is-dark {\n  background-color: #363636;\n  color: whitesmoke;\n}\n\n.tag.is-primary {\n  background-color: #00d1b2;\n  color: #fff;\n}\n\n.tag.is-info {\n  background-color: #3273dc;\n  color: #fff;\n}\n\n.tag.is-success {\n  background-color: #23d160;\n  color: #fff;\n}\n\n.tag.is-warning {\n  background-color: #ffdd57;\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.tag.is-danger {\n  background-color: #ff3860;\n  color: #fff;\n}\n\n.tag.is-medium {\n  font-size: 1rem;\n}\n\n.tag.is-large {\n  font-size: 1.25rem;\n}\n\n.title,\n.subtitle {\n  word-break: break-word;\n}\n\n.title:not(:last-child),\n.subtitle:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n\n.title em,\n.title span,\n.subtitle em,\n.subtitle span {\n  font-weight: 300;\n}\n\n.title strong,\n.subtitle strong {\n  font-weight: 500;\n}\n\n.title .tag,\n.subtitle .tag {\n  vertical-align: middle;\n}\n\n.title {\n  color: #363636;\n  font-size: 2rem;\n  font-weight: 300;\n  line-height: 1.125;\n}\n\n.title strong {\n  color: inherit;\n}\n\n.title + .highlight {\n  margin-top: -0.75rem;\n}\n\n.title + .subtitle {\n  margin-top: -1.25rem;\n}\n\n.title.is-1 {\n  font-size: 3.5rem;\n}\n\n.title.is-2 {\n  font-size: 2.75rem;\n}\n\n.title.is-3 {\n  font-size: 2rem;\n}\n\n.title.is-4 {\n  font-size: 1.5rem;\n}\n\n.title.is-5 {\n  font-size: 1.25rem;\n}\n\n.title.is-6 {\n  font-size: 14px;\n}\n\n.subtitle {\n  color: #4a4a4a;\n  font-size: 1.25rem;\n  font-weight: 300;\n  line-height: 1.25;\n}\n\n.subtitle strong {\n  color: #363636;\n}\n\n.subtitle + .title {\n  margin-top: -1.5rem;\n}\n\n.subtitle.is-1 {\n  font-size: 3.5rem;\n}\n\n.subtitle.is-2 {\n  font-size: 2.75rem;\n}\n\n.subtitle.is-3 {\n  font-size: 2rem;\n}\n\n.subtitle.is-4 {\n  font-size: 1.5rem;\n}\n\n.subtitle.is-5 {\n  font-size: 1.25rem;\n}\n\n.subtitle.is-6 {\n  font-size: 14px;\n}\n\n.block:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n\n.container {\n  position: relative;\n}\n\n@media screen and (min-width: 1000px) {\n  .container {\n    margin: 0 auto;\n    max-width: 960px;\n  }\n  .container.is-fluid {\n    margin: 0 20px;\n    max-width: none;\n  }\n}\n\n@media screen and (min-width: 1192px) {\n  .container {\n    max-width: 1152px;\n  }\n}\n\n.delete {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  background-color: rgba(10, 10, 10, 0.2);\n  border: none;\n  border-radius: 290486px;\n  cursor: pointer;\n  display: inline-block;\n  font-size: 1rem;\n  height: 20px;\n  outline: none;\n  position: relative;\n  -webkit-transform: rotate(45deg);\n          transform: rotate(45deg);\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n  vertical-align: top;\n  width: 20px;\n}\n\n.delete:before, .delete:after {\n  background-color: white;\n  content: "";\n  display: block;\n  left: 50%;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translateX(-50%) translateY(-50%);\n          transform: translateX(-50%) translateY(-50%);\n}\n\n.delete:before {\n  height: 2px;\n  width: 50%;\n}\n\n.delete:after {\n  height: 50%;\n  width: 2px;\n}\n\n.delete:hover, .delete:focus {\n  background-color: rgba(10, 10, 10, 0.3);\n}\n\n.delete:active {\n  background-color: rgba(10, 10, 10, 0.4);\n}\n\n.delete.is-small {\n  height: 14px;\n  width: 14px;\n}\n\n.delete.is-medium {\n  height: 26px;\n  width: 26px;\n}\n\n.delete.is-large {\n  height: 30px;\n  width: 30px;\n}\n\n.fa {\n  font-size: 21px;\n  text-align: center;\n  vertical-align: top;\n}\n\n.heading {\n  display: block;\n  font-size: 11px;\n  letter-spacing: 1px;\n  margin-bottom: 5px;\n  text-transform: uppercase;\n}\n\n.highlight {\n  font-weight: 400;\n  max-width: 100%;\n  overflow: hidden;\n  padding: 0;\n}\n\n.highlight:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n\n.highlight pre {\n  overflow: auto;\n  max-width: 100%;\n}\n\n.loader {\n  -webkit-animation: spinAround 500ms infinite linear;\n          animation: spinAround 500ms infinite linear;\n  border: 2px solid #dbdbdb;\n  border-radius: 290486px;\n  border-right-color: transparent;\n  border-top-color: transparent;\n  content: "";\n  display: block;\n  height: 1rem;\n  position: relative;\n  width: 1rem;\n}\n\n.number {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  background-color: whitesmoke;\n  border-radius: 290486px;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  font-size: 1.25rem;\n  height: 2em;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  margin-right: 1.5rem;\n  min-width: 2.5em;\n  padding: 0.25rem 0.5rem;\n  text-align: center;\n  vertical-align: top;\n}\n\n.card-header {\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n  box-shadow: 0 1px 2px rgba(10, 10, 10, 0.1);\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.card-header-title {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  color: #363636;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  font-weight: 700;\n  padding: 0.75rem;\n}\n\n.card-header-icon {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding: 0.75rem;\n}\n\n.card-image {\n  display: block;\n  position: relative;\n}\n\n.card-content {\n  padding: 1.5rem;\n}\n\n.card-content .title + .subtitle {\n  margin-top: -1.5rem;\n}\n\n.card-footer {\n  border-top: 1px solid #dbdbdb;\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.card-footer-item {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-preferred-size: 0;\n      flex-basis: 0;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding: 0.75rem;\n}\n\n.card-footer-item:not(:last-child) {\n  border-right: 1px solid #dbdbdb;\n}\n\n.card {\n  background-color: white;\n  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);\n  color: #4a4a4a;\n  max-width: 100%;\n  position: relative;\n}\n\n.card .media:not(:last-child) {\n  margin-bottom: 0.75rem;\n}\n\n.level-item {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-preferred-size: auto;\n      flex-basis: auto;\n  -webkit-box-flex: 0;\n      -ms-flex-positive: 0;\n          flex-grow: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.level-item .title,\n.level-item .subtitle {\n  margin-bottom: 0;\n}\n\n@media screen and (max-width: 768px) {\n  .level-item:not(:last-child) {\n    margin-bottom: 0.75rem;\n  }\n}\n\n.level-left,\n.level-right {\n  -ms-flex-preferred-size: auto;\n      flex-basis: auto;\n  -webkit-box-flex: 0;\n      -ms-flex-positive: 0;\n          flex-grow: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n}\n\n.level-left .level-item:not(:last-child),\n.level-right .level-item:not(:last-child) {\n  margin-right: 0.75rem;\n}\n\n.level-left .level-item.is-flexible,\n.level-right .level-item.is-flexible {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n}\n\n.level-left {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n\n@media screen and (max-width: 768px) {\n  .level-left + .level-right {\n    margin-top: 1.5rem;\n  }\n}\n\n@media screen and (min-width: 769px) {\n  .level-left {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n  }\n}\n\n.level-right {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n\n@media screen and (min-width: 769px) {\n  .level-right {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n  }\n}\n\n.level {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n\n.level:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n\n.level code {\n  border-radius: 3px;\n}\n\n.level img {\n  display: inline-block;\n  vertical-align: top;\n}\n\n.level.is-mobile {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.level.is-mobile > .level-item:not(:last-child) {\n  margin-bottom: 0;\n}\n\n.level.is-mobile > .level-item:not(.is-narrow) {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n}\n\n@media screen and (min-width: 769px) {\n  .level {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n  }\n  .level > .level-item:not(.is-narrow) {\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n  }\n}\n\n.media-left,\n.media-right {\n  -ms-flex-preferred-size: auto;\n      flex-basis: auto;\n  -webkit-box-flex: 0;\n      -ms-flex-positive: 0;\n          flex-grow: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n}\n\n.media-left {\n  margin-right: 1rem;\n}\n\n.media-right {\n  margin-left: 1rem;\n}\n\n.media-content {\n  -ms-flex-preferred-size: auto;\n      flex-basis: auto;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 1;\n      flex-shrink: 1;\n  text-align: left;\n}\n\n.media {\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  text-align: left;\n}\n\n.media .content:not(:last-child) {\n  margin-bottom: 0.75rem;\n}\n\n.media .media {\n  border-top: 1px solid rgba(219, 219, 219, 0.5);\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  padding-top: 0.75rem;\n}\n\n.media .media .content:not(:last-child),\n.media .media .control:not(:last-child) {\n  margin-bottom: 0.5rem;\n}\n\n.media .media .media {\n  padding-top: 0.5rem;\n}\n\n.media .media .media + .media {\n  margin-top: 0.5rem;\n}\n\n.media + .media {\n  border-top: 1px solid rgba(219, 219, 219, 0.5);\n  margin-top: 1rem;\n  padding-top: 1rem;\n}\n\n.media.is-large + .media {\n  margin-top: 1.5rem;\n  padding-top: 1.5rem;\n}\n\n.menu {\n  font-size: 1rem;\n}\n\n.menu-list {\n  line-height: 1.25;\n}\n\n.menu-list a {\n  border-radius: 2px;\n  color: #4a4a4a;\n  display: block;\n  padding: 0.5em 0.75em;\n}\n\n.menu-list a:hover {\n  background-color: whitesmoke;\n  color: #00d1b2;\n}\n\n.menu-list a.is-active {\n  background-color: #00d1b2;\n  color: #fff;\n}\n\n.menu-list li ul {\n  border-left: 1px solid #dbdbdb;\n  margin: 0.75em;\n  padding-left: 0.75em;\n}\n\n.menu-label {\n  color: #7a7a7a;\n  font-size: 0.8em;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n\n.menu-label:not(:first-child) {\n  margin-top: 1em;\n}\n\n.menu-label:not(:last-child) {\n  margin-bottom: 1em;\n}\n\n.message {\n  background-color: whitesmoke;\n  border-radius: 3px;\n  font-size: 1rem;\n}\n\n.message:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n\n.message.is-white {\n  background-color: white;\n}\n\n.message.is-white .message-header {\n  background-color: white;\n  color: #0a0a0a;\n}\n\n.message.is-white .message-body {\n  border-color: white;\n  color: #4d4d4d;\n}\n\n.message.is-black {\n  background-color: #fafafa;\n}\n\n.message.is-black .message-header {\n  background-color: #0a0a0a;\n  color: white;\n}\n\n.message.is-black .message-body {\n  border-color: #0a0a0a;\n  color: #090909;\n}\n\n.message.is-light {\n  background-color: #fafafa;\n}\n\n.message.is-light .message-header {\n  background-color: whitesmoke;\n  color: #363636;\n}\n\n.message.is-light .message-body {\n  border-color: whitesmoke;\n  color: #505050;\n}\n\n.message.is-dark {\n  background-color: #fafafa;\n}\n\n.message.is-dark .message-header {\n  background-color: #363636;\n  color: whitesmoke;\n}\n\n.message.is-dark .message-body {\n  border-color: #363636;\n  color: #2a2a2a;\n}\n\n.message.is-primary {\n  background-color: #f5fffd;\n}\n\n.message.is-primary .message-header {\n  background-color: #00d1b2;\n  color: #fff;\n}\n\n.message.is-primary .message-body {\n  border-color: #00d1b2;\n  color: #021310;\n}\n\n.message.is-info {\n  background-color: #f6f9fe;\n}\n\n.message.is-info .message-header {\n  background-color: #3273dc;\n  color: #fff;\n}\n\n.message.is-info .message-body {\n  border-color: #3273dc;\n  color: #22509a;\n}\n\n.message.is-success {\n  background-color: #f6fef9;\n}\n\n.message.is-success .message-header {\n  background-color: #23d160;\n  color: #fff;\n}\n\n.message.is-success .message-body {\n  border-color: #23d160;\n  color: #0e301a;\n}\n\n.message.is-warning {\n  background-color: #fffdf5;\n}\n\n.message.is-warning .message-header {\n  background-color: #ffdd57;\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.message.is-warning .message-body {\n  border-color: #ffdd57;\n  color: #3b3108;\n}\n\n.message.is-danger {\n  background-color: #fff5f7;\n}\n\n.message.is-danger .message-header {\n  background-color: #ff3860;\n  color: #fff;\n}\n\n.message.is-danger .message-body {\n  border-color: #ff3860;\n  color: #cd0930;\n}\n\n.message-header {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  background-color: #4a4a4a;\n  border-radius: 3px 3px 0 0;\n  color: #fff;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  line-height: 1.25;\n  padding: 0.5em 0.75em;\n  position: relative;\n}\n\n.message-header a,\n.message-header strong {\n  color: inherit;\n}\n\n.message-header a {\n  text-decoration: underline;\n}\n\n.message-header .delete {\n  -webkit-box-flex: 0;\n      -ms-flex-positive: 0;\n          flex-grow: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  margin-left: 0.75em;\n}\n\n.message-header + .message-body {\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n  border-top: none;\n}\n\n.message-body {\n  border: 1px solid #dbdbdb;\n  border-radius: 3px;\n  color: #4a4a4a;\n  padding: 1em 1.25em;\n}\n\n.message-body a,\n.message-body strong {\n  color: inherit;\n}\n\n.message-body a {\n  text-decoration: underline;\n}\n\n.message-body code,\n.message-body pre {\n  background: white;\n}\n\n.message-body pre code {\n  background: transparent;\n}\n\n.modal-background {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  background-color: rgba(10, 10, 10, 0.86);\n}\n\n.modal-content,\n.modal-card {\n  margin: 0 20px;\n  max-height: calc(100vh - 160px);\n  overflow: auto;\n  position: relative;\n  width: 100%;\n}\n\n@media screen and (min-width: 769px) {\n  .modal-content,\n  .modal-card {\n    margin: 0 auto;\n    max-height: calc(100vh - 40px);\n    width: 640px;\n  }\n}\n\n.modal-close {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  background-color: rgba(10, 10, 10, 0.2);\n  border: none;\n  border-radius: 290486px;\n  cursor: pointer;\n  display: inline-block;\n  font-size: 1rem;\n  height: 20px;\n  outline: none;\n  position: relative;\n  -webkit-transform: rotate(45deg);\n          transform: rotate(45deg);\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n  vertical-align: top;\n  width: 20px;\n  background: none;\n  height: 40px;\n  position: fixed;\n  right: 20px;\n  top: 20px;\n  width: 40px;\n}\n\n.modal-close:before, .modal-close:after {\n  background-color: white;\n  content: "";\n  display: block;\n  left: 50%;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translateX(-50%) translateY(-50%);\n          transform: translateX(-50%) translateY(-50%);\n}\n\n.modal-close:before {\n  height: 2px;\n  width: 50%;\n}\n\n.modal-close:after {\n  height: 50%;\n  width: 2px;\n}\n\n.modal-close:hover, .modal-close:focus {\n  background-color: rgba(10, 10, 10, 0.3);\n}\n\n.modal-close:active {\n  background-color: rgba(10, 10, 10, 0.4);\n}\n\n.modal-close.is-small {\n  height: 14px;\n  width: 14px;\n}\n\n.modal-close.is-medium {\n  height: 26px;\n  width: 26px;\n}\n\n.modal-close.is-large {\n  height: 30px;\n  width: 30px;\n}\n\n.modal-card {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  max-height: calc(100vh - 40px);\n  overflow: hidden;\n}\n\n.modal-card-head,\n.modal-card-foot {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  background-color: whitesmoke;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  padding: 20px;\n  position: relative;\n}\n\n.modal-card-head {\n  border-bottom: 1px solid #dbdbdb;\n  border-top-left-radius: 5px;\n  border-top-right-radius: 5px;\n}\n\n.modal-card-title {\n  color: #363636;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  font-size: 1.5rem;\n  line-height: 1;\n}\n\n.modal-card-foot {\n  border-bottom-left-radius: 5px;\n  border-bottom-right-radius: 5px;\n  border-top: 1px solid #dbdbdb;\n}\n\n.modal-card-foot .button:not(:last-child) {\n  margin-right: 10px;\n}\n\n.modal-card-body {\n  -webkit-overflow-scrolling: touch;\n  background-color: white;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 1;\n      flex-shrink: 1;\n  overflow: auto;\n  padding: 20px;\n}\n\n.modal {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: none;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  overflow: hidden;\n  position: fixed;\n  z-index: 1986;\n}\n\n.modal.is-active {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.nav-toggle {\n  cursor: pointer;\n  display: block;\n  height: 3.5rem;\n  position: relative;\n  width: 3.5rem;\n}\n\n.nav-toggle span {\n  background-color: #4a4a4a;\n  display: block;\n  height: 1px;\n  left: 50%;\n  margin-left: -7px;\n  position: absolute;\n  top: 50%;\n  -webkit-transition: none 86ms ease-out;\n  transition: none 86ms ease-out;\n  -webkit-transition-property: background, left, opacity, -webkit-transform;\n  transition-property: background, left, opacity, -webkit-transform;\n  transition-property: background, left, opacity, transform;\n  transition-property: background, left, opacity, transform, -webkit-transform;\n  width: 15px;\n}\n\n.nav-toggle span:nth-child(1) {\n  margin-top: -6px;\n}\n\n.nav-toggle span:nth-child(2) {\n  margin-top: -1px;\n}\n\n.nav-toggle span:nth-child(3) {\n  margin-top: 4px;\n}\n\n.nav-toggle:hover {\n  background-color: whitesmoke;\n}\n\n.nav-toggle.is-active span {\n  background-color: #00d1b2;\n}\n\n.nav-toggle.is-active span:nth-child(1) {\n  margin-left: -5px;\n  -webkit-transform: rotate(45deg);\n          transform: rotate(45deg);\n  -webkit-transform-origin: left top;\n          transform-origin: left top;\n}\n\n.nav-toggle.is-active span:nth-child(2) {\n  opacity: 0;\n}\n\n.nav-toggle.is-active span:nth-child(3) {\n  margin-left: -5px;\n  -webkit-transform: rotate(-45deg);\n          transform: rotate(-45deg);\n  -webkit-transform-origin: left bottom;\n          transform-origin: left bottom;\n}\n\n@media screen and (min-width: 769px) {\n  .nav-toggle {\n    display: none;\n  }\n}\n\n.nav-item {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 0;\n      -ms-flex-positive: 0;\n          flex-grow: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  font-size: 1rem;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding: 0.5rem 0.75rem;\n}\n\n.nav-item a {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n}\n\n.nav-item img {\n  max-height: 1.75rem;\n}\n\n.nav-item .button + .button {\n  margin-left: 0.75rem;\n}\n\n.nav-item .tag:first-child:not(:last-child) {\n  margin-right: 0.5rem;\n}\n\n.nav-item .tag:last-child:not(:first-child) {\n  margin-left: 0.5rem;\n}\n\n@media screen and (max-width: 768px) {\n  .nav-item {\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start;\n  }\n}\n\n.nav-item a,\na.nav-item {\n  color: #7a7a7a;\n}\n\n.nav-item a:hover,\na.nav-item:hover {\n  color: #363636;\n}\n\n.nav-item a.is-active,\na.nav-item.is-active {\n  color: #363636;\n}\n\n.nav-item a.is-tab,\na.nav-item.is-tab {\n  border-bottom: 1px solid transparent;\n  border-top: 1px solid transparent;\n  padding-bottom: calc(0.5rem - 1px);\n  padding-left: 1rem;\n  padding-right: 1rem;\n  padding-top: calc(0.5rem - 1px);\n}\n\n.nav-item a.is-tab:hover,\na.nav-item.is-tab:hover {\n  border-bottom-color: #00d1b2;\n  border-top-color: transparent;\n}\n\n.nav-item a.is-tab.is-active,\na.nav-item.is-tab.is-active {\n  border-bottom: 3px solid #00d1b2;\n  color: #00d1b2;\n  padding-bottom: calc(0.5rem - 3px);\n}\n\n@media screen and (min-width: 1000px) {\n  .nav-item a.is-brand,\n  a.nav-item.is-brand {\n    padding-left: 0;\n  }\n}\n\n@media screen and (max-width: 768px) {\n  .nav-menu {\n    background-color: white;\n    box-shadow: 0 4px 7px rgba(10, 10, 10, 0.1);\n    left: 0;\n    display: none;\n    right: 0;\n    top: 100%;\n    position: absolute;\n  }\n  .nav-menu .nav-item {\n    border-top: 1px solid rgba(219, 219, 219, 0.5);\n    padding: 0.75rem;\n  }\n  .nav-menu.is-active {\n    display: block;\n  }\n}\n\n@media screen and (min-width: 769px) and (max-width: 999px) {\n  .nav-menu {\n    padding-right: 1.5rem;\n  }\n}\n\n.nav-left,\n.nav-right {\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n  -ms-flex-preferred-size: 0;\n      flex-basis: 0;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n}\n\n.nav-left {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  overflow: hidden;\n  overflow-x: auto;\n  white-space: nowrap;\n}\n\n.nav-center {\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 0;\n      -ms-flex-positive: 0;\n          flex-grow: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.nav-right {\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n\n@media screen and (min-width: 769px) {\n  .nav-right {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n  }\n}\n\n.nav {\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n  background-color: white;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  min-height: 3.5rem;\n  position: relative;\n  text-align: center;\n  z-index: 2;\n}\n\n.nav > .container {\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  min-height: 3.5rem;\n  width: 100%;\n}\n\n.nav.has-shadow {\n  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1);\n}\n\n.pagination,\n.pagination-list {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  text-align: center;\n}\n\n.pagination-previous,\n.pagination-next,\n.pagination-link,\n.pagination-ellipsis {\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border: none;\n  border-radius: 3px;\n  box-shadow: none;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  font-size: 1rem;\n  height: 2.285em;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  line-height: 1.5;\n  padding-left: 0.75em;\n  padding-right: 0.75em;\n  position: relative;\n  vertical-align: top;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  font-size: 0.875rem;\n  padding-left: 0.5em;\n  padding-right: 0.5em;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  text-align: center;\n}\n\n.pagination-previous:focus, .pagination-previous.is-focused, .pagination-previous:active, .pagination-previous.is-active,\n.pagination-next:focus,\n.pagination-next.is-focused,\n.pagination-next:active,\n.pagination-next.is-active,\n.pagination-link:focus,\n.pagination-link.is-focused,\n.pagination-link:active,\n.pagination-link.is-active,\n.pagination-ellipsis:focus,\n.pagination-ellipsis.is-focused,\n.pagination-ellipsis:active,\n.pagination-ellipsis.is-active {\n  outline: none;\n}\n\n.pagination-previous[disabled], .pagination-previous.is-disabled,\n.pagination-next[disabled],\n.pagination-next.is-disabled,\n.pagination-link[disabled],\n.pagination-link.is-disabled,\n.pagination-ellipsis[disabled],\n.pagination-ellipsis.is-disabled {\n  pointer-events: none;\n}\n\n.pagination-previous,\n.pagination-next,\n.pagination-link {\n  border: 1px solid #dbdbdb;\n  min-width: 2.5em;\n}\n\n.pagination-previous:hover,\n.pagination-next:hover,\n.pagination-link:hover {\n  border-color: #b5b5b5;\n  color: #363636;\n}\n\n.pagination-previous:focus,\n.pagination-next:focus,\n.pagination-link:focus {\n  border-color: #00d1b2;\n}\n\n.pagination-previous:active,\n.pagination-next:active,\n.pagination-link:active {\n  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2);\n}\n\n.pagination-previous[disabled], .pagination-previous.is-disabled,\n.pagination-next[disabled],\n.pagination-next.is-disabled,\n.pagination-link[disabled],\n.pagination-link.is-disabled {\n  background: #dbdbdb;\n  color: #7a7a7a;\n  opacity: 0.5;\n  pointer-events: none;\n}\n\n.pagination-previous,\n.pagination-next {\n  padding-left: 0.75em;\n  padding-right: 0.75em;\n}\n\n.pagination-link.is-current {\n  background-color: #00d1b2;\n  border-color: #00d1b2;\n  color: #fff;\n}\n\n.pagination-ellipsis {\n  color: #b5b5b5;\n  pointer-events: none;\n}\n\n.pagination-list li:not(:first-child) {\n  margin-left: 0.375rem;\n}\n\n@media screen and (max-width: 768px) {\n  .pagination {\n    -ms-flex-wrap: wrap;\n        flex-wrap: wrap;\n  }\n  .pagination-previous,\n  .pagination-next {\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    -ms-flex-negative: 1;\n        flex-shrink: 1;\n    width: calc(50% - 0.375rem);\n  }\n  .pagination-next {\n    margin-left: 0.75rem;\n  }\n  .pagination-list {\n    margin-top: 0.75rem;\n  }\n  .pagination-list li {\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    -ms-flex-negative: 1;\n        flex-shrink: 1;\n  }\n}\n\n@media screen and (min-width: 769px) {\n  .pagination-list {\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    -ms-flex-negative: 1;\n        flex-shrink: 1;\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start;\n    -webkit-box-ordinal-group: 2;\n        -ms-flex-order: 1;\n            order: 1;\n  }\n  .pagination-previous,\n  .pagination-next {\n    margin-left: 0.75rem;\n  }\n  .pagination-previous {\n    -webkit-box-ordinal-group: 3;\n        -ms-flex-order: 2;\n            order: 2;\n  }\n  .pagination-next {\n    -webkit-box-ordinal-group: 4;\n        -ms-flex-order: 3;\n            order: 3;\n  }\n  .pagination {\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n  }\n  .pagination.is-centered .pagination-previous {\n    margin-left: 0;\n    -webkit-box-ordinal-group: 2;\n        -ms-flex-order: 1;\n            order: 1;\n  }\n  .pagination.is-centered .pagination-list {\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-ordinal-group: 3;\n        -ms-flex-order: 2;\n            order: 2;\n  }\n  .pagination.is-centered .pagination-next {\n    -webkit-box-ordinal-group: 4;\n        -ms-flex-order: 3;\n            order: 3;\n  }\n  .pagination.is-right .pagination-previous {\n    margin-left: 0;\n    -webkit-box-ordinal-group: 2;\n        -ms-flex-order: 1;\n            order: 1;\n  }\n  .pagination.is-right .pagination-next {\n    -webkit-box-ordinal-group: 3;\n        -ms-flex-order: 2;\n            order: 2;\n    margin-right: 0.75rem;\n  }\n  .pagination.is-right .pagination-list {\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n    -webkit-box-ordinal-group: 4;\n        -ms-flex-order: 3;\n            order: 3;\n  }\n}\n\n.panel {\n  font-size: 1rem;\n}\n\n.panel:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n\n.panel-heading,\n.panel-tabs,\n.panel-block {\n  border-bottom: 1px solid #dbdbdb;\n  border-left: 1px solid #dbdbdb;\n  border-right: 1px solid #dbdbdb;\n}\n\n.panel-heading:first-child,\n.panel-tabs:first-child,\n.panel-block:first-child {\n  border-top: 1px solid #dbdbdb;\n}\n\n.panel-heading {\n  background-color: whitesmoke;\n  border-radius: 3px 3px 0 0;\n  color: #363636;\n  font-size: 1.25em;\n  font-weight: 300;\n  line-height: 1.25;\n  padding: 0.5em 0.75em;\n}\n\n.panel-tabs {\n  -webkit-box-align: end;\n      -ms-flex-align: end;\n          align-items: flex-end;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  font-size: 0.875em;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.panel-tabs a {\n  border-bottom: 1px solid #dbdbdb;\n  margin-bottom: -1px;\n  padding: 0.5em;\n}\n\n.panel-tabs a.is-active {\n  border-bottom-color: #4a4a4a;\n  color: #363636;\n}\n\n.panel-list a {\n  color: #4a4a4a;\n}\n\n.panel-list a:hover {\n  color: #00d1b2;\n}\n\n.panel-block {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  color: #363636;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  padding: 0.5em 0.75em;\n}\n\n.panel-block input[type="checkbox"] {\n  margin-right: 0.75em;\n}\n\n.panel-block > .control {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 1;\n      flex-shrink: 1;\n  width: 100%;\n}\n\n.panel-block.is-active {\n  border-left-color: #00d1b2;\n  color: #363636;\n}\n\n.panel-block.is-active .panel-icon {\n  color: #00d1b2;\n}\n\na.panel-block,\nlabel.panel-block {\n  cursor: pointer;\n}\n\na.panel-block:hover,\nlabel.panel-block:hover {\n  background-color: whitesmoke;\n}\n\n.panel-icon {\n  display: inline-block;\n  font-size: 14px;\n  height: 1em;\n  line-height: 1em;\n  text-align: center;\n  vertical-align: top;\n  width: 1em;\n  color: #7a7a7a;\n  margin-right: 0.75em;\n}\n\n.panel-icon .fa {\n  font-size: inherit;\n  line-height: inherit;\n}\n\n.tabs {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  font-size: 1rem;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  overflow: hidden;\n  overflow-x: auto;\n  white-space: nowrap;\n}\n\n.tabs:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n\n.tabs a {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border-bottom: 1px solid #dbdbdb;\n  color: #4a4a4a;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  margin-bottom: -1px;\n  padding: 0.5em 1em;\n  vertical-align: top;\n}\n\n.tabs a:hover {\n  border-bottom-color: #363636;\n  color: #363636;\n}\n\n.tabs li {\n  display: block;\n}\n\n.tabs li.is-active a {\n  border-bottom-color: #00d1b2;\n  color: #00d1b2;\n}\n\n.tabs ul {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border-bottom: 1px solid #dbdbdb;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n\n.tabs ul.is-left {\n  padding-right: 0.75em;\n}\n\n.tabs ul.is-center {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding-left: 0.75em;\n  padding-right: 0.75em;\n}\n\n.tabs ul.is-right {\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n  padding-left: 0.75em;\n}\n\n.tabs .icon:first-child {\n  margin-right: 0.5em;\n}\n\n.tabs .icon:last-child {\n  margin-left: 0.5em;\n}\n\n.tabs.is-centered ul {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.tabs.is-right ul {\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n\n.tabs.is-boxed a {\n  border: 1px solid transparent;\n  border-radius: 3px 3px 0 0;\n}\n\n.tabs.is-boxed a:hover {\n  background-color: whitesmoke;\n  border-bottom-color: #dbdbdb;\n}\n\n.tabs.is-boxed li.is-active a {\n  background-color: white;\n  border-color: #dbdbdb;\n  border-bottom-color: transparent !important;\n}\n\n.tabs.is-fullwidth li {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n}\n\n.tabs.is-toggle a {\n  border: 1px solid #dbdbdb;\n  margin-bottom: 0;\n  position: relative;\n}\n\n.tabs.is-toggle a:hover {\n  background-color: whitesmoke;\n  border-color: #b5b5b5;\n  z-index: 2;\n}\n\n.tabs.is-toggle li + li {\n  margin-left: -1px;\n}\n\n.tabs.is-toggle li:first-child a {\n  border-radius: 3px 0 0 3px;\n}\n\n.tabs.is-toggle li:last-child a {\n  border-radius: 0 3px 3px 0;\n}\n\n.tabs.is-toggle li.is-active a {\n  background-color: #00d1b2;\n  border-color: #00d1b2;\n  color: #fff;\n  z-index: 1;\n}\n\n.tabs.is-toggle ul {\n  border-bottom: none;\n}\n\n.tabs.is-small {\n  font-size: 0.75rem;\n}\n\n.tabs.is-medium {\n  font-size: 1.25rem;\n}\n\n.tabs.is-large {\n  font-size: 1.5rem;\n}\n\n.column {\n  display: block;\n  -ms-flex-preferred-size: 0;\n      flex-basis: 0;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 1;\n      flex-shrink: 1;\n  padding: 0.75rem;\n}\n\n.columns.is-mobile > .column.is-narrow {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n}\n\n.columns.is-mobile > .column.is-full {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 100%;\n}\n\n.columns.is-mobile > .column.is-three-quarters {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 75%;\n}\n\n.columns.is-mobile > .column.is-two-thirds {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 66.6666%;\n}\n\n.columns.is-mobile > .column.is-half {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 50%;\n}\n\n.columns.is-mobile > .column.is-one-third {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 33.3333%;\n}\n\n.columns.is-mobile > .column.is-one-quarter {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 25%;\n}\n\n.columns.is-mobile > .column.is-offset-three-quarters {\n  margin-left: 75%;\n}\n\n.columns.is-mobile > .column.is-offset-two-thirds {\n  margin-left: 66.6666%;\n}\n\n.columns.is-mobile > .column.is-offset-half {\n  margin-left: 50%;\n}\n\n.columns.is-mobile > .column.is-offset-one-third {\n  margin-left: 33.3333%;\n}\n\n.columns.is-mobile > .column.is-offset-one-quarter {\n  margin-left: 25%;\n}\n\n.columns.is-mobile > .column.is-1 {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 8.33333%;\n}\n\n.columns.is-mobile > .column.is-offset-1 {\n  margin-left: 8.33333%;\n}\n\n.columns.is-mobile > .column.is-2 {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 16.66667%;\n}\n\n.columns.is-mobile > .column.is-offset-2 {\n  margin-left: 16.66667%;\n}\n\n.columns.is-mobile > .column.is-3 {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 25%;\n}\n\n.columns.is-mobile > .column.is-offset-3 {\n  margin-left: 25%;\n}\n\n.columns.is-mobile > .column.is-4 {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 33.33333%;\n}\n\n.columns.is-mobile > .column.is-offset-4 {\n  margin-left: 33.33333%;\n}\n\n.columns.is-mobile > .column.is-5 {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 41.66667%;\n}\n\n.columns.is-mobile > .column.is-offset-5 {\n  margin-left: 41.66667%;\n}\n\n.columns.is-mobile > .column.is-6 {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 50%;\n}\n\n.columns.is-mobile > .column.is-offset-6 {\n  margin-left: 50%;\n}\n\n.columns.is-mobile > .column.is-7 {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 58.33333%;\n}\n\n.columns.is-mobile > .column.is-offset-7 {\n  margin-left: 58.33333%;\n}\n\n.columns.is-mobile > .column.is-8 {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 66.66667%;\n}\n\n.columns.is-mobile > .column.is-offset-8 {\n  margin-left: 66.66667%;\n}\n\n.columns.is-mobile > .column.is-9 {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 75%;\n}\n\n.columns.is-mobile > .column.is-offset-9 {\n  margin-left: 75%;\n}\n\n.columns.is-mobile > .column.is-10 {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 83.33333%;\n}\n\n.columns.is-mobile > .column.is-offset-10 {\n  margin-left: 83.33333%;\n}\n\n.columns.is-mobile > .column.is-11 {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 91.66667%;\n}\n\n.columns.is-mobile > .column.is-offset-11 {\n  margin-left: 91.66667%;\n}\n\n.columns.is-mobile > .column.is-12 {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 100%;\n}\n\n.columns.is-mobile > .column.is-offset-12 {\n  margin-left: 100%;\n}\n\n@media screen and (max-width: 768px) {\n  .column.is-narrow-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n  }\n  .column.is-full-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 100%;\n  }\n  .column.is-three-quarters-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 75%;\n  }\n  .column.is-two-thirds-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 66.6666%;\n  }\n  .column.is-half-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 50%;\n  }\n  .column.is-one-third-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 33.3333%;\n  }\n  .column.is-one-quarter-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 25%;\n  }\n  .column.is-offset-three-quarters-mobile {\n    margin-left: 75%;\n  }\n  .column.is-offset-two-thirds-mobile {\n    margin-left: 66.6666%;\n  }\n  .column.is-offset-half-mobile {\n    margin-left: 50%;\n  }\n  .column.is-offset-one-third-mobile {\n    margin-left: 33.3333%;\n  }\n  .column.is-offset-one-quarter-mobile {\n    margin-left: 25%;\n  }\n  .column.is-1-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 8.33333%;\n  }\n  .column.is-offset-1-mobile {\n    margin-left: 8.33333%;\n  }\n  .column.is-2-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 16.66667%;\n  }\n  .column.is-offset-2-mobile {\n    margin-left: 16.66667%;\n  }\n  .column.is-3-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 25%;\n  }\n  .column.is-offset-3-mobile {\n    margin-left: 25%;\n  }\n  .column.is-4-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 33.33333%;\n  }\n  .column.is-offset-4-mobile {\n    margin-left: 33.33333%;\n  }\n  .column.is-5-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 41.66667%;\n  }\n  .column.is-offset-5-mobile {\n    margin-left: 41.66667%;\n  }\n  .column.is-6-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 50%;\n  }\n  .column.is-offset-6-mobile {\n    margin-left: 50%;\n  }\n  .column.is-7-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 58.33333%;\n  }\n  .column.is-offset-7-mobile {\n    margin-left: 58.33333%;\n  }\n  .column.is-8-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 66.66667%;\n  }\n  .column.is-offset-8-mobile {\n    margin-left: 66.66667%;\n  }\n  .column.is-9-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 75%;\n  }\n  .column.is-offset-9-mobile {\n    margin-left: 75%;\n  }\n  .column.is-10-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 83.33333%;\n  }\n  .column.is-offset-10-mobile {\n    margin-left: 83.33333%;\n  }\n  .column.is-11-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 91.66667%;\n  }\n  .column.is-offset-11-mobile {\n    margin-left: 91.66667%;\n  }\n  .column.is-12-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 100%;\n  }\n  .column.is-offset-12-mobile {\n    margin-left: 100%;\n  }\n}\n\n@media screen and (min-width: 769px) {\n  .column.is-narrow, .column.is-narrow-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n  }\n  .column.is-full, .column.is-full-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 100%;\n  }\n  .column.is-three-quarters, .column.is-three-quarters-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 75%;\n  }\n  .column.is-two-thirds, .column.is-two-thirds-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 66.6666%;\n  }\n  .column.is-half, .column.is-half-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 50%;\n  }\n  .column.is-one-third, .column.is-one-third-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 33.3333%;\n  }\n  .column.is-one-quarter, .column.is-one-quarter-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 25%;\n  }\n  .column.is-offset-three-quarters, .column.is-offset-three-quarters-tablet {\n    margin-left: 75%;\n  }\n  .column.is-offset-two-thirds, .column.is-offset-two-thirds-tablet {\n    margin-left: 66.6666%;\n  }\n  .column.is-offset-half, .column.is-offset-half-tablet {\n    margin-left: 50%;\n  }\n  .column.is-offset-one-third, .column.is-offset-one-third-tablet {\n    margin-left: 33.3333%;\n  }\n  .column.is-offset-one-quarter, .column.is-offset-one-quarter-tablet {\n    margin-left: 25%;\n  }\n  .column.is-1, .column.is-1-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 8.33333%;\n  }\n  .column.is-offset-1, .column.is-offset-1-tablet {\n    margin-left: 8.33333%;\n  }\n  .column.is-2, .column.is-2-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 16.66667%;\n  }\n  .column.is-offset-2, .column.is-offset-2-tablet {\n    margin-left: 16.66667%;\n  }\n  .column.is-3, .column.is-3-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 25%;\n  }\n  .column.is-offset-3, .column.is-offset-3-tablet {\n    margin-left: 25%;\n  }\n  .column.is-4, .column.is-4-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 33.33333%;\n  }\n  .column.is-offset-4, .column.is-offset-4-tablet {\n    margin-left: 33.33333%;\n  }\n  .column.is-5, .column.is-5-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 41.66667%;\n  }\n  .column.is-offset-5, .column.is-offset-5-tablet {\n    margin-left: 41.66667%;\n  }\n  .column.is-6, .column.is-6-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 50%;\n  }\n  .column.is-offset-6, .column.is-offset-6-tablet {\n    margin-left: 50%;\n  }\n  .column.is-7, .column.is-7-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 58.33333%;\n  }\n  .column.is-offset-7, .column.is-offset-7-tablet {\n    margin-left: 58.33333%;\n  }\n  .column.is-8, .column.is-8-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 66.66667%;\n  }\n  .column.is-offset-8, .column.is-offset-8-tablet {\n    margin-left: 66.66667%;\n  }\n  .column.is-9, .column.is-9-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 75%;\n  }\n  .column.is-offset-9, .column.is-offset-9-tablet {\n    margin-left: 75%;\n  }\n  .column.is-10, .column.is-10-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 83.33333%;\n  }\n  .column.is-offset-10, .column.is-offset-10-tablet {\n    margin-left: 83.33333%;\n  }\n  .column.is-11, .column.is-11-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 91.66667%;\n  }\n  .column.is-offset-11, .column.is-offset-11-tablet {\n    margin-left: 91.66667%;\n  }\n  .column.is-12, .column.is-12-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 100%;\n  }\n  .column.is-offset-12, .column.is-offset-12-tablet {\n    margin-left: 100%;\n  }\n}\n\n@media screen and (min-width: 1000px) {\n  .column.is-narrow-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n  }\n  .column.is-full-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 100%;\n  }\n  .column.is-three-quarters-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 75%;\n  }\n  .column.is-two-thirds-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 66.6666%;\n  }\n  .column.is-half-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 50%;\n  }\n  .column.is-one-third-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 33.3333%;\n  }\n  .column.is-one-quarter-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 25%;\n  }\n  .column.is-offset-three-quarters-desktop {\n    margin-left: 75%;\n  }\n  .column.is-offset-two-thirds-desktop {\n    margin-left: 66.6666%;\n  }\n  .column.is-offset-half-desktop {\n    margin-left: 50%;\n  }\n  .column.is-offset-one-third-desktop {\n    margin-left: 33.3333%;\n  }\n  .column.is-offset-one-quarter-desktop {\n    margin-left: 25%;\n  }\n  .column.is-1-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 8.33333%;\n  }\n  .column.is-offset-1-desktop {\n    margin-left: 8.33333%;\n  }\n  .column.is-2-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 16.66667%;\n  }\n  .column.is-offset-2-desktop {\n    margin-left: 16.66667%;\n  }\n  .column.is-3-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 25%;\n  }\n  .column.is-offset-3-desktop {\n    margin-left: 25%;\n  }\n  .column.is-4-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 33.33333%;\n  }\n  .column.is-offset-4-desktop {\n    margin-left: 33.33333%;\n  }\n  .column.is-5-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 41.66667%;\n  }\n  .column.is-offset-5-desktop {\n    margin-left: 41.66667%;\n  }\n  .column.is-6-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 50%;\n  }\n  .column.is-offset-6-desktop {\n    margin-left: 50%;\n  }\n  .column.is-7-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 58.33333%;\n  }\n  .column.is-offset-7-desktop {\n    margin-left: 58.33333%;\n  }\n  .column.is-8-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 66.66667%;\n  }\n  .column.is-offset-8-desktop {\n    margin-left: 66.66667%;\n  }\n  .column.is-9-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 75%;\n  }\n  .column.is-offset-9-desktop {\n    margin-left: 75%;\n  }\n  .column.is-10-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 83.33333%;\n  }\n  .column.is-offset-10-desktop {\n    margin-left: 83.33333%;\n  }\n  .column.is-11-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 91.66667%;\n  }\n  .column.is-offset-11-desktop {\n    margin-left: 91.66667%;\n  }\n  .column.is-12-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 100%;\n  }\n  .column.is-offset-12-desktop {\n    margin-left: 100%;\n  }\n}\n\n@media screen and (min-width: 1192px) {\n  .column.is-narrow-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n  }\n  .column.is-full-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 100%;\n  }\n  .column.is-three-quarters-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 75%;\n  }\n  .column.is-two-thirds-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 66.6666%;\n  }\n  .column.is-half-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 50%;\n  }\n  .column.is-one-third-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 33.3333%;\n  }\n  .column.is-one-quarter-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 25%;\n  }\n  .column.is-offset-three-quarters-widescreen {\n    margin-left: 75%;\n  }\n  .column.is-offset-two-thirds-widescreen {\n    margin-left: 66.6666%;\n  }\n  .column.is-offset-half-widescreen {\n    margin-left: 50%;\n  }\n  .column.is-offset-one-third-widescreen {\n    margin-left: 33.3333%;\n  }\n  .column.is-offset-one-quarter-widescreen {\n    margin-left: 25%;\n  }\n  .column.is-1-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 8.33333%;\n  }\n  .column.is-offset-1-widescreen {\n    margin-left: 8.33333%;\n  }\n  .column.is-2-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 16.66667%;\n  }\n  .column.is-offset-2-widescreen {\n    margin-left: 16.66667%;\n  }\n  .column.is-3-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 25%;\n  }\n  .column.is-offset-3-widescreen {\n    margin-left: 25%;\n  }\n  .column.is-4-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 33.33333%;\n  }\n  .column.is-offset-4-widescreen {\n    margin-left: 33.33333%;\n  }\n  .column.is-5-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 41.66667%;\n  }\n  .column.is-offset-5-widescreen {\n    margin-left: 41.66667%;\n  }\n  .column.is-6-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 50%;\n  }\n  .column.is-offset-6-widescreen {\n    margin-left: 50%;\n  }\n  .column.is-7-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 58.33333%;\n  }\n  .column.is-offset-7-widescreen {\n    margin-left: 58.33333%;\n  }\n  .column.is-8-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 66.66667%;\n  }\n  .column.is-offset-8-widescreen {\n    margin-left: 66.66667%;\n  }\n  .column.is-9-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 75%;\n  }\n  .column.is-offset-9-widescreen {\n    margin-left: 75%;\n  }\n  .column.is-10-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 83.33333%;\n  }\n  .column.is-offset-10-widescreen {\n    margin-left: 83.33333%;\n  }\n  .column.is-11-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 91.66667%;\n  }\n  .column.is-offset-11-widescreen {\n    margin-left: 91.66667%;\n  }\n  .column.is-12-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 100%;\n  }\n  .column.is-offset-12-widescreen {\n    margin-left: 100%;\n  }\n}\n\n.columns {\n  margin-left: -0.75rem;\n  margin-right: -0.75rem;\n  margin-top: -0.75rem;\n}\n\n.columns:last-child {\n  margin-bottom: -0.75rem;\n}\n\n.columns:not(:last-child) {\n  margin-bottom: 0.75rem;\n}\n\n.columns.is-centered {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.columns.is-gapless {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n}\n\n.columns.is-gapless:last-child {\n  margin-bottom: 0;\n}\n\n.columns.is-gapless:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n\n.columns.is-gapless > .column {\n  margin: 0;\n  padding: 0;\n}\n\n@media screen and (min-width: 769px) {\n  .columns.is-grid {\n    -ms-flex-wrap: wrap;\n        flex-wrap: wrap;\n  }\n  .columns.is-grid > .column {\n    max-width: 33.3333%;\n    padding: 0.75rem;\n    width: 33.3333%;\n  }\n  .columns.is-grid > .column + .column {\n    margin-left: 0;\n  }\n}\n\n.columns.is-mobile {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.columns.is-multiline {\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n\n.columns.is-vcentered {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n\n@media screen and (min-width: 769px) {\n  .columns:not(.is-desktop) {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n  }\n}\n\n@media screen and (min-width: 1000px) {\n  .columns.is-desktop {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n  }\n}\n\n.tile {\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n  display: block;\n  -ms-flex-preferred-size: 0;\n      flex-basis: 0;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 1;\n      flex-shrink: 1;\n  min-height: -webkit-min-content;\n  min-height: -moz-min-content;\n  min-height: min-content;\n}\n\n.tile.is-ancestor {\n  margin-left: -0.75rem;\n  margin-right: -0.75rem;\n  margin-top: -0.75rem;\n}\n\n.tile.is-ancestor:last-child {\n  margin-bottom: -0.75rem;\n}\n\n.tile.is-ancestor:not(:last-child) {\n  margin-bottom: 0.75rem;\n}\n\n.tile.is-child {\n  margin: 0 !important;\n}\n\n.tile.is-parent {\n  padding: 0.75rem;\n}\n\n.tile.is-vertical {\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n\n.tile.is-vertical > .tile.is-child:not(:last-child) {\n  margin-bottom: 1.5rem !important;\n}\n\n@media screen and (min-width: 769px) {\n  .tile:not(.is-child) {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n  }\n  .tile.is-1 {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 8.33333%;\n  }\n  .tile.is-2 {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 16.66667%;\n  }\n  .tile.is-3 {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 25%;\n  }\n  .tile.is-4 {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 33.33333%;\n  }\n  .tile.is-5 {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 41.66667%;\n  }\n  .tile.is-6 {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 50%;\n  }\n  .tile.is-7 {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 58.33333%;\n  }\n  .tile.is-8 {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 66.66667%;\n  }\n  .tile.is-9 {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 75%;\n  }\n  .tile.is-10 {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 83.33333%;\n  }\n  .tile.is-11 {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 91.66667%;\n  }\n  .tile.is-12 {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 100%;\n  }\n}\n\n.hero-video {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  overflow: hidden;\n}\n\n.hero-video video {\n  left: 50%;\n  min-height: 100%;\n  min-width: 100%;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translate3d(-50%, -50%, 0);\n          transform: translate3d(-50%, -50%, 0);\n}\n\n.hero-video.is-transparent {\n  opacity: 0.3;\n}\n\n@media screen and (max-width: 768px) {\n  .hero-video {\n    display: none;\n  }\n}\n\n.hero-buttons {\n  margin-top: 1.5rem;\n}\n\n@media screen and (max-width: 768px) {\n  .hero-buttons .button {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n  }\n  .hero-buttons .button:not(:last-child) {\n    margin-bottom: 0.75rem;\n  }\n}\n\n@media screen and (min-width: 769px) {\n  .hero-buttons {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n  }\n  .hero-buttons .button:not(:last-child) {\n    margin-right: 1.5rem;\n  }\n}\n\n.hero-head,\n.hero-foot {\n  -webkit-box-flex: 0;\n      -ms-flex-positive: 0;\n          flex-grow: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n}\n\n.hero-body {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  padding: 3rem 1.5rem;\n}\n\n@media screen and (min-width: 1192px) {\n  .hero-body {\n    padding-left: 0;\n    padding-right: 0;\n  }\n}\n\n.hero {\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n  background-color: white;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n\n.hero .nav {\n  background: none;\n  box-shadow: 0 1px 0 rgba(219, 219, 219, 0.3);\n}\n\n.hero .tabs ul {\n  border-bottom: none;\n}\n\n.hero.is-white {\n  background-color: white;\n  color: #0a0a0a;\n}\n\n.hero.is-white a,\n.hero.is-white strong {\n  color: inherit;\n}\n\n.hero.is-white .title {\n  color: #0a0a0a;\n}\n\n.hero.is-white .subtitle {\n  color: rgba(10, 10, 10, 0.9);\n}\n\n.hero.is-white .subtitle a,\n.hero.is-white .subtitle strong {\n  color: #0a0a0a;\n}\n\n.hero.is-white .nav {\n  box-shadow: 0 1px 0 rgba(10, 10, 10, 0.2);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-white .nav-menu {\n    background-color: white;\n  }\n}\n\n.hero.is-white a.nav-item,\n.hero.is-white .nav-item a:not(.button) {\n  color: rgba(10, 10, 10, 0.7);\n}\n\n.hero.is-white a.nav-item:hover, .hero.is-white a.nav-item.is-active,\n.hero.is-white .nav-item a:not(.button):hover,\n.hero.is-white .nav-item a:not(.button).is-active {\n  color: #0a0a0a;\n}\n\n.hero.is-white .tabs a {\n  color: #0a0a0a;\n  opacity: 0.9;\n}\n\n.hero.is-white .tabs a:hover {\n  opacity: 1;\n}\n\n.hero.is-white .tabs li.is-active a {\n  opacity: 1;\n}\n\n.hero.is-white .tabs.is-boxed a, .hero.is-white .tabs.is-toggle a {\n  color: #0a0a0a;\n}\n\n.hero.is-white .tabs.is-boxed a:hover, .hero.is-white .tabs.is-toggle a:hover {\n  background-color: rgba(10, 10, 10, 0.1);\n}\n\n.hero.is-white .tabs.is-boxed li.is-active a, .hero.is-white .tabs.is-boxed li.is-active a:hover, .hero.is-white .tabs.is-toggle li.is-active a, .hero.is-white .tabs.is-toggle li.is-active a:hover {\n  background-color: #0a0a0a;\n  border-color: #0a0a0a;\n  color: white;\n}\n\n.hero.is-white.is-bold {\n  background-image: -webkit-linear-gradient(309deg, #e6e6e6 0%, white 71%, white 100%);\n  background-image: linear-gradient(141deg, #e6e6e6 0%, white 71%, white 100%);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-white .nav-toggle span {\n    background-color: #0a0a0a;\n  }\n  .hero.is-white .nav-toggle:hover {\n    background-color: rgba(10, 10, 10, 0.1);\n  }\n  .hero.is-white .nav-toggle.is-active span {\n    background-color: #0a0a0a;\n  }\n  .hero.is-white .nav-menu .nav-item {\n    border-top-color: rgba(10, 10, 10, 0.2);\n  }\n}\n\n.hero.is-black {\n  background-color: #0a0a0a;\n  color: white;\n}\n\n.hero.is-black a,\n.hero.is-black strong {\n  color: inherit;\n}\n\n.hero.is-black .title {\n  color: white;\n}\n\n.hero.is-black .subtitle {\n  color: rgba(255, 255, 255, 0.9);\n}\n\n.hero.is-black .subtitle a,\n.hero.is-black .subtitle strong {\n  color: white;\n}\n\n.hero.is-black .nav {\n  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-black .nav-menu {\n    background-color: #0a0a0a;\n  }\n}\n\n.hero.is-black a.nav-item,\n.hero.is-black .nav-item a:not(.button) {\n  color: rgba(255, 255, 255, 0.7);\n}\n\n.hero.is-black a.nav-item:hover, .hero.is-black a.nav-item.is-active,\n.hero.is-black .nav-item a:not(.button):hover,\n.hero.is-black .nav-item a:not(.button).is-active {\n  color: white;\n}\n\n.hero.is-black .tabs a {\n  color: white;\n  opacity: 0.9;\n}\n\n.hero.is-black .tabs a:hover {\n  opacity: 1;\n}\n\n.hero.is-black .tabs li.is-active a {\n  opacity: 1;\n}\n\n.hero.is-black .tabs.is-boxed a, .hero.is-black .tabs.is-toggle a {\n  color: white;\n}\n\n.hero.is-black .tabs.is-boxed a:hover, .hero.is-black .tabs.is-toggle a:hover {\n  background-color: rgba(10, 10, 10, 0.1);\n}\n\n.hero.is-black .tabs.is-boxed li.is-active a, .hero.is-black .tabs.is-boxed li.is-active a:hover, .hero.is-black .tabs.is-toggle li.is-active a, .hero.is-black .tabs.is-toggle li.is-active a:hover {\n  background-color: white;\n  border-color: white;\n  color: #0a0a0a;\n}\n\n.hero.is-black.is-bold {\n  background-image: -webkit-linear-gradient(309deg, black 0%, #0a0a0a 71%, #181616 100%);\n  background-image: linear-gradient(141deg, black 0%, #0a0a0a 71%, #181616 100%);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-black .nav-toggle span {\n    background-color: white;\n  }\n  .hero.is-black .nav-toggle:hover {\n    background-color: rgba(10, 10, 10, 0.1);\n  }\n  .hero.is-black .nav-toggle.is-active span {\n    background-color: white;\n  }\n  .hero.is-black .nav-menu .nav-item {\n    border-top-color: rgba(255, 255, 255, 0.2);\n  }\n}\n\n.hero.is-light {\n  background-color: whitesmoke;\n  color: #363636;\n}\n\n.hero.is-light a,\n.hero.is-light strong {\n  color: inherit;\n}\n\n.hero.is-light .title {\n  color: #363636;\n}\n\n.hero.is-light .subtitle {\n  color: rgba(54, 54, 54, 0.9);\n}\n\n.hero.is-light .subtitle a,\n.hero.is-light .subtitle strong {\n  color: #363636;\n}\n\n.hero.is-light .nav {\n  box-shadow: 0 1px 0 rgba(54, 54, 54, 0.2);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-light .nav-menu {\n    background-color: whitesmoke;\n  }\n}\n\n.hero.is-light a.nav-item,\n.hero.is-light .nav-item a:not(.button) {\n  color: rgba(54, 54, 54, 0.7);\n}\n\n.hero.is-light a.nav-item:hover, .hero.is-light a.nav-item.is-active,\n.hero.is-light .nav-item a:not(.button):hover,\n.hero.is-light .nav-item a:not(.button).is-active {\n  color: #363636;\n}\n\n.hero.is-light .tabs a {\n  color: #363636;\n  opacity: 0.9;\n}\n\n.hero.is-light .tabs a:hover {\n  opacity: 1;\n}\n\n.hero.is-light .tabs li.is-active a {\n  opacity: 1;\n}\n\n.hero.is-light .tabs.is-boxed a, .hero.is-light .tabs.is-toggle a {\n  color: #363636;\n}\n\n.hero.is-light .tabs.is-boxed a:hover, .hero.is-light .tabs.is-toggle a:hover {\n  background-color: rgba(10, 10, 10, 0.1);\n}\n\n.hero.is-light .tabs.is-boxed li.is-active a, .hero.is-light .tabs.is-boxed li.is-active a:hover, .hero.is-light .tabs.is-toggle li.is-active a, .hero.is-light .tabs.is-toggle li.is-active a:hover {\n  background-color: #363636;\n  border-color: #363636;\n  color: whitesmoke;\n}\n\n.hero.is-light.is-bold {\n  background-image: -webkit-linear-gradient(309deg, #dfd8d8 0%, whitesmoke 71%, white 100%);\n  background-image: linear-gradient(141deg, #dfd8d8 0%, whitesmoke 71%, white 100%);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-light .nav-toggle span {\n    background-color: #363636;\n  }\n  .hero.is-light .nav-toggle:hover {\n    background-color: rgba(10, 10, 10, 0.1);\n  }\n  .hero.is-light .nav-toggle.is-active span {\n    background-color: #363636;\n  }\n  .hero.is-light .nav-menu .nav-item {\n    border-top-color: rgba(54, 54, 54, 0.2);\n  }\n}\n\n.hero.is-dark {\n  background-color: #363636;\n  color: whitesmoke;\n}\n\n.hero.is-dark a,\n.hero.is-dark strong {\n  color: inherit;\n}\n\n.hero.is-dark .title {\n  color: whitesmoke;\n}\n\n.hero.is-dark .subtitle {\n  color: rgba(245, 245, 245, 0.9);\n}\n\n.hero.is-dark .subtitle a,\n.hero.is-dark .subtitle strong {\n  color: whitesmoke;\n}\n\n.hero.is-dark .nav {\n  box-shadow: 0 1px 0 rgba(245, 245, 245, 0.2);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-dark .nav-menu {\n    background-color: #363636;\n  }\n}\n\n.hero.is-dark a.nav-item,\n.hero.is-dark .nav-item a:not(.button) {\n  color: rgba(245, 245, 245, 0.7);\n}\n\n.hero.is-dark a.nav-item:hover, .hero.is-dark a.nav-item.is-active,\n.hero.is-dark .nav-item a:not(.button):hover,\n.hero.is-dark .nav-item a:not(.button).is-active {\n  color: whitesmoke;\n}\n\n.hero.is-dark .tabs a {\n  color: whitesmoke;\n  opacity: 0.9;\n}\n\n.hero.is-dark .tabs a:hover {\n  opacity: 1;\n}\n\n.hero.is-dark .tabs li.is-active a {\n  opacity: 1;\n}\n\n.hero.is-dark .tabs.is-boxed a, .hero.is-dark .tabs.is-toggle a {\n  color: whitesmoke;\n}\n\n.hero.is-dark .tabs.is-boxed a:hover, .hero.is-dark .tabs.is-toggle a:hover {\n  background-color: rgba(10, 10, 10, 0.1);\n}\n\n.hero.is-dark .tabs.is-boxed li.is-active a, .hero.is-dark .tabs.is-boxed li.is-active a:hover, .hero.is-dark .tabs.is-toggle li.is-active a, .hero.is-dark .tabs.is-toggle li.is-active a:hover {\n  background-color: whitesmoke;\n  border-color: whitesmoke;\n  color: #363636;\n}\n\n.hero.is-dark.is-bold {\n  background-image: -webkit-linear-gradient(309deg, #1f1919 0%, #363636 71%, #463f3f 100%);\n  background-image: linear-gradient(141deg, #1f1919 0%, #363636 71%, #463f3f 100%);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-dark .nav-toggle span {\n    background-color: whitesmoke;\n  }\n  .hero.is-dark .nav-toggle:hover {\n    background-color: rgba(10, 10, 10, 0.1);\n  }\n  .hero.is-dark .nav-toggle.is-active span {\n    background-color: whitesmoke;\n  }\n  .hero.is-dark .nav-menu .nav-item {\n    border-top-color: rgba(245, 245, 245, 0.2);\n  }\n}\n\n.hero.is-primary {\n  background-color: #00d1b2;\n  color: #fff;\n}\n\n.hero.is-primary a,\n.hero.is-primary strong {\n  color: inherit;\n}\n\n.hero.is-primary .title {\n  color: #fff;\n}\n\n.hero.is-primary .subtitle {\n  color: rgba(255, 255, 255, 0.9);\n}\n\n.hero.is-primary .subtitle a,\n.hero.is-primary .subtitle strong {\n  color: #fff;\n}\n\n.hero.is-primary .nav {\n  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-primary .nav-menu {\n    background-color: #00d1b2;\n  }\n}\n\n.hero.is-primary a.nav-item,\n.hero.is-primary .nav-item a:not(.button) {\n  color: rgba(255, 255, 255, 0.7);\n}\n\n.hero.is-primary a.nav-item:hover, .hero.is-primary a.nav-item.is-active,\n.hero.is-primary .nav-item a:not(.button):hover,\n.hero.is-primary .nav-item a:not(.button).is-active {\n  color: #fff;\n}\n\n.hero.is-primary .tabs a {\n  color: #fff;\n  opacity: 0.9;\n}\n\n.hero.is-primary .tabs a:hover {\n  opacity: 1;\n}\n\n.hero.is-primary .tabs li.is-active a {\n  opacity: 1;\n}\n\n.hero.is-primary .tabs.is-boxed a, .hero.is-primary .tabs.is-toggle a {\n  color: #fff;\n}\n\n.hero.is-primary .tabs.is-boxed a:hover, .hero.is-primary .tabs.is-toggle a:hover {\n  background-color: rgba(10, 10, 10, 0.1);\n}\n\n.hero.is-primary .tabs.is-boxed li.is-active a, .hero.is-primary .tabs.is-boxed li.is-active a:hover, .hero.is-primary .tabs.is-toggle li.is-active a, .hero.is-primary .tabs.is-toggle li.is-active a:hover {\n  background-color: #fff;\n  border-color: #fff;\n  color: #00d1b2;\n}\n\n.hero.is-primary.is-bold {\n  background-image: -webkit-linear-gradient(309deg, #009e6c 0%, #00d1b2 71%, #00e7eb 100%);\n  background-image: linear-gradient(141deg, #009e6c 0%, #00d1b2 71%, #00e7eb 100%);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-primary .nav-toggle span {\n    background-color: #fff;\n  }\n  .hero.is-primary .nav-toggle:hover {\n    background-color: rgba(10, 10, 10, 0.1);\n  }\n  .hero.is-primary .nav-toggle.is-active span {\n    background-color: #fff;\n  }\n  .hero.is-primary .nav-menu .nav-item {\n    border-top-color: rgba(255, 255, 255, 0.2);\n  }\n}\n\n.hero.is-info {\n  background-color: #3273dc;\n  color: #fff;\n}\n\n.hero.is-info a,\n.hero.is-info strong {\n  color: inherit;\n}\n\n.hero.is-info .title {\n  color: #fff;\n}\n\n.hero.is-info .subtitle {\n  color: rgba(255, 255, 255, 0.9);\n}\n\n.hero.is-info .subtitle a,\n.hero.is-info .subtitle strong {\n  color: #fff;\n}\n\n.hero.is-info .nav {\n  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-info .nav-menu {\n    background-color: #3273dc;\n  }\n}\n\n.hero.is-info a.nav-item,\n.hero.is-info .nav-item a:not(.button) {\n  color: rgba(255, 255, 255, 0.7);\n}\n\n.hero.is-info a.nav-item:hover, .hero.is-info a.nav-item.is-active,\n.hero.is-info .nav-item a:not(.button):hover,\n.hero.is-info .nav-item a:not(.button).is-active {\n  color: #fff;\n}\n\n.hero.is-info .tabs a {\n  color: #fff;\n  opacity: 0.9;\n}\n\n.hero.is-info .tabs a:hover {\n  opacity: 1;\n}\n\n.hero.is-info .tabs li.is-active a {\n  opacity: 1;\n}\n\n.hero.is-info .tabs.is-boxed a, .hero.is-info .tabs.is-toggle a {\n  color: #fff;\n}\n\n.hero.is-info .tabs.is-boxed a:hover, .hero.is-info .tabs.is-toggle a:hover {\n  background-color: rgba(10, 10, 10, 0.1);\n}\n\n.hero.is-info .tabs.is-boxed li.is-active a, .hero.is-info .tabs.is-boxed li.is-active a:hover, .hero.is-info .tabs.is-toggle li.is-active a, .hero.is-info .tabs.is-toggle li.is-active a:hover {\n  background-color: #fff;\n  border-color: #fff;\n  color: #3273dc;\n}\n\n.hero.is-info.is-bold {\n  background-image: -webkit-linear-gradient(309deg, #1577c6 0%, #3273dc 71%, #4366e5 100%);\n  background-image: linear-gradient(141deg, #1577c6 0%, #3273dc 71%, #4366e5 100%);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-info .nav-toggle span {\n    background-color: #fff;\n  }\n  .hero.is-info .nav-toggle:hover {\n    background-color: rgba(10, 10, 10, 0.1);\n  }\n  .hero.is-info .nav-toggle.is-active span {\n    background-color: #fff;\n  }\n  .hero.is-info .nav-menu .nav-item {\n    border-top-color: rgba(255, 255, 255, 0.2);\n  }\n}\n\n.hero.is-success {\n  background-color: #23d160;\n  color: #fff;\n}\n\n.hero.is-success a,\n.hero.is-success strong {\n  color: inherit;\n}\n\n.hero.is-success .title {\n  color: #fff;\n}\n\n.hero.is-success .subtitle {\n  color: rgba(255, 255, 255, 0.9);\n}\n\n.hero.is-success .subtitle a,\n.hero.is-success .subtitle strong {\n  color: #fff;\n}\n\n.hero.is-success .nav {\n  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-success .nav-menu {\n    background-color: #23d160;\n  }\n}\n\n.hero.is-success a.nav-item,\n.hero.is-success .nav-item a:not(.button) {\n  color: rgba(255, 255, 255, 0.7);\n}\n\n.hero.is-success a.nav-item:hover, .hero.is-success a.nav-item.is-active,\n.hero.is-success .nav-item a:not(.button):hover,\n.hero.is-success .nav-item a:not(.button).is-active {\n  color: #fff;\n}\n\n.hero.is-success .tabs a {\n  color: #fff;\n  opacity: 0.9;\n}\n\n.hero.is-success .tabs a:hover {\n  opacity: 1;\n}\n\n.hero.is-success .tabs li.is-active a {\n  opacity: 1;\n}\n\n.hero.is-success .tabs.is-boxed a, .hero.is-success .tabs.is-toggle a {\n  color: #fff;\n}\n\n.hero.is-success .tabs.is-boxed a:hover, .hero.is-success .tabs.is-toggle a:hover {\n  background-color: rgba(10, 10, 10, 0.1);\n}\n\n.hero.is-success .tabs.is-boxed li.is-active a, .hero.is-success .tabs.is-boxed li.is-active a:hover, .hero.is-success .tabs.is-toggle li.is-active a, .hero.is-success .tabs.is-toggle li.is-active a:hover {\n  background-color: #fff;\n  border-color: #fff;\n  color: #23d160;\n}\n\n.hero.is-success.is-bold {\n  background-image: -webkit-linear-gradient(309deg, #12af2f 0%, #23d160 71%, #2ce28a 100%);\n  background-image: linear-gradient(141deg, #12af2f 0%, #23d160 71%, #2ce28a 100%);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-success .nav-toggle span {\n    background-color: #fff;\n  }\n  .hero.is-success .nav-toggle:hover {\n    background-color: rgba(10, 10, 10, 0.1);\n  }\n  .hero.is-success .nav-toggle.is-active span {\n    background-color: #fff;\n  }\n  .hero.is-success .nav-menu .nav-item {\n    border-top-color: rgba(255, 255, 255, 0.2);\n  }\n}\n\n.hero.is-warning {\n  background-color: #ffdd57;\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.hero.is-warning a,\n.hero.is-warning strong {\n  color: inherit;\n}\n\n.hero.is-warning .title {\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.hero.is-warning .subtitle {\n  color: rgba(0, 0, 0, 0.9);\n}\n\n.hero.is-warning .subtitle a,\n.hero.is-warning .subtitle strong {\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.hero.is-warning .nav {\n  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-warning .nav-menu {\n    background-color: #ffdd57;\n  }\n}\n\n.hero.is-warning a.nav-item,\n.hero.is-warning .nav-item a:not(.button) {\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.hero.is-warning a.nav-item:hover, .hero.is-warning a.nav-item.is-active,\n.hero.is-warning .nav-item a:not(.button):hover,\n.hero.is-warning .nav-item a:not(.button).is-active {\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.hero.is-warning .tabs a {\n  color: rgba(0, 0, 0, 0.7);\n  opacity: 0.9;\n}\n\n.hero.is-warning .tabs a:hover {\n  opacity: 1;\n}\n\n.hero.is-warning .tabs li.is-active a {\n  opacity: 1;\n}\n\n.hero.is-warning .tabs.is-boxed a, .hero.is-warning .tabs.is-toggle a {\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.hero.is-warning .tabs.is-boxed a:hover, .hero.is-warning .tabs.is-toggle a:hover {\n  background-color: rgba(10, 10, 10, 0.1);\n}\n\n.hero.is-warning .tabs.is-boxed li.is-active a, .hero.is-warning .tabs.is-boxed li.is-active a:hover, .hero.is-warning .tabs.is-toggle li.is-active a, .hero.is-warning .tabs.is-toggle li.is-active a:hover {\n  background-color: rgba(0, 0, 0, 0.7);\n  border-color: rgba(0, 0, 0, 0.7);\n  color: #ffdd57;\n}\n\n.hero.is-warning.is-bold {\n  background-image: -webkit-linear-gradient(309deg, #ffaf24 0%, #ffdd57 71%, #fffa70 100%);\n  background-image: linear-gradient(141deg, #ffaf24 0%, #ffdd57 71%, #fffa70 100%);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-warning .nav-toggle span {\n    background-color: rgba(0, 0, 0, 0.7);\n  }\n  .hero.is-warning .nav-toggle:hover {\n    background-color: rgba(10, 10, 10, 0.1);\n  }\n  .hero.is-warning .nav-toggle.is-active span {\n    background-color: rgba(0, 0, 0, 0.7);\n  }\n  .hero.is-warning .nav-menu .nav-item {\n    border-top-color: rgba(0, 0, 0, 0.2);\n  }\n}\n\n.hero.is-danger {\n  background-color: #ff3860;\n  color: #fff;\n}\n\n.hero.is-danger a,\n.hero.is-danger strong {\n  color: inherit;\n}\n\n.hero.is-danger .title {\n  color: #fff;\n}\n\n.hero.is-danger .subtitle {\n  color: rgba(255, 255, 255, 0.9);\n}\n\n.hero.is-danger .subtitle a,\n.hero.is-danger .subtitle strong {\n  color: #fff;\n}\n\n.hero.is-danger .nav {\n  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-danger .nav-menu {\n    background-color: #ff3860;\n  }\n}\n\n.hero.is-danger a.nav-item,\n.hero.is-danger .nav-item a:not(.button) {\n  color: rgba(255, 255, 255, 0.7);\n}\n\n.hero.is-danger a.nav-item:hover, .hero.is-danger a.nav-item.is-active,\n.hero.is-danger .nav-item a:not(.button):hover,\n.hero.is-danger .nav-item a:not(.button).is-active {\n  color: #fff;\n}\n\n.hero.is-danger .tabs a {\n  color: #fff;\n  opacity: 0.9;\n}\n\n.hero.is-danger .tabs a:hover {\n  opacity: 1;\n}\n\n.hero.is-danger .tabs li.is-active a {\n  opacity: 1;\n}\n\n.hero.is-danger .tabs.is-boxed a, .hero.is-danger .tabs.is-toggle a {\n  color: #fff;\n}\n\n.hero.is-danger .tabs.is-boxed a:hover, .hero.is-danger .tabs.is-toggle a:hover {\n  background-color: rgba(10, 10, 10, 0.1);\n}\n\n.hero.is-danger .tabs.is-boxed li.is-active a, .hero.is-danger .tabs.is-boxed li.is-active a:hover, .hero.is-danger .tabs.is-toggle li.is-active a, .hero.is-danger .tabs.is-toggle li.is-active a:hover {\n  background-color: #fff;\n  border-color: #fff;\n  color: #ff3860;\n}\n\n.hero.is-danger.is-bold {\n  background-image: -webkit-linear-gradient(309deg, #ff0561 0%, #ff3860 71%, #ff5257 100%);\n  background-image: linear-gradient(141deg, #ff0561 0%, #ff3860 71%, #ff5257 100%);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-danger .nav-toggle span {\n    background-color: #fff;\n  }\n  .hero.is-danger .nav-toggle:hover {\n    background-color: rgba(10, 10, 10, 0.1);\n  }\n  .hero.is-danger .nav-toggle.is-active span {\n    background-color: #fff;\n  }\n  .hero.is-danger .nav-menu .nav-item {\n    border-top-color: rgba(255, 255, 255, 0.2);\n  }\n}\n\n@media screen and (min-width: 769px) {\n  .hero.is-medium .hero-body {\n    padding-bottom: 9rem;\n    padding-top: 9rem;\n  }\n}\n\n@media screen and (min-width: 769px) {\n  .hero.is-large .hero-body {\n    padding-bottom: 18rem;\n    padding-top: 18rem;\n  }\n}\n\n.hero.is-fullheight {\n  min-height: 100vh;\n}\n\n.hero.is-fullheight .hero-body {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.hero.is-fullheight .hero-body > .container {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 1;\n      flex-shrink: 1;\n}\n\n.section {\n  background-color: white;\n  padding: 3rem 1.5rem;\n}\n\n@media screen and (min-width: 1000px) {\n  .section.is-medium {\n    padding: 9rem 1.5rem;\n  }\n  .section.is-large {\n    padding: 18rem 1.5rem;\n  }\n}\n\n.footer {\n  background-color: whitesmoke;\n  padding: 3rem 1.5rem 6rem;\n}\n/*# sourceMappingURL=bulma.css.map */', "" ]);
}, function(n, e, t) {
    e = n.exports = t(51)(), e.push([ n.i, ":root {\r\n    --primary-color: hsl(171, 100%, 41%);\r\n    --info-color: hsl(217, 71%, 53%);\r\n    --success-color: hsl(141, 71%, 48%);\r\n    --warning-color: hsl(48, 100%, 67%);\r\n    --danger-color: hsl(348, 100%, 61%);\r\n    --default-color: hsl(0, 0%, 4%);\r\n    --nocolor: #fff;\r\n}\r\n\r\n\r\n@font-face {\r\n    font-family: 'anaander';\r\n    src: url(" + t(182) + ") format('woff2'),\r\n         url(" + t(181) + ") format('woff');\r\n    font-weight: normal;\r\n    font-style: normal;\r\n}\r\n\r\n@keyframes highlighting {\r\n\t0% {\r\n    \toutline-color: black;\r\n        box-shadow: 0 0 0 1px white;\r\n    }\r\n\t50% {\r\n    \toutline-color: white;\r\n        box-shadow: 0 0 0 1px black;\r\n    }\r\n\t100% {\r\n    \toutline-color: black;\r\n        box-shadow: 0 0 0 1px white;\r\n    }\r\n}\r\n\r\n@keyframes jello-vertical {\r\n  0% {\r\n    transform: scale(1, 1);\r\n  }\r\n  30% {\r\n    transform: scale(1.07, 1.07);\r\n  }\r\n  40% {\r\n    transform: scale(0.96, 1.2);\r\n  }\r\n  50% {\r\n    transform: scale(1.2, 0.96);\r\n  }\r\n  65% {\r\n    transform: scale(1, 1.13);\r\n  }\r\n  80% {\r\n    transform: scale(1.09, 1.05);\r\n  }\r\n  90% {\r\n    transform: scale(1.05, 1.09);\r\n  }\r\n  100% {\r\n    transform: scale(1.07, 1.07);\r\n  }\r\n}\r\n\r\n.is-primary {\r\n    color: var(--primary-color);\r\n}\r\n\r\n.is-info {\r\n    color: var(--info-color);\r\n}\r\n\r\n.is-success {\r\n    color: var(--success-color);\r\n}\r\n\r\n.is-warning {\r\n    color: var(--warning-color);\r\n}\r\n\r\n.is-danger {\r\n    color: var(--danger-color);\r\n}\r\n\r\n.is-default {\r\n    color: var(--default-color);\r\n}\r\n\r\n.is-nocolor {\r\n    color: var(--nocolor);\r\n}\r\n\r\n.board {\r\n    position: fixed;\r\n    box-sizing: border-box;\r\n}\r\n\r\n#board {\r\n    transition-property: top, left, color, opacity, transform;\r\n    transition-duration: 0.3s, 0.3s, 0.3s, 0.3s, 0.3s;\r\n    transition-timing-function: ease-out;\r\n}\r\n\r\n.terrain {\r\n    position: absolute;\r\n    width: 43px;\r\n    height: 43px;\r\n    transition-property: color, background-color, border-color;\r\n    transition-duration: 0.6s, 0.6s, 0.6s;\r\n    transition-timing-function: ease-out;\r\n}\r\n\r\n.terrain.is-primary {\r\n    background-color: var(--primary-color);\r\n}\r\n\r\n.terrain.is-info {\r\n    background-color: var(--info-color);\r\n}\r\n\r\n.terrain.is-success {\r\n    background-color: var(--success-color);\r\n}\r\n\r\n.terrain.is-warning {\r\n    background-color: var(--warning-color);\r\n}\r\n\r\n.terrain.is-danger {\r\n    background-color: var(--danger-color);\r\n}\r\n\r\n.terrain.is-default {\r\n    background-color: var(--default-color);\r\n}\r\n\r\n.terrain.is-nocolor {\r\n    background-color: var(--nocolor);\r\n}\r\n\r\n.terrain:hover {\r\n    outline: black dashed thin;\r\n}\r\n\r\n.selected {\r\n    outline: black dashed thin;\r\n    animation: highlighting 1s linear infinite;\r\n}\r\n\r\n.meeple {\r\n    position: absolute;\r\n    transition-property: top, left, color, opacity, transform;\r\n    transition-duration: 0.3s, 0.3s, 0.3s, 0.3s, 0.3s;\r\n    transition-timing-function: ease-out;\r\n}\r\n\r\n.meeple-stats {\r\n    display: inline-block;\r\n    font-size: 0.75rem;\r\n}\r\n\r\n.player {\r\n    position: relative;\r\n    transition-property: top, left, color, opacity, transform;\r\n    transition-duration: 0.3s, 0.3s, 0.3s, 0.3s, 0.3s;\r\n    transition-timing-function: ease-in;\r\n}\r\n\r\n.current-player {\r\n    animation: jello-vertical 0.5s both;\r\n}\r\n\r\n.artifact {\r\n    font-family: anaander;\r\n    font-size: 24px;\r\n    color: grey;\r\n}\r\n\r\n.building {\r\n    font-family: anaander;\r\n    font-size: 24px;\r\n}\r\n\r\n.player-info>.button {\r\n    float: right;\r\n}\r\n", "" ]);
}, function(n, e, t) {
    "use strict";
    function o(n) {
        return n.replace(i, function(n, e) {
            return e.toUpperCase();
        });
    }
    var i = /-(.)/g;
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        return i(n.replace(r, "ms-"));
    }
    var i = t(94), r = /^-ms-/;
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n, e) {
        return !(!n || !e) && (n === e || !i(n) && (i(e) ? o(n, e.parentNode) : "contains" in n ? n.contains(e) : !!n.compareDocumentPosition && !!(16 & n.compareDocumentPosition(e))));
    }
    var i = t(104);
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        var e = n.length;
        if ((Array.isArray(n) || "object" != typeof n && "function" != typeof n) && a(!1), 
        "number" != typeof e && a(!1), 0 === e || e - 1 in n || a(!1), "function" == typeof n.callee && a(!1), 
        n.hasOwnProperty) try {
            return Array.prototype.slice.call(n);
        } catch (n) {}
        for (var t = Array(e), o = 0; o < e; o++) t[o] = n[o];
        return t;
    }
    function i(n) {
        return !!n && ("object" == typeof n || "function" == typeof n) && "length" in n && !("setInterval" in n) && "number" != typeof n.nodeType && (Array.isArray(n) || "callee" in n || "item" in n);
    }
    function r(n) {
        return i(n) ? Array.isArray(n) ? n.slice() : o(n) : [ n ];
    }
    var a = t(0);
    n.exports = r;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        var e = n.match(u);
        return e && e[1].toLowerCase();
    }
    function i(n, e) {
        var t = c;
        c || l(!1);
        var i = o(n), r = i && s(i);
        if (r) {
            t.innerHTML = r[1] + n + r[2];
            for (var u = r[0]; u--; ) t = t.lastChild;
        } else t.innerHTML = n;
        var d = t.getElementsByTagName("script");
        d.length && (e || l(!1), a(d).forEach(e));
        for (var p = Array.from(t.childNodes); t.lastChild; ) t.removeChild(t.lastChild);
        return p;
    }
    var r = t(5), a = t(97), s = t(99), l = t(0), c = r.canUseDOM ? document.createElement("div") : null, u = /^\s*<(\w+)/;
    n.exports = i;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        return a || r(!1), p.hasOwnProperty(n) || (n = "*"), s.hasOwnProperty(n) || (a.innerHTML = "*" === n ? "<link />" : "<" + n + "></" + n + ">", 
        s[n] = !a.firstChild), s[n] ? p[n] : null;
    }
    var i = t(5), r = t(0), a = i.canUseDOM ? document.createElement("div") : null, s = {}, l = [ 1, '<select multiple="true">', "</select>" ], c = [ 1, "<table>", "</table>" ], u = [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ], d = [ 1, '<svg xmlns="http://www.w3.org/2000/svg">', "</svg>" ], p = {
        "*": [ 1, "?<div>", "</div>" ],
        area: [ 1, "<map>", "</map>" ],
        col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
        legend: [ 1, "<fieldset>", "</fieldset>" ],
        param: [ 1, "<object>", "</object>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        optgroup: l,
        option: l,
        caption: c,
        colgroup: c,
        tbody: c,
        tfoot: c,
        thead: c,
        td: u,
        th: u
    };
    [ "circle", "clipPath", "defs", "ellipse", "g", "image", "line", "linearGradient", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "text", "tspan" ].forEach(function(n) {
        p[n] = d, s[n] = !0;
    }), n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        return n === window ? {
            x: window.pageXOffset || document.documentElement.scrollLeft,
            y: window.pageYOffset || document.documentElement.scrollTop
        } : {
            x: n.scrollLeft,
            y: n.scrollTop
        };
    }
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        return n.replace(i, "-$1").toLowerCase();
    }
    var i = /([A-Z])/g;
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        return i(n).replace(r, "-ms-");
    }
    var i = t(101), r = /^ms-/;
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        return !(!n || !("function" == typeof Node ? n instanceof Node : "object" == typeof n && "number" == typeof n.nodeType && "string" == typeof n.nodeName));
    }
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        return i(n) && 3 == n.nodeType;
    }
    var i = t(103);
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        var e = {};
        return function(t) {
            return e.hasOwnProperty(t) || (e[t] = n.call(this, t)), e[t];
        };
    }
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    var o = {
        Properties: {
            "aria-current": 0,
            "aria-details": 0,
            "aria-disabled": 0,
            "aria-hidden": 0,
            "aria-invalid": 0,
            "aria-keyshortcuts": 0,
            "aria-label": 0,
            "aria-roledescription": 0,
            "aria-autocomplete": 0,
            "aria-checked": 0,
            "aria-expanded": 0,
            "aria-haspopup": 0,
            "aria-level": 0,
            "aria-modal": 0,
            "aria-multiline": 0,
            "aria-multiselectable": 0,
            "aria-orientation": 0,
            "aria-placeholder": 0,
            "aria-pressed": 0,
            "aria-readonly": 0,
            "aria-required": 0,
            "aria-selected": 0,
            "aria-sort": 0,
            "aria-valuemax": 0,
            "aria-valuemin": 0,
            "aria-valuenow": 0,
            "aria-valuetext": 0,
            "aria-atomic": 0,
            "aria-busy": 0,
            "aria-live": 0,
            "aria-relevant": 0,
            "aria-dropeffect": 0,
            "aria-grabbed": 0,
            "aria-activedescendant": 0,
            "aria-colcount": 0,
            "aria-colindex": 0,
            "aria-colspan": 0,
            "aria-controls": 0,
            "aria-describedby": 0,
            "aria-errormessage": 0,
            "aria-flowto": 0,
            "aria-labelledby": 0,
            "aria-owns": 0,
            "aria-posinset": 0,
            "aria-rowcount": 0,
            "aria-rowindex": 0,
            "aria-rowspan": 0,
            "aria-setsize": 0
        },
        DOMAttributeNames: {},
        DOMPropertyNames: {}
    };
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    var o = t(4), i = t(53), r = {
        focusDOMComponent: function() {
            i(o.getNodeFromInstance(this));
        }
    };
    n.exports = r;
}, function(n, e, t) {
    "use strict";
    function o() {
        var n = window.opera;
        return "object" == typeof n && "function" == typeof n.version && parseInt(n.version(), 10) <= 12;
    }
    function i(n) {
        return (n.ctrlKey || n.altKey || n.metaKey) && !(n.ctrlKey && n.altKey);
    }
    function r(n) {
        switch (n) {
          case "topCompositionStart":
            return _.compositionStart;

          case "topCompositionEnd":
            return _.compositionEnd;

          case "topCompositionUpdate":
            return _.compositionUpdate;
        }
    }
    function a(n, e) {
        return "topKeyDown" === n && e.keyCode === v;
    }
    function s(n, e) {
        switch (n) {
          case "topKeyUp":
            return -1 !== x.indexOf(e.keyCode);

          case "topKeyDown":
            return e.keyCode !== v;

          case "topKeyPress":
          case "topMouseDown":
          case "topBlur":
            return !0;

          default:
            return !1;
        }
    }
    function l(n) {
        var e = n.detail;
        return "object" == typeof e && "data" in e ? e.data : null;
    }
    function c(n, e, t, o) {
        var i, c;
        if (y ? i = r(n) : N ? s(n, t) && (i = _.compositionEnd) : a(n, t) && (i = _.compositionStart), 
        !i) return null;
        A && (N || i !== _.compositionStart ? i === _.compositionEnd && N && (c = N.getData()) : N = h.getPooled(o));
        var u = b.getPooled(i, e, t, o);
        if (c) u.data = c; else {
            var d = l(t);
            null !== d && (u.data = d);
        }
        return f.accumulateTwoPhaseDispatches(u), u;
    }
    function u(n, e) {
        switch (n) {
          case "topCompositionEnd":
            return l(e);

          case "topKeyPress":
            return e.which !== E ? null : (M = !0, C);

          case "topTextInput":
            var t = e.data;
            return t === C && M ? null : t;

          default:
            return null;
        }
    }
    function d(n, e) {
        if (N) {
            if ("topCompositionEnd" === n || !y && s(n, e)) {
                var t = N.getData();
                return h.release(N), N = null, t;
            }
            return null;
        }
        switch (n) {
          case "topPaste":
            return null;

          case "topKeyPress":
            return e.which && !i(e) ? String.fromCharCode(e.which) : null;

          case "topCompositionEnd":
            return A ? null : e.data;

          default:
            return null;
        }
    }
    function p(n, e, t, o) {
        var i;
        if (!(i = k ? u(n, t) : d(n, t))) return null;
        var r = g.getPooled(_.beforeInput, e, t, o);
        return r.data = i, f.accumulateTwoPhaseDispatches(r), r;
    }
    var f = t(22), m = t(5), h = t(114), b = t(151), g = t(154), x = [ 9, 13, 27, 32 ], v = 229, y = m.canUseDOM && "CompositionEvent" in window, w = null;
    m.canUseDOM && "documentMode" in document && (w = document.documentMode);
    var k = m.canUseDOM && "TextEvent" in window && !w && !o(), A = m.canUseDOM && (!y || w && w > 8 && w <= 11), E = 32, C = String.fromCharCode(E), _ = {
        beforeInput: {
            phasedRegistrationNames: {
                bubbled: "onBeforeInput",
                captured: "onBeforeInputCapture"
            },
            dependencies: [ "topCompositionEnd", "topKeyPress", "topTextInput", "topPaste" ]
        },
        compositionEnd: {
            phasedRegistrationNames: {
                bubbled: "onCompositionEnd",
                captured: "onCompositionEndCapture"
            },
            dependencies: [ "topBlur", "topCompositionEnd", "topKeyDown", "topKeyPress", "topKeyUp", "topMouseDown" ]
        },
        compositionStart: {
            phasedRegistrationNames: {
                bubbled: "onCompositionStart",
                captured: "onCompositionStartCapture"
            },
            dependencies: [ "topBlur", "topCompositionStart", "topKeyDown", "topKeyPress", "topKeyUp", "topMouseDown" ]
        },
        compositionUpdate: {
            phasedRegistrationNames: {
                bubbled: "onCompositionUpdate",
                captured: "onCompositionUpdateCapture"
            },
            dependencies: [ "topBlur", "topCompositionUpdate", "topKeyDown", "topKeyPress", "topKeyUp", "topMouseDown" ]
        }
    }, M = !1, N = null, S = {
        eventTypes: _,
        extractEvents: function(n, e, t, o) {
            return [ c(n, e, t, o), p(n, e, t, o) ];
        }
    };
    n.exports = S;
}, function(n, e, t) {
    "use strict";
    var o = t(56), i = t(5), r = (t(7), t(95), t(160)), a = t(102), s = t(105), l = (t(1), 
    s(function(n) {
        return a(n);
    })), c = !1, u = "cssFloat";
    if (i.canUseDOM) {
        var d = document.createElement("div").style;
        try {
            d.font = "";
        } catch (n) {
            c = !0;
        }
        void 0 === document.documentElement.style.cssFloat && (u = "styleFloat");
    }
    var p = {
        createMarkupForStyles: function(n, e) {
            var t = "";
            for (var o in n) if (n.hasOwnProperty(o)) {
                var i = n[o];
                null != i && (t += l(o) + ":", t += r(o, i, e) + ";");
            }
            return t || null;
        },
        setValueForStyles: function(n, e, t) {
            var i = n.style;
            for (var a in e) if (e.hasOwnProperty(a)) {
                var s = r(a, e[a], t);
                if ("float" !== a && "cssFloat" !== a || (a = u), s) i[a] = s; else {
                    var l = c && o.shorthandPropertyExpansions[a];
                    if (l) for (var d in l) i[d] = ""; else i[a] = "";
                }
            }
        }
    };
    n.exports = p;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        var e = n.nodeName && n.nodeName.toLowerCase();
        return "select" === e || "input" === e && "file" === n.type;
    }
    function i(n) {
        var e = A.getPooled(M.change, S, n, E(n));
        v.accumulateTwoPhaseDispatches(e), k.batchedUpdates(r, e);
    }
    function r(n) {
        x.enqueueEvents(n), x.processEventQueue(!1);
    }
    function a(n, e) {
        N = n, S = e, N.attachEvent("onchange", i);
    }
    function s() {
        N && (N.detachEvent("onchange", i), N = null, S = null);
    }
    function l(n, e) {
        if ("topChange" === n) return e;
    }
    function c(n, e, t) {
        "topFocus" === n ? (s(), a(e, t)) : "topBlur" === n && s();
    }
    function u(n, e) {
        N = n, S = e, T = n.value, P = Object.getOwnPropertyDescriptor(n.constructor.prototype, "value"), 
        Object.defineProperty(N, "value", R), N.attachEvent ? N.attachEvent("onpropertychange", p) : N.addEventListener("propertychange", p, !1);
    }
    function d() {
        N && (delete N.value, N.detachEvent ? N.detachEvent("onpropertychange", p) : N.removeEventListener("propertychange", p, !1), 
        N = null, S = null, T = null, P = null);
    }
    function p(n) {
        if ("value" === n.propertyName) {
            var e = n.srcElement.value;
            e !== T && (T = e, i(n));
        }
    }
    function f(n, e) {
        if ("topInput" === n) return e;
    }
    function m(n, e, t) {
        "topFocus" === n ? (d(), u(e, t)) : "topBlur" === n && d();
    }
    function h(n, e) {
        if (("topSelectionChange" === n || "topKeyUp" === n || "topKeyDown" === n) && N && N.value !== T) return T = N.value, 
        S;
    }
    function b(n) {
        return n.nodeName && "input" === n.nodeName.toLowerCase() && ("checkbox" === n.type || "radio" === n.type);
    }
    function g(n, e) {
        if ("topClick" === n) return e;
    }
    var x = t(21), v = t(22), y = t(5), w = t(4), k = t(9), A = t(10), E = t(43), C = t(44), _ = t(73), M = {
        change: {
            phasedRegistrationNames: {
                bubbled: "onChange",
                captured: "onChangeCapture"
            },
            dependencies: [ "topBlur", "topChange", "topClick", "topFocus", "topInput", "topKeyDown", "topKeyUp", "topSelectionChange" ]
        }
    }, N = null, S = null, T = null, P = null, I = !1;
    y.canUseDOM && (I = C("change") && (!document.documentMode || document.documentMode > 8));
    var O = !1;
    y.canUseDOM && (O = C("input") && (!document.documentMode || document.documentMode > 11));
    var R = {
        get: function() {
            return P.get.call(this);
        },
        set: function(n) {
            T = "" + n, P.set.call(this, n);
        }
    }, D = {
        eventTypes: M,
        extractEvents: function(n, e, t, i) {
            var r, a, s = e ? w.getNodeFromInstance(e) : window;
            if (o(s) ? I ? r = l : a = c : _(s) ? O ? r = f : (r = h, a = m) : b(s) && (r = g), 
            r) {
                var u = r(n, e);
                if (u) {
                    var d = A.getPooled(M.change, u, t, i);
                    return d.type = "change", v.accumulateTwoPhaseDispatches(d), d;
                }
            }
            a && a(n, s, e);
        }
    };
    n.exports = D;
}, function(n, e, t) {
    "use strict";
    var o = t(2), i = t(14), r = t(5), a = t(98), s = t(6), l = (t(0), {
        dangerouslyReplaceNodeWithMarkup: function(n, e) {
            if (r.canUseDOM || o("56"), e || o("57"), "HTML" === n.nodeName && o("58"), "string" == typeof e) {
                var t = a(e, s)[0];
                n.parentNode.replaceChild(t, n);
            } else i.replaceChildWithTree(n, e);
        }
    });
    n.exports = l;
}, function(n, e, t) {
    "use strict";
    var o = [ "ResponderEventPlugin", "SimpleEventPlugin", "TapEventPlugin", "EnterLeaveEventPlugin", "ChangeEventPlugin", "SelectEventPlugin", "BeforeInputEventPlugin" ];
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    var o = t(22), i = t(4), r = t(26), a = {
        mouseEnter: {
            registrationName: "onMouseEnter",
            dependencies: [ "topMouseOut", "topMouseOver" ]
        },
        mouseLeave: {
            registrationName: "onMouseLeave",
            dependencies: [ "topMouseOut", "topMouseOver" ]
        }
    }, s = {
        eventTypes: a,
        extractEvents: function(n, e, t, s) {
            if ("topMouseOver" === n && (t.relatedTarget || t.fromElement)) return null;
            if ("topMouseOut" !== n && "topMouseOver" !== n) return null;
            var l;
            if (s.window === s) l = s; else {
                var c = s.ownerDocument;
                l = c ? c.defaultView || c.parentWindow : window;
            }
            var u, d;
            if ("topMouseOut" === n) {
                u = e;
                var p = t.relatedTarget || t.toElement;
                d = p ? i.getClosestInstanceFromNode(p) : null;
            } else u = null, d = e;
            if (u === d) return null;
            var f = null == u ? l : i.getNodeFromInstance(u), m = null == d ? l : i.getNodeFromInstance(d), h = r.getPooled(a.mouseLeave, u, t, s);
            h.type = "mouseleave", h.target = f, h.relatedTarget = m;
            var b = r.getPooled(a.mouseEnter, d, t, s);
            return b.type = "mouseenter", b.target = m, b.relatedTarget = f, o.accumulateEnterLeaveDispatches(h, b, u, d), 
            [ h, b ];
        }
    };
    n.exports = s;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        this._root = n, this._startText = this.getText(), this._fallbackText = null;
    }
    var i = t(3), r = t(13), a = t(71);
    i(o.prototype, {
        destructor: function() {
            this._root = null, this._startText = null, this._fallbackText = null;
        },
        getText: function() {
            return "value" in this._root ? this._root.value : this._root[a()];
        },
        getData: function() {
            if (this._fallbackText) return this._fallbackText;
            var n, e, t = this._startText, o = t.length, i = this.getText(), r = i.length;
            for (n = 0; n < o && t[n] === i[n]; n++) ;
            var a = o - n;
            for (e = 1; e <= a && t[o - e] === i[r - e]; e++) ;
            var s = e > 1 ? 1 - e : void 0;
            return this._fallbackText = i.slice(n, s), this._fallbackText;
        }
    }), r.addPoolingTo(o), n.exports = o;
}, function(n, e, t) {
    "use strict";
    var o = t(15), i = o.injection.MUST_USE_PROPERTY, r = o.injection.HAS_BOOLEAN_VALUE, a = o.injection.HAS_NUMERIC_VALUE, s = o.injection.HAS_POSITIVE_NUMERIC_VALUE, l = o.injection.HAS_OVERLOADED_BOOLEAN_VALUE, c = {
        isCustomAttribute: RegExp.prototype.test.bind(new RegExp("^(data|aria)-[" + o.ATTRIBUTE_NAME_CHAR + "]*$")),
        Properties: {
            accept: 0,
            acceptCharset: 0,
            accessKey: 0,
            action: 0,
            allowFullScreen: r,
            allowTransparency: 0,
            alt: 0,
            as: 0,
            async: r,
            autoComplete: 0,
            autoPlay: r,
            capture: r,
            cellPadding: 0,
            cellSpacing: 0,
            charSet: 0,
            challenge: 0,
            checked: i | r,
            cite: 0,
            classID: 0,
            className: 0,
            cols: s,
            colSpan: 0,
            content: 0,
            contentEditable: 0,
            contextMenu: 0,
            controls: r,
            coords: 0,
            crossOrigin: 0,
            data: 0,
            dateTime: 0,
            default: r,
            defer: r,
            dir: 0,
            disabled: r,
            download: l,
            draggable: 0,
            encType: 0,
            form: 0,
            formAction: 0,
            formEncType: 0,
            formMethod: 0,
            formNoValidate: r,
            formTarget: 0,
            frameBorder: 0,
            headers: 0,
            height: 0,
            hidden: r,
            high: 0,
            href: 0,
            hrefLang: 0,
            htmlFor: 0,
            httpEquiv: 0,
            icon: 0,
            id: 0,
            inputMode: 0,
            integrity: 0,
            is: 0,
            keyParams: 0,
            keyType: 0,
            kind: 0,
            label: 0,
            lang: 0,
            list: 0,
            loop: r,
            low: 0,
            manifest: 0,
            marginHeight: 0,
            marginWidth: 0,
            max: 0,
            maxLength: 0,
            media: 0,
            mediaGroup: 0,
            method: 0,
            min: 0,
            minLength: 0,
            multiple: i | r,
            muted: i | r,
            name: 0,
            nonce: 0,
            noValidate: r,
            open: r,
            optimum: 0,
            pattern: 0,
            placeholder: 0,
            playsInline: r,
            poster: 0,
            preload: 0,
            profile: 0,
            radioGroup: 0,
            readOnly: r,
            referrerPolicy: 0,
            rel: 0,
            required: r,
            reversed: r,
            role: 0,
            rows: s,
            rowSpan: a,
            sandbox: 0,
            scope: 0,
            scoped: r,
            scrolling: 0,
            seamless: r,
            selected: i | r,
            shape: 0,
            size: s,
            sizes: 0,
            span: s,
            spellCheck: 0,
            src: 0,
            srcDoc: 0,
            srcLang: 0,
            srcSet: 0,
            start: a,
            step: 0,
            style: 0,
            summary: 0,
            tabIndex: 0,
            target: 0,
            title: 0,
            type: 0,
            useMap: 0,
            value: 0,
            width: 0,
            wmode: 0,
            wrap: 0,
            about: 0,
            datatype: 0,
            inlist: 0,
            prefix: 0,
            property: 0,
            resource: 0,
            typeof: 0,
            vocab: 0,
            autoCapitalize: 0,
            autoCorrect: 0,
            autoSave: 0,
            color: 0,
            itemProp: 0,
            itemScope: r,
            itemType: 0,
            itemID: 0,
            itemRef: 0,
            results: 0,
            security: 0,
            unselectable: 0
        },
        DOMAttributeNames: {
            acceptCharset: "accept-charset",
            className: "class",
            htmlFor: "for",
            httpEquiv: "http-equiv"
        },
        DOMPropertyNames: {}
    };
    n.exports = c;
}, function(n, e, t) {
    "use strict";
    (function(e) {
        function o(n, e, t, o) {
            var i = void 0 === n[t];
            null != e && i && (n[t] = r(e, !0));
        }
        var i = t(16), r = t(72), a = (t(35), t(45)), s = t(75);
        t(1);
        void 0 !== e && t.i({
            NODE_ENV: "production"
        });
        var l = {
            instantiateChildren: function(n, e, t, i) {
                if (null == n) return null;
                var r = {};
                return s(n, o, r), r;
            },
            updateChildren: function(n, e, t, o, s, l, c, u, d) {
                if (e || n) {
                    var p, f;
                    for (p in e) if (e.hasOwnProperty(p)) {
                        f = n && n[p];
                        var m = f && f._currentElement, h = e[p];
                        if (null != f && a(m, h)) i.receiveComponent(f, h, s, u), e[p] = f; else {
                            f && (o[p] = i.getHostNode(f), i.unmountComponent(f, !1));
                            var b = r(h, !0);
                            e[p] = b;
                            var g = i.mountComponent(b, s, l, c, u, d);
                            t.push(g);
                        }
                    }
                    for (p in n) !n.hasOwnProperty(p) || e && e.hasOwnProperty(p) || (f = n[p], o[p] = i.getHostNode(f), 
                    i.unmountComponent(f, !1));
                }
            },
            unmountChildren: function(n, e) {
                for (var t in n) if (n.hasOwnProperty(t)) {
                    var o = n[t];
                    i.unmountComponent(o, e);
                }
            }
        };
        n.exports = l;
    }).call(e, t(55));
}, function(n, e, t) {
    "use strict";
    var o = t(31), i = t(124), r = {
        processChildrenUpdates: i.dangerouslyProcessChildrenUpdates,
        replaceNodeWithMarkup: o.dangerouslyReplaceNodeWithMarkup
    };
    n.exports = r;
}, function(n, e, t) {
    "use strict";
    function o(n) {}
    function i(n, e) {}
    function r(n) {
        return !(!n.prototype || !n.prototype.isReactComponent);
    }
    function a(n) {
        return !(!n.prototype || !n.prototype.isPureReactComponent);
    }
    var s = t(2), l = t(3), c = t(17), u = t(37), d = t(11), p = t(38), f = t(23), m = (t(7), 
    t(66)), h = t(16), b = t(20), g = (t(0), t(30)), x = t(45), v = (t(1), {
        ImpureClass: 0,
        PureClass: 1,
        StatelessFunctional: 2
    });
    o.prototype.render = function() {
        var n = f.get(this)._currentElement.type, e = n(this.props, this.context, this.updater);
        return i(n, e), e;
    };
    var y = 1, w = {
        construct: function(n) {
            this._currentElement = n, this._rootNodeID = 0, this._compositeType = null, this._instance = null, 
            this._hostParent = null, this._hostContainerInfo = null, this._updateBatchNumber = null, 
            this._pendingElement = null, this._pendingStateQueue = null, this._pendingReplaceState = !1, 
            this._pendingForceUpdate = !1, this._renderedNodeType = null, this._renderedComponent = null, 
            this._context = null, this._mountOrder = 0, this._topLevelWrapper = null, this._pendingCallbacks = null, 
            this._calledComponentWillUnmount = !1;
        },
        mountComponent: function(n, e, t, l) {
            this._context = l, this._mountOrder = y++, this._hostParent = e, this._hostContainerInfo = t;
            var u, d = this._currentElement.props, p = this._processContext(l), m = this._currentElement.type, h = n.getUpdateQueue(), g = r(m), x = this._constructComponent(g, d, p, h);
            g || null != x && null != x.render ? a(m) ? this._compositeType = v.PureClass : this._compositeType = v.ImpureClass : (u = x, 
            i(m, u), null === x || !1 === x || c.isValidElement(x) || s("105", m.displayName || m.name || "Component"), 
            x = new o(m), this._compositeType = v.StatelessFunctional);
            x.props = d, x.context = p, x.refs = b, x.updater = h, this._instance = x, f.set(x, this);
            var w = x.state;
            void 0 === w && (x.state = w = null), ("object" != typeof w || Array.isArray(w)) && s("106", this.getName() || "ReactCompositeComponent"), 
            this._pendingStateQueue = null, this._pendingReplaceState = !1, this._pendingForceUpdate = !1;
            var k;
            return k = x.unstable_handleError ? this.performInitialMountWithErrorHandling(u, e, t, n, l) : this.performInitialMount(u, e, t, n, l), 
            x.componentDidMount && n.getReactMountReady().enqueue(x.componentDidMount, x), k;
        },
        _constructComponent: function(n, e, t, o) {
            return this._constructComponentWithoutOwner(n, e, t, o);
        },
        _constructComponentWithoutOwner: function(n, e, t, o) {
            var i = this._currentElement.type;
            return n ? new i(e, t, o) : i(e, t, o);
        },
        performInitialMountWithErrorHandling: function(n, e, t, o, i) {
            var r, a = o.checkpoint();
            try {
                r = this.performInitialMount(n, e, t, o, i);
            } catch (s) {
                o.rollback(a), this._instance.unstable_handleError(s), this._pendingStateQueue && (this._instance.state = this._processPendingState(this._instance.props, this._instance.context)), 
                a = o.checkpoint(), this._renderedComponent.unmountComponent(!0), o.rollback(a), 
                r = this.performInitialMount(n, e, t, o, i);
            }
            return r;
        },
        performInitialMount: function(n, e, t, o, i) {
            var r = this._instance, a = 0;
            r.componentWillMount && (r.componentWillMount(), this._pendingStateQueue && (r.state = this._processPendingState(r.props, r.context))), 
            void 0 === n && (n = this._renderValidatedComponent());
            var s = m.getType(n);
            this._renderedNodeType = s;
            var l = this._instantiateReactComponent(n, s !== m.EMPTY);
            this._renderedComponent = l;
            var c = h.mountComponent(l, o, e, t, this._processChildContext(i), a);
            return c;
        },
        getHostNode: function() {
            return h.getHostNode(this._renderedComponent);
        },
        unmountComponent: function(n) {
            if (this._renderedComponent) {
                var e = this._instance;
                if (e.componentWillUnmount && !e._calledComponentWillUnmount) if (e._calledComponentWillUnmount = !0, 
                n) {
                    var t = this.getName() + ".componentWillUnmount()";
                    p.invokeGuardedCallback(t, e.componentWillUnmount.bind(e));
                } else e.componentWillUnmount();
                this._renderedComponent && (h.unmountComponent(this._renderedComponent, n), this._renderedNodeType = null, 
                this._renderedComponent = null, this._instance = null), this._pendingStateQueue = null, 
                this._pendingReplaceState = !1, this._pendingForceUpdate = !1, this._pendingCallbacks = null, 
                this._pendingElement = null, this._context = null, this._rootNodeID = 0, this._topLevelWrapper = null, 
                f.remove(e);
            }
        },
        _maskContext: function(n) {
            var e = this._currentElement.type, t = e.contextTypes;
            if (!t) return b;
            var o = {};
            for (var i in t) o[i] = n[i];
            return o;
        },
        _processContext: function(n) {
            var e = this._maskContext(n);
            return e;
        },
        _processChildContext: function(n) {
            var e, t = this._currentElement.type, o = this._instance;
            if (o.getChildContext && (e = o.getChildContext()), e) {
                "object" != typeof t.childContextTypes && s("107", this.getName() || "ReactCompositeComponent");
                for (var i in e) i in t.childContextTypes || s("108", this.getName() || "ReactCompositeComponent", i);
                return l({}, n, e);
            }
            return n;
        },
        _checkContextTypes: function(n, e, t) {},
        receiveComponent: function(n, e, t) {
            var o = this._currentElement, i = this._context;
            this._pendingElement = null, this.updateComponent(e, o, n, i, t);
        },
        performUpdateIfNecessary: function(n) {
            null != this._pendingElement ? h.receiveComponent(this, this._pendingElement, n, this._context) : null !== this._pendingStateQueue || this._pendingForceUpdate ? this.updateComponent(n, this._currentElement, this._currentElement, this._context, this._context) : this._updateBatchNumber = null;
        },
        updateComponent: function(n, e, t, o, i) {
            var r = this._instance;
            null == r && s("136", this.getName() || "ReactCompositeComponent");
            var a, l = !1;
            this._context === i ? a = r.context : (a = this._processContext(i), l = !0);
            var c = e.props, u = t.props;
            e !== t && (l = !0), l && r.componentWillReceiveProps && r.componentWillReceiveProps(u, a);
            var d = this._processPendingState(u, a), p = !0;
            this._pendingForceUpdate || (r.shouldComponentUpdate ? p = r.shouldComponentUpdate(u, d, a) : this._compositeType === v.PureClass && (p = !g(c, u) || !g(r.state, d))), 
            this._updateBatchNumber = null, p ? (this._pendingForceUpdate = !1, this._performComponentUpdate(t, u, d, a, n, i)) : (this._currentElement = t, 
            this._context = i, r.props = u, r.state = d, r.context = a);
        },
        _processPendingState: function(n, e) {
            var t = this._instance, o = this._pendingStateQueue, i = this._pendingReplaceState;
            if (this._pendingReplaceState = !1, this._pendingStateQueue = null, !o) return t.state;
            if (i && 1 === o.length) return o[0];
            for (var r = l({}, i ? o[0] : t.state), a = i ? 1 : 0; a < o.length; a++) {
                var s = o[a];
                l(r, "function" == typeof s ? s.call(t, r, n, e) : s);
            }
            return r;
        },
        _performComponentUpdate: function(n, e, t, o, i, r) {
            var a, s, l, c = this._instance, u = Boolean(c.componentDidUpdate);
            u && (a = c.props, s = c.state, l = c.context), c.componentWillUpdate && c.componentWillUpdate(e, t, o), 
            this._currentElement = n, this._context = r, c.props = e, c.state = t, c.context = o, 
            this._updateRenderedComponent(i, r), u && i.getReactMountReady().enqueue(c.componentDidUpdate.bind(c, a, s, l), c);
        },
        _updateRenderedComponent: function(n, e) {
            var t = this._renderedComponent, o = t._currentElement, i = this._renderValidatedComponent(), r = 0;
            if (x(o, i)) h.receiveComponent(t, i, n, this._processChildContext(e)); else {
                var a = h.getHostNode(t);
                h.unmountComponent(t, !1);
                var s = m.getType(i);
                this._renderedNodeType = s;
                var l = this._instantiateReactComponent(i, s !== m.EMPTY);
                this._renderedComponent = l;
                var c = h.mountComponent(l, n, this._hostParent, this._hostContainerInfo, this._processChildContext(e), r);
                this._replaceNodeWithMarkup(a, c, t);
            }
        },
        _replaceNodeWithMarkup: function(n, e, t) {
            u.replaceNodeWithMarkup(n, e, t);
        },
        _renderValidatedComponentWithoutOwnerOrContext: function() {
            var n = this._instance;
            return n.render();
        },
        _renderValidatedComponent: function() {
            var n;
            if (this._compositeType !== v.StatelessFunctional) {
                d.current = this;
                try {
                    n = this._renderValidatedComponentWithoutOwnerOrContext();
                } finally {
                    d.current = null;
                }
            } else n = this._renderValidatedComponentWithoutOwnerOrContext();
            return null === n || !1 === n || c.isValidElement(n) || s("109", this.getName() || "ReactCompositeComponent"), 
            n;
        },
        attachRef: function(n, e) {
            var t = this.getPublicInstance();
            null == t && s("110");
            var o = e.getPublicInstance();
            (t.refs === b ? t.refs = {} : t.refs)[n] = o;
        },
        detachRef: function(n) {
            delete this.getPublicInstance().refs[n];
        },
        getName: function() {
            var n = this._currentElement.type, e = this._instance && this._instance.constructor;
            return n.displayName || e && e.displayName || n.name || e && e.name || null;
        },
        getPublicInstance: function() {
            var n = this._instance;
            return this._compositeType === v.StatelessFunctional ? null : n;
        },
        _instantiateReactComponent: null
    };
    n.exports = w;
}, function(n, e, t) {
    "use strict";
    var o = t(4), i = t(132), r = t(65), a = t(16), s = t(9), l = t(145), c = t(161), u = t(70), d = t(169);
    t(1);
    i.inject();
    var p = {
        findDOMNode: c,
        render: r.render,
        unmountComponentAtNode: r.unmountComponentAtNode,
        version: l,
        unstable_batchedUpdates: s.batchedUpdates,
        unstable_renderSubtreeIntoContainer: d
    };
    "undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject && __REACT_DEVTOOLS_GLOBAL_HOOK__.inject({
        ComponentTree: {
            getClosestInstanceFromNode: o.getClosestInstanceFromNode,
            getNodeFromInstance: function(n) {
                return n._renderedComponent && (n = u(n)), n ? o.getNodeFromInstance(n) : null;
            }
        },
        Mount: r,
        Reconciler: a
    });
    n.exports = p;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        if (n) {
            var e = n._currentElement._owner || null;
            if (e) {
                var t = e.getName();
                if (t) return " This DOM node was rendered by `" + t + "`.";
            }
        }
        return "";
    }
    function i(n, e) {
        e && (G[n._tag] && (null != e.children || null != e.dangerouslySetInnerHTML) && h("137", n._tag, n._currentElement._owner ? " Check the render method of " + n._currentElement._owner.getName() + "." : ""), 
        null != e.dangerouslySetInnerHTML && (null != e.children && h("60"), "object" == typeof e.dangerouslySetInnerHTML && q in e.dangerouslySetInnerHTML || h("61")), 
        null != e.style && "object" != typeof e.style && h("62", o(n)));
    }
    function r(n, e, t, o) {
        if (!(o instanceof O)) {
            var i = n._hostContainerInfo, r = i._node && i._node.nodeType === V, s = r ? i._node : i._ownerDocument;
            U(e, s), o.getReactMountReady().enqueue(a, {
                inst: n,
                registrationName: e,
                listener: t
            });
        }
    }
    function a() {
        var n = this;
        A.putListener(n.inst, n.registrationName, n.listener);
    }
    function s() {
        var n = this;
        N.postMountWrapper(n);
    }
    function l() {
        var n = this;
        P.postMountWrapper(n);
    }
    function c() {
        var n = this;
        S.postMountWrapper(n);
    }
    function u() {
        var n = this;
        n._rootNodeID || h("63");
        var e = z(n);
        switch (e || h("64"), n._tag) {
          case "iframe":
          case "object":
            n._wrapperState.listeners = [ C.trapBubbledEvent("topLoad", "load", e) ];
            break;

          case "video":
          case "audio":
            n._wrapperState.listeners = [];
            for (var t in W) W.hasOwnProperty(t) && n._wrapperState.listeners.push(C.trapBubbledEvent(t, W[t], e));
            break;

          case "source":
            n._wrapperState.listeners = [ C.trapBubbledEvent("topError", "error", e) ];
            break;

          case "img":
            n._wrapperState.listeners = [ C.trapBubbledEvent("topError", "error", e), C.trapBubbledEvent("topLoad", "load", e) ];
            break;

          case "form":
            n._wrapperState.listeners = [ C.trapBubbledEvent("topReset", "reset", e), C.trapBubbledEvent("topSubmit", "submit", e) ];
            break;

          case "input":
          case "select":
          case "textarea":
            n._wrapperState.listeners = [ C.trapBubbledEvent("topInvalid", "invalid", e) ];
        }
    }
    function d() {
        T.postUpdateWrapper(this);
    }
    function p(n) {
        X.call(Z, n) || (K.test(n) || h("65", n), Z[n] = !0);
    }
    function f(n, e) {
        return n.indexOf("-") >= 0 || null != e.is;
    }
    function m(n) {
        var e = n.type;
        p(e), this._currentElement = n, this._tag = e.toLowerCase(), this._namespaceURI = null, 
        this._renderedChildren = null, this._previousStyle = null, this._previousStyleCopy = null, 
        this._hostNode = null, this._hostParent = null, this._rootNodeID = 0, this._domID = 0, 
        this._hostContainerInfo = null, this._wrapperState = null, this._topLevelWrapper = null, 
        this._flags = 0;
    }
    var h = t(2), b = t(3), g = t(107), x = t(109), v = t(14), y = t(32), w = t(15), k = t(58), A = t(21), E = t(33), C = t(25), _ = t(59), M = t(4), N = t(125), S = t(126), T = t(60), P = t(129), I = (t(7), 
    t(138)), O = t(143), R = (t(6), t(28)), D = (t(0), t(44), t(30), t(46), t(1), _), L = A.deleteListener, z = M.getNodeFromInstance, U = C.listenTo, j = E.registrationNameModules, F = {
        string: !0,
        number: !0
    }, B = "style", q = "__html", H = {
        children: null,
        dangerouslySetInnerHTML: null,
        suppressContentEditableWarning: null
    }, V = 11, W = {
        topAbort: "abort",
        topCanPlay: "canplay",
        topCanPlayThrough: "canplaythrough",
        topDurationChange: "durationchange",
        topEmptied: "emptied",
        topEncrypted: "encrypted",
        topEnded: "ended",
        topError: "error",
        topLoadedData: "loadeddata",
        topLoadedMetadata: "loadedmetadata",
        topLoadStart: "loadstart",
        topPause: "pause",
        topPlay: "play",
        topPlaying: "playing",
        topProgress: "progress",
        topRateChange: "ratechange",
        topSeeked: "seeked",
        topSeeking: "seeking",
        topStalled: "stalled",
        topSuspend: "suspend",
        topTimeUpdate: "timeupdate",
        topVolumeChange: "volumechange",
        topWaiting: "waiting"
    }, Y = {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0
    }, Q = {
        listing: !0,
        pre: !0,
        textarea: !0
    }, G = b({
        menuitem: !0
    }, Y), K = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, Z = {}, X = {}.hasOwnProperty, J = 1;
    m.displayName = "ReactDOMComponent", m.Mixin = {
        mountComponent: function(n, e, t, o) {
            this._rootNodeID = J++, this._domID = t._idCounter++, this._hostParent = e, this._hostContainerInfo = t;
            var r = this._currentElement.props;
            switch (this._tag) {
              case "audio":
              case "form":
              case "iframe":
              case "img":
              case "link":
              case "object":
              case "source":
              case "video":
                this._wrapperState = {
                    listeners: null
                }, n.getReactMountReady().enqueue(u, this);
                break;

              case "input":
                N.mountWrapper(this, r, e), r = N.getHostProps(this, r), n.getReactMountReady().enqueue(u, this);
                break;

              case "option":
                S.mountWrapper(this, r, e), r = S.getHostProps(this, r);
                break;

              case "select":
                T.mountWrapper(this, r, e), r = T.getHostProps(this, r), n.getReactMountReady().enqueue(u, this);
                break;

              case "textarea":
                P.mountWrapper(this, r, e), r = P.getHostProps(this, r), n.getReactMountReady().enqueue(u, this);
            }
            i(this, r);
            var a, d;
            null != e ? (a = e._namespaceURI, d = e._tag) : t._tag && (a = t._namespaceURI, 
            d = t._tag), (null == a || a === y.svg && "foreignobject" === d) && (a = y.html), 
            a === y.html && ("svg" === this._tag ? a = y.svg : "math" === this._tag && (a = y.mathml)), 
            this._namespaceURI = a;
            var p;
            if (n.useCreateElement) {
                var f, m = t._ownerDocument;
                if (a === y.html) if ("script" === this._tag) {
                    var h = m.createElement("div"), b = this._currentElement.type;
                    h.innerHTML = "<" + b + "></" + b + ">", f = h.removeChild(h.firstChild);
                } else f = r.is ? m.createElement(this._currentElement.type, r.is) : m.createElement(this._currentElement.type); else f = m.createElementNS(a, this._currentElement.type);
                M.precacheNode(this, f), this._flags |= D.hasCachedChildNodes, this._hostParent || k.setAttributeForRoot(f), 
                this._updateDOMProperties(null, r, n);
                var x = v(f);
                this._createInitialChildren(n, r, o, x), p = x;
            } else {
                var w = this._createOpenTagMarkupAndPutListeners(n, r), A = this._createContentMarkup(n, r, o);
                p = !A && Y[this._tag] ? w + "/>" : w + ">" + A + "</" + this._currentElement.type + ">";
            }
            switch (this._tag) {
              case "input":
                n.getReactMountReady().enqueue(s, this), r.autoFocus && n.getReactMountReady().enqueue(g.focusDOMComponent, this);
                break;

              case "textarea":
                n.getReactMountReady().enqueue(l, this), r.autoFocus && n.getReactMountReady().enqueue(g.focusDOMComponent, this);
                break;

              case "select":
              case "button":
                r.autoFocus && n.getReactMountReady().enqueue(g.focusDOMComponent, this);
                break;

              case "option":
                n.getReactMountReady().enqueue(c, this);
            }
            return p;
        },
        _createOpenTagMarkupAndPutListeners: function(n, e) {
            var t = "<" + this._currentElement.type;
            for (var o in e) if (e.hasOwnProperty(o)) {
                var i = e[o];
                if (null != i) if (j.hasOwnProperty(o)) i && r(this, o, i, n); else {
                    o === B && (i && (i = this._previousStyleCopy = b({}, e.style)), i = x.createMarkupForStyles(i, this));
                    var a = null;
                    null != this._tag && f(this._tag, e) ? H.hasOwnProperty(o) || (a = k.createMarkupForCustomAttribute(o, i)) : a = k.createMarkupForProperty(o, i), 
                    a && (t += " " + a);
                }
            }
            return n.renderToStaticMarkup ? t : (this._hostParent || (t += " " + k.createMarkupForRoot()), 
            t += " " + k.createMarkupForID(this._domID));
        },
        _createContentMarkup: function(n, e, t) {
            var o = "", i = e.dangerouslySetInnerHTML;
            if (null != i) null != i.__html && (o = i.__html); else {
                var r = F[typeof e.children] ? e.children : null, a = null != r ? null : e.children;
                if (null != r) o = R(r); else if (null != a) {
                    var s = this.mountChildren(a, n, t);
                    o = s.join("");
                }
            }
            return Q[this._tag] && "\n" === o.charAt(0) ? "\n" + o : o;
        },
        _createInitialChildren: function(n, e, t, o) {
            var i = e.dangerouslySetInnerHTML;
            if (null != i) null != i.__html && v.queueHTML(o, i.__html); else {
                var r = F[typeof e.children] ? e.children : null, a = null != r ? null : e.children;
                if (null != r) "" !== r && v.queueText(o, r); else if (null != a) for (var s = this.mountChildren(a, n, t), l = 0; l < s.length; l++) v.queueChild(o, s[l]);
            }
        },
        receiveComponent: function(n, e, t) {
            var o = this._currentElement;
            this._currentElement = n, this.updateComponent(e, o, n, t);
        },
        updateComponent: function(n, e, t, o) {
            var r = e.props, a = this._currentElement.props;
            switch (this._tag) {
              case "input":
                r = N.getHostProps(this, r), a = N.getHostProps(this, a);
                break;

              case "option":
                r = S.getHostProps(this, r), a = S.getHostProps(this, a);
                break;

              case "select":
                r = T.getHostProps(this, r), a = T.getHostProps(this, a);
                break;

              case "textarea":
                r = P.getHostProps(this, r), a = P.getHostProps(this, a);
            }
            switch (i(this, a), this._updateDOMProperties(r, a, n), this._updateDOMChildren(r, a, n, o), 
            this._tag) {
              case "input":
                N.updateWrapper(this);
                break;

              case "textarea":
                P.updateWrapper(this);
                break;

              case "select":
                n.getReactMountReady().enqueue(d, this);
            }
        },
        _updateDOMProperties: function(n, e, t) {
            var o, i, a;
            for (o in n) if (!e.hasOwnProperty(o) && n.hasOwnProperty(o) && null != n[o]) if (o === B) {
                var s = this._previousStyleCopy;
                for (i in s) s.hasOwnProperty(i) && (a = a || {}, a[i] = "");
                this._previousStyleCopy = null;
            } else j.hasOwnProperty(o) ? n[o] && L(this, o) : f(this._tag, n) ? H.hasOwnProperty(o) || k.deleteValueForAttribute(z(this), o) : (w.properties[o] || w.isCustomAttribute(o)) && k.deleteValueForProperty(z(this), o);
            for (o in e) {
                var l = e[o], c = o === B ? this._previousStyleCopy : null != n ? n[o] : void 0;
                if (e.hasOwnProperty(o) && l !== c && (null != l || null != c)) if (o === B) if (l ? l = this._previousStyleCopy = b({}, l) : this._previousStyleCopy = null, 
                c) {
                    for (i in c) !c.hasOwnProperty(i) || l && l.hasOwnProperty(i) || (a = a || {}, a[i] = "");
                    for (i in l) l.hasOwnProperty(i) && c[i] !== l[i] && (a = a || {}, a[i] = l[i]);
                } else a = l; else if (j.hasOwnProperty(o)) l ? r(this, o, l, t) : c && L(this, o); else if (f(this._tag, e)) H.hasOwnProperty(o) || k.setValueForAttribute(z(this), o, l); else if (w.properties[o] || w.isCustomAttribute(o)) {
                    var u = z(this);
                    null != l ? k.setValueForProperty(u, o, l) : k.deleteValueForProperty(u, o);
                }
            }
            a && x.setValueForStyles(z(this), a, this);
        },
        _updateDOMChildren: function(n, e, t, o) {
            var i = F[typeof n.children] ? n.children : null, r = F[typeof e.children] ? e.children : null, a = n.dangerouslySetInnerHTML && n.dangerouslySetInnerHTML.__html, s = e.dangerouslySetInnerHTML && e.dangerouslySetInnerHTML.__html, l = null != i ? null : n.children, c = null != r ? null : e.children, u = null != i || null != a, d = null != r || null != s;
            null != l && null == c ? this.updateChildren(null, t, o) : u && !d && this.updateTextContent(""), 
            null != r ? i !== r && this.updateTextContent("" + r) : null != s ? a !== s && this.updateMarkup("" + s) : null != c && this.updateChildren(c, t, o);
        },
        getHostNode: function() {
            return z(this);
        },
        unmountComponent: function(n) {
            switch (this._tag) {
              case "audio":
              case "form":
              case "iframe":
              case "img":
              case "link":
              case "object":
              case "source":
              case "video":
                var e = this._wrapperState.listeners;
                if (e) for (var t = 0; t < e.length; t++) e[t].remove();
                break;

              case "html":
              case "head":
              case "body":
                h("66", this._tag);
            }
            this.unmountChildren(n), M.uncacheNode(this), A.deleteAllListeners(this), this._rootNodeID = 0, 
            this._domID = 0, this._wrapperState = null;
        },
        getPublicInstance: function() {
            return z(this);
        }
    }, b(m.prototype, m.Mixin, I.Mixin), n.exports = m;
}, function(n, e, t) {
    "use strict";
    function o(n, e) {
        var t = {
            _topLevelWrapper: n,
            _idCounter: 1,
            _ownerDocument: e ? e.nodeType === i ? e : e.ownerDocument : null,
            _node: e,
            _tag: e ? e.nodeName.toLowerCase() : null,
            _namespaceURI: e ? e.namespaceURI : null
        };
        return t;
    }
    var i = (t(46), 9);
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    var o = t(3), i = t(14), r = t(4), a = function(n) {
        this._currentElement = null, this._hostNode = null, this._hostParent = null, this._hostContainerInfo = null, 
        this._domID = 0;
    };
    o(a.prototype, {
        mountComponent: function(n, e, t, o) {
            var a = t._idCounter++;
            this._domID = a, this._hostParent = e, this._hostContainerInfo = t;
            var s = " react-empty: " + this._domID + " ";
            if (n.useCreateElement) {
                var l = t._ownerDocument, c = l.createComment(s);
                return r.precacheNode(this, c), i(c);
            }
            return n.renderToStaticMarkup ? "" : "<!--" + s + "-->";
        },
        receiveComponent: function() {},
        getHostNode: function() {
            return r.getNodeFromInstance(this);
        },
        unmountComponent: function() {
            r.uncacheNode(this);
        }
    }), n.exports = a;
}, function(n, e, t) {
    "use strict";
    var o = {
        useCreateElement: !0,
        useFiber: !1
    };
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    var o = t(31), i = t(4), r = {
        dangerouslyProcessChildrenUpdates: function(n, e) {
            var t = i.getNodeFromInstance(n);
            o.processUpdates(t, e);
        }
    };
    n.exports = r;
}, function(n, e, t) {
    "use strict";
    function o() {
        this._rootNodeID && d.updateWrapper(this);
    }
    function i(n) {
        var e = this._currentElement.props, t = l.executeOnChange(e, n);
        u.asap(o, this);
        var i = e.name;
        if ("radio" === e.type && null != i) {
            for (var a = c.getNodeFromInstance(this), s = a; s.parentNode; ) s = s.parentNode;
            for (var d = s.querySelectorAll("input[name=" + JSON.stringify("" + i) + '][type="radio"]'), p = 0; p < d.length; p++) {
                var f = d[p];
                if (f !== a && f.form === a.form) {
                    var m = c.getInstanceFromNode(f);
                    m || r("90"), u.asap(o, m);
                }
            }
        }
        return t;
    }
    var r = t(2), a = t(3), s = t(58), l = t(36), c = t(4), u = t(9), d = (t(0), t(1), 
    {
        getHostProps: function(n, e) {
            var t = l.getValue(e), o = l.getChecked(e);
            return a({
                type: void 0,
                step: void 0,
                min: void 0,
                max: void 0
            }, e, {
                defaultChecked: void 0,
                defaultValue: void 0,
                value: null != t ? t : n._wrapperState.initialValue,
                checked: null != o ? o : n._wrapperState.initialChecked,
                onChange: n._wrapperState.onChange
            });
        },
        mountWrapper: function(n, e) {
            var t = e.defaultValue;
            n._wrapperState = {
                initialChecked: null != e.checked ? e.checked : e.defaultChecked,
                initialValue: null != e.value ? e.value : t,
                listeners: null,
                onChange: i.bind(n)
            };
        },
        updateWrapper: function(n) {
            var e = n._currentElement.props, t = e.checked;
            null != t && s.setValueForProperty(c.getNodeFromInstance(n), "checked", t || !1);
            var o = c.getNodeFromInstance(n), i = l.getValue(e);
            if (null != i) {
                var r = "" + i;
                r !== o.value && (o.value = r);
            } else null == e.value && null != e.defaultValue && o.defaultValue !== "" + e.defaultValue && (o.defaultValue = "" + e.defaultValue), 
            null == e.checked && null != e.defaultChecked && (o.defaultChecked = !!e.defaultChecked);
        },
        postMountWrapper: function(n) {
            var e = n._currentElement.props, t = c.getNodeFromInstance(n);
            switch (e.type) {
              case "submit":
              case "reset":
                break;

              case "color":
              case "date":
              case "datetime":
              case "datetime-local":
              case "month":
              case "time":
              case "week":
                t.value = "", t.value = t.defaultValue;
                break;

              default:
                t.value = t.value;
            }
            var o = t.name;
            "" !== o && (t.name = ""), t.defaultChecked = !t.defaultChecked, t.defaultChecked = !t.defaultChecked, 
            "" !== o && (t.name = o);
        }
    });
    n.exports = d;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        var e = "";
        return r.Children.forEach(n, function(n) {
            null != n && ("string" == typeof n || "number" == typeof n ? e += n : l || (l = !0));
        }), e;
    }
    var i = t(3), r = t(17), a = t(4), s = t(60), l = (t(1), !1), c = {
        mountWrapper: function(n, e, t) {
            var i = null;
            if (null != t) {
                var r = t;
                "optgroup" === r._tag && (r = r._hostParent), null != r && "select" === r._tag && (i = s.getSelectValueContext(r));
            }
            var a = null;
            if (null != i) {
                var l;
                if (l = null != e.value ? e.value + "" : o(e.children), a = !1, Array.isArray(i)) {
                    for (var c = 0; c < i.length; c++) if ("" + i[c] === l) {
                        a = !0;
                        break;
                    }
                } else a = "" + i === l;
            }
            n._wrapperState = {
                selected: a
            };
        },
        postMountWrapper: function(n) {
            var e = n._currentElement.props;
            if (null != e.value) {
                a.getNodeFromInstance(n).setAttribute("value", e.value);
            }
        },
        getHostProps: function(n, e) {
            var t = i({
                selected: void 0,
                children: void 0
            }, e);
            null != n._wrapperState.selected && (t.selected = n._wrapperState.selected);
            var r = o(e.children);
            return r && (t.children = r), t;
        }
    };
    n.exports = c;
}, function(n, e, t) {
    "use strict";
    function o(n, e, t, o) {
        return n === t && e === o;
    }
    function i(n) {
        var e = document.selection, t = e.createRange(), o = t.text.length, i = t.duplicate();
        i.moveToElementText(n), i.setEndPoint("EndToStart", t);
        var r = i.text.length;
        return {
            start: r,
            end: r + o
        };
    }
    function r(n) {
        var e = window.getSelection && window.getSelection();
        if (!e || 0 === e.rangeCount) return null;
        var t = e.anchorNode, i = e.anchorOffset, r = e.focusNode, a = e.focusOffset, s = e.getRangeAt(0);
        try {
            s.startContainer.nodeType, s.endContainer.nodeType;
        } catch (n) {
            return null;
        }
        var l = o(e.anchorNode, e.anchorOffset, e.focusNode, e.focusOffset), c = l ? 0 : s.toString().length, u = s.cloneRange();
        u.selectNodeContents(n), u.setEnd(s.startContainer, s.startOffset);
        var d = o(u.startContainer, u.startOffset, u.endContainer, u.endOffset), p = d ? 0 : u.toString().length, f = p + c, m = document.createRange();
        m.setStart(t, i), m.setEnd(r, a);
        var h = m.collapsed;
        return {
            start: h ? f : p,
            end: h ? p : f
        };
    }
    function a(n, e) {
        var t, o, i = document.selection.createRange().duplicate();
        void 0 === e.end ? (t = e.start, o = t) : e.start > e.end ? (t = e.end, o = e.start) : (t = e.start, 
        o = e.end), i.moveToElementText(n), i.moveStart("character", t), i.setEndPoint("EndToStart", i), 
        i.moveEnd("character", o - t), i.select();
    }
    function s(n, e) {
        if (window.getSelection) {
            var t = window.getSelection(), o = n[u()].length, i = Math.min(e.start, o), r = void 0 === e.end ? i : Math.min(e.end, o);
            if (!t.extend && i > r) {
                var a = r;
                r = i, i = a;
            }
            var s = c(n, i), l = c(n, r);
            if (s && l) {
                var d = document.createRange();
                d.setStart(s.node, s.offset), t.removeAllRanges(), i > r ? (t.addRange(d), t.extend(l.node, l.offset)) : (d.setEnd(l.node, l.offset), 
                t.addRange(d));
            }
        }
    }
    var l = t(5), c = t(166), u = t(71), d = l.canUseDOM && "selection" in document && !("getSelection" in window), p = {
        getOffsets: d ? i : r,
        setOffsets: d ? a : s
    };
    n.exports = p;
}, function(n, e, t) {
    "use strict";
    var o = t(2), i = t(3), r = t(31), a = t(14), s = t(4), l = t(28), c = (t(0), t(46), 
    function(n) {
        this._currentElement = n, this._stringText = "" + n, this._hostNode = null, this._hostParent = null, 
        this._domID = 0, this._mountIndex = 0, this._closingComment = null, this._commentNodes = null;
    });
    i(c.prototype, {
        mountComponent: function(n, e, t, o) {
            var i = t._idCounter++, r = " react-text: " + i + " ", c = " /react-text ";
            if (this._domID = i, this._hostParent = e, n.useCreateElement) {
                var u = t._ownerDocument, d = u.createComment(r), p = u.createComment(c), f = a(u.createDocumentFragment());
                return a.queueChild(f, a(d)), this._stringText && a.queueChild(f, a(u.createTextNode(this._stringText))), 
                a.queueChild(f, a(p)), s.precacheNode(this, d), this._closingComment = p, f;
            }
            var m = l(this._stringText);
            return n.renderToStaticMarkup ? m : "<!--" + r + "-->" + m + "<!--" + c + "-->";
        },
        receiveComponent: function(n, e) {
            if (n !== this._currentElement) {
                this._currentElement = n;
                var t = "" + n;
                if (t !== this._stringText) {
                    this._stringText = t;
                    var o = this.getHostNode();
                    r.replaceDelimitedText(o[0], o[1], t);
                }
            }
        },
        getHostNode: function() {
            var n = this._commentNodes;
            if (n) return n;
            if (!this._closingComment) for (var e = s.getNodeFromInstance(this), t = e.nextSibling; ;) {
                if (null == t && o("67", this._domID), 8 === t.nodeType && " /react-text " === t.nodeValue) {
                    this._closingComment = t;
                    break;
                }
                t = t.nextSibling;
            }
            return n = [ this._hostNode, this._closingComment ], this._commentNodes = n, n;
        },
        unmountComponent: function() {
            this._closingComment = null, this._commentNodes = null, s.uncacheNode(this);
        }
    }), n.exports = c;
}, function(n, e, t) {
    "use strict";
    function o() {
        this._rootNodeID && u.updateWrapper(this);
    }
    function i(n) {
        var e = this._currentElement.props, t = s.executeOnChange(e, n);
        return c.asap(o, this), t;
    }
    var r = t(2), a = t(3), s = t(36), l = t(4), c = t(9), u = (t(0), t(1), {
        getHostProps: function(n, e) {
            return null != e.dangerouslySetInnerHTML && r("91"), a({}, e, {
                value: void 0,
                defaultValue: void 0,
                children: "" + n._wrapperState.initialValue,
                onChange: n._wrapperState.onChange
            });
        },
        mountWrapper: function(n, e) {
            var t = s.getValue(e), o = t;
            if (null == t) {
                var a = e.defaultValue, l = e.children;
                null != l && (null != a && r("92"), Array.isArray(l) && (l.length <= 1 || r("93"), 
                l = l[0]), a = "" + l), null == a && (a = ""), o = a;
            }
            n._wrapperState = {
                initialValue: "" + o,
                listeners: null,
                onChange: i.bind(n)
            };
        },
        updateWrapper: function(n) {
            var e = n._currentElement.props, t = l.getNodeFromInstance(n), o = s.getValue(e);
            if (null != o) {
                var i = "" + o;
                i !== t.value && (t.value = i), null == e.defaultValue && (t.defaultValue = i);
            }
            null != e.defaultValue && (t.defaultValue = e.defaultValue);
        },
        postMountWrapper: function(n) {
            var e = l.getNodeFromInstance(n), t = e.textContent;
            t === n._wrapperState.initialValue && (e.value = t);
        }
    });
    n.exports = u;
}, function(n, e, t) {
    "use strict";
    function o(n, e) {
        "_hostNode" in n || l("33"), "_hostNode" in e || l("33");
        for (var t = 0, o = n; o; o = o._hostParent) t++;
        for (var i = 0, r = e; r; r = r._hostParent) i++;
        for (;t - i > 0; ) n = n._hostParent, t--;
        for (;i - t > 0; ) e = e._hostParent, i--;
        for (var a = t; a--; ) {
            if (n === e) return n;
            n = n._hostParent, e = e._hostParent;
        }
        return null;
    }
    function i(n, e) {
        "_hostNode" in n || l("35"), "_hostNode" in e || l("35");
        for (;e; ) {
            if (e === n) return !0;
            e = e._hostParent;
        }
        return !1;
    }
    function r(n) {
        return "_hostNode" in n || l("36"), n._hostParent;
    }
    function a(n, e, t) {
        for (var o = []; n; ) o.push(n), n = n._hostParent;
        var i;
        for (i = o.length; i-- > 0; ) e(o[i], "captured", t);
        for (i = 0; i < o.length; i++) e(o[i], "bubbled", t);
    }
    function s(n, e, t, i, r) {
        for (var a = n && e ? o(n, e) : null, s = []; n && n !== a; ) s.push(n), n = n._hostParent;
        for (var l = []; e && e !== a; ) l.push(e), e = e._hostParent;
        var c;
        for (c = 0; c < s.length; c++) t(s[c], "bubbled", i);
        for (c = l.length; c-- > 0; ) t(l[c], "captured", r);
    }
    var l = t(2);
    t(0);
    n.exports = {
        isAncestor: i,
        getLowestCommonAncestor: o,
        getParentInstance: r,
        traverseTwoPhase: a,
        traverseEnterLeave: s
    };
}, function(n, e, t) {
    "use strict";
    function o() {
        this.reinitializeTransaction();
    }
    var i = t(3), r = t(9), a = t(27), s = t(6), l = {
        initialize: s,
        close: function() {
            p.isBatchingUpdates = !1;
        }
    }, c = {
        initialize: s,
        close: r.flushBatchedUpdates.bind(r)
    }, u = [ c, l ];
    i(o.prototype, a, {
        getTransactionWrappers: function() {
            return u;
        }
    });
    var d = new o(), p = {
        isBatchingUpdates: !1,
        batchedUpdates: function(n, e, t, o, i, r) {
            var a = p.isBatchingUpdates;
            return p.isBatchingUpdates = !0, a ? n(e, t, o, i, r) : d.perform(n, null, e, t, o, i, r);
        }
    };
    n.exports = p;
}, function(n, e, t) {
    "use strict";
    function o() {
        A || (A = !0, x.EventEmitter.injectReactEventListener(g), x.EventPluginHub.injectEventPluginOrder(s), 
        x.EventPluginUtils.injectComponentTree(p), x.EventPluginUtils.injectTreeTraversal(m), 
        x.EventPluginHub.injectEventPluginsByName({
            SimpleEventPlugin: k,
            EnterLeaveEventPlugin: l,
            ChangeEventPlugin: a,
            SelectEventPlugin: w,
            BeforeInputEventPlugin: r
        }), x.HostComponent.injectGenericComponentClass(d), x.HostComponent.injectTextComponentClass(h), 
        x.DOMProperty.injectDOMPropertyConfig(i), x.DOMProperty.injectDOMPropertyConfig(c), 
        x.DOMProperty.injectDOMPropertyConfig(y), x.EmptyComponent.injectEmptyComponentFactory(function(n) {
            return new f(n);
        }), x.Updates.injectReconcileTransaction(v), x.Updates.injectBatchingStrategy(b), 
        x.Component.injectEnvironment(u));
    }
    var i = t(106), r = t(108), a = t(110), s = t(112), l = t(113), c = t(115), u = t(117), d = t(120), p = t(4), f = t(122), m = t(130), h = t(128), b = t(131), g = t(135), x = t(136), v = t(141), y = t(146), w = t(147), k = t(148), A = !1;
    n.exports = {
        inject: o
    };
}, function(n, e, t) {
    "use strict";
    var o = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        i.enqueueEvents(n), i.processEventQueue(!1);
    }
    var i = t(21), r = {
        handleTopLevel: function(n, e, t, r) {
            o(i.extractEvents(n, e, t, r));
        }
    };
    n.exports = r;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        for (;n._hostParent; ) n = n._hostParent;
        var e = d.getNodeFromInstance(n), t = e.parentNode;
        return d.getClosestInstanceFromNode(t);
    }
    function i(n, e) {
        this.topLevelType = n, this.nativeEvent = e, this.ancestors = [];
    }
    function r(n) {
        var e = f(n.nativeEvent), t = d.getClosestInstanceFromNode(e), i = t;
        do {
            n.ancestors.push(i), i = i && o(i);
        } while (i);
        for (var r = 0; r < n.ancestors.length; r++) t = n.ancestors[r], h._handleTopLevel(n.topLevelType, t, n.nativeEvent, f(n.nativeEvent));
    }
    function a(n) {
        n(m(window));
    }
    var s = t(3), l = t(52), c = t(5), u = t(13), d = t(4), p = t(9), f = t(43), m = t(100);
    s(i.prototype, {
        destructor: function() {
            this.topLevelType = null, this.nativeEvent = null, this.ancestors.length = 0;
        }
    }), u.addPoolingTo(i, u.twoArgumentPooler);
    var h = {
        _enabled: !0,
        _handleTopLevel: null,
        WINDOW_HANDLE: c.canUseDOM ? window : null,
        setHandleTopLevel: function(n) {
            h._handleTopLevel = n;
        },
        setEnabled: function(n) {
            h._enabled = !!n;
        },
        isEnabled: function() {
            return h._enabled;
        },
        trapBubbledEvent: function(n, e, t) {
            return t ? l.listen(t, e, h.dispatchEvent.bind(null, n)) : null;
        },
        trapCapturedEvent: function(n, e, t) {
            return t ? l.capture(t, e, h.dispatchEvent.bind(null, n)) : null;
        },
        monitorScrollValue: function(n) {
            var e = a.bind(null, n);
            l.listen(window, "scroll", e);
        },
        dispatchEvent: function(n, e) {
            if (h._enabled) {
                var t = i.getPooled(n, e);
                try {
                    p.batchedUpdates(r, t);
                } finally {
                    i.release(t);
                }
            }
        }
    };
    n.exports = h;
}, function(n, e, t) {
    "use strict";
    var o = t(15), i = t(21), r = t(34), a = t(37), s = t(61), l = t(25), c = t(63), u = t(9), d = {
        Component: a.injection,
        DOMProperty: o.injection,
        EmptyComponent: s.injection,
        EventPluginHub: i.injection,
        EventPluginUtils: r.injection,
        EventEmitter: l.injection,
        HostComponent: c.injection,
        Updates: u.injection
    };
    n.exports = d;
}, function(n, e, t) {
    "use strict";
    var o = t(159), i = /\/?>/, r = /^<\!\-\-/, a = {
        CHECKSUM_ATTR_NAME: "data-react-checksum",
        addChecksumToMarkup: function(n) {
            var e = o(n);
            return r.test(n) ? n : n.replace(i, " " + a.CHECKSUM_ATTR_NAME + '="' + e + '"$&');
        },
        canReuseMarkup: function(n, e) {
            var t = e.getAttribute(a.CHECKSUM_ATTR_NAME);
            return t = t && parseInt(t, 10), o(n) === t;
        }
    };
    n.exports = a;
}, function(n, e, t) {
    "use strict";
    function o(n, e, t) {
        return {
            type: "INSERT_MARKUP",
            content: n,
            fromIndex: null,
            fromNode: null,
            toIndex: t,
            afterNode: e
        };
    }
    function i(n, e, t) {
        return {
            type: "MOVE_EXISTING",
            content: null,
            fromIndex: n._mountIndex,
            fromNode: p.getHostNode(n),
            toIndex: t,
            afterNode: e
        };
    }
    function r(n, e) {
        return {
            type: "REMOVE_NODE",
            content: null,
            fromIndex: n._mountIndex,
            fromNode: e,
            toIndex: null,
            afterNode: null
        };
    }
    function a(n) {
        return {
            type: "SET_MARKUP",
            content: n,
            fromIndex: null,
            fromNode: null,
            toIndex: null,
            afterNode: null
        };
    }
    function s(n) {
        return {
            type: "TEXT_CONTENT",
            content: n,
            fromIndex: null,
            fromNode: null,
            toIndex: null,
            afterNode: null
        };
    }
    function l(n, e) {
        return e && (n = n || [], n.push(e)), n;
    }
    function c(n, e) {
        d.processChildrenUpdates(n, e);
    }
    var u = t(2), d = t(37), p = (t(23), t(7), t(11), t(16)), f = t(116), m = (t(6), 
    t(162)), h = (t(0), {
        Mixin: {
            _reconcilerInstantiateChildren: function(n, e, t) {
                return f.instantiateChildren(n, e, t);
            },
            _reconcilerUpdateChildren: function(n, e, t, o, i, r) {
                var a, s = 0;
                return a = m(e, s), f.updateChildren(n, a, t, o, i, this, this._hostContainerInfo, r, s), 
                a;
            },
            mountChildren: function(n, e, t) {
                var o = this._reconcilerInstantiateChildren(n, e, t);
                this._renderedChildren = o;
                var i = [], r = 0;
                for (var a in o) if (o.hasOwnProperty(a)) {
                    var s = o[a], l = 0, c = p.mountComponent(s, e, this, this._hostContainerInfo, t, l);
                    s._mountIndex = r++, i.push(c);
                }
                return i;
            },
            updateTextContent: function(n) {
                var e = this._renderedChildren;
                f.unmountChildren(e, !1);
                for (var t in e) e.hasOwnProperty(t) && u("118");
                c(this, [ s(n) ]);
            },
            updateMarkup: function(n) {
                var e = this._renderedChildren;
                f.unmountChildren(e, !1);
                for (var t in e) e.hasOwnProperty(t) && u("118");
                c(this, [ a(n) ]);
            },
            updateChildren: function(n, e, t) {
                this._updateChildren(n, e, t);
            },
            _updateChildren: function(n, e, t) {
                var o = this._renderedChildren, i = {}, r = [], a = this._reconcilerUpdateChildren(o, n, r, i, e, t);
                if (a || o) {
                    var s, u = null, d = 0, f = 0, m = 0, h = null;
                    for (s in a) if (a.hasOwnProperty(s)) {
                        var b = o && o[s], g = a[s];
                        b === g ? (u = l(u, this.moveChild(b, h, d, f)), f = Math.max(b._mountIndex, f), 
                        b._mountIndex = d) : (b && (f = Math.max(b._mountIndex, f)), u = l(u, this._mountChildAtIndex(g, r[m], h, d, e, t)), 
                        m++), d++, h = p.getHostNode(g);
                    }
                    for (s in i) i.hasOwnProperty(s) && (u = l(u, this._unmountChild(o[s], i[s])));
                    u && c(this, u), this._renderedChildren = a;
                }
            },
            unmountChildren: function(n) {
                var e = this._renderedChildren;
                f.unmountChildren(e, n), this._renderedChildren = null;
            },
            moveChild: function(n, e, t, o) {
                if (n._mountIndex < o) return i(n, e, t);
            },
            createChild: function(n, e, t) {
                return o(t, e, n._mountIndex);
            },
            removeChild: function(n, e) {
                return r(n, e);
            },
            _mountChildAtIndex: function(n, e, t, o, i, r) {
                return n._mountIndex = o, this.createChild(n, t, e);
            },
            _unmountChild: function(n, e) {
                var t = this.removeChild(n, e);
                return n._mountIndex = null, t;
            }
        }
    });
    n.exports = h;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        return !(!n || "function" != typeof n.attachRef || "function" != typeof n.detachRef);
    }
    var i = t(2), r = (t(0), {
        addComponentAsRefTo: function(n, e, t) {
            o(t) || i("119"), t.attachRef(e, n);
        },
        removeComponentAsRefFrom: function(n, e, t) {
            o(t) || i("120");
            var r = t.getPublicInstance();
            r && r.refs[e] === n.getPublicInstance() && t.detachRef(e);
        }
    });
    n.exports = r;
}, function(n, e, t) {
    "use strict";
    n.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
}, function(n, e, t) {
    "use strict";
    function o(n) {
        this.reinitializeTransaction(), this.renderToStaticMarkup = !1, this.reactMountReady = r.getPooled(null), 
        this.useCreateElement = n;
    }
    var i = t(3), r = t(57), a = t(13), s = t(25), l = t(64), c = (t(7), t(27)), u = t(39), d = {
        initialize: l.getSelectionInformation,
        close: l.restoreSelection
    }, p = {
        initialize: function() {
            var n = s.isEnabled();
            return s.setEnabled(!1), n;
        },
        close: function(n) {
            s.setEnabled(n);
        }
    }, f = {
        initialize: function() {
            this.reactMountReady.reset();
        },
        close: function() {
            this.reactMountReady.notifyAll();
        }
    }, m = [ d, p, f ], h = {
        getTransactionWrappers: function() {
            return m;
        },
        getReactMountReady: function() {
            return this.reactMountReady;
        },
        getUpdateQueue: function() {
            return u;
        },
        checkpoint: function() {
            return this.reactMountReady.checkpoint();
        },
        rollback: function(n) {
            this.reactMountReady.rollback(n);
        },
        destructor: function() {
            r.release(this.reactMountReady), this.reactMountReady = null;
        }
    };
    i(o.prototype, c, h), a.addPoolingTo(o), n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n, e, t) {
        "function" == typeof n ? n(e.getPublicInstance()) : r.addComponentAsRefTo(e, n, t);
    }
    function i(n, e, t) {
        "function" == typeof n ? n(null) : r.removeComponentAsRefFrom(e, n, t);
    }
    var r = t(139), a = {};
    a.attachRefs = function(n, e) {
        if (null !== e && "object" == typeof e) {
            var t = e.ref;
            null != t && o(t, n, e._owner);
        }
    }, a.shouldUpdateRefs = function(n, e) {
        var t = null, o = null;
        null !== n && "object" == typeof n && (t = n.ref, o = n._owner);
        var i = null, r = null;
        return null !== e && "object" == typeof e && (i = e.ref, r = e._owner), t !== i || "string" == typeof i && r !== o;
    }, a.detachRefs = function(n, e) {
        if (null !== e && "object" == typeof e) {
            var t = e.ref;
            null != t && i(t, n, e._owner);
        }
    }, n.exports = a;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        this.reinitializeTransaction(), this.renderToStaticMarkup = n, this.useCreateElement = !1, 
        this.updateQueue = new s(this);
    }
    var i = t(3), r = t(13), a = t(27), s = (t(7), t(144)), l = [], c = {
        enqueue: function() {}
    }, u = {
        getTransactionWrappers: function() {
            return l;
        },
        getReactMountReady: function() {
            return c;
        },
        getUpdateQueue: function() {
            return this.updateQueue;
        },
        destructor: function() {},
        checkpoint: function() {},
        rollback: function() {}
    };
    i(o.prototype, a, u), r.addPoolingTo(o), n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n, e) {
        if (!(n instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    function i(n, e) {
    }
    var r = t(39), a = (t(1), function() {
        function n(e) {
            o(this, n), this.transaction = e;
        }
        return n.prototype.isMounted = function(n) {
            return !1;
        }, n.prototype.enqueueCallback = function(n, e, t) {
            this.transaction.isInTransaction() && r.enqueueCallback(n, e, t);
        }, n.prototype.enqueueForceUpdate = function(n) {
            this.transaction.isInTransaction() ? r.enqueueForceUpdate(n) : i(n, "forceUpdate");
        }, n.prototype.enqueueReplaceState = function(n, e) {
            this.transaction.isInTransaction() ? r.enqueueReplaceState(n, e) : i(n, "replaceState");
        }, n.prototype.enqueueSetState = function(n, e) {
            this.transaction.isInTransaction() ? r.enqueueSetState(n, e) : i(n, "setState");
        }, n;
    }());
    n.exports = a;
}, function(n, e, t) {
    "use strict";
    n.exports = "15.4.2";
}, function(n, e, t) {
    "use strict";
    var o = {
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace"
    }, i = {
        accentHeight: "accent-height",
        accumulate: 0,
        additive: 0,
        alignmentBaseline: "alignment-baseline",
        allowReorder: "allowReorder",
        alphabetic: 0,
        amplitude: 0,
        arabicForm: "arabic-form",
        ascent: 0,
        attributeName: "attributeName",
        attributeType: "attributeType",
        autoReverse: "autoReverse",
        azimuth: 0,
        baseFrequency: "baseFrequency",
        baseProfile: "baseProfile",
        baselineShift: "baseline-shift",
        bbox: 0,
        begin: 0,
        bias: 0,
        by: 0,
        calcMode: "calcMode",
        capHeight: "cap-height",
        clip: 0,
        clipPath: "clip-path",
        clipRule: "clip-rule",
        clipPathUnits: "clipPathUnits",
        colorInterpolation: "color-interpolation",
        colorInterpolationFilters: "color-interpolation-filters",
        colorProfile: "color-profile",
        colorRendering: "color-rendering",
        contentScriptType: "contentScriptType",
        contentStyleType: "contentStyleType",
        cursor: 0,
        cx: 0,
        cy: 0,
        d: 0,
        decelerate: 0,
        descent: 0,
        diffuseConstant: "diffuseConstant",
        direction: 0,
        display: 0,
        divisor: 0,
        dominantBaseline: "dominant-baseline",
        dur: 0,
        dx: 0,
        dy: 0,
        edgeMode: "edgeMode",
        elevation: 0,
        enableBackground: "enable-background",
        end: 0,
        exponent: 0,
        externalResourcesRequired: "externalResourcesRequired",
        fill: 0,
        fillOpacity: "fill-opacity",
        fillRule: "fill-rule",
        filter: 0,
        filterRes: "filterRes",
        filterUnits: "filterUnits",
        floodColor: "flood-color",
        floodOpacity: "flood-opacity",
        focusable: 0,
        fontFamily: "font-family",
        fontSize: "font-size",
        fontSizeAdjust: "font-size-adjust",
        fontStretch: "font-stretch",
        fontStyle: "font-style",
        fontVariant: "font-variant",
        fontWeight: "font-weight",
        format: 0,
        from: 0,
        fx: 0,
        fy: 0,
        g1: 0,
        g2: 0,
        glyphName: "glyph-name",
        glyphOrientationHorizontal: "glyph-orientation-horizontal",
        glyphOrientationVertical: "glyph-orientation-vertical",
        glyphRef: "glyphRef",
        gradientTransform: "gradientTransform",
        gradientUnits: "gradientUnits",
        hanging: 0,
        horizAdvX: "horiz-adv-x",
        horizOriginX: "horiz-origin-x",
        ideographic: 0,
        imageRendering: "image-rendering",
        in: 0,
        in2: 0,
        intercept: 0,
        k: 0,
        k1: 0,
        k2: 0,
        k3: 0,
        k4: 0,
        kernelMatrix: "kernelMatrix",
        kernelUnitLength: "kernelUnitLength",
        kerning: 0,
        keyPoints: "keyPoints",
        keySplines: "keySplines",
        keyTimes: "keyTimes",
        lengthAdjust: "lengthAdjust",
        letterSpacing: "letter-spacing",
        lightingColor: "lighting-color",
        limitingConeAngle: "limitingConeAngle",
        local: 0,
        markerEnd: "marker-end",
        markerMid: "marker-mid",
        markerStart: "marker-start",
        markerHeight: "markerHeight",
        markerUnits: "markerUnits",
        markerWidth: "markerWidth",
        mask: 0,
        maskContentUnits: "maskContentUnits",
        maskUnits: "maskUnits",
        mathematical: 0,
        mode: 0,
        numOctaves: "numOctaves",
        offset: 0,
        opacity: 0,
        operator: 0,
        order: 0,
        orient: 0,
        orientation: 0,
        origin: 0,
        overflow: 0,
        overlinePosition: "overline-position",
        overlineThickness: "overline-thickness",
        paintOrder: "paint-order",
        panose1: "panose-1",
        pathLength: "pathLength",
        patternContentUnits: "patternContentUnits",
        patternTransform: "patternTransform",
        patternUnits: "patternUnits",
        pointerEvents: "pointer-events",
        points: 0,
        pointsAtX: "pointsAtX",
        pointsAtY: "pointsAtY",
        pointsAtZ: "pointsAtZ",
        preserveAlpha: "preserveAlpha",
        preserveAspectRatio: "preserveAspectRatio",
        primitiveUnits: "primitiveUnits",
        r: 0,
        radius: 0,
        refX: "refX",
        refY: "refY",
        renderingIntent: "rendering-intent",
        repeatCount: "repeatCount",
        repeatDur: "repeatDur",
        requiredExtensions: "requiredExtensions",
        requiredFeatures: "requiredFeatures",
        restart: 0,
        result: 0,
        rotate: 0,
        rx: 0,
        ry: 0,
        scale: 0,
        seed: 0,
        shapeRendering: "shape-rendering",
        slope: 0,
        spacing: 0,
        specularConstant: "specularConstant",
        specularExponent: "specularExponent",
        speed: 0,
        spreadMethod: "spreadMethod",
        startOffset: "startOffset",
        stdDeviation: "stdDeviation",
        stemh: 0,
        stemv: 0,
        stitchTiles: "stitchTiles",
        stopColor: "stop-color",
        stopOpacity: "stop-opacity",
        strikethroughPosition: "strikethrough-position",
        strikethroughThickness: "strikethrough-thickness",
        string: 0,
        stroke: 0,
        strokeDasharray: "stroke-dasharray",
        strokeDashoffset: "stroke-dashoffset",
        strokeLinecap: "stroke-linecap",
        strokeLinejoin: "stroke-linejoin",
        strokeMiterlimit: "stroke-miterlimit",
        strokeOpacity: "stroke-opacity",
        strokeWidth: "stroke-width",
        surfaceScale: "surfaceScale",
        systemLanguage: "systemLanguage",
        tableValues: "tableValues",
        targetX: "targetX",
        targetY: "targetY",
        textAnchor: "text-anchor",
        textDecoration: "text-decoration",
        textRendering: "text-rendering",
        textLength: "textLength",
        to: 0,
        transform: 0,
        u1: 0,
        u2: 0,
        underlinePosition: "underline-position",
        underlineThickness: "underline-thickness",
        unicode: 0,
        unicodeBidi: "unicode-bidi",
        unicodeRange: "unicode-range",
        unitsPerEm: "units-per-em",
        vAlphabetic: "v-alphabetic",
        vHanging: "v-hanging",
        vIdeographic: "v-ideographic",
        vMathematical: "v-mathematical",
        values: 0,
        vectorEffect: "vector-effect",
        version: 0,
        vertAdvY: "vert-adv-y",
        vertOriginX: "vert-origin-x",
        vertOriginY: "vert-origin-y",
        viewBox: "viewBox",
        viewTarget: "viewTarget",
        visibility: 0,
        widths: 0,
        wordSpacing: "word-spacing",
        writingMode: "writing-mode",
        x: 0,
        xHeight: "x-height",
        x1: 0,
        x2: 0,
        xChannelSelector: "xChannelSelector",
        xlinkActuate: "xlink:actuate",
        xlinkArcrole: "xlink:arcrole",
        xlinkHref: "xlink:href",
        xlinkRole: "xlink:role",
        xlinkShow: "xlink:show",
        xlinkTitle: "xlink:title",
        xlinkType: "xlink:type",
        xmlBase: "xml:base",
        xmlns: 0,
        xmlnsXlink: "xmlns:xlink",
        xmlLang: "xml:lang",
        xmlSpace: "xml:space",
        y: 0,
        y1: 0,
        y2: 0,
        yChannelSelector: "yChannelSelector",
        z: 0,
        zoomAndPan: "zoomAndPan"
    }, r = {
        Properties: {},
        DOMAttributeNamespaces: {
            xlinkActuate: o.xlink,
            xlinkArcrole: o.xlink,
            xlinkHref: o.xlink,
            xlinkRole: o.xlink,
            xlinkShow: o.xlink,
            xlinkTitle: o.xlink,
            xlinkType: o.xlink,
            xmlBase: o.xml,
            xmlLang: o.xml,
            xmlSpace: o.xml
        },
        DOMAttributeNames: {}
    };
    Object.keys(i).forEach(function(n) {
        r.Properties[n] = 0, i[n] && (r.DOMAttributeNames[n] = i[n]);
    }), n.exports = r;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        if ("selectionStart" in n && l.hasSelectionCapabilities(n)) return {
            start: n.selectionStart,
            end: n.selectionEnd
        };
        if (window.getSelection) {
            var e = window.getSelection();
            return {
                anchorNode: e.anchorNode,
                anchorOffset: e.anchorOffset,
                focusNode: e.focusNode,
                focusOffset: e.focusOffset
            };
        }
        if (document.selection) {
            var t = document.selection.createRange();
            return {
                parentElement: t.parentElement(),
                text: t.text,
                top: t.boundingTop,
                left: t.boundingLeft
            };
        }
    }
    function i(n, e) {
        if (x || null == h || h !== u()) return null;
        var t = o(h);
        if (!g || !p(g, t)) {
            g = t;
            var i = c.getPooled(m.select, b, n, e);
            return i.type = "select", i.target = h, r.accumulateTwoPhaseDispatches(i), i;
        }
        return null;
    }
    var r = t(22), a = t(5), s = t(4), l = t(64), c = t(10), u = t(54), d = t(73), p = t(30), f = a.canUseDOM && "documentMode" in document && document.documentMode <= 11, m = {
        select: {
            phasedRegistrationNames: {
                bubbled: "onSelect",
                captured: "onSelectCapture"
            },
            dependencies: [ "topBlur", "topContextMenu", "topFocus", "topKeyDown", "topKeyUp", "topMouseDown", "topMouseUp", "topSelectionChange" ]
        }
    }, h = null, b = null, g = null, x = !1, v = !1, y = {
        eventTypes: m,
        extractEvents: function(n, e, t, o) {
            if (!v) return null;
            var r = e ? s.getNodeFromInstance(e) : window;
            switch (n) {
              case "topFocus":
                (d(r) || "true" === r.contentEditable) && (h = r, b = e, g = null);
                break;

              case "topBlur":
                h = null, b = null, g = null;
                break;

              case "topMouseDown":
                x = !0;
                break;

              case "topContextMenu":
              case "topMouseUp":
                return x = !1, i(t, o);

              case "topSelectionChange":
                if (f) break;

              case "topKeyDown":
              case "topKeyUp":
                return i(t, o);
            }
            return null;
        },
        didPutListener: function(n, e, t) {
            "onSelect" === e && (v = !0);
        }
    };
    n.exports = y;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        return "." + n._rootNodeID;
    }
    function i(n) {
        return "button" === n || "input" === n || "select" === n || "textarea" === n;
    }
    var r = t(2), a = t(52), s = t(22), l = t(4), c = t(149), u = t(150), d = t(10), p = t(153), f = t(155), m = t(26), h = t(152), b = t(156), g = t(157), x = t(24), v = t(158), y = t(6), w = t(41), k = (t(0), 
    {}), A = {};
    [ "abort", "animationEnd", "animationIteration", "animationStart", "blur", "canPlay", "canPlayThrough", "click", "contextMenu", "copy", "cut", "doubleClick", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "focus", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "progress", "rateChange", "reset", "scroll", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchMove", "touchStart", "transitionEnd", "volumeChange", "waiting", "wheel" ].forEach(function(n) {
        var e = n[0].toUpperCase() + n.slice(1), t = "on" + e, o = "top" + e, i = {
            phasedRegistrationNames: {
                bubbled: t,
                captured: t + "Capture"
            },
            dependencies: [ o ]
        };
        k[n] = i, A[o] = i;
    });
    var E = {}, C = {
        eventTypes: k,
        extractEvents: function(n, e, t, o) {
            var i = A[n];
            if (!i) return null;
            var a;
            switch (n) {
              case "topAbort":
              case "topCanPlay":
              case "topCanPlayThrough":
              case "topDurationChange":
              case "topEmptied":
              case "topEncrypted":
              case "topEnded":
              case "topError":
              case "topInput":
              case "topInvalid":
              case "topLoad":
              case "topLoadedData":
              case "topLoadedMetadata":
              case "topLoadStart":
              case "topPause":
              case "topPlay":
              case "topPlaying":
              case "topProgress":
              case "topRateChange":
              case "topReset":
              case "topSeeked":
              case "topSeeking":
              case "topStalled":
              case "topSubmit":
              case "topSuspend":
              case "topTimeUpdate":
              case "topVolumeChange":
              case "topWaiting":
                a = d;
                break;

              case "topKeyPress":
                if (0 === w(t)) return null;

              case "topKeyDown":
              case "topKeyUp":
                a = f;
                break;

              case "topBlur":
              case "topFocus":
                a = p;
                break;

              case "topClick":
                if (2 === t.button) return null;

              case "topDoubleClick":
              case "topMouseDown":
              case "topMouseMove":
              case "topMouseUp":
              case "topMouseOut":
              case "topMouseOver":
              case "topContextMenu":
                a = m;
                break;

              case "topDrag":
              case "topDragEnd":
              case "topDragEnter":
              case "topDragExit":
              case "topDragLeave":
              case "topDragOver":
              case "topDragStart":
              case "topDrop":
                a = h;
                break;

              case "topTouchCancel":
              case "topTouchEnd":
              case "topTouchMove":
              case "topTouchStart":
                a = b;
                break;

              case "topAnimationEnd":
              case "topAnimationIteration":
              case "topAnimationStart":
                a = c;
                break;

              case "topTransitionEnd":
                a = g;
                break;

              case "topScroll":
                a = x;
                break;

              case "topWheel":
                a = v;
                break;

              case "topCopy":
              case "topCut":
              case "topPaste":
                a = u;
            }
            a || r("86", n);
            var l = a.getPooled(i, e, t, o);
            return s.accumulateTwoPhaseDispatches(l), l;
        },
        didPutListener: function(n, e, t) {
            if ("onClick" === e && !i(n._tag)) {
                var r = o(n), s = l.getNodeFromInstance(n);
                E[r] || (E[r] = a.listen(s, "click", y));
            }
        },
        willDeleteListener: function(n, e) {
            if ("onClick" === e && !i(n._tag)) {
                var t = o(n);
                E[t].remove(), delete E[t];
            }
        }
    };
    n.exports = C;
}, function(n, e, t) {
    "use strict";
    function o(n, e, t, o) {
        return i.call(this, n, e, t, o);
    }
    var i = t(10), r = {
        animationName: null,
        elapsedTime: null,
        pseudoElement: null
    };
    i.augmentClass(o, r), n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n, e, t, o) {
        return i.call(this, n, e, t, o);
    }
    var i = t(10), r = {
        clipboardData: function(n) {
            return "clipboardData" in n ? n.clipboardData : window.clipboardData;
        }
    };
    i.augmentClass(o, r), n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n, e, t, o) {
        return i.call(this, n, e, t, o);
    }
    var i = t(10), r = {
        data: null
    };
    i.augmentClass(o, r), n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n, e, t, o) {
        return i.call(this, n, e, t, o);
    }
    var i = t(26), r = {
        dataTransfer: null
    };
    i.augmentClass(o, r), n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n, e, t, o) {
        return i.call(this, n, e, t, o);
    }
    var i = t(24), r = {
        relatedTarget: null
    };
    i.augmentClass(o, r), n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n, e, t, o) {
        return i.call(this, n, e, t, o);
    }
    var i = t(10), r = {
        data: null
    };
    i.augmentClass(o, r), n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n, e, t, o) {
        return i.call(this, n, e, t, o);
    }
    var i = t(24), r = t(41), a = t(163), s = t(42), l = {
        key: a,
        location: null,
        ctrlKey: null,
        shiftKey: null,
        altKey: null,
        metaKey: null,
        repeat: null,
        locale: null,
        getModifierState: s,
        charCode: function(n) {
            return "keypress" === n.type ? r(n) : 0;
        },
        keyCode: function(n) {
            return "keydown" === n.type || "keyup" === n.type ? n.keyCode : 0;
        },
        which: function(n) {
            return "keypress" === n.type ? r(n) : "keydown" === n.type || "keyup" === n.type ? n.keyCode : 0;
        }
    };
    i.augmentClass(o, l), n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n, e, t, o) {
        return i.call(this, n, e, t, o);
    }
    var i = t(24), r = t(42), a = {
        touches: null,
        targetTouches: null,
        changedTouches: null,
        altKey: null,
        metaKey: null,
        ctrlKey: null,
        shiftKey: null,
        getModifierState: r
    };
    i.augmentClass(o, a), n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n, e, t, o) {
        return i.call(this, n, e, t, o);
    }
    var i = t(10), r = {
        propertyName: null,
        elapsedTime: null,
        pseudoElement: null
    };
    i.augmentClass(o, r), n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n, e, t, o) {
        return i.call(this, n, e, t, o);
    }
    var i = t(26), r = {
        deltaX: function(n) {
            return "deltaX" in n ? n.deltaX : "wheelDeltaX" in n ? -n.wheelDeltaX : 0;
        },
        deltaY: function(n) {
            return "deltaY" in n ? n.deltaY : "wheelDeltaY" in n ? -n.wheelDeltaY : "wheelDelta" in n ? -n.wheelDelta : 0;
        },
        deltaZ: null,
        deltaMode: null
    };
    i.augmentClass(o, r), n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        for (var e = 1, t = 0, o = 0, r = n.length, a = -4 & r; o < a; ) {
            for (var s = Math.min(o + 4096, a); o < s; o += 4) t += (e += n.charCodeAt(o)) + (e += n.charCodeAt(o + 1)) + (e += n.charCodeAt(o + 2)) + (e += n.charCodeAt(o + 3));
            e %= i, t %= i;
        }
        for (;o < r; o++) t += e += n.charCodeAt(o);
        return e %= i, t %= i, e | t << 16;
    }
    var i = 65521;
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n, e, t) {
        if (null == e || "boolean" == typeof e || "" === e) return "";
        if (isNaN(e) || 0 === e || r.hasOwnProperty(n) && r[n]) return "" + e;
        if ("string" == typeof e) {
            e = e.trim();
        }
        return e + "px";
    }
    var i = t(56), r = (t(1), i.isUnitlessNumber);
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        if (null == n) return null;
        if (1 === n.nodeType) return n;
        var e = a.get(n);
        if (e) return e = s(e), e ? r.getNodeFromInstance(e) : null;
        "function" == typeof n.render ? i("44") : i("45", Object.keys(n));
    }
    var i = t(2), r = (t(11), t(4)), a = t(23), s = t(70);
    t(0), t(1);
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    (function(e) {
        function o(n, e, t, o) {
            if (n && "object" == typeof n) {
                var i = n, r = void 0 === i[t];
                r && null != e && (i[t] = e);
            }
        }
        function i(n, e) {
            if (null == n) return n;
            var t = {};
            return r(n, o, t), t;
        }
        var r = (t(35), t(75));
        t(1);
        void 0 !== e && t.i({
            NODE_ENV: "production"
        }), n.exports = i;
    }).call(e, t(55));
}, function(n, e, t) {
    "use strict";
    function o(n) {
        if (n.key) {
            var e = r[n.key] || n.key;
            if ("Unidentified" !== e) return e;
        }
        if ("keypress" === n.type) {
            var t = i(n);
            return 13 === t ? "Enter" : String.fromCharCode(t);
        }
        return "keydown" === n.type || "keyup" === n.type ? a[n.keyCode] || "Unidentified" : "";
    }
    var i = t(41), r = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
    }, a = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
    };
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        var e = n && (i && n[i] || n[r]);
        if ("function" == typeof e) return e;
    }
    var i = "function" == typeof Symbol && Symbol.iterator, r = "@@iterator";
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o() {
        return i++;
    }
    var i = 1;
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        for (;n && n.firstChild; ) n = n.firstChild;
        return n;
    }
    function i(n) {
        for (;n; ) {
            if (n.nextSibling) return n.nextSibling;
            n = n.parentNode;
        }
    }
    function r(n, e) {
        for (var t = o(n), r = 0, a = 0; t; ) {
            if (3 === t.nodeType) {
                if (a = r + t.textContent.length, r <= e && a >= e) return {
                    node: t,
                    offset: e - r
                };
                r = a;
            }
            t = o(i(t));
        }
    }
    n.exports = r;
}, function(n, e, t) {
    "use strict";
    function o(n, e) {
        var t = {};
        return t[n.toLowerCase()] = e.toLowerCase(), t["Webkit" + n] = "webkit" + e, t["Moz" + n] = "moz" + e, 
        t["ms" + n] = "MS" + e, t["O" + n] = "o" + e.toLowerCase(), t;
    }
    function i(n) {
        if (s[n]) return s[n];
        if (!a[n]) return n;
        var e = a[n];
        for (var t in e) if (e.hasOwnProperty(t) && t in l) return s[n] = e[t];
        return "";
    }
    var r = t(5), a = {
        animationend: o("Animation", "AnimationEnd"),
        animationiteration: o("Animation", "AnimationIteration"),
        animationstart: o("Animation", "AnimationStart"),
        transitionend: o("Transition", "TransitionEnd")
    }, s = {}, l = {};
    r.canUseDOM && (l = document.createElement("div").style, "AnimationEvent" in window || (delete a.animationend.animation, 
    delete a.animationiteration.animation, delete a.animationstart.animation), "TransitionEvent" in window || delete a.transitionend.transition), 
    n.exports = i;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        return '"' + i(n) + '"';
    }
    var i = t(28);
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    var o = t(65);
    n.exports = o.renderSubtreeIntoContainer;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        var e = /[=:]/g, t = {
            "=": "=0",
            ":": "=2"
        };
        return "$" + ("" + n).replace(e, function(n) {
            return t[n];
        });
    }
    function i(n) {
        var e = /(=0|=2)/g, t = {
            "=0": "=",
            "=2": ":"
        };
        return ("" + ("." === n[0] && "$" === n[1] ? n.substring(2) : n.substring(1))).replace(e, function(n) {
            return t[n];
        });
    }
    var r = {
        escape: o,
        unescape: i
    };
    n.exports = r;
}, function(n, e, t) {
    "use strict";
    var o = t(19), i = (t(0), function(n) {
        var e = this;
        if (e.instancePool.length) {
            var t = e.instancePool.pop();
            return e.call(t, n), t;
        }
        return new e(n);
    }), r = function(n, e) {
        var t = this;
        if (t.instancePool.length) {
            var o = t.instancePool.pop();
            return t.call(o, n, e), o;
        }
        return new t(n, e);
    }, a = function(n, e, t) {
        var o = this;
        if (o.instancePool.length) {
            var i = o.instancePool.pop();
            return o.call(i, n, e, t), i;
        }
        return new o(n, e, t);
    }, s = function(n, e, t, o) {
        var i = this;
        if (i.instancePool.length) {
            var r = i.instancePool.pop();
            return i.call(r, n, e, t, o), r;
        }
        return new i(n, e, t, o);
    }, l = function(n) {
        var e = this;
        n instanceof e || o("25"), n.destructor(), e.instancePool.length < e.poolSize && e.instancePool.push(n);
    }, c = 10, u = i, d = function(n, e) {
        var t = n;
        return t.instancePool = [], t.getPooled = e || u, t.poolSize || (t.poolSize = c), 
        t.release = l, t;
    }, p = {
        addPoolingTo: d,
        oneArgumentPooler: i,
        twoArgumentPooler: r,
        threeArgumentPooler: a,
        fourArgumentPooler: s
    };
    n.exports = p;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        return ("" + n).replace(y, "$&/");
    }
    function i(n, e) {
        this.func = n, this.context = e, this.count = 0;
    }
    function r(n, e, t) {
        var o = n.func, i = n.context;
        o.call(i, e, n.count++);
    }
    function a(n, e, t) {
        if (null == n) return n;
        var o = i.getPooled(e, t);
        g(n, r, o), i.release(o);
    }
    function s(n, e, t, o) {
        this.result = n, this.keyPrefix = e, this.func = t, this.context = o, this.count = 0;
    }
    function l(n, e, t) {
        var i = n.result, r = n.keyPrefix, a = n.func, s = n.context, l = a.call(s, e, n.count++);
        Array.isArray(l) ? c(l, i, t, b.thatReturnsArgument) : null != l && (h.isValidElement(l) && (l = h.cloneAndReplaceKey(l, r + (!l.key || e && e.key === l.key ? "" : o(l.key) + "/") + t)), 
        i.push(l));
    }
    function c(n, e, t, i, r) {
        var a = "";
        null != t && (a = o(t) + "/");
        var c = s.getPooled(e, a, i, r);
        g(n, l, c), s.release(c);
    }
    function u(n, e, t) {
        if (null == n) return n;
        var o = [];
        return c(n, o, null, e, t), o;
    }
    function d(n, e, t) {
        return null;
    }
    function p(n, e) {
        return g(n, d, null);
    }
    function f(n) {
        var e = [];
        return c(n, e, null, b.thatReturnsArgument), e;
    }
    var m = t(171), h = t(18), b = t(6), g = t(180), x = m.twoArgumentPooler, v = m.fourArgumentPooler, y = /\/+/g;
    i.prototype.destructor = function() {
        this.func = null, this.context = null, this.count = 0;
    }, m.addPoolingTo(i, x), s.prototype.destructor = function() {
        this.result = null, this.keyPrefix = null, this.func = null, this.context = null, 
        this.count = 0;
    }, m.addPoolingTo(s, v);
    var w = {
        forEach: a,
        map: u,
        mapIntoWithKeyPrefixInternal: c,
        count: p,
        toArray: f
    };
    n.exports = w;
}, function(n, e, t) {
    "use strict";
    function o(n) {
        return n;
    }
    function i(n, e) {
        var t = y.hasOwnProperty(e) ? y[e] : null;
        k.hasOwnProperty(e) && "OVERRIDE_BASE" !== t && p("73", e), n && "DEFINE_MANY" !== t && "DEFINE_MANY_MERGED" !== t && p("74", e);
    }
    function r(n, e) {
        if (e) {
            "function" == typeof e && p("75"), h.isValidElement(e) && p("76");
            var t = n.prototype, o = t.__reactAutoBindPairs;
            e.hasOwnProperty(x) && w.mixins(n, e.mixins);
            for (var r in e) if (e.hasOwnProperty(r) && r !== x) {
                var a = e[r], s = t.hasOwnProperty(r);
                if (i(s, r), w.hasOwnProperty(r)) w[r](n, a); else {
                    var u = y.hasOwnProperty(r), d = "function" == typeof a, f = d && !u && !s && !1 !== e.autobind;
                    if (f) o.push(r, a), t[r] = a; else if (s) {
                        var m = y[r];
                        (!u || "DEFINE_MANY_MERGED" !== m && "DEFINE_MANY" !== m) && p("77", m, r), "DEFINE_MANY_MERGED" === m ? t[r] = l(t[r], a) : "DEFINE_MANY" === m && (t[r] = c(t[r], a));
                    } else t[r] = a;
                }
            }
        } else ;
    }
    function a(n, e) {
        if (e) for (var t in e) {
            var o = e[t];
            if (e.hasOwnProperty(t)) {
                var i = t in w;
                i && p("78", t);
                var r = t in n;
                r && p("79", t), n[t] = o;
            }
        }
    }
    function s(n, e) {
        n && e && "object" == typeof n && "object" == typeof e || p("80");
        for (var t in e) e.hasOwnProperty(t) && (void 0 !== n[t] && p("81", t), n[t] = e[t]);
        return n;
    }
    function l(n, e) {
        return function() {
            var t = n.apply(this, arguments), o = e.apply(this, arguments);
            if (null == t) return o;
            if (null == o) return t;
            var i = {};
            return s(i, t), s(i, o), i;
        };
    }
    function c(n, e) {
        return function() {
            n.apply(this, arguments), e.apply(this, arguments);
        };
    }
    function u(n, e) {
        var t = e.bind(n);
        return t;
    }
    function d(n) {
        for (var e = n.__reactAutoBindPairs, t = 0; t < e.length; t += 2) {
            var o = e[t], i = e[t + 1];
            n[o] = u(n, i);
        }
    }
    var p = t(19), f = t(3), m = t(47), h = t(18), b = (t(78), t(48)), g = t(20), x = (t(0), 
    t(1), "mixins"), v = [], y = {
        mixins: "DEFINE_MANY",
        statics: "DEFINE_MANY",
        propTypes: "DEFINE_MANY",
        contextTypes: "DEFINE_MANY",
        childContextTypes: "DEFINE_MANY",
        getDefaultProps: "DEFINE_MANY_MERGED",
        getInitialState: "DEFINE_MANY_MERGED",
        getChildContext: "DEFINE_MANY_MERGED",
        render: "DEFINE_ONCE",
        componentWillMount: "DEFINE_MANY",
        componentDidMount: "DEFINE_MANY",
        componentWillReceiveProps: "DEFINE_MANY",
        shouldComponentUpdate: "DEFINE_ONCE",
        componentWillUpdate: "DEFINE_MANY",
        componentDidUpdate: "DEFINE_MANY",
        componentWillUnmount: "DEFINE_MANY",
        updateComponent: "OVERRIDE_BASE"
    }, w = {
        displayName: function(n, e) {
            n.displayName = e;
        },
        mixins: function(n, e) {
            if (e) for (var t = 0; t < e.length; t++) r(n, e[t]);
        },
        childContextTypes: function(n, e) {
            n.childContextTypes = f({}, n.childContextTypes, e);
        },
        contextTypes: function(n, e) {
            n.contextTypes = f({}, n.contextTypes, e);
        },
        getDefaultProps: function(n, e) {
            n.getDefaultProps ? n.getDefaultProps = l(n.getDefaultProps, e) : n.getDefaultProps = e;
        },
        propTypes: function(n, e) {
            n.propTypes = f({}, n.propTypes, e);
        },
        statics: function(n, e) {
            a(n, e);
        },
        autobind: function() {}
    }, k = {
        replaceState: function(n, e) {
            this.updater.enqueueReplaceState(this, n), e && this.updater.enqueueCallback(this, e, "replaceState");
        },
        isMounted: function() {
            return this.updater.isMounted(this);
        }
    }, A = function() {};
    f(A.prototype, m.prototype, k);
    var E = {
        createClass: function(n) {
            var e = o(function(n, t, o) {
                this.__reactAutoBindPairs.length && d(this), this.props = n, this.context = t, this.refs = g, 
                this.updater = o || b, this.state = null;
                var i = this.getInitialState ? this.getInitialState() : null;
                ("object" != typeof i || Array.isArray(i)) && p("82", e.displayName || "ReactCompositeComponent"), 
                this.state = i;
            });
            e.prototype = new A(), e.prototype.constructor = e, e.prototype.__reactAutoBindPairs = [], 
            v.forEach(r.bind(null, e)), r(e, n), e.getDefaultProps && (e.defaultProps = e.getDefaultProps()), 
            e.prototype.render || p("83");
            for (var t in y) e.prototype[t] || (e.prototype[t] = null);
            return e;
        },
        injection: {
            injectMixin: function(n) {
                v.push(n);
            }
        }
    };
    n.exports = E;
}, function(n, e, t) {
    "use strict";
    var o = t(18), i = o.createFactory, r = {
        a: i("a"),
        abbr: i("abbr"),
        address: i("address"),
        area: i("area"),
        article: i("article"),
        aside: i("aside"),
        audio: i("audio"),
        b: i("b"),
        base: i("base"),
        bdi: i("bdi"),
        bdo: i("bdo"),
        big: i("big"),
        blockquote: i("blockquote"),
        body: i("body"),
        br: i("br"),
        button: i("button"),
        canvas: i("canvas"),
        caption: i("caption"),
        cite: i("cite"),
        code: i("code"),
        col: i("col"),
        colgroup: i("colgroup"),
        data: i("data"),
        datalist: i("datalist"),
        dd: i("dd"),
        del: i("del"),
        details: i("details"),
        dfn: i("dfn"),
        dialog: i("dialog"),
        div: i("div"),
        dl: i("dl"),
        dt: i("dt"),
        em: i("em"),
        embed: i("embed"),
        fieldset: i("fieldset"),
        figcaption: i("figcaption"),
        figure: i("figure"),
        footer: i("footer"),
        form: i("form"),
        h1: i("h1"),
        h2: i("h2"),
        h3: i("h3"),
        h4: i("h4"),
        h5: i("h5"),
        h6: i("h6"),
        head: i("head"),
        header: i("header"),
        hgroup: i("hgroup"),
        hr: i("hr"),
        html: i("html"),
        i: i("i"),
        iframe: i("iframe"),
        img: i("img"),
        input: i("input"),
        ins: i("ins"),
        kbd: i("kbd"),
        keygen: i("keygen"),
        label: i("label"),
        legend: i("legend"),
        li: i("li"),
        link: i("link"),
        main: i("main"),
        map: i("map"),
        mark: i("mark"),
        menu: i("menu"),
        menuitem: i("menuitem"),
        meta: i("meta"),
        meter: i("meter"),
        nav: i("nav"),
        noscript: i("noscript"),
        object: i("object"),
        ol: i("ol"),
        optgroup: i("optgroup"),
        option: i("option"),
        output: i("output"),
        p: i("p"),
        param: i("param"),
        picture: i("picture"),
        pre: i("pre"),
        progress: i("progress"),
        q: i("q"),
        rp: i("rp"),
        rt: i("rt"),
        ruby: i("ruby"),
        s: i("s"),
        samp: i("samp"),
        script: i("script"),
        section: i("section"),
        select: i("select"),
        small: i("small"),
        source: i("source"),
        span: i("span"),
        strong: i("strong"),
        style: i("style"),
        sub: i("sub"),
        summary: i("summary"),
        sup: i("sup"),
        table: i("table"),
        tbody: i("tbody"),
        td: i("td"),
        textarea: i("textarea"),
        tfoot: i("tfoot"),
        th: i("th"),
        thead: i("thead"),
        time: i("time"),
        title: i("title"),
        tr: i("tr"),
        track: i("track"),
        u: i("u"),
        ul: i("ul"),
        var: i("var"),
        video: i("video"),
        wbr: i("wbr"),
        circle: i("circle"),
        clipPath: i("clipPath"),
        defs: i("defs"),
        ellipse: i("ellipse"),
        g: i("g"),
        image: i("image"),
        line: i("line"),
        linearGradient: i("linearGradient"),
        mask: i("mask"),
        path: i("path"),
        pattern: i("pattern"),
        polygon: i("polygon"),
        polyline: i("polyline"),
        radialGradient: i("radialGradient"),
        rect: i("rect"),
        stop: i("stop"),
        svg: i("svg"),
        text: i("text"),
        tspan: i("tspan")
    };
    n.exports = r;
}, function(n, e, t) {
    "use strict";
    function o(n, e) {
        return n === e ? 0 !== n || 1 / n == 1 / e : n !== n && e !== e;
    }
    function i(n) {
        this.message = n, this.stack = "";
    }
    function r(n) {
        function e(e, t, o, r, a, s, l) {
            r = r || _, s = s || o;
            if (null == t[o]) {
                var c = k[a];
                return e ? new i(null === t[o] ? "The " + c + " `" + s + "` is marked as required in `" + r + "`, but its value is `null`." : "The " + c + " `" + s + "` is marked as required in `" + r + "`, but its value is `undefined`.") : null;
            }
            return n(t, o, r, a, s);
        }
        var t = e.bind(null, !1);
        return t.isRequired = e.bind(null, !0), t;
    }
    function a(n) {
        function e(e, t, o, r, a, s) {
            var l = e[t];
            if (x(l) !== n) return new i("Invalid " + k[r] + " `" + a + "` of type `" + v(l) + "` supplied to `" + o + "`, expected `" + n + "`.");
            return null;
        }
        return r(e);
    }
    function s() {
        return r(E.thatReturns(null));
    }
    function l(n) {
        function e(e, t, o, r, a) {
            if ("function" != typeof n) return new i("Property `" + a + "` of component `" + o + "` has invalid PropType notation inside arrayOf.");
            var s = e[t];
            if (!Array.isArray(s)) {
                return new i("Invalid " + k[r] + " `" + a + "` of type `" + x(s) + "` supplied to `" + o + "`, expected an array.");
            }
            for (var l = 0; l < s.length; l++) {
                var c = n(s, l, o, r, a + "[" + l + "]", A);
                if (c instanceof Error) return c;
            }
            return null;
        }
        return r(e);
    }
    function c() {
        function n(n, e, t, o, r) {
            var a = n[e];
            if (!w.isValidElement(a)) {
                return new i("Invalid " + k[o] + " `" + r + "` of type `" + x(a) + "` supplied to `" + t + "`, expected a single ReactElement.");
            }
            return null;
        }
        return r(n);
    }
    function u(n) {
        function e(e, t, o, r, a) {
            if (!(e[t] instanceof n)) {
                var s = k[r], l = n.name || _;
                return new i("Invalid " + s + " `" + a + "` of type `" + y(e[t]) + "` supplied to `" + o + "`, expected instance of `" + l + "`.");
            }
            return null;
        }
        return r(e);
    }
    function d(n) {
        function e(e, t, r, a, s) {
            for (var l = e[t], c = 0; c < n.length; c++) if (o(l, n[c])) return null;
            return new i("Invalid " + k[a] + " `" + s + "` of value `" + l + "` supplied to `" + r + "`, expected one of " + JSON.stringify(n) + ".");
        }
        return Array.isArray(n) ? r(e) : E.thatReturnsNull;
    }
    function p(n) {
        function e(e, t, o, r, a) {
            if ("function" != typeof n) return new i("Property `" + a + "` of component `" + o + "` has invalid PropType notation inside objectOf.");
            var s = e[t], l = x(s);
            if ("object" !== l) {
                return new i("Invalid " + k[r] + " `" + a + "` of type `" + l + "` supplied to `" + o + "`, expected an object.");
            }
            for (var c in s) if (s.hasOwnProperty(c)) {
                var u = n(s, c, o, r, a + "." + c, A);
                if (u instanceof Error) return u;
            }
            return null;
        }
        return r(e);
    }
    function f(n) {
        function e(e, t, o, r, a) {
            for (var s = 0; s < n.length; s++) {
                if (null == (0, n[s])(e, t, o, r, a, A)) return null;
            }
            return new i("Invalid " + k[r] + " `" + a + "` supplied to `" + o + "`.");
        }
        return Array.isArray(n) ? r(e) : E.thatReturnsNull;
    }
    function m() {
        function n(n, e, t, o, r) {
            if (!b(n[e])) {
                return new i("Invalid " + k[o] + " `" + r + "` supplied to `" + t + "`, expected a ReactNode.");
            }
            return null;
        }
        return r(n);
    }
    function h(n) {
        function e(e, t, o, r, a) {
            var s = e[t], l = x(s);
            if ("object" !== l) {
                return new i("Invalid " + k[r] + " `" + a + "` of type `" + l + "` supplied to `" + o + "`, expected `object`.");
            }
            for (var c in n) {
                var u = n[c];
                if (u) {
                    var d = u(s, c, o, r, a + "." + c, A);
                    if (d) return d;
                }
            }
            return null;
        }
        return r(e);
    }
    function b(n) {
        switch (typeof n) {
          case "number":
          case "string":
          case "undefined":
            return !0;

          case "boolean":
            return !n;

          case "object":
            if (Array.isArray(n)) return n.every(b);
            if (null === n || w.isValidElement(n)) return !0;
            var e = C(n);
            if (!e) return !1;
            var t, o = e.call(n);
            if (e !== n.entries) {
                for (;!(t = o.next()).done; ) if (!b(t.value)) return !1;
            } else for (;!(t = o.next()).done; ) {
                var i = t.value;
                if (i && !b(i[1])) return !1;
            }
            return !0;

          default:
            return !1;
        }
    }
    function g(n, e) {
        return "symbol" === n || ("Symbol" === e["@@toStringTag"] || "function" == typeof Symbol && e instanceof Symbol);
    }
    function x(n) {
        var e = typeof n;
        return Array.isArray(n) ? "array" : n instanceof RegExp ? "object" : g(e, n) ? "symbol" : e;
    }
    function v(n) {
        var e = x(n);
        if ("object" === e) {
            if (n instanceof Date) return "date";
            if (n instanceof RegExp) return "regexp";
        }
        return e;
    }
    function y(n) {
        return n.constructor && n.constructor.name ? n.constructor.name : _;
    }
    var w = t(18), k = t(78), A = t(176), E = t(6), C = t(80), _ = (t(1), "<<anonymous>>"), M = {
        array: a("array"),
        bool: a("boolean"),
        func: a("function"),
        number: a("number"),
        object: a("object"),
        string: a("string"),
        symbol: a("symbol"),
        any: s(),
        arrayOf: l,
        element: c(),
        instanceOf: u,
        node: m(),
        objectOf: p,
        oneOf: d,
        oneOfType: f,
        shape: h
    };
    i.prototype = Error.prototype, n.exports = M;
}, function(n, e, t) {
    "use strict";
    n.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
}, function(n, e, t) {
    "use strict";
    function o(n, e, t) {
        this.props = n, this.context = e, this.refs = l, this.updater = t || s;
    }
    function i() {}
    var r = t(3), a = t(47), s = t(48), l = t(20);
    i.prototype = a.prototype, o.prototype = new i(), o.prototype.constructor = o, r(o.prototype, a.prototype), 
    o.prototype.isPureReactComponent = !0, n.exports = o;
}, function(n, e, t) {
    "use strict";
    n.exports = "15.4.2";
}, function(n, e, t) {
    "use strict";
    function o(n) {
        return r.isValidElement(n) || i("143"), n;
    }
    var i = t(19), r = t(18);
    t(0);
    n.exports = o;
}, function(n, e, t) {
    "use strict";
    function o(n, e) {
        return n && "object" == typeof n && null != n.key ? c.escape(n.key) : e.toString(36);
    }
    function i(n, e, t, r) {
        var p = typeof n;
        if ("undefined" !== p && "boolean" !== p || (n = null), null === n || "string" === p || "number" === p || "object" === p && n.$$typeof === s) return t(r, n, "" === e ? u + o(n, 0) : e), 
        1;
        var f, m, h = 0, b = "" === e ? u : e + d;
        if (Array.isArray(n)) for (var g = 0; g < n.length; g++) f = n[g], m = b + o(f, g), 
        h += i(f, m, t, r); else {
            var x = l(n);
            if (x) {
                var v, y = x.call(n);
                if (x !== n.entries) for (var w = 0; !(v = y.next()).done; ) f = v.value, m = b + o(f, w++), 
                h += i(f, m, t, r); else for (;!(v = y.next()).done; ) {
                    var k = v.value;
                    k && (f = k[1], m = b + c.escape(k[0]) + d + o(f, 0), h += i(f, m, t, r));
                }
            } else if ("object" === p) {
                var A = "", E = String(n);
                a("31", "[object Object]" === E ? "object with keys {" + Object.keys(n).join(", ") + "}" : E, A);
            }
        }
        return h;
    }
    function r(n, e, t) {
        return null == n ? 0 : i(n, "", e, t);
    }
    var a = t(19), s = (t(11), t(77)), l = t(80), c = (t(0), t(170)), u = (t(1), "."), d = ":";
    n.exports = r;
}, function(n, e) {
    n.exports = "data:application/font-woff;base64,d09GRgABAAAAAA54ABEAAAAAHvgAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAABgAAAABwAAAAcflWEOkdERUYAAAGcAAAAHAAAAB4AJwAnT1MvMgAAAbgAAAA/AAAAYG9mi1FjbWFwAAAB+AAAALIAAAG6jZhwmmN2dCAAAAKsAAAAGAAAABgGLgpJZnBnbQAAAsQAAAGxAAACZVO0L6dnYXNwAAAEeAAAAAgAAAAIAAAAEGdseWYAAASAAAAF/gAAEeCUKyhtaGVhZAAACoAAAAAtAAAANhFjOHxoaGVhAAAKsAAAABwAAAAkEAIIU2htdHgAAArMAAAASwAAAIR/+gBEbG9jYQAACxgAAAAsAAAARGdybDxtYXhwAAALRAAAACAAAAAgAT8BGm5hbWUAAAtkAAACDQAABFFh8Yp3cG9zdAAADXQAAACIAAAA6skMgSRwcmVwAAAN/AAAAHIAAACO55mGkXdlYmYAAA5wAAAABgAAAAbFvljyAAAAAQAAAADUJJi6AAAAANUYdUMAAAAA1Rh2PHjaY2BkYGDgAWIxIGZiYARCBSBmAfMYAAT+AE942mNgYhFhnMDAysDCwsDCAAIQGojTGGdB+HDAyIAE3IJDghgcGBRU/3CA+UBSA6aGzYm5CkgpMDACAPFJBa4AeNpjYGBgZoBgGQZGBhDYAuQxgvksDDOAtBKDApDFBCS9GHwY/BlCGKIYshhyGPIZShiqGBYocCnoK8Sr/vn/H6hWgcETrCYYqCYTrKYYrIYBpub/4/+7/+/6v+P/1v8b/i/6v/D//P9z/k//X/RA+P77+wduqUDdQAAwsjHAFTIyAQkmdAUQLxEFWFgZgMaxA1kcnGABLlR5bh4GXgYGPiCLXwAsIMhAXSBEli4AzqYtDQAAAAADegSGAFkAWABaALIAWQBaALIARAUReNpdUbtOW0EQ3Q0PA4HE2CA52hSzmZDGe6EFCcTVjWJkO4XlCGk3cpGLcQEfQIFEDdqvGaChpEibBiEXSHxCPiESM2uIojQ7O7NzzpkzS8qRqnfpa89T5ySQwt0GzTb9Tki1swD3pOvrjYy0gwdabGb0ynX7/gsGm9GUO2oA5T1vKQ8ZTTuBWrSn/tH8Cob7/B/zOxi0NNP01DoJ6SEE5ptxS4PvGc26yw/6gtXhYjAwpJim4i4/plL+tzTnasuwtZHRvIMzEfnJNEBTa20Emv7UIdXzcRRLkMumsTaYmLL+JBPBhcl0VVO1zPjawV2ys+hggyrNgQfYw1Z5DB4ODyYU0rckyiwNEfZiq8QIEZMcCjnl3Mn+pED5SBLGvElKO+OGtQbGkdfAoDZPs/88m01tbx3C+FkcwXe/GUs6+MiG2hgRYjtiKYAJREJGVfmGGs+9LAbkUvvPQJSA5fGPf50ItO7YRDyXtXUOMVYIen7b3PLLirtWuc6LQndvqmqo0inN+17OvscDnh4Lw0FjwZvP+/5Kgfo8LK40aA4EQ3o3ev+iteqIq7wXPrIn07+xWgAAAAABAAH//wAPeNqllz9wGkcUxt+C7hAgMxyywMJ2MEboj9EYuIOIsxTZY2mCArLAQpKt3kW6pHZ6z6RIn8KTKpMmKXZ3NJMio9Rp0qbKpKdIZ7tIbCZvb++OOziQYkt3t7tv93bu299+7w4IwS5A6JlyDGGIwF1GoLzFIzOxv3WmKn9u8XAIq8DCIqyIMI+o8bdbnIi4oeW1Yl7L74ZuDZbIt4PPleN/ftyd+R0AFDyBnKuv4FNowQEcwgl8DXwHoMSa4T7vhbByqPZ5TlROZvq8Q7ByoPbPWu2d3JUSa6l9Qp+UKfzBo1pW13XWjPR5u9PDKm0m2R4p8f3ukejYxo6l9ZqoPiU4P2gpriTSpmnSPY2vVbBiAmu3tBQzFdOsVOtabeNj4/bKsl1ZHgnk9Ux6QbsaUQu6KLFw204lj4M3UHvdc2azxWI2K641t0riTqjmdFrXwWssT0l88Np7njrDrbKGxbJoLpG5JascvMKytow315w5PCWJc/uYA4dB+LnS8DD4XjKgpiEw0LZuA1AQCZFIzg46FgBkQT/T6UGSKeE+S1R03eYhQAgCKSQQy26LZe9E+qyNZGgHwUT7dK8savsIQxBidewulGw8nRRySGQQzr7GVioCTXNHS9Ftkx5oNObisSAEcspPpVL34iF+PC6NISYMBaHxIzoPhDSOaiIaZ6iYQUIK5vOdn09P52nLKYrfIGlpEHqs01aSlZGPsjLkE9WkW1i7I70iQOx1MVhAp2RLFrIeYiok2RF2CTyOcZiSkGQ+WvGSaWm0NNk4gUD8Rhoj41AhY8YZJ+IseAAZ5zyfaJ8xJsFkJJV/vxJkAFTJJvwcNmAT7kMHevAEfgBeE3TuGKyBdLo6TyAUmjHYfWye6GebW7XElRI9Mtgm0jlEIk8FERrVWQNNs6XTRpKZpEQ/0VkXARzptJtkjzFwrLNlHHFDZ6dIooEkqGJSU6MPTNpN8fL8nkhnjzWaRyqNGnaXTbqp0V2TbqV4XtkX3fc1Oj9OKT9OYzoW4nUeds6P5jffMk/zjXV6xnwTnOiCp/DDGbwc7pJsdvBSmsjykNJATkMP/TKW4zKCUs5gh2FhmbOWspNBAyUqhsFaGHqkn/XWrFAPW52APMdi2zLL4Wz+HNdFdvuWmywb3VhHx/WkrYqzfTfh0QRi1GjFb6mYyXoKttZNeqjRG1NSn4y4CAUvye3i1EeCUl+gQS6R/s4nJUDHvGKqWnFq8hOF+34aYfeT/Y1QNQ2LnvVWsfgJeDY5nsivGpIde3SsWzmw434uXAobZkS0r4XtJmIr1ofY7o5g25eeE9hYfdsU4FgxZl4Ea5gHA6i9ByzZmvqe+T+wXDaj0EZgvWtYsIJY/Qq8Kny2arC2fFcpwmcJaarH+tlJrqqgqa7dQ1Yn0mfNHRESGbMZZLW6w6wdEb207TJr+5hdnWC1dh2Z3bOYXROffFVprhNhLtbMeYxXqS6SKclxIjTNkxcvoncJbhfRC6WDE+QYtlHKgtsQn+Q3i/+wCDchD0VYgxXgi8iPx/ELg9A7ZVYiJWDxRS318/WbuXyhuLK2lMGF0urEcA+yQAruEY6GNpzD+fLkJIbXwSs+eMPF9TXHuJDiKUQ3mSOxwZvJd+EKPBMrgd3eYg67xa1DTepDjyYTeFpoCqEmOmvwOPFqC6VRm2KLQ200rvHl1TXTtFWShTGVpC5Uzn+YytBvcrC80SsR57JVvmsEqXXZqQ9H2Vk6Z33sZtOT2TmSrIqjSvVLkk9mCxuVJJ/LlWZpCsQ2rin0xSg7VWpCdvOQgeuQgwJqugM8KVQplqrVMlsTqpSklnoQW8gsorJbty1wrjCy4AhzJYWNekEJkDVR0KmMe0VdTs7bv/ipjEhGMy/e31/4/ENMjqZwVEVB+ATc/d0wFwDIS8bTvIy3HCnvNuz2ly4iZ9/5/LUuNdGUMbr1UNaD6MK0zefsPDdxSG0eSpNZ2ZtOPiw+YgBcS/B42hiF5uaNmRceXZWhLrH5aNwYSlOEtNhsoDaZMYZb0KPtw5OiF/UF6uwmEPD8VeE/ANi0BQAAeNpjYGRgYADidNb77+P5bb4yyHMwgMBViVJnCF1mA6I5GDggFBOIAgD7UgdhAAAAeNpjYGRg4GD4fwNIRjIwgNgMjAyoQBEAQfQCbHjaY3rD4MIABEyrGBgY9wJpMQYG5ssIzDoBgTkiIZhtNgSz3IPQIDGQXhagORwMCBpkJhOQZgyFYhB7JpAohNAgOYZfDAwAoS4PsAB42mNgYNCBwneM+5h6mBNY7FhFWL+wxbFdYrdhX8LBx1HF8QIv/AAAUgAWbQABAAAAIQBYAAYAAAAAAAIAAQACABYAAAEAAL4AAAAAeNqVU8tu00AUPbbLo1WpkIq6QCDNBiQQNEkLQnRXKoWnWDQC1rY7iadN4sR2mqQ7PoB1P6W/UECsEQvEV8CaM9eTEqwuIKPcOffOvec+ZgzgGn7Bg/2t4g5lAG9hkftdaiX2cBUth32sIHY4wG0MHV6AwrHDF7CGE4cvMvaLw5cwwXeHL+Oe98bhRSx77x1ewgvvg8PLKLyvDl/BE/+lw6vY9Wc+p1jzfzj8EXX/p8OfsBLccvgz8WaJvwW4Hmw3zaFWkemo4SiMD0y/o470IJlmudpPu4XqTdU4nKhI72EHKQaYIoNBBwkKtplAUz9EiD61DdTRwCPRQpF7cr5L2cEIXdoyNMnTZ3SL/4zWWJiqMVVdVVjeijVnLankbmCd2atR5+cyjLMZlVhD8e0J6wFtKdqUTcY8l33GkEj/ilarW3abq3AVhKxL4Sl5IjyT6RT03kKNq+048rkq1ilTetfmZ6huVDtQN8k6pm4rjhhrmKcQm+Ge/FXhH/al/6rgvNOyq5ynuXQ+JmpgE4/xgLuVtX+c9mux3pf30+OynjH5y4m9Iopps7k0GQwnoaVX+8oUP6oRPWPejKGPtRzxfMCapnL/CvvkLWfSo62c1kQYNOt6RxmddTh7Jy25OYVtMmVifSjvt8F5WbzF/upzL9r212bMSDIN3NvT1POzrhVZh3JDGZdG9zdN7bftAAAAeNptxbsOAVEUBdC9Z5jxfv2BnjhzuDMUiolkKiJRUGk9EhGNwk/6JBHu0VnNQoCv1xMH/NMHGDBEiAGGGEGRIsMcS6ywxgZb7LBniWVGjFlhlTXW2WCTLbbZYZe96Hh53E6JT+P79SySy2cV+Z3Yao/tie3s1M7sqT2zc78Wfud3xeIN1ForXHja28H4v3UDYy+D9waOgIiNjIx9kRvd2LQjFDcIRHpvEAkCMhoiZTewacdEMGxgVnDdwKztsoFFwXUXAzMLAwOTNpjPCuFHw/hsCq6bWMUhHMYN7FBdHCBV7GBVG5ndyoAinEB1HOIwbuQGEW0Ah7gmewAAAAFY8sW9AAA=";
}, function(n, e) {
    n.exports = "data:application/font-woff2;base64,d09GMgABAAAAAAswABEAAAAAHvgAAArKAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP0ZGVE0cGh4GYACDOggYCYRlEQgKo2CdJQE2AiQDgQQLRAAEIAWIUQeBagyBDj93ZWJmBhtKGlEUc5vsa4yJDHUvpGxsF5ktz92o3nXha3faqxy0ZO330g+e/z0gQwCJhAIAAPKf8qr3UxV0J0NXRmZ6FvYJvsmnPWWJI6Sr9fdrTdTezueiJ0TlL77yb/efS0VOOkMixHeXGDKVZumGVGDeOb+k/RmkWwcEzaj9NMQU+P3JQ6XZn5AEyp4UBz1uzyAY1Uk0JDeLH35hY2ZDi3dvlCAP0LH33f3IFu6trTXRJ3giw21Nl7KTHLaHnNNWeDy8rgejxnIIj+qMZdhHlmqEYQtD/yPAFs70oZWraUrvVNIL6kolJH6UdEZ9K1n++5PsfHHRy6UX5V7v3oc35KBAl5RSYFBgCMsEwFCUn/1me2AuMdHdWfEIkdXnxUcBIAC4s306CQDcHYaXeDAy3fkhBgB/gAQCQSDwCqGtuS9tAATO6yGA1+HA6PB8jWdXEzarfTo+LJsHuz8ByRLih2splSyBMhnpAEvM0KX2YcCW64Xi2AQAIonDz5AgNNq259g5BxevkISXMhZpYojhDzTWMIyPRC4Gt4B/5v9rRycdd4Rtj9122maj6S9iv7/n5x9F6++KjiBlo4wsxO3VthM925TLUAAVgOYgHpyb6gbcAHcAHp7Of+SF3AFvL2Dz+R1cUeeK4Jr92C7XboMkxB7wcZ/ifUREtX2grQjWjNhcIy3CZ0Cx1MAUeDoRjwJDSLEl0nRIV4gowBqMjOsDu3yfCmmJaERO5q0jEHM+LeU+1GTKC+n/5KMmxLRlwcLriNgaywjW+jJxG9hvRIUciIQrJFdfvhl4OYhYw6vWxeith4014u0lCtJSbAcRiwTQd/JeS2SNBgI2bzYi/T3zk/mAovb4oGm6BjMVyQRhhlOz7LYQTxMtVyfi1la8BnxEmq0KAylAHVmVHEBBlefDFJ+bVOIWiVXimOkrJRnxLkqUj6zsx4NPTINaGA/sG5nO3KU0n/kuCGaIuLfZAzKj/AwIRy8mjCn3IFHinuB1CVhbR4OCTVcrs5mqDSQTVV7VkPqejdZ8yMNG9HwE2NvnpTwUfXmDL5N7idvr1ghw/T5kA4F3y/ds3UaVZNTfRZ1OD57vfKEvOYRVmK9cLN863gQjZDAy0ENhnU5KZEDUToMuIq8Izyg/pEVlVV+LxVAmaIjLFzh6NSTH8iN2h0UQ6QZGEOg/3MGYmeHKhzQpY+sB8FGASg2Qf3yYTI5MhXMqrtkqxHkdr0pRft+eLX0Ew3i+HD6B9AUe8eHN9QaxZZ1v+rv216KvuLZucHXrC5ilzc/O9zc+IsJHndLAyCV9zZUGJY6ZkbEHHkTqRWt6HtUFwNGcT/T1+pkH/QTnRoHRa5SJpGcwLgtojYR/2DRaaQpiSAc1ak2H6ZGw3RE8bsDyxt0h9WRNjqdXjitkNEaPTzCo5cXnozT7WcKqe/mTdtrJ0xUnUAsn8eDYw8AbLo41ljuHnVUNSY8D9NHm+ST91EelXD1wmsKbpN0conkEeLXyZVT3iGTDx9vf/0+p10bD5s0xB63Iy4rRY2vp0YHoDq3MbmTF6n2OcXoBaSNrrFHXDyZLA/pK1TiJjz5wDqt3zKojTxPyQPapG3k1zooRUHWwQu7MTxPdobSITkO6RZxRZEslTtLO7hzQYTfcbSBqUIuBH9d1tEVldR7BesKOuW13aHw1NBpDP/fCfwmLECfCfhHs1MuAMJRiCW3MRoQhP8bE3II5ZMTGfymEcA0L+s9qyfCNOA6IqQlPZYxRkC1yUMgfQM5XAQI3EKRp5mXwE8fidAASp7xb2fqyrPS+/JeF6EkTo20JcCnBVlI5B+Ilm9cqm80fjQ1rUoxJCWoQQi4urClqFY/wFO4uZzwzgZMdLYmzZiYNC3sXIRiseG/o00MPui9hmXsYZNsE1Eq8Hv4vge662QK8PbJiMcU20yOUtrk32zX4FarHvtBt6drx4lEZDwDf8UeenTXz6BWqWfeNOIY9wSLrditehOvkBP8TxG4CvFoQb052MadIOsP58CK9RJpjZM3PoUSYsRSmQ8UrQiEL6mRvVQOizKs4i6hhEfuQH/auEFxBBRw9gLNfpPmlqvnRnBI/ToMyR4apot+7vqSacN2mRS35lHdcjtj6y8XjNtJYjFEjYECWkBzDRFaSkndxAF3w4CrUCvkje4bUPFBk+0mntXMwK6hMLTWza2HtANTTrYfUNLum2EIXURBuURc/In0bD4tJSS6/P8MV93R23vIdbMkplJhiDSbaFOMXfdy1Z8xEHsOOYYe5qC68ui2ihzVqyKHNweZ50SvMRyASITRuuRqjRzOI/Z5pcyNCZVx8vO1DAzRFOzQ7UEEjtOw39ox9KQ1RCZvIyb6gU9dq/HAML3Wk7LQ61Kr0pz3nNPHCI0icM9KDyJZU6bY8CWHtaWbD93jgfvgtzBFhuJ/FeKyFKoggMzGvdq6j8fDVl0q9QBAXlIWvvIafq+KIjz9R+2Si1xjLko4LVzXuPPUNeb8BcrxbTD/NBv6UhBFqG/Q19aE9Nnh7IuO4Wzou/vQEJDdw3NbhZen3aOUtdwHqHUiBQm+q70DisJ3esQngdIiO7Cq4Mz2WbA4UZ34wHANCDdoDBdgpcplHI3wspBBhRsXEJUQHjBGSWFoladJBHY7dziRN2SXwIFuPHIxtJxQUzOqtYd/AlxTCTB6DmkLCNhQuLm/oDggaFxSR63aVskDnTN6SWHJbSHl9tw+yZyRduglorIY616B/gzbry/2+H9KY/lpJO9z7D1w2AC1Sc+3Hqo/u/v8PMsPVxv9f6rQZ32D3B9J+AHQGgOQPsNvJVfIGQADYpWwN8WccmrDM4PjxFPDqSQCoJ8Eo2wwA04iqoPErrAmTpQaMSmdbgn+beZam+/qm97N8JAAYiDsAJFY0TyF46lIkuGOEwhBrmsIhbFRk+DumKPB0VVExV8nSkEw0UBwwaJniRGPIKwZmhh/FDZVxq8BHZxxWLkjG58pFw/hVuYRnMfQySFm/w0MmOFNRyyMMZK6BPywpTu7RIMF8ejwQBIfXFQJ3HKJSDGSmli3x8okL4DS6EMiaMwEREs/l8kzpMuQxCZg6RA+huibMRaLWKi+xQo6S0oAwBYU7nVvtCxDYaYcdxJHuH2RIlU5cyLHHCUpj0MEkYG7EFzmBKexArSMbXF/MdNMpdEAVkEGOGZK+ucQF1HGTrVumeojPpLTIHL28Z1ADasqWeLmZ7Tfmckj7VsthCHNI2tLhYHMun87xZ4fo2jmQh65BesQBzSAaBDbD6M2jzDJkKZAtIxuKNEuz1g5mfHeoO4JJ6QpuLasZPzMmpzWziotgZq7HacA0YRKlTso8DTofbB/9LaTBS/p4XnukTxK3lBirzqjOsFI3Tn9HWNdTKwUVfO+VnSHn3bUzFH4tLpQt/W0G06gdWFiK6XvvLCac6QZT8EFTiwtEGYzrv7wV/12D19gvMoEkYmBIliJNplx5SjTbsefQqTNXoYpkUkgljRzkJJ3+NHk5uZMHeZIXeStjJsZ9ujVvaaudNZlbLBUW94jNki5nyJlylpwt58i5cp6cLxdIFbsya6WcWHi/pdfwf6ePQFNRtwoBrlOF6z+b/ej5P7q/axbFS13DqPxJ+2FlyJZrMCNUY7Zc84blgJRUlXJbBqB8WjGXCtLLMbtAKDLvhOwD7DDbx6XkYur7BiJ2BZD16e8MAAA=";
}, function(n, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var o = t(8), i = (t.n(o), t(82)), r = (t.n(i), t(83)), a = (t.n(r), t(49)), s = t(84);
    t.n(s);
    i.render(o.createElement(a.a, null), document.getElementById("root"));
} ]);