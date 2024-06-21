import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { FaCaretDown, FaCaretUp, FaSearch } from "react-icons/fa";

const Dropdown = ({
  options,
  multiple = false,
  searchable = false,
  usePortal = false,
  label = "Select...",
  clearable = true,
  renderOption = defaultRenderOption,
  ...props
}) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [searchTerm, setSearchTerm] = useState("");

  const dropdownRef = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(value)
    );
    setFilteredOptions(filteredOptions);
  };

  const handleOptionClick = (option) => {
    if (multiple) {
      setSelectedValue(null);
      if (selectedValues.includes(option.value)) {
        setSelectedValues(
          selectedValues.filter((value) => value !== option.value)
        );
      } else {
        setSelectedValues([...selectedValues, option.value]);
      }
    } else {
      setSelectedValues([]);
      setSelectedValue(option.value);
      setIsOpen(false);
    }
    if (props.onChange) {
      props.onChange(
        multiple ? [...selectedValues, option.value] : option.value
      );
    }
  };

  const handleClearSelection = () => {
    setSelectedValues([]);
    setSelectedValue(null);
    if (props.onChange) {
      props.onChange(multiple ? [] : null);
    }
  };

  const renderSelectedValues = () => {
    if (multiple) {
      if (selectedValues.length === 0) {
        return (
          <span className="text-sm font-normal text-slate-600">{label}</span>
        );
      }
      return (
        <div className="flex gap-3">
          {selectedValues.map((value) => (
            <div
              key={value}
              className="flex gap-3 rounded-lg bg-slate-100 px-2 py-1 font-thin text-xs"
            >
              <span>
                {options?.find((option) => option.value === value).label}
              </span>
              <button
                type="button"
                onClick={() => handleOptionClick({ value })}
                className="rounded-full w-[15px] h-[15px] border border-slate-700 flex items-center justify-center"
              >
                &times;
              </button>
            </div>
          ))}
          {clearable && (
            <button
              type="button"
              onClick={handleClearSelection}
              className="text-xs"
            >
              Clear
            </button>
          )}
        </div>
      );
    } else {
      const item = options.find((o) => o.value === selectedValue);
      return (
        <span className="text-sm font-normal text-slate-600">
          {item ? item.label : label}
        </span>
      );
    }
  };

  const isSelected = (option) => {
    if (multiple) return selectedValues.includes(option.value);
    return selectedValue === option.value;
  };

  const renderDropdownContent = () => {
    return (
      <div ref={dropdownRef} className="flex-1 relative">
        <div
          className={`w-full py-2 px-4 border rounded-md mb-2 flex justify-between items-center`}
          onClick={toggleDropdown}
        >
          <div className="flex">{renderSelectedValues()}</div>
          {isOpen && <FaCaretUp />}
          {!isOpen && <FaCaretDown />}
        </div>
        {/* dropdown items */}
        {isOpen && (
          <div
            className={`border rounded-md absolute z-[9999] w-full bg-white`}
          >
            {searchable && (
              <div className="py-2 px-4 border-b flex gap-4 items-center">
                <FaSearch className="opacity-50" />
                <input
                  className="outline-none w-full text-sm"
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            )}
            <ul className="p-0">
              {filteredOptions.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleOptionClick(option)}
                  className={`py-2 px-4 cursor-pointer text-sm sm:hover:opacity-60 ${isSelected(option) ? "bg-teal-50" : ""}`}
                >
                  {renderOption(option)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  if (usePortal) {
    return ReactDOM.createPortal(renderDropdownContent(), document.body);
  }
  return renderDropdownContent();
};

const defaultRenderOption = (option) => option.label;

export default Dropdown;
