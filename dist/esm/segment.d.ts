declare global {
    interface Window {
        analytics?: any;
    }
}
export interface SegmentOptions {
    methods?: string[];
    useDefault?: boolean;
    cookieBanner?: boolean;
    disabled?: boolean;
}
export default function (segmentKey: string, options: SegmentOptions): void;
