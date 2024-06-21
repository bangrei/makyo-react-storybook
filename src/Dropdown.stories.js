import React from "react";
import Dropdown from "./Dropdown";
import "./index.css";

export default {
  title: "Components/Dropdown",
  component: Dropdown,
  argTypes: {},
};
const Template = (args) => <Dropdown {...args} />;
const options = [
  { value: "option 1", label: "Option One 1" },
  { value: "option 2", label: "Option option Two 2" },
  { value: "option 3", label: "Option option option Three 3" },
  { value: "option 4", label: "Option option option option Four 4" },
  { value: "option 5", label: "Option option option option option Five 5" },
];
const renderOption = (option) => {
  return option.label;
};
export const DropdownSelection = Template.bind({});
DropdownSelection.args = {
  label: "Select item",
  searchable: true,
  multiple: true,
  usePortal: false,
  clearable: false,
  options: options,
  renderOption: renderOption,
};
