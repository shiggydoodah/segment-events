// TODO: package library testing
// TODO: Documentation for library
// TODO: Dispatch Custom Event listeners
// TODO: CI/CD Testing
import segment from './segment';
import * as trackEvents from './track';
const initSegment = (segmentKey) => {
    if (typeof window === 'undefined') {
        return;
    }
    segment(segmentKey);
};
const track = trackEvents;
export { initSegment, track };
