import React, { memo, useState, useEffect, useRef } from "react";
import Test from "./test";

const Child2 = ({ value }) => {
  const [counter, setCounter] = useState(value);
  const [name, setName] = useState("Yagnesh");
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      console.log("second use effect");
    }
  }, [counter]);

  useEffect(() => {
    if (isMounted.current) {
      console.log("third use effect");
    }
  }, [name]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  const increment = () => {
    setCounter((value) => value + 1);
  };

  const descrement = () => {
    setCounter((value) => value - 1);
  };

  const changeName = () => {
    setName("rahul");
  };

  return (
    <div>
      <button type="button" onClick={increment}>
        +
      </button>
      <h1>{counter}</h1>
      <button type="button" onClick={descrement}>
        -
      </button>
      <h2>{name}</h2>
      <button type="button" onClick={changeName}>
        Change Name
      </button>
      {counter < 10 && <Test />}
    </div>
  );
};

export default memo(Child2);
