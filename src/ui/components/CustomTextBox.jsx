import { Box, Input, Text } from "@chakra-ui/react";
import PropTypes from 'prop-types';

function CustomTextBox({ title, example, required, name, value, onChange }) {
  return (
    <>
      <Box display="flex" alignItems="center">
        <Text fontSize="xl" marginLeft={3}>
          {title || ""}
        </Text>
        <Text color={"red"} fontSize="2xl">
          {required ? "*" : ""}
        </Text>
      </Box>
      <Input
        placeholder={example}
        variant="filled"
        marginTop={2}
        name={name}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

// Default values for the props
CustomTextBox.defaultProps = {
  title: "",
  example: "",
  required: false,
  name: "",
  value: "",
  onChange: () => {},
};

// Typechecking for the props
CustomTextBox.propTypes = {
  title: PropTypes.string,
  example: PropTypes.string,
  required: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default CustomTextBox;
