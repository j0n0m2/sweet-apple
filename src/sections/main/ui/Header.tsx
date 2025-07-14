const Header = () => {
  return (
    <div className="p-10">
      <div className="font-['Inter'] text-[56px] leading-16 font-black text-white select-none [text-shadow:_-1px_-1px_0_black,_1px_-1px_0_black,_-1px_1px_0_black,_1px_1px_0_black]">
        How <b className="italic">Sweet</b>
      </div>
      <div className="absolute mt-4 h-12 w-60 rounded-[100%] bg-[#11ff00]"></div>
      <div className="pointer-events-none absolute w-full font-['Inter'] text-[56px] leading-16 font-black text-white select-none [text-shadow:_-1px_-1px_0_black,_1px_-1px_0_black,_-1px_1px_0_black,_1px_1px_0_black]">
        My <b className="italic">Apple</b>
      </div>
    </div>
  );
};

export default Header;
