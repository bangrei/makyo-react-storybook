import React from "react";
import Dropdown from "./Dropdown";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "date", label: "Date" },
  { value: "elderberry", label: "Elderberry" },
];

const App = () => {
  return (
    <div className="w-full p-4 flex flex-col gap-10 justify-between mt-10 max-w-[900px] mx-auto">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-bold">Single Selection</span>
        <Dropdown options={options} searchable />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-bold">Multiple Selections</span>
        <Dropdown options={options} multiple searchable />
      </div>
    </div>
  );
};

export default App;
