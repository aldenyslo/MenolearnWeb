import * as React from "react";

interface ChatHistoryItemProps {
  date: string;
  title: string;
}

const ChatHistoryItem: React.FC<ChatHistoryItemProps> = ({ date, title }) => (
  <div className="flex gap-5 pr-6 pl-1.5 mt-9 w-full border border-black border-solid">
    <div className="flex flex-col flex-1 my-auto">
      <div className="text-xs tracking-wide leading-3 text-black">{date}</div>
      <div className="mt-4 text-base leading-6 text-stone-800">{title}</div>
      <div className="mt-4 text-sm tracking-wide leading-4 text-pink-800">
        View Chat
      </div>
    </div>
    <div className="flex flex-1 gap-5 justify-between text-sm tracking-wide leading-4 text-center text-pink-800">
      <div className="shrink-0 w-px h-20 bg-black border border-black border-solid" />
      <div className="my-auto">Download Summary</div>
    </div>
  </div>
);

function MyComponent() {
  const chatHistory = [
    { date: "02/11", title: "Hot Flashes" },
    { date: "02/06", title: "Night Sweats" },
    { date: "01/18", title: "Trouble Sleeping" },
  ];

  return (
    <div className="flex flex-col mx-auto w-full bg-stone-50 max-w-[480px]">
      <header className="flex flex-col justify-center w-full bg-white">
        <div className="flex gap-5 justify-between px-4 py-4 w-full bg-white">
          <div className="flex flex-col">
            <div className="flex overflow-hidden relative flex-col justify-center items-center ml-3 w-12 aspect-[1.78]">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d73f8f76b3f0d6c510a6a2d1a88ac2dcdaedaf40783903e995c7dfc5152f7430?apiKey=b7ff15dcf6fa41989178b53971db4e05&"
                alt=""
                className="object-cover absolute inset-0 size-full"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d73f8f76b3f0d6c510a6a2d1a88ac2dcdaedaf40783903e995c7dfc5152f7430?apiKey=b7ff15dcf6fa41989178b53971db4e05&"
                alt=""
                className="w-full aspect-[1.79]"
              />
            </div>
            <div className="flex gap-3 mt-3.5 text-xl whitespace-nowrap text-blue-950">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a70c125b6d3d13118ba87d4fd54f4b1575dd46d466ecc35b4c204bf48dd43050?apiKey=b7ff15dcf6fa41989178b53971db4e05&"
                alt=""
                className="shrink-0 w-8 aspect-square"
              />
              <div className="flex-auto my-auto">MenoLearn</div>
            </div>
          </div>
          <div className="flex flex-col self-start mt-1">
            <div className="flex overflow-hidden relative flex-col justify-center items-center self-center aspect-[3.39] w-[78px]">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b598f36cde6ecb38f8aefcac543c73a92cce407d11a77a671533a168bd357875?apiKey=b7ff15dcf6fa41989178b53971db4e05&"
                alt=""
                className="object-cover absolute inset-0 size-full"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b598f36cde6ecb38f8aefcac543c73a92cce407d11a77a671533a168bd357875?apiKey=b7ff15dcf6fa41989178b53971db4e05&"
                alt=""
                className="w-full aspect-[3.45]"
              />
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/340dbfe716ea6917a59976e8a85990f6394f831da10256373f40fda0b057dad8?apiKey=b7ff15dcf6fa41989178b53971db4e05&"
              alt=""
              className="self-end mt-3.5 w-8 aspect-square"
            />
          </div>
        </div>
      </header>
      <section className="flex flex-col items-start pt-14 pr-14 pb-6 pl-5 w-full text-base text-white bg-cyan-900">
        <h1 className="text-2xl font-bold">
          We know menopause is confusing.
        </h1>
        <p className="mt-5 font-medium">
          MenoLearn is a menopause chatbot dashboard that aims to help educate
          individuals with their unique menopausal experience.
        </p>
        <button className="justify-center self-center px-7 py-4 mt-8 font-semibold text-center text-pink-600 rounded-3xl border border-solid bg-zinc-50 border-stone-300">
          Chat With MenoLearn
        </button>
      </section>
      <section className="flex flex-col px-5 pt-0.5 pb-5 mt-4 w-full">
        <h2 className="text-2xl tracking-wide leading-7 text-stone-800">
          Chat History
        </h2>
        {chatHistory.map((item, index) => (
          <ChatHistoryItem key={index} date={item.date} title={item.title} />
        ))}
      </section>
    </div>
  );
}

export default MyComponent;