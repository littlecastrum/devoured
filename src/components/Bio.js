import React from 'react'
import injectSheet from "react-jss";

import profilePic from './profile-pic.jpg'
import { rhythm } from '../utils/typography'

const styles = {
  div: {
    display: 'flex',
    marginBottom: rhythm(2.5),
  },
  img: {
    marginRight: rhythm(1 / 2),
    marginBottom: 0,
    width: rhythm(8),
    height: rhythm(8),
    borderRadius: '50%'
  }
}

const Bio = ({ classes }) => (
  <div className={classes.div}>
    <img src={profilePic} alt="Dan Castrillo" className={classes.img} />
    <p>
      Written by <strong>Dan Castrillo</strong> who lives 
      and works in Chile building useful things.{' '}
      <a href="https://twitter.com/littlecastrum">
        You should follow him on Twitter
      </a>
    </p>
  </div>
)

export default injectSheet(styles)(Bio)
