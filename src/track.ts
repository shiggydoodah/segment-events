import * as lib from './lib'
declare global {
  interface Window {
    analytics?: any
  }
}
export interface CommonProperties {
  name: string
  url: string | undefined
  page: string
  element_type: string | undefined
  surface_type: string | undefined
  surface_title: string | undefined
  platform: string
  country?: string
  locale?: string
  category?: string
  event_label: string | undefined
  event_category: string | undefined
  event_action: string | undefined
  label: string | undefined
}
export interface IElementClicked extends CommonProperties {
  href: string | undefined
}

export interface ITrackInputs extends CommonProperties {
  value: string | undefined
  field_name: string | undefined
  option?: string | undefined
}

enum TrackEvents {
  ElementClicked = 'Element Clicked',
  ElementHovered = 'Element Hovered',
  OptionSelected = 'Option Selected',
  TextEntered = 'Text Entered',

  ModalOpen = 'Model Opened',
  ModalClosed = 'Modal Closed',
  VideoPlay = 'Video Played',
  VideoStopped = 'Video Stopped',

  FormSubmitted = 'Form Submitted',
  FormFailed = 'Form Submitted Failed',

  SignupSuccessful = 'Signup Successful',
  SignupFailed = 'Signup Failed',

  LoginSuccessful = 'Login Successful',
  LoginFailed = 'Login Failed',

  LogoutSuccessful = 'Logout Successful',
  LogoutFailed = 'Logout Failed',
}

type PageNames = {
  name: string
  path: string
}
interface PageOptions {
  regions: string[] | []
  platform: string
  pageNames?: PageNames[]
  properties?: OptionalTrackProperties
}

type OptionalTrackProperties = Record<string, any>

function page(options: PageOptions) {
  const { regions, platform, pageNames = [], properties = {} } = options
  if (typeof window === 'undefined') return
  if (!window.analytics) return
  const data = lib.getPageInfo()
  const utms = lib.getUTMs()
  const locale = lib.getRegionFromPath(regions, data.path)
  let hasPageName: string | false = false

  if (pageNames && pageNames.length > 0) {
    {
      hasPageName = lib.parsePageNameFromPath(pageNames, regions)
    }
  }
  const page = hasPageName ? hasPageName : data.path
  window.analytics?.page(page, {
    name: page,
    path: data.path,
    locale: locale,
    ...utms,
    platform,
    ...properties,
  })
  if (utms.utms_from_params) {
    window.analytics.identify({
      locale: locale,
      ...utms,
    })
  }
}

function pageView(pagName: string, region: string, platform: string, optionals?: OptionalTrackProperties) {
  if (typeof window === 'undefined' || !window.analytics) return
  const utms = lib.getUTMs()
  const options = optionals ? optionals : {}
  window.analytics.page({
    name: pagName,
    path: window.location.pathname,
    locale: region,
    ...utms,
    platform,
    ...options,
  })
  if (utms.utms_from_params) {
    window.analytics.identify({
      ...utms,
      locale: region,
    })
  }
}

function clicks(selector: string, regions: string[], platform: string, optionals?: OptionalTrackProperties) {
  if (typeof window === 'undefined' || !window.analytics) return
  const elements = document.querySelectorAll(selector)
  const pageData = lib.getPageInfo()
  const utms = lib.getUTMs()
  if (elements && elements.length > 0) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener('click', (e) => {
        const el = e.target as HTMLElement
        const attr = lib.getAttributes(el)
        const elementProperties = lib.getElementProperties(el)
        const name = attr.name ? attr.name : elementProperties.text
        const data: Partial<IElementClicked> = {
          name,
          page: pageData.pageName,
          url: pageData.url,
          element_type: attr.type,
          surface_type: attr.surfaceType,
          surface_title: attr.surfaceTitle,
          href: elementProperties.href,
          locale: lib.getRegionFromPath(regions, pageData.path),
          platform,
          category: attr.category,
          event_label: name,
          label: name,
          event_category: attr.category || 'All',
          event_action: 'event',
          ...utms,
        }
        window.analytics.track(TrackEvents.ElementClicked, data)
      })
    }
  }
}

function textEntered(selector: string, regions: string[], platform: string, optionals?: OptionalTrackProperties) {
  if (typeof window === 'undefined' || !window.analytics) return
  const elements = document.querySelectorAll(selector)
  const options = lib.useOptionalsData(optionals)
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener('change', (e) => {
      const el = e.target as HTMLInputElement
      const pageData = lib.getPageInfo()
      const input = lib.getInputProperties(el)
      const utms = lib.getUTMs()
      const data: Partial<ITrackInputs> = {
        name: input.name,
        page: pageData.pageName,
        url: pageData.url,
        element_type: input.type,
        surface_type: input.surface_type,
        surface_title: input.surface_title,
        value: input.value,
        field_name: input.field_name,
        locale: lib.getRegionFromPath(regions, pageData.path),
        platform,
        ...options,
        ...utms,
      }
      window.analytics.track(TrackEvents.TextEntered, data)
      if (input.trait && input.value && input.value.length > 0) {
        window.analytics.identify({
          [input.trait! as string]: input.value,
        })
      }
    })
  }
}

type OptionElement = HTMLOptionElement | HTMLInputElement | HTMLSelectElement

function optionSelected(selector: string, regions: string[], platform: string, optionals?: OptionalTrackProperties) {
  if (typeof window === 'undefined' || !window.analytics) return
  const elements = document.querySelectorAll(selector)
  const options = lib.useOptionalsData(optionals)
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener('change', (e) => {
      const el = e.target as OptionElement
      const elementType = el.tagName.toLowerCase()
      let option = ''
      let optionValue: string | false = false
      let optionName: string | false = false

      if (elementType === 'select') {
        const select = el as HTMLSelectElement
        const optionIndex = select.options[select.selectedIndex]
        optionValue = lib.getDataAttribute('option-value', optionIndex) || optionIndex.value
      }

      if (elementType === 'input') {
        const inputOption = el as HTMLInputElement
        option = lib.getDataAttribute('data-option-value', inputOption) || inputOption.name

        if (inputOption.type === 'checkbox') {
          optionValue = inputOption.checked ? 'checked' : 'unchecked'
        }
        if (inputOption.id) {
          option = lib.getInputLableValue(inputOption) || option
        }

        optionName = lib.getDataAttribute('element-name', inputOption)
          ? lib.getDataAttribute('element-name', inputOption)
          : lib.getInputLableValue(inputOption)
      }
      const pageData = lib.getPageInfo()
      const input = lib.getInputProperties(el)
      const value = optionValue || input.value
      const utms = lib.getUTMs()
      const data: Partial<ITrackInputs> = {
        name: optionName || input.name,
        option,
        field_name: input.field_name,
        value: value,
        page: pageData.pageName,
        url: pageData.url,
        element_type: input.type,
        surface_type: input.surface_type,
        surface_title: input.surface_title,
        locale: lib.getRegionFromPath(regions, pageData.path),
        platform,
        ...options,
        ...utms,
      }
      window.analytics.track(TrackEvents.OptionSelected, data)
      window.analytics.trackClick(data)

      if (input.trait && value && value.length > 0) {
        window.analytics.identify({
          [input.trait! as string]: value,
        })
      }
    })
  }
}

interface TrackData extends Record<string, any> {
  name: string
  locale?: string
  platform: string
  element_type: string
}

function trackClick(e: HTMLElement, data: TrackData) {
  if (typeof window === 'undefined' || !window.analytics) return
  const pageData = lib.getPageInfo()
  const attr = lib.getAttributes(e)
  const utms = lib.getUTMs()
  const elementAttributes = {
    surface_type: attr.surfaceType || '',
    surface_title: attr.surfaceTitle || '',
  }
  const eventData = {
    ...data,
    ...elementAttributes,
    page: pageData.pageName,
    url: pageData.url,
    ...utms,
  }
  window.analytics.track(TrackEvents.ElementClicked, {
    ...eventData,
  })
}

function trackTextInput(e: HTMLInputElement, data: TrackData, identify?: string) {
  if (typeof window === 'undefined' || !window.analytics) return
  const pageData = lib.getPageInfo()
  const input = lib.getInputProperties(e)
  const inputAttributes = {
    surface_type: input.surface_type,
    surface_title: input.surface_title,
  }
  const utms = lib.getUTMs()
  const eventData = {
    ...data,
    ...inputAttributes,
    page: pageData.pageName,
    url: pageData.url,
    field_name: e.name || '',
    value: e.type === 'password' ? '*******' : e.value || '',
    ...utms,
  }

  window.analytics.track(TrackEvents.TextEntered, {
    ...eventData,
  })
  if (identify && e.value && e.value.length > 0) {
    window.analytics.identify({
      [identify]: e.value,
    })
  }
}

function customEvent(eventName: string, data: TrackData) {
  if (typeof window === 'undefined' || !window.analytics) return
  const pageData = lib.getPageInfo()
  const utms = lib.getUTMs()
  const eventData = {
    ...data,
    page: pageData.pageName,
    url: pageData.url,
    ...utms,
  }
  window.analytics.track(eventName, {
    ...eventData,
  })
}

export { page, clicks, textEntered, optionSelected, pageView, trackClick, trackTextInput, customEvent }
