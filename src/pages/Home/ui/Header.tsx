const Header = () => {
  return (
    <div className="p-10">
      <div className="font-['Inter'] text-[80px] leading-22 font-black text-white select-none [text-shadow:_-1.5px_-1.5px_0_black,_1.5px_-1.5px_0_black,_-1.5px_1.5px_0_black,_1.5px_1.5px_0_black]">
        How <b className="italic">Sweet</b>
      </div>
      <div className="absolute mt-5 h-20 w-90 rounded-[100%] bg-[#11ff00]"></div>
      <div className="pointer-events-none absolute w-full font-['Inter'] text-[80px] leading-22 font-black text-white select-none [text-shadow:_-1.5px_-1.5px_0_black,_1.5px_-1.5px_0_black,_-1.5px_1.5px_0_black,_1.5px_1.5px_0_black]">
        My <b className="italic">Apple</b>
      </div>
    </div>
  );
};

export default Header;
