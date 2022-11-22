import React, { memo } from "react";

const Child2 = () => {
  console.log("child 2");
  return <div>child2</div>;
};

export default memo(Child2);
