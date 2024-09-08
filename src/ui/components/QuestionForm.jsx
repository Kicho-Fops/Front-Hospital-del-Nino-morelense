import {
    Box,
    Grid,
    GridItem,
    Select,
    Input,
    Text,
    Textarea,
    Button,
  } from "@chakra-ui/react";

    //TODO

    // Cuando haces la ventana mas pequeña, el boton se sale del box
    // Diseño de telefono e implementar diseño de telefono (posiblemente lo hagamos en otro archivo)
    // Validar todos los campos para que se habilite el boton de enviar

  
  import { useState } from "react";
  import CustomTextBox from "./CustomTextBox";
  
  function QuestionForm() {
    const [selectedOption, setSelectedOption] = useState("");
  
    const handleSelectChange = (event) => {
      setSelectedOption(event.target.value);
      // Perform other actions with the selected option
    };
  
    return (
      <>
        <Box
          borderRadius="3xl"
          borderWidth="3px"
          borderColor={"gray.200"}
          bg="tomato"
          w="90%"
          h="90%"
          p={4}
          color="white"
          justifyContent="center"
          alignItems="center"
          margin="auto"
          boxShadow="inset 0 5px 4px rgba(0.1, 0.1, 0.1, 0.3)"
          padding={10}
        >
          <Grid
            templateColumns="repeat(3, 2fr)"
            templateRows="repeat(1, 1fr)"
            gap={150}
          >
            <GridItem w="100%" h="10" color={"black"} colSpan={1}>
              <CustomTextBox
                title="Quien reporta"
                example="Ejemplo: Sergio"
                required={true}
              />
            </GridItem>
            <GridItem w="100%" h="10" color={"black"} colSpan={1}>
              <CustomTextBox
                title="Área de reporte"
                example="Ejemplo: Vigilancia Hospital"
                required={true}
              />
            </GridItem>
            <GridItem w="100%" h="10" color={"black"} colSpan={1}>
              <CustomTextBox
                title="Extensión"
                example="Ejemplo: Extensión"
                required={true}
              />
            </GridItem>
            <GridItem w="100%" h="5" color={"black"} colSpan={1}>
              <Select
                placeholder="Tipo de equipo a revisar"
                variant="filled"
                value={selectedOption}
                onChange={handleSelectChange}
              >
                <option value="option1">PC</option>
                <option value="option2">PC/Todo en uno</option>
                <option value="option3">Laptop</option>
                <option value="option4">Terminal</option>
                <option value="option5">Impresora</option>
                <option value="option6">Escáner</option>
                <option value="option7">Multifuncional</option>
                <option value="option8">Otro</option>
              </Select>
            </GridItem>
            <GridItem w="100%" h="5" color={"black"} colSpan={2}>
              <Input
                placeholder="Ejemplo: Teclado KU-0138"
                variant="filled"
                marginTop={2}
                isInvalid={selectedOption === "option8"}
                isDisabled={selectedOption !== "option8"}
              />
            </GridItem>
            <GridItem w="100%" h="10" color={"black"} colSpan={3}>
              <Box display="flex" alignItems="center">
                <Text fontSize="xl" marginLeft={3}>
                  Motivo del reporte
                </Text>
                <Text color={"red"} fontSize="2xl">
                  *
                </Text>
              </Box>
              <Textarea
                placeholder="Ejemplo: La impresora no imprime"
                variant="filled"
                marginTop={2}
                height="300px"
              />
            </GridItem>
            <GridItem
              w="100%"
              h="10"
              color={"black"}
              colSpan={3}
              display="flex"
              justifyContent="center"
              marginTop={200}
            >
              <Button colorScheme="blue" size="lg">
                Enviar
              </Button>
            </GridItem>
          </Grid>
        </Box>
      </>
    );
  }
  
  export default QuestionForm;