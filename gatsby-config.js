/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
const path = require(`path`)

module.exports = {
  siteMetadata: {
    title: `Vanilla Signup`,
    description: `EzClap`,
    },
  plugins: [
    {
      resolve: "gatsby-theme-firebase",
      options: {
        credentials: {
          apiKey: "AIzaSyCi9f_jqUJvjg-KcbcEg2zkLF5vT8SzAYY",
          authDomain: "loginauth-7538f.firebaseapp.com",
          databaseURL: "https://loginauth-7538f.firebaseio.com",
          projectId: "loginauth-7538f",
          storageBucket: "loginauth-7538f.appspot.com",
          messagingSenderId: "857320379106",
          appId: "1:857320379106:web:18bcd38a881420b6e504bb",
        },
        loginRedirectPath: "/dashboard",
        socialLogins: ["google"],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `img`,
        path: path.join(__dirname, `src`, `img`),
      },
    },
    `gatsby-plugin-theme-ui`,
    `gatsby-transformer-sharp`, 
    `gatsby-plugin-sharp`
  ],
}
