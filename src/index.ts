// TODO: package library testing
// TODO: Documentation for library

// TODO: Dispatch Custom Event listeners
// TODO: CI/CD Testing

import segment, { SegmentOptions } from './segment'
import * as trackEvents from './track'

const initSegment = (segmentKey: string, options: SegmentOptions) => {
  if (typeof window === 'undefined') {
    return
  }
  segment(segmentKey, options)
}

const track = trackEvents

export { initSegment, track }
