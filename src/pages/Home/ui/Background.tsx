const Background = () => {
  return (
    <>
      <div className="absolute z-[-3] h-full w-full bg-[radial-gradient(circle,#ffffff_0%,#A4D6FF_100%)]" />
      <div className="absolute z-[-2] h-full w-full bg-[linear-gradient(180deg,_#ffffff00_50%,_#88c9ff_100%)]" />
      <div className="absolute top-1/2 left-1/2 z-[-1] h-[40vw] w-[40vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-[20px]" />
    </>
  );
};
export default Background;
