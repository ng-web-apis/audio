(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "../../$$_lazy_route_resource lazy recursive":
/*!*****************************************************************************************!*\
  !*** /home/travis/build/ng-web-apis/audio/$$_lazy_route_resource lazy namespace object ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../audio/src/constants/polling-time.ts":
/*!**********************************************!*\
  !*** ../audio/src/constants/polling-time.ts ***!
  \**********************************************/
/*! exports provided: POLLING_TIME */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POLLING_TIME", function() { return POLLING_TIME; });
const POLLING_TIME = 100;


/***/ }),

/***/ "../audio/src/decorators/audio-param.ts":
/*!**********************************************!*\
  !*** ../audio/src/decorators/audio-param.ts ***!
  \**********************************************/
/*! exports provided: audioParam */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "audioParam", function() { return audioParam; });
/* harmony import */ var _utils_process_audio_param__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/process-audio-param */ "../audio/src/utils/process-audio-param.ts");

function audioParam(param = '') {
    const decorator = (target, propertyKey) => {
        Object.defineProperty(target, propertyKey, {
            set(value) {
                value = typeof value === 'string' ? Number.parseFloat(value) : value;
                const audioParam = this instanceof AudioWorkletNode
                    ? this.parameters.get(propertyKey)
                    : this[param];
                if (audioParam instanceof AudioParam) {
                    Object(_utils_process_audio_param__WEBPACK_IMPORTED_MODULE_0__["processAudioParam"])(audioParam, value, this.context.currentTime);
                }
                else {
                    // Fallback for older browsers
                    Object.defineProperty(target, propertyKey, { value });
                }
            },
        });
    };
    return decorator;
}


/***/ }),

/***/ "../audio/src/directives/audio-context.ts":
/*!************************************************!*\
  !*** ../audio/src/directives/audio-context.ts ***!
  \************************************************/
/*! exports provided: WebAudioContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebAudioContext", function() { return WebAudioContext; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _tokens_audio_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tokens/audio-context */ "../audio/src/tokens/audio-context.ts");
/* harmony import */ var _utils_latency_hint_factory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/latency-hint-factory */ "../audio/src/utils/latency-hint-factory.ts");

var WebAudioContext_1;



// @dynamic
let WebAudioContext = WebAudioContext_1 = class WebAudioContext extends AudioContext {
    constructor(latencyHint, sampleRate) {
        super({
            latencyHint: Object(_utils_latency_hint_factory__WEBPACK_IMPORTED_MODULE_3__["latencyHintFactory"])(latencyHint),
            sampleRate: parseInt(sampleRate || '', 10) || undefined,
        });
    }
    ngOnDestroy() {
        this.close();
    }
};
WebAudioContext = WebAudioContext_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
        selector: '[waAudioContext]',
        providers: [
            {
                provide: _tokens_audio_context__WEBPACK_IMPORTED_MODULE_2__["AUDIO_CONTEXT"],
                useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(() => WebAudioContext_1),
            },
        ],
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"])('latencyHint')),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"])('sampleRate')),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object, Object])
], WebAudioContext);



/***/ }),

/***/ "../audio/src/directives/channel.ts":
/*!******************************************!*\
  !*** ../audio/src/directives/channel.ts ***!
  \******************************************/
/*! exports provided: WebAudioChannel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebAudioChannel", function() { return WebAudioChannel; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _tokens_audio_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tokens/audio-context */ "../audio/src/tokens/audio-context.ts");
/* harmony import */ var _tokens_constructor_support__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tokens/constructor-support */ "../audio/src/tokens/constructor-support.ts");

var WebAudioChannel_1;



// @dynamic
let WebAudioChannel = WebAudioChannel_1 = class WebAudioChannel extends GainNode {
    constructor(context, modern) {
        if (modern) {
            super(context);
        }
        else {
            const result = context.createGain();
            Object.setPrototypeOf(result, WebAudioChannel_1.prototype);
            return result;
        }
    }
    ngOnDestroy() {
        this.disconnect();
    }
};
WebAudioChannel = WebAudioChannel_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
        selector: '[waChannel]',
        exportAs: 'AudioNode',
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_context__WEBPACK_IMPORTED_MODULE_2__["AUDIO_CONTEXT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_constructor_support__WEBPACK_IMPORTED_MODULE_3__["CONSTRUCTOR_SUPPORT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [BaseAudioContext, Boolean])
], WebAudioChannel);



/***/ }),

/***/ "../audio/src/directives/destination.ts":
/*!**********************************************!*\
  !*** ../audio/src/directives/destination.ts ***!
  \**********************************************/
/*! exports provided: WebAudioDestination */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebAudioDestination", function() { return WebAudioDestination; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _constants_polling_time__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants/polling-time */ "../audio/src/constants/polling-time.ts");
/* harmony import */ var _tokens_audio_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../tokens/audio-context */ "../audio/src/tokens/audio-context.ts");
/* harmony import */ var _tokens_audio_node__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../tokens/audio-node */ "../audio/src/tokens/audio-node.ts");
/* harmony import */ var _tokens_constructor_support__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../tokens/constructor-support */ "../audio/src/tokens/constructor-support.ts");
/* harmony import */ var _utils_connect__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/connect */ "../audio/src/utils/connect.ts");

var WebAudioDestination_1;








// @dynamic
let WebAudioDestination = WebAudioDestination_1 = class WebAudioDestination extends AnalyserNode {
    constructor(context, node, modern) {
        if (modern) {
            super(context);
            WebAudioDestination_1.init(this, node);
        }
        else {
            const result = context.createAnalyser();
            Object.setPrototypeOf(result, WebAudioDestination_1.prototype);
            WebAudioDestination_1.init(result, node);
            return result;
        }
    }
    ngOnDestroy() {
        this.disconnect();
    }
    isSilent(array) {
        return Math.abs(array.reduce((acc, cur) => acc + cur, 0)) < 0.001;
    }
    static init(that, node) {
        Object(_utils_connect__WEBPACK_IMPORTED_MODULE_8__["connect"])(node, that);
        that.fftSize = 256;
        that.connect(that.context.destination);
        that.quiet = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["interval"])(_constants_polling_time__WEBPACK_IMPORTED_MODULE_4__["POLLING_TIME"]).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["mapTo"])(new Float32Array(that.fftSize)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(array => that.getFloatTimeDomainData(array)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(array => that.isSilent(array)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["skipWhile"])(isSilent => isSilent), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["debounceTime"])(5000), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(isSilent => isSilent));
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"])
], WebAudioDestination.prototype, "quiet", void 0);
WebAudioDestination = WebAudioDestination_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
        selector: '[waAudioDestinationNode]',
        exportAs: 'AudioNode',
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_context__WEBPACK_IMPORTED_MODULE_5__["AUDIO_CONTEXT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_node__WEBPACK_IMPORTED_MODULE_6__["AUDIO_NODE"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_constructor_support__WEBPACK_IMPORTED_MODULE_7__["CONSTRUCTOR_SUPPORT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [BaseAudioContext, Object, Boolean])
], WebAudioDestination);



/***/ }),

/***/ "../audio/src/directives/listener.ts":
/*!*******************************************!*\
  !*** ../audio/src/directives/listener.ts ***!
  \*******************************************/
/*! exports provided: WebAudioListener */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebAudioListener", function() { return WebAudioListener; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _decorators_audio_param__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../decorators/audio-param */ "../audio/src/decorators/audio-param.ts");
/* harmony import */ var _tokens_audio_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tokens/audio-context */ "../audio/src/tokens/audio-context.ts");
/* harmony import */ var _tokens_constructor_support__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tokens/constructor-support */ "../audio/src/tokens/constructor-support.ts");
/* harmony import */ var _utils_fallback_audio_param__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/fallback-audio-param */ "../audio/src/utils/fallback-audio-param.ts");

var WebAudioListener_1;





// @dynamic
let WebAudioListener = WebAudioListener_1 = class WebAudioListener extends GainNode {
    constructor(context, modern) {
        if (modern) {
            super(context);
        }
        else {
            const result = context.createGain();
            Object.setPrototypeOf(result, WebAudioListener_1.prototype);
            return result;
        }
    }
    get forwardX() {
        return this.context.listener.forwardX;
    }
    get forwardY() {
        return this.context.listener.forwardY;
    }
    get forwardZ() {
        return this.context.listener.forwardZ;
    }
    get positionX() {
        return this.context.listener.positionX;
    }
    get positionY() {
        return this.context.listener.positionY;
    }
    get positionZ() {
        return this.context.listener.positionZ;
    }
    get upX() {
        return this.context.listener.upX;
    }
    get upY() {
        return this.context.listener.upY;
    }
    get upZ() {
        return this.context.listener.upZ;
    }
    ngOnChanges() {
        if (this.context.listener.positionX instanceof AudioParam) {
            return;
        }
        // Fallback for older browsers
        this.context.listener.setOrientation(Object(_utils_fallback_audio_param__WEBPACK_IMPORTED_MODULE_5__["fallbackAudioParam"])(this.forwardXParam), Object(_utils_fallback_audio_param__WEBPACK_IMPORTED_MODULE_5__["fallbackAudioParam"])(this.forwardYParam), Object(_utils_fallback_audio_param__WEBPACK_IMPORTED_MODULE_5__["fallbackAudioParam"])(this.forwardZParam), Object(_utils_fallback_audio_param__WEBPACK_IMPORTED_MODULE_5__["fallbackAudioParam"])(this.upXParam), Object(_utils_fallback_audio_param__WEBPACK_IMPORTED_MODULE_5__["fallbackAudioParam"])(this.upYParam), Object(_utils_fallback_audio_param__WEBPACK_IMPORTED_MODULE_5__["fallbackAudioParam"])(this.upZParam));
        this.context.listener.setPosition(Object(_utils_fallback_audio_param__WEBPACK_IMPORTED_MODULE_5__["fallbackAudioParam"])(this.positionXParam), Object(_utils_fallback_audio_param__WEBPACK_IMPORTED_MODULE_5__["fallbackAudioParam"])(this.positionYParam), Object(_utils_fallback_audio_param__WEBPACK_IMPORTED_MODULE_5__["fallbackAudioParam"])(this.positionZParam));
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('forwardX'),
    Object(_decorators_audio_param__WEBPACK_IMPORTED_MODULE_2__["audioParam"])('forwardX'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], WebAudioListener.prototype, "forwardXParam", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('forwardY'),
    Object(_decorators_audio_param__WEBPACK_IMPORTED_MODULE_2__["audioParam"])('forwardY'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], WebAudioListener.prototype, "forwardYParam", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('forwardZ'),
    Object(_decorators_audio_param__WEBPACK_IMPORTED_MODULE_2__["audioParam"])('forwardZ'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], WebAudioListener.prototype, "forwardZParam", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('positionX'),
    Object(_decorators_audio_param__WEBPACK_IMPORTED_MODULE_2__["audioParam"])('positionX'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], WebAudioListener.prototype, "positionXParam", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('positionY'),
    Object(_decorators_audio_param__WEBPACK_IMPORTED_MODULE_2__["audioParam"])('positionY'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], WebAudioListener.prototype, "positionYParam", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('positionZ'),
    Object(_decorators_audio_param__WEBPACK_IMPORTED_MODULE_2__["audioParam"])('positionZ'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], WebAudioListener.prototype, "positionZParam", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('upX'),
    Object(_decorators_audio_param__WEBPACK_IMPORTED_MODULE_2__["audioParam"])('upX'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], WebAudioListener.prototype, "upXParam", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('upY'),
    Object(_decorators_audio_param__WEBPACK_IMPORTED_MODULE_2__["audioParam"])('upY'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], WebAudioListener.prototype, "upYParam", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('upZ'),
    Object(_decorators_audio_param__WEBPACK_IMPORTED_MODULE_2__["audioParam"])('upZ'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], WebAudioListener.prototype, "upZParam", void 0);
WebAudioListener = WebAudioListener_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
        selector: '[waAudioContext],[waOfflineAudioContext][length][sampleRate]',
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Self"])()), tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_context__WEBPACK_IMPORTED_MODULE_3__["AUDIO_CONTEXT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_constructor_support__WEBPACK_IMPORTED_MODULE_4__["CONSTRUCTOR_SUPPORT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [BaseAudioContext, Boolean])
], WebAudioListener);



/***/ }),

/***/ "../audio/src/directives/offline-audio-context.ts":
/*!********************************************************!*\
  !*** ../audio/src/directives/offline-audio-context.ts ***!
  \********************************************************/
/*! exports provided: WebAudioOfflineContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebAudioOfflineContext", function() { return WebAudioOfflineContext; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _tokens_audio_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tokens/audio-context */ "../audio/src/tokens/audio-context.ts");

var WebAudioOfflineContext_1;


// @dynamic
let WebAudioOfflineContext = WebAudioOfflineContext_1 = class WebAudioOfflineContext extends OfflineAudioContext {
    constructor(length, sampleRate, numberOfChannels, autoplay) {
        super(parseInt(numberOfChannels || '', 10) || 1, parseInt(length, 10), parseInt(sampleRate, 10));
        this.complete = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.oncomplete = ({ renderedBuffer }) => this.complete.emit(renderedBuffer);
        if (autoplay !== null) {
            this.startRendering();
        }
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], WebAudioOfflineContext.prototype, "complete", void 0);
WebAudioOfflineContext = WebAudioOfflineContext_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
        selector: '[waOfflineAudioContext][length][sampleRate]',
        providers: [
            {
                provide: _tokens_audio_context__WEBPACK_IMPORTED_MODULE_2__["AUDIO_CONTEXT"],
                useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(() => WebAudioOfflineContext_1),
            },
        ],
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"])('length')),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"])('sampleRate')),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"])('numberOfChannels')),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"])('autoplay')),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [String, String, Object, Object])
], WebAudioOfflineContext);



/***/ }),

/***/ "../audio/src/directives/output.ts":
/*!*****************************************!*\
  !*** ../audio/src/directives/output.ts ***!
  \*****************************************/
/*! exports provided: WebAudioOutput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebAudioOutput", function() { return WebAudioOutput; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _tokens_audio_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tokens/audio-context */ "../audio/src/tokens/audio-context.ts");
/* harmony import */ var _tokens_audio_node__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tokens/audio-node */ "../audio/src/tokens/audio-node.ts");
/* harmony import */ var _tokens_constructor_support__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tokens/constructor-support */ "../audio/src/tokens/constructor-support.ts");
/* harmony import */ var _utils_connect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/connect */ "../audio/src/utils/connect.ts");

var WebAudioOutput_1;





// @dynamic
let WebAudioOutput = WebAudioOutput_1 = class WebAudioOutput extends GainNode {
    constructor(context, node, modern) {
        if (modern) {
            super(context);
            Object(_utils_connect__WEBPACK_IMPORTED_MODULE_5__["connect"])(node, this);
        }
        else {
            const result = context.createGain();
            Object.setPrototypeOf(result, WebAudioOutput_1.prototype);
            Object(_utils_connect__WEBPACK_IMPORTED_MODULE_5__["connect"])(node, result);
            return result;
        }
    }
    set waOutput(destination) {
        this.disconnect();
        Object(_utils_connect__WEBPACK_IMPORTED_MODULE_5__["connect"])(this, destination);
    }
    ngOnDestroy() {
        this.disconnect();
    }
    static init(that, node) {
        Object(_utils_connect__WEBPACK_IMPORTED_MODULE_5__["connect"])(node, that);
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object])
], WebAudioOutput.prototype, "waOutput", null);
WebAudioOutput = WebAudioOutput_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
        selector: '[waOutput]',
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_context__WEBPACK_IMPORTED_MODULE_2__["AUDIO_CONTEXT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_node__WEBPACK_IMPORTED_MODULE_3__["AUDIO_NODE"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_constructor_support__WEBPACK_IMPORTED_MODULE_4__["CONSTRUCTOR_SUPPORT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [BaseAudioContext, Object, Boolean])
], WebAudioOutput);



/***/ }),

/***/ "../audio/src/directives/stream-destination.ts":
/*!*****************************************************!*\
  !*** ../audio/src/directives/stream-destination.ts ***!
  \*****************************************************/
/*! exports provided: WebAudioMediaStreamDestination */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebAudioMediaStreamDestination", function() { return WebAudioMediaStreamDestination; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _tokens_audio_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tokens/audio-context */ "../audio/src/tokens/audio-context.ts");
/* harmony import */ var _tokens_audio_node__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tokens/audio-node */ "../audio/src/tokens/audio-node.ts");
/* harmony import */ var _tokens_constructor_support__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tokens/constructor-support */ "../audio/src/tokens/constructor-support.ts");
/* harmony import */ var _utils_connect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/connect */ "../audio/src/utils/connect.ts");

var WebAudioMediaStreamDestination_1;





// @dynamic
let WebAudioMediaStreamDestination = WebAudioMediaStreamDestination_1 = class WebAudioMediaStreamDestination extends MediaStreamAudioDestinationNode {
    constructor(context, node, modern) {
        if (modern) {
            super(context);
            Object(_utils_connect__WEBPACK_IMPORTED_MODULE_5__["connect"])(node, this);
        }
        else {
            const result = context.createMediaStreamDestination();
            Object.setPrototypeOf(result, WebAudioMediaStreamDestination_1.prototype);
            Object(_utils_connect__WEBPACK_IMPORTED_MODULE_5__["connect"])(node, result);
            return result;
        }
    }
};
WebAudioMediaStreamDestination = WebAudioMediaStreamDestination_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
        selector: '[waMediaStreamAudioDestinationNode]',
        exportAs: 'AudioNode',
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_context__WEBPACK_IMPORTED_MODULE_2__["AUDIO_CONTEXT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_node__WEBPACK_IMPORTED_MODULE_3__["AUDIO_NODE"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_constructor_support__WEBPACK_IMPORTED_MODULE_4__["CONSTRUCTOR_SUPPORT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [AudioContext, Object, Boolean])
], WebAudioMediaStreamDestination);



/***/ }),

/***/ "../audio/src/module.ts":
/*!******************************!*\
  !*** ../audio/src/module.ts ***!
  \******************************/
/*! exports provided: WebAudioModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebAudioModule", function() { return WebAudioModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _directives_audio_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./directives/audio-context */ "../audio/src/directives/audio-context.ts");
/* harmony import */ var _directives_channel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./directives/channel */ "../audio/src/directives/channel.ts");
/* harmony import */ var _directives_destination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./directives/destination */ "../audio/src/directives/destination.ts");
/* harmony import */ var _directives_listener__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./directives/listener */ "../audio/src/directives/listener.ts");
/* harmony import */ var _directives_offline_audio_context__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./directives/offline-audio-context */ "../audio/src/directives/offline-audio-context.ts");
/* harmony import */ var _directives_output__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./directives/output */ "../audio/src/directives/output.ts");
/* harmony import */ var _directives_stream_destination__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./directives/stream-destination */ "../audio/src/directives/stream-destination.ts");
/* harmony import */ var _nodes_analyser__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./nodes/analyser */ "../audio/src/nodes/analyser.ts");
/* harmony import */ var _nodes_biquad_filter__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./nodes/biquad-filter */ "../audio/src/nodes/biquad-filter.ts");
/* harmony import */ var _nodes_channel_merger__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./nodes/channel-merger */ "../audio/src/nodes/channel-merger.ts");
/* harmony import */ var _nodes_channel_splitter__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./nodes/channel-splitter */ "../audio/src/nodes/channel-splitter.ts");
/* harmony import */ var _nodes_convolver__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./nodes/convolver */ "../audio/src/nodes/convolver.ts");
/* harmony import */ var _nodes_delay__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./nodes/delay */ "../audio/src/nodes/delay.ts");
/* harmony import */ var _nodes_dynamics_compressor__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./nodes/dynamics-compressor */ "../audio/src/nodes/dynamics-compressor.ts");
/* harmony import */ var _nodes_gain__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./nodes/gain */ "../audio/src/nodes/gain.ts");
/* harmony import */ var _nodes_iir_filter__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./nodes/iir-filter */ "../audio/src/nodes/iir-filter.ts");
/* harmony import */ var _nodes_panner__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./nodes/panner */ "../audio/src/nodes/panner.ts");
/* harmony import */ var _nodes_script_processor__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./nodes/script-processor */ "../audio/src/nodes/script-processor.ts");
/* harmony import */ var _nodes_stereo_panner__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./nodes/stereo-panner */ "../audio/src/nodes/stereo-panner.ts");
/* harmony import */ var _nodes_wave_shaper__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./nodes/wave-shaper */ "../audio/src/nodes/wave-shaper.ts");
/* harmony import */ var _nodes_worklet__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./nodes/worklet */ "../audio/src/nodes/worklet.ts");
/* harmony import */ var _pipes_audio_param_pipe__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./pipes/audio-param.pipe */ "../audio/src/pipes/audio-param.pipe.ts");
/* harmony import */ var _pipes_periodic_wave_pipe__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./pipes/periodic-wave.pipe */ "../audio/src/pipes/periodic-wave.pipe.ts");
/* harmony import */ var _sources_buffer_source__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./sources/buffer-source */ "../audio/src/sources/buffer-source.ts");
/* harmony import */ var _sources_constant_source__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./sources/constant-source */ "../audio/src/sources/constant-source.ts");
/* harmony import */ var _sources_media_source__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./sources/media-source */ "../audio/src/sources/media-source.ts");
/* harmony import */ var _sources_media_stream_source__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./sources/media-stream-source */ "../audio/src/sources/media-stream-source.ts");
/* harmony import */ var _sources_media_stream_track_source__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./sources/media-stream-track-source */ "../audio/src/sources/media-stream-track-source.ts");
/* harmony import */ var _sources_oscillator__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./sources/oscillator */ "../audio/src/sources/oscillator.ts");































let WebAudioModule = class WebAudioModule {
};
WebAudioModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [
            _directives_audio_context__WEBPACK_IMPORTED_MODULE_2__["WebAudioContext"],
            _directives_channel__WEBPACK_IMPORTED_MODULE_3__["WebAudioChannel"],
            _directives_destination__WEBPACK_IMPORTED_MODULE_4__["WebAudioDestination"],
            _directives_listener__WEBPACK_IMPORTED_MODULE_5__["WebAudioListener"],
            _directives_offline_audio_context__WEBPACK_IMPORTED_MODULE_6__["WebAudioOfflineContext"],
            _directives_output__WEBPACK_IMPORTED_MODULE_7__["WebAudioOutput"],
            _directives_stream_destination__WEBPACK_IMPORTED_MODULE_8__["WebAudioMediaStreamDestination"],
            _sources_buffer_source__WEBPACK_IMPORTED_MODULE_25__["WebAudioBufferSource"],
            _sources_constant_source__WEBPACK_IMPORTED_MODULE_26__["WebAudioConstantSource"],
            _sources_media_source__WEBPACK_IMPORTED_MODULE_27__["WebAudioMediaSource"],
            _sources_media_stream_source__WEBPACK_IMPORTED_MODULE_28__["WebAudioMediaStreamSource"],
            _sources_media_stream_track_source__WEBPACK_IMPORTED_MODULE_29__["WebAudioMediaStreamTrackSource"],
            _sources_oscillator__WEBPACK_IMPORTED_MODULE_30__["WebAudioOscillator"],
            _nodes_analyser__WEBPACK_IMPORTED_MODULE_9__["WebAudioAnalyser"],
            _nodes_biquad_filter__WEBPACK_IMPORTED_MODULE_10__["WebAudioBiquadFilter"],
            _nodes_channel_splitter__WEBPACK_IMPORTED_MODULE_12__["WebAudioChannelSplitter"],
            _nodes_channel_merger__WEBPACK_IMPORTED_MODULE_11__["WebAudioChannelMerger"],
            _nodes_convolver__WEBPACK_IMPORTED_MODULE_13__["WebAudioConvolver"],
            _nodes_delay__WEBPACK_IMPORTED_MODULE_14__["WebAudioDelay"],
            _nodes_dynamics_compressor__WEBPACK_IMPORTED_MODULE_15__["WebAudioDynamicsCompressor"],
            _nodes_gain__WEBPACK_IMPORTED_MODULE_16__["WebAudioGain"],
            _nodes_iir_filter__WEBPACK_IMPORTED_MODULE_17__["WebAudioIIRFilter"],
            _nodes_panner__WEBPACK_IMPORTED_MODULE_18__["WebAudioPanner"],
            _nodes_script_processor__WEBPACK_IMPORTED_MODULE_19__["WebAudioScriptProcessor"],
            _nodes_stereo_panner__WEBPACK_IMPORTED_MODULE_20__["WebAudioStereoPanner"],
            _nodes_wave_shaper__WEBPACK_IMPORTED_MODULE_21__["WebAudioWaveShaper"],
            _nodes_worklet__WEBPACK_IMPORTED_MODULE_22__["WebAudioWorklet"],
            _pipes_audio_param_pipe__WEBPACK_IMPORTED_MODULE_23__["WebAudioParamPipe"],
            _pipes_periodic_wave_pipe__WEBPACK_IMPORTED_MODULE_24__["WebAudioPeriodicWavePipe"],
        ],
        exports: [
            _directives_audio_context__WEBPACK_IMPORTED_MODULE_2__["WebAudioContext"],
            _directives_channel__WEBPACK_IMPORTED_MODULE_3__["WebAudioChannel"],
            _directives_destination__WEBPACK_IMPORTED_MODULE_4__["WebAudioDestination"],
            _directives_listener__WEBPACK_IMPORTED_MODULE_5__["WebAudioListener"],
            _directives_offline_audio_context__WEBPACK_IMPORTED_MODULE_6__["WebAudioOfflineContext"],
            _directives_output__WEBPACK_IMPORTED_MODULE_7__["WebAudioOutput"],
            _directives_stream_destination__WEBPACK_IMPORTED_MODULE_8__["WebAudioMediaStreamDestination"],
            _sources_buffer_source__WEBPACK_IMPORTED_MODULE_25__["WebAudioBufferSource"],
            _sources_constant_source__WEBPACK_IMPORTED_MODULE_26__["WebAudioConstantSource"],
            _sources_media_source__WEBPACK_IMPORTED_MODULE_27__["WebAudioMediaSource"],
            _sources_media_stream_source__WEBPACK_IMPORTED_MODULE_28__["WebAudioMediaStreamSource"],
            _sources_media_stream_track_source__WEBPACK_IMPORTED_MODULE_29__["WebAudioMediaStreamTrackSource"],
            _sources_oscillator__WEBPACK_IMPORTED_MODULE_30__["WebAudioOscillator"],
            _nodes_analyser__WEBPACK_IMPORTED_MODULE_9__["WebAudioAnalyser"],
            _nodes_biquad_filter__WEBPACK_IMPORTED_MODULE_10__["WebAudioBiquadFilter"],
            _nodes_channel_splitter__WEBPACK_IMPORTED_MODULE_12__["WebAudioChannelSplitter"],
            _nodes_channel_merger__WEBPACK_IMPORTED_MODULE_11__["WebAudioChannelMerger"],
            _nodes_convolver__WEBPACK_IMPORTED_MODULE_13__["WebAudioConvolver"],
            _nodes_delay__WEBPACK_IMPORTED_MODULE_14__["WebAudioDelay"],
            _nodes_dynamics_compressor__WEBPACK_IMPORTED_MODULE_15__["WebAudioDynamicsCompressor"],
            _nodes_gain__WEBPACK_IMPORTED_MODULE_16__["WebAudioGain"],
            _nodes_iir_filter__WEBPACK_IMPORTED_MODULE_17__["WebAudioIIRFilter"],
            _nodes_panner__WEBPACK_IMPORTED_MODULE_18__["WebAudioPanner"],
            _nodes_script_processor__WEBPACK_IMPORTED_MODULE_19__["WebAudioScriptProcessor"],
            _nodes_stereo_panner__WEBPACK_IMPORTED_MODULE_20__["WebAudioStereoPanner"],
            _nodes_wave_shaper__WEBPACK_IMPORTED_MODULE_21__["WebAudioWaveShaper"],
            _nodes_worklet__WEBPACK_IMPORTED_MODULE_22__["WebAudioWorklet"],
            _pipes_audio_param_pipe__WEBPACK_IMPORTED_MODULE_23__["WebAudioParamPipe"],
            _pipes_periodic_wave_pipe__WEBPACK_IMPORTED_MODULE_24__["WebAudioPeriodicWavePipe"],
        ],
    })
], WebAudioModule);



/***/ }),

/***/ "../audio/src/nodes/analyser.ts":
/*!**************************************!*\
  !*** ../audio/src/nodes/analyser.ts ***!
  \**************************************/
/*! exports provided: WebAudioAnalyser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebAudioAnalyser", function() { return WebAudioAnalyser; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _tokens_audio_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tokens/audio-context */ "../audio/src/tokens/audio-context.ts");
/* harmony import */ var _tokens_audio_node__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../tokens/audio-node */ "../audio/src/tokens/audio-node.ts");
/* harmony import */ var _tokens_constructor_support__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../tokens/constructor-support */ "../audio/src/tokens/constructor-support.ts");
/* harmony import */ var _utils_connect__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/connect */ "../audio/src/utils/connect.ts");
/* harmony import */ var _utils_parse__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/parse */ "../audio/src/utils/parse.ts");

var WebAudioAnalyser_1;








// @dynamic
let WebAudioAnalyser = WebAudioAnalyser_1 = class WebAudioAnalyser extends AnalyserNode {
    constructor(context, node, modern, fftSizeArg, maxDecibelsArg, minDecibelsArg, smoothingTimeConstantArg) {
        const fftSize = Object(_utils_parse__WEBPACK_IMPORTED_MODULE_8__["parse"])(fftSizeArg, 2048);
        const maxDecibels = Object(_utils_parse__WEBPACK_IMPORTED_MODULE_8__["parse"])(maxDecibelsArg, -30);
        const minDecibels = Object(_utils_parse__WEBPACK_IMPORTED_MODULE_8__["parse"])(minDecibelsArg, -100);
        const smoothingTimeConstant = Object(_utils_parse__WEBPACK_IMPORTED_MODULE_8__["parse"])(smoothingTimeConstantArg, 0.8);
        if (modern) {
            super(context, { fftSize, maxDecibels, minDecibels, smoothingTimeConstant });
            WebAudioAnalyser_1.init(this, node);
        }
        else {
            const result = context.createAnalyser();
            Object.setPrototypeOf(result, WebAudioAnalyser_1.prototype);
            WebAudioAnalyser_1.init(result, node);
            result.fftSize = fftSize;
            result.maxDecibels = maxDecibels;
            result.minDecibels = minDecibels;
            result.smoothingTimeConstant = smoothingTimeConstant;
            return result;
        }
    }
    ngOnDestroy() {
        this.disconnect();
    }
    static init(that, node) {
        Object(_utils_connect__WEBPACK_IMPORTED_MODULE_7__["connect"])(node, that);
        let freqByte = new Uint8Array(that.frequencyBinCount);
        let freqFloat = new Float32Array(that.frequencyBinCount);
        let timeByte = new Uint8Array(that.fftSize);
        let timeFloat = new Float32Array(that.fftSize);
        that.frequencyByte$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["interval"])(0, rxjs__WEBPACK_IMPORTED_MODULE_2__["animationFrameScheduler"]).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(() => {
            if (freqByte.length !== that.frequencyBinCount) {
                freqByte = new Uint8Array(that.frequencyBinCount);
            }
            that.getByteFrequencyData(freqByte);
            return freqByte;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["share"])());
        that.frequencyFloat$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["interval"])(0, rxjs__WEBPACK_IMPORTED_MODULE_2__["animationFrameScheduler"]).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(() => {
            if (freqFloat.length !== that.frequencyBinCount) {
                freqFloat = new Float32Array(that.frequencyBinCount);
            }
            that.getFloatFrequencyData(freqFloat);
            return freqFloat;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["share"])());
        that.timeByte$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["interval"])(0, rxjs__WEBPACK_IMPORTED_MODULE_2__["animationFrameScheduler"]).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(() => {
            if (timeByte.length !== that.fftSize) {
                timeByte = new Uint8Array(that.frequencyBinCount);
            }
            that.getByteTimeDomainData(timeByte);
            return timeByte;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["share"])());
        that.timeFloat$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["interval"])(0, rxjs__WEBPACK_IMPORTED_MODULE_2__["animationFrameScheduler"]).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(() => {
            if (timeFloat.length !== that.fftSize) {
                timeFloat = new Float32Array(that.frequencyBinCount);
            }
            that.getFloatTimeDomainData(timeFloat);
            return timeFloat;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["share"])());
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"])
], WebAudioAnalyser.prototype, "frequencyByte$", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"])
], WebAudioAnalyser.prototype, "frequencyFloat$", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"])
], WebAudioAnalyser.prototype, "timeByte$", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"])
], WebAudioAnalyser.prototype, "timeFloat$", void 0);
WebAudioAnalyser = WebAudioAnalyser_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
        selector: '[waAnalyserNode]',
        exportAs: 'AudioNode',
        inputs: [
            'fftSize',
            'minDecibels',
            'maxDecibels',
            'smoothingTimeConstant',
            'channelCount',
            'channelCountMode',
            'channelInterpretation',
        ],
        providers: [
            {
                provide: _tokens_audio_node__WEBPACK_IMPORTED_MODULE_5__["AUDIO_NODE"],
                useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(() => WebAudioAnalyser_1),
            },
        ],
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_context__WEBPACK_IMPORTED_MODULE_4__["AUDIO_CONTEXT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["SkipSelf"])()), tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_node__WEBPACK_IMPORTED_MODULE_5__["AUDIO_NODE"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_constructor_support__WEBPACK_IMPORTED_MODULE_6__["CONSTRUCTOR_SUPPORT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"])('fftSize')),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"])('maxDecibels')),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](5, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"])('minDecibels')),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](6, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"])('smoothingTimeConstant')),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [BaseAudioContext, Object, Boolean, Object, Object, Object, Object])
], WebAudioAnalyser);



/***/ }),

/***/ "../audio/src/nodes/biquad-filter.ts":
/*!*******************************************!*\
  !*** ../audio/src/nodes/biquad-filter.ts ***!
  \*******************************************/
/*! exports provided: WebAudioBiquadFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebAudioBiquadFilter", function() { return WebAudioBiquadFilter; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _decorators_audio_param__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../decorators/audio-param */ "../audio/src/decorators/audio-param.ts");
/* harmony import */ var _tokens_audio_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tokens/audio-context */ "../audio/src/tokens/audio-context.ts");
/* harmony import */ var _tokens_audio_node__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tokens/audio-node */ "../audio/src/tokens/audio-node.ts");
/* harmony import */ var _tokens_constructor_support__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../tokens/constructor-support */ "../audio/src/tokens/constructor-support.ts");
/* harmony import */ var _utils_connect__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/connect */ "../audio/src/utils/connect.ts");
/* harmony import */ var _utils_parse__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/parse */ "../audio/src/utils/parse.ts");

var WebAudioBiquadFilter_1;







// @dynamic
let WebAudioBiquadFilter = WebAudioBiquadFilter_1 = class WebAudioBiquadFilter extends BiquadFilterNode {
    constructor(context, modern, node, detuneArg, frequencyArg, gainArg, QArg) {
        const detune = Object(_utils_parse__WEBPACK_IMPORTED_MODULE_7__["parse"])(detuneArg, 0);
        const frequency = Object(_utils_parse__WEBPACK_IMPORTED_MODULE_7__["parse"])(frequencyArg, 350);
        const gain = Object(_utils_parse__WEBPACK_IMPORTED_MODULE_7__["parse"])(gainArg, 0);
        const Q = Object(_utils_parse__WEBPACK_IMPORTED_MODULE_7__["parse"])(QArg, 1);
        if (modern) {
            super(context, { detune, frequency, gain, Q });
            Object(_utils_connect__WEBPACK_IMPORTED_MODULE_6__["connect"])(node, this);
        }
        else {
            const result = context.createBiquadFilter();
            Object.setPrototypeOf(result, WebAudioBiquadFilter_1.prototype);
            result.detune.value = detune;
            result.frequency.value = frequency;
            result.gain.value = gain;
            result.Q.value = Q;
            Object(_utils_connect__WEBPACK_IMPORTED_MODULE_6__["connect"])(node, result);
            return result;
        }
    }
    ngOnDestroy() {
        this.disconnect();
    }
    static init(that, node) {
        Object(_utils_connect__WEBPACK_IMPORTED_MODULE_6__["connect"])(node, that);
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('detune'),
    Object(_decorators_audio_param__WEBPACK_IMPORTED_MODULE_2__["audioParam"])('detune'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], WebAudioBiquadFilter.prototype, "detuneParam", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('frequency'),
    Object(_decorators_audio_param__WEBPACK_IMPORTED_MODULE_2__["audioParam"])('frequency'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], WebAudioBiquadFilter.prototype, "frequencyParam", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('gain'),
    Object(_decorators_audio_param__WEBPACK_IMPORTED_MODULE_2__["audioParam"])('gain'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], WebAudioBiquadFilter.prototype, "gainParam", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('Q'),
    Object(_decorators_audio_param__WEBPACK_IMPORTED_MODULE_2__["audioParam"])('Q'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], WebAudioBiquadFilter.prototype, "qParam", void 0);
WebAudioBiquadFilter = WebAudioBiquadFilter_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
        selector: '[waBiquadFilterNode]',
        exportAs: 'AudioNode',
        inputs: ['type', 'channelCount', 'channelCountMode', 'channelInterpretation'],
        providers: [
            {
                provide: _tokens_audio_node__WEBPACK_IMPORTED_MODULE_4__["AUDIO_NODE"],
                useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(() => WebAudioBiquadFilter_1),
            },
        ],
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_context__WEBPACK_IMPORTED_MODULE_3__["AUDIO_CONTEXT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_constructor_support__WEBPACK_IMPORTED_MODULE_5__["CONSTRUCTOR_SUPPORT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["SkipSelf"])()), tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_node__WEBPACK_IMPORTED_MODULE_4__["AUDIO_NODE"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"])('detune')),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"])('frequency')),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](5, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"])('gain')),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](6, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"])('Q')),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [BaseAudioContext, Boolean, Object, Object, Object, Object, Object])
], WebAudioBiquadFilter);



/***/ }),

/***/ "../audio/src/nodes/channel-merger.ts":
/*!********************************************!*\
  !*** ../audio/src/nodes/channel-merger.ts ***!
  \********************************************/
/*! exports provided: WebAudioChannelMerger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebAudioChannelMerger", function() { return WebAudioChannelMerger; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _directives_channel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../directives/channel */ "../audio/src/directives/channel.ts");
/* harmony import */ var _tokens_audio_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tokens/audio-context */ "../audio/src/tokens/audio-context.ts");
/* harmony import */ var _tokens_audio_node__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tokens/audio-node */ "../audio/src/tokens/audio-node.ts");
/* harmony import */ var _tokens_constructor_support__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../tokens/constructor-support */ "../audio/src/tokens/constructor-support.ts");

var WebAudioChannelMerger_1;





// @dynamic
let WebAudioChannelMerger = WebAudioChannelMerger_1 = class WebAudioChannelMerger extends ChannelMergerNode {
    constructor(inputs, context, modern) {
        const numberOfInputs = parseInt(inputs || '', 10) || 6;
        if (modern) {
            super(context, { numberOfInputs });
        }
        else {
            const result = context.createChannelMerger(numberOfInputs);
            Object.setPrototypeOf(result, WebAudioChannelMerger_1.prototype);
            return result;
        }
    }
    set channels(channels) {
        channels.forEach((node, index) => {
            node.connect(this, 0, index);
        });
    }
    ngOnDestroy() {
        this.disconnect();
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ContentChildren"])(_directives_channel__WEBPACK_IMPORTED_MODULE_2__["WebAudioChannel"], { descendants: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["QueryList"]),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["QueryList"]])
], WebAudioChannelMerger.prototype, "channels", null);
WebAudioChannelMerger = WebAudioChannelMerger_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
        selector: '[waChannelMergerNode]',
        exportAs: 'AudioNode',
        inputs: ['channelCount', 'channelCountMode', 'channelInterpretation'],
        providers: [
            {
                provide: _tokens_audio_node__WEBPACK_IMPORTED_MODULE_4__["AUDIO_NODE"],
                useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(() => WebAudioChannelMerger_1),
            },
        ],
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"])('numberOfInputs')),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_context__WEBPACK_IMPORTED_MODULE_3__["AUDIO_CONTEXT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_constructor_support__WEBPACK_IMPORTED_MODULE_5__["CONSTRUCTOR_SUPPORT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object, BaseAudioContext, Boolean])
], WebAudioChannelMerger);



/***/ }),

/***/ "../audio/src/nodes/channel-splitter.ts":
/*!**********************************************!*\
  !*** ../audio/src/nodes/channel-splitter.ts ***!
  \**********************************************/
/*! exports provided: WebAudioChannelSplitter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebAudioChannelSplitter", function() { return WebAudioChannelSplitter; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _tokens_audio_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tokens/audio-context */ "../audio/src/tokens/audio-context.ts");
/* harmony import */ var _tokens_audio_node__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tokens/audio-node */ "../audio/src/tokens/audio-node.ts");
/* harmony import */ var _tokens_constructor_support__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tokens/constructor-support */ "../audio/src/tokens/constructor-support.ts");
/* harmony import */ var _utils_connect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/connect */ "../audio/src/utils/connect.ts");

var WebAudioChannelSplitter_1;





// @dynamic
let WebAudioChannelSplitter = WebAudioChannelSplitter_1 = class WebAudioChannelSplitter extends ChannelSplitterNode {
    constructor(outputs, context, node, modern) {
        const numberOfOutputs = parseInt(outputs || '', 10) || 6;
        if (modern) {
            super(context, { numberOfOutputs });
            Object(_utils_connect__WEBPACK_IMPORTED_MODULE_5__["connect"])(node, this);
        }
        else {
            const result = context.createChannelSplitter(numberOfOutputs);
            Object.setPrototypeOf(result, WebAudioChannelSplitter_1.prototype);
            Object(_utils_connect__WEBPACK_IMPORTED_MODULE_5__["connect"])(node, result);
            return result;
        }
    }
    set channels(channels) {
        this.disconnect();
        channels
            .filter(node => !!node)
            .forEach((node, index) => {
            this.connect(node, index);
        });
    }
    ngOnDestroy() {
        this.disconnect();
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ContentChildren"])(_tokens_audio_node__WEBPACK_IMPORTED_MODULE_3__["AUDIO_NODE"], { descendants: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["QueryList"]),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["QueryList"]])
], WebAudioChannelSplitter.prototype, "channels", null);
WebAudioChannelSplitter = WebAudioChannelSplitter_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
        selector: '[waChannelSplitterNode]',
        exportAs: 'AudioNode',
        inputs: ['channelCount', 'channelCountMode', 'channelInterpretation'],
        providers: [
            {
                provide: _tokens_audio_node__WEBPACK_IMPORTED_MODULE_3__["AUDIO_NODE"],
                useValue: null,
            },
        ],
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"])('numberOfOutputs')),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_context__WEBPACK_IMPORTED_MODULE_2__["AUDIO_CONTEXT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["SkipSelf"])()), tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_node__WEBPACK_IMPORTED_MODULE_3__["AUDIO_NODE"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_constructor_support__WEBPACK_IMPORTED_MODULE_4__["CONSTRUCTOR_SUPPORT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object, BaseAudioContext, Object, Boolean])
], WebAudioChannelSplitter);



/***/ }),

/***/ "../audio/src/nodes/convolver.ts":
/*!***************************************!*\
  !*** ../audio/src/nodes/convolver.ts ***!
  \***************************************/
/*! exports provided: WebAudioConvolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebAudioConvolver", function() { return WebAudioConvolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _services_audio_buffer_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/audio-buffer.service */ "../audio/src/services/audio-buffer.service.ts");
/* harmony import */ var _tokens_audio_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../tokens/audio-context */ "../audio/src/tokens/audio-context.ts");
/* harmony import */ var _tokens_audio_node__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../tokens/audio-node */ "../audio/src/tokens/audio-node.ts");
/* harmony import */ var _tokens_constructor_support__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../tokens/constructor-support */ "../audio/src/tokens/constructor-support.ts");
/* harmony import */ var _utils_connect__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/connect */ "../audio/src/utils/connect.ts");

var WebAudioConvolver_1;








// @dynamic
let WebAudioConvolver = WebAudioConvolver_1 = class WebAudioConvolver extends ConvolverNode {
    constructor(audioBufferService, context, node, modern) {
        if (modern) {
            super(context);
            WebAudioConvolver_1.init(this, node, audioBufferService);
        }
        else {
            const result = context.createConvolver();
            Object.setPrototypeOf(result, WebAudioConvolver_1.prototype);
            WebAudioConvolver_1.init(result, node, audioBufferService);
            return result;
        }
    }
    set bufferSetter(source) {
        this.buffer$.next(source);
    }
    ngOnDestroy() {
        this.buffer$.complete();
        this.disconnect();
    }
    static init(that, node, audioBufferService) {
        Object(_utils_connect__WEBPACK_IMPORTED_MODULE_8__["connect"])(node, that);
        that.buffer$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        that.buffer$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(source => typeof source === 'string'
            ? audioBufferService.fetch(source)
            : Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(source)))
            .subscribe(buffer => {
            that.buffer = buffer;
        });
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('buffer'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object])
], WebAudioConvolver.prototype, "bufferSetter", null);
WebAudioConvolver = WebAudioConvolver_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
        selector: '[waConvolverNode]',
        exportAs: 'AudioNode',
        inputs: ['normalize', 'channelCount', 'channelCountMode', 'channelInterpretation'],
        providers: [
            {
                provide: _tokens_audio_node__WEBPACK_IMPORTED_MODULE_6__["AUDIO_NODE"],
                useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(() => WebAudioConvolver_1),
            },
        ],
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_services_audio_buffer_service__WEBPACK_IMPORTED_MODULE_4__["AudioBufferService"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_context__WEBPACK_IMPORTED_MODULE_5__["AUDIO_CONTEXT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["SkipSelf"])()), tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_node__WEBPACK_IMPORTED_MODULE_6__["AUDIO_NODE"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_constructor_support__WEBPACK_IMPORTED_MODULE_7__["CONSTRUCTOR_SUPPORT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_audio_buffer_service__WEBPACK_IMPORTED_MODULE_4__["AudioBufferService"],
        BaseAudioContext, Object, Boolean])
], WebAudioConvolver);



/***/ }),

/***/ "../audio/src/nodes/delay.ts":
/*!***********************************!*\
  !*** ../audio/src/nodes/delay.ts ***!
  \***********************************/
/*! exports provided: WebAudioDelay */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebAudioDelay", function() { return WebAudioDelay; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _decorators_audio_param__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../decorators/audio-param */ "../audio/src/decorators/audio-param.ts");
/* harmony import */ var _tokens_audio_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tokens/audio-context */ "../audio/src/tokens/audio-context.ts");
/* harmony import */ var _tokens_audio_node__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tokens/audio-node */ "../audio/src/tokens/audio-node.ts");
/* harmony import */ var _tokens_constructor_support__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../tokens/constructor-support */ "../audio/src/tokens/constructor-support.ts");
/* harmony import */ var _utils_connect__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/connect */ "../audio/src/utils/connect.ts");
/* harmony import */ var _utils_parse__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/parse */ "../audio/src/utils/parse.ts");

var WebAudioDelay_1;







// @dynamic
let WebAudioDelay = WebAudioDelay_1 = class WebAudioDelay extends DelayNode {
    constructor(context, node, modern, delayTimeArg, maxDelayTimeArg) {
        const delayTime = Object(_utils_parse__WEBPACK_IMPORTED_MODULE_7__["parse"])(delayTimeArg, 0);
        const maxDelayTime = Object(_utils_parse__WEBPACK_IMPORTED_MODULE_7__["parse"])(maxDelayTimeArg, 1);
        if (modern) {
            super(context, { delayTime, maxDelayTime });
            Object(_utils_connect__WEBPACK_IMPORTED_MODULE_6__["connect"])(node, this);
        }
        else {
            const result = context.createDelay(maxDelayTime);
            Object.setPrototypeOf(result, WebAudioDelay_1.prototype);
            Object(_utils_connect__WEBPACK_IMPORTED_MODULE_6__["connect"])(node, result);
            result.delayTime.value = delayTime;
            return result;
        }
    }
    ngOnDestroy() {
        this.disconnect();
    }
    static init(that, node) {
        Object(_utils_connect__WEBPACK_IMPORTED_MODULE_6__["connect"])(node, that);
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('delayTime'),
    Object(_decorators_audio_param__WEBPACK_IMPORTED_MODULE_2__["audioParam"])('delayTime'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], WebAudioDelay.prototype, "delayTimeParam", void 0);
WebAudioDelay = WebAudioDelay_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
        selector: '[waDelayNode]',
        exportAs: 'AudioNode',
        inputs: ['channelCount', 'channelCountMode', 'channelInterpretation'],
        providers: [
            {
                provide: _tokens_audio_node__WEBPACK_IMPORTED_MODULE_4__["AUDIO_NODE"],
                useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(() => WebAudioDelay_1),
            },
        ],
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_context__WEBPACK_IMPORTED_MODULE_3__["AUDIO_CONTEXT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["SkipSelf"])()), tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_node__WEBPACK_IMPORTED_MODULE_4__["AUDIO_NODE"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_constructor_support__WEBPACK_IMPORTED_MODULE_5__["CONSTRUCTOR_SUPPORT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"])('delayTime')),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"])('maxDelayTime')),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [BaseAudioContext, Object, Boolean, Object, Object])
], WebAudioDelay);



/***/ }),

/***/ "../audio/src/nodes/dynamics-compressor.ts":
/*!*************************************************!*\
  !*** ../audio/src/nodes/dynamics-compressor.ts ***!
  \*************************************************/
/*! exports provided: WebAudioDynamicsCompressor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebAudioDynamicsCompressor", function() { return WebAudioDynamicsCompressor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _decorators_audio_param__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../decorators/audio-param */ "../audio/src/decorators/audio-param.ts");
/* harmony import */ var _tokens_audio_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tokens/audio-context */ "../audio/src/tokens/audio-context.ts");
/* harmony import */ var _tokens_audio_node__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tokens/audio-node */ "../audio/src/tokens/audio-node.ts");
/* harmony import */ var _tokens_constructor_support__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../tokens/constructor-support */ "../audio/src/tokens/constructor-support.ts");
/* harmony import */ var _utils_connect__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/connect */ "../audio/src/utils/connect.ts");
/* harmony import */ var _utils_parse__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/parse */ "../audio/src/utils/parse.ts");

var WebAudioDynamicsCompressor_1;







// @dynamic
let WebAudioDynamicsCompressor = WebAudioDynamicsCompressor_1 = class WebAudioDynamicsCompressor extends DynamicsCompressorNode {
    constructor(context, node, modern, attackArg, kneeArg, ratioArg, releaseArg, thresholdArg) {
        const attack = Object(_utils_parse__WEBPACK_IMPORTED_MODULE_7__["parse"])(attackArg, 0.003);
        const knee = Object(_utils_parse__WEBPACK_IMPORTED_MODULE_7__["parse"])(kneeArg, 30);
        const ratio = Object(_utils_parse__WEBPACK_IMPORTED_MODULE_7__["parse"])(ratioArg, 12);
        const release = Object(_utils_parse__WEBPACK_IMPORTED_MODULE_7__["parse"])(releaseArg, 0.25);
        const threshold = Object(_utils_parse__WEBPACK_IMPORTED_MODULE_7__["parse"])(thresholdArg, -24);
        if (modern) {
            super(context, { attack, knee, ratio, release, threshold });
            Object(_utils_connect__WEBPACK_IMPORTED_MODULE_6__["connect"])(node, this);
        }
        else {
            const result = context.createDynamicsCompressor();
            Object.setPrototypeOf(result, WebAudioDynamicsCompressor_1.prototype);
            Object(_utils_connect__WEBPACK_IMPORTED_MODULE_6__["connect"])(node, result);
            result.attack.value = attack;
            result.knee.value = knee;
            result.ratio.value = ratio;
            result.release.value = release;
            result.threshold.value = threshold;
            return result;
        }
    }
    ngOnDestroy() {
        this.disconnect();
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('attack'),
    Object(_decorators_audio_param__WEBPACK_IMPORTED_MODULE_2__["audioParam"])('attack'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], WebAudioDynamicsCompressor.prototype, "attackParam", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('knee'),
    Object(_decorators_audio_param__WEBPACK_IMPORTED_MODULE_2__["audioParam"])('knee'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], WebAudioDynamicsCompressor.prototype, "kneeParam", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('ratio'),
    Object(_decorators_audio_param__WEBPACK_IMPORTED_MODULE_2__["audioParam"])('ratio'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], WebAudioDynamicsCompressor.prototype, "ratioParam", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('release'),
    Object(_decorators_audio_param__WEBPACK_IMPORTED_MODULE_2__["audioParam"])('release'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], WebAudioDynamicsCompressor.prototype, "releaseParam", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('threshold'),
    Object(_decorators_audio_param__WEBPACK_IMPORTED_MODULE_2__["audioParam"])('threshold'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], WebAudioDynamicsCompressor.prototype, "thresholdParam", void 0);
WebAudioDynamicsCompressor = WebAudioDynamicsCompressor_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
        selector: '[waDynamicsCompressorNode]',
        exportAs: 'AudioNode',
        inputs: ['channelCount', 'channelCountMode', 'channelInterpretation'],
        providers: [
            {
                provide: _tokens_audio_node__WEBPACK_IMPORTED_MODULE_4__["AUDIO_NODE"],
                useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(() => WebAudioDynamicsCompressor_1),
            },
        ],
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_context__WEBPACK_IMPORTED_MODULE_3__["AUDIO_CONTEXT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["SkipSelf"])()), tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_node__WEBPACK_IMPORTED_MODULE_4__["AUDIO_NODE"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_constructor_support__WEBPACK_IMPORTED_MODULE_5__["CONSTRUCTOR_SUPPORT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"])('attack')),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"])('knee')),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](5, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"])('ratio')),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](6, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"])('release')),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](7, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"])('threshold')),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [BaseAudioContext, Object, Boolean, Object, Object, Object, Object, Object])
], WebAudioDynamicsCompressor);



/***/ }),

/***/ "../audio/src/nodes/gain.ts":
/*!**********************************!*\
  !*** ../audio/src/nodes/gain.ts ***!
  \**********************************/
/*! exports provided: WebAudioGain */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebAudioGain", function() { return WebAudioGain; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _decorators_audio_param__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../decorators/audio-param */ "../audio/src/decorators/audio-param.ts");
/* harmony import */ var _tokens_audio_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tokens/audio-context */ "../audio/src/tokens/audio-context.ts");
/* harmony import */ var _tokens_audio_node__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tokens/audio-node */ "../audio/src/tokens/audio-node.ts");
/* harmony import */ var _tokens_constructor_support__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../tokens/constructor-support */ "../audio/src/tokens/constructor-support.ts");
/* harmony import */ var _utils_connect__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/connect */ "../audio/src/utils/connect.ts");
/* harmony import */ var _utils_parse__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/parse */ "../audio/src/utils/parse.ts");

var WebAudioGain_1;







// @dynamic
let WebAudioGain = WebAudioGain_1 = class WebAudioGain extends GainNode {
    constructor(context, node, modern, gainArg) {
        const gain = Object(_utils_parse__WEBPACK_IMPORTED_MODULE_7__["parse"])(gainArg, 1);
        if (modern) {
            super(context, { gain });
            Object(_utils_connect__WEBPACK_IMPORTED_MODULE_6__["connect"])(node, this);
        }
        else {
            const result = context.createGain();
            Object.setPrototypeOf(result, WebAudioGain_1.prototype);
            Object(_utils_connect__WEBPACK_IMPORTED_MODULE_6__["connect"])(node, result);
            result.gain.value = gain;
            return result;
        }
    }
    ngOnDestroy() {
        this.disconnect();
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('gain'),
    Object(_decorators_audio_param__WEBPACK_IMPORTED_MODULE_2__["audioParam"])('gain'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], WebAudioGain.prototype, "gainParam", void 0);
WebAudioGain = WebAudioGain_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
        selector: '[waGainNode]',
        exportAs: 'AudioNode',
        inputs: ['channelCount', 'channelCountMode', 'channelInterpretation'],
        providers: [
            {
                provide: _tokens_audio_node__WEBPACK_IMPORTED_MODULE_4__["AUDIO_NODE"],
                useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(() => WebAudioGain_1),
            },
        ],
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_context__WEBPACK_IMPORTED_MODULE_3__["AUDIO_CONTEXT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["SkipSelf"])()), tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_node__WEBPACK_IMPORTED_MODULE_4__["AUDIO_NODE"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_constructor_support__WEBPACK_IMPORTED_MODULE_5__["CONSTRUCTOR_SUPPORT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"])('gain')),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [BaseAudioContext, Object, Boolean, Object])
], WebAudioGain);



/***/ }),

/***/ "../audio/src/nodes/iir-filter.ts":
/*!****************************************!*\
  !*** ../audio/src/nodes/iir-filter.ts ***!
  \****************************************/
/*! exports provided: WebAudioIIRFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebAudioIIRFilter", function() { return WebAudioIIRFilter; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _tokens_audio_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tokens/audio-context */ "../audio/src/tokens/audio-context.ts");
/* harmony import */ var _tokens_audio_node__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tokens/audio-node */ "../audio/src/tokens/audio-node.ts");
/* harmony import */ var _tokens_constructor_support__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tokens/constructor-support */ "../audio/src/tokens/constructor-support.ts");
/* harmony import */ var _tokens_feedback_coefficients__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../tokens/feedback-coefficients */ "../audio/src/tokens/feedback-coefficients.ts");
/* harmony import */ var _tokens_feedforward_coefficients__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../tokens/feedforward-coefficients */ "../audio/src/tokens/feedforward-coefficients.ts");
/* harmony import */ var _utils_connect__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/connect */ "../audio/src/utils/connect.ts");

var WebAudioIIRFilter_1;







// @dynamic
let WebAudioIIRFilter = WebAudioIIRFilter_1 = class WebAudioIIRFilter extends IIRFilterNode {
    constructor(feedback, feedforward, context, modern, node) {
        if (modern) {
            super(context, { feedback, feedforward });
            Object(_utils_connect__WEBPACK_IMPORTED_MODULE_7__["connect"])(node, this);
        }
        else {
            const result = context.createIIRFilter(feedback, feedforward);
            Object.setPrototypeOf(result, WebAudioIIRFilter_1.prototype);
            Object(_utils_connect__WEBPACK_IMPORTED_MODULE_7__["connect"])(node, result);
            return result;
        }
    }
    ngOnDestroy() {
        this.disconnect();
    }
};
WebAudioIIRFilter = WebAudioIIRFilter_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
        selector: '[waIIRFilterNode]',
        exportAs: 'AudioNode',
        inputs: ['channelCount', 'channelCountMode', 'channelInterpretation'],
        providers: [
            {
                provide: _tokens_audio_node__WEBPACK_IMPORTED_MODULE_3__["AUDIO_NODE"],
                useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(() => WebAudioIIRFilter_1),
            },
        ],
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_feedback_coefficients__WEBPACK_IMPORTED_MODULE_5__["FEEDBACK_COEFFICIENTS"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_feedforward_coefficients__WEBPACK_IMPORTED_MODULE_6__["FEEDFORWARD_COEFFICIENTS"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_context__WEBPACK_IMPORTED_MODULE_2__["AUDIO_CONTEXT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_constructor_support__WEBPACK_IMPORTED_MODULE_4__["CONSTRUCTOR_SUPPORT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["SkipSelf"])()), tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_node__WEBPACK_IMPORTED_MODULE_3__["AUDIO_NODE"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Array, Array, BaseAudioContext, Boolean, Object])
], WebAudioIIRFilter);



/***/ }),

/***/ "../audio/src/nodes/panner.ts":
/*!************************************!*\
  !*** ../audio/src/nodes/panner.ts ***!
  \************************************/
/*! exports provided: WebAudioPanner */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebAudioPanner", function() { return WebAudioPanner; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _decorators_audio_param__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../decorators/audio-param */ "../audio/src/decorators/audio-param.ts");
/* harmony import */ var _tokens_audio_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tokens/audio-context */ "../audio/src/tokens/audio-context.ts");
/* harmony import */ var _tokens_audio_node__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tokens/audio-node */ "../audio/src/tokens/audio-node.ts");
/* harmony import */ var _tokens_constructor_support__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../tokens/constructor-support */ "../audio/src/tokens/constructor-support.ts");
/* harmony import */ var _utils_connect__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/connect */ "../audio/src/utils/connect.ts");
/* harmony import */ var _utils_fallback_audio_param__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/fallback-audio-param */ "../audio/src/utils/fallback-audio-param.ts");

var WebAudioPanner_1;







// @dynamic
let WebAudioPanner = WebAudioPanner_1 = class WebAudioPanner extends PannerNode {
    constructor(context, node, modern) {
        if (modern) {
            super(context);
            Object(_utils_connect__WEBPACK_IMPORTED_MODULE_6__["connect"])(node, this);
        }
        else {
            const result = context.createPanner();
            Object.setPrototypeOf(result, WebAudioPanner_1.prototype);
            Object(_utils_connect__WEBPACK_IMPORTED_MODULE_6__["connect"])(node, result);
            return result;
        }
    }
    ngOnChanges() {
        if (this.positionX instanceof AudioParam) {
            return;
        }
        // Fallback for older browsers
        this.setOrientation(Object(_utils_fallback_audio_param__WEBPACK_IMPORTED_MODULE_7__["fallbackAudioParam"])(this.orientationXParam), Object(_utils_fallback_audio_param__WEBPACK_IMPORTED_MODULE_7__["fallbackAudioParam"])(this.orientationYParam), Object(_utils_fallback_audio_param__WEBPACK_IMPORTED_MODULE_7__["fallbackAudioParam"])(this.orientationZParam));
        this.setPosition(Object(_utils_fallback_audio_param__WEBPACK_IMPORTED_MODULE_7__["fallbackAudioParam"])(this.positionXParam), Object(_utils_fallback_audio_param__WEBPACK_IMPORTED_MODULE_7__["fallbackAudioParam"])(this.positionYParam), Object(_utils_fallback_audio_param__WEBPACK_IMPORTED_MODULE_7__["fallbackAudioParam"])(this.positionZParam));
    }
    ngOnDestroy() {
        this.disconnect();
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    Object(_decorators_audio_param__WEBPACK_IMPORTED_MODULE_2__["audioParam"])('orientationX'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], WebAudioPanner.prototype, "orientationXParam", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    Object(_decorators_audio_param__WEBPACK_IMPORTED_MODULE_2__["audioParam"])('orientationY'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], WebAudioPanner.prototype, "orientationYParam", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    Object(_decorators_audio_param__WEBPACK_IMPORTED_MODULE_2__["audioParam"])('orientationZ'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], WebAudioPanner.prototype, "orientationZParam", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    Object(_decorators_audio_param__WEBPACK_IMPORTED_MODULE_2__["audioParam"])('positionX'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], WebAudioPanner.prototype, "positionXParam", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    Object(_decorators_audio_param__WEBPACK_IMPORTED_MODULE_2__["audioParam"])('positionY'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], WebAudioPanner.prototype, "positionYParam", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    Object(_decorators_audio_param__WEBPACK_IMPORTED_MODULE_2__["audioParam"])('positionZ'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], WebAudioPanner.prototype, "positionZParam", void 0);
WebAudioPanner = WebAudioPanner_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
        selector: '[waPannerNode]',
        exportAs: 'AudioNode',
        inputs: [
            'coneInnerAngle',
            'coneOuterAngle',
            'coneOuterGain',
            'distanceModel',
            'maxDistance',
            'panningModel',
            'refDistance',
            'rolloffFactor',
            'channelCount',
            'channelCountMode',
            'channelInterpretation',
        ],
        providers: [
            {
                provide: _tokens_audio_node__WEBPACK_IMPORTED_MODULE_4__["AUDIO_NODE"],
                useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(() => WebAudioPanner_1),
            },
        ],
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_context__WEBPACK_IMPORTED_MODULE_3__["AUDIO_CONTEXT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["SkipSelf"])()), tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_node__WEBPACK_IMPORTED_MODULE_4__["AUDIO_NODE"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_constructor_support__WEBPACK_IMPORTED_MODULE_5__["CONSTRUCTOR_SUPPORT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [BaseAudioContext, Object, Boolean])
], WebAudioPanner);



/***/ }),

/***/ "../audio/src/nodes/script-processor.ts":
/*!**********************************************!*\
  !*** ../audio/src/nodes/script-processor.ts ***!
  \**********************************************/
/*! exports provided: WebAudioScriptProcessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebAudioScriptProcessor", function() { return WebAudioScriptProcessor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _tokens_audio_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tokens/audio-context */ "../audio/src/tokens/audio-context.ts");
/* harmony import */ var _tokens_audio_node__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tokens/audio-node */ "../audio/src/tokens/audio-node.ts");
/* harmony import */ var _utils_connect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/connect */ "../audio/src/utils/connect.ts");

var WebAudioScriptProcessor_1;




// @dynamic
let WebAudioScriptProcessor = WebAudioScriptProcessor_1 = class WebAudioScriptProcessor extends ScriptProcessorNode {
    constructor(bufferSize, numberOfInputChannels, numberOfOutputChannels, context, node) {
        try {
            const result = context.createScriptProcessor(parseInt(bufferSize || '', 10) || 0, parseInt(numberOfInputChannels || '', 10) || 2, parseInt(numberOfOutputChannels || '', 10) || 2);
            Object.setPrototypeOf(result, WebAudioScriptProcessor_1.prototype);
            Object(_utils_connect__WEBPACK_IMPORTED_MODULE_4__["connect"])(node, result);
            const audioprocess = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
            result.audioprocess = audioprocess;
            result.onaudioprocess = e => audioprocess.emit(e);
            return result;
        }
        catch (_) { }
        super();
    }
    ngOnDestroy() {
        this.disconnect();
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
], WebAudioScriptProcessor.prototype, "audioprocess", void 0);
WebAudioScriptProcessor = WebAudioScriptProcessor_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
        selector: '[waScriptProcessorNode]',
        exportAs: 'AudioNode',
        inputs: ['channelCount', 'channelCountMode', 'channelInterpretation'],
        providers: [
            {
                provide: _tokens_audio_node__WEBPACK_IMPORTED_MODULE_3__["AUDIO_NODE"],
                useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(() => WebAudioScriptProcessor_1),
            },
        ],
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"])('bufferSize')),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"])('numberOfInputChannels')),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"])('numberOfOutputChannels')),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_context__WEBPACK_IMPORTED_MODULE_2__["AUDIO_CONTEXT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["SkipSelf"])()), tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_node__WEBPACK_IMPORTED_MODULE_3__["AUDIO_NODE"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object, Object, Object, BaseAudioContext, Object])
], WebAudioScriptProcessor);



/***/ }),

/***/ "../audio/src/nodes/stereo-panner.ts":
/*!*******************************************!*\
  !*** ../audio/src/nodes/stereo-panner.ts ***!
  \*******************************************/
/*! exports provided: WebAudioStereoPanner */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebAudioStereoPanner", function() { return WebAudioStereoPanner; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _tokens_audio_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tokens/audio-context */ "../audio/src/tokens/audio-context.ts");
/* harmony import */ var _tokens_audio_node__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tokens/audio-node */ "../audio/src/tokens/audio-node.ts");
/* harmony import */ var _utils_connect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/connect */ "../audio/src/utils/connect.ts");
/* harmony import */ var _utils_fallback_audio_param__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/fallback-audio-param */ "../audio/src/utils/fallback-audio-param.ts");
/* harmony import */ var _utils_parse__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/parse */ "../audio/src/utils/parse.ts");
/* harmony import */ var _utils_process_audio_param__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/process-audio-param */ "../audio/src/utils/process-audio-param.ts");

var WebAudioStereoPanner_1;







// @dynamic
let WebAudioStereoPanner = WebAudioStereoPanner_1 = class WebAudioStereoPanner extends StereoPannerNode {
    constructor(context, node, panArg) {
        const pan = Object(_utils_parse__WEBPACK_IMPORTED_MODULE_6__["parse"])(panArg, 0);
        try {
            // @ts-ignore
            const _test = new StereoPannerNode(context);
        }
        catch (_) {
            const result = context.createPanner();
            Object.setPrototypeOf(result, WebAudioStereoPanner_1.prototype);
            result.fallbackToPannerNode(Object(_utils_fallback_audio_param__WEBPACK_IMPORTED_MODULE_5__["fallbackAudioParam"])(pan));
            Object(_utils_connect__WEBPACK_IMPORTED_MODULE_4__["connect"])(node, result);
            return result;
        }
        super(context, { pan });
        Object(_utils_connect__WEBPACK_IMPORTED_MODULE_4__["connect"])(node, this);
    }
    set panParam(pan) {
        if ('setPosition' in this) {
            /** fallback for browsers not supporting {@link StereoPannerNode} */
            // @ts-ignore
            this.fallbackToPannerNode(Object(_utils_fallback_audio_param__WEBPACK_IMPORTED_MODULE_5__["fallbackAudioParam"])(pan));
        }
        else {
            Object(_utils_process_audio_param__WEBPACK_IMPORTED_MODULE_7__["processAudioParam"])(this.pan, pan, this.context.currentTime);
        }
    }
    ngOnDestroy() {
        this.disconnect();
    }
    // @ts-ignore
    fallbackToPannerNode(pan) {
        const xDeg = pan * 100;
        const zDeg = xDeg > 0 ? 270 - xDeg : xDeg + 90;
        const x = Math.sin(xDeg * (Math.PI / 180));
        const z = Math.sin(zDeg * (Math.PI / 180));
        // @ts-ignore
        this.setPosition(x, 0, z);
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('pan'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object])
], WebAudioStereoPanner.prototype, "panParam", null);
WebAudioStereoPanner = WebAudioStereoPanner_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
        selector: '[waStereoPannerNode]',
        exportAs: 'AudioNode',
        inputs: ['channelCount', 'channelCountMode', 'channelInterpretation'],
        providers: [
            {
                provide: _tokens_audio_node__WEBPACK_IMPORTED_MODULE_3__["AUDIO_NODE"],
                useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(() => WebAudioStereoPanner_1),
            },
        ],
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_context__WEBPACK_IMPORTED_MODULE_2__["AUDIO_CONTEXT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["SkipSelf"])()), tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_node__WEBPACK_IMPORTED_MODULE_3__["AUDIO_NODE"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"])('pan')),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [BaseAudioContext, Object, Object])
], WebAudioStereoPanner);



/***/ }),

/***/ "../audio/src/nodes/wave-shaper.ts":
/*!*****************************************!*\
  !*** ../audio/src/nodes/wave-shaper.ts ***!
  \*****************************************/
/*! exports provided: WebAudioWaveShaper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebAudioWaveShaper", function() { return WebAudioWaveShaper; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _tokens_audio_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tokens/audio-context */ "../audio/src/tokens/audio-context.ts");
/* harmony import */ var _tokens_audio_node__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tokens/audio-node */ "../audio/src/tokens/audio-node.ts");
/* harmony import */ var _tokens_constructor_support__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tokens/constructor-support */ "../audio/src/tokens/constructor-support.ts");
/* harmony import */ var _utils_connect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/connect */ "../audio/src/utils/connect.ts");

var WebAudioWaveShaper_1;





// @dynamic
let WebAudioWaveShaper = WebAudioWaveShaper_1 = class WebAudioWaveShaper extends WaveShaperNode {
    constructor(context, node, modern) {
        if (modern) {
            super(context);
            Object(_utils_connect__WEBPACK_IMPORTED_MODULE_5__["connect"])(node, this);
        }
        else {
            const result = context.createWaveShaper();
            Object.setPrototypeOf(result, WebAudioWaveShaper_1.prototype);
            Object(_utils_connect__WEBPACK_IMPORTED_MODULE_5__["connect"])(node, result);
            return result;
        }
    }
    ngOnDestroy() {
        this.disconnect();
    }
};
WebAudioWaveShaper = WebAudioWaveShaper_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
        selector: '[waWaveShaperNode]',
        exportAs: 'AudioNode',
        inputs: [
            'oversample',
            'curve',
            'channelCount',
            'channelCountMode',
            'channelInterpretation',
        ],
        providers: [
            {
                provide: _tokens_audio_node__WEBPACK_IMPORTED_MODULE_3__["AUDIO_NODE"],
                useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(() => WebAudioWaveShaper_1),
            },
        ],
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_context__WEBPACK_IMPORTED_MODULE_2__["AUDIO_CONTEXT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["SkipSelf"])()), tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_node__WEBPACK_IMPORTED_MODULE_3__["AUDIO_NODE"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_constructor_support__WEBPACK_IMPORTED_MODULE_4__["CONSTRUCTOR_SUPPORT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [BaseAudioContext, Object, Boolean])
], WebAudioWaveShaper);



/***/ }),

/***/ "../audio/src/nodes/worklet.ts":
/*!*************************************!*\
  !*** ../audio/src/nodes/worklet.ts ***!
  \*************************************/
/*! exports provided: WebAudioWorklet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebAudioWorklet", function() { return WebAudioWorklet; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _tokens_audio_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tokens/audio-context */ "../audio/src/tokens/audio-context.ts");
/* harmony import */ var _tokens_audio_node__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tokens/audio-node */ "../audio/src/tokens/audio-node.ts");
/* harmony import */ var _utils_connect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/connect */ "../audio/src/utils/connect.ts");

var WebAudioWorklet_1;




// @dynamic
let WebAudioWorklet = WebAudioWorklet_1 = class WebAudioWorklet extends AudioWorkletNode {
    constructor(context, node, name) {
        super(context, name);
        this.processorerror = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onprocessorerror = () => this.processorerror.emit();
        Object(_utils_connect__WEBPACK_IMPORTED_MODULE_4__["connect"])(node, this);
    }
    ngOnDestroy() {
        this.disconnect();
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], WebAudioWorklet.prototype, "processorerror", void 0);
WebAudioWorklet = WebAudioWorklet_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
        selector: '[waAudioWorkletNode][name]',
        exportAs: 'AudioNode',
        inputs: ['channelCount', 'channelCountMode', 'channelInterpretation'],
        providers: [
            {
                provide: _tokens_audio_node__WEBPACK_IMPORTED_MODULE_3__["AUDIO_NODE"],
                useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(() => WebAudioWorklet_1),
            },
        ],
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_context__WEBPACK_IMPORTED_MODULE_2__["AUDIO_CONTEXT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["SkipSelf"])()), tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_node__WEBPACK_IMPORTED_MODULE_3__["AUDIO_NODE"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"])('name')),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [BaseAudioContext, Object, String])
], WebAudioWorklet);



/***/ }),

/***/ "../audio/src/pipes/audio-param.pipe.ts":
/*!**********************************************!*\
  !*** ../audio/src/pipes/audio-param.pipe.ts ***!
  \**********************************************/
/*! exports provided: WebAudioParamPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebAudioParamPipe", function() { return WebAudioParamPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");


let WebAudioParamPipe = class WebAudioParamPipe {
    /**
     * Creates {@link AudioParamAutomation} to use with {@link AudioParam} inputs
     *
     * @param value target value
     * @param duration duration of the automation
     * @param mode either instant for given duration or linear/exponential ramp
     */
    transform(value, duration, mode = 'exponential') {
        return value instanceof Array
            ? {
                value,
                duration,
            }
            : {
                value,
                duration,
                mode,
            };
    }
};
WebAudioParamPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
        name: 'waAudioParam',
    })
], WebAudioParamPipe);



/***/ }),

/***/ "../audio/src/pipes/periodic-wave.pipe.ts":
/*!************************************************!*\
  !*** ../audio/src/pipes/periodic-wave.pipe.ts ***!
  \************************************************/
/*! exports provided: WebAudioPeriodicWavePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebAudioPeriodicWavePipe", function() { return WebAudioPeriodicWavePipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _tokens_audio_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tokens/audio-context */ "../audio/src/tokens/audio-context.ts");



// @dynamic
let WebAudioPeriodicWavePipe = class WebAudioPeriodicWavePipe {
    constructor(context) {
        this.context = context;
    }
    /**
     * Creates {@link PeriodicWave} to use with {@link OscillatorNode}
     *
     * @param real cosine terms (traditionally the A terms)
     * @param imag sine terms (traditionally the B terms)
     * @param disableNormalization see {@lin PeriodicWaveConstraints}
     */
    transform(real, imag, disableNormalization) {
        return this.context.createPeriodicWave(new Float32Array(real), imag ? new Float32Array(imag) : new Float32Array(real.length), {
            disableNormalization: !!disableNormalization,
        });
    }
};
WebAudioPeriodicWavePipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
        name: 'waPeriodicWave',
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_context__WEBPACK_IMPORTED_MODULE_2__["AUDIO_CONTEXT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [BaseAudioContext])
], WebAudioPeriodicWavePipe);



/***/ }),

/***/ "../audio/src/public-api.ts":
/*!**********************************!*\
  !*** ../audio/src/public-api.ts ***!
  \**********************************/
/*! exports provided: audioParam, WebAudioContext, WebAudioChannel, WebAudioDestination, WebAudioListener, WebAudioOfflineContext, WebAudioOutput, WebAudioMediaStreamDestination, WebAudioAnalyser, WebAudioBiquadFilter, WebAudioChannelMerger, WebAudioChannelSplitter, WebAudioConvolver, WebAudioDelay, WebAudioDynamicsCompressor, WebAudioGain, WebAudioIIRFilter, WebAudioPanner, WebAudioScriptProcessor, WebAudioStereoPanner, WebAudioWaveShaper, WebAudioWorklet, WebAudioParamPipe, WebAudioPeriodicWavePipe, AudioBufferService, WebAudioBufferSource, WebAudioConstantSource, WebAudioMediaSource, WebAudioMediaStreamSource, WebAudioMediaStreamTrackSource, WebAudioOscillator, AUDIO_CONTEXT, AUDIO_NODE, AUDIO_WORKLET_PROCESSORS, AUDIO_WORKLET_PROCESSORS_READY, AUDIO_WORKLET_SUPPORT, FEEDBACK_COEFFICIENTS, FEEDFORWARD_COEFFICIENTS, MEDIA_STREAM, MEDIA_STREAM_TRACK, WEB_AUDIO_SUPPORT, WebAudioModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _decorators_audio_param__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./decorators/audio-param */ "../audio/src/decorators/audio-param.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "audioParam", function() { return _decorators_audio_param__WEBPACK_IMPORTED_MODULE_0__["audioParam"]; });

/* harmony import */ var _directives_audio_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./directives/audio-context */ "../audio/src/directives/audio-context.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebAudioContext", function() { return _directives_audio_context__WEBPACK_IMPORTED_MODULE_1__["WebAudioContext"]; });

/* harmony import */ var _directives_channel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./directives/channel */ "../audio/src/directives/channel.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebAudioChannel", function() { return _directives_channel__WEBPACK_IMPORTED_MODULE_2__["WebAudioChannel"]; });

/* harmony import */ var _directives_destination__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./directives/destination */ "../audio/src/directives/destination.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebAudioDestination", function() { return _directives_destination__WEBPACK_IMPORTED_MODULE_3__["WebAudioDestination"]; });

/* harmony import */ var _directives_listener__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./directives/listener */ "../audio/src/directives/listener.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebAudioListener", function() { return _directives_listener__WEBPACK_IMPORTED_MODULE_4__["WebAudioListener"]; });

/* harmony import */ var _directives_offline_audio_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./directives/offline-audio-context */ "../audio/src/directives/offline-audio-context.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebAudioOfflineContext", function() { return _directives_offline_audio_context__WEBPACK_IMPORTED_MODULE_5__["WebAudioOfflineContext"]; });

/* harmony import */ var _directives_output__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./directives/output */ "../audio/src/directives/output.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebAudioOutput", function() { return _directives_output__WEBPACK_IMPORTED_MODULE_6__["WebAudioOutput"]; });

/* harmony import */ var _directives_stream_destination__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./directives/stream-destination */ "../audio/src/directives/stream-destination.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebAudioMediaStreamDestination", function() { return _directives_stream_destination__WEBPACK_IMPORTED_MODULE_7__["WebAudioMediaStreamDestination"]; });

/* harmony import */ var _nodes_analyser__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./nodes/analyser */ "../audio/src/nodes/analyser.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebAudioAnalyser", function() { return _nodes_analyser__WEBPACK_IMPORTED_MODULE_8__["WebAudioAnalyser"]; });

/* harmony import */ var _nodes_biquad_filter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./nodes/biquad-filter */ "../audio/src/nodes/biquad-filter.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebAudioBiquadFilter", function() { return _nodes_biquad_filter__WEBPACK_IMPORTED_MODULE_9__["WebAudioBiquadFilter"]; });

/* harmony import */ var _nodes_channel_merger__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./nodes/channel-merger */ "../audio/src/nodes/channel-merger.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebAudioChannelMerger", function() { return _nodes_channel_merger__WEBPACK_IMPORTED_MODULE_10__["WebAudioChannelMerger"]; });

/* harmony import */ var _nodes_channel_splitter__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./nodes/channel-splitter */ "../audio/src/nodes/channel-splitter.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebAudioChannelSplitter", function() { return _nodes_channel_splitter__WEBPACK_IMPORTED_MODULE_11__["WebAudioChannelSplitter"]; });

/* harmony import */ var _nodes_convolver__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./nodes/convolver */ "../audio/src/nodes/convolver.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebAudioConvolver", function() { return _nodes_convolver__WEBPACK_IMPORTED_MODULE_12__["WebAudioConvolver"]; });

/* harmony import */ var _nodes_delay__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./nodes/delay */ "../audio/src/nodes/delay.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebAudioDelay", function() { return _nodes_delay__WEBPACK_IMPORTED_MODULE_13__["WebAudioDelay"]; });

/* harmony import */ var _nodes_dynamics_compressor__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./nodes/dynamics-compressor */ "../audio/src/nodes/dynamics-compressor.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebAudioDynamicsCompressor", function() { return _nodes_dynamics_compressor__WEBPACK_IMPORTED_MODULE_14__["WebAudioDynamicsCompressor"]; });

/* harmony import */ var _nodes_gain__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./nodes/gain */ "../audio/src/nodes/gain.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebAudioGain", function() { return _nodes_gain__WEBPACK_IMPORTED_MODULE_15__["WebAudioGain"]; });

/* harmony import */ var _nodes_iir_filter__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./nodes/iir-filter */ "../audio/src/nodes/iir-filter.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebAudioIIRFilter", function() { return _nodes_iir_filter__WEBPACK_IMPORTED_MODULE_16__["WebAudioIIRFilter"]; });

/* harmony import */ var _nodes_panner__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./nodes/panner */ "../audio/src/nodes/panner.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebAudioPanner", function() { return _nodes_panner__WEBPACK_IMPORTED_MODULE_17__["WebAudioPanner"]; });

/* harmony import */ var _nodes_script_processor__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./nodes/script-processor */ "../audio/src/nodes/script-processor.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebAudioScriptProcessor", function() { return _nodes_script_processor__WEBPACK_IMPORTED_MODULE_18__["WebAudioScriptProcessor"]; });

/* harmony import */ var _nodes_stereo_panner__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./nodes/stereo-panner */ "../audio/src/nodes/stereo-panner.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebAudioStereoPanner", function() { return _nodes_stereo_panner__WEBPACK_IMPORTED_MODULE_19__["WebAudioStereoPanner"]; });

/* harmony import */ var _nodes_wave_shaper__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./nodes/wave-shaper */ "../audio/src/nodes/wave-shaper.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebAudioWaveShaper", function() { return _nodes_wave_shaper__WEBPACK_IMPORTED_MODULE_20__["WebAudioWaveShaper"]; });

/* harmony import */ var _nodes_worklet__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./nodes/worklet */ "../audio/src/nodes/worklet.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebAudioWorklet", function() { return _nodes_worklet__WEBPACK_IMPORTED_MODULE_21__["WebAudioWorklet"]; });

/* harmony import */ var _pipes_audio_param_pipe__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./pipes/audio-param.pipe */ "../audio/src/pipes/audio-param.pipe.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebAudioParamPipe", function() { return _pipes_audio_param_pipe__WEBPACK_IMPORTED_MODULE_22__["WebAudioParamPipe"]; });

/* harmony import */ var _pipes_periodic_wave_pipe__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./pipes/periodic-wave.pipe */ "../audio/src/pipes/periodic-wave.pipe.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebAudioPeriodicWavePipe", function() { return _pipes_periodic_wave_pipe__WEBPACK_IMPORTED_MODULE_23__["WebAudioPeriodicWavePipe"]; });

/* harmony import */ var _services_audio_buffer_service__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./services/audio-buffer.service */ "../audio/src/services/audio-buffer.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AudioBufferService", function() { return _services_audio_buffer_service__WEBPACK_IMPORTED_MODULE_24__["AudioBufferService"]; });

/* harmony import */ var _sources_buffer_source__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./sources/buffer-source */ "../audio/src/sources/buffer-source.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebAudioBufferSource", function() { return _sources_buffer_source__WEBPACK_IMPORTED_MODULE_25__["WebAudioBufferSource"]; });

/* harmony import */ var _sources_constant_source__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./sources/constant-source */ "../audio/src/sources/constant-source.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebAudioConstantSource", function() { return _sources_constant_source__WEBPACK_IMPORTED_MODULE_26__["WebAudioConstantSource"]; });

/* harmony import */ var _sources_media_source__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./sources/media-source */ "../audio/src/sources/media-source.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebAudioMediaSource", function() { return _sources_media_source__WEBPACK_IMPORTED_MODULE_27__["WebAudioMediaSource"]; });

/* harmony import */ var _sources_media_stream_source__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./sources/media-stream-source */ "../audio/src/sources/media-stream-source.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebAudioMediaStreamSource", function() { return _sources_media_stream_source__WEBPACK_IMPORTED_MODULE_28__["WebAudioMediaStreamSource"]; });

/* harmony import */ var _sources_media_stream_track_source__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./sources/media-stream-track-source */ "../audio/src/sources/media-stream-track-source.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebAudioMediaStreamTrackSource", function() { return _sources_media_stream_track_source__WEBPACK_IMPORTED_MODULE_29__["WebAudioMediaStreamTrackSource"]; });

/* harmony import */ var _sources_oscillator__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./sources/oscillator */ "../audio/src/sources/oscillator.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebAudioOscillator", function() { return _sources_oscillator__WEBPACK_IMPORTED_MODULE_30__["WebAudioOscillator"]; });

/* harmony import */ var _tokens_audio_context__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./tokens/audio-context */ "../audio/src/tokens/audio-context.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AUDIO_CONTEXT", function() { return _tokens_audio_context__WEBPACK_IMPORTED_MODULE_31__["AUDIO_CONTEXT"]; });

/* harmony import */ var _tokens_audio_node__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./tokens/audio-node */ "../audio/src/tokens/audio-node.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AUDIO_NODE", function() { return _tokens_audio_node__WEBPACK_IMPORTED_MODULE_32__["AUDIO_NODE"]; });

/* harmony import */ var _tokens_audio_worklet_processors__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./tokens/audio-worklet-processors */ "../audio/src/tokens/audio-worklet-processors.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AUDIO_WORKLET_PROCESSORS", function() { return _tokens_audio_worklet_processors__WEBPACK_IMPORTED_MODULE_33__["AUDIO_WORKLET_PROCESSORS"]; });

/* harmony import */ var _tokens_audio_worklet_processors_ready__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./tokens/audio-worklet-processors-ready */ "../audio/src/tokens/audio-worklet-processors-ready.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AUDIO_WORKLET_PROCESSORS_READY", function() { return _tokens_audio_worklet_processors_ready__WEBPACK_IMPORTED_MODULE_34__["AUDIO_WORKLET_PROCESSORS_READY"]; });

/* harmony import */ var _tokens_audio_worklet_support__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./tokens/audio-worklet-support */ "../audio/src/tokens/audio-worklet-support.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AUDIO_WORKLET_SUPPORT", function() { return _tokens_audio_worklet_support__WEBPACK_IMPORTED_MODULE_35__["AUDIO_WORKLET_SUPPORT"]; });

/* harmony import */ var _tokens_feedback_coefficients__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./tokens/feedback-coefficients */ "../audio/src/tokens/feedback-coefficients.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FEEDBACK_COEFFICIENTS", function() { return _tokens_feedback_coefficients__WEBPACK_IMPORTED_MODULE_36__["FEEDBACK_COEFFICIENTS"]; });

/* harmony import */ var _tokens_feedforward_coefficients__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./tokens/feedforward-coefficients */ "../audio/src/tokens/feedforward-coefficients.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FEEDFORWARD_COEFFICIENTS", function() { return _tokens_feedforward_coefficients__WEBPACK_IMPORTED_MODULE_37__["FEEDFORWARD_COEFFICIENTS"]; });

/* harmony import */ var _tokens_media_stream__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./tokens/media-stream */ "../audio/src/tokens/media-stream.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MEDIA_STREAM", function() { return _tokens_media_stream__WEBPACK_IMPORTED_MODULE_38__["MEDIA_STREAM"]; });

/* harmony import */ var _tokens_media_stream_track__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./tokens/media-stream-track */ "../audio/src/tokens/media-stream-track.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MEDIA_STREAM_TRACK", function() { return _tokens_media_stream_track__WEBPACK_IMPORTED_MODULE_39__["MEDIA_STREAM_TRACK"]; });

/* harmony import */ var _tokens_support__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./tokens/support */ "../audio/src/tokens/support.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WEB_AUDIO_SUPPORT", function() { return _tokens_support__WEBPACK_IMPORTED_MODULE_40__["WEB_AUDIO_SUPPORT"]; });

/* harmony import */ var _module__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./module */ "../audio/src/module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebAudioModule", function() { return _module__WEBPACK_IMPORTED_MODULE_41__["WebAudioModule"]; });

/**
 * Public API Surface of @ng-web-apis/audio
 */












































/***/ }),

/***/ "../audio/src/services/audio-buffer.service.ts":
/*!*****************************************************!*\
  !*** ../audio/src/services/audio-buffer.service.ts ***!
  \*****************************************************/
/*! exports provided: AudioBufferService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AudioBufferService", function() { return AudioBufferService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _tokens_audio_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tokens/audio-context */ "../audio/src/tokens/audio-context.ts");



// @dynamic
let AudioBufferService = class AudioBufferService {
    constructor(context) {
        this.context = context;
        this.cache = new Map();
    }
    fetch(url) {
        return new Promise((resolve, reject) => {
            if (this.cache.has(url)) {
                resolve(this.cache.get(url));
                return;
            }
            const request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.responseType = 'arraybuffer';
            request.onerror = reject;
            request.onabort = reject;
            request.onload = () => {
                this.context.decodeAudioData(request.response, buffer => {
                    this.cache.set(url, buffer);
                    resolve(buffer);
                }, reject);
            };
            request.send();
        });
    }
};
AudioBufferService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root',
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_context__WEBPACK_IMPORTED_MODULE_2__["AUDIO_CONTEXT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [BaseAudioContext])
], AudioBufferService);



/***/ }),

/***/ "../audio/src/sources/buffer-source.ts":
/*!*********************************************!*\
  !*** ../audio/src/sources/buffer-source.ts ***!
  \*********************************************/
/*! exports provided: WebAudioBufferSource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebAudioBufferSource", function() { return WebAudioBufferSource; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _decorators_audio_param__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../decorators/audio-param */ "../audio/src/decorators/audio-param.ts");
/* harmony import */ var _services_audio_buffer_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/audio-buffer.service */ "../audio/src/services/audio-buffer.service.ts");
/* harmony import */ var _tokens_audio_context__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../tokens/audio-context */ "../audio/src/tokens/audio-context.ts");
/* harmony import */ var _tokens_audio_node__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../tokens/audio-node */ "../audio/src/tokens/audio-node.ts");
/* harmony import */ var _tokens_constructor_support__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../tokens/constructor-support */ "../audio/src/tokens/constructor-support.ts");
/* harmony import */ var _utils_parse__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/parse */ "../audio/src/utils/parse.ts");

var WebAudioBufferSource_1;









// @dynamic
let WebAudioBufferSource = WebAudioBufferSource_1 = class WebAudioBufferSource extends AudioBufferSourceNode {
    constructor(audioBufferService, context, modern, autoplay, detuneArg, playbackRateArg) {
        const detune = Object(_utils_parse__WEBPACK_IMPORTED_MODULE_9__["parse"])(detuneArg, 0);
        const playbackRate = Object(_utils_parse__WEBPACK_IMPORTED_MODULE_9__["parse"])(playbackRateArg, 1);
        if (modern) {
            super(context, { detune, playbackRate });
            WebAudioBufferSource_1.init(this, null, autoplay, audioBufferService);
        }
        else {
            const result = context.createBufferSource();
            Object.setPrototypeOf(WebAudioBufferSource_1.prototype, Object.getPrototypeOf(result));
            Object.setPrototypeOf(result, WebAudioBufferSource_1.prototype);
            result.playbackRate.value = playbackRate;
            WebAudioBufferSource_1.init(result, null, autoplay, audioBufferService);
            return result;
        }
    }
    set bufferSetter(source) {
        this.buffer$.next(source);
    }
    ngOnDestroy() {
        this.buffer$.complete();
        try {
            this.stop();
        }
        catch (_) { }
        this.disconnect();
    }
    static init(that, _node, autoplay, audioBufferService) {
        if (autoplay !== null) {
            that.start();
        }
        const ended = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        that.ended = ended;
        that.onended = () => ended.emit();
        that.buffer$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        that.buffer$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(source => typeof source === 'string'
            ? audioBufferService.fetch(source)
            : Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(source)))
            .subscribe(buffer => {
            that.buffer = buffer;
        });
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('buffer'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object])
], WebAudioBufferSource.prototype, "bufferSetter", null);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('detune'),
    Object(_decorators_audio_param__WEBPACK_IMPORTED_MODULE_4__["audioParam"])('detune'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], WebAudioBufferSource.prototype, "detuneParam", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('playbackRate'),
    Object(_decorators_audio_param__WEBPACK_IMPORTED_MODULE_4__["audioParam"])('playbackRate'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], WebAudioBufferSource.prototype, "playbackRateParam", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
], WebAudioBufferSource.prototype, "ended", void 0);
WebAudioBufferSource = WebAudioBufferSource_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
        selector: '[waAudioBufferSourceNode]',
        exportAs: 'AudioNode',
        inputs: [
            'loop',
            'loopStart',
            'loopEnd',
            'channelCount',
            'channelCountMode',
            'channelInterpretation',
        ],
        providers: [
            {
                provide: _tokens_audio_node__WEBPACK_IMPORTED_MODULE_7__["AUDIO_NODE"],
                useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(() => WebAudioBufferSource_1),
            },
        ],
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_services_audio_buffer_service__WEBPACK_IMPORTED_MODULE_5__["AudioBufferService"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_context__WEBPACK_IMPORTED_MODULE_6__["AUDIO_CONTEXT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_constructor_support__WEBPACK_IMPORTED_MODULE_8__["CONSTRUCTOR_SUPPORT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"])('autoplay')),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"])('detune')),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](5, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"])('playbackRate')),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_audio_buffer_service__WEBPACK_IMPORTED_MODULE_5__["AudioBufferService"],
        BaseAudioContext, Boolean, Object, Object, Object])
], WebAudioBufferSource);



/***/ }),

/***/ "../audio/src/sources/constant-source.ts":
/*!***********************************************!*\
  !*** ../audio/src/sources/constant-source.ts ***!
  \***********************************************/
/*! exports provided: WebAudioConstantSource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebAudioConstantSource", function() { return WebAudioConstantSource; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _decorators_audio_param__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../decorators/audio-param */ "../audio/src/decorators/audio-param.ts");
/* harmony import */ var _tokens_audio_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tokens/audio-context */ "../audio/src/tokens/audio-context.ts");
/* harmony import */ var _tokens_audio_node__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tokens/audio-node */ "../audio/src/tokens/audio-node.ts");
/* harmony import */ var _utils_parse__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/parse */ "../audio/src/utils/parse.ts");

var WebAudioConstantSource_1;





// @dynamic
let WebAudioConstantSource = WebAudioConstantSource_1 = class WebAudioConstantSource extends ConstantSourceNode {
    constructor(context, autoplay, offset) {
        super(context, {
            offset: Object(_utils_parse__WEBPACK_IMPORTED_MODULE_5__["parse"])(offset, 0),
        });
        this.ended = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onended = () => this.ended.emit();
        if (autoplay !== null) {
            this.start();
        }
    }
    ngOnDestroy() {
        try {
            this.stop();
        }
        catch (_) { }
        this.disconnect();
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('offset'),
    Object(_decorators_audio_param__WEBPACK_IMPORTED_MODULE_2__["audioParam"])('offset'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], WebAudioConstantSource.prototype, "offsetParam", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], WebAudioConstantSource.prototype, "ended", void 0);
WebAudioConstantSource = WebAudioConstantSource_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
        selector: '[waConstantSourceNode]',
        exportAs: 'AudioNode',
        inputs: ['channelCount', 'channelCountMode', 'channelInterpretation'],
        providers: [
            {
                provide: _tokens_audio_node__WEBPACK_IMPORTED_MODULE_4__["AUDIO_NODE"],
                useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(() => WebAudioConstantSource_1),
            },
        ],
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_context__WEBPACK_IMPORTED_MODULE_3__["AUDIO_CONTEXT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"])('autoplay')),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"])('offset')),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [BaseAudioContext, Object, Object])
], WebAudioConstantSource);



/***/ }),

/***/ "../audio/src/sources/media-source.ts":
/*!********************************************!*\
  !*** ../audio/src/sources/media-source.ts ***!
  \********************************************/
/*! exports provided: WebAudioMediaSource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebAudioMediaSource", function() { return WebAudioMediaSource; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _tokens_audio_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tokens/audio-context */ "../audio/src/tokens/audio-context.ts");
/* harmony import */ var _tokens_audio_node__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tokens/audio-node */ "../audio/src/tokens/audio-node.ts");
/* harmony import */ var _tokens_constructor_support__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tokens/constructor-support */ "../audio/src/tokens/constructor-support.ts");

var WebAudioMediaSource_1;




// @dynamic
let WebAudioMediaSource = WebAudioMediaSource_1 = class WebAudioMediaSource extends MediaElementAudioSourceNode {
    constructor(context, modern, { nativeElement }) {
        if (modern) {
            super(context, { mediaElement: nativeElement });
        }
        else {
            const result = context.createMediaElementSource(nativeElement);
            Object.setPrototypeOf(result, WebAudioMediaSource_1.prototype);
            return result;
        }
    }
    ngOnDestroy() {
        this.disconnect();
    }
};
WebAudioMediaSource = WebAudioMediaSource_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
        selector: 'audio[waMediaElementAudioSourceNode], video[waMediaElementAudioSourceNode]',
        exportAs: 'AudioNode',
        providers: [
            {
                provide: _tokens_audio_node__WEBPACK_IMPORTED_MODULE_3__["AUDIO_NODE"],
                useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(() => WebAudioMediaSource_1),
            },
        ],
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_context__WEBPACK_IMPORTED_MODULE_2__["AUDIO_CONTEXT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_constructor_support__WEBPACK_IMPORTED_MODULE_4__["CONSTRUCTOR_SUPPORT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [AudioContext, Boolean, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]])
], WebAudioMediaSource);



/***/ }),

/***/ "../audio/src/sources/media-stream-source.ts":
/*!***************************************************!*\
  !*** ../audio/src/sources/media-stream-source.ts ***!
  \***************************************************/
/*! exports provided: WebAudioMediaStreamSource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebAudioMediaStreamSource", function() { return WebAudioMediaStreamSource; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _tokens_audio_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tokens/audio-context */ "../audio/src/tokens/audio-context.ts");
/* harmony import */ var _tokens_audio_node__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tokens/audio-node */ "../audio/src/tokens/audio-node.ts");
/* harmony import */ var _tokens_constructor_support__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tokens/constructor-support */ "../audio/src/tokens/constructor-support.ts");
/* harmony import */ var _tokens_media_stream__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../tokens/media-stream */ "../audio/src/tokens/media-stream.ts");

var WebAudioMediaStreamSource_1;





// @dynamic
let WebAudioMediaStreamSource = WebAudioMediaStreamSource_1 = class WebAudioMediaStreamSource extends MediaStreamAudioSourceNode {
    constructor(mediaStream, context, modern) {
        if (modern) {
            super(context, { mediaStream });
        }
        else {
            const result = context.createMediaStreamSource(mediaStream);
            Object.setPrototypeOf(result, WebAudioMediaStreamSource_1.prototype);
            return result;
        }
    }
    ngOnDestroy() {
        this.disconnect();
    }
};
WebAudioMediaStreamSource = WebAudioMediaStreamSource_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
        selector: '[waMediaStreamAudioSourceNode]',
        exportAs: 'AudioNode',
        providers: [
            {
                provide: _tokens_audio_node__WEBPACK_IMPORTED_MODULE_3__["AUDIO_NODE"],
                useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(() => WebAudioMediaStreamSource_1),
            },
        ],
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_media_stream__WEBPACK_IMPORTED_MODULE_5__["MEDIA_STREAM"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_context__WEBPACK_IMPORTED_MODULE_2__["AUDIO_CONTEXT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_constructor_support__WEBPACK_IMPORTED_MODULE_4__["CONSTRUCTOR_SUPPORT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [MediaStream,
        AudioContext, Boolean])
], WebAudioMediaStreamSource);



/***/ }),

/***/ "../audio/src/sources/media-stream-track-source.ts":
/*!*********************************************************!*\
  !*** ../audio/src/sources/media-stream-track-source.ts ***!
  \*********************************************************/
/*! exports provided: WebAudioMediaStreamTrackSource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebAudioMediaStreamTrackSource", function() { return WebAudioMediaStreamTrackSource; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _tokens_audio_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tokens/audio-context */ "../audio/src/tokens/audio-context.ts");
/* harmony import */ var _tokens_audio_node__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tokens/audio-node */ "../audio/src/tokens/audio-node.ts");
/* harmony import */ var _tokens_media_stream_track__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tokens/media-stream-track */ "../audio/src/tokens/media-stream-track.ts");

var WebAudioMediaStreamTrackSource_1;




// @dynamic
let WebAudioMediaStreamTrackSource = WebAudioMediaStreamTrackSource_1 = class WebAudioMediaStreamTrackSource extends MediaStreamTrackAudioSourceNode {
    constructor(mediaStreamTrack, context) {
        super(context, { mediaStreamTrack });
    }
    ngOnDestroy() {
        this.disconnect();
    }
};
WebAudioMediaStreamTrackSource = WebAudioMediaStreamTrackSource_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
        selector: '[waMediaStreamTrackAudioSourceNode]',
        exportAs: 'AudioNode',
        providers: [
            {
                provide: _tokens_audio_node__WEBPACK_IMPORTED_MODULE_3__["AUDIO_NODE"],
                useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(() => WebAudioMediaStreamTrackSource_1),
            },
        ],
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_media_stream_track__WEBPACK_IMPORTED_MODULE_4__["MEDIA_STREAM_TRACK"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_context__WEBPACK_IMPORTED_MODULE_2__["AUDIO_CONTEXT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [MediaStreamTrack,
        AudioContext])
], WebAudioMediaStreamTrackSource);



/***/ }),

/***/ "../audio/src/sources/oscillator.ts":
/*!******************************************!*\
  !*** ../audio/src/sources/oscillator.ts ***!
  \******************************************/
/*! exports provided: WebAudioOscillator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebAudioOscillator", function() { return WebAudioOscillator; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _decorators_audio_param__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../decorators/audio-param */ "../audio/src/decorators/audio-param.ts");
/* harmony import */ var _tokens_audio_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tokens/audio-context */ "../audio/src/tokens/audio-context.ts");
/* harmony import */ var _tokens_audio_node__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tokens/audio-node */ "../audio/src/tokens/audio-node.ts");
/* harmony import */ var _tokens_constructor_support__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../tokens/constructor-support */ "../audio/src/tokens/constructor-support.ts");
/* harmony import */ var _utils_connect__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/connect */ "../audio/src/utils/connect.ts");
/* harmony import */ var _utils_parse__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/parse */ "../audio/src/utils/parse.ts");

var WebAudioOscillator_1;







// @dynamic
let WebAudioOscillator = WebAudioOscillator_1 = class WebAudioOscillator extends OscillatorNode {
    constructor(context, modern, autoplay, detuneArg, frequencyArg) {
        const detune = Object(_utils_parse__WEBPACK_IMPORTED_MODULE_7__["parse"])(detuneArg, 0);
        const frequency = Object(_utils_parse__WEBPACK_IMPORTED_MODULE_7__["parse"])(frequencyArg, 440);
        if (modern) {
            super(context, { detune, frequency });
            WebAudioOscillator_1.init(this, null, autoplay);
        }
        else {
            const result = context.createOscillator();
            Object.setPrototypeOf(WebAudioOscillator_1.prototype, Object.getPrototypeOf(result));
            Object.setPrototypeOf(result, WebAudioOscillator_1.prototype);
            result.detune.value = detune;
            result.frequency.value = frequency;
            WebAudioOscillator_1.init(result, null, autoplay);
            return result;
        }
    }
    set periodicWave(periodicWave) {
        this.setPeriodicWave(periodicWave);
    }
    ngOnDestroy() {
        try {
            this.stop();
        }
        catch (_) { }
        this.disconnect();
    }
    static init(that, node, autoplay) {
        Object(_utils_connect__WEBPACK_IMPORTED_MODULE_6__["connect"])(node, that);
        if (autoplay !== null) {
            that.start();
        }
        const ended = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        that.ended = ended;
        that.onended = () => ended.emit();
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", PeriodicWave),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [PeriodicWave])
], WebAudioOscillator.prototype, "periodicWave", null);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('detune'),
    Object(_decorators_audio_param__WEBPACK_IMPORTED_MODULE_2__["audioParam"])('detune'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], WebAudioOscillator.prototype, "detuneParam", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('frequency'),
    Object(_decorators_audio_param__WEBPACK_IMPORTED_MODULE_2__["audioParam"])('frequency'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], WebAudioOscillator.prototype, "frequencyParam", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
], WebAudioOscillator.prototype, "ended", void 0);
WebAudioOscillator = WebAudioOscillator_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
        selector: '[waOscillatorNode]',
        exportAs: 'AudioNode',
        inputs: ['type', 'channelCount', 'channelCountMode', 'channelInterpretation'],
        providers: [
            {
                provide: _tokens_audio_node__WEBPACK_IMPORTED_MODULE_4__["AUDIO_NODE"],
                useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(() => WebAudioOscillator_1),
            },
        ],
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_audio_context__WEBPACK_IMPORTED_MODULE_3__["AUDIO_CONTEXT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_tokens_constructor_support__WEBPACK_IMPORTED_MODULE_5__["CONSTRUCTOR_SUPPORT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"])('autoplay')),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"])('detune')),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"])('frequency')),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [BaseAudioContext, Boolean, Object, Object, Object])
], WebAudioOscillator);



/***/ }),

/***/ "../audio/src/tokens/audio-context.ts":
/*!********************************************!*\
  !*** ../audio/src/tokens/audio-context.ts ***!
  \********************************************/
/*! exports provided: AUDIO_CONTEXT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AUDIO_CONTEXT", function() { return AUDIO_CONTEXT; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");

const AUDIO_CONTEXT = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('Web Audio API context', {
    providedIn: 'root',
    factory: () => new AudioContext(),
});


/***/ }),

/***/ "../audio/src/tokens/audio-node.ts":
/*!*****************************************!*\
  !*** ../audio/src/tokens/audio-node.ts ***!
  \*****************************************/
/*! exports provided: AUDIO_NODE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AUDIO_NODE", function() { return AUDIO_NODE; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");

const AUDIO_NODE = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('Web Audio API audio node', {
    factory: () => null,
});


/***/ }),

/***/ "../audio/src/tokens/audio-worklet-processors-ready.ts":
/*!*************************************************************!*\
  !*** ../audio/src/tokens/audio-worklet-processors-ready.ts ***!
  \*************************************************************/
/*! exports provided: AUDIO_WORKLET_PROCESSORS_READY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AUDIO_WORKLET_PROCESSORS_READY", function() { return AUDIO_WORKLET_PROCESSORS_READY; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _audio_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./audio-context */ "../audio/src/tokens/audio-context.ts");
/* harmony import */ var _audio_worklet_processors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./audio-worklet-processors */ "../audio/src/tokens/audio-worklet-processors.ts");
/* harmony import */ var _audio_worklet_support__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./audio-worklet-support */ "../audio/src/tokens/audio-worklet-support.ts");




const AUDIO_WORKLET_PROCESSORS_READY = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('Web Audio API worklet processors resolution promise', {
    providedIn: 'root',
    factory: () => {
        const context = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["inject"])(_audio_context__WEBPACK_IMPORTED_MODULE_1__["AUDIO_CONTEXT"]);
        const processors = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["inject"])(_audio_worklet_processors__WEBPACK_IMPORTED_MODULE_2__["AUDIO_WORKLET_PROCESSORS"]);
        if (!Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["inject"])(_audio_worklet_support__WEBPACK_IMPORTED_MODULE_3__["AUDIO_WORKLET_SUPPORT"])) {
            return Promise.reject('AudioWorklet is not supported');
        }
        return Promise.all(processors.map(processor => context.audioWorklet.addModule(processor))).then(() => true);
    },
});


/***/ }),

/***/ "../audio/src/tokens/audio-worklet-processors.ts":
/*!*******************************************************!*\
  !*** ../audio/src/tokens/audio-worklet-processors.ts ***!
  \*******************************************************/
/*! exports provided: AUDIO_WORKLET_PROCESSORS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AUDIO_WORKLET_PROCESSORS", function() { return AUDIO_WORKLET_PROCESSORS; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");

const AUDIO_WORKLET_PROCESSORS = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('Web Audio API worklet processors paths', {
    providedIn: 'root',
    factory: () => [],
});


/***/ }),

/***/ "../audio/src/tokens/audio-worklet-support.ts":
/*!****************************************************!*\
  !*** ../audio/src/tokens/audio-worklet-support.ts ***!
  \****************************************************/
/*! exports provided: AUDIO_WORKLET_SUPPORT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AUDIO_WORKLET_SUPPORT", function() { return AUDIO_WORKLET_SUPPORT; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _audio_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./audio-context */ "../audio/src/tokens/audio-context.ts");


const AUDIO_WORKLET_SUPPORT = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('AudioWorklet browser support', {
    factory: () => !!Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["inject"])(_audio_context__WEBPACK_IMPORTED_MODULE_1__["AUDIO_CONTEXT"]).audioWorklet,
});


/***/ }),

/***/ "../audio/src/tokens/constructor-support.ts":
/*!**************************************************!*\
  !*** ../audio/src/tokens/constructor-support.ts ***!
  \**************************************************/
/*! exports provided: CONSTRUCTOR_SUPPORT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONSTRUCTOR_SUPPORT", function() { return CONSTRUCTOR_SUPPORT; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _audio_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./audio-context */ "../audio/src/tokens/audio-context.ts");


/**
 * This is mostly for internal use only
 */
const CONSTRUCTOR_SUPPORT = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('Tests if constructor mode of node creation is supported or a fallback to factory method is needed', {
    providedIn: 'root',
    factory: () => {
        try {
            return !!new GainNode(Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["inject"])(_audio_context__WEBPACK_IMPORTED_MODULE_1__["AUDIO_CONTEXT"]));
        }
        catch (_) {
            return false;
        }
    },
});


/***/ }),

/***/ "../audio/src/tokens/feedback-coefficients.ts":
/*!****************************************************!*\
  !*** ../audio/src/tokens/feedback-coefficients.ts ***!
  \****************************************************/
/*! exports provided: FEEDBACK_COEFFICIENTS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FEEDBACK_COEFFICIENTS", function() { return FEEDBACK_COEFFICIENTS; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");

const FEEDBACK_COEFFICIENTS = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('A sequence of feedback coefficients for IIRFilterNode');


/***/ }),

/***/ "../audio/src/tokens/feedforward-coefficients.ts":
/*!*******************************************************!*\
  !*** ../audio/src/tokens/feedforward-coefficients.ts ***!
  \*******************************************************/
/*! exports provided: FEEDFORWARD_COEFFICIENTS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FEEDFORWARD_COEFFICIENTS", function() { return FEEDFORWARD_COEFFICIENTS; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");

const FEEDFORWARD_COEFFICIENTS = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('A sequence of feedforward coefficients for IIRFilterNode');


/***/ }),

/***/ "../audio/src/tokens/media-stream-track.ts":
/*!*************************************************!*\
  !*** ../audio/src/tokens/media-stream-track.ts ***!
  \*************************************************/
/*! exports provided: MEDIA_STREAM_TRACK */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MEDIA_STREAM_TRACK", function() { return MEDIA_STREAM_TRACK; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");

const MEDIA_STREAM_TRACK = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('MediaStreamTrack for MediaStreamTrackAudioSourceNode');


/***/ }),

/***/ "../audio/src/tokens/media-stream.ts":
/*!*******************************************!*\
  !*** ../audio/src/tokens/media-stream.ts ***!
  \*******************************************/
/*! exports provided: MEDIA_STREAM */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MEDIA_STREAM", function() { return MEDIA_STREAM; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");

const MEDIA_STREAM = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('MediaStream for MediaStreamAudioSourceNode');


/***/ }),

/***/ "../audio/src/tokens/support.ts":
/*!**************************************!*\
  !*** ../audio/src/tokens/support.ts ***!
  \**************************************/
/*! exports provided: WEB_AUDIO_SUPPORT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WEB_AUDIO_SUPPORT", function() { return WEB_AUDIO_SUPPORT; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");

const WEB_AUDIO_SUPPORT = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('Web Audio API support', {
    providedIn: 'root',
    factory: () => !!AudioContext,
});


/***/ }),

/***/ "../audio/src/utils/connect.ts":
/*!*************************************!*\
  !*** ../audio/src/utils/connect.ts ***!
  \*************************************/
/*! exports provided: connect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "connect", function() { return connect; });
function connect(source, destination) {
    if (source && destination) {
        // @ts-ignore TS does not have a union override for connect method
        source.connect(destination);
    }
}


/***/ }),

/***/ "../audio/src/utils/fallback-audio-param.ts":
/*!**************************************************!*\
  !*** ../audio/src/utils/fallback-audio-param.ts ***!
  \**************************************************/
/*! exports provided: fallbackAudioParam */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fallbackAudioParam", function() { return fallbackAudioParam; });
function fallbackAudioParam(value) {
    if (!value) {
        return 0;
    }
    if (typeof value === 'number') {
        return value;
    }
    if (value instanceof Array) {
        const last = value[value.length - 1].value;
        return typeof last === 'number' ? last : last[last.length - 1];
    }
    if (value.value instanceof Array) {
        return value.value[value.value.length - 1];
    }
    return value.value;
}


/***/ }),

/***/ "../audio/src/utils/latency-hint-factory.ts":
/*!**************************************************!*\
  !*** ../audio/src/utils/latency-hint-factory.ts ***!
  \**************************************************/
/*! exports provided: latencyHintFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "latencyHintFactory", function() { return latencyHintFactory; });
function latencyHintFactory(latencyHint) {
    return latencyHint === null
        ? undefined
        : Number.parseFloat(latencyHint) || latencyHint;
}


/***/ }),

/***/ "../audio/src/utils/parse.ts":
/*!***********************************!*\
  !*** ../audio/src/utils/parse.ts ***!
  \***********************************/
/*! exports provided: parse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return parse; });
function parse(value, fallback) {
    const parsed = parseFloat(value || '');
    return isNaN(parsed) ? fallback : parsed;
}


/***/ }),

/***/ "../audio/src/utils/process-audio-param.ts":
/*!*************************************************!*\
  !*** ../audio/src/utils/process-audio-param.ts ***!
  \*************************************************/
/*! exports provided: processAudioParam */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "processAudioParam", function() { return processAudioParam; });
function processAudioParam(param, value, currentTime = 0) {
    if (param.cancelAndHoldAtTime) {
        param.cancelAndHoldAtTime(currentTime);
    }
    else {
        param.cancelScheduledValues(currentTime);
        param.setValueAtTime(guard(param.value), currentTime);
    }
    if (typeof value === 'number') {
        param.setValueAtTime(guard(value), currentTime);
        return;
    }
    if (value instanceof Array) {
        processSchedule(param, value, currentTime);
        return;
    }
    if (!('mode' in value)) {
        param.setValueCurveAtTime(value.value, currentTime, value.duration);
        return;
    }
    param.setValueAtTime(guard(param.value), currentTime);
    processAutomation(param, value, currentTime);
}
function processSchedule(param, value, currentTime) {
    value.forEach(automation => {
        if ('mode' in automation) {
            processAutomation(param, automation, currentTime);
        }
        else {
            param.setValueCurveAtTime(automation.value, currentTime, automation.duration);
        }
        currentTime += automation.duration;
    });
}
function processAutomation(param, { value, mode = 'instant', duration }, currentTime) {
    switch (mode) {
        case 'instant':
            param.setValueAtTime(guard(value), currentTime);
            param.setValueAtTime(guard(value), currentTime + duration);
            break;
        case 'exponential':
            if (value < 0 || value * param.value < 0) {
                param.linearRampToValueAtTime(guard(value), currentTime + duration);
            }
            else {
                param.exponentialRampToValueAtTime(guard(value), currentTime + duration);
            }
            param.setValueAtTime(guard(value), currentTime + duration);
            break;
        case 'linear':
            param.linearRampToValueAtTime(guard(value), currentTime + duration);
            break;
    }
}
function guard(v) {
    return v || 0.00000001;
}


/***/ }),

/***/ "./src/app/app.browser.module.ts":
/*!***************************************!*\
  !*** ./src/app/app.browser.module.ts ***!
  \***************************************/
/*! exports provided: AppBrowserModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppBrowserModule", function() { return AppBrowserModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ "../../node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _ng_web_apis_audio__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-web-apis/audio */ "../audio/src/public-api.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");







let AppBrowserModule = class AppBrowserModule {
};
AppBrowserModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]],
        imports: [
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ng_web_apis_audio__WEBPACK_IMPORTED_MODULE_5__["WebAudioModule"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["BrowserModule"].withServerTransition({ appId: 'demo' }),
        ],
        declarations: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]],
        providers: [
            {
                provide: _angular_common__WEBPACK_IMPORTED_MODULE_1__["LocationStrategy"],
                useClass: _angular_common__WEBPACK_IMPORTED_MODULE_1__["PathLocationStrategy"],
            },
        ],
    })
], AppBrowserModule);



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<button *ngIf=\"!started; else graph\" (click)=\"start()\">Start AudioContext</button>\n<ng-template #graph>\n    <section>\n        <h1>Description</h1>\n        <p>\n            This is a demo for <code><em>@ng-web-apis/audio</em></code> — a Web Audio API\n            declarative library for Angular. Here you can select different audio source\n            options and see AudioNode graph for selected configuration. Demo page uses\n            HTML elements as directives hosts, in real life scenario you can use\n            <code>ng-container</code> so you will not have redundant DOM tags.\n        </p>\n    </section>\n    <section>\n        <h1>Source</h1>\n\n        <p>\n            <label>\n                <input\n                    type=\"radio\"\n                    value=\"buffer\"\n                    name=\"source\"\n                    [(ngModel)]=\"selectedSource\"\n                />\n                AudioBufferSourceNode\n            </label>\n        </p>\n        <p>\n            <label>\n                <input\n                    type=\"radio\"\n                    value=\"media\"\n                    name=\"source\"\n                    [(ngModel)]=\"selectedSource\"\n                />\n                MediaElementAudioSourceNode\n            </label>\n        </p>\n        <p>\n            <label>\n                <input\n                    type=\"radio\"\n                    value=\"oscillator\"\n                    name=\"source\"\n                    [(ngModel)]=\"selectedSource\"\n                />\n                OscillatorNode\n            </label>\n        </p>\n\n        <ng-container [ngSwitch]=\"selectedSource\">\n            <ng-container *ngSwitchCase=\"'buffer'\">\n                <button\n                    *ngFor=\"let _ of buffers\"\n                    #source=\"AudioNode\"\n                    waAudioBufferSourceNode\n                    buffer=\"assets/demo.mp3\"\n                    [loop]=\"true\"\n                    (click)=\"onClick(source, $event.target)\"\n                >\n                    Play\n                    <ng-container\n                        waAnalyserNode\n                        (timeByte$)=\"onTimeDomain($event, canvas)\"\n                    >\n                        <ng-container [waOutput]=\"chain || fallback\"></ng-container>\n                    </ng-container>\n                </button>\n            </ng-container>\n            <audio\n                *ngSwitchCase=\"'media'\"\n                waMediaElementAudioSourceNode\n                src=\"assets/demo.mp3\"\n                loop\n                controls\n            >\n                <ng-container waAnalyserNode (timeByte$)=\"onTimeDomain($event, canvas)\">\n                    <ng-container [waOutput]=\"chain || fallback\"></ng-container>\n                </ng-container>\n            </audio>\n            <ng-container *ngSwitchCase=\"'oscillator'\">\n                <button\n                    *ngFor=\"let _ of buffers\"\n                    #source=\"AudioNode\"\n                    waOscillatorNode\n                    [frequency]=\"100\"\n                    [periodicWave]=\"real | waPeriodicWave\"\n                    (click)=\"onClick(source, $event.target)\"\n                >\n                    Play\n                    <ng-container\n                        waAnalyserNode\n                        (timeByte$)=\"onTimeDomain($event, canvas)\"\n                    >\n                        <ng-container [waOutput]=\"chain || fallback\"></ng-container>\n                    </ng-container>\n                </button>\n            </ng-container>\n        </ng-container>\n\n        <p>\n            <canvas #fallback=\"AudioNode\" #canvas waAudioDestinationNode></canvas>\n        </p>\n    </section>\n\n    <section>\n        <h1>Chain</h1>\n\n        <p>\n            <label>\n                <input\n                    type=\"radio\"\n                    name=\"chain\"\n                    value=\"dry\"\n                    [(ngModel)]=\"selectedChain\"\n                />\n                Dry\n            </label>\n        </p>\n        <p>\n            <label>\n                <input\n                    type=\"radio\"\n                    name=\"chain\"\n                    value=\"balance\"\n                    [(ngModel)]=\"selectedChain\"\n                />\n                Balance\n            </label>\n        </p>\n        <p>\n            <label>\n                <input\n                    type=\"radio\"\n                    name=\"chain\"\n                    value=\"delay\"\n                    [(ngModel)]=\"selectedChain\"\n                />\n                Delay\n            </label>\n        </p>\n        <p>\n            <label>\n                <input\n                    type=\"radio\"\n                    name=\"chain\"\n                    value=\"complex\"\n                    [(ngModel)]=\"selectedChain\"\n                />\n                Complex\n            </label>\n        </p>\n\n        <ng-container [ngSwitch]=\"selectedChain\">\n            <ng-container *ngSwitchCase=\"'balance'\">\n                <fieldset #chain=\"AudioNode\" waGainNode [gain]=\"gain | waAudioParam: 0.1\">\n                    <legend>GainNode</legend>\n                    <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" [(ngModel)]=\"gain\" />\n                    <fieldset waStereoPannerNode [pan]=\"pan | waAudioParam: 0.1\">\n                        <legend>StereoPannerNode</legend>\n                        <input\n                            type=\"range\"\n                            min=\"-1\"\n                            max=\"1\"\n                            step=\"0.01\"\n                            [(ngModel)]=\"pan\"\n                        />\n                        <fieldset waAudioDestinationNode>\n                            <legend>AudioDestinationNode</legend>\n                        </fieldset>\n                    </fieldset>\n                </fieldset>\n            </ng-container>\n\n            <ng-container *ngSwitchCase=\"'delay'\">\n                <fieldset #chain=\"AudioNode\" waGainNode [gain]=\"gain | waAudioParam: 0.1\">\n                    <legend>GainNode</legend>\n                    <em>For feedback loop purposes only</em>\n\n                    <fieldset waDelayNode [delayTime]=\"delayTime | waAudioParam: 0.1\">\n                        <legend>DelayNode</legend>\n                        <input\n                            type=\"range\"\n                            min=\"0\"\n                            max=\"1\"\n                            step=\"0.01\"\n                            [(ngModel)]=\"delayTime\"\n                        />\n                        <fieldset waGainNode [gain]=\"delayGain\">\n                            <legend>GainNode</legend>\n                            <input\n                                type=\"range\"\n                                min=\"0\"\n                                max=\"1\"\n                                step=\"0.01\"\n                                [(ngModel)]=\"delayGain\"\n                            />\n                            <fieldset [waOutput]=\"chain\">\n                                <legend>Output</legend>\n                                <em>Connected back to the beginning of the chain</em>\n                            </fieldset>\n                        </fieldset>\n                    </fieldset>\n                    <fieldset waAudioDestinationNode>\n                        <legend>AudioDestinationNode</legend>\n                    </fieldset>\n                </fieldset>\n            </ng-container>\n\n            <ng-container *ngSwitchCase=\"'complex'\">\n                <fieldset\n                    #chain=\"AudioNode\"\n                    waBiquadFilterNode\n                    [type]=\"type\"\n                    [gain]=\"filterGain | waAudioParam: 0.1\"\n                    [frequency]=\"frequency | waAudioParam: 0.1\"\n                    [Q]=\"Q | waAudioParam: 0.1\"\n                    [detune]=\"detune | waAudioParam: 0.1\"\n                >\n                    <legend>BiquadFilterNode</legend>\n                    <label>\n                        <select [(ngModel)]=\"type\">\n                            <option value=\"lowpass\">lowpass</option>\n                            <option value=\"highpass\">highpass</option>\n                            <option value=\"bandpass\">bandpass</option>\n                            <option value=\"lowshelf\">lowshelf</option>\n                            <option value=\"highshelf\">highshelf</option>\n                            <option value=\"peaking\">peaking</option>\n                            <option value=\"notch\">notch</option>\n                            <option value=\"allpass\">allpass</option>\n                        </select>\n                        <code>type</code>\n                    </label>\n                    <label>\n                        <input\n                            type=\"range\"\n                            min=\"0\"\n                            max=\"1\"\n                            step=\"0.01\"\n                            [(ngModel)]=\"filterGain\"\n                        />\n                        <code>gain</code>\n                    </label>\n                    <label>\n                        <input type=\"range\" min=\"20\" max=\"5000\" [(ngModel)]=\"frequency\" />\n                        <code>frequency</code>\n                    </label>\n                    <label>\n                        <input type=\"range\" min=\"1\" max=\"100\" [(ngModel)]=\"Q\" />\n                        <code>Q</code>\n                    </label>\n                    <label>\n                        <input type=\"range\" min=\"0\" max=\"100\" [(ngModel)]=\"detune\" />\n                        <code>detune</code>\n                    </label>\n                    <fieldset waWaveShaperNode oversample=\"4x\" [curve]=\"curve\">\n                        <legend>WaveShaperNode</legend>\n                        <input\n                            type=\"range\"\n                            min=\"0\"\n                            max=\"20\"\n                            step=\"0.1\"\n                            [ngModel]=\"distortion\"\n                            (ngModelChange)=\"onCurveChange($event)\"\n                        />\n                        <ng-container\n                            waGainNode\n                            [gain]=\"distortionCompensation | waAudioParam: 0.1\"\n                        >\n                            <fieldset waConvolverNode buffer=\"assets/response.m4a\">\n                                <legend>ConvolverNode</legend>\n                                <fieldset waAudioDestinationNode>\n                                    <legend>AudioDestinationNode</legend>\n                                </fieldset>\n                            </fieldset>\n                        </ng-container>\n                    </fieldset>\n                </fieldset>\n            </ng-container>\n        </ng-container>\n    </section>\n</ng-template>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ng_web_apis_audio__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ng-web-apis/audio */ "../audio/src/public-api.ts");



let AppComponent = class AppComponent {
    constructor(context) {
        this.context = context;
        this.buffers = [Date.now()];
        this.selectedChain = 'dry';
        this.selectedSource = 'buffer';
        this.gain = 1;
        this.pan = 0;
        this.delayTime = 1;
        this.delayGain = 0.5;
        this.distortion = 20;
        this.frequency = 350;
        this.detune = 0;
        this.filterGain = 0;
        this.Q = 1;
        this.type = 'lowpass';
        this.curve = makeDistortionCurve(this.distortion);
        this.started = false;
        this.real = [0, 0, 1, 0, 1];
    }
    get distortionCompensation() {
        return 1.2 - this.distortion / 20;
    }
    start() {
        this.started = true;
        this.context.resume();
    }
    onCurveChange(distortion) {
        this.distortion = distortion;
        this.curve = makeDistortionCurve(distortion);
    }
    onClick(source, button) {
        if (button.textContent.trim() === 'Play') {
            button.textContent = 'Stop';
            source.start();
        }
        else {
            this.buffers[0] = Date.now();
        }
    }
    onTimeDomain(array, canvas) {
        const canvasCtx = canvas.getContext('2d');
        if (!canvasCtx) {
            return;
        }
        canvasCtx.fillStyle = 'rgb(200, 200, 200)';
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
        canvasCtx.beginPath();
        const sliceWidth = (canvas.width * 1.0) / array.length;
        let x = 0;
        for (let i = 0; i < array.length; i++) {
            const v = array[i] / 128.0;
            const y = (v * canvas.height) / 2;
            if (i === 0) {
                canvasCtx.moveTo(x, y);
            }
            else {
                canvasCtx.lineTo(x, y);
            }
            x += sliceWidth;
        }
        canvasCtx.lineTo(canvas.width, canvas.height / 2);
        canvasCtx.stroke();
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('chain'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", AudioNode)
], AppComponent.prototype, "chain", void 0);
AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'main',
        template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
        changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_ng_web_apis_audio__WEBPACK_IMPORTED_MODULE_2__["AUDIO_CONTEXT"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [AudioContext])
], AppComponent);

function makeDistortionCurve(amount) {
    const samples = 44100;
    const curve = new Float32Array(samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < samples; ++i) {
        const x = (i * 2) / samples - 1;
        curve[i] = ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x));
    }
    return curve;
}


/***/ }),

/***/ "./src/main.browser.ts":
/*!*****************************!*\
  !*** ./src/main.browser.ts ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "../../node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_browser_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/app.browser.module */ "./src/app/app.browser.module.ts");


Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_0__["platformBrowserDynamic"])()
    .bootstrapModule(_app_app_browser_module__WEBPACK_IMPORTED_MODULE_1__["AppBrowserModule"])
    .then(ref => {
    const windowRef = window;
    // Ensure Angular destroys itself on hot reloads for Stackblitz
    if (windowRef['ngRef']) {
        windowRef['ngRef'].destroy();
    }
    windowRef['ngRef'] = ref;
})
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***********************************!*\
  !*** multi ./src/main.browser.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/travis/build/ng-web-apis/audio/projects/demo/src/main.browser.ts */"./src/main.browser.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map