const transitionDelay = 500
const timeout = (callback) => window.setTimeout(callback, transitionDelay)

exports.shouldUpdateScroll = ({ routerProps: { location }, getSavedScrollPosition }) => {
  if (location.action === 'PUSH') {
    timeout(() => window.scrollTo(0, 0))
  } else {
    const savedPosition = getSavedScrollPosition(location)
    timeout(() => window.scrollTo(...(savedPosition || [0, 0])))
  }
  return false
}