/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: process.env.SITE_URL,
    basePath: "/library",
    generateRobotsTxt: true // (optional)
    // ...other options
  };
  
  module.exports = { ...config };
