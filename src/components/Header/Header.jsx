import ArrowLeft from "../../assets/icon-header/ArrowLeft.png";
import ArrowDown from "../../assets/icon-header/ArrowDown.png";
import Logo from "../../assets/icon-header/logo.png";
import Dots from "../../assets/icon-header/dots.png";

export default function Header() {
  return (
    <header className="flex justify-between mt-[56px] mx-8 mb-[2px] max-[320px]:mx-10">
      <button className="flex items-center justify-center gap-[12px] text-white text-[13px] font-extrabold px-[12px] py-[8.5px] bg-white/20 rounded-full">
        <img className="img" src={ArrowLeft} alt="ArrowLeft" />
        Close
      </button>
      <img className="img" src={Logo} alt="Logo" />
      <button className="flex items-center justify-center gap-[23px] text-white text-[13px] font-extrabold px-[12px] py-[8.5px] bg-white/20 rounded-full">
        <img className="img" src={ArrowDown} alt="ArrowDown" />
        <img className="img" src={Dots} alt="Dots" />
      </button>
    </header>
  );
}
