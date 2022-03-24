import Image from "next/image";
import icons from "@/lib/icons";

export default function Project({ data }) {
  return (
    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
      <div className="flex-shrink-0">
        {data.thumb ? (
          <Image
            className="h-48 w-full object-cover"
            width={600}
            height={400}
            priority={true}
            src={data.thumb.url}
            alt={data.title}
          />
        ) : null}
      </div>
      <div className="flex-1 bg-white dark:bg-gray-800 p-6 flex flex-col justify-between">
        <div className="flex flex-col flex-1 justify-between">
          <a
            href={data.url}
            target="_blank"
            rel="noreferrer"
            className="block mt-2"
          >
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              {data.title}
            </p>
            <p className="mt-3 text-base text-gray-500">{data.description}</p>
          </a>
          <div className="grid grid-cols-2">
            {data.brand.map((brand) => {
              const BrandComponent = icons[brand.iconName] || icons.Laravel;

              return (
                <div key={brand.id} className="flex items-center gap-2 py-4">
                  <BrandComponent className="h-8 w-8 dark:text-white" />{" "}
                  <span className="font-medium dark:text-white">
                    {brand.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
