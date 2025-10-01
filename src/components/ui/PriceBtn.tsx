import React from "react";

type PriceBtnProps = { tokens: number };

const PriceBtn = ({ tokens }: PriceBtnProps) => {
  return (
    <button
      className="
        group relative px-5 py-[0.7rem]
         border border-gray-700
        bg-black cursor-pointer
        inline-flex items-center justify-center rounded-[5px]
        text-[1.7rem] text-gray-300 hover:bg-neutral-900
      "
    >
      <span
        className="
          relative inline-flex items-center justify-center
          overflow-hidden whitespace-nowrap
        "
      >
        <span
          className="
            block transition-transform duration-500
            group-hover:-translate-y-full 
          "
        >
          Purchase <span className="text-[#de692e] font-semibold " > {tokens} </span>tokens
        </span>
        <span
          className="
            absolute inset-0 block
            translate-y-full transition-transform duration-500
            group-hover:translate-y-0
          "
        >
          Purchase Now
        </span>
      </span>
    </button>
  );
};

export default PriceBtn;
