const Background = () => {
  return (
    <>
      <div className="absolute w-full h-full z-[-3] bg-[radial-gradient(circle,#ffffff_0%,#a4d6ff_100%)]" />
      <div className="absolute w-full h-full z-[-2] bg-gradient-to-b from-transparent to-[#70bfff]" />
      <div className="absolute w-[40vw] h-[40vw] rounded-full bg-white z-[-1] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 blur-[20px]" />
    </>
  );
};
export default Background;
