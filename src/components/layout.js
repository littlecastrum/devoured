import React from 'react'
import { Link } from 'gatsby'
import injectSheet from "react-jss";

import { rhythm, scale } from '../utils/typography'

const styles = {
  main: {
    backgroundColor: 'lightskyblue'
  },
  header: {
    backgroundColor: 'crimson'
  },
  h1: {
    ...scale(1.5),
    marginBottom: rhythm(1.5),
    marginTop: 0,
  },
  link: {
    boxShadow: 'none',
    textDecoration: 'none',
    color: 'inherit',
  },
  div: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: rhythm(24),
    padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
  }
}

const Header = ({ classes }) => (
  <h1 className={classes.h1}>
    <Link className={classes.link} to={'/'}>
      Devoured
    </Link>
  </h1>
)

const Template = ({ location, children, classes }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <Header classes={classes} />
      </div>
      <div className={classes.div}>
        { children }
      </div>
    </div>
  )
}

export default injectSheet(styles)(Template);
