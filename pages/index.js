import Head from "next/head";
import { useState, useRef } from "react";

export default function Home() {
  const [flagUrl, setFlagUrl] = useState(true);
  const [copyFlag , setCopyFlag] = useState(false);
  const [flag, setFlag] = useState(false);
  const [data, setData] = useState({
    icon: "",
    title: "",
    metaJSON: "",
  });

  const inputUrl = useRef();

  const setInputUrlField = (e) => {
    let urlPattern =
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    let flag = inputUrl.current.value.match(urlPattern);
    setFlagUrl(flag !== null);
  };

  const livePreviewBox = (e) => {
    e.preventDefault();
    if (!flagUrl) return;

    fetch(`/api/details/?urlString=${inputUrl.current.value}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        // console.log(response)
        if (response.success === true) {
          setData(response.data);
          setFlag(true);
          setCopyFlag(false);
        } else {
          setFlag(false);
        }
      })
      .catch((err) => {
        setFlag(false);
      });
  };

  return (
    <div>
      <Head>
        <title>Live Preview</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-center md:flex md:justify-center mt-[10rem]">
        <h1 className="font-Uchen text-[#411071] text-3xl font-bold">
          Live-Preview
          <span className="blink">{" >"}</span>
        </h1>

        <form className="mt-[3rem]" onSubmit={livePreviewBox}>
          <label
            htmlFor="exampleURL0"
            className="font-Uchen inline-block text-xs form-label mb-2 text-gray-700"
          >
            Enter URL :
          </label>
          <br />
          <input
            ref={inputUrl}
            onChange={setInputUrlField}
            type="text"
            className="
          form-control
          w-[22rem]
          md:w-[32rem]
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
        "
            id="exampleURL0"
            placeholder="https://example.com/"
          />
          <br />
          <div className="text-xs inline-block md:w-[32rem] w-[22rem]">
            {flagUrl === true ? (
              <></>
            ) : (
              <span className="text-red-800 font-medium font-Uchen">
                &#10060; {"Not in a URL format"}
              </span>
            )}
          </div>
        </form>
      </main>
      {flag === true ? (
          <div className="none mb-20 flex space-x-1 mt-[2rem] mx-auto text-center w-[22rem] sm:w-[32rem] md:w-[43rem]">
            <div className="text-center p-2 w-[30%]">
              <img className="mx-auto block" src={data.icon} alt="Logo" />
            </div>
            <div className="text-center w-[70%] float-right">
              <div className="border border-neutral-800 p-3 md:px-4 ">
                <h1 className="md:text-xl text-base font-Uchen mt-2">
                  {data.title}
                </h1>
                <p className="mt-2 text-xs sm:text-base">
                  {data.metaJSON.description || data.metaJSON.Description}
                </p>
                <p className="mt-1 text-right font-Uchen">
                  {data.metaJSON.author}
                </p>
              </div>
              <div className="mx-auto text-right mt-2">
                <button 
                className="border-blue-700 text-blue-700 font-Uchen hover:text-blue-900 border-2 rounded-lg text-xs p-1"
                onClick={(()=>{
                  navigator.clipboard.writeText(JSON.stringify(data.metaJSON));
                  setCopyFlag(true);
                })} >{copyFlag===false?"Copy Meta Information":"Copied !"}
                </button>
              </div>
            </div>
            
          </div>
      ) : (
        <></>
      )}
    </div>
  );
}
