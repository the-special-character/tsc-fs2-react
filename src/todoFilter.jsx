import React, { memo } from "react";

const TodoFilter = ({ filterBtns, changeFilterType }) => {
  console.log("TodoFilter render");
  return (
    <div className="w-full flex">
      {filterBtns.map((item) => (
        <button
          key={item.value}
          type="button"
          onClick={() => changeFilterType(item.value)}
          className="btn flex-1 rounded-none"
        >
          {item.text}
        </button>
      ))}
    </div>
  );
};

export default memo(TodoFilter);
