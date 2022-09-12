declare global {
    interface Window {
        analytics?: any;
    }
}
export interface CommonProperties {
    name: string;
    url: string | undefined;
    page: string;
    element_type: string | undefined;
    surface_type: string | undefined;
    surface_title: string | undefined;
    platform: string;
    country?: string;
    locale?: string;
    category?: string;
    eventLabel: string | undefined;
    eventCategory: string | undefined;
    eventAction: string | undefined;
    label: string | undefined;
}
export interface IElementClicked extends CommonProperties {
    href: string | undefined;
}
export interface ITrackInputs extends CommonProperties {
    value: string | undefined;
    field_name: string | undefined;
    option?: string | undefined;
}
declare type PageNames = {
    name: string;
    path: string;
};
interface PageOptions {
    regions: string[] | [];
    platform: string;
    pageNames?: PageNames[];
}
declare function page(options: PageOptions): void;
declare function pageView(pagName: string, region: string, platform: string): void;
declare function clicks(selector: string, regions: string[], platform: string): void;
declare function textEntered(selector: string, regions: string[], platform: string): void;
declare function optionSelected(selector: string, regions: string[], platform: string): void;
interface TrackData extends Record<string, any> {
    name: string;
    locale: string;
    platform: string;
    element_type: string;
}
declare function trackClick(e: HTMLElement, data: TrackData): void;
declare function trackTextInput(e: HTMLInputElement, data: TrackData, identify?: string): void;
declare function customEvent(eventName: string, data: TrackData): void;
export { page, clicks, textEntered, optionSelected, pageView, trackClick, trackTextInput, customEvent };
