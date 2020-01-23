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
                            if (a(s)) {
                                let e = -1,
                                    n = s.length;
                                for (; ++e < n; ) {
                                    const n = s[e];
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
                        return new (t = w(t))((t, n) => {
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
                        return new (e = w(e))((e, t) => {
                            let n;
                            this.subscribe(e => (n = e), e => t(e), () => e(n));
                        });
                    }
                }
                return (e.create = t => new e(t)), e;
            })();
            function w(e) {
                if ((e || (e = s.Promise || Promise), !e))
                    throw new Error('no Promise impl found');
                return e;
            }
            function b() {
                return (
                    Error.call(this),
                    (this.message = 'object unsubscribed'),
                    (this.name = 'ObjectUnsubscribedError'),
                    this
                );
            }
            b.prototype = Object.create(Error.prototype);
            const C = b;
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
            const T = (function() {
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
                        const t = new S(this, this);
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
                return (e.create = (e, t) => new S(e, t)), e;
            })();
            class S extends T {
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
            function A(e) {
                return e && 'function' == typeof e.schedule;
            }
            class k extends g {
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
            const I = e => t => {
                for (let n = 0, r = e.length; n < r && !t.closed; n++) t.next(e[n]);
                t.complete();
            };
            function N() {
                return 'function' == typeof Symbol && Symbol.iterator
                    ? Symbol.iterator
                    : '@@iterator';
            }
            const V = N(),
                O = e => e && 'number' == typeof e.length && 'function' != typeof e;
            function D(e) {
                return (
                    !!e && 'function' != typeof e.subscribe && 'function' == typeof e.then
                );
            }
            const P = e => {
                if (e && 'function' == typeof e[_])
                    return (e => t => {
                        const n = e[_]();
                        if ('function' != typeof n.subscribe)
                            throw new TypeError(
                                'Provided object does not correctly implement Symbol.observable',
                            );
                        return n.subscribe(t);
                    })(e);
                if (O(e)) return I(e);
                if (D(e))
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
            function M(e, t, n, r, l = new k(e, n, r)) {
                if (!l.closed) return t instanceof v ? t.subscribe(l) : P(t)(l);
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
                              if (D(e))
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
                              if (O(e)) return L(e, t);
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
                    : new v(P(e));
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
                    const r = new k(this, void 0, void 0);
                    this.destination.add(r), M(this, e, t, n, r);
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
                return t ? L(e, t) : new v(I(e));
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
                return new T();
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
                ve = se('Inject', e => ({token: e})),
                we = se('Optional'),
                be = se('Self'),
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
                Te = void 0;
            function Se(e) {
                const t = Te;
                return (Te = e), t;
            }
            function Ae(e, t = Ee.Default) {
                return (xe ||
                    function(e, t = Ee.Default) {
                        if (void 0 === Te)
                            throw new Error(
                                'inject() must be called from an injection context',
                            );
                        return null === Te
                            ? (function(e, t, n) {
                                  const r = ne(e);
                                  if (r && 'root' == r.providedIn)
                                      return void 0 === r.value
                                          ? (r.value = r.factory())
                                          : r.value;
                                  if (n & Ee.Optional) return null;
                                  throw new Error(`Injector: NOT_FOUND [${fe(e)}]`);
                              })(e, 0, t)
                            : Te.get(e, t & Ee.Optional ? null : void 0, t);
                    })(e, t);
            }
            const ke = /([A-Z])/g;
            function Ie(e) {
                try {
                    return null != e ? e.toString().slice(0, 30) : e;
                } catch (t) {
                    return '[ERROR] Exception while trying to serialize the value';
                }
            }
            function Ne(e, t) {
                const n = De(e),
                    r = De(t);
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
                    })(e, t, Ne);
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
            class Oe {
                constructor(e, t, n) {
                    (this.previousValue = e),
                        (this.currentValue = t),
                        (this.firstChange = n);
                }
                isFirstChange() {
                    return this.firstChange;
                }
            }
            function De(e) {
                return (
                    !!Pe(e) && (Array.isArray(e) || (!(e instanceof Map) && de() in e))
                );
            }
            function Pe(e) {
                return null !== e && ('function' == typeof e || 'object' == typeof e);
            }
            function Me(...e) {}
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
                            factory: () => Ae(je),
                        })),
                        (e.__NG_ELEMENT_ID__ = () => Be()),
                        e
                    );
                })(),
                Be = Me,
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
                                                                n instanceof we || n == we
                                                                    ? (r |= 1)
                                                                    : n instanceof Ce ||
                                                                      n == Ce
                                                                    ? (r &= -3)
                                                                    : n instanceof be ||
                                                                      n == be
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
                                                a = n.deps,
                                                u = $e;
                                            if (a.length) {
                                                u = [];
                                                for (let t = 0; t < a.length; t++) {
                                                    const n = a[t],
                                                        s = n.options,
                                                        i =
                                                            2 & s
                                                                ? r.get(n.token)
                                                                : void 0;
                                                    u.push(
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
                                            n.value = o = s ? new i(...u) : i.apply(t, u);
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
                ft = Me;
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
                vt = Me,
                wt = (function() {
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
            class bt {}
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
                Tt = !1;
            function St() {
                return (Tt = !0), xt;
            }
            class At {
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
            const kt = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
                It = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
            function Nt(e) {
                return (e = String(e)).match(kt) || e.match(It)
                    ? e
                    : (St() &&
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
            function Ot(...e) {
                const t = {};
                for (const n of e) for (const e in n) n.hasOwnProperty(e) && (t[e] = !0);
                return t;
            }
            const Dt = Vt('area,br,col,hr,img,wbr'),
                Pt = Vt('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr'),
                Mt = Vt('rp,rt'),
                Rt = Ot(Mt, Pt),
                Ft = Ot(
                    Dt,
                    Ot(
                        Pt,
                        Vt(
                            'address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul',
                        ),
                    ),
                    Ot(
                        Mt,
                        Vt(
                            'a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video',
                        ),
                    ),
                    Rt,
                ),
                jt = Vt('background,cite,href,itemtype,longdesc,poster,src,xlink:href'),
                Ht = Vt('srcset'),
                Lt = Ot(
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
                        jt[s] && (i = Nt(i)),
                            Ht[s] &&
                                ((r = i),
                                (i = (r = String(r))
                                    .split(',')
                                    .map(e => Nt(e.trim()))
                                    .join(', '))),
                            this.buf.push(' ', t, '="', Gt(i), '"');
                    }
                    var r;
                    return this.buf.push('>'), !0;
                }
                endElement(e) {
                    const t = e.nodeName.toLowerCase();
                    Ft.hasOwnProperty(t) &&
                        !Dt.hasOwnProperty(t) &&
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
            class Wt extends T {
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
                Kt = Me,
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
                wn = mn;
            class bn {
                constructor() {
                    (this.compileModuleSync = _n),
                        (this.compileModuleAsync = yn),
                        (this.compileModuleAndAllComponentsSync = vn),
                        (this.compileModuleAndAllComponentsAsync = wn);
                }
                clearCache() {}
                clearCacheFor(e) {}
                getModuleId(e) {}
            }
            class Cn {}
            let En, xn;
            function Tn() {
                const e = ae.wtf;
                return !(!e || !(En = e.trace) || ((xn = En.events), 0));
            }
            const Sn = Tn(),
                An = Sn
                    ? function(e, t = null) {
                          return xn.createScope(e, t);
                      }
                    : (e, t) =>
                          function(e, t) {
                              return null;
                          },
                kn = Sn
                    ? function(e, t) {
                          return En.leaveScope(e, t), t;
                      }
                    : (e, t) => t;
            class In {
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
                                    return Dn(t), e.invokeTask(r, l, s, i);
                                } finally {
                                    Pn(t);
                                }
                            },
                            onInvoke: (e, n, r, l, s, i, o) => {
                                try {
                                    return Dn(t), e.invoke(r, l, s, i, o);
                                } finally {
                                    Pn(t);
                                }
                            },
                            onHasTask: (e, n, r, l) => {
                                e.hasTask(r, l),
                                    n === r &&
                                        ('microTask' == l.change
                                            ? ((t.hasPendingMicrotasks = l.microTask),
                                              On(t))
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
                    if (!In.isInAngularZone())
                        throw new Error('Expected to be in Angular Zone, but it is not!');
                }
                static assertNotInAngularZone() {
                    if (In.isInAngularZone())
                        throw new Error('Expected to not be in Angular Zone, but it is!');
                }
                run(e, t, n) {
                    return this._inner.run(e, t, n);
                }
                runTask(e, t, n, r) {
                    const l = this._inner,
                        s = l.scheduleEventTask('NgZoneEvent: ' + r, e, Vn, Nn, Nn);
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
            function Nn() {}
            const Vn = {};
            function On(e) {
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
            function Dn(e) {
                e._nesting++, e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
            }
            function Pn(e) {
                e._nesting--, On(e);
            }
            class Mn {
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
                                    In.assertNotInAngularZone(),
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
                                ? new Mn()
                                : ('zone.js' === l ? void 0 : l) ||
                                  new In({enableLongStackTrace: St()}),
                        r = [{provide: In, useValue: n}];
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
                            (this._enforceNoNewChanges = St()),
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
                                        In.assertNotInAngularZone(),
                                            he(() => {
                                                this._stable ||
                                                    this._zone.hasPendingMacrotasks ||
                                                    this._zone.hasPendingMicrotasks ||
                                                    ((this._stable = !0), e.next(!0));
                                            });
                                    });
                                });
                                const n = this._zone.onUnstable.subscribe(() => {
                                    In.assertInAngularZone(),
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
                                A(r)
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
                            St() &&
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
                            (this._runningTick = !1), kn(t);
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
                return (e._tickScope = An('ApplicationRef#tick()')), e;
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
                Yn = Me,
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
                    return De(e);
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
                    if ((null == e && (e = []), !De(e)))
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
                    return e instanceof Map || Pe(e);
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
                        if (!(e instanceof Map || Pe(e)))
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
                                deps: [[e, new Ce(), new we()]],
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
                                deps: [[e, new Ce(), new we()]],
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
                wr = new _r([new or()]),
                br = new yr(vr),
                Cr = zn(null, 'core', [
                    {provide: pn, useValue: 'unknown'},
                    {provide: qn, deps: [Le]},
                    {provide: Fn, deps: []},
                    {provide: gn, deps: []},
                ]),
                Er = new re('LocaleId');
            function xr() {
                return wr;
            }
            function Tr() {
                return br;
            }
            function Sr(e) {
                return e || 'en-US';
            }
            class Ar {
                constructor(e) {}
            }
            function kr(e, t, n) {
                const r = e.state,
                    l = 1792 & r;
                return l === t
                    ? ((e.state = (-1793 & r) | n), (e.initIndex = -1), !0)
                    : l === n;
            }
            function Ir(e, t, n) {
                return (
                    (1792 & e.state) === t &&
                    e.initIndex <= n &&
                    ((e.initIndex = n + 1), !0)
                );
            }
            function Nr(e, t) {
                return e.nodes[t];
            }
            function Vr(e, t) {
                return e.nodes[t];
            }
            function Or(e, t) {
                return e.nodes[t];
            }
            function Dr(e, t) {
                return e.nodes[t];
            }
            function Pr(e, t) {
                return e.nodes[t];
            }
            const Mr = {
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
            function Ur(e, t, n, r) {
                if (Ve.isWrapped(r)) {
                    r = Ve.unwrap(r);
                    const l = e.def.nodes[t].bindingIndex + n,
                        s = Ve.unwrap(e.oldValues[l]);
                    e.oldValues[l] = new Ve(s);
                }
                return r;
            }
            const $r = '$$undefined',
                zr = '$$empty';
            function Gr(e) {
                return {
                    id: $r,
                    styles: e.styles,
                    encapsulation: e.encapsulation,
                    data: e.data,
                };
            }
            let qr = 0;
            function Zr(e, t, n, r) {
                return !(!(2 & e.state) && pe(e.oldValues[t.bindingIndex + n], r));
            }
            function Wr(e, t, n, r) {
                return !!Zr(e, t, n, r) && ((e.oldValues[t.bindingIndex + n] = r), !0);
            }
            function Qr(e, t, n, r) {
                const l = e.oldValues[t.bindingIndex + n];
                if (1 & e.state || !Ne(l, r)) {
                    const s = t.bindings[n].name;
                    throw Rr(
                        Mr.createDebugContext(e, t.nodeIndex),
                        `${s}: ${l}`,
                        `${s}: ${r}`,
                        0 != (1 & e.state),
                    );
                }
            }
            function Kr(e) {
                let t = e;
                for (; t; )
                    2 & t.def.flags && (t.state |= 8),
                        (t = t.viewContainerParent || t.parent);
            }
            function Jr(e, t) {
                let n = e;
                for (; n && n !== t; )
                    (n.state |= 64), (n = n.viewContainerParent || n.parent);
            }
            function Yr(e, t, n, r) {
                try {
                    return (
                        Kr(33554432 & e.def.nodes[t].flags ? Vr(e, t).componentView : e),
                        Mr.handleEvent(e, t, n, r)
                    );
                } catch (l) {
                    e.root.errorHandler.handleError(l);
                }
            }
            function Xr(e) {
                return e.parent ? Vr(e.parent, e.parentNodeDef.nodeIndex) : null;
            }
            function el(e) {
                return e.parent ? e.parentNodeDef.parent : null;
            }
            function tl(e, t) {
                switch (201347067 & t.flags) {
                    case 1:
                        return Vr(e, t.nodeIndex).renderElement;
                    case 2:
                        return Nr(e, t.nodeIndex).renderText;
                }
            }
            function nl(e) {
                return !!e.parent && !!(32768 & e.parentNodeDef.flags);
            }
            function rl(e) {
                return !(!e.parent || 32768 & e.parentNodeDef.flags);
            }
            function ll(e) {
                return 1 << e % 32;
            }
            function sl(e) {
                const t = {};
                let n = 0;
                const r = {};
                return (
                    e &&
                        e.forEach(([e, l]) => {
                            'number' == typeof e
                                ? ((t[e] = l), (n |= ll(e)))
                                : (r[e] = l);
                        }),
                    {matchedQueries: t, references: r, matchedQueryIds: n}
                );
            }
            function il(e, t) {
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
            function ol(e, t, n) {
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
            const al = new WeakMap();
            function ul(e) {
                let t = al.get(e);
                return t || (((t = e(() => Hr)).factory = e), al.set(e, t)), t;
            }
            function cl(e, t, n, r, l) {
                3 === t && (n = e.renderer.parentNode(tl(e, e.def.lastRenderRootNode))),
                    dl(e, t, 0, e.def.nodes.length - 1, n, r, l);
            }
            function dl(e, t, n, r, l, s, i) {
                for (let o = n; o <= r; o++) {
                    const n = e.def.nodes[o];
                    11 & n.flags && pl(e, n, t, l, s, i), (o += n.childCount);
                }
            }
            function hl(e, t, n, r, l, s) {
                let i = e;
                for (; i && !nl(i); ) i = i.parent;
                const o = i.parent,
                    a = el(i),
                    u = a.nodeIndex + a.childCount;
                for (let c = a.nodeIndex + 1; c <= u; c++) {
                    const e = o.def.nodes[c];
                    e.ngContentIndex === t && pl(o, e, n, r, l, s), (c += e.childCount);
                }
                if (!o.parent) {
                    const i = e.root.projectableNodes[t];
                    if (i) for (let t = 0; t < i.length; t++) fl(e, i[t], n, r, l, s);
                }
            }
            function pl(e, t, n, r, l, s) {
                if (8 & t.flags) hl(e, t.ngContent.index, n, r, l, s);
                else {
                    const i = tl(e, t);
                    if (
                        (3 === n && 33554432 & t.flags && 48 & t.bindingFlags
                            ? (16 & t.bindingFlags && fl(e, i, n, r, l, s),
                              32 & t.bindingFlags &&
                                  fl(Vr(e, t.nodeIndex).componentView, i, n, r, l, s))
                            : fl(e, i, n, r, l, s),
                        16777216 & t.flags)
                    ) {
                        const i = Vr(e, t.nodeIndex).viewContainer._embeddedViews;
                        for (let e = 0; e < i.length; e++) cl(i[e], n, r, l, s);
                    }
                    1 & t.flags &&
                        !t.element.name &&
                        dl(e, n, t.nodeIndex + 1, t.nodeIndex + t.childCount, r, l, s);
                }
            }
            function fl(e, t, n, r, l, s) {
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
            const gl = /^:([^:]+):(.+)$/;
            function ml(e) {
                if (':' === e[0]) {
                    const t = e.match(gl);
                    return [t[1], t[2]];
                }
                return ['', e];
            }
            function _l(e) {
                let t = 0;
                for (let n = 0; n < e.length; n++) t |= e[n].flags;
                return t;
            }
            function yl(e, t, n, r, l, s) {
                e |= 1;
                const {matchedQueries: i, references: o, matchedQueryIds: a} = sl(t);
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
            function vl(e, t, n, r, l, s, i = [], o, a, u, c, d) {
                u || (u = Hr);
                const {matchedQueries: h, references: p, matchedQueryIds: f} = sl(n);
                let g = null,
                    m = null;
                s && ([g, m] = ml(s)), (o = o || []);
                const _ = new Array(o.length);
                for (let w = 0; w < o.length; w++) {
                    const [e, t, n] = o[w],
                        [r, l] = ml(t);
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
                    _[w] = {
                        flags: e,
                        ns: r,
                        name: l,
                        nonMinifiedName: l,
                        securityContext: s,
                        suffix: i,
                    };
                }
                a = a || [];
                const y = new Array(a.length);
                for (let w = 0; w < a.length; w++) {
                    const [e, t] = a[w];
                    y[w] = {type: 0, target: e, eventName: t, propName: null};
                }
                const v = (i = i || []).map(([e, t]) => {
                    const [n, r] = ml(e);
                    return [n, r, t];
                });
                return (
                    (d = (function(e) {
                        if (e && e.id === $r) {
                            const t =
                                (null != e.encapsulation &&
                                    e.encapsulation !== ye.None) ||
                                e.styles.length ||
                                Object.keys(e.data).length;
                            e.id = t ? `c${qr++}` : zr;
                        }
                        return e && e.id === zr && (e = null), e || null;
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
                        bindingFlags: _l(_),
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
            function wl(e, t, n) {
                const r = n.element,
                    l = e.root.selectorOrNode,
                    s = e.renderer;
                let i;
                if (e.parent || !l) {
                    i = r.name ? s.createElement(r.name, r.ns) : s.createComment('');
                    const l = ol(e, t, n);
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
                        a = Cl(
                            e,
                            n.nodeIndex,
                            ((s = o.eventName), (l = o.target) ? `${l}:${s}` : s),
                        );
                    let u = o.target,
                        c = e;
                    'component' === o.target && ((u = null), (c = t));
                    const d = c.renderer.listen(u || r, o.eventName, a);
                    e.disposables[n.outputIndex + i] = d;
                }
                var l, s;
            }
            function Cl(e, t, n) {
                return r => Yr(e, t, n, r);
            }
            function El(e, t, n, r) {
                if (!Wr(e, t, n, r)) return !1;
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
                            const a = e.renderer;
                            null != s
                                ? a.setAttribute(n, l, o, r)
                                : a.removeAttribute(n, l, r);
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
                            let s = e.root.sanitizer.sanitize(wt.STYLE, l);
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
            const xl = new Object(),
                Tl = Br(Le),
                Sl = Br(je),
                Al = Br(dt);
            function kl(e, t, n, r) {
                return (
                    (n = _e(n)),
                    {index: -1, deps: il(r, fe(t)), flags: e, token: t, value: n}
                );
            }
            function Il(e, t, n = Le.THROW_IF_NOT_FOUND) {
                const r = Se(e);
                try {
                    if (8 & t.flags) return t.token;
                    if ((2 & t.flags && (n = null), 1 & t.flags))
                        return e._parent.get(t.token, n);
                    const i = t.tokenKey;
                    switch (i) {
                        case Tl:
                        case Sl:
                        case Al:
                            return e;
                    }
                    const o = e._def.providersByKey[i];
                    let a;
                    if (o) {
                        let t = e._providers[o.index];
                        return (
                            void 0 === t && (t = e._providers[o.index] = Nl(e, o)),
                            t === xl ? void 0 : t
                        );
                    }
                    if (
                        (a = ne(t.token)) &&
                        ((l = e),
                        null != (s = a).providedIn &&
                            ((function(e, t) {
                                return e._def.modules.indexOf(s.providedIn) > -1;
                            })(l) ||
                                ('root' === s.providedIn && l._def.isRoot)))
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
                            (e._providers[n] = xl),
                            (e._providers[n] = Nl(e, e._def.providersByKey[t.tokenKey]))
                        );
                    }
                    return 4 & t.flags ? n : e._parent.get(t.token, n);
                } finally {
                    Se(r);
                }
                var l, s;
            }
            function Nl(e, t) {
                let n;
                switch (201347067 & t.flags) {
                    case 512:
                        n = (function(e, t, n) {
                            const r = n.length;
                            switch (r) {
                                case 0:
                                    return new t();
                                case 1:
                                    return new t(Il(e, n[0]));
                                case 2:
                                    return new t(Il(e, n[0]), Il(e, n[1]));
                                case 3:
                                    return new t(Il(e, n[0]), Il(e, n[1]), Il(e, n[2]));
                                default:
                                    const l = new Array(r);
                                    for (let t = 0; t < r; t++) l[t] = Il(e, n[t]);
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
                                    return t(Il(e, n[0]));
                                case 2:
                                    return t(Il(e, n[0]), Il(e, n[1]));
                                case 3:
                                    return t(Il(e, n[0]), Il(e, n[1]), Il(e, n[2]));
                                default:
                                    const l = Array(r);
                                    for (let t = 0; t < r; t++) l[t] = Il(e, n[t]);
                                    return t(...l);
                            }
                        })(e, t.value, t.deps);
                        break;
                    case 2048:
                        n = Il(e, t.deps[0]);
                        break;
                    case 256:
                        n = t.value;
                }
                return (
                    n === xl ||
                        null == n ||
                        'object' != typeof n ||
                        131072 & t.flags ||
                        'function' != typeof n.ngOnDestroy ||
                        (t.flags |= 131072),
                    void 0 === n ? xl : n
                );
            }
            function Vl(e, t) {
                const n = e.viewContainer._embeddedViews;
                if (((null == t || t >= n.length) && (t = n.length - 1), t < 0))
                    return null;
                const r = n[t];
                return (
                    (r.viewContainerParent = null),
                    Ml(n, t),
                    Mr.dirtyParentQueries(r),
                    Dl(r),
                    r
                );
            }
            function Ol(e, t, n) {
                const r = t ? tl(t, t.def.lastRenderRootNode) : e.renderElement,
                    l = n.renderer.parentNode(r),
                    s = n.renderer.nextSibling(r);
                cl(n, 2, l, s, void 0);
            }
            function Dl(e) {
                cl(e, 3, null, null, void 0);
            }
            function Pl(e, t, n) {
                t >= e.length ? e.push(n) : e.splice(t, 0, n);
            }
            function Ml(e, t) {
                t >= e.length - 1 ? e.pop() : e.splice(t, 1);
            }
            const Rl = new Object();
            function Fl(e, t, n, r, l, s) {
                return new jl(e, t, n, r, l, s);
            }
            class jl extends lt {
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
                        i = Mr.createRootView(e, t || [], n, l, r, Rl),
                        o = Or(i, s).instance;
                    return (
                        n &&
                            i.renderer.setAttribute(
                                Vr(i, 0).renderElement,
                                'ng-version',
                                Et.full,
                            ),
                        new Hl(i, new $l(i), o)
                    );
                }
            }
            class Hl extends rt {
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
                    return new Zl(this._view, this._elDef);
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
            function Ll(e, t, n) {
                return new Bl(e, t, n);
            }
            class Bl {
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
                    return new Zl(this._view, this._elDef);
                }
                get parentInjector() {
                    let e = this._view,
                        t = this._elDef.parent;
                    for (; !t && e; ) (t = el(e)), (e = e.parent);
                    return e ? new Zl(e, t) : new Zl(this._view, null);
                }
                clear() {
                    for (let e = this._embeddedViews.length - 1; e >= 0; e--) {
                        const t = Vl(this._data, e);
                        Mr.destroyView(t);
                    }
                }
                get(e) {
                    const t = this._embeddedViews[e];
                    if (t) {
                        const e = new $l(t);
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
                                Pl(l, n, r),
                                (function(e, t) {
                                    const n = Xr(t);
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
                                Mr.dirtyParentQueries(r),
                                Ol(t, n > 0 ? l[n - 1] : null, r);
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
                                Pl(l, r, s),
                                Mr.dirtyParentQueries(s),
                                Dl(s),
                                Ol(e, r > 0 ? l[r - 1] : null, s);
                        })(this._data, 0, t),
                        e
                    );
                }
                indexOf(e) {
                    return this._embeddedViews.indexOf(e._view);
                }
                remove(e) {
                    const t = Vl(this._data, e);
                    t && Mr.destroyView(t);
                }
                detach(e) {
                    const t = Vl(this._data, e);
                    return t ? new $l(t) : null;
                }
            }
            function Ul(e) {
                return new $l(e);
            }
            class $l {
                constructor(e) {
                    (this._view = e),
                        (this._viewContainerRef = null),
                        (this._appRef = null);
                }
                get rootNodes() {
                    return (function(e) {
                        const t = [];
                        return cl(e, 0, void 0, void 0, t), t;
                    })(this._view);
                }
                get context() {
                    return this._view.context;
                }
                get destroyed() {
                    return 0 != (128 & this._view.state);
                }
                markForCheck() {
                    Kr(this._view);
                }
                detach() {
                    this._view.state &= -5;
                }
                detectChanges() {
                    const e = this._view.root.rendererFactory;
                    e.begin && e.begin();
                    try {
                        Mr.checkAndUpdateView(this._view);
                    } finally {
                        e.end && e.end();
                    }
                }
                checkNoChanges() {
                    Mr.checkNoChangesView(this._view);
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
                        Mr.destroyView(this._view);
                }
                detachFromAppRef() {
                    (this._appRef = null),
                        Dl(this._view),
                        Mr.dirtyParentQueries(this._view);
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
            function zl(e, t) {
                return new Gl(e, t);
            }
            class Gl extends Qt {
                constructor(e, t) {
                    super(), (this._parentView = e), (this._def = t);
                }
                createEmbeddedView(e) {
                    return new $l(
                        Mr.createEmbeddedView(
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
            function ql(e, t) {
                return new Zl(e, t);
            }
            class Zl {
                constructor(e, t) {
                    (this.view = e), (this.elDef = t);
                }
                get(e, t = Le.THROW_IF_NOT_FOUND) {
                    return Mr.resolveDep(
                        this.view,
                        this.elDef,
                        !!this.elDef && 0 != (33554432 & this.elDef.flags),
                        {flags: 0, token: e, tokenKey: Br(e)},
                        t,
                    );
                }
            }
            function Wl(e, t) {
                const n = e.def.nodes[t];
                if (1 & n.flags) {
                    const t = Vr(e, n.nodeIndex);
                    return n.element.template ? t.template : t.renderElement;
                }
                if (2 & n.flags) return Nr(e, n.nodeIndex).renderText;
                if (20240 & n.flags) return Or(e, n.nodeIndex).instance;
                throw new Error(`Illegal state: read nodeValue for node index ${t}`);
            }
            function Ql(e) {
                return new Kl(e.renderer);
            }
            class Kl {
                constructor(e) {
                    this.delegate = e;
                }
                selectRootElement(e) {
                    return this.delegate.selectRootElement(e);
                }
                createElement(e, t) {
                    const [n, r] = ml(t),
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
                    const [r, l] = ml(t);
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
            function Jl(e, t, n, r) {
                return new Yl(e, t, n, r);
            }
            class Yl {
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
                                4096 & l.flags || (void 0 === n[r] && (n[r] = Nl(e, l)));
                            }
                        })(this);
                }
                get(e, t = Le.THROW_IF_NOT_FOUND, n = Ee.Default) {
                    let r = 0;
                    return (
                        n & Ee.SkipSelf ? (r |= 1) : n & Ee.Self && (r |= 4),
                        Il(this, {token: e, tokenKey: Br(e), flags: r}, t)
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
                            for (let l = 0; l < n.providers.length; l++)
                                if (131072 & n.providers[l].flags) {
                                    const t = e._providers[l];
                                    if (t && t !== xl) {
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
            const Xl = Br(gt),
                es = Br(yt),
                ts = Br(pt),
                ns = Br(Jn),
                rs = Br(Qt),
                ls = Br(Xn),
                ss = Br(Le),
                is = Br(je);
            function os(e, t, n, r, l, s, i, o) {
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
                return cs(e, (t |= 16384), n, r, l, l, s, a, u);
            }
            function as(e, t, n) {
                return cs(-1, (e |= 16), null, 0, t, t, n);
            }
            function us(e, t, n, r, l) {
                return cs(-1, e, t, 0, n, r, l);
            }
            function cs(e, t, n, r, l, s, i, o, a) {
                const {matchedQueries: u, references: c, matchedQueryIds: d} = sl(n);
                a || (a = []), o || (o = []), (s = _e(s));
                const h = il(i, fe(l));
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
                    bindingFlags: _l(o),
                    outputs: a,
                    element: null,
                    provider: {token: l, value: s, deps: h},
                    text: null,
                    query: null,
                    ngContent: null,
                };
            }
            function ds(e, t) {
                return gs(e, t);
            }
            function hs(e, t) {
                let n = e;
                for (; n.parent && !nl(n); ) n = n.parent;
                return ms(n.parent, el(n), !0, t.provider.value, t.provider.deps);
            }
            function ps(e, t) {
                const n = ms(
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
                        if (!an(s))
                            throw new Error(
                                `@Output ${l.propName} not initialized in '${n.constructor.name}'.`,
                            );
                        {
                            const n = s.subscribe(fs(e, t.parent.nodeIndex, l.eventName));
                            e.disposables[t.outputIndex + r] = n.unsubscribe.bind(n);
                        }
                    }
                return n;
            }
            function fs(e, t, n) {
                return r => Yr(e, t, n, r);
            }
            function gs(e, t) {
                const n = (8192 & t.flags) > 0,
                    r = t.provider;
                switch (201347067 & t.flags) {
                    case 512:
                        return ms(e, t.parent, n, r.value, r.deps);
                    case 1024:
                        return (function(e, t, n, r, l) {
                            const s = l.length;
                            switch (s) {
                                case 0:
                                    return r();
                                case 1:
                                    return r(ys(e, t, n, l[0]));
                                case 2:
                                    return r(ys(e, t, n, l[0]), ys(e, t, n, l[1]));
                                case 3:
                                    return r(
                                        ys(e, t, n, l[0]),
                                        ys(e, t, n, l[1]),
                                        ys(e, t, n, l[2]),
                                    );
                                default:
                                    const i = Array(s);
                                    for (let r = 0; r < s; r++) i[r] = ys(e, t, n, l[r]);
                                    return r(...i);
                            }
                        })(e, t.parent, n, r.value, r.deps);
                    case 2048:
                        return ys(e, t.parent, n, r.deps[0]);
                    case 256:
                        return r.value;
                }
            }
            function ms(e, t, n, r, l) {
                const s = l.length;
                switch (s) {
                    case 0:
                        return new r();
                    case 1:
                        return new r(ys(e, t, n, l[0]));
                    case 2:
                        return new r(ys(e, t, n, l[0]), ys(e, t, n, l[1]));
                    case 3:
                        return new r(
                            ys(e, t, n, l[0]),
                            ys(e, t, n, l[1]),
                            ys(e, t, n, l[2]),
                        );
                    default:
                        const i = new Array(s);
                        for (let r = 0; r < s; r++) i[r] = ys(e, t, n, l[r]);
                        return new r(...i);
                }
            }
            const _s = {};
            function ys(e, t, n, r, l = Le.THROW_IF_NOT_FOUND) {
                if (8 & r.flags) return r.token;
                const s = e;
                2 & r.flags && (l = null);
                const i = r.tokenKey;
                i === ls && (n = !(!t || !t.element.componentView)),
                    t && 1 & r.flags && ((n = !1), (t = t.parent));
                let o = e;
                for (; o; ) {
                    if (t)
                        switch (i) {
                            case Xl:
                                return Ql(vs(o, t, n));
                            case es:
                                return vs(o, t, n).renderer;
                            case ts:
                                return new pt(Vr(o, t.nodeIndex).renderElement);
                            case ns:
                                return Vr(o, t.nodeIndex).viewContainer;
                            case rs:
                                if (t.element.template)
                                    return Vr(o, t.nodeIndex).template;
                                break;
                            case ls:
                                return Ul(vs(o, t, n));
                            case ss:
                            case is:
                                return ql(o, t);
                            default:
                                const e = (n
                                    ? t.element.allProviders
                                    : t.element.publicProviders)[i];
                                if (e) {
                                    let t = Or(o, e.nodeIndex);
                                    return (
                                        t ||
                                            ((t = {instance: gs(o, e)}),
                                            (o.nodes[e.nodeIndex] = t)),
                                        t.instance
                                    );
                                }
                        }
                    (n = nl(o)), (t = el(o)), (o = o.parent), 4 & r.flags && (o = null);
                }
                const a = s.root.injector.get(r.token, _s);
                return a !== _s || l === _s
                    ? a
                    : s.root.ngModule.injector.get(r.token, l);
            }
            function vs(e, t, n) {
                let r;
                if (n) r = Vr(e, t.nodeIndex).componentView;
                else for (r = e; r.parent && !nl(r); ) r = r.parent;
                return r;
            }
            function ws(e, t, n, r, l, s) {
                if (32768 & n.flags) {
                    const t = Vr(e, n.parent.nodeIndex).componentView;
                    2 & t.def.flags && (t.state |= 8);
                }
                if (((t.instance[n.bindings[r].name] = l), 524288 & n.flags)) {
                    s = s || {};
                    const t = Ve.unwrap(e.oldValues[n.bindingIndex + r]);
                    s[n.bindings[r].nonMinifiedName] = new Oe(t, l, 0 != (2 & e.state));
                }
                return (e.oldValues[n.bindingIndex + r] = l), s;
            }
            function bs(e, t) {
                if (!(e.def.nodeFlags & t)) return;
                const n = e.def.nodes;
                let r = 0;
                for (let l = 0; l < n.length; l++) {
                    const s = n[l];
                    let i = s.parent;
                    for (
                        !i && s.flags & t && Es(e, l, s.flags & t, r++),
                            0 == (s.childFlags & t) && (l += s.childCount);
                        i && 1 & i.flags && l === i.nodeIndex + i.childCount;

                    )
                        i.directChildFlags & t && (r = Cs(e, i, t, r)), (i = i.parent);
                }
            }
            function Cs(e, t, n, r) {
                for (let l = t.nodeIndex + 1; l <= t.nodeIndex + t.childCount; l++) {
                    const t = e.def.nodes[l];
                    t.flags & n && Es(e, l, t.flags & n, r++), (l += t.childCount);
                }
                return r;
            }
            function Es(e, t, n, r) {
                const l = Or(e, t);
                if (!l) return;
                const s = l.instance;
                s &&
                    (Mr.setCurrentNode(e, t),
                    1048576 & n && Ir(e, 512, r) && s.ngAfterContentInit(),
                    2097152 & n && s.ngAfterContentChecked(),
                    4194304 & n && Ir(e, 768, r) && s.ngAfterViewInit(),
                    8388608 & n && s.ngAfterViewChecked(),
                    131072 & n && s.ngOnDestroy());
            }
            function xs(e, t, n) {
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
                    query: {id: t, filterId: ll(t), bindings: r},
                    ngContent: null,
                };
            }
            function Ts(e) {
                const t = e.def.nodeMatchedQueries;
                for (; e.parent && rl(e); ) {
                    let n = e.parentNodeDef;
                    e = e.parent;
                    const r = n.nodeIndex + n.childCount;
                    for (let l = 0; l <= r; l++) {
                        const r = e.def.nodes[l];
                        67108864 & r.flags &&
                            536870912 & r.flags &&
                            (r.query.filterId & t) === r.query.filterId &&
                            Pr(e, l).setDirty(),
                            (!(1 & r.flags && l + r.childCount < n.nodeIndex) &&
                                67108864 & r.childFlags &&
                                536870912 & r.childFlags) ||
                                (l += r.childCount);
                    }
                }
                if (134217728 & e.def.nodeFlags)
                    for (let n = 0; n < e.def.nodes.length; n++) {
                        const t = e.def.nodes[n];
                        134217728 & t.flags && 536870912 & t.flags && Pr(e, n).setDirty(),
                            (n += t.childCount);
                    }
            }
            function Ss(e, t) {
                const n = Pr(e, t.nodeIndex);
                if (!n.dirty) return;
                let r,
                    l = void 0;
                if (67108864 & t.flags) {
                    const n = t.parent.parent;
                    (l = As(e, n.nodeIndex, n.nodeIndex + n.childCount, t.query, [])),
                        (r = Or(e, t.parent.nodeIndex).instance);
                } else
                    134217728 & t.flags &&
                        ((l = As(e, 0, e.def.nodes.length - 1, t.query, [])),
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
            function As(e, t, n, r, l) {
                for (let s = t; s <= n; s++) {
                    const t = e.def.nodes[s],
                        n = t.matchedQueries[r.id];
                    if (
                        (null != n && l.push(ks(e, t, n)),
                        1 & t.flags &&
                            t.element.template &&
                            (t.element.template.nodeMatchedQueries & r.filterId) ===
                                r.filterId)
                    ) {
                        const n = Vr(e, s);
                        if (
                            ((t.childMatchedQueries & r.filterId) === r.filterId &&
                                (As(e, s + 1, s + t.childCount, r, l),
                                (s += t.childCount)),
                            16777216 & t.flags)
                        ) {
                            const e = n.viewContainer._embeddedViews;
                            for (let t = 0; t < e.length; t++) {
                                const s = e[t],
                                    i = Xr(s);
                                i && i === n && As(s, 0, s.def.nodes.length - 1, r, l);
                            }
                        }
                        const i = n.template._projectedViews;
                        if (i)
                            for (let e = 0; e < i.length; e++) {
                                const t = i[e];
                                As(t, 0, t.def.nodes.length - 1, r, l);
                            }
                    }
                    (t.childMatchedQueries & r.filterId) !== r.filterId &&
                        (s += t.childCount);
                }
                return l;
            }
            function ks(e, t, n) {
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
                            return Or(e, t.nodeIndex).instance;
                    }
            }
            function Is(e, t, n) {
                const r = ol(e, t, n);
                r && hl(e, n.ngContent.index, 1, r, null, void 0);
            }
            function Ns(e, t) {
                return (function(e, t, n) {
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
                        flags: 128,
                        childFlags: 0,
                        directChildFlags: 0,
                        childMatchedQueries: 0,
                        matchedQueries: {},
                        matchedQueryIds: 0,
                        references: {},
                        ngContentIndex: -1,
                        childCount: 0,
                        bindings: r,
                        bindingFlags: _l(r),
                        outputs: [],
                        element: null,
                        provider: null,
                        text: null,
                        query: null,
                        ngContent: null,
                    };
                })(0, e, new Array(t + 1));
            }
            function Vs(e, t, n) {
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
            function Os(e, t, n) {
                let r;
                const l = e.renderer;
                r = l.createText(n.text.prefix);
                const s = ol(e, t, n);
                return s && l.appendChild(s, r), {renderText: r};
            }
            function Ds(e, t) {
                return (null != e ? e.toString() : '') + t.suffix;
            }
            function Ps(e, t, n, r) {
                let l = 0,
                    s = 0,
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
                        (e.bindingIndex = l),
                        (e.outputIndex = s),
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
                        (Rs(u, e, t.length),
                        (l += e.bindings.length),
                        (s += e.outputs.length),
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
                        (u = e), Ms(e) || (c = e);
                    else
                        for (; u && f === u.nodeIndex + u.childCount; ) {
                            const e = u.parent;
                            e &&
                                ((e.childFlags |= u.childFlags),
                                (e.childMatchedQueries |= u.childMatchedQueries)),
                                (c = (u = e) && Ms(u) ? u.renderParent : u);
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
                    handleEvent: (e, n, r, l) => t[n].element.handleEvent(e, r, l),
                    bindingCount: l,
                    outputCount: s,
                    lastRenderRootNode: p,
                };
            }
            function Ms(e) {
                return 0 != (1 & e.flags) && null === e.element.name;
            }
            function Rs(e, t, n) {
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
            function Fs(e, t, n, r) {
                const l = Ls(e.root, e.renderer, e, t, n);
                return Bs(l, e.component, r), Us(l), l;
            }
            function js(e, t, n) {
                const r = Ls(e, e.renderer, null, null, t);
                return Bs(r, n, n), Us(r), r;
            }
            function Hs(e, t, n, r) {
                const l = t.element.componentRendererType;
                let s;
                return (
                    (s = l
                        ? e.root.rendererFactory.createRenderer(r, l)
                        : e.root.renderer),
                    Ls(e.root, s, e, t.element.componentProvider, n)
                );
            }
            function Ls(e, t, n, r, l) {
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
            function Bs(e, t, n) {
                (e.component = t), (e.context = n);
            }
            function Us(e) {
                let t;
                nl(e) &&
                    (t = Vr(e.parent, e.parentNodeDef.parent.nodeIndex).renderElement);
                const n = e.def,
                    r = e.nodes;
                for (let l = 0; l < n.nodes.length; l++) {
                    const s = n.nodes[l];
                    let i;
                    switch ((Mr.setCurrentNode(e, l), 201347067 & s.flags)) {
                        case 1:
                            const n = wl(e, t, s);
                            let o = void 0;
                            if (33554432 & s.flags) {
                                const t = ul(s.element.componentView);
                                o = Mr.createComponentView(e, s, t, n);
                            }
                            bl(e, o, s, n),
                                (i = {
                                    renderElement: n,
                                    componentView: o,
                                    viewContainer: null,
                                    template: s.element.template ? zl(e, s) : void 0,
                                }),
                                16777216 & s.flags && (i.viewContainer = Ll(e, s, i));
                            break;
                        case 2:
                            i = Os(e, t, s);
                            break;
                        case 512:
                        case 1024:
                        case 2048:
                        case 256:
                            (i = r[l]) || 4096 & s.flags || (i = {instance: ds(e, s)});
                            break;
                        case 16:
                            i = {instance: hs(e, s)};
                            break;
                        case 16384:
                            (i = r[l]) || (i = {instance: ps(e, s)}),
                                32768 & s.flags &&
                                    Bs(
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
                            Is(e, t, s), (i = void 0);
                    }
                    r[l] = i;
                }
                Js(e, Ks.CreateViewNodes), ti(e, 201326592, 268435456, 0);
            }
            function $s(e) {
                qs(e),
                    Mr.updateDirectives(e, 1),
                    Ys(e, Ks.CheckNoChanges),
                    Mr.updateRenderer(e, 1),
                    Js(e, Ks.CheckNoChanges),
                    (e.state &= -97);
            }
            function zs(e) {
                1 & e.state ? ((e.state &= -2), (e.state |= 2)) : (e.state &= -3),
                    kr(e, 0, 256),
                    qs(e),
                    Mr.updateDirectives(e, 0),
                    Ys(e, Ks.CheckAndUpdate),
                    ti(e, 67108864, 536870912, 0);
                let t = kr(e, 256, 512);
                bs(e, 2097152 | (t ? 1048576 : 0)),
                    Mr.updateRenderer(e, 0),
                    Js(e, Ks.CheckAndUpdate),
                    ti(e, 134217728, 536870912, 0),
                    bs(e, 8388608 | ((t = kr(e, 512, 768)) ? 4194304 : 0)),
                    2 & e.def.flags && (e.state &= -9),
                    (e.state &= -97),
                    kr(e, 768, 1024);
            }
            function Gs(e, t, n, r, l, s, i, o, a, u, c, d, h) {
                return 0 === n
                    ? (function(e, t, n, r, l, s, i, o, a, u, c, d) {
                          switch (201347067 & t.flags) {
                              case 1:
                                  return (function(e, t, n, r, l, s, i, o, a, u, c, d) {
                                      const h = t.bindings.length;
                                      let p = !1;
                                      return (
                                          h > 0 && El(e, t, 0, n) && (p = !0),
                                          h > 1 && El(e, t, 1, r) && (p = !0),
                                          h > 2 && El(e, t, 2, l) && (p = !0),
                                          h > 3 && El(e, t, 3, s) && (p = !0),
                                          h > 4 && El(e, t, 4, i) && (p = !0),
                                          h > 5 && El(e, t, 5, o) && (p = !0),
                                          h > 6 && El(e, t, 6, a) && (p = !0),
                                          h > 7 && El(e, t, 7, u) && (p = !0),
                                          h > 8 && El(e, t, 8, c) && (p = !0),
                                          h > 9 && El(e, t, 9, d) && (p = !0),
                                          p
                                      );
                                  })(e, t, n, r, l, s, i, o, a, u, c, d);
                              case 2:
                                  return (function(e, t, n, r, l, s, i, o, a, u, c, d) {
                                      let h = !1;
                                      const p = t.bindings,
                                          f = p.length;
                                      if (
                                          (f > 0 && Wr(e, t, 0, n) && (h = !0),
                                          f > 1 && Wr(e, t, 1, r) && (h = !0),
                                          f > 2 && Wr(e, t, 2, l) && (h = !0),
                                          f > 3 && Wr(e, t, 3, s) && (h = !0),
                                          f > 4 && Wr(e, t, 4, i) && (h = !0),
                                          f > 5 && Wr(e, t, 5, o) && (h = !0),
                                          f > 6 && Wr(e, t, 6, a) && (h = !0),
                                          f > 7 && Wr(e, t, 7, u) && (h = !0),
                                          f > 8 && Wr(e, t, 8, c) && (h = !0),
                                          f > 9 && Wr(e, t, 9, d) && (h = !0),
                                          h)
                                      ) {
                                          let h = t.text.prefix;
                                          f > 0 && (h += Ds(n, p[0])),
                                              f > 1 && (h += Ds(r, p[1])),
                                              f > 2 && (h += Ds(l, p[2])),
                                              f > 3 && (h += Ds(s, p[3])),
                                              f > 4 && (h += Ds(i, p[4])),
                                              f > 5 && (h += Ds(o, p[5])),
                                              f > 6 && (h += Ds(a, p[6])),
                                              f > 7 && (h += Ds(u, p[7])),
                                              f > 8 && (h += Ds(c, p[8])),
                                              f > 9 && (h += Ds(d, p[9]));
                                          const g = Nr(e, t.nodeIndex).renderText;
                                          e.renderer.setValue(g, h);
                                      }
                                      return h;
                                  })(e, t, n, r, l, s, i, o, a, u, c, d);
                              case 16384:
                                  return (function(e, t, n, r, l, s, i, o, a, u, c, d) {
                                      const h = Or(e, t.nodeIndex),
                                          p = h.instance;
                                      let f = !1,
                                          g = void 0;
                                      const m = t.bindings.length;
                                      return (
                                          m > 0 &&
                                              Zr(e, t, 0, n) &&
                                              ((f = !0), (g = ws(e, h, t, 0, n, g))),
                                          m > 1 &&
                                              Zr(e, t, 1, r) &&
                                              ((f = !0), (g = ws(e, h, t, 1, r, g))),
                                          m > 2 &&
                                              Zr(e, t, 2, l) &&
                                              ((f = !0), (g = ws(e, h, t, 2, l, g))),
                                          m > 3 &&
                                              Zr(e, t, 3, s) &&
                                              ((f = !0), (g = ws(e, h, t, 3, s, g))),
                                          m > 4 &&
                                              Zr(e, t, 4, i) &&
                                              ((f = !0), (g = ws(e, h, t, 4, i, g))),
                                          m > 5 &&
                                              Zr(e, t, 5, o) &&
                                              ((f = !0), (g = ws(e, h, t, 5, o, g))),
                                          m > 6 &&
                                              Zr(e, t, 6, a) &&
                                              ((f = !0), (g = ws(e, h, t, 6, a, g))),
                                          m > 7 &&
                                              Zr(e, t, 7, u) &&
                                              ((f = !0), (g = ws(e, h, t, 7, u, g))),
                                          m > 8 &&
                                              Zr(e, t, 8, c) &&
                                              ((f = !0), (g = ws(e, h, t, 8, c, g))),
                                          m > 9 &&
                                              Zr(e, t, 9, d) &&
                                              ((f = !0), (g = ws(e, h, t, 9, d, g))),
                                          g && p.ngOnChanges(g),
                                          65536 & t.flags &&
                                              Ir(e, 256, t.nodeIndex) &&
                                              p.ngOnInit(),
                                          262144 & t.flags && p.ngDoCheck(),
                                          f
                                      );
                                  })(e, t, n, r, l, s, i, o, a, u, c, d);
                              case 32:
                              case 64:
                              case 128:
                                  return (function(e, t, n, r, l, s, i, o, a, u, c, d) {
                                      const h = t.bindings;
                                      let p = !1;
                                      const f = h.length;
                                      if (
                                          (f > 0 && Wr(e, t, 0, n) && (p = !0),
                                          f > 1 && Wr(e, t, 1, r) && (p = !0),
                                          f > 2 && Wr(e, t, 2, l) && (p = !0),
                                          f > 3 && Wr(e, t, 3, s) && (p = !0),
                                          f > 4 && Wr(e, t, 4, i) && (p = !0),
                                          f > 5 && Wr(e, t, 5, o) && (p = !0),
                                          f > 6 && Wr(e, t, 6, a) && (p = !0),
                                          f > 7 && Wr(e, t, 7, u) && (p = !0),
                                          f > 8 && Wr(e, t, 8, c) && (p = !0),
                                          f > 9 && Wr(e, t, 9, d) && (p = !0),
                                          p)
                                      ) {
                                          const p = Dr(e, t.nodeIndex);
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
                                                      f > 6 && (g[6] = a),
                                                      f > 7 && (g[7] = u),
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
                                                              a,
                                                          );
                                                          break;
                                                      case 8:
                                                          g = e.transform(
                                                              r,
                                                              l,
                                                              s,
                                                              i,
                                                              o,
                                                              a,
                                                              u,
                                                          );
                                                          break;
                                                      case 9:
                                                          g = e.transform(
                                                              r,
                                                              l,
                                                              s,
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
                                                              l,
                                                              s,
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
                                  })(e, t, n, r, l, s, i, o, a, u, c, d);
                              default:
                                  throw 'unreachable';
                          }
                      })(e, t, r, l, s, i, o, a, u, c, d, h)
                    : (function(e, t, n) {
                          switch (201347067 & t.flags) {
                              case 1:
                                  return (function(e, t, n) {
                                      let r = !1;
                                      for (let l = 0; l < n.length; l++)
                                          El(e, t, l, n[l]) && (r = !0);
                                      return r;
                                  })(e, t, n);
                              case 2:
                                  return (function(e, t, n) {
                                      const r = t.bindings;
                                      let l = !1;
                                      for (let s = 0; s < n.length; s++)
                                          Wr(e, t, s, n[s]) && (l = !0);
                                      if (l) {
                                          let l = '';
                                          for (let e = 0; e < n.length; e++)
                                              l += Ds(n[e], r[e]);
                                          l = t.text.prefix + l;
                                          const s = Nr(e, t.nodeIndex).renderText;
                                          e.renderer.setValue(s, l);
                                      }
                                      return l;
                                  })(e, t, n);
                              case 16384:
                                  return (function(e, t, n) {
                                      const r = Or(e, t.nodeIndex),
                                          l = r.instance;
                                      let s = !1,
                                          i = void 0;
                                      for (let o = 0; o < n.length; o++)
                                          Zr(e, t, o, n[o]) &&
                                              ((s = !0), (i = ws(e, r, t, o, n[o], i)));
                                      return (
                                          i && l.ngOnChanges(i),
                                          65536 & t.flags &&
                                              Ir(e, 256, t.nodeIndex) &&
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
                                          Wr(e, t, s, n[s]) && (l = !0);
                                      if (l) {
                                          const l = Dr(e, t.nodeIndex);
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
            function qs(e) {
                const t = e.def;
                if (4 & t.nodeFlags)
                    for (let n = 0; n < t.nodes.length; n++) {
                        const r = t.nodes[n];
                        if (4 & r.flags) {
                            const t = Vr(e, n).template._projectedViews;
                            if (t)
                                for (let n = 0; n < t.length; n++) {
                                    const r = t[n];
                                    (r.state |= 32), Jr(r, e);
                                }
                        } else 0 == (4 & r.childFlags) && (n += r.childCount);
                    }
            }
            function Zs(e, t, n, r, l, s, i, o, a, u, c, d, h) {
                return (
                    0 === n
                        ? (function(e, t, n, r, l, s, i, o, a, u, c, d) {
                              const h = t.bindings.length;
                              h > 0 && Qr(e, t, 0, n),
                                  h > 1 && Qr(e, t, 1, r),
                                  h > 2 && Qr(e, t, 2, l),
                                  h > 3 && Qr(e, t, 3, s),
                                  h > 4 && Qr(e, t, 4, i),
                                  h > 5 && Qr(e, t, 5, o),
                                  h > 6 && Qr(e, t, 6, a),
                                  h > 7 && Qr(e, t, 7, u),
                                  h > 8 && Qr(e, t, 8, c),
                                  h > 9 && Qr(e, t, 9, d);
                          })(e, t, r, l, s, i, o, a, u, c, d, h)
                        : (function(e, t, n) {
                              for (let r = 0; r < n.length; r++) Qr(e, t, r, n[r]);
                          })(e, t, r),
                    !1
                );
            }
            function Ws(e, t) {
                if (Pr(e, t.nodeIndex).dirty)
                    throw Rr(
                        Mr.createDebugContext(e, t.nodeIndex),
                        `Query ${t.query.id} not dirty`,
                        `Query ${t.query.id} dirty`,
                        0 != (1 & e.state),
                    );
            }
            function Qs(e) {
                if (!(128 & e.state)) {
                    if (
                        (Ys(e, Ks.Destroy),
                        Js(e, Ks.Destroy),
                        bs(e, 131072),
                        e.disposables)
                    )
                        for (let t = 0; t < e.disposables.length; t++) e.disposables[t]();
                    !(function(e) {
                        if (!(16 & e.state)) return;
                        const t = Xr(e);
                        if (t) {
                            const n = t.template._projectedViews;
                            n && (Ml(n, n.indexOf(e)), Mr.dirtyParentQueries(e));
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
                                        ? e.renderer.destroyNode(Nr(e, n).renderText)
                                        : (67108864 & t.flags || 134217728 & t.flags) &&
                                          Pr(e, n).destroy();
                                }
                            })(e),
                        nl(e) && e.renderer.destroy(),
                        (e.state |= 128);
                }
            }
            const Ks = (function() {
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
            function Js(e, t) {
                const n = e.def;
                if (33554432 & n.nodeFlags)
                    for (let r = 0; r < n.nodes.length; r++) {
                        const l = n.nodes[r];
                        33554432 & l.flags
                            ? Xs(Vr(e, r).componentView, t)
                            : 0 == (33554432 & l.childFlags) && (r += l.childCount);
                    }
            }
            function Ys(e, t) {
                const n = e.def;
                if (16777216 & n.nodeFlags)
                    for (let r = 0; r < n.nodes.length; r++) {
                        const l = n.nodes[r];
                        if (16777216 & l.flags) {
                            const n = Vr(e, r).viewContainer._embeddedViews;
                            for (let e = 0; e < n.length; e++) Xs(n[e], t);
                        } else 0 == (16777216 & l.childFlags) && (r += l.childCount);
                    }
            }
            function Xs(e, t) {
                const n = e.state;
                switch (t) {
                    case Ks.CheckNoChanges:
                        0 == (128 & n) &&
                            (12 == (12 & n)
                                ? $s(e)
                                : 64 & n && ei(e, Ks.CheckNoChangesProjectedViews));
                        break;
                    case Ks.CheckNoChangesProjectedViews:
                        0 == (128 & n) && (32 & n ? $s(e) : 64 & n && ei(e, t));
                        break;
                    case Ks.CheckAndUpdate:
                        0 == (128 & n) &&
                            (12 == (12 & n)
                                ? zs(e)
                                : 64 & n && ei(e, Ks.CheckAndUpdateProjectedViews));
                        break;
                    case Ks.CheckAndUpdateProjectedViews:
                        0 == (128 & n) && (32 & n ? zs(e) : 64 & n && ei(e, t));
                        break;
                    case Ks.Destroy:
                        Qs(e);
                        break;
                    case Ks.CreateViewNodes:
                        Us(e);
                }
            }
            function ei(e, t) {
                Ys(e, t), Js(e, t);
            }
            function ti(e, t, n, r) {
                if (!(e.def.nodeFlags & t && e.def.nodeFlags & n)) return;
                const l = e.def.nodes.length;
                for (let s = 0; s < l; s++) {
                    const l = e.def.nodes[s];
                    if (l.flags & t && l.flags & n)
                        switch ((Mr.setCurrentNode(e, l.nodeIndex), r)) {
                            case 0:
                                Ss(e, l);
                                break;
                            case 1:
                                Ws(e, l);
                        }
                    (l.childFlags & t && l.childFlags & n) || (s += l.childCount);
                }
            }
            let ni = !1;
            function ri(e, t, n, r, l, s) {
                const i = l.injector.get(mt);
                return js(si(e, l, i, t, n), r, s);
            }
            function li(e, t, n, r, l, s) {
                const i = l.injector.get(mt),
                    o = si(e, l, new Fi(i), t, n),
                    a = gi(r);
                return Mi(bi.create, js, null, [o, a, s]);
            }
            function si(e, t, n, r, l) {
                const s = t.injector.get(bt),
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
            function ii(e, t, n, r) {
                const l = gi(n);
                return Mi(bi.create, Fs, null, [e, t, l, r]);
            }
            function oi(e, t, n, r) {
                return (
                    (n = di.get(t.element.componentProvider.provider.token) || gi(n)),
                    Mi(bi.create, Hs, null, [e, t, n, r])
                );
            }
            function ai(e, t, n, r) {
                return Jl(
                    e,
                    t,
                    n,
                    (function(e) {
                        const {hasOverrides: t, hasDeprecatedOverrides: n} = (function(
                            e,
                        ) {
                            let t = !1,
                                n = !1;
                            return 0 === ui.size
                                ? {hasOverrides: t, hasDeprecatedOverrides: n}
                                : (e.providers.forEach(e => {
                                      const r = ui.get(e.token);
                                      3840 & e.flags &&
                                          r &&
                                          ((t = !0), (n = n || r.deprecatedBehavior));
                                  }),
                                  e.modules.forEach(e => {
                                      ci.forEach((r, l) => {
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
                                      const l = ui.get(r.token);
                                      l &&
                                          ((r.flags = (-3841 & r.flags) | l.flags),
                                          (r.deps = il(l.deps)),
                                          (r.value = l.value));
                                  }
                                  if (ci.size > 0) {
                                      let t = new Set(e.modules);
                                      ci.forEach((r, l) => {
                                          if (t.has(ne(l).providedIn)) {
                                              let t = {
                                                  token: l,
                                                  flags: r.flags | (n ? 4096 : 0),
                                                  deps: il(r.deps),
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
            const ui = new Map(),
                ci = new Map(),
                di = new Map();
            function hi(e) {
                let t;
                ui.set(e.token, e),
                    'function' == typeof e.token &&
                        (t = ne(e.token)) &&
                        'function' == typeof t.providedIn &&
                        ci.set(e.token, e);
            }
            function pi(e, t) {
                const n = ul(t.viewDefFactory),
                    r = ul(n.nodes[0].element.componentView);
                di.set(e, r);
            }
            function fi() {
                ui.clear(), ci.clear(), di.clear();
            }
            function gi(e) {
                if (0 === ui.size) return e;
                const t = (function(e) {
                    const t = [];
                    let n = null;
                    for (let r = 0; r < e.nodes.length; r++) {
                        const l = e.nodes[r];
                        1 & l.flags && (n = l),
                            n &&
                                3840 & l.flags &&
                                ui.has(l.provider.token) &&
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
                                n = ui.get(e.token);
                            n &&
                                ((t.flags = (-3841 & t.flags) | n.flags),
                                (e.deps = il(n.deps)),
                                (e.value = n.value));
                        }
                    }
                }
            }
            function mi(e, t, n, r, l, s, i, o, a, u, c, d, h) {
                const p = e.def.nodes[t];
                return (
                    Gs(e, p, n, r, l, s, i, o, a, u, c, d, h),
                    224 & p.flags ? Dr(e, t).value : void 0
                );
            }
            function _i(e, t, n, r, l, s, i, o, a, u, c, d, h) {
                const p = e.def.nodes[t];
                return (
                    Zs(e, p, n, r, l, s, i, o, a, u, c, d, h),
                    224 & p.flags ? Dr(e, t).value : void 0
                );
            }
            function yi(e) {
                return Mi(bi.detectChanges, zs, null, [e]);
            }
            function vi(e) {
                return Mi(bi.checkNoChanges, $s, null, [e]);
            }
            function wi(e) {
                return Mi(bi.destroy, Qs, null, [e]);
            }
            const bi = (function() {
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
            let Ci, Ei, xi;
            function Ti(e, t) {
                (Ei = e), (xi = t);
            }
            function Si(e, t, n, r) {
                return (
                    Ti(e, t), Mi(bi.handleEvent, e.def.handleEvent, null, [e, t, n, r])
                );
            }
            function Ai(e, t) {
                if (128 & e.state) throw jr(bi[Ci]);
                return (
                    Ti(e, Vi(e, 0)),
                    e.def.updateDirectives(function(e, n, r, ...l) {
                        const s = e.def.nodes[n];
                        return (
                            0 === t ? Ii(e, s, r, l) : Ni(e, s, r, l),
                            16384 & s.flags && Ti(e, Vi(e, n)),
                            224 & s.flags ? Dr(e, s.nodeIndex).value : void 0
                        );
                    }, e)
                );
            }
            function ki(e, t) {
                if (128 & e.state) throw jr(bi[Ci]);
                return (
                    Ti(e, Oi(e, 0)),
                    e.def.updateRenderer(function(e, n, r, ...l) {
                        const s = e.def.nodes[n];
                        return (
                            0 === t ? Ii(e, s, r, l) : Ni(e, s, r, l),
                            3 & s.flags && Ti(e, Oi(e, n)),
                            224 & s.flags ? Dr(e, s.nodeIndex).value : void 0
                        );
                    }, e)
                );
            }
            function Ii(e, t, n, r) {
                if (Gs(e, t, n, ...r)) {
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
                                        ke,
                                        (...e) => '-' + e[1].toLowerCase(),
                                    ))}`)
                                ] = Ie(o));
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
            function Ni(e, t, n, r) {
                Zs(e, t, n, ...r);
            }
            function Vi(e, t) {
                for (let n = t; n < e.def.nodes.length; n++) {
                    const t = e.def.nodes[n];
                    if (16384 & t.flags && t.bindings && t.bindings.length) return n;
                }
                return null;
            }
            function Oi(e, t) {
                for (let n = t; n < e.def.nodes.length; n++) {
                    const t = e.def.nodes[n];
                    if (3 & t.flags && t.bindings && t.bindings.length) return n;
                }
                return null;
            }
            class Di {
                constructor(e, t) {
                    (this.view = e),
                        (this.nodeIndex = t),
                        null == t && (this.nodeIndex = t = 0),
                        (this.nodeDef = e.def.nodes[t]);
                    let n = this.nodeDef,
                        r = e;
                    for (; n && 0 == (1 & n.flags); ) n = n.parent;
                    if (!n) for (; !n && r; ) (n = el(r)), (r = r.parent);
                    (this.elDef = n), (this.elView = r);
                }
                get elOrCompView() {
                    return (
                        Vr(this.elView, this.elDef.nodeIndex).componentView || this.view
                    );
                }
                get injector() {
                    return ql(this.elView, this.elDef);
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
                        Pi(this.elView, this.elDef, e);
                        for (
                            let t = this.elDef.nodeIndex + 1;
                            t <= this.elDef.nodeIndex + this.elDef.childCount;
                            t++
                        ) {
                            const n = this.elView.def.nodes[t];
                            20224 & n.flags && Pi(this.elView, n, e), (t += n.childCount);
                        }
                    }
                    return e;
                }
                get componentRenderElement() {
                    const e = (function(e) {
                        for (; e && !nl(e); ) e = e.parent;
                        return e.parent ? Vr(e.parent, el(e).nodeIndex) : null;
                    })(this.elOrCompView);
                    return e ? e.renderElement : void 0;
                }
                get renderNode() {
                    return 2 & this.nodeDef.flags
                        ? tl(this.view, this.nodeDef)
                        : tl(this.elView, this.elDef);
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
            function Pi(e, t, n) {
                for (let r in t.references) n[r] = ks(e, t, t.references[r]);
            }
            function Mi(e, t, n, r) {
                const l = Ci,
                    s = Ei,
                    i = xi;
                try {
                    Ci = e;
                    const a = t.apply(n, r);
                    return (Ei = s), (xi = i), (Ci = l), a;
                } catch (o) {
                    if (nn(o) || !Ei) throw o;
                    throw (function(e, t) {
                        return (
                            e instanceof Error || (e = new Error(e.toString())),
                            Fr(e, t),
                            e
                        );
                    })(o, Ri());
                }
            }
            function Ri() {
                return Ei ? new Di(Ei, xi) : null;
            }
            class Fi {
                constructor(e) {
                    this.delegate = e;
                }
                createRenderer(e, t) {
                    return new ji(this.delegate.createRenderer(e, t));
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
            class ji {
                constructor(e) {
                    (this.delegate = e),
                        (this.debugContextFactory = Ri),
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
                        r = Ri();
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
            function Hi(e, t, n) {
                return new Li(e, t, n);
            }
            class Li extends ht {
                constructor(e, t, n) {
                    super(),
                        (this.moduleType = e),
                        (this._bootstrapComponents = t),
                        (this._ngModuleDefFactory = n);
                }
                create(e) {
                    !(function() {
                        if (ni) return;
                        ni = !0;
                        const e = St()
                            ? {
                                  setCurrentNode: Ti,
                                  createRootView: li,
                                  createEmbeddedView: ii,
                                  createComponentView: oi,
                                  createNgModuleRef: ai,
                                  overrideProvider: hi,
                                  overrideComponentView: pi,
                                  clearOverrides: fi,
                                  checkAndUpdateView: yi,
                                  checkNoChangesView: vi,
                                  destroyView: wi,
                                  createDebugContext: (e, t) => new Di(e, t),
                                  handleEvent: Si,
                                  updateDirectives: Ai,
                                  updateRenderer: ki,
                              }
                            : {
                                  setCurrentNode: () => {},
                                  createRootView: ri,
                                  createEmbeddedView: Fs,
                                  createComponentView: Hs,
                                  createNgModuleRef: Jl,
                                  overrideProvider: Hr,
                                  overrideComponentView: Hr,
                                  clearOverrides: Hr,
                                  checkAndUpdateView: zs,
                                  checkNoChangesView: $s,
                                  destroyView: Qs,
                                  createDebugContext: (e, t) => new Di(e, t),
                                  handleEvent: (e, t, n, r) =>
                                      e.def.handleEvent(e, t, n, r),
                                  updateDirectives: (e, t) =>
                                      e.def.updateDirectives(0 === t ? mi : _i, e),
                                  updateRenderer: (e, t) =>
                                      e.def.updateRenderer(0 === t ? mi : _i, e),
                              };
                        (Mr.setCurrentNode = e.setCurrentNode),
                            (Mr.createRootView = e.createRootView),
                            (Mr.createEmbeddedView = e.createEmbeddedView),
                            (Mr.createComponentView = e.createComponentView),
                            (Mr.createNgModuleRef = e.createNgModuleRef),
                            (Mr.overrideProvider = e.overrideProvider),
                            (Mr.overrideComponentView = e.overrideComponentView),
                            (Mr.clearOverrides = e.clearOverrides),
                            (Mr.checkAndUpdateView = e.checkAndUpdateView),
                            (Mr.checkNoChangesView = e.checkNoChangesView),
                            (Mr.destroyView = e.destroyView),
                            (Mr.resolveDep = ys),
                            (Mr.createDebugContext = e.createDebugContext),
                            (Mr.handleEvent = e.handleEvent),
                            (Mr.updateDirectives = e.updateDirectives),
                            (Mr.updateRenderer = e.updateRenderer),
                            (Mr.dirtyParentQueries = Ts);
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
                    return Mr.createNgModuleRef(
                        this.moduleType,
                        e || Le.NULL,
                        this._bootstrapComponents,
                        t,
                    );
                }
            }
            class Bi {}
            class Ui {
                constructor(e) {
                    (this.context = e),
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
                        (this.curve = $i(this.distortion)),
                        (this.started = !1),
                        (this.real = [0, 0, 1, 0, 1]);
                }
                get distortionCompensation() {
                    return 1.2 - this.distortion / 20;
                }
                start() {
                    (this.started = !0), this.context.resume();
                }
                onCurveChange(e) {
                    (this.distortion = e), (this.curve = $i(e));
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
            function $i(e) {
                const t = new Float32Array(44100),
                    n = Math.PI / 180;
                for (let r = 0; r < 44100; ++r) {
                    const l = (2 * r) / 44100 - 1;
                    t[r] = ((3 + e) * l * 20 * n) / (Math.PI + e * Math.abs(l));
                }
                return t;
            }
            function zi(e, t, n, r) {
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
            function Gi(e, t) {
                if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
                    return Reflect.metadata(e, t);
            }
            function qi(...e) {
                let t = e[e.length - 1];
                return A(t) ? (e.pop(), L(e, t)) : G(e);
            }
            function Zi(e, t) {
                return 'function' == typeof t
                    ? n =>
                          n.pipe(
                              Zi((n, r) => B(e(n, r)).pipe(F((e, l) => t(n, e, r, l)))),
                          )
                    : t => t.lift(new Wi(e));
            }
            class Wi {
                constructor(e) {
                    this.project = e;
                }
                call(e, t) {
                    return t.subscribe(new Qi(e, this.project));
                }
            }
            class Qi extends R {
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
                    const l = new k(this, void 0, void 0);
                    this.destination.add(l),
                        (this.innerSubscription = M(this, e, t, n, l));
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
            function Ki(e, t, n = 0) {
                e.cancelAndHoldAtTime
                    ? e.cancelAndHoldAtTime(n)
                    : (e.cancelScheduledValues(n), e.setValueAtTime(Yi(e.value), n)),
                    'number' != typeof t
                        ? t instanceof Array
                            ? (function(e, t, n) {
                                  t.forEach(t => {
                                      'mode' in t
                                          ? Ji(e, t, n)
                                          : e.setValueCurveAtTime(t.value, n, t.duration),
                                          (n += t.duration);
                                  });
                              })(e, t, n)
                            : 'mode' in t
                            ? (e.setValueAtTime(Yi(e.value), n), Ji(e, t, n))
                            : e.setValueCurveAtTime(t.value, n, t.duration)
                        : e.setValueAtTime(Yi(t), n);
            }
            function Ji(e, {value: t, mode: n = 'instant', duration: r}, l) {
                switch (n) {
                    case 'instant':
                        e.setValueAtTime(Yi(t), l), e.setValueAtTime(Yi(t), l + r);
                        break;
                    case 'exponential':
                        t < 0 || t * e.value < 0
                            ? e.linearRampToValueAtTime(Yi(t), l + r)
                            : e.exponentialRampToValueAtTime(Yi(t), l + r),
                            e.setValueAtTime(Yi(t), l + r);
                        break;
                    case 'linear':
                        e.linearRampToValueAtTime(Yi(t), l + r);
                }
            }
            function Yi(e) {
                return e || 1e-8;
            }
            function Xi(e = '') {
                return (t, n) => {
                    Object.defineProperty(t, n, {
                        set(r) {
                            r = 'string' == typeof r ? Number.parseFloat(r) : r;
                            const l =
                                this instanceof AudioWorkletNode
                                    ? this.parameters.get(n)
                                    : this[e];
                            l instanceof AudioParam
                                ? Ki(l, r, this.context.currentTime)
                                : Object.defineProperty(t, n, {value: r});
                        },
                    });
                };
            }
            function eo(e, t, n, r = null, ...l) {
                try {
                    new GainNode(e);
                } catch (s) {
                    const i = e[t]();
                    return Object.setPrototypeOf(i, n.prototype), n.init(i, r, ...l), i;
                }
            }
            class to extends AudioBufferSourceNode {
                constructor(e, t, n) {
                    const r = eo(t, 'createBufferSource', to, null, n, e);
                    if (r) return r;
                    super(t), to.init(this, null, n, e);
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
                    null !== n && e.start();
                    const l = new Wt();
                    (e.ended = l),
                        (e.onended = () => l.emit()),
                        (e.buffer$ = new T()),
                        e.buffer$
                            .pipe(Zi(e => ('string' == typeof e ? r.fetch(e) : qi(e))))
                            .subscribe(t => {
                                e.buffer = t;
                            });
                }
            }
            zi(
                [Xi('detune'), Gi('design:type', Object)],
                to.prototype,
                'detuneParam',
                void 0,
            ),
                zi(
                    [Xi('playbackRate'), Gi('design:type', Object)],
                    to.prototype,
                    'playbackRateParam',
                    void 0,
                );
            const no = new re('Web Audio API context', {
                providedIn: 'root',
                factory: () => new AudioContext(),
            });
            class ro {
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
            ro.ngInjectableDef = te({
                factory: function() {
                    return new ro(Ae(no));
                },
                token: ro,
                providedIn: 'root',
            });
            const lo = new re('Web Audio API audio node', {factory: () => null});
            class so extends h {
                constructor(e, t) {
                    super();
                }
                schedule(e, t = 0) {
                    return this;
                }
            }
            class io extends so {
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
            const oo = (function() {
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
            class ao extends oo {
                constructor(e, t = oo.now) {
                    super(e, () =>
                        ao.delegate && ao.delegate !== this ? ao.delegate.now() : t(),
                    ),
                        (this.actions = []),
                        (this.active = !1),
                        (this.scheduled = void 0);
                }
                schedule(e, t = 0, n) {
                    return ao.delegate && ao.delegate !== this
                        ? ao.delegate.schedule(e, t, n)
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
            const uo = new ao(io);
            function co(e = 0, t = uo) {
                var n;
                return (
                    (a((n = e)) || !(n - parseFloat(n) + 1 >= 0) || e < 0) && (e = 0),
                    (t && 'function' == typeof t.schedule) || (t = uo),
                    new v(
                        n => (
                            n.add(
                                t.schedule(ho, e, {subscriber: n, counter: 0, period: e}),
                            ),
                            n
                        ),
                    )
                );
            }
            function ho(e) {
                const {subscriber: t, counter: n, period: r} = e;
                t.next(n), this.schedule({subscriber: t, counter: n + 1, period: r}, r);
            }
            class po extends io {
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
            class fo extends ao {
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
            const go = new fo(po);
            function mo(e) {
                return t => t.lift(new _o(e));
            }
            class _o {
                constructor(e) {
                    this.value = e;
                }
                call(e, t) {
                    return t.subscribe(new yo(e, this.value));
                }
            }
            class yo extends g {
                constructor(e, t) {
                    super(e), (this.value = t);
                }
                _next(e) {
                    this.destination.next(this.value);
                }
            }
            function vo(e, t, n) {
                return function(r) {
                    return r.lift(new wo(e, t, n));
                };
            }
            class wo {
                constructor(e, t, n) {
                    (this.nextOrObserver = e), (this.error = t), (this.complete = n);
                }
                call(e, t) {
                    return t.subscribe(
                        new bo(e, this.nextOrObserver, this.error, this.complete),
                    );
                }
            }
            class bo extends g {
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
            function Co(e, t) {
                e && t && e.connect(t);
            }
            class Eo extends AnalyserNode {
                constructor(e, t) {
                    const n = eo(e, 'createAnalyser', Eo, t);
                    if (n) return n;
                    super(e), Eo.init(this, t);
                }
                ngOnDestroy() {
                    this.disconnect();
                }
                static init(e, t) {
                    Co(t, e),
                        (e.frequencyByte$ = co(0, go).pipe(
                            mo(new Uint8Array(e.frequencyBinCount)),
                            F(t =>
                                t.length === e.frequencyBinCount
                                    ? t
                                    : new Uint8Array(e.frequencyBinCount),
                            ),
                            vo(t => e.getByteFrequencyData(t)),
                        )),
                        (e.frequencyFloat$ = co(0, go).pipe(
                            mo(new Float32Array(e.frequencyBinCount)),
                            F(t =>
                                t.length === e.frequencyBinCount
                                    ? t
                                    : new Float32Array(e.frequencyBinCount),
                            ),
                            vo(t => e.getFloatFrequencyData(t)),
                        )),
                        (e.timeByte$ = co(0, go).pipe(
                            mo(new Uint8Array(e.fftSize)),
                            F(t =>
                                t.length === e.fftSize
                                    ? t
                                    : new Uint8Array(e.frequencyBinCount),
                            ),
                            vo(t => e.getByteTimeDomainData(t)),
                        )),
                        (e.timeFloat$ = co(0, go).pipe(
                            mo(new Float32Array(e.fftSize)),
                            F(t =>
                                t.length === e.fftSize
                                    ? t
                                    : new Float32Array(e.frequencyBinCount),
                            ),
                            vo(t => e.getFloatTimeDomainData(t)),
                        ));
                }
            }
            class xo extends GainNode {
                set waOutput(e) {
                    this.disconnect(), Co(this, e);
                }
                constructor(e, t) {
                    const n = eo(e, 'createGain', xo, t);
                    if (n) return n;
                    super(e), xo.init(this, t);
                }
                ngOnDestroy() {
                    this.disconnect();
                }
                static init(e, t) {
                    Co(t, e);
                }
            }
            class To {}
            class So {}
            const Ao = new re('appBaseHref');
            class ko {
                constructor(e) {
                    (this._subject = new Wt()), (this._platformStrategy = e);
                    const t = this._platformStrategy.getBaseHref();
                    (this._baseHref = ko.stripTrailingSlash(Io(t))),
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
                    return this.path() == this.normalize(e + ko.normalizeQueryParams(t));
                }
                normalize(e) {
                    return ko.stripTrailingSlash(
                        (function(e, t) {
                            return e && t.startsWith(e) ? t.substring(e.length) : t;
                        })(this._baseHref, Io(e)),
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
            function Io(e) {
                return e.replace(/\/index.html$/, '');
            }
            class No extends So {
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
                    return ko.joinWithSlash(this._baseHref, e);
                }
                path(e = !1) {
                    const t =
                            this._platformLocation.pathname +
                            ko.normalizeQueryParams(this._platformLocation.search),
                        n = this._platformLocation.hash;
                    return n && e ? `${t}${n}` : t;
                }
                pushState(e, t, n, r) {
                    const l = this.prepareExternalUrl(n + ko.normalizeQueryParams(r));
                    this._platformLocation.pushState(e, t, l);
                }
                replaceState(e, t, n, r) {
                    const l = this.prepareExternalUrl(n + ko.normalizeQueryParams(r));
                    this._platformLocation.replaceState(e, t, l);
                }
                forward() {
                    this._platformLocation.forward();
                }
                back() {
                    this._platformLocation.back();
                }
            }
            const Vo = void 0;
            var Oo = [
                'en',
                [['a', 'p'], ['AM', 'PM'], Vo],
                [['AM', 'PM'], Vo, Vo],
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
                Vo,
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
                Vo,
                [['B', 'A'], ['BC', 'AD'], ['Before Christ', 'Anno Domini']],
                0,
                [6, 0],
                ['M/d/yy', 'MMM d, y', 'MMMM d, y', 'EEEE, MMMM d, y'],
                ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
                ['{1}, {0}', Vo, "{1} 'at' {0}", Vo],
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
            const Do = {},
                Po = (function() {
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
                Mo = new re('UseV4Plurals');
            class Ro {}
            class Fo extends Ro {
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
                                      let n = Do[t];
                                      if (n) return n;
                                      const r = t.split('-')[0];
                                      if ((n = Do[r])) return n;
                                      if ('en' === r) return Oo;
                                      throw new Error(
                                          `Missing locale data for the locale "${e}".`,
                                      );
                                  })(e)[18];
                              })(t || this.locale)(e)
                    ) {
                        case Po.Zero:
                            return 'zero';
                        case Po.One:
                            return 'one';
                        case Po.Two:
                            return 'two';
                        case Po.Few:
                            return 'few';
                        case Po.Many:
                            return 'many';
                        default:
                            return 'other';
                    }
                }
            }
            class jo {
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
            class Ho {
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
                    St() &&
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
                                    new jo(null, this._ngForOf, -1, -1),
                                    r,
                                ),
                                l = new Lo(e, n);
                            t.push(l);
                        } else if (null == r) this._viewContainer.remove(n);
                        else {
                            const l = this._viewContainer.get(n);
                            this._viewContainer.move(l, r);
                            const s = new Lo(e, l);
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
            class Lo {
                constructor(e, t) {
                    (this.record = e), (this.view = t);
                }
            }
            class Bo {
                constructor(e, t) {
                    (this._viewContainer = e),
                        (this._context = new Uo()),
                        (this._thenTemplateRef = null),
                        (this._elseTemplateRef = null),
                        (this._thenViewRef = null),
                        (this._elseViewRef = null),
                        (this._thenTemplateRef = t);
                }
                set ngIf(e) {
                    (this._context.$implicit = this._context.ngIf = e),
                        this._updateView();
                }
                set ngIfThen(e) {
                    $o('ngIfThen', e),
                        (this._thenTemplateRef = e),
                        (this._thenViewRef = null),
                        this._updateView();
                }
                set ngIfElse(e) {
                    $o('ngIfElse', e),
                        (this._elseTemplateRef = e),
                        (this._elseViewRef = null),
                        this._updateView();
                }
                _updateView() {
                    this._context.$implicit
                        ? this._thenViewRef ||
                          (this._viewContainer.clear(),
                          (this._elseViewRef = null),
                          this._thenTemplateRef &&
                              (this._thenViewRef = this._viewContainer.createEmbeddedView(
                                  this._thenTemplateRef,
                                  this._context,
                              )))
                        : this._elseViewRef ||
                          (this._viewContainer.clear(),
                          (this._thenViewRef = null),
                          this._elseTemplateRef &&
                              (this._elseViewRef = this._viewContainer.createEmbeddedView(
                                  this._elseTemplateRef,
                                  this._context,
                              )));
                }
                static ngTemplateGuard_ngIf(e, t) {
                    return !0;
                }
            }
            class Uo {
                constructor() {
                    (this.$implicit = null), (this.ngIf = null);
                }
            }
            function $o(e, t) {
                if (t && !t.createEmbeddedView)
                    throw new Error(
                        `${e} must be a TemplateRef, but received '${fe(t)}'.`,
                    );
            }
            class zo {
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
            class Go {
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
            class qo {
                constructor(e, t, n) {
                    (this.ngSwitch = n), n._addCase(), (this._view = new zo(e, t));
                }
                ngDoCheck() {
                    this._view.enforceState(this.ngSwitch._matchCase(this.ngSwitchCase));
                }
            }
            class Zo {}
            const Wo = new re('DocumentToken'),
                Qo = 'server';
            class Ko extends MediaElementAudioSourceNode {
                constructor(e, {nativeElement: t}) {
                    try {
                        new GainNode(e);
                    } catch (n) {
                        const r = e.createMediaElementSource(t);
                        return Object.setPrototypeOf(r, Ko.prototype), r;
                    }
                    super(e, {mediaElement: t});
                }
                ngOnDestroy() {
                    this.disconnect();
                }
            }
            class Jo extends OscillatorNode {
                constructor(e, t) {
                    const n = eo(e, 'createOscillator', Jo, null, t);
                    if (n) return n;
                    super(e), Jo.init(this, null, t);
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
                    Co(t, e), null !== n && e.start();
                    const r = new Wt();
                    (e.ended = r), (e.onended = () => r.emit());
                }
            }
            zi(
                [Xi('detune'), Gi('design:type', Object)],
                Jo.prototype,
                'detuneParam',
                void 0,
            ),
                zi(
                    [Xi('frequency'), Gi('design:type', Object)],
                    Jo.prototype,
                    'frequencyParam',
                    void 0,
                );
            class Yo extends GainNode {
                constructor(e, t) {
                    const n = eo(e, 'createGain', Yo, t);
                    if (n) return n;
                    super(e), Yo.init(this, t);
                }
                ngOnDestroy() {
                    this.disconnect();
                }
                static init(e, t) {
                    Co(t, e);
                }
            }
            function Xo(e, t) {
                return new v(n => {
                    const r = e.length;
                    if (0 === r) return void n.complete();
                    const l = new Array(r);
                    let s = 0,
                        i = 0;
                    for (let o = 0; o < r; o++) {
                        const a = B(e[o]);
                        let u = !1;
                        n.add(
                            a.subscribe({
                                next: e => {
                                    u || ((u = !0), i++), (l[o] = e);
                                },
                                error: e => n.error(e),
                                complete: () => {
                                    (++s !== r && u) ||
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
            zi(
                [Xi('gain'), Gi('design:type', Object)],
                Yo.prototype,
                'gainParam',
                void 0,
            );
            let ea = null;
            function ta() {
                return ea;
            }
            class na {
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
            class ra extends na {
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
            const la = {
                    class: 'className',
                    innerHtml: 'innerHTML',
                    readonly: 'readOnly',
                    tabindex: 'tabIndex',
                },
                sa = 3,
                ia = {
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
                oa = {
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
            let aa;
            ae.Node &&
                (aa =
                    ae.Node.prototype.contains ||
                    function(e) {
                        return !!(16 & this.compareDocumentPosition(e));
                    });
            class ua extends ra {
                parse(e) {
                    throw new Error('parse not implemented');
                }
                static makeCurrent() {
                    var e;
                    (e = new ua()), ea || (ea = e);
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
                    return la;
                }
                contains(e, t) {
                    return aa.call(e, t);
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
                            e.location === sa && oa.hasOwnProperty(t) && (t = oa[t]));
                    }
                    return ia[t] || t;
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
                        da || (da = document.querySelector('base'))
                            ? da.getAttribute('href')
                            : null;
                    return null == t
                        ? null
                        : ((n = t),
                          ca || (ca = document.createElement('a')),
                          ca.setAttribute('href', n),
                          '/' === ca.pathname.charAt(0)
                              ? ca.pathname
                              : '/' + ca.pathname);
                    var n;
                }
                resetBaseElement() {
                    da = null;
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
            let ca,
                da = null;
            const ha = Wo;
            function pa() {
                return !!window.history.pushState;
            }
            const fa = (function() {
                    class e extends To {
                        constructor(e) {
                            super(), (this._doc = e), this._init();
                        }
                        _init() {
                            (this.location = ta().getLocation()),
                                (this._history = ta().getHistory());
                        }
                        getBaseHrefFromDOM() {
                            return ta().getBaseHref(this._doc);
                        }
                        onPopState(e) {
                            ta()
                                .getGlobalEventTarget(this._doc, 'window')
                                .addEventListener('popstate', e, !1);
                        }
                        onHashChange(e) {
                            ta()
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
                            pa()
                                ? this._history.pushState(e, t, n)
                                : (this.location.hash = n);
                        }
                        replaceState(e, t, n) {
                            pa()
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
                            {type: void 0, decorators: [{type: ve, args: [ha]}]},
                        ]),
                        e
                    );
                })(),
                ga = new re('TRANSITION_ID');
            function ma(e, t, n) {
                return () => {
                    n.get(cn).donePromise.then(() => {
                        const n = ta();
                        Array.prototype.slice
                            .apply(n.querySelectorAll(t, 'style[ng-transition]'))
                            .filter(t => n.getAttribute(t, 'ng-transition') === e)
                            .forEach(e => n.remove(e));
                    });
                };
            }
            const _a = [{provide: un, useFactory: ma, deps: [ga, ha, Le], multi: !0}];
            class ya {
                static init() {
                    var e;
                    (e = new ya()), (Ln = e);
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
                        ? ta().isShadowRoot(t)
                            ? this.findTestabilityInTree(e, ta().getHost(t), !0)
                            : this.findTestabilityInTree(e, ta().parentElement(t), !0)
                        : null;
                }
            }
            function va(e, t) {
                ('undefined' != typeof COMPILED && COMPILED) ||
                    ((ae.ng = ae.ng || {})[e] = t);
            }
            const wa = {ApplicationRef: Wn, NgZone: In};
            function ba(e) {
                return sr(e);
            }
            const Ca = new re('EventManagerPlugins');
            class Ea {
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
            class xa {
                constructor(e) {
                    this._doc = e;
                }
                addGlobalEventListener(e, t, n) {
                    const r = ta().getGlobalEventTarget(this._doc, e);
                    if (!r)
                        throw new Error(`Unsupported event target ${r} for event ${t}`);
                    return this.addEventListener(r, t, n);
                }
            }
            class Ta {
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
            class Sa extends Ta {
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
                    this._styleNodes.forEach(e => ta().remove(e));
                }
            }
            const Aa = {
                    svg: 'http://www.w3.org/2000/svg',
                    xhtml: 'http://www.w3.org/1999/xhtml',
                    xlink: 'http://www.w3.org/1999/xlink',
                    xml: 'http://www.w3.org/XML/1998/namespace',
                    xmlns: 'http://www.w3.org/2000/xmlns/',
                },
                ka = /%COMP%/g,
                Ia = '_nghost-%COMP%',
                Na = '_ngcontent-%COMP%';
            function Va(e, t, n) {
                for (let r = 0; r < t.length; r++) {
                    let l = t[r];
                    Array.isArray(l) ? Va(e, l, n) : ((l = l.replace(ka, e)), n.push(l));
                }
                return n;
            }
            function Oa(e) {
                return t => {
                    !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
                };
            }
            class Da {
                constructor(e, t, n) {
                    (this.eventManager = e),
                        (this.sharedStylesHost = t),
                        (this.appId = n),
                        (this.rendererByCompId = new Map()),
                        (this.defaultRenderer = new Pa(e));
                }
                createRenderer(e, t) {
                    if (!e || !t) return this.defaultRenderer;
                    switch (t.encapsulation) {
                        case ye.Emulated: {
                            let n = this.rendererByCompId.get(t.id);
                            return (
                                n ||
                                    ((n = new Fa(
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
                            return new ja(this.eventManager, this.sharedStylesHost, e, t);
                        default:
                            if (!this.rendererByCompId.has(t.id)) {
                                const e = Va(t.id, t.styles, []);
                                this.sharedStylesHost.addStyles(e),
                                    this.rendererByCompId.set(t.id, this.defaultRenderer);
                            }
                            return this.defaultRenderer;
                    }
                }
                begin() {}
                end() {}
            }
            class Pa {
                constructor(e) {
                    (this.eventManager = e), (this.data = Object.create(null));
                }
                destroy() {}
                createElement(e, t) {
                    return t
                        ? document.createElementNS(Aa[t], e)
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
                        const l = Aa[r];
                        l ? e.setAttributeNS(l, t, n) : e.setAttribute(t, n);
                    } else e.setAttribute(t, n);
                }
                removeAttribute(e, t, n) {
                    if (n) {
                        const r = Aa[n];
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
                    Ra(t, 'property'), (e[t] = n);
                }
                setValue(e, t) {
                    e.nodeValue = t;
                }
                listen(e, t, n) {
                    return (
                        Ra(t, 'listener'),
                        'string' == typeof e
                            ? this.eventManager.addGlobalEventListener(e, t, Oa(n))
                            : this.eventManager.addEventListener(e, t, Oa(n))
                    );
                }
            }
            const Ma = '@'.charCodeAt(0);
            function Ra(e, t) {
                if (e.charCodeAt(0) === Ma)
                    throw new Error(
                        `Found the synthetic ${t} ${e}. Please include either "BrowserAnimationsModule" or "NoopAnimationsModule" in your application.`,
                    );
            }
            class Fa extends Pa {
                constructor(e, t, n, r) {
                    super(e), (this.component = n);
                    const l = Va(r + '-' + n.id, n.styles, []);
                    t.addStyles(l),
                        (this.contentAttr = Na.replace(ka, r + '-' + n.id)),
                        (this.hostAttr = Ia.replace(ka, r + '-' + n.id));
                }
                applyToHost(e) {
                    super.setAttribute(e, this.hostAttr, '');
                }
                createElement(e, t) {
                    const n = super.createElement(e, t);
                    return super.setAttribute(n, this.contentAttr, ''), n;
                }
            }
            class ja extends Pa {
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
                    const l = Va(r.id, r.styles, []);
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
            const Ha =
                    ('undefined' != typeof Zone && Zone.__symbol__) ||
                    function(e) {
                        return '__zone_symbol__' + e;
                    },
                La = Ha('addEventListener'),
                Ba = Ha('removeEventListener'),
                Ua = {},
                $a = 'FALSE',
                za = 'ANGULAR',
                Ga = 'addEventListener',
                qa = 'removeEventListener',
                Za = '__zone_symbol__propagationStopped',
                Wa = '__zone_symbol__stopImmediatePropagation';
            let Qa;
            'undefined' != typeof Zone && Zone[Ha('BLACK_LISTED_EVENTS')] && (Qa = {});
            const Ka = function(e) {
                    return !!Qa && Qa.hasOwnProperty(e);
                },
                Ja = function(e) {
                    const t = Ua[e.type];
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
                        for (let n = 0; n < t.length && !0 !== e[Za]; n++) {
                            const e = t[n];
                            e.zone !== Zone.current
                                ? e.zone.run(e.handler, this, r)
                                : e.handler.apply(this, r);
                        }
                    }
                };
            class Ya extends xa {
                constructor(e, t, n) {
                    super(e),
                        (this.ngZone = t),
                        (n &&
                            (function(e) {
                                return e === Qo;
                            })(n)) ||
                            this.patchEvent();
                }
                patchEvent() {
                    if ('undefined' == typeof Event || !Event || !Event.prototype) return;
                    if (Event.prototype[Wa]) return;
                    const e = (Event.prototype[Wa] =
                        Event.prototype.stopImmediatePropagation);
                    Event.prototype.stopImmediatePropagation = function() {
                        this && (this[Za] = !0), e && e.apply(this, arguments);
                    };
                }
                supports(e) {
                    return !0;
                }
                addEventListener(e, t, n) {
                    let r = n;
                    if (!e[La] || (In.isInAngularZone() && !Ka(t))) e[Ga](t, r, !1);
                    else {
                        let n = Ua[t];
                        n || (n = Ua[t] = Ha(za + t + $a));
                        let l = e[n];
                        const s = l && l.length > 0;
                        l || (l = e[n] = []);
                        const i = Ka(t) ? Zone.root : Zone.current;
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
                        s || e[La](t, Ja, !1);
                    }
                    return () => this.removeEventListener(e, t, r);
                }
                removeEventListener(e, t, n) {
                    let r = e[Ba];
                    if (!r) return e[qa].apply(e, [t, n, !1]);
                    let l = Ua[t],
                        s = l && e[l];
                    if (!s) return e[qa].apply(e, [t, n, !1]);
                    let i = !1;
                    for (let o = 0; o < s.length; o++)
                        if (s[o].handler === n) {
                            (i = !0), s.splice(o, 1);
                            break;
                        }
                    i
                        ? 0 === s.length && r.apply(e, [t, Ja, !1])
                        : e[qa].apply(e, [t, n, !1]);
                }
            }
            const Xa = {
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
                eu = new re('HammerGestureConfig'),
                tu = new re('HammerLoader');
            class nu {
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
            class ru extends xa {
                constructor(e, t, n, r) {
                    super(e), (this._config = t), (this.console = n), (this.loader = r);
                }
                supports(e) {
                    return !(
                        (!Xa.hasOwnProperty(e.toLowerCase()) && !this.isCustomEvent(e)) ||
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
            const lu = ['alt', 'control', 'meta', 'shift'],
                su = {
                    alt: e => e.altKey,
                    control: e => e.ctrlKey,
                    meta: e => e.metaKey,
                    shift: e => e.shiftKey,
                };
            class iu extends xa {
                constructor(e) {
                    super(e);
                }
                supports(e) {
                    return null != iu.parseEventName(e);
                }
                addEventListener(e, t, n) {
                    const r = iu.parseEventName(t),
                        l = iu.eventCallback(r.fullKey, n, this.manager.getZone());
                    return this.manager
                        .getZone()
                        .runOutsideAngular(() => ta().onAndCancel(e, r.domEventName, l));
                }
                static parseEventName(e) {
                    const t = e.toLowerCase().split('.'),
                        n = t.shift();
                    if (0 === t.length || ('keydown' !== n && 'keyup' !== n)) return null;
                    const r = iu._normalizeKey(t.pop());
                    let l = '';
                    if (
                        (lu.forEach(e => {
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
                        n = ta().getEventKey(e);
                    return (
                        ' ' === (n = n.toLowerCase())
                            ? (n = 'space')
                            : '.' === n && (n = 'dot'),
                        lu.forEach(r => {
                            r != n && (0, su[r])(e) && (t += r + '.');
                        }),
                        (t += n)
                    );
                }
                static eventCallback(e, t, n) {
                    return r => {
                        iu.getEventFullKey(r) === e && n.runGuarded(() => t(r));
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
            class ou {}
            class au extends ou {
                constructor(e) {
                    super(), (this._doc = e);
                }
                sanitize(e, t) {
                    if (null == t) return null;
                    switch (e) {
                        case wt.NONE:
                            return t;
                        case wt.HTML:
                            return t instanceof cu
                                ? t.changingThisBreaksApplicationSecurity
                                : (this.checkNotSafeValue(t, 'HTML'),
                                  (function(e, t) {
                                      let n = null;
                                      try {
                                          qt = qt || new At(e);
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
                                              St() &&
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
                        case wt.STYLE:
                            return t instanceof du
                                ? t.changingThisBreaksApplicationSecurity
                                : (this.checkNotSafeValue(t, 'Style'),
                                  (function(e) {
                                      if (!(e = String(e).trim())) return '';
                                      const t = e.match(Yt);
                                      return (t && Nt(t[1]) === t[1]) ||
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
                                          : (St() &&
                                                console.warn(
                                                    `WARNING: sanitizing unsafe style value ${e} (see http://g.co/ng/security#xss).`,
                                                ),
                                            'unsafe');
                                  })(t));
                        case wt.SCRIPT:
                            if (t instanceof hu)
                                return t.changingThisBreaksApplicationSecurity;
                            throw (this.checkNotSafeValue(t, 'Script'),
                            new Error('unsafe value used in a script context'));
                        case wt.URL:
                            return t instanceof fu || t instanceof pu
                                ? t.changingThisBreaksApplicationSecurity
                                : (this.checkNotSafeValue(t, 'URL'), Nt(String(t)));
                        case wt.RESOURCE_URL:
                            if (t instanceof fu)
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
                    if (e instanceof uu)
                        throw new Error(
                            `Required a safe ${t}, got a ${e.getTypeName()} ` +
                                '(see http://g.co/ng/security#xss)',
                        );
                }
                bypassSecurityTrustHtml(e) {
                    return new cu(e);
                }
                bypassSecurityTrustStyle(e) {
                    return new du(e);
                }
                bypassSecurityTrustScript(e) {
                    return new hu(e);
                }
                bypassSecurityTrustUrl(e) {
                    return new pu(e);
                }
                bypassSecurityTrustResourceUrl(e) {
                    return new fu(e);
                }
            }
            class uu {
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
            class cu extends uu {
                getTypeName() {
                    return 'HTML';
                }
            }
            class du extends uu {
                getTypeName() {
                    return 'Style';
                }
            }
            class hu extends uu {
                getTypeName() {
                    return 'Script';
                }
            }
            class pu extends uu {
                getTypeName() {
                    return 'URL';
                }
            }
            class fu extends uu {
                getTypeName() {
                    return 'ResourceURL';
                }
            }
            const gu = zn(Cr, 'browser', [
                {provide: pn, useValue: 'browser'},
                {
                    provide: hn,
                    useValue: function() {
                        ua.makeCurrent(), ya.init();
                    },
                    multi: !0,
                },
                {provide: To, useClass: fa, deps: [ha]},
                {
                    provide: ha,
                    useFactory: function() {
                        return document;
                    },
                    deps: [],
                },
            ]);
            function mu() {
                return new sn();
            }
            class _u {
                constructor(e) {
                    if (e)
                        throw new Error(
                            'BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.',
                        );
                }
                static withServerTransition(e) {
                    return {
                        ngModule: _u,
                        providers: [
                            {provide: dn, useValue: e.appId},
                            {provide: ga, useExisting: dn},
                            _a,
                        ],
                    };
                }
            }
            'undefined' != typeof window && window;
            class yu {
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
            class vu extends yu {
                get formDirective() {
                    return null;
                }
                get path() {
                    return null;
                }
            }
            function wu(e) {
                return null == e || 0 === e.length;
            }
            const bu = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
            class Cu {
                static min(e) {
                    return t => {
                        if (wu(t.value) || wu(e)) return null;
                        const n = parseFloat(t.value);
                        return !isNaN(n) && n < e
                            ? {min: {min: e, actual: t.value}}
                            : null;
                    };
                }
                static max(e) {
                    return t => {
                        if (wu(t.value) || wu(e)) return null;
                        const n = parseFloat(t.value);
                        return !isNaN(n) && n > e
                            ? {max: {max: e, actual: t.value}}
                            : null;
                    };
                }
                static required(e) {
                    return wu(e.value) ? {required: !0} : null;
                }
                static requiredTrue(e) {
                    return !0 === e.value ? null : {required: !0};
                }
                static email(e) {
                    return wu(e.value) ? null : bu.test(e.value) ? null : {email: !0};
                }
                static minLength(e) {
                    return t => {
                        if (wu(t.value)) return null;
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
                    if (!e) return Cu.nullValidator;
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
                            if (wu(e.value)) return null;
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
                    const t = e.filter(Eu);
                    return 0 == t.length
                        ? null
                        : function(e) {
                              return Tu(
                                  (function(e, n) {
                                      return t.map(t => t(e));
                                  })(e),
                              );
                          };
                }
                static composeAsync(e) {
                    if (!e) return null;
                    const t = e.filter(Eu);
                    return 0 == t.length
                        ? null
                        : function(e) {
                              return (function(...e) {
                                  if (1 === e.length) {
                                      const t = e[0];
                                      if (a(t)) return Xo(t, null);
                                      if (
                                          u(t) &&
                                          Object.getPrototypeOf(t) === Object.prototype
                                      ) {
                                          const e = Object.keys(t);
                                          return Xo(e.map(e => t[e]), e);
                                      }
                                  }
                                  if ('function' == typeof e[e.length - 1]) {
                                      const t = e.pop();
                                      return Xo(
                                          (e = 1 === e.length && a(e[0]) ? e[0] : e),
                                          null,
                                      ).pipe(F(e => t(...e)));
                                  }
                                  return Xo(e, null);
                              })(
                                  (function(e, n) {
                                      return t.map(t => t(e));
                                  })(e).map(xu),
                              ).pipe(F(Tu));
                          };
                }
            }
            function Eu(e) {
                return null != e;
            }
            function xu(e) {
                const t = on(e) ? B(e) : e;
                if (!an(t))
                    throw new Error(
                        'Expected validator to return Promise or Observable.',
                    );
                return t;
            }
            function Tu(e) {
                const t = e.reduce(
                    (e, t) => (null != t ? Object.assign({}, e, t) : e),
                    {},
                );
                return 0 === Object.keys(t).length ? null : t;
            }
            const Su = new re('NgValueAccessor'),
                Au = new re('CompositionEventMode');
            class ku {
                constructor(e, t, n) {
                    (this._renderer = e),
                        (this._elementRef = t),
                        (this._compositionMode = n),
                        (this.onChange = e => {}),
                        (this.onTouched = () => {}),
                        (this._composing = !1),
                        null == this._compositionMode &&
                            (this._compositionMode = !(function() {
                                const e = ta() ? ta().getUserAgent() : '';
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
            function Iu(e) {
                return e.validate ? t => e.validate(t) : e;
            }
            function Nu(e) {
                return e.validate ? t => e.validate(t) : e;
            }
            function Vu() {
                throw new Error('unimplemented');
            }
            class Ou extends yu {
                constructor() {
                    super(...arguments),
                        (this._parent = null),
                        (this.name = null),
                        (this.valueAccessor = null),
                        (this._rawValidators = []),
                        (this._rawAsyncValidators = []);
                }
                get validator() {
                    return Vu();
                }
                get asyncValidator() {
                    return Vu();
                }
            }
            class Du {
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
            class Pu {
                constructor(e, t, n, r) {
                    (this._renderer = e),
                        (this._elementRef = t),
                        (this._registry = n),
                        (this._injector = r),
                        (this.onChange = () => {}),
                        (this.onTouched = () => {});
                }
                ngOnInit() {
                    (this._control = this._injector.get(Ou)),
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
            class Mu {
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
            const Ru = {
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
            function Fu(e, t) {
                return null == e
                    ? `${t}`
                    : (t && 'object' == typeof t && (t = 'Object'),
                      `${e}: ${t}`.slice(0, 50));
            }
            class ju {
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
                    const n = Fu(t, e);
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
            class Hu {
                constructor(e, t, n) {
                    (this._element = e),
                        (this._renderer = t),
                        (this._select = n),
                        this._select && (this.id = this._select._registerOption());
                }
                set ngValue(e) {
                    null != this._select &&
                        (this._select._optionMap.set(this.id, e),
                        this._setElementValue(Fu(this.id, e)),
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
            function Lu(e, t) {
                return null == e
                    ? `${t}`
                    : ('string' == typeof t && (t = `'${t}'`),
                      t && 'object' == typeof t && (t = 'Object'),
                      `${e}: ${t}`.slice(0, 50));
            }
            class Bu {
                constructor(e, t, n) {
                    (this._element = e),
                        (this._renderer = t),
                        (this._select = n),
                        this._select && (this.id = this._select._registerOption(this));
                }
                set ngValue(e) {
                    null != this._select &&
                        ((this._value = e),
                        this._setElementValue(Lu(this.id, e)),
                        this._select.writeValue(this._select.value));
                }
                set value(e) {
                    this._select
                        ? ((this._value = e),
                          this._setElementValue(Lu(this.id, e)),
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
            function Uu(e, t) {
                return [...t.path, e];
            }
            function $u(e, t) {
                e || Gu(t, 'Cannot find control with'),
                    t.valueAccessor || Gu(t, 'No value accessor for form control with'),
                    (e.validator = Cu.compose([e.validator, t.validator])),
                    (e.asyncValidator = Cu.composeAsync([
                        e.asyncValidator,
                        t.asyncValidator,
                    ])),
                    t.valueAccessor.writeValue(e.value),
                    (function(e, t) {
                        t.valueAccessor.registerOnChange(n => {
                            (e._pendingValue = n),
                                (e._pendingChange = !0),
                                (e._pendingDirty = !0),
                                'change' === e.updateOn && zu(e, t);
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
                                'blur' === e.updateOn && e._pendingChange && zu(e, t),
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
            function zu(e, t) {
                e._pendingDirty && e.markAsDirty(),
                    e.setValue(e._pendingValue, {emitModelToViewChange: !1}),
                    t.viewToModelUpdate(e._pendingValue),
                    (e._pendingChange = !1);
            }
            function Gu(e, t) {
                let n;
                throw ((n =
                    e.path.length > 1
                        ? `path: '${e.path.join(' -> ')}'`
                        : e.path[0]
                        ? `name: '${e.path}'`
                        : 'unspecified name attribute'),
                new Error(`${t} ${n}`));
            }
            function qu(e) {
                return null != e ? Cu.compose(e.map(Iu)) : null;
            }
            function Zu(e) {
                return null != e ? Cu.composeAsync(e.map(Nu)) : null;
            }
            const Wu = [
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
                Mu,
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
                ju,
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
                Pu,
            ];
            class Qu extends vu {
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
                    return Uu(this.name, this._parent);
                }
                get formDirective() {
                    return this._parent ? this._parent.formDirective : null;
                }
                get validator() {
                    return qu(this._validators);
                }
                get asyncValidator() {
                    return Zu(this._asyncValidators);
                }
                _checkParentType() {}
            }
            class Ku {
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
            class Ju extends Ku {
                constructor(e) {
                    super(e);
                }
            }
            const Yu = 'VALID',
                Xu = 'INVALID',
                ec = 'PENDING',
                tc = 'DISABLED';
            function nc(e) {
                const t = lc(e) ? e.validators : e;
                return Array.isArray(t) ? qu(t) : t || null;
            }
            function rc(e, t) {
                const n = lc(t) ? t.asyncValidators : e;
                return Array.isArray(n) ? Zu(n) : n || null;
            }
            function lc(e) {
                return null != e && !Array.isArray(e) && 'object' == typeof e;
            }
            class sc {
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
                    return this.status === Yu;
                }
                get invalid() {
                    return this.status === Xu;
                }
                get pending() {
                    return this.status == ec;
                }
                get disabled() {
                    return this.status === tc;
                }
                get enabled() {
                    return this.status !== tc;
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
                    this.validator = nc(e);
                }
                setAsyncValidators(e) {
                    this.asyncValidator = rc(e);
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
                    (this.status = ec),
                        !1 !== e.emitEvent && this.statusChanges.emit(this.status),
                        this._parent && !e.onlySelf && this._parent.markAsPending(e);
                }
                disable(e = {}) {
                    (this.status = tc),
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
                    (this.status = Yu),
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
                            (this.status !== Yu && this.status !== ec) ||
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
                    this.status = this._allControlsDisabled() ? tc : Yu;
                }
                _runValidator() {
                    return this.validator ? this.validator(this) : null;
                }
                _runAsyncValidator(e) {
                    if (this.asyncValidator) {
                        this.status = ec;
                        const t = xu(this.asyncValidator(this));
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
                                            e instanceof oc
                                                ? e.controls.hasOwnProperty(t)
                                                    ? e.controls[t]
                                                    : null
                                                : (e instanceof ac && e.at(t)) || null,
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
                        ? tc
                        : this.errors
                        ? Xu
                        : this._anyControlsHaveStatus(ec)
                        ? ec
                        : this._anyControlsHaveStatus(Xu)
                        ? Xu
                        : Yu;
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
                    lc(e) && null != e.updateOn && (this._updateOn = e.updateOn);
                }
            }
            class ic extends sc {
                constructor(e = null, t, n) {
                    super(nc(t), rc(n, t)),
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
            class oc extends sc {
                constructor(e, t, n) {
                    super(nc(t), rc(n, t)),
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
                            (e[n] = t instanceof ic ? t.value : t.getRawValue()), e
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
            class ac extends sc {
                constructor(e, t, n) {
                    super(nc(t), rc(n, t)),
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
                        e instanceof ic ? e.value : e.getRawValue(),
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
            const uc = Promise.resolve(null);
            class cc extends vu {
                constructor(e, t) {
                    super(),
                        (this.submitted = !1),
                        (this._directives = []),
                        (this.ngSubmit = new Wt()),
                        (this.form = new oc({}, qu(e), Zu(t)));
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
                    uc.then(() => {
                        const t = this._findContainer(e.path);
                        (e.control = t.registerControl(e.name, e.control)),
                            $u(e.control, e),
                            e.control.updateValueAndValidity({emitEvent: !1}),
                            this._directives.push(e);
                    });
                }
                getControl(e) {
                    return this.form.get(e.path);
                }
                removeControl(e) {
                    uc.then(() => {
                        const t = this._findContainer(e.path);
                        t && t.removeControl(e.name),
                            (function(t, n) {
                                const r = t.indexOf(e);
                                r > -1 && t.splice(r, 1);
                            })(this._directives);
                    });
                }
                addFormGroup(e) {
                    uc.then(() => {
                        const t = this._findContainer(e.path),
                            n = new oc({});
                        (function(e, t) {
                            null == e && Gu(t, 'Cannot find control with'),
                                (e.validator = Cu.compose([e.validator, t.validator])),
                                (e.asyncValidator = Cu.composeAsync([
                                    e.asyncValidator,
                                    t.asyncValidator,
                                ]));
                        })(n, e),
                            t.registerControl(e.name, n),
                            n.updateValueAndValidity({emitEvent: !1});
                    });
                }
                removeFormGroup(e) {
                    uc.then(() => {
                        const t = this._findContainer(e.path);
                        t && t.removeControl(e.name);
                    });
                }
                getFormGroup(e) {
                    return this.form.get(e.path);
                }
                updateModel(e, t) {
                    uc.then(() => {
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
            class dc {
                static modelParentException() {
                    throw new Error(
                        `\n      ngModel cannot be used to register form controls with a parent formGroup directive.  Try using\n      formGroup's partner directive "formControlName" instead.  Example:\n\n      ${Ru.formControlName}\n\n      Or, if you'd like to avoid registering this form control, indicate that it's standalone in ngModelOptions:\n\n      Example:\n\n      ${Ru.ngModelWithFormGroup}`,
                    );
                }
                static formGroupNameException() {
                    throw new Error(
                        `\n      ngModel cannot be used to register form controls with a parent formGroupName or formArrayName directive.\n\n      Option 1: Use formControlName instead of ngModel (reactive strategy):\n\n      ${Ru.formGroupName}\n\n      Option 2:  Update ngModel's parent be ngModelGroup (template-driven strategy):\n\n      ${Ru.ngModelGroup}`,
                    );
                }
                static missingNameException() {
                    throw new Error(
                        'If ngModel is used within a form tag, either the name attribute must be set or the form\n      control must be defined as \'standalone\' in ngModelOptions.\n\n      Example 1: <input [(ngModel)]="person.firstName" name="first">\n      Example 2: <input [(ngModel)]="person.firstName" [ngModelOptions]="{standalone: true}">',
                    );
                }
                static modelGroupParentException() {
                    throw new Error(
                        `\n      ngModelGroup cannot be used with a parent formGroup directive.\n\n      Option 1: Use formGroupName instead of ngModelGroup (reactive strategy):\n\n      ${Ru.formGroupName}\n\n      Option 2:  Use a regular form tag instead of the formGroup directive (template-driven strategy):\n\n      ${Ru.ngModelGroup}`,
                    );
                }
                static ngFormWarning() {
                    console.warn(
                        "\n    It looks like you're using 'ngForm'.\n\n    Support for using the 'ngForm' element selector has been deprecated in Angular v6 and will be removed\n    in Angular v9.\n\n    Use 'ng-form' instead.\n\n    Before:\n    <ngForm #myForm=\"ngForm\">\n\n    After:\n    <ng-form #myForm=\"ngForm\">\n    ",
                    );
                }
            }
            const hc = new re('NgFormSelectorWarning');
            class pc extends Qu {
                constructor(e, t, n) {
                    super(),
                        (this._parent = e),
                        (this._validators = t),
                        (this._asyncValidators = n);
                }
                _checkParentType() {
                    this._parent instanceof pc ||
                        this._parent instanceof cc ||
                        dc.modelGroupParentException();
                }
            }
            const fc = Promise.resolve(null);
            class gc extends Ou {
                constructor(e, t, n, r) {
                    super(),
                        (this.control = new ic()),
                        (this._registered = !1),
                        (this.update = new Wt()),
                        (this._parent = e),
                        (this._rawValidators = t || []),
                        (this._rawAsyncValidators = n || []),
                        (this.valueAccessor = (function(e, t) {
                            if (!t) return null;
                            Array.isArray(t) ||
                                Gu(
                                    e,
                                    'Value accessor was not provided as an array for form control with',
                                );
                            let n = void 0,
                                r = void 0,
                                l = void 0;
                            return (
                                t.forEach(t => {
                                    t.constructor === ku
                                        ? (n = t)
                                        : (function(e) {
                                              return Wu.some(t => e.constructor === t);
                                          })(t)
                                        ? (r &&
                                              Gu(
                                                  e,
                                                  'More than one built-in value accessor matches form control with',
                                              ),
                                          (r = t))
                                        : (l &&
                                              Gu(
                                                  e,
                                                  'More than one custom value accessor matches form control with',
                                              ),
                                          (l = t));
                                }),
                                l ||
                                    r ||
                                    n ||
                                    (Gu(
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
                    return this._parent ? Uu(this.name, this._parent) : [this.name];
                }
                get formDirective() {
                    return this._parent ? this._parent.formDirective : null;
                }
                get validator() {
                    return qu(this._rawValidators);
                }
                get asyncValidator() {
                    return Zu(this._rawAsyncValidators);
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
                    $u(this.control, this),
                        this.control.updateValueAndValidity({emitEvent: !1});
                }
                _checkForErrors() {
                    this._isStandalone() || this._checkParentType(), this._checkName();
                }
                _checkParentType() {
                    !(this._parent instanceof pc) && this._parent instanceof Qu
                        ? dc.formGroupNameException()
                        : this._parent instanceof pc ||
                          this._parent instanceof cc ||
                          dc.modelParentException();
                }
                _checkName() {
                    this.options && this.options.name && (this.name = this.options.name),
                        this._isStandalone() || this.name || dc.missingNameException();
                }
                _updateValue(e) {
                    fc.then(() => {
                        this.control.setValue(e, {emitViewToModelChange: !1});
                    });
                }
                _updateDisabled(e) {
                    const t = e.isDisabled.currentValue,
                        n = '' === t || (t && 'false' !== t);
                    fc.then(() => {
                        n && !this.control.disabled
                            ? this.control.disable()
                            : !n && this.control.disabled && this.control.enable();
                    });
                }
            }
            class mc {}
            class _c {
                static withConfig(e) {
                    return {
                        ngModule: _c,
                        providers: [
                            {provide: hc, useValue: e.warnOnDeprecatedNgFormSelector},
                        ],
                    };
                }
            }
            class yc extends StereoPannerNode {
                set panParam(e) {
                    'setPosition' in this
                        ? this.fallbackToPannerNode(
                              (function(t) {
                                  if (!e) return 0;
                                  if ('number' == typeof e) return e;
                                  if (e instanceof Array) {
                                      const e = e[e.length - 1].value;
                                      return 'number' == typeof e ? e : e[e.length - 1];
                                  }
                                  return e.value instanceof Array
                                      ? e.value[e.value.length - 1]
                                      : e.value;
                              })(),
                          )
                        : Ki(this.pan, e, this.context.currentTime);
                }
                constructor(e, t) {
                    try {
                        new StereoPannerNode(e);
                    } catch (n) {
                        const r = e.createPanner();
                        return Object.setPrototypeOf(r, yc.prototype), yc.init(r, t), r;
                    }
                    super(e), yc.init(this, t);
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
                    Co(t, e);
                }
            }
            class vc {
                constructor(e, t) {
                    (this.compare = e), (this.keySelector = t);
                }
                call(e, t) {
                    return t.subscribe(new wc(e, this.compare, this.keySelector));
                }
            }
            class wc extends g {
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
            class bc {
                constructor(e) {
                    this.predicate = e;
                }
                call(e, t) {
                    return t.subscribe(new Cc(e, this.predicate));
                }
            }
            class Cc extends g {
                constructor(e, t) {
                    super(e),
                        (this.predicate = t),
                        (this.skipping = !0),
                        (this.index = 0);
                }
                _next(e) {
                    const t = this.destination;
                    this.skipping && this.tryCallPredicate(e), this.skipping || t.next(e);
                }
                tryCallPredicate(e) {
                    try {
                        const n = this.predicate(e, this.index++);
                        this.skipping = Boolean(n);
                    } catch (t) {
                        this.destination.error(t);
                    }
                }
            }
            class Ec {
                constructor(e, t) {
                    (this.dueTime = e), (this.scheduler = t);
                }
                call(e, t) {
                    return t.subscribe(new xc(e, this.dueTime, this.scheduler));
                }
            }
            class xc extends g {
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
                                Tc,
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
            function Tc(e) {
                e.debouncedNext();
            }
            class Sc {
                constructor(e, t) {
                    (this.predicate = e), (this.thisArg = t);
                }
                call(e, t) {
                    return t.subscribe(new Ac(e, this.predicate, this.thisArg));
                }
            }
            class Ac extends g {
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
            const kc = 128,
                Ic = 100;
            class Nc extends AnalyserNode {
                constructor(e, t) {
                    const n = eo(e, 'createAnalyser', Nc, t);
                    if (n) return n;
                    super(e), Nc.init(this, t);
                }
                ngOnDestroy() {
                    this.disconnect();
                }
                isSilent(e) {
                    for (let t = 0; t < e.length; t++)
                        if (Math.abs(e[t] - kc) > 2) return !1;
                    return !0;
                }
                static init(e, t) {
                    var n;
                    Co(t, e),
                        (e.fftSize = 256),
                        e.connect(e.context.destination),
                        (e.quiet = co(Ic).pipe(
                            mo(new Uint8Array(e.fftSize)),
                            vo(t => e.getByteTimeDomainData(t)),
                            F(t => e.isSilent(t)),
                            e => e.lift(new vc(void 0, void 0)),
                            ((n = e => !e), e => e.lift(new bc(n))),
                            (function(e, t = uo) {
                                return e => e.lift(new Ec(1e3, t));
                            })(),
                            (function(e, t) {
                                return function(t) {
                                    return t.lift(new Sc(e, void 0));
                                };
                            })(e => e),
                        ));
                }
            }
            class Vc extends DelayNode {
                constructor(e, t) {
                    const n = eo(e, 'createDelay', Vc, t);
                    if (n) return n;
                    super(e), Vc.init(this, t);
                }
                ngOnDestroy() {
                    this.disconnect();
                }
                static init(e, t) {
                    Co(t, e);
                }
            }
            zi(
                [Xi('delayTime'), Gi('design:type', Object)],
                Vc.prototype,
                'delayTimeParam',
                void 0,
            );
            class Oc extends BiquadFilterNode {
                constructor(e, t) {
                    const n = eo(e, 'createBiquadFilter', Oc, t);
                    if (n) return n;
                    super(e), Oc.init(this, t);
                }
                ngOnDestroy() {
                    this.disconnect();
                }
                static init(e, t) {
                    Co(t, e);
                }
            }
            zi(
                [Xi('gain'), Gi('design:type', Object)],
                Oc.prototype,
                'gainParam',
                void 0,
            ),
                zi(
                    [Xi('frequency'), Gi('design:type', Object)],
                    Oc.prototype,
                    'frequencyParam',
                    void 0,
                ),
                zi([Xi('Q'), Gi('design:type', Object)], Oc.prototype, 'qParam', void 0),
                zi(
                    [Xi('detune'), Gi('design:type', Object)],
                    Oc.prototype,
                    'detuneParam',
                    void 0,
                );
            class Dc extends WaveShaperNode {
                constructor(e, t) {
                    const n = eo(e, 'createWaveShaper', Dc, t);
                    if (n) return n;
                    super(e), Dc.init(this, t);
                }
                ngOnDestroy() {
                    this.disconnect();
                }
                static init(e, t) {
                    Co(t, e);
                }
            }
            class Pc extends ConvolverNode {
                set bufferSetter(e) {
                    this.buffer$.next(e);
                }
                constructor(e, t, n) {
                    const r = eo(t, 'createConvolver', Pc, n, e);
                    if (r) return r;
                    super(t), Pc.init(this, n, e);
                }
                ngOnDestroy() {
                    this.buffer$.complete(), this.disconnect();
                }
                static init(e, t, n) {
                    Co(t, e),
                        (e.buffer$ = new T()),
                        e.buffer$
                            .pipe(Zi(e => ('string' == typeof e ? n.fetch(e) : qi(e))))
                            .subscribe(t => {
                                e.buffer = t;
                            });
                }
            }
            class Mc {
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
            class Rc {
                transform(e, t, n = 'exponential') {
                    return e instanceof Array
                        ? {value: e, duration: t}
                        : {value: e, duration: t, mode: n};
                }
            }
            var Fc = Gr({encapsulation: 2, styles: [], data: {}});
            function jc(e) {
                return Ps(
                    0,
                    [
                        (e()(),
                        vl(
                            0,
                            0,
                            null,
                            null,
                            1,
                            'button',
                            [],
                            null,
                            [[null, 'click']],
                            function(e, t, n) {
                                var r = !0;
                                return (
                                    'click' === t &&
                                        (r = !1 !== e.component.start() && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        (e()(), Vs(-1, null, ['Start AudioContext'])),
                    ],
                    null,
                    null,
                );
            }
            function Hc(e) {
                return Ps(
                    0,
                    [
                        (e()(),
                        vl(
                            0,
                            0,
                            null,
                            null,
                            8,
                            'button',
                            [
                                ['buffer', 'assets/demo.mp3'],
                                ['waAudioBufferSourceNode', ''],
                            ],
                            null,
                            [[null, 'click']],
                            function(e, t, n) {
                                var r = !0;
                                return (
                                    'click' === t &&
                                        (r =
                                            !1 !==
                                                e.component.onClick(Wl(e, 1), n.target) &&
                                            r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        os(
                            1,
                            147456,
                            [['source', 4]],
                            0,
                            to,
                            [ro, no, [8, null]],
                            {loop: [0, 'loop'], bufferSetter: [1, 'bufferSetter']},
                            null,
                        ),
                        us(2048, null, lo, null, [to]),
                        (e()(), Vs(-1, null, [' Play '])),
                        (e()(),
                        vl(
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
                                                    Wl(e.parent.parent, 54),
                                                ) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        os(5, 147456, null, 0, Eo, [no, [1, lo]], null, {
                            timeByte$: 'timeByte$',
                        }),
                        us(2048, null, lo, null, [Eo]),
                        (e()(),
                        vl(
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
                        os(
                            8,
                            147456,
                            null,
                            0,
                            xo,
                            [no, lo],
                            {waOutput: [0, 'waOutput']},
                            null,
                        ),
                    ],
                    function(e, t) {
                        var n = t.component;
                        e(t, 1, 0, !0, 'assets/demo.mp3'),
                            e(t, 8, 0, n.chain || Wl(t.parent.parent, 55));
                    },
                    null,
                );
            }
            function Lc(e) {
                return Ps(
                    0,
                    [
                        (e()(),
                        vl(
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
                        (e()(), yl(16777216, null, null, 1, null, Hc)),
                        os(
                            2,
                            278528,
                            null,
                            0,
                            Ho,
                            [Jn, Qt, _r],
                            {ngForOf: [0, 'ngForOf']},
                            null,
                        ),
                        (e()(), yl(0, null, null, 0)),
                    ],
                    function(e, t) {
                        e(t, 2, 0, t.component.buffers);
                    },
                    null,
                );
            }
            function Bc(e) {
                return Ps(
                    0,
                    [
                        (e()(),
                        vl(
                            0,
                            0,
                            null,
                            null,
                            7,
                            'audio',
                            [
                                ['controls', ''],
                                ['loop', ''],
                                ['src', 'assets/demo.mp3'],
                                ['waMediaElementAudioSourceNode', ''],
                            ],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        os(1, 147456, null, 0, Ko, [no, pt], null, null),
                        us(2048, null, lo, null, [Ko]),
                        (e()(),
                        vl(
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
                                                    Wl(e.parent, 54),
                                                ) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        os(4, 147456, null, 0, Eo, [no, [1, lo]], null, {
                            timeByte$: 'timeByte$',
                        }),
                        us(2048, null, lo, null, [Eo]),
                        (e()(),
                        vl(
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
                        os(
                            7,
                            147456,
                            null,
                            0,
                            xo,
                            [no, lo],
                            {waOutput: [0, 'waOutput']},
                            null,
                        ),
                    ],
                    function(e, t) {
                        e(t, 7, 0, t.component.chain || Wl(t.parent, 55));
                    },
                    null,
                );
            }
            function Uc(e) {
                return Ps(
                    0,
                    [
                        (e()(),
                        vl(
                            0,
                            0,
                            null,
                            null,
                            9,
                            'button',
                            [['waOscillatorNode', '']],
                            null,
                            [[null, 'click']],
                            function(e, t, n) {
                                var r = !0;
                                return (
                                    'click' === t &&
                                        (r =
                                            !1 !==
                                                e.component.onClick(Wl(e, 1), n.target) &&
                                            r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        os(
                            1,
                            147456,
                            [['source', 4]],
                            0,
                            Jo,
                            [no, [8, null]],
                            {
                                periodicWave: [0, 'periodicWave'],
                                frequencyParam: [1, 'frequencyParam'],
                            },
                            null,
                        ),
                        Ns(2, 1),
                        us(2048, null, lo, null, [Jo]),
                        (e()(), Vs(-1, null, [' Play '])),
                        (e()(),
                        vl(
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
                                                    Wl(e.parent.parent, 54),
                                                ) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        os(6, 147456, null, 0, Eo, [no, [1, lo]], null, {
                            timeByte$: 'timeByte$',
                        }),
                        us(2048, null, lo, null, [Eo]),
                        (e()(),
                        vl(
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
                        os(
                            9,
                            147456,
                            null,
                            0,
                            xo,
                            [no, lo],
                            {waOutput: [0, 'waOutput']},
                            null,
                        ),
                    ],
                    function(e, t) {
                        var n = t.component,
                            r = Ur(
                                t,
                                1,
                                0,
                                e(t, 2, 0, Wl(t.parent.parent.parent, 0), n.real),
                            );
                        e(t, 1, 0, r, 100),
                            e(t, 9, 0, n.chain || Wl(t.parent.parent, 55));
                    },
                    null,
                );
            }
            function $c(e) {
                return Ps(
                    0,
                    [
                        (e()(),
                        vl(
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
                        (e()(), yl(16777216, null, null, 1, null, Uc)),
                        os(
                            2,
                            278528,
                            null,
                            0,
                            Ho,
                            [Jn, Qt, _r],
                            {ngForOf: [0, 'ngForOf']},
                            null,
                        ),
                        (e()(), yl(0, null, null, 0)),
                    ],
                    function(e, t) {
                        e(t, 2, 0, t.component.buffers);
                    },
                    null,
                );
            }
            function zc(e) {
                return Ps(
                    0,
                    [
                        (e()(),
                        vl(
                            0,
                            0,
                            null,
                            null,
                            30,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(),
                        vl(
                            1,
                            0,
                            null,
                            null,
                            29,
                            'fieldset',
                            [['waGainNode', '']],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        os(
                            2,
                            147456,
                            [[1, 4], ['chain', 4]],
                            0,
                            Yo,
                            [no, [1, lo]],
                            {gainParam: [0, 'gainParam']},
                            null,
                        ),
                        Ns(3, 2),
                        us(2048, null, lo, null, [Yo]),
                        (e()(),
                        vl(
                            5,
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
                        (e()(), Vs(-1, null, ['GainNode'])),
                        (e()(),
                        vl(
                            7,
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
                                                Wl(e, 8)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Wl(e, 8).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== Wl(e, 8)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                Wl(e, 8)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r =
                                            !1 !== Wl(e, 9).onChange(n.target.value) &&
                                            r),
                                    'input' === t &&
                                        (r =
                                            !1 !== Wl(e, 9).onChange(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Wl(e, 9).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (l.gain = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        os(8, 16384, null, 0, ku, [yt, pt, [2, Au]], null, null),
                        os(9, 16384, null, 0, Mu, [yt, pt], null, null),
                        us(
                            1024,
                            null,
                            Su,
                            function(e, t) {
                                return [e, t];
                            },
                            [ku, Mu],
                        ),
                        os(
                            11,
                            671744,
                            null,
                            0,
                            gc,
                            [[8, null], [8, null], [8, null], [6, Su]],
                            {model: [0, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        us(2048, null, Ou, null, [gc]),
                        os(13, 16384, null, 0, Ju, [[4, Ou]], null, null),
                        (e()(),
                        vl(
                            14,
                            0,
                            null,
                            null,
                            16,
                            'fieldset',
                            [['waStereoPannerNode', '']],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        os(
                            15,
                            147456,
                            null,
                            0,
                            yc,
                            [no, [1, lo]],
                            {panParam: [0, 'panParam']},
                            null,
                        ),
                        Ns(16, 2),
                        us(2048, null, lo, null, [yc]),
                        (e()(),
                        vl(
                            18,
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
                        (e()(), Vs(-1, null, ['StereoPannerNode'])),
                        (e()(),
                        vl(
                            20,
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
                                                Wl(e, 21)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Wl(e, 21).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== Wl(e, 21)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                Wl(e, 21)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r =
                                            !1 !== Wl(e, 22).onChange(n.target.value) &&
                                            r),
                                    'input' === t &&
                                        (r =
                                            !1 !== Wl(e, 22).onChange(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Wl(e, 22).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (l.pan = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        os(21, 16384, null, 0, ku, [yt, pt, [2, Au]], null, null),
                        os(22, 16384, null, 0, Mu, [yt, pt], null, null),
                        us(
                            1024,
                            null,
                            Su,
                            function(e, t) {
                                return [e, t];
                            },
                            [ku, Mu],
                        ),
                        os(
                            24,
                            671744,
                            null,
                            0,
                            gc,
                            [[8, null], [8, null], [8, null], [6, Su]],
                            {model: [0, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        us(2048, null, Ou, null, [gc]),
                        os(26, 16384, null, 0, Ju, [[4, Ou]], null, null),
                        (e()(),
                        vl(
                            27,
                            0,
                            null,
                            null,
                            3,
                            'fieldset',
                            [['waAudioDestinationNode', '']],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        os(28, 147456, null, 0, Nc, [no, lo], null, null),
                        (e()(),
                        vl(
                            29,
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
                        (e()(), Vs(-1, null, ['AudioDestinationNode'])),
                    ],
                    function(e, t) {
                        var n = t.component,
                            r = Ur(
                                t,
                                2,
                                0,
                                e(t, 3, 0, Wl(t.parent.parent, 1), n.gain, 0.1),
                            );
                        e(t, 2, 0, r), e(t, 11, 0, n.gain);
                        var l = Ur(
                            t,
                            15,
                            0,
                            e(t, 16, 0, Wl(t.parent.parent, 1), n.pan, 0.1),
                        );
                        e(t, 15, 0, l), e(t, 24, 0, n.pan);
                    },
                    function(e, t) {
                        e(
                            t,
                            7,
                            0,
                            Wl(t, 13).ngClassUntouched,
                            Wl(t, 13).ngClassTouched,
                            Wl(t, 13).ngClassPristine,
                            Wl(t, 13).ngClassDirty,
                            Wl(t, 13).ngClassValid,
                            Wl(t, 13).ngClassInvalid,
                            Wl(t, 13).ngClassPending,
                        ),
                            e(
                                t,
                                20,
                                0,
                                Wl(t, 26).ngClassUntouched,
                                Wl(t, 26).ngClassTouched,
                                Wl(t, 26).ngClassPristine,
                                Wl(t, 26).ngClassDirty,
                                Wl(t, 26).ngClassValid,
                                Wl(t, 26).ngClassInvalid,
                                Wl(t, 26).ngClassPending,
                            );
                    },
                );
            }
            function Gc(e) {
                return Ps(
                    0,
                    [
                        (e()(),
                        vl(
                            0,
                            0,
                            null,
                            null,
                            44,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(),
                        vl(
                            1,
                            0,
                            null,
                            null,
                            43,
                            'fieldset',
                            [['waGainNode', '']],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        os(
                            2,
                            147456,
                            [[1, 4], ['chain', 4]],
                            0,
                            Yo,
                            [no, [1, lo]],
                            {gainParam: [0, 'gainParam']},
                            null,
                        ),
                        Ns(3, 2),
                        us(2048, null, lo, null, [Yo]),
                        (e()(),
                        vl(
                            5,
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
                        (e()(), Vs(-1, null, ['GainNode'])),
                        (e()(),
                        vl(7, 0, null, null, 1, 'em', [], null, null, null, null, null)),
                        (e()(), Vs(-1, null, ['For feedback loop purposes only'])),
                        (e()(),
                        vl(
                            9,
                            0,
                            null,
                            null,
                            31,
                            'fieldset',
                            [['waDelayNode', '']],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        os(
                            10,
                            147456,
                            null,
                            0,
                            Vc,
                            [no, [1, lo]],
                            {delayTimeParam: [0, 'delayTimeParam']},
                            null,
                        ),
                        Ns(11, 2),
                        us(2048, null, lo, null, [Vc]),
                        (e()(),
                        vl(
                            13,
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
                        (e()(), Vs(-1, null, ['DelayNode'])),
                        (e()(),
                        vl(
                            15,
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
                                                Wl(e, 16)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Wl(e, 16).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== Wl(e, 16)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                Wl(e, 16)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r =
                                            !1 !== Wl(e, 17).onChange(n.target.value) &&
                                            r),
                                    'input' === t &&
                                        (r =
                                            !1 !== Wl(e, 17).onChange(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Wl(e, 17).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (l.delayTime = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        os(16, 16384, null, 0, ku, [yt, pt, [2, Au]], null, null),
                        os(17, 16384, null, 0, Mu, [yt, pt], null, null),
                        us(
                            1024,
                            null,
                            Su,
                            function(e, t) {
                                return [e, t];
                            },
                            [ku, Mu],
                        ),
                        os(
                            19,
                            671744,
                            null,
                            0,
                            gc,
                            [[8, null], [8, null], [8, null], [6, Su]],
                            {model: [0, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        us(2048, null, Ou, null, [gc]),
                        os(21, 16384, null, 0, Ju, [[4, Ou]], null, null),
                        (e()(),
                        vl(
                            22,
                            0,
                            null,
                            null,
                            18,
                            'fieldset',
                            [['waGainNode', '']],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        os(
                            23,
                            147456,
                            null,
                            0,
                            Yo,
                            [no, [1, lo]],
                            {gainParam: [0, 'gainParam']},
                            null,
                        ),
                        Ns(24, 2),
                        us(2048, null, lo, null, [Yo]),
                        (e()(),
                        vl(
                            26,
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
                        (e()(), Vs(-1, null, ['GainNode'])),
                        (e()(),
                        vl(
                            28,
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
                                                Wl(e, 29)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Wl(e, 29).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== Wl(e, 29)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                Wl(e, 29)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r =
                                            !1 !== Wl(e, 30).onChange(n.target.value) &&
                                            r),
                                    'input' === t &&
                                        (r =
                                            !1 !== Wl(e, 30).onChange(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Wl(e, 30).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (l.delayGain = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        os(29, 16384, null, 0, ku, [yt, pt, [2, Au]], null, null),
                        os(30, 16384, null, 0, Mu, [yt, pt], null, null),
                        us(
                            1024,
                            null,
                            Su,
                            function(e, t) {
                                return [e, t];
                            },
                            [ku, Mu],
                        ),
                        os(
                            32,
                            671744,
                            null,
                            0,
                            gc,
                            [[8, null], [8, null], [8, null], [6, Su]],
                            {model: [0, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        us(2048, null, Ou, null, [gc]),
                        os(34, 16384, null, 0, Ju, [[4, Ou]], null, null),
                        (e()(),
                        vl(
                            35,
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
                        os(
                            36,
                            147456,
                            null,
                            0,
                            xo,
                            [no, lo],
                            {waOutput: [0, 'waOutput']},
                            null,
                        ),
                        (e()(),
                        vl(
                            37,
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
                        (e()(), Vs(-1, null, ['Output'])),
                        (e()(),
                        vl(39, 0, null, null, 1, 'em', [], null, null, null, null, null)),
                        (e()(),
                        Vs(-1, null, ['Connected back to the beginning of the chain'])),
                        (e()(),
                        vl(
                            41,
                            0,
                            null,
                            null,
                            3,
                            'fieldset',
                            [['waAudioDestinationNode', '']],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        os(42, 147456, null, 0, Nc, [no, lo], null, null),
                        (e()(),
                        vl(
                            43,
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
                        (e()(), Vs(-1, null, ['AudioDestinationNode'])),
                    ],
                    function(e, t) {
                        var n = t.component,
                            r = Ur(
                                t,
                                2,
                                0,
                                e(t, 3, 0, Wl(t.parent.parent, 1), n.gain, 0.1),
                            );
                        e(t, 2, 0, r);
                        var l = Ur(
                            t,
                            10,
                            0,
                            e(t, 11, 0, Wl(t.parent.parent, 1), n.delayTime, 0.1),
                        );
                        e(t, 10, 0, l), e(t, 19, 0, n.delayTime);
                        var s = Ur(
                            t,
                            23,
                            0,
                            e(t, 24, 0, Wl(t.parent.parent, 1), n.delayGain, 0.1),
                        );
                        e(t, 23, 0, s), e(t, 32, 0, n.delayGain), e(t, 36, 0, Wl(t, 2));
                    },
                    function(e, t) {
                        e(
                            t,
                            15,
                            0,
                            Wl(t, 21).ngClassUntouched,
                            Wl(t, 21).ngClassTouched,
                            Wl(t, 21).ngClassPristine,
                            Wl(t, 21).ngClassDirty,
                            Wl(t, 21).ngClassValid,
                            Wl(t, 21).ngClassInvalid,
                            Wl(t, 21).ngClassPending,
                        ),
                            e(
                                t,
                                28,
                                0,
                                Wl(t, 34).ngClassUntouched,
                                Wl(t, 34).ngClassTouched,
                                Wl(t, 34).ngClassPristine,
                                Wl(t, 34).ngClassDirty,
                                Wl(t, 34).ngClassValid,
                                Wl(t, 34).ngClassInvalid,
                                Wl(t, 34).ngClassPending,
                            );
                    },
                );
            }
            function qc(e) {
                return Ps(
                    0,
                    [
                        (e()(),
                        vl(
                            0,
                            0,
                            null,
                            null,
                            115,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(),
                        vl(
                            1,
                            0,
                            null,
                            null,
                            114,
                            'fieldset',
                            [['waBiquadFilterNode', '']],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        os(
                            2,
                            147456,
                            [[1, 4], ['chain', 4]],
                            0,
                            Oc,
                            [no, [1, lo]],
                            {
                                type: [0, 'type'],
                                gainParam: [1, 'gainParam'],
                                frequencyParam: [2, 'frequencyParam'],
                                qParam: [3, 'qParam'],
                                detuneParam: [4, 'detuneParam'],
                            },
                            null,
                        ),
                        Ns(3, 2),
                        Ns(4, 2),
                        Ns(5, 2),
                        Ns(6, 2),
                        us(2048, null, lo, null, [Oc]),
                        (e()(),
                        vl(
                            8,
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
                        (e()(), Vs(-1, null, ['BiquadFilterNode'])),
                        (e()(),
                        vl(
                            10,
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
                        vl(
                            11,
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
                                            !1 !== Wl(e, 12).onChange(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Wl(e, 12).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (l.type = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        os(12, 16384, null, 0, ju, [yt, pt], null, null),
                        us(
                            1024,
                            null,
                            Su,
                            function(e) {
                                return [e];
                            },
                            [ju],
                        ),
                        os(
                            14,
                            671744,
                            null,
                            0,
                            gc,
                            [[8, null], [8, null], [8, null], [6, Su]],
                            {model: [0, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        us(2048, null, Ou, null, [gc]),
                        os(16, 16384, null, 0, Ju, [[4, Ou]], null, null),
                        (e()(),
                        vl(
                            17,
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
                        os(
                            18,
                            147456,
                            null,
                            0,
                            Hu,
                            [pt, yt, [2, ju]],
                            {value: [0, 'value']},
                            null,
                        ),
                        os(
                            19,
                            147456,
                            null,
                            0,
                            Bu,
                            [pt, yt, [8, null]],
                            {value: [0, 'value']},
                            null,
                        ),
                        (e()(), Vs(-1, null, ['lowpass'])),
                        (e()(),
                        vl(
                            21,
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
                        os(
                            22,
                            147456,
                            null,
                            0,
                            Hu,
                            [pt, yt, [2, ju]],
                            {value: [0, 'value']},
                            null,
                        ),
                        os(
                            23,
                            147456,
                            null,
                            0,
                            Bu,
                            [pt, yt, [8, null]],
                            {value: [0, 'value']},
                            null,
                        ),
                        (e()(), Vs(-1, null, ['highpass'])),
                        (e()(),
                        vl(
                            25,
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
                        os(
                            26,
                            147456,
                            null,
                            0,
                            Hu,
                            [pt, yt, [2, ju]],
                            {value: [0, 'value']},
                            null,
                        ),
                        os(
                            27,
                            147456,
                            null,
                            0,
                            Bu,
                            [pt, yt, [8, null]],
                            {value: [0, 'value']},
                            null,
                        ),
                        (e()(), Vs(-1, null, ['bandpass'])),
                        (e()(),
                        vl(
                            29,
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
                        os(
                            30,
                            147456,
                            null,
                            0,
                            Hu,
                            [pt, yt, [2, ju]],
                            {value: [0, 'value']},
                            null,
                        ),
                        os(
                            31,
                            147456,
                            null,
                            0,
                            Bu,
                            [pt, yt, [8, null]],
                            {value: [0, 'value']},
                            null,
                        ),
                        (e()(), Vs(-1, null, ['lowshelf'])),
                        (e()(),
                        vl(
                            33,
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
                        os(
                            34,
                            147456,
                            null,
                            0,
                            Hu,
                            [pt, yt, [2, ju]],
                            {value: [0, 'value']},
                            null,
                        ),
                        os(
                            35,
                            147456,
                            null,
                            0,
                            Bu,
                            [pt, yt, [8, null]],
                            {value: [0, 'value']},
                            null,
                        ),
                        (e()(), Vs(-1, null, ['highshelf'])),
                        (e()(),
                        vl(
                            37,
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
                        os(
                            38,
                            147456,
                            null,
                            0,
                            Hu,
                            [pt, yt, [2, ju]],
                            {value: [0, 'value']},
                            null,
                        ),
                        os(
                            39,
                            147456,
                            null,
                            0,
                            Bu,
                            [pt, yt, [8, null]],
                            {value: [0, 'value']},
                            null,
                        ),
                        (e()(), Vs(-1, null, ['peaking'])),
                        (e()(),
                        vl(
                            41,
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
                        os(
                            42,
                            147456,
                            null,
                            0,
                            Hu,
                            [pt, yt, [2, ju]],
                            {value: [0, 'value']},
                            null,
                        ),
                        os(
                            43,
                            147456,
                            null,
                            0,
                            Bu,
                            [pt, yt, [8, null]],
                            {value: [0, 'value']},
                            null,
                        ),
                        (e()(), Vs(-1, null, ['notch'])),
                        (e()(),
                        vl(
                            45,
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
                        os(
                            46,
                            147456,
                            null,
                            0,
                            Hu,
                            [pt, yt, [2, ju]],
                            {value: [0, 'value']},
                            null,
                        ),
                        os(
                            47,
                            147456,
                            null,
                            0,
                            Bu,
                            [pt, yt, [8, null]],
                            {value: [0, 'value']},
                            null,
                        ),
                        (e()(), Vs(-1, null, ['allpass'])),
                        (e()(),
                        vl(
                            49,
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
                        (e()(), Vs(-1, null, ['type'])),
                        (e()(),
                        vl(
                            51,
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
                        vl(
                            52,
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
                                                Wl(e, 53)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Wl(e, 53).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== Wl(e, 53)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                Wl(e, 53)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r =
                                            !1 !== Wl(e, 54).onChange(n.target.value) &&
                                            r),
                                    'input' === t &&
                                        (r =
                                            !1 !== Wl(e, 54).onChange(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Wl(e, 54).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (l.filterGain = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        os(53, 16384, null, 0, ku, [yt, pt, [2, Au]], null, null),
                        os(54, 16384, null, 0, Mu, [yt, pt], null, null),
                        us(
                            1024,
                            null,
                            Su,
                            function(e, t) {
                                return [e, t];
                            },
                            [ku, Mu],
                        ),
                        os(
                            56,
                            671744,
                            null,
                            0,
                            gc,
                            [[8, null], [8, null], [8, null], [6, Su]],
                            {model: [0, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        us(2048, null, Ou, null, [gc]),
                        os(58, 16384, null, 0, Ju, [[4, Ou]], null, null),
                        (e()(),
                        vl(
                            59,
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
                        (e()(), Vs(-1, null, ['gain'])),
                        (e()(),
                        vl(
                            61,
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
                        vl(
                            62,
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
                                                Wl(e, 63)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Wl(e, 63).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== Wl(e, 63)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                Wl(e, 63)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r =
                                            !1 !== Wl(e, 64).onChange(n.target.value) &&
                                            r),
                                    'input' === t &&
                                        (r =
                                            !1 !== Wl(e, 64).onChange(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Wl(e, 64).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (l.frequency = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        os(63, 16384, null, 0, ku, [yt, pt, [2, Au]], null, null),
                        os(64, 16384, null, 0, Mu, [yt, pt], null, null),
                        us(
                            1024,
                            null,
                            Su,
                            function(e, t) {
                                return [e, t];
                            },
                            [ku, Mu],
                        ),
                        os(
                            66,
                            671744,
                            null,
                            0,
                            gc,
                            [[8, null], [8, null], [8, null], [6, Su]],
                            {model: [0, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        us(2048, null, Ou, null, [gc]),
                        os(68, 16384, null, 0, Ju, [[4, Ou]], null, null),
                        (e()(),
                        vl(
                            69,
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
                        (e()(), Vs(-1, null, ['frequency'])),
                        (e()(),
                        vl(
                            71,
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
                        vl(
                            72,
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
                                                Wl(e, 73)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Wl(e, 73).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== Wl(e, 73)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                Wl(e, 73)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r =
                                            !1 !== Wl(e, 74).onChange(n.target.value) &&
                                            r),
                                    'input' === t &&
                                        (r =
                                            !1 !== Wl(e, 74).onChange(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Wl(e, 74).onTouched() && r),
                                    'ngModelChange' === t && (r = !1 !== (l.Q = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        os(73, 16384, null, 0, ku, [yt, pt, [2, Au]], null, null),
                        os(74, 16384, null, 0, Mu, [yt, pt], null, null),
                        us(
                            1024,
                            null,
                            Su,
                            function(e, t) {
                                return [e, t];
                            },
                            [ku, Mu],
                        ),
                        os(
                            76,
                            671744,
                            null,
                            0,
                            gc,
                            [[8, null], [8, null], [8, null], [6, Su]],
                            {model: [0, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        us(2048, null, Ou, null, [gc]),
                        os(78, 16384, null, 0, Ju, [[4, Ou]], null, null),
                        (e()(),
                        vl(
                            79,
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
                        (e()(), Vs(-1, null, ['Q'])),
                        (e()(),
                        vl(
                            81,
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
                        vl(
                            82,
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
                                                Wl(e, 83)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Wl(e, 83).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== Wl(e, 83)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                Wl(e, 83)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r =
                                            !1 !== Wl(e, 84).onChange(n.target.value) &&
                                            r),
                                    'input' === t &&
                                        (r =
                                            !1 !== Wl(e, 84).onChange(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Wl(e, 84).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (l.detune = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        os(83, 16384, null, 0, ku, [yt, pt, [2, Au]], null, null),
                        os(84, 16384, null, 0, Mu, [yt, pt], null, null),
                        us(
                            1024,
                            null,
                            Su,
                            function(e, t) {
                                return [e, t];
                            },
                            [ku, Mu],
                        ),
                        os(
                            86,
                            671744,
                            null,
                            0,
                            gc,
                            [[8, null], [8, null], [8, null], [6, Su]],
                            {model: [0, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        us(2048, null, Ou, null, [gc]),
                        os(88, 16384, null, 0, Ju, [[4, Ou]], null, null),
                        (e()(),
                        vl(
                            89,
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
                        (e()(), Vs(-1, null, ['detune'])),
                        (e()(),
                        vl(
                            91,
                            0,
                            null,
                            null,
                            24,
                            'fieldset',
                            [['oversample', '4x'], ['waWaveShaperNode', '']],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        os(
                            92,
                            147456,
                            null,
                            0,
                            Dc,
                            [no, [1, lo]],
                            {oversample: [0, 'oversample'], curve: [1, 'curve']},
                            null,
                        ),
                        us(2048, null, lo, null, [Dc]),
                        (e()(),
                        vl(
                            94,
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
                        (e()(), Vs(-1, null, ['WaveShaperNode'])),
                        (e()(),
                        vl(
                            96,
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
                                                Wl(e, 97)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Wl(e, 97).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== Wl(e, 97)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                Wl(e, 97)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r =
                                            !1 !== Wl(e, 98).onChange(n.target.value) &&
                                            r),
                                    'input' === t &&
                                        (r =
                                            !1 !== Wl(e, 98).onChange(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Wl(e, 98).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== l.onCurveChange(n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        os(97, 16384, null, 0, ku, [yt, pt, [2, Au]], null, null),
                        os(98, 16384, null, 0, Mu, [yt, pt], null, null),
                        us(
                            1024,
                            null,
                            Su,
                            function(e, t) {
                                return [e, t];
                            },
                            [ku, Mu],
                        ),
                        os(
                            100,
                            671744,
                            null,
                            0,
                            gc,
                            [[8, null], [8, null], [8, null], [6, Su]],
                            {model: [0, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        us(2048, null, Ou, null, [gc]),
                        os(102, 16384, null, 0, Ju, [[4, Ou]], null, null),
                        (e()(),
                        vl(
                            103,
                            0,
                            null,
                            null,
                            12,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        os(
                            104,
                            147456,
                            null,
                            0,
                            Yo,
                            [no, [1, lo]],
                            {gainParam: [0, 'gainParam']},
                            null,
                        ),
                        Ns(105, 2),
                        us(2048, null, lo, null, [Yo]),
                        (e()(),
                        vl(
                            107,
                            0,
                            null,
                            null,
                            8,
                            'fieldset',
                            [['buffer', 'assets/response.m4a'], ['waConvolverNode', '']],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        os(
                            108,
                            147456,
                            null,
                            0,
                            Pc,
                            [ro, no, [1, lo]],
                            {bufferSetter: [0, 'bufferSetter']},
                            null,
                        ),
                        us(2048, null, lo, null, [Pc]),
                        (e()(),
                        vl(
                            110,
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
                        (e()(), Vs(-1, null, ['ConvolverNode'])),
                        (e()(),
                        vl(
                            112,
                            0,
                            null,
                            null,
                            3,
                            'fieldset',
                            [['waAudioDestinationNode', '']],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        os(113, 147456, null, 0, Nc, [no, lo], null, null),
                        (e()(),
                        vl(
                            114,
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
                        (e()(), Vs(-1, null, ['AudioDestinationNode'])),
                    ],
                    function(e, t) {
                        var n = t.component,
                            r = n.type,
                            l = Ur(
                                t,
                                2,
                                1,
                                e(t, 3, 0, Wl(t.parent.parent, 1), n.filterGain, 0.1),
                            ),
                            s = Ur(
                                t,
                                2,
                                2,
                                e(t, 4, 0, Wl(t.parent.parent, 1), n.frequency, 0.1),
                            ),
                            i = Ur(t, 2, 3, e(t, 5, 0, Wl(t.parent.parent, 1), n.Q, 0.1)),
                            o = Ur(
                                t,
                                2,
                                4,
                                e(t, 6, 0, Wl(t.parent.parent, 1), n.detune, 0.1),
                            );
                        e(t, 2, 0, r, l, s, i, o),
                            e(t, 14, 0, n.type),
                            e(t, 18, 0, 'lowpass'),
                            e(t, 19, 0, 'lowpass'),
                            e(t, 22, 0, 'highpass'),
                            e(t, 23, 0, 'highpass'),
                            e(t, 26, 0, 'bandpass'),
                            e(t, 27, 0, 'bandpass'),
                            e(t, 30, 0, 'lowshelf'),
                            e(t, 31, 0, 'lowshelf'),
                            e(t, 34, 0, 'highshelf'),
                            e(t, 35, 0, 'highshelf'),
                            e(t, 38, 0, 'peaking'),
                            e(t, 39, 0, 'peaking'),
                            e(t, 42, 0, 'notch'),
                            e(t, 43, 0, 'notch'),
                            e(t, 46, 0, 'allpass'),
                            e(t, 47, 0, 'allpass'),
                            e(t, 56, 0, n.filterGain),
                            e(t, 66, 0, n.frequency),
                            e(t, 76, 0, n.Q),
                            e(t, 86, 0, n.detune),
                            e(t, 92, 0, '4x', n.curve),
                            e(t, 100, 0, n.distortion);
                        var a = Ur(
                            t,
                            104,
                            0,
                            e(
                                t,
                                105,
                                0,
                                Wl(t.parent.parent, 1),
                                n.distortionCompensation,
                                0.1,
                            ),
                        );
                        e(t, 104, 0, a), e(t, 108, 0, 'assets/response.m4a');
                    },
                    function(e, t) {
                        e(
                            t,
                            11,
                            0,
                            Wl(t, 16).ngClassUntouched,
                            Wl(t, 16).ngClassTouched,
                            Wl(t, 16).ngClassPristine,
                            Wl(t, 16).ngClassDirty,
                            Wl(t, 16).ngClassValid,
                            Wl(t, 16).ngClassInvalid,
                            Wl(t, 16).ngClassPending,
                        ),
                            e(
                                t,
                                52,
                                0,
                                Wl(t, 58).ngClassUntouched,
                                Wl(t, 58).ngClassTouched,
                                Wl(t, 58).ngClassPristine,
                                Wl(t, 58).ngClassDirty,
                                Wl(t, 58).ngClassValid,
                                Wl(t, 58).ngClassInvalid,
                                Wl(t, 58).ngClassPending,
                            ),
                            e(
                                t,
                                62,
                                0,
                                Wl(t, 68).ngClassUntouched,
                                Wl(t, 68).ngClassTouched,
                                Wl(t, 68).ngClassPristine,
                                Wl(t, 68).ngClassDirty,
                                Wl(t, 68).ngClassValid,
                                Wl(t, 68).ngClassInvalid,
                                Wl(t, 68).ngClassPending,
                            ),
                            e(
                                t,
                                72,
                                0,
                                Wl(t, 78).ngClassUntouched,
                                Wl(t, 78).ngClassTouched,
                                Wl(t, 78).ngClassPristine,
                                Wl(t, 78).ngClassDirty,
                                Wl(t, 78).ngClassValid,
                                Wl(t, 78).ngClassInvalid,
                                Wl(t, 78).ngClassPending,
                            ),
                            e(
                                t,
                                82,
                                0,
                                Wl(t, 88).ngClassUntouched,
                                Wl(t, 88).ngClassTouched,
                                Wl(t, 88).ngClassPristine,
                                Wl(t, 88).ngClassDirty,
                                Wl(t, 88).ngClassValid,
                                Wl(t, 88).ngClassInvalid,
                                Wl(t, 88).ngClassPending,
                            ),
                            e(
                                t,
                                96,
                                0,
                                Wl(t, 102).ngClassUntouched,
                                Wl(t, 102).ngClassTouched,
                                Wl(t, 102).ngClassPristine,
                                Wl(t, 102).ngClassDirty,
                                Wl(t, 102).ngClassValid,
                                Wl(t, 102).ngClassInvalid,
                                Wl(t, 102).ngClassPending,
                            );
                    },
                );
            }
            function Zc(e) {
                return Ps(
                    0,
                    [
                        (e()(),
                        vl(
                            0,
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
                        vl(1, 0, null, null, 1, 'h1', [], null, null, null, null, null)),
                        (e()(), Vs(-1, null, ['Description'])),
                        (e()(),
                        vl(3, 0, null, null, 8, 'p', [], null, null, null, null, null)),
                        (e()(), Vs(-1, null, [' This is a demo for '])),
                        (e()(),
                        vl(
                            5,
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
                        vl(6, 0, null, null, 1, 'em', [], null, null, null, null, null)),
                        (e()(), Vs(-1, null, ['@ng-web-apis/audio'])),
                        (e()(),
                        Vs(-1, null, [
                            ' \u2014 a Web Audio API declarative library for Angular. Here you can select different audio source options and see AudioNode graph for selected configuration. Demo page uses HTML elements as directives hosts, in real life scenario you can use ',
                        ])),
                        (e()(),
                        vl(
                            9,
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
                        (e()(), Vs(-1, null, ['ng-container'])),
                        (e()(),
                        Vs(-1, null, [' so you will not have redundant DOM tags. '])),
                        (e()(),
                        vl(
                            12,
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
                        vl(13, 0, null, null, 1, 'h1', [], null, null, null, null, null)),
                        (e()(), Vs(-1, null, ['Source'])),
                        (e()(),
                        vl(15, 0, null, null, 9, 'p', [], null, null, null, null, null)),
                        (e()(),
                        vl(
                            16,
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
                        vl(
                            17,
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
                                                Wl(e, 18)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Wl(e, 18).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== Wl(e, 18)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                Wl(e, 18)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r = !1 !== Wl(e, 19).onChange() && r),
                                    'blur' === t &&
                                        (r = !1 !== Wl(e, 19).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (l.selectedSource = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        os(18, 16384, null, 0, ku, [yt, pt, [2, Au]], null, null),
                        os(
                            19,
                            212992,
                            null,
                            0,
                            Pu,
                            [yt, pt, Du, Le],
                            {name: [0, 'name'], value: [1, 'value']},
                            null,
                        ),
                        us(
                            1024,
                            null,
                            Su,
                            function(e, t) {
                                return [e, t];
                            },
                            [ku, Pu],
                        ),
                        os(
                            21,
                            671744,
                            null,
                            0,
                            gc,
                            [[8, null], [8, null], [8, null], [6, Su]],
                            {name: [0, 'name'], model: [1, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        us(2048, null, Ou, null, [gc]),
                        os(23, 16384, null, 0, Ju, [[4, Ou]], null, null),
                        (e()(), Vs(-1, null, [' AudioBufferSourceNode '])),
                        (e()(),
                        vl(25, 0, null, null, 9, 'p', [], null, null, null, null, null)),
                        (e()(),
                        vl(
                            26,
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
                        vl(
                            27,
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
                                                Wl(e, 28)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Wl(e, 28).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== Wl(e, 28)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                Wl(e, 28)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r = !1 !== Wl(e, 29).onChange() && r),
                                    'blur' === t &&
                                        (r = !1 !== Wl(e, 29).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (l.selectedSource = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        os(28, 16384, null, 0, ku, [yt, pt, [2, Au]], null, null),
                        os(
                            29,
                            212992,
                            null,
                            0,
                            Pu,
                            [yt, pt, Du, Le],
                            {name: [0, 'name'], value: [1, 'value']},
                            null,
                        ),
                        us(
                            1024,
                            null,
                            Su,
                            function(e, t) {
                                return [e, t];
                            },
                            [ku, Pu],
                        ),
                        os(
                            31,
                            671744,
                            null,
                            0,
                            gc,
                            [[8, null], [8, null], [8, null], [6, Su]],
                            {name: [0, 'name'], model: [1, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        us(2048, null, Ou, null, [gc]),
                        os(33, 16384, null, 0, Ju, [[4, Ou]], null, null),
                        (e()(), Vs(-1, null, [' MediaElementAudioSourceNode '])),
                        (e()(),
                        vl(35, 0, null, null, 9, 'p', [], null, null, null, null, null)),
                        (e()(),
                        vl(
                            36,
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
                        vl(
                            37,
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
                                                Wl(e, 38)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Wl(e, 38).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== Wl(e, 38)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                Wl(e, 38)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r = !1 !== Wl(e, 39).onChange() && r),
                                    'blur' === t &&
                                        (r = !1 !== Wl(e, 39).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (l.selectedSource = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        os(38, 16384, null, 0, ku, [yt, pt, [2, Au]], null, null),
                        os(
                            39,
                            212992,
                            null,
                            0,
                            Pu,
                            [yt, pt, Du, Le],
                            {name: [0, 'name'], value: [1, 'value']},
                            null,
                        ),
                        us(
                            1024,
                            null,
                            Su,
                            function(e, t) {
                                return [e, t];
                            },
                            [ku, Pu],
                        ),
                        os(
                            41,
                            671744,
                            null,
                            0,
                            gc,
                            [[8, null], [8, null], [8, null], [6, Su]],
                            {name: [0, 'name'], model: [1, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        us(2048, null, Ou, null, [gc]),
                        os(43, 16384, null, 0, Ju, [[4, Ou]], null, null),
                        (e()(), Vs(-1, null, [' OscillatorNode '])),
                        (e()(),
                        vl(
                            45,
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
                        os(46, 16384, null, 0, Go, [], {ngSwitch: [0, 'ngSwitch']}, null),
                        (e()(), yl(16777216, null, null, 1, null, Lc)),
                        os(
                            48,
                            278528,
                            null,
                            0,
                            qo,
                            [Jn, Qt, Go],
                            {ngSwitchCase: [0, 'ngSwitchCase']},
                            null,
                        ),
                        (e()(), yl(16777216, null, null, 1, null, Bc)),
                        os(
                            50,
                            278528,
                            null,
                            0,
                            qo,
                            [Jn, Qt, Go],
                            {ngSwitchCase: [0, 'ngSwitchCase']},
                            null,
                        ),
                        (e()(), yl(16777216, null, null, 1, null, $c)),
                        os(
                            52,
                            278528,
                            null,
                            0,
                            qo,
                            [Jn, Qt, Go],
                            {ngSwitchCase: [0, 'ngSwitchCase']},
                            null,
                        ),
                        (e()(),
                        vl(53, 0, null, null, 2, 'p', [], null, null, null, null, null)),
                        (e()(),
                        vl(
                            54,
                            0,
                            [['canvas', 1]],
                            null,
                            1,
                            'canvas',
                            [['waAudioDestinationNode', '']],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        os(55, 147456, [['fallback', 4]], 0, Nc, [no, lo], null, null),
                        (e()(),
                        vl(
                            56,
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
                        vl(57, 0, null, null, 1, 'h1', [], null, null, null, null, null)),
                        (e()(), Vs(-1, null, ['Chain'])),
                        (e()(),
                        vl(59, 0, null, null, 9, 'p', [], null, null, null, null, null)),
                        (e()(),
                        vl(
                            60,
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
                        vl(
                            61,
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
                                                Wl(e, 62)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Wl(e, 62).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== Wl(e, 62)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                Wl(e, 62)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r = !1 !== Wl(e, 63).onChange() && r),
                                    'blur' === t &&
                                        (r = !1 !== Wl(e, 63).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (l.selectedChain = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        os(62, 16384, null, 0, ku, [yt, pt, [2, Au]], null, null),
                        os(
                            63,
                            212992,
                            null,
                            0,
                            Pu,
                            [yt, pt, Du, Le],
                            {name: [0, 'name'], value: [1, 'value']},
                            null,
                        ),
                        us(
                            1024,
                            null,
                            Su,
                            function(e, t) {
                                return [e, t];
                            },
                            [ku, Pu],
                        ),
                        os(
                            65,
                            671744,
                            null,
                            0,
                            gc,
                            [[8, null], [8, null], [8, null], [6, Su]],
                            {name: [0, 'name'], model: [1, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        us(2048, null, Ou, null, [gc]),
                        os(67, 16384, null, 0, Ju, [[4, Ou]], null, null),
                        (e()(), Vs(-1, null, [' Dry '])),
                        (e()(),
                        vl(69, 0, null, null, 9, 'p', [], null, null, null, null, null)),
                        (e()(),
                        vl(
                            70,
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
                        vl(
                            71,
                            0,
                            null,
                            null,
                            6,
                            'input',
                            [['name', 'chain'], ['type', 'radio'], ['value', 'balance']],
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
                                                Wl(e, 72)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Wl(e, 72).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== Wl(e, 72)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                Wl(e, 72)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r = !1 !== Wl(e, 73).onChange() && r),
                                    'blur' === t &&
                                        (r = !1 !== Wl(e, 73).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (l.selectedChain = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        os(72, 16384, null, 0, ku, [yt, pt, [2, Au]], null, null),
                        os(
                            73,
                            212992,
                            null,
                            0,
                            Pu,
                            [yt, pt, Du, Le],
                            {name: [0, 'name'], value: [1, 'value']},
                            null,
                        ),
                        us(
                            1024,
                            null,
                            Su,
                            function(e, t) {
                                return [e, t];
                            },
                            [ku, Pu],
                        ),
                        os(
                            75,
                            671744,
                            null,
                            0,
                            gc,
                            [[8, null], [8, null], [8, null], [6, Su]],
                            {name: [0, 'name'], model: [1, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        us(2048, null, Ou, null, [gc]),
                        os(77, 16384, null, 0, Ju, [[4, Ou]], null, null),
                        (e()(), Vs(-1, null, [' Balance '])),
                        (e()(),
                        vl(79, 0, null, null, 9, 'p', [], null, null, null, null, null)),
                        (e()(),
                        vl(
                            80,
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
                        vl(
                            81,
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
                                                Wl(e, 82)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Wl(e, 82).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== Wl(e, 82)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                Wl(e, 82)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r = !1 !== Wl(e, 83).onChange() && r),
                                    'blur' === t &&
                                        (r = !1 !== Wl(e, 83).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (l.selectedChain = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        os(82, 16384, null, 0, ku, [yt, pt, [2, Au]], null, null),
                        os(
                            83,
                            212992,
                            null,
                            0,
                            Pu,
                            [yt, pt, Du, Le],
                            {name: [0, 'name'], value: [1, 'value']},
                            null,
                        ),
                        us(
                            1024,
                            null,
                            Su,
                            function(e, t) {
                                return [e, t];
                            },
                            [ku, Pu],
                        ),
                        os(
                            85,
                            671744,
                            null,
                            0,
                            gc,
                            [[8, null], [8, null], [8, null], [6, Su]],
                            {name: [0, 'name'], model: [1, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        us(2048, null, Ou, null, [gc]),
                        os(87, 16384, null, 0, Ju, [[4, Ou]], null, null),
                        (e()(), Vs(-1, null, [' Delay '])),
                        (e()(),
                        vl(89, 0, null, null, 9, 'p', [], null, null, null, null, null)),
                        (e()(),
                        vl(
                            90,
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
                        vl(
                            91,
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
                                                Wl(e, 92)._handleInput(n.target.value) &&
                                            r),
                                    'blur' === t &&
                                        (r = !1 !== Wl(e, 92).onTouched() && r),
                                    'compositionstart' === t &&
                                        (r = !1 !== Wl(e, 92)._compositionStart() && r),
                                    'compositionend' === t &&
                                        (r =
                                            !1 !==
                                                Wl(e, 92)._compositionEnd(
                                                    n.target.value,
                                                ) && r),
                                    'change' === t &&
                                        (r = !1 !== Wl(e, 93).onChange() && r),
                                    'blur' === t &&
                                        (r = !1 !== Wl(e, 93).onTouched() && r),
                                    'ngModelChange' === t &&
                                        (r = !1 !== (l.selectedChain = n) && r),
                                    r
                                );
                            },
                            null,
                            null,
                        )),
                        os(92, 16384, null, 0, ku, [yt, pt, [2, Au]], null, null),
                        os(
                            93,
                            212992,
                            null,
                            0,
                            Pu,
                            [yt, pt, Du, Le],
                            {name: [0, 'name'], value: [1, 'value']},
                            null,
                        ),
                        us(
                            1024,
                            null,
                            Su,
                            function(e, t) {
                                return [e, t];
                            },
                            [ku, Pu],
                        ),
                        os(
                            95,
                            671744,
                            null,
                            0,
                            gc,
                            [[8, null], [8, null], [8, null], [6, Su]],
                            {name: [0, 'name'], model: [1, 'model']},
                            {update: 'ngModelChange'},
                        ),
                        us(2048, null, Ou, null, [gc]),
                        os(97, 16384, null, 0, Ju, [[4, Ou]], null, null),
                        (e()(), Vs(-1, null, [' Complex '])),
                        (e()(),
                        vl(
                            99,
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
                        os(
                            100,
                            16384,
                            null,
                            0,
                            Go,
                            [],
                            {ngSwitch: [0, 'ngSwitch']},
                            null,
                        ),
                        (e()(), yl(16777216, null, null, 1, null, zc)),
                        os(
                            102,
                            278528,
                            null,
                            0,
                            qo,
                            [Jn, Qt, Go],
                            {ngSwitchCase: [0, 'ngSwitchCase']},
                            null,
                        ),
                        (e()(), yl(16777216, null, null, 1, null, Gc)),
                        os(
                            104,
                            278528,
                            null,
                            0,
                            qo,
                            [Jn, Qt, Go],
                            {ngSwitchCase: [0, 'ngSwitchCase']},
                            null,
                        ),
                        (e()(), yl(16777216, null, null, 1, null, qc)),
                        os(
                            106,
                            278528,
                            null,
                            0,
                            qo,
                            [Jn, Qt, Go],
                            {ngSwitchCase: [0, 'ngSwitchCase']},
                            null,
                        ),
                    ],
                    function(e, t) {
                        var n = t.component;
                        e(t, 19, 0, 'source', 'buffer'),
                            e(t, 21, 0, 'source', n.selectedSource),
                            e(t, 29, 0, 'source', 'media'),
                            e(t, 31, 0, 'source', n.selectedSource),
                            e(t, 39, 0, 'source', 'oscillator'),
                            e(t, 41, 0, 'source', n.selectedSource),
                            e(t, 46, 0, n.selectedSource),
                            e(t, 48, 0, 'buffer'),
                            e(t, 50, 0, 'media'),
                            e(t, 52, 0, 'oscillator'),
                            e(t, 63, 0, 'chain', 'dry'),
                            e(t, 65, 0, 'chain', n.selectedChain),
                            e(t, 73, 0, 'chain', 'balance'),
                            e(t, 75, 0, 'chain', n.selectedChain),
                            e(t, 83, 0, 'chain', 'delay'),
                            e(t, 85, 0, 'chain', n.selectedChain),
                            e(t, 93, 0, 'chain', 'complex'),
                            e(t, 95, 0, 'chain', n.selectedChain),
                            e(t, 100, 0, n.selectedChain),
                            e(t, 102, 0, 'balance'),
                            e(t, 104, 0, 'delay'),
                            e(t, 106, 0, 'complex');
                    },
                    function(e, t) {
                        e(
                            t,
                            17,
                            0,
                            Wl(t, 23).ngClassUntouched,
                            Wl(t, 23).ngClassTouched,
                            Wl(t, 23).ngClassPristine,
                            Wl(t, 23).ngClassDirty,
                            Wl(t, 23).ngClassValid,
                            Wl(t, 23).ngClassInvalid,
                            Wl(t, 23).ngClassPending,
                        ),
                            e(
                                t,
                                27,
                                0,
                                Wl(t, 33).ngClassUntouched,
                                Wl(t, 33).ngClassTouched,
                                Wl(t, 33).ngClassPristine,
                                Wl(t, 33).ngClassDirty,
                                Wl(t, 33).ngClassValid,
                                Wl(t, 33).ngClassInvalid,
                                Wl(t, 33).ngClassPending,
                            ),
                            e(
                                t,
                                37,
                                0,
                                Wl(t, 43).ngClassUntouched,
                                Wl(t, 43).ngClassTouched,
                                Wl(t, 43).ngClassPristine,
                                Wl(t, 43).ngClassDirty,
                                Wl(t, 43).ngClassValid,
                                Wl(t, 43).ngClassInvalid,
                                Wl(t, 43).ngClassPending,
                            ),
                            e(
                                t,
                                61,
                                0,
                                Wl(t, 67).ngClassUntouched,
                                Wl(t, 67).ngClassTouched,
                                Wl(t, 67).ngClassPristine,
                                Wl(t, 67).ngClassDirty,
                                Wl(t, 67).ngClassValid,
                                Wl(t, 67).ngClassInvalid,
                                Wl(t, 67).ngClassPending,
                            ),
                            e(
                                t,
                                71,
                                0,
                                Wl(t, 77).ngClassUntouched,
                                Wl(t, 77).ngClassTouched,
                                Wl(t, 77).ngClassPristine,
                                Wl(t, 77).ngClassDirty,
                                Wl(t, 77).ngClassValid,
                                Wl(t, 77).ngClassInvalid,
                                Wl(t, 77).ngClassPending,
                            ),
                            e(
                                t,
                                81,
                                0,
                                Wl(t, 87).ngClassUntouched,
                                Wl(t, 87).ngClassTouched,
                                Wl(t, 87).ngClassPristine,
                                Wl(t, 87).ngClassDirty,
                                Wl(t, 87).ngClassValid,
                                Wl(t, 87).ngClassInvalid,
                                Wl(t, 87).ngClassPending,
                            ),
                            e(
                                t,
                                91,
                                0,
                                Wl(t, 97).ngClassUntouched,
                                Wl(t, 97).ngClassTouched,
                                Wl(t, 97).ngClassPristine,
                                Wl(t, 97).ngClassDirty,
                                Wl(t, 97).ngClassValid,
                                Wl(t, 97).ngClassInvalid,
                                Wl(t, 97).ngClassPending,
                            );
                    },
                );
            }
            function Wc(e) {
                return Ps(
                    2,
                    [
                        as(0, Mc, [no]),
                        as(0, Rc, []),
                        xs(671088640, 1, {chain: 0}),
                        (e()(),
                        vl(
                            3,
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
                        vl(4, 0, null, null, 1, 'h1', [], null, null, null, null, null)),
                        (e()(), Vs(-1, null, ['@ng-web-apis/audio demo'])),
                        (e()(),
                        vl(
                            6,
                            0,
                            null,
                            null,
                            3,
                            'main',
                            [],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(), yl(16777216, null, null, 1, null, jc)),
                        os(
                            8,
                            16384,
                            null,
                            0,
                            Bo,
                            [Jn, Qt],
                            {ngIf: [0, 'ngIf'], ngIfElse: [1, 'ngIfElse']},
                            null,
                        ),
                        (e()(), yl(0, [['graph', 2]], null, 0, null, Zc)),
                        (e()(),
                        vl(
                            10,
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
                        (e()(), Vs(-1, null, [' Get it here: '])),
                        (e()(),
                        vl(
                            12,
                            0,
                            null,
                            null,
                            1,
                            'a',
                            [['href', 'https://github.com/ng-web-apis/audio']],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(), Vs(-1, null, ['GitHub'])),
                        (e()(), Vs(-1, null, [' | '])),
                        (e()(),
                        vl(
                            15,
                            0,
                            null,
                            null,
                            1,
                            'a',
                            [
                                [
                                    'href',
                                    'https://www.npmjs.com/package/@ng-web-apis/audio',
                                ],
                            ],
                            null,
                            null,
                            null,
                            null,
                            null,
                        )),
                        (e()(), Vs(-1, null, ['NPM'])),
                    ],
                    function(e, t) {
                        e(t, 8, 0, !t.component.started, Wl(t, 9));
                    },
                    null,
                );
            }
            function Qc(e) {
                return Ps(
                    0,
                    [
                        (e()(),
                        vl(0, 0, null, null, 1, 'app', [], null, null, null, Wc, Fc)),
                        os(1, 49152, null, 0, Ui, [no], null, null),
                    ],
                    null,
                    null,
                );
            }
            var Kc = Fl('app', Ui, Qc, {}, {}, []);
            class Jc {}
            var Yc = Hi(Bi, [Ui], function(e) {
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
                    kl(512, at, ut, [[8, [Kc]], [3, at], dt]),
                    kl(4608, Du, Du, []),
                    kl(5120, Er, Sr, [[3, Er]]),
                    kl(4608, Ro, Fo, [Er, [2, Mo]]),
                    kl(4608, bn, bn, []),
                    kl(5120, _r, xr, []),
                    kl(5120, yr, Tr, []),
                    kl(4608, ou, au, [Wo]),
                    kl(6144, bt, null, [ou]),
                    kl(4608, eu, nu, []),
                    kl(
                        5120,
                        Ca,
                        function(e, t, n, r, l, s, i, o) {
                            return [new Ya(e, t, n), new iu(r), new ru(l, s, i, o)];
                        },
                        [Wo, In, pn, Wo, Wo, eu, gn, [2, tu]],
                    ),
                    kl(4608, Ea, Ea, [Ca, In]),
                    kl(135680, Sa, Sa, [Wo]),
                    kl(4608, Da, Da, [Ea, Sa, dn]),
                    kl(6144, mt, null, [Da]),
                    kl(6144, Ta, null, [Sa]),
                    kl(4608, Rn, Rn, [In]),
                    kl(4608, So, No, [To, [2, Ao]]),
                    kl(1073742336, mc, mc, []),
                    kl(1073742336, _c, _c, []),
                    kl(1073742336, Jc, Jc, []),
                    kl(1073742336, Zo, Zo, []),
                    kl(1024, sn, mu, []),
                    kl(256, dn, 'demo', []),
                    kl(2048, ga, null, [dn]),
                    kl(
                        1024,
                        un,
                        function(e, t, n, r) {
                            return [
                                ((l = e),
                                va('probe', ba),
                                va(
                                    'coreTokens',
                                    Object.assign(
                                        {},
                                        wa,
                                        (l || []).reduce(
                                            (e, t) => ((e[t.name] = t.token), e),
                                            {},
                                        ),
                                    ),
                                ),
                                () => ba),
                                ma(t, n, r),
                            ];
                            var l;
                        },
                        [[2, $n], ga, Wo, Le],
                    ),
                    kl(512, cn, cn, [[2, un]]),
                    kl(131584, Wn, Wn, [In, gn, Le, sn, at, cn]),
                    kl(1073742336, Ar, Ar, [Wn]),
                    kl(1073742336, _u, _u, [[3, _u]]),
                    kl(1073742336, Bi, Bi, []),
                    kl(256, nt, !0, []),
                ]);
            });
            gu()
                .bootstrapModuleFactory(Yc)
                .then(e => {
                    const t = window;
                    t.ngRef && t.ngRef.destroy(), (t.ngRef = e);
                })
                .catch(e => console.error(e));
        },
    },
    [[0, 0]],
]);
