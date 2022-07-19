import * as lib from './lib'
declare global {
  interface Window {
    analytics?: any
  }
}

interface CommonProperties {
  name: string
  url: string
  page: string
  element_type: string
  surface_type: string
  surface_title: string
  platform: string
  country: string
}

interface IElementClicked extends CommonProperties {
  href: string
}

interface ITrackInputs extends CommonProperties {
  value: string
  filed_name: string
  option?: string
}

// type FormData = Record<string, any>
// interface IFormProperties<T> extends CommonProperties {
//   form_name: string
//   form_action: string
//   form_method: string
//   data: T | FormData
// }

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

// TODO: remove having to pass regions from this function.
function page(regions: string[], platform: string) {
  if (typeof window === 'undefined') return
  if (window.analytics) {
    const data = lib.getPageInfo()
    const country = lib.getRegionFromPath(regions, data.path)
    window.analytics?.page({
      name: data.pageName,
      path: data.path,
      country: country,
      ...data.params,
      platform,
    })
    if (data.params) {
      window.analytics.identify({
        ...data.params,
        country: country,
      })
    }
  }
}

function clicks(selector: string, regions: string[], platform: string) {
  if (typeof window === 'undefined' || !window.analytics) return
  const elements = document.querySelectorAll(selector)
  const pageData = lib.getPageInfo()

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
        country: lib.getRegionFromPath(regions, pageData.path),
        platform,
      }
      window.analytics.track(TrackEvents.ElementClicked, data)
    })
  }
}

function textEntered(selector: string, regions: string[], platform: string) {
  if (typeof window === 'undefined' || !window.analytics) return
  const elements = document.querySelectorAll(selector)

  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener('change', (e) => {
      const el = e.target as HTMLInputElement
      const pageData = lib.getPageInfo()
      const input = lib.getInputProperties(el)
      const data: Partial<ITrackInputs> = {
        name: input.name,
        page: pageData.pageName,
        url: pageData.url,
        element_type: input.type,
        surface_type: input.surface_type,
        surface_title: input.surface_title,
        value: input.value,
        filed_name: input.field_name,
        country: lib.getRegionFromPath(regions, pageData.path),
        platform,
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

function optionSelected(selector: string, regions: string[], platform: string) {
  if (typeof window === 'undefined' || !window.analytics) return
  const elements = document.querySelectorAll(selector)

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
      const data: Partial<ITrackInputs> = {
        name: optionName || input.name,
        option,
        filed_name: input.field_name,
        value: value,

        page: pageData.pageName,
        url: pageData.url,
        element_type: input.type,
        surface_type: input.surface_type,
        surface_title: input.surface_title,
        country: lib.getRegionFromPath(regions, pageData.path),
        platform,
      }
      window.analytics.track(TrackEvents.OptionSelected, data)

      if (input.trait && value && value.length > 0) {
        window.analytics.identify({
          [input.trait! as string]: value,
        })
      }
    })
  }
}

// TODO: dispatch custom listeners for firing custom events.
// interface dispatchCustomEvent {
//   name: string
//   detail: any
// }
// function dispatchListener(event: dispatchCustomEvent) {
//   if (typeof window === "undefined" || !window.analytics) return
//   window.addEventListener(event, (e: object) => {
//     window.analytics.track(event, e)
//   })
// }

// function dispatchEvent(event: string, data: object) {
//   if (typeof window === "undefined" || !window.analytics) return
//   window.dispatchEvent(new CustomEvent(event, data))
// }

function customEvent(eventName: string, data: any) {
  if (typeof window === 'undefined' || !window.analytics) return
  window.analytics.track(eventName, data)
}

export {
  page,
  clicks,
  textEntered,
  optionSelected,
  // dispatchListener,
  // dispatchEvent,
  customEvent,
}
