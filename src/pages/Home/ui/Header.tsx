const Header = () => {
  return (
    <>
      <div className="text-center font-['Inter'] text-[220px] leading-80 font-black text-white [text-shadow:_-3px_-3px_0_black,_3px_-3px_0_black,_-3px_3px_0_black,_3px_3px_0_black]">
        How <b className="italic">Sweet</b>
      </div>
      <div className="absolute bottom-[0%] left-1/2 z-2 w-[70%] -translate-x-1/2 text-center font-['Inter'] text-[220px] leading-80 font-black text-white [text-shadow:_-3px_-3px_0_black,_3px_-3px_0_black,_-3px_3px_0_black,_3px_3px_0_black]">
        My <b className="italic">Apple</b>
      </div>
      <div className="absolute bottom-10 left-1/2 h-50 w-260 -translate-x-1/2 rounded-[100%] bg-[#11ff00]"></div>
    </>
  );
};

export default Header;
