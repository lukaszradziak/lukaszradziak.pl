import Layout from "@/components/layout";
import Image from "next/image";
import { request } from "@/lib/datocms";

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
    <Layout>
      <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-12 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className="bg-white h-1/3 sm:h-2/3" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
              Projects
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              My recent public projects.
            </p>
          </div>
          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {data.allProjects.map((project) => (
              <div
                key={project.id}
                className="flex flex-col rounded-lg shadow-lg overflow-hidden"
              >
                <div className="flex-shrink-0">
                  {project.thumb ? (
                    <Image
                      className="h-48 w-full object-cover"
                      width={600}
                      height={400}
                      priority={true}
                      src={project.thumb.url}
                      alt={project.title}
                    />
                  ) : null}
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block mt-2"
                    >
                      <p className="text-xl font-semibold text-gray-900">
                        {project.title}
                      </p>
                      <p className="mt-3 text-base text-gray-500">
                        {project.description}
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
