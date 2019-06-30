import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import injectSheet from "react-jss";

import { rhythm, scale } from '../utils/typography'
import Header from './Header'

const styles = {
  main: {
    backgroundColor: '#F6F8FA',
  },
  div: {
    paddingTop: '15vh',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: rhythm(24),
    padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
  }
}

const pageQuery = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const Layout = ({ children, location, classes }) => (
  <StaticQuery
    query={pageQuery}
    render={data => (
      <div className={classes.main}>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div className={classes.div}>
          { children }
        </div>
      </div>
    )}
  />
)

export default injectSheet(styles)(Layout);
