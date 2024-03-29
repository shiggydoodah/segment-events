function setCookie(name, value) {
    let d = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    let expires = 'expires=' + d.toUTCString();
    let cookie_value = JSON.stringify(value);
    document.cookie = name + '=' + cookie_value + ';' + expires + ';path=/;SameSite=Lax"';
}
function getCookie(cookie_name) {
    if (typeof window === 'undefined')
        return false;
    try {
        const hasCookie = document.cookie.match(new RegExp('(^| )' + cookie_name + '=([^;]+)'));
        if (hasCookie && hasCookie.length > 2) {
            return JSON.parse(hasCookie[2]);
        }
        else {
            return false;
        }
    }
    catch (e) {
        console.log(e);
        return false;
    }
}
function getUTM() {
    const defaultUtms = {
        utm_source: false,
        utm_medium: false,
        utm_campaign: false,
        utm_content: false,
        utm_term: false,
        utm_id: false,
        gclid: false,
        utm_cta: false,
        target_id: false,
        of_source: false,
    };
    return defaultUtms;
}
function getParams() {
    const params = new URLSearchParams(window.location.search);
    const paramsArray = {};
    for (let pair of params.entries()) {
        paramsArray[pair[0]] = pair[1];
    }
    return paramsArray;
}
function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function utmSourceTracking() {
    const defaultUtms = getUTM();
    const getUTMsFromParams = () => {
        let utms = {};
        const defaultUtms = getUTM();
        const searchParams = Object.keys(window.location.search);
        if (searchParams.length > 0) {
            if (window.location.search.indexOf('disableAnalytics') > -1) {
                setCookie('disableAnalytics', 'true');
            }
            for (let key in defaultUtms) {
                const value = getParameterByName(key);
                if (value) {
                    utms[key] = value;
                }
            }
            if (Object.keys(utms).length > 0) {
                return {
                    first_touch: Object.assign(Object.assign({}, defaultUtms), utms),
                    most_recent: Object.assign(Object.assign({}, defaultUtms), utms),
                };
            }
        }
        return false;
    };
    const cookie = getCookie('outfund_utm');
    const utms = getUTMsFromParams();
    if (utms && !cookie) {
        setCookie('outfund_utm', utms);
        return Object.assign(Object.assign({}, utms), { utm_from_params: true });
    }
    if (!utms && cookie) {
        return {
            first_touch: cookie.first_touch,
            most_recent: cookie.most_recent,
            utm_from_params: false,
        };
    }
    if (utms && cookie) {
        const first = cookie.first_touch;
        const utmData = {
            first_touch: first,
            most_recent: utms.most_recent,
            utm_from_params: true,
        };
        setCookie('outfund_utm', utmData);
        return utmData;
    }
    return {
        first_touch: defaultUtms,
        most_recent: defaultUtms,
        utm_from_params: false,
    };
}
function utmsFromCookie() {
    const defaultUtms = getUTM();
    const cookie = getCookie('outfund_utm');
    if (cookie)
        return cookie;
    return defaultUtms;
}
function utmCookie() {
    const cookie = getCookie('outfund_analytics');
    if (cookie)
        return cookie;
    return false;
}
function getRegionFromPath(regions, path) {
    let region = 'uk';
    if (regions && regions.length > 0) {
        for (let i = 0; i < regions.length; i++) {
            if (path.indexOf(`/${regions[i]}`) > -1) {
                region = regions[i];
                break;
            }
        }
    }
    return region;
}
function getPageName(title, pageNames) {
    if (typeof window === 'undefined')
        return;
    const strArray = title.split('|');
    if (strArray.length > 1) {
        return strArray[0].trim();
    }
    else {
        return title;
    }
}
function getPageInfo() {
    const path = document.location.pathname;
    const url = document.location.href;
    const pageName = getPageName(document.title);
    return {
        path,
        url,
        pageName,
    };
}
function getUTMs() {
    const utms = utmSourceTracking();
    return Object.assign(Object.assign({ first_touch: utms.first_touch }, utms.most_recent), { utms_from_params: utms.utm_from_params });
}
var CustomAttributes;
(function (CustomAttributes) {
    CustomAttributes["elementType"] = "element-type";
    CustomAttributes["elementName"] = "element-name";
    CustomAttributes["elementState"] = "element-state";
    CustomAttributes["surfaceTitle"] = "data-surface-title";
    CustomAttributes["surfaceType"] = "data-surface-type";
    CustomAttributes["category"] = "data-element-category";
})(CustomAttributes || (CustomAttributes = {}));
function useOptionalsData(options) {
    if (options !== undefined) {
        return options;
    }
    else {
        return {};
    }
}
function getSurfaceData(element, surface) {
    let surfaceData = element.getAttribute(`data-surface-${surface}`) || false;
    if (surfaceData)
        return surfaceData;
    const parent = (element === null || element === void 0 ? void 0 : element.parentNode) || false;
    const parent2 = (parent && (parent === null || parent === void 0 ? void 0 : parent.parentNode)) || false;
    const parent3 = (parent2 && (parent2 === null || parent2 === void 0 ? void 0 : parent2.parentNode)) || false;
    const parent4 = (parent3 && (parent3 === null || parent3 === void 0 ? void 0 : parent3.parentNode)) || false;
    const tree = [parent, parent2, parent3, parent4];
    for (let i = 0; i < tree.length; i++) {
        if (tree[i]) {
            const el = tree[i];
            const hasSurfaceData = el.getAttribute(`data-surface-${surface}`);
            if (hasSurfaceData)
                surfaceData = hasSurfaceData;
            if (surfaceData)
                break;
        }
    }
    return surfaceData ? surfaceData : '';
}
function getDataAttribute(attribute, element) {
    const value = element.getAttribute(attribute);
    return value ? value : '';
}
function getAttributes(element) {
    const attributes = {};
    for (let i = 0; i < element.attributes.length; i++) {
        const attr = element.attributes[i];
        attributes[attr.name] = attr.value;
    }
    return {
        type: attributes.hasOwnProperty(CustomAttributes.elementType)
            ? attributes[CustomAttributes.elementType]
            : 'undefined',
        name: attributes.hasOwnProperty(CustomAttributes.elementName) ? attributes[CustomAttributes.elementName] : '',
        surfaceTitle: attributes.hasOwnProperty(CustomAttributes.surfaceTitle)
            ? attributes[CustomAttributes.surfaceTitle]
            : getSurfaceData(element, 'title'),
        surfaceType: attributes.hasOwnProperty(CustomAttributes.surfaceType)
            ? attributes[CustomAttributes.surfaceType]
            : getSurfaceData(element, 'type'),
        category: attributes.hasOwnProperty(CustomAttributes.category) ? attributes[CustomAttributes.category] : '',
    };
}
function getElementProperties(element) {
    const href = element.getAttribute('href') || '';
    const title = element.getAttribute('title') || '';
    const text = element.textContent || element.innerText || '';
    let innerText = '';
    if (text.length > 0 && text.length > 0) {
        innerText = text;
    }
    if (!innerText && title) {
        innerText = title;
    }
    return {
        href,
        title,
        text: innerText,
    };
}
function getInputProperties(element) {
    const type = element.getAttribute('type') || undefined;
    const value = type === 'password' ? '[REDACTED]' : element.getAttribute('value') || '';
    const attr = getAttributes(element);
    return {
        type,
        name: attr.name || element.getAttribute('name') || '',
        value,
        field_name: element.getAttribute('name') || '',
        trait: getDataAttribute('data-trait', element) || false,
        surface_title: attr.surfaceTitle,
        surface_type: attr.surfaceType,
    };
}
function getInputLableValue(element) {
    var _a;
    const label = (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector('label');
    if (label) {
        return label.textContent || label.innerText;
    }
    return false;
}
function parsePageNameFromPath(pages, region) {
    var _a;
    if (typeof window === 'undefined')
        return '';
    let path = document.location.pathname;
    if (region && region.length > 0) {
        for (let i = 0; i < region.length; i++) {
            if (path.indexOf(`/${region[i]}`) > -1) {
                path = path.replace(`/${region[i]}`, '');
                break;
            }
        }
    }
    return ((_a = pages.find((page) => page.path === path)) === null || _a === void 0 ? void 0 : _a.name) || false;
}
export { setCookie, getCookie, getParameterByName, utmSourceTracking, utmCookie, getRegionFromPath, getPageName, getPageInfo, getParams, getDataAttribute, getAttributes, getSurfaceData, getElementProperties, getInputProperties, getInputLableValue, parsePageNameFromPath, 
// utmParamTracking,
getUTMs, utmsFromCookie, useOptionalsData, };
