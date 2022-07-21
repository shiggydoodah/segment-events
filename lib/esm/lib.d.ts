declare type AnalyticsParams = Record<string, string | null>;
declare type PageNames = {
    name: string;
    path: string;
};
declare function setCookie(name: string, value: AnalyticsParams): void;
declare function getParams(): Record<string, any>;
declare function getParameterByName(name: string, url?: string): string | null;
declare function utmSourceTracking(url?: string, utmParams?: AnalyticsParams): AnalyticsParams;
declare function utmCookie(): any;
declare function getRegionFromPath(regions: string[], path: string): string;
declare function getPageName(title: string, pageNames?: PageNames): string | undefined;
declare function getPageInfo(): {
    path: string;
    url: string;
    utms: AnalyticsParams;
    pageName: string | undefined;
    params: Record<string, any>;
};
declare function getSurfaceData(element: HTMLElement, surface: 'type' | 'title'): string;
declare function getDataAttribute(attribute: string, element: HTMLElement): string;
declare function getAttributes(element: HTMLElement): {
    type: string;
    name: string;
    surfaceTitle: string;
    surfaceType: string;
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
export { setCookie, getParameterByName, utmSourceTracking, utmCookie, getRegionFromPath, getPageName, getPageInfo, getParams, getDataAttribute, getAttributes, getSurfaceData, getElementProperties, getInputProperties, getInputLableValue, };
