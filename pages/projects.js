import { request } from "@/lib/datocms";

import Layout from "@/components/layout";
import Title from "@/components/title";
import Project from "@/components/project";

export async function getStaticProps() {
  const data = await request({
    query: `
      {
        allProjects (orderBy: position_ASC) {
          id
          title
          description
          thumb {
            url
          }
          url
          urlType
          brand {
            id
            title
            iconName
          }
        }

        setting {
          title
          shortTitle
        }
      }
    `,
  });

  return {
    props: {
      data,
    },
  };
}

export default function Projects({ data }) {
  return (
    <Layout data={data}>
      <div className="relative bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-12 lg:pb-28 lg:px-8 dark:bg-gray-900">
        <div className="relative max-w-7xl mx-auto">
          <Title title="Projects" subtitle="My recent public projects." />
          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {data.allProjects.map((project) => (
              <Project key={project.id} data={project} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
