import Image from "next/image";

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-100 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Section: Logo & Date */}
        <div className="flex items-center gap-4">
          <div className="bg-emerald-600 p-2.5 rounded-2xl flex items-center justify-center shrink-0">
            <Image
              width={40}
              height={40}
              src="/bazar-hero.png"
              alt="cart"
              className="object-contain"
            />
          </div>

          <div className="flex flex-col">
            <a
              href="#"
              className="font-bold text-2xl text-emerald-800 leading-tight"
            >
              বাজার দর
            </a>
            <p className="text-xs text-gray-500 font-normal mt-0.5">
              মঙ্গলবার, ৬ অক্টোবর, ২০২৬
            </p>
          </div>
        </div>

        {/* Right Section: Sign In & Sign Up */}
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 text-gray-800 hover:text-emerald-700 font-semibold text-base transition-colors duration-200">
            সাইন ইন
          </button>

          <button className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-base rounded-xl shadow-xs transition-colors duration-200">
            সাইন আপ
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
