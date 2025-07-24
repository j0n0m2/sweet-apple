const Header = () => {
  return (
    <div>
      <div className="font-['Inter'] text-[24px] leading-8 font-black text-white select-none [text-shadow:_-0.5px_-0.5px_0_black,_0.5px_-0.5px_0_black,_-0.5px_0.5px_0_black,_0.5px_0.5px_0_black] sm:text-[56px] sm:leading-16 sm:[text-shadow:_-1px_-1px_0_black,_1px_-1px_0_black,_-1px_1px_0_black,_1px_1px_0_black]">
        How <b className="italic">Sweet</b>
      </div>
      <div className="pointer-events-none inline-block rounded-[100%] bg-[#11ff00] font-['Inter'] text-[24px] leading-6 font-black text-white select-none [text-shadow:_-0.5px_-0.5px_0_black,_0.5px_-0.5px_0_black,_-0.5px_0.5px_0_black,_0.5px_0.5px_0_black] sm:text-[56px] sm:leading-14 sm:[text-shadow:_-1px_-1px_0_black,_1px_-1px_0_black,_-1px_1px_0_black,_1px_1px_0_black]">
        My <b className="italic">Apple</b>
      </div>
    </div>
  );
};

export default Header;
