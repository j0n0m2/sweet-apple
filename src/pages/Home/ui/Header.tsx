const Header = () => {
  return (
    <>
      <div className="font-['Inter'] font-black text-[220px] text-center text-white [text-shadow:_-3px_-3px_0_black,_3px_-3px_0_black,_-3px_3px_0_black,_3px_3px_0_black]">
        How <b className="italic">Sweet</b>
      </div>
      <div className="absolute bottom-[3%] left-1/2 -translate-x-1/2 rounded-[100%] w-[70%] z-0 font-['Inter'] font-black text-[220px] text-center text-white [text-shadow:_-3px_-3px_0_black,_3px_-3px_0_black,_-3px_3px_0_black,_3px_3px_0_black] bg-[#11ff00]">
        My <b className="italic">Apple</b>
      </div>
    </>
  );
};

export default Header;
