import React, { useState } from "react";
import { useDebounce } from "./utils";

function Test() {
  const [name, setName] = useState("");
  const debouncedName = useDebounce(name, 2000);
  console.log(debouncedName);
  return (
    <div>
      <input type="text" onChange={(e) => setName(e.target.value)} />
    </div>
  );
}

export default Test;
