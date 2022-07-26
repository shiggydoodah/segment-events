function identify(traits: Record<string, any>, id?: string) {
  if (typeof window !== 'undefined' && window?.analytics) {
    window.analytics.ready(function () {
      window.analytics.identify(id || '', {
        ...traits,
      })
    })
  }
}

function setUser(id: string, traits: Record<string, any>) {
  if (typeof window !== 'undefined' && window?.analytics) {
    window.analytics.ready(function () {
      window.analytics.identify(id, {
        ...traits,
      })
    })
  }
}

interface SegmentUser {
  id: () => string
  traits: () => Record<string, any>
  alias: (id: string) => void
  anonymousId: () => string
}

function getUser(): SegmentUser {
  if (typeof window !== 'undefined' && window?.analytics) {
    window.analytics.ready(function () {
      return window.analytics.user()! as SegmentUser
    })
  }
  return {
    id: () => '',
    traits: () => ({}),
    alias: () => {},
    anonymousId: () => '',
  }
}

export { identify, setUser, getUser }
