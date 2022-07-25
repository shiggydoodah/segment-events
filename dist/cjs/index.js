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
exports.trackEvent = exports.trackInput = exports.trackClick = exports.getUser = exports.initSegment = exports.track = void 0;
const segment_1 = __importDefault(require("./segment"));
const trackEvents = __importStar(require("./track"));
const initSegment = (segmentKey, options) => {
    if (typeof window === 'undefined') {
        return;
    }
    (0, segment_1.default)(segmentKey, options);
};
exports.initSegment = initSegment;
const track = trackEvents;
exports.track = track;
// type TrackElementEvents =
//   | 'Element Clicked'
//   | 'Text Entered'
//   | 'Option Selected'
//   | 'Element Hovered'
//   | 'Modal Opened'
//   | 'Modal Closed'
//   | 'Video Played'
//   | 'Video Stopped'
const getUser = () => {
    if (typeof window === 'undefined' || !window.analytics)
        return;
    window.analytics.ready(function () {
        const user = window.analytics.user();
        const traits = user.traits();
        const userId = user.id();
        const anonymousId = user.anonymousId();
        return {
            user,
            traits,
            userId,
            anonymousId,
        };
    });
};
exports.getUser = getUser;
const trackClick = track.trackClick;
exports.trackClick = trackClick;
const trackInput = track.trackTextInput;
exports.trackInput = trackInput;
const trackEvent = track.customEvent;
exports.trackEvent = trackEvent;
