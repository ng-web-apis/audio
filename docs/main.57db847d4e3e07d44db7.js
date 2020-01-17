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
            let l = !1;
            const s = {
                Promise: void 0,
                set useDeprecatedSynchronousErrorHandling(e) {
                    l = e;
                },
                get useDeprecatedSynchronousErrorHandling() {
                    return l;
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
                        if (s.useDeprecatedSynchronousErrorHandling) throw e;
                        i(e);
                    },
                    complete() {},
                },
                u = Array.isArray || (e => e && 'number' == typeof e.length);
            function a(e) {
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
                                _unsubscribe: l,
                                _subscriptions: s,
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
                            if (r(l))
                                try {
                                    l.call(this);
                                } catch (i) {
                                    t = i instanceof d ? p(i.errors) : [i];
                                }
                            if (u(s)) {
                                let e = -1,
                                    n = s.length;
                                for (; ++e < n; ) {
                                    const n = s[e];
                                    if (a(n))
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
                            const l = this._subscriptions;
                            return (
                                null === l ? (this._subscriptions = [n]) : l.push(n), n
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
                constructor(e, t, n, l) {
                    let s;
                    super(), (this._parentSubscriber = e);
                    let i = this;
                    r(t)
                        ? (s = t)
                        : t &&
                          ((s = t.next),
                          (n = t.error),
                          (l = t.complete),
                          t !== o &&
                              (r((i = Object.create(t)).unsubscribe) &&
                                  this.add(i.unsubscribe.bind(i)),
                              (i.unsubscribe = this.unsubscribe.bind(this)))),
                        (this._context = i),
                        (this._next = s),
                        (this._error = n),
                        (this._complete = l);
                }
                next(e) {
                    if (!this.isStopped && this._next) {
                        const {_parentSubscriber: t} = this;
                        s.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable
                            ? this.__tryOrSetError(t, this._next, e) && this.unsubscribe()
                            : this.__tryOrUnsub(this._next, e);
                    }
                }
                error(e) {
                    if (!this.isStopped) {
                        const {_parentSubscriber: t} = this,
                            {useDeprecatedSynchronousErrorHandling: n} = s;
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
                            s.useDeprecatedSynchronousErrorHandling &&
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
                        if ((this.unsubscribe(), s.useDeprecatedSynchronousErrorHandling))
                            throw n;
                        i(n);
                    }
                }
                __tryOrSetError(e, t, n) {
                    if (!s.useDeprecatedSynchronousErrorHandling)
                        throw new Error('bad call');
                    try {
                        t.call(this._context, n);
                    } catch (r) {
                        return s.useDeprecatedSynchronousErrorHandling
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
                            l = (function(e, t, n) {
                                if (e) {
                                    if (e instanceof g) return e;
                                    if (e[f]) return e[f]();
                                }
                                return e || t || n ? new g(e, t, n) : new g(o);
                            })(e, t, n);
                        if (
                            (l.add(
                                r
                                    ? r.call(l, this.source)
                                    : this.source ||
                                      (s.useDeprecatedSynchronousErrorHandling &&
                                          !l.syncErrorThrowable)
                                    ? this._subscribe(l)
                                    : this._trySubscribe(l),
                            ),
                            s.useDeprecatedSynchronousErrorHandling &&
                                l.syncErrorThrowable &&
                                ((l.syncErrorThrowable = !1), l.syncErrorThrown))
                        )
                            throw l.syncErrorValue;
                        return l;
                    }
                    _trySubscribe(e) {
                        try {
                            return this._subscribe(e);
                        } catch (t) {
                            s.useDeprecatedSynchronousErrorHandling &&
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
                                    } catch (l) {
                                        n(l), r && r.unsubscribe();
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
                if ((e || (e = s.Promise || Promise), !e))
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
                            for (let l = 0; l < n; l++) r[l].next(e);
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
                        for (let l = 0; l < n; l++) r[l].error(e);
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
                    const t = a(e) ? 'an invalid object' : `'${e}'`;
                    throw new TypeError(
                        `You provided ${t} where a stream was expected.` +
                            ' You can provide an Observable, Promise, Array, or Iterable.',
                    );
                }
            };
            function P(e, t, n, r, l = new A(e, n, r)) {
                if (!l.closed) return t instanceof v ? t.subscribe(l) : M(t)(l);
            }
            class R extends g {
                notifyNext(e, t, n, r, l) {
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
                    let l = 0;
                    return (
                        r.add(
                            t.schedule(function() {
                                l !== e.length
                                    ? (n.next(e[l++]), n.closed || r.add(this.schedule()))
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
                                                      const l = e[_]();
                                                      r.add(
                                                          l.subscribe({
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
                                          let l;
                                          return (
                                              r.add(() => {
                                                  l &&
                                                      'function' == typeof l.return &&
                                                      l.return();
                                              }),
                                              r.add(
                                                  t.schedule(() => {
                                                      (l = e[V]()),
                                                          r.add(
                                                              t.schedule(function() {
                                                                  if (n.closed) return;
                                                                  let e, t;
                                                                  try {
                                                                      const s = l.next();
                                                                      (e = s.value),
                                                                          (t = s.done);
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
                notifyNext(e, t, n, r, l) {
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
                        l = t.subscribe(r);
                    return r.closed || (r.connection = n.connect()), l;
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
            const le = '__parameters__';
            function se(e, t, n) {
                const r = (function(e) {
                    return function(...t) {
                        if (e) {
                            const n = e(...t);
                            for (const e in n) this[e] = n[e];
                        }
                    };
                })(t);
                function l(...e) {
                    if (this instanceof l) return r.apply(this, e), this;
                    const t = new l(...e);
                    return (n.annotation = t), n;
                    function n(e, n, r) {
                        const l = e.hasOwnProperty(le)
                            ? e[le]
                            : Object.defineProperty(e, le, {value: []})[le];
                        for (; l.length <= r; ) l.push(null);
                        return (l[r] = l[r] || []).push(t), e;
                    }
                }
                return (
                    n && (l.prototype = Object.create(n.prototype)),
                    (l.prototype.ngMetadataName = e),
                    (l.annotationCls = l),
                    l
                );
            }
            const ie = 'undefined' != typeof window && window,
                oe =
                    'undefined' != typeof self &&
                    'undefined' != typeof WorkerGlobalScope &&
                    self instanceof WorkerGlobalScope &&
                    self,
                ue = ('undefined' != typeof global && global) || ie || oe,
                ae = Promise.resolve(0);
            let ce = null;
            function de() {
                if (!ce) {
                    const e = ue.Symbol;
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
                    ? ae.then(() => {
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
                ve = se('Inject', e => ({token: e})),
                be = se('Optional'),
                we = se('Self'),
                Ce = se('SkipSelf'),
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
                            l = t[de()]();
                        for (;;) {
                            const e = r.next(),
                                t = l.next();
                            if (e.done && t.done) return !0;
                            if (e.done || t.done) return !1;
                            if (!n(e.value, t.value)) return !1;
                        }
                    })(e, t, Ie);
                {
                    const l = e && ('object' == typeof e || 'function' == typeof e),
                        s = t && ('object' == typeof t || 'function' == typeof t);
                    return !(n || !l || r || !s) || pe(e, t);
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
                                                            l = _e(n[e]);
                                                        if (l instanceof Array)
                                                            for (
                                                                let e = 0, t = l;
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
                                                                    : (l =
                                                                          n instanceof ve
                                                                              ? n.token
                                                                              : _e(n));
                                                            }
                                                        t.push({token: l, options: r});
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
                                                l = !1,
                                                s = _e(e.provide);
                                            if (qe in e) r = e.useValue;
                                            else if (e.useFactory) n = e.useFactory;
                                            else if (e.useExisting);
                                            else if (e.useClass)
                                                (l = !0), (n = _e(e.useClass));
                                            else {
                                                if ('function' != typeof s)
                                                    throw tt(
                                                        'StaticProvider does not have [useValue|useFactory|useExisting|useClass] or [provide] is not newable',
                                                        e,
                                                    );
                                                (l = !0), (n = s);
                                            }
                                            return {deps: t, fn: n, useNew: l, value: r};
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
                                        const l = t.get(e);
                                        if (l && l.fn == Ge) throw Xe(e);
                                        t.set(e, r);
                                    }
                                }
                        })(r, e);
                }
                get(e, t, n = Ee.Default) {
                    const r = this._records.get(e);
                    try {
                        return (function e(t, n, r, l, s, i) {
                            try {
                                return (function(t, n, r, l, s, i) {
                                    let o;
                                    if (!n || i & Ee.SkipSelf)
                                        i & Ee.Self || (o = l.get(t, s, Ee.Default));
                                    else {
                                        if ((o = n.value) == ze)
                                            throw Error(Je + 'Circular dependency');
                                        if (o === $e) {
                                            n.value = ze;
                                            let t = void 0,
                                                s = n.useNew,
                                                i = n.fn,
                                                u = n.deps,
                                                a = $e;
                                            if (u.length) {
                                                a = [];
                                                for (let t = 0; t < u.length; t++) {
                                                    const n = u[t],
                                                        s = n.options,
                                                        i =
                                                            2 & s
                                                                ? r.get(n.token)
                                                                : void 0;
                                                    a.push(
                                                        e(
                                                            n.token,
                                                            i,
                                                            r,
                                                            i || 4 & s ? l : Qe,
                                                            1 & s
                                                                ? null
                                                                : Le.THROW_IF_NOT_FOUND,
                                                            Ee.Default,
                                                        ),
                                                    );
                                                }
                                            }
                                            n.value = o = s ? new i(...a) : i.apply(t, a);
                                        }
                                    }
                                    return o;
                                })(t, n, r, l, s, i);
                            } catch (o) {
                                throw (o instanceof Error || (o = new Error(o)),
                                (o[We] = o[We] || []).unshift(t),
                                n && n.value == ze && (n.value = $e),
                                o);
                            }
                        })(e, r, this._records, this.parent, t, n);
                    } catch (l) {
                        const t = l[We];
                        throw (e[Re] && t.unshift(e[Re]),
                        (l.message = et('\n' + l.message, t, this.source)),
                        (l[Ze] = t),
                        (l[We] = null),
                        l);
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
            class lt {}
            function st(e) {
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
                    throw st(e);
                }
            }
            const ut = (function() {
                class e {}
                return (e.NULL = new ot()), e;
            })();
            class at {
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
                        throw st(e);
                    return new ct(t, this._ngModule);
                }
            }
            class ct extends lt {
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
                    for (let l = 0; l < n.length; l++) {
                        const e = n.item(l),
                            t = e.name,
                            s = t.toLowerCase();
                        if (!Lt.hasOwnProperty(s)) {
                            this.sanitizedSomething = !0;
                            continue;
                        }
                        let i = e.value;
                        jt[s] && (i = It(i)),
                            Ht[s] &&
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
                        l = e => null,
                        s = () => null;
                    e && 'object' == typeof e
                        ? ((r = this.__isAsync
                              ? t => {
                                    setTimeout(() => e.next(t));
                                }
                              : t => {
                                    e.next(t);
                                }),
                          e.error &&
                              (l = this.__isAsync
                                  ? t => {
                                        setTimeout(() => e.error(t));
                                    }
                                  : t => {
                                        e.error(t);
                                    }),
                          e.complete &&
                              (s = this.__isAsync
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
                              (l = this.__isAsync
                                  ? e => {
                                        setTimeout(() => t(e));
                                    }
                                  : e => {
                                        t(e);
                                    }),
                          n &&
                              (s = this.__isAsync
                                  ? () => {
                                        setTimeout(() => n());
                                    }
                                  : () => {
                                        n();
                                    }));
                    const i = super.subscribe(r, l, s);
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
            function ln(e, ...t) {
                e.error(...t);
            }
            class sn {
                constructor() {
                    this._console = console;
                }
                handleError(e) {
                    const t = this._findOriginalError(e),
                        n = this._findContext(e),
                        r = (function(e) {
                            return e[tn] || ln;
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
            function un(e) {
                return !!e && 'function' == typeof e.subscribe;
            }
            const an = new re('Application Initializer');
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
                const e = ue.wtf;
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
                            onInvokeTask: (e, n, r, l, s, i) => {
                                try {
                                    return On(t), e.invokeTask(r, l, s, i);
                                } finally {
                                    Mn(t);
                                }
                            },
                            onInvoke: (e, n, r, l, s, i, o) => {
                                try {
                                    return On(t), e.invoke(r, l, s, i, o);
                                } finally {
                                    Mn(t);
                                }
                            },
                            onHasTask: (e, n, r, l) => {
                                e.hasTask(r, l),
                                    n === r &&
                                        ('microTask' == l.change
                                            ? ((t.hasPendingMicrotasks = l.microTask),
                                              Dn(t))
                                            : 'macroTask' == l.change &&
                                              (t.hasPendingMacrotasks = l.macroTask));
                            },
                            onHandleError: (e, n, r, l) => (
                                e.handleError(r, l),
                                t.runOutsideAngular(() => t.onError.emit(l)),
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
                    const l = this._inner,
                        s = l.scheduleEventTask('NgZoneEvent: ' + r, e, Vn, In, In);
                    try {
                        return l.runTask(s, t, n);
                    } finally {
                        l.cancelTask(s);
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
                    l = new re(r);
                return (t = []) => {
                    let s = Gn();
                    if (!s || s.injector.get(Un, !1))
                        if (e) e(n.concat(t).concat({provide: l, useValue: !0}));
                        else {
                            const e = n.concat(t).concat({provide: l, useValue: !0});
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
                    })(l);
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
                            'noop' === (l = t ? t.ngZone : void 0)
                                ? new Pn()
                                : ('zone.js' === l ? void 0 : l) ||
                                  new kn({enableLongStackTrace: Tt()}),
                        r = [{provide: kn, useValue: n}];
                    var l;
                    return n.run(() => {
                        const t = Le.create({
                                providers: r,
                                parent: this.injector,
                                name: e.moduleType.name,
                            }),
                            l = e.create(t),
                            s = l.injector.get(sn, null);
                        if (!s)
                            throw new Error(
                                'No ErrorHandler. Is platform module (BrowserModule) included?',
                            );
                        return (
                            l.onDestroy(() => Qn(this._modules, l)),
                            n.runOutsideAngular(() =>
                                n.onError.subscribe({
                                    next: e => {
                                        s.handleError(e);
                                    },
                                }),
                            ),
                            (function(e, t, n) {
                                try {
                                    const l = n();
                                    return on(l)
                                        ? l.catch(n => {
                                              throw (t.runOutsideAngular(() =>
                                                  e.handleError(n),
                                              ),
                                              n);
                                          })
                                        : l;
                                } catch (r) {
                                    throw (t.runOutsideAngular(() => e.handleError(r)),
                                    r);
                                }
                            })(s, n, () => {
                                const e = l.injector.get(cn);
                                return (
                                    e.runInitializers(),
                                    e.donePromise.then(
                                        () => (this._moduleDoBootstrap(l), l),
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
                    constructor(e, t, n, r, l, s) {
                        (this._zone = e),
                            (this._console = t),
                            (this._injector = n),
                            (this._exceptionHandler = r),
                            (this._componentFactoryResolver = l),
                            (this._initStatus = s),
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
                                                  ? l =>
                                                        l.pipe(
                                                            e(
                                                                (e, r) =>
                                                                    B(t(e, r)).pipe(
                                                                        F((t, l) =>
                                                                            n(e, t, r, l),
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
                            e instanceof lt
                                ? e
                                : this._componentFactoryResolver.resolveComponentFactory(
                                      e,
                                  )),
                            this.componentTypes.push(n.componentType);
                        const r = n instanceof ct ? null : this._injector.get(dt),
                            l = n.create(Le.NULL, [], t || n.selector, r);
                        l.onDestroy(() => {
                            this._unloadComponent(l);
                        });
                        const s = l.injector.get(Rn, null);
                        return (
                            s &&
                                l.injector
                                    .get(Fn)
                                    .registerApplication(l.location.nativeElement, s),
                            this._loadComponent(l),
                            Tt() &&
                                this._console.log(
                                    'Angular is running in the development mode. Call enableProdMode() to enable the production mode.',
                                ),
                            l
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
            const lr = new Map(),
                sr = function(e) {
                    return lr.get(e) || null;
                };
            function ir(e) {
                lr.set(e.nativeNode, e);
            }
            class or {
                constructor() {}
                supports(e) {
                    return Oe(e);
                }
                create(e) {
                    return new ar(e);
                }
            }
            const ur = (e, t) => t;
            class ar {
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
                        (this._trackByFn = e || ur);
                }
                forEachItem(e) {
                    let t;
                    for (t = this._itHead; null !== t; t = t._next) e(t);
                }
                forEachOperation(e) {
                    let t = this._itHead,
                        n = this._removalsHead,
                        r = 0,
                        l = null;
                    for (; t || n; ) {
                        const s = !n || (t && t.currentIndex < pr(n, r, l)) ? t : n,
                            i = pr(s, r, l),
                            o = s.currentIndex;
                        if (s === n) r--, (n = n._nextRemoved);
                        else if (((t = t._next), null == s.previousIndex)) r++;
                        else {
                            l || (l = []);
                            const e = i - r,
                                t = o - r;
                            if (e != t) {
                                for (let n = 0; n < e; n++) {
                                    const r = n < l.length ? l[n] : (l[n] = 0),
                                        s = r + n;
                                    t <= s && s < e && (l[n] = r + 1);
                                }
                                l[s.previousIndex] = t - e;
                            }
                        }
                        i !== o && e(s, i, o);
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
                        l = this._itHead,
                        s = !1;
                    if (Array.isArray(e)) {
                        this.length = e.length;
                        for (let t = 0; t < this.length; t++)
                            (r = this._trackByFn(t, (n = e[t]))),
                                null !== l && pe(l.trackById, r)
                                    ? (s && (l = this._verifyReinsertion(l, n, r, t)),
                                      pe(l.item, n) || this._addIdentityChange(l, n))
                                    : ((l = this._mismatch(l, n, r, t)), (s = !0)),
                                (l = l._next);
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
                                    null !== l && pe(l.trackById, r)
                                        ? (s && (l = this._verifyReinsertion(l, e, r, t)),
                                          pe(l.item, e) || this._addIdentityChange(l, e))
                                        : ((l = this._mismatch(l, e, r, t)), (s = !0)),
                                    (l = l._next),
                                    t++;
                            }),
                            (this.length = t);
                    return this._truncate(l), (this.collection = e), this.isDirty;
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
                    let l;
                    return (
                        null === e
                            ? (l = this._itTail)
                            : ((l = e._prev), this._remove(e)),
                        null !==
                        (e =
                            null === this._linkedRecords
                                ? null
                                : this._linkedRecords.get(n, r))
                            ? (pe(e.item, t) || this._addIdentityChange(e, t),
                              this._moveAfter(e, l, r))
                            : null !==
                              (e =
                                  null === this._unlinkedRecords
                                      ? null
                                      : this._unlinkedRecords.get(n, null))
                            ? (pe(e.item, t) || this._addIdentityChange(e, t),
                              this._reinsertAfter(e, l, r))
                            : (e = this._addAfter(new cr(t, n), l, r)),
                        e
                    );
                }
                _verifyReinsertion(e, t, n, r) {
                    let l =
                        null === this._unlinkedRecords
                            ? null
                            : this._unlinkedRecords.get(n, null);
                    return (
                        null !== l
                            ? (e = this._reinsertAfter(l, e._prev, r))
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
                        l = e._nextRemoved;
                    return (
                        null === r ? (this._removalsHead = l) : (r._nextRemoved = l),
                        null === l ? (this._removalsTail = r) : (l._prevRemoved = r),
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
                let l = 0;
                return n && r < n.length && (l = n[r]), r + t + l;
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
                            l = n._next;
                        return (
                            r && (r._next = l),
                            l && (l._prev = r),
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
                    l = 1792 & r;
                return l === t
                    ? ((e.state = (-1793 & r) | n), (e.initIndex = -1), !0)
                    : l === n;
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
                let l = `ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: '${t}'. Current value: '${n}'.`;
                return (
                    r &&
                        (l +=
                            ' It seems like the view has been created after its parent and its children have been dirty checked. Has it been created in a change detection hook ?'),
                    (function(e, t) {
                        const n = new Error(e);
                        return Fr(n, t), n;
                    })(l, e)
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
                const l = e.oldValues[t.bindingIndex + n];
                if (1 & e.state || !Ie(l, r)) {
                    const s = t.bindings[n].name;
                    throw Rr(
                        Pr.createDebugContext(e, t.nodeIndex),
                        `${s}: ${l}`,
                        `${s}: ${r}`,
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
                } catch (l) {
                    e.root.errorHandler.handleError(l);
                }
            }
            function Yr(e) {
                return e.parent ? Vr(e.parent, e.parentNodeDef.nodeIndex) : null;
            }
            function Xr(e) {
                return e.parent ? e.parentNodeDef.parent : null;
            }
            function el(e, t) {
                switch (201347067 & t.flags) {
                    case 1:
                        return Vr(e, t.nodeIndex).renderElement;
                    case 2:
                        return Ir(e, t.nodeIndex).renderText;
                }
            }
            function tl(e) {
                return !!e.parent && !!(32768 & e.parentNodeDef.flags);
            }
            function nl(e) {
                return !(!e.parent || 32768 & e.parentNodeDef.flags);
            }
            function rl(e) {
                return 1 << e % 32;
            }
            function ll(e) {
                const t = {};
                let n = 0;
                const r = {};
                return (
                    e &&
                        e.forEach(([e, l]) => {
                            'number' == typeof e
                                ? ((t[e] = l), (n |= rl(e)))
                                : (r[e] = l);
                        }),
                    {matchedQueries: t, references: r, matchedQueryIds: n}
                );
            }
            function sl(e, t) {
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
            function il(e, t, n) {
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
            const ol = new WeakMap();
            function ul(e) {
                let t = ol.get(e);
                return t || (((t = e(() => Hr)).factory = e), ol.set(e, t)), t;
            }
            function al(e, t, n, r, l) {
                3 === t && (n = e.renderer.parentNode(el(e, e.def.lastRenderRootNode))),
                    cl(e, t, 0, e.def.nodes.length - 1, n, r, l);
            }
            function cl(e, t, n, r, l, s, i) {
                for (let o = n; o <= r; o++) {
                    const n = e.def.nodes[o];
                    11 & n.flags && hl(e, n, t, l, s, i), (o += n.childCount);
                }
            }
            function dl(e, t, n, r, l, s) {
                let i = e;
                for (; i && !tl(i); ) i = i.parent;
                const o = i.parent,
                    u = Xr(i),
                    a = u.nodeIndex + u.childCount;
                for (let c = u.nodeIndex + 1; c <= a; c++) {
                    const e = o.def.nodes[c];
                    e.ngContentIndex === t && hl(o, e, n, r, l, s), (c += e.childCount);
                }
                if (!o.parent) {
                    const i = e.root.projectableNodes[t];
                    if (i) for (let t = 0; t < i.length; t++) pl(e, i[t], n, r, l, s);
                }
            }
            function hl(e, t, n, r, l, s) {
                if (8 & t.flags) dl(e, t.ngContent.index, n, r, l, s);
                else {
                    const i = el(e, t);
                    if (
                        (3 === n && 33554432 & t.flags && 48 & t.bindingFlags
                            ? (16 & t.bindingFlags && pl(e, i, n, r, l, s),
                              32 & t.bindingFlags &&
                                  pl(Vr(e, t.nodeIndex).componentView, i, n, r, l, s))
                            : pl(e, i, n, r, l, s),
                        16777216 & t.flags)
                    ) {
                        const i = Vr(e, t.nodeIndex).viewContainer._embeddedViews;
                        for (let e = 0; e < i.length; e++) al(i[e], n, r, l, s);
                    }
                    1 & t.flags &&
                        !t.element.name &&
                        cl(e, n, t.nodeIndex + 1, t.nodeIndex + t.childCount, r, l, s);
                }
            }
            function pl(e, t, n, r, l, s) {
                const i = e.renderer;
                switch (n) {
                    case 1:
                        i.appendChild(r, t);
                        break;
                    case 2:
                        i.insertBefore(r, t, l);
                        break;
                    case 3:
                        i.removeChild(r, t);
                        break;
                    case 0:
                        s.push(t);
                }
            }
            const fl = /^:([^:]+):(.+)$/;
            function gl(e) {
                if (':' === e[0]) {
                    const t = e.match(fl);
                    return [t[1], t[2]];
                }
                return ['', e];
            }
            function ml(e) {
                let t = 0;
                for (let n = 0; n < e.length; n++) t |= e[n].flags;
                return t;
            }
            function _l(e, t, n, r, l, s) {
                e |= 1;
                const {matchedQueries: i, references: o, matchedQueryIds: u} = ll(t);
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
                    matchedQueryIds: u,
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
                        template: s ? ul(s) : null,
                        componentProvider: null,
                        componentView: null,
                        componentRendererType: null,
                        publicProviders: null,
                        allProviders: null,
                        handleEvent: l || Hr,
                    },
                    provider: null,
                    text: null,
                    query: null,
                    ngContent: null,
                };
            }
            function yl(e, t, n, r, l, s, i = [], o, u, a, c, d) {
                a || (a = Hr);
                const {matchedQueries: h, references: p, matchedQueryIds: f} = ll(n);
                let g = null,
                    m = null;
                s && ([g, m] = gl(s)), (o = o || []);
                const _ = new Array(o.length);
                for (let b = 0; b < o.length; b++) {
                    const [e, t, n] = o[b],
                        [r, l] = gl(t);
                    let s = void 0,
                        i = void 0;
                    switch (15 & e) {
                        case 4:
                            i = n;
                            break;
                        case 1:
                        case 8:
                            s = n;
                    }
                    _[b] = {
                        flags: e,
                        ns: r,
                        name: l,
                        nonMinifiedName: l,
                        securityContext: s,
                        suffix: i,
                    };
                }
                u = u || [];
                const y = new Array(u.length);
                for (let b = 0; b < u.length; b++) {
                    const [e, t] = u[b];
                    y[b] = {type: 0, target: e, eventName: t, propName: null};
                }
                const v = (i = i || []).map(([e, t]) => {
                    const [n, r] = gl(e);
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
                        childCount: l,
                        bindings: _,
                        bindingFlags: ml(_),
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
                            handleEvent: a || Hr,
                        },
                        provider: null,
                        text: null,
                        query: null,
                        ngContent: null,
                    }
                );
            }
            function vl(e, t, n) {
                const r = n.element,
                    l = e.root.selectorOrNode,
                    s = e.renderer;
                let i;
                if (e.parent || !l) {
                    i = r.name ? s.createElement(r.name, r.ns) : s.createComment('');
                    const l = il(e, t, n);
                    l && s.appendChild(l, i);
                } else
                    i = s.selectRootElement(
                        l,
                        !!r.componentRendererType &&
                            r.componentRendererType.encapsulation === ye.ShadowDom,
                    );
                if (r.attrs)
                    for (let o = 0; o < r.attrs.length; o++) {
                        const [e, t, n] = r.attrs[o];
                        s.setAttribute(i, t, n, e);
                    }
                return i;
            }
            function bl(e, t, n, r) {
                for (let i = 0; i < n.outputs.length; i++) {
                    const o = n.outputs[i],
                        u = wl(
                            e,
                            n.nodeIndex,
                            ((s = o.eventName), (l = o.target) ? `${l}:${s}` : s),
                        );
                    let a = o.target,
                        c = e;
                    'component' === o.target && ((a = null), (c = t));
                    const d = c.renderer.listen(a || r, o.eventName, u);
                    e.disposables[n.outputIndex + i] = d;
                }
                var l, s;
            }
            function wl(e, t, n) {
                return r => Jr(e, t, n, r);
            }
            function Cl(e, t, n, r) {
                if (!Zr(e, t, n, r)) return !1;
                const l = t.bindings[n],
                    s = Vr(e, t.nodeIndex),
                    i = s.renderElement,
                    o = l.name;
                switch (15 & l.flags) {
                    case 1:
                        !(function(e, t, n, r, l, s) {
                            const i = t.securityContext;
                            let o = i ? e.root.sanitizer.sanitize(i, s) : s;
                            o = null != o ? o.toString() : null;
                            const u = e.renderer;
                            null != s
                                ? u.setAttribute(n, l, o, r)
                                : u.removeAttribute(n, l, r);
                        })(e, l, i, l.ns, o, r);
                        break;
                    case 2:
                        !(function(e, t, n, r) {
                            const l = e.renderer;
                            r ? l.addClass(t, n) : l.removeClass(t, n);
                        })(e, i, o, r);
                        break;
                    case 4:
                        !(function(e, t, n, r, l) {
                            let s = e.root.sanitizer.sanitize(bt.STYLE, l);
                            if (null != s) {
                                s = s.toString();
                                const e = t.suffix;
                                null != e && (s += e);
                            } else s = null;
                            const i = e.renderer;
                            null != s ? i.setStyle(n, r, s) : i.removeStyle(n, r);
                        })(e, l, i, o, r);
                        break;
                    case 8:
                        !(function(e, t, n, r, l) {
                            const s = t.securityContext;
                            let i = s ? e.root.sanitizer.sanitize(s, l) : l;
                            e.renderer.setProperty(n, r, i);
                        })(
                            33554432 & t.flags && 32 & l.flags ? s.componentView : e,
                            l,
                            i,
                            o,
                            r,
                        );
                }
                return !0;
            }
            const El = new Object(),
                xl = Br(Le),
                Sl = Br(je),
                Tl = Br(dt);
            function Nl(e, t, n, r) {
                return (
                    (n = _e(n)),
                    {index: -1, deps: sl(r, fe(t)), flags: e, token: t, value: n}
                );
            }
            function Al(e, t, n = Le.THROW_IF_NOT_FOUND) {
                const r = Te(e);
                try {
                    if (8 & t.flags) return t.token;
                    if ((2 & t.flags && (n = null), 1 & t.flags))
                        return e._parent.get(t.token, n);
                    const i = t.tokenKey;
                    switch (i) {
                        case xl:
                        case Sl:
                        case Tl:
                            return e;
                    }
                    const o = e._def.providersByKey[i];
                    let u;
                    if (o) {
                        let t = e._providers[o.index];
                        return (
                            void 0 === t && (t = e._providers[o.index] = kl(e, o)),
                            t === El ? void 0 : t
                        );
                    }
                    if (
                        (u = ne(t.token)) &&
                        ((l = e),
                        null != (s = u).providedIn &&
                            ((function(e, t) {
                                return e._def.modules.indexOf(s.providedIn) > -1;
                            })(l) ||
                                ('root' === s.providedIn && l._def.isRoot)))
                    ) {
                        const n = e._providers.length;
                        return (
                            (e._def.providersByKey[t.tokenKey] = {
                                flags: 5120,
                                value: u.factory,
                                deps: [],
                                index: n,
                                token: t.token,
                            }),
                            (e._providers[n] = El),
                            (e._providers[n] = kl(e, e._def.providersByKey[t.tokenKey]))
                        );
                    }
                    return 4 & t.flags ? n : e._parent.get(t.token, n);
                } finally {
                    Te(r);
                }
                var l, s;
            }
            function kl(e, t) {
                let n;
                switch (201347067 & t.flags) {
                    case 512:
                        n = (function(e, t, n) {
                            const r = n.length;
                            switch (r) {
                                case 0:
                                    return new t();
                                case 1:
                                    return new t(Al(e, n[0]));
                                case 2:
                                    return new t(Al(e, n[0]), Al(e, n[1]));
                                case 3:
                                    return new t(Al(e, n[0]), Al(e, n[1]), Al(e, n[2]));
                                default:
                                    const l = new Array(r);
                                    for (let t = 0; t < r; t++) l[t] = Al(e, n[t]);
                                    return new t(...l);
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
                                    return t(Al(e, n[0]));
                                case 2:
                                    return t(Al(e, n[0]), Al(e, n[1]));
                                case 3:
                                    return t(Al(e, n[0]), Al(e, n[1]), Al(e, n[2]));
                                default:
                                    const l = Array(r);
                                    for (let t = 0; t < r; t++) l[t] = Al(e, n[t]);
                                    return t(...l);
                            }
                        })(e, t.value, t.deps);
                        break;
                    case 2048:
                        n = Al(e, t.deps[0]);
                        break;
                    case 256:
                        n = t.value;
                }
                return (
                    n === El ||
                        null == n ||
                        'object' != typeof n ||
                        131072 & t.flags ||
                        'function' != typeof n.ngOnDestroy ||
                        (t.flags |= 131072),
                    void 0 === n ? El : n
                );
            }
            function Il(e, t) {
                const n = e.viewContainer._embeddedViews;
                if (((null == t || t >= n.length) && (t = n.length - 1), t < 0))
                    return null;
                const r = n[t];
                return (
                    (r.viewContainerParent = null),
                    Ml(n, t),
                    Pr.dirtyParentQueries(r),
                    Dl(r),
                    r
                );
            }
            function Vl(e, t, n) {
                const r = t ? el(t, t.def.lastRenderRootNode) : e.renderElement,
                    l = n.renderer.parentNode(r),
                    s = n.renderer.nextSibling(r);
                al(n, 2, l, s, void 0);
            }
            function Dl(e) {
                al(e, 3, null, null, void 0);
            }
            function Ol(e, t, n) {
                t >= e.length ? e.push(n) : e.splice(t, 0, n);
            }
            function Ml(e, t) {
                t >= e.length - 1 ? e.pop() : e.splice(t, 1);
            }
            const Pl = new Object();
            function Rl(e, t, n, r, l, s) {
                return new Fl(e, t, n, r, l, s);
            }
            class Fl extends lt {
                constructor(e, t, n, r, l, s) {
                    super(),
                        (this.selector = e),
                        (this.componentType = t),
                        (this._inputs = r),
                        (this._outputs = l),
                        (this.ngContentSelectors = s),
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
                    const l = ul(this.viewDefFactory),
                        s = l.nodes[0].element.componentProvider.nodeIndex,
                        i = Pr.createRootView(e, t || [], n, l, r, Pl),
                        o = Dr(i, s).instance;
                    return (
                        n &&
                            i.renderer.setAttribute(
                                Vr(i, 0).renderElement,
                                'ng-version',
                                Et.full,
                            ),
                        new jl(i, new Ul(i), o)
                    );
                }
            }
            class jl extends rt {
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
                    return new ql(this._view, this._elDef);
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
            function Hl(e, t, n) {
                return new Ll(e, t, n);
            }
            class Ll {
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
                    return new ql(this._view, this._elDef);
                }
                get parentInjector() {
                    let e = this._view,
                        t = this._elDef.parent;
                    for (; !t && e; ) (t = Xr(e)), (e = e.parent);
                    return e ? new ql(e, t) : new ql(this._view, null);
                }
                clear() {
                    for (let e = this._embeddedViews.length - 1; e >= 0; e--) {
                        const t = Il(this._data, e);
                        Pr.destroyView(t);
                    }
                }
                get(e) {
                    const t = this._embeddedViews[e];
                    if (t) {
                        const e = new Ul(t);
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
                createComponent(e, t, n, r, l) {
                    const s = n || this.parentInjector;
                    l || e instanceof ct || (l = s.get(dt));
                    const i = e.create(s, r, void 0, l);
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
                            let l = t.viewContainer._embeddedViews;
                            null == n && (n = l.length),
                                (r.viewContainerParent = e),
                                Ol(l, n, r),
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
                                Vl(t, n > 0 ? l[n - 1] : null, r);
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
                            const l = e.viewContainer._embeddedViews,
                                s = l[n];
                            Ml(l, n),
                                null == r && (r = l.length),
                                Ol(l, r, s),
                                Pr.dirtyParentQueries(s),
                                Dl(s),
                                Vl(e, r > 0 ? l[r - 1] : null, s);
                        })(this._data, 0, t),
                        e
                    );
                }
                indexOf(e) {
                    return this._embeddedViews.indexOf(e._view);
                }
                remove(e) {
                    const t = Il(this._data, e);
                    t && Pr.destroyView(t);
                }
                detach(e) {
                    const t = Il(this._data, e);
                    return t ? new Ul(t) : null;
                }
            }
            function Bl(e) {
                return new Ul(e);
            }
            class Ul {
                constructor(e) {
                    (this._view = e),
                        (this._viewContainerRef = null),
                        (this._appRef = null);
                }
                get rootNodes() {
                    return (function(e) {
                        const t = [];
                        return al(e, 0, void 0, void 0, t), t;
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
                        Dl(this._view),
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
            function $l(e, t) {
                return new zl(e, t);
            }
            class zl extends Qt {
                constructor(e, t) {
                    super(), (this._parentView = e), (this._def = t);
                }
                createEmbeddedView(e) {
                    return new Ul(
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
            function Gl(e, t) {
                return new ql(e, t);
            }
            class ql {
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
            function Zl(e, t) {
                const n = e.def.nodes[t];
                if (1 & n.flags) {
                    const t = Vr(e, n.nodeIndex);
                    return n.element.template ? t.template : t.renderElement;
                }
                if (2 & n.flags) return Ir(e, n.nodeIndex).renderText;
                if (20240 & n.flags) return Dr(e, n.nodeIndex).instance;
                throw new Error(`Illegal state: read nodeValue for node index ${t}`);
            }
            function Wl(e) {
                return new Ql(e.renderer);
            }
            class Ql {
                constructor(e) {
                    this.delegate = e;
                }
                selectRootElement(e) {
                    return this.delegate.selectRootElement(e);
                }
                createElement(e, t) {
                    const [n, r] = gl(t),
                        l = this.delegate.createElement(r, n);
                    return e && this.delegate.appendChild(e, l), l;
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
                    for (let l = 0; l < t.length; l++)
                        this.delegate.insertBefore(n, t[l], r);
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
                    const [r, l] = gl(t);
                    null != n
                        ? this.delegate.setAttribute(e, l, n, r)
                        : this.delegate.removeAttribute(e, l, r);
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
            function Kl(e, t, n, r) {
                return new Jl(e, t, n, r);
            }
            class Jl {
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
                                const l = t.providers[r];
                                4096 & l.flags || (void 0 === n[r] && (n[r] = kl(e, l)));
                            }
                        })(this);
                }
                get(e, t = Le.THROW_IF_NOT_FOUND, n = Ee.Default) {
                    let r = 0;
                    return (
                        n & Ee.SkipSelf ? (r |= 1) : n & Ee.Self && (r |= 4),
                        Al(this, {token: e, tokenKey: Br(e), flags: r}, t)
                    );
                }
                get instance() {
                    return this.get(this._moduleType);
                }
                get componentFactoryResolver() {
                    return this.get(ut);
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
                            for (let l = 0; l < n.providers.length; l++)
                                if (131072 & n.providers[l].flags) {
                                    const t = e._providers[l];
                                    if (t && t !== El) {
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
            const Yl = Br(gt),
                Xl = Br(yt),
                es = Br(pt),
                ts = Br(Jn),
                ns = Br(Qt),
                rs = Br(Xn),
                ls = Br(Le),
                ss = Br(je);
            function is(e, t, n, r, l, s, i, o) {
                const u = [];
                if (i)
                    for (let c in i) {
                        const [e, t] = i[c];
                        u[e] = {
                            flags: 8,
                            name: c,
                            nonMinifiedName: t,
                            ns: null,
                            securityContext: null,
                            suffix: null,
                        };
                    }
                const a = [];
                if (o)
                    for (let c in o)
                        a.push({type: 1, propName: c, target: null, eventName: o[c]});
                return us(e, (t |= 16384), n, r, l, l, s, u, a);
            }
            function os(e, t, n, r, l) {
                return us(-1, e, t, 0, n, r, l);
            }
            function us(e, t, n, r, l, s, i, o, u) {
                const {matchedQueries: a, references: c, matchedQueryIds: d} = ll(n);
                u || (u = []), o || (o = []), (s = _e(s));
                const h = sl(i, fe(l));
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
                    matchedQueries: a,
                    matchedQueryIds: d,
                    references: c,
                    ngContentIndex: -1,
                    childCount: r,
                    bindings: o,
                    bindingFlags: ml(o),
                    outputs: u,
                    element: null,
                    provider: {token: l, value: s, deps: h},
                    text: null,
                    query: null,
                    ngContent: null,
                };
            }
            function as(e, t) {
                return ps(e, t);
            }
            function cs(e, t) {
                let n = e;
                for (; n.parent && !tl(n); ) n = n.parent;
                return fs(n.parent, Xr(n), !0, t.provider.value, t.provider.deps);
            }
            function ds(e, t) {
                const n = fs(
                    e,
                    t.parent,
                    (32768 & t.flags) > 0,
                    t.provider.value,
                    t.provider.deps,
                );
                if (t.outputs.length)
                    for (let r = 0; r < t.outputs.length; r++) {
                        const l = t.outputs[r],
                            s = n[l.propName];
                        if (!un(s))
                            throw new Error(
                                `@Output ${l.propName} not initialized in '${n.constructor.name}'.`,
                            );
                        {
                            const n = s.subscribe(hs(e, t.parent.nodeIndex, l.eventName));
                            e.disposables[t.outputIndex + r] = n.unsubscribe.bind(n);
                        }
                    }
                return n;
            }
            function hs(e, t, n) {
                return r => Jr(e, t, n, r);
            }
            function ps(e, t) {
                const n = (8192 & t.flags) > 0,
                    r = t.provider;
                switch (201347067 & t.flags) {
                    case 512:
                        return fs(e, t.parent, n, r.value, r.deps);
                    case 1024:
                        return (function(e, t, n, r, l) {
                            const s = l.length;
                            switch (s) {
                                case 0:
                                    return r();
                                case 1:
                                    return r(ms(e, t, n, l[0]));
                                case 2:
                                    return r(ms(e, t, n, l[0]), ms(e, t, n, l[1]));
                                case 3:
                                    return r(
                                        ms(e, t, n, l[0]),
                                        ms(e, t, n, l[1]),
                                        ms(e, t, n, l[2]),
                                    );
                                default:
                                    const i = Array(s);
                                    for (let r = 0; r < s; r++) i[r] = ms(e, t, n, l[r]);
                                    return r(...i);
                            }
                        })(e, t.parent, n, r.value, r.deps);
                    case 2048:
                        return ms(e, t.parent, n, r.deps[0]);
                    case 256:
                        return r.value;
                }
            }
            function fs(e, t, n, r, l) {
                const s = l.length;
                switch (s) {
                    case 0:
                        return new r();
                    case 1:
                        return new r(ms(e, t, n, l[0]));
                    case 2:
                        return new r(ms(e, t, n, l[0]), ms(e, t, n, l[1]));
                    case 3:
                        return new r(
                            ms(e, t, n, l[0]),
                            ms(e, t, n, l[1]),
                            ms(e, t, n, l[2]),
                        );
                    default:
                        const i = new Array(s);
                        for (let r = 0; r < s; r++) i[r] = ms(e, t, n, l[r]);
                        return new r(...i);
                }
            }
            const gs = {};
            function ms(e, t, n, r, l = Le.THROW_IF_NOT_FOUND) {
                if (8 & r.flags) return r.token;
                const s = e;
                2 & r.flags && (l = null);
                const i = r.tokenKey;
                i === rs && (n = !(!t || !t.element.componentView)),
                    t && 1 & r.flags && ((n = !1), (t = t.parent));
                let o = e;
                for (; o; ) {
                    if (t)
                        switch (i) {
                            case Yl:
                                return Wl(_s(o, t, n));
                            case Xl:
                                return _s(o, t, n).renderer;
                            case es:
                                return new pt(Vr(o, t.nodeIndex).renderElement);
                            case ts:
                                return Vr(o, t.nodeIndex).viewContainer;
                            case ns:
                                if (t.element.template)
                                    return Vr(o, t.nodeIndex).template;
                                break;
                            case rs:
                                return Bl(_s(o, t, n));
                            case ls:
                            case ss:
                                return Gl(o, t);
                            default:
                                const e = (n
                                    ? t.element.allProviders
                                    : t.element.publicProviders)[i];
                                if (e) {
                                    let t = Dr(o, e.nodeIndex);
                                    return (
                                        t ||
                                            ((t = {instance: ps(o, e)}),
                                            (o.nodes[e.nodeIndex] = t)),
                                        t.instance
                                    );
                                }
                        }
                    (n = tl(o)), (t = Xr(o)), (o = o.parent), 4 & r.flags && (o = null);
                }
                const u = s.root.injector.get(r.token, gs);
                return u !== gs || l === gs
                    ? u
                    : s.root.ngModule.injector.get(r.token, l);
            }
            function _s(e, t, n) {
                let r;
                if (n) r = Vr(e, t.nodeIndex).componentView;
                else for (r = e; r.parent && !tl(r); ) r = r.parent;
                return r;
            }
            function ys(e, t, n, r, l, s) {
                if (32768 & n.flags) {
                    const t = Vr(e, n.parent.nodeIndex).componentView;
                    2 & t.def.flags && (t.state |= 8);
                }
                if (((t.instance[n.bindings[r].name] = l), 524288 & n.flags)) {
                    s = s || {};
                    const t = Ve.unwrap(e.oldValues[n.bindingIndex + r]);
                    s[n.bindings[r].nonMinifiedName] = new De(t, l, 0 != (2 & e.state));
                }
                return (e.oldValues[n.bindingIndex + r] = l), s;
            }
            function vs(e, t) {
                if (!(e.def.nodeFlags & t)) return;
                const n = e.def.nodes;
                let r = 0;
                for (let l = 0; l < n.length; l++) {
                    const s = n[l];
                    let i = s.parent;
                    for (
                        !i && s.flags & t && ws(e, l, s.flags & t, r++),
                            0 == (s.childFlags & t) && (l += s.childCount);
                        i && 1 & i.flags && l === i.nodeIndex + i.childCount;

                    )
                        i.directChildFlags & t && (r = bs(e, i, t, r)), (i = i.parent);
                }
            }
            function bs(e, t, n, r) {
                for (let l = t.nodeIndex + 1; l <= t.nodeIndex + t.childCount; l++) {
                    const t = e.def.nodes[l];
                    t.flags & n && ws(e, l, t.flags & n, r++), (l += t.childCount);
                }
                return r;
            }
            function ws(e, t, n, r) {
                const l = Dr(e, t);
                if (!l) return;
                const s = l.instance;
                s &&
                    (Pr.setCurrentNode(e, t),
                    1048576 & n && kr(e, 512, r) && s.ngAfterContentInit(),
                    2097152 & n && s.ngAfterContentChecked(),
                    4194304 & n && kr(e, 768, r) && s.ngAfterViewInit(),
                    8388608 & n && s.ngAfterViewChecked(),
                    131072 & n && s.ngOnDestroy());
            }
            function Cs(e, t, n) {
                let r = [];
                for (let l in n) r.push({propName: l, bindingType: n[l]});
                return {
                    nodeIndex: -1,
                    parent: null,
                    renderParent: null,
                    bindingIndex: -1,
                    outputIndex: -1,
                    checkIndex: -1,
                    flags: e,
                    childFlags: 0,
                    directChildFlags: 0,
                    childMatchedQueries: 0,
                    ngContentIndex: -1,
                    matchedQueries: {},
                    matchedQueryIds: 0,
                    references: {},
                    childCount: 0,
                    bindings: [],
                    bindingFlags: 0,
                    outputs: [],
                    element: null,
                    provider: null,
                    text: null,
                    query: {id: t, filterId: rl(t), bindings: r},
                    ngContent: null,
                };
            }
            function Es(e) {
                const t = e.def.nodeMatchedQueries;
                for (; e.parent && nl(e); ) {
                    let n = e.parentNodeDef;
                    e = e.parent;
                    const r = n.nodeIndex + n.childCount;
                    for (let l = 0; l <= r; l++) {
                        const r = e.def.nodes[l];
                        67108864 & r.flags &&
                            536870912 & r.flags &&
                            (r.query.filterId & t) === r.query.filterId &&
                            Mr(e, l).setDirty(),
                            (!(1 & r.flags && l + r.childCount < n.nodeIndex) &&
                                67108864 & r.childFlags &&
                                536870912 & r.childFlags) ||
                                (l += r.childCount);
                    }
                }
                if (134217728 & e.def.nodeFlags)
                    for (let n = 0; n < e.def.nodes.length; n++) {
                        const t = e.def.nodes[n];
                        134217728 & t.flags && 536870912 & t.flags && Mr(e, n).setDirty(),
                            (n += t.childCount);
                    }
            }
            function xs(e, t) {
                const n = Mr(e, t.nodeIndex);
                if (!n.dirty) return;
                let r,
                    l = void 0;
                if (67108864 & t.flags) {
                    const n = t.parent.parent;
                    (l = Ss(e, n.nodeIndex, n.nodeIndex + n.childCount, t.query, [])),
                        (r = Dr(e, t.parent.nodeIndex).instance);
                } else
                    134217728 & t.flags &&
                        ((l = Ss(e, 0, e.def.nodes.length - 1, t.query, [])),
                        (r = e.component));
                n.reset(l);
                const s = t.query.bindings;
                let i = !1;
                for (let o = 0; o < s.length; o++) {
                    const e = s[o];
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
            function Ss(e, t, n, r, l) {
                for (let s = t; s <= n; s++) {
                    const t = e.def.nodes[s],
                        n = t.matchedQueries[r.id];
                    if (
                        (null != n && l.push(Ts(e, t, n)),
                        1 & t.flags &&
                            t.element.template &&
                            (t.element.template.nodeMatchedQueries & r.filterId) ===
                                r.filterId)
                    ) {
                        const n = Vr(e, s);
                        if (
                            ((t.childMatchedQueries & r.filterId) === r.filterId &&
                                (Ss(e, s + 1, s + t.childCount, r, l),
                                (s += t.childCount)),
                            16777216 & t.flags)
                        ) {
                            const e = n.viewContainer._embeddedViews;
                            for (let t = 0; t < e.length; t++) {
                                const s = e[t],
                                    i = Yr(s);
                                i && i === n && Ss(s, 0, s.def.nodes.length - 1, r, l);
                            }
                        }
                        const i = n.template._projectedViews;
                        if (i)
                            for (let e = 0; e < i.length; e++) {
                                const t = i[e];
                                Ss(t, 0, t.def.nodes.length - 1, r, l);
                            }
                    }
                    (t.childMatchedQueries & r.filterId) !== r.filterId &&
                        (s += t.childCount);
                }
                return l;
            }
            function Ts(e, t, n) {
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
            function Ns(e, t, n) {
                const r = il(e, t, n);
                r && dl(e, n.ngContent.index, 1, r, null, void 0);
            }
            function As(e, t, n) {
                const r = new Array(n.length);
                for (let l = 0; l < n.length; l++) {
                    const e = n[l];
                    r[l] = {
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
                    bindingFlags: ml(r),
                    outputs: [],
                    element: null,
                    provider: null,
                    text: null,
                    query: null,
                    ngContent: null,
                };
            }
            function ks(e, t, n) {
                const r = new Array(n.length - 1);
                for (let l = 1; l < n.length; l++)
                    r[l - 1] = {
                        flags: 8,
                        name: null,
                        ns: null,
                        nonMinifiedName: null,
                        securityContext: null,
                        suffix: n[l],
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
            function Is(e, t, n) {
                let r;
                const l = e.renderer;
                r = l.createText(n.text.prefix);
                const s = il(e, t, n);
                return s && l.appendChild(s, r), {renderText: r};
            }
            function Vs(e, t) {
                return (null != e ? e.toString() : '') + t.suffix;
            }
            function Ds(e, t, n, r) {
                let l = 0,
                    s = 0,
                    i = 0,
                    o = 0,
                    u = 0,
                    a = null,
                    c = null,
                    d = !1,
                    h = !1,
                    p = null;
                for (let f = 0; f < t.length; f++) {
                    const e = t[f];
                    if (
                        ((e.nodeIndex = f),
                        (e.parent = a),
                        (e.bindingIndex = l),
                        (e.outputIndex = s),
                        (e.renderParent = c),
                        (i |= e.flags),
                        (u |= e.matchedQueryIds),
                        e.element)
                    ) {
                        const t = e.element;
                        (t.publicProviders = a
                            ? a.element.publicProviders
                            : Object.create(null)),
                            (t.allProviders = t.publicProviders),
                            (d = !1),
                            (h = !1),
                            e.element.template &&
                                (u |= e.element.template.nodeMatchedQueries);
                    }
                    if (
                        (Ms(a, e, t.length),
                        (l += e.bindings.length),
                        (s += e.outputs.length),
                        !c && 3 & e.flags && (p = e),
                        20224 & e.flags)
                    ) {
                        d ||
                            ((d = !0),
                            (a.element.publicProviders = Object.create(
                                a.element.publicProviders,
                            )),
                            (a.element.allProviders = a.element.publicProviders));
                        const t = 0 != (32768 & e.flags);
                        0 == (8192 & e.flags) || t
                            ? (a.element.publicProviders[Br(e.provider.token)] = e)
                            : (h ||
                                  ((h = !0),
                                  (a.element.allProviders = Object.create(
                                      a.element.publicProviders,
                                  ))),
                              (a.element.allProviders[Br(e.provider.token)] = e)),
                            t && (a.element.componentProvider = e);
                    }
                    if (
                        (a
                            ? ((a.childFlags |= e.flags),
                              (a.directChildFlags |= e.flags),
                              (a.childMatchedQueries |= e.matchedQueryIds),
                              e.element &&
                                  e.element.template &&
                                  (a.childMatchedQueries |=
                                      e.element.template.nodeMatchedQueries))
                            : (o |= e.flags),
                        e.childCount > 0)
                    )
                        (a = e), Os(e) || (c = e);
                    else
                        for (; a && f === a.nodeIndex + a.childCount; ) {
                            const e = a.parent;
                            e &&
                                ((e.childFlags |= a.childFlags),
                                (e.childMatchedQueries |= a.childMatchedQueries)),
                                (c = (a = e) && Os(a) ? a.renderParent : a);
                        }
                }
                return {
                    factory: null,
                    nodeFlags: i,
                    rootNodeFlags: o,
                    nodeMatchedQueries: u,
                    flags: e,
                    nodes: t,
                    updateDirectives: n || Hr,
                    updateRenderer: r || Hr,
                    handleEvent: (e, n, r, l) => t[n].element.handleEvent(e, r, l),
                    bindingCount: l,
                    outputCount: s,
                    lastRenderRootNode: p,
                };
            }
            function Os(e) {
                return 0 != (1 & e.flags) && null === e.element.name;
            }
            function Ms(e, t, n) {
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
            function Ps(e, t, n, r) {
                const l = js(e.root, e.renderer, e, t, n);
                return Hs(l, e.component, r), Ls(l), l;
            }
            function Rs(e, t, n) {
                const r = js(e, e.renderer, null, null, t);
                return Hs(r, n, n), Ls(r), r;
            }
            function Fs(e, t, n, r) {
                const l = t.element.componentRendererType;
                let s;
                return (
                    (s = l
                        ? e.root.rendererFactory.createRenderer(r, l)
                        : e.root.renderer),
                    js(e.root, s, e, t.element.componentProvider, n)
                );
            }
            function js(e, t, n, r, l) {
                const s = new Array(l.nodes.length),
                    i = l.outputCount ? new Array(l.outputCount) : null;
                return {
                    def: l,
                    parent: n,
                    viewContainerParent: null,
                    parentNodeDef: r,
                    context: null,
                    component: null,
                    nodes: s,
                    state: 13,
                    root: e,
                    renderer: t,
                    oldValues: new Array(l.bindingCount),
                    disposables: i,
                    initIndex: -1,
                };
            }
            function Hs(e, t, n) {
                (e.component = t), (e.context = n);
            }
            function Ls(e) {
                let t;
                tl(e) &&
                    (t = Vr(e.parent, e.parentNodeDef.parent.nodeIndex).renderElement);
                const n = e.def,
                    r = e.nodes;
                for (let l = 0; l < n.nodes.length; l++) {
                    const s = n.nodes[l];
                    let i;
                    switch ((Pr.setCurrentNode(e, l), 201347067 & s.flags)) {
                        case 1:
                            const n = vl(e, t, s);
                            let o = void 0;
                            if (33554432 & s.flags) {
                                const t = ul(s.element.componentView);
                                o = Pr.createComponentView(e, s, t, n);
                            }
                            bl(e, o, s, n),
                                (i = {
                                    renderElement: n,
                                    componentView: o,
                                    viewContainer: null,
                                    template: s.element.template ? $l(e, s) : void 0,
                                }),
                                16777216 & s.flags && (i.viewContainer = Hl(e, s, i));
                            break;
                        case 2:
                            i = Is(e, t, s);
                            break;
                        case 512:
                        case 1024:
                        case 2048:
                        case 256:
                            (i = r[l]) || 4096 & s.flags || (i = {instance: as(e, s)});
                            break;
                        case 16:
                            i = {instance: cs(e, s)};
                            break;
                        case 16384:
                            (i = r[l]) || (i = {instance: ds(e, s)}),
                                32768 & s.flags &&
                                    Hs(
                                        Vr(e, s.parent.nodeIndex).componentView,
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
                            Ns(e, t, s), (i = void 0);
                    }
                    r[l] = i;
                }
                Qs(e, Ws.CreateViewNodes), Xs(e, 201326592, 268435456, 0);
            }
            function Bs(e) {
                zs(e),
                    Pr.updateDirectives(e, 1),
                    Ks(e, Ws.CheckNoChanges),
                    Pr.updateRenderer(e, 1),
                    Qs(e, Ws.CheckNoChanges),
                    (e.state &= -97);
            }
            function Us(e) {
                1 & e.state ? ((e.state &= -2), (e.state |= 2)) : (e.state &= -3),
                    Ar(e, 0, 256),
                    zs(e),
                    Pr.updateDirectives(e, 0),
                    Ks(e, Ws.CheckAndUpdate),
                    Xs(e, 67108864, 536870912, 0);
                let t = Ar(e, 256, 512);
                vs(e, 2097152 | (t ? 1048576 : 0)),
                    Pr.updateRenderer(e, 0),
                    Qs(e, Ws.CheckAndUpdate),
                    Xs(e, 134217728, 536870912, 0),
                    vs(e, 8388608 | ((t = Ar(e, 512, 768)) ? 4194304 : 0)),
                    2 & e.def.flags && (e.state &= -9),
                    (e.state &= -97),
                    Ar(e, 768, 1024);
            }
            function $s(e, t, n, r, l, s, i, o, u, a, c, d, h) {
                return 0 === n
                    ? (function(e, t, n, r, l, s, i, o, u, a, c, d) {
                          switch (201347067 & t.flags) {
                              case 1:
                                  return (function(e, t, n, r, l, s, i, o, u, a, c, d) {
                                      const h = t.bindings.length;
                                      let p = !1;
                                      return (
                                          h > 0 && Cl(e, t, 0, n) && (p = !0),
                                          h > 1 && Cl(e, t, 1, r) && (p = !0),
                                          h > 2 && Cl(e, t, 2, l) && (p = !0),
                                          h > 3 && Cl(e, t, 3, s) && (p = !0),
                                          h > 4 && Cl(e, t, 4, i) && (p = !0),
                                          h > 5 && Cl(e, t, 5, o) && (p = !0),
                                          h > 6 && Cl(e, t, 6, u) && (p = !0),
                                          h > 7 && Cl(e, t, 7, a) && (p = !0),
                                          h > 8 && Cl(e, t, 8, c) && (p = !0),
                                          h > 9 && Cl(e, t, 9, d) && (p = !0),
                                          p
                                      );
                                  })(e, t, n, r, l, s, i, o, u, a, c, d);
                              case 2:
                                  return (function(e, t, n, r, l, s, i, o, u, a, c, d) {
                                      let h = !1;
                                      const p = t.bindings,
                                          f = p.length;
                                      if (
                                          (f > 0 && Zr(e, t, 0, n) && (h = !0),
                                          f > 1 && Zr(e, t, 1, r) && (h = !0),
                                          f > 2 && Zr(e, t, 2, l) && (h = !0),
                                          f > 3 && Zr(e, t, 3, s) && (h = !0),
                                          f > 4 && Zr(e, t, 4, i) && (h = !0),
                                          f > 5 && Zr(e, t, 5, o) && (h = !0),
                                          f > 6 && Zr(e, t, 6, u) && (h = !0),
                                          f > 7 && Zr(e, t, 7, a) && (h = !0),
                                          f > 8 && Zr(e, t, 8, c) && (h = !0),
                                          f > 9 && Zr(e, t, 9, d) && (h = !0),
                                          h)
                                      ) {
                                          let h = t.text.prefix;
                                          f > 0 && (h += Vs(n, p[0])),
                                              f > 1 && (h += Vs(r, p[1])),
                                              f > 2 && (h += Vs(l, p[2])),
                                              f > 3 && (h += Vs(s, p[3])),
                                              f > 4 && (h += Vs(i, p[4])),
                                              f > 5 && (h += Vs(o, p[5])),
                                              f > 6 && (h += Vs(u, p[6])),
                                              f > 7 && (h += Vs(a, p[7])),
                                              f > 8 && (h += Vs(c, p[8])),
                                              f > 9 && (h += Vs(d, p[9]));
                                          const g = Ir(e, t.nodeIndex).renderText;
                                          e.renderer.setValue(g, h);
                                      }
                                      return h;
                                  })(e, t, n, r, l, s, i, o, u, a, c, d);
                              case 16384:
                                  return (function(e, t, n, r, l, s, i, o, u, a, c, d) {
                                      const h = Dr(e, t.nodeIndex),
                                          p = h.instance;
                                      let f = !1,
                                          g = void 0;
                                      const m = t.bindings.length;
                                      return (
                                          m > 0 &&
                                              qr(e, t, 0, n) &&
                                              ((f = !0), (g = ys(e, h, t, 0, n, g))),
                                          m > 1 &&
                                              qr(e, t, 1, r) &&
                                              ((f = !0), (g = ys(e, h, t, 1, r, g))),
                                          m > 2 &&
                                              qr(e, t, 2, l) &&
                                              ((f = !0), (g = ys(e, h, t, 2, l, g))),
                                          m > 3 &&
                                              qr(e, t, 3, s) &&
                                              ((f = !0), (g = ys(e, h, t, 3, s, g))),
                                          m > 4 &&
                                              qr(e, t, 4, i) &&
                                              ((f = !0), (g = ys(e, h, t, 4, i, g))),
                                          m > 5 &&
                                              qr(e, t, 5, o) &&
                                              ((f = !0), (g = ys(e, h, t, 5, o, g))),
                                          m > 6 &&
                                              qr(e, t, 6, u) &&
                                              ((f = !0), (g = ys(e, h, t, 6, u, g))),
                                          m > 7 &&
                                              qr(e, t, 7, a) &&
                                              ((f = !0), (g = ys(e, h, t, 7, a, g))),
                                          m > 8 &&
                                              qr(e, t, 8, c) &&
                                              ((f = !0), (g = ys(e, h, t, 8, c, g))),
                                          m > 9 &&
                                              qr(e, t, 9, d) &&
                                              ((f = !0), (g = ys(e, h, t, 9, d, g))),
                                          g && p.ngOnChanges(g),
                                          65536 & t.flags &&
                                              kr(e, 256, t.nodeIndex) &&
                                              p.ngOnInit(),
                                          262144 & t.flags && p.ngDoCheck(),
                                          f
                                      );
                                  })(e, t, n, r, l, s, i, o, u, a, c, d);
                              case 32:
                              case 64:
                              case 128:
                                  return (function(e, t, n, r, l, s, i, o, u, a, c, d) {
                                      const h = t.bindings;
                                      let p = !1;
                                      const f = h.length;
                                      if (
                                          (f > 0 && Zr(e, t, 0, n) && (p = !0),
                                          f > 1 && Zr(e, t, 1, r) && (p = !0),
                                          f > 2 && Zr(e, t, 2, l) && (p = !0),
                                          f > 3 && Zr(e, t, 3, s) && (p = !0),
                                          f > 4 && Zr(e, t, 4, i) && (p = !0),
                                          f > 5 && Zr(e, t, 5, o) && (p = !0),
                                          f > 6 && Zr(e, t, 6, u) && (p = !0),
                                          f > 7 && Zr(e, t, 7, a) && (p = !0),
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
                                                      f > 2 && (g[2] = l),
                                                      f > 3 && (g[3] = s),
                                                      f > 4 && (g[4] = i),
                                                      f > 5 && (g[5] = o),
                                                      f > 6 && (g[6] = u),
                                                      f > 7 && (g[7] = a),
                                                      f > 8 && (g[8] = c),
                                                      f > 9 && (g[9] = d);
                                                  break;
                                              case 64:
                                                  (g = {}),
                                                      f > 0 && (g[h[0].name] = n),
                                                      f > 1 && (g[h[1].name] = r),
                                                      f > 2 && (g[h[2].name] = l),
                                                      f > 3 && (g[h[3].name] = s),
                                                      f > 4 && (g[h[4].name] = i),
                                                      f > 5 && (g[h[5].name] = o),
                                                      f > 6 && (g[h[6].name] = u),
                                                      f > 7 && (g[h[7].name] = a),
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
                                                          g = e.transform(r, l);
                                                          break;
                                                      case 4:
                                                          g = e.transform(r, l, s);
                                                          break;
                                                      case 5:
                                                          g = e.transform(r, l, s, i);
                                                          break;
                                                      case 6:
                                                          g = e.transform(r, l, s, i, o);
                                                          break;
                                                      case 7:
                                                          g = e.transform(
                                                              r,
                                                              l,
                                                              s,
                                                              i,
                                                              o,
                                                              u,
                                                          );
                                                          break;
                                                      case 8:
                                                          g = e.transform(
                                                              r,
                                                              l,
                                                              s,
                                                              i,
                                                              o,
                                                              u,
                                                              a,
                                                          );
                                                          break;
                                                      case 9:
                                                          g = e.transform(
                                                              r,
                                                              l,
                                                              s,
                                                              i,
                                                              o,
                                                              u,
                                                              a,
                                                              c,
                                                          );
                                                          break;
                                                      case 10:
                                                          g = e.transform(
                                                              r,
                                                              l,
                                                              s,
                                                              i,
                                                              o,
                                                              u,
                                                              a,
                                                              c,
                                                              d,
                                                          );
                                                  }
                                          }
                                          p.value = g;
                                      }
                                      return p;
                                  })(e, t, n, r, l, s, i, o, u, a, c, d);
                              default:
                                  throw 'unreachable';
                          }
                      })(e, t, r, l, s, i, o, u, a, c, d, h)
                    : (function(e, t, n) {
                          switch (201347067 & t.flags) {
                              case 1:
                                  return (function(e, t, n) {
                                      let r = !1;
                                      for (let l = 0; l < n.length; l++)
                                          Cl(e, t, l, n[l]) && (r = !0);
                                      return r;
                                  })(e, t, n);
                              case 2:
                                  return (function(e, t, n) {
                                      const r = t.bindings;
                                      let l = !1;
                                      for (let s = 0; s < n.length; s++)
                                          Zr(e, t, s, n[s]) && (l = !0);
                                      if (l) {
                                          let l = '';
                                          for (let e = 0; e < n.length; e++)
                                              l += Vs(n[e], r[e]);
                                          l = t.text.prefix + l;
                                          const s = Ir(e, t.nodeIndex).renderText;
                                          e.renderer.setValue(s, l);
                                      }
                                      return l;
                                  })(e, t, n);
                              case 16384:
                                  return (function(e, t, n) {
                                      const r = Dr(e, t.nodeIndex),
                                          l = r.instance;
                                      let s = !1,
                                          i = void 0;
                                      for (let o = 0; o < n.length; o++)
                                          qr(e, t, o, n[o]) &&
                                              ((s = !0), (i = ys(e, r, t, o, n[o], i)));
                                      return (
                                          i && l.ngOnChanges(i),
                                          65536 & t.flags &&
                                              kr(e, 256, t.nodeIndex) &&
                                              l.ngOnInit(),
                                          262144 & t.flags && l.ngDoCheck(),
                                          s
                                      );
                                  })(e, t, n);
                              case 32:
                              case 64:
                              case 128:
                                  return (function(e, t, n) {
                                      const r = t.bindings;
                                      let l = !1;
                                      for (let s = 0; s < n.length; s++)
                                          Zr(e, t, s, n[s]) && (l = !0);
                                      if (l) {
                                          const l = Or(e, t.nodeIndex);
                                          let s;
                                          switch (201347067 & t.flags) {
                                              case 32:
                                                  s = n;
                                                  break;
                                              case 64:
                                                  s = {};
                                                  for (let t = 0; t < n.length; t++)
                                                      s[r[t].name] = n[t];
                                                  break;
                                              case 128:
                                                  const e = n[0],
                                                      l = n.slice(1);
                                                  s = e.transform(...l);
                                          }
                                          l.value = s;
                                      }
                                      return l;
                                  })(e, t, n);
                              default:
                                  throw 'unreachable';
                          }
                      })(e, t, r);
            }
            function zs(e) {
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
            function Gs(e, t, n, r, l, s, i, o, u, a, c, d, h) {
                return (
                    0 === n
                        ? (function(e, t, n, r, l, s, i, o, u, a, c, d) {
                              const h = t.bindings.length;
                              h > 0 && Wr(e, t, 0, n),
                                  h > 1 && Wr(e, t, 1, r),
                                  h > 2 && Wr(e, t, 2, l),
                                  h > 3 && Wr(e, t, 3, s),
                                  h > 4 && Wr(e, t, 4, i),
                                  h > 5 && Wr(e, t, 5, o),
                                  h > 6 && Wr(e, t, 6, u),
                                  h > 7 && Wr(e, t, 7, a),
                                  h > 8 && Wr(e, t, 8, c),
                                  h > 9 && Wr(e, t, 9, d);
                          })(e, t, r, l, s, i, o, u, a, c, d, h)
                        : (function(e, t, n) {
                              for (let r = 0; r < n.length; r++) Wr(e, t, r, n[r]);
                          })(e, t, r),
                    !1
                );
            }
            function qs(e, t) {
                if (Mr(e, t.nodeIndex).dirty)
                    throw Rr(
                        Pr.createDebugContext(e, t.nodeIndex),
                        `Query ${t.query.id} not dirty`,
                        `Query ${t.query.id} dirty`,
                        0 != (1 & e.state),
                    );
            }
            function Zs(e) {
                if (!(128 & e.state)) {
                    if (
                        (Ks(e, Ws.Destroy),
                        Qs(e, Ws.Destroy),
                        vs(e, 131072),
                        e.disposables)
                    )
                        for (let t = 0; t < e.disposables.length; t++) e.disposables[t]();
                    !(function(e) {
                        if (!(16 & e.state)) return;
                        const t = Yr(e);
                        if (t) {
                            const n = t.template._projectedViews;
                            n && (Ml(n, n.indexOf(e)), Pr.dirtyParentQueries(e));
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
                        tl(e) && e.renderer.destroy(),
                        (e.state |= 128);
                }
            }
            const Ws = (function() {
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
            function Qs(e, t) {
                const n = e.def;
                if (33554432 & n.nodeFlags)
                    for (let r = 0; r < n.nodes.length; r++) {
                        const l = n.nodes[r];
                        33554432 & l.flags
                            ? Js(Vr(e, r).componentView, t)
                            : 0 == (33554432 & l.childFlags) && (r += l.childCount);
                    }
            }
            function Ks(e, t) {
                const n = e.def;
                if (16777216 & n.nodeFlags)
                    for (let r = 0; r < n.nodes.length; r++) {
                        const l = n.nodes[r];
                        if (16777216 & l.flags) {
                            const n = Vr(e, r).viewContainer._embeddedViews;
                            for (let e = 0; e < n.length; e++) Js(n[e], t);
                        } else 0 == (16777216 & l.childFlags) && (r += l.childCount);
                    }
            }
            function Js(e, t) {
                const n = e.state;
                switch (t) {
                    case Ws.CheckNoChanges:
                        0 == (128 & n) &&
                            (12 == (12 & n)
                                ? Bs(e)
                                : 64 & n && Ys(e, Ws.CheckNoChangesProjectedViews));
                        break;
                    case Ws.CheckNoChangesProjectedViews:
                        0 == (128 & n) && (32 & n ? Bs(e) : 64 & n && Ys(e, t));
                        break;
                    case Ws.CheckAndUpdate:
                        0 == (128 & n) &&
                            (12 == (12 & n)
                                ? Us(e)
                                : 64 & n && Ys(e, Ws.CheckAndUpdateProjectedViews));
                        break;
                    case Ws.CheckAndUpdateProjectedViews:
                        0 == (128 & n) && (32 & n ? Us(e) : 64 & n && Ys(e, t));
                        break;
                    case Ws.Destroy:
                        Zs(e);
                        break;
                    case Ws.CreateViewNodes:
                        Ls(e);
                }
            }
            function Ys(e, t) {
                Ks(e, t), Qs(e, t);
            }
            function Xs(e, t, n, r) {
                if (!(e.def.nodeFlags & t && e.def.nodeFlags & n)) return;
                const l = e.def.nodes.length;
                for (let s = 0; s < l; s++) {
                    const l = e.def.nodes[s];
                    if (l.flags & t && l.flags & n)
                        switch ((Pr.setCurrentNode(e, l.nodeIndex), r)) {
                            case 0:
                                xs(e, l);
                                break;
                            case 1:
                                qs(e, l);
                        }
                    (l.childFlags & t && l.childFlags & n) || (s += l.childCount);
                }
            }
            let ei = !1;
            function ti(e, t, n, r, l, s) {
                const i = l.injector.get(mt);
                return Rs(ri(e, l, i, t, n), r, s);
            }
            function ni(e, t, n, r, l, s) {
                const i = l.injector.get(mt),
                    o = ri(e, l, new Pi(i), t, n),
                    u = pi(r);
                return Oi(vi.create, Rs, null, [o, u, s]);
            }
            function ri(e, t, n, r, l) {
                const s = t.injector.get(wt),
                    i = t.injector.get(sn),
                    o = n.createRenderer(null, null);
                return {
                    ngModule: t,
                    injector: e,
                    projectableNodes: r,
                    selectorOrNode: l,
                    sanitizer: s,
                    rendererFactory: n,
                    renderer: o,
                    errorHandler: i,
                };
            }
            function li(e, t, n, r) {
                const l = pi(n);
                return Oi(vi.create, Ps, null, [e, t, l, r]);
            }
            function si(e, t, n, r) {
                return (
                    (n = ai.get(t.element.componentProvider.provider.token) || pi(n)),
                    Oi(vi.create, Fs, null, [e, t, n, r])
                );
            }
            function ii(e, t, n, r) {
                return Kl(
                    e,
                    t,
                    n,
                    (function(e) {
                        const {hasOverrides: t, hasDeprecatedOverrides: n} = (function(
                            e,
                        ) {
                            let t = !1,
                                n = !1;
                            return 0 === oi.size
                                ? {hasOverrides: t, hasDeprecatedOverrides: n}
                                : (e.providers.forEach(e => {
                                      const r = oi.get(e.token);
                                      3840 & e.flags &&
                                          r &&
                                          ((t = !0), (n = n || r.deprecatedBehavior));
                                  }),
                                  e.modules.forEach(e => {
                                      ui.forEach((r, l) => {
                                          ne(l).providedIn === e &&
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
                                      const l = oi.get(r.token);
                                      l &&
                                          ((r.flags = (-3841 & r.flags) | l.flags),
                                          (r.deps = sl(l.deps)),
                                          (r.value = l.value));
                                  }
                                  if (ui.size > 0) {
                                      let t = new Set(e.modules);
                                      ui.forEach((r, l) => {
                                          if (t.has(ne(l).providedIn)) {
                                              let t = {
                                                  token: l,
                                                  flags: r.flags | (n ? 4096 : 0),
                                                  deps: sl(r.deps),
                                                  value: r.value,
                                                  index: e.providers.length,
                                              };
                                              e.providers.push(t),
                                                  (e.providersByKey[Br(l)] = t);
                                          }
                                      });
                                  }
                              })((e = e.factory(() => Hr))),
                              e)
                            : e;
                    })(r),
                );
            }
            const oi = new Map(),
                ui = new Map(),
                ai = new Map();
            function ci(e) {
                let t;
                oi.set(e.token, e),
                    'function' == typeof e.token &&
                        (t = ne(e.token)) &&
                        'function' == typeof t.providedIn &&
                        ui.set(e.token, e);
            }
            function di(e, t) {
                const n = ul(t.viewDefFactory),
                    r = ul(n.nodes[0].element.componentView);
                ai.set(e, r);
            }
            function hi() {
                oi.clear(), ui.clear(), ai.clear();
            }
            function pi(e) {
                if (0 === oi.size) return e;
                const t = (function(e) {
                    const t = [];
                    let n = null;
                    for (let r = 0; r < e.nodes.length; r++) {
                        const l = e.nodes[r];
                        1 & l.flags && (n = l),
                            n &&
                                3840 & l.flags &&
                                oi.has(l.provider.token) &&
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
                                n = oi.get(e.token);
                            n &&
                                ((t.flags = (-3841 & t.flags) | n.flags),
                                (e.deps = sl(n.deps)),
                                (e.value = n.value));
                        }
                    }
                }
            }
            function fi(e, t, n, r, l, s, i, o, u, a, c, d, h) {
                const p = e.def.nodes[t];
                return (
                    $s(e, p, n, r, l, s, i, o, u, a, c, d, h),
                    224 & p.flags ? Or(e, t).value : void 0
                );
            }
            function gi(e, t, n, r, l, s, i, o, u, a, c, d, h) {
                const p = e.def.nodes[t];
                return (
                    Gs(e, p, n, r, l, s, i, o, u, a, c, d, h),
                    224 & p.flags ? Or(e, t).value : void 0
                );
            }
            function mi(e) {
                return Oi(vi.detectChanges, Us, null, [e]);
            }
            function _i(e) {
                return Oi(vi.checkNoChanges, Bs, null, [e]);
            }
            function yi(e) {
                return Oi(vi.destroy, Zs, null, [e]);
            }
            const vi = (function() {
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
            let bi, wi, Ci;
            function Ei(e, t) {
                (wi = e), (Ci = t);
            }
            function xi(e, t, n, r) {
                return (
                    Ei(e, t), Oi(vi.handleEvent, e.def.handleEvent, null, [e, t, n, r])
                );
            }
            function Si(e, t) {
                if (128 & e.state) throw jr(vi[bi]);
                return (
                    Ei(e, ki(e, 0)),
                    e.def.updateDirectives(function(e, n, r, ...l) {
                        const s = e.def.nodes[n];
                        return (
                            0 === t ? Ni(e, s, r, l) : Ai(e, s, r, l),
                            16384 & s.flags && Ei(e, ki(e, n)),
                            224 & s.flags ? Or(e, s.nodeIndex).value : void 0
                        );
                    }, e)
                );
            }
            function Ti(e, t) {
                if (128 & e.state) throw jr(vi[bi]);
                return (
                    Ei(e, Ii(e, 0)),
                    e.def.updateRenderer(function(e, n, r, ...l) {
                        const s = e.def.nodes[n];
                        return (
                            0 === t ? Ni(e, s, r, l) : Ai(e, s, r, l),
                            3 & s.flags && Ei(e, Ii(e, n)),
                            224 & s.flags ? Or(e, s.nodeIndex).value : void 0
                        );
                    }, e)
                );
            }
            function Ni(e, t, n, r) {
                if ($s(e, t, n, ...r)) {
                    const i = 1 === n ? r[0] : r;
                    if (16384 & t.flags) {
                        const n = {};
                        for (let e = 0; e < t.bindings.length; e++) {
                            const r = t.bindings[e],
                                o = i[e];
                            8 & r.flags &&
                                (n[
                                    ((l = r.nonMinifiedName),
                                    (s = void 0),
                                    (s = l.replace(/[$@]/g, '_')),
                                    `ng-reflect-${(l = s.replace(
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
                var l, s;
            }
            function Ai(e, t, n, r) {
                Gs(e, t, n, ...r);
            }
            function ki(e, t) {
                for (let n = t; n < e.def.nodes.length; n++) {
                    const t = e.def.nodes[n];
                    if (16384 & t.flags && t.bindings && t.bindings.length) return n;
                }
                return null;
            }
            function Ii(e, t) {
                for (let n = t; n < e.def.nodes.length; n++) {
                    const t = e.def.nodes[n];
                    if (3 & t.flags && t.bindings && t.bindings.length) return n;
                }
                return null;
            }
            class Vi {
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
                    return Gl(this.elView, this.elDef);
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
                        Di(this.elView, this.elDef, e);
                        for (
                            let t = this.elDef.nodeIndex + 1;
                            t <= this.elDef.nodeIndex + this.elDef.childCount;
                            t++
                        ) {
                            const n = this.elView.def.nodes[t];
                            20224 & n.flags && Di(this.elView, n, e), (t += n.childCount);
                        }
                    }
                    return e;
                }
                get componentRenderElement() {
                    const e = (function(e) {
                        for (; e && !tl(e); ) e = e.parent;
                        return e.parent ? Vr(e.parent, Xr(e).nodeIndex) : null;
                    })(this.elOrCompView);
                    return e ? e.renderElement : void 0;
                }
                get renderNode() {
                    return 2 & this.nodeDef.flags
                        ? el(this.view, this.nodeDef)
                        : el(this.elView, this.elDef);
                }
                logError(e, ...t) {
                    let n, r;
                    2 & this.nodeDef.flags
                        ? ((n = this.view.def), (r = this.nodeDef.nodeIndex))
                        : ((n = this.elView.def), (r = this.elDef.nodeIndex));
                    const l = (function(e, t) {
                        let n = -1;
                        for (let r = 0; r <= t; r++) 3 & e.nodes[r].flags && n++;
                        return n;
                    })(n, r);
                    let s = -1;
                    n.factory(() => (++s === l ? e.error.bind(e, ...t) : Hr)),
                        s < l &&
                            (e.error(
                                'Illegal state: the ViewDefinitionFactory did not call the logger!',
                            ),
                            e.error(...t));
                }
            }
            function Di(e, t, n) {
                for (let r in t.references) n[r] = Ts(e, t, t.references[r]);
            }
            function Oi(e, t, n, r) {
                const l = bi,
                    s = wi,
                    i = Ci;
                try {
                    bi = e;
                    const u = t.apply(n, r);
                    return (wi = s), (Ci = i), (bi = l), u;
                } catch (o) {
                    if (nn(o) || !wi) throw o;
                    throw (function(e, t) {
                        return (
                            e instanceof Error || (e = new Error(e.toString())),
                            Fr(e, t),
                            e
                        );
                    })(o, Mi());
                }
            }
            function Mi() {
                return wi ? new Vi(wi, Ci) : null;
            }
            class Pi {
                constructor(e) {
                    this.delegate = e;
                }
                createRenderer(e, t) {
                    return new Ri(this.delegate.createRenderer(e, t));
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
            class Ri {
                constructor(e) {
                    (this.delegate = e),
                        (this.debugContextFactory = Mi),
                        (this.data = this.delegate.data);
                }
                createDebugContext(e) {
                    return this.debugContextFactory(e);
                }
                destroyNode(e) {
                    !(function(e) {
                        lr.delete(e.nativeNode);
                    })(sr(e)),
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
                    const n = sr(e),
                        r = sr(t);
                    n && r && n instanceof rr && n.addChild(r),
                        this.delegate.appendChild(e, t);
                }
                insertBefore(e, t, n) {
                    const r = sr(e),
                        l = sr(t),
                        s = sr(n);
                    r && l && r instanceof rr && r.insertBefore(s, l),
                        this.delegate.insertBefore(e, t, n);
                }
                removeChild(e, t) {
                    const n = sr(e),
                        r = sr(t);
                    n && r && n instanceof rr && n.removeChild(r),
                        this.delegate.removeChild(e, t);
                }
                selectRootElement(e, t) {
                    const n = this.delegate.selectRootElement(e, t),
                        r = Mi();
                    return r && ir(new rr(n, null, r)), n;
                }
                setAttribute(e, t, n, r) {
                    const l = sr(e);
                    l && l instanceof rr && (l.attributes[r ? r + ':' + t : t] = n),
                        this.delegate.setAttribute(e, t, n, r);
                }
                removeAttribute(e, t, n) {
                    const r = sr(e);
                    r && r instanceof rr && (r.attributes[n ? n + ':' + t : t] = null),
                        this.delegate.removeAttribute(e, t, n);
                }
                addClass(e, t) {
                    const n = sr(e);
                    n && n instanceof rr && (n.classes[t] = !0),
                        this.delegate.addClass(e, t);
                }
                removeClass(e, t) {
                    const n = sr(e);
                    n && n instanceof rr && (n.classes[t] = !1),
                        this.delegate.removeClass(e, t);
                }
                setStyle(e, t, n, r) {
                    const l = sr(e);
                    l && l instanceof rr && (l.styles[t] = n),
                        this.delegate.setStyle(e, t, n, r);
                }
                removeStyle(e, t, n) {
                    const r = sr(e);
                    r && r instanceof rr && (r.styles[t] = null),
                        this.delegate.removeStyle(e, t, n);
                }
                setProperty(e, t, n) {
                    const r = sr(e);
                    r && r instanceof rr && (r.properties[t] = n),
                        this.delegate.setProperty(e, t, n);
                }
                listen(e, t, n) {
                    if ('string' != typeof e) {
                        const r = sr(e);
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
            function Fi(e, t, n) {
                return new ji(e, t, n);
            }
            class ji extends ht {
                constructor(e, t, n) {
                    super(),
                        (this.moduleType = e),
                        (this._bootstrapComponents = t),
                        (this._ngModuleDefFactory = n);
                }
                create(e) {
                    !(function() {
                        if (ei) return;
                        ei = !0;
                        const e = Tt()
                            ? {
                                  setCurrentNode: Ei,
                                  createRootView: ni,
                                  createEmbeddedView: li,
                                  createComponentView: si,
                                  createNgModuleRef: ii,
                                  overrideProvider: ci,
                                  overrideComponentView: di,
                                  clearOverrides: hi,
                                  checkAndUpdateView: mi,
                                  checkNoChangesView: _i,
                                  destroyView: yi,
                                  createDebugContext: (e, t) => new Vi(e, t),
                                  handleEvent: xi,
                                  updateDirectives: Si,
                                  updateRenderer: Ti,
                              }
                            : {
                                  setCurrentNode: () => {},
                                  createRootView: ti,
                                  createEmbeddedView: Ps,
                                  createComponentView: Fs,
                                  createNgModuleRef: Kl,
                                  overrideProvider: Hr,
                                  overrideComponentView: Hr,
                                  clearOverrides: Hr,
                                  checkAndUpdateView: Us,
                                  checkNoChangesView: Bs,
                                  destroyView: Zs,
                                  createDebugContext: (e, t) => new Vi(e, t),
                                  handleEvent: (e, t, n, r) =>
                                      e.def.handleEvent(e, t, n, r),
                                  updateDirectives: (e, t) =>
                                      e.def.updateDirectives(0 === t ? fi : gi, e),
                                  updateRenderer: (e, t) =>
                                      e.def.updateRenderer(0 === t ? fi : gi, e),
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
                            (Pr.resolveDep = ms),
                            (Pr.createDebugContext = e.createDebugContext),
                            (Pr.handleEvent = e.handleEvent),
                            (Pr.updateDirectives = e.updateDirectives),
                            (Pr.updateRenderer = e.updateRenderer),
                            (Pr.dirtyParentQueries = Es);
                    })();
                    const t = (function(e) {
                        const t = Array.from(e.providers),
                            n = Array.from(e.modules),
                            r = {};
                        for (const l in e.providersByKey) r[l] = e.providersByKey[l];
                        return {
                            factory: e.factory,
                            isRoot: e.isRoot,
                            providers: t,
                            modules: n,
                            providersByKey: r,
                        };
                    })(ul(this._ngModuleDefFactory));
                    return Pr.createNgModuleRef(
                        this.moduleType,
                        e || Le.NULL,
                        this._bootstrapComponents,
                        t,
                    );
                }
            }
            class Hi {}
            class Li {
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
                        (this.curve = Bi(this.distortion)),
                        (this.real = [0, 0, 1, 0, 1]);
                }
                get distortionCompensation() {
                    return 1.2 - this.distortion / 20;
                }
                onCurveChange(e) {
                    (this.distortion = e), (this.curve = Bi(e));
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
                    let l = 0;
                    for (let s = 0; s < e.length; s++) {
                        const i = ((e[s] / 128) * t.height) / 2;
                        0 === s ? n.moveTo(l, i) : n.lineTo(l, i), (l += r);
                    }
                    n.lineTo(t.width, t.height / 2), n.stroke();
                }
            }
            function Bi(e) {
                const t = new Float32Array(44100),
                    n = Math.PI / 180;
                for (let r = 0; r < 44100; ++r) {
                    const l = (2 * r) / 44100 - 1;
                    t[r] = ((3 + e) * l * 20 * n) / (Math.PI + e * Math.abs(l));
                }
                return t;
            }
            function Ui(e, t, n, r) {
                var l,
                    s = arguments.length,
                    i =
                        s < 3
                            ? t
                            : null === r
                            ? (r = Object.getOwnPropertyDescriptor(t, n))
                            : r;
                if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
                    i = Reflect.decorate(e, t, n, r);
                else
                    for (var o = e.length - 1; o >= 0; o--)
                        (l = e[o]) &&
                            (i = (s < 3 ? l(i) : s > 3 ? l(t, n, i) : l(t, n)) || i);
                return s > 3 && i && Object.defineProperty(t, n, i), i;
            }
            function $i(e, t) {
                if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
                    return Reflect.metadata(e, t);
            }
            function zi(...e) {
                let t = e[e.length - 1];
                return N(t) ? (e.pop(), L(e, t)) : G(e);
            }
            function Gi(e, t) {
                return 'function' == typeof t
                    ? n =>
                          n.pipe(
                              Gi((n, r) => B(e(n, r)).pipe(F((e, l) => t(n, e, r, l)))),
                          )
                    : t => t.lift(new qi(e));
            }
            class qi {
                constructor(e) {
                    this.project = e;
                }
                call(e, t) {
                    return t.subscribe(new Zi(e, this.project));
                }
            }
            class Zi extends R {
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
                    const l = new A(this, void 0, void 0);
                    this.destination.add(l),
                        (this.innerSubscription = P(this, e, t, n, l));
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
                notifyNext(e, t, n, r, l) {
                    this.destination.next(t);
                }
            }
            function Wi(e, t, n = 0) {
                e.setValueAtTime(t, n);
            }
            function Qi(e) {
                return (t, n) => {
                    Object.defineProperty(t, n, {
                        set(r) {
                            this[e] instanceof AudioParam
                                ? Wi(this[e], r, this.context.currentTime)
                                : Object.defineProperty(t, n, {value: r});
                        },
                    });
                };
            }
            function Ki(e, t) {
                e && t && e.connect(t);
            }
            function Ji(e, t, n, r, ...l) {
                try {
                    new GainNode(e);
                } catch (s) {
                    const i = e[t]();
                    return Object.setPrototypeOf(i, n.prototype), n.init(i, r, ...l), i;
                }
            }
            class Yi extends AudioBufferSourceNode {
                constructor(e, t, n) {
                    const r = Ji(t, 'createBufferSource', Yi, null, n, e);
                    if (r) return r;
                    super(t), Yi.init(this, null, n, e);
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
                    Ki(t, e), null !== n && e.start();
                    const l = new Wt();
                    (e.ended = l),
                        (e.onended = () => l.emit()),
                        (e.buffer$ = new S()),
                        e.buffer$
                            .pipe(Gi(e => ('string' == typeof e ? r.fetch(e) : zi(e))))
                            .subscribe(t => {
                                e.buffer = t;
                            });
                }
            }
            Ui(
                [Qi('detune'), $i('design:type', Number)],
                Yi.prototype,
                'detuneParam',
                void 0,
            ),
                Ui(
                    [Qi('playbackRate'), $i('design:type', Number)],
                    Yi.prototype,
                    'playbackRateParam',
                    void 0,
                );
            const Xi = new re('Web Audio API context', {
                providedIn: 'root',
                factory: () => new AudioContext(),
            });
            class eo {
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
            eo.ngInjectableDef = te({
                factory: function() {
                    return new eo(Ne(Xi));
                },
                token: eo,
                providedIn: 'root',
            });
            const to = new re('Web Audio API audio node', {factory: () => null});
            class no extends h {
                constructor(e, t) {
                    super();
                }
                schedule(e, t = 0) {
                    return this;
                }
            }
            class ro extends no {
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
                    } catch (l) {
                        (n = !0), (r = (!!l && l) || new Error(l));
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
            const lo = (function() {
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
            class so extends lo {
                constructor(e, t = lo.now) {
                    super(e, () =>
                        so.delegate && so.delegate !== this ? so.delegate.now() : t(),
                    ),
                        (this.actions = []),
                        (this.active = !1),
                        (this.scheduled = void 0);
                }
                schedule(e, t = 0, n) {
                    return so.delegate && so.delegate !== this
                        ? so.delegate.schedule(e, t, n)
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
            const io = new so(ro);
            function oo(e = 0, t = io) {
                var n;
                return (
                    (u((n = e)) || !(n - parseFloat(n) + 1 >= 0) || e < 0) && (e = 0),
                    (t && 'function' == typeof t.schedule) || (t = io),
                    new v(
                        n => (
                            n.add(
                                t.schedule(uo, e, {subscriber: n, counter: 0, period: e}),
                            ),
                            n
                        ),
                    )
                );
            }
            function uo(e) {
                const {subscriber: t, counter: n, period: r} = e;
                t.next(n), this.schedule({subscriber: t, counter: n + 1, period: r}, r);
            }
            class ao extends ro {
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
            class co extends so {
                flush(e) {
                    (this.active = !0), (this.scheduled = void 0);
                    const {actions: t} = this;
                    let n,
                        r = -1,
                        l = t.length;
                    e = e || t.shift();
                    do {
                        if ((n = e.execute(e.state, e.delay))) break;
                    } while (++r < l && (e = t.shift()));
                    if (((this.active = !1), n)) {
                        for (; ++r < l && (e = t.shift()); ) e.unsubscribe();
                        throw n;
                    }
                }
            }
            const ho = new co(ao);
            function po(e) {
                return t => t.lift(new fo(e));
            }
            class fo {
                constructor(e) {
                    this.value = e;
                }
                call(e, t) {
                    return t.subscribe(new go(e, this.value));
                }
            }
            class go extends g {
                constructor(e, t) {
                    super(e), (this.value = t);
                }
                _next(e) {
                    this.destination.next(this.value);
                }
            }
            function mo(e, t, n) {
                return function(r) {
                    return r.lift(new _o(e, t, n));
                };
            }
            class _o {
                constructor(e, t, n) {
                    (this.nextOrObserver = e), (this.error = t), (this.complete = n);
                }
                call(e, t) {
                    return t.subscribe(
                        new yo(e, this.nextOrObserver, this.error, this.complete),
                    );
                }
            }
            class yo extends g {
                constructor(e, t, n, l) {
                    super(e),
                        (this._tapNext = y),
                        (this._tapError = y),
                        (this._tapComplete = y),
                        (this._tapError = n || y),
                        (this._tapComplete = l || y),
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
            class vo extends AnalyserNode {
                constructor(e, t) {
                    const n = Ji(e, 'createAnalyser', vo, t);
                    if (n) return n;
                    super(e), vo.init(this, t);
                }
                ngOnDestroy() {
                    this.disconnect();
                }
                static init(e, t) {
                    Ki(t, e),
                        (e.frequencyByte$ = oo(0, ho).pipe(
                            po(new Uint8Array(e.frequencyBinCount)),
                            F(t =>
                                t.length === e.frequencyBinCount
                                    ? t
                                    : new Uint8Array(e.frequencyBinCount),
                            ),
                            mo(t => e.getByteFrequencyData(t)),
                        )),
                        (e.frequencyFloat$ = oo(0, ho).pipe(
                            po(new Float32Array(e.frequencyBinCount)),
                            F(t =>
                                t.length === e.frequencyBinCount
                                    ? t
                                    : new Float32Array(e.frequencyBinCount),
                            ),
                            mo(t => e.getFloatFrequencyData(t)),
                        )),
                        (e.timeByte$ = oo(0, ho).pipe(
                            po(new Uint8Array(e.fftSize)),
                            F(t =>
                                t.length === e.fftSize
                                    ? t
                                    : new Uint8Array(e.frequencyBinCount),
                            ),
                            mo(t => e.getByteTimeDomainData(t)),
                        )),
                        (e.timeFloat$ = oo(0, ho).pipe(
                            po(new Float32Array(e.fftSize)),
                            F(t =>
                                t.length === e.fftSize
                                    ? t
                                    : new Float32Array(e.frequencyBinCount),
                            ),
                            mo(t => e.getFloatTimeDomainData(t)),
                        ));
                }
            }
            class bo extends GainNode {
                set Output(e) {
                    this.disconnect(), Ki(this, e);
                }
                constructor(e, t) {
                    const n = Ji(e, 'createGain', bo, t);
                    if (n) return n;
                    super(e), bo.init(this, t);
                }
                ngOnDestroy() {
                    this.disconnect();
                }
                static init(e, t) {
                    Ki(t, e);
                }
            }
            class wo {}
            class Co {}
            const Eo = new re('appBaseHref');
            class xo {
                constructor(e) {
                    (this._subject = new Wt()), (this._platformStrategy = e);
                    const t = this._platformStrategy.getBaseHref();
                    (this._baseHref = xo.stripTrailingSlash(So(t))),
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
                    return this.path() == this.normalize(e + xo.normalizeQueryParams(t));
                }
                normalize(e) {
                    return xo.stripTrailingSlash(
                        (function(e, t) {
                            return e && t.startsWith(e) ? t.substring(e.length) : t;
                        })(this._baseHref, So(e)),
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
            function So(e) {
                return e.replace(/\/index.html$/, '');
            }
            class To extends Co {
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
                    return xo.joinWithSlash(this._baseHref, e);
                }
                path(e = !1) {
                    const t =
                            this._platformLocation.pathname +
                            xo.normalizeQueryParams(this._platformLocation.search),
                        n = this._platformLocation.hash;
                    return n && e ? `${t}${n}` : t;
                }
                pushState(e, t, n, r) {
                    const l = this.prepareExternalUrl(n + xo.normalizeQueryParams(r));
                    this._platformLocation.pushState(e, t, l);
                }
                replaceState(e, t, n, r) {
                    const l = this.prepareExternalUrl(n + xo.normalizeQueryParams(r));
                    this._platformLocation.replaceState(e, t, l);
                }
                forward() {
                    this._platformLocation.forward();
                }
                back() {
                    this._platformLocation.back();
                }
            }
            const No = void 0;
            var Ao = [
                'en',
                [['a', 'p'], ['AM', 'PM'], No],
                [['AM', 'PM'], No, No],
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
                No,
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
                No,
                [['B', 'A'], ['BC', 'AD'], ['Before Christ', 'Anno Domini']],
                0,
                [6, 0],
                ['M/d/yy', 'MMM d, y', 'MMMM d, y', 'EEEE, MMMM d, y'],
                ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
                ['{1}, {0}', No, "{1} 'at' {0}", No],
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
            const ko = {},
                Io = (function() {
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
                Vo = new re('UseV4Plurals');
            class Do {}
            class Oo extends Do {
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
                                      let n = ko[t];
                                      if (n) return n;
                                      const r = t.split('-')[0];
                                      if ((n = ko[r])) return n;
                                      if ('en' === r) return Ao;
                                      throw new Error(
                                          `Missing locale data for the locale "${e}".`,
                                      );
                                  })(e)[18];
                              })(t || this.locale)(e)
                    ) {
                        case Io.Zero:
                            return 'zero';
                        case Io.One:
                            return 'one';
                        case Io.Two:
                            return 'two';
                        case Io.Few:
                            return 'few';
                        case Io.Many:
                            return 'many';
                        default:
                            return 'other';
                    }
                }
            }
            class Mo {
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
            class Po {
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
                                    new Mo(null, this._ngForOf, -1, -1),
                                    r,
                                ),
                                l = new Ro(e, n);
                            t.push(l);
                        } else if (null == r) this._viewContainer.remove(n);
                        else {
                            const l = this._viewContainer.get(n);
                            this._viewContainer.move(l, r);
                            const s = new Ro(e, l);
                            t.push(s);
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
            class Ro {
                constructor(e, t) {
                    (this.record = e), (this.view = t);
                }
            }
            class Fo {
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
            class jo {
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
            class Ho {
                constructor(e, t, n) {
                    (this.ngSwitch = n), n._addCase(), (this._view = new Fo(e, t));
                }
                ngDoCheck() {
                    this._view.enforceState(this.ngSwitch._matchCase(this.ngSwitchCase));
                }
            }
            class Lo {}
            const Bo = new re('DocumentToken'),
                Uo = 'server';
            class $o extends MediaElementAudioSourceNode {
                constructor(e, {nativeElement: t}) {
                    try {
                        new GainNode(e);
                    } catch (n) {
                        const r = e.createMediaElementSource(t);
                        return Object.setPrototypeOf(r, $o.prototype), r;
                    }
                    super(e, {mediaElement: t});
                }
                ngOnDestroy() {
                    this.disconnect();
                }
            }
            class zo extends OscillatorNode {
                constructor(e, t) {
                    const n = Ji(e, 'createOscillator', zo, null, t);
                    if (n) return n;
                    super(e), zo.init(this, null, t);
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
                    Ki(t, e), null !== n && e.start();
                    const r = new Wt();
                    (e.ended = r), (e.onended = () => r.emit());
                }
            }
            Ui(
                [Qi('detune'), $i('design:type', Number)],
                zo.prototype,
                'detuneParam',
                void 0,
            ),
                Ui(
                    [Qi('frequency'), $i('design:type', Number)],
                    zo.prototype,
                    'frequencyParam',
                    void 0,
                );
            class Go extends GainNode {
                constructor(e, t) {
                    const n = Ji(e, 'createGain', Go, t);
                    if (n) return n;
                    super(e), Go.init(this, t);
                }
                ngOnDestroy() {
                    this.disconnect();
                }
                static init(e, t) {
                    Ki(t, e);
                }
            }
            function qo(e, t) {
                return new v(n => {
                    const r = e.length;
                    if (0 === r) return void n.complete();
                    const l = new Array(r);
                    let s = 0,
                        i = 0;
                    for (let o = 0; o < r; o++) {
                        const u = B(e[o]);
                        let a = !1;
                        n.add(
                            u.subscribe({
                                next: e => {
                                    a || ((a = !0), i++), (l[o] = e);
                                },
                                error: e => n.error(e),
                                complete: () => {
                                    (++s !== r && a) ||
                                        (i === r &&
                                            n.next(
                                                t
                                                    ? t.reduce(
                                                          (e, t, n) => ((e[t] = l[n]), e),
                                                          {},
                                                      )
                                                    : l,
                                            ),
                                        n.complete());
                                },
                            }),
                        );
                    }
                });
            }
            Ui([Qi('gain'), $i('design:type', Number)], Go.prototype, 'GainNode', void 0);
            let Zo = null;
            function Wo() {
                return Zo;
            }
            class Qo {
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
            class Ko extends Qo {
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
            const Jo = {
                    class: 'className',
                    innerHtml: 'innerHTML',
                    readonly: 'readOnly',
                    tabindex: 'tabIndex',
                },
                Yo = 3,
                Xo = {
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
                eu = {
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
            let tu;
            ue.Node &&
                (tu =
                    ue.Node.prototype.contains ||
                    function(e) {
                        return !!(16 & this.compareDocumentPosition(e));
                    });
            class nu extends Ko {
                parse(e) {
                    throw new Error('parse not implemented');
                }
                static makeCurrent() {
                    var e;
                    (e = new nu()), Zo || (Zo = e);
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
                    return Jo;
                }
                contains(e, t) {
                    return tu.call(e, t);
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
                            e.location === Yo && eu.hasOwnProperty(t) && (t = eu[t]));
                    }
                    return Xo[t] || t;
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
                        lu || (lu = document.querySelector('base'))
                            ? lu.getAttribute('href')
                            : null;
                    return null == t
                        ? null
                        : ((n = t),
                          ru || (ru = document.createElement('a')),
                          ru.setAttribute('href', n),
                          '/' === ru.pathname.charAt(0)
                              ? ru.pathname
                              : '/' + ru.pathname);
                    var n;
                }
                resetBaseElement() {
                    lu = null;
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
                                [r, l] =
                                    -1 == e ? [n, ''] : [n.slice(0, e), n.slice(e + 1)];
                            if (r.trim() === t) return decodeURIComponent(l);
                        }
                        return null;
                    })(document.cookie, e);
                }
                setCookie(e, t) {
                    document.cookie = encodeURIComponent(e) + '=' + encodeURIComponent(t);
                }
            }
            let ru,
                lu = null;
            const su = Bo;
            function iu() {
                return !!window.history.pushState;
            }
            const ou = (function() {
                    class e extends wo {
                        constructor(e) {
                            super(), (this._doc = e), this._init();
                        }
                        _init() {
                            (this.location = Wo().getLocation()),
                                (this._history = Wo().getHistory());
                        }
                        getBaseHrefFromDOM() {
                            return Wo().getBaseHref(this._doc);
                        }
                        onPopState(e) {
                            Wo()
                                .getGlobalEventTarget(this._doc, 'window')
                                .addEventListener('popstate', e, !1);
                        }
                        onHashChange(e) {
                            Wo()
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
                            iu()
                                ? this._history.pushState(e, t, n)
                                : (this.location.hash = n);
                        }
                        replaceState(e, t, n) {
                            iu()
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
                            {type: void 0, decorators: [{type: ve, args: [su]}]},
                        ]),
                        e
                    );
                })(),
                uu = new re('TRANSITION_ID');
            function au(e, t, n) {
                return () => {
                    n.get(cn).donePromise.then(() => {
                        const n = Wo();
                        Array.prototype.slice
                            .apply(n.querySelectorAll(t, 'style[ng-transition]'))
                            .filter(t => n.getAttribute(t, 'ng-transition') === e)
                            .forEach(e => n.remove(e));
                    });
                };
            }
            const cu = [{provide: an, useFactory: au, deps: [uu, su, Le], multi: !0}];
            class du {
                static init() {
                    var e;
                    (e = new du()), (Ln = e);
                }
                addToWindow(e) {
                    (ue.getAngularTestability = (t, n = !0) => {
                        const r = e.findTestabilityInTree(t, n);
                        if (null == r)
                            throw new Error('Could not find testability for element.');
                        return r;
                    }),
                        (ue.getAllAngularTestabilities = () => e.getAllTestabilities()),
                        (ue.getAllAngularRootElements = () => e.getAllRootElements()),
                        ue.frameworkStabilizers || (ue.frameworkStabilizers = []),
                        ue.frameworkStabilizers.push(e => {
                            const t = ue.getAllAngularTestabilities();
                            let n = t.length,
                                r = !1;
                            const l = function(t) {
                                (r = r || t), 0 == --n && e(r);
                            };
                            t.forEach(function(e) {
                                e.whenStable(l);
                            });
                        });
                }
                findTestabilityInTree(e, t, n) {
                    if (null == t) return null;
                    const r = e.getTestability(t);
                    return null != r
                        ? r
                        : n
                        ? Wo().isShadowRoot(t)
                            ? this.findTestabilityInTree(e, Wo().getHost(t), !0)
                            : this.findTestabilityInTree(e, Wo().parentElement(t), !0)
                        : null;
                }
            }
            function hu(e, t) {
                ('undefined' != typeof COMPILED && COMPILED) ||
                    ((ue.ng = ue.ng || {})[e] = t);
            }
            const pu = {ApplicationRef: Wn, NgZone: kn};
            function fu(e) {
                return sr(e);
            }
            const gu = new re('EventManagerPlugins');
            class mu {
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
            class _u {
                constructor(e) {
                    this._doc = e;
                }
                addGlobalEventListener(e, t, n) {
                    const r = Wo().getGlobalEventTarget(this._doc, e);
                    if (!r)
                        throw new Error(`Unsupported event target ${r} for event ${t}`);
                    return this.addEventListener(r, t, n);
                }
            }
            class yu {
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
            class vu extends yu {
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
                    this._styleNodes.forEach(e => Wo().remove(e));
                }
            }
            const bu = {
                    svg: 'http://www.w3.org/2000/svg',
                    xhtml: 'http://www.w3.org/1999/xhtml',
                    xlink: 'http://www.w3.org/1999/xlink',
                    xml: 'http://www.w3.org/XML/1998/namespace',
                    xmlns: 'http://www.w3.org/2000/xmlns/',
                },
                wu = /%COMP%/g,
                Cu = '_nghost-%COMP%',
                Eu = '_ngcontent-%COMP%';
            function xu(e, t, n) {
                for (let r = 0; r < t.length; r++) {
                    let l = t[r];
                    Array.isArray(l) ? xu(e, l, n) : ((l = l.replace(wu, e)), n.push(l));
                }
                return n;
            }
            function Su(e) {
                return t => {
                    !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
                };
            }
            class Tu {
                constructor(e, t, n) {
                    (this.eventManager = e),
                        (this.sharedStylesHost = t),
                        (this.appId = n),
                        (this.rendererByCompId = new Map()),
                        (this.defaultRenderer = new Nu(e));
                }
                createRenderer(e, t) {
                    if (!e || !t) return this.defaultRenderer;
                    switch (t.encapsulation) {
                        case ye.Emulated: {
                            let n = this.rendererByCompId.get(t.id);
                            return (
                                n ||
                                    ((n = new Iu(
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
                            return new Vu(this.eventManager, this.sharedStylesHost, e, t);
                        default:
                            if (!this.rendererByCompId.has(t.id)) {
                                const e = xu(t.id, t.styles, []);
                                this.sharedStylesHost.addStyles(e),
                                    this.rendererByCompId.set(t.id, this.defaultRenderer);
                            }
                            return this.defaultRenderer;
                    }
                }
                begin() {}
                end() {}
            }
            class Nu {
                constructor(e) {
                    (this.eventManager = e), (this.data = Object.create(null));
                }
                destroy() {}
                createElement(e, t) {
                    return t
                        ? document.createElementNS(bu[t], e)
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
                        const l = bu[r];
                        l ? e.setAttributeNS(l, t, n) : e.setAttribute(t, n);
                    } else e.setAttribute(t, n);
                }
                removeAttribute(e, t, n) {
                    if (n) {
                        const r = bu[n];
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
                    ku(t, 'property'), (e[t] = n);
                }
                setValue(e, t) {
                    e.nodeValue = t;
                }
                listen(e, t, n) {
                    return (
                        ku(t, 'listener'),
                        'string' == typeof e
                            ? this.eventManager.addGlobalEventListener(e, t, Su(n))
                            : this.eventManager.addEventListener(e, t, Su(n))
                    );
                }
            }
            const Au = '@'.charCodeAt(0);
            function ku(e, t) {
                if (e.charCodeAt(0) === Au)
                    throw new Error(
                        `Found the synthetic ${t} ${e}. Please include either "BrowserAnimationsModule" or "NoopAnimationsModule" in your application.`,
                    );
            }
            class Iu extends Nu {
                constructor(e, t, n, r) {
                    super(e), (this.component = n);
                    const l = xu(r + '-' + n.id, n.styles, []);
                    t.addStyles(l),
                        (this.contentAttr = Eu.replace(wu, r + '-' + n.id)),
                        (this.hostAttr = Cu.replace(wu, r + '-' + n.id));
                }
                applyToHost(e) {
                    super.setAttribute(e, this.hostAttr, '');
                }
                createElement(e, t) {
                    const n = super.createElement(e, t);
                    return super.setAttribute(n, this.contentAttr, ''), n;
                }
            }
            class Vu extends Nu {
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
                    const l = xu(r.id, r.styles, []);
                    for (let s = 0; s < l.length; s++) {
                        const e = document.createElement('style');
                        (e.textContent = l[s]), this.shadowRoot.appendChild(e);
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
            const Du =
                    ('undefined' != typeof Zone && Zone.__symbol__) ||
                    function(e) {
                        return '__zone_symbol__' + e;
                    },
                Ou = Du('addEventListener'),
                Mu = Du('removeEventListener'),
                Pu = {},
                Ru = 'FALSE',
                Fu = 'ANGULAR',
                ju = 'addEventListener',
                Hu = 'removeEventListener',
                Lu = '__zone_symbol__propagationStopped',
                Bu = '__zone_symbol__stopImmediatePropagation';
            let Uu;
            'undefined' != typeof Zone && Zone[Du('BLACK_LISTED_EVENTS')] && (Uu = {});
            const $u = function(e) {
                    return !!Uu && Uu.hasOwnProperty(e);
                },
                zu = function(e) {
                    const t = Pu[e.type];
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
                        for (let n = 0; n < t.length && !0 !== e[Lu]; n++) {
                            const e = t[n];
                            e.zone !== Zone.current
                                ? e.zone.run(e.handler, this, r)
                                : e.handler.apply(this, r);
                        }
                    }
                };
            class Gu extends _u {
                constructor(e, t, n) {
                    super(e),
                        (this.ngZone = t),
                        (n &&
                            (function(e) {
                                return e === Uo;
                            })(n)) ||
                            this.patchEvent();
                }
                patchEvent() {
                    if ('undefined' == typeof Event || !Event || !Event.prototype) return;
                    if (Event.prototype[Bu]) return;
                    const e = (Event.prototype[Bu] =
                        Event.prototype.stopImmediatePropagation);
                    Event.prototype.stopImmediatePropagation = function() {
                        this && (this[Lu] = !0), e && e.apply(this, arguments);
                    };
                }
                supports(e) {
                    return !0;
                }
                addEventListener(e, t, n) {
                    let r = n;
                    if (!e[Ou] || (kn.isInAngularZone() && !$u(t))) e[ju](t, r, !1);
                    else {
                        let n = Pu[t];
                        n || (n = Pu[t] = Du(Fu + t + Ru));
                        let l = e[n];
                        const s = l && l.length > 0;
                        l || (l = e[n] = []);
                        const i = $u(t) ? Zone.root : Zone.current;
                        if (0 === l.length) l.push({zone: i, handler: r});
                        else {
                            let e = !1;
                            for (let t = 0; t < l.length; t++)
                                if (l[t].handler === r) {
                                    e = !0;
                                    break;
                                }
                            e || l.push({zone: i, handler: r});
                        }
                        s || e[Ou](t, zu, !1);
                    }
                    return () => this.removeEventListener(e, t, r);
                }
                removeEventListener(e, t, n) {
                    let r = e[Mu];
                    if (!r) return e[Hu].apply(e, [t, n, !1]);
                    let l = Pu[t],
                        s = l && e[l];
                    if (!s) return e[Hu].apply(e, [t, n, !1]);
                    let i = !1;
                    for (let o = 0; o < s.length; o++)
                        if (s[o].handler === n) {
                            (i = !0), s.splice(o, 1);
                            break;
                        }
                    i
                        ? 0 === s.length && r.apply(e, [t, zu, !1])
                        : e[Hu].apply(e, [t, n, !1]);
                }
            }
            const qu = {
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
                Zu = new re('HammerGestureConfig'),
                Wu = new re('HammerLoader');
            class Qu {
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
            class Ku extends _u {
                constructor(e, t, n, r) {
                    super(e), (this._config = t), (this.console = n), (this.loader = r);
                }
                supports(e) {
                    return !(
                        (!qu.hasOwnProperty(e.toLowerCase()) && !this.isCustomEvent(e)) ||
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
                            l = () => {
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
                                            void (l = () => {})
                                        );
                                    r || (l = this.addEventListener(e, t, n));
                                })
                                .catch(() => {
                                    this.console.warn(
                                        `The "${t}" event cannot be bound because the custom ` +
                                            'Hammer.JS loader failed.',
                                    ),
                                        (l = () => {});
                                }),
                            () => {
                                l();
                            }
                        );
                    }
                    return r.runOutsideAngular(() => {
                        const l = this._config.buildHammer(e),
                            s = function(e) {
                                r.runGuarded(function() {
                                    n(e);
                                });
                            };
                        return (
                            l.on(t, s),
                            () => {
                                l.off(t, s),
                                    'function' == typeof l.destroy && l.destroy();
                            }
                        );
                    });
                }
                isCustomEvent(e) {
                    return this._config.events.indexOf(e) > -1;
                }
            }
            const Ju = ['alt', 'control', 'meta', 'shift'],
                Yu = {
                    alt: e => e.altKey,
                    control: e => e.ctrlKey,
                    meta: e => e.metaKey,
                    shift: e => e.shiftKey,
                };
            class Xu extends _u {
                constructor(e) {
                    super(e);
                }
                supports(e) {
                    return null != Xu.parseEventName(e);
                }
                addEventListener(e, t, n) {
                    const r = Xu.parseEventName(t),
                        l = Xu.eventCallback(r.fullKey, n, this.manager.getZone());
                    return this.manager
                        .getZone()
                        .runOutsideAngular(() => Wo().onAndCancel(e, r.domEventName, l));
                }
                static parseEventName(e) {
                    const t = e.toLowerCase().split('.'),
                        n = t.shift();
                    if (0 === t.length || ('keydown' !== n && 'keyup' !== n)) return null;
                    const r = Xu._normalizeKey(t.pop());
                    let l = '';
                    if (
                        (Ju.forEach(e => {
                            const n = t.indexOf(e);
                            n > -1 && (t.splice(n, 1), (l += e + '.'));
                        }),
                        (l += r),
                        0 != t.length || 0 === r.length)
                    )
                        return null;
                    const s = {};
                    return (s.domEventName = n), (s.fullKey = l), s;
                }
                static getEventFullKey(e) {
                    let t = '',
                        n = Wo().getEventKey(e);
                    return (
                        ' ' === (n = n.toLowerCase())
                            ? (n = 'space')
                            : '.' === n && (n = 'dot'),
                        Ju.forEach(r => {
                            r != n && (0, Yu[r])(e) && (t += r + '.');
                        }),
                        (t += n)
                    );
                }
                static eventCallback(e, t, n) {
                    return r => {
                        Xu.getEventFullKey(r) === e && n.runGuarded(() => t(r));
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
            class ea {}
            class ta extends ea {
                constructor(e) {
                    super(), (this._doc = e);
                }
                sanitize(e, t) {
                    if (null == t) return null;
                    switch (e) {
                        case bt.NONE:
                            return t;
                        case bt.HTML:
                            return t instanceof ra
                                ? t.changingThisBreaksApplicationSecurity
                                : (this.checkNotSafeValue(t, 'HTML'),
                                  (function(e, t) {
                                      let n = null;
                                      try {
                                          qt = qt || new Nt(e);
                                          let r = t ? String(t) : '';
                                          n = qt.getInertBodyElement(r);
                                          let l = 5,
                                              s = r;
                                          do {
                                              if (0 === l)
                                                  throw new Error(
                                                      'Failed to sanitize html because the input is unstable',
                                                  );
                                              l--,
                                                  (r = s),
                                                  (s = n.innerHTML),
                                                  (n = qt.getInertBodyElement(r));
                                          } while (r !== s);
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
                            return t instanceof la
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
                                                      const l = e.charAt(r);
                                                      "'" === l && n
                                                          ? (t = !t)
                                                          : '"' === l && t && (n = !n);
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
                            if (t instanceof sa)
                                return t.changingThisBreaksApplicationSecurity;
                            throw (this.checkNotSafeValue(t, 'Script'),
                            new Error('unsafe value used in a script context'));
                        case bt.URL:
                            return t instanceof oa || t instanceof ia
                                ? t.changingThisBreaksApplicationSecurity
                                : (this.checkNotSafeValue(t, 'URL'), It(String(t)));
                        case bt.RESOURCE_URL:
                            if (t instanceof oa)
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
                    if (e instanceof na)
                        throw new Error(
                            `Required a safe ${t}, got a ${e.getTypeName()} ` +
                                '(see http://g.co/ng/security#xss)',
                        );
                }
                bypassSecurityTrustHtml(e) {
                    return new ra(e);
                }
                bypassSecurityTrustStyle(e) {
                    return new la(e);
                }
                bypassSecurityTrustScript(e) {
                    return new sa(e);
                }
                bypassSecurityTrustUrl(e) {
                    return new ia(e);
                }
                bypassSecurityTrustResourceUrl(e) {
                    return new oa(e);
                }
            }
            class na {
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
            class ra extends na {
                getTypeName() {
                    return 'HTML';
                }
            }
            class la extends na {
                getTypeName() {
                    return 'Style';
                }
            }
            class sa extends na {
                getTypeName() {
                    return 'Script';
                }
            }
            class ia extends na {
                getTypeName() {
                    return 'URL';
                }
            }
            class oa extends na {
                getTypeName() {
                    return 'ResourceURL';
                }
            }
            const ua = zn(Cr, 'browser', [
                {provide: pn, useValue: 'browser'},
                {
                    provide: hn,
                    useValue: function() {
                        nu.makeCurrent(), du.init();
                    },
                    multi: !0,
                },
                {provide: wo, useClass: ou, deps: [su]},
                {
                    provide: su,
                    useFactory: function() {
                        return document;
                    },
                    deps: [],
                },
            ]);
            function aa() {
                return new sn();
            }
            class ca {
                constructor(e) {
                    if (e)
                        throw new Error(
                            'BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.',
                        );
                }
                static withServerTransition(e) {
                    return {
                        ngModule: ca,
                        providers: [
                            {provide: dn, useValue: e.appId},
                            {provide: uu, useExisting: dn},
                            cu,
                        ],
                    };
                }
            }
            'undefined' != typeof window && window;
            class da {
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
            class ha extends da {
                get formDirective() {
                    return null;
                }
                get path() {
                    return null;
                }
            }
            function pa(e) {
                return null == e || 0 === e.length;
            }
            const fa = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
            class ga {
                static min(e) {
                    return t => {
                        if (pa(t.value) || pa(e)) return null;
                        const n = parseFloat(t.value);
                        return !isNaN(n) && n < e
                            ? {min: {min: e, actual: t.value}}
                            : null;
                    };
                }
                static max(e) {
                    return t => {
                        if (pa(t.value) || pa(e)) return null;
                        const n = parseFloat(t.value);
                        return !isNaN(n) && n > e
                            ? {max: {max: e, actual: t.value}}
                            : null;
                    };
                }
                static required(e) {
                    return pa(e.value) ? {required: !0} : null;
                }
                static requiredTrue(e) {
                    return !0 === e.value ? null : {required: !0};
                }
                static email(e) {
                    return pa(e.value) ? null : fa.test(e.value) ? null : {email: !0};
                }
                static minLength(e) {
                    return t => {
                        if (pa(t.value)) return null;
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
                    if (!e) return ga.nullValidator;
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
                            if (pa(e.value)) return null;
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
                    const t = e.filter(ma);
                    return 0 == t.length
                        ? null
                        : function(e) {
                              return ya(
                                  (function(e, n) {
                                      return t.map(t => t(e));
                                  })(e),
                              );
                          };
                }
                static composeAsync(e) {
                    if (!e) return null;
                    const t = e.filter(ma);
                    return 0 == t.length
                        ? null
                        : function(e) {
                              return (function(...e) {
                                  if (1 === e.length) {
                                      const t = e[0];
                                      if (u(t)) return qo(t, null);
                                      if (
                                          a(t) &&
                                          Object.getPrototypeOf(t) === Object.prototype
                                      ) {
                                          const e = Object.keys(t);
                                          return qo(e.map(e => t[e]), e);
                                      }
                                  }
                                  if ('function' == typeof e[e.length - 1]) {
                                      const t = e.pop();
                                      return qo(
                                          (e = 1 === e.length && u(e[0]) ? e[0] : e),
                                          null,
                                      ).pipe(F(e => t(...e)));
                                  }
                                  return qo(e, null);
                              })(
                                  (function(e, n) {
                                      return t.map(t => t(e));
                                  })(e).map(_a),
                              ).pipe(F(ya));
                          };
                }
            }
            function ma(e) {
                return null != e;
            }
            function _a(e) {
                const t = on(e) ? B(e) : e;
                if (!un(t))
                    throw new Error(
                        'Expected validator to return Promise or Observable.',
                    );
                return t;
            }
            function ya(e) {
                const t = e.reduce(
                    (e, t) => (null != t ? Object.assign({}, e, t) : e),
                    {},
                );
                return 0 === Object.keys(t).length ? null : t;
            }
            const va = new re('NgValueAccessor'),
                ba = new re('CompositionEventMode');
            class wa {
                constructor(e, t, n) {
                    (this._renderer = e),
                        (this._elementRef = t),
                        (this._compositionMode = n),
                        (this.onChange = e => {}),
                        (this.onTouched = () => {}),
                        (this._composing = !1),
                        null == this._compositionMode &&
                            (this._compositionMode = !(function() {
                                const e = Wo() ? Wo().getUserAgent() : '';
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
            function Ca(e) {
                return e.validate ? t => e.validate(t) : e;
            }
            function Ea(e) {
                return e.validate ? t => e.validate(t) : e;
            }
            function xa() {
                throw new Error('unimplemented');
            }
            class Sa extends da {
                constructor() {
                    super(...arguments),
                        (this._parent = null),
                        (this.name = null),
                        (this.valueAccessor = null),
                        (this._rawValidators = []),
                        (this._rawAsyncValidators = []);
                }
                get validator() {
                    return xa();
                }
                get asyncValidator() {
                    return xa();
                }
            }
            class Ta {
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
            class Na {
                constructor(e, t, n, r) {
                    (this._renderer = e),
                        (this._elementRef = t),
                        (this._registry = n),
                        (this._injector = r),
                        (this.onChange = () => {}),
                        (this.onTouched = () => {});
                }
                ngOnInit() {
                    (this._control = this._injector.get(Sa)),
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
            class Aa {
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
            const ka = {
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
            function Ia(e, t) {
                return null == e
                    ? `${t}`
                    : (t && 'object' == typeof t && (t = 'Object'),
                      `${e}: ${t}`.slice(0, 50));
            }
            class Va {
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
                    const n = Ia(t, e);
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
            class Da {
                constructor(e, t, n) {
                    (this._element = e),
                        (this._renderer = t),
                        (this._select = n),
                        this._select && (this.id = this._select._registerOption());
                }
                set ngValue(e) {
                    null != this._select &&
                        (this._select._optionMap.set(this.id, e),
                        this._setElementValue(Ia(this.id, e)),
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
            function Oa(e, t) {
                return null == e
                    ? `${t}`
                    : ('string' == typeof t && (t = `'${t}'`),
                      t && 'object' == typeof t && (t = 'Object'),
                      `${e}: ${t}`.slice(0, 50));
            }
            class Ma {
                constructor(e, t, n) {
                    (this._element = e),
                        (this._renderer = t),
                        (this._select = n),
                        this._select && (this.id = this._select._registerOption(this));
                }
                set ngValue(e) {
                    null != this._select &&
                        ((this._value = e),
                        this._setElementValue(Oa(this.id, e)),
                        this._select.writeValue(this._select.value));
                }
                set value(e) {
                    this._select
                        ? ((this._value = e),
                          this._setElementValue(Oa(this.id, e)),
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
            function Pa(e, t) {
                return [...t.path, e];
            }
            function Ra(e, t) {
                e || ja(t, 'Cannot find control with'),
                    t.valueAccessor || ja(t, 'No value accessor for form control with'),
                    (e.validator = ga.compose([e.validator, t.validator])),
                    (e.asyncValidator = ga.composeAsync([
                        e.asyncValidator,
                        t.asyncValidator,
                    ])),
                    t.valueAccessor.writeValue(e.value),
                    (function(e, t) {
                        t.valueAccessor.registerOnChange(n => {
                            (e._pendingValue = n),
                                (e._pendingChange = !0),
                                (e._pendingDirty = !0),
                                'change' === e.updateOn && Fa(e, t);
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
                                'blur' === e.updateOn && e._pendingChange && Fa(e, t),
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
            function Fa(e, t) {
                e._pendingDirty && e.markAsDirty(),
                    e.setValue(e._pendingValue, {emitModelToViewChange: !1}),
                    t.viewToModelUpdate(e._pendingValue),
                    (e._pendingChange = !1);
            }
            function ja(e, t) {
                let n;
                throw ((n =
                    e.path.length > 1
                        ? `path: '${e.path.join(' -> ')}'`
                        : e.path[0]
                        ? `name: '${e.path}'`
                        : 'unspecified name attribute'),
                new Error(`${t} ${n}`));
            }
            function Ha(e) {
                return null != e ? ga.compose(e.map(Ca)) : null;
            }
            function La(e) {
                return null != e ? ga.composeAsync(e.map(Ea)) : null;
            }
            const Ba = [
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
                Aa,
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
                Va,
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
                                        l = this._getOptionValue(r.value);
                                    n.push(l);
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
                Na,
            ];
            class Ua extends ha {
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
                    return Pa(this.name, this._parent);
                }
                get formDirective() {
                    return this._parent ? this._parent.formDirective : null;
                }
                get validator() {
                    return Ha(this._validators);
                }
                get asyncValidator() {
                    return La(this._asyncValidators);
                }
                _checkParentType() {}
            }
            class $a {
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
            class za extends $a {
                constructor(e) {
                    super(e);
                }
            }
            const Ga = 'VALID',
                qa = 'INVALID',
                Za = 'PENDING',
                Wa = 'DISABLED';
            function Qa(e) {
                const t = Ja(e) ? e.validators : e;
                return Array.isArray(t) ? Ha(t) : t || null;
            }
            function Ka(e, t) {
                const n = Ja(t) ? t.asyncValidators : e;
                return Array.isArray(n) ? La(n) : n || null;
            }
            function Ja(e) {
                return null != e && !Array.isArray(e) && 'object' == typeof e;
            }
            class Ya {
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
                    return this.status === Ga;
                }
                get invalid() {
                    return this.status === qa;
                }
                get pending() {
                    return this.status == Za;
                }
                get disabled() {
                    return this.status === Wa;
                }
                get enabled() {
                    return this.status !== Wa;
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
                    this.validator = Qa(e);
                }
                setAsyncValidators(e) {
                    this.asyncValidator = Ka(e);
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
                    (this.status = Za),
                        !1 !== e.emitEvent && this.statusChanges.emit(this.status),
                        this._parent && !e.onlySelf && this._parent.markAsPending(e);
                }
                disable(e = {}) {
                    (this.status = Wa),
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
                    (this.status = Ga),
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
                            (this.status !== Ga && this.status !== Za) ||
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
                    this.status = this._allControlsDisabled() ? Wa : Ga;
                }
                _runValidator() {
                    return this.validator ? this.validator(this) : null;
                }
                _runAsyncValidator(e) {
                    if (this.asyncValidator) {
                        this.status = Za;
                        const t = _a(this.asyncValidator(this));
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
                                            e instanceof ec
                                                ? e.controls.hasOwnProperty(t)
                                                    ? e.controls[t]
                                                    : null
                                                : (e instanceof tc && e.at(t)) || null,
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
                        ? Wa
                        : this.errors
                        ? qa
                        : this._anyControlsHaveStatus(Za)
                        ? Za
                        : this._anyControlsHaveStatus(qa)
                        ? qa
                        : Ga;
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
                    Ja(e) && null != e.updateOn && (this._updateOn = e.updateOn);
                }
            }
            class Xa extends Ya {
                constructor(e = null, t, n) {
                    super(Qa(t), Ka(n, t)),
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
            class ec extends Ya {
                constructor(e, t, n) {
                    super(Qa(t), Ka(n, t)),
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
                            (e[n] = t instanceof Xa ? t.value : t.getRawValue()), e
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
            class tc extends Ya {
                constructor(e, t, n) {
                    super(Qa(t), Ka(n, t)),
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
                        e instanceof Xa ? e.value : e.getRawValue(),
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
            const nc = Promise.resolve(null);
            class rc extends ha {
                constructor(e, t) {
                    super(),
                        (this.submitted = !1),
                        (this._directives = []),
                        (this.ngSubmit = new Wt()),
                        (this.form = new ec({}, Ha(e), La(t)));
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
                    nc.then(() => {
                        const t = this._findContainer(e.path);
                        (e.control = t.registerControl(e.name, e.control)),
                            Ra(e.control, e),
                            e.control.updateValueAndValidity({emitEvent: !1}),
                            this._directives.push(e);
                    });
                }
                getControl(e) {
                    return this.form.get(e.path);
                }
                removeControl(e) {
                    nc.then(() => {
                        const t = this._findContainer(e.path);
                        t && t.removeControl(e.name),
                            (function(t, n) {
                                const r = t.indexOf(e);
                                r > -1 && t.splice(r, 1);
                            })(this._directives);
                    });
                }
                addFormGroup(e) {
                    nc.then(() => {
                        const t = this._findContainer(e.path),
                            n = new ec({});
                        (function(e, t) {
                            null == e && ja(t, 'Cannot find control with'),
                                (e.validator = ga.compose([e.validator, t.validator])),
                                (e.asyncValidator = ga.composeAsync([
                                    e.asyncValidator,
                                    t.asyncValidator,
                                ]));
                        })(n, e),
                            t.registerControl(e.name, n),
                            n.updateValueAndValidity({emitEvent: !1});
                    });
                }
                removeFormGroup(e) {
                    nc.then(() => {
                        const t = this._findContainer(e.path);
                        t && t.removeControl(e.name);
                    });
                }
                getFormGroup(e) {
                    return this.form.get(e.path);
                }
                updateModel(e, t) {
                    nc.then(() => {
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
            class lc {
                static modelParentException() {
                    throw new Error(
                        `\n      ngModel cannot be used to register form controls with a parent formGroup directive.  Try using\n      formGroup's partner directive "formControlName" instead.  Example:\n\n      ${ka.formControlName}\n\n      Or, if you'd like to avoid registering this form control, indicate that it's standalone in ngModelOptions:\n\n      Example:\n\n      ${ka.ngModelWithFormGroup}`,
                    );
                }
                static formGroupNameException() {
                    throw new Error(
                        `\n      ngModel cannot be used to register form controls with a parent formGroupName or formArrayName directive.\n\n      Option 1: Use formControlName instead of ngModel (reactive strategy):\n\n      ${ka.formGroupName}\n\n      Option 2:  Update ngModel's parent be ngModelGroup (template-driven strategy):\n\n      ${ka.ngModelGroup}`,
                    );
                }
                static missingNameException() {
                    throw new Error(
                        'If ngModel is used within a form tag, either the name attribute must be set or the form\n      control must be defined as \'standalone\' in ngModelOptions.\n\n      Example 1: <input [(ngModel)]="person.firstName" name="first">\n      Example 2: <input [(ngModel)]="person.firstName" [ngModelOptions]="{standalone: true}">',
                    );
                }
                static modelGroupParentException() {
                    throw new Error(
                        `\n      ngModelGroup cannot be used with a parent formGroup directive.\n\n      Option 1: Use formGroupName instead of ngModelGroup (reactive strategy):\n\n      ${ka.formGroupName}\n\n      Option 2:  Use a regular form tag instead of the formGroup directive (template-driven strategy):\n\n      ${ka.ngModelGroup}`,
                    );
                }
                static ngFormWarning() {
                    console.warn(
                        "\n    It looks like you're using 'ngForm'.\n\n    Support for using the 'ngForm' element selector has been deprecated in Angular v6 and will be removed\n    in Angular v9.\n\n    Use 'ng-form' instead.\n\n    Before:\n    <ngForm #myForm=\"ngForm\">\n\n    After:\n    <ng-form #myForm=\"ngForm\">\n    ",
                    );
                }
            }
            const sc = new re('NgFormSelectorWarning');
            class ic extends Ua {
                constructor(e, t, n) {
                    super(),
                        (this._parent = e),
                        (this._validators = t),
                        (this._asyncValidators = n);
                }
                _checkParentType() {
                    this._parent instanceof ic ||
                        this._parent instanceof rc ||
                        lc.modelGroupParentException();
                }
            }
            const oc = Promise.resolve(null);
            class uc extends Sa {
                constructor(e, t, n, r) {
                    super(),
                        (this.control = new Xa()),
                        (this._registered = !1),
                        (this.update = new Wt()),
                        (this._parent = e),
                        (this._rawValidators = t || []),
                        (this._rawAsyncValidators = n || []),
                        (this.valueAccessor = (function(e, t) {
                            if (!t) return null;
                            Array.isArray(t) ||
                                ja(
                                    e,
                                    'Value accessor was not provided as an array for form control with',
                                );
                            let n = void 0,
                                r = void 0,
                                l = void 0;
                            return (
                                t.forEach(t => {
                                    t.constructor === wa
                                        ? (n = t)
                                        : (function(e) {
                                              return Ba.some(t => e.constructor === t);
                                          })(t)
                                        ? (r &&
                                              ja(
                                                  e,
                                                  'More than one built-in value accessor matches form control with',
                                              ),
                                          (r = t))
                                        : (l &&
                                              ja(
                                                  e,
                                                  'More than one custom value accessor matches form control with',
                                              ),
                                          (l = t));
                                }),
                                l ||
                                    r ||
                                    n ||
                                    (ja(
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
                    return this._parent ? Pa(this.name, this._parent) : [this.name];
                }
                get formDirective() {
                    return this._parent ? this._parent.formDirective : null;
                }
                get validator() {
                    return Ha(this._rawValidators);
                }
                get asyncValidator() {
                    return La(this._rawAsyncValidators);
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
                    Ra(this.control, this),
                        this.control.updateValueAndValidity({emitEvent: !1});
                }
                _checkForErrors() {
                    this._isStandalone() || this._checkParentType(), this._checkName();
                }
                _checkParentType() {
                    !(this._parent instanceof ic) && this._parent instanceof Ua
                        ? lc.formGroupNameException()
                        : this._parent instanceof ic ||
                          this._parent instanceof rc ||
                          lc.modelParentException();
                }
                _checkName() {
                    this.options && this.options.name && (this.name = this.options.name),
                        this._isStandalone() || this.name || lc.missingNameException();
                }
                _updateValue(e) {
                    oc.then(() => {
                        this.control.setValue(e, {emitViewToModelChange: !1});
                    });
                }
                _updateDisabled(e) {
                    const t = e.isDisabled.currentValue,
                        n = '' === t || (t && 'false' !== t);
                    oc.then(() => {
                        n && !this.control.disabled
                            ? this.control.disable()
                            : !n && this.control.disabled && this.control.enable();
                    });
                }
            }
            class ac {}
            class cc {
                static withConfig(e) {
                    return {
                        ngModule: cc,
                        providers: [
                            {provide: sc, useValue: e.warnOnDeprecatedNgFormSelector},
                        ],
                    };
                }
            }
            class dc extends StereoPannerNode {
                set StereoPannerNode(e) {
                    'setPosition' in this
                        ? this.fallbackToPannerNode(e || 0)
                        : Wi(this.pan, e, this.context.currentTime);
                }
                constructor(e, t) {
                    try {
                        new StereoPannerNode(e);
                    } catch (n) {
                        const r = e.createPanner();
                        return Object.setPrototypeOf(r, dc.prototype), dc.init(r, t), r;
                    }
                    super(e), dc.init(this, t);
                }
                ngOnDestroy() {
                    this.disconnect();
                }
                fallbackToPannerNode(e) {
                    const t = 100 * e,
                        n = t > 0 ? 270 - t : t + 90,
                        r = Math.sin(t * (Math.PI / 180)),
                        l = Math.sin(n * (Math.PI / 180));
                    this.setPosition(r, 0, l);
                }
                static init(e, t) {
                    Ki(t, e);
                }
            }
            class hc {
                constructor(e, t) {
                    (this.compare = e), (this.keySelector = t);
                }
                call(e, t) {
                    return t.subscribe(new pc(e, this.compare, this.keySelector));
                }
            }
            class pc extends g {
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
            class fc {
                constructor(e, t) {
                    (this.dueTime = e), (this.scheduler = t);
                }
                call(e, t) {
                    return t.subscribe(new gc(e, this.dueTime, this.scheduler));
                }
            }
            class gc extends g {
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
                                mc,
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
            function mc(e) {
                e.debouncedNext();
            }
            class _c {
                constructor(e, t) {
                    (this.predicate = e), (this.thisArg = t);
                }
                call(e, t) {
                    return t.subscribe(new yc(e, this.predicate, this.thisArg));
                }
            }
            class yc extends g {
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
            class vc {
                constructor(e) {
                    this.total = e;
                }
                call(e, t) {
                    return t.subscribe(new bc(e, this.total));
                }
            }
            class bc extends g {
                constructor(e, t) {
                    super(e), (this.total = t), (this.count = 0);
                }
                _next(e) {
                    ++this.count > this.total && this.destination.next(e);
                }
            }
            const wc = 128,
                Cc = 100;
            class Ec extends AnalyserNode {
                constructor(e, t) {
                    const n = Ji(e, 'createAnalyser', Ec, t);
                    if (n) return n;
                    super(e), Ec.init(this, t);
                }
                ngOnDestroy() {
                    this.disconnect();
                }
                isSilent(e) {
                    for (let t = 0; t < e.length; t++)
                        if (Math.abs(e[t] - wc) > 2) return !1;
                    return !0;
                }
                static init(e, t) {
                    var n;
                    Ki(t, e),
                        (e.fftSize = 256),
                        e.connect(e.context.destination),
                        (e.quiet = oo(Cc).pipe(
                            po(new Uint8Array(e.fftSize)),
                            mo(t => e.getByteTimeDomainData(t)),
                            F(t => e.isSilent(t)),
                            e => e.lift(new hc(void 0, void 0)),
                            (function(e, t = io) {
                                return e => e.lift(new fc(1e3, t));
                            })(),
                            ((n = e => e),
                            function(e) {
                                return e.lift(new _c(n, void 0));
                            }),
                            e => e.lift(new vc(1)),
                        ));
                }
            }
            class xc extends DelayNode {
                constructor(e, t) {
                    const n = Ji(e, 'createDelay', xc, t);
                    if (n) return n;
                    super(e), xc.init(this, t);
                }
                ngOnDestroy() {
                    this.disconnect();
                }
                static init(e, t) {
                    Ki(t, e);
                }
            }
            Ui(
                [Qi('delayTime'), $i('design:type', Number)],
                xc.prototype,
                'DelayNode',
                void 0,
            );
            class Sc extends BiquadFilterNode {
                constructor(e, t) {
                    const n = Ji(e, 'createBiquadFilter', Sc, t);
                    if (n) return n;
                    super(e), Sc.init(this, t);
                }
                ngOnDestroy() {
                    this.disconnect();
                }
                static init(e, t) {
                    Ki(t, e);
                }
            }
            Ui(
                [Qi('gain'), $i('design:type', Number)],
                Sc.prototype,
                'gainParam',
                void 0,
            ),
                Ui(
                    [Qi('frequency'), $i('design:type', Number)],
                    Sc.prototype,
                    'frequencyParam',
                    void 0,
                ),
                Ui([Qi('Q'), $i('design:type', Number)], Sc.prototype, 'qParam', void 0),
                Ui(
                    [Qi('detune'), $i('design:type', Number)],
                    Sc.prototype,
                    'detuneParam',
                    void 0,
                );
            class Tc extends WaveShaperNode {
                constructor(e, t) {
                    const n = Ji(e, 'createWaveShaper', Tc, t);
                    if (n) return n;
                    super(e), Tc.init(this, t);
                }
                ngOnDestroy() {
                    this.disconnect();
                }
                static init(e, t) {
                    Ki(t, e);
                }
            }
            class Nc extends ConvolverNode {
                set bufferSetter(e) {
                    this.buffer$.next(e);
                }
                constructor(e, t, n) {
                    const r = Ji(t, 'createConvolver', Nc, n, e);
                    if (r) return r;
                    super(t), Nc.init(this, n, e);
                }
                ngOnDestroy() {
                    this.buffer$.complete(), this.disconnect();
                }
                static init(e, t, n) {
                    Ki(t, e),
                        (e.buffer$ = new S()),
                        e.buffer$
                            .pipe(Gi(e => ('string' == typeof e ? n.fetch(e) : zi(e))))
                            .subscribe(t => {
                                e.buffer = t;
                            });
                }
            }
            class Ac {
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
            var kc = zr({encapsulation: 2, styles: [], data: {}});
            function Ic(e) {
                return Ds(
                    0,
                    [
                        (e()(),
                        yl(
                            0,
                            0,
                            null,
                            null,
                            8,
                            'button',
                            [
                                ['AudioBufferSourceNode', ''],
                                ['buffer', 'assets/demo.mp3'],
                            ],
                            null,
                            [[null, 'click']],
                            function(e, t, n) {
                                var r = !0;
                                return (
                                    'click' === t &&
                                        (r =
                                            !1 !==
                                                e.component.onClick(Zl(e, 1), n.target) &&
                                            r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        is(
                            1,
                            147456,
                            [['source', 4]],
                            0,
                            Yi,
                            [eo, Xi, [8, null]],
                            {loop: [0, 'loop'], bufferSetter: [1, 'bufferSetter']},
                            null,
                        ),
                        os(2048, null, to, null, [Yi]),
                        (e()(), ks(-1, null, [' Play '])),
                        (e()(),
                        yl(
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
                                                    Zl(e.parent.parent, 60),
                                                ) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        is(5, 147456, null, 0, vo, [Xi, [1, to]], null, {
                            timeByte$: 'timeByte$',
                        }),
                        os(2048, null, to, null, [vo]),
                        (e()(),
                        yl(
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
                        is(
                            8,
                            147456,
                            null,
                            0,
                            bo,
                            [Xi, [1, to]],
                            {Output: [0, 'Output']},
                            null,
                        ),
                    ],
                    function(e, t) {
                        var n = t.component;
                        e(t, 1, 0, !0, 'assets/demo.mp3'),
                            e(t, 8, 0, n.chain || Zl(t.parent.parent, 61));
                    },
                    null,
                );
            }
            function Vc(e) {
                return Ds(
                    0,
                    [
                        (e()(),
                        yl(
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
                        (e()(), _l(16777216, null, null, 1, null, Ic)),
                        is(
                            2,
                            278528,
                            null,
                            0,
                            Po,
                            [Jn, Qt, _r],
                            {ngForOf: [0, 'ngForOf']},
                            null,
                        ),
                        (e()(), _l(0, null, null, 0)),
                    ],
                    function(e, t) {
                        e(t, 2, 0, t.component.buffers);
                    },
                    null,
                );
            }
            function Dc(e) {
                return Ds(
                    0,
                    [
                        (e()(),
                        yl(
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
                                ['src', 'assets/demo.mp3'],
                            ],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        is(1, 147456, null, 0, $o, [Xi, pt], null, null),
                        os(2048, null, to, null, [$o]),
                        (e()(),
                        yl(
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
                                                    Zl(e.parent, 60),
                                                ) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        is(4, 147456, null, 0, vo, [Xi, [1, to]], null, {
                            timeByte$: 'timeByte$',
                        }),
                        os(2048, null, to, null, [vo]),
                        (e()(),
                        yl(
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
                        is(
                            7,
                            147456,
                            null,
                            0,
                            bo,
                            [Xi, [1, to]],
                            {Output: [0, 'Output']},
                            null,
                        ),
                    ],
                    function(e, t) {
                        e(t, 7, 0, t.component.chain || Zl(t.parent, 61));
                    },
                    null,
                );
            }
            function Oc(e) {
                return Ds(
                    0,
                    [
                        (e()(),
                        yl(
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
                                                e.component.onClick(Zl(e, 1), n.target) &&
                                            r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        is(
                            1,
                            147456,
                            [['source', 4]],
                            0,
                            zo,
                            [Xi, [8, null]],
                            {periodicWave: [0, 'periodicWave']},
                            null,
                        ),
                        As(128, 2, new Array(2)),
                        os(2048, null, to, null, [zo]),
                        (e()(), ks(-1, null, [' Play '])),
                        (e()(),
                        yl(
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
                                                    Zl(e.parent.parent, 60),
                                                ) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        is(6, 147456, null, 0, vo, [Xi, [1, to]], null, {
                            timeByte$: 'timeByte$',
                        }),
                        os(2048, null, to, null, [vo]),
                        (e()(),
                        yl(
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
                        is(
                            9,
                            147456,
                            null,
                            0,
                            bo,
                            [Xi, [1, to]],
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
                            })(t, 0, 0, e(t, 2, 0, Zl(t.parent.parent, 0), n.real));
                        e(t, 1, 0, r), e(t, 9, 0, n.chain || Zl(t.parent.parent, 61));
                    },
                    null,
                );
            }
            function Mc(e) {
                return Ds(
                    0,
                    [
                        (e()(),
                        yl(
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
                        (e()(), _l(16777216, null, null, 1, null, Oc)),
                        is(
                            2,
                            278528,
                            null,
                            0,
                            Po,
                            [Jn, Qt, _r],
                            {ngForOf: [0, 'ngForOf']},
                            null,
                        ),
                        (e()(), _l(0, null, null, 0)),
                    ],
                    function(e, t) {
                        e(t, 2, 0, t.component.buffers);
                    },
                    null,
                );
            }
            function Pc(e) {
                return Ds(
                    0,
                    [
                        (e()(),
                        yl(
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
                        yl(
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
                        is(
                            2,
                            147456,
                            [[1, 4], ['chain', 4]],
                            0,
                            Go,
                            [Xi, [1, to]],
                            {GainNode: [0, 'GainNode']},
                            null,
                        ),
                        os(2048, null, to, null, [Go]),
                        (e()(),
                        yl(
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
                        (e()(), ks(-1, null, ['GainNode'])),
                        (e()(),
                        yl(
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
                                    l = e.component;
                                return (
                                    'input' === t &&
                                        (r =
                                            !1 !==
                                                Zl(e, 7)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Zl(e, 7).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== Zl(e, 7)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                Zl(e, 7)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r =
                                            !1 !== Zl(e, 8).onChange(n.target.value) &&
                                            r),
                                    'input' === t &&
                                        (r =
                                            !1 !== Zl(e, 8).onChange(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Zl(e, 8).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (l.gain = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        is(7, 16384, null, 0, wa, [yt, pt, [2, ba]], null, null),
                        is(8, 16384, null, 0, Aa, [yt, pt], null, null),
                        os(
                            1024,
                            null,
                            va,
                            function(e, t) {
                                return [e, t];
                            },
                            [wa, Aa],
                        ),
                        is(
                            10,
                            671744,
                            null,
                            0,
                            uc,
                            [[8, null], [8, null], [8, null], [6, va]],
                            {model: [0, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        os(2048, null, Sa, null, [uc]),
                        is(12, 16384, null, 0, za, [[4, Sa]], null, null),
                        (e()(),
                        yl(
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
                        is(
                            14,
                            147456,
                            null,
                            0,
                            dc,
                            [Xi, [1, to]],
                            {StereoPannerNode: [0, 'StereoPannerNode']},
                            null,
                        ),
                        os(2048, null, to, null, [dc]),
                        (e()(),
                        yl(
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
                        (e()(), ks(-1, null, ['StereoPannerNode'])),
                        (e()(),
                        yl(
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
                                    l = e.component;
                                return (
                                    'input' === t &&
                                        (r =
                                            !1 !==
                                                Zl(e, 19)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Zl(e, 19).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== Zl(e, 19)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                Zl(e, 19)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r =
                                            !1 !== Zl(e, 20).onChange(n.target.value) &&
                                            r),
                                    'input' === t &&
                                        (r =
                                            !1 !== Zl(e, 20).onChange(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Zl(e, 20).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (l.pan = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        is(19, 16384, null, 0, wa, [yt, pt, [2, ba]], null, null),
                        is(20, 16384, null, 0, Aa, [yt, pt], null, null),
                        os(
                            1024,
                            null,
                            va,
                            function(e, t) {
                                return [e, t];
                            },
                            [wa, Aa],
                        ),
                        is(
                            22,
                            671744,
                            null,
                            0,
                            uc,
                            [[8, null], [8, null], [8, null], [6, va]],
                            {model: [0, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        os(2048, null, Sa, null, [uc]),
                        is(24, 16384, null, 0, za, [[4, Sa]], null, null),
                        (e()(),
                        yl(
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
                        is(26, 147456, null, 0, Ec, [Xi, to], null, null),
                        (e()(),
                        yl(
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
                        (e()(), ks(-1, null, ['AudioDestinationNode'])),
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
                            Zl(t, 12).ngClassUntouched,
                            Zl(t, 12).ngClassTouched,
                            Zl(t, 12).ngClassPristine,
                            Zl(t, 12).ngClassDirty,
                            Zl(t, 12).ngClassValid,
                            Zl(t, 12).ngClassInvalid,
                            Zl(t, 12).ngClassPending,
                        ),
                            e(
                                t,
                                18,
                                0,
                                Zl(t, 24).ngClassUntouched,
                                Zl(t, 24).ngClassTouched,
                                Zl(t, 24).ngClassPristine,
                                Zl(t, 24).ngClassDirty,
                                Zl(t, 24).ngClassValid,
                                Zl(t, 24).ngClassInvalid,
                                Zl(t, 24).ngClassPending,
                            );
                    },
                );
            }
            function Rc(e) {
                return Ds(
                    0,
                    [
                        (e()(),
                        yl(
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
                        yl(
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
                        is(
                            2,
                            147456,
                            [[1, 4], ['chain', 4]],
                            0,
                            Go,
                            [Xi, [1, to]],
                            {GainNode: [0, 'GainNode']},
                            null,
                        ),
                        os(2048, null, to, null, [Go]),
                        (e()(),
                        yl(
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
                        (e()(), ks(-1, null, ['GainNode'])),
                        (e()(),
                        yl(6, 0, null, null, 1, 'em', [], null, null, null, null, null)),
                        (e()(), ks(-1, null, ['For feedback loop purposes only'])),
                        (e()(),
                        yl(
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
                        is(
                            9,
                            147456,
                            null,
                            0,
                            xc,
                            [Xi, [1, to]],
                            {DelayNode: [0, 'DelayNode']},
                            null,
                        ),
                        os(2048, null, to, null, [xc]),
                        (e()(),
                        yl(
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
                        (e()(), ks(-1, null, ['DelayNode'])),
                        (e()(),
                        yl(
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
                                    l = e.component;
                                return (
                                    'input' === t &&
                                        (r =
                                            !1 !==
                                                Zl(e, 14)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Zl(e, 14).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== Zl(e, 14)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                Zl(e, 14)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r =
                                            !1 !== Zl(e, 15).onChange(n.target.value) &&
                                            r),
                                    'input' === t &&
                                        (r =
                                            !1 !== Zl(e, 15).onChange(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Zl(e, 15).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (l.delayTime = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        is(14, 16384, null, 0, wa, [yt, pt, [2, ba]], null, null),
                        is(15, 16384, null, 0, Aa, [yt, pt], null, null),
                        os(
                            1024,
                            null,
                            va,
                            function(e, t) {
                                return [e, t];
                            },
                            [wa, Aa],
                        ),
                        is(
                            17,
                            671744,
                            null,
                            0,
                            uc,
                            [[8, null], [8, null], [8, null], [6, va]],
                            {model: [0, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        os(2048, null, Sa, null, [uc]),
                        is(19, 16384, null, 0, za, [[4, Sa]], null, null),
                        (e()(),
                        yl(
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
                        is(
                            21,
                            147456,
                            null,
                            0,
                            Go,
                            [Xi, [1, to]],
                            {GainNode: [0, 'GainNode']},
                            null,
                        ),
                        os(2048, null, to, null, [Go]),
                        (e()(),
                        yl(
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
                        (e()(), ks(-1, null, ['GainNode'])),
                        (e()(),
                        yl(
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
                                    l = e.component;
                                return (
                                    'input' === t &&
                                        (r =
                                            !1 !==
                                                Zl(e, 26)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Zl(e, 26).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== Zl(e, 26)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                Zl(e, 26)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r =
                                            !1 !== Zl(e, 27).onChange(n.target.value) &&
                                            r),
                                    'input' === t &&
                                        (r =
                                            !1 !== Zl(e, 27).onChange(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Zl(e, 27).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (l.delayGain = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        is(26, 16384, null, 0, wa, [yt, pt, [2, ba]], null, null),
                        is(27, 16384, null, 0, Aa, [yt, pt], null, null),
                        os(
                            1024,
                            null,
                            va,
                            function(e, t) {
                                return [e, t];
                            },
                            [wa, Aa],
                        ),
                        is(
                            29,
                            671744,
                            null,
                            0,
                            uc,
                            [[8, null], [8, null], [8, null], [6, va]],
                            {model: [0, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        os(2048, null, Sa, null, [uc]),
                        is(31, 16384, null, 0, za, [[4, Sa]], null, null),
                        (e()(),
                        yl(
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
                        is(
                            33,
                            147456,
                            null,
                            0,
                            bo,
                            [Xi, [1, to]],
                            {Output: [0, 'Output']},
                            null,
                        ),
                        (e()(),
                        yl(
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
                        (e()(), ks(-1, null, ['Output'])),
                        (e()(),
                        yl(36, 0, null, null, 1, 'em', [], null, null, null, null, null)),
                        (e()(),
                        ks(-1, null, ['Connected back to the beginning of the chain'])),
                        (e()(),
                        yl(
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
                        is(39, 147456, null, 0, Ec, [Xi, to], null, null),
                        (e()(),
                        yl(
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
                        (e()(), ks(-1, null, ['AudioDestinationNode'])),
                    ],
                    function(e, t) {
                        var n = t.component;
                        e(t, 2, 0, n.gain),
                            e(t, 9, 0, n.delayTime),
                            e(t, 17, 0, n.delayTime),
                            e(t, 21, 0, n.delayGain),
                            e(t, 29, 0, n.delayGain),
                            e(t, 33, 0, Zl(t, 2));
                    },
                    function(e, t) {
                        e(
                            t,
                            13,
                            0,
                            Zl(t, 19).ngClassUntouched,
                            Zl(t, 19).ngClassTouched,
                            Zl(t, 19).ngClassPristine,
                            Zl(t, 19).ngClassDirty,
                            Zl(t, 19).ngClassValid,
                            Zl(t, 19).ngClassInvalid,
                            Zl(t, 19).ngClassPending,
                        ),
                            e(
                                t,
                                25,
                                0,
                                Zl(t, 31).ngClassUntouched,
                                Zl(t, 31).ngClassTouched,
                                Zl(t, 31).ngClassPristine,
                                Zl(t, 31).ngClassDirty,
                                Zl(t, 31).ngClassValid,
                                Zl(t, 31).ngClassInvalid,
                                Zl(t, 31).ngClassPending,
                            );
                    },
                );
            }
            function Fc(e) {
                return Ds(
                    0,
                    [
                        (e()(),
                        yl(
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
                        yl(
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
                        is(
                            2,
                            147456,
                            [[1, 4], ['chain', 4]],
                            0,
                            Sc,
                            [Xi, [1, to]],
                            {
                                type: [0, 'type'],
                                gainParam: [1, 'gainParam'],
                                frequencyParam: [2, 'frequencyParam'],
                                qParam: [3, 'qParam'],
                                detuneParam: [4, 'detuneParam'],
                            },
                            null,
                        ),
                        os(2048, null, to, null, [Sc]),
                        (e()(),
                        yl(
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
                        (e()(), ks(-1, null, ['BiquadFilterNode'])),
                        (e()(),
                        yl(
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
                        yl(
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
                                    l = e.component;
                                return (
                                    'change' === t &&
                                        (r =
                                            !1 !== Zl(e, 8).onChange(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Zl(e, 8).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (l.type = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        is(8, 16384, null, 0, Va, [yt, pt], null, null),
                        os(
                            1024,
                            null,
                            va,
                            function(e) {
                                return [e];
                            },
                            [Va],
                        ),
                        is(
                            10,
                            671744,
                            null,
                            0,
                            uc,
                            [[8, null], [8, null], [8, null], [6, va]],
                            {model: [0, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        os(2048, null, Sa, null, [uc]),
                        is(12, 16384, null, 0, za, [[4, Sa]], null, null),
                        (e()(),
                        yl(
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
                        is(
                            14,
                            147456,
                            null,
                            0,
                            Da,
                            [pt, yt, [2, Va]],
                            {value: [0, 'value']},
                            null,
                        ),
                        is(
                            15,
                            147456,
                            null,
                            0,
                            Ma,
                            [pt, yt, [8, null]],
                            {value: [0, 'value']},
                            null,
                        ),
                        (e()(), ks(-1, null, ['lowpass'])),
                        (e()(),
                        yl(
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
                        is(
                            18,
                            147456,
                            null,
                            0,
                            Da,
                            [pt, yt, [2, Va]],
                            {value: [0, 'value']},
                            null,
                        ),
                        is(
                            19,
                            147456,
                            null,
                            0,
                            Ma,
                            [pt, yt, [8, null]],
                            {value: [0, 'value']},
                            null,
                        ),
                        (e()(), ks(-1, null, ['highpass'])),
                        (e()(),
                        yl(
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
                        is(
                            22,
                            147456,
                            null,
                            0,
                            Da,
                            [pt, yt, [2, Va]],
                            {value: [0, 'value']},
                            null,
                        ),
                        is(
                            23,
                            147456,
                            null,
                            0,
                            Ma,
                            [pt, yt, [8, null]],
                            {value: [0, 'value']},
                            null,
                        ),
                        (e()(), ks(-1, null, ['bandpass'])),
                        (e()(),
                        yl(
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
                        is(
                            26,
                            147456,
                            null,
                            0,
                            Da,
                            [pt, yt, [2, Va]],
                            {value: [0, 'value']},
                            null,
                        ),
                        is(
                            27,
                            147456,
                            null,
                            0,
                            Ma,
                            [pt, yt, [8, null]],
                            {value: [0, 'value']},
                            null,
                        ),
                        (e()(), ks(-1, null, ['lowshelf'])),
                        (e()(),
                        yl(
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
                        is(
                            30,
                            147456,
                            null,
                            0,
                            Da,
                            [pt, yt, [2, Va]],
                            {value: [0, 'value']},
                            null,
                        ),
                        is(
                            31,
                            147456,
                            null,
                            0,
                            Ma,
                            [pt, yt, [8, null]],
                            {value: [0, 'value']},
                            null,
                        ),
                        (e()(), ks(-1, null, ['highshelf'])),
                        (e()(),
                        yl(
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
                        is(
                            34,
                            147456,
                            null,
                            0,
                            Da,
                            [pt, yt, [2, Va]],
                            {value: [0, 'value']},
                            null,
                        ),
                        is(
                            35,
                            147456,
                            null,
                            0,
                            Ma,
                            [pt, yt, [8, null]],
                            {value: [0, 'value']},
                            null,
                        ),
                        (e()(), ks(-1, null, ['peaking'])),
                        (e()(),
                        yl(
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
                        is(
                            38,
                            147456,
                            null,
                            0,
                            Da,
                            [pt, yt, [2, Va]],
                            {value: [0, 'value']},
                            null,
                        ),
                        is(
                            39,
                            147456,
                            null,
                            0,
                            Ma,
                            [pt, yt, [8, null]],
                            {value: [0, 'value']},
                            null,
                        ),
                        (e()(), ks(-1, null, ['notch'])),
                        (e()(),
                        yl(
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
                        is(
                            42,
                            147456,
                            null,
                            0,
                            Da,
                            [pt, yt, [2, Va]],
                            {value: [0, 'value']},
                            null,
                        ),
                        is(
                            43,
                            147456,
                            null,
                            0,
                            Ma,
                            [pt, yt, [8, null]],
                            {value: [0, 'value']},
                            null,
                        ),
                        (e()(), ks(-1, null, ['allpass'])),
                        (e()(),
                        yl(
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
                        (e()(), ks(-1, null, ['type'])),
                        (e()(),
                        yl(
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
                        yl(
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
                                    l = e.component;
                                return (
                                    'input' === t &&
                                        (r =
                                            !1 !==
                                                Zl(e, 49)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Zl(e, 49).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== Zl(e, 49)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                Zl(e, 49)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r =
                                            !1 !== Zl(e, 50).onChange(n.target.value) &&
                                            r),
                                    'input' === t &&
                                        (r =
                                            !1 !== Zl(e, 50).onChange(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Zl(e, 50).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (l.filterGain = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        is(49, 16384, null, 0, wa, [yt, pt, [2, ba]], null, null),
                        is(50, 16384, null, 0, Aa, [yt, pt], null, null),
                        os(
                            1024,
                            null,
                            va,
                            function(e, t) {
                                return [e, t];
                            },
                            [wa, Aa],
                        ),
                        is(
                            52,
                            671744,
                            null,
                            0,
                            uc,
                            [[8, null], [8, null], [8, null], [6, va]],
                            {model: [0, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        os(2048, null, Sa, null, [uc]),
                        is(54, 16384, null, 0, za, [[4, Sa]], null, null),
                        (e()(),
                        yl(
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
                        (e()(), ks(-1, null, ['gain'])),
                        (e()(),
                        yl(
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
                        yl(
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
                                    l = e.component;
                                return (
                                    'input' === t &&
                                        (r =
                                            !1 !==
                                                Zl(e, 59)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Zl(e, 59).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== Zl(e, 59)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                Zl(e, 59)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r =
                                            !1 !== Zl(e, 60).onChange(n.target.value) &&
                                            r),
                                    'input' === t &&
                                        (r =
                                            !1 !== Zl(e, 60).onChange(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Zl(e, 60).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (l.frequency = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        is(59, 16384, null, 0, wa, [yt, pt, [2, ba]], null, null),
                        is(60, 16384, null, 0, Aa, [yt, pt], null, null),
                        os(
                            1024,
                            null,
                            va,
                            function(e, t) {
                                return [e, t];
                            },
                            [wa, Aa],
                        ),
                        is(
                            62,
                            671744,
                            null,
                            0,
                            uc,
                            [[8, null], [8, null], [8, null], [6, va]],
                            {model: [0, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        os(2048, null, Sa, null, [uc]),
                        is(64, 16384, null, 0, za, [[4, Sa]], null, null),
                        (e()(),
                        yl(
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
                        (e()(), ks(-1, null, ['frequency'])),
                        (e()(),
                        yl(
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
                        yl(
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
                                    l = e.component;
                                return (
                                    'input' === t &&
                                        (r =
                                            !1 !==
                                                Zl(e, 69)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Zl(e, 69).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== Zl(e, 69)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                Zl(e, 69)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r =
                                            !1 !== Zl(e, 70).onChange(n.target.value) &&
                                            r),
                                    'input' === t &&
                                        (r =
                                            !1 !== Zl(e, 70).onChange(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Zl(e, 70).onTouched() && r),
                                    'ngModelChange' === t && (r = !1 !== (l.Q = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        is(69, 16384, null, 0, wa, [yt, pt, [2, ba]], null, null),
                        is(70, 16384, null, 0, Aa, [yt, pt], null, null),
                        os(
                            1024,
                            null,
                            va,
                            function(e, t) {
                                return [e, t];
                            },
                            [wa, Aa],
                        ),
                        is(
                            72,
                            671744,
                            null,
                            0,
                            uc,
                            [[8, null], [8, null], [8, null], [6, va]],
                            {model: [0, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        os(2048, null, Sa, null, [uc]),
                        is(74, 16384, null, 0, za, [[4, Sa]], null, null),
                        (e()(),
                        yl(
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
                        (e()(), ks(-1, null, ['Q'])),
                        (e()(),
                        yl(
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
                        yl(
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
                                    l = e.component;
                                return (
                                    'input' === t &&
                                        (r =
                                            !1 !==
                                                Zl(e, 79)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Zl(e, 79).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== Zl(e, 79)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                Zl(e, 79)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r =
                                            !1 !== Zl(e, 80).onChange(n.target.value) &&
                                            r),
                                    'input' === t &&
                                        (r =
                                            !1 !== Zl(e, 80).onChange(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Zl(e, 80).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (l.detune = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        is(79, 16384, null, 0, wa, [yt, pt, [2, ba]], null, null),
                        is(80, 16384, null, 0, Aa, [yt, pt], null, null),
                        os(
                            1024,
                            null,
                            va,
                            function(e, t) {
                                return [e, t];
                            },
                            [wa, Aa],
                        ),
                        is(
                            82,
                            671744,
                            null,
                            0,
                            uc,
                            [[8, null], [8, null], [8, null], [6, va]],
                            {model: [0, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        os(2048, null, Sa, null, [uc]),
                        is(84, 16384, null, 0, za, [[4, Sa]], null, null),
                        (e()(),
                        yl(
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
                        (e()(), ks(-1, null, ['detune'])),
                        (e()(),
                        yl(
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
                        is(
                            88,
                            147456,
                            null,
                            0,
                            Tc,
                            [Xi, [1, to]],
                            {oversample: [0, 'oversample'], curve: [1, 'curve']},
                            null,
                        ),
                        os(2048, null, to, null, [Tc]),
                        (e()(),
                        yl(
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
                        (e()(), ks(-1, null, ['WaveShaperNode'])),
                        (e()(),
                        yl(
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
                                    l = e.component;
                                return (
                                    'input' === t &&
                                        (r =
                                            !1 !==
                                                Zl(e, 93)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Zl(e, 93).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== Zl(e, 93)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                Zl(e, 93)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r =
                                            !1 !== Zl(e, 94).onChange(n.target.value) &&
                                            r),
                                    'input' === t &&
                                        (r =
                                            !1 !== Zl(e, 94).onChange(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Zl(e, 94).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== l.onCurveChange(n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        is(93, 16384, null, 0, wa, [yt, pt, [2, ba]], null, null),
                        is(94, 16384, null, 0, Aa, [yt, pt], null, null),
                        os(
                            1024,
                            null,
                            va,
                            function(e, t) {
                                return [e, t];
                            },
                            [wa, Aa],
                        ),
                        is(
                            96,
                            671744,
                            null,
                            0,
                            uc,
                            [[8, null], [8, null], [8, null], [6, va]],
                            {model: [0, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        os(2048, null, Sa, null, [uc]),
                        is(98, 16384, null, 0, za, [[4, Sa]], null, null),
                        (e()(),
                        yl(
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
                        is(
                            100,
                            147456,
                            null,
                            0,
                            Go,
                            [Xi, [1, to]],
                            {GainNode: [0, 'GainNode']},
                            null,
                        ),
                        os(2048, null, to, null, [Go]),
                        (e()(),
                        yl(
                            102,
                            0,
                            null,
                            null,
                            8,
                            'fieldset',
                            [['ConvolverNode', ''], ['buffer', 'assets/response.m4a']],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        is(
                            103,
                            147456,
                            null,
                            0,
                            Nc,
                            [eo, Xi, [1, to]],
                            {bufferSetter: [0, 'bufferSetter']},
                            null,
                        ),
                        os(2048, null, to, null, [Nc]),
                        (e()(),
                        yl(
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
                        (e()(), ks(-1, null, ['ConvolverNode'])),
                        (e()(),
                        yl(
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
                        is(108, 147456, null, 0, Ec, [Xi, to], null, null),
                        (e()(),
                        yl(
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
                        (e()(), ks(-1, null, ['AudioDestinationNode'])),
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
                            e(t, 103, 0, 'assets/response.m4a');
                    },
                    function(e, t) {
                        e(
                            t,
                            7,
                            0,
                            Zl(t, 12).ngClassUntouched,
                            Zl(t, 12).ngClassTouched,
                            Zl(t, 12).ngClassPristine,
                            Zl(t, 12).ngClassDirty,
                            Zl(t, 12).ngClassValid,
                            Zl(t, 12).ngClassInvalid,
                            Zl(t, 12).ngClassPending,
                        ),
                            e(
                                t,
                                48,
                                0,
                                Zl(t, 54).ngClassUntouched,
                                Zl(t, 54).ngClassTouched,
                                Zl(t, 54).ngClassPristine,
                                Zl(t, 54).ngClassDirty,
                                Zl(t, 54).ngClassValid,
                                Zl(t, 54).ngClassInvalid,
                                Zl(t, 54).ngClassPending,
                            ),
                            e(
                                t,
                                58,
                                0,
                                Zl(t, 64).ngClassUntouched,
                                Zl(t, 64).ngClassTouched,
                                Zl(t, 64).ngClassPristine,
                                Zl(t, 64).ngClassDirty,
                                Zl(t, 64).ngClassValid,
                                Zl(t, 64).ngClassInvalid,
                                Zl(t, 64).ngClassPending,
                            ),
                            e(
                                t,
                                68,
                                0,
                                Zl(t, 74).ngClassUntouched,
                                Zl(t, 74).ngClassTouched,
                                Zl(t, 74).ngClassPristine,
                                Zl(t, 74).ngClassDirty,
                                Zl(t, 74).ngClassValid,
                                Zl(t, 74).ngClassInvalid,
                                Zl(t, 74).ngClassPending,
                            ),
                            e(
                                t,
                                78,
                                0,
                                Zl(t, 84).ngClassUntouched,
                                Zl(t, 84).ngClassTouched,
                                Zl(t, 84).ngClassPristine,
                                Zl(t, 84).ngClassDirty,
                                Zl(t, 84).ngClassValid,
                                Zl(t, 84).ngClassInvalid,
                                Zl(t, 84).ngClassPending,
                            ),
                            e(
                                t,
                                92,
                                0,
                                Zl(t, 98).ngClassUntouched,
                                Zl(t, 98).ngClassTouched,
                                Zl(t, 98).ngClassPristine,
                                Zl(t, 98).ngClassDirty,
                                Zl(t, 98).ngClassValid,
                                Zl(t, 98).ngClassInvalid,
                                Zl(t, 98).ngClassPending,
                            );
                    },
                );
            }
            function jc(e) {
                return Ds(
                    2,
                    [
                        ((t = 0),
                        (n = Ac),
                        (r = [Xi]),
                        us(-1, (t |= 16), null, 0, n, n, r)),
                        Cs(671088640, 1, {chain: 0}),
                        (e()(),
                        yl(
                            2,
                            0,
                            null,
                            null,
                            2,
                            'header',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(),
                        yl(3, 0, null, null, 1, 'h1', [], null, null, null, null, null)),
                        (e()(), ks(-1, null, ['ng-web-audio demo'])),
                        (e()(),
                        yl(
                            5,
                            0,
                            null,
                            null,
                            107,
                            'main',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(),
                        yl(
                            6,
                            0,
                            null,
                            null,
                            11,
                            'section',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(),
                        yl(7, 0, null, null, 1, 'h1', [], null, null, null, null, null)),
                        (e()(), ks(-1, null, ['Description'])),
                        (e()(),
                        yl(9, 0, null, null, 8, 'p', [], null, null, null, null, null)),
                        (e()(), ks(-1, null, [' This is a demo for '])),
                        (e()(),
                        yl(
                            11,
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
                        yl(12, 0, null, null, 1, 'em', [], null, null, null, null, null)),
                        (e()(), ks(-1, null, ['ng-web-audio'])),
                        (e()(),
                        ks(-1, null, [
                            ' \u2014 a Web Audio API declarative library for Angular. Here you can select different audio source options and see AudioNode graph for selected configuration. Demo page uses HTML elements as directives hosts, in real life scenario you can use ',
                        ])),
                        (e()(),
                        yl(
                            15,
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
                        (e()(), ks(-1, null, ['ng-container'])),
                        (e()(),
                        ks(-1, null, [' so you will not have redundant DOM tags. '])),
                        (e()(),
                        yl(
                            18,
                            0,
                            null,
                            null,
                            43,
                            'section',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(),
                        yl(19, 0, null, null, 1, 'h1', [], null, null, null, null, null)),
                        (e()(), ks(-1, null, ['Source'])),
                        (e()(),
                        yl(21, 0, null, null, 9, 'p', [], null, null, null, null, null)),
                        (e()(),
                        yl(
                            22,
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
                        yl(
                            23,
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
                                    l = e.component;
                                return (
                                    'input' === t &&
                                        (r =
                                            !1 !==
                                                Zl(e, 24)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Zl(e, 24).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== Zl(e, 24)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                Zl(e, 24)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r = !1 !== Zl(e, 25).onChange() && r),
                                    'blur' === t &&
                                        (r = !1 !== Zl(e, 25).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (l.selectedSource = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        is(24, 16384, null, 0, wa, [yt, pt, [2, ba]], null, null),
                        is(
                            25,
                            212992,
                            null,
                            0,
                            Na,
                            [yt, pt, Ta, Le],
                            {name: [0, 'name'], value: [1, 'value']},
                            null,
                        ),
                        os(
                            1024,
                            null,
                            va,
                            function(e, t) {
                                return [e, t];
                            },
                            [wa, Na],
                        ),
                        is(
                            27,
                            671744,
                            null,
                            0,
                            uc,
                            [[8, null], [8, null], [8, null], [6, va]],
                            {name: [0, 'name'], model: [1, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        os(2048, null, Sa, null, [uc]),
                        is(29, 16384, null, 0, za, [[4, Sa]], null, null),
                        (e()(), ks(-1, null, [' AudioBufferSourceNode '])),
                        (e()(),
                        yl(31, 0, null, null, 9, 'p', [], null, null, null, null, null)),
                        (e()(),
                        yl(
                            32,
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
                        yl(
                            33,
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
                                    l = e.component;
                                return (
                                    'input' === t &&
                                        (r =
                                            !1 !==
                                                Zl(e, 34)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Zl(e, 34).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== Zl(e, 34)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                Zl(e, 34)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r = !1 !== Zl(e, 35).onChange() && r),
                                    'blur' === t &&
                                        (r = !1 !== Zl(e, 35).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (l.selectedSource = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        is(34, 16384, null, 0, wa, [yt, pt, [2, ba]], null, null),
                        is(
                            35,
                            212992,
                            null,
                            0,
                            Na,
                            [yt, pt, Ta, Le],
                            {name: [0, 'name'], value: [1, 'value']},
                            null,
                        ),
                        os(
                            1024,
                            null,
                            va,
                            function(e, t) {
                                return [e, t];
                            },
                            [wa, Na],
                        ),
                        is(
                            37,
                            671744,
                            null,
                            0,
                            uc,
                            [[8, null], [8, null], [8, null], [6, va]],
                            {name: [0, 'name'], model: [1, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        os(2048, null, Sa, null, [uc]),
                        is(39, 16384, null, 0, za, [[4, Sa]], null, null),
                        (e()(), ks(-1, null, [' MediaElementAudioSourceNode '])),
                        (e()(),
                        yl(41, 0, null, null, 9, 'p', [], null, null, null, null, null)),
                        (e()(),
                        yl(
                            42,
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
                        yl(
                            43,
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
                                    l = e.component;
                                return (
                                    'input' === t &&
                                        (r =
                                            !1 !==
                                                Zl(e, 44)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Zl(e, 44).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== Zl(e, 44)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                Zl(e, 44)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r = !1 !== Zl(e, 45).onChange() && r),
                                    'blur' === t &&
                                        (r = !1 !== Zl(e, 45).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (l.selectedSource = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        is(44, 16384, null, 0, wa, [yt, pt, [2, ba]], null, null),
                        is(
                            45,
                            212992,
                            null,
                            0,
                            Na,
                            [yt, pt, Ta, Le],
                            {name: [0, 'name'], value: [1, 'value']},
                            null,
                        ),
                        os(
                            1024,
                            null,
                            va,
                            function(e, t) {
                                return [e, t];
                            },
                            [wa, Na],
                        ),
                        is(
                            47,
                            671744,
                            null,
                            0,
                            uc,
                            [[8, null], [8, null], [8, null], [6, va]],
                            {name: [0, 'name'], model: [1, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        os(2048, null, Sa, null, [uc]),
                        is(49, 16384, null, 0, za, [[4, Sa]], null, null),
                        (e()(), ks(-1, null, [' OscillatorNode '])),
                        (e()(),
                        yl(
                            51,
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
                        is(52, 16384, null, 0, jo, [], {ngSwitch: [0, 'ngSwitch']}, null),
                        (e()(), _l(16777216, null, null, 1, null, Vc)),
                        is(
                            54,
                            278528,
                            null,
                            0,
                            Ho,
                            [Jn, Qt, jo],
                            {ngSwitchCase: [0, 'ngSwitchCase']},
                            null,
                        ),
                        (e()(), _l(16777216, null, null, 1, null, Dc)),
                        is(
                            56,
                            278528,
                            null,
                            0,
                            Ho,
                            [Jn, Qt, jo],
                            {ngSwitchCase: [0, 'ngSwitchCase']},
                            null,
                        ),
                        (e()(), _l(16777216, null, null, 1, null, Mc)),
                        is(
                            58,
                            278528,
                            null,
                            0,
                            Ho,
                            [Jn, Qt, jo],
                            {ngSwitchCase: [0, 'ngSwitchCase']},
                            null,
                        ),
                        (e()(),
                        yl(59, 0, null, null, 2, 'p', [], null, null, null, null, null)),
                        (e()(),
                        yl(
                            60,
                            0,
                            [['canvas', 1]],
                            null,
                            1,
                            'canvas',
                            [['AudioDestinationNode', '']],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        is(61, 147456, [['fallback', 4]], 0, Ec, [Xi, to], null, null),
                        (e()(),
                        yl(
                            62,
                            0,
                            null,
                            null,
                            50,
                            'section',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(),
                        yl(63, 0, null, null, 1, 'h1', [], null, null, null, null, null)),
                        (e()(), ks(-1, null, ['Chain'])),
                        (e()(),
                        yl(65, 0, null, null, 9, 'p', [], null, null, null, null, null)),
                        (e()(),
                        yl(
                            66,
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
                        yl(
                            67,
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
                                    l = e.component;
                                return (
                                    'input' === t &&
                                        (r =
                                            !1 !==
                                                Zl(e, 68)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Zl(e, 68).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== Zl(e, 68)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                Zl(e, 68)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r = !1 !== Zl(e, 69).onChange() && r),
                                    'blur' === t &&
                                        (r = !1 !== Zl(e, 69).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (l.selectedChain = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        is(68, 16384, null, 0, wa, [yt, pt, [2, ba]], null, null),
                        is(
                            69,
                            212992,
                            null,
                            0,
                            Na,
                            [yt, pt, Ta, Le],
                            {name: [0, 'name'], value: [1, 'value']},
                            null,
                        ),
                        os(
                            1024,
                            null,
                            va,
                            function(e, t) {
                                return [e, t];
                            },
                            [wa, Na],
                        ),
                        is(
                            71,
                            671744,
                            null,
                            0,
                            uc,
                            [[8, null], [8, null], [8, null], [6, va]],
                            {name: [0, 'name'], model: [1, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        os(2048, null, Sa, null, [uc]),
                        is(73, 16384, null, 0, za, [[4, Sa]], null, null),
                        (e()(), ks(-1, null, [' Dry '])),
                        (e()(),
                        yl(75, 0, null, null, 9, 'p', [], null, null, null, null, null)),
                        (e()(),
                        yl(
                            76,
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
                        yl(
                            77,
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
                                    l = e.component;
                                return (
                                    'input' === t &&
                                        (r =
                                            !1 !==
                                                Zl(e, 78)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Zl(e, 78).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== Zl(e, 78)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                Zl(e, 78)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r = !1 !== Zl(e, 79).onChange() && r),
                                    'blur' === t &&
                                        (r = !1 !== Zl(e, 79).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (l.selectedChain = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        is(78, 16384, null, 0, wa, [yt, pt, [2, ba]], null, null),
                        is(
                            79,
                            212992,
                            null,
                            0,
                            Na,
                            [yt, pt, Ta, Le],
                            {name: [0, 'name'], value: [1, 'value']},
                            null,
                        ),
                        os(
                            1024,
                            null,
                            va,
                            function(e, t) {
                                return [e, t];
                            },
                            [wa, Na],
                        ),
                        is(
                            81,
                            671744,
                            null,
                            0,
                            uc,
                            [[8, null], [8, null], [8, null], [6, va]],
                            {name: [0, 'name'], model: [1, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        os(2048, null, Sa, null, [uc]),
                        is(83, 16384, null, 0, za, [[4, Sa]], null, null),
                        (e()(), ks(-1, null, [' Balance '])),
                        (e()(),
                        yl(85, 0, null, null, 9, 'p', [], null, null, null, null, null)),
                        (e()(),
                        yl(
                            86,
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
                        yl(
                            87,
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
                                    l = e.component;
                                return (
                                    'input' === t &&
                                        (r =
                                            !1 !==
                                                Zl(e, 88)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Zl(e, 88).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== Zl(e, 88)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                Zl(e, 88)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r = !1 !== Zl(e, 89).onChange() && r),
                                    'blur' === t &&
                                        (r = !1 !== Zl(e, 89).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (l.selectedChain = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        is(88, 16384, null, 0, wa, [yt, pt, [2, ba]], null, null),
                        is(
                            89,
                            212992,
                            null,
                            0,
                            Na,
                            [yt, pt, Ta, Le],
                            {name: [0, 'name'], value: [1, 'value']},
                            null,
                        ),
                        os(
                            1024,
                            null,
                            va,
                            function(e, t) {
                                return [e, t];
                            },
                            [wa, Na],
                        ),
                        is(
                            91,
                            671744,
                            null,
                            0,
                            uc,
                            [[8, null], [8, null], [8, null], [6, va]],
                            {name: [0, 'name'], model: [1, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        os(2048, null, Sa, null, [uc]),
                        is(93, 16384, null, 0, za, [[4, Sa]], null, null),
                        (e()(), ks(-1, null, [' Delay '])),
                        (e()(),
                        yl(95, 0, null, null, 9, 'p', [], null, null, null, null, null)),
                        (e()(),
                        yl(
                            96,
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
                        yl(
                            97,
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
                                    l = e.component;
                                return (
                                    'input' === t &&
                                        (r =
                                            !1 !==
                                                Zl(e, 98)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Zl(e, 98).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== Zl(e, 98)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                Zl(e, 98)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r = !1 !== Zl(e, 99).onChange() && r),
                                    'blur' === t &&
                                        (r = !1 !== Zl(e, 99).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (l.selectedChain = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        is(98, 16384, null, 0, wa, [yt, pt, [2, ba]], null, null),
                        is(
                            99,
                            212992,
                            null,
                            0,
                            Na,
                            [yt, pt, Ta, Le],
                            {name: [0, 'name'], value: [1, 'value']},
                            null,
                        ),
                        os(
                            1024,
                            null,
                            va,
                            function(e, t) {
                                return [e, t];
                            },
                            [wa, Na],
                        ),
                        is(
                            101,
                            671744,
                            null,
                            0,
                            uc,
                            [[8, null], [8, null], [8, null], [6, va]],
                            {name: [0, 'name'], model: [1, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        os(2048, null, Sa, null, [uc]),
                        is(103, 16384, null, 0, za, [[4, Sa]], null, null),
                        (e()(), ks(-1, null, [' Complex '])),
                        (e()(),
                        yl(
                            105,
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
                        is(
                            106,
                            16384,
                            null,
                            0,
                            jo,
                            [],
                            {ngSwitch: [0, 'ngSwitch']},
                            null,
                        ),
                        (e()(), _l(16777216, null, null, 1, null, Pc)),
                        is(
                            108,
                            278528,
                            null,
                            0,
                            Ho,
                            [Jn, Qt, jo],
                            {ngSwitchCase: [0, 'ngSwitchCase']},
                            null,
                        ),
                        (e()(), _l(16777216, null, null, 1, null, Rc)),
                        is(
                            110,
                            278528,
                            null,
                            0,
                            Ho,
                            [Jn, Qt, jo],
                            {ngSwitchCase: [0, 'ngSwitchCase']},
                            null,
                        ),
                        (e()(), _l(16777216, null, null, 1, null, Fc)),
                        is(
                            112,
                            278528,
                            null,
                            0,
                            Ho,
                            [Jn, Qt, jo],
                            {ngSwitchCase: [0, 'ngSwitchCase']},
                            null,
                        ),
                        (e()(),
                        yl(
                            113,
                            0,
                            null,
                            null,
                            6,
                            'footer',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(), ks(-1, null, [' Get it here: '])),
                        (e()(),
                        yl(
                            115,
                            0,
                            null,
                            null,
                            1,
                            'a',
                            [['href', 'https://github.com/waterplea/ng-web-audio']],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(), ks(-1, null, ['GitHub'])),
                        (e()(), ks(-1, null, [' | '])),
                        (e()(),
                        yl(
                            118,
                            0,
                            null,
                            null,
                            1,
                            'a',
                            [['href', 'https://www.npmjs.com/package/ng-web-audio']],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(), ks(-1, null, ['NPM'])),
                    ],
                    function(e, t) {
                        var n = t.component;
                        e(t, 25, 0, 'source', 'buffer'),
                            e(t, 27, 0, 'source', n.selectedSource),
                            e(t, 35, 0, 'source', 'media'),
                            e(t, 37, 0, 'source', n.selectedSource),
                            e(t, 45, 0, 'source', 'oscillator'),
                            e(t, 47, 0, 'source', n.selectedSource),
                            e(t, 52, 0, n.selectedSource),
                            e(t, 54, 0, 'buffer'),
                            e(t, 56, 0, 'media'),
                            e(t, 58, 0, 'oscillator'),
                            e(t, 69, 0, 'chain', 'dry'),
                            e(t, 71, 0, 'chain', n.selectedChain),
                            e(t, 79, 0, 'chain', 'panner'),
                            e(t, 81, 0, 'chain', n.selectedChain),
                            e(t, 89, 0, 'chain', 'delay'),
                            e(t, 91, 0, 'chain', n.selectedChain),
                            e(t, 99, 0, 'chain', 'complex'),
                            e(t, 101, 0, 'chain', n.selectedChain),
                            e(t, 106, 0, n.selectedChain),
                            e(t, 108, 0, 'panner'),
                            e(t, 110, 0, 'delay'),
                            e(t, 112, 0, 'complex');
                    },
                    function(e, t) {
                        e(
                            t,
                            23,
                            0,
                            Zl(t, 29).ngClassUntouched,
                            Zl(t, 29).ngClassTouched,
                            Zl(t, 29).ngClassPristine,
                            Zl(t, 29).ngClassDirty,
                            Zl(t, 29).ngClassValid,
                            Zl(t, 29).ngClassInvalid,
                            Zl(t, 29).ngClassPending,
                        ),
                            e(
                                t,
                                33,
                                0,
                                Zl(t, 39).ngClassUntouched,
                                Zl(t, 39).ngClassTouched,
                                Zl(t, 39).ngClassPristine,
                                Zl(t, 39).ngClassDirty,
                                Zl(t, 39).ngClassValid,
                                Zl(t, 39).ngClassInvalid,
                                Zl(t, 39).ngClassPending,
                            ),
                            e(
                                t,
                                43,
                                0,
                                Zl(t, 49).ngClassUntouched,
                                Zl(t, 49).ngClassTouched,
                                Zl(t, 49).ngClassPristine,
                                Zl(t, 49).ngClassDirty,
                                Zl(t, 49).ngClassValid,
                                Zl(t, 49).ngClassInvalid,
                                Zl(t, 49).ngClassPending,
                            ),
                            e(
                                t,
                                67,
                                0,
                                Zl(t, 73).ngClassUntouched,
                                Zl(t, 73).ngClassTouched,
                                Zl(t, 73).ngClassPristine,
                                Zl(t, 73).ngClassDirty,
                                Zl(t, 73).ngClassValid,
                                Zl(t, 73).ngClassInvalid,
                                Zl(t, 73).ngClassPending,
                            ),
                            e(
                                t,
                                77,
                                0,
                                Zl(t, 83).ngClassUntouched,
                                Zl(t, 83).ngClassTouched,
                                Zl(t, 83).ngClassPristine,
                                Zl(t, 83).ngClassDirty,
                                Zl(t, 83).ngClassValid,
                                Zl(t, 83).ngClassInvalid,
                                Zl(t, 83).ngClassPending,
                            ),
                            e(
                                t,
                                87,
                                0,
                                Zl(t, 93).ngClassUntouched,
                                Zl(t, 93).ngClassTouched,
                                Zl(t, 93).ngClassPristine,
                                Zl(t, 93).ngClassDirty,
                                Zl(t, 93).ngClassValid,
                                Zl(t, 93).ngClassInvalid,
                                Zl(t, 93).ngClassPending,
                            ),
                            e(
                                t,
                                97,
                                0,
                                Zl(t, 103).ngClassUntouched,
                                Zl(t, 103).ngClassTouched,
                                Zl(t, 103).ngClassPristine,
                                Zl(t, 103).ngClassDirty,
                                Zl(t, 103).ngClassValid,
                                Zl(t, 103).ngClassInvalid,
                                Zl(t, 103).ngClassPending,
                            );
                    },
                );
                var t, n, r;
            }
            function Hc(e) {
                return Ds(
                    0,
                    [
                        (e()(),
                        yl(0, 0, null, null, 1, 'app', [], null, null, null, jc, kc)),
                        is(1, 49152, null, 0, Li, [], null, null),
                    ],
                    null,
                    null,
                );
            }
            var Lc = Rl('app', Li, Hc, {}, {}, []);
            class Bc {}
            var Uc = Fi(Hi, [Li], function(e) {
                return (function(e) {
                    const t = {},
                        n = [];
                    let r = !1;
                    for (let l = 0; l < e.length; l++) {
                        const s = e[l];
                        s.token === nt && !0 === s.value && (r = !0),
                            1073741824 & s.flags && n.push(s.token),
                            (s.index = l),
                            (t[Br(s.token)] = s);
                    }
                    return {
                        factory: null,
                        providersByKey: t,
                        providers: e,
                        modules: n,
                        isRoot: r,
                    };
                })([
                    Nl(512, ut, at, [[8, [Lc]], [3, ut], dt]),
                    Nl(4608, Ta, Ta, []),
                    Nl(5120, Er, Tr, [[3, Er]]),
                    Nl(4608, Do, Oo, [Er, [2, Vo]]),
                    Nl(4608, wn, wn, []),
                    Nl(5120, _r, xr, []),
                    Nl(5120, yr, Sr, []),
                    Nl(4608, ea, ta, [Bo]),
                    Nl(6144, wt, null, [ea]),
                    Nl(4608, Zu, Qu, []),
                    Nl(
                        5120,
                        gu,
                        function(e, t, n, r, l, s, i, o) {
                            return [new Gu(e, t, n), new Xu(r), new Ku(l, s, i, o)];
                        },
                        [Bo, kn, pn, Bo, Bo, Zu, gn, [2, Wu]],
                    ),
                    Nl(4608, mu, mu, [gu, kn]),
                    Nl(135680, vu, vu, [Bo]),
                    Nl(4608, Tu, Tu, [mu, vu, dn]),
                    Nl(6144, mt, null, [Tu]),
                    Nl(6144, yu, null, [vu]),
                    Nl(4608, Rn, Rn, [kn]),
                    Nl(4608, Co, To, [wo, [2, Eo]]),
                    Nl(1073742336, ac, ac, []),
                    Nl(1073742336, cc, cc, []),
                    Nl(1073742336, Bc, Bc, []),
                    Nl(1073742336, Lo, Lo, []),
                    Nl(1024, sn, aa, []),
                    Nl(256, dn, 'demo', []),
                    Nl(2048, uu, null, [dn]),
                    Nl(
                        1024,
                        an,
                        function(e, t, n, r) {
                            return [
                                ((l = e),
                                hu('probe', fu),
                                hu(
                                    'coreTokens',
                                    Object.assign(
                                        {},
                                        pu,
                                        (l || []).reduce(
                                            (e, t) => ((e[t.name] = t.token), e),
                                            {},
                                        ),
                                    ),
                                ),
                                () => fu),
                                au(t, n, r),
                            ];
                            var l;
                        },
                        [[2, $n], uu, Bo, Le],
                    ),
                    Nl(512, cn, cn, [[2, an]]),
                    Nl(131584, Wn, Wn, [kn, gn, Le, sn, ut, cn]),
                    Nl(1073742336, Nr, Nr, [Wn]),
                    Nl(1073742336, ca, ca, [[3, ca]]),
                    Nl(1073742336, Hi, Hi, []),
                    Nl(256, nt, !0, []),
                ]);
            });
            ua()
                .bootstrapModuleFactory(Uc)
                .then(e => {
                    const t = window;
                    t.ngRef && t.ngRef.destroy(), (t.ngRef = e);
                })
                .catch(e => console.error(e));
        },
    },
    [[0, 0]],
]);
