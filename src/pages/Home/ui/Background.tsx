const Background = () => {
  return (
    <>
      <div className="absolute z-[-3] h-full w-full bg-[radial-gradient(circle,#ffffff_0%,#a4d6ff_100%)]" />
      <div className="absolute z-[-2] h-full w-full bg-gradient-to-b from-transparent to-[#70bfff]" />
      <div className="absolute top-1/2 left-1/2 z-[-1] h-[40vw] w-[40vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-[20px]" />
    </>
  );
};
export default Background;
