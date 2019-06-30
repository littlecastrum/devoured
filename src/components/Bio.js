import React from 'react'
import injectSheet from "react-jss";
import get from 'lodash/get'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

import profilePic from '../assets/profile-pic.jpg'
import { rhythm } from '../utils/typography'
import { graphql } from 'gatsby';

library.add(fab)

const styles = {
  main: {
    display: 'flex',
    marginBottom: rhythm(2.5),
  },
  img: {
    marginRight: rhythm(1 / 2),
    marginBottom: 0,
    width: rhythm(8),
    height: rhythm(8),
    borderRadius: '50%'
  },
  details: {
    textAlign: 'justify'
  },
  '@media screen and (max-width: 600px)': {
    img: {
      width: rhythm(2),
      height: rhythm(2),
    },
  },
}

const Bio = ({ classes, social }) => {
  return (
    <div className={classes.main}>
      <img src={profilePic} alt="Dan Castrillo" className={classes.img} />
      <p className={classes.details}>
        I'm <a href="/">Dan Castrillo</a> and this 
        is my personal blog Devoured. I'm a software developer from Caracas,
        VE. Currently based in Santiago, CL. <br/><br/> I work remotely
        for <a href="https://admios.com" target="_blank" id="bio">Admios</a>
        <br/>
        {
          Object.entries(social).map(([social, url]) => (
            <a href={`https://${url}`} target="_blank" id="bio" key={social}>
              <FontAwesomeIcon icon={['fab', social]}/>{' '}
            </a>
          ))
        }
      </p>
    </div>
  )
}
export default injectSheet(styles)(Bio)
