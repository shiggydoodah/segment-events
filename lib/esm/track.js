import * as lib from './lib';
// type FormData = Record<string, any>
// interface IFormProperties<T> extends CommonProperties {
//   form_name: string
//   form_action: string
//   form_method: string
//   data: T | FormData
// }
var TrackEvents;
(function (TrackEvents) {
    TrackEvents["ElementClicked"] = "Element Clicked";
    TrackEvents["ElementHovered"] = "Element Hovered";
    TrackEvents["OptionSelected"] = "Option Selected";
    TrackEvents["TextEntered"] = "Text Entered";
    TrackEvents["ModalOpen"] = "Model Opened";
    TrackEvents["ModalClosed"] = "Modal Closed";
    TrackEvents["VideoPlay"] = "Video Played";
    TrackEvents["VideoStopped"] = "Video Stopped";
    TrackEvents["FormSubmitted"] = "Form Submitted";
    TrackEvents["FormFailed"] = "Form Submitted Failed";
    TrackEvents["SignupSuccessful"] = "Signup Successful";
    TrackEvents["SignupFailed"] = "Signup Failed";
    TrackEvents["LoginSuccessful"] = "Login Successful";
    TrackEvents["LoginFailed"] = "Login Failed";
    TrackEvents["LogoutSuccessful"] = "Logout Successful";
    TrackEvents["LogoutFailed"] = "Logout Failed";
})(TrackEvents || (TrackEvents = {}));
// TODO: remove having to pass regions from this function.
function page(regions, platform) {
    var _a;
    if (typeof window === 'undefined')
        return;
    if (window.analytics) {
        const data = lib.getPageInfo();
        const country = lib.getRegionFromPath(regions, data.path);
        (_a = window.analytics) === null || _a === void 0 ? void 0 : _a.page(Object.assign(Object.assign({ name: data.pageName, path: data.path, country: country }, data.params), { platform }));
        if (data.params) {
            window.analytics.identify(Object.assign(Object.assign({}, data.params), { country: country }));
        }
    }
}
function clicks(selector, regions, platform) {
    if (typeof window === 'undefined' || !window.analytics)
        return;
    const elements = document.querySelectorAll(selector);
    const pageData = lib.getPageInfo();
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', (e) => {
            const el = e.target;
            const attr = lib.getAttributes(el);
            const elementProperties = lib.getElementProperties(el);
            const name = attr.name ? attr.name : elementProperties.text;
            const data = {
                name,
                page: pageData.pageName,
                url: pageData.url,
                element_type: attr.type,
                surface_type: attr.surfaceType,
                surface_title: attr.surfaceTitle,
                href: elementProperties.href,
                country: lib.getRegionFromPath(regions, pageData.path),
                platform,
            };
            window.analytics.track(TrackEvents.ElementClicked, data);
        });
    }
}
function textEntered(selector, regions, platform) {
    if (typeof window === 'undefined' || !window.analytics)
        return;
    const elements = document.querySelectorAll(selector);
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener('change', (e) => {
            const el = e.target;
            const pageData = lib.getPageInfo();
            const input = lib.getInputProperties(el);
            const data = {
                name: input.name,
                page: pageData.pageName,
                url: pageData.url,
                element_type: input.type,
                surface_type: input.surface_type,
                surface_title: input.surface_title,
                value: input.value,
                filed_name: input.field_name,
                country: lib.getRegionFromPath(regions, pageData.path),
                platform,
            };
            window.analytics.track(TrackEvents.TextEntered, data);
            if (input.trait && input.value && input.value.length > 0) {
                window.analytics.identify({
                    [input.trait]: input.value,
                });
            }
        });
    }
}
function optionSelected(selector, regions, platform) {
    if (typeof window === 'undefined' || !window.analytics)
        return;
    const elements = document.querySelectorAll(selector);
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener('change', (e) => {
            const el = e.target;
            const elementType = el.tagName.toLowerCase();
            let option = '';
            let optionValue = false;
            let optionName = false;
            if (elementType === 'select') {
                const select = el;
                const optionIndex = select.options[select.selectedIndex];
                optionValue = lib.getDataAttribute('option-value', optionIndex) || optionIndex.value;
            }
            if (elementType === 'input') {
                const inputOption = el;
                option = lib.getDataAttribute('data-option-value', inputOption) || inputOption.name;
                if (inputOption.type === 'checkbox') {
                    optionValue = inputOption.checked ? 'checked' : 'unchecked';
                }
                if (inputOption.id) {
                    option = lib.getInputLableValue(inputOption) || option;
                }
                optionName = lib.getDataAttribute('element-name', inputOption)
                    ? lib.getDataAttribute('element-name', inputOption)
                    : lib.getInputLableValue(inputOption);
            }
            const pageData = lib.getPageInfo();
            const input = lib.getInputProperties(el);
            const value = optionValue || input.value;
            const data = {
                name: optionName || input.name,
                option,
                filed_name: input.field_name,
                value: value,
                page: pageData.pageName,
                url: pageData.url,
                element_type: input.type,
                surface_type: input.surface_type,
                surface_title: input.surface_title,
                country: lib.getRegionFromPath(regions, pageData.path),
                platform,
            };
            window.analytics.track(TrackEvents.OptionSelected, data);
            if (input.trait && value && value.length > 0) {
                window.analytics.identify({
                    [input.trait]: value,
                });
            }
        });
    }
}
// TODO: dispatch custom listeners for firing custom events.
// interface dispatchCustomEvent {
//   name: string
//   detail: any
// }
// function dispatchListener(event: dispatchCustomEvent) {
//   if (typeof window === "undefined" || !window.analytics) return
//   window.addEventListener(event, (e: object) => {
//     window.analytics.track(event, e)
//   })
// }
// function dispatchEvent(event: string, data: object) {
//   if (typeof window === "undefined" || !window.analytics) return
//   window.dispatchEvent(new CustomEvent(event, data))
// }
function customEvent(eventName, data) {
    if (typeof window === 'undefined' || !window.analytics)
        return;
    window.analytics.track(eventName, data);
}
export { page, clicks, textEntered, optionSelected, 
// dispatchListener,
// dispatchEvent,
customEvent, };
