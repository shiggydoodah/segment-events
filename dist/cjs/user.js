"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.setUser = exports.identify = void 0;
function identify(traits, id) {
    if (typeof window !== 'undefined' && (window === null || window === void 0 ? void 0 : window.analytics)) {
        window.analytics.ready(function () {
            window.analytics.identify(id || '', Object.assign({}, traits));
        });
    }
}
exports.identify = identify;
function setUser(id, traits) {
    if (typeof window !== 'undefined' && (window === null || window === void 0 ? void 0 : window.analytics)) {
        window.analytics.ready(function () {
            window.analytics.identify(id, Object.assign({}, traits));
        });
    }
}
exports.setUser = setUser;
function getUser() {
    if (typeof window !== 'undefined' && (window === null || window === void 0 ? void 0 : window.analytics)) {
        window.analytics.ready(function () {
            return window.analytics.user();
        });
    }
    return {
        id: () => '',
        traits: () => ({}),
        alias: () => { },
        anonymousId: () => '',
    };
}
exports.getUser = getUser;
