import Image from "next/image";

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
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <a
            href={data.url}
            target="_blank"
            rel="noreferrer"
            className="block mt-2"
          >
            <p className="text-xl font-semibold text-gray-900">{data.title}</p>
            <p className="mt-3 text-base text-gray-500">{data.description}</p>
          </a>
        </div>
      </div>
    </div>
  );
}