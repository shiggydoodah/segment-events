import segment from './segment';
import * as track from './track';
import * as user from './user';
import { utmCookie } from './lib';
const initSegment = (segmentKey, options) => {
    if (typeof window === 'undefined') {
        return;
    }
    segment(segmentKey, options);
    //   window.analytics.on('track', function(event, properties, options){
    //    // custom logic based on event properties
    //   ga('secondTracker.send', {
    //     hitType: 'event',
    //     eventCategory: properties.category || 'All',
    //     eventAction: event,
    //     eventLabel: properties.label || 'All'
    //   })
    // }
};
const trackClick = track.trackClick;
const trackInput = track.trackTextInput;
const trackEvent = track.customEvent;
export { track, user, initSegment, trackClick, trackInput, trackEvent, utmCookie };
