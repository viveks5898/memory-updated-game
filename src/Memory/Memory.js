import React from "react";

const Memory = ({ data, handleGameLogic, numShow, matched }) => {
  return (
    <div className="max-w-[422px] m-auto sm:mt-10">
      <div className="grid grid-cols-6 gap-5">
        {data.map((ele, key) => (
          <p
            key={key}
            className={`bg-slate-500 cursor-pointer py-4 ${
              !numShow.includes(key) && !matched.includes(key)
                ? "text-slate-500"
                : "text-white"
            } ${matched.includes(key) ? "opacity-0" : ""}`}
            onClick={() => handleGameLogic(key, ele)}
          >
            {ele}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Memory;
