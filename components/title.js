export default function Title({ title, subtitle = "" }) {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-lg leading-6 text-gray-500">{subtitle}</p>
      ) : null}
    </div>
  );
}
