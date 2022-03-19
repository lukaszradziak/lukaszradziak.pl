import Footer from "./footer";
import Header from "./header";

export default function Layout({ children, data }) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header setting={data.setting} />
      <main>{children}</main>
      <Footer setting={data.setting} />
    </div>
  );
}
