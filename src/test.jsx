import React, { useEffect, useState } from "react";

const Test = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const mouseMove = () => {
      setCounter((val) => val + 1);
    };
    const interval = setInterval(() => {
      console.log("interval");
    }, 1000);
    document.addEventListener("mousemove", mouseMove);
    return () => {
      document.removeEventListener("mousemove", mouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <p>Test component</p>
      <h2>{counter}</h2>
    </div>
  );
};

export default Test;
