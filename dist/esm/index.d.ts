import { SegmentOptions } from './segment';
import * as track from './track';
import * as user from './user';
import { utmCookie, utmsFromCookie, utmSourceTracking } from './lib';
declare const initSegment: (segmentKey: string, options: SegmentOptions) => void;
declare const trackClick: typeof track.trackClick;
declare const trackInput: typeof track.trackTextInput;
declare const trackEvent: typeof track.customEvent;
declare const getUtms: typeof utmsFromCookie;
export { track, user, initSegment, trackClick, trackInput, trackEvent, utmCookie, getUtms, utmSourceTracking };
