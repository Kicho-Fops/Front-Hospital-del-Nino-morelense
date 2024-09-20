import {
  Box,
  Grid,
  GridItem,
  Select,
  Input,
  Text,
  Textarea,
  Button,
  useToast, // Importamos useToast
} from "@chakra-ui/react";
import { useState } from "react";
import CustomTextBox from "./CustomTextBox";
import {
  useConfirmationDialog,
  ConfirmationDialog,
} from "./ConfirmationDialog"; // Importamos ambos

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
  const toast = useToast(); // Inicializamos el hook de useToast

  // Función para confirmar y enviar el formulario
  const handleConfirm = () => {
    console.log("El formulario ha sido enviado!");

    console.log(formData);

    fetch(`http://localhost:8080/api/ticket/create`, {
      // Cambiamos la URL a donde este la API de prueba
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reportingUser: formData.quienReporta,
        reportArea: formData.areaReporte,
        extention: formData.extension,
        typeOfEquipment: formData.tipoEquipo,
        equipmentDescription: formData.descripcionEquipo,
        motive: formData.motivoReporte,
        PCDate: new Date().toISOString(),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.ok;
      })
      .then(() => {
        // Handle the response data if needed
        toast({
          title: "Envío exitoso",
          description: "El reporte ha sido enviado correctamente.",
          duration: 5000, // Duración en milisegundos
          isClosable: true,
        });
      })
      .catch(() => {
        // Handle errors if the request fails
        toast({
          title: "Error de envio",
          description: "El reporte ha tenido un error.",
          duration: 10000, // Duración en milisegundos
          isClosable: false,
        });
      });

    // Mostramos una notificación de éxito después de enviar el formulario

    closeDialog();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChangeComputer = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      tipoEquipo: value,
      descripcionEquipo: value !== "Otro" ? "" : prevData.descripcionEquipo,
    }));
  };

  const handleSelectChangeArea = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      areaReporte: value,
    }));
  };


  const isFormComplete =
    formData.quienReporta.trim() !== "" &&
    formData.areaReporte.trim() !== "" &&
    formData.extension.trim() !== "" &&
    formData.tipoEquipo !== "" &&
    formData.tipoEquipo !== "Tipo de equipo a revisar" &&
    formData.motivoReporte.trim() !== "" &&
    (formData.tipoEquipo !== "Otro" ||
      formData.descripcionEquipo.trim() !== "");

  return (
    <>
      <Box
        borderRadius="3xl"
        borderWidth="3px"
        borderColor={"gray.200"}
        w={{ base: "100%", md: "90%" }} // Full width on mobile, 90% on larger screens
        h={{ base: "90%", md: "90%" }}
        p={4}
        color="white"
        justifyContent="center"
        alignItems="center"
        margin="auto"
        boxShadow="inset 0 5px 4px rgba(0.1, 0.1, 0.1, 0.3)"
        padding={10}
      >
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(3, 2fr)" }} // Stack items in 1 column on mobile, grid with 3 columns on larger screens
          templateRows="repeat(1, 1fr)"
          gap={{ base: 20, md: 150 }} // Adjust gap for mobile and larger screens
        >
          <GridItem
            w="100%"
            h="10"
            color={"black"}
            colSpan={{ base: 1, md: 1 }}
          >
            <CustomTextBox
              title="Quien reporta"
              example="Ejemplo: Sergio"
              required={true}
              name="quienReporta"
              value={formData.quienReporta}
              onChange={handleInputChange}
            />
          </GridItem>

          <GridItem
            w="100%"
            h="10"
            color={"black"}
            colSpan={{ base: 1, md: 1 }}
            marginTop={{ base: 0, md: 10 }} // More margin on mobile to push it down
          >
            <Select
              placeholder="Área de reporte"
              variant="filled"
              value={formData.areaReporte}
              onChange={handleSelectChangeArea}
            >
              <option
                value="Tipo de equipo a revisar"
                style={{ display: "none" }}
              >
                Tipo de equipo a revisar
              </option>
              <option value="ARCHIVO - PRIMER PISO">ARCHIVO - PRIMER PISO</option>
              <option value="CONSULTA EXTERNA - PRIMER PISO">
                CONSULTA EXTERNA - PRIMER PISO
              </option>
              <option value="DIRECCIÓN OPERATIVA - PLANTA BAJA">DIRECCIÓN OPERATIVA - PLANTA BAJA</option>
              <option value="FINANCIEROS - PLANTA BAJA">FINANCIEROS - PLANTA BAJA</option>
              <option value="IMAGENOLOGIA - PLANTA BAJA">IMAGENOLOGIA - PLANTA BAJA</option>
              <option value="INFORMÁTICA - PLANTA BAJA">INFORMÁTICA - PLANTA BAJA</option>
              <option value="INFORMÁTICA Y ESTADÍSTICA - PLANTA BAJA">
                INFORMÁTICA Y ESTADÍSTICA - PLANTA BAJA
              </option>
              <option value="ONCOLOGIA - SEGUNDO PISO">ONCOLOGIA - SEGUNDO PISO</option>
              <option value="PASILLO DE CG - SEGUNDO PISO">PASILLO DE CG - SEGUNDO PISO</option>
              <option value="PASILLO DEL LOBBY - PLANTA BAJA">PASILLO DEL LOBBY - PLANTA BAJA</option>
              <option value="PATOLOGÍA - SÓTANO">PATOLOGÍA - SÓTANO</option>
              <option value="RECURSOS MATERIALES - SÓTANO">RECURSOS MATERIALES - SÓTANO</option>
              <option value="TRABAJO SOCIAL - SEGUNDO PISO">TRABAJO SOCIAL - SEGUNDO PISO</option>
              <option value="UCIN - SÓTANO">UCIN - SÓTANO</option>
              <option value="URGENCIAS - PLANTA BAJA">URGENCIAS - PLANTA BAJA</option>
            </Select>
          </GridItem>

          <GridItem
            w="100%"
            h="10"
            color={"black"}
            colSpan={{ base: 1, md: 1 }}
          >
            <CustomTextBox
              title="Extensión"
              example="Ejemplo: Extensión"
              required={true}
              name="extension"
              value={formData.extension}
              onChange={handleInputChange}
            />
          </GridItem>

          <GridItem w="100%" h="5" color={"black"} colSpan={{ base: 1, md: 1 }}>
            <Select
              placeholder="Tipo de equipo a revisar"
              variant="filled"
              value={formData.tipoEquipo}
              onChange={handleSelectChangeComputer}
            >
              <option
                value="Tipo de equipo a revisar"
                style={{ display: "none" }}
              >
                Tipo de equipo a revisar
              </option>
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

          <GridItem w="100%" h="5" color={"black"} colSpan={{ base: 1, md: 2 }}>
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

          <GridItem
            w="100%"
            h="10"
            color={"black"}
            colSpan={{ base: 1, md: 3 }}
          >
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
            colSpan={{ base: 1, md: 3 }}
            display="flex"
            justifyContent="center"
            marginTop={{ base: 20, md: 200 }} // More margin on mobile to push it down
            padding={{ base: 200, md: 0 }} // Add padding on mobile
          >
            <Button
              colorScheme="blue"
              size="lg"
              isDisabled={!isFormComplete}
              onClick={openDialog}
            >
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
