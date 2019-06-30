import React, { Component } from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import AniLink from "gatsby-plugin-transition-link/AniLink"

import Bio from '../components/Bio'
import Layout from '../components/layout'
import { rhythm } from '../utils/typography'

const Post = (node) => {
  const { title, description, date } = get(node, 'frontmatter') || node.fields.slug
  return (
    <div key={node.fields.slug}>
      <h3 style={{ marginBottom: rhythm(1 / 4) }}>
        <AniLink swipe direction="up" style={{ boxShadow: 'none' }} to={node.fields.slug}>
          {title}
        </AniLink>
      </h3>
      <small>{date}</small>
      <p dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  )
}

class BlogIndex extends Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const social = get(this, 'props.data.site.siteMetadata.social')
    const siteDescription = get(this, 'props.data.site.siteMetadata.description')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')
    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={siteTitle}
        />
        <Bio social={social}/>
        { posts.map(({ node }) => Post(node)) }
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description,
        social {
          twitter,
          github,
          linkedin
        }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title,
            description
          }
        }
      }
    }
  }
`
