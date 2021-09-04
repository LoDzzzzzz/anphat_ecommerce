const path = require('path')
require('dotenv').config()


module.exports = {
  scssOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: [process.env.IMAGES_DOMAIN, "newsblocktheme.com"],
    deviceSizes: [640, 768, 1024, 1280, 1600],
    imageSizes: [16, 32, 48, 64, 96],
    path: '/_next/image',
    loader: 'default',
  },
  env: {
    STRAPI_API_URL: process.env.STRAPI_API_URL, 
    IMAGES_DOMAIN: process.env.IMAGES_DOMAIN,
  }
}

