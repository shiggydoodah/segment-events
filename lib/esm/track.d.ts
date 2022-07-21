declare global {
    interface Window {
        analytics?: any;
    }
}
declare function page(regions: string[], platform: string): void;
declare function clicks(selector: string, regions: string[], platform: string): void;
declare function textEntered(selector: string, regions: string[], platform: string): void;
declare function optionSelected(selector: string, regions: string[], platform: string): void;
declare function customEvent(eventName: string, data: any): void;
export { page, clicks, textEntered, optionSelected, customEvent, };
