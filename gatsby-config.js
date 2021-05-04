module.exports = {
  siteMetadata: {
    title: "Liars, Cheats, and Thieves",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-mdx",
    { 
      resolve: "gatsby-plugin-less",
      options: {
        javascriptEnabled: true
      }
    },
    "gatsby-plugin-sharp",
    "gatsby-plugin-antd",
    "gatsby-transformer-sharp",
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "events",
        path: "./src/events/",
      },
      __key: "events",
    },
  ],
};
