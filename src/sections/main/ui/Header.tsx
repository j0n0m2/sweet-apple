const Header = () => {
  return (
    <div className="inline-block p-10">
      <div className="font-['Inter'] text-[56px] leading-16 font-black text-white select-none [text-shadow:_-1px_-1px_0_black,_1px_-1px_0_black,_-1px_1px_0_black,_1px_1px_0_black]">
        How <b className="italic">Sweet</b>
      </div>
      <div className="pointer-events-none inline-block rounded-[100%] bg-[#11ff00] font-['Inter'] text-[56px] leading-14 font-black text-white select-none [text-shadow:_-1px_-1px_0_black,_1px_-1px_0_black,_-1px_1px_0_black,_1px_1px_0_black]">
        My <b className="italic">Apple</b>
      </div>
    </div>
  );
};

export default Header;
