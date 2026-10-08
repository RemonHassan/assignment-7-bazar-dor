import Image from "next/image";

export default function Banner() {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-6">
      <div className="bg-[#f4f7f4] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-gray-100 shadow-xs">
        {/* Mirga / Bitaa: Barreeffama banner */}
        <div className="flex-1 space-y-4 text-left">
          {/* Badge Guyyaa */}
          <div className="inline-block bg-[#e2efe3] text-[#2d6a4f] text-sm font-medium px-4 py-1.5 rounded-full">
            {date}
          </div>

          {/* Mata Duree */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Barreeffama Ibsa */}
          <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* Qabduu (Button) */}
          <div className="pt-2">
            <button className="bg-[#058c42] hover:bg-[#046e34] text-white font-medium text-base px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer">
              সব পণ্য দেখুন
            </button>
          </div>
        </div>

        {/* Mirga: Fakkii Guubloo Kuduraa/Fuduraa */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0 flex items-center justify-center">
          <Image
            src="/bazar-hero.png" // Fakkii basket keessanii asitti kaahaa
            alt="Vegetable Basket"
            width={320}
            height={320}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
