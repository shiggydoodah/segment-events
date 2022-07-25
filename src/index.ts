import segment, { SegmentOptions } from './segment'
import * as trackEvents from './track'

const initSegment = (segmentKey: string, options: SegmentOptions) => {
  if (typeof window === 'undefined') {
    return
  }
  segment(segmentKey, options)
}

const track = trackEvents

// type TrackElementEvents =
//   | 'Element Clicked'
//   | 'Text Entered'
//   | 'Option Selected'
//   | 'Element Hovered'
//   | 'Modal Opened'
//   | 'Modal Closed'
//   | 'Video Played'
//   | 'Video Stopped'

const getUser = () => {
  if (typeof window === 'undefined' || !window.analytics) return
  window.analytics.ready(function () {
    const user = window.analytics.user()
    const traits = user.traits()
    const userId = user.id()
    const anonymousId = user.anonymousId()
    return {
      user,
      traits,
      userId,
      anonymousId,
    }
  })
}

const trackClick = track.trackClick
const trackInput = track.trackTextInput
const trackEvent = track.customEvent

export { track, initSegment, getUser, trackClick, trackInput, trackEvent }
