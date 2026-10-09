import Image from "next/image";
import NavLink from "./NavLink";
import Link from "next/link";
import UserInfo from "./UserInfo";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
  return (
    <header className="w-full bg-white border-b border-gray-100 px-6 py-4">
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
            <Link
              className="font-bold text-2xl text-emerald-800 leading-tight"
              href={"/"}
            >
              বাজার দর
            </Link>

            <p className="mt-1 text-[14px] text-gray-500">{date}</p>
          </div>
        </div>

        {/* Right Section: Sign In & Sign Up */}
        <UserInfo></UserInfo>
      </div>
      <NavLink></NavLink>
    </header>
  );
};

export default Header;
