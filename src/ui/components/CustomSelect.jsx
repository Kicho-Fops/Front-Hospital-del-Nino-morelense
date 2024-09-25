// src/CustomSelect.js
import { Select } from "@chakra-ui/react";
import PropTypes from "prop-types";

function CustomSelect({ placeholder, variant, options, onChange, value }) {
  const handleChange = (event) => {
    // The value of the selected option is stored in event.target.value
    onChange(event);
  };

  return (
    <Select
      placeholder={placeholder}
      variant={variant}
      value={value}
      onChange={handleChange}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.text}
        </option>
      ))}
    </Select>
  );
}

CustomSelect.defaultProps = {
  placeholder: "",
  variant: "filled",
  options: [],
  value: "",
};

CustomSelect.propTypes = {
  placeholder: PropTypes.string,
  variant: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CustomSelect;
