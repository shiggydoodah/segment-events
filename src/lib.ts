type AnalyticsParams = Record<string, string | false>

type PageNames = {
  name: string
  path: string
}

function setCookie(name: string, value: any) {
  let d = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  let expires = 'expires=' + d.toUTCString()
  let cookie_value = JSON.stringify(value)
  document.cookie = name + '=' + cookie_value + ';' + expires + ';path=/;SameSite=Lax"'
}

function getCookie(cookie_name: string): AnalyticsParams | false {
  if (typeof window === 'undefined') return false
  try {
    const hasCookie = document.cookie.match(new RegExp('(^| )' + cookie_name + '=([^;]+)'))
    if (hasCookie && hasCookie.length > 2) {
      return JSON.parse(hasCookie[2])
    } else {
      return false
    }
  } catch (e) {
    console.log(e)
    return false
  }
}

function getUTM() {
  const defaultUtms: AnalyticsParams = {
    utm_source: false,
    utm_medium: false,
    utm_campaign: false,
    utm_content: false,
    utm_term: false,
    utm_id: false,
    gclid: false,
    utm_cta: false,
    target_id: false,
    of_source: false,
  }
  return defaultUtms
}

function getParams() {
  const params = new URLSearchParams(window.location.search)
  const paramsArray: Record<string, any> = {}
  for (let pair of params.entries()) {
    paramsArray[pair[0]] = pair[1]
  }
  return paramsArray
}

function getParameterByName(name: string, url?: string) {
  if (!url) {
    url = window.location.href
  }
  name = name.replace(/[\[\]]/g, '\\$&')
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  const results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

function utmSourceTracking() {
  const defaultUtms = getUTM()
  const getUTMsFromParams = (): Record<string, AnalyticsParams> | false => {
    let utms = {} as AnalyticsParams
    const defaultUtms = getUTM()
    const searchParams = Object.keys(window.location.search)

    if (searchParams.length > 0) {
      if (window.location.search.indexOf('disableAnalytics') > -1) {
        setCookie('disableAnalytics', 'true')
      }
      for (let key in defaultUtms) {
        const value = getParameterByName(key)
        if (value) {
          utms[key! as keyof AnalyticsParams] = value
        }
      }
      if (Object.keys(utms).length > 0) {
        return {
          first_touch: {
            ...defaultUtms,
            ...utms,
          },
          most_recent: {
            ...defaultUtms,
            ...utms,
          },
        }
      }
    }
    return false
  }

  const cookie = getCookie('outfund_utm')
  const utms = getUTMsFromParams()

  if (utms && !cookie) {
    setCookie('outfund_utm', utms)
    return {
      ...utms,
      utm_from_params: true,
    }
  }
  if (!utms && cookie) {
    return {
      first_touch: cookie.first_touch,
      most_recent: cookie.most_recent,
      utm_from_params: false,
    }
  }
  if (utms && cookie) {
    const first = cookie.first_touch
    const utmData = {
      first_touch: first,
      most_recent: utms.most_recent,
      utm_from_params: true,
    }
    setCookie('outfund_utm', utmData)
    return utmData
  }
  return {
    first_touch: defaultUtms,
    most_recent: defaultUtms,
    utm_from_params: false,
  }
}

function utmsFromCookie() {
  const defaultUtms = getUTM()
  const cookie = getCookie('outfund_utm')
  if (cookie) return cookie
  return defaultUtms
}

function utmCookie() {
  const cookie = getCookie('outfund_analytics')
  if (cookie) return cookie
  return false
}

function getRegionFromPath(regions: string[], path: string) {
  let region = 'uk'
  if (regions && regions.length > 0) {
    for (let i = 0; i < regions.length; i++) {
      if (path.indexOf(`/${regions[i]}`) > -1) {
        region = regions[i]
        break
      }
    }
  }
  return region
}

function getPageName(title: string, pageNames?: PageNames) {
  if (typeof window === 'undefined') return
  const strArray = title.split('|')
  if (strArray.length > 1) {
    return strArray[0].trim()
  } else {
    return title
  }
}

function getPageInfo() {
  const path = document.location.pathname
  const url = document.location.href
  const pageName = getPageName(document.title)
  return {
    path,
    url,
    pageName,
  }
}

function getUTMs() {
  const utms = utmSourceTracking()
  return {
    first_touch: utms.first_touch,
    ...(utms.most_recent! as object),
    utms_from_params: utms.utm_from_params,
  }
}

enum CustomAttributes {
  elementType = 'element-type',
  elementName = 'element-name',
  elementState = 'element-state',
  surfaceTitle = 'data-surface-title',
  surfaceType = 'data-surface-type',
  category = 'data-element-category',
}

function useOptionalsData(options: Record<string, any> | undefined) {
  if (options !== undefined) {
    return options
  } else {
    return {}
  }
}

function getSurfaceData(element: HTMLElement, surface: 'type' | 'title') {
  let surfaceData = element.getAttribute(`data-surface-${surface}`) || false
  if (surfaceData) return surfaceData
  const parent = element?.parentNode || false
  const parent2 = (parent && parent?.parentNode) || false
  const parent3 = (parent2 && parent2?.parentNode) || false
  const parent4 = (parent3 && parent3?.parentNode) || false
  const tree = [parent, parent2, parent3, parent4]

  for (let i = 0; i < tree.length; i++) {
    if (tree[i]) {
      const el = tree[i] as HTMLElement
      const hasSurfaceData = el.getAttribute(`data-surface-${surface}`)
      if (hasSurfaceData) surfaceData = hasSurfaceData
      if (surfaceData) break
    }
  }
  return surfaceData ? surfaceData : ''
}

function getDataAttribute(attribute: string, element: HTMLElement) {
  const value = element.getAttribute(attribute)
  return value ? value : ''
}

function getAttributes(element: HTMLElement) {
  const attributes: Record<string, string> = {}
  for (let i = 0; i < element.attributes.length; i++) {
    const attr = element.attributes[i]
    attributes[attr.name] = attr.value
  }
  return {
    type: attributes.hasOwnProperty(CustomAttributes.elementType)
      ? attributes[CustomAttributes.elementType]
      : 'undefined',
    name: attributes.hasOwnProperty(CustomAttributes.elementName) ? attributes[CustomAttributes.elementName] : '',
    surfaceTitle: attributes.hasOwnProperty(CustomAttributes.surfaceTitle)
      ? attributes[CustomAttributes.surfaceTitle]
      : getSurfaceData(element, 'title'),
    surfaceType: attributes.hasOwnProperty(CustomAttributes.surfaceType)
      ? attributes[CustomAttributes.surfaceType]
      : getSurfaceData(element, 'type'),
    category: attributes.hasOwnProperty(CustomAttributes.category) ? attributes[CustomAttributes.category] : '',
  }
}

function getElementProperties(element: HTMLElement) {
  const href = element.getAttribute('href') || ''
  const title = element.getAttribute('title') || ''
  const text = element.textContent || element.innerText || ''
  let innerText = ''
  if (text.length > 0 && text.length > 0) {
    innerText = text
  }
  if (!innerText && title) {
    innerText = title
  }
  return {
    href,
    title,
    text: innerText,
  }
}

function getInputProperties(element: HTMLElement) {
  const type = element.getAttribute('type') || undefined
  const value = type === 'password' ? '[REDACTED]' : element.getAttribute('value') || ''
  const attr = getAttributes(element)
  return {
    type,
    name: attr.name || element.getAttribute('name') || '',
    value,
    field_name: element.getAttribute('name') || '',
    trait: getDataAttribute('data-trait', element) || false,
    surface_title: attr.surfaceTitle,
    surface_type: attr.surfaceType,
  }
}

function getInputLableValue(element: HTMLInputElement): string | false {
  const label = element.parentElement?.querySelector('label')
  if (label) {
    return label.textContent || label.innerText
  }
  return false
}

type PageOptions = {
  path: string
  name: string
}

function parsePageNameFromPath(pages: PageOptions[] | [], region: string[]): string | false {
  if (typeof window === 'undefined') return ''
  let path = document.location.pathname
  if (region && region.length > 0) {
    for (let i = 0; i < region.length; i++) {
      if (path.indexOf(`/${region[i]}`) > -1) {
        path = path.replace(`/${region[i]}`, '')
        break
      }
    }
  }
  return pages.find((page) => page.path === path)?.name || false
}

export {
  setCookie,
  getCookie,
  getParameterByName,
  utmSourceTracking,
  utmCookie,
  getRegionFromPath,
  getPageName,
  getPageInfo,
  getParams,
  getDataAttribute,
  getAttributes,
  getSurfaceData,
  getElementProperties,
  getInputProperties,
  getInputLableValue,
  parsePageNameFromPath,
  // utmParamTracking,
  getUTMs,
  utmsFromCookie,
  useOptionalsData,
}
