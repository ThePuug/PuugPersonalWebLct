module.exports = {
  siteMetadata: {
    title: "Liars, Cheats, and Thieves",
  },
  plugins: [
    "gatsby-plugin-antd",
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: [
          "271244130"
        ]
      }
    },
    "gatsby-plugin-image",
    "gatsby-plugin-mdx",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: "./src/content/",
      },
    },
    "gatsby-transformer-sharp",
  ],
};
