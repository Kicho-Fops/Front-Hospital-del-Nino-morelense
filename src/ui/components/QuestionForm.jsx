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
  
  import { useState } from "react";
  import CustomTextBox from "./CustomTextBox";
  

      //TODO

    // Cuando haces la ventana mas pequeña, el boton se sale del box
    // Diseño de telefono e implementar diseño de telefono (posiblemente lo hagamos en otro archivo)
    // Validar todos los campos para que se habilite el boton de enviar


  function QuestionForm() {
    const [formData, setFormData] = useState({
      quienReporta: "",
      areaReporte: "",
      extension: "",
      tipoEquipo: "",
      descripcionEquipo: "",
      motivoReporte: "",
    });
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSelectChange = (event) => {
      const { value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        tipoEquipo: value,
        // Limpia la descripción si el tipo de equipo no es "Otro"
        descripcionEquipo: value !== "Otro" ? "" : prevData.descripcionEquipo,
      }));
    };
  
    // Verifica si el formulario está completo
    const isFormComplete =
      formData.quienReporta.trim() !== "" &&
      formData.areaReporte.trim() !== "" &&
      formData.extension.trim() !== "" &&
      formData.tipoEquipo !== "" &&  // Asegura que se ha seleccionado un tipo de equipo
      formData.tipoEquipo !== "Tipo de equipo a revisar" && // Asegura que no sea el placeholder
      formData.motivoReporte.trim() !== "" &&
      (formData.tipoEquipo !== "Otro" || formData.descripcionEquipo.trim() !== ""); // Si es "Otro", también debe estar lleno el campo descripción
  
    return (
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
          {/* Input para quien reporta */}
          <GridItem w="100%" h="10" color={"black"} colSpan={1}>
            <CustomTextBox
              title="Quien reporta"
              example="Ejemplo: Sergio"
              required={true}
              name="quienReporta"
              value={formData.quienReporta}
              onChange={handleInputChange}
            />
          </GridItem>
  
          {/* Input para área de reporte */}
          <GridItem w="100%" h="10" color={"black"} colSpan={1}>
            <CustomTextBox
              title="Área de reporte"
              example="Ejemplo: Vigilancia Hospital"
              required={true}
              name="areaReporte"
              value={formData.areaReporte}
              onChange={handleInputChange}
            />
          </GridItem>
  
          {/* Input para extensión */}
          <GridItem w="100%" h="10" color={"black"} colSpan={1}>
            <CustomTextBox
              title="Extensión"
              example="Ejemplo: Extensión"
              required={true}
              name="extension"
              value={formData.extension}
              onChange={handleInputChange}
            />
          </GridItem>
  
          {/* Select para tipo de equipo */}
          <GridItem w="100%" h="5" color={"black"} colSpan={1}>
            <Select
              placeholder="Tipo de equipo a revisar"
              variant="filled"
              value={formData.tipoEquipo}
              onChange={handleSelectChange}
            >
              <option value="Tipo de equipo a revisar" style={{ display: 'none' }}>Tipo de equipo a revisar</option>
              <option value="PC">PC</option>
              <option value="PC/Todo en uno">PC/Todo en uno</option>
              <option value="Laptop">Laptop</option>
              <option value="Terminal">Terminal</option>
              <option value="Impresora">Impresora</option>
              <option value="Escáner">Escáner</option>
              <option value="Multifuncional">Multifuncional</option>
              <option value="Otro">Otro</option>
            </Select>
          </GridItem>
  
          {/* Input para descripción del equipo, se habilita solo si se selecciona "Otro" */}
          <GridItem w="100%" h="5" color={"black"} colSpan={2}>
            <Input
              placeholder="Ejemplo: Teclado KU-0138"
              variant="filled"
              marginTop={2}
              name="descripcionEquipo"
              value={formData.descripcionEquipo}
              isDisabled={formData.tipoEquipo !== "Otro"}
              onChange={handleInputChange}
            />
          </GridItem>
  
          {/* Textarea para motivo del reporte */}
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
              name="motivoReporte"
              value={formData.motivoReporte}
              onChange={handleInputChange}
            />
          </GridItem>
  
          {/* Botón de enviar */}
          <GridItem
            w="100%"
            h="10"
            color={"black"}
            colSpan={3}
            display="flex"
            justifyContent="center"
            marginTop={200}
          >
            <Button colorScheme="blue" size="lg" isDisabled={!isFormComplete}>
              Enviar
            </Button>
          </GridItem>
        </Grid>
      </Box>
    );
  }
  
  export default QuestionForm;
