import React from 'react'
import Helmet from 'react-helmet'
import { Link,graphql } from 'gatsby'
import get from 'lodash/get'
import injectSheet from "react-jss";

import Bio from '../components/Bio'
import Layout from '../components/layout'
import { rhythm, scale } from '../utils/typography'

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
    }
  }
}

const navLink = (data, direction) => {
  if (direction === 'prev') {
    return (
      <li>
        <Link to={data.fields.slug} rel="prev">
          ← {data.frontmatter.title}
        </Link>
      </li>
    )
  } else {
    return (
      <li>
        <Link to={data.fields.slug} rel="next">
          {data.frontmatter.title} →
        </Link>
      </li>
    )
  }
}

class BlogPostTemplate extends React.Component {
  render() {
    const { classes, data, pageContext, location } = this.props
    const post = data.markdownRemark
    const siteTitle = get(data, 'site.siteMetadata.title')
    const social = get(data, 'site.siteMetadata.social')
    const siteDescription = post.excerpt
    const { previous, next } = pageContext

    return (
      <Layout location={location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={`${post.frontmatter.title} | ${siteTitle}`}
        />
        <h1>{post.frontmatter.title}</h1>
        <ul className={classes.ul}>
          { previous && navLink(previous, 'prev') }
          { next && navLink(next, 'next') }
        </ul>
        <p className={classes.p}>
          {post.frontmatter.date}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr className={classes.hr}/>
        <Bio social={social}/>
        <ul className={classes.ul}>
          { previous && navLink(previous, 'prev') }
          { next && navLink(next, 'next') }
        </ul>
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
