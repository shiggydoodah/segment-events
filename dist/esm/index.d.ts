import { SegmentOptions } from './segment';
import * as track from './track';
import * as user from './user';
import { utmCookie } from './lib';
declare const initSegment: (segmentKey: string, options: SegmentOptions) => void;
declare const trackClick: typeof track.trackClick;
declare const trackInput: typeof track.trackTextInput;
declare const trackEvent: typeof track.customEvent;
export { track, user, initSegment, trackClick, trackInput, trackEvent, utmCookie };
