import segment, { SegmentOptions } from './segment'
import * as track from './track'
import * as user from './user'
import { utmCookie } from './lib'
const initSegment = (segmentKey: string, options: SegmentOptions) => {
  if (typeof window === 'undefined') {
    return
  }
  segment(segmentKey, options)
}

const trackClick = track.trackClick
const trackInput = track.trackTextInput
const trackEvent = track.customEvent

export { track, user, initSegment, trackClick, trackInput, trackEvent, utmCookie }
