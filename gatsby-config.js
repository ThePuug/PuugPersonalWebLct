module.exports = {
  siteMetadata: {
    title: "Liars, Cheats, and Thieves",
  },
  plugins: [
    "gatsby-plugin-antd",
    { resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: [
          "271244130"
        ]
      }
    },
    "gatsby-plugin-image",
    { resolve: "gatsby-plugin-mdx",
      options: {
        gatsbyRemarkPlugins: [ "gatsby-remark-images"]
      }
    },
    "gatsby-plugin-react-helmet",
    { resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-plugin-styled-components",
    { resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    { resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: `${__dirname}/content`,
      },
    },
    "gatsby-transformer-remark",
    "gatsby-transformer-sharp",
  ],
};
