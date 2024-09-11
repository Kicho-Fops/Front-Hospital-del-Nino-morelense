import {
    Box,
    Grid,
    GridItem,
    Select,
    Input,
    Text,
    Textarea,
    Button,
    useToast,  // Importamos useToast
  } from "@chakra-ui/react";
  import { useState } from "react";
  import CustomTextBox from "./CustomTextBox";
  import { useConfirmationDialog, ConfirmationDialog } from "./ConfirmationDialog";  // Importamos ambos
  
  function QuestionForm() {
    const [formData, setFormData] = useState({
      quienReporta: "",
      areaReporte: "",
      extension: "",
      tipoEquipo: "",
      descripcionEquipo: "",
      motivoReporte: "",
    });
  
    const { isOpen, openDialog, closeDialog } = useConfirmationDialog(); // Usamos el hook
    const toast = useToast();  // Inicializamos el hook de useToast 
  
    // Función para confirmar y enviar el formulario
    const handleConfirm = () => {
      console.log("El formulario ha sido enviado!");
      
      // Mostramos una notificación de éxito después de enviar el formulario
      toast({
        title: "Envío exitoso",
        description: "El reporte ha sido enviado correctamente.",
        duration: 5000,  // Duración en milisegundos
        isClosable: true,
      });
  
      closeDialog();  
    };
  
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
        descripcionEquipo: value !== "Otro" ? "" : prevData.descripcionEquipo,
      }));
    };
  
    const isFormComplete =
      formData.quienReporta.trim() !== "" &&
      formData.areaReporte.trim() !== "" &&
      formData.extension.trim() !== "" &&
      formData.tipoEquipo !== "" &&
      formData.tipoEquipo !== "Tipo de equipo a revisar" &&
      formData.motivoReporte.trim() !== "" &&
      (formData.tipoEquipo !== "Otro" || formData.descripcionEquipo.trim() !== "");
  
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
                name="quienReporta"
                value={formData.quienReporta}
                onChange={handleInputChange}
              />
            </GridItem>
  
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
  
            <GridItem
              w="100%"
              h="10"
              color={"black"}
              colSpan={3}
              display="flex"
              justifyContent="center"
              marginTop={200}
            >
              <Button colorScheme="blue" size="lg" isDisabled={!isFormComplete} onClick={openDialog}>
                Enviar
              </Button>
            </GridItem>
          </Grid>
        </Box>
  
        <ConfirmationDialog
          isOpen={isOpen}
          onClose={closeDialog}
          onConfirm={handleConfirm}
          title="Atención"
          message="¿Seguro que quiere enviar el reporte?"
        />
      </>
    );
  }
  
  export default QuestionForm;
  
