import "dotenv/config";
import { GraphQLClient } from "graphql-request";

const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_DATOCMS_API_TOKEN: process.env.NEXT_DATOCMS_API_TOKEN,
  },
  images: {
    domains: ["www.datocms-assets.com"],
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

export default nextConfig;
