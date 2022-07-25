import { SegmentOptions } from './segment';
import * as trackEvents from './track';
declare const initSegment: (segmentKey: string, options: SegmentOptions) => void;
declare const track: typeof trackEvents;
declare const getUser: () => void;
declare const trackClick: typeof trackEvents.trackClick;
declare const trackInput: typeof trackEvents.trackTextInput;
declare const trackEvent: typeof trackEvents.customEvent;
export { track, initSegment, getUser, trackClick, trackInput, trackEvent };
