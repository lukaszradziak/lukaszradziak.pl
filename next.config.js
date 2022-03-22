require("dotenv").config();
const { GraphQLClient } = require("graphql-request");
// const withTM = require("next-transpile-modules")(["three"]);

const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_DATOCMS_API_TOKEN: process.env.NEXT_DATOCMS_API_TOKEN,
  },
  images: {
    domains: ["www.datocms-assets.com", "avatars.githubusercontent.com"],
  },
  async redirects() {
    const client = new GraphQLClient(`https://graphql.datocms.com/`, {
      headers: {
        authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
      },
    });
    const data = await client.request(`
      {
        allRedirects {
          source
          destination
        }
      }
    `);

    return data.allRedirects.map((redirect) => {
      return {
        source: redirect.source,
        destination: redirect.destination,
        permanent: false,
      };
    });
  },
};

module.exports = nextConfig;
