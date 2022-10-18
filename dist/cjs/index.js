"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.utmSourceTracking = exports.getUtms = exports.utmCookie = exports.trackEvent = exports.trackInput = exports.trackClick = exports.initSegment = exports.user = exports.track = void 0;
const segment_1 = __importDefault(require("./segment"));
const track = __importStar(require("./track"));
exports.track = track;
const user = __importStar(require("./user"));
exports.user = user;
const lib_1 = require("./lib");
Object.defineProperty(exports, "utmCookie", { enumerable: true, get: function () { return lib_1.utmCookie; } });
Object.defineProperty(exports, "utmSourceTracking", { enumerable: true, get: function () { return lib_1.utmSourceTracking; } });
const initSegment = (segmentKey, options) => {
    if (typeof window !== 'undefined') {
        (0, segment_1.default)(segmentKey, options);
    }
    return;
};
exports.initSegment = initSegment;
const trackClick = track.trackClick;
exports.trackClick = trackClick;
const trackInput = track.trackTextInput;
exports.trackInput = trackInput;
const trackEvent = track.customEvent;
exports.trackEvent = trackEvent;
const getUtms = lib_1.utmsFromCookie;
exports.getUtms = getUtms;
