
import { Box, Input, Text } from "@chakra-ui/react";
import PropTypes from 'prop-types';

function CustomTextBox(props) {
  return (
    <>
      <Box display="flex" alignItems="center">
        <Text fontSize="xl" marginLeft={3}>
          {props.title ? props.title : ""}
        </Text>
        <Text color={"red"} fontSize="2xl">
          {props.required ? "*" : ""}
        </Text>
      </Box>
      <Input placeholder={props.example} variant="filled" marginTop={2} />
    </>
  );
}
// Default values for the props
CustomTextBox.defaultProps = {
    title: "",
    example: "",
    required: false,
};

// Typechecking for the props
CustomTextBox.propTypes = {
    title: PropTypes.string,
    example: PropTypes.string,
    required: PropTypes.bool,
};


export default CustomTextBox;