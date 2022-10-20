declare type AnalyticsParams = Record<string, string | null>;
declare type PageNames = {
    name: string;
    path: string;
};
declare function setCookie(name: string, value: any): void;
declare function getCookie(cookie_name: string): AnalyticsParams | false;
declare function getParams(): Record<string, any>;
declare function getParameterByName(name: string, url?: string): string | null;
declare function utmSourceTracking(): {
    first_touch: string | null;
    most_recent: AnalyticsParams;
    utm_from_params: boolean;
} | {
    utm_from_params: boolean;
    first_touch?: undefined;
    most_recent?: undefined;
} | {
    first_touch: string | null;
    most_recent: string | null;
    utm_from_params: boolean;
} | {
    first_touch: AnalyticsParams;
    most_recent: AnalyticsParams;
    utm_from_params: boolean;
};
declare function utmsFromCookie(): AnalyticsParams;
declare function utmCookie(): false | AnalyticsParams;
declare function getRegionFromPath(regions: string[], path: string): string;
declare function getPageName(title: string, pageNames?: PageNames): string | undefined;
declare function getPageInfo(): {
    path: string;
    url: string;
    pageName: string | undefined;
};
declare function getUTMs(): {
    utms_from_params: boolean;
    first_touch: string | AnalyticsParams | null | undefined;
};
declare function useOptionalsData(options: Record<string, any> | undefined): Record<string, any>;
declare function getSurfaceData(element: HTMLElement, surface: 'type' | 'title'): string;
declare function getDataAttribute(attribute: string, element: HTMLElement): string;
declare function getAttributes(element: HTMLElement): {
    type: string;
    name: string;
    surfaceTitle: string;
    surfaceType: string;
    category: string;
};
declare function getElementProperties(element: HTMLElement): {
    href: string;
    title: string;
    text: string;
};
declare function getInputProperties(element: HTMLElement): {
    type: string | undefined;
    name: string;
    value: string;
    field_name: string;
    trait: string | boolean;
    surface_title: string;
    surface_type: string;
};
declare function getInputLableValue(element: HTMLInputElement): string | false;
declare type PageOptions = {
    path: string;
    name: string;
};
declare function parsePageNameFromPath(pages: PageOptions[] | [], region: string[]): string | false;
export { setCookie, getCookie, getParameterByName, utmSourceTracking, utmCookie, getRegionFromPath, getPageName, getPageInfo, getParams, getDataAttribute, getAttributes, getSurfaceData, getElementProperties, getInputProperties, getInputLableValue, parsePageNameFromPath, getUTMs, utmsFromCookie, useOptionalsData, };
