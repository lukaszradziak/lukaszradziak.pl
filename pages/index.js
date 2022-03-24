import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/layout";
import dynamic from "next/dynamic";

import { request } from "@/lib/datocms";
import icons from "@/lib/icons";
import { Suspense, useEffect, useState } from "react";
const Macbook = dynamic(() => import("@/components/macbook"));

export async function getStaticProps() {
  const data = await request({
    query: `
      {
        setting {
          title
          shortTitle
        }
        allBrands(orderBy: position_ASC) {
          id
          title
          iconName
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
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
            <div className="relative px-4 sm:px-6 lg:px-8">
              <div className="absolute w-full h-full left-0 top-0 z-10 overflow-hidden">
                {typeof window !== `object` ||
                !isMounted ||
                navigator?.connection?.saveData ||
                !matchMedia("(min-width: 768px)").matches ? null : (
                  <Suspense fallback={null}>
                    <Macbook />
                  </Suspense>
                )}
              </div>
              <div className="block lg:grid grid-cols-2">
                <div className="relative z-20 py-8 md:py-16">
                  <div className="flex gap-4">
                    <div>
                      <Image
                        src="https://avatars.githubusercontent.com/u/1611323?v=4"
                        alt="Avatar"
                        width={100}
                        height={100}
                        className="rounded-full"
                      />
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                      <span className="block text-white">Łukasz Radziak</span>
                      <span className="block text-indigo-200">
                        Fullstack devloper
                      </span>
                    </h1>
                  </div>

                  <p className="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl">
                    My goal is to develop my skills into a Full-stack Developer.
                    I like to take on new challenges and expand my own knowledge
                    of webdev. I’m currently working on{" "}
                    <a
                      href="https://desk3d.pl"
                      target="_blank"
                      rel="noreferrer"
                      className="underline"
                    >
                      Desk3D.
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
                <div className="h-72"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
            {data.allBrands.map((brand) => {
              const BrandComponent = icons[brand.iconName] || icons.Laravel;

              return (
                <div
                  key={brand.id}
                  className="col-span-1 flex flex-col justify-center items-center gap-2 md:col-span-2 lg:col-span-1"
                >
                  <BrandComponent className="w-12 h-12 dark:text-white" />
                  <span className="font-medium text-xl dark:text-white">
                    {brand.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
