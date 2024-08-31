import { Link } from "react-router-dom";

const BackgroundCircles = () => {
  return (
    <>
      <div
        className="absolute transform -translate-x-0 w-full h-full rounded filter blur-xl opacity-70 blob 7s infinite"
        style={{
          background:
            "radial-gradient(circle, rgba(191, 64, 191, 0) 0%, rgba(0, 198, 247, 0.05) 100%)",
        }}
      ></div>
    </>
  );
};

const SuccessTitle = () => {
  return (
    <div className="flex flex-col text-2xl md:text-4xl lg:text-6xl text-white font-normal text-center">
      <div className="flex">
        <span className="flex-1 text-center">Payment successful</span>
      </div>
    </div>
  );
};

const ResumeButton = () => {
  const style =
    "flex items-center justify-center p-6 h-10 relative font-bold text-center rounded-lg bg-black text-white ring-1 ring-dark-primary ring-inset hover:text-black hover:bg-dark-primary";

  return (
    <div className="my-4 mx-auto md:w-[12%] relative group">
      <div className="absolute -inset-0.5 bg-dark-primary blur-lg rounded-full opacity-50 transform scale-75 group-hover:scale-100 transition-all duration-300"></div>
      <a href="https://forms.gle/hrZYtDXbtdJotny17" className={style}>
        <span className="flex items-center">
          <span>Submit Resume</span>
        </span>
      </a>
    </div>
  );
};

const Success = () => {
  return (
    <div>
      <div className="relative flex flex-col justify-center min-h-screen">
        <BackgroundCircles />
        <BackgroundCircles />
        <div className="my-4">
          <SuccessTitle />
        </div>

        <div className="my-4 mx-auto md:w-1/2 text-center">
          <span className="text-lg text-white">
            Welcome to Code[Coogs]! Please submit your resume by pressing the
            button below.
          </span>
        </div>

        <ResumeButton />
      </div>
    </div>
  );
};

export default Success;
