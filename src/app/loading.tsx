import React from "react";

const Loading = () => {
  // Array to render 12 skeleton cards (3-column grid)
  const skeletons = Array.from({ length: 12 });

  return (
    <div className="min-h-screen bg-[#f3f6f3] p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Grid matching the card layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skeletons.map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-5 border border-gray-100/80 shadow-xs flex flex-col justify-between h-[140px] animate-pulse"
            >
              {/* Top Row: Icon + Title & Unit */}
              <div className="flex items-start gap-3">
                {/* Icon Placeholder */}
                <div className="w-12 h-12 bg-gray-200/70 rounded-xl shrink-0" />

                <div className="space-y-2 flex-1 pt-1">
                  {/* Item Title Placeholder */}
                  <div className="h-4 bg-gray-200/80 rounded-md w-3/4" />
                  {/* Unit (kg/litre) Placeholder */}
                  <div className="h-3 bg-gray-200/50 rounded-md w-1/4" />
                </div>
              </div>

              {/* Bottom Row: Price + Tag */}
              <div className="flex items-end justify-between pt-2">
                <div className="space-y-1.5">
                  {/* Label "আজকের দাম" Placeholder */}
                  <div className="h-2.5 bg-gray-200/60 rounded-md w-16" />
                  {/* Price Text Placeholder */}
                  <div className="h-6 bg-gray-200/80 rounded-md w-24" />
                </div>

                {/* Percentage Change Tag Placeholder */}
                <div className="h-6 w-16 bg-gray-200/60 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
