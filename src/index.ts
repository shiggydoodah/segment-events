import segment, { SegmentOptions } from './segment'
import * as track from './track'
import * as user from './user'

const initSegment = (segmentKey: string, options: SegmentOptions) => {
  if (typeof window === 'undefined') {
    return
  }
  segment(segmentKey, options)
}

const trackClick = track.trackClick
const trackInput = track.trackTextInput
const trackEvent = track.customEvent

export { track, initSegment, trackClick, trackInput, trackEvent, user }
