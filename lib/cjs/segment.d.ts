declare global {
    interface Window {
        analytics?: any;
    }
}
export default function (segmentKey: string): void;
