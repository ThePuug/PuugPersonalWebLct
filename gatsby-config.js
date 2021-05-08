module.exports = {
  siteMetadata: {
    title: "Liars, Cheats, and Thieves",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    { 
      resolve: "gatsby-plugin-mdx",
      options: {
        gatsbyRemarkPlugins: [
          'gatsby-remark-images',
        ],
      },
    },
    {
      resolve: "gatsby-plugin-less",
      options: {
        javascriptEnabled: true
      }
    },
    "gatsby-plugin-sharp",
    "gatsby-plugin-antd",
    "gatsby-remark-images",
    "gatsby-transformer-sharp",
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
  ],
};
