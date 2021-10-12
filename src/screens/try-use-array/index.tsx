import React from "react";
import { useArray } from "../../utils";

interface PType {
  name: string;
  age: number;
}
const TReactArray = () => {
  const persons: PType[] = [
    { name: "tom", age: 18 },
    { name: "jerry", age: 19 },
  ];
  const { value, clear, removeIndex, add } = useArray<PType>(persons);
  return (
    <div>
      <button onClick={() => add({ name: "jack", age: 20 })}>add</button>
      <button onClick={() => removeIndex(0)}>removeIndex0</button>
      <button onClick={() => clear()}>clear</button>
      {value.map((item, index) => (
        <div key={index}>
          {index}:{item.name}
        </div>
      ))}
    </div>
  );
};

export default TReactArray;
