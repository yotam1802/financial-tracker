import hero from "@/app/assets/hero-image.png";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex bg-gray-50 px-20 items-center justify-center">
      <div className="flex flex-col">
        <div className="w-full flex justify-center">
          <div
            className="hero min-w-[340px] h-[60vh] w-[80vw] md:h-[55vh] lg:w-[60vw] xl:h-[50vh] rounded-xl overflow-hidden mx-auto"
            style={{
              backgroundImage: "url(hero-image.png)",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPositionY: "40%",
            }}
          >
            <div className="hero-overlay rounded-xl bg-opacity-25"></div>
            <div className="hero-content text-neutral-content px-5">
              <div className="text-white flex flex-col gap-2 items-start">
                <h1 className="mb-5 text-5xl font-extrabold lg:leading-tight">
                  Track your purchases and analyze your spending
                </h1>
                <p className="mb-5">No payment required. Free forever.</p>
                <Link className="btn btn-primary" href={"/api/sign-up"}>
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-3 items-start justify-center mt-10">
          <h1 className="text-[#111418] font-bold tracking-tight text-3xl leading-tight sm:text-4xl sm:font-black sm:tracking-[-0.033em] max-w-[720px]">
            Features
          </h1>
          <p className="text-[#111418] font-normal text-base leading-normal max-w-[720px]">
            Polaris is the easiest way to keep track of your purchases, analyze
            your spending, and make informed decisions about your money.
          </p>
        </div>

        {/* <div className="grid grid-cols-6 m-auto gap-x-32 mt-5">
          <p>a</p>
          <p>b</p>
          <p>c</p>
          <p>d</p>
          <p>e</p>
          <p>f</p>
        </div> */}
      </div>
    </div>
  );
}
