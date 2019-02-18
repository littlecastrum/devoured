const _ = require('lodash');
const Promise = require('bluebird');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { supportedLanguages } = require('./i18n');

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js');

    // Create index pages for all supported languages
    Object.keys(supportedLanguages).forEach(langKey => {
      createPage({
        path: langKey === 'en' ? '/' : `/${langKey}/`,
        component: path.resolve('./src/templates/blog-index.js'),
        context: {
          langKey,
        },
      });
    });

    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  fields {
                    slug
                    langKey
                    directoryName
                    maybeAbsoluteLinks
                  }
                  frontmatter {
                    title
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors);
          return;
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges;
        const allSlugs = _.reduce(
          posts,
          (result, post) => {
            result.add(post.node.fields.slug);
            return result;
          },
          new Set()
        );

        const translationsByDirectory = _.reduce(
          posts,
          (result, post) => {
            const directoryName = _.get(post, 'node.fields.directoryName');
            const langKey = _.get(post, 'node.fields.langKey');

            if (directoryName && langKey && langKey !== 'en') {
              (result[directoryName] || (result[directoryName] = [])).push(
                langKey
              );
            }

            return result;
          },
          {}
        );

        const defaultLangPosts = posts.filter(
          ({ node }) => node.fields.langKey === 'en'
        );
        _.each(defaultLangPosts, (post, index, arr) => {
          const { directoryName, slug } = post.node.fields;
          createPage({
            path: slug,
            component: blogPost,
            context: {
              slug: slug,
              previous: index === arr.length - 1 ? null : arr[index + 1].node,
              next: index === 0 ? null : arr[index - 1].node,
              translations: translationsByDirectory[directoryName] || [],
              translatedLinks: [],
            },
          });

          const otherLangPosts = posts.filter(
            ({ node }) => node.fields.langKey !== 'en'
          );
          _.each(otherLangPosts, post => {
            const { langKey, maybeAbsoluteLinks, directoryName } = post.node.fields;
            const translations =  translationsByDirectory[directoryName];
            // Record which links to internal posts have translated versions
            // into this language. We'll replace them before rendering HTML.
            let translatedLinks = [];
            maybeAbsoluteLinks.forEach(link => {
              if (allSlugs.has(link)) {
                if (allSlugs.has('/' + langKey + link)) {
                  // This is legit an internal post link,
                  // and it has been already translated.
                  translatedLinks.push(link);
                } else if (link.startsWith('/' + langKey + '/')) {
                  console.log('-----------------');
                  console.error(
                    `
                      It looks like "${langKey}" translation of "${post.node.frontmatter.title}" is linking to a translated link: ${link}. 
                      Don't do this. Use the original link.
                      The blog post renderer will automatically use a translation if it is available.
                    `
                  );
                  console.log('-----------------');
                }
              }
            });

            createPage({
              path: post.node.fields.slug,
              component: blogPost,
              context: {
                slug: post.node.fields.slug,
                translations,
                translatedLinks,
              },
            });
          });
        });
      })
    );
  });
};

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  if (Reflect.get(node, 'internal').type === 'MarkdownRemark') {
    createNodeField({
      node,
      name: 'directoryName',
      value: path.basename(path.dirname(Reflect.get(node, 'fileAbsolutePath'))),
    });
    // TODO: check against links with no trailing slashes
    // or that already link to translations.
    const markdown = node.internal.content;
    let maybeAbsoluteLinks = [];
    let linkRegex = /\]\((\/[^\)]+\/)\)/g;
    let match = linkRegex.exec(markdown);
    while (match != null) {
      maybeAbsoluteLinks.push(match[1]);
      match = linkRegex.exec(markdown);
    }
    createNodeField({
      node,
      name: 'maybeAbsoluteLinks',
      value: _.uniq(maybeAbsoluteLinks),
    });
  }
};
