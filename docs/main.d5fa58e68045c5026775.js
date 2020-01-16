(window.webpackJsonp = window.webpackJsonp || []).push([
    [1],
    {
        0: function(e, t, n) {
            e.exports = n('iTwO');
        },
        '0ncm': function(e, t) {
            function n(e) {
                return Promise.resolve().then(function() {
                    var t = new Error("Cannot find module '" + e + "'");
                    throw ((t.code = 'MODULE_NOT_FOUND'), t);
                });
            }
            (n.keys = function() {
                return [];
            }),
                (n.resolve = n),
                (e.exports = n),
                (n.id = '0ncm');
        },
        iTwO: function(e, t, n) {
            'use strict';
            function r(e) {
                return 'function' == typeof e;
            }
            n.r(t);
            let s = !1;
            const l = {
                Promise: void 0,
                set useDeprecatedSynchronousErrorHandling(e) {
                    s = e;
                },
                get useDeprecatedSynchronousErrorHandling() {
                    return s;
                },
            };
            function i(e) {
                setTimeout(() => {
                    throw e;
                }, 0);
            }
            const o = {
                    closed: !0,
                    next(e) {},
                    error(e) {
                        if (l.useDeprecatedSynchronousErrorHandling) throw e;
                        i(e);
                    },
                    complete() {},
                },
                a = Array.isArray || (e => e && 'number' == typeof e.length);
            function u(e) {
                return null !== e && 'object' == typeof e;
            }
            function c(e) {
                return (
                    Error.call(this),
                    (this.message = e
                        ? `${e.length} errors occurred during unsubscription:\n${e
                              .map((e, t) => `${t + 1}) ${e.toString()}`)
                              .join('\n  ')}`
                        : ''),
                    (this.name = 'UnsubscriptionError'),
                    (this.errors = e),
                    this
                );
            }
            c.prototype = Object.create(Error.prototype);
            const d = c,
                h = (function() {
                    class e {
                        constructor(e) {
                            (this.closed = !1),
                                (this._parentOrParents = null),
                                (this._subscriptions = null),
                                e && (this._unsubscribe = e);
                        }
                        unsubscribe() {
                            let t;
                            if (this.closed) return;
                            let {
                                _parentOrParents: n,
                                _unsubscribe: s,
                                _subscriptions: l,
                            } = this;
                            if (
                                ((this.closed = !0),
                                (this._parentOrParents = null),
                                (this._subscriptions = null),
                                n instanceof e)
                            )
                                n.remove(this);
                            else if (null !== n)
                                for (let e = 0; e < n.length; ++e) n[e].remove(this);
                            if (r(s))
                                try {
                                    s.call(this);
                                } catch (i) {
                                    t = i instanceof d ? p(i.errors) : [i];
                                }
                            if (a(l)) {
                                let e = -1,
                                    n = l.length;
                                for (; ++e < n; ) {
                                    const n = l[e];
                                    if (u(n))
                                        try {
                                            n.unsubscribe();
                                        } catch (i) {
                                            (t = t || []),
                                                i instanceof d
                                                    ? (t = t.concat(p(i.errors)))
                                                    : t.push(i);
                                        }
                                }
                            }
                            if (t) throw new d(t);
                        }
                        add(t) {
                            let n = t;
                            if (!t) return e.EMPTY;
                            switch (typeof t) {
                                case 'function':
                                    n = new e(t);
                                case 'object':
                                    if (
                                        n === this ||
                                        n.closed ||
                                        'function' != typeof n.unsubscribe
                                    )
                                        return n;
                                    if (this.closed) return n.unsubscribe(), n;
                                    if (!(n instanceof e)) {
                                        const t = n;
                                        (n = new e())._subscriptions = [t];
                                    }
                                    break;
                                default:
                                    throw new Error(
                                        'unrecognized teardown ' +
                                            t +
                                            ' added to Subscription.',
                                    );
                            }
                            let {_parentOrParents: r} = n;
                            if (null === r) n._parentOrParents = this;
                            else if (r instanceof e) {
                                if (r === this) return n;
                                n._parentOrParents = [r, this];
                            } else {
                                if (-1 !== r.indexOf(this)) return n;
                                r.push(this);
                            }
                            const s = this._subscriptions;
                            return (
                                null === s ? (this._subscriptions = [n]) : s.push(n), n
                            );
                        }
                        remove(e) {
                            const t = this._subscriptions;
                            if (t) {
                                const n = t.indexOf(e);
                                -1 !== n && t.splice(n, 1);
                            }
                        }
                    }
                    var t;
                    return (e.EMPTY = (((t = new e()).closed = !0), t)), e;
                })();
            function p(e) {
                return e.reduce((e, t) => e.concat(t instanceof d ? t.errors : t), []);
            }
            const f =
                'function' == typeof Symbol
                    ? Symbol('rxSubscriber')
                    : '@@rxSubscriber_' + Math.random();
            class g extends h {
                constructor(e, t, n) {
                    switch (
                        (super(),
                        (this.syncErrorValue = null),
                        (this.syncErrorThrown = !1),
                        (this.syncErrorThrowable = !1),
                        (this.isStopped = !1),
                        arguments.length)
                    ) {
                        case 0:
                            this.destination = o;
                            break;
                        case 1:
                            if (!e) {
                                this.destination = o;
                                break;
                            }
                            if ('object' == typeof e) {
                                e instanceof g
                                    ? ((this.syncErrorThrowable = e.syncErrorThrowable),
                                      (this.destination = e),
                                      e.add(this))
                                    : ((this.syncErrorThrowable = !0),
                                      (this.destination = new m(this, e)));
                                break;
                            }
                        default:
                            (this.syncErrorThrowable = !0),
                                (this.destination = new m(this, e, t, n));
                    }
                }
                [f]() {
                    return this;
                }
                static create(e, t, n) {
                    const r = new g(e, t, n);
                    return (r.syncErrorThrowable = !1), r;
                }
                next(e) {
                    this.isStopped || this._next(e);
                }
                error(e) {
                    this.isStopped || ((this.isStopped = !0), this._error(e));
                }
                complete() {
                    this.isStopped || ((this.isStopped = !0), this._complete());
                }
                unsubscribe() {
                    this.closed || ((this.isStopped = !0), super.unsubscribe());
                }
                _next(e) {
                    this.destination.next(e);
                }
                _error(e) {
                    this.destination.error(e), this.unsubscribe();
                }
                _complete() {
                    this.destination.complete(), this.unsubscribe();
                }
                _unsubscribeAndRecycle() {
                    const {_parentOrParents: e} = this;
                    return (
                        (this._parentOrParents = null),
                        this.unsubscribe(),
                        (this.closed = !1),
                        (this.isStopped = !1),
                        (this._parentOrParents = e),
                        this
                    );
                }
            }
            class m extends g {
                constructor(e, t, n, s) {
                    let l;
                    super(), (this._parentSubscriber = e);
                    let i = this;
                    r(t)
                        ? (l = t)
                        : t &&
                          ((l = t.next),
                          (n = t.error),
                          (s = t.complete),
                          t !== o &&
                              (r((i = Object.create(t)).unsubscribe) &&
                                  this.add(i.unsubscribe.bind(i)),
                              (i.unsubscribe = this.unsubscribe.bind(this)))),
                        (this._context = i),
                        (this._next = l),
                        (this._error = n),
                        (this._complete = s);
                }
                next(e) {
                    if (!this.isStopped && this._next) {
                        const {_parentSubscriber: t} = this;
                        l.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable
                            ? this.__tryOrSetError(t, this._next, e) && this.unsubscribe()
                            : this.__tryOrUnsub(this._next, e);
                    }
                }
                error(e) {
                    if (!this.isStopped) {
                        const {_parentSubscriber: t} = this,
                            {useDeprecatedSynchronousErrorHandling: n} = l;
                        if (this._error)
                            n && t.syncErrorThrowable
                                ? (this.__tryOrSetError(t, this._error, e),
                                  this.unsubscribe())
                                : (this.__tryOrUnsub(this._error, e), this.unsubscribe());
                        else if (t.syncErrorThrowable)
                            n ? ((t.syncErrorValue = e), (t.syncErrorThrown = !0)) : i(e),
                                this.unsubscribe();
                        else {
                            if ((this.unsubscribe(), n)) throw e;
                            i(e);
                        }
                    }
                }
                complete() {
                    if (!this.isStopped) {
                        const {_parentSubscriber: e} = this;
                        if (this._complete) {
                            const t = () => this._complete.call(this._context);
                            l.useDeprecatedSynchronousErrorHandling &&
                            e.syncErrorThrowable
                                ? (this.__tryOrSetError(e, t), this.unsubscribe())
                                : (this.__tryOrUnsub(t), this.unsubscribe());
                        } else this.unsubscribe();
                    }
                }
                __tryOrUnsub(e, t) {
                    try {
                        e.call(this._context, t);
                    } catch (n) {
                        if ((this.unsubscribe(), l.useDeprecatedSynchronousErrorHandling))
                            throw n;
                        i(n);
                    }
                }
                __tryOrSetError(e, t, n) {
                    if (!l.useDeprecatedSynchronousErrorHandling)
                        throw new Error('bad call');
                    try {
                        t.call(this._context, n);
                    } catch (r) {
                        return l.useDeprecatedSynchronousErrorHandling
                            ? ((e.syncErrorValue = r), (e.syncErrorThrown = !0), !0)
                            : (i(r), !0);
                    }
                    return !1;
                }
                _unsubscribe() {
                    const {_parentSubscriber: e} = this;
                    (this._context = null),
                        (this._parentSubscriber = null),
                        e.unsubscribe();
                }
            }
            const _ =
                ('function' == typeof Symbol && Symbol.observable) || '@@observable';
            function y() {}
            const v = (function() {
                class e {
                    constructor(e) {
                        (this._isScalar = !1), e && (this._subscribe = e);
                    }
                    lift(t) {
                        const n = new e();
                        return (n.source = this), (n.operator = t), n;
                    }
                    subscribe(e, t, n) {
                        const {operator: r} = this,
                            s = (function(e, t, n) {
                                if (e) {
                                    if (e instanceof g) return e;
                                    if (e[f]) return e[f]();
                                }
                                return e || t || n ? new g(e, t, n) : new g(o);
                            })(e, t, n);
                        if (
                            (s.add(
                                r
                                    ? r.call(s, this.source)
                                    : this.source ||
                                      (l.useDeprecatedSynchronousErrorHandling &&
                                          !s.syncErrorThrowable)
                                    ? this._subscribe(s)
                                    : this._trySubscribe(s),
                            ),
                            l.useDeprecatedSynchronousErrorHandling &&
                                s.syncErrorThrowable &&
                                ((s.syncErrorThrowable = !1), s.syncErrorThrown))
                        )
                            throw s.syncErrorValue;
                        return s;
                    }
                    _trySubscribe(e) {
                        try {
                            return this._subscribe(e);
                        } catch (t) {
                            l.useDeprecatedSynchronousErrorHandling &&
                                ((e.syncErrorThrown = !0), (e.syncErrorValue = t)),
                                (function(e) {
                                    for (; e; ) {
                                        const {
                                            closed: t,
                                            destination: n,
                                            isStopped: r,
                                        } = e;
                                        if (t || r) return !1;
                                        e = n && n instanceof g ? n : null;
                                    }
                                    return !0;
                                })(e)
                                    ? e.error(t)
                                    : console.warn(t);
                        }
                    }
                    forEach(e, t) {
                        return new (t = b(t))((t, n) => {
                            let r;
                            r = this.subscribe(
                                t => {
                                    try {
                                        e(t);
                                    } catch (s) {
                                        n(s), r && r.unsubscribe();
                                    }
                                },
                                n,
                                t,
                            );
                        });
                    }
                    _subscribe(e) {
                        const {source: t} = this;
                        return t && t.subscribe(e);
                    }
                    [_]() {
                        return this;
                    }
                    pipe(...e) {
                        return 0 === e.length
                            ? this
                            : ((t = e)
                                  ? 1 === t.length
                                      ? t[0]
                                      : function(e) {
                                            return t.reduce((e, t) => t(e), e);
                                        }
                                  : y)(this);
                        var t;
                    }
                    toPromise(e) {
                        return new (e = b(e))((e, t) => {
                            let n;
                            this.subscribe(e => (n = e), e => t(e), () => e(n));
                        });
                    }
                }
                return (e.create = t => new e(t)), e;
            })();
            function b(e) {
                if ((e || (e = l.Promise || Promise), !e))
                    throw new Error('no Promise impl found');
                return e;
            }
            function w() {
                return (
                    Error.call(this),
                    (this.message = 'object unsubscribed'),
                    (this.name = 'ObjectUnsubscribedError'),
                    this
                );
            }
            w.prototype = Object.create(Error.prototype);
            const C = w;
            class E extends h {
                constructor(e, t) {
                    super(),
                        (this.subject = e),
                        (this.subscriber = t),
                        (this.closed = !1);
                }
                unsubscribe() {
                    if (this.closed) return;
                    this.closed = !0;
                    const e = this.subject,
                        t = e.observers;
                    if (
                        ((this.subject = null),
                        !t || 0 === t.length || e.isStopped || e.closed)
                    )
                        return;
                    const n = t.indexOf(this.subscriber);
                    -1 !== n && t.splice(n, 1);
                }
            }
            class x extends g {
                constructor(e) {
                    super(e), (this.destination = e);
                }
            }
            const S = (function() {
                class e extends v {
                    constructor() {
                        super(),
                            (this.observers = []),
                            (this.closed = !1),
                            (this.isStopped = !1),
                            (this.hasError = !1),
                            (this.thrownError = null);
                    }
                    [f]() {
                        return new x(this);
                    }
                    lift(e) {
                        const t = new T(this, this);
                        return (t.operator = e), t;
                    }
                    next(e) {
                        if (this.closed) throw new C();
                        if (!this.isStopped) {
                            const {observers: t} = this,
                                n = t.length,
                                r = t.slice();
                            for (let s = 0; s < n; s++) r[s].next(e);
                        }
                    }
                    error(e) {
                        if (this.closed) throw new C();
                        (this.hasError = !0),
                            (this.thrownError = e),
                            (this.isStopped = !0);
                        const {observers: t} = this,
                            n = t.length,
                            r = t.slice();
                        for (let s = 0; s < n; s++) r[s].error(e);
                        this.observers.length = 0;
                    }
                    complete() {
                        if (this.closed) throw new C();
                        this.isStopped = !0;
                        const {observers: e} = this,
                            t = e.length,
                            n = e.slice();
                        for (let r = 0; r < t; r++) n[r].complete();
                        this.observers.length = 0;
                    }
                    unsubscribe() {
                        (this.isStopped = !0),
                            (this.closed = !0),
                            (this.observers = null);
                    }
                    _trySubscribe(e) {
                        if (this.closed) throw new C();
                        return super._trySubscribe(e);
                    }
                    _subscribe(e) {
                        if (this.closed) throw new C();
                        return this.hasError
                            ? (e.error(this.thrownError), h.EMPTY)
                            : this.isStopped
                            ? (e.complete(), h.EMPTY)
                            : (this.observers.push(e), new E(this, e));
                    }
                    asObservable() {
                        const e = new v();
                        return (e.source = this), e;
                    }
                }
                return (e.create = (e, t) => new T(e, t)), e;
            })();
            class T extends S {
                constructor(e, t) {
                    super(), (this.destination = e), (this.source = t);
                }
                next(e) {
                    const {destination: t} = this;
                    t && t.next && t.next(e);
                }
                error(e) {
                    const {destination: t} = this;
                    t && t.error && this.destination.error(e);
                }
                complete() {
                    const {destination: e} = this;
                    e && e.complete && this.destination.complete();
                }
                _subscribe(e) {
                    const {source: t} = this;
                    return t ? this.source.subscribe(e) : h.EMPTY;
                }
            }
            function N(e) {
                return e && 'function' == typeof e.schedule;
            }
            class A extends g {
                constructor(e, t, n) {
                    super(),
                        (this.parent = e),
                        (this.outerValue = t),
                        (this.outerIndex = n),
                        (this.index = 0);
                }
                _next(e) {
                    this.parent.notifyNext(
                        this.outerValue,
                        e,
                        this.outerIndex,
                        this.index++,
                        this,
                    );
                }
                _error(e) {
                    this.parent.notifyError(e, this), this.unsubscribe();
                }
                _complete() {
                    this.parent.notifyComplete(this), this.unsubscribe();
                }
            }
            const k = e => t => {
                for (let n = 0, r = e.length; n < r && !t.closed; n++) t.next(e[n]);
                t.complete();
            };
            function I() {
                return 'function' == typeof Symbol && Symbol.iterator
                    ? Symbol.iterator
                    : '@@iterator';
            }
            const V = I(),
                D = e => e && 'number' == typeof e.length && 'function' != typeof e;
            function O(e) {
                return (
                    !!e && 'function' != typeof e.subscribe && 'function' == typeof e.then
                );
            }
            const M = e => {
                if (e && 'function' == typeof e[_])
                    return (e => t => {
                        const n = e[_]();
                        if ('function' != typeof n.subscribe)
                            throw new TypeError(
                                'Provided object does not correctly implement Symbol.observable',
                            );
                        return n.subscribe(t);
                    })(e);
                if (D(e)) return k(e);
                if (O(e))
                    return (e => t => (
                        e
                            .then(
                                e => {
                                    t.closed || (t.next(e), t.complete());
                                },
                                e => t.error(e),
                            )
                            .then(null, i),
                        t
                    ))(e);
                if (e && 'function' == typeof e[V])
                    return (e => t => {
                        const n = e[V]();
                        for (;;) {
                            const e = n.next();
                            if (e.done) {
                                t.complete();
                                break;
                            }
                            if ((t.next(e.value), t.closed)) break;
                        }
                        return (
                            'function' == typeof n.return &&
                                t.add(() => {
                                    n.return && n.return();
                                }),
                            t
                        );
                    })(e);
                {
                    const t = u(e) ? 'an invalid object' : `'${e}'`;
                    throw new TypeError(
                        `You provided ${t} where a stream was expected.` +
                            ' You can provide an Observable, Promise, Array, or Iterable.',
                    );
                }
            };
            function P(e, t, n, r, s = new A(e, n, r)) {
                if (!s.closed) return t instanceof v ? t.subscribe(s) : M(t)(s);
            }
            class R extends g {
                notifyNext(e, t, n, r, s) {
                    this.destination.next(t);
                }
                notifyError(e, t) {
                    this.destination.error(e);
                }
                notifyComplete(e) {
                    this.destination.complete();
                }
            }
            function F(e, t) {
                return function(n) {
                    if ('function' != typeof e)
                        throw new TypeError(
                            'argument is not a function. Are you looking for `mapTo()`?',
                        );
                    return n.lift(new j(e, t));
                };
            }
            class j {
                constructor(e, t) {
                    (this.project = e), (this.thisArg = t);
                }
                call(e, t) {
                    return t.subscribe(new H(e, this.project, this.thisArg));
                }
            }
            class H extends g {
                constructor(e, t, n) {
                    super(e),
                        (this.project = t),
                        (this.count = 0),
                        (this.thisArg = n || this);
                }
                _next(e) {
                    let t;
                    try {
                        t = this.project.call(this.thisArg, e, this.count++);
                    } catch (n) {
                        return void this.destination.error(n);
                    }
                    this.destination.next(t);
                }
            }
            function L(e, t) {
                return new v(n => {
                    const r = new h();
                    let s = 0;
                    return (
                        r.add(
                            t.schedule(function() {
                                s !== e.length
                                    ? (n.next(e[s++]), n.closed || r.add(this.schedule()))
                                    : n.complete();
                            }),
                        ),
                        r
                    );
                });
            }
            function B(e, t) {
                return t
                    ? (function(e, t) {
                          if (null != e) {
                              if (
                                  (function(e) {
                                      return e && 'function' == typeof e[_];
                                  })(e)
                              )
                                  return (function(e, t) {
                                      return new v(n => {
                                          const r = new h();
                                          return (
                                              r.add(
                                                  t.schedule(() => {
                                                      const s = e[_]();
                                                      r.add(
                                                          s.subscribe({
                                                              next(e) {
                                                                  r.add(
                                                                      t.schedule(() =>
                                                                          n.next(e),
                                                                      ),
                                                                  );
                                                              },
                                                              error(e) {
                                                                  r.add(
                                                                      t.schedule(() =>
                                                                          n.error(e),
                                                                      ),
                                                                  );
                                                              },
                                                              complete() {
                                                                  r.add(
                                                                      t.schedule(() =>
                                                                          n.complete(),
                                                                      ),
                                                                  );
                                                              },
                                                          }),
                                                      );
                                                  }),
                                              ),
                                              r
                                          );
                                      });
                                  })(e, t);
                              if (O(e))
                                  return (function(e, t) {
                                      return new v(n => {
                                          const r = new h();
                                          return (
                                              r.add(
                                                  t.schedule(() =>
                                                      e.then(
                                                          e => {
                                                              r.add(
                                                                  t.schedule(() => {
                                                                      n.next(e),
                                                                          r.add(
                                                                              t.schedule(
                                                                                  () =>
                                                                                      n.complete(),
                                                                              ),
                                                                          );
                                                                  }),
                                                              );
                                                          },
                                                          e => {
                                                              r.add(
                                                                  t.schedule(() =>
                                                                      n.error(e),
                                                                  ),
                                                              );
                                                          },
                                                      ),
                                                  ),
                                              ),
                                              r
                                          );
                                      });
                                  })(e, t);
                              if (D(e)) return L(e, t);
                              if (
                                  (function(e) {
                                      return e && 'function' == typeof e[V];
                                  })(e) ||
                                  'string' == typeof e
                              )
                                  return (function(e, t) {
                                      if (!e) throw new Error('Iterable cannot be null');
                                      return new v(n => {
                                          const r = new h();
                                          let s;
                                          return (
                                              r.add(() => {
                                                  s &&
                                                      'function' == typeof s.return &&
                                                      s.return();
                                              }),
                                              r.add(
                                                  t.schedule(() => {
                                                      (s = e[V]()),
                                                          r.add(
                                                              t.schedule(function() {
                                                                  if (n.closed) return;
                                                                  let e, t;
                                                                  try {
                                                                      const l = s.next();
                                                                      (e = l.value),
                                                                          (t = l.done);
                                                                  } catch (r) {
                                                                      return void n.error(
                                                                          r,
                                                                      );
                                                                  }
                                                                  t
                                                                      ? n.complete()
                                                                      : (n.next(e),
                                                                        this.schedule());
                                                              }),
                                                          );
                                                  }),
                                              ),
                                              r
                                          );
                                      });
                                  })(e, t);
                          }
                          throw new TypeError(
                              ((null !== e && typeof e) || e) + ' is not observable',
                          );
                      })(e, t)
                    : e instanceof v
                    ? e
                    : new v(M(e));
            }
            class U {
                constructor(e, t = Number.POSITIVE_INFINITY) {
                    (this.project = e), (this.concurrent = t);
                }
                call(e, t) {
                    return t.subscribe(new $(e, this.project, this.concurrent));
                }
            }
            class $ extends R {
                constructor(e, t, n = Number.POSITIVE_INFINITY) {
                    super(e),
                        (this.project = t),
                        (this.concurrent = n),
                        (this.hasCompleted = !1),
                        (this.buffer = []),
                        (this.active = 0),
                        (this.index = 0);
                }
                _next(e) {
                    this.active < this.concurrent
                        ? this._tryNext(e)
                        : this.buffer.push(e);
                }
                _tryNext(e) {
                    let t;
                    const n = this.index++;
                    try {
                        t = this.project(e, n);
                    } catch (r) {
                        return void this.destination.error(r);
                    }
                    this.active++, this._innerSub(t, e, n);
                }
                _innerSub(e, t, n) {
                    const r = new A(this, void 0, void 0);
                    this.destination.add(r), P(this, e, t, n, r);
                }
                _complete() {
                    (this.hasCompleted = !0),
                        0 === this.active &&
                            0 === this.buffer.length &&
                            this.destination.complete(),
                        this.unsubscribe();
                }
                notifyNext(e, t, n, r, s) {
                    this.destination.next(t);
                }
                notifyComplete(e) {
                    const t = this.buffer;
                    this.remove(e),
                        this.active--,
                        t.length > 0
                            ? this._next(t.shift())
                            : 0 === this.active &&
                              this.hasCompleted &&
                              this.destination.complete();
                }
            }
            function z(e) {
                return e;
            }
            function G(e, t) {
                return t ? L(e, t) : new v(k(e));
            }
            function q() {
                return function(e) {
                    return e.lift(new Z(e));
                };
            }
            class Z {
                constructor(e) {
                    this.connectable = e;
                }
                call(e, t) {
                    const {connectable: n} = this;
                    n._refCount++;
                    const r = new W(e, n),
                        s = t.subscribe(r);
                    return r.closed || (r.connection = n.connect()), s;
                }
            }
            class W extends g {
                constructor(e, t) {
                    super(e), (this.connectable = t);
                }
                _unsubscribe() {
                    const {connectable: e} = this;
                    if (!e) return void (this.connection = null);
                    this.connectable = null;
                    const t = e._refCount;
                    if (t <= 0) return void (this.connection = null);
                    if (((e._refCount = t - 1), t > 1))
                        return void (this.connection = null);
                    const {connection: n} = this,
                        r = e._connection;
                    (this.connection = null), !r || (n && r !== n) || r.unsubscribe();
                }
            }
            const Q = class extends v {
                    constructor(e, t) {
                        super(),
                            (this.source = e),
                            (this.subjectFactory = t),
                            (this._refCount = 0),
                            (this._isComplete = !1);
                    }
                    _subscribe(e) {
                        return this.getSubject().subscribe(e);
                    }
                    getSubject() {
                        const e = this._subject;
                        return (
                            (e && !e.isStopped) ||
                                (this._subject = this.subjectFactory()),
                            this._subject
                        );
                    }
                    connect() {
                        let e = this._connection;
                        return (
                            e ||
                                ((this._isComplete = !1),
                                (e = this._connection = new h()).add(
                                    this.source.subscribe(new J(this.getSubject(), this)),
                                ),
                                e.closed && ((this._connection = null), (e = h.EMPTY))),
                            e
                        );
                    }
                    refCount() {
                        return q()(this);
                    }
                }.prototype,
                K = {
                    operator: {value: null},
                    _refCount: {value: 0, writable: !0},
                    _subject: {value: null, writable: !0},
                    _connection: {value: null, writable: !0},
                    _subscribe: {value: Q._subscribe},
                    _isComplete: {value: Q._isComplete, writable: !0},
                    getSubject: {value: Q.getSubject},
                    connect: {value: Q.connect},
                    refCount: {value: Q.refCount},
                };
            class J extends x {
                constructor(e, t) {
                    super(e), (this.connectable = t);
                }
                _error(e) {
                    this._unsubscribe(), super._error(e);
                }
                _complete() {
                    (this.connectable._isComplete = !0),
                        this._unsubscribe(),
                        super._complete();
                }
                _unsubscribe() {
                    const e = this.connectable;
                    if (e) {
                        this.connectable = null;
                        const t = e._connection;
                        (e._refCount = 0),
                            (e._subject = null),
                            (e._connection = null),
                            t && t.unsubscribe();
                    }
                }
            }
            function Y() {
                return new S();
            }
            function X(e) {
                for (let t in e) if (e[t] === X) return t;
                throw Error('Could not find renamed property on target object.');
            }
            const ee = X({ngInjectableDef: X});
            function te(e) {
                return {
                    providedIn: e.providedIn || null,
                    factory: e.factory,
                    value: void 0,
                };
            }
            function ne(e) {
                return e && e.hasOwnProperty(ee) ? e[ee] : null;
            }
            class re {
                constructor(e, t) {
                    (this._desc = e),
                        (this.ngMetadataName = 'InjectionToken'),
                        (this.ngInjectableDef =
                            void 0 !== t
                                ? te({
                                      providedIn: t.providedIn || 'root',
                                      factory: t.factory,
                                  })
                                : void 0);
                }
                toString() {
                    return `InjectionToken ${this._desc}`;
                }
            }
            const se = '__parameters__';
            function le(e, t, n) {
                const r = (function(e) {
                    return function(...t) {
                        if (e) {
                            const n = e(...t);
                            for (const e in n) this[e] = n[e];
                        }
                    };
                })(t);
                function s(...e) {
                    if (this instanceof s) return r.apply(this, e), this;
                    const t = new s(...e);
                    return (n.annotation = t), n;
                    function n(e, n, r) {
                        const s = e.hasOwnProperty(se)
                            ? e[se]
                            : Object.defineProperty(e, se, {value: []})[se];
                        for (; s.length <= r; ) s.push(null);
                        return (s[r] = s[r] || []).push(t), e;
                    }
                }
                return (
                    n && (s.prototype = Object.create(n.prototype)),
                    (s.prototype.ngMetadataName = e),
                    (s.annotationCls = s),
                    s
                );
            }
            const ie = 'undefined' != typeof window && window,
                oe =
                    'undefined' != typeof self &&
                    'undefined' != typeof WorkerGlobalScope &&
                    self instanceof WorkerGlobalScope &&
                    self,
                ae = ('undefined' != typeof global && global) || ie || oe,
                ue = Promise.resolve(0);
            let ce = null;
            function de() {
                if (!ce) {
                    const e = ae.Symbol;
                    if (e && e.iterator) ce = e.iterator;
                    else {
                        const e = Object.getOwnPropertyNames(Map.prototype);
                        for (let t = 0; t < e.length; ++t) {
                            const n = e[t];
                            'entries' !== n &&
                                'size' !== n &&
                                Map.prototype[n] === Map.prototype.entries &&
                                (ce = n);
                        }
                    }
                }
                return ce;
            }
            function he(e) {
                'undefined' == typeof Zone
                    ? ue.then(() => {
                          e && e.apply(null, null);
                      })
                    : Zone.current.scheduleMicroTask('scheduleMicrotask', e);
            }
            function pe(e, t) {
                return (
                    e === t ||
                    ('number' == typeof e && 'number' == typeof t && isNaN(e) && isNaN(t))
                );
            }
            function fe(e) {
                if ('string' == typeof e) return e;
                if (e instanceof Array) return '[' + e.map(fe).join(', ') + ']';
                if (null == e) return '' + e;
                if (e.overriddenName) return `${e.overriddenName}`;
                if (e.name) return `${e.name}`;
                const t = e.toString();
                if (null == t) return '' + t;
                const n = t.indexOf('\n');
                return -1 === n ? t : t.substring(0, n);
            }
            const ge = X({__forward_ref__: X});
            function me(e) {
                return (
                    (e.__forward_ref__ = me),
                    (e.toString = function() {
                        return fe(this());
                    }),
                    e
                );
            }
            function _e(e) {
                const t = e;
                return 'function' == typeof t &&
                    t.hasOwnProperty(ge) &&
                    t.__forward_ref__ === me
                    ? t()
                    : e;
            }
            const ye = (function() {
                    var e = {Emulated: 0, Native: 1, None: 2, ShadowDom: 3};
                    return (
                        (e[e.Emulated] = 'Emulated'),
                        (e[e.Native] = 'Native'),
                        (e[e.None] = 'None'),
                        (e[e.ShadowDom] = 'ShadowDom'),
                        e
                    );
                })(),
                ve = le('Inject', e => ({token: e})),
                be = le('Optional'),
                we = le('Self'),
                Ce = le('SkipSelf'),
                Ee = (function() {
                    var e = {Default: 0, Host: 1, Self: 2, SkipSelf: 4, Optional: 8};
                    return (
                        (e[e.Default] = 'Default'),
                        (e[e.Host] = 'Host'),
                        (e[e.Self] = 'Self'),
                        (e[e.SkipSelf] = 'SkipSelf'),
                        (e[e.Optional] = 'Optional'),
                        e
                    );
                })();
            let xe,
                Se = void 0;
            function Te(e) {
                const t = Se;
                return (Se = e), t;
            }
            function Ne(e, t = Ee.Default) {
                return (xe ||
                    function(e, t = Ee.Default) {
                        if (void 0 === Se)
                            throw new Error(
                                'inject() must be called from an injection context',
                            );
                        return null === Se
                            ? (function(e, t, n) {
                                  const r = ne(e);
                                  if (r && 'root' == r.providedIn)
                                      return void 0 === r.value
                                          ? (r.value = r.factory())
                                          : r.value;
                                  if (n & Ee.Optional) return null;
                                  throw new Error(`Injector: NOT_FOUND [${fe(e)}]`);
                              })(e, 0, t)
                            : Se.get(e, t & Ee.Optional ? null : void 0, t);
                    })(e, t);
            }
            const Ae = /([A-Z])/g;
            function ke(e) {
                try {
                    return null != e ? e.toString().slice(0, 30) : e;
                } catch (t) {
                    return '[ERROR] Exception while trying to serialize the value';
                }
            }
            function Ie(e, t) {
                const n = Oe(e),
                    r = Oe(t);
                if (n && r)
                    return (function(e, t, n) {
                        const r = e[de()](),
                            s = t[de()]();
                        for (;;) {
                            const e = r.next(),
                                t = s.next();
                            if (e.done && t.done) return !0;
                            if (e.done || t.done) return !1;
                            if (!n(e.value, t.value)) return !1;
                        }
                    })(e, t, Ie);
                {
                    const s = e && ('object' == typeof e || 'function' == typeof e),
                        l = t && ('object' == typeof t || 'function' == typeof t);
                    return !(n || !s || r || !l) || pe(e, t);
                }
            }
            class Ve {
                constructor(e) {
                    this.wrapped = e;
                }
                static wrap(e) {
                    return new Ve(e);
                }
                static unwrap(e) {
                    return Ve.isWrapped(e) ? e.wrapped : e;
                }
                static isWrapped(e) {
                    return e instanceof Ve;
                }
            }
            class De {
                constructor(e, t, n) {
                    (this.previousValue = e),
                        (this.currentValue = t),
                        (this.firstChange = n);
                }
                isFirstChange() {
                    return this.firstChange;
                }
            }
            function Oe(e) {
                return (
                    !!Me(e) && (Array.isArray(e) || (!(e instanceof Map) && de() in e))
                );
            }
            function Me(e) {
                return null !== e && ('function' == typeof e || 'object' == typeof e);
            }
            function Pe(...e) {}
            const Re = '__source',
                Fe = new Object(),
                je = new re('INJECTOR');
            class He {
                get(e, t = Fe) {
                    if (t === Fe)
                        throw new Error(`NullInjectorError: No provider for ${fe(e)}!`);
                    return t;
                }
            }
            const Le = (function() {
                    class e {
                        static create(e, t) {
                            return Array.isArray(e)
                                ? new Ye(e, t)
                                : new Ye(e.providers, e.parent, e.name || null);
                        }
                    }
                    return (
                        (e.THROW_IF_NOT_FOUND = Fe),
                        (e.NULL = new He()),
                        (e.ngInjectableDef = te({
                            providedIn: 'any',
                            factory: () => Ne(je),
                        })),
                        (e.__NG_ELEMENT_ID__ = () => Be()),
                        e
                    );
                })(),
                Be = Pe,
                Ue = function(e) {
                    return e;
                },
                $e = [],
                ze = Ue,
                Ge = function() {
                    return Array.prototype.slice.call(arguments);
                },
                qe = X({provide: String, useValue: X}),
                Ze = 'ngTokenPath',
                We = 'ngTempTokenPath',
                Qe = Le.NULL,
                Ke = /\n/gm,
                Je = '\u0275';
            class Ye {
                constructor(e, t = Qe, n = null) {
                    (this.parent = t), (this.source = n);
                    const r = (this._records = new Map());
                    r.set(Le, {token: Le, fn: Ue, deps: $e, value: this, useNew: !1}),
                        r.set(je, {token: je, fn: Ue, deps: $e, value: this, useNew: !1}),
                        (function e(t, n) {
                            if (n)
                                if ((n = _e(n)) instanceof Array)
                                    for (let r = 0; r < n.length; r++) e(t, n[r]);
                                else {
                                    if ('function' == typeof n)
                                        throw tt('Function/Class not supported', n);
                                    if (!n || 'object' != typeof n || !n.provide)
                                        throw tt('Unexpected provider', n);
                                    {
                                        let e = _e(n.provide);
                                        const r = (function(e) {
                                            const t = (function(e) {
                                                let t = $e;
                                                const n = e.deps;
                                                if (n && n.length) {
                                                    t = [];
                                                    for (let e = 0; e < n.length; e++) {
                                                        let r = 6,
                                                            s = _e(n[e]);
                                                        if (s instanceof Array)
                                                            for (
                                                                let e = 0, t = s;
                                                                e < t.length;
                                                                e++
                                                            ) {
                                                                const n = t[e];
                                                                n instanceof be || n == be
                                                                    ? (r |= 1)
                                                                    : n instanceof Ce ||
                                                                      n == Ce
                                                                    ? (r &= -3)
                                                                    : n instanceof we ||
                                                                      n == we
                                                                    ? (r &= -5)
                                                                    : (s =
                                                                          n instanceof ve
                                                                              ? n.token
                                                                              : _e(n));
                                                            }
                                                        t.push({token: s, options: r});
                                                    }
                                                } else if (e.useExisting)
                                                    t = [
                                                        {
                                                            token: _e(e.useExisting),
                                                            options: 6,
                                                        },
                                                    ];
                                                else if (!(n || qe in e))
                                                    throw tt("'deps' required", e);
                                                return t;
                                            })(e);
                                            let n = Ue,
                                                r = $e,
                                                s = !1,
                                                l = _e(e.provide);
                                            if (qe in e) r = e.useValue;
                                            else if (e.useFactory) n = e.useFactory;
                                            else if (e.useExisting);
                                            else if (e.useClass)
                                                (s = !0), (n = _e(e.useClass));
                                            else {
                                                if ('function' != typeof l)
                                                    throw tt(
                                                        'StaticProvider does not have [useValue|useFactory|useExisting|useClass] or [provide] is not newable',
                                                        e,
                                                    );
                                                (s = !0), (n = l);
                                            }
                                            return {deps: t, fn: n, useNew: s, value: r};
                                        })(n);
                                        if (!0 === n.multi) {
                                            let r = t.get(e);
                                            if (r) {
                                                if (r.fn !== Ge) throw Xe(e);
                                            } else
                                                t.set(
                                                    e,
                                                    (r = {
                                                        token: n.provide,
                                                        deps: [],
                                                        useNew: !1,
                                                        fn: Ge,
                                                        value: $e,
                                                    }),
                                                );
                                            r.deps.push({token: (e = n), options: 6});
                                        }
                                        const s = t.get(e);
                                        if (s && s.fn == Ge) throw Xe(e);
                                        t.set(e, r);
                                    }
                                }
                        })(r, e);
                }
                get(e, t, n = Ee.Default) {
                    const r = this._records.get(e);
                    try {
                        return (function e(t, n, r, s, l, i) {
                            try {
                                return (function(t, n, r, s, l, i) {
                                    let o;
                                    if (!n || i & Ee.SkipSelf)
                                        i & Ee.Self || (o = s.get(t, l, Ee.Default));
                                    else {
                                        if ((o = n.value) == ze)
                                            throw Error(Je + 'Circular dependency');
                                        if (o === $e) {
                                            n.value = ze;
                                            let t = void 0,
                                                l = n.useNew,
                                                i = n.fn,
                                                a = n.deps,
                                                u = $e;
                                            if (a.length) {
                                                u = [];
                                                for (let t = 0; t < a.length; t++) {
                                                    const n = a[t],
                                                        l = n.options,
                                                        i =
                                                            2 & l
                                                                ? r.get(n.token)
                                                                : void 0;
                                                    u.push(
                                                        e(
                                                            n.token,
                                                            i,
                                                            r,
                                                            i || 4 & l ? s : Qe,
                                                            1 & l
                                                                ? null
                                                                : Le.THROW_IF_NOT_FOUND,
                                                            Ee.Default,
                                                        ),
                                                    );
                                                }
                                            }
                                            n.value = o = l ? new i(...u) : i.apply(t, u);
                                        }
                                    }
                                    return o;
                                })(t, n, r, s, l, i);
                            } catch (o) {
                                throw (o instanceof Error || (o = new Error(o)),
                                (o[We] = o[We] || []).unshift(t),
                                n && n.value == ze && (n.value = $e),
                                o);
                            }
                        })(e, r, this._records, this.parent, t, n);
                    } catch (s) {
                        const t = s[We];
                        throw (e[Re] && t.unshift(e[Re]),
                        (s.message = et('\n' + s.message, t, this.source)),
                        (s[Ze] = t),
                        (s[We] = null),
                        s);
                    }
                }
                toString() {
                    const e = [];
                    return (
                        this._records.forEach((t, n) => e.push(fe(n))),
                        `StaticInjector[${e.join(', ')}]`
                    );
                }
            }
            function Xe(e) {
                return tt('Cannot mix multi providers and regular providers', e);
            }
            function et(e, t, n = null) {
                e = e && '\n' === e.charAt(0) && e.charAt(1) == Je ? e.substr(2) : e;
                let r = fe(t);
                if (t instanceof Array) r = t.map(fe).join(' -> ');
                else if ('object' == typeof t) {
                    let e = [];
                    for (let n in t)
                        if (t.hasOwnProperty(n)) {
                            let r = t[n];
                            e.push(
                                n +
                                    ':' +
                                    ('string' == typeof r ? JSON.stringify(r) : fe(r)),
                            );
                        }
                    r = `{${e.join(', ')}}`;
                }
                return `StaticInjectorError${n ? '(' + n + ')' : ''}[${r}]: ${e.replace(
                    Ke,
                    '\n  ',
                )}`;
            }
            function tt(e, t) {
                return new Error(et(e, t));
            }
            const nt = new re(
                'The presence of this token marks an injector as being the root injector.',
            );
            class rt {}
            class st {}
            function lt(e) {
                const t = Error(
                    `No component factory found for ${fe(
                        e,
                    )}. Did you add it to @NgModule.entryComponents?`,
                );
                return (t[it] = e), t;
            }
            const it = 'ngComponent';
            class ot {
                resolveComponentFactory(e) {
                    throw lt(e);
                }
            }
            const at = (function() {
                class e {}
                return (e.NULL = new ot()), e;
            })();
            class ut {
                constructor(e, t, n) {
                    (this._parent = t),
                        (this._ngModule = n),
                        (this._factories = new Map());
                    for (let r = 0; r < e.length; r++) {
                        const t = e[r];
                        this._factories.set(t.componentType, t);
                    }
                }
                resolveComponentFactory(e) {
                    let t = this._factories.get(e);
                    if (
                        (!t &&
                            this._parent &&
                            (t = this._parent.resolveComponentFactory(e)),
                        !t)
                    )
                        throw lt(e);
                    return new ct(t, this._ngModule);
                }
            }
            class ct extends st {
                constructor(e, t) {
                    super(),
                        (this.factory = e),
                        (this.ngModule = t),
                        (this.selector = e.selector),
                        (this.componentType = e.componentType),
                        (this.ngContentSelectors = e.ngContentSelectors),
                        (this.inputs = e.inputs),
                        (this.outputs = e.outputs);
                }
                create(e, t, n, r) {
                    return this.factory.create(e, t, n, r || this.ngModule);
                }
            }
            class dt {}
            class ht {}
            const pt = (function() {
                    class e {
                        constructor(e) {
                            this.nativeElement = e;
                        }
                    }
                    return (e.__NG_ELEMENT_ID__ = () => ft(e)), e;
                })(),
                ft = Pe;
            class gt {}
            class mt {}
            const _t = (function() {
                    var e = {Important: 1, DashCase: 2};
                    return (
                        (e[e.Important] = 'Important'), (e[e.DashCase] = 'DashCase'), e
                    );
                })(),
                yt = (function() {
                    class e {}
                    return (e.__NG_ELEMENT_ID__ = () => vt()), e;
                })(),
                vt = Pe,
                bt = (function() {
                    var e = {
                        NONE: 0,
                        HTML: 1,
                        STYLE: 2,
                        SCRIPT: 3,
                        URL: 4,
                        RESOURCE_URL: 5,
                    };
                    return (
                        (e[e.NONE] = 'NONE'),
                        (e[e.HTML] = 'HTML'),
                        (e[e.STYLE] = 'STYLE'),
                        (e[e.SCRIPT] = 'SCRIPT'),
                        (e[e.URL] = 'URL'),
                        (e[e.RESOURCE_URL] = 'RESOURCE_URL'),
                        e
                    );
                })();
            class wt {}
            class Ct {
                constructor(e) {
                    (this.full = e),
                        (this.major = e.split('.')[0]),
                        (this.minor = e.split('.')[1]),
                        (this.patch = e
                            .split('.')
                            .slice(2)
                            .join('.'));
                }
            }
            const Et = new Ct('7.2.15');
            let xt = !0,
                St = !1;
            function Tt() {
                return (St = !0), xt;
            }
            class Nt {
                constructor(e) {
                    if (
                        ((this.defaultDoc = e),
                        (this.inertDocument = this.defaultDoc.implementation.createHTMLDocument(
                            'sanitization-inert',
                        )),
                        (this.inertBodyElement = this.inertDocument.body),
                        null == this.inertBodyElement)
                    ) {
                        const e = this.inertDocument.createElement('html');
                        this.inertDocument.appendChild(e),
                            (this.inertBodyElement = this.inertDocument.createElement(
                                'body',
                            )),
                            e.appendChild(this.inertBodyElement);
                    }
                    (this.inertBodyElement.innerHTML =
                        '<svg><g onload="this.parentNode.remove()"></g></svg>'),
                        !this.inertBodyElement.querySelector ||
                        this.inertBodyElement.querySelector('svg')
                            ? ((this.inertBodyElement.innerHTML =
                                  '<svg><p><style><img src="</style><img src=x onerror=alert(1)//">'),
                              (this.getInertBodyElement =
                                  this.inertBodyElement.querySelector &&
                                  this.inertBodyElement.querySelector('svg img') &&
                                  (function() {
                                      try {
                                          return !!window.DOMParser;
                                      } catch (e) {
                                          return !1;
                                      }
                                  })()
                                      ? this.getInertBodyElement_DOMParser
                                      : this.getInertBodyElement_InertDocument))
                            : (this.getInertBodyElement = this.getInertBodyElement_XHR);
                }
                getInertBodyElement_XHR(e) {
                    e = '<body><remove></remove>' + e + '</body>';
                    try {
                        e = encodeURI(e);
                    } catch (r) {
                        return null;
                    }
                    const t = new XMLHttpRequest();
                    (t.responseType = 'document'),
                        t.open('GET', 'data:text/html;charset=utf-8,' + e, !1),
                        t.send(void 0);
                    const n = t.response.body;
                    return n.removeChild(n.firstChild), n;
                }
                getInertBodyElement_DOMParser(e) {
                    e = '<body><remove></remove>' + e + '</body>';
                    try {
                        const n = new window.DOMParser().parseFromString(e, 'text/html')
                            .body;
                        return n.removeChild(n.firstChild), n;
                    } catch (t) {
                        return null;
                    }
                }
                getInertBodyElement_InertDocument(e) {
                    const t = this.inertDocument.createElement('template');
                    return 'content' in t
                        ? ((t.innerHTML = e), t)
                        : ((this.inertBodyElement.innerHTML = e),
                          this.defaultDoc.documentMode &&
                              this.stripCustomNsAttrs(this.inertBodyElement),
                          this.inertBodyElement);
                }
                stripCustomNsAttrs(e) {
                    const t = e.attributes;
                    for (let r = t.length - 1; 0 < r; r--) {
                        const n = t.item(r).name;
                        ('xmlns:ns1' !== n && 0 !== n.indexOf('ns1:')) ||
                            e.removeAttribute(n);
                    }
                    let n = e.firstChild;
                    for (; n; )
                        n.nodeType === Node.ELEMENT_NODE && this.stripCustomNsAttrs(n),
                            (n = n.nextSibling);
                }
            }
            const At = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
                kt = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
            function It(e) {
                return (e = String(e)).match(At) || e.match(kt)
                    ? e
                    : (Tt() &&
                          console.warn(
                              `WARNING: sanitizing unsafe URL value ${e} (see http://g.co/ng/security#xss)`,
                          ),
                      'unsafe:' + e);
            }
            function Vt(e) {
                const t = {};
                for (const n of e.split(',')) t[n] = !0;
                return t;
            }
            function Dt(...e) {
                const t = {};
                for (const n of e) for (const e in n) n.hasOwnProperty(e) && (t[e] = !0);
                return t;
            }
            const Ot = Vt('area,br,col,hr,img,wbr'),
                Mt = Vt('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr'),
                Pt = Vt('rp,rt'),
                Rt = Dt(Pt, Mt),
                Ft = Dt(
                    Ot,
                    Dt(
                        Mt,
                        Vt(
                            'address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul',
                        ),
                    ),
                    Dt(
                        Pt,
                        Vt(
                            'a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video',
                        ),
                    ),
                    Rt,
                ),
                jt = Vt('background,cite,href,itemtype,longdesc,poster,src,xlink:href'),
                Ht = Vt('srcset'),
                Lt = Dt(
                    jt,
                    Ht,
                    Vt(
                        'abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width',
                    ),
                ),
                Bt = Vt('script,style,template');
            class Ut {
                constructor() {
                    (this.sanitizedSomething = !1), (this.buf = []);
                }
                sanitizeChildren(e) {
                    let t = e.firstChild,
                        n = !0;
                    for (; t; )
                        if (
                            (t.nodeType === Node.ELEMENT_NODE
                                ? (n = this.startElement(t))
                                : t.nodeType === Node.TEXT_NODE
                                ? this.chars(t.nodeValue)
                                : (this.sanitizedSomething = !0),
                            n && t.firstChild)
                        )
                            t = t.firstChild;
                        else
                            for (; t; ) {
                                t.nodeType === Node.ELEMENT_NODE && this.endElement(t);
                                let e = this.checkClobberedElement(t, t.nextSibling);
                                if (e) {
                                    t = e;
                                    break;
                                }
                                t = this.checkClobberedElement(t, t.parentNode);
                            }
                    return this.buf.join('');
                }
                startElement(e) {
                    const t = e.nodeName.toLowerCase();
                    if (!Ft.hasOwnProperty(t))
                        return (this.sanitizedSomething = !0), !Bt.hasOwnProperty(t);
                    this.buf.push('<'), this.buf.push(t);
                    const n = e.attributes;
                    for (let s = 0; s < n.length; s++) {
                        const e = n.item(s),
                            t = e.name,
                            l = t.toLowerCase();
                        if (!Lt.hasOwnProperty(l)) {
                            this.sanitizedSomething = !0;
                            continue;
                        }
                        let i = e.value;
                        jt[l] && (i = It(i)),
                            Ht[l] &&
                                ((r = i),
                                (i = (r = String(r))
                                    .split(',')
                                    .map(e => It(e.trim()))
                                    .join(', '))),
                            this.buf.push(' ', t, '="', Gt(i), '"');
                    }
                    var r;
                    return this.buf.push('>'), !0;
                }
                endElement(e) {
                    const t = e.nodeName.toLowerCase();
                    Ft.hasOwnProperty(t) &&
                        !Ot.hasOwnProperty(t) &&
                        (this.buf.push('</'), this.buf.push(t), this.buf.push('>'));
                }
                chars(e) {
                    this.buf.push(Gt(e));
                }
                checkClobberedElement(e, t) {
                    if (
                        t &&
                        (e.compareDocumentPosition(t) &
                            Node.DOCUMENT_POSITION_CONTAINED_BY) ===
                            Node.DOCUMENT_POSITION_CONTAINED_BY
                    )
                        throw new Error(
                            `Failed to sanitize html because the element is clobbered: ${e.outerHTML}`,
                        );
                    return t;
                }
            }
            const $t = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
                zt = /([^\#-~ |!])/g;
            function Gt(e) {
                return e
                    .replace(/&/g, '&amp;')
                    .replace($t, function(e) {
                        return (
                            '&#' +
                            (1024 * (e.charCodeAt(0) - 55296) +
                                (e.charCodeAt(1) - 56320) +
                                65536) +
                            ';'
                        );
                    })
                    .replace(zt, function(e) {
                        return '&#' + e.charCodeAt(0) + ';';
                    })
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;');
            }
            let qt;
            function Zt(e) {
                return 'content' in e &&
                    (function(e) {
                        return (
                            e.nodeType === Node.ELEMENT_NODE && 'TEMPLATE' === e.nodeName
                        );
                    })(e)
                    ? e.content
                    : null;
            }
            class Wt extends S {
                constructor(e = !1) {
                    super(), (this.__isAsync = e);
                }
                emit(e) {
                    super.next(e);
                }
                subscribe(e, t, n) {
                    let r,
                        s = e => null,
                        l = () => null;
                    e && 'object' == typeof e
                        ? ((r = this.__isAsync
                              ? t => {
                                    setTimeout(() => e.next(t));
                                }
                              : t => {
                                    e.next(t);
                                }),
                          e.error &&
                              (s = this.__isAsync
                                  ? t => {
                                        setTimeout(() => e.error(t));
                                    }
                                  : t => {
                                        e.error(t);
                                    }),
                          e.complete &&
                              (l = this.__isAsync
                                  ? () => {
                                        setTimeout(() => e.complete());
                                    }
                                  : () => {
                                        e.complete();
                                    }))
                        : ((r = this.__isAsync
                              ? t => {
                                    setTimeout(() => e(t));
                                }
                              : t => {
                                    e(t);
                                }),
                          t &&
                              (s = this.__isAsync
                                  ? e => {
                                        setTimeout(() => t(e));
                                    }
                                  : e => {
                                        t(e);
                                    }),
                          n &&
                              (l = this.__isAsync
                                  ? () => {
                                        setTimeout(() => n());
                                    }
                                  : () => {
                                        n();
                                    }));
                    const i = super.subscribe(r, s, l);
                    return e instanceof h && e.add(i), i;
                }
            }
            const Qt = (function() {
                    class e {}
                    return (e.__NG_ELEMENT_ID__ = () => Kt(e, pt)), e;
                })(),
                Kt = Pe,
                Jt = new RegExp(
                    '^([-,."\'%_!# a-zA-Z0-9]+|(?:(?:matrix|translate|scale|rotate|skew|perspective)(?:X|Y|3d)?|(?:rgb|hsl)a?|(?:repeating-)?(?:linear|radial)-gradient|(?:calc|attr))\\([-0-9.%, #a-zA-Z]+\\))$',
                    'g',
                ),
                Yt = /^url\(([^)]+)\)$/,
                Xt = 'ngDebugContext',
                en = 'ngOriginalError',
                tn = 'ngErrorLogger';
            function nn(e) {
                return e[Xt];
            }
            function rn(e) {
                return e[en];
            }
            function sn(e, ...t) {
                e.error(...t);
            }
            class ln {
                constructor() {
                    this._console = console;
                }
                handleError(e) {
                    const t = this._findOriginalError(e),
                        n = this._findContext(e),
                        r = (function(e) {
                            return e[tn] || sn;
                        })(e);
                    r(this._console, 'ERROR', e),
                        t && r(this._console, 'ORIGINAL ERROR', t),
                        n && r(this._console, 'ERROR CONTEXT', n);
                }
                _findContext(e) {
                    return e ? (nn(e) ? nn(e) : this._findContext(rn(e))) : null;
                }
                _findOriginalError(e) {
                    let t = rn(e);
                    for (; t && rn(t); ) t = rn(t);
                    return t;
                }
            }
            function on(e) {
                return !!e && 'function' == typeof e.then;
            }
            function an(e) {
                return !!e && 'function' == typeof e.subscribe;
            }
            const un = new re('Application Initializer');
            class cn {
                constructor(e) {
                    (this.appInits = e),
                        (this.initialized = !1),
                        (this.done = !1),
                        (this.donePromise = new Promise((e, t) => {
                            (this.resolve = e), (this.reject = t);
                        }));
                }
                runInitializers() {
                    if (this.initialized) return;
                    const e = [],
                        t = () => {
                            (this.done = !0), this.resolve();
                        };
                    if (this.appInits)
                        for (let n = 0; n < this.appInits.length; n++) {
                            const t = this.appInits[n]();
                            on(t) && e.push(t);
                        }
                    Promise.all(e)
                        .then(() => {
                            t();
                        })
                        .catch(e => {
                            this.reject(e);
                        }),
                        0 === e.length && t(),
                        (this.initialized = !0);
                }
            }
            const dn = new re('AppId'),
                hn = new re('Platform Initializer'),
                pn = new re('Platform ID'),
                fn = new re('appBootstrapListener');
            class gn {
                log(e) {
                    console.log(e);
                }
                warn(e) {
                    console.warn(e);
                }
            }
            function mn() {
                throw new Error('Runtime compiler is not loaded');
            }
            const _n = mn,
                yn = mn,
                vn = mn,
                bn = mn;
            class wn {
                constructor() {
                    (this.compileModuleSync = _n),
                        (this.compileModuleAsync = yn),
                        (this.compileModuleAndAllComponentsSync = vn),
                        (this.compileModuleAndAllComponentsAsync = bn);
                }
                clearCache() {}
                clearCacheFor(e) {}
                getModuleId(e) {}
            }
            class Cn {}
            let En, xn;
            function Sn() {
                const e = ae.wtf;
                return !(!e || !(En = e.trace) || ((xn = En.events), 0));
            }
            const Tn = Sn(),
                Nn = Tn
                    ? function(e, t = null) {
                          return xn.createScope(e, t);
                      }
                    : (e, t) =>
                          function(e, t) {
                              return null;
                          },
                An = Tn
                    ? function(e, t) {
                          return En.leaveScope(e, t), t;
                      }
                    : (e, t) => t;
            class kn {
                constructor({enableLongStackTrace: e = !1}) {
                    if (
                        ((this.hasPendingMicrotasks = !1),
                        (this.hasPendingMacrotasks = !1),
                        (this.isStable = !0),
                        (this.onUnstable = new Wt(!1)),
                        (this.onMicrotaskEmpty = new Wt(!1)),
                        (this.onStable = new Wt(!1)),
                        (this.onError = new Wt(!1)),
                        'undefined' == typeof Zone)
                    )
                        throw new Error('In this configuration Angular requires Zone.js');
                    var t;
                    Zone.assertZonePatched(),
                        (this._nesting = 0),
                        (this._outer = this._inner = Zone.current),
                        Zone.wtfZoneSpec &&
                            (this._inner = this._inner.fork(Zone.wtfZoneSpec)),
                        Zone.TaskTrackingZoneSpec &&
                            (this._inner = this._inner.fork(
                                new Zone.TaskTrackingZoneSpec(),
                            )),
                        e &&
                            Zone.longStackTraceZoneSpec &&
                            (this._inner = this._inner.fork(Zone.longStackTraceZoneSpec)),
                        ((t = this)._inner = t._inner.fork({
                            name: 'angular',
                            properties: {isAngularZone: !0},
                            onInvokeTask: (e, n, r, s, l, i) => {
                                try {
                                    return On(t), e.invokeTask(r, s, l, i);
                                } finally {
                                    Mn(t);
                                }
                            },
                            onInvoke: (e, n, r, s, l, i, o) => {
                                try {
                                    return On(t), e.invoke(r, s, l, i, o);
                                } finally {
                                    Mn(t);
                                }
                            },
                            onHasTask: (e, n, r, s) => {
                                e.hasTask(r, s),
                                    n === r &&
                                        ('microTask' == s.change
                                            ? ((t.hasPendingMicrotasks = s.microTask),
                                              Dn(t))
                                            : 'macroTask' == s.change &&
                                              (t.hasPendingMacrotasks = s.macroTask));
                            },
                            onHandleError: (e, n, r, s) => (
                                e.handleError(r, s),
                                t.runOutsideAngular(() => t.onError.emit(s)),
                                !1
                            ),
                        }));
                }
                static isInAngularZone() {
                    return !0 === Zone.current.get('isAngularZone');
                }
                static assertInAngularZone() {
                    if (!kn.isInAngularZone())
                        throw new Error('Expected to be in Angular Zone, but it is not!');
                }
                static assertNotInAngularZone() {
                    if (kn.isInAngularZone())
                        throw new Error('Expected to not be in Angular Zone, but it is!');
                }
                run(e, t, n) {
                    return this._inner.run(e, t, n);
                }
                runTask(e, t, n, r) {
                    const s = this._inner,
                        l = s.scheduleEventTask('NgZoneEvent: ' + r, e, Vn, In, In);
                    try {
                        return s.runTask(l, t, n);
                    } finally {
                        s.cancelTask(l);
                    }
                }
                runGuarded(e, t, n) {
                    return this._inner.runGuarded(e, t, n);
                }
                runOutsideAngular(e) {
                    return this._outer.run(e);
                }
            }
            function In() {}
            const Vn = {};
            function Dn(e) {
                if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
                    try {
                        e._nesting++, e.onMicrotaskEmpty.emit(null);
                    } finally {
                        if ((e._nesting--, !e.hasPendingMicrotasks))
                            try {
                                e.runOutsideAngular(() => e.onStable.emit(null));
                            } finally {
                                e.isStable = !0;
                            }
                    }
            }
            function On(e) {
                e._nesting++, e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
            }
            function Mn(e) {
                e._nesting--, Dn(e);
            }
            class Pn {
                constructor() {
                    (this.hasPendingMicrotasks = !1),
                        (this.hasPendingMacrotasks = !1),
                        (this.isStable = !0),
                        (this.onUnstable = new Wt()),
                        (this.onMicrotaskEmpty = new Wt()),
                        (this.onStable = new Wt()),
                        (this.onError = new Wt());
                }
                run(e) {
                    return e();
                }
                runGuarded(e) {
                    return e();
                }
                runOutsideAngular(e) {
                    return e();
                }
                runTask(e) {
                    return e();
                }
            }
            class Rn {
                constructor(e) {
                    (this._ngZone = e),
                        (this._pendingCount = 0),
                        (this._isZoneStable = !0),
                        (this._didWork = !1),
                        (this._callbacks = []),
                        (this.taskTrackingZone = null),
                        this._watchAngularEvents(),
                        e.run(() => {
                            this.taskTrackingZone =
                                'undefined' == typeof Zone
                                    ? null
                                    : Zone.current.get('TaskTrackingZone');
                        });
                }
                _watchAngularEvents() {
                    this._ngZone.onUnstable.subscribe({
                        next: () => {
                            (this._didWork = !0), (this._isZoneStable = !1);
                        },
                    }),
                        this._ngZone.runOutsideAngular(() => {
                            this._ngZone.onStable.subscribe({
                                next: () => {
                                    kn.assertNotInAngularZone(),
                                        he(() => {
                                            (this._isZoneStable = !0),
                                                this._runCallbacksIfReady();
                                        });
                                },
                            });
                        });
                }
                increasePendingRequestCount() {
                    return (
                        (this._pendingCount += 1),
                        (this._didWork = !0),
                        this._pendingCount
                    );
                }
                decreasePendingRequestCount() {
                    if (((this._pendingCount -= 1), this._pendingCount < 0))
                        throw new Error('pending async requests below zero');
                    return this._runCallbacksIfReady(), this._pendingCount;
                }
                isStable() {
                    return (
                        this._isZoneStable &&
                        0 === this._pendingCount &&
                        !this._ngZone.hasPendingMacrotasks
                    );
                }
                _runCallbacksIfReady() {
                    if (this.isStable())
                        he(() => {
                            for (; 0 !== this._callbacks.length; ) {
                                let e = this._callbacks.pop();
                                clearTimeout(e.timeoutId), e.doneCb(this._didWork);
                            }
                            this._didWork = !1;
                        });
                    else {
                        let e = this.getPendingTasks();
                        (this._callbacks = this._callbacks.filter(
                            t =>
                                !t.updateCb ||
                                !t.updateCb(e) ||
                                (clearTimeout(t.timeoutId), !1),
                        )),
                            (this._didWork = !0);
                    }
                }
                getPendingTasks() {
                    return this.taskTrackingZone
                        ? this.taskTrackingZone.macroTasks.map(e => ({
                              source: e.source,
                              creationLocation: e.creationLocation,
                              data: e.data,
                          }))
                        : [];
                }
                addCallback(e, t, n) {
                    let r = -1;
                    t &&
                        t > 0 &&
                        (r = setTimeout(() => {
                            (this._callbacks = this._callbacks.filter(
                                e => e.timeoutId !== r,
                            )),
                                e(this._didWork, this.getPendingTasks());
                        }, t)),
                        this._callbacks.push({doneCb: e, timeoutId: r, updateCb: n});
                }
                whenStable(e, t, n) {
                    if (n && !this.taskTrackingZone)
                        throw new Error(
                            'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?',
                        );
                    this.addCallback(e, t, n), this._runCallbacksIfReady();
                }
                getPendingRequestCount() {
                    return this._pendingCount;
                }
                findProviders(e, t, n) {
                    return [];
                }
            }
            const Fn = (function() {
                class e {
                    constructor() {
                        (this._applications = new Map()), Ln.addToWindow(this);
                    }
                    registerApplication(e, t) {
                        this._applications.set(e, t);
                    }
                    unregisterApplication(e) {
                        this._applications.delete(e);
                    }
                    unregisterAllApplications() {
                        this._applications.clear();
                    }
                    getTestability(e) {
                        return this._applications.get(e) || null;
                    }
                    getAllTestabilities() {
                        return Array.from(this._applications.values());
                    }
                    getAllRootElements() {
                        return Array.from(this._applications.keys());
                    }
                    findTestabilityInTree(e, t = !0) {
                        return Ln.findTestabilityInTree(this, e, t);
                    }
                }
                return (e.ctorParameters = () => []), e;
            })();
            class jn {
                addToWindow(e) {}
                findTestabilityInTree(e, t, n) {
                    return null;
                }
            }
            let Hn,
                Ln = new jn(),
                Bn = function(e, t, n) {
                    return e
                        .get(Cn)
                        .createCompiler([t])
                        .compileModuleAsync(n);
                };
            const Un = new re('AllowMultipleToken');
            class $n {
                constructor(e, t) {
                    (this.name = e), (this.token = t);
                }
            }
            function zn(e, t, n = []) {
                const r = `Platform: ${t}`,
                    s = new re(r);
                return (t = []) => {
                    let l = Gn();
                    if (!l || l.injector.get(Un, !1))
                        if (e) e(n.concat(t).concat({provide: s, useValue: !0}));
                        else {
                            const e = n.concat(t).concat({provide: s, useValue: !0});
                            !(function(e) {
                                if (Hn && !Hn.destroyed && !Hn.injector.get(Un, !1))
                                    throw new Error(
                                        'There can be only one platform. Destroy the previous one to create a new one.',
                                    );
                                Hn = e.get(qn);
                                const t = e.get(hn, null);
                                t && t.forEach(e => e());
                            })(Le.create({providers: e, name: r}));
                        }
                    return (function(e) {
                        const t = Gn();
                        if (!t) throw new Error('No platform exists!');
                        if (!t.injector.get(e, null))
                            throw new Error(
                                'A platform with a different configuration has been created. Please destroy it first.',
                            );
                        return t;
                    })(s);
                };
            }
            function Gn() {
                return Hn && !Hn.destroyed ? Hn : null;
            }
            class qn {
                constructor(e) {
                    (this._injector = e),
                        (this._modules = []),
                        (this._destroyListeners = []),
                        (this._destroyed = !1);
                }
                bootstrapModuleFactory(e, t) {
                    const n =
                            'noop' === (s = t ? t.ngZone : void 0)
                                ? new Pn()
                                : ('zone.js' === s ? void 0 : s) ||
                                  new kn({enableLongStackTrace: Tt()}),
                        r = [{provide: kn, useValue: n}];
                    var s;
                    return n.run(() => {
                        const t = Le.create({
                                providers: r,
                                parent: this.injector,
                                name: e.moduleType.name,
                            }),
                            s = e.create(t),
                            l = s.injector.get(ln, null);
                        if (!l)
                            throw new Error(
                                'No ErrorHandler. Is platform module (BrowserModule) included?',
                            );
                        return (
                            s.onDestroy(() => Qn(this._modules, s)),
                            n.runOutsideAngular(() =>
                                n.onError.subscribe({
                                    next: e => {
                                        l.handleError(e);
                                    },
                                }),
                            ),
                            (function(e, t, n) {
                                try {
                                    const s = n();
                                    return on(s)
                                        ? s.catch(n => {
                                              throw (t.runOutsideAngular(() =>
                                                  e.handleError(n),
                                              ),
                                              n);
                                          })
                                        : s;
                                } catch (r) {
                                    throw (t.runOutsideAngular(() => e.handleError(r)),
                                    r);
                                }
                            })(l, n, () => {
                                const e = s.injector.get(cn);
                                return (
                                    e.runInitializers(),
                                    e.donePromise.then(
                                        () => (this._moduleDoBootstrap(s), s),
                                    )
                                );
                            })
                        );
                    });
                }
                bootstrapModule(e, t = []) {
                    const n = Zn({}, t);
                    return Bn(this.injector, n, e).then(e =>
                        this.bootstrapModuleFactory(e, n),
                    );
                }
                _moduleDoBootstrap(e) {
                    const t = e.injector.get(Wn);
                    if (e._bootstrapComponents.length > 0)
                        e._bootstrapComponents.forEach(e => t.bootstrap(e));
                    else {
                        if (!e.instance.ngDoBootstrap)
                            throw new Error(
                                `The module ${fe(
                                    e.instance.constructor,
                                )} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. ` +
                                    'Please define one of these.',
                            );
                        e.instance.ngDoBootstrap(t);
                    }
                    this._modules.push(e);
                }
                onDestroy(e) {
                    this._destroyListeners.push(e);
                }
                get injector() {
                    return this._injector;
                }
                destroy() {
                    if (this._destroyed)
                        throw new Error('The platform has already been destroyed!');
                    this._modules.slice().forEach(e => e.destroy()),
                        this._destroyListeners.forEach(e => e()),
                        (this._destroyed = !0);
                }
                get destroyed() {
                    return this._destroyed;
                }
            }
            function Zn(e, t) {
                return Array.isArray(t) ? t.reduce(Zn, e) : Object.assign({}, e, t);
            }
            const Wn = (function() {
                class e {
                    constructor(e, t, n, r, s, l) {
                        (this._zone = e),
                            (this._console = t),
                            (this._injector = n),
                            (this._exceptionHandler = r),
                            (this._componentFactoryResolver = s),
                            (this._initStatus = l),
                            (this._bootstrapListeners = []),
                            (this._views = []),
                            (this._runningTick = !1),
                            (this._enforceNoNewChanges = !1),
                            (this._stable = !0),
                            (this.componentTypes = []),
                            (this.components = []),
                            (this._enforceNoNewChanges = Tt()),
                            this._zone.onMicrotaskEmpty.subscribe({
                                next: () => {
                                    this._zone.run(() => {
                                        this.tick();
                                    });
                                },
                            });
                        const i = new v(e => {
                                (this._stable =
                                    this._zone.isStable &&
                                    !this._zone.hasPendingMacrotasks &&
                                    !this._zone.hasPendingMicrotasks),
                                    this._zone.runOutsideAngular(() => {
                                        e.next(this._stable), e.complete();
                                    });
                            }),
                            o = new v(e => {
                                let t;
                                this._zone.runOutsideAngular(() => {
                                    t = this._zone.onStable.subscribe(() => {
                                        kn.assertNotInAngularZone(),
                                            he(() => {
                                                this._stable ||
                                                    this._zone.hasPendingMacrotasks ||
                                                    this._zone.hasPendingMicrotasks ||
                                                    ((this._stable = !0), e.next(!0));
                                            });
                                    });
                                });
                                const n = this._zone.onUnstable.subscribe(() => {
                                    kn.assertInAngularZone(),
                                        this._stable &&
                                            ((this._stable = !1),
                                            this._zone.runOutsideAngular(() => {
                                                e.next(!1);
                                            }));
                                });
                                return () => {
                                    t.unsubscribe(), n.unsubscribe();
                                };
                            });
                        this.isStable = (function(...e) {
                            let t = Number.POSITIVE_INFINITY,
                                n = null,
                                r = e[e.length - 1];
                            return (
                                N(r)
                                    ? ((n = e.pop()),
                                      e.length > 1 &&
                                          'number' == typeof e[e.length - 1] &&
                                          (t = e.pop()))
                                    : 'number' == typeof r && (t = e.pop()),
                                null === n && 1 === e.length && e[0] instanceof v
                                    ? e[0]
                                    : (function(e = Number.POSITIVE_INFINITY) {
                                          return (function e(
                                              t,
                                              n,
                                              r = Number.POSITIVE_INFINITY,
                                          ) {
                                              return 'function' == typeof n
                                                  ? s =>
                                                        s.pipe(
                                                            e(
                                                                (e, r) =>
                                                                    B(t(e, r)).pipe(
                                                                        F((t, s) =>
                                                                            n(e, t, r, s),
                                                                        ),
                                                                    ),
                                                                r,
                                                            ),
                                                        )
                                                  : ('number' == typeof n && (r = n),
                                                    e => e.lift(new U(t, r)));
                                          })(z, e);
                                      })(t)(G(e, n))
                            );
                        })(
                            i,
                            o.pipe(e =>
                                q()(
                                    (function(e, t) {
                                        return function(t) {
                                            let n;
                                            n =
                                                'function' == typeof e
                                                    ? e
                                                    : function() {
                                                          return e;
                                                      };
                                            const r = Object.create(t, K);
                                            return (
                                                (r.source = t), (r.subjectFactory = n), r
                                            );
                                        };
                                    })(Y)(e),
                                ),
                            ),
                        );
                    }
                    bootstrap(e, t) {
                        if (!this._initStatus.done)
                            throw new Error(
                                'Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.',
                            );
                        let n;
                        (n =
                            e instanceof st
                                ? e
                                : this._componentFactoryResolver.resolveComponentFactory(
                                      e,
                                  )),
                            this.componentTypes.push(n.componentType);
                        const r = n instanceof ct ? null : this._injector.get(dt),
                            s = n.create(Le.NULL, [], t || n.selector, r);
                        s.onDestroy(() => {
                            this._unloadComponent(s);
                        });
                        const l = s.injector.get(Rn, null);
                        return (
                            l &&
                                s.injector
                                    .get(Fn)
                                    .registerApplication(s.location.nativeElement, l),
                            this._loadComponent(s),
                            Tt() &&
                                this._console.log(
                                    'Angular is running in the development mode. Call enableProdMode() to enable the production mode.',
                                ),
                            s
                        );
                    }
                    tick() {
                        if (this._runningTick)
                            throw new Error('ApplicationRef.tick is called recursively');
                        const t = e._tickScope();
                        try {
                            (this._runningTick = !0),
                                this._views.forEach(e => e.detectChanges()),
                                this._enforceNoNewChanges &&
                                    this._views.forEach(e => e.checkNoChanges());
                        } catch (n) {
                            this._zone.runOutsideAngular(() =>
                                this._exceptionHandler.handleError(n),
                            );
                        } finally {
                            (this._runningTick = !1), An(t);
                        }
                    }
                    attachView(e) {
                        const t = e;
                        this._views.push(t), t.attachToAppRef(this);
                    }
                    detachView(e) {
                        const t = e;
                        Qn(this._views, t), t.detachFromAppRef();
                    }
                    _loadComponent(e) {
                        this.attachView(e.hostView),
                            this.tick(),
                            this.components.push(e),
                            this._injector
                                .get(fn, [])
                                .concat(this._bootstrapListeners)
                                .forEach(t => t(e));
                    }
                    _unloadComponent(e) {
                        this.detachView(e.hostView), Qn(this.components, e);
                    }
                    ngOnDestroy() {
                        this._views.slice().forEach(e => e.destroy());
                    }
                    get viewCount() {
                        return this._views.length;
                    }
                }
                return (e._tickScope = Nn('ApplicationRef#tick()')), e;
            })();
            function Qn(e, t) {
                const n = e.indexOf(t);
                n > -1 && e.splice(n, 1);
            }
            class Kn {
                constructor() {
                    (this.dirty = !0),
                        (this._results = []),
                        (this.changes = new Wt()),
                        (this.length = 0);
                }
                map(e) {
                    return this._results.map(e);
                }
                filter(e) {
                    return this._results.filter(e);
                }
                find(e) {
                    return this._results.find(e);
                }
                reduce(e, t) {
                    return this._results.reduce(e, t);
                }
                forEach(e) {
                    this._results.forEach(e);
                }
                some(e) {
                    return this._results.some(e);
                }
                toArray() {
                    return this._results.slice();
                }
                [de()]() {
                    return this._results[de()]();
                }
                toString() {
                    return this._results.toString();
                }
                reset(e) {
                    (this._results = (function e(t) {
                        return t.reduce((t, n) => {
                            const r = Array.isArray(n) ? e(n) : n;
                            return t.concat(r);
                        }, []);
                    })(e)),
                        (this.dirty = !1),
                        (this.length = this._results.length),
                        (this.last = this._results[this.length - 1]),
                        (this.first = this._results[0]);
                }
                notifyOnChanges() {
                    this.changes.emit(this);
                }
                setDirty() {
                    this.dirty = !0;
                }
                destroy() {
                    this.changes.complete(), this.changes.unsubscribe();
                }
            }
            const Jn = (function() {
                    class e {}
                    return (e.__NG_ELEMENT_ID__ = () => Yn(e, pt)), e;
                })(),
                Yn = Pe,
                Xn = (function() {
                    class e {}
                    return (e.__NG_ELEMENT_ID__ = () => er()), e;
                })(),
                er = (...e) => {};
            class tr {
                constructor(e, t) {
                    (this.name = e), (this.callback = t);
                }
            }
            class nr {
                constructor(e, t, n) {
                    (this.listeners = []),
                        (this.parent = null),
                        (this._debugContext = n),
                        (this.nativeNode = e),
                        t && t instanceof rr && t.addChild(this);
                }
                get injector() {
                    return this._debugContext.injector;
                }
                get componentInstance() {
                    return this._debugContext.component;
                }
                get context() {
                    return this._debugContext.context;
                }
                get references() {
                    return this._debugContext.references;
                }
                get providerTokens() {
                    return this._debugContext.providerTokens;
                }
            }
            class rr extends nr {
                constructor(e, t, n) {
                    super(e, t, n),
                        (this.properties = {}),
                        (this.attributes = {}),
                        (this.classes = {}),
                        (this.styles = {}),
                        (this.childNodes = []),
                        (this.nativeElement = e);
                }
                addChild(e) {
                    e && (this.childNodes.push(e), (e.parent = this));
                }
                removeChild(e) {
                    const t = this.childNodes.indexOf(e);
                    -1 !== t && ((e.parent = null), this.childNodes.splice(t, 1));
                }
                insertChildrenAfter(e, t) {
                    const n = this.childNodes.indexOf(e);
                    -1 !== n &&
                        (this.childNodes.splice(n + 1, 0, ...t),
                        t.forEach(t => {
                            t.parent && t.parent.removeChild(t), (e.parent = this);
                        }));
                }
                insertBefore(e, t) {
                    const n = this.childNodes.indexOf(e);
                    -1 === n
                        ? this.addChild(t)
                        : (t.parent && t.parent.removeChild(t),
                          (t.parent = this),
                          this.childNodes.splice(n, 0, t));
                }
                query(e) {
                    return this.queryAll(e)[0] || null;
                }
                queryAll(e) {
                    const t = [];
                    return (
                        (function e(t, n, r) {
                            t.childNodes.forEach(t => {
                                t instanceof rr && (n(t) && r.push(t), e(t, n, r));
                            });
                        })(this, e, t),
                        t
                    );
                }
                queryAllNodes(e) {
                    const t = [];
                    return (
                        (function e(t, n, r) {
                            t instanceof rr &&
                                t.childNodes.forEach(t => {
                                    n(t) && r.push(t), t instanceof rr && e(t, n, r);
                                });
                        })(this, e, t),
                        t
                    );
                }
                get children() {
                    return this.childNodes.filter(e => e instanceof rr);
                }
                triggerEventHandler(e, t) {
                    this.listeners.forEach(n => {
                        n.name == e && n.callback(t);
                    });
                }
            }
            const sr = new Map(),
                lr = function(e) {
                    return sr.get(e) || null;
                };
            function ir(e) {
                sr.set(e.nativeNode, e);
            }
            class or {
                constructor() {}
                supports(e) {
                    return Oe(e);
                }
                create(e) {
                    return new ur(e);
                }
            }
            const ar = (e, t) => t;
            class ur {
                constructor(e) {
                    (this.length = 0),
                        (this._linkedRecords = null),
                        (this._unlinkedRecords = null),
                        (this._previousItHead = null),
                        (this._itHead = null),
                        (this._itTail = null),
                        (this._additionsHead = null),
                        (this._additionsTail = null),
                        (this._movesHead = null),
                        (this._movesTail = null),
                        (this._removalsHead = null),
                        (this._removalsTail = null),
                        (this._identityChangesHead = null),
                        (this._identityChangesTail = null),
                        (this._trackByFn = e || ar);
                }
                forEachItem(e) {
                    let t;
                    for (t = this._itHead; null !== t; t = t._next) e(t);
                }
                forEachOperation(e) {
                    let t = this._itHead,
                        n = this._removalsHead,
                        r = 0,
                        s = null;
                    for (; t || n; ) {
                        const l = !n || (t && t.currentIndex < pr(n, r, s)) ? t : n,
                            i = pr(l, r, s),
                            o = l.currentIndex;
                        if (l === n) r--, (n = n._nextRemoved);
                        else if (((t = t._next), null == l.previousIndex)) r++;
                        else {
                            s || (s = []);
                            const e = i - r,
                                t = o - r;
                            if (e != t) {
                                for (let n = 0; n < e; n++) {
                                    const r = n < s.length ? s[n] : (s[n] = 0),
                                        l = r + n;
                                    t <= l && l < e && (s[n] = r + 1);
                                }
                                s[l.previousIndex] = t - e;
                            }
                        }
                        i !== o && e(l, i, o);
                    }
                }
                forEachPreviousItem(e) {
                    let t;
                    for (t = this._previousItHead; null !== t; t = t._nextPrevious) e(t);
                }
                forEachAddedItem(e) {
                    let t;
                    for (t = this._additionsHead; null !== t; t = t._nextAdded) e(t);
                }
                forEachMovedItem(e) {
                    let t;
                    for (t = this._movesHead; null !== t; t = t._nextMoved) e(t);
                }
                forEachRemovedItem(e) {
                    let t;
                    for (t = this._removalsHead; null !== t; t = t._nextRemoved) e(t);
                }
                forEachIdentityChange(e) {
                    let t;
                    for (
                        t = this._identityChangesHead;
                        null !== t;
                        t = t._nextIdentityChange
                    )
                        e(t);
                }
                diff(e) {
                    if ((null == e && (e = []), !Oe(e)))
                        throw new Error(
                            `Error trying to diff '${fe(
                                e,
                            )}'. Only arrays and iterables are allowed`,
                        );
                    return this.check(e) ? this : null;
                }
                onDestroy() {}
                check(e) {
                    this._reset();
                    let t,
                        n,
                        r,
                        s = this._itHead,
                        l = !1;
                    if (Array.isArray(e)) {
                        this.length = e.length;
                        for (let t = 0; t < this.length; t++)
                            (r = this._trackByFn(t, (n = e[t]))),
                                null !== s && pe(s.trackById, r)
                                    ? (l && (s = this._verifyReinsertion(s, n, r, t)),
                                      pe(s.item, n) || this._addIdentityChange(s, n))
                                    : ((s = this._mismatch(s, n, r, t)), (l = !0)),
                                (s = s._next);
                    } else
                        (t = 0),
                            (function(e, t) {
                                if (Array.isArray(e))
                                    for (let n = 0; n < e.length; n++) t(e[n]);
                                else {
                                    const n = e[de()]();
                                    let r;
                                    for (; !(r = n.next()).done; ) t(r.value);
                                }
                            })(e, e => {
                                (r = this._trackByFn(t, e)),
                                    null !== s && pe(s.trackById, r)
                                        ? (l && (s = this._verifyReinsertion(s, e, r, t)),
                                          pe(s.item, e) || this._addIdentityChange(s, e))
                                        : ((s = this._mismatch(s, e, r, t)), (l = !0)),
                                    (s = s._next),
                                    t++;
                            }),
                            (this.length = t);
                    return this._truncate(s), (this.collection = e), this.isDirty;
                }
                get isDirty() {
                    return (
                        null !== this._additionsHead ||
                        null !== this._movesHead ||
                        null !== this._removalsHead ||
                        null !== this._identityChangesHead
                    );
                }
                _reset() {
                    if (this.isDirty) {
                        let e, t;
                        for (
                            e = this._previousItHead = this._itHead;
                            null !== e;
                            e = e._next
                        )
                            e._nextPrevious = e._next;
                        for (e = this._additionsHead; null !== e; e = e._nextAdded)
                            e.previousIndex = e.currentIndex;
                        for (
                            this._additionsHead = this._additionsTail = null,
                                e = this._movesHead;
                            null !== e;
                            e = t
                        )
                            (e.previousIndex = e.currentIndex), (t = e._nextMoved);
                        (this._movesHead = this._movesTail = null),
                            (this._removalsHead = this._removalsTail = null),
                            (this._identityChangesHead = this._identityChangesTail = null);
                    }
                }
                _mismatch(e, t, n, r) {
                    let s;
                    return (
                        null === e
                            ? (s = this._itTail)
                            : ((s = e._prev), this._remove(e)),
                        null !==
                        (e =
                            null === this._linkedRecords
                                ? null
                                : this._linkedRecords.get(n, r))
                            ? (pe(e.item, t) || this._addIdentityChange(e, t),
                              this._moveAfter(e, s, r))
                            : null !==
                              (e =
                                  null === this._unlinkedRecords
                                      ? null
                                      : this._unlinkedRecords.get(n, null))
                            ? (pe(e.item, t) || this._addIdentityChange(e, t),
                              this._reinsertAfter(e, s, r))
                            : (e = this._addAfter(new cr(t, n), s, r)),
                        e
                    );
                }
                _verifyReinsertion(e, t, n, r) {
                    let s =
                        null === this._unlinkedRecords
                            ? null
                            : this._unlinkedRecords.get(n, null);
                    return (
                        null !== s
                            ? (e = this._reinsertAfter(s, e._prev, r))
                            : e.currentIndex != r &&
                              ((e.currentIndex = r), this._addToMoves(e, r)),
                        e
                    );
                }
                _truncate(e) {
                    for (; null !== e; ) {
                        const t = e._next;
                        this._addToRemovals(this._unlink(e)), (e = t);
                    }
                    null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
                        null !== this._additionsTail &&
                            (this._additionsTail._nextAdded = null),
                        null !== this._movesTail && (this._movesTail._nextMoved = null),
                        null !== this._itTail && (this._itTail._next = null),
                        null !== this._removalsTail &&
                            (this._removalsTail._nextRemoved = null),
                        null !== this._identityChangesTail &&
                            (this._identityChangesTail._nextIdentityChange = null);
                }
                _reinsertAfter(e, t, n) {
                    null !== this._unlinkedRecords && this._unlinkedRecords.remove(e);
                    const r = e._prevRemoved,
                        s = e._nextRemoved;
                    return (
                        null === r ? (this._removalsHead = s) : (r._nextRemoved = s),
                        null === s ? (this._removalsTail = r) : (s._prevRemoved = r),
                        this._insertAfter(e, t, n),
                        this._addToMoves(e, n),
                        e
                    );
                }
                _moveAfter(e, t, n) {
                    return (
                        this._unlink(e),
                        this._insertAfter(e, t, n),
                        this._addToMoves(e, n),
                        e
                    );
                }
                _addAfter(e, t, n) {
                    return (
                        this._insertAfter(e, t, n),
                        (this._additionsTail =
                            null === this._additionsTail
                                ? (this._additionsHead = e)
                                : (this._additionsTail._nextAdded = e)),
                        e
                    );
                }
                _insertAfter(e, t, n) {
                    const r = null === t ? this._itHead : t._next;
                    return (
                        (e._next = r),
                        (e._prev = t),
                        null === r ? (this._itTail = e) : (r._prev = e),
                        null === t ? (this._itHead = e) : (t._next = e),
                        null === this._linkedRecords && (this._linkedRecords = new hr()),
                        this._linkedRecords.put(e),
                        (e.currentIndex = n),
                        e
                    );
                }
                _remove(e) {
                    return this._addToRemovals(this._unlink(e));
                }
                _unlink(e) {
                    null !== this._linkedRecords && this._linkedRecords.remove(e);
                    const t = e._prev,
                        n = e._next;
                    return (
                        null === t ? (this._itHead = n) : (t._next = n),
                        null === n ? (this._itTail = t) : (n._prev = t),
                        e
                    );
                }
                _addToMoves(e, t) {
                    return e.previousIndex === t
                        ? e
                        : ((this._movesTail =
                              null === this._movesTail
                                  ? (this._movesHead = e)
                                  : (this._movesTail._nextMoved = e)),
                          e);
                }
                _addToRemovals(e) {
                    return (
                        null === this._unlinkedRecords &&
                            (this._unlinkedRecords = new hr()),
                        this._unlinkedRecords.put(e),
                        (e.currentIndex = null),
                        (e._nextRemoved = null),
                        null === this._removalsTail
                            ? ((this._removalsTail = this._removalsHead = e),
                              (e._prevRemoved = null))
                            : ((e._prevRemoved = this._removalsTail),
                              (this._removalsTail = this._removalsTail._nextRemoved = e)),
                        e
                    );
                }
                _addIdentityChange(e, t) {
                    return (
                        (e.item = t),
                        (this._identityChangesTail =
                            null === this._identityChangesTail
                                ? (this._identityChangesHead = e)
                                : (this._identityChangesTail._nextIdentityChange = e)),
                        e
                    );
                }
            }
            class cr {
                constructor(e, t) {
                    (this.item = e),
                        (this.trackById = t),
                        (this.currentIndex = null),
                        (this.previousIndex = null),
                        (this._nextPrevious = null),
                        (this._prev = null),
                        (this._next = null),
                        (this._prevDup = null),
                        (this._nextDup = null),
                        (this._prevRemoved = null),
                        (this._nextRemoved = null),
                        (this._nextAdded = null),
                        (this._nextMoved = null),
                        (this._nextIdentityChange = null);
                }
            }
            class dr {
                constructor() {
                    (this._head = null), (this._tail = null);
                }
                add(e) {
                    null === this._head
                        ? ((this._head = this._tail = e),
                          (e._nextDup = null),
                          (e._prevDup = null))
                        : ((this._tail._nextDup = e),
                          (e._prevDup = this._tail),
                          (e._nextDup = null),
                          (this._tail = e));
                }
                get(e, t) {
                    let n;
                    for (n = this._head; null !== n; n = n._nextDup)
                        if ((null === t || t <= n.currentIndex) && pe(n.trackById, e))
                            return n;
                    return null;
                }
                remove(e) {
                    const t = e._prevDup,
                        n = e._nextDup;
                    return (
                        null === t ? (this._head = n) : (t._nextDup = n),
                        null === n ? (this._tail = t) : (n._prevDup = t),
                        null === this._head
                    );
                }
            }
            class hr {
                constructor() {
                    this.map = new Map();
                }
                put(e) {
                    const t = e.trackById;
                    let n = this.map.get(t);
                    n || ((n = new dr()), this.map.set(t, n)), n.add(e);
                }
                get(e, t) {
                    const n = this.map.get(e);
                    return n ? n.get(e, t) : null;
                }
                remove(e) {
                    const t = e.trackById;
                    return this.map.get(t).remove(e) && this.map.delete(t), e;
                }
                get isEmpty() {
                    return 0 === this.map.size;
                }
                clear() {
                    this.map.clear();
                }
            }
            function pr(e, t, n) {
                const r = e.previousIndex;
                if (null === r) return r;
                let s = 0;
                return n && r < n.length && (s = n[r]), r + t + s;
            }
            class fr {
                constructor() {}
                supports(e) {
                    return e instanceof Map || Me(e);
                }
                create() {
                    return new gr();
                }
            }
            class gr {
                constructor() {
                    (this._records = new Map()),
                        (this._mapHead = null),
                        (this._appendAfter = null),
                        (this._previousMapHead = null),
                        (this._changesHead = null),
                        (this._changesTail = null),
                        (this._additionsHead = null),
                        (this._additionsTail = null),
                        (this._removalsHead = null),
                        (this._removalsTail = null);
                }
                get isDirty() {
                    return (
                        null !== this._additionsHead ||
                        null !== this._changesHead ||
                        null !== this._removalsHead
                    );
                }
                forEachItem(e) {
                    let t;
                    for (t = this._mapHead; null !== t; t = t._next) e(t);
                }
                forEachPreviousItem(e) {
                    let t;
                    for (t = this._previousMapHead; null !== t; t = t._nextPrevious) e(t);
                }
                forEachChangedItem(e) {
                    let t;
                    for (t = this._changesHead; null !== t; t = t._nextChanged) e(t);
                }
                forEachAddedItem(e) {
                    let t;
                    for (t = this._additionsHead; null !== t; t = t._nextAdded) e(t);
                }
                forEachRemovedItem(e) {
                    let t;
                    for (t = this._removalsHead; null !== t; t = t._nextRemoved) e(t);
                }
                diff(e) {
                    if (e) {
                        if (!(e instanceof Map || Me(e)))
                            throw new Error(
                                `Error trying to diff '${fe(
                                    e,
                                )}'. Only maps and objects are allowed`,
                            );
                    } else e = new Map();
                    return this.check(e) ? this : null;
                }
                onDestroy() {}
                check(e) {
                    this._reset();
                    let t = this._mapHead;
                    if (
                        ((this._appendAfter = null),
                        this._forEach(e, (e, n) => {
                            if (t && t.key === n)
                                this._maybeAddToChanges(t, e),
                                    (this._appendAfter = t),
                                    (t = t._next);
                            else {
                                const r = this._getOrCreateRecordForKey(n, e);
                                t = this._insertBeforeOrAppend(t, r);
                            }
                        }),
                        t)
                    ) {
                        t._prev && (t._prev._next = null), (this._removalsHead = t);
                        for (let e = t; null !== e; e = e._nextRemoved)
                            e === this._mapHead && (this._mapHead = null),
                                this._records.delete(e.key),
                                (e._nextRemoved = e._next),
                                (e.previousValue = e.currentValue),
                                (e.currentValue = null),
                                (e._prev = null),
                                (e._next = null);
                    }
                    return (
                        this._changesTail && (this._changesTail._nextChanged = null),
                        this._additionsTail && (this._additionsTail._nextAdded = null),
                        this.isDirty
                    );
                }
                _insertBeforeOrAppend(e, t) {
                    if (e) {
                        const n = e._prev;
                        return (
                            (t._next = e),
                            (t._prev = n),
                            (e._prev = t),
                            n && (n._next = t),
                            e === this._mapHead && (this._mapHead = t),
                            (this._appendAfter = e),
                            e
                        );
                    }
                    return (
                        this._appendAfter
                            ? ((this._appendAfter._next = t),
                              (t._prev = this._appendAfter))
                            : (this._mapHead = t),
                        (this._appendAfter = t),
                        null
                    );
                }
                _getOrCreateRecordForKey(e, t) {
                    if (this._records.has(e)) {
                        const n = this._records.get(e);
                        this._maybeAddToChanges(n, t);
                        const r = n._prev,
                            s = n._next;
                        return (
                            r && (r._next = s),
                            s && (s._prev = r),
                            (n._next = null),
                            (n._prev = null),
                            n
                        );
                    }
                    const n = new mr(e);
                    return (
                        this._records.set(e, n),
                        (n.currentValue = t),
                        this._addToAdditions(n),
                        n
                    );
                }
                _reset() {
                    if (this.isDirty) {
                        let e;
                        for (
                            this._previousMapHead = this._mapHead,
                                e = this._previousMapHead;
                            null !== e;
                            e = e._next
                        )
                            e._nextPrevious = e._next;
                        for (e = this._changesHead; null !== e; e = e._nextChanged)
                            e.previousValue = e.currentValue;
                        for (e = this._additionsHead; null != e; e = e._nextAdded)
                            e.previousValue = e.currentValue;
                        (this._changesHead = this._changesTail = null),
                            (this._additionsHead = this._additionsTail = null),
                            (this._removalsHead = null);
                    }
                }
                _maybeAddToChanges(e, t) {
                    pe(t, e.currentValue) ||
                        ((e.previousValue = e.currentValue),
                        (e.currentValue = t),
                        this._addToChanges(e));
                }
                _addToAdditions(e) {
                    null === this._additionsHead
                        ? (this._additionsHead = this._additionsTail = e)
                        : ((this._additionsTail._nextAdded = e),
                          (this._additionsTail = e));
                }
                _addToChanges(e) {
                    null === this._changesHead
                        ? (this._changesHead = this._changesTail = e)
                        : ((this._changesTail._nextChanged = e), (this._changesTail = e));
                }
                _forEach(e, t) {
                    e instanceof Map
                        ? e.forEach(t)
                        : Object.keys(e).forEach(n => t(e[n], n));
                }
            }
            class mr {
                constructor(e) {
                    (this.key = e),
                        (this.previousValue = null),
                        (this.currentValue = null),
                        (this._nextPrevious = null),
                        (this._next = null),
                        (this._prev = null),
                        (this._nextAdded = null),
                        (this._nextRemoved = null),
                        (this._nextChanged = null);
                }
            }
            const _r = (function() {
                    class e {
                        constructor(e) {
                            this.factories = e;
                        }
                        static create(t, n) {
                            if (null != n) {
                                const e = n.factories.slice();
                                t = t.concat(e);
                            }
                            return new e(t);
                        }
                        static extend(t) {
                            return {
                                provide: e,
                                useFactory: n => {
                                    if (!n)
                                        throw new Error(
                                            'Cannot extend IterableDiffers without a parent injector',
                                        );
                                    return e.create(t, n);
                                },
                                deps: [[e, new Ce(), new be()]],
                            };
                        }
                        find(e) {
                            const t = this.factories.find(t => t.supports(e));
                            if (null != t) return t;
                            throw new Error(
                                `Cannot find a differ supporting object '${e}' of type '${((n = e),
                                n.name || typeof n)}'`,
                            );
                            var n;
                        }
                    }
                    return (
                        (e.ngInjectableDef = te({
                            providedIn: 'root',
                            factory: () => new e([new or()]),
                        })),
                        e
                    );
                })(),
                yr = (function() {
                    class e {
                        constructor(e) {
                            this.factories = e;
                        }
                        static create(t, n) {
                            if (n) {
                                const e = n.factories.slice();
                                t = t.concat(e);
                            }
                            return new e(t);
                        }
                        static extend(t) {
                            return {
                                provide: e,
                                useFactory: n => {
                                    if (!n)
                                        throw new Error(
                                            'Cannot extend KeyValueDiffers without a parent injector',
                                        );
                                    return e.create(t, n);
                                },
                                deps: [[e, new Ce(), new be()]],
                            };
                        }
                        find(e) {
                            const t = this.factories.find(t => t.supports(e));
                            if (t) return t;
                            throw new Error(
                                `Cannot find a differ supporting object '${e}'`,
                            );
                        }
                    }
                    return (
                        (e.ngInjectableDef = te({
                            providedIn: 'root',
                            factory: () => new e([new fr()]),
                        })),
                        e
                    );
                })(),
                vr = [new fr()],
                br = new _r([new or()]),
                wr = new yr(vr),
                Cr = zn(null, 'core', [
                    {provide: pn, useValue: 'unknown'},
                    {provide: qn, deps: [Le]},
                    {provide: Fn, deps: []},
                    {provide: gn, deps: []},
                ]),
                Er = new re('LocaleId');
            function xr() {
                return br;
            }
            function Sr() {
                return wr;
            }
            function Tr(e) {
                return e || 'en-US';
            }
            class Nr {
                constructor(e) {}
            }
            function Ar(e, t, n) {
                const r = e.state,
                    s = 1792 & r;
                return s === t
                    ? ((e.state = (-1793 & r) | n), (e.initIndex = -1), !0)
                    : s === n;
            }
            function kr(e, t, n) {
                return (
                    (1792 & e.state) === t &&
                    e.initIndex <= n &&
                    ((e.initIndex = n + 1), !0)
                );
            }
            function Ir(e, t) {
                return e.nodes[t];
            }
            function Vr(e, t) {
                return e.nodes[t];
            }
            function Dr(e, t) {
                return e.nodes[t];
            }
            function Or(e, t) {
                return e.nodes[t];
            }
            function Mr(e, t) {
                return e.nodes[t];
            }
            const Pr = {
                setCurrentNode: void 0,
                createRootView: void 0,
                createEmbeddedView: void 0,
                createComponentView: void 0,
                createNgModuleRef: void 0,
                overrideProvider: void 0,
                overrideComponentView: void 0,
                clearOverrides: void 0,
                checkAndUpdateView: void 0,
                checkNoChangesView: void 0,
                destroyView: void 0,
                resolveDep: void 0,
                createDebugContext: void 0,
                handleEvent: void 0,
                updateDirectives: void 0,
                updateRenderer: void 0,
                dirtyParentQueries: void 0,
            };
            function Rr(e, t, n, r) {
                let s = `ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: '${t}'. Current value: '${n}'.`;
                return (
                    r &&
                        (s +=
                            ' It seems like the view has been created after its parent and its children have been dirty checked. Has it been created in a change detection hook ?'),
                    (function(e, t) {
                        const n = new Error(e);
                        return Fr(n, t), n;
                    })(s, e)
                );
            }
            function Fr(e, t) {
                (e[Xt] = t), (e[tn] = t.logError.bind(t));
            }
            function jr(e) {
                return new Error(
                    `ViewDestroyedError: Attempt to use a destroyed view: ${e}`,
                );
            }
            const Hr = () => {},
                Lr = new Map();
            function Br(e) {
                let t = Lr.get(e);
                return t || ((t = fe(e) + '_' + Lr.size), Lr.set(e, t)), t;
            }
            const Ur = '$$undefined',
                $r = '$$empty';
            function zr(e) {
                return {
                    id: Ur,
                    styles: e.styles,
                    encapsulation: e.encapsulation,
                    data: e.data,
                };
            }
            let Gr = 0;
            function qr(e, t, n, r) {
                return !(!(2 & e.state) && pe(e.oldValues[t.bindingIndex + n], r));
            }
            function Zr(e, t, n, r) {
                return !!qr(e, t, n, r) && ((e.oldValues[t.bindingIndex + n] = r), !0);
            }
            function Wr(e, t, n, r) {
                const s = e.oldValues[t.bindingIndex + n];
                if (1 & e.state || !Ie(s, r)) {
                    const l = t.bindings[n].name;
                    throw Rr(
                        Pr.createDebugContext(e, t.nodeIndex),
                        `${l}: ${s}`,
                        `${l}: ${r}`,
                        0 != (1 & e.state),
                    );
                }
            }
            function Qr(e) {
                let t = e;
                for (; t; )
                    2 & t.def.flags && (t.state |= 8),
                        (t = t.viewContainerParent || t.parent);
            }
            function Kr(e, t) {
                let n = e;
                for (; n && n !== t; )
                    (n.state |= 64), (n = n.viewContainerParent || n.parent);
            }
            function Jr(e, t, n, r) {
                try {
                    return (
                        Qr(33554432 & e.def.nodes[t].flags ? Vr(e, t).componentView : e),
                        Pr.handleEvent(e, t, n, r)
                    );
                } catch (s) {
                    e.root.errorHandler.handleError(s);
                }
            }
            function Yr(e) {
                return e.parent ? Vr(e.parent, e.parentNodeDef.nodeIndex) : null;
            }
            function Xr(e) {
                return e.parent ? e.parentNodeDef.parent : null;
            }
            function es(e, t) {
                switch (201347067 & t.flags) {
                    case 1:
                        return Vr(e, t.nodeIndex).renderElement;
                    case 2:
                        return Ir(e, t.nodeIndex).renderText;
                }
            }
            function ts(e) {
                return !!e.parent && !!(32768 & e.parentNodeDef.flags);
            }
            function ns(e) {
                return !(!e.parent || 32768 & e.parentNodeDef.flags);
            }
            function rs(e) {
                const t = {};
                let n = 0;
                const r = {};
                return (
                    e &&
                        e.forEach(([e, s]) => {
                            'number' == typeof e
                                ? ((t[e] = s),
                                  (n |= (function(e) {
                                      return 1 << e % 32;
                                  })(e)))
                                : (r[e] = s);
                        }),
                    {matchedQueries: t, references: r, matchedQueryIds: n}
                );
            }
            function ss(e, t) {
                return e.map(e => {
                    let n, r;
                    return (
                        Array.isArray(e) ? ([r, n] = e) : ((r = 0), (n = e)),
                        n &&
                            ('function' == typeof n || 'object' == typeof n) &&
                            t &&
                            Object.defineProperty(n, Re, {value: t, configurable: !0}),
                        {flags: r, token: n, tokenKey: Br(n)}
                    );
                });
            }
            function ls(e, t, n) {
                let r = n.renderParent;
                return r
                    ? 0 == (1 & r.flags) ||
                      0 == (33554432 & r.flags) ||
                      (r.element.componentRendererType &&
                          r.element.componentRendererType.encapsulation === ye.Native)
                        ? Vr(e, n.renderParent.nodeIndex).renderElement
                        : void 0
                    : t;
            }
            const is = new WeakMap();
            function os(e) {
                let t = is.get(e);
                return t || (((t = e(() => Hr)).factory = e), is.set(e, t)), t;
            }
            function as(e, t, n, r, s) {
                3 === t && (n = e.renderer.parentNode(es(e, e.def.lastRenderRootNode))),
                    us(e, t, 0, e.def.nodes.length - 1, n, r, s);
            }
            function us(e, t, n, r, s, l, i) {
                for (let o = n; o <= r; o++) {
                    const n = e.def.nodes[o];
                    11 & n.flags && ds(e, n, t, s, l, i), (o += n.childCount);
                }
            }
            function cs(e, t, n, r, s, l) {
                let i = e;
                for (; i && !ts(i); ) i = i.parent;
                const o = i.parent,
                    a = Xr(i),
                    u = a.nodeIndex + a.childCount;
                for (let c = a.nodeIndex + 1; c <= u; c++) {
                    const e = o.def.nodes[c];
                    e.ngContentIndex === t && ds(o, e, n, r, s, l), (c += e.childCount);
                }
                if (!o.parent) {
                    const i = e.root.projectableNodes[t];
                    if (i) for (let t = 0; t < i.length; t++) hs(e, i[t], n, r, s, l);
                }
            }
            function ds(e, t, n, r, s, l) {
                if (8 & t.flags) cs(e, t.ngContent.index, n, r, s, l);
                else {
                    const i = es(e, t);
                    if (
                        (3 === n && 33554432 & t.flags && 48 & t.bindingFlags
                            ? (16 & t.bindingFlags && hs(e, i, n, r, s, l),
                              32 & t.bindingFlags &&
                                  hs(Vr(e, t.nodeIndex).componentView, i, n, r, s, l))
                            : hs(e, i, n, r, s, l),
                        16777216 & t.flags)
                    ) {
                        const i = Vr(e, t.nodeIndex).viewContainer._embeddedViews;
                        for (let e = 0; e < i.length; e++) as(i[e], n, r, s, l);
                    }
                    1 & t.flags &&
                        !t.element.name &&
                        us(e, n, t.nodeIndex + 1, t.nodeIndex + t.childCount, r, s, l);
                }
            }
            function hs(e, t, n, r, s, l) {
                const i = e.renderer;
                switch (n) {
                    case 1:
                        i.appendChild(r, t);
                        break;
                    case 2:
                        i.insertBefore(r, t, s);
                        break;
                    case 3:
                        i.removeChild(r, t);
                        break;
                    case 0:
                        l.push(t);
                }
            }
            const ps = /^:([^:]+):(.+)$/;
            function fs(e) {
                if (':' === e[0]) {
                    const t = e.match(ps);
                    return [t[1], t[2]];
                }
                return ['', e];
            }
            function gs(e) {
                let t = 0;
                for (let n = 0; n < e.length; n++) t |= e[n].flags;
                return t;
            }
            function ms(e, t, n, r, s, l) {
                e |= 1;
                const {matchedQueries: i, references: o, matchedQueryIds: a} = rs(t);
                return {
                    nodeIndex: -1,
                    parent: null,
                    renderParent: null,
                    bindingIndex: -1,
                    outputIndex: -1,
                    flags: e,
                    checkIndex: -1,
                    childFlags: 0,
                    directChildFlags: 0,
                    childMatchedQueries: 0,
                    matchedQueries: i,
                    matchedQueryIds: a,
                    references: o,
                    ngContentIndex: n,
                    childCount: r,
                    bindings: [],
                    bindingFlags: 0,
                    outputs: [],
                    element: {
                        ns: null,
                        name: null,
                        attrs: null,
                        template: l ? os(l) : null,
                        componentProvider: null,
                        componentView: null,
                        componentRendererType: null,
                        publicProviders: null,
                        allProviders: null,
                        handleEvent: s || Hr,
                    },
                    provider: null,
                    text: null,
                    query: null,
                    ngContent: null,
                };
            }
            function _s(e, t, n, r, s, l, i = [], o, a, u, c, d) {
                u || (u = Hr);
                const {matchedQueries: h, references: p, matchedQueryIds: f} = rs(n);
                let g = null,
                    m = null;
                l && ([g, m] = fs(l)), (o = o || []);
                const _ = new Array(o.length);
                for (let b = 0; b < o.length; b++) {
                    const [e, t, n] = o[b],
                        [r, s] = fs(t);
                    let l = void 0,
                        i = void 0;
                    switch (15 & e) {
                        case 4:
                            i = n;
                            break;
                        case 1:
                        case 8:
                            l = n;
                    }
                    _[b] = {
                        flags: e,
                        ns: r,
                        name: s,
                        nonMinifiedName: s,
                        securityContext: l,
                        suffix: i,
                    };
                }
                a = a || [];
                const y = new Array(a.length);
                for (let b = 0; b < a.length; b++) {
                    const [e, t] = a[b];
                    y[b] = {type: 0, target: e, eventName: t, propName: null};
                }
                const v = (i = i || []).map(([e, t]) => {
                    const [n, r] = fs(e);
                    return [n, r, t];
                });
                return (
                    (d = (function(e) {
                        if (e && e.id === Ur) {
                            const t =
                                (null != e.encapsulation &&
                                    e.encapsulation !== ye.None) ||
                                e.styles.length ||
                                Object.keys(e.data).length;
                            e.id = t ? `c${Gr++}` : $r;
                        }
                        return e && e.id === $r && (e = null), e || null;
                    })(d)),
                    c && (t |= 33554432),
                    {
                        nodeIndex: -1,
                        parent: null,
                        renderParent: null,
                        bindingIndex: -1,
                        outputIndex: -1,
                        checkIndex: e,
                        flags: (t |= 1),
                        childFlags: 0,
                        directChildFlags: 0,
                        childMatchedQueries: 0,
                        matchedQueries: h,
                        matchedQueryIds: f,
                        references: p,
                        ngContentIndex: r,
                        childCount: s,
                        bindings: _,
                        bindingFlags: gs(_),
                        outputs: y,
                        element: {
                            ns: g,
                            name: m,
                            attrs: v,
                            template: null,
                            componentProvider: null,
                            componentView: c || null,
                            componentRendererType: d,
                            publicProviders: null,
                            allProviders: null,
                            handleEvent: u || Hr,
                        },
                        provider: null,
                        text: null,
                        query: null,
                        ngContent: null,
                    }
                );
            }
            function ys(e, t, n) {
                const r = n.element,
                    s = e.root.selectorOrNode,
                    l = e.renderer;
                let i;
                if (e.parent || !s) {
                    i = r.name ? l.createElement(r.name, r.ns) : l.createComment('');
                    const s = ls(e, t, n);
                    s && l.appendChild(s, i);
                } else
                    i = l.selectRootElement(
                        s,
                        !!r.componentRendererType &&
                            r.componentRendererType.encapsulation === ye.ShadowDom,
                    );
                if (r.attrs)
                    for (let o = 0; o < r.attrs.length; o++) {
                        const [e, t, n] = r.attrs[o];
                        l.setAttribute(i, t, n, e);
                    }
                return i;
            }
            function vs(e, t, n, r) {
                for (let i = 0; i < n.outputs.length; i++) {
                    const o = n.outputs[i],
                        a = bs(
                            e,
                            n.nodeIndex,
                            ((l = o.eventName), (s = o.target) ? `${s}:${l}` : l),
                        );
                    let u = o.target,
                        c = e;
                    'component' === o.target && ((u = null), (c = t));
                    const d = c.renderer.listen(u || r, o.eventName, a);
                    e.disposables[n.outputIndex + i] = d;
                }
                var s, l;
            }
            function bs(e, t, n) {
                return r => Jr(e, t, n, r);
            }
            function ws(e, t, n, r) {
                if (!Zr(e, t, n, r)) return !1;
                const s = t.bindings[n],
                    l = Vr(e, t.nodeIndex),
                    i = l.renderElement,
                    o = s.name;
                switch (15 & s.flags) {
                    case 1:
                        !(function(e, t, n, r, s, l) {
                            const i = t.securityContext;
                            let o = i ? e.root.sanitizer.sanitize(i, l) : l;
                            o = null != o ? o.toString() : null;
                            const a = e.renderer;
                            null != l
                                ? a.setAttribute(n, s, o, r)
                                : a.removeAttribute(n, s, r);
                        })(e, s, i, s.ns, o, r);
                        break;
                    case 2:
                        !(function(e, t, n, r) {
                            const s = e.renderer;
                            r ? s.addClass(t, n) : s.removeClass(t, n);
                        })(e, i, o, r);
                        break;
                    case 4:
                        !(function(e, t, n, r, s) {
                            let l = e.root.sanitizer.sanitize(bt.STYLE, s);
                            if (null != l) {
                                l = l.toString();
                                const e = t.suffix;
                                null != e && (l += e);
                            } else l = null;
                            const i = e.renderer;
                            null != l ? i.setStyle(n, r, l) : i.removeStyle(n, r);
                        })(e, s, i, o, r);
                        break;
                    case 8:
                        !(function(e, t, n, r, s) {
                            const l = t.securityContext;
                            let i = l ? e.root.sanitizer.sanitize(l, s) : s;
                            e.renderer.setProperty(n, r, i);
                        })(
                            33554432 & t.flags && 32 & s.flags ? l.componentView : e,
                            s,
                            i,
                            o,
                            r,
                        );
                }
                return !0;
            }
            const Cs = new Object(),
                Es = Br(Le),
                xs = Br(je),
                Ss = Br(dt);
            function Ts(e, t, n, r) {
                return (
                    (n = _e(n)),
                    {index: -1, deps: ss(r, fe(t)), flags: e, token: t, value: n}
                );
            }
            function Ns(e, t, n = Le.THROW_IF_NOT_FOUND) {
                const r = Te(e);
                try {
                    if (8 & t.flags) return t.token;
                    if ((2 & t.flags && (n = null), 1 & t.flags))
                        return e._parent.get(t.token, n);
                    const i = t.tokenKey;
                    switch (i) {
                        case Es:
                        case xs:
                        case Ss:
                            return e;
                    }
                    const o = e._def.providersByKey[i];
                    let a;
                    if (o) {
                        let t = e._providers[o.index];
                        return (
                            void 0 === t && (t = e._providers[o.index] = As(e, o)),
                            t === Cs ? void 0 : t
                        );
                    }
                    if (
                        (a = ne(t.token)) &&
                        ((s = e),
                        null != (l = a).providedIn &&
                            ((function(e, t) {
                                return e._def.modules.indexOf(l.providedIn) > -1;
                            })(s) ||
                                ('root' === l.providedIn && s._def.isRoot)))
                    ) {
                        const n = e._providers.length;
                        return (
                            (e._def.providersByKey[t.tokenKey] = {
                                flags: 5120,
                                value: a.factory,
                                deps: [],
                                index: n,
                                token: t.token,
                            }),
                            (e._providers[n] = Cs),
                            (e._providers[n] = As(e, e._def.providersByKey[t.tokenKey]))
                        );
                    }
                    return 4 & t.flags ? n : e._parent.get(t.token, n);
                } finally {
                    Te(r);
                }
                var s, l;
            }
            function As(e, t) {
                let n;
                switch (201347067 & t.flags) {
                    case 512:
                        n = (function(e, t, n) {
                            const r = n.length;
                            switch (r) {
                                case 0:
                                    return new t();
                                case 1:
                                    return new t(Ns(e, n[0]));
                                case 2:
                                    return new t(Ns(e, n[0]), Ns(e, n[1]));
                                case 3:
                                    return new t(Ns(e, n[0]), Ns(e, n[1]), Ns(e, n[2]));
                                default:
                                    const s = new Array(r);
                                    for (let t = 0; t < r; t++) s[t] = Ns(e, n[t]);
                                    return new t(...s);
                            }
                        })(e, t.value, t.deps);
                        break;
                    case 1024:
                        n = (function(e, t, n) {
                            const r = n.length;
                            switch (r) {
                                case 0:
                                    return t();
                                case 1:
                                    return t(Ns(e, n[0]));
                                case 2:
                                    return t(Ns(e, n[0]), Ns(e, n[1]));
                                case 3:
                                    return t(Ns(e, n[0]), Ns(e, n[1]), Ns(e, n[2]));
                                default:
                                    const s = Array(r);
                                    for (let t = 0; t < r; t++) s[t] = Ns(e, n[t]);
                                    return t(...s);
                            }
                        })(e, t.value, t.deps);
                        break;
                    case 2048:
                        n = Ns(e, t.deps[0]);
                        break;
                    case 256:
                        n = t.value;
                }
                return (
                    n === Cs ||
                        null == n ||
                        'object' != typeof n ||
                        131072 & t.flags ||
                        'function' != typeof n.ngOnDestroy ||
                        (t.flags |= 131072),
                    void 0 === n ? Cs : n
                );
            }
            function ks(e, t) {
                const n = e.viewContainer._embeddedViews;
                if (((null == t || t >= n.length) && (t = n.length - 1), t < 0))
                    return null;
                const r = n[t];
                return (
                    (r.viewContainerParent = null),
                    Os(n, t),
                    Pr.dirtyParentQueries(r),
                    Vs(r),
                    r
                );
            }
            function Is(e, t, n) {
                const r = t ? es(t, t.def.lastRenderRootNode) : e.renderElement,
                    s = n.renderer.parentNode(r),
                    l = n.renderer.nextSibling(r);
                as(n, 2, s, l, void 0);
            }
            function Vs(e) {
                as(e, 3, null, null, void 0);
            }
            function Ds(e, t, n) {
                t >= e.length ? e.push(n) : e.splice(t, 0, n);
            }
            function Os(e, t) {
                t >= e.length - 1 ? e.pop() : e.splice(t, 1);
            }
            const Ms = new Object();
            function Ps(e, t, n, r, s, l) {
                return new Rs(e, t, n, r, s, l);
            }
            class Rs extends st {
                constructor(e, t, n, r, s, l) {
                    super(),
                        (this.selector = e),
                        (this.componentType = t),
                        (this._inputs = r),
                        (this._outputs = s),
                        (this.ngContentSelectors = l),
                        (this.viewDefFactory = n);
                }
                get inputs() {
                    const e = [],
                        t = this._inputs;
                    for (let n in t) e.push({propName: n, templateName: t[n]});
                    return e;
                }
                get outputs() {
                    const e = [];
                    for (let t in this._outputs)
                        e.push({propName: t, templateName: this._outputs[t]});
                    return e;
                }
                create(e, t, n, r) {
                    if (!r) throw new Error('ngModule should be provided');
                    const s = os(this.viewDefFactory),
                        l = s.nodes[0].element.componentProvider.nodeIndex,
                        i = Pr.createRootView(e, t || [], n, s, r, Ms),
                        o = Dr(i, l).instance;
                    return (
                        n &&
                            i.renderer.setAttribute(
                                Vr(i, 0).renderElement,
                                'ng-version',
                                Et.full,
                            ),
                        new Fs(i, new Bs(i), o)
                    );
                }
            }
            class Fs extends rt {
                constructor(e, t, n) {
                    super(),
                        (this._view = e),
                        (this._viewRef = t),
                        (this._component = n),
                        (this._elDef = this._view.def.nodes[0]),
                        (this.hostView = t),
                        (this.changeDetectorRef = t),
                        (this.instance = n);
                }
                get location() {
                    return new pt(Vr(this._view, this._elDef.nodeIndex).renderElement);
                }
                get injector() {
                    return new Gs(this._view, this._elDef);
                }
                get componentType() {
                    return this._component.constructor;
                }
                destroy() {
                    this._viewRef.destroy();
                }
                onDestroy(e) {
                    this._viewRef.onDestroy(e);
                }
            }
            function js(e, t, n) {
                return new Hs(e, t, n);
            }
            class Hs {
                constructor(e, t, n) {
                    (this._view = e),
                        (this._elDef = t),
                        (this._data = n),
                        (this._embeddedViews = []);
                }
                get element() {
                    return new pt(this._data.renderElement);
                }
                get injector() {
                    return new Gs(this._view, this._elDef);
                }
                get parentInjector() {
                    let e = this._view,
                        t = this._elDef.parent;
                    for (; !t && e; ) (t = Xr(e)), (e = e.parent);
                    return e ? new Gs(e, t) : new Gs(this._view, null);
                }
                clear() {
                    for (let e = this._embeddedViews.length - 1; e >= 0; e--) {
                        const t = ks(this._data, e);
                        Pr.destroyView(t);
                    }
                }
                get(e) {
                    const t = this._embeddedViews[e];
                    if (t) {
                        const e = new Bs(t);
                        return e.attachToViewContainerRef(this), e;
                    }
                    return null;
                }
                get length() {
                    return this._embeddedViews.length;
                }
                createEmbeddedView(e, t, n) {
                    const r = e.createEmbeddedView(t || {});
                    return this.insert(r, n), r;
                }
                createComponent(e, t, n, r, s) {
                    const l = n || this.parentInjector;
                    s || e instanceof ct || (s = l.get(dt));
                    const i = e.create(l, r, void 0, s);
                    return this.insert(i.hostView, t), i;
                }
                insert(e, t) {
                    if (e.destroyed)
                        throw new Error(
                            'Cannot insert a destroyed View in a ViewContainer!',
                        );
                    const n = e;
                    return (
                        (function(e, t, n, r) {
                            let s = t.viewContainer._embeddedViews;
                            null == n && (n = s.length),
                                (r.viewContainerParent = e),
                                Ds(s, n, r),
                                (function(e, t) {
                                    const n = Yr(t);
                                    if (!n || n === e || 16 & t.state) return;
                                    t.state |= 16;
                                    let r = n.template._projectedViews;
                                    r || (r = n.template._projectedViews = []),
                                        r.push(t),
                                        (function(e, n) {
                                            if (4 & n.flags) return;
                                            (t.parent.def.nodeFlags |= 4), (n.flags |= 4);
                                            let r = n.parent;
                                            for (; r; )
                                                (r.childFlags |= 4), (r = r.parent);
                                        })(0, t.parentNodeDef);
                                })(t, r),
                                Pr.dirtyParentQueries(r),
                                Is(t, n > 0 ? s[n - 1] : null, r);
                        })(this._view, this._data, t, n._view),
                        n.attachToViewContainerRef(this),
                        e
                    );
                }
                move(e, t) {
                    if (e.destroyed)
                        throw new Error(
                            'Cannot move a destroyed View in a ViewContainer!',
                        );
                    const n = this._embeddedViews.indexOf(e._view);
                    return (
                        (function(e, t, r) {
                            const s = e.viewContainer._embeddedViews,
                                l = s[n];
                            Os(s, n),
                                null == r && (r = s.length),
                                Ds(s, r, l),
                                Pr.dirtyParentQueries(l),
                                Vs(l),
                                Is(e, r > 0 ? s[r - 1] : null, l);
                        })(this._data, 0, t),
                        e
                    );
                }
                indexOf(e) {
                    return this._embeddedViews.indexOf(e._view);
                }
                remove(e) {
                    const t = ks(this._data, e);
                    t && Pr.destroyView(t);
                }
                detach(e) {
                    const t = ks(this._data, e);
                    return t ? new Bs(t) : null;
                }
            }
            function Ls(e) {
                return new Bs(e);
            }
            class Bs {
                constructor(e) {
                    (this._view = e),
                        (this._viewContainerRef = null),
                        (this._appRef = null);
                }
                get rootNodes() {
                    return (function(e) {
                        const t = [];
                        return as(e, 0, void 0, void 0, t), t;
                    })(this._view);
                }
                get context() {
                    return this._view.context;
                }
                get destroyed() {
                    return 0 != (128 & this._view.state);
                }
                markForCheck() {
                    Qr(this._view);
                }
                detach() {
                    this._view.state &= -5;
                }
                detectChanges() {
                    const e = this._view.root.rendererFactory;
                    e.begin && e.begin();
                    try {
                        Pr.checkAndUpdateView(this._view);
                    } finally {
                        e.end && e.end();
                    }
                }
                checkNoChanges() {
                    Pr.checkNoChangesView(this._view);
                }
                reattach() {
                    this._view.state |= 4;
                }
                onDestroy(e) {
                    this._view.disposables || (this._view.disposables = []),
                        this._view.disposables.push(e);
                }
                destroy() {
                    this._appRef
                        ? this._appRef.detachView(this)
                        : this._viewContainerRef &&
                          this._viewContainerRef.detach(
                              this._viewContainerRef.indexOf(this),
                          ),
                        Pr.destroyView(this._view);
                }
                detachFromAppRef() {
                    (this._appRef = null),
                        Vs(this._view),
                        Pr.dirtyParentQueries(this._view);
                }
                attachToAppRef(e) {
                    if (this._viewContainerRef)
                        throw new Error(
                            'This view is already attached to a ViewContainer!',
                        );
                    this._appRef = e;
                }
                attachToViewContainerRef(e) {
                    if (this._appRef)
                        throw new Error(
                            'This view is already attached directly to the ApplicationRef!',
                        );
                    this._viewContainerRef = e;
                }
            }
            function Us(e, t) {
                return new $s(e, t);
            }
            class $s extends Qt {
                constructor(e, t) {
                    super(), (this._parentView = e), (this._def = t);
                }
                createEmbeddedView(e) {
                    return new Bs(
                        Pr.createEmbeddedView(
                            this._parentView,
                            this._def,
                            this._def.element.template,
                            e,
                        ),
                    );
                }
                get elementRef() {
                    return new pt(
                        Vr(this._parentView, this._def.nodeIndex).renderElement,
                    );
                }
            }
            function zs(e, t) {
                return new Gs(e, t);
            }
            class Gs {
                constructor(e, t) {
                    (this.view = e), (this.elDef = t);
                }
                get(e, t = Le.THROW_IF_NOT_FOUND) {
                    return Pr.resolveDep(
                        this.view,
                        this.elDef,
                        !!this.elDef && 0 != (33554432 & this.elDef.flags),
                        {flags: 0, token: e, tokenKey: Br(e)},
                        t,
                    );
                }
            }
            function qs(e, t) {
                const n = e.def.nodes[t];
                if (1 & n.flags) {
                    const t = Vr(e, n.nodeIndex);
                    return n.element.template ? t.template : t.renderElement;
                }
                if (2 & n.flags) return Ir(e, n.nodeIndex).renderText;
                if (20240 & n.flags) return Dr(e, n.nodeIndex).instance;
                throw new Error(`Illegal state: read nodeValue for node index ${t}`);
            }
            function Zs(e) {
                return new Ws(e.renderer);
            }
            class Ws {
                constructor(e) {
                    this.delegate = e;
                }
                selectRootElement(e) {
                    return this.delegate.selectRootElement(e);
                }
                createElement(e, t) {
                    const [n, r] = fs(t),
                        s = this.delegate.createElement(r, n);
                    return e && this.delegate.appendChild(e, s), s;
                }
                createViewRoot(e) {
                    return e;
                }
                createTemplateAnchor(e) {
                    const t = this.delegate.createComment('');
                    return e && this.delegate.appendChild(e, t), t;
                }
                createText(e, t) {
                    const n = this.delegate.createText(t);
                    return e && this.delegate.appendChild(e, n), n;
                }
                projectNodes(e, t) {
                    for (let n = 0; n < t.length; n++) this.delegate.appendChild(e, t[n]);
                }
                attachViewAfter(e, t) {
                    const n = this.delegate.parentNode(e),
                        r = this.delegate.nextSibling(e);
                    for (let s = 0; s < t.length; s++)
                        this.delegate.insertBefore(n, t[s], r);
                }
                detachView(e) {
                    for (let t = 0; t < e.length; t++) {
                        const n = e[t],
                            r = this.delegate.parentNode(n);
                        this.delegate.removeChild(r, n);
                    }
                }
                destroyView(e, t) {
                    for (let n = 0; n < t.length; n++) this.delegate.destroyNode(t[n]);
                }
                listen(e, t, n) {
                    return this.delegate.listen(e, t, n);
                }
                listenGlobal(e, t, n) {
                    return this.delegate.listen(e, t, n);
                }
                setElementProperty(e, t, n) {
                    this.delegate.setProperty(e, t, n);
                }
                setElementAttribute(e, t, n) {
                    const [r, s] = fs(t);
                    null != n
                        ? this.delegate.setAttribute(e, s, n, r)
                        : this.delegate.removeAttribute(e, s, r);
                }
                setBindingDebugInfo(e, t, n) {}
                setElementClass(e, t, n) {
                    n ? this.delegate.addClass(e, t) : this.delegate.removeClass(e, t);
                }
                setElementStyle(e, t, n) {
                    null != n
                        ? this.delegate.setStyle(e, t, n)
                        : this.delegate.removeStyle(e, t);
                }
                invokeElementMethod(e, t, n) {
                    e[t].apply(e, n);
                }
                setText(e, t) {
                    this.delegate.setValue(e, t);
                }
                animate() {
                    throw new Error('Renderer.animate is no longer supported!');
                }
            }
            function Qs(e, t, n, r) {
                return new Ks(e, t, n, r);
            }
            class Ks {
                constructor(e, t, n, r) {
                    (this._moduleType = e),
                        (this._parent = t),
                        (this._bootstrapComponents = n),
                        (this._def = r),
                        (this._destroyListeners = []),
                        (this._destroyed = !1),
                        (this.injector = this),
                        (function(e) {
                            const t = e._def,
                                n = (e._providers = new Array(t.providers.length));
                            for (let r = 0; r < t.providers.length; r++) {
                                const s = t.providers[r];
                                4096 & s.flags || (void 0 === n[r] && (n[r] = As(e, s)));
                            }
                        })(this);
                }
                get(e, t = Le.THROW_IF_NOT_FOUND, n = Ee.Default) {
                    let r = 0;
                    return (
                        n & Ee.SkipSelf ? (r |= 1) : n & Ee.Self && (r |= 4),
                        Ns(this, {token: e, tokenKey: Br(e), flags: r}, t)
                    );
                }
                get instance() {
                    return this.get(this._moduleType);
                }
                get componentFactoryResolver() {
                    return this.get(at);
                }
                destroy() {
                    if (this._destroyed)
                        throw new Error(
                            `The ng module ${fe(
                                this.instance.constructor,
                            )} has already been destroyed.`,
                        );
                    (this._destroyed = !0),
                        (function(e, t) {
                            const n = e._def,
                                r = new Set();
                            for (let s = 0; s < n.providers.length; s++)
                                if (131072 & n.providers[s].flags) {
                                    const t = e._providers[s];
                                    if (t && t !== Cs) {
                                        const e = t.ngOnDestroy;
                                        'function' != typeof e ||
                                            r.has(t) ||
                                            (e.apply(t), r.add(t));
                                    }
                                }
                        })(this),
                        this._destroyListeners.forEach(e => e());
                }
                onDestroy(e) {
                    this._destroyListeners.push(e);
                }
            }
            const Js = Br(gt),
                Ys = Br(yt),
                Xs = Br(pt),
                el = Br(Jn),
                tl = Br(Qt),
                nl = Br(Xn),
                rl = Br(Le),
                sl = Br(je);
            function ll(e, t, n, r, s, l, i, o) {
                const a = [];
                if (i)
                    for (let c in i) {
                        const [e, t] = i[c];
                        a[e] = {
                            flags: 8,
                            name: c,
                            nonMinifiedName: t,
                            ns: null,
                            securityContext: null,
                            suffix: null,
                        };
                    }
                const u = [];
                if (o)
                    for (let c in o)
                        u.push({type: 1, propName: c, target: null, eventName: o[c]});
                return ol(e, (t |= 16384), n, r, s, s, l, a, u);
            }
            function il(e, t, n, r, s) {
                return ol(-1, e, t, 0, n, r, s);
            }
            function ol(e, t, n, r, s, l, i, o, a) {
                const {matchedQueries: u, references: c, matchedQueryIds: d} = rs(n);
                a || (a = []), o || (o = []), (l = _e(l));
                const h = ss(i, fe(s));
                return {
                    nodeIndex: -1,
                    parent: null,
                    renderParent: null,
                    bindingIndex: -1,
                    outputIndex: -1,
                    checkIndex: e,
                    flags: t,
                    childFlags: 0,
                    directChildFlags: 0,
                    childMatchedQueries: 0,
                    matchedQueries: u,
                    matchedQueryIds: d,
                    references: c,
                    ngContentIndex: -1,
                    childCount: r,
                    bindings: o,
                    bindingFlags: gs(o),
                    outputs: a,
                    element: null,
                    provider: {token: s, value: l, deps: h},
                    text: null,
                    query: null,
                    ngContent: null,
                };
            }
            function al(e, t) {
                return hl(e, t);
            }
            function ul(e, t) {
                let n = e;
                for (; n.parent && !ts(n); ) n = n.parent;
                return pl(n.parent, Xr(n), !0, t.provider.value, t.provider.deps);
            }
            function cl(e, t) {
                const n = pl(
                    e,
                    t.parent,
                    (32768 & t.flags) > 0,
                    t.provider.value,
                    t.provider.deps,
                );
                if (t.outputs.length)
                    for (let r = 0; r < t.outputs.length; r++) {
                        const s = t.outputs[r],
                            l = n[s.propName];
                        if (!an(l))
                            throw new Error(
                                `@Output ${s.propName} not initialized in '${n.constructor.name}'.`,
                            );
                        {
                            const n = l.subscribe(dl(e, t.parent.nodeIndex, s.eventName));
                            e.disposables[t.outputIndex + r] = n.unsubscribe.bind(n);
                        }
                    }
                return n;
            }
            function dl(e, t, n) {
                return r => Jr(e, t, n, r);
            }
            function hl(e, t) {
                const n = (8192 & t.flags) > 0,
                    r = t.provider;
                switch (201347067 & t.flags) {
                    case 512:
                        return pl(e, t.parent, n, r.value, r.deps);
                    case 1024:
                        return (function(e, t, n, r, s) {
                            const l = s.length;
                            switch (l) {
                                case 0:
                                    return r();
                                case 1:
                                    return r(gl(e, t, n, s[0]));
                                case 2:
                                    return r(gl(e, t, n, s[0]), gl(e, t, n, s[1]));
                                case 3:
                                    return r(
                                        gl(e, t, n, s[0]),
                                        gl(e, t, n, s[1]),
                                        gl(e, t, n, s[2]),
                                    );
                                default:
                                    const i = Array(l);
                                    for (let r = 0; r < l; r++) i[r] = gl(e, t, n, s[r]);
                                    return r(...i);
                            }
                        })(e, t.parent, n, r.value, r.deps);
                    case 2048:
                        return gl(e, t.parent, n, r.deps[0]);
                    case 256:
                        return r.value;
                }
            }
            function pl(e, t, n, r, s) {
                const l = s.length;
                switch (l) {
                    case 0:
                        return new r();
                    case 1:
                        return new r(gl(e, t, n, s[0]));
                    case 2:
                        return new r(gl(e, t, n, s[0]), gl(e, t, n, s[1]));
                    case 3:
                        return new r(
                            gl(e, t, n, s[0]),
                            gl(e, t, n, s[1]),
                            gl(e, t, n, s[2]),
                        );
                    default:
                        const i = new Array(l);
                        for (let r = 0; r < l; r++) i[r] = gl(e, t, n, s[r]);
                        return new r(...i);
                }
            }
            const fl = {};
            function gl(e, t, n, r, s = Le.THROW_IF_NOT_FOUND) {
                if (8 & r.flags) return r.token;
                const l = e;
                2 & r.flags && (s = null);
                const i = r.tokenKey;
                i === nl && (n = !(!t || !t.element.componentView)),
                    t && 1 & r.flags && ((n = !1), (t = t.parent));
                let o = e;
                for (; o; ) {
                    if (t)
                        switch (i) {
                            case Js:
                                return Zs(ml(o, t, n));
                            case Ys:
                                return ml(o, t, n).renderer;
                            case Xs:
                                return new pt(Vr(o, t.nodeIndex).renderElement);
                            case el:
                                return Vr(o, t.nodeIndex).viewContainer;
                            case tl:
                                if (t.element.template)
                                    return Vr(o, t.nodeIndex).template;
                                break;
                            case nl:
                                return Ls(ml(o, t, n));
                            case rl:
                            case sl:
                                return zs(o, t);
                            default:
                                const e = (n
                                    ? t.element.allProviders
                                    : t.element.publicProviders)[i];
                                if (e) {
                                    let t = Dr(o, e.nodeIndex);
                                    return (
                                        t ||
                                            ((t = {instance: hl(o, e)}),
                                            (o.nodes[e.nodeIndex] = t)),
                                        t.instance
                                    );
                                }
                        }
                    (n = ts(o)), (t = Xr(o)), (o = o.parent), 4 & r.flags && (o = null);
                }
                const a = l.root.injector.get(r.token, fl);
                return a !== fl || s === fl
                    ? a
                    : l.root.ngModule.injector.get(r.token, s);
            }
            function ml(e, t, n) {
                let r;
                if (n) r = Vr(e, t.nodeIndex).componentView;
                else for (r = e; r.parent && !ts(r); ) r = r.parent;
                return r;
            }
            function _l(e, t, n, r, s, l) {
                if (32768 & n.flags) {
                    const t = Vr(e, n.parent.nodeIndex).componentView;
                    2 & t.def.flags && (t.state |= 8);
                }
                if (((t.instance[n.bindings[r].name] = s), 524288 & n.flags)) {
                    l = l || {};
                    const t = Ve.unwrap(e.oldValues[n.bindingIndex + r]);
                    l[n.bindings[r].nonMinifiedName] = new De(t, s, 0 != (2 & e.state));
                }
                return (e.oldValues[n.bindingIndex + r] = s), l;
            }
            function yl(e, t) {
                if (!(e.def.nodeFlags & t)) return;
                const n = e.def.nodes;
                let r = 0;
                for (let s = 0; s < n.length; s++) {
                    const l = n[s];
                    let i = l.parent;
                    for (
                        !i && l.flags & t && bl(e, s, l.flags & t, r++),
                            0 == (l.childFlags & t) && (s += l.childCount);
                        i && 1 & i.flags && s === i.nodeIndex + i.childCount;

                    )
                        i.directChildFlags & t && (r = vl(e, i, t, r)), (i = i.parent);
                }
            }
            function vl(e, t, n, r) {
                for (let s = t.nodeIndex + 1; s <= t.nodeIndex + t.childCount; s++) {
                    const t = e.def.nodes[s];
                    t.flags & n && bl(e, s, t.flags & n, r++), (s += t.childCount);
                }
                return r;
            }
            function bl(e, t, n, r) {
                const s = Dr(e, t);
                if (!s) return;
                const l = s.instance;
                l &&
                    (Pr.setCurrentNode(e, t),
                    1048576 & n && kr(e, 512, r) && l.ngAfterContentInit(),
                    2097152 & n && l.ngAfterContentChecked(),
                    4194304 & n && kr(e, 768, r) && l.ngAfterViewInit(),
                    8388608 & n && l.ngAfterViewChecked(),
                    131072 & n && l.ngOnDestroy());
            }
            function wl(e) {
                const t = e.def.nodeMatchedQueries;
                for (; e.parent && ns(e); ) {
                    let n = e.parentNodeDef;
                    e = e.parent;
                    const r = n.nodeIndex + n.childCount;
                    for (let s = 0; s <= r; s++) {
                        const r = e.def.nodes[s];
                        67108864 & r.flags &&
                            536870912 & r.flags &&
                            (r.query.filterId & t) === r.query.filterId &&
                            Mr(e, s).setDirty(),
                            (!(1 & r.flags && s + r.childCount < n.nodeIndex) &&
                                67108864 & r.childFlags &&
                                536870912 & r.childFlags) ||
                                (s += r.childCount);
                    }
                }
                if (134217728 & e.def.nodeFlags)
                    for (let n = 0; n < e.def.nodes.length; n++) {
                        const t = e.def.nodes[n];
                        134217728 & t.flags && 536870912 & t.flags && Mr(e, n).setDirty(),
                            (n += t.childCount);
                    }
            }
            function Cl(e, t) {
                const n = Mr(e, t.nodeIndex);
                if (!n.dirty) return;
                let r,
                    s = void 0;
                if (67108864 & t.flags) {
                    const n = t.parent.parent;
                    (s = El(e, n.nodeIndex, n.nodeIndex + n.childCount, t.query, [])),
                        (r = Dr(e, t.parent.nodeIndex).instance);
                } else
                    134217728 & t.flags &&
                        ((s = El(e, 0, e.def.nodes.length - 1, t.query, [])),
                        (r = e.component));
                n.reset(s);
                const l = t.query.bindings;
                let i = !1;
                for (let o = 0; o < l.length; o++) {
                    const e = l[o];
                    let t;
                    switch (e.bindingType) {
                        case 0:
                            t = n.first;
                            break;
                        case 1:
                            (t = n), (i = !0);
                    }
                    r[e.propName] = t;
                }
                i && n.notifyOnChanges();
            }
            function El(e, t, n, r, s) {
                for (let l = t; l <= n; l++) {
                    const t = e.def.nodes[l],
                        n = t.matchedQueries[r.id];
                    if (
                        (null != n && s.push(xl(e, t, n)),
                        1 & t.flags &&
                            t.element.template &&
                            (t.element.template.nodeMatchedQueries & r.filterId) ===
                                r.filterId)
                    ) {
                        const n = Vr(e, l);
                        if (
                            ((t.childMatchedQueries & r.filterId) === r.filterId &&
                                (El(e, l + 1, l + t.childCount, r, s),
                                (l += t.childCount)),
                            16777216 & t.flags)
                        ) {
                            const e = n.viewContainer._embeddedViews;
                            for (let t = 0; t < e.length; t++) {
                                const l = e[t],
                                    i = Yr(l);
                                i && i === n && El(l, 0, l.def.nodes.length - 1, r, s);
                            }
                        }
                        const i = n.template._projectedViews;
                        if (i)
                            for (let e = 0; e < i.length; e++) {
                                const t = i[e];
                                El(t, 0, t.def.nodes.length - 1, r, s);
                            }
                    }
                    (t.childMatchedQueries & r.filterId) !== r.filterId &&
                        (l += t.childCount);
                }
                return s;
            }
            function xl(e, t, n) {
                if (null != n)
                    switch (n) {
                        case 1:
                            return Vr(e, t.nodeIndex).renderElement;
                        case 0:
                            return new pt(Vr(e, t.nodeIndex).renderElement);
                        case 2:
                            return Vr(e, t.nodeIndex).template;
                        case 3:
                            return Vr(e, t.nodeIndex).viewContainer;
                        case 4:
                            return Dr(e, t.nodeIndex).instance;
                    }
            }
            function Sl(e, t, n) {
                const r = ls(e, t, n);
                r && cs(e, n.ngContent.index, 1, r, null, void 0);
            }
            function Tl(e, t, n) {
                const r = new Array(n.length);
                for (let s = 0; s < n.length; s++) {
                    const e = n[s];
                    r[s] = {
                        flags: 8,
                        name: e,
                        ns: null,
                        nonMinifiedName: e,
                        securityContext: null,
                        suffix: null,
                    };
                }
                return {
                    nodeIndex: -1,
                    parent: null,
                    renderParent: null,
                    bindingIndex: -1,
                    outputIndex: -1,
                    checkIndex: t,
                    flags: e,
                    childFlags: 0,
                    directChildFlags: 0,
                    childMatchedQueries: 0,
                    matchedQueries: {},
                    matchedQueryIds: 0,
                    references: {},
                    ngContentIndex: -1,
                    childCount: 0,
                    bindings: r,
                    bindingFlags: gs(r),
                    outputs: [],
                    element: null,
                    provider: null,
                    text: null,
                    query: null,
                    ngContent: null,
                };
            }
            function Nl(e, t, n) {
                const r = new Array(n.length - 1);
                for (let s = 1; s < n.length; s++)
                    r[s - 1] = {
                        flags: 8,
                        name: null,
                        ns: null,
                        nonMinifiedName: null,
                        securityContext: null,
                        suffix: n[s],
                    };
                return {
                    nodeIndex: -1,
                    parent: null,
                    renderParent: null,
                    bindingIndex: -1,
                    outputIndex: -1,
                    checkIndex: e,
                    flags: 2,
                    childFlags: 0,
                    directChildFlags: 0,
                    childMatchedQueries: 0,
                    matchedQueries: {},
                    matchedQueryIds: 0,
                    references: {},
                    ngContentIndex: t,
                    childCount: 0,
                    bindings: r,
                    bindingFlags: 8,
                    outputs: [],
                    element: null,
                    provider: null,
                    text: {prefix: n[0]},
                    query: null,
                    ngContent: null,
                };
            }
            function Al(e, t, n) {
                let r;
                const s = e.renderer;
                r = s.createText(n.text.prefix);
                const l = ls(e, t, n);
                return l && s.appendChild(l, r), {renderText: r};
            }
            function kl(e, t) {
                return (null != e ? e.toString() : '') + t.suffix;
            }
            function Il(e, t, n, r) {
                let s = 0,
                    l = 0,
                    i = 0,
                    o = 0,
                    a = 0,
                    u = null,
                    c = null,
                    d = !1,
                    h = !1,
                    p = null;
                for (let f = 0; f < t.length; f++) {
                    const e = t[f];
                    if (
                        ((e.nodeIndex = f),
                        (e.parent = u),
                        (e.bindingIndex = s),
                        (e.outputIndex = l),
                        (e.renderParent = c),
                        (i |= e.flags),
                        (a |= e.matchedQueryIds),
                        e.element)
                    ) {
                        const t = e.element;
                        (t.publicProviders = u
                            ? u.element.publicProviders
                            : Object.create(null)),
                            (t.allProviders = t.publicProviders),
                            (d = !1),
                            (h = !1),
                            e.element.template &&
                                (a |= e.element.template.nodeMatchedQueries);
                    }
                    if (
                        (Dl(u, e, t.length),
                        (s += e.bindings.length),
                        (l += e.outputs.length),
                        !c && 3 & e.flags && (p = e),
                        20224 & e.flags)
                    ) {
                        d ||
                            ((d = !0),
                            (u.element.publicProviders = Object.create(
                                u.element.publicProviders,
                            )),
                            (u.element.allProviders = u.element.publicProviders));
                        const t = 0 != (32768 & e.flags);
                        0 == (8192 & e.flags) || t
                            ? (u.element.publicProviders[Br(e.provider.token)] = e)
                            : (h ||
                                  ((h = !0),
                                  (u.element.allProviders = Object.create(
                                      u.element.publicProviders,
                                  ))),
                              (u.element.allProviders[Br(e.provider.token)] = e)),
                            t && (u.element.componentProvider = e);
                    }
                    if (
                        (u
                            ? ((u.childFlags |= e.flags),
                              (u.directChildFlags |= e.flags),
                              (u.childMatchedQueries |= e.matchedQueryIds),
                              e.element &&
                                  e.element.template &&
                                  (u.childMatchedQueries |=
                                      e.element.template.nodeMatchedQueries))
                            : (o |= e.flags),
                        e.childCount > 0)
                    )
                        (u = e), Vl(e) || (c = e);
                    else
                        for (; u && f === u.nodeIndex + u.childCount; ) {
                            const e = u.parent;
                            e &&
                                ((e.childFlags |= u.childFlags),
                                (e.childMatchedQueries |= u.childMatchedQueries)),
                                (c = (u = e) && Vl(u) ? u.renderParent : u);
                        }
                }
                return {
                    factory: null,
                    nodeFlags: i,
                    rootNodeFlags: o,
                    nodeMatchedQueries: a,
                    flags: e,
                    nodes: t,
                    updateDirectives: n || Hr,
                    updateRenderer: r || Hr,
                    handleEvent: (e, n, r, s) => t[n].element.handleEvent(e, r, s),
                    bindingCount: s,
                    outputCount: l,
                    lastRenderRootNode: p,
                };
            }
            function Vl(e) {
                return 0 != (1 & e.flags) && null === e.element.name;
            }
            function Dl(e, t, n) {
                const r = t.element && t.element.template;
                if (r) {
                    if (!r.lastRenderRootNode)
                        throw new Error(
                            'Illegal State: Embedded templates without nodes are not allowed!',
                        );
                    if (r.lastRenderRootNode && 16777216 & r.lastRenderRootNode.flags)
                        throw new Error(
                            `Illegal State: Last root node of a template can't have embedded views, at index ${t.nodeIndex}!`,
                        );
                }
                if (20224 & t.flags && 0 == (1 & (e ? e.flags : 0)))
                    throw new Error(
                        `Illegal State: StaticProvider/Directive nodes need to be children of elements or anchors, at index ${t.nodeIndex}!`,
                    );
                if (t.query) {
                    if (67108864 & t.flags && (!e || 0 == (16384 & e.flags)))
                        throw new Error(
                            `Illegal State: Content Query nodes need to be children of directives, at index ${t.nodeIndex}!`,
                        );
                    if (134217728 & t.flags && e)
                        throw new Error(
                            `Illegal State: View Query nodes have to be top level nodes, at index ${t.nodeIndex}!`,
                        );
                }
                if (t.childCount) {
                    const r = e ? e.nodeIndex + e.childCount : n - 1;
                    if (t.nodeIndex <= r && t.nodeIndex + t.childCount > r)
                        throw new Error(
                            `Illegal State: childCount of node leads outside of parent, at index ${t.nodeIndex}!`,
                        );
                }
            }
            function Ol(e, t, n, r) {
                const s = Rl(e.root, e.renderer, e, t, n);
                return Fl(s, e.component, r), jl(s), s;
            }
            function Ml(e, t, n) {
                const r = Rl(e, e.renderer, null, null, t);
                return Fl(r, n, n), jl(r), r;
            }
            function Pl(e, t, n, r) {
                const s = t.element.componentRendererType;
                let l;
                return (
                    (l = s
                        ? e.root.rendererFactory.createRenderer(r, s)
                        : e.root.renderer),
                    Rl(e.root, l, e, t.element.componentProvider, n)
                );
            }
            function Rl(e, t, n, r, s) {
                const l = new Array(s.nodes.length),
                    i = s.outputCount ? new Array(s.outputCount) : null;
                return {
                    def: s,
                    parent: n,
                    viewContainerParent: null,
                    parentNodeDef: r,
                    context: null,
                    component: null,
                    nodes: l,
                    state: 13,
                    root: e,
                    renderer: t,
                    oldValues: new Array(s.bindingCount),
                    disposables: i,
                    initIndex: -1,
                };
            }
            function Fl(e, t, n) {
                (e.component = t), (e.context = n);
            }
            function jl(e) {
                let t;
                ts(e) &&
                    (t = Vr(e.parent, e.parentNodeDef.parent.nodeIndex).renderElement);
                const n = e.def,
                    r = e.nodes;
                for (let s = 0; s < n.nodes.length; s++) {
                    const l = n.nodes[s];
                    let i;
                    switch ((Pr.setCurrentNode(e, s), 201347067 & l.flags)) {
                        case 1:
                            const n = ys(e, t, l);
                            let o = void 0;
                            if (33554432 & l.flags) {
                                const t = os(l.element.componentView);
                                o = Pr.createComponentView(e, l, t, n);
                            }
                            vs(e, o, l, n),
                                (i = {
                                    renderElement: n,
                                    componentView: o,
                                    viewContainer: null,
                                    template: l.element.template ? Us(e, l) : void 0,
                                }),
                                16777216 & l.flags && (i.viewContainer = js(e, l, i));
                            break;
                        case 2:
                            i = Al(e, t, l);
                            break;
                        case 512:
                        case 1024:
                        case 2048:
                        case 256:
                            (i = r[s]) || 4096 & l.flags || (i = {instance: al(e, l)});
                            break;
                        case 16:
                            i = {instance: ul(e, l)};
                            break;
                        case 16384:
                            (i = r[s]) || (i = {instance: cl(e, l)}),
                                32768 & l.flags &&
                                    Fl(
                                        Vr(e, l.parent.nodeIndex).componentView,
                                        i.instance,
                                        i.instance,
                                    );
                            break;
                        case 32:
                        case 64:
                        case 128:
                            i = {value: void 0};
                            break;
                        case 67108864:
                        case 134217728:
                            i = new Kn();
                            break;
                        case 8:
                            Sl(e, t, l), (i = void 0);
                    }
                    r[s] = i;
                }
                Zl(e, ql.CreateViewNodes), Jl(e, 201326592, 268435456, 0);
            }
            function Hl(e) {
                Ul(e),
                    Pr.updateDirectives(e, 1),
                    Wl(e, ql.CheckNoChanges),
                    Pr.updateRenderer(e, 1),
                    Zl(e, ql.CheckNoChanges),
                    (e.state &= -97);
            }
            function Ll(e) {
                1 & e.state ? ((e.state &= -2), (e.state |= 2)) : (e.state &= -3),
                    Ar(e, 0, 256),
                    Ul(e),
                    Pr.updateDirectives(e, 0),
                    Wl(e, ql.CheckAndUpdate),
                    Jl(e, 67108864, 536870912, 0);
                let t = Ar(e, 256, 512);
                yl(e, 2097152 | (t ? 1048576 : 0)),
                    Pr.updateRenderer(e, 0),
                    Zl(e, ql.CheckAndUpdate),
                    Jl(e, 134217728, 536870912, 0),
                    yl(e, 8388608 | ((t = Ar(e, 512, 768)) ? 4194304 : 0)),
                    2 & e.def.flags && (e.state &= -9),
                    (e.state &= -97),
                    Ar(e, 768, 1024);
            }
            function Bl(e, t, n, r, s, l, i, o, a, u, c, d, h) {
                return 0 === n
                    ? (function(e, t, n, r, s, l, i, o, a, u, c, d) {
                          switch (201347067 & t.flags) {
                              case 1:
                                  return (function(e, t, n, r, s, l, i, o, a, u, c, d) {
                                      const h = t.bindings.length;
                                      let p = !1;
                                      return (
                                          h > 0 && ws(e, t, 0, n) && (p = !0),
                                          h > 1 && ws(e, t, 1, r) && (p = !0),
                                          h > 2 && ws(e, t, 2, s) && (p = !0),
                                          h > 3 && ws(e, t, 3, l) && (p = !0),
                                          h > 4 && ws(e, t, 4, i) && (p = !0),
                                          h > 5 && ws(e, t, 5, o) && (p = !0),
                                          h > 6 && ws(e, t, 6, a) && (p = !0),
                                          h > 7 && ws(e, t, 7, u) && (p = !0),
                                          h > 8 && ws(e, t, 8, c) && (p = !0),
                                          h > 9 && ws(e, t, 9, d) && (p = !0),
                                          p
                                      );
                                  })(e, t, n, r, s, l, i, o, a, u, c, d);
                              case 2:
                                  return (function(e, t, n, r, s, l, i, o, a, u, c, d) {
                                      let h = !1;
                                      const p = t.bindings,
                                          f = p.length;
                                      if (
                                          (f > 0 && Zr(e, t, 0, n) && (h = !0),
                                          f > 1 && Zr(e, t, 1, r) && (h = !0),
                                          f > 2 && Zr(e, t, 2, s) && (h = !0),
                                          f > 3 && Zr(e, t, 3, l) && (h = !0),
                                          f > 4 && Zr(e, t, 4, i) && (h = !0),
                                          f > 5 && Zr(e, t, 5, o) && (h = !0),
                                          f > 6 && Zr(e, t, 6, a) && (h = !0),
                                          f > 7 && Zr(e, t, 7, u) && (h = !0),
                                          f > 8 && Zr(e, t, 8, c) && (h = !0),
                                          f > 9 && Zr(e, t, 9, d) && (h = !0),
                                          h)
                                      ) {
                                          let h = t.text.prefix;
                                          f > 0 && (h += kl(n, p[0])),
                                              f > 1 && (h += kl(r, p[1])),
                                              f > 2 && (h += kl(s, p[2])),
                                              f > 3 && (h += kl(l, p[3])),
                                              f > 4 && (h += kl(i, p[4])),
                                              f > 5 && (h += kl(o, p[5])),
                                              f > 6 && (h += kl(a, p[6])),
                                              f > 7 && (h += kl(u, p[7])),
                                              f > 8 && (h += kl(c, p[8])),
                                              f > 9 && (h += kl(d, p[9]));
                                          const g = Ir(e, t.nodeIndex).renderText;
                                          e.renderer.setValue(g, h);
                                      }
                                      return h;
                                  })(e, t, n, r, s, l, i, o, a, u, c, d);
                              case 16384:
                                  return (function(e, t, n, r, s, l, i, o, a, u, c, d) {
                                      const h = Dr(e, t.nodeIndex),
                                          p = h.instance;
                                      let f = !1,
                                          g = void 0;
                                      const m = t.bindings.length;
                                      return (
                                          m > 0 &&
                                              qr(e, t, 0, n) &&
                                              ((f = !0), (g = _l(e, h, t, 0, n, g))),
                                          m > 1 &&
                                              qr(e, t, 1, r) &&
                                              ((f = !0), (g = _l(e, h, t, 1, r, g))),
                                          m > 2 &&
                                              qr(e, t, 2, s) &&
                                              ((f = !0), (g = _l(e, h, t, 2, s, g))),
                                          m > 3 &&
                                              qr(e, t, 3, l) &&
                                              ((f = !0), (g = _l(e, h, t, 3, l, g))),
                                          m > 4 &&
                                              qr(e, t, 4, i) &&
                                              ((f = !0), (g = _l(e, h, t, 4, i, g))),
                                          m > 5 &&
                                              qr(e, t, 5, o) &&
                                              ((f = !0), (g = _l(e, h, t, 5, o, g))),
                                          m > 6 &&
                                              qr(e, t, 6, a) &&
                                              ((f = !0), (g = _l(e, h, t, 6, a, g))),
                                          m > 7 &&
                                              qr(e, t, 7, u) &&
                                              ((f = !0), (g = _l(e, h, t, 7, u, g))),
                                          m > 8 &&
                                              qr(e, t, 8, c) &&
                                              ((f = !0), (g = _l(e, h, t, 8, c, g))),
                                          m > 9 &&
                                              qr(e, t, 9, d) &&
                                              ((f = !0), (g = _l(e, h, t, 9, d, g))),
                                          g && p.ngOnChanges(g),
                                          65536 & t.flags &&
                                              kr(e, 256, t.nodeIndex) &&
                                              p.ngOnInit(),
                                          262144 & t.flags && p.ngDoCheck(),
                                          f
                                      );
                                  })(e, t, n, r, s, l, i, o, a, u, c, d);
                              case 32:
                              case 64:
                              case 128:
                                  return (function(e, t, n, r, s, l, i, o, a, u, c, d) {
                                      const h = t.bindings;
                                      let p = !1;
                                      const f = h.length;
                                      if (
                                          (f > 0 && Zr(e, t, 0, n) && (p = !0),
                                          f > 1 && Zr(e, t, 1, r) && (p = !0),
                                          f > 2 && Zr(e, t, 2, s) && (p = !0),
                                          f > 3 && Zr(e, t, 3, l) && (p = !0),
                                          f > 4 && Zr(e, t, 4, i) && (p = !0),
                                          f > 5 && Zr(e, t, 5, o) && (p = !0),
                                          f > 6 && Zr(e, t, 6, a) && (p = !0),
                                          f > 7 && Zr(e, t, 7, u) && (p = !0),
                                          f > 8 && Zr(e, t, 8, c) && (p = !0),
                                          f > 9 && Zr(e, t, 9, d) && (p = !0),
                                          p)
                                      ) {
                                          const p = Or(e, t.nodeIndex);
                                          let g;
                                          switch (201347067 & t.flags) {
                                              case 32:
                                                  (g = new Array(h.length)),
                                                      f > 0 && (g[0] = n),
                                                      f > 1 && (g[1] = r),
                                                      f > 2 && (g[2] = s),
                                                      f > 3 && (g[3] = l),
                                                      f > 4 && (g[4] = i),
                                                      f > 5 && (g[5] = o),
                                                      f > 6 && (g[6] = a),
                                                      f > 7 && (g[7] = u),
                                                      f > 8 && (g[8] = c),
                                                      f > 9 && (g[9] = d);
                                                  break;
                                              case 64:
                                                  (g = {}),
                                                      f > 0 && (g[h[0].name] = n),
                                                      f > 1 && (g[h[1].name] = r),
                                                      f > 2 && (g[h[2].name] = s),
                                                      f > 3 && (g[h[3].name] = l),
                                                      f > 4 && (g[h[4].name] = i),
                                                      f > 5 && (g[h[5].name] = o),
                                                      f > 6 && (g[h[6].name] = a),
                                                      f > 7 && (g[h[7].name] = u),
                                                      f > 8 && (g[h[8].name] = c),
                                                      f > 9 && (g[h[9].name] = d);
                                                  break;
                                              case 128:
                                                  const e = n;
                                                  switch (f) {
                                                      case 1:
                                                          g = e.transform(n);
                                                          break;
                                                      case 2:
                                                          g = e.transform(r);
                                                          break;
                                                      case 3:
                                                          g = e.transform(r, s);
                                                          break;
                                                      case 4:
                                                          g = e.transform(r, s, l);
                                                          break;
                                                      case 5:
                                                          g = e.transform(r, s, l, i);
                                                          break;
                                                      case 6:
                                                          g = e.transform(r, s, l, i, o);
                                                          break;
                                                      case 7:
                                                          g = e.transform(
                                                              r,
                                                              s,
                                                              l,
                                                              i,
                                                              o,
                                                              a,
                                                          );
                                                          break;
                                                      case 8:
                                                          g = e.transform(
                                                              r,
                                                              s,
                                                              l,
                                                              i,
                                                              o,
                                                              a,
                                                              u,
                                                          );
                                                          break;
                                                      case 9:
                                                          g = e.transform(
                                                              r,
                                                              s,
                                                              l,
                                                              i,
                                                              o,
                                                              a,
                                                              u,
                                                              c,
                                                          );
                                                          break;
                                                      case 10:
                                                          g = e.transform(
                                                              r,
                                                              s,
                                                              l,
                                                              i,
                                                              o,
                                                              a,
                                                              u,
                                                              c,
                                                              d,
                                                          );
                                                  }
                                          }
                                          p.value = g;
                                      }
                                      return p;
                                  })(e, t, n, r, s, l, i, o, a, u, c, d);
                              default:
                                  throw 'unreachable';
                          }
                      })(e, t, r, s, l, i, o, a, u, c, d, h)
                    : (function(e, t, n) {
                          switch (201347067 & t.flags) {
                              case 1:
                                  return (function(e, t, n) {
                                      let r = !1;
                                      for (let s = 0; s < n.length; s++)
                                          ws(e, t, s, n[s]) && (r = !0);
                                      return r;
                                  })(e, t, n);
                              case 2:
                                  return (function(e, t, n) {
                                      const r = t.bindings;
                                      let s = !1;
                                      for (let l = 0; l < n.length; l++)
                                          Zr(e, t, l, n[l]) && (s = !0);
                                      if (s) {
                                          let s = '';
                                          for (let e = 0; e < n.length; e++)
                                              s += kl(n[e], r[e]);
                                          s = t.text.prefix + s;
                                          const l = Ir(e, t.nodeIndex).renderText;
                                          e.renderer.setValue(l, s);
                                      }
                                      return s;
                                  })(e, t, n);
                              case 16384:
                                  return (function(e, t, n) {
                                      const r = Dr(e, t.nodeIndex),
                                          s = r.instance;
                                      let l = !1,
                                          i = void 0;
                                      for (let o = 0; o < n.length; o++)
                                          qr(e, t, o, n[o]) &&
                                              ((l = !0), (i = _l(e, r, t, o, n[o], i)));
                                      return (
                                          i && s.ngOnChanges(i),
                                          65536 & t.flags &&
                                              kr(e, 256, t.nodeIndex) &&
                                              s.ngOnInit(),
                                          262144 & t.flags && s.ngDoCheck(),
                                          l
                                      );
                                  })(e, t, n);
                              case 32:
                              case 64:
                              case 128:
                                  return (function(e, t, n) {
                                      const r = t.bindings;
                                      let s = !1;
                                      for (let l = 0; l < n.length; l++)
                                          Zr(e, t, l, n[l]) && (s = !0);
                                      if (s) {
                                          const s = Or(e, t.nodeIndex);
                                          let l;
                                          switch (201347067 & t.flags) {
                                              case 32:
                                                  l = n;
                                                  break;
                                              case 64:
                                                  l = {};
                                                  for (let t = 0; t < n.length; t++)
                                                      l[r[t].name] = n[t];
                                                  break;
                                              case 128:
                                                  const e = n[0],
                                                      s = n.slice(1);
                                                  l = e.transform(...s);
                                          }
                                          s.value = l;
                                      }
                                      return s;
                                  })(e, t, n);
                              default:
                                  throw 'unreachable';
                          }
                      })(e, t, r);
            }
            function Ul(e) {
                const t = e.def;
                if (4 & t.nodeFlags)
                    for (let n = 0; n < t.nodes.length; n++) {
                        const r = t.nodes[n];
                        if (4 & r.flags) {
                            const t = Vr(e, n).template._projectedViews;
                            if (t)
                                for (let n = 0; n < t.length; n++) {
                                    const r = t[n];
                                    (r.state |= 32), Kr(r, e);
                                }
                        } else 0 == (4 & r.childFlags) && (n += r.childCount);
                    }
            }
            function $l(e, t, n, r, s, l, i, o, a, u, c, d, h) {
                return (
                    0 === n
                        ? (function(e, t, n, r, s, l, i, o, a, u, c, d) {
                              const h = t.bindings.length;
                              h > 0 && Wr(e, t, 0, n),
                                  h > 1 && Wr(e, t, 1, r),
                                  h > 2 && Wr(e, t, 2, s),
                                  h > 3 && Wr(e, t, 3, l),
                                  h > 4 && Wr(e, t, 4, i),
                                  h > 5 && Wr(e, t, 5, o),
                                  h > 6 && Wr(e, t, 6, a),
                                  h > 7 && Wr(e, t, 7, u),
                                  h > 8 && Wr(e, t, 8, c),
                                  h > 9 && Wr(e, t, 9, d);
                          })(e, t, r, s, l, i, o, a, u, c, d, h)
                        : (function(e, t, n) {
                              for (let r = 0; r < n.length; r++) Wr(e, t, r, n[r]);
                          })(e, t, r),
                    !1
                );
            }
            function zl(e, t) {
                if (Mr(e, t.nodeIndex).dirty)
                    throw Rr(
                        Pr.createDebugContext(e, t.nodeIndex),
                        `Query ${t.query.id} not dirty`,
                        `Query ${t.query.id} dirty`,
                        0 != (1 & e.state),
                    );
            }
            function Gl(e) {
                if (!(128 & e.state)) {
                    if (
                        (Wl(e, ql.Destroy),
                        Zl(e, ql.Destroy),
                        yl(e, 131072),
                        e.disposables)
                    )
                        for (let t = 0; t < e.disposables.length; t++) e.disposables[t]();
                    !(function(e) {
                        if (!(16 & e.state)) return;
                        const t = Yr(e);
                        if (t) {
                            const n = t.template._projectedViews;
                            n && (Os(n, n.indexOf(e)), Pr.dirtyParentQueries(e));
                        }
                    })(e),
                        e.renderer.destroyNode &&
                            (function(e) {
                                const t = e.def.nodes.length;
                                for (let n = 0; n < t; n++) {
                                    const t = e.def.nodes[n];
                                    1 & t.flags
                                        ? e.renderer.destroyNode(Vr(e, n).renderElement)
                                        : 2 & t.flags
                                        ? e.renderer.destroyNode(Ir(e, n).renderText)
                                        : (67108864 & t.flags || 134217728 & t.flags) &&
                                          Mr(e, n).destroy();
                                }
                            })(e),
                        ts(e) && e.renderer.destroy(),
                        (e.state |= 128);
                }
            }
            const ql = (function() {
                var e = {
                    CreateViewNodes: 0,
                    CheckNoChanges: 1,
                    CheckNoChangesProjectedViews: 2,
                    CheckAndUpdate: 3,
                    CheckAndUpdateProjectedViews: 4,
                    Destroy: 5,
                };
                return (
                    (e[e.CreateViewNodes] = 'CreateViewNodes'),
                    (e[e.CheckNoChanges] = 'CheckNoChanges'),
                    (e[e.CheckNoChangesProjectedViews] = 'CheckNoChangesProjectedViews'),
                    (e[e.CheckAndUpdate] = 'CheckAndUpdate'),
                    (e[e.CheckAndUpdateProjectedViews] = 'CheckAndUpdateProjectedViews'),
                    (e[e.Destroy] = 'Destroy'),
                    e
                );
            })();
            function Zl(e, t) {
                const n = e.def;
                if (33554432 & n.nodeFlags)
                    for (let r = 0; r < n.nodes.length; r++) {
                        const s = n.nodes[r];
                        33554432 & s.flags
                            ? Ql(Vr(e, r).componentView, t)
                            : 0 == (33554432 & s.childFlags) && (r += s.childCount);
                    }
            }
            function Wl(e, t) {
                const n = e.def;
                if (16777216 & n.nodeFlags)
                    for (let r = 0; r < n.nodes.length; r++) {
                        const s = n.nodes[r];
                        if (16777216 & s.flags) {
                            const n = Vr(e, r).viewContainer._embeddedViews;
                            for (let e = 0; e < n.length; e++) Ql(n[e], t);
                        } else 0 == (16777216 & s.childFlags) && (r += s.childCount);
                    }
            }
            function Ql(e, t) {
                const n = e.state;
                switch (t) {
                    case ql.CheckNoChanges:
                        0 == (128 & n) &&
                            (12 == (12 & n)
                                ? Hl(e)
                                : 64 & n && Kl(e, ql.CheckNoChangesProjectedViews));
                        break;
                    case ql.CheckNoChangesProjectedViews:
                        0 == (128 & n) && (32 & n ? Hl(e) : 64 & n && Kl(e, t));
                        break;
                    case ql.CheckAndUpdate:
                        0 == (128 & n) &&
                            (12 == (12 & n)
                                ? Ll(e)
                                : 64 & n && Kl(e, ql.CheckAndUpdateProjectedViews));
                        break;
                    case ql.CheckAndUpdateProjectedViews:
                        0 == (128 & n) && (32 & n ? Ll(e) : 64 & n && Kl(e, t));
                        break;
                    case ql.Destroy:
                        Gl(e);
                        break;
                    case ql.CreateViewNodes:
                        jl(e);
                }
            }
            function Kl(e, t) {
                Wl(e, t), Zl(e, t);
            }
            function Jl(e, t, n, r) {
                if (!(e.def.nodeFlags & t && e.def.nodeFlags & n)) return;
                const s = e.def.nodes.length;
                for (let l = 0; l < s; l++) {
                    const s = e.def.nodes[l];
                    if (s.flags & t && s.flags & n)
                        switch ((Pr.setCurrentNode(e, s.nodeIndex), r)) {
                            case 0:
                                Cl(e, s);
                                break;
                            case 1:
                                zl(e, s);
                        }
                    (s.childFlags & t && s.childFlags & n) || (l += s.childCount);
                }
            }
            let Yl = !1;
            function Xl(e, t, n, r, s, l) {
                const i = s.injector.get(mt);
                return Ml(ti(e, s, i, t, n), r, l);
            }
            function ei(e, t, n, r, s, l) {
                const i = s.injector.get(mt),
                    o = ti(e, s, new Oi(i), t, n),
                    a = di(r);
                return Vi(_i.create, Ml, null, [o, a, l]);
            }
            function ti(e, t, n, r, s) {
                const l = t.injector.get(wt),
                    i = t.injector.get(ln),
                    o = n.createRenderer(null, null);
                return {
                    ngModule: t,
                    injector: e,
                    projectableNodes: r,
                    selectorOrNode: s,
                    sanitizer: l,
                    rendererFactory: n,
                    renderer: o,
                    errorHandler: i,
                };
            }
            function ni(e, t, n, r) {
                const s = di(n);
                return Vi(_i.create, Ol, null, [e, t, s, r]);
            }
            function ri(e, t, n, r) {
                return (
                    (n = oi.get(t.element.componentProvider.provider.token) || di(n)),
                    Vi(_i.create, Pl, null, [e, t, n, r])
                );
            }
            function si(e, t, n, r) {
                return Qs(
                    e,
                    t,
                    n,
                    (function(e) {
                        const {hasOverrides: t, hasDeprecatedOverrides: n} = (function(
                            e,
                        ) {
                            let t = !1,
                                n = !1;
                            return 0 === li.size
                                ? {hasOverrides: t, hasDeprecatedOverrides: n}
                                : (e.providers.forEach(e => {
                                      const r = li.get(e.token);
                                      3840 & e.flags &&
                                          r &&
                                          ((t = !0), (n = n || r.deprecatedBehavior));
                                  }),
                                  e.modules.forEach(e => {
                                      ii.forEach((r, s) => {
                                          ne(s).providedIn === e &&
                                              ((t = !0), (n = n || r.deprecatedBehavior));
                                      });
                                  }),
                                  {hasOverrides: t, hasDeprecatedOverrides: n});
                        })(e);
                        return t
                            ? ((function(e) {
                                  for (let t = 0; t < e.providers.length; t++) {
                                      const r = e.providers[t];
                                      n && (r.flags |= 4096);
                                      const s = li.get(r.token);
                                      s &&
                                          ((r.flags = (-3841 & r.flags) | s.flags),
                                          (r.deps = ss(s.deps)),
                                          (r.value = s.value));
                                  }
                                  if (ii.size > 0) {
                                      let t = new Set(e.modules);
                                      ii.forEach((r, s) => {
                                          if (t.has(ne(s).providedIn)) {
                                              let t = {
                                                  token: s,
                                                  flags: r.flags | (n ? 4096 : 0),
                                                  deps: ss(r.deps),
                                                  value: r.value,
                                                  index: e.providers.length,
                                              };
                                              e.providers.push(t),
                                                  (e.providersByKey[Br(s)] = t);
                                          }
                                      });
                                  }
                              })((e = e.factory(() => Hr))),
                              e)
                            : e;
                    })(r),
                );
            }
            const li = new Map(),
                ii = new Map(),
                oi = new Map();
            function ai(e) {
                let t;
                li.set(e.token, e),
                    'function' == typeof e.token &&
                        (t = ne(e.token)) &&
                        'function' == typeof t.providedIn &&
                        ii.set(e.token, e);
            }
            function ui(e, t) {
                const n = os(t.viewDefFactory),
                    r = os(n.nodes[0].element.componentView);
                oi.set(e, r);
            }
            function ci() {
                li.clear(), ii.clear(), oi.clear();
            }
            function di(e) {
                if (0 === li.size) return e;
                const t = (function(e) {
                    const t = [];
                    let n = null;
                    for (let r = 0; r < e.nodes.length; r++) {
                        const s = e.nodes[r];
                        1 & s.flags && (n = s),
                            n &&
                                3840 & s.flags &&
                                li.has(s.provider.token) &&
                                (t.push(n.nodeIndex), (n = null));
                    }
                    return t;
                })(e);
                if (0 === t.length) return e;
                e = e.factory(() => Hr);
                for (let r = 0; r < t.length; r++) n(e, t[r]);
                return e;
                function n(e, t) {
                    for (let n = t + 1; n < e.nodes.length; n++) {
                        const t = e.nodes[n];
                        if (1 & t.flags) return;
                        if (3840 & t.flags) {
                            const e = t.provider,
                                n = li.get(e.token);
                            n &&
                                ((t.flags = (-3841 & t.flags) | n.flags),
                                (e.deps = ss(n.deps)),
                                (e.value = n.value));
                        }
                    }
                }
            }
            function hi(e, t, n, r, s, l, i, o, a, u, c, d, h) {
                const p = e.def.nodes[t];
                return (
                    Bl(e, p, n, r, s, l, i, o, a, u, c, d, h),
                    224 & p.flags ? Or(e, t).value : void 0
                );
            }
            function pi(e, t, n, r, s, l, i, o, a, u, c, d, h) {
                const p = e.def.nodes[t];
                return (
                    $l(e, p, n, r, s, l, i, o, a, u, c, d, h),
                    224 & p.flags ? Or(e, t).value : void 0
                );
            }
            function fi(e) {
                return Vi(_i.detectChanges, Ll, null, [e]);
            }
            function gi(e) {
                return Vi(_i.checkNoChanges, Hl, null, [e]);
            }
            function mi(e) {
                return Vi(_i.destroy, Gl, null, [e]);
            }
            const _i = (function() {
                var e = {
                    create: 0,
                    detectChanges: 1,
                    checkNoChanges: 2,
                    destroy: 3,
                    handleEvent: 4,
                };
                return (
                    (e[e.create] = 'create'),
                    (e[e.detectChanges] = 'detectChanges'),
                    (e[e.checkNoChanges] = 'checkNoChanges'),
                    (e[e.destroy] = 'destroy'),
                    (e[e.handleEvent] = 'handleEvent'),
                    e
                );
            })();
            let yi, vi, bi;
            function wi(e, t) {
                (vi = e), (bi = t);
            }
            function Ci(e, t, n, r) {
                return (
                    wi(e, t), Vi(_i.handleEvent, e.def.handleEvent, null, [e, t, n, r])
                );
            }
            function Ei(e, t) {
                if (128 & e.state) throw jr(_i[yi]);
                return (
                    wi(e, Ni(e, 0)),
                    e.def.updateDirectives(function(e, n, r, ...s) {
                        const l = e.def.nodes[n];
                        return (
                            0 === t ? Si(e, l, r, s) : Ti(e, l, r, s),
                            16384 & l.flags && wi(e, Ni(e, n)),
                            224 & l.flags ? Or(e, l.nodeIndex).value : void 0
                        );
                    }, e)
                );
            }
            function xi(e, t) {
                if (128 & e.state) throw jr(_i[yi]);
                return (
                    wi(e, Ai(e, 0)),
                    e.def.updateRenderer(function(e, n, r, ...s) {
                        const l = e.def.nodes[n];
                        return (
                            0 === t ? Si(e, l, r, s) : Ti(e, l, r, s),
                            3 & l.flags && wi(e, Ai(e, n)),
                            224 & l.flags ? Or(e, l.nodeIndex).value : void 0
                        );
                    }, e)
                );
            }
            function Si(e, t, n, r) {
                if (Bl(e, t, n, ...r)) {
                    const i = 1 === n ? r[0] : r;
                    if (16384 & t.flags) {
                        const n = {};
                        for (let e = 0; e < t.bindings.length; e++) {
                            const r = t.bindings[e],
                                o = i[e];
                            8 & r.flags &&
                                (n[
                                    ((s = r.nonMinifiedName),
                                    (l = void 0),
                                    (l = s.replace(/[$@]/g, '_')),
                                    `ng-reflect-${(s = l.replace(
                                        Ae,
                                        (...e) => '-' + e[1].toLowerCase(),
                                    ))}`)
                                ] = ke(o));
                        }
                        const r = t.parent,
                            o = Vr(e, r.nodeIndex).renderElement;
                        if (r.element.name)
                            for (let t in n) {
                                const r = n[t];
                                null != r
                                    ? e.renderer.setAttribute(o, t, r)
                                    : e.renderer.removeAttribute(o, t);
                            }
                        else
                            e.renderer.setValue(
                                o,
                                `bindings=${JSON.stringify(n, null, 2)}`,
                            );
                    }
                }
                var s, l;
            }
            function Ti(e, t, n, r) {
                $l(e, t, n, ...r);
            }
            function Ni(e, t) {
                for (let n = t; n < e.def.nodes.length; n++) {
                    const t = e.def.nodes[n];
                    if (16384 & t.flags && t.bindings && t.bindings.length) return n;
                }
                return null;
            }
            function Ai(e, t) {
                for (let n = t; n < e.def.nodes.length; n++) {
                    const t = e.def.nodes[n];
                    if (3 & t.flags && t.bindings && t.bindings.length) return n;
                }
                return null;
            }
            class ki {
                constructor(e, t) {
                    (this.view = e),
                        (this.nodeIndex = t),
                        null == t && (this.nodeIndex = t = 0),
                        (this.nodeDef = e.def.nodes[t]);
                    let n = this.nodeDef,
                        r = e;
                    for (; n && 0 == (1 & n.flags); ) n = n.parent;
                    if (!n) for (; !n && r; ) (n = Xr(r)), (r = r.parent);
                    (this.elDef = n), (this.elView = r);
                }
                get elOrCompView() {
                    return (
                        Vr(this.elView, this.elDef.nodeIndex).componentView || this.view
                    );
                }
                get injector() {
                    return zs(this.elView, this.elDef);
                }
                get component() {
                    return this.elOrCompView.component;
                }
                get context() {
                    return this.elOrCompView.context;
                }
                get providerTokens() {
                    const e = [];
                    if (this.elDef)
                        for (
                            let t = this.elDef.nodeIndex + 1;
                            t <= this.elDef.nodeIndex + this.elDef.childCount;
                            t++
                        ) {
                            const n = this.elView.def.nodes[t];
                            20224 & n.flags && e.push(n.provider.token),
                                (t += n.childCount);
                        }
                    return e;
                }
                get references() {
                    const e = {};
                    if (this.elDef) {
                        Ii(this.elView, this.elDef, e);
                        for (
                            let t = this.elDef.nodeIndex + 1;
                            t <= this.elDef.nodeIndex + this.elDef.childCount;
                            t++
                        ) {
                            const n = this.elView.def.nodes[t];
                            20224 & n.flags && Ii(this.elView, n, e), (t += n.childCount);
                        }
                    }
                    return e;
                }
                get componentRenderElement() {
                    const e = (function(e) {
                        for (; e && !ts(e); ) e = e.parent;
                        return e.parent ? Vr(e.parent, Xr(e).nodeIndex) : null;
                    })(this.elOrCompView);
                    return e ? e.renderElement : void 0;
                }
                get renderNode() {
                    return 2 & this.nodeDef.flags
                        ? es(this.view, this.nodeDef)
                        : es(this.elView, this.elDef);
                }
                logError(e, ...t) {
                    let n, r;
                    2 & this.nodeDef.flags
                        ? ((n = this.view.def), (r = this.nodeDef.nodeIndex))
                        : ((n = this.elView.def), (r = this.elDef.nodeIndex));
                    const s = (function(e, t) {
                        let n = -1;
                        for (let r = 0; r <= t; r++) 3 & e.nodes[r].flags && n++;
                        return n;
                    })(n, r);
                    let l = -1;
                    n.factory(() => (++l === s ? e.error.bind(e, ...t) : Hr)),
                        l < s &&
                            (e.error(
                                'Illegal state: the ViewDefinitionFactory did not call the logger!',
                            ),
                            e.error(...t));
                }
            }
            function Ii(e, t, n) {
                for (let r in t.references) n[r] = xl(e, t, t.references[r]);
            }
            function Vi(e, t, n, r) {
                const s = yi,
                    l = vi,
                    i = bi;
                try {
                    yi = e;
                    const a = t.apply(n, r);
                    return (vi = l), (bi = i), (yi = s), a;
                } catch (o) {
                    if (nn(o) || !vi) throw o;
                    throw (function(e, t) {
                        return (
                            e instanceof Error || (e = new Error(e.toString())),
                            Fr(e, t),
                            e
                        );
                    })(o, Di());
                }
            }
            function Di() {
                return vi ? new ki(vi, bi) : null;
            }
            class Oi {
                constructor(e) {
                    this.delegate = e;
                }
                createRenderer(e, t) {
                    return new Mi(this.delegate.createRenderer(e, t));
                }
                begin() {
                    this.delegate.begin && this.delegate.begin();
                }
                end() {
                    this.delegate.end && this.delegate.end();
                }
                whenRenderingDone() {
                    return this.delegate.whenRenderingDone
                        ? this.delegate.whenRenderingDone()
                        : Promise.resolve(null);
                }
            }
            class Mi {
                constructor(e) {
                    (this.delegate = e),
                        (this.debugContextFactory = Di),
                        (this.data = this.delegate.data);
                }
                createDebugContext(e) {
                    return this.debugContextFactory(e);
                }
                destroyNode(e) {
                    !(function(e) {
                        sr.delete(e.nativeNode);
                    })(lr(e)),
                        this.delegate.destroyNode && this.delegate.destroyNode(e);
                }
                destroy() {
                    this.delegate.destroy();
                }
                createElement(e, t) {
                    const n = this.delegate.createElement(e, t),
                        r = this.createDebugContext(n);
                    if (r) {
                        const t = new rr(n, null, r);
                        (t.name = e), ir(t);
                    }
                    return n;
                }
                createComment(e) {
                    const t = this.delegate.createComment(e),
                        n = this.createDebugContext(t);
                    return n && ir(new nr(t, null, n)), t;
                }
                createText(e) {
                    const t = this.delegate.createText(e),
                        n = this.createDebugContext(t);
                    return n && ir(new nr(t, null, n)), t;
                }
                appendChild(e, t) {
                    const n = lr(e),
                        r = lr(t);
                    n && r && n instanceof rr && n.addChild(r),
                        this.delegate.appendChild(e, t);
                }
                insertBefore(e, t, n) {
                    const r = lr(e),
                        s = lr(t),
                        l = lr(n);
                    r && s && r instanceof rr && r.insertBefore(l, s),
                        this.delegate.insertBefore(e, t, n);
                }
                removeChild(e, t) {
                    const n = lr(e),
                        r = lr(t);
                    n && r && n instanceof rr && n.removeChild(r),
                        this.delegate.removeChild(e, t);
                }
                selectRootElement(e, t) {
                    const n = this.delegate.selectRootElement(e, t),
                        r = Di();
                    return r && ir(new rr(n, null, r)), n;
                }
                setAttribute(e, t, n, r) {
                    const s = lr(e);
                    s && s instanceof rr && (s.attributes[r ? r + ':' + t : t] = n),
                        this.delegate.setAttribute(e, t, n, r);
                }
                removeAttribute(e, t, n) {
                    const r = lr(e);
                    r && r instanceof rr && (r.attributes[n ? n + ':' + t : t] = null),
                        this.delegate.removeAttribute(e, t, n);
                }
                addClass(e, t) {
                    const n = lr(e);
                    n && n instanceof rr && (n.classes[t] = !0),
                        this.delegate.addClass(e, t);
                }
                removeClass(e, t) {
                    const n = lr(e);
                    n && n instanceof rr && (n.classes[t] = !1),
                        this.delegate.removeClass(e, t);
                }
                setStyle(e, t, n, r) {
                    const s = lr(e);
                    s && s instanceof rr && (s.styles[t] = n),
                        this.delegate.setStyle(e, t, n, r);
                }
                removeStyle(e, t, n) {
                    const r = lr(e);
                    r && r instanceof rr && (r.styles[t] = null),
                        this.delegate.removeStyle(e, t, n);
                }
                setProperty(e, t, n) {
                    const r = lr(e);
                    r && r instanceof rr && (r.properties[t] = n),
                        this.delegate.setProperty(e, t, n);
                }
                listen(e, t, n) {
                    if ('string' != typeof e) {
                        const r = lr(e);
                        r && r.listeners.push(new tr(t, n));
                    }
                    return this.delegate.listen(e, t, n);
                }
                parentNode(e) {
                    return this.delegate.parentNode(e);
                }
                nextSibling(e) {
                    return this.delegate.nextSibling(e);
                }
                setValue(e, t) {
                    return this.delegate.setValue(e, t);
                }
            }
            function Pi(e, t, n) {
                return new Ri(e, t, n);
            }
            class Ri extends ht {
                constructor(e, t, n) {
                    super(),
                        (this.moduleType = e),
                        (this._bootstrapComponents = t),
                        (this._ngModuleDefFactory = n);
                }
                create(e) {
                    !(function() {
                        if (Yl) return;
                        Yl = !0;
                        const e = Tt()
                            ? {
                                  setCurrentNode: wi,
                                  createRootView: ei,
                                  createEmbeddedView: ni,
                                  createComponentView: ri,
                                  createNgModuleRef: si,
                                  overrideProvider: ai,
                                  overrideComponentView: ui,
                                  clearOverrides: ci,
                                  checkAndUpdateView: fi,
                                  checkNoChangesView: gi,
                                  destroyView: mi,
                                  createDebugContext: (e, t) => new ki(e, t),
                                  handleEvent: Ci,
                                  updateDirectives: Ei,
                                  updateRenderer: xi,
                              }
                            : {
                                  setCurrentNode: () => {},
                                  createRootView: Xl,
                                  createEmbeddedView: Ol,
                                  createComponentView: Pl,
                                  createNgModuleRef: Qs,
                                  overrideProvider: Hr,
                                  overrideComponentView: Hr,
                                  clearOverrides: Hr,
                                  checkAndUpdateView: Ll,
                                  checkNoChangesView: Hl,
                                  destroyView: Gl,
                                  createDebugContext: (e, t) => new ki(e, t),
                                  handleEvent: (e, t, n, r) =>
                                      e.def.handleEvent(e, t, n, r),
                                  updateDirectives: (e, t) =>
                                      e.def.updateDirectives(0 === t ? hi : pi, e),
                                  updateRenderer: (e, t) =>
                                      e.def.updateRenderer(0 === t ? hi : pi, e),
                              };
                        (Pr.setCurrentNode = e.setCurrentNode),
                            (Pr.createRootView = e.createRootView),
                            (Pr.createEmbeddedView = e.createEmbeddedView),
                            (Pr.createComponentView = e.createComponentView),
                            (Pr.createNgModuleRef = e.createNgModuleRef),
                            (Pr.overrideProvider = e.overrideProvider),
                            (Pr.overrideComponentView = e.overrideComponentView),
                            (Pr.clearOverrides = e.clearOverrides),
                            (Pr.checkAndUpdateView = e.checkAndUpdateView),
                            (Pr.checkNoChangesView = e.checkNoChangesView),
                            (Pr.destroyView = e.destroyView),
                            (Pr.resolveDep = gl),
                            (Pr.createDebugContext = e.createDebugContext),
                            (Pr.handleEvent = e.handleEvent),
                            (Pr.updateDirectives = e.updateDirectives),
                            (Pr.updateRenderer = e.updateRenderer),
                            (Pr.dirtyParentQueries = wl);
                    })();
                    const t = (function(e) {
                        const t = Array.from(e.providers),
                            n = Array.from(e.modules),
                            r = {};
                        for (const s in e.providersByKey) r[s] = e.providersByKey[s];
                        return {
                            factory: e.factory,
                            isRoot: e.isRoot,
                            providers: t,
                            modules: n,
                            providersByKey: r,
                        };
                    })(os(this._ngModuleDefFactory));
                    return Pr.createNgModuleRef(
                        this.moduleType,
                        e || Le.NULL,
                        this._bootstrapComponents,
                        t,
                    );
                }
            }
            class Fi {}
            class ji {
                constructor() {
                    (this.buffers = [Date.now()]),
                        (this.selectedChain = 'dry'),
                        (this.selectedSource = 'buffer'),
                        (this.gain = 1),
                        (this.pan = 0),
                        (this.delayTime = 1),
                        (this.delayGain = 0.5),
                        (this.distortion = 20),
                        (this.frequency = 350),
                        (this.detune = 0),
                        (this.filterGain = 0),
                        (this.Q = 1),
                        (this.type = 'lowpass'),
                        (this.curve = Hi(this.distortion)),
                        (this.real = [0, 0, 1, 0, 1]);
                }
                get distortionCompensation() {
                    return 1.2 - this.distortion / 20;
                }
                onCurveChange(e) {
                    (this.distortion = e), (this.curve = Hi(e));
                }
                onClick(e, t) {
                    'Play' === t.textContent.trim()
                        ? ((t.textContent = 'Stop'), e.start())
                        : (this.buffers[0] = Date.now());
                }
                onTimeDomain(e, t) {
                    const n = t.getContext('2d');
                    if (!n) return;
                    (n.fillStyle = 'rgb(200, 200, 200)'),
                        n.fillRect(0, 0, t.width, t.height),
                        (n.lineWidth = 2),
                        (n.strokeStyle = 'rgb(0, 0, 0)'),
                        n.beginPath();
                    const r = (1 * t.width) / e.length;
                    let s = 0;
                    for (let l = 0; l < e.length; l++) {
                        const i = ((e[l] / 128) * t.height) / 2;
                        0 === l ? n.moveTo(s, i) : n.lineTo(s, i), (s += r);
                    }
                    n.lineTo(t.width, t.height / 2), n.stroke();
                }
            }
            function Hi(e) {
                const t = new Float32Array(44100),
                    n = Math.PI / 180;
                for (let r = 0; r < 44100; ++r) {
                    const s = (2 * r) / 44100 - 1;
                    t[r] = ((3 + e) * s * 20 * n) / (Math.PI + e * Math.abs(s));
                }
                return t;
            }
            function Li(e, t, n, r) {
                var s,
                    l = arguments.length,
                    i =
                        l < 3
                            ? t
                            : null === r
                            ? (r = Object.getOwnPropertyDescriptor(t, n))
                            : r;
                if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
                    i = Reflect.decorate(e, t, n, r);
                else
                    for (var o = e.length - 1; o >= 0; o--)
                        (s = e[o]) &&
                            (i = (l < 3 ? s(i) : l > 3 ? s(t, n, i) : s(t, n)) || i);
                return l > 3 && i && Object.defineProperty(t, n, i), i;
            }
            function Bi(e, t) {
                if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
                    return Reflect.metadata(e, t);
            }
            function Ui(...e) {
                let t = e[e.length - 1];
                return N(t) ? (e.pop(), L(e, t)) : G(e);
            }
            function $i(e, t) {
                return 'function' == typeof t
                    ? n =>
                          n.pipe(
                              $i((n, r) => B(e(n, r)).pipe(F((e, s) => t(n, e, r, s)))),
                          )
                    : t => t.lift(new zi(e));
            }
            class zi {
                constructor(e) {
                    this.project = e;
                }
                call(e, t) {
                    return t.subscribe(new Gi(e, this.project));
                }
            }
            class Gi extends R {
                constructor(e, t) {
                    super(e), (this.project = t), (this.index = 0);
                }
                _next(e) {
                    let t;
                    const n = this.index++;
                    try {
                        t = this.project(e, n);
                    } catch (r) {
                        return void this.destination.error(r);
                    }
                    this._innerSub(t, e, n);
                }
                _innerSub(e, t, n) {
                    const r = this.innerSubscription;
                    r && r.unsubscribe();
                    const s = new A(this, void 0, void 0);
                    this.destination.add(s),
                        (this.innerSubscription = P(this, e, t, n, s));
                }
                _complete() {
                    const {innerSubscription: e} = this;
                    (e && !e.closed) || super._complete(), this.unsubscribe();
                }
                _unsubscribe() {
                    this.innerSubscription = null;
                }
                notifyComplete(e) {
                    this.destination.remove(e),
                        (this.innerSubscription = null),
                        this.isStopped && super._complete();
                }
                notifyNext(e, t, n, r, s) {
                    this.destination.next(t);
                }
            }
            function qi(e, t, n = 0) {
                e.setValueAtTime(t, n);
            }
            function Zi(e) {
                return (t, n) => {
                    Object.defineProperty(t, n, {
                        set(r) {
                            this[e] instanceof AudioParam
                                ? qi(this[e], r, this.context.currentTime)
                                : Object.defineProperty(t, n, {value: r});
                        },
                    });
                };
            }
            function Wi(e, t) {
                e && t && e.connect(t);
            }
            function Qi(e, t, n, r, ...s) {
                try {
                    new GainNode(e);
                } catch (l) {
                    const i = e[t]();
                    return Object.setPrototypeOf(i, n.prototype), n.init(i, r, ...s), i;
                }
            }
            class Ki extends AudioBufferSourceNode {
                constructor(e, t, n) {
                    const r = Qi(t, 'createBufferSource', Ki, null, n, e);
                    if (r) return r;
                    super(t), Ki.init(this, null, n, e);
                }
                set bufferSetter(e) {
                    this.buffer$.next(e);
                }
                ngOnDestroy() {
                    this.buffer$.complete();
                    try {
                        this.stop();
                    } catch (e) {}
                    this.disconnect();
                }
                static init(e, t, n, r) {
                    Wi(t, e), null !== n && e.start();
                    const s = new Wt();
                    (e.ended = s),
                        (e.onended = () => s.emit()),
                        (e.buffer$ = new S()),
                        e.buffer$
                            .pipe($i(e => ('string' == typeof e ? r.fetch(e) : Ui(e))))
                            .subscribe(t => {
                                e.buffer = t;
                            });
                }
            }
            Li(
                [Zi('detune'), Bi('design:type', Number)],
                Ki.prototype,
                'detuneParam',
                void 0,
            ),
                Li(
                    [Zi('playbackRate'), Bi('design:type', Number)],
                    Ki.prototype,
                    'playbackRateParam',
                    void 0,
                );
            const Ji = new re('Web Audio API context', {
                providedIn: 'root',
                factory: () => new AudioContext(),
            });
            class Yi {
                constructor(e) {
                    (this.context = e), (this.cache = new Map());
                }
                fetch(e) {
                    return new Promise((t, n) => {
                        if (this.cache.has(e)) return void t(this.cache.get(e));
                        const r = new XMLHttpRequest();
                        r.open('GET', e, !0),
                            (r.responseType = 'arraybuffer'),
                            (r.onerror = n),
                            (r.onabort = n),
                            (r.onload = () => {
                                this.context.decodeAudioData(
                                    r.response,
                                    n => {
                                        this.cache.set(e, n), t(n);
                                    },
                                    n,
                                );
                            }),
                            r.send();
                    });
                }
            }
            Yi.ngInjectableDef = te({
                factory: function() {
                    return new Yi(Ne(Ji));
                },
                token: Yi,
                providedIn: 'root',
            });
            const Xi = new re('Web Audio API audio node', {factory: () => null});
            class eo extends h {
                constructor(e, t) {
                    super();
                }
                schedule(e, t = 0) {
                    return this;
                }
            }
            class to extends eo {
                constructor(e, t) {
                    super(e, t),
                        (this.scheduler = e),
                        (this.work = t),
                        (this.pending = !1);
                }
                schedule(e, t = 0) {
                    if (this.closed) return this;
                    this.state = e;
                    const n = this.id,
                        r = this.scheduler;
                    return (
                        null != n && (this.id = this.recycleAsyncId(r, n, t)),
                        (this.pending = !0),
                        (this.delay = t),
                        (this.id = this.id || this.requestAsyncId(r, this.id, t)),
                        this
                    );
                }
                requestAsyncId(e, t, n = 0) {
                    return setInterval(e.flush.bind(e, this), n);
                }
                recycleAsyncId(e, t, n = 0) {
                    if (null !== n && this.delay === n && !1 === this.pending) return t;
                    clearInterval(t);
                }
                execute(e, t) {
                    if (this.closed) return new Error('executing a cancelled action');
                    this.pending = !1;
                    const n = this._execute(e, t);
                    if (n) return n;
                    !1 === this.pending &&
                        null != this.id &&
                        (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
                }
                _execute(e, t) {
                    let n = !1,
                        r = void 0;
                    try {
                        this.work(e);
                    } catch (s) {
                        (n = !0), (r = (!!s && s) || new Error(s));
                    }
                    if (n) return this.unsubscribe(), r;
                }
                _unsubscribe() {
                    const e = this.id,
                        t = this.scheduler,
                        n = t.actions,
                        r = n.indexOf(this);
                    (this.work = null),
                        (this.state = null),
                        (this.pending = !1),
                        (this.scheduler = null),
                        -1 !== r && n.splice(r, 1),
                        null != e && (this.id = this.recycleAsyncId(t, e, null)),
                        (this.delay = null);
                }
            }
            const no = (function() {
                class e {
                    constructor(t, n = e.now) {
                        (this.SchedulerAction = t), (this.now = n);
                    }
                    schedule(e, t = 0, n) {
                        return new this.SchedulerAction(this, e).schedule(n, t);
                    }
                }
                return (e.now = () => Date.now()), e;
            })();
            class ro extends no {
                constructor(e, t = no.now) {
                    super(e, () =>
                        ro.delegate && ro.delegate !== this ? ro.delegate.now() : t(),
                    ),
                        (this.actions = []),
                        (this.active = !1),
                        (this.scheduled = void 0);
                }
                schedule(e, t = 0, n) {
                    return ro.delegate && ro.delegate !== this
                        ? ro.delegate.schedule(e, t, n)
                        : super.schedule(e, t, n);
                }
                flush(e) {
                    const {actions: t} = this;
                    if (this.active) return void t.push(e);
                    let n;
                    this.active = !0;
                    do {
                        if ((n = e.execute(e.state, e.delay))) break;
                    } while ((e = t.shift()));
                    if (((this.active = !1), n)) {
                        for (; (e = t.shift()); ) e.unsubscribe();
                        throw n;
                    }
                }
            }
            const so = new ro(to);
            function lo(e = 0, t = so) {
                var n;
                return (
                    (a((n = e)) || !(n - parseFloat(n) + 1 >= 0) || e < 0) && (e = 0),
                    (t && 'function' == typeof t.schedule) || (t = so),
                    new v(
                        n => (
                            n.add(
                                t.schedule(io, e, {subscriber: n, counter: 0, period: e}),
                            ),
                            n
                        ),
                    )
                );
            }
            function io(e) {
                const {subscriber: t, counter: n, period: r} = e;
                t.next(n), this.schedule({subscriber: t, counter: n + 1, period: r}, r);
            }
            class oo extends to {
                constructor(e, t) {
                    super(e, t), (this.scheduler = e), (this.work = t);
                }
                requestAsyncId(e, t, n = 0) {
                    return null !== n && n > 0
                        ? super.requestAsyncId(e, t, n)
                        : (e.actions.push(this),
                          e.scheduled ||
                              (e.scheduled = requestAnimationFrame(() => e.flush(null))));
                }
                recycleAsyncId(e, t, n = 0) {
                    if ((null !== n && n > 0) || (null === n && this.delay > 0))
                        return super.recycleAsyncId(e, t, n);
                    0 === e.actions.length &&
                        (cancelAnimationFrame(t), (e.scheduled = void 0));
                }
            }
            class ao extends ro {
                flush(e) {
                    (this.active = !0), (this.scheduled = void 0);
                    const {actions: t} = this;
                    let n,
                        r = -1,
                        s = t.length;
                    e = e || t.shift();
                    do {
                        if ((n = e.execute(e.state, e.delay))) break;
                    } while (++r < s && (e = t.shift()));
                    if (((this.active = !1), n)) {
                        for (; ++r < s && (e = t.shift()); ) e.unsubscribe();
                        throw n;
                    }
                }
            }
            const uo = new ao(oo);
            function co(e) {
                return t => t.lift(new ho(e));
            }
            class ho {
                constructor(e) {
                    this.value = e;
                }
                call(e, t) {
                    return t.subscribe(new po(e, this.value));
                }
            }
            class po extends g {
                constructor(e, t) {
                    super(e), (this.value = t);
                }
                _next(e) {
                    this.destination.next(this.value);
                }
            }
            function fo(e, t, n) {
                return function(r) {
                    return r.lift(new go(e, t, n));
                };
            }
            class go {
                constructor(e, t, n) {
                    (this.nextOrObserver = e), (this.error = t), (this.complete = n);
                }
                call(e, t) {
                    return t.subscribe(
                        new mo(e, this.nextOrObserver, this.error, this.complete),
                    );
                }
            }
            class mo extends g {
                constructor(e, t, n, s) {
                    super(e),
                        (this._tapNext = y),
                        (this._tapError = y),
                        (this._tapComplete = y),
                        (this._tapError = n || y),
                        (this._tapComplete = s || y),
                        r(t)
                            ? ((this._context = this), (this._tapNext = t))
                            : t &&
                              ((this._context = t),
                              (this._tapNext = t.next || y),
                              (this._tapError = t.error || y),
                              (this._tapComplete = t.complete || y));
                }
                _next(e) {
                    try {
                        this._tapNext.call(this._context, e);
                    } catch (t) {
                        return void this.destination.error(t);
                    }
                    this.destination.next(e);
                }
                _error(e) {
                    try {
                        this._tapError.call(this._context, e);
                    } catch (e) {
                        return void this.destination.error(e);
                    }
                    this.destination.error(e);
                }
                _complete() {
                    try {
                        this._tapComplete.call(this._context);
                    } catch (e) {
                        return void this.destination.error(e);
                    }
                    return this.destination.complete();
                }
            }
            class _o extends AnalyserNode {
                constructor(e, t) {
                    const n = Qi(e, 'createAnalyser', _o, t);
                    if (n) return n;
                    super(e), _o.init(this, t);
                }
                ngOnDestroy() {
                    this.disconnect();
                }
                static init(e, t) {
                    Wi(t, e),
                        (e.frequencyByte$ = lo(0, uo).pipe(
                            co(new Uint8Array(e.frequencyBinCount)),
                            F(t =>
                                t.length === e.frequencyBinCount
                                    ? t
                                    : new Uint8Array(e.frequencyBinCount),
                            ),
                            fo(t => e.getByteFrequencyData(t)),
                        )),
                        (e.frequencyFloat$ = lo(0, uo).pipe(
                            co(new Float32Array(e.frequencyBinCount)),
                            F(t =>
                                t.length === e.frequencyBinCount
                                    ? t
                                    : new Float32Array(e.frequencyBinCount),
                            ),
                            fo(t => e.getFloatFrequencyData(t)),
                        )),
                        (e.timeByte$ = lo(0, uo).pipe(
                            co(new Uint8Array(e.fftSize)),
                            F(t =>
                                t.length === e.fftSize
                                    ? t
                                    : new Uint8Array(e.frequencyBinCount),
                            ),
                            fo(t => e.getByteTimeDomainData(t)),
                        )),
                        (e.timeFloat$ = lo(0, uo).pipe(
                            co(new Float32Array(e.fftSize)),
                            F(t =>
                                t.length === e.fftSize
                                    ? t
                                    : new Float32Array(e.frequencyBinCount),
                            ),
                            fo(t => e.getFloatTimeDomainData(t)),
                        ));
                }
            }
            class yo extends GainNode {
                set Output(e) {
                    this.disconnect(), Wi(this, e);
                }
                constructor(e, t) {
                    const n = Qi(e, 'createGain', yo, t);
                    if (n) return n;
                    super(e), yo.init(this, t);
                }
                ngOnDestroy() {
                    this.disconnect();
                }
                static init(e, t) {
                    Wi(t, e);
                }
            }
            class vo {}
            class bo {}
            const wo = new re('appBaseHref');
            class Co {
                constructor(e) {
                    (this._subject = new Wt()), (this._platformStrategy = e);
                    const t = this._platformStrategy.getBaseHref();
                    (this._baseHref = Co.stripTrailingSlash(Eo(t))),
                        this._platformStrategy.onPopState(e => {
                            this._subject.emit({
                                url: this.path(!0),
                                pop: !0,
                                state: e.state,
                                type: e.type,
                            });
                        });
                }
                path(e = !1) {
                    return this.normalize(this._platformStrategy.path(e));
                }
                isCurrentPathEqualTo(e, t = '') {
                    return this.path() == this.normalize(e + Co.normalizeQueryParams(t));
                }
                normalize(e) {
                    return Co.stripTrailingSlash(
                        (function(e, t) {
                            return e && t.startsWith(e) ? t.substring(e.length) : t;
                        })(this._baseHref, Eo(e)),
                    );
                }
                prepareExternalUrl(e) {
                    return (
                        e && '/' !== e[0] && (e = '/' + e),
                        this._platformStrategy.prepareExternalUrl(e)
                    );
                }
                go(e, t = '', n = null) {
                    this._platformStrategy.pushState(n, '', e, t);
                }
                replaceState(e, t = '', n = null) {
                    this._platformStrategy.replaceState(n, '', e, t);
                }
                forward() {
                    this._platformStrategy.forward();
                }
                back() {
                    this._platformStrategy.back();
                }
                subscribe(e, t, n) {
                    return this._subject.subscribe({next: e, error: t, complete: n});
                }
                static normalizeQueryParams(e) {
                    return e && '?' !== e[0] ? '?' + e : e;
                }
                static joinWithSlash(e, t) {
                    if (0 == e.length) return t;
                    if (0 == t.length) return e;
                    let n = 0;
                    return (
                        e.endsWith('/') && n++,
                        t.startsWith('/') && n++,
                        2 == n ? e + t.substring(1) : 1 == n ? e + t : e + '/' + t
                    );
                }
                static stripTrailingSlash(e) {
                    const t = e.match(/#|\?|$/),
                        n = (t && t.index) || e.length;
                    return e.slice(0, n - ('/' === e[n - 1] ? 1 : 0)) + e.slice(n);
                }
            }
            function Eo(e) {
                return e.replace(/\/index.html$/, '');
            }
            class xo extends bo {
                constructor(e, t) {
                    if (
                        (super(),
                        (this._platformLocation = e),
                        null == t && (t = this._platformLocation.getBaseHrefFromDOM()),
                        null == t)
                    )
                        throw new Error(
                            'No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document.',
                        );
                    this._baseHref = t;
                }
                onPopState(e) {
                    this._platformLocation.onPopState(e),
                        this._platformLocation.onHashChange(e);
                }
                getBaseHref() {
                    return this._baseHref;
                }
                prepareExternalUrl(e) {
                    return Co.joinWithSlash(this._baseHref, e);
                }
                path(e = !1) {
                    const t =
                            this._platformLocation.pathname +
                            Co.normalizeQueryParams(this._platformLocation.search),
                        n = this._platformLocation.hash;
                    return n && e ? `${t}${n}` : t;
                }
                pushState(e, t, n, r) {
                    const s = this.prepareExternalUrl(n + Co.normalizeQueryParams(r));
                    this._platformLocation.pushState(e, t, s);
                }
                replaceState(e, t, n, r) {
                    const s = this.prepareExternalUrl(n + Co.normalizeQueryParams(r));
                    this._platformLocation.replaceState(e, t, s);
                }
                forward() {
                    this._platformLocation.forward();
                }
                back() {
                    this._platformLocation.back();
                }
            }
            const So = void 0;
            var To = [
                'en',
                [['a', 'p'], ['AM', 'PM'], So],
                [['AM', 'PM'], So, So],
                [
                    ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                    [
                        'Sunday',
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                    ],
                    ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                ],
                So,
                [
                    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
                    [
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                        'Oct',
                        'Nov',
                        'Dec',
                    ],
                    [
                        'January',
                        'February',
                        'March',
                        'April',
                        'May',
                        'June',
                        'July',
                        'August',
                        'September',
                        'October',
                        'November',
                        'December',
                    ],
                ],
                So,
                [['B', 'A'], ['BC', 'AD'], ['Before Christ', 'Anno Domini']],
                0,
                [6, 0],
                ['M/d/yy', 'MMM d, y', 'MMMM d, y', 'EEEE, MMMM d, y'],
                ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
                ['{1}, {0}', So, "{1} 'at' {0}", So],
                [
                    '.',
                    ',',
                    ';',
                    '%',
                    '+',
                    '-',
                    'E',
                    '\xd7',
                    '\u2030',
                    '\u221e',
                    'NaN',
                    ':',
                ],
                ['#,##0.###', '#,##0%', '\xa4#,##0.00', '#E0'],
                '$',
                'US Dollar',
                {},
                function(e) {
                    let t = Math.floor(Math.abs(e)),
                        n = e.toString().replace(/^[^.]*\.?/, '').length;
                    return 1 === t && 0 === n ? 1 : 5;
                },
            ];
            const No = {},
                Ao = (function() {
                    var e = {Zero: 0, One: 1, Two: 2, Few: 3, Many: 4, Other: 5};
                    return (
                        (e[e.Zero] = 'Zero'),
                        (e[e.One] = 'One'),
                        (e[e.Two] = 'Two'),
                        (e[e.Few] = 'Few'),
                        (e[e.Many] = 'Many'),
                        (e[e.Other] = 'Other'),
                        e
                    );
                })(),
                ko = new re('UseV4Plurals');
            class Io {}
            class Vo extends Io {
                constructor(e, t) {
                    super(), (this.locale = e), (this.deprecatedPluralFn = t);
                }
                getPluralCategory(e, t) {
                    switch (
                        this.deprecatedPluralFn
                            ? this.deprecatedPluralFn(t || this.locale, e)
                            : (function(e) {
                                  return (function(e) {
                                      const t = e.toLowerCase().replace(/_/g, '-');
                                      let n = No[t];
                                      if (n) return n;
                                      const r = t.split('-')[0];
                                      if ((n = No[r])) return n;
                                      if ('en' === r) return To;
                                      throw new Error(
                                          `Missing locale data for the locale "${e}".`,
                                      );
                                  })(e)[18];
                              })(t || this.locale)(e)
                    ) {
                        case Ao.Zero:
                            return 'zero';
                        case Ao.One:
                            return 'one';
                        case Ao.Two:
                            return 'two';
                        case Ao.Few:
                            return 'few';
                        case Ao.Many:
                            return 'many';
                        default:
                            return 'other';
                    }
                }
            }
            class Do {
                constructor(e, t, n, r) {
                    (this.$implicit = e),
                        (this.ngForOf = t),
                        (this.index = n),
                        (this.count = r);
                }
                get first() {
                    return 0 === this.index;
                }
                get last() {
                    return this.index === this.count - 1;
                }
                get even() {
                    return this.index % 2 == 0;
                }
                get odd() {
                    return !this.even;
                }
            }
            class Oo {
                constructor(e, t, n) {
                    (this._viewContainer = e),
                        (this._template = t),
                        (this._differs = n),
                        (this._ngForOfDirty = !0),
                        (this._differ = null);
                }
                set ngForOf(e) {
                    (this._ngForOf = e), (this._ngForOfDirty = !0);
                }
                set ngForTrackBy(e) {
                    Tt() &&
                        null != e &&
                        'function' != typeof e &&
                        console &&
                        console.warn &&
                        console.warn(
                            `trackBy must be a function, but received ${JSON.stringify(
                                e,
                            )}. ` +
                                'See https://angular.io/docs/ts/latest/api/common/index/NgFor-directive.html#!#change-propagation for more information.',
                        ),
                        (this._trackByFn = e);
                }
                get ngForTrackBy() {
                    return this._trackByFn;
                }
                set ngForTemplate(e) {
                    e && (this._template = e);
                }
                ngDoCheck() {
                    if (this._ngForOfDirty) {
                        this._ngForOfDirty = !1;
                        const n = this._ngForOf;
                        if (!this._differ && n)
                            try {
                                this._differ = this._differs
                                    .find(n)
                                    .create(this.ngForTrackBy);
                            } catch (t) {
                                throw new Error(
                                    `Cannot find a differ supporting object '${n}' of type '${((e = n),
                                    e.name ||
                                        typeof e)}'. NgFor only supports binding to Iterables such as Arrays.`,
                                );
                            }
                    }
                    var e;
                    if (this._differ) {
                        const e = this._differ.diff(this._ngForOf);
                        e && this._applyChanges(e);
                    }
                }
                _applyChanges(e) {
                    const t = [];
                    e.forEachOperation((e, n, r) => {
                        if (null == e.previousIndex) {
                            const n = this._viewContainer.createEmbeddedView(
                                    this._template,
                                    new Do(null, this._ngForOf, -1, -1),
                                    r,
                                ),
                                s = new Mo(e, n);
                            t.push(s);
                        } else if (null == r) this._viewContainer.remove(n);
                        else {
                            const s = this._viewContainer.get(n);
                            this._viewContainer.move(s, r);
                            const l = new Mo(e, s);
                            t.push(l);
                        }
                    });
                    for (let n = 0; n < t.length; n++)
                        this._perViewChange(t[n].view, t[n].record);
                    for (let n = 0, r = this._viewContainer.length; n < r; n++) {
                        const e = this._viewContainer.get(n);
                        (e.context.index = n),
                            (e.context.count = r),
                            (e.context.ngForOf = this._ngForOf);
                    }
                    e.forEachIdentityChange(e => {
                        this._viewContainer.get(e.currentIndex).context.$implicit =
                            e.item;
                    });
                }
                _perViewChange(e, t) {
                    e.context.$implicit = t.item;
                }
                static ngTemplateContextGuard(e, t) {
                    return !0;
                }
            }
            class Mo {
                constructor(e, t) {
                    (this.record = e), (this.view = t);
                }
            }
            class Po {
                constructor(e, t) {
                    (this._viewContainerRef = e),
                        (this._templateRef = t),
                        (this._created = !1);
                }
                create() {
                    (this._created = !0),
                        this._viewContainerRef.createEmbeddedView(this._templateRef);
                }
                destroy() {
                    (this._created = !1), this._viewContainerRef.clear();
                }
                enforceState(e) {
                    e && !this._created
                        ? this.create()
                        : !e && this._created && this.destroy();
                }
            }
            class Ro {
                constructor() {
                    (this._defaultUsed = !1),
                        (this._caseCount = 0),
                        (this._lastCaseCheckIndex = 0),
                        (this._lastCasesMatched = !1);
                }
                set ngSwitch(e) {
                    (this._ngSwitch = e),
                        0 === this._caseCount && this._updateDefaultCases(!0);
                }
                _addCase() {
                    return this._caseCount++;
                }
                _addDefault(e) {
                    this._defaultViews || (this._defaultViews = []),
                        this._defaultViews.push(e);
                }
                _matchCase(e) {
                    const t = e == this._ngSwitch;
                    return (
                        (this._lastCasesMatched = this._lastCasesMatched || t),
                        this._lastCaseCheckIndex++,
                        this._lastCaseCheckIndex === this._caseCount &&
                            (this._updateDefaultCases(!this._lastCasesMatched),
                            (this._lastCaseCheckIndex = 0),
                            (this._lastCasesMatched = !1)),
                        t
                    );
                }
                _updateDefaultCases(e) {
                    if (this._defaultViews && e !== this._defaultUsed) {
                        this._defaultUsed = e;
                        for (let t = 0; t < this._defaultViews.length; t++)
                            this._defaultViews[t].enforceState(e);
                    }
                }
            }
            class Fo {
                constructor(e, t, n) {
                    (this.ngSwitch = n), n._addCase(), (this._view = new Po(e, t));
                }
                ngDoCheck() {
                    this._view.enforceState(this.ngSwitch._matchCase(this.ngSwitchCase));
                }
            }
            class jo {}
            const Ho = new re('DocumentToken'),
                Lo = 'server';
            class Bo extends MediaElementAudioSourceNode {
                constructor(e, {nativeElement: t}) {
                    try {
                        new GainNode(e);
                    } catch (n) {
                        const r = e.createMediaElementSource(t);
                        return Object.setPrototypeOf(r, Bo.prototype), r;
                    }
                    super(e, {mediaElement: t});
                }
                ngOnDestroy() {
                    this.disconnect();
                }
            }
            class Uo extends OscillatorNode {
                constructor(e, t) {
                    const n = Qi(e, 'createOscillator', Uo, null, t);
                    if (n) return n;
                    super(e), Uo.init(this, null, t);
                }
                set periodicWave(e) {
                    this.setPeriodicWave(e);
                }
                ngOnDestroy() {
                    try {
                        this.stop();
                    } catch (e) {}
                    this.disconnect();
                }
                static init(e, t, n) {
                    Wi(t, e), null !== n && e.start();
                    const r = new Wt();
                    (e.ended = r), (e.onended = () => r.emit());
                }
            }
            Li(
                [Zi('detune'), Bi('design:type', Number)],
                Uo.prototype,
                'detuneParam',
                void 0,
            ),
                Li(
                    [Zi('frequency'), Bi('design:type', Number)],
                    Uo.prototype,
                    'frequencyParam',
                    void 0,
                );
            class $o extends GainNode {
                constructor(e, t) {
                    const n = Qi(e, 'createGain', $o, t);
                    if (n) return n;
                    super(e), $o.init(this, t);
                }
                ngOnDestroy() {
                    this.disconnect();
                }
                static init(e, t) {
                    Wi(t, e);
                }
            }
            function zo(e, t) {
                return new v(n => {
                    const r = e.length;
                    if (0 === r) return void n.complete();
                    const s = new Array(r);
                    let l = 0,
                        i = 0;
                    for (let o = 0; o < r; o++) {
                        const a = B(e[o]);
                        let u = !1;
                        n.add(
                            a.subscribe({
                                next: e => {
                                    u || ((u = !0), i++), (s[o] = e);
                                },
                                error: e => n.error(e),
                                complete: () => {
                                    (++l !== r && u) ||
                                        (i === r &&
                                            n.next(
                                                t
                                                    ? t.reduce(
                                                          (e, t, n) => ((e[t] = s[n]), e),
                                                          {},
                                                      )
                                                    : s,
                                            ),
                                        n.complete());
                                },
                            }),
                        );
                    }
                });
            }
            Li([Zi('gain'), Bi('design:type', Number)], $o.prototype, 'GainNode', void 0);
            let Go = null;
            function qo() {
                return Go;
            }
            class Zo {
                constructor() {
                    this.resourceLoaderType = null;
                }
                get attrToPropMap() {
                    return this._attrToPropMap;
                }
                set attrToPropMap(e) {
                    this._attrToPropMap = e;
                }
            }
            class Wo extends Zo {
                constructor() {
                    super(), (this._animationPrefix = null), (this._transitionEnd = null);
                    try {
                        const t = this.createElement('div', document);
                        if (null != this.getStyle(t, 'animationName'))
                            this._animationPrefix = '';
                        else {
                            const e = ['Webkit', 'Moz', 'O', 'ms'];
                            for (let n = 0; n < e.length; n++)
                                if (null != this.getStyle(t, e[n] + 'AnimationName')) {
                                    this._animationPrefix =
                                        '-' + e[n].toLowerCase() + '-';
                                    break;
                                }
                        }
                        const n = {
                            WebkitTransition: 'webkitTransitionEnd',
                            MozTransition: 'transitionend',
                            OTransition: 'oTransitionEnd otransitionend',
                            transition: 'transitionend',
                        };
                        Object.keys(n).forEach(e => {
                            null != this.getStyle(t, e) && (this._transitionEnd = n[e]);
                        });
                    } catch (e) {
                        (this._animationPrefix = null), (this._transitionEnd = null);
                    }
                }
                getDistributedNodes(e) {
                    return e.getDistributedNodes();
                }
                resolveAndSetHref(e, t, n) {
                    e.href = null == n ? t : t + '/../' + n;
                }
                supportsDOMEvents() {
                    return !0;
                }
                supportsNativeShadowDOM() {
                    return 'function' == typeof document.body.createShadowRoot;
                }
                getAnimationPrefix() {
                    return this._animationPrefix ? this._animationPrefix : '';
                }
                getTransitionEnd() {
                    return this._transitionEnd ? this._transitionEnd : '';
                }
                supportsAnimation() {
                    return null != this._animationPrefix && null != this._transitionEnd;
                }
            }
            const Qo = {
                    class: 'className',
                    innerHtml: 'innerHTML',
                    readonly: 'readOnly',
                    tabindex: 'tabIndex',
                },
                Ko = 3,
                Jo = {
                    '\b': 'Backspace',
                    '\t': 'Tab',
                    '\x7f': 'Delete',
                    '\x1b': 'Escape',
                    Del: 'Delete',
                    Esc: 'Escape',
                    Left: 'ArrowLeft',
                    Right: 'ArrowRight',
                    Up: 'ArrowUp',
                    Down: 'ArrowDown',
                    Menu: 'ContextMenu',
                    Scroll: 'ScrollLock',
                    Win: 'OS',
                },
                Yo = {
                    A: '1',
                    B: '2',
                    C: '3',
                    D: '4',
                    E: '5',
                    F: '6',
                    G: '7',
                    H: '8',
                    I: '9',
                    J: '*',
                    K: '+',
                    M: '-',
                    N: '.',
                    O: '/',
                    '`': '0',
                    '\x90': 'NumLock',
                };
            let Xo;
            ae.Node &&
                (Xo =
                    ae.Node.prototype.contains ||
                    function(e) {
                        return !!(16 & this.compareDocumentPosition(e));
                    });
            class ea extends Wo {
                parse(e) {
                    throw new Error('parse not implemented');
                }
                static makeCurrent() {
                    var e;
                    (e = new ea()), Go || (Go = e);
                }
                hasProperty(e, t) {
                    return t in e;
                }
                setProperty(e, t, n) {
                    e[t] = n;
                }
                getProperty(e, t) {
                    return e[t];
                }
                invoke(e, t, n) {
                    e[t](...n);
                }
                logError(e) {
                    window.console && (console.error ? console.error(e) : console.log(e));
                }
                log(e) {
                    window.console && window.console.log && window.console.log(e);
                }
                logGroup(e) {
                    window.console && window.console.group && window.console.group(e);
                }
                logGroupEnd() {
                    window.console &&
                        window.console.groupEnd &&
                        window.console.groupEnd();
                }
                get attrToPropMap() {
                    return Qo;
                }
                contains(e, t) {
                    return Xo.call(e, t);
                }
                querySelector(e, t) {
                    return e.querySelector(t);
                }
                querySelectorAll(e, t) {
                    return e.querySelectorAll(t);
                }
                on(e, t, n) {
                    e.addEventListener(t, n, !1);
                }
                onAndCancel(e, t, n) {
                    return (
                        e.addEventListener(t, n, !1),
                        () => {
                            e.removeEventListener(t, n, !1);
                        }
                    );
                }
                dispatchEvent(e, t) {
                    e.dispatchEvent(t);
                }
                createMouseEvent(e) {
                    const t = this.getDefaultDocument().createEvent('MouseEvent');
                    return t.initEvent(e, !0, !0), t;
                }
                createEvent(e) {
                    const t = this.getDefaultDocument().createEvent('Event');
                    return t.initEvent(e, !0, !0), t;
                }
                preventDefault(e) {
                    e.preventDefault(), (e.returnValue = !1);
                }
                isPrevented(e) {
                    return (
                        e.defaultPrevented || (null != e.returnValue && !e.returnValue)
                    );
                }
                getInnerHTML(e) {
                    return e.innerHTML;
                }
                getTemplateContent(e) {
                    return 'content' in e && this.isTemplateElement(e) ? e.content : null;
                }
                getOuterHTML(e) {
                    return e.outerHTML;
                }
                nodeName(e) {
                    return e.nodeName;
                }
                nodeValue(e) {
                    return e.nodeValue;
                }
                type(e) {
                    return e.type;
                }
                content(e) {
                    return this.hasProperty(e, 'content') ? e.content : e;
                }
                firstChild(e) {
                    return e.firstChild;
                }
                nextSibling(e) {
                    return e.nextSibling;
                }
                parentElement(e) {
                    return e.parentNode;
                }
                childNodes(e) {
                    return e.childNodes;
                }
                childNodesAsList(e) {
                    const t = e.childNodes,
                        n = new Array(t.length);
                    for (let r = 0; r < t.length; r++) n[r] = t[r];
                    return n;
                }
                clearNodes(e) {
                    for (; e.firstChild; ) e.removeChild(e.firstChild);
                }
                appendChild(e, t) {
                    e.appendChild(t);
                }
                removeChild(e, t) {
                    e.removeChild(t);
                }
                replaceChild(e, t, n) {
                    e.replaceChild(t, n);
                }
                remove(e) {
                    return e.parentNode && e.parentNode.removeChild(e), e;
                }
                insertBefore(e, t, n) {
                    e.insertBefore(n, t);
                }
                insertAllBefore(e, t, n) {
                    n.forEach(n => e.insertBefore(n, t));
                }
                insertAfter(e, t, n) {
                    e.insertBefore(n, t.nextSibling);
                }
                setInnerHTML(e, t) {
                    e.innerHTML = t;
                }
                getText(e) {
                    return e.textContent;
                }
                setText(e, t) {
                    e.textContent = t;
                }
                getValue(e) {
                    return e.value;
                }
                setValue(e, t) {
                    e.value = t;
                }
                getChecked(e) {
                    return e.checked;
                }
                setChecked(e, t) {
                    e.checked = t;
                }
                createComment(e) {
                    return this.getDefaultDocument().createComment(e);
                }
                createTemplate(e) {
                    const t = this.getDefaultDocument().createElement('template');
                    return (t.innerHTML = e), t;
                }
                createElement(e, t) {
                    return (t = t || this.getDefaultDocument()).createElement(e);
                }
                createElementNS(e, t, n) {
                    return (n = n || this.getDefaultDocument()).createElementNS(e, t);
                }
                createTextNode(e, t) {
                    return (t = t || this.getDefaultDocument()).createTextNode(e);
                }
                createScriptTag(e, t, n) {
                    const r = (n = n || this.getDefaultDocument()).createElement(
                        'SCRIPT',
                    );
                    return r.setAttribute(e, t), r;
                }
                createStyleElement(e, t) {
                    const n = (t = t || this.getDefaultDocument()).createElement('style');
                    return this.appendChild(n, this.createTextNode(e, t)), n;
                }
                createShadowRoot(e) {
                    return e.createShadowRoot();
                }
                getShadowRoot(e) {
                    return e.shadowRoot;
                }
                getHost(e) {
                    return e.host;
                }
                clone(e) {
                    return e.cloneNode(!0);
                }
                getElementsByClassName(e, t) {
                    return e.getElementsByClassName(t);
                }
                getElementsByTagName(e, t) {
                    return e.getElementsByTagName(t);
                }
                classList(e) {
                    return Array.prototype.slice.call(e.classList, 0);
                }
                addClass(e, t) {
                    e.classList.add(t);
                }
                removeClass(e, t) {
                    e.classList.remove(t);
                }
                hasClass(e, t) {
                    return e.classList.contains(t);
                }
                setStyle(e, t, n) {
                    e.style[t] = n;
                }
                removeStyle(e, t) {
                    e.style[t] = '';
                }
                getStyle(e, t) {
                    return e.style[t];
                }
                hasStyle(e, t, n) {
                    const r = this.getStyle(e, t) || '';
                    return n ? r == n : r.length > 0;
                }
                tagName(e) {
                    return e.tagName;
                }
                attributeMap(e) {
                    const t = new Map(),
                        n = e.attributes;
                    for (let r = 0; r < n.length; r++) {
                        const e = n.item(r);
                        t.set(e.name, e.value);
                    }
                    return t;
                }
                hasAttribute(e, t) {
                    return e.hasAttribute(t);
                }
                hasAttributeNS(e, t, n) {
                    return e.hasAttributeNS(t, n);
                }
                getAttribute(e, t) {
                    return e.getAttribute(t);
                }
                getAttributeNS(e, t, n) {
                    return e.getAttributeNS(t, n);
                }
                setAttribute(e, t, n) {
                    e.setAttribute(t, n);
                }
                setAttributeNS(e, t, n, r) {
                    e.setAttributeNS(t, n, r);
                }
                removeAttribute(e, t) {
                    e.removeAttribute(t);
                }
                removeAttributeNS(e, t, n) {
                    e.removeAttributeNS(t, n);
                }
                templateAwareRoot(e) {
                    return this.isTemplateElement(e) ? this.content(e) : e;
                }
                createHtmlDocument() {
                    return document.implementation.createHTMLDocument('fakeTitle');
                }
                getDefaultDocument() {
                    return document;
                }
                getBoundingClientRect(e) {
                    try {
                        return e.getBoundingClientRect();
                    } catch (t) {
                        return {
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            width: 0,
                            height: 0,
                        };
                    }
                }
                getTitle(e) {
                    return e.title;
                }
                setTitle(e, t) {
                    e.title = t || '';
                }
                elementMatches(e, t) {
                    return (
                        !!this.isElementNode(e) &&
                        ((e.matches && e.matches(t)) ||
                            (e.msMatchesSelector && e.msMatchesSelector(t)) ||
                            (e.webkitMatchesSelector && e.webkitMatchesSelector(t)))
                    );
                }
                isTemplateElement(e) {
                    return this.isElementNode(e) && 'TEMPLATE' === e.nodeName;
                }
                isTextNode(e) {
                    return e.nodeType === Node.TEXT_NODE;
                }
                isCommentNode(e) {
                    return e.nodeType === Node.COMMENT_NODE;
                }
                isElementNode(e) {
                    return e.nodeType === Node.ELEMENT_NODE;
                }
                hasShadowRoot(e) {
                    return null != e.shadowRoot && e instanceof HTMLElement;
                }
                isShadowRoot(e) {
                    return e instanceof DocumentFragment;
                }
                importIntoDoc(e) {
                    return document.importNode(this.templateAwareRoot(e), !0);
                }
                adoptNode(e) {
                    return document.adoptNode(e);
                }
                getHref(e) {
                    return e.getAttribute('href');
                }
                getEventKey(e) {
                    let t = e.key;
                    if (null == t) {
                        if (null == (t = e.keyIdentifier)) return 'Unidentified';
                        t.startsWith('U+') &&
                            ((t = String.fromCharCode(parseInt(t.substring(2), 16))),
                            e.location === Ko && Yo.hasOwnProperty(t) && (t = Yo[t]));
                    }
                    return Jo[t] || t;
                }
                getGlobalEventTarget(e, t) {
                    return 'window' === t
                        ? window
                        : 'document' === t
                        ? e
                        : 'body' === t
                        ? e.body
                        : null;
                }
                getHistory() {
                    return window.history;
                }
                getLocation() {
                    return window.location;
                }
                getBaseHref(e) {
                    const t =
                        na || (na = document.querySelector('base'))
                            ? na.getAttribute('href')
                            : null;
                    return null == t
                        ? null
                        : ((n = t),
                          ta || (ta = document.createElement('a')),
                          ta.setAttribute('href', n),
                          '/' === ta.pathname.charAt(0)
                              ? ta.pathname
                              : '/' + ta.pathname);
                    var n;
                }
                resetBaseElement() {
                    na = null;
                }
                getUserAgent() {
                    return window.navigator.userAgent;
                }
                setData(e, t, n) {
                    this.setAttribute(e, 'data-' + t, n);
                }
                getData(e, t) {
                    return this.getAttribute(e, 'data-' + t);
                }
                getComputedStyle(e) {
                    return getComputedStyle(e);
                }
                supportsWebAnimation() {
                    return 'function' == typeof Element.prototype.animate;
                }
                performanceNow() {
                    return window.performance && window.performance.now
                        ? window.performance.now()
                        : new Date().getTime();
                }
                supportsCookies() {
                    return !0;
                }
                getCookie(e) {
                    return (function(e, t) {
                        t = encodeURIComponent(t);
                        for (const n of e.split(';')) {
                            const e = n.indexOf('='),
                                [r, s] =
                                    -1 == e ? [n, ''] : [n.slice(0, e), n.slice(e + 1)];
                            if (r.trim() === t) return decodeURIComponent(s);
                        }
                        return null;
                    })(document.cookie, e);
                }
                setCookie(e, t) {
                    document.cookie = encodeURIComponent(e) + '=' + encodeURIComponent(t);
                }
            }
            let ta,
                na = null;
            const ra = Ho;
            function sa() {
                return !!window.history.pushState;
            }
            const la = (function() {
                    class e extends vo {
                        constructor(e) {
                            super(), (this._doc = e), this._init();
                        }
                        _init() {
                            (this.location = qo().getLocation()),
                                (this._history = qo().getHistory());
                        }
                        getBaseHrefFromDOM() {
                            return qo().getBaseHref(this._doc);
                        }
                        onPopState(e) {
                            qo()
                                .getGlobalEventTarget(this._doc, 'window')
                                .addEventListener('popstate', e, !1);
                        }
                        onHashChange(e) {
                            qo()
                                .getGlobalEventTarget(this._doc, 'window')
                                .addEventListener('hashchange', e, !1);
                        }
                        get pathname() {
                            return this.location.pathname;
                        }
                        get search() {
                            return this.location.search;
                        }
                        get hash() {
                            return this.location.hash;
                        }
                        set pathname(e) {
                            this.location.pathname = e;
                        }
                        pushState(e, t, n) {
                            sa()
                                ? this._history.pushState(e, t, n)
                                : (this.location.hash = n);
                        }
                        replaceState(e, t, n) {
                            sa()
                                ? this._history.replaceState(e, t, n)
                                : (this.location.hash = n);
                        }
                        forward() {
                            this._history.forward();
                        }
                        back() {
                            this._history.back();
                        }
                    }
                    return (
                        (e.ctorParameters = () => [
                            {type: void 0, decorators: [{type: ve, args: [ra]}]},
                        ]),
                        e
                    );
                })(),
                ia = new re('TRANSITION_ID');
            function oa(e, t, n) {
                return () => {
                    n.get(cn).donePromise.then(() => {
                        const n = qo();
                        Array.prototype.slice
                            .apply(n.querySelectorAll(t, 'style[ng-transition]'))
                            .filter(t => n.getAttribute(t, 'ng-transition') === e)
                            .forEach(e => n.remove(e));
                    });
                };
            }
            const aa = [{provide: un, useFactory: oa, deps: [ia, ra, Le], multi: !0}];
            class ua {
                static init() {
                    var e;
                    (e = new ua()), (Ln = e);
                }
                addToWindow(e) {
                    (ae.getAngularTestability = (t, n = !0) => {
                        const r = e.findTestabilityInTree(t, n);
                        if (null == r)
                            throw new Error('Could not find testability for element.');
                        return r;
                    }),
                        (ae.getAllAngularTestabilities = () => e.getAllTestabilities()),
                        (ae.getAllAngularRootElements = () => e.getAllRootElements()),
                        ae.frameworkStabilizers || (ae.frameworkStabilizers = []),
                        ae.frameworkStabilizers.push(e => {
                            const t = ae.getAllAngularTestabilities();
                            let n = t.length,
                                r = !1;
                            const s = function(t) {
                                (r = r || t), 0 == --n && e(r);
                            };
                            t.forEach(function(e) {
                                e.whenStable(s);
                            });
                        });
                }
                findTestabilityInTree(e, t, n) {
                    if (null == t) return null;
                    const r = e.getTestability(t);
                    return null != r
                        ? r
                        : n
                        ? qo().isShadowRoot(t)
                            ? this.findTestabilityInTree(e, qo().getHost(t), !0)
                            : this.findTestabilityInTree(e, qo().parentElement(t), !0)
                        : null;
                }
            }
            function ca(e, t) {
                ('undefined' != typeof COMPILED && COMPILED) ||
                    ((ae.ng = ae.ng || {})[e] = t);
            }
            const da = {ApplicationRef: Wn, NgZone: kn};
            function ha(e) {
                return lr(e);
            }
            const pa = new re('EventManagerPlugins');
            class fa {
                constructor(e, t) {
                    (this._zone = t),
                        (this._eventNameToPlugin = new Map()),
                        e.forEach(e => (e.manager = this)),
                        (this._plugins = e.slice().reverse());
                }
                addEventListener(e, t, n) {
                    return this._findPluginFor(t).addEventListener(e, t, n);
                }
                addGlobalEventListener(e, t, n) {
                    return this._findPluginFor(t).addGlobalEventListener(e, t, n);
                }
                getZone() {
                    return this._zone;
                }
                _findPluginFor(e) {
                    const t = this._eventNameToPlugin.get(e);
                    if (t) return t;
                    const n = this._plugins;
                    for (let r = 0; r < n.length; r++) {
                        const t = n[r];
                        if (t.supports(e)) return this._eventNameToPlugin.set(e, t), t;
                    }
                    throw new Error(`No event manager plugin found for event ${e}`);
                }
            }
            class ga {
                constructor(e) {
                    this._doc = e;
                }
                addGlobalEventListener(e, t, n) {
                    const r = qo().getGlobalEventTarget(this._doc, e);
                    if (!r)
                        throw new Error(`Unsupported event target ${r} for event ${t}`);
                    return this.addEventListener(r, t, n);
                }
            }
            class ma {
                constructor() {
                    this._stylesSet = new Set();
                }
                addStyles(e) {
                    const t = new Set();
                    e.forEach(e => {
                        this._stylesSet.has(e) || (this._stylesSet.add(e), t.add(e));
                    }),
                        this.onStylesAdded(t);
                }
                onStylesAdded(e) {}
                getAllStyles() {
                    return Array.from(this._stylesSet);
                }
            }
            class _a extends ma {
                constructor(e) {
                    super(),
                        (this._doc = e),
                        (this._hostNodes = new Set()),
                        (this._styleNodes = new Set()),
                        this._hostNodes.add(e.head);
                }
                _addStylesToHost(e, t) {
                    e.forEach(e => {
                        const n = this._doc.createElement('style');
                        (n.textContent = e), this._styleNodes.add(t.appendChild(n));
                    });
                }
                addHost(e) {
                    this._addStylesToHost(this._stylesSet, e), this._hostNodes.add(e);
                }
                removeHost(e) {
                    this._hostNodes.delete(e);
                }
                onStylesAdded(e) {
                    this._hostNodes.forEach(t => this._addStylesToHost(e, t));
                }
                ngOnDestroy() {
                    this._styleNodes.forEach(e => qo().remove(e));
                }
            }
            const ya = {
                    svg: 'http://www.w3.org/2000/svg',
                    xhtml: 'http://www.w3.org/1999/xhtml',
                    xlink: 'http://www.w3.org/1999/xlink',
                    xml: 'http://www.w3.org/XML/1998/namespace',
                    xmlns: 'http://www.w3.org/2000/xmlns/',
                },
                va = /%COMP%/g,
                ba = '_nghost-%COMP%',
                wa = '_ngcontent-%COMP%';
            function Ca(e, t, n) {
                for (let r = 0; r < t.length; r++) {
                    let s = t[r];
                    Array.isArray(s) ? Ca(e, s, n) : ((s = s.replace(va, e)), n.push(s));
                }
                return n;
            }
            function Ea(e) {
                return t => {
                    !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
                };
            }
            class xa {
                constructor(e, t, n) {
                    (this.eventManager = e),
                        (this.sharedStylesHost = t),
                        (this.appId = n),
                        (this.rendererByCompId = new Map()),
                        (this.defaultRenderer = new Sa(e));
                }
                createRenderer(e, t) {
                    if (!e || !t) return this.defaultRenderer;
                    switch (t.encapsulation) {
                        case ye.Emulated: {
                            let n = this.rendererByCompId.get(t.id);
                            return (
                                n ||
                                    ((n = new Aa(
                                        this.eventManager,
                                        this.sharedStylesHost,
                                        t,
                                        this.appId,
                                    )),
                                    this.rendererByCompId.set(t.id, n)),
                                n.applyToHost(e),
                                n
                            );
                        }
                        case ye.Native:
                        case ye.ShadowDom:
                            return new ka(this.eventManager, this.sharedStylesHost, e, t);
                        default:
                            if (!this.rendererByCompId.has(t.id)) {
                                const e = Ca(t.id, t.styles, []);
                                this.sharedStylesHost.addStyles(e),
                                    this.rendererByCompId.set(t.id, this.defaultRenderer);
                            }
                            return this.defaultRenderer;
                    }
                }
                begin() {}
                end() {}
            }
            class Sa {
                constructor(e) {
                    (this.eventManager = e), (this.data = Object.create(null));
                }
                destroy() {}
                createElement(e, t) {
                    return t
                        ? document.createElementNS(ya[t], e)
                        : document.createElement(e);
                }
                createComment(e) {
                    return document.createComment(e);
                }
                createText(e) {
                    return document.createTextNode(e);
                }
                appendChild(e, t) {
                    e.appendChild(t);
                }
                insertBefore(e, t, n) {
                    e && e.insertBefore(t, n);
                }
                removeChild(e, t) {
                    e && e.removeChild(t);
                }
                selectRootElement(e, t) {
                    let n = 'string' == typeof e ? document.querySelector(e) : e;
                    if (!n)
                        throw new Error(`The selector "${e}" did not match any elements`);
                    return t || (n.textContent = ''), n;
                }
                parentNode(e) {
                    return e.parentNode;
                }
                nextSibling(e) {
                    return e.nextSibling;
                }
                setAttribute(e, t, n, r) {
                    if (r) {
                        t = `${r}:${t}`;
                        const s = ya[r];
                        s ? e.setAttributeNS(s, t, n) : e.setAttribute(t, n);
                    } else e.setAttribute(t, n);
                }
                removeAttribute(e, t, n) {
                    if (n) {
                        const r = ya[n];
                        r ? e.removeAttributeNS(r, t) : e.removeAttribute(`${n}:${t}`);
                    } else e.removeAttribute(t);
                }
                addClass(e, t) {
                    e.classList.add(t);
                }
                removeClass(e, t) {
                    e.classList.remove(t);
                }
                setStyle(e, t, n, r) {
                    r & _t.DashCase
                        ? e.style.setProperty(t, n, r & _t.Important ? 'important' : '')
                        : (e.style[t] = n);
                }
                removeStyle(e, t, n) {
                    n & _t.DashCase ? e.style.removeProperty(t) : (e.style[t] = '');
                }
                setProperty(e, t, n) {
                    Na(t, 'property'), (e[t] = n);
                }
                setValue(e, t) {
                    e.nodeValue = t;
                }
                listen(e, t, n) {
                    return (
                        Na(t, 'listener'),
                        'string' == typeof e
                            ? this.eventManager.addGlobalEventListener(e, t, Ea(n))
                            : this.eventManager.addEventListener(e, t, Ea(n))
                    );
                }
            }
            const Ta = '@'.charCodeAt(0);
            function Na(e, t) {
                if (e.charCodeAt(0) === Ta)
                    throw new Error(
                        `Found the synthetic ${t} ${e}. Please include either "BrowserAnimationsModule" or "NoopAnimationsModule" in your application.`,
                    );
            }
            class Aa extends Sa {
                constructor(e, t, n, r) {
                    super(e), (this.component = n);
                    const s = Ca(r + '-' + n.id, n.styles, []);
                    t.addStyles(s),
                        (this.contentAttr = wa.replace(va, r + '-' + n.id)),
                        (this.hostAttr = ba.replace(va, r + '-' + n.id));
                }
                applyToHost(e) {
                    super.setAttribute(e, this.hostAttr, '');
                }
                createElement(e, t) {
                    const n = super.createElement(e, t);
                    return super.setAttribute(n, this.contentAttr, ''), n;
                }
            }
            class ka extends Sa {
                constructor(e, t, n, r) {
                    super(e),
                        (this.sharedStylesHost = t),
                        (this.hostEl = n),
                        (this.component = r),
                        (this.shadowRoot =
                            r.encapsulation === ye.ShadowDom
                                ? n.attachShadow({mode: 'open'})
                                : n.createShadowRoot()),
                        this.sharedStylesHost.addHost(this.shadowRoot);
                    const s = Ca(r.id, r.styles, []);
                    for (let l = 0; l < s.length; l++) {
                        const e = document.createElement('style');
                        (e.textContent = s[l]), this.shadowRoot.appendChild(e);
                    }
                }
                nodeOrShadowRoot(e) {
                    return e === this.hostEl ? this.shadowRoot : e;
                }
                destroy() {
                    this.sharedStylesHost.removeHost(this.shadowRoot);
                }
                appendChild(e, t) {
                    return super.appendChild(this.nodeOrShadowRoot(e), t);
                }
                insertBefore(e, t, n) {
                    return super.insertBefore(this.nodeOrShadowRoot(e), t, n);
                }
                removeChild(e, t) {
                    return super.removeChild(this.nodeOrShadowRoot(e), t);
                }
                parentNode(e) {
                    return this.nodeOrShadowRoot(
                        super.parentNode(this.nodeOrShadowRoot(e)),
                    );
                }
            }
            const Ia =
                    ('undefined' != typeof Zone && Zone.__symbol__) ||
                    function(e) {
                        return '__zone_symbol__' + e;
                    },
                Va = Ia('addEventListener'),
                Da = Ia('removeEventListener'),
                Oa = {},
                Ma = 'FALSE',
                Pa = 'ANGULAR',
                Ra = 'addEventListener',
                Fa = 'removeEventListener',
                ja = '__zone_symbol__propagationStopped',
                Ha = '__zone_symbol__stopImmediatePropagation';
            let La;
            'undefined' != typeof Zone && Zone[Ia('BLACK_LISTED_EVENTS')] && (La = {});
            const Ba = function(e) {
                    return !!La && La.hasOwnProperty(e);
                },
                Ua = function(e) {
                    const t = Oa[e.type];
                    if (!t) return;
                    const n = this[t];
                    if (!n) return;
                    const r = [e];
                    if (1 === n.length) {
                        const e = n[0];
                        return e.zone !== Zone.current
                            ? e.zone.run(e.handler, this, r)
                            : e.handler.apply(this, r);
                    }
                    {
                        const t = n.slice();
                        for (let n = 0; n < t.length && !0 !== e[ja]; n++) {
                            const e = t[n];
                            e.zone !== Zone.current
                                ? e.zone.run(e.handler, this, r)
                                : e.handler.apply(this, r);
                        }
                    }
                };
            class $a extends ga {
                constructor(e, t, n) {
                    super(e),
                        (this.ngZone = t),
                        (n &&
                            (function(e) {
                                return e === Lo;
                            })(n)) ||
                            this.patchEvent();
                }
                patchEvent() {
                    if ('undefined' == typeof Event || !Event || !Event.prototype) return;
                    if (Event.prototype[Ha]) return;
                    const e = (Event.prototype[Ha] =
                        Event.prototype.stopImmediatePropagation);
                    Event.prototype.stopImmediatePropagation = function() {
                        this && (this[ja] = !0), e && e.apply(this, arguments);
                    };
                }
                supports(e) {
                    return !0;
                }
                addEventListener(e, t, n) {
                    let r = n;
                    if (!e[Va] || (kn.isInAngularZone() && !Ba(t))) e[Ra](t, r, !1);
                    else {
                        let n = Oa[t];
                        n || (n = Oa[t] = Ia(Pa + t + Ma));
                        let s = e[n];
                        const l = s && s.length > 0;
                        s || (s = e[n] = []);
                        const i = Ba(t) ? Zone.root : Zone.current;
                        if (0 === s.length) s.push({zone: i, handler: r});
                        else {
                            let e = !1;
                            for (let t = 0; t < s.length; t++)
                                if (s[t].handler === r) {
                                    e = !0;
                                    break;
                                }
                            e || s.push({zone: i, handler: r});
                        }
                        l || e[Va](t, Ua, !1);
                    }
                    return () => this.removeEventListener(e, t, r);
                }
                removeEventListener(e, t, n) {
                    let r = e[Da];
                    if (!r) return e[Fa].apply(e, [t, n, !1]);
                    let s = Oa[t],
                        l = s && e[s];
                    if (!l) return e[Fa].apply(e, [t, n, !1]);
                    let i = !1;
                    for (let o = 0; o < l.length; o++)
                        if (l[o].handler === n) {
                            (i = !0), l.splice(o, 1);
                            break;
                        }
                    i
                        ? 0 === l.length && r.apply(e, [t, Ua, !1])
                        : e[Fa].apply(e, [t, n, !1]);
                }
            }
            const za = {
                    pan: !0,
                    panstart: !0,
                    panmove: !0,
                    panend: !0,
                    pancancel: !0,
                    panleft: !0,
                    panright: !0,
                    panup: !0,
                    pandown: !0,
                    pinch: !0,
                    pinchstart: !0,
                    pinchmove: !0,
                    pinchend: !0,
                    pinchcancel: !0,
                    pinchin: !0,
                    pinchout: !0,
                    press: !0,
                    pressup: !0,
                    rotate: !0,
                    rotatestart: !0,
                    rotatemove: !0,
                    rotateend: !0,
                    rotatecancel: !0,
                    swipe: !0,
                    swipeleft: !0,
                    swiperight: !0,
                    swipeup: !0,
                    swipedown: !0,
                    tap: !0,
                },
                Ga = new re('HammerGestureConfig'),
                qa = new re('HammerLoader');
            class Za {
                constructor() {
                    (this.events = []), (this.overrides = {});
                }
                buildHammer(e) {
                    const t = new Hammer(e, this.options);
                    t.get('pinch').set({enable: !0}), t.get('rotate').set({enable: !0});
                    for (const n in this.overrides) t.get(n).set(this.overrides[n]);
                    return t;
                }
            }
            class Wa extends ga {
                constructor(e, t, n, r) {
                    super(e), (this._config = t), (this.console = n), (this.loader = r);
                }
                supports(e) {
                    return !(
                        (!za.hasOwnProperty(e.toLowerCase()) && !this.isCustomEvent(e)) ||
                        (!window.Hammer &&
                            !this.loader &&
                            (this.console.warn(
                                `The "${e}" event cannot be bound because Hammer.JS is not ` +
                                    'loaded and no custom loader has been specified.',
                            ),
                            1))
                    );
                }
                addEventListener(e, t, n) {
                    const r = this.manager.getZone();
                    if (((t = t.toLowerCase()), !window.Hammer && this.loader)) {
                        let r = !1,
                            s = () => {
                                r = !0;
                            };
                        return (
                            this.loader()
                                .then(() => {
                                    if (!window.Hammer)
                                        return (
                                            this.console.warn(
                                                'The custom HAMMER_LOADER completed, but Hammer.JS is not present.',
                                            ),
                                            void (s = () => {})
                                        );
                                    r || (s = this.addEventListener(e, t, n));
                                })
                                .catch(() => {
                                    this.console.warn(
                                        `The "${t}" event cannot be bound because the custom ` +
                                            'Hammer.JS loader failed.',
                                    ),
                                        (s = () => {});
                                }),
                            () => {
                                s();
                            }
                        );
                    }
                    return r.runOutsideAngular(() => {
                        const s = this._config.buildHammer(e),
                            l = function(e) {
                                r.runGuarded(function() {
                                    n(e);
                                });
                            };
                        return (
                            s.on(t, l),
                            () => {
                                s.off(t, l),
                                    'function' == typeof s.destroy && s.destroy();
                            }
                        );
                    });
                }
                isCustomEvent(e) {
                    return this._config.events.indexOf(e) > -1;
                }
            }
            const Qa = ['alt', 'control', 'meta', 'shift'],
                Ka = {
                    alt: e => e.altKey,
                    control: e => e.ctrlKey,
                    meta: e => e.metaKey,
                    shift: e => e.shiftKey,
                };
            class Ja extends ga {
                constructor(e) {
                    super(e);
                }
                supports(e) {
                    return null != Ja.parseEventName(e);
                }
                addEventListener(e, t, n) {
                    const r = Ja.parseEventName(t),
                        s = Ja.eventCallback(r.fullKey, n, this.manager.getZone());
                    return this.manager
                        .getZone()
                        .runOutsideAngular(() => qo().onAndCancel(e, r.domEventName, s));
                }
                static parseEventName(e) {
                    const t = e.toLowerCase().split('.'),
                        n = t.shift();
                    if (0 === t.length || ('keydown' !== n && 'keyup' !== n)) return null;
                    const r = Ja._normalizeKey(t.pop());
                    let s = '';
                    if (
                        (Qa.forEach(e => {
                            const n = t.indexOf(e);
                            n > -1 && (t.splice(n, 1), (s += e + '.'));
                        }),
                        (s += r),
                        0 != t.length || 0 === r.length)
                    )
                        return null;
                    const l = {};
                    return (l.domEventName = n), (l.fullKey = s), l;
                }
                static getEventFullKey(e) {
                    let t = '',
                        n = qo().getEventKey(e);
                    return (
                        ' ' === (n = n.toLowerCase())
                            ? (n = 'space')
                            : '.' === n && (n = 'dot'),
                        Qa.forEach(r => {
                            r != n && (0, Ka[r])(e) && (t += r + '.');
                        }),
                        (t += n)
                    );
                }
                static eventCallback(e, t, n) {
                    return r => {
                        Ja.getEventFullKey(r) === e && n.runGuarded(() => t(r));
                    };
                }
                static _normalizeKey(e) {
                    switch (e) {
                        case 'esc':
                            return 'escape';
                        default:
                            return e;
                    }
                }
            }
            class Ya {}
            class Xa extends Ya {
                constructor(e) {
                    super(), (this._doc = e);
                }
                sanitize(e, t) {
                    if (null == t) return null;
                    switch (e) {
                        case bt.NONE:
                            return t;
                        case bt.HTML:
                            return t instanceof tu
                                ? t.changingThisBreaksApplicationSecurity
                                : (this.checkNotSafeValue(t, 'HTML'),
                                  (function(e, t) {
                                      let n = null;
                                      try {
                                          qt = qt || new Nt(e);
                                          let r = t ? String(t) : '';
                                          n = qt.getInertBodyElement(r);
                                          let s = 5,
                                              l = r;
                                          do {
                                              if (0 === s)
                                                  throw new Error(
                                                      'Failed to sanitize html because the input is unstable',
                                                  );
                                              s--,
                                                  (r = l),
                                                  (l = n.innerHTML),
                                                  (n = qt.getInertBodyElement(r));
                                          } while (r !== l);
                                          const i = new Ut(),
                                              o = i.sanitizeChildren(Zt(n) || n);
                                          return (
                                              Tt() &&
                                                  i.sanitizedSomething &&
                                                  console.warn(
                                                      'WARNING: sanitizing HTML stripped some content, see http://g.co/ng/security#xss',
                                                  ),
                                              o
                                          );
                                      } finally {
                                          if (n) {
                                              const e = Zt(n) || n;
                                              for (; e.firstChild; )
                                                  e.removeChild(e.firstChild);
                                          }
                                      }
                                  })(this._doc, String(t)));
                        case bt.STYLE:
                            return t instanceof nu
                                ? t.changingThisBreaksApplicationSecurity
                                : (this.checkNotSafeValue(t, 'Style'),
                                  (function(e) {
                                      if (!(e = String(e).trim())) return '';
                                      const t = e.match(Yt);
                                      return (t && It(t[1]) === t[1]) ||
                                          (e.match(Jt) &&
                                              (function(e) {
                                                  let t = !0,
                                                      n = !0;
                                                  for (let r = 0; r < e.length; r++) {
                                                      const s = e.charAt(r);
                                                      "'" === s && n
                                                          ? (t = !t)
                                                          : '"' === s && t && (n = !n);
                                                  }
                                                  return t && n;
                                              })(e))
                                          ? e
                                          : (Tt() &&
                                                console.warn(
                                                    `WARNING: sanitizing unsafe style value ${e} (see http://g.co/ng/security#xss).`,
                                                ),
                                            'unsafe');
                                  })(t));
                        case bt.SCRIPT:
                            if (t instanceof ru)
                                return t.changingThisBreaksApplicationSecurity;
                            throw (this.checkNotSafeValue(t, 'Script'),
                            new Error('unsafe value used in a script context'));
                        case bt.URL:
                            return t instanceof lu || t instanceof su
                                ? t.changingThisBreaksApplicationSecurity
                                : (this.checkNotSafeValue(t, 'URL'), It(String(t)));
                        case bt.RESOURCE_URL:
                            if (t instanceof lu)
                                return t.changingThisBreaksApplicationSecurity;
                            throw (this.checkNotSafeValue(t, 'ResourceURL'),
                            new Error(
                                'unsafe value used in a resource URL context (see http://g.co/ng/security#xss)',
                            ));
                        default:
                            throw new Error(
                                `Unexpected SecurityContext ${e} (see http://g.co/ng/security#xss)`,
                            );
                    }
                }
                checkNotSafeValue(e, t) {
                    if (e instanceof eu)
                        throw new Error(
                            `Required a safe ${t}, got a ${e.getTypeName()} ` +
                                '(see http://g.co/ng/security#xss)',
                        );
                }
                bypassSecurityTrustHtml(e) {
                    return new tu(e);
                }
                bypassSecurityTrustStyle(e) {
                    return new nu(e);
                }
                bypassSecurityTrustScript(e) {
                    return new ru(e);
                }
                bypassSecurityTrustUrl(e) {
                    return new su(e);
                }
                bypassSecurityTrustResourceUrl(e) {
                    return new lu(e);
                }
            }
            class eu {
                constructor(e) {
                    this.changingThisBreaksApplicationSecurity = e;
                }
                toString() {
                    return (
                        `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity}` +
                        ' (see http://g.co/ng/security#xss)'
                    );
                }
            }
            class tu extends eu {
                getTypeName() {
                    return 'HTML';
                }
            }
            class nu extends eu {
                getTypeName() {
                    return 'Style';
                }
            }
            class ru extends eu {
                getTypeName() {
                    return 'Script';
                }
            }
            class su extends eu {
                getTypeName() {
                    return 'URL';
                }
            }
            class lu extends eu {
                getTypeName() {
                    return 'ResourceURL';
                }
            }
            const iu = zn(Cr, 'browser', [
                {provide: pn, useValue: 'browser'},
                {
                    provide: hn,
                    useValue: function() {
                        ea.makeCurrent(), ua.init();
                    },
                    multi: !0,
                },
                {provide: vo, useClass: la, deps: [ra]},
                {
                    provide: ra,
                    useFactory: function() {
                        return document;
                    },
                    deps: [],
                },
            ]);
            function ou() {
                return new ln();
            }
            class au {
                constructor(e) {
                    if (e)
                        throw new Error(
                            'BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.',
                        );
                }
                static withServerTransition(e) {
                    return {
                        ngModule: au,
                        providers: [
                            {provide: dn, useValue: e.appId},
                            {provide: ia, useExisting: dn},
                            aa,
                        ],
                    };
                }
            }
            'undefined' != typeof window && window;
            class uu {
                get value() {
                    return this.control ? this.control.value : null;
                }
                get valid() {
                    return this.control ? this.control.valid : null;
                }
                get invalid() {
                    return this.control ? this.control.invalid : null;
                }
                get pending() {
                    return this.control ? this.control.pending : null;
                }
                get disabled() {
                    return this.control ? this.control.disabled : null;
                }
                get enabled() {
                    return this.control ? this.control.enabled : null;
                }
                get errors() {
                    return this.control ? this.control.errors : null;
                }
                get pristine() {
                    return this.control ? this.control.pristine : null;
                }
                get dirty() {
                    return this.control ? this.control.dirty : null;
                }
                get touched() {
                    return this.control ? this.control.touched : null;
                }
                get status() {
                    return this.control ? this.control.status : null;
                }
                get untouched() {
                    return this.control ? this.control.untouched : null;
                }
                get statusChanges() {
                    return this.control ? this.control.statusChanges : null;
                }
                get valueChanges() {
                    return this.control ? this.control.valueChanges : null;
                }
                get path() {
                    return null;
                }
                reset(e) {
                    this.control && this.control.reset(e);
                }
                hasError(e, t) {
                    return !!this.control && this.control.hasError(e, t);
                }
                getError(e, t) {
                    return this.control ? this.control.getError(e, t) : null;
                }
            }
            class cu extends uu {
                get formDirective() {
                    return null;
                }
                get path() {
                    return null;
                }
            }
            function du(e) {
                return null == e || 0 === e.length;
            }
            const hu = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
            class pu {
                static min(e) {
                    return t => {
                        if (du(t.value) || du(e)) return null;
                        const n = parseFloat(t.value);
                        return !isNaN(n) && n < e
                            ? {min: {min: e, actual: t.value}}
                            : null;
                    };
                }
                static max(e) {
                    return t => {
                        if (du(t.value) || du(e)) return null;
                        const n = parseFloat(t.value);
                        return !isNaN(n) && n > e
                            ? {max: {max: e, actual: t.value}}
                            : null;
                    };
                }
                static required(e) {
                    return du(e.value) ? {required: !0} : null;
                }
                static requiredTrue(e) {
                    return !0 === e.value ? null : {required: !0};
                }
                static email(e) {
                    return du(e.value) ? null : hu.test(e.value) ? null : {email: !0};
                }
                static minLength(e) {
                    return t => {
                        if (du(t.value)) return null;
                        const n = t.value ? t.value.length : 0;
                        return n < e
                            ? {minlength: {requiredLength: e, actualLength: n}}
                            : null;
                    };
                }
                static maxLength(e) {
                    return t => {
                        const n = t.value ? t.value.length : 0;
                        return n > e
                            ? {maxlength: {requiredLength: e, actualLength: n}}
                            : null;
                    };
                }
                static pattern(e) {
                    if (!e) return pu.nullValidator;
                    let t, n;
                    return (
                        'string' == typeof e
                            ? ((n = ''),
                              '^' !== e.charAt(0) && (n += '^'),
                              (n += e),
                              '$' !== e.charAt(e.length - 1) && (n += '$'),
                              (t = new RegExp(n)))
                            : ((n = e.toString()), (t = e)),
                        e => {
                            if (du(e.value)) return null;
                            const r = e.value;
                            return t.test(r)
                                ? null
                                : {pattern: {requiredPattern: n, actualValue: r}};
                        }
                    );
                }
                static nullValidator(e) {
                    return null;
                }
                static compose(e) {
                    if (!e) return null;
                    const t = e.filter(fu);
                    return 0 == t.length
                        ? null
                        : function(e) {
                              return mu(
                                  (function(e, n) {
                                      return t.map(t => t(e));
                                  })(e),
                              );
                          };
                }
                static composeAsync(e) {
                    if (!e) return null;
                    const t = e.filter(fu);
                    return 0 == t.length
                        ? null
                        : function(e) {
                              return (function(...e) {
                                  if (1 === e.length) {
                                      const t = e[0];
                                      if (a(t)) return zo(t, null);
                                      if (
                                          u(t) &&
                                          Object.getPrototypeOf(t) === Object.prototype
                                      ) {
                                          const e = Object.keys(t);
                                          return zo(e.map(e => t[e]), e);
                                      }
                                  }
                                  if ('function' == typeof e[e.length - 1]) {
                                      const t = e.pop();
                                      return zo(
                                          (e = 1 === e.length && a(e[0]) ? e[0] : e),
                                          null,
                                      ).pipe(F(e => t(...e)));
                                  }
                                  return zo(e, null);
                              })(
                                  (function(e, n) {
                                      return t.map(t => t(e));
                                  })(e).map(gu),
                              ).pipe(F(mu));
                          };
                }
            }
            function fu(e) {
                return null != e;
            }
            function gu(e) {
                const t = on(e) ? B(e) : e;
                if (!an(t))
                    throw new Error(
                        'Expected validator to return Promise or Observable.',
                    );
                return t;
            }
            function mu(e) {
                const t = e.reduce(
                    (e, t) => (null != t ? Object.assign({}, e, t) : e),
                    {},
                );
                return 0 === Object.keys(t).length ? null : t;
            }
            const _u = new re('NgValueAccessor'),
                yu = new re('CompositionEventMode');
            class vu {
                constructor(e, t, n) {
                    (this._renderer = e),
                        (this._elementRef = t),
                        (this._compositionMode = n),
                        (this.onChange = e => {}),
                        (this.onTouched = () => {}),
                        (this._composing = !1),
                        null == this._compositionMode &&
                            (this._compositionMode = !(function() {
                                const e = qo() ? qo().getUserAgent() : '';
                                return /android (\d+)/.test(e.toLowerCase());
                            })());
                }
                writeValue(e) {
                    this._renderer.setProperty(
                        this._elementRef.nativeElement,
                        'value',
                        null == e ? '' : e,
                    );
                }
                registerOnChange(e) {
                    this.onChange = e;
                }
                registerOnTouched(e) {
                    this.onTouched = e;
                }
                setDisabledState(e) {
                    this._renderer.setProperty(
                        this._elementRef.nativeElement,
                        'disabled',
                        e,
                    );
                }
                _handleInput(e) {
                    (!this._compositionMode ||
                        (this._compositionMode && !this._composing)) &&
                        this.onChange(e);
                }
                _compositionStart() {
                    this._composing = !0;
                }
                _compositionEnd(e) {
                    (this._composing = !1), this._compositionMode && this.onChange(e);
                }
            }
            function bu(e) {
                return e.validate ? t => e.validate(t) : e;
            }
            function wu(e) {
                return e.validate ? t => e.validate(t) : e;
            }
            function Cu() {
                throw new Error('unimplemented');
            }
            class Eu extends uu {
                constructor() {
                    super(...arguments),
                        (this._parent = null),
                        (this.name = null),
                        (this.valueAccessor = null),
                        (this._rawValidators = []),
                        (this._rawAsyncValidators = []);
                }
                get validator() {
                    return Cu();
                }
                get asyncValidator() {
                    return Cu();
                }
            }
            class xu {
                constructor() {
                    this._accessors = [];
                }
                add(e, t) {
                    this._accessors.push([e, t]);
                }
                remove(e) {
                    for (let t = this._accessors.length - 1; t >= 0; --t)
                        if (this._accessors[t][1] === e)
                            return void this._accessors.splice(t, 1);
                }
                select(e) {
                    this._accessors.forEach(t => {
                        this._isSameGroup(t, e) &&
                            t[1] !== e &&
                            t[1].fireUncheck(e.value);
                    });
                }
                _isSameGroup(e, t) {
                    return (
                        !!e[0].control &&
                        e[0]._parent === t._control._parent &&
                        e[1].name === t.name
                    );
                }
            }
            class Su {
                constructor(e, t, n, r) {
                    (this._renderer = e),
                        (this._elementRef = t),
                        (this._registry = n),
                        (this._injector = r),
                        (this.onChange = () => {}),
                        (this.onTouched = () => {});
                }
                ngOnInit() {
                    (this._control = this._injector.get(Eu)),
                        this._checkName(),
                        this._registry.add(this._control, this);
                }
                ngOnDestroy() {
                    this._registry.remove(this);
                }
                writeValue(e) {
                    (this._state = e === this.value),
                        this._renderer.setProperty(
                            this._elementRef.nativeElement,
                            'checked',
                            this._state,
                        );
                }
                registerOnChange(e) {
                    (this._fn = e),
                        (this.onChange = () => {
                            e(this.value), this._registry.select(this);
                        });
                }
                fireUncheck(e) {
                    this.writeValue(e);
                }
                registerOnTouched(e) {
                    this.onTouched = e;
                }
                setDisabledState(e) {
                    this._renderer.setProperty(
                        this._elementRef.nativeElement,
                        'disabled',
                        e,
                    );
                }
                _checkName() {
                    this.name &&
                        this.formControlName &&
                        this.name !== this.formControlName &&
                        this._throwNameError(),
                        !this.name &&
                            this.formControlName &&
                            (this.name = this.formControlName);
                }
                _throwNameError() {
                    throw new Error(
                        '\n      If you define both a name and a formControlName attribute on your radio button, their values\n      must match. Ex: <input type="radio" formControlName="food" name="food">\n    ',
                    );
                }
            }
            class Tu {
                constructor(e, t) {
                    (this._renderer = e),
                        (this._elementRef = t),
                        (this.onChange = e => {}),
                        (this.onTouched = () => {});
                }
                writeValue(e) {
                    this._renderer.setProperty(
                        this._elementRef.nativeElement,
                        'value',
                        parseFloat(e),
                    );
                }
                registerOnChange(e) {
                    this.onChange = t => {
                        e('' == t ? null : parseFloat(t));
                    };
                }
                registerOnTouched(e) {
                    this.onTouched = e;
                }
                setDisabledState(e) {
                    this._renderer.setProperty(
                        this._elementRef.nativeElement,
                        'disabled',
                        e,
                    );
                }
            }
            const Nu = {
                formControlName:
                    '\n    <div [formGroup]="myGroup">\n      <input formControlName="firstName">\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       firstName: new FormControl()\n    });',
                formGroupName:
                    '\n    <div [formGroup]="myGroup">\n       <div formGroupName="person">\n          <input formControlName="firstName">\n       </div>\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       person: new FormGroup({ firstName: new FormControl() })\n    });',
                formArrayName:
                    '\n    <div [formGroup]="myGroup">\n      <div formArrayName="cities">\n        <div *ngFor="let city of cityArray.controls; index as i">\n          <input [formControlName]="i">\n        </div>\n      </div>\n    </div>\n\n    In your class:\n\n    this.cityArray = new FormArray([new FormControl(\'SF\')]);\n    this.myGroup = new FormGroup({\n      cities: this.cityArray\n    });',
                ngModelGroup:
                    '\n    <form>\n       <div ngModelGroup="person">\n          <input [(ngModel)]="person.name" name="firstName">\n       </div>\n    </form>',
                ngModelWithFormGroup:
                    '\n    <div [formGroup]="myGroup">\n       <input formControlName="firstName">\n       <input [(ngModel)]="showMoreControls" [ngModelOptions]="{standalone: true}">\n    </div>\n  ',
            };
            function Au(e, t) {
                return null == e
                    ? `${t}`
                    : (t && 'object' == typeof t && (t = 'Object'),
                      `${e}: ${t}`.slice(0, 50));
            }
            class ku {
                constructor(e, t) {
                    (this._renderer = e),
                        (this._elementRef = t),
                        (this._optionMap = new Map()),
                        (this._idCounter = 0),
                        (this.onChange = e => {}),
                        (this.onTouched = () => {}),
                        (this._compareWith = pe);
                }
                set compareWith(e) {
                    if ('function' != typeof e)
                        throw new Error(
                            `compareWith must be a function, but received ${JSON.stringify(
                                e,
                            )}`,
                        );
                    this._compareWith = e;
                }
                writeValue(e) {
                    this.value = e;
                    const t = this._getOptionId(e);
                    null == t &&
                        this._renderer.setProperty(
                            this._elementRef.nativeElement,
                            'selectedIndex',
                            -1,
                        );
                    const n = Au(t, e);
                    this._renderer.setProperty(
                        this._elementRef.nativeElement,
                        'value',
                        n,
                    );
                }
                registerOnChange(e) {
                    this.onChange = t => {
                        (this.value = this._getOptionValue(t)), e(this.value);
                    };
                }
                registerOnTouched(e) {
                    this.onTouched = e;
                }
                setDisabledState(e) {
                    this._renderer.setProperty(
                        this._elementRef.nativeElement,
                        'disabled',
                        e,
                    );
                }
                _registerOption() {
                    return (this._idCounter++).toString();
                }
                _getOptionId(e) {
                    for (const t of Array.from(this._optionMap.keys()))
                        if (this._compareWith(this._optionMap.get(t), e)) return t;
                    return null;
                }
                _getOptionValue(e) {
                    const t = (function(e) {
                        return e.split(':')[0];
                    })(e);
                    return this._optionMap.has(t) ? this._optionMap.get(t) : e;
                }
            }
            class Iu {
                constructor(e, t, n) {
                    (this._element = e),
                        (this._renderer = t),
                        (this._select = n),
                        this._select && (this.id = this._select._registerOption());
                }
                set ngValue(e) {
                    null != this._select &&
                        (this._select._optionMap.set(this.id, e),
                        this._setElementValue(Au(this.id, e)),
                        this._select.writeValue(this._select.value));
                }
                set value(e) {
                    this._setElementValue(e),
                        this._select && this._select.writeValue(this._select.value);
                }
                _setElementValue(e) {
                    this._renderer.setProperty(this._element.nativeElement, 'value', e);
                }
                ngOnDestroy() {
                    this._select &&
                        (this._select._optionMap.delete(this.id),
                        this._select.writeValue(this._select.value));
                }
            }
            function Vu(e, t) {
                return null == e
                    ? `${t}`
                    : ('string' == typeof t && (t = `'${t}'`),
                      t && 'object' == typeof t && (t = 'Object'),
                      `${e}: ${t}`.slice(0, 50));
            }
            class Du {
                constructor(e, t, n) {
                    (this._element = e),
                        (this._renderer = t),
                        (this._select = n),
                        this._select && (this.id = this._select._registerOption(this));
                }
                set ngValue(e) {
                    null != this._select &&
                        ((this._value = e),
                        this._setElementValue(Vu(this.id, e)),
                        this._select.writeValue(this._select.value));
                }
                set value(e) {
                    this._select
                        ? ((this._value = e),
                          this._setElementValue(Vu(this.id, e)),
                          this._select.writeValue(this._select.value))
                        : this._setElementValue(e);
                }
                _setElementValue(e) {
                    this._renderer.setProperty(this._element.nativeElement, 'value', e);
                }
                _setSelected(e) {
                    this._renderer.setProperty(
                        this._element.nativeElement,
                        'selected',
                        e,
                    );
                }
                ngOnDestroy() {
                    this._select &&
                        (this._select._optionMap.delete(this.id),
                        this._select.writeValue(this._select.value));
                }
            }
            function Ou(e, t) {
                return [...t.path, e];
            }
            function Mu(e, t) {
                e || Ru(t, 'Cannot find control with'),
                    t.valueAccessor || Ru(t, 'No value accessor for form control with'),
                    (e.validator = pu.compose([e.validator, t.validator])),
                    (e.asyncValidator = pu.composeAsync([
                        e.asyncValidator,
                        t.asyncValidator,
                    ])),
                    t.valueAccessor.writeValue(e.value),
                    (function(e, t) {
                        t.valueAccessor.registerOnChange(n => {
                            (e._pendingValue = n),
                                (e._pendingChange = !0),
                                (e._pendingDirty = !0),
                                'change' === e.updateOn && Pu(e, t);
                        });
                    })(e, t),
                    (function(e, t) {
                        e.registerOnChange((e, n) => {
                            t.valueAccessor.writeValue(e), n && t.viewToModelUpdate(e);
                        });
                    })(e, t),
                    (function(e, t) {
                        t.valueAccessor.registerOnTouched(() => {
                            (e._pendingTouched = !0),
                                'blur' === e.updateOn && e._pendingChange && Pu(e, t),
                                'submit' !== e.updateOn && e.markAsTouched();
                        });
                    })(e, t),
                    t.valueAccessor.setDisabledState &&
                        e.registerOnDisabledChange(e => {
                            t.valueAccessor.setDisabledState(e);
                        }),
                    t._rawValidators.forEach(t => {
                        t.registerOnValidatorChange &&
                            t.registerOnValidatorChange(() => e.updateValueAndValidity());
                    }),
                    t._rawAsyncValidators.forEach(t => {
                        t.registerOnValidatorChange &&
                            t.registerOnValidatorChange(() => e.updateValueAndValidity());
                    });
            }
            function Pu(e, t) {
                e._pendingDirty && e.markAsDirty(),
                    e.setValue(e._pendingValue, {emitModelToViewChange: !1}),
                    t.viewToModelUpdate(e._pendingValue),
                    (e._pendingChange = !1);
            }
            function Ru(e, t) {
                let n;
                throw ((n =
                    e.path.length > 1
                        ? `path: '${e.path.join(' -> ')}'`
                        : e.path[0]
                        ? `name: '${e.path}'`
                        : 'unspecified name attribute'),
                new Error(`${t} ${n}`));
            }
            function Fu(e) {
                return null != e ? pu.compose(e.map(bu)) : null;
            }
            function ju(e) {
                return null != e ? pu.composeAsync(e.map(wu)) : null;
            }
            const Hu = [
                class {
                    constructor(e, t) {
                        (this._renderer = e),
                            (this._elementRef = t),
                            (this.onChange = e => {}),
                            (this.onTouched = () => {});
                    }
                    writeValue(e) {
                        this._renderer.setProperty(
                            this._elementRef.nativeElement,
                            'checked',
                            e,
                        );
                    }
                    registerOnChange(e) {
                        this.onChange = e;
                    }
                    registerOnTouched(e) {
                        this.onTouched = e;
                    }
                    setDisabledState(e) {
                        this._renderer.setProperty(
                            this._elementRef.nativeElement,
                            'disabled',
                            e,
                        );
                    }
                },
                Tu,
                class {
                    constructor(e, t) {
                        (this._renderer = e),
                            (this._elementRef = t),
                            (this.onChange = e => {}),
                            (this.onTouched = () => {});
                    }
                    writeValue(e) {
                        this._renderer.setProperty(
                            this._elementRef.nativeElement,
                            'value',
                            null == e ? '' : e,
                        );
                    }
                    registerOnChange(e) {
                        this.onChange = t => {
                            e('' == t ? null : parseFloat(t));
                        };
                    }
                    registerOnTouched(e) {
                        this.onTouched = e;
                    }
                    setDisabledState(e) {
                        this._renderer.setProperty(
                            this._elementRef.nativeElement,
                            'disabled',
                            e,
                        );
                    }
                },
                ku,
                class {
                    constructor(e, t) {
                        (this._renderer = e),
                            (this._elementRef = t),
                            (this._optionMap = new Map()),
                            (this._idCounter = 0),
                            (this.onChange = e => {}),
                            (this.onTouched = () => {}),
                            (this._compareWith = pe);
                    }
                    set compareWith(e) {
                        if ('function' != typeof e)
                            throw new Error(
                                `compareWith must be a function, but received ${JSON.stringify(
                                    e,
                                )}`,
                            );
                        this._compareWith = e;
                    }
                    writeValue(e) {
                        let t;
                        if (((this.value = e), Array.isArray(e))) {
                            const n = e.map(e => this._getOptionId(e));
                            t = (e, t) => {
                                e._setSelected(n.indexOf(t.toString()) > -1);
                            };
                        } else
                            t = (e, t) => {
                                e._setSelected(!1);
                            };
                        this._optionMap.forEach(t);
                    }
                    registerOnChange(e) {
                        this.onChange = t => {
                            const n = [];
                            if (t.hasOwnProperty('selectedOptions')) {
                                const e = t.selectedOptions;
                                for (let t = 0; t < e.length; t++) {
                                    const r = e.item(t),
                                        s = this._getOptionValue(r.value);
                                    n.push(s);
                                }
                            } else {
                                const e = t.options;
                                for (let t = 0; t < e.length; t++) {
                                    const r = e.item(t);
                                    if (r.selected) {
                                        const e = this._getOptionValue(r.value);
                                        n.push(e);
                                    }
                                }
                            }
                            (this.value = n), e(n);
                        };
                    }
                    registerOnTouched(e) {
                        this.onTouched = e;
                    }
                    setDisabledState(e) {
                        this._renderer.setProperty(
                            this._elementRef.nativeElement,
                            'disabled',
                            e,
                        );
                    }
                    _registerOption(e) {
                        const t = (this._idCounter++).toString();
                        return this._optionMap.set(t, e), t;
                    }
                    _getOptionId(e) {
                        for (const t of Array.from(this._optionMap.keys()))
                            if (this._compareWith(this._optionMap.get(t)._value, e))
                                return t;
                        return null;
                    }
                    _getOptionValue(e) {
                        const t = (function(e) {
                            return e.split(':')[0];
                        })(e);
                        return this._optionMap.has(t) ? this._optionMap.get(t)._value : e;
                    }
                },
                Su,
            ];
            class Lu extends cu {
                ngOnInit() {
                    this._checkParentType(), this.formDirective.addFormGroup(this);
                }
                ngOnDestroy() {
                    this.formDirective && this.formDirective.removeFormGroup(this);
                }
                get control() {
                    return this.formDirective.getFormGroup(this);
                }
                get path() {
                    return Ou(this.name, this._parent);
                }
                get formDirective() {
                    return this._parent ? this._parent.formDirective : null;
                }
                get validator() {
                    return Fu(this._validators);
                }
                get asyncValidator() {
                    return ju(this._asyncValidators);
                }
                _checkParentType() {}
            }
            class Bu {
                constructor(e) {
                    this._cd = e;
                }
                get ngClassUntouched() {
                    return !!this._cd.control && this._cd.control.untouched;
                }
                get ngClassTouched() {
                    return !!this._cd.control && this._cd.control.touched;
                }
                get ngClassPristine() {
                    return !!this._cd.control && this._cd.control.pristine;
                }
                get ngClassDirty() {
                    return !!this._cd.control && this._cd.control.dirty;
                }
                get ngClassValid() {
                    return !!this._cd.control && this._cd.control.valid;
                }
                get ngClassInvalid() {
                    return !!this._cd.control && this._cd.control.invalid;
                }
                get ngClassPending() {
                    return !!this._cd.control && this._cd.control.pending;
                }
            }
            class Uu extends Bu {
                constructor(e) {
                    super(e);
                }
            }
            const $u = 'VALID',
                zu = 'INVALID',
                Gu = 'PENDING',
                qu = 'DISABLED';
            function Zu(e) {
                const t = Qu(e) ? e.validators : e;
                return Array.isArray(t) ? Fu(t) : t || null;
            }
            function Wu(e, t) {
                const n = Qu(t) ? t.asyncValidators : e;
                return Array.isArray(n) ? ju(n) : n || null;
            }
            function Qu(e) {
                return null != e && !Array.isArray(e) && 'object' == typeof e;
            }
            class Ku {
                constructor(e, t) {
                    (this.validator = e),
                        (this.asyncValidator = t),
                        (this._onCollectionChange = () => {}),
                        (this.pristine = !0),
                        (this.touched = !1),
                        (this._onDisabledChange = []);
                }
                get parent() {
                    return this._parent;
                }
                get valid() {
                    return this.status === $u;
                }
                get invalid() {
                    return this.status === zu;
                }
                get pending() {
                    return this.status == Gu;
                }
                get disabled() {
                    return this.status === qu;
                }
                get enabled() {
                    return this.status !== qu;
                }
                get dirty() {
                    return !this.pristine;
                }
                get untouched() {
                    return !this.touched;
                }
                get updateOn() {
                    return this._updateOn
                        ? this._updateOn
                        : this.parent
                        ? this.parent.updateOn
                        : 'change';
                }
                setValidators(e) {
                    this.validator = Zu(e);
                }
                setAsyncValidators(e) {
                    this.asyncValidator = Wu(e);
                }
                clearValidators() {
                    this.validator = null;
                }
                clearAsyncValidators() {
                    this.asyncValidator = null;
                }
                markAsTouched(e = {}) {
                    (this.touched = !0),
                        this._parent && !e.onlySelf && this._parent.markAsTouched(e);
                }
                markAsUntouched(e = {}) {
                    (this.touched = !1),
                        (this._pendingTouched = !1),
                        this._forEachChild(e => {
                            e.markAsUntouched({onlySelf: !0});
                        }),
                        this._parent && !e.onlySelf && this._parent._updateTouched(e);
                }
                markAsDirty(e = {}) {
                    (this.pristine = !1),
                        this._parent && !e.onlySelf && this._parent.markAsDirty(e);
                }
                markAsPristine(e = {}) {
                    (this.pristine = !0),
                        (this._pendingDirty = !1),
                        this._forEachChild(e => {
                            e.markAsPristine({onlySelf: !0});
                        }),
                        this._parent && !e.onlySelf && this._parent._updatePristine(e);
                }
                markAsPending(e = {}) {
                    (this.status = Gu),
                        !1 !== e.emitEvent && this.statusChanges.emit(this.status),
                        this._parent && !e.onlySelf && this._parent.markAsPending(e);
                }
                disable(e = {}) {
                    (this.status = qu),
                        (this.errors = null),
                        this._forEachChild(t => {
                            t.disable(Object.assign({}, e, {onlySelf: !0}));
                        }),
                        this._updateValue(),
                        !1 !== e.emitEvent &&
                            (this.valueChanges.emit(this.value),
                            this.statusChanges.emit(this.status)),
                        this._updateAncestors(e),
                        this._onDisabledChange.forEach(e => e(!0));
                }
                enable(e = {}) {
                    (this.status = $u),
                        this._forEachChild(t => {
                            t.enable(Object.assign({}, e, {onlySelf: !0}));
                        }),
                        this.updateValueAndValidity({
                            onlySelf: !0,
                            emitEvent: e.emitEvent,
                        }),
                        this._updateAncestors(e),
                        this._onDisabledChange.forEach(e => e(!1));
                }
                _updateAncestors(e) {
                    this._parent &&
                        !e.onlySelf &&
                        (this._parent.updateValueAndValidity(e),
                        this._parent._updatePristine(),
                        this._parent._updateTouched());
                }
                setParent(e) {
                    this._parent = e;
                }
                updateValueAndValidity(e = {}) {
                    this._setInitialStatus(),
                        this._updateValue(),
                        this.enabled &&
                            (this._cancelExistingSubscription(),
                            (this.errors = this._runValidator()),
                            (this.status = this._calculateStatus()),
                            (this.status !== $u && this.status !== Gu) ||
                                this._runAsyncValidator(e.emitEvent)),
                        !1 !== e.emitEvent &&
                            (this.valueChanges.emit(this.value),
                            this.statusChanges.emit(this.status)),
                        this._parent &&
                            !e.onlySelf &&
                            this._parent.updateValueAndValidity(e);
                }
                _updateTreeValidity(e = {emitEvent: !0}) {
                    this._forEachChild(t => t._updateTreeValidity(e)),
                        this.updateValueAndValidity({
                            onlySelf: !0,
                            emitEvent: e.emitEvent,
                        });
                }
                _setInitialStatus() {
                    this.status = this._allControlsDisabled() ? qu : $u;
                }
                _runValidator() {
                    return this.validator ? this.validator(this) : null;
                }
                _runAsyncValidator(e) {
                    if (this.asyncValidator) {
                        this.status = Gu;
                        const t = gu(this.asyncValidator(this));
                        this._asyncValidationSubscription = t.subscribe(t =>
                            this.setErrors(t, {emitEvent: e}),
                        );
                    }
                }
                _cancelExistingSubscription() {
                    this._asyncValidationSubscription &&
                        this._asyncValidationSubscription.unsubscribe();
                }
                setErrors(e, t = {}) {
                    (this.errors = e), this._updateControlsErrors(!1 !== t.emitEvent);
                }
                get(e) {
                    return (function(e, t, n) {
                        return null == t
                            ? null
                            : (t instanceof Array || (t = t.split('.')),
                              t instanceof Array && 0 === t.length
                                  ? null
                                  : t.reduce(
                                        (e, t) =>
                                            e instanceof Yu
                                                ? e.controls.hasOwnProperty(t)
                                                    ? e.controls[t]
                                                    : null
                                                : (e instanceof Xu && e.at(t)) || null,
                                        e,
                                    ));
                    })(this, e);
                }
                getError(e, t) {
                    const n = t ? this.get(t) : this;
                    return n && n.errors ? n.errors[e] : null;
                }
                hasError(e, t) {
                    return !!this.getError(e, t);
                }
                get root() {
                    let e = this;
                    for (; e._parent; ) e = e._parent;
                    return e;
                }
                _updateControlsErrors(e) {
                    (this.status = this._calculateStatus()),
                        e && this.statusChanges.emit(this.status),
                        this._parent && this._parent._updateControlsErrors(e);
                }
                _initObservables() {
                    (this.valueChanges = new Wt()), (this.statusChanges = new Wt());
                }
                _calculateStatus() {
                    return this._allControlsDisabled()
                        ? qu
                        : this.errors
                        ? zu
                        : this._anyControlsHaveStatus(Gu)
                        ? Gu
                        : this._anyControlsHaveStatus(zu)
                        ? zu
                        : $u;
                }
                _anyControlsHaveStatus(e) {
                    return this._anyControls(t => t.status === e);
                }
                _anyControlsDirty() {
                    return this._anyControls(e => e.dirty);
                }
                _anyControlsTouched() {
                    return this._anyControls(e => e.touched);
                }
                _updatePristine(e = {}) {
                    (this.pristine = !this._anyControlsDirty()),
                        this._parent && !e.onlySelf && this._parent._updatePristine(e);
                }
                _updateTouched(e = {}) {
                    (this.touched = this._anyControlsTouched()),
                        this._parent && !e.onlySelf && this._parent._updateTouched(e);
                }
                _isBoxedValue(e) {
                    return (
                        'object' == typeof e &&
                        null !== e &&
                        2 === Object.keys(e).length &&
                        'value' in e &&
                        'disabled' in e
                    );
                }
                _registerOnCollectionChange(e) {
                    this._onCollectionChange = e;
                }
                _setUpdateStrategy(e) {
                    Qu(e) && null != e.updateOn && (this._updateOn = e.updateOn);
                }
            }
            class Ju extends Ku {
                constructor(e = null, t, n) {
                    super(Zu(t), Wu(n, t)),
                        (this._onChange = []),
                        this._applyFormState(e),
                        this._setUpdateStrategy(t),
                        this.updateValueAndValidity({onlySelf: !0, emitEvent: !1}),
                        this._initObservables();
                }
                setValue(e, t = {}) {
                    (this.value = this._pendingValue = e),
                        this._onChange.length &&
                            !1 !== t.emitModelToViewChange &&
                            this._onChange.forEach(e =>
                                e(this.value, !1 !== t.emitViewToModelChange),
                            ),
                        this.updateValueAndValidity(t);
                }
                patchValue(e, t = {}) {
                    this.setValue(e, t);
                }
                reset(e = null, t = {}) {
                    this._applyFormState(e),
                        this.markAsPristine(t),
                        this.markAsUntouched(t),
                        this.setValue(this.value, t),
                        (this._pendingChange = !1);
                }
                _updateValue() {}
                _anyControls(e) {
                    return !1;
                }
                _allControlsDisabled() {
                    return this.disabled;
                }
                registerOnChange(e) {
                    this._onChange.push(e);
                }
                _clearChangeFns() {
                    (this._onChange = []),
                        (this._onDisabledChange = []),
                        (this._onCollectionChange = () => {});
                }
                registerOnDisabledChange(e) {
                    this._onDisabledChange.push(e);
                }
                _forEachChild(e) {}
                _syncPendingControls() {
                    return !(
                        'submit' !== this.updateOn ||
                        (this._pendingDirty && this.markAsDirty(),
                        this._pendingTouched && this.markAsTouched(),
                        !this._pendingChange) ||
                        (this.setValue(this._pendingValue, {
                            onlySelf: !0,
                            emitModelToViewChange: !1,
                        }),
                        0)
                    );
                }
                _applyFormState(e) {
                    this._isBoxedValue(e)
                        ? ((this.value = this._pendingValue = e.value),
                          e.disabled
                              ? this.disable({onlySelf: !0, emitEvent: !1})
                              : this.enable({onlySelf: !0, emitEvent: !1}))
                        : (this.value = this._pendingValue = e);
                }
            }
            class Yu extends Ku {
                constructor(e, t, n) {
                    super(Zu(t), Wu(n, t)),
                        (this.controls = e),
                        this._initObservables(),
                        this._setUpdateStrategy(t),
                        this._setUpControls(),
                        this.updateValueAndValidity({onlySelf: !0, emitEvent: !1});
                }
                registerControl(e, t) {
                    return this.controls[e]
                        ? this.controls[e]
                        : ((this.controls[e] = t),
                          t.setParent(this),
                          t._registerOnCollectionChange(this._onCollectionChange),
                          t);
                }
                addControl(e, t) {
                    this.registerControl(e, t),
                        this.updateValueAndValidity(),
                        this._onCollectionChange();
                }
                removeControl(e) {
                    this.controls[e] &&
                        this.controls[e]._registerOnCollectionChange(() => {}),
                        delete this.controls[e],
                        this.updateValueAndValidity(),
                        this._onCollectionChange();
                }
                setControl(e, t) {
                    this.controls[e] &&
                        this.controls[e]._registerOnCollectionChange(() => {}),
                        delete this.controls[e],
                        t && this.registerControl(e, t),
                        this.updateValueAndValidity(),
                        this._onCollectionChange();
                }
                contains(e) {
                    return this.controls.hasOwnProperty(e) && this.controls[e].enabled;
                }
                setValue(e, t = {}) {
                    this._checkAllValuesPresent(e),
                        Object.keys(e).forEach(n => {
                            this._throwIfControlMissing(n),
                                this.controls[n].setValue(e[n], {
                                    onlySelf: !0,
                                    emitEvent: t.emitEvent,
                                });
                        }),
                        this.updateValueAndValidity(t);
                }
                patchValue(e, t = {}) {
                    Object.keys(e).forEach(n => {
                        this.controls[n] &&
                            this.controls[n].patchValue(e[n], {
                                onlySelf: !0,
                                emitEvent: t.emitEvent,
                            });
                    }),
                        this.updateValueAndValidity(t);
                }
                reset(e = {}, t = {}) {
                    this._forEachChild((n, r) => {
                        n.reset(e[r], {onlySelf: !0, emitEvent: t.emitEvent});
                    }),
                        this.updateValueAndValidity(t),
                        this._updatePristine(t),
                        this._updateTouched(t);
                }
                getRawValue() {
                    return this._reduceChildren(
                        {},
                        (e, t, n) => (
                            (e[n] = t instanceof Ju ? t.value : t.getRawValue()), e
                        ),
                    );
                }
                _syncPendingControls() {
                    let e = this._reduceChildren(
                        !1,
                        (e, t) => !!t._syncPendingControls() || e,
                    );
                    return e && this.updateValueAndValidity({onlySelf: !0}), e;
                }
                _throwIfControlMissing(e) {
                    if (!Object.keys(this.controls).length)
                        throw new Error(
                            "\n        There are no form controls registered with this group yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ",
                        );
                    if (!this.controls[e])
                        throw new Error(`Cannot find form control with name: ${e}.`);
                }
                _forEachChild(e) {
                    Object.keys(this.controls).forEach(t => e(this.controls[t], t));
                }
                _setUpControls() {
                    this._forEachChild(e => {
                        e.setParent(this),
                            e._registerOnCollectionChange(this._onCollectionChange);
                    });
                }
                _updateValue() {
                    this.value = this._reduceValue();
                }
                _anyControls(e) {
                    let t = !1;
                    return (
                        this._forEachChild((n, r) => {
                            t = t || (this.contains(r) && e(n));
                        }),
                        t
                    );
                }
                _reduceValue() {
                    return this._reduceChildren(
                        {},
                        (e, t, n) => (
                            (t.enabled || this.disabled) && (e[n] = t.value), e
                        ),
                    );
                }
                _reduceChildren(e, t) {
                    let n = e;
                    return (
                        this._forEachChild((e, r) => {
                            n = t(n, e, r);
                        }),
                        n
                    );
                }
                _allControlsDisabled() {
                    for (const e of Object.keys(this.controls))
                        if (this.controls[e].enabled) return !1;
                    return Object.keys(this.controls).length > 0 || this.disabled;
                }
                _checkAllValuesPresent(e) {
                    this._forEachChild((t, n) => {
                        if (void 0 === e[n])
                            throw new Error(
                                `Must supply a value for form control with name: '${n}'.`,
                            );
                    });
                }
            }
            class Xu extends Ku {
                constructor(e, t, n) {
                    super(Zu(t), Wu(n, t)),
                        (this.controls = e),
                        this._initObservables(),
                        this._setUpdateStrategy(t),
                        this._setUpControls(),
                        this.updateValueAndValidity({onlySelf: !0, emitEvent: !1});
                }
                at(e) {
                    return this.controls[e];
                }
                push(e) {
                    this.controls.push(e),
                        this._registerControl(e),
                        this.updateValueAndValidity(),
                        this._onCollectionChange();
                }
                insert(e, t) {
                    this.controls.splice(e, 0, t),
                        this._registerControl(t),
                        this.updateValueAndValidity();
                }
                removeAt(e) {
                    this.controls[e] &&
                        this.controls[e]._registerOnCollectionChange(() => {}),
                        this.controls.splice(e, 1),
                        this.updateValueAndValidity();
                }
                setControl(e, t) {
                    this.controls[e] &&
                        this.controls[e]._registerOnCollectionChange(() => {}),
                        this.controls.splice(e, 1),
                        t && (this.controls.splice(e, 0, t), this._registerControl(t)),
                        this.updateValueAndValidity(),
                        this._onCollectionChange();
                }
                get length() {
                    return this.controls.length;
                }
                setValue(e, t = {}) {
                    this._checkAllValuesPresent(e),
                        e.forEach((e, n) => {
                            this._throwIfControlMissing(n),
                                this.at(n).setValue(e, {
                                    onlySelf: !0,
                                    emitEvent: t.emitEvent,
                                });
                        }),
                        this.updateValueAndValidity(t);
                }
                patchValue(e, t = {}) {
                    e.forEach((e, n) => {
                        this.at(n) &&
                            this.at(n).patchValue(e, {
                                onlySelf: !0,
                                emitEvent: t.emitEvent,
                            });
                    }),
                        this.updateValueAndValidity(t);
                }
                reset(e = [], t = {}) {
                    this._forEachChild((n, r) => {
                        n.reset(e[r], {onlySelf: !0, emitEvent: t.emitEvent});
                    }),
                        this.updateValueAndValidity(t),
                        this._updatePristine(t),
                        this._updateTouched(t);
                }
                getRawValue() {
                    return this.controls.map(e =>
                        e instanceof Ju ? e.value : e.getRawValue(),
                    );
                }
                _syncPendingControls() {
                    let e = this.controls.reduce(
                        (e, t) => !!t._syncPendingControls() || e,
                        !1,
                    );
                    return e && this.updateValueAndValidity({onlySelf: !0}), e;
                }
                _throwIfControlMissing(e) {
                    if (!this.controls.length)
                        throw new Error(
                            "\n        There are no form controls registered with this array yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ",
                        );
                    if (!this.at(e))
                        throw new Error(`Cannot find form control at index ${e}`);
                }
                _forEachChild(e) {
                    this.controls.forEach((t, n) => {
                        e(t, n);
                    });
                }
                _updateValue() {
                    this.value = this.controls
                        .filter(e => e.enabled || this.disabled)
                        .map(e => e.value);
                }
                _anyControls(e) {
                    return this.controls.some(t => t.enabled && e(t));
                }
                _setUpControls() {
                    this._forEachChild(e => this._registerControl(e));
                }
                _checkAllValuesPresent(e) {
                    this._forEachChild((t, n) => {
                        if (void 0 === e[n])
                            throw new Error(
                                `Must supply a value for form control at index: ${n}.`,
                            );
                    });
                }
                _allControlsDisabled() {
                    for (const e of this.controls) if (e.enabled) return !1;
                    return this.controls.length > 0 || this.disabled;
                }
                _registerControl(e) {
                    e.setParent(this),
                        e._registerOnCollectionChange(this._onCollectionChange);
                }
            }
            const ec = Promise.resolve(null);
            class tc extends cu {
                constructor(e, t) {
                    super(),
                        (this.submitted = !1),
                        (this._directives = []),
                        (this.ngSubmit = new Wt()),
                        (this.form = new Yu({}, Fu(e), ju(t)));
                }
                ngAfterViewInit() {
                    this._setUpdateStrategy();
                }
                get formDirective() {
                    return this;
                }
                get control() {
                    return this.form;
                }
                get path() {
                    return [];
                }
                get controls() {
                    return this.form.controls;
                }
                addControl(e) {
                    ec.then(() => {
                        const t = this._findContainer(e.path);
                        (e.control = t.registerControl(e.name, e.control)),
                            Mu(e.control, e),
                            e.control.updateValueAndValidity({emitEvent: !1}),
                            this._directives.push(e);
                    });
                }
                getControl(e) {
                    return this.form.get(e.path);
                }
                removeControl(e) {
                    ec.then(() => {
                        const t = this._findContainer(e.path);
                        t && t.removeControl(e.name),
                            (function(t, n) {
                                const r = t.indexOf(e);
                                r > -1 && t.splice(r, 1);
                            })(this._directives);
                    });
                }
                addFormGroup(e) {
                    ec.then(() => {
                        const t = this._findContainer(e.path),
                            n = new Yu({});
                        (function(e, t) {
                            null == e && Ru(t, 'Cannot find control with'),
                                (e.validator = pu.compose([e.validator, t.validator])),
                                (e.asyncValidator = pu.composeAsync([
                                    e.asyncValidator,
                                    t.asyncValidator,
                                ]));
                        })(n, e),
                            t.registerControl(e.name, n),
                            n.updateValueAndValidity({emitEvent: !1});
                    });
                }
                removeFormGroup(e) {
                    ec.then(() => {
                        const t = this._findContainer(e.path);
                        t && t.removeControl(e.name);
                    });
                }
                getFormGroup(e) {
                    return this.form.get(e.path);
                }
                updateModel(e, t) {
                    ec.then(() => {
                        this.form.get(e.path).setValue(t);
                    });
                }
                setValue(e) {
                    this.control.setValue(e);
                }
                onSubmit(e) {
                    return (
                        (this.submitted = !0),
                        (t = this._directives),
                        this.form._syncPendingControls(),
                        t.forEach(e => {
                            const t = e.control;
                            'submit' === t.updateOn &&
                                t._pendingChange &&
                                (e.viewToModelUpdate(t._pendingValue),
                                (t._pendingChange = !1));
                        }),
                        this.ngSubmit.emit(e),
                        !1
                    );
                    var t;
                }
                onReset() {
                    this.resetForm();
                }
                resetForm(e) {
                    this.form.reset(e), (this.submitted = !1);
                }
                _setUpdateStrategy() {
                    this.options &&
                        null != this.options.updateOn &&
                        (this.form._updateOn = this.options.updateOn);
                }
                _findContainer(e) {
                    return e.pop(), e.length ? this.form.get(e) : this.form;
                }
            }
            class nc {
                static modelParentException() {
                    throw new Error(
                        `\n      ngModel cannot be used to register form controls with a parent formGroup directive.  Try using\n      formGroup's partner directive "formControlName" instead.  Example:\n\n      ${Nu.formControlName}\n\n      Or, if you'd like to avoid registering this form control, indicate that it's standalone in ngModelOptions:\n\n      Example:\n\n      ${Nu.ngModelWithFormGroup}`,
                    );
                }
                static formGroupNameException() {
                    throw new Error(
                        `\n      ngModel cannot be used to register form controls with a parent formGroupName or formArrayName directive.\n\n      Option 1: Use formControlName instead of ngModel (reactive strategy):\n\n      ${Nu.formGroupName}\n\n      Option 2:  Update ngModel's parent be ngModelGroup (template-driven strategy):\n\n      ${Nu.ngModelGroup}`,
                    );
                }
                static missingNameException() {
                    throw new Error(
                        'If ngModel is used within a form tag, either the name attribute must be set or the form\n      control must be defined as \'standalone\' in ngModelOptions.\n\n      Example 1: <input [(ngModel)]="person.firstName" name="first">\n      Example 2: <input [(ngModel)]="person.firstName" [ngModelOptions]="{standalone: true}">',
                    );
                }
                static modelGroupParentException() {
                    throw new Error(
                        `\n      ngModelGroup cannot be used with a parent formGroup directive.\n\n      Option 1: Use formGroupName instead of ngModelGroup (reactive strategy):\n\n      ${Nu.formGroupName}\n\n      Option 2:  Use a regular form tag instead of the formGroup directive (template-driven strategy):\n\n      ${Nu.ngModelGroup}`,
                    );
                }
                static ngFormWarning() {
                    console.warn(
                        "\n    It looks like you're using 'ngForm'.\n\n    Support for using the 'ngForm' element selector has been deprecated in Angular v6 and will be removed\n    in Angular v9.\n\n    Use 'ng-form' instead.\n\n    Before:\n    <ngForm #myForm=\"ngForm\">\n\n    After:\n    <ng-form #myForm=\"ngForm\">\n    ",
                    );
                }
            }
            const rc = new re('NgFormSelectorWarning');
            class sc extends Lu {
                constructor(e, t, n) {
                    super(),
                        (this._parent = e),
                        (this._validators = t),
                        (this._asyncValidators = n);
                }
                _checkParentType() {
                    this._parent instanceof sc ||
                        this._parent instanceof tc ||
                        nc.modelGroupParentException();
                }
            }
            const lc = Promise.resolve(null);
            class ic extends Eu {
                constructor(e, t, n, r) {
                    super(),
                        (this.control = new Ju()),
                        (this._registered = !1),
                        (this.update = new Wt()),
                        (this._parent = e),
                        (this._rawValidators = t || []),
                        (this._rawAsyncValidators = n || []),
                        (this.valueAccessor = (function(e, t) {
                            if (!t) return null;
                            Array.isArray(t) ||
                                Ru(
                                    e,
                                    'Value accessor was not provided as an array for form control with',
                                );
                            let n = void 0,
                                r = void 0,
                                s = void 0;
                            return (
                                t.forEach(t => {
                                    t.constructor === vu
                                        ? (n = t)
                                        : (function(e) {
                                              return Hu.some(t => e.constructor === t);
                                          })(t)
                                        ? (r &&
                                              Ru(
                                                  e,
                                                  'More than one built-in value accessor matches form control with',
                                              ),
                                          (r = t))
                                        : (s &&
                                              Ru(
                                                  e,
                                                  'More than one custom value accessor matches form control with',
                                              ),
                                          (s = t));
                                }),
                                s ||
                                    r ||
                                    n ||
                                    (Ru(
                                        e,
                                        'No valid value accessor for form control with',
                                    ),
                                    null)
                            );
                        })(this, r));
                }
                ngOnChanges(e) {
                    this._checkForErrors(),
                        this._registered || this._setUpControl(),
                        'isDisabled' in e && this._updateDisabled(e),
                        (function(e, t) {
                            if (!e.hasOwnProperty('model')) return !1;
                            const n = e.model;
                            return !!n.isFirstChange() || !pe(t, n.currentValue);
                        })(e, this.viewModel) &&
                            (this._updateValue(this.model),
                            (this.viewModel = this.model));
                }
                ngOnDestroy() {
                    this.formDirective && this.formDirective.removeControl(this);
                }
                get path() {
                    return this._parent ? Ou(this.name, this._parent) : [this.name];
                }
                get formDirective() {
                    return this._parent ? this._parent.formDirective : null;
                }
                get validator() {
                    return Fu(this._rawValidators);
                }
                get asyncValidator() {
                    return ju(this._rawAsyncValidators);
                }
                viewToModelUpdate(e) {
                    (this.viewModel = e), this.update.emit(e);
                }
                _setUpControl() {
                    this._setUpdateStrategy(),
                        this._isStandalone()
                            ? this._setUpStandalone()
                            : this.formDirective.addControl(this),
                        (this._registered = !0);
                }
                _setUpdateStrategy() {
                    this.options &&
                        null != this.options.updateOn &&
                        (this.control._updateOn = this.options.updateOn);
                }
                _isStandalone() {
                    return !this._parent || !(!this.options || !this.options.standalone);
                }
                _setUpStandalone() {
                    Mu(this.control, this),
                        this.control.updateValueAndValidity({emitEvent: !1});
                }
                _checkForErrors() {
                    this._isStandalone() || this._checkParentType(), this._checkName();
                }
                _checkParentType() {
                    !(this._parent instanceof sc) && this._parent instanceof Lu
                        ? nc.formGroupNameException()
                        : this._parent instanceof sc ||
                          this._parent instanceof tc ||
                          nc.modelParentException();
                }
                _checkName() {
                    this.options && this.options.name && (this.name = this.options.name),
                        this._isStandalone() || this.name || nc.missingNameException();
                }
                _updateValue(e) {
                    lc.then(() => {
                        this.control.setValue(e, {emitViewToModelChange: !1});
                    });
                }
                _updateDisabled(e) {
                    const t = e.isDisabled.currentValue,
                        n = '' === t || (t && 'false' !== t);
                    lc.then(() => {
                        n && !this.control.disabled
                            ? this.control.disable()
                            : !n && this.control.disabled && this.control.enable();
                    });
                }
            }
            class oc {}
            class ac {
                static withConfig(e) {
                    return {
                        ngModule: ac,
                        providers: [
                            {provide: rc, useValue: e.warnOnDeprecatedNgFormSelector},
                        ],
                    };
                }
            }
            class uc extends StereoPannerNode {
                set StereoPannerNode(e) {
                    'setPosition' in this
                        ? this.fallbackToPannerNode(e || 0)
                        : qi(this.pan, e, this.context.currentTime);
                }
                constructor(e, t) {
                    try {
                        new StereoPannerNode(e);
                    } catch (n) {
                        const r = e.createPanner();
                        return Object.setPrototypeOf(r, uc.prototype), uc.init(r, t), r;
                    }
                    super(e), uc.init(this, t);
                }
                ngOnDestroy() {
                    this.disconnect();
                }
                fallbackToPannerNode(e) {
                    const t = 100 * e,
                        n = t > 0 ? 270 - t : t + 90,
                        r = Math.sin(t * (Math.PI / 180)),
                        s = Math.sin(n * (Math.PI / 180));
                    this.setPosition(r, 0, s);
                }
                static init(e, t) {
                    Wi(t, e);
                }
            }
            class cc {
                constructor(e, t) {
                    (this.compare = e), (this.keySelector = t);
                }
                call(e, t) {
                    return t.subscribe(new dc(e, this.compare, this.keySelector));
                }
            }
            class dc extends g {
                constructor(e, t, n) {
                    super(e),
                        (this.keySelector = n),
                        (this.hasKey = !1),
                        'function' == typeof t && (this.compare = t);
                }
                compare(e, t) {
                    return e === t;
                }
                _next(e) {
                    let t;
                    try {
                        const {keySelector: n} = this;
                        t = n ? n(e) : e;
                    } catch (r) {
                        return this.destination.error(r);
                    }
                    let n = !1;
                    if (this.hasKey)
                        try {
                            const {compare: e} = this;
                            n = e(this.key, t);
                        } catch (r) {
                            return this.destination.error(r);
                        }
                    else this.hasKey = !0;
                    n || ((this.key = t), this.destination.next(e));
                }
            }
            class hc {
                constructor(e, t) {
                    (this.dueTime = e), (this.scheduler = t);
                }
                call(e, t) {
                    return t.subscribe(new pc(e, this.dueTime, this.scheduler));
                }
            }
            class pc extends g {
                constructor(e, t, n) {
                    super(e),
                        (this.dueTime = t),
                        (this.scheduler = n),
                        (this.debouncedSubscription = null),
                        (this.lastValue = null),
                        (this.hasValue = !1);
                }
                _next(e) {
                    this.clearDebounce(),
                        (this.lastValue = e),
                        (this.hasValue = !0),
                        this.add(
                            (this.debouncedSubscription = this.scheduler.schedule(
                                fc,
                                this.dueTime,
                                this,
                            )),
                        );
                }
                _complete() {
                    this.debouncedNext(), this.destination.complete();
                }
                debouncedNext() {
                    if ((this.clearDebounce(), this.hasValue)) {
                        const {lastValue: e} = this;
                        (this.lastValue = null),
                            (this.hasValue = !1),
                            this.destination.next(e);
                    }
                }
                clearDebounce() {
                    const e = this.debouncedSubscription;
                    null !== e &&
                        (this.remove(e),
                        e.unsubscribe(),
                        (this.debouncedSubscription = null));
                }
            }
            function fc(e) {
                e.debouncedNext();
            }
            class gc {
                constructor(e, t) {
                    (this.predicate = e), (this.thisArg = t);
                }
                call(e, t) {
                    return t.subscribe(new mc(e, this.predicate, this.thisArg));
                }
            }
            class mc extends g {
                constructor(e, t, n) {
                    super(e), (this.predicate = t), (this.thisArg = n), (this.count = 0);
                }
                _next(e) {
                    let t;
                    try {
                        t = this.predicate.call(this.thisArg, e, this.count++);
                    } catch (n) {
                        return void this.destination.error(n);
                    }
                    t && this.destination.next(e);
                }
            }
            class _c {
                constructor(e) {
                    this.total = e;
                }
                call(e, t) {
                    return t.subscribe(new yc(e, this.total));
                }
            }
            class yc extends g {
                constructor(e, t) {
                    super(e), (this.total = t), (this.count = 0);
                }
                _next(e) {
                    ++this.count > this.total && this.destination.next(e);
                }
            }
            const vc = 128,
                bc = 100;
            class wc extends AnalyserNode {
                constructor(e, t) {
                    const n = Qi(e, 'createAnalyser', wc, t);
                    if (n) return n;
                    super(e), wc.init(this, t);
                }
                ngOnDestroy() {
                    this.disconnect();
                }
                isSilent(e) {
                    for (let t = 0; t < e.length; t++)
                        if (Math.abs(e[t] - vc) > 2) return !1;
                    return !0;
                }
                static init(e, t) {
                    var n;
                    Wi(t, e),
                        (e.fftSize = 256),
                        e.connect(e.context.destination),
                        (e.quiet = lo(bc).pipe(
                            co(new Uint8Array(e.fftSize)),
                            fo(t => e.getByteTimeDomainData(t)),
                            F(t => e.isSilent(t)),
                            e => e.lift(new cc(void 0, void 0)),
                            (function(e, t = so) {
                                return e => e.lift(new hc(1e3, t));
                            })(),
                            ((n = e => e),
                            function(e) {
                                return e.lift(new gc(n, void 0));
                            }),
                            e => e.lift(new _c(1)),
                        ));
                }
            }
            class Cc extends DelayNode {
                constructor(e, t) {
                    const n = Qi(e, 'createDelay', Cc, t);
                    if (n) return n;
                    super(e), Cc.init(this, t);
                }
                ngOnDestroy() {
                    this.disconnect();
                }
                static init(e, t) {
                    Wi(t, e);
                }
            }
            Li(
                [Zi('delayTime'), Bi('design:type', Number)],
                Cc.prototype,
                'DelayNode',
                void 0,
            );
            class Ec extends BiquadFilterNode {
                constructor(e, t) {
                    const n = Qi(e, 'createBiquadFilter', Ec, t);
                    if (n) return n;
                    super(e), Ec.init(this, t);
                }
                ngOnDestroy() {
                    this.disconnect();
                }
                static init(e, t) {
                    Wi(t, e);
                }
            }
            Li(
                [Zi('gain'), Bi('design:type', Number)],
                Ec.prototype,
                'gainParam',
                void 0,
            ),
                Li(
                    [Zi('frequency'), Bi('design:type', Number)],
                    Ec.prototype,
                    'frequencyParam',
                    void 0,
                ),
                Li([Zi('Q'), Bi('design:type', Number)], Ec.prototype, 'qParam', void 0),
                Li(
                    [Zi('detune'), Bi('design:type', Number)],
                    Ec.prototype,
                    'detuneParam',
                    void 0,
                );
            class xc extends WaveShaperNode {
                constructor(e, t) {
                    const n = Qi(e, 'createWaveShaper', xc, t);
                    if (n) return n;
                    super(e), xc.init(this, t);
                }
                ngOnDestroy() {
                    this.disconnect();
                }
                static init(e, t) {
                    Wi(t, e);
                }
            }
            class Sc extends ConvolverNode {
                set bufferSetter(e) {
                    this.buffer$.next(e);
                }
                constructor(e, t, n) {
                    const r = Qi(t, 'createConvolver', Sc, n, e);
                    if (r) return r;
                    super(t), Sc.init(this, n, e);
                }
                ngOnDestroy() {
                    this.buffer$.complete(), this.disconnect();
                }
                static init(e, t, n) {
                    Wi(t, e),
                        (e.buffer$ = new S()),
                        e.buffer$
                            .pipe($i(e => ('string' == typeof e ? n.fetch(e) : Ui(e))))
                            .subscribe(t => {
                                e.buffer = t;
                            });
                }
            }
            class Tc {
                constructor(e) {
                    this.context = e;
                }
                transform(e, t, n) {
                    return this.context.createPeriodicWave(
                        new Float32Array(e),
                        t ? new Float32Array(t) : new Float32Array(e.length),
                        {disableNormalization: !!n},
                    );
                }
            }
            var Nc = zr({encapsulation: 2, styles: [], data: {}});
            function Ac(e) {
                return Il(
                    0,
                    [
                        (e()(),
                        _s(
                            0,
                            0,
                            null,
                            null,
                            8,
                            'button',
                            [
                                ['AudioBufferSourceNode', ''],
                                ['buffer', '/assets/demo.mp3'],
                            ],
                            null,
                            [[null, 'click']],
                            function(e, t, n) {
                                var r = !0;
                                return (
                                    'click' === t &&
                                        (r =
                                            !1 !==
                                                e.component.onClick(qs(e, 1), n.target) &&
                                            r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        ll(
                            1,
                            147456,
                            [['source', 4]],
                            0,
                            Ki,
                            [Yi, Ji, [8, null]],
                            {loop: [0, 'loop'], bufferSetter: [1, 'bufferSetter']},
                            null,
                        ),
                        il(2048, null, Xi, null, [Ki]),
                        (e()(), Nl(-1, null, [' Play '])),
                        (e()(),
                        _s(
                            4,
                            0,
                            null,
                            null,
                            4,
                            null,
                            null,
                            null,
                            null,
                            function(e, t, n) {
                                var r = !0;
                                return (
                                    'timeByte$' === t &&
                                        (r =
                                            !1 !==
                                                e.component.onTimeDomain(
                                                    n,
                                                    qs(e.parent.parent, 42),
                                                ) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        ll(5, 147456, null, 0, _o, [Ji, [1, Xi]], null, {
                            timeByte$: 'timeByte$',
                        }),
                        il(2048, null, Xi, null, [_o]),
                        (e()(),
                        _s(
                            7,
                            0,
                            null,
                            null,
                            1,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        ll(
                            8,
                            147456,
                            null,
                            0,
                            yo,
                            [Ji, [1, Xi]],
                            {Output: [0, 'Output']},
                            null,
                        ),
                    ],
                    function(e, t) {
                        var n = t.component;
                        e(t, 1, 0, !0, '/assets/demo.mp3'),
                            e(t, 8, 0, n.chain || qs(t.parent.parent, 44));
                    },
                    null,
                );
            }
            function kc(e) {
                return Il(
                    0,
                    [
                        (e()(),
                        _s(
                            0,
                            0,
                            null,
                            null,
                            2,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(), ms(16777216, null, null, 1, null, Ac)),
                        ll(
                            2,
                            278528,
                            null,
                            0,
                            Oo,
                            [Jn, Qt, _r],
                            {ngForOf: [0, 'ngForOf']},
                            null,
                        ),
                        (e()(), ms(0, null, null, 0)),
                    ],
                    function(e, t) {
                        e(t, 2, 0, t.component.buffers);
                    },
                    null,
                );
            }
            function Ic(e) {
                return Il(
                    0,
                    [
                        (e()(),
                        _s(
                            0,
                            0,
                            null,
                            null,
                            7,
                            'audio',
                            [
                                ['MediaElementAudioSourceNode', ''],
                                ['controls', ''],
                                ['loop', ''],
                                ['src', '/assets/demo.mp3'],
                            ],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        ll(1, 147456, null, 0, Bo, [Ji, pt], null, null),
                        il(2048, null, Xi, null, [Bo]),
                        (e()(),
                        _s(
                            3,
                            0,
                            null,
                            null,
                            4,
                            null,
                            null,
                            null,
                            null,
                            function(e, t, n) {
                                var r = !0;
                                return (
                                    'timeByte$' === t &&
                                        (r =
                                            !1 !==
                                                e.component.onTimeDomain(
                                                    n,
                                                    qs(e.parent, 42),
                                                ) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        ll(4, 147456, null, 0, _o, [Ji, [1, Xi]], null, {
                            timeByte$: 'timeByte$',
                        }),
                        il(2048, null, Xi, null, [_o]),
                        (e()(),
                        _s(
                            6,
                            0,
                            null,
                            null,
                            1,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        ll(
                            7,
                            147456,
                            null,
                            0,
                            yo,
                            [Ji, [1, Xi]],
                            {Output: [0, 'Output']},
                            null,
                        ),
                    ],
                    function(e, t) {
                        e(t, 7, 0, t.component.chain || qs(t.parent, 44));
                    },
                    null,
                );
            }
            function Vc(e) {
                return Il(
                    0,
                    [
                        (e()(),
                        _s(
                            0,
                            0,
                            null,
                            null,
                            9,
                            'button',
                            [['OscillatorNode', '']],
                            null,
                            [[null, 'click']],
                            function(e, t, n) {
                                var r = !0;
                                return (
                                    'click' === t &&
                                        (r =
                                            !1 !==
                                                e.component.onClick(qs(e, 1), n.target) &&
                                            r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        ll(
                            1,
                            147456,
                            [['source', 4]],
                            0,
                            Uo,
                            [Ji, [8, null]],
                            {periodicWave: [0, 'periodicWave']},
                            null,
                        ),
                        Tl(128, 2, new Array(2)),
                        il(2048, null, Xi, null, [Uo]),
                        (e()(), Nl(-1, null, [' Play '])),
                        (e()(),
                        _s(
                            5,
                            0,
                            null,
                            null,
                            4,
                            null,
                            null,
                            null,
                            null,
                            function(e, t, n) {
                                var r = !0;
                                return (
                                    'timeByte$' === t &&
                                        (r =
                                            !1 !==
                                                e.component.onTimeDomain(
                                                    n,
                                                    qs(e.parent.parent, 42),
                                                ) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        ll(6, 147456, null, 0, _o, [Ji, [1, Xi]], null, {
                            timeByte$: 'timeByte$',
                        }),
                        il(2048, null, Xi, null, [_o]),
                        (e()(),
                        _s(
                            8,
                            0,
                            null,
                            null,
                            1,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        ll(
                            9,
                            147456,
                            null,
                            0,
                            yo,
                            [Ji, [1, Xi]],
                            {Output: [0, 'Output']},
                            null,
                        ),
                    ],
                    function(e, t) {
                        var n = t.component,
                            r = (function(e, t, n, r) {
                                if (Ve.isWrapped(r)) {
                                    r = Ve.unwrap(r);
                                    const t = e.def.nodes[1].bindingIndex + 0,
                                        n = Ve.unwrap(e.oldValues[t]);
                                    e.oldValues[t] = new Ve(n);
                                }
                                return r;
                            })(t, 0, 0, e(t, 2, 0, qs(t.parent.parent, 0), n.real));
                        e(t, 1, 0, r), e(t, 9, 0, n.chain || qs(t.parent.parent, 44));
                    },
                    null,
                );
            }
            function Dc(e) {
                return Il(
                    0,
                    [
                        (e()(),
                        _s(
                            0,
                            0,
                            null,
                            null,
                            2,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(), ms(16777216, null, null, 1, null, Vc)),
                        ll(
                            2,
                            278528,
                            null,
                            0,
                            Oo,
                            [Jn, Qt, _r],
                            {ngForOf: [0, 'ngForOf']},
                            null,
                        ),
                        (e()(), ms(0, null, null, 0)),
                    ],
                    function(e, t) {
                        e(t, 2, 0, t.component.buffers);
                    },
                    null,
                );
            }
            function Oc(e) {
                return Il(
                    0,
                    [
                        (e()(),
                        _s(
                            0,
                            0,
                            null,
                            null,
                            28,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(),
                        _s(
                            1,
                            0,
                            null,
                            null,
                            27,
                            'fieldset',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        ll(
                            2,
                            147456,
                            [['chain', 4]],
                            0,
                            $o,
                            [Ji, [1, Xi]],
                            {GainNode: [0, 'GainNode']},
                            null,
                        ),
                        il(2048, null, Xi, null, [$o]),
                        (e()(),
                        _s(
                            4,
                            0,
                            null,
                            null,
                            1,
                            'legend',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(), Nl(-1, null, ['GainNode'])),
                        (e()(),
                        _s(
                            6,
                            0,
                            null,
                            null,
                            6,
                            'input',
                            [
                                ['max', '1'],
                                ['min', '0'],
                                ['step', '0.01'],
                                ['type', 'range'],
                            ],
                            [
                                [2, 'ng-untouched', null],
                                [2, 'ng-touched', null],
                                [2, 'ng-pristine', null],
                                [2, 'ng-dirty', null],
                                [2, 'ng-valid', null],
                                [2, 'ng-invalid', null],
                                [2, 'ng-pending', null],
                            ],
                            [
                                [null, 'ngModelChange'],
                                [null, 'input'],
                                [null, 'blur'],
                                [null, 'compositionstart'],
                                [null, 'compositionend'],
                                [null, 'change'],
                            ],
                            function(e, t, n) {
                                var r = !0,
                                    s = e.component;
                                return (
                                    'input' === t &&
                                        (r =
                                            !1 !==
                                                qs(e, 7)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== qs(e, 7).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== qs(e, 7)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                qs(e, 7)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r =
                                            !1 !== qs(e, 8).onChange(n.target.value) &&
                                            r),
                                    'input' === t &&
                                        (r =
                                            !1 !== qs(e, 8).onChange(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== qs(e, 8).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (s.gain = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        ll(7, 16384, null, 0, vu, [yt, pt, [2, yu]], null, null),
                        ll(8, 16384, null, 0, Tu, [yt, pt], null, null),
                        il(
                            1024,
                            null,
                            _u,
                            function(e, t) {
                                return [e, t];
                            },
                            [vu, Tu],
                        ),
                        ll(
                            10,
                            671744,
                            null,
                            0,
                            ic,
                            [[8, null], [8, null], [8, null], [6, _u]],
                            {model: [0, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        il(2048, null, Eu, null, [ic]),
                        ll(12, 16384, null, 0, Uu, [[4, Eu]], null, null),
                        (e()(),
                        _s(
                            13,
                            0,
                            null,
                            null,
                            15,
                            'fieldset',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        ll(
                            14,
                            147456,
                            null,
                            0,
                            uc,
                            [Ji, [1, Xi]],
                            {StereoPannerNode: [0, 'StereoPannerNode']},
                            null,
                        ),
                        il(2048, null, Xi, null, [uc]),
                        (e()(),
                        _s(
                            16,
                            0,
                            null,
                            null,
                            1,
                            'legend',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(), Nl(-1, null, ['StereoPannerNode'])),
                        (e()(),
                        _s(
                            18,
                            0,
                            null,
                            null,
                            6,
                            'input',
                            [
                                ['max', '1'],
                                ['min', '-1'],
                                ['step', '0.01'],
                                ['type', 'range'],
                            ],
                            [
                                [2, 'ng-untouched', null],
                                [2, 'ng-touched', null],
                                [2, 'ng-pristine', null],
                                [2, 'ng-dirty', null],
                                [2, 'ng-valid', null],
                                [2, 'ng-invalid', null],
                                [2, 'ng-pending', null],
                            ],
                            [
                                [null, 'ngModelChange'],
                                [null, 'input'],
                                [null, 'blur'],
                                [null, 'compositionstart'],
                                [null, 'compositionend'],
                                [null, 'change'],
                            ],
                            function(e, t, n) {
                                var r = !0,
                                    s = e.component;
                                return (
                                    'input' === t &&
                                        (r =
                                            !1 !==
                                                qs(e, 19)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== qs(e, 19).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== qs(e, 19)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                qs(e, 19)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r =
                                            !1 !== qs(e, 20).onChange(n.target.value) &&
                                            r),
                                    'input' === t &&
                                        (r =
                                            !1 !== qs(e, 20).onChange(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== qs(e, 20).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (s.pan = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        ll(19, 16384, null, 0, vu, [yt, pt, [2, yu]], null, null),
                        ll(20, 16384, null, 0, Tu, [yt, pt], null, null),
                        il(
                            1024,
                            null,
                            _u,
                            function(e, t) {
                                return [e, t];
                            },
                            [vu, Tu],
                        ),
                        ll(
                            22,
                            671744,
                            null,
                            0,
                            ic,
                            [[8, null], [8, null], [8, null], [6, _u]],
                            {model: [0, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        il(2048, null, Eu, null, [ic]),
                        ll(24, 16384, null, 0, Uu, [[4, Eu]], null, null),
                        (e()(),
                        _s(
                            25,
                            0,
                            null,
                            null,
                            3,
                            'fieldset',
                            [['AudioDestinationNode', '']],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        ll(26, 147456, null, 0, wc, [Ji, Xi], null, null),
                        (e()(),
                        _s(
                            27,
                            0,
                            null,
                            null,
                            1,
                            'legend',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(), Nl(-1, null, ['AudioDestinationNode'])),
                    ],
                    function(e, t) {
                        var n = t.component;
                        e(t, 2, 0, n.gain),
                            e(t, 10, 0, n.gain),
                            e(t, 14, 0, n.pan),
                            e(t, 22, 0, n.pan);
                    },
                    function(e, t) {
                        e(
                            t,
                            6,
                            0,
                            qs(t, 12).ngClassUntouched,
                            qs(t, 12).ngClassTouched,
                            qs(t, 12).ngClassPristine,
                            qs(t, 12).ngClassDirty,
                            qs(t, 12).ngClassValid,
                            qs(t, 12).ngClassInvalid,
                            qs(t, 12).ngClassPending,
                        ),
                            e(
                                t,
                                18,
                                0,
                                qs(t, 24).ngClassUntouched,
                                qs(t, 24).ngClassTouched,
                                qs(t, 24).ngClassPristine,
                                qs(t, 24).ngClassDirty,
                                qs(t, 24).ngClassValid,
                                qs(t, 24).ngClassInvalid,
                                qs(t, 24).ngClassPending,
                            );
                    },
                );
            }
            function Mc(e) {
                return Il(
                    0,
                    [
                        (e()(),
                        _s(
                            0,
                            0,
                            null,
                            null,
                            41,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(),
                        _s(
                            1,
                            0,
                            null,
                            null,
                            40,
                            'fieldset',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        ll(
                            2,
                            147456,
                            [['chain', 4]],
                            0,
                            $o,
                            [Ji, [1, Xi]],
                            {GainNode: [0, 'GainNode']},
                            null,
                        ),
                        il(2048, null, Xi, null, [$o]),
                        (e()(),
                        _s(
                            4,
                            0,
                            null,
                            null,
                            1,
                            'legend',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(), Nl(-1, null, ['GainNode'])),
                        (e()(),
                        _s(6, 0, null, null, 1, 'em', [], null, null, null, null, null)),
                        (e()(), Nl(-1, null, ['For feedback loop purposes only'])),
                        (e()(),
                        _s(
                            8,
                            0,
                            null,
                            null,
                            29,
                            'fieldset',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        ll(
                            9,
                            147456,
                            null,
                            0,
                            Cc,
                            [Ji, [1, Xi]],
                            {DelayNode: [0, 'DelayNode']},
                            null,
                        ),
                        il(2048, null, Xi, null, [Cc]),
                        (e()(),
                        _s(
                            11,
                            0,
                            null,
                            null,
                            1,
                            'legend',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(), Nl(-1, null, ['DelayNode'])),
                        (e()(),
                        _s(
                            13,
                            0,
                            null,
                            null,
                            6,
                            'input',
                            [
                                ['max', '1'],
                                ['min', '0'],
                                ['step', '0.01'],
                                ['type', 'range'],
                            ],
                            [
                                [2, 'ng-untouched', null],
                                [2, 'ng-touched', null],
                                [2, 'ng-pristine', null],
                                [2, 'ng-dirty', null],
                                [2, 'ng-valid', null],
                                [2, 'ng-invalid', null],
                                [2, 'ng-pending', null],
                            ],
                            [
                                [null, 'ngModelChange'],
                                [null, 'input'],
                                [null, 'blur'],
                                [null, 'compositionstart'],
                                [null, 'compositionend'],
                                [null, 'change'],
                            ],
                            function(e, t, n) {
                                var r = !0,
                                    s = e.component;
                                return (
                                    'input' === t &&
                                        (r =
                                            !1 !==
                                                qs(e, 14)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== qs(e, 14).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== qs(e, 14)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                qs(e, 14)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r =
                                            !1 !== qs(e, 15).onChange(n.target.value) &&
                                            r),
                                    'input' === t &&
                                        (r =
                                            !1 !== qs(e, 15).onChange(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== qs(e, 15).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (s.delayTime = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        ll(14, 16384, null, 0, vu, [yt, pt, [2, yu]], null, null),
                        ll(15, 16384, null, 0, Tu, [yt, pt], null, null),
                        il(
                            1024,
                            null,
                            _u,
                            function(e, t) {
                                return [e, t];
                            },
                            [vu, Tu],
                        ),
                        ll(
                            17,
                            671744,
                            null,
                            0,
                            ic,
                            [[8, null], [8, null], [8, null], [6, _u]],
                            {model: [0, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        il(2048, null, Eu, null, [ic]),
                        ll(19, 16384, null, 0, Uu, [[4, Eu]], null, null),
                        (e()(),
                        _s(
                            20,
                            0,
                            null,
                            null,
                            17,
                            'fieldset',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        ll(
                            21,
                            147456,
                            null,
                            0,
                            $o,
                            [Ji, [1, Xi]],
                            {GainNode: [0, 'GainNode']},
                            null,
                        ),
                        il(2048, null, Xi, null, [$o]),
                        (e()(),
                        _s(
                            23,
                            0,
                            null,
                            null,
                            1,
                            'legend',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(), Nl(-1, null, ['GainNode'])),
                        (e()(),
                        _s(
                            25,
                            0,
                            null,
                            null,
                            6,
                            'input',
                            [
                                ['max', '1'],
                                ['min', '0'],
                                ['step', '0.01'],
                                ['type', 'range'],
                            ],
                            [
                                [2, 'ng-untouched', null],
                                [2, 'ng-touched', null],
                                [2, 'ng-pristine', null],
                                [2, 'ng-dirty', null],
                                [2, 'ng-valid', null],
                                [2, 'ng-invalid', null],
                                [2, 'ng-pending', null],
                            ],
                            [
                                [null, 'ngModelChange'],
                                [null, 'input'],
                                [null, 'blur'],
                                [null, 'compositionstart'],
                                [null, 'compositionend'],
                                [null, 'change'],
                            ],
                            function(e, t, n) {
                                var r = !0,
                                    s = e.component;
                                return (
                                    'input' === t &&
                                        (r =
                                            !1 !==
                                                qs(e, 26)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== qs(e, 26).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== qs(e, 26)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                qs(e, 26)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r =
                                            !1 !== qs(e, 27).onChange(n.target.value) &&
                                            r),
                                    'input' === t &&
                                        (r =
                                            !1 !== qs(e, 27).onChange(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== qs(e, 27).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (s.delayGain = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        ll(26, 16384, null, 0, vu, [yt, pt, [2, yu]], null, null),
                        ll(27, 16384, null, 0, Tu, [yt, pt], null, null),
                        il(
                            1024,
                            null,
                            _u,
                            function(e, t) {
                                return [e, t];
                            },
                            [vu, Tu],
                        ),
                        ll(
                            29,
                            671744,
                            null,
                            0,
                            ic,
                            [[8, null], [8, null], [8, null], [6, _u]],
                            {model: [0, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        il(2048, null, Eu, null, [ic]),
                        ll(31, 16384, null, 0, Uu, [[4, Eu]], null, null),
                        (e()(),
                        _s(
                            32,
                            0,
                            null,
                            null,
                            5,
                            'fieldset',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        ll(
                            33,
                            147456,
                            null,
                            0,
                            yo,
                            [Ji, [1, Xi]],
                            {Output: [0, 'Output']},
                            null,
                        ),
                        (e()(),
                        _s(
                            34,
                            0,
                            null,
                            null,
                            1,
                            'legend',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(), Nl(-1, null, ['Output'])),
                        (e()(),
                        _s(36, 0, null, null, 1, 'em', [], null, null, null, null, null)),
                        (e()(),
                        Nl(-1, null, ['Connected back to the beginning of the chain'])),
                        (e()(),
                        _s(
                            38,
                            0,
                            null,
                            null,
                            3,
                            'fieldset',
                            [['AudioDestinationNode', '']],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        ll(39, 147456, null, 0, wc, [Ji, Xi], null, null),
                        (e()(),
                        _s(
                            40,
                            0,
                            null,
                            null,
                            1,
                            'legend',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(), Nl(-1, null, ['AudioDestinationNode'])),
                    ],
                    function(e, t) {
                        var n = t.component;
                        e(t, 2, 0, n.gain),
                            e(t, 9, 0, n.delayTime),
                            e(t, 17, 0, n.delayTime),
                            e(t, 21, 0, n.delayGain),
                            e(t, 29, 0, n.delayGain),
                            e(t, 33, 0, qs(t, 2));
                    },
                    function(e, t) {
                        e(
                            t,
                            13,
                            0,
                            qs(t, 19).ngClassUntouched,
                            qs(t, 19).ngClassTouched,
                            qs(t, 19).ngClassPristine,
                            qs(t, 19).ngClassDirty,
                            qs(t, 19).ngClassValid,
                            qs(t, 19).ngClassInvalid,
                            qs(t, 19).ngClassPending,
                        ),
                            e(
                                t,
                                25,
                                0,
                                qs(t, 31).ngClassUntouched,
                                qs(t, 31).ngClassTouched,
                                qs(t, 31).ngClassPristine,
                                qs(t, 31).ngClassDirty,
                                qs(t, 31).ngClassValid,
                                qs(t, 31).ngClassInvalid,
                                qs(t, 31).ngClassPending,
                            );
                    },
                );
            }
            function Pc(e) {
                return Il(
                    0,
                    [
                        (e()(),
                        _s(
                            0,
                            0,
                            null,
                            null,
                            110,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(),
                        _s(
                            1,
                            0,
                            null,
                            null,
                            109,
                            'fieldset',
                            [['BiquadFilterNode', '']],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        ll(
                            2,
                            147456,
                            [['chain', 4]],
                            0,
                            Ec,
                            [Ji, [1, Xi]],
                            {
                                type: [0, 'type'],
                                gainParam: [1, 'gainParam'],
                                frequencyParam: [2, 'frequencyParam'],
                                qParam: [3, 'qParam'],
                                detuneParam: [4, 'detuneParam'],
                            },
                            null,
                        ),
                        il(2048, null, Xi, null, [Ec]),
                        (e()(),
                        _s(
                            4,
                            0,
                            null,
                            null,
                            1,
                            'legend',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(), Nl(-1, null, ['BiquadFilterNode'])),
                        (e()(),
                        _s(
                            6,
                            0,
                            null,
                            null,
                            40,
                            'label',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(),
                        _s(
                            7,
                            0,
                            null,
                            null,
                            37,
                            'select',
                            [],
                            [
                                [2, 'ng-untouched', null],
                                [2, 'ng-touched', null],
                                [2, 'ng-pristine', null],
                                [2, 'ng-dirty', null],
                                [2, 'ng-valid', null],
                                [2, 'ng-invalid', null],
                                [2, 'ng-pending', null],
                            ],
                            [[null, 'ngModelChange'], [null, 'change'], [null, 'blur']],
                            function(e, t, n) {
                                var r = !0,
                                    s = e.component;
                                return (
                                    'change' === t &&
                                        (r =
                                            !1 !== qs(e, 8).onChange(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== qs(e, 8).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (s.type = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        ll(8, 16384, null, 0, ku, [yt, pt], null, null),
                        il(
                            1024,
                            null,
                            _u,
                            function(e) {
                                return [e];
                            },
                            [ku],
                        ),
                        ll(
                            10,
                            671744,
                            null,
                            0,
                            ic,
                            [[8, null], [8, null], [8, null], [6, _u]],
                            {model: [0, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        il(2048, null, Eu, null, [ic]),
                        ll(12, 16384, null, 0, Uu, [[4, Eu]], null, null),
                        (e()(),
                        _s(
                            13,
                            0,
                            null,
                            null,
                            3,
                            'option',
                            [['value', 'lowpass']],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        ll(
                            14,
                            147456,
                            null,
                            0,
                            Iu,
                            [pt, yt, [2, ku]],
                            {value: [0, 'value']},
                            null,
                        ),
                        ll(
                            15,
                            147456,
                            null,
                            0,
                            Du,
                            [pt, yt, [8, null]],
                            {value: [0, 'value']},
                            null,
                        ),
                        (e()(), Nl(-1, null, ['lowpass'])),
                        (e()(),
                        _s(
                            17,
                            0,
                            null,
                            null,
                            3,
                            'option',
                            [['value', 'highpass']],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        ll(
                            18,
                            147456,
                            null,
                            0,
                            Iu,
                            [pt, yt, [2, ku]],
                            {value: [0, 'value']},
                            null,
                        ),
                        ll(
                            19,
                            147456,
                            null,
                            0,
                            Du,
                            [pt, yt, [8, null]],
                            {value: [0, 'value']},
                            null,
                        ),
                        (e()(), Nl(-1, null, ['highpass'])),
                        (e()(),
                        _s(
                            21,
                            0,
                            null,
                            null,
                            3,
                            'option',
                            [['value', 'bandpass']],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        ll(
                            22,
                            147456,
                            null,
                            0,
                            Iu,
                            [pt, yt, [2, ku]],
                            {value: [0, 'value']},
                            null,
                        ),
                        ll(
                            23,
                            147456,
                            null,
                            0,
                            Du,
                            [pt, yt, [8, null]],
                            {value: [0, 'value']},
                            null,
                        ),
                        (e()(), Nl(-1, null, ['bandpass'])),
                        (e()(),
                        _s(
                            25,
                            0,
                            null,
                            null,
                            3,
                            'option',
                            [['value', 'lowshelf']],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        ll(
                            26,
                            147456,
                            null,
                            0,
                            Iu,
                            [pt, yt, [2, ku]],
                            {value: [0, 'value']},
                            null,
                        ),
                        ll(
                            27,
                            147456,
                            null,
                            0,
                            Du,
                            [pt, yt, [8, null]],
                            {value: [0, 'value']},
                            null,
                        ),
                        (e()(), Nl(-1, null, ['lowshelf'])),
                        (e()(),
                        _s(
                            29,
                            0,
                            null,
                            null,
                            3,
                            'option',
                            [['value', 'highshelf']],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        ll(
                            30,
                            147456,
                            null,
                            0,
                            Iu,
                            [pt, yt, [2, ku]],
                            {value: [0, 'value']},
                            null,
                        ),
                        ll(
                            31,
                            147456,
                            null,
                            0,
                            Du,
                            [pt, yt, [8, null]],
                            {value: [0, 'value']},
                            null,
                        ),
                        (e()(), Nl(-1, null, ['highshelf'])),
                        (e()(),
                        _s(
                            33,
                            0,
                            null,
                            null,
                            3,
                            'option',
                            [['value', 'peaking']],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        ll(
                            34,
                            147456,
                            null,
                            0,
                            Iu,
                            [pt, yt, [2, ku]],
                            {value: [0, 'value']},
                            null,
                        ),
                        ll(
                            35,
                            147456,
                            null,
                            0,
                            Du,
                            [pt, yt, [8, null]],
                            {value: [0, 'value']},
                            null,
                        ),
                        (e()(), Nl(-1, null, ['peaking'])),
                        (e()(),
                        _s(
                            37,
                            0,
                            null,
                            null,
                            3,
                            'option',
                            [['value', 'notch']],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        ll(
                            38,
                            147456,
                            null,
                            0,
                            Iu,
                            [pt, yt, [2, ku]],
                            {value: [0, 'value']},
                            null,
                        ),
                        ll(
                            39,
                            147456,
                            null,
                            0,
                            Du,
                            [pt, yt, [8, null]],
                            {value: [0, 'value']},
                            null,
                        ),
                        (e()(), Nl(-1, null, ['notch'])),
                        (e()(),
                        _s(
                            41,
                            0,
                            null,
                            null,
                            3,
                            'option',
                            [['value', 'allpass']],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        ll(
                            42,
                            147456,
                            null,
                            0,
                            Iu,
                            [pt, yt, [2, ku]],
                            {value: [0, 'value']},
                            null,
                        ),
                        ll(
                            43,
                            147456,
                            null,
                            0,
                            Du,
                            [pt, yt, [8, null]],
                            {value: [0, 'value']},
                            null,
                        ),
                        (e()(), Nl(-1, null, ['allpass'])),
                        (e()(),
                        _s(
                            45,
                            0,
                            null,
                            null,
                            1,
                            'code',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(), Nl(-1, null, ['type'])),
                        (e()(),
                        _s(
                            47,
                            0,
                            null,
                            null,
                            9,
                            'label',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(),
                        _s(
                            48,
                            0,
                            null,
                            null,
                            6,
                            'input',
                            [
                                ['max', '1'],
                                ['min', '0'],
                                ['step', '0.01'],
                                ['type', 'range'],
                            ],
                            [
                                [2, 'ng-untouched', null],
                                [2, 'ng-touched', null],
                                [2, 'ng-pristine', null],
                                [2, 'ng-dirty', null],
                                [2, 'ng-valid', null],
                                [2, 'ng-invalid', null],
                                [2, 'ng-pending', null],
                            ],
                            [
                                [null, 'ngModelChange'],
                                [null, 'input'],
                                [null, 'blur'],
                                [null, 'compositionstart'],
                                [null, 'compositionend'],
                                [null, 'change'],
                            ],
                            function(e, t, n) {
                                var r = !0,
                                    s = e.component;
                                return (
                                    'input' === t &&
                                        (r =
                                            !1 !==
                                                qs(e, 49)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== qs(e, 49).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== qs(e, 49)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                qs(e, 49)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r =
                                            !1 !== qs(e, 50).onChange(n.target.value) &&
                                            r),
                                    'input' === t &&
                                        (r =
                                            !1 !== qs(e, 50).onChange(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== qs(e, 50).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (s.filterGain = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        ll(49, 16384, null, 0, vu, [yt, pt, [2, yu]], null, null),
                        ll(50, 16384, null, 0, Tu, [yt, pt], null, null),
                        il(
                            1024,
                            null,
                            _u,
                            function(e, t) {
                                return [e, t];
                            },
                            [vu, Tu],
                        ),
                        ll(
                            52,
                            671744,
                            null,
                            0,
                            ic,
                            [[8, null], [8, null], [8, null], [6, _u]],
                            {model: [0, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        il(2048, null, Eu, null, [ic]),
                        ll(54, 16384, null, 0, Uu, [[4, Eu]], null, null),
                        (e()(),
                        _s(
                            55,
                            0,
                            null,
                            null,
                            1,
                            'code',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(), Nl(-1, null, ['gain'])),
                        (e()(),
                        _s(
                            57,
                            0,
                            null,
                            null,
                            9,
                            'label',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(),
                        _s(
                            58,
                            0,
                            null,
                            null,
                            6,
                            'input',
                            [['max', '5000'], ['min', '20'], ['type', 'range']],
                            [
                                [2, 'ng-untouched', null],
                                [2, 'ng-touched', null],
                                [2, 'ng-pristine', null],
                                [2, 'ng-dirty', null],
                                [2, 'ng-valid', null],
                                [2, 'ng-invalid', null],
                                [2, 'ng-pending', null],
                            ],
                            [
                                [null, 'ngModelChange'],
                                [null, 'input'],
                                [null, 'blur'],
                                [null, 'compositionstart'],
                                [null, 'compositionend'],
                                [null, 'change'],
                            ],
                            function(e, t, n) {
                                var r = !0,
                                    s = e.component;
                                return (
                                    'input' === t &&
                                        (r =
                                            !1 !==
                                                qs(e, 59)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== qs(e, 59).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== qs(e, 59)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                qs(e, 59)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r =
                                            !1 !== qs(e, 60).onChange(n.target.value) &&
                                            r),
                                    'input' === t &&
                                        (r =
                                            !1 !== qs(e, 60).onChange(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== qs(e, 60).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (s.frequency = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        ll(59, 16384, null, 0, vu, [yt, pt, [2, yu]], null, null),
                        ll(60, 16384, null, 0, Tu, [yt, pt], null, null),
                        il(
                            1024,
                            null,
                            _u,
                            function(e, t) {
                                return [e, t];
                            },
                            [vu, Tu],
                        ),
                        ll(
                            62,
                            671744,
                            null,
                            0,
                            ic,
                            [[8, null], [8, null], [8, null], [6, _u]],
                            {model: [0, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        il(2048, null, Eu, null, [ic]),
                        ll(64, 16384, null, 0, Uu, [[4, Eu]], null, null),
                        (e()(),
                        _s(
                            65,
                            0,
                            null,
                            null,
                            1,
                            'code',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(), Nl(-1, null, ['frequency'])),
                        (e()(),
                        _s(
                            67,
                            0,
                            null,
                            null,
                            9,
                            'label',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(),
                        _s(
                            68,
                            0,
                            null,
                            null,
                            6,
                            'input',
                            [['max', '100'], ['min', '1'], ['type', 'range']],
                            [
                                [2, 'ng-untouched', null],
                                [2, 'ng-touched', null],
                                [2, 'ng-pristine', null],
                                [2, 'ng-dirty', null],
                                [2, 'ng-valid', null],
                                [2, 'ng-invalid', null],
                                [2, 'ng-pending', null],
                            ],
                            [
                                [null, 'ngModelChange'],
                                [null, 'input'],
                                [null, 'blur'],
                                [null, 'compositionstart'],
                                [null, 'compositionend'],
                                [null, 'change'],
                            ],
                            function(e, t, n) {
                                var r = !0,
                                    s = e.component;
                                return (
                                    'input' === t &&
                                        (r =
                                            !1 !==
                                                qs(e, 69)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== qs(e, 69).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== qs(e, 69)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                qs(e, 69)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r =
                                            !1 !== qs(e, 70).onChange(n.target.value) &&
                                            r),
                                    'input' === t &&
                                        (r =
                                            !1 !== qs(e, 70).onChange(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== qs(e, 70).onTouched() && r),
                                    'ngModelChange' === t && (r = !1 !== (s.Q = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        ll(69, 16384, null, 0, vu, [yt, pt, [2, yu]], null, null),
                        ll(70, 16384, null, 0, Tu, [yt, pt], null, null),
                        il(
                            1024,
                            null,
                            _u,
                            function(e, t) {
                                return [e, t];
                            },
                            [vu, Tu],
                        ),
                        ll(
                            72,
                            671744,
                            null,
                            0,
                            ic,
                            [[8, null], [8, null], [8, null], [6, _u]],
                            {model: [0, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        il(2048, null, Eu, null, [ic]),
                        ll(74, 16384, null, 0, Uu, [[4, Eu]], null, null),
                        (e()(),
                        _s(
                            75,
                            0,
                            null,
                            null,
                            1,
                            'code',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(), Nl(-1, null, ['Q'])),
                        (e()(),
                        _s(
                            77,
                            0,
                            null,
                            null,
                            9,
                            'label',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(),
                        _s(
                            78,
                            0,
                            null,
                            null,
                            6,
                            'input',
                            [['max', '100'], ['min', '0'], ['type', 'range']],
                            [
                                [2, 'ng-untouched', null],
                                [2, 'ng-touched', null],
                                [2, 'ng-pristine', null],
                                [2, 'ng-dirty', null],
                                [2, 'ng-valid', null],
                                [2, 'ng-invalid', null],
                                [2, 'ng-pending', null],
                            ],
                            [
                                [null, 'ngModelChange'],
                                [null, 'input'],
                                [null, 'blur'],
                                [null, 'compositionstart'],
                                [null, 'compositionend'],
                                [null, 'change'],
                            ],
                            function(e, t, n) {
                                var r = !0,
                                    s = e.component;
                                return (
                                    'input' === t &&
                                        (r =
                                            !1 !==
                                                qs(e, 79)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== qs(e, 79).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== qs(e, 79)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                qs(e, 79)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r =
                                            !1 !== qs(e, 80).onChange(n.target.value) &&
                                            r),
                                    'input' === t &&
                                        (r =
                                            !1 !== qs(e, 80).onChange(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== qs(e, 80).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (s.detune = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        ll(79, 16384, null, 0, vu, [yt, pt, [2, yu]], null, null),
                        ll(80, 16384, null, 0, Tu, [yt, pt], null, null),
                        il(
                            1024,
                            null,
                            _u,
                            function(e, t) {
                                return [e, t];
                            },
                            [vu, Tu],
                        ),
                        ll(
                            82,
                            671744,
                            null,
                            0,
                            ic,
                            [[8, null], [8, null], [8, null], [6, _u]],
                            {model: [0, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        il(2048, null, Eu, null, [ic]),
                        ll(84, 16384, null, 0, Uu, [[4, Eu]], null, null),
                        (e()(),
                        _s(
                            85,
                            0,
                            null,
                            null,
                            1,
                            'code',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(), Nl(-1, null, ['detune'])),
                        (e()(),
                        _s(
                            87,
                            0,
                            null,
                            null,
                            23,
                            'fieldset',
                            [['WaveShaperNode', ''], ['oversample', '4x']],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        ll(
                            88,
                            147456,
                            null,
                            0,
                            xc,
                            [Ji, [1, Xi]],
                            {oversample: [0, 'oversample'], curve: [1, 'curve']},
                            null,
                        ),
                        il(2048, null, Xi, null, [xc]),
                        (e()(),
                        _s(
                            90,
                            0,
                            null,
                            null,
                            1,
                            'legend',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(), Nl(-1, null, ['WaveShaperNode'])),
                        (e()(),
                        _s(
                            92,
                            0,
                            null,
                            null,
                            6,
                            'input',
                            [
                                ['max', '20'],
                                ['min', '0'],
                                ['step', '0.1'],
                                ['type', 'range'],
                            ],
                            [
                                [2, 'ng-untouched', null],
                                [2, 'ng-touched', null],
                                [2, 'ng-pristine', null],
                                [2, 'ng-dirty', null],
                                [2, 'ng-valid', null],
                                [2, 'ng-invalid', null],
                                [2, 'ng-pending', null],
                            ],
                            [
                                [null, 'ngModelChange'],
                                [null, 'input'],
                                [null, 'blur'],
                                [null, 'compositionstart'],
                                [null, 'compositionend'],
                                [null, 'change'],
                            ],
                            function(e, t, n) {
                                var r = !0,
                                    s = e.component;
                                return (
                                    'input' === t &&
                                        (r =
                                            !1 !==
                                                qs(e, 93)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== qs(e, 93).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== qs(e, 93)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                qs(e, 93)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r =
                                            !1 !== qs(e, 94).onChange(n.target.value) &&
                                            r),
                                    'input' === t &&
                                        (r =
                                            !1 !== qs(e, 94).onChange(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== qs(e, 94).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== s.onCurveChange(n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        ll(93, 16384, null, 0, vu, [yt, pt, [2, yu]], null, null),
                        ll(94, 16384, null, 0, Tu, [yt, pt], null, null),
                        il(
                            1024,
                            null,
                            _u,
                            function(e, t) {
                                return [e, t];
                            },
                            [vu, Tu],
                        ),
                        ll(
                            96,
                            671744,
                            null,
                            0,
                            ic,
                            [[8, null], [8, null], [8, null], [6, _u]],
                            {model: [0, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        il(2048, null, Eu, null, [ic]),
                        ll(98, 16384, null, 0, Uu, [[4, Eu]], null, null),
                        (e()(),
                        _s(
                            99,
                            0,
                            null,
                            null,
                            11,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        ll(
                            100,
                            147456,
                            null,
                            0,
                            $o,
                            [Ji, [1, Xi]],
                            {GainNode: [0, 'GainNode']},
                            null,
                        ),
                        il(2048, null, Xi, null, [$o]),
                        (e()(),
                        _s(
                            102,
                            0,
                            null,
                            null,
                            8,
                            'fieldset',
                            [['ConvolverNode', ''], ['buffer', '/assets/response.m4a']],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        ll(
                            103,
                            147456,
                            null,
                            0,
                            Sc,
                            [Yi, Ji, [1, Xi]],
                            {bufferSetter: [0, 'bufferSetter']},
                            null,
                        ),
                        il(2048, null, Xi, null, [Sc]),
                        (e()(),
                        _s(
                            105,
                            0,
                            null,
                            null,
                            1,
                            'legend',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(), Nl(-1, null, ['ConvolverNode'])),
                        (e()(),
                        _s(
                            107,
                            0,
                            null,
                            null,
                            3,
                            'fieldset',
                            [['AudioDestinationNode', '']],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        ll(108, 147456, null, 0, wc, [Ji, Xi], null, null),
                        (e()(),
                        _s(
                            109,
                            0,
                            null,
                            null,
                            1,
                            'legend',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(), Nl(-1, null, ['AudioDestinationNode'])),
                    ],
                    function(e, t) {
                        var n = t.component;
                        e(t, 2, 0, n.type, n.filterGain, n.frequency, n.Q, n.detune),
                            e(t, 10, 0, n.type),
                            e(t, 14, 0, 'lowpass'),
                            e(t, 15, 0, 'lowpass'),
                            e(t, 18, 0, 'highpass'),
                            e(t, 19, 0, 'highpass'),
                            e(t, 22, 0, 'bandpass'),
                            e(t, 23, 0, 'bandpass'),
                            e(t, 26, 0, 'lowshelf'),
                            e(t, 27, 0, 'lowshelf'),
                            e(t, 30, 0, 'highshelf'),
                            e(t, 31, 0, 'highshelf'),
                            e(t, 34, 0, 'peaking'),
                            e(t, 35, 0, 'peaking'),
                            e(t, 38, 0, 'notch'),
                            e(t, 39, 0, 'notch'),
                            e(t, 42, 0, 'allpass'),
                            e(t, 43, 0, 'allpass'),
                            e(t, 52, 0, n.filterGain),
                            e(t, 62, 0, n.frequency),
                            e(t, 72, 0, n.Q),
                            e(t, 82, 0, n.detune),
                            e(t, 88, 0, '4x', n.curve),
                            e(t, 96, 0, n.distortion),
                            e(t, 100, 0, n.distortionCompensation),
                            e(t, 103, 0, '/assets/response.m4a');
                    },
                    function(e, t) {
                        e(
                            t,
                            7,
                            0,
                            qs(t, 12).ngClassUntouched,
                            qs(t, 12).ngClassTouched,
                            qs(t, 12).ngClassPristine,
                            qs(t, 12).ngClassDirty,
                            qs(t, 12).ngClassValid,
                            qs(t, 12).ngClassInvalid,
                            qs(t, 12).ngClassPending,
                        ),
                            e(
                                t,
                                48,
                                0,
                                qs(t, 54).ngClassUntouched,
                                qs(t, 54).ngClassTouched,
                                qs(t, 54).ngClassPristine,
                                qs(t, 54).ngClassDirty,
                                qs(t, 54).ngClassValid,
                                qs(t, 54).ngClassInvalid,
                                qs(t, 54).ngClassPending,
                            ),
                            e(
                                t,
                                58,
                                0,
                                qs(t, 64).ngClassUntouched,
                                qs(t, 64).ngClassTouched,
                                qs(t, 64).ngClassPristine,
                                qs(t, 64).ngClassDirty,
                                qs(t, 64).ngClassValid,
                                qs(t, 64).ngClassInvalid,
                                qs(t, 64).ngClassPending,
                            ),
                            e(
                                t,
                                68,
                                0,
                                qs(t, 74).ngClassUntouched,
                                qs(t, 74).ngClassTouched,
                                qs(t, 74).ngClassPristine,
                                qs(t, 74).ngClassDirty,
                                qs(t, 74).ngClassValid,
                                qs(t, 74).ngClassInvalid,
                                qs(t, 74).ngClassPending,
                            ),
                            e(
                                t,
                                78,
                                0,
                                qs(t, 84).ngClassUntouched,
                                qs(t, 84).ngClassTouched,
                                qs(t, 84).ngClassPristine,
                                qs(t, 84).ngClassDirty,
                                qs(t, 84).ngClassValid,
                                qs(t, 84).ngClassInvalid,
                                qs(t, 84).ngClassPending,
                            ),
                            e(
                                t,
                                92,
                                0,
                                qs(t, 98).ngClassUntouched,
                                qs(t, 98).ngClassTouched,
                                qs(t, 98).ngClassPristine,
                                qs(t, 98).ngClassDirty,
                                qs(t, 98).ngClassValid,
                                qs(t, 98).ngClassInvalid,
                                qs(t, 98).ngClassPending,
                            );
                    },
                );
            }
            function Rc(e) {
                return Il(
                    2,
                    [
                        ((t = 0),
                        (n = Tc),
                        (r = [Ji]),
                        ol(-1, (t |= 16), null, 0, n, n, r)),
                        (e()(),
                        _s(1, 0, null, null, 1, 'h1', [], null, null, null, null, null)),
                        (e()(), Nl(-1, null, ['Source'])),
                        (e()(),
                        _s(3, 0, null, null, 9, 'p', [], null, null, null, null, null)),
                        (e()(),
                        _s(
                            4,
                            0,
                            null,
                            null,
                            8,
                            'label',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(),
                        _s(
                            5,
                            0,
                            null,
                            null,
                            6,
                            'input',
                            [['name', 'source'], ['type', 'radio'], ['value', 'buffer']],
                            [
                                [2, 'ng-untouched', null],
                                [2, 'ng-touched', null],
                                [2, 'ng-pristine', null],
                                [2, 'ng-dirty', null],
                                [2, 'ng-valid', null],
                                [2, 'ng-invalid', null],
                                [2, 'ng-pending', null],
                            ],
                            [
                                [null, 'ngModelChange'],
                                [null, 'input'],
                                [null, 'blur'],
                                [null, 'compositionstart'],
                                [null, 'compositionend'],
                                [null, 'change'],
                            ],
                            function(e, t, n) {
                                var r = !0,
                                    s = e.component;
                                return (
                                    'input' === t &&
                                        (r =
                                            !1 !==
                                                qs(e, 6)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== qs(e, 6).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== qs(e, 6)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                qs(e, 6)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r = !1 !== qs(e, 7).onChange() && r),
                                    'blur' === t &&
                                        (r = !1 !== qs(e, 7).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (s.selectedSource = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        ll(6, 16384, null, 0, vu, [yt, pt, [2, yu]], null, null),
                        ll(
                            7,
                            212992,
                            null,
                            0,
                            Su,
                            [yt, pt, xu, Le],
                            {name: [0, 'name'], value: [1, 'value']},
                            null,
                        ),
                        il(
                            1024,
                            null,
                            _u,
                            function(e, t) {
                                return [e, t];
                            },
                            [vu, Su],
                        ),
                        ll(
                            9,
                            671744,
                            null,
                            0,
                            ic,
                            [[8, null], [8, null], [8, null], [6, _u]],
                            {name: [0, 'name'], model: [1, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        il(2048, null, Eu, null, [ic]),
                        ll(11, 16384, null, 0, Uu, [[4, Eu]], null, null),
                        (e()(), Nl(-1, null, [' AudioBufferSourceNode '])),
                        (e()(),
                        _s(13, 0, null, null, 9, 'p', [], null, null, null, null, null)),
                        (e()(),
                        _s(
                            14,
                            0,
                            null,
                            null,
                            8,
                            'label',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(),
                        _s(
                            15,
                            0,
                            null,
                            null,
                            6,
                            'input',
                            [['name', 'source'], ['type', 'radio'], ['value', 'media']],
                            [
                                [2, 'ng-untouched', null],
                                [2, 'ng-touched', null],
                                [2, 'ng-pristine', null],
                                [2, 'ng-dirty', null],
                                [2, 'ng-valid', null],
                                [2, 'ng-invalid', null],
                                [2, 'ng-pending', null],
                            ],
                            [
                                [null, 'ngModelChange'],
                                [null, 'input'],
                                [null, 'blur'],
                                [null, 'compositionstart'],
                                [null, 'compositionend'],
                                [null, 'change'],
                            ],
                            function(e, t, n) {
                                var r = !0,
                                    s = e.component;
                                return (
                                    'input' === t &&
                                        (r =
                                            !1 !==
                                                qs(e, 16)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== qs(e, 16).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== qs(e, 16)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                qs(e, 16)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r = !1 !== qs(e, 17).onChange() && r),
                                    'blur' === t &&
                                        (r = !1 !== qs(e, 17).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (s.selectedSource = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        ll(16, 16384, null, 0, vu, [yt, pt, [2, yu]], null, null),
                        ll(
                            17,
                            212992,
                            null,
                            0,
                            Su,
                            [yt, pt, xu, Le],
                            {name: [0, 'name'], value: [1, 'value']},
                            null,
                        ),
                        il(
                            1024,
                            null,
                            _u,
                            function(e, t) {
                                return [e, t];
                            },
                            [vu, Su],
                        ),
                        ll(
                            19,
                            671744,
                            null,
                            0,
                            ic,
                            [[8, null], [8, null], [8, null], [6, _u]],
                            {name: [0, 'name'], model: [1, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        il(2048, null, Eu, null, [ic]),
                        ll(21, 16384, null, 0, Uu, [[4, Eu]], null, null),
                        (e()(), Nl(-1, null, [' MediaElementAudioSourceNode '])),
                        (e()(),
                        _s(23, 0, null, null, 9, 'p', [], null, null, null, null, null)),
                        (e()(),
                        _s(
                            24,
                            0,
                            null,
                            null,
                            8,
                            'label',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(),
                        _s(
                            25,
                            0,
                            null,
                            null,
                            6,
                            'input',
                            [
                                ['name', 'source'],
                                ['type', 'radio'],
                                ['value', 'oscillator'],
                            ],
                            [
                                [2, 'ng-untouched', null],
                                [2, 'ng-touched', null],
                                [2, 'ng-pristine', null],
                                [2, 'ng-dirty', null],
                                [2, 'ng-valid', null],
                                [2, 'ng-invalid', null],
                                [2, 'ng-pending', null],
                            ],
                            [
                                [null, 'ngModelChange'],
                                [null, 'input'],
                                [null, 'blur'],
                                [null, 'compositionstart'],
                                [null, 'compositionend'],
                                [null, 'change'],
                            ],
                            function(e, t, n) {
                                var r = !0,
                                    s = e.component;
                                return (
                                    'input' === t &&
                                        (r =
                                            !1 !==
                                                qs(e, 26)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== qs(e, 26).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== qs(e, 26)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                qs(e, 26)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r = !1 !== qs(e, 27).onChange() && r),
                                    'blur' === t &&
                                        (r = !1 !== qs(e, 27).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (s.selectedSource = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        ll(26, 16384, null, 0, vu, [yt, pt, [2, yu]], null, null),
                        ll(
                            27,
                            212992,
                            null,
                            0,
                            Su,
                            [yt, pt, xu, Le],
                            {name: [0, 'name'], value: [1, 'value']},
                            null,
                        ),
                        il(
                            1024,
                            null,
                            _u,
                            function(e, t) {
                                return [e, t];
                            },
                            [vu, Su],
                        ),
                        ll(
                            29,
                            671744,
                            null,
                            0,
                            ic,
                            [[8, null], [8, null], [8, null], [6, _u]],
                            {name: [0, 'name'], model: [1, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        il(2048, null, Eu, null, [ic]),
                        ll(31, 16384, null, 0, Uu, [[4, Eu]], null, null),
                        (e()(), Nl(-1, null, [' OscillatorNode '])),
                        (e()(),
                        _s(
                            33,
                            0,
                            null,
                            null,
                            7,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        ll(34, 16384, null, 0, Ro, [], {ngSwitch: [0, 'ngSwitch']}, null),
                        (e()(), ms(16777216, null, null, 1, null, kc)),
                        ll(
                            36,
                            278528,
                            null,
                            0,
                            Fo,
                            [Jn, Qt, Ro],
                            {ngSwitchCase: [0, 'ngSwitchCase']},
                            null,
                        ),
                        (e()(), ms(16777216, null, null, 1, null, Ic)),
                        ll(
                            38,
                            278528,
                            null,
                            0,
                            Fo,
                            [Jn, Qt, Ro],
                            {ngSwitchCase: [0, 'ngSwitchCase']},
                            null,
                        ),
                        (e()(), ms(16777216, null, null, 1, null, Dc)),
                        ll(
                            40,
                            278528,
                            null,
                            0,
                            Fo,
                            [Jn, Qt, Ro],
                            {ngSwitchCase: [0, 'ngSwitchCase']},
                            null,
                        ),
                        (e()(),
                        _s(41, 0, null, null, 1, 'p', [], null, null, null, null, null)),
                        (e()(),
                        _s(
                            42,
                            0,
                            [['canvas', 1]],
                            null,
                            0,
                            'canvas',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(),
                        _s(
                            43,
                            0,
                            null,
                            null,
                            1,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        ll(44, 147456, [['fallback', 4]], 0, wc, [Ji, Xi], null, null),
                        (e()(),
                        _s(45, 0, null, null, 1, 'h1', [], null, null, null, null, null)),
                        (e()(), Nl(-1, null, ['Chain'])),
                        (e()(),
                        _s(47, 0, null, null, 8, 'p', [], null, null, null, null, null)),
                        (e()(), Nl(-1, null, [' This is a demo for '])),
                        (e()(),
                        _s(
                            49,
                            0,
                            null,
                            null,
                            2,
                            'code',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(),
                        _s(50, 0, null, null, 1, 'em', [], null, null, null, null, null)),
                        (e()(), Nl(-1, null, ['ng-web-audio'])),
                        (e()(),
                        Nl(-1, null, [
                            ' \u2014 a Web Audio API declarative library for Angular. Below you can see AudioNode graph for selected configuration. Demo page uses HTML elements as directives hosts, in real life scenario you can use ',
                        ])),
                        (e()(),
                        _s(
                            53,
                            0,
                            null,
                            null,
                            1,
                            'code',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(), Nl(-1, null, ['ng-container'])),
                        (e()(),
                        Nl(-1, null, [' so you will not have redundant DOM tags.\n'])),
                        (e()(),
                        _s(56, 0, null, null, 9, 'p', [], null, null, null, null, null)),
                        (e()(),
                        _s(
                            57,
                            0,
                            null,
                            null,
                            8,
                            'label',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(),
                        _s(
                            58,
                            0,
                            null,
                            null,
                            6,
                            'input',
                            [['name', 'chain'], ['type', 'radio'], ['value', 'dry']],
                            [
                                [2, 'ng-untouched', null],
                                [2, 'ng-touched', null],
                                [2, 'ng-pristine', null],
                                [2, 'ng-dirty', null],
                                [2, 'ng-valid', null],
                                [2, 'ng-invalid', null],
                                [2, 'ng-pending', null],
                            ],
                            [
                                [null, 'ngModelChange'],
                                [null, 'input'],
                                [null, 'blur'],
                                [null, 'compositionstart'],
                                [null, 'compositionend'],
                                [null, 'change'],
                            ],
                            function(e, t, n) {
                                var r = !0,
                                    s = e.component;
                                return (
                                    'input' === t &&
                                        (r =
                                            !1 !==
                                                qs(e, 59)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== qs(e, 59).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== qs(e, 59)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                qs(e, 59)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r = !1 !== qs(e, 60).onChange() && r),
                                    'blur' === t &&
                                        (r = !1 !== qs(e, 60).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (s.selectedChain = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        ll(59, 16384, null, 0, vu, [yt, pt, [2, yu]], null, null),
                        ll(
                            60,
                            212992,
                            null,
                            0,
                            Su,
                            [yt, pt, xu, Le],
                            {name: [0, 'name'], value: [1, 'value']},
                            null,
                        ),
                        il(
                            1024,
                            null,
                            _u,
                            function(e, t) {
                                return [e, t];
                            },
                            [vu, Su],
                        ),
                        ll(
                            62,
                            671744,
                            null,
                            0,
                            ic,
                            [[8, null], [8, null], [8, null], [6, _u]],
                            {name: [0, 'name'], model: [1, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        il(2048, null, Eu, null, [ic]),
                        ll(64, 16384, null, 0, Uu, [[4, Eu]], null, null),
                        (e()(), Nl(-1, null, [' Dry '])),
                        (e()(),
                        _s(66, 0, null, null, 9, 'p', [], null, null, null, null, null)),
                        (e()(),
                        _s(
                            67,
                            0,
                            null,
                            null,
                            8,
                            'label',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(),
                        _s(
                            68,
                            0,
                            null,
                            null,
                            6,
                            'input',
                            [['name', 'chain'], ['type', 'radio'], ['value', 'panner']],
                            [
                                [2, 'ng-untouched', null],
                                [2, 'ng-touched', null],
                                [2, 'ng-pristine', null],
                                [2, 'ng-dirty', null],
                                [2, 'ng-valid', null],
                                [2, 'ng-invalid', null],
                                [2, 'ng-pending', null],
                            ],
                            [
                                [null, 'ngModelChange'],
                                [null, 'input'],
                                [null, 'blur'],
                                [null, 'compositionstart'],
                                [null, 'compositionend'],
                                [null, 'change'],
                            ],
                            function(e, t, n) {
                                var r = !0,
                                    s = e.component;
                                return (
                                    'input' === t &&
                                        (r =
                                            !1 !==
                                                qs(e, 69)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== qs(e, 69).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== qs(e, 69)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                qs(e, 69)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r = !1 !== qs(e, 70).onChange() && r),
                                    'blur' === t &&
                                        (r = !1 !== qs(e, 70).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (s.selectedChain = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        ll(69, 16384, null, 0, vu, [yt, pt, [2, yu]], null, null),
                        ll(
                            70,
                            212992,
                            null,
                            0,
                            Su,
                            [yt, pt, xu, Le],
                            {name: [0, 'name'], value: [1, 'value']},
                            null,
                        ),
                        il(
                            1024,
                            null,
                            _u,
                            function(e, t) {
                                return [e, t];
                            },
                            [vu, Su],
                        ),
                        ll(
                            72,
                            671744,
                            null,
                            0,
                            ic,
                            [[8, null], [8, null], [8, null], [6, _u]],
                            {name: [0, 'name'], model: [1, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        il(2048, null, Eu, null, [ic]),
                        ll(74, 16384, null, 0, Uu, [[4, Eu]], null, null),
                        (e()(), Nl(-1, null, [' Balance '])),
                        (e()(),
                        _s(76, 0, null, null, 9, 'p', [], null, null, null, null, null)),
                        (e()(),
                        _s(
                            77,
                            0,
                            null,
                            null,
                            8,
                            'label',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(),
                        _s(
                            78,
                            0,
                            null,
                            null,
                            6,
                            'input',
                            [['name', 'chain'], ['type', 'radio'], ['value', 'delay']],
                            [
                                [2, 'ng-untouched', null],
                                [2, 'ng-touched', null],
                                [2, 'ng-pristine', null],
                                [2, 'ng-dirty', null],
                                [2, 'ng-valid', null],
                                [2, 'ng-invalid', null],
                                [2, 'ng-pending', null],
                            ],
                            [
                                [null, 'ngModelChange'],
                                [null, 'input'],
                                [null, 'blur'],
                                [null, 'compositionstart'],
                                [null, 'compositionend'],
                                [null, 'change'],
                            ],
                            function(e, t, n) {
                                var r = !0,
                                    s = e.component;
                                return (
                                    'input' === t &&
                                        (r =
                                            !1 !==
                                                qs(e, 79)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== qs(e, 79).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== qs(e, 79)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                qs(e, 79)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r = !1 !== qs(e, 80).onChange() && r),
                                    'blur' === t &&
                                        (r = !1 !== qs(e, 80).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (s.selectedChain = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        ll(79, 16384, null, 0, vu, [yt, pt, [2, yu]], null, null),
                        ll(
                            80,
                            212992,
                            null,
                            0,
                            Su,
                            [yt, pt, xu, Le],
                            {name: [0, 'name'], value: [1, 'value']},
                            null,
                        ),
                        il(
                            1024,
                            null,
                            _u,
                            function(e, t) {
                                return [e, t];
                            },
                            [vu, Su],
                        ),
                        ll(
                            82,
                            671744,
                            null,
                            0,
                            ic,
                            [[8, null], [8, null], [8, null], [6, _u]],
                            {name: [0, 'name'], model: [1, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        il(2048, null, Eu, null, [ic]),
                        ll(84, 16384, null, 0, Uu, [[4, Eu]], null, null),
                        (e()(), Nl(-1, null, [' Delay '])),
                        (e()(),
                        _s(86, 0, null, null, 9, 'p', [], null, null, null, null, null)),
                        (e()(),
                        _s(
                            87,
                            0,
                            null,
                            null,
                            8,
                            'label',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(),
                        _s(
                            88,
                            0,
                            null,
                            null,
                            6,
                            'input',
                            [['name', 'chain'], ['type', 'radio'], ['value', 'complex']],
                            [
                                [2, 'ng-untouched', null],
                                [2, 'ng-touched', null],
                                [2, 'ng-pristine', null],
                                [2, 'ng-dirty', null],
                                [2, 'ng-valid', null],
                                [2, 'ng-invalid', null],
                                [2, 'ng-pending', null],
                            ],
                            [
                                [null, 'ngModelChange'],
                                [null, 'input'],
                                [null, 'blur'],
                                [null, 'compositionstart'],
                                [null, 'compositionend'],
                                [null, 'change'],
                            ],
                            function(e, t, n) {
                                var r = !0,
                                    s = e.component;
                                return (
                                    'input' === t &&
                                        (r =
                                            !1 !==
                                                qs(e, 89)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== qs(e, 89).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== qs(e, 89)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                qs(e, 89)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r = !1 !== qs(e, 90).onChange() && r),
                                    'blur' === t &&
                                        (r = !1 !== qs(e, 90).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (s.selectedChain = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        ll(89, 16384, null, 0, vu, [yt, pt, [2, yu]], null, null),
                        ll(
                            90,
                            212992,
                            null,
                            0,
                            Su,
                            [yt, pt, xu, Le],
                            {name: [0, 'name'], value: [1, 'value']},
                            null,
                        ),
                        il(
                            1024,
                            null,
                            _u,
                            function(e, t) {
                                return [e, t];
                            },
                            [vu, Su],
                        ),
                        ll(
                            92,
                            671744,
                            null,
                            0,
                            ic,
                            [[8, null], [8, null], [8, null], [6, _u]],
                            {name: [0, 'name'], model: [1, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        il(2048, null, Eu, null, [ic]),
                        ll(94, 16384, null, 0, Uu, [[4, Eu]], null, null),
                        (e()(), Nl(-1, null, [' Complex '])),
                        (e()(),
                        _s(
                            96,
                            0,
                            null,
                            null,
                            7,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        ll(97, 16384, null, 0, Ro, [], {ngSwitch: [0, 'ngSwitch']}, null),
                        (e()(), ms(16777216, null, null, 1, null, Oc)),
                        ll(
                            99,
                            278528,
                            null,
                            0,
                            Fo,
                            [Jn, Qt, Ro],
                            {ngSwitchCase: [0, 'ngSwitchCase']},
                            null,
                        ),
                        (e()(), ms(16777216, null, null, 1, null, Mc)),
                        ll(
                            101,
                            278528,
                            null,
                            0,
                            Fo,
                            [Jn, Qt, Ro],
                            {ngSwitchCase: [0, 'ngSwitchCase']},
                            null,
                        ),
                        (e()(), ms(16777216, null, null, 1, null, Pc)),
                        ll(
                            103,
                            278528,
                            null,
                            0,
                            Fo,
                            [Jn, Qt, Ro],
                            {ngSwitchCase: [0, 'ngSwitchCase']},
                            null,
                        ),
                    ],
                    function(e, t) {
                        var n = t.component;
                        e(t, 7, 0, 'source', 'buffer'),
                            e(t, 9, 0, 'source', n.selectedSource),
                            e(t, 17, 0, 'source', 'media'),
                            e(t, 19, 0, 'source', n.selectedSource),
                            e(t, 27, 0, 'source', 'oscillator'),
                            e(t, 29, 0, 'source', n.selectedSource),
                            e(t, 34, 0, n.selectedSource),
                            e(t, 36, 0, 'buffer'),
                            e(t, 38, 0, 'media'),
                            e(t, 40, 0, 'oscillator'),
                            e(t, 60, 0, 'chain', 'dry'),
                            e(t, 62, 0, 'chain', n.selectedChain),
                            e(t, 70, 0, 'chain', 'panner'),
                            e(t, 72, 0, 'chain', n.selectedChain),
                            e(t, 80, 0, 'chain', 'delay'),
                            e(t, 82, 0, 'chain', n.selectedChain),
                            e(t, 90, 0, 'chain', 'complex'),
                            e(t, 92, 0, 'chain', n.selectedChain),
                            e(t, 97, 0, n.selectedChain),
                            e(t, 99, 0, 'panner'),
                            e(t, 101, 0, 'delay'),
                            e(t, 103, 0, 'complex');
                    },
                    function(e, t) {
                        e(
                            t,
                            5,
                            0,
                            qs(t, 11).ngClassUntouched,
                            qs(t, 11).ngClassTouched,
                            qs(t, 11).ngClassPristine,
                            qs(t, 11).ngClassDirty,
                            qs(t, 11).ngClassValid,
                            qs(t, 11).ngClassInvalid,
                            qs(t, 11).ngClassPending,
                        ),
                            e(
                                t,
                                15,
                                0,
                                qs(t, 21).ngClassUntouched,
                                qs(t, 21).ngClassTouched,
                                qs(t, 21).ngClassPristine,
                                qs(t, 21).ngClassDirty,
                                qs(t, 21).ngClassValid,
                                qs(t, 21).ngClassInvalid,
                                qs(t, 21).ngClassPending,
                            ),
                            e(
                                t,
                                25,
                                0,
                                qs(t, 31).ngClassUntouched,
                                qs(t, 31).ngClassTouched,
                                qs(t, 31).ngClassPristine,
                                qs(t, 31).ngClassDirty,
                                qs(t, 31).ngClassValid,
                                qs(t, 31).ngClassInvalid,
                                qs(t, 31).ngClassPending,
                            ),
                            e(
                                t,
                                58,
                                0,
                                qs(t, 64).ngClassUntouched,
                                qs(t, 64).ngClassTouched,
                                qs(t, 64).ngClassPristine,
                                qs(t, 64).ngClassDirty,
                                qs(t, 64).ngClassValid,
                                qs(t, 64).ngClassInvalid,
                                qs(t, 64).ngClassPending,
                            ),
                            e(
                                t,
                                68,
                                0,
                                qs(t, 74).ngClassUntouched,
                                qs(t, 74).ngClassTouched,
                                qs(t, 74).ngClassPristine,
                                qs(t, 74).ngClassDirty,
                                qs(t, 74).ngClassValid,
                                qs(t, 74).ngClassInvalid,
                                qs(t, 74).ngClassPending,
                            ),
                            e(
                                t,
                                78,
                                0,
                                qs(t, 84).ngClassUntouched,
                                qs(t, 84).ngClassTouched,
                                qs(t, 84).ngClassPristine,
                                qs(t, 84).ngClassDirty,
                                qs(t, 84).ngClassValid,
                                qs(t, 84).ngClassInvalid,
                                qs(t, 84).ngClassPending,
                            ),
                            e(
                                t,
                                88,
                                0,
                                qs(t, 94).ngClassUntouched,
                                qs(t, 94).ngClassTouched,
                                qs(t, 94).ngClassPristine,
                                qs(t, 94).ngClassDirty,
                                qs(t, 94).ngClassValid,
                                qs(t, 94).ngClassInvalid,
                                qs(t, 94).ngClassPending,
                            );
                    },
                );
                var t, n, r;
            }
            function Fc(e) {
                return Il(
                    0,
                    [
                        (e()(),
                        _s(0, 0, null, null, 1, 'my-app', [], null, null, null, Rc, Nc)),
                        ll(1, 49152, null, 0, ji, [], null, null),
                    ],
                    null,
                    null,
                );
            }
            var jc = Ps('my-app', ji, Fc, {}, {}, []);
            class Hc {}
            var Lc = Pi(Fi, [ji], function(e) {
                return (function(e) {
                    const t = {},
                        n = [];
                    let r = !1;
                    for (let s = 0; s < e.length; s++) {
                        const l = e[s];
                        l.token === nt && !0 === l.value && (r = !0),
                            1073741824 & l.flags && n.push(l.token),
                            (l.index = s),
                            (t[Br(l.token)] = l);
                    }
                    return {
                        factory: null,
                        providersByKey: t,
                        providers: e,
                        modules: n,
                        isRoot: r,
                    };
                })([
                    Ts(512, at, ut, [[8, [jc]], [3, at], dt]),
                    Ts(4608, xu, xu, []),
                    Ts(5120, Er, Tr, [[3, Er]]),
                    Ts(4608, Io, Vo, [Er, [2, ko]]),
                    Ts(4608, wn, wn, []),
                    Ts(5120, _r, xr, []),
                    Ts(5120, yr, Sr, []),
                    Ts(4608, Ya, Xa, [Ho]),
                    Ts(6144, wt, null, [Ya]),
                    Ts(4608, Ga, Za, []),
                    Ts(
                        5120,
                        pa,
                        function(e, t, n, r, s, l, i, o) {
                            return [new $a(e, t, n), new Ja(r), new Wa(s, l, i, o)];
                        },
                        [Ho, kn, pn, Ho, Ho, Ga, gn, [2, qa]],
                    ),
                    Ts(4608, fa, fa, [pa, kn]),
                    Ts(135680, _a, _a, [Ho]),
                    Ts(4608, xa, xa, [fa, _a, dn]),
                    Ts(6144, mt, null, [xa]),
                    Ts(6144, ma, null, [_a]),
                    Ts(4608, Rn, Rn, [kn]),
                    Ts(4608, bo, xo, [vo, [2, wo]]),
                    Ts(1073742336, oc, oc, []),
                    Ts(1073742336, ac, ac, []),
                    Ts(1073742336, Hc, Hc, []),
                    Ts(1073742336, jo, jo, []),
                    Ts(1024, ln, ou, []),
                    Ts(256, dn, 'demo', []),
                    Ts(2048, ia, null, [dn]),
                    Ts(
                        1024,
                        un,
                        function(e, t, n, r) {
                            return [
                                ((s = e),
                                ca('probe', ha),
                                ca(
                                    'coreTokens',
                                    Object.assign(
                                        {},
                                        da,
                                        (s || []).reduce(
                                            (e, t) => ((e[t.name] = t.token), e),
                                            {},
                                        ),
                                    ),
                                ),
                                () => ha),
                                oa(t, n, r),
                            ];
                            var s;
                        },
                        [[2, $n], ia, Ho, Le],
                    ),
                    Ts(512, cn, cn, [[2, un]]),
                    Ts(131584, Wn, Wn, [kn, gn, Le, ln, at, cn]),
                    Ts(1073742336, Nr, Nr, [Wn]),
                    Ts(1073742336, au, au, [[3, au]]),
                    Ts(1073742336, Fi, Fi, []),
                    Ts(256, nt, !0, []),
                ]);
            });
            iu()
                .bootstrapModuleFactory(Lc)
                .then(e => {
                    const t = window;
                    t.ngRef && t.ngRef.destroy(), (t.ngRef = e);
                })
                .catch(e => console.error(e));
        },
    },
    [[0, 0]],
]);
