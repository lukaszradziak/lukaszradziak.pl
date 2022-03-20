import Link from "next/link";
import Layout from "@/components/layout";
import { CubeTransparentIcon } from "@heroicons/react/solid";
import { request } from "@/lib/datocms";

export async function getStaticProps() {
  const data = await request({
    query: `
      {
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

export default function Home({ data }) {
  return (
    <Layout data={data}>
      <div className="relative bg-white dark:bg-gray-900">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-50 dark:bg-gray-800" />

        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
            <div className="absolute inset-0">
              <div className="h-full w-full object-cover bg-gray-50" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-indigo-700 mix-blend-multiply" />
            </div>
            <div className="relative px-4 py-16 sm:px-6 sm:py-20 lg:py-28 lg:px-8">
              <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block text-white">Łukasz Radziak</span>
                <span className="block text-indigo-200">
                  Fullstack devloper
                </span>
              </h1>
              <p className="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl">
                My goal is to develop my skills into a Full-stack Developer. I
                like to take on new challenges and expand my own knowledge of
                webdev. I’m currently working on{" "}
                <a href="https://desk3d.pl" target="_blank" rel="noreferrer">
                  Desk3D
                </a>
              </p>
              <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                <Link href="/contact" passHref>
                  <a className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 sm:px-8">
                    Contact
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <CubeTransparentIcon className="h-12" fill="gray" />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <CubeTransparentIcon className="h-12" fill="gray" />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <CubeTransparentIcon className="h-12" fill="gray" />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-2 md:col-start-2 lg:col-span-1">
              <CubeTransparentIcon className="h-12" fill="gray" />
            </div>
            <div className="col-span-2 flex justify-center md:col-span-2 md:col-start-4 lg:col-span-1">
              <CubeTransparentIcon className="h-12" fill="gray" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
