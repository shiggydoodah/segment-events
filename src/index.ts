import segment, { SegmentOptions } from './segment'
import * as track from './track'
import * as user from './user'
import { utmCookie, utmsFromCookie, utmSourceTracking } from './lib'

const initSegment = (segmentKey: string, options: SegmentOptions) => {
  if (typeof window !== 'undefined') {
    segment(segmentKey, options)
  }
  return
}

const trackClick = track.trackClick
const trackInput = track.trackTextInput
const trackEvent = track.customEvent
const getUtms = utmsFromCookie

export { track, user, initSegment, trackClick, trackInput, trackEvent, utmCookie, getUtms, utmSourceTracking }
