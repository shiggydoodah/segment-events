import segment from './segment';
import * as track from './track';
import * as user from './user';
import { utmCookie, utmsFromCookie, utmSourceTracking } from './lib';
const initSegment = (segmentKey, options) => {
    if (typeof window === 'undefined') {
        return;
    }
    segment(segmentKey, options);
    // window.analytics.on('track', function (event: string, properties: Record<string, any>) {
    // custom logic based on event properties
    // ga('secondTracker.send', {
    //   hitType: 'event',
    //   eventCategory: properties.category || 'All',
    //   eventAction: event,
    //   eventLabel: properties.label || 'All'
    // })
    // })
};
const trackClick = track.trackClick;
const trackInput = track.trackTextInput;
const trackEvent = track.customEvent;
const getUtms = utmsFromCookie;
export { track, user, initSegment, trackClick, trackInput, trackEvent, utmCookie, getUtms, utmSourceTracking };
