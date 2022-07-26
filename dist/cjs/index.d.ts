import { SegmentOptions } from './segment';
import * as track from './track';
import * as user from './user';
declare const initSegment: (segmentKey: string, options: SegmentOptions) => void;
declare const trackClick: typeof track.trackClick;
declare const trackInput: typeof track.trackTextInput;
declare const trackEvent: typeof track.customEvent;
export { track, initSegment, trackClick, trackInput, trackEvent, user };
