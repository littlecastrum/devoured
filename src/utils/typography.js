import Typography from 'typography'
import ElkGlen from 'typography-theme-elk-glen'

ElkGlen.overrideThemeStyles = () => ({
  'a.gatsby-resp-image-link': {
    boxShadow: 'none',
  },
  a: {
    textShadow: 'none'
  },
  'h1 a': {
    backgroundImage: 'none'
  },
  'h3 a': {
    backgroundImage: 'none'
  }
})

const typography = new Typography(ElkGlen)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
