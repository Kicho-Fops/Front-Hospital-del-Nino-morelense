// src/CustomSelect.js
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import PropTypes from "prop-types";
// import { SearchIcon } from "@chakra-ui/icons"; // Optional icon for a search input

function CustomSearch({ placeholder, variant, options, onChange, value }) {
  const handleChange = (event) => {
    // Capture the input value in event.target.value
    onChange(event.target.value);
  };

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        
      </InputLeftElement>
      <Input
        placeholder={placeholder}
        variant={variant}
        value={value}
        onChange={handleChange}
      />
    </InputGroup>
  );
}


CustomSearch.defaultProps = {
  placeholder: "",
  variant: "filled",
  options: [],
  value: "",
};

CustomSearch.propTypes = {
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

export default CustomSearch;
