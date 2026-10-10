"use client";

import Link from "next/link";
import { FiHome, FiHelpCircle } from "react-icons/fi";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#f3f6f3] flex flex-col items-center justify-center p-4 relative overflow-hidden selection:bg-[#008744]/20 selection:text-[#008744]">
      {/* Background Decorative Ambient Elements */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-[#008744]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-xl space-y-6 relative z-10">
        {/* Main Card Container */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-xl shadow-gray-200/50 border border-white/60 text-center space-y-8">
          {/* Top Badge & Graphic Display */}
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#008744]/10 text-[#008744] text-xs font-semibold tracking-wider rounded-full uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#008744] animate-pulse" />
              ৪০৪ ত্রুটি
            </span>

            {/* Stylized 404 Display */}
            <div className="relative inline-block">
              <h1 className="text-8xl sm:text-9xl font-black text-gray-900 tracking-tighter select-none">
                ৪<span className="text-[#008744]">০</span>৪
              </h1>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-gradient-to-r from-transparent via-[#008744] to-transparent rounded-full opacity-60" />
            </div>
          </div>

          {/* Heading & Subtext */}
          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              কাঙ্ক্ষিত পৃষ্ঠাটি পাওয়া যায়নি
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              আপনি যে লিঙ্কটিতে প্রবেশ করার চেষ্টা করছেন তা সরিয়ে নেওয়া হয়েছে
              অথবা ঠিকানায় কোনো ভুল রয়েছে।
            </p>
          </div>

          {/* Primary & Secondary Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="btn bg-[#008744] hover:bg-[#007038] text-white border-none w-full sm:w-auto px-6 text-sm font-medium rounded-xl h-12 shadow-md shadow-[#008744]/20 transition-all flex items-center justify-center gap-2 group"
            >
              <FiHome className="text-base group-hover:scale-110 transition-transform" />
              হোম পেজে ফিরে যান
            </Link>
          </div>
        </div>

        {/* Footer Support Quick Link */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
          <FiHelpCircle className="text-gray-400 text-sm" />
          <span>কোনো সমস্যা হচ্ছে?</span>
          <Link
            href="/contact"
            className="text-[#008744] font-medium hover:underline"
          >
            সাপোর্ট টিমের সাথে কথা বলুন
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
