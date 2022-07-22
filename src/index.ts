import segment, { SegmentOptions } from './segment'
import * as trackEvents from './track'
import { CommonProperties } from './track'

const initSegment = (segmentKey: string, options: SegmentOptions) => {
  if (typeof window === 'undefined') {
    return
  }
  segment(segmentKey, options)
}

const track = trackEvents

type TrackElementEvents =
  | 'Element Clicked'
  | 'Text Entered'
  | 'Option Selected'
  | 'Element Hovered'
  | 'Modal Opened'
  | 'Modal Closed'
  | 'Video Played'
  | 'Video Stopped'

const trackElement = (eventName: TrackElementEvents, data: CommonProperties) => {
  if (typeof window === 'undefined' || !window.analytics) {
    return
  }
  window.analytics.track(eventName, data)
}

const trackEvent = (eventName: string, data: any) => {
  if (typeof window === 'undefined' || !window.analytics) return
  window.analytics.track(eventName, data)
}

const getUserTraits = () => {
  if (typeof window === 'undefined' || !window.analytics) return
  return window.analytics.userTraits
}

export { track, initSegment, trackElement, trackEvent, getUserTraits }
