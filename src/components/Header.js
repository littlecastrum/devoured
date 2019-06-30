import React, { Component } from 'react'
import { Link } from 'gatsby'
import injectSheet from "react-jss";
import AniLink from "gatsby-plugin-transition-link/AniLink"
import classnames from 'classnames'

import { rhythm, scale } from '../utils/typography'

const styles = {
  header: {
    backgroundColor: '#23282D',
    width: '100%',
    height: '9vh',
    zIndex: 2,
    position: 'fixed',
    top: 0,
    transition: 'top 0.6s'
  },
  hidden: {
    top: '-100px'
  },
  h1: {
    ...scale(1.5),
    marginBottom: rhythm(1.5),
    marginTop: 0,
  },
  link: {
    boxShadow: 'none',
    textDecoration: 'none',
    color: 'aliceblue',
    marginLeft: rhythm(2)
  },  
}

class Header extends Component {
  state = {
    prevScrollpos: null,
    visible: true
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const { prevScrollpos } = this.state;

    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollpos > currentScrollPos;

    this.setState({
      prevScrollpos: currentScrollPos,
      visible
    });
  };

  render() {
    const { siteTitle, classes } = this.props
    return (
      <div className={classnames(classes.header, { [classes.hidden]: !this.state.visible })}>
        <h1 className={classes.h1}>
          <AniLink swipe direction="down" className={classes.link} to={'/'}>
            {siteTitle}
          </AniLink>
        </h1>
      </div>
    )
  }
}
export default injectSheet(styles)(Header)