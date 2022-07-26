function identify(traits, id) {
    if (typeof window !== 'undefined' && (window === null || window === void 0 ? void 0 : window.analytics)) {
        window.analytics.ready(function () {
            window.analytics.identify(id || '', Object.assign({}, traits));
        });
    }
}
function setUser(id, traits) {
    if (typeof window !== 'undefined' && (window === null || window === void 0 ? void 0 : window.analytics)) {
        window.analytics.ready(function () {
            window.analytics.identify(id, Object.assign({}, traits));
        });
    }
}
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
export { identify, setUser, getUser };
