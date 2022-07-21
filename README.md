# Outfund Segment Tracking Events

A collection of event listeners and triggers for use with segment io.
To learn more about segment io please visit the docs: https://segment.com/docs/

## Usage

To install run `npm install @outfund/segment` or `yarn add @outfund/segment`

### import with ES6 Modules

`import { initSegment, track } from "@outfund/segment`

### import with via commonjs script

coming soon 🕰

### How to Initializing Segment in your code

The initSegment function requires your Segment ID key which you can get from your account.
`initSegment(id: string)`

`const segmentKey = 'abc123'`  
`initSegment(segmentKey)`

## Track Events

`import {track} from '@outfund/segment'`

**Page Views**:
`track.page(pageName: string, regions: string[], platform: string );`

`track.page('Homepage' ['uk','de', 'us' 'es'], 'website' )`

**Element Clicked**: `clicks(selector: string, regions: string[], platform: string)`

**Option Selected**: `optionSelected(selector: string, regions: string[], platform: string)`

**Text Entered**: `textEntered(selector: string, regions: string[], platform: string)`

**Custom Event**: `customEvent(eventName: string, data: any)`

## Data Attributes

`[data-trait=""]`: Fires an identifyer for the event, name the triat you want to track and the value will be the name of the event.

`[element-name=""]`: This will be the name of the event, useful for grouping events, or if you want custom names for event triggers

`[element-type=""]`: The type of element i.e button, hyperlink etc.

`[data-surface-type=""]` Used for the type of surface the event is being fired on, i.e hero, footer, modal, etc.

`[data-surface-title=""]`: The title of the surface the event is being fired on. Not required but useful in some cases.

`[element-state=""]`: Used for defining the state of an element, i.e. active, inactive, open, closed etc.

## Features to be added

- [ ] Automatically pass the region/country in track events
- [ ] Events for Toggles, Modals & Video played
- [ ] Custom Page Names
