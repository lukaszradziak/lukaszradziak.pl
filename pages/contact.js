import { useRef, useState } from "react";
import { request } from "@/lib/datocms";
import ReCAPTCHA from "react-google-recaptcha";

import Title from "@/components/title";
import Layout from "@/components/layout";
import Dots from "@/components/dots";
import Alert from "@/components/alert";
import Spinner from "@/components/spinner";

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

export default function Contact({ data }) {
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const recaptchaRef = useRef();

  const onSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    setError('');
    setSuccess('');

    const post = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
      captcha: recaptchaRef.current?.getValue(),
    };

    try {
      const response = await fetch(`/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      const json = await response.json();
      if(json.success){
        setSuccess('Thank you, I will reply as soon as possible.');
        e.target.reset();
      } else {
        setError(json.error || 'Internal error');
      }
    } catch(e){
      setError('Internal error');
    }

    recaptchaRef.current?.reset();
    setDisabled(false);
  };

  return (
    <Layout data={data}>
      <div className="bg-white dark:bg-gray-900 py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-12">
        <div className="relative max-w-xl mx-auto">
          <Dots />
          <Title
            title="Contact"
            subtitle="Send me a message, I will reply as soon as possible."
          />
          <div className="mt-12">
            <form
              onSubmit={onSubmit}
              method="POST"
              className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
            >
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                >
                  Message
                </label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                    defaultValue={""}
                    required
                  />
                </div>
              </div>

              {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                />
              ) : null}
              
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={disabled}
                  className={`${
                    disabled ? `opacity-60` : null
                  } w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  {disabled ? <Spinner /> : `Submit`}
                </button>
              </div>

              {error ? <Alert type="error">{error}</Alert> : null}
              {success ? <Alert>{success}</Alert> : null}
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
