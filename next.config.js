require("dotenv").config();

module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_DATOCMS_API_TOKEN: process.env.NEXT_DATOCMS_API_TOKEN,
  },
  images: {
    domains: ["images.unsplash.com"],
  },
};
