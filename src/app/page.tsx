import hero from "@/app/assets/hero-image.png";
import Link from "next/link";
import FeatureCard from "./components/FeatureCard";

export default function Home() {
  return (
    <div className="flex px-20 items-center justify-center">
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
                <Link
                  className="btn btn-primary text-white"
                  href={"/api/auth/signin"}
                >
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

        <div className="w-full grid m-auto gap-x-5 gap-y-5 mt-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 justify-items-center items-center">
          <FeatureCard
            title={"Completely Free."}
            description={
              "Enjoy all of our features and benefits without any cost. No hidden fees, no subscriptions."
            }
          />
          <FeatureCard
            title={"Instant tracking"}
            description={"Add a purchase in seconds with our simple interface."}
          />
          <FeatureCard
            title={"Automatic categorization"}
            description={
              "We'll automatically categorize your purchases, but you can edit them if you want."
            }
          />
          <FeatureCard
            title={"Custom categories"}
            description={
              "Create custom categories so you can track exactly what you want."
            }
          />
          <FeatureCard
            title={"Spending analysis"}
            description={
              "Get insights into your spending habits and find aeas where you could save."
            }
          />
          <FeatureCard
            title={"Privacy first"}
            description={"We don't sell or share your data. Ever."}
          />
        </div>

        <div className="flex flex-col justify-end gap-6 px-4 py-10 @[480px]:gap-8 @[480px]:px-10 @[480px]:py-20 mt-24">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-[#111418] font-bold tracking-tight text-3xl leading-tight sm:text-4xl sm:font-black sm:tracking-[-0.033em] max-w-[720px]">
              Ready to take control of your spending?
            </h1>
            <p className="text-[#111418] font-normal text-base leading-normal max-w-[720px]">
              Sign up today and start making smarter financial decisions.
            </p>
          </div>
          <div className="flex flex-1 justify-center">
            <div className="flex justify-center">
              <Link
                className="btn btn-primary text-white font-extrabold rounded-full w-80 h-16"
                href={"/api/auth/signin"}
              >
                Get started for free
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
