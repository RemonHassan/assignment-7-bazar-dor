import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-dotted border-gray-400 bg-white">
      <div className="mx-auto flex min-h-20.5 max-w-310 flex-col items-center justify-center gap-2 px-6 py-5 md:flex-row md:justify-between">
        <p className="text-center text-[14px] text-gray-800 md:text-left">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        <p className="text-center text-[14px] text-gray-800 md:text-right">
          সকল দাম সপ্তাহে; বাজার অবস্থা উপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;
