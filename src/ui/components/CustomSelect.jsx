import { Select } from "@chakra-ui/react";
import PropTypes from "prop-types";


function CustomSelect({placeholder, variant, options, onChange}) {

    const handleChange = (event) => {
        // The value of the selected option is stored in event.target.value
        onChange(event);
      };

    return (
        <Select
        placeholder={placeholder}
        variant={variant}
        value={options.value}
        onChange={handleChange}
        >
        {options.map((option) => (
            <option key={option.value} value={option.value}>
            {option}
            </option>
        ))}
        </Select>
    );
}

export default CustomSelect;

CustomSelect.defaultProps = {
    placeholder: "",
    variant: "filled",
    options: [],
};

CustomSelect.propTypes = {
    placeholder: PropTypes.string,
    variant: PropTypes.string,
    options: PropTypes.array,
    onChange: PropTypes.func,
};

