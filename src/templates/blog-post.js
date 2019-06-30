import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import injectSheet from "react-jss";
import AniLink from "gatsby-plugin-transition-link/AniLink"
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

import Bio from '../components/Bio'
import Layout from '../components/layout'
import { rhythm, scale } from '../utils/typography'
import arrowPic from '../assets/arrow.png'

const styles = {
  p: {
    ...scale(-1 / 5),
    display: 'block',
    marginBottom: rhythm(1),
    marginTop: rhythm(-1),
  },
  hr: {
    marginBottom: rhythm(1),
  },
  ul: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    listStyle: 'none',
    padding: 0,
  },
  '@global': {
    'a[target=_blank]:not(#bio)': {
      color: 'slategrey',
      '&:hover': {
        textDecoration: 'underline'
      }
    },
    'body .tl-wrapper.tl-wrapper-status--entered': {
      transform: 'none !important'
    }
  }
}

const NavLink = ({data, direction}) => {
  const position = direction === 'prev' ? 'right' : 'left'
  const styles = {
    position: 'fixed',
    zIndex: 2,
    opacity: 0.2,
    [position]: '5vh',
    bottom: '40vh',
    display: 'block',
    width: '70px',
    height: '70px',
    transform: position === 'right' ? 'rotate(180deg) translateY(0vh)' : null
  }
  const text = () => <span>{data.frontmatter.title}</span>;
  return (
    <Tooltip placement="bottom" overlay={text}>
      <AniLink
        swipe
        direction={direction === 'prev' ? 'left' : 'right'}
        to={data.fields.slug}  
        rel={direction}
        style={styles}
      >
        <img src={arrowPic} width="60%" height="100%"/>
      </AniLink>
    </Tooltip>
  )
}

const checkContexts = ({ previous, next }) => {
  const home = {
    fields: {
      slug: '/'
    },
    frontmatter: {
      title: 'Home'
    }
  }
  return {
    previous: previous ? previous : home,
    next: next ? next : home
  }
}

class BlogPostTemplate extends React.Component {
  render() {
    const { classes, data, pageContext, location } = this.props
    const post = data.markdownRemark
    const siteTitle = get(data, 'site.siteMetadata.title')
    const social = get(data, 'site.siteMetadata.social')
    const siteDescription = post.excerpt
    const { previous, next } = checkContexts(pageContext)
    return (
      <Layout location={location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={`${post.frontmatter.title} | ${siteTitle}`}
        />
        <h1>{post.frontmatter.title}</h1>
        <NavLink data={next} direction={'next'} />
        <NavLink data={previous} direction={'prev'} />
        <p className={classes.p}>
          {post.frontmatter.date}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr className={classes.hr}/>
        <Bio social={social}/>
      </Layout>
    )
  }
}

export default injectSheet(styles)(BlogPostTemplate)

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        social {
          twitter
          github
          linkedin
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
