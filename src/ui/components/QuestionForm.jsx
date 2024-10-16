import {
  Box,
  Grid,
  GridItem,
  Input,
  Text,
  Textarea,
  Button,
  useToast,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  List,
  ListItem,
  Icon, // Importamos useToast
} from "@chakra-ui/react";
import { useState } from "react";
import CustomTextBox from "./CustomTextBox";
import {
  useConfirmationDialog,
  ConfirmationDialog,
} from "./ConfirmationDialog"; // Importamos ambos
import CustomSelect from "./CustomSelect";
import CustomSearch from "./CustomSearch";
import { LISTA_COMBINADA } from "../providers/listProvider";
import { SearchIcon } from "@chakra-ui/icons";

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

  // Function to reset the form
  const resetForm = () => {
    setFormData({
      quienReporta: "",
      areaReporte: "",
      extension: "",
      tipoEquipo: "",
      descripcionEquipo: "",
      motivoReporte: "",
    });
    setSearchTerm(""); 
    setFilteredList([]); 
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  // Function to handle search in real-time
  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value === "") {
      setFilteredList([]); // Clear the list when search box is empty
    } else {
      // Filter LISTA_COMBINADA based on the search term
      const filteredItems = LISTA_COMBINADA.filter((item) =>
        item.text.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredList(filteredItems);
      const [area, extension] = filteredItems[0].value.split(" - "); // Separate into area and extension
      setFormData((prevData) => ({
        ...prevData,
        areaReporte: area, // Store the area
        extension: extension, // Store the extension
      }));
    }
  };

  const handleNormalInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleItemSelect = (item) => {
    console.log(item); // Handle item selection, like setting form values or other logic
    setSearchTerm(item.text); // Set search term to selected item's text
    setFilteredList([]); // Clear the list after selection
  };


  // Función para confirmar y enviar el formulario
  const handleConfirm = () => {
    console.log("El formulario ha sido enviado!");

    console.log(formData);

    
    fetch(
      `http://hosp-nino.servidoreselruso.com:8080/api/ticket/public/create`,
      {
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
          pcdate: new Date().toISOString(),
        }),
      }
    )
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
          position: "top",
          containerStyle: {
            marginTop: "300px", // Ajusta el margen superior con px
          },
        });

        resetForm();

      })
      .catch(() => {
        // Handle errors if the request fails
        toast({
          title: "Error de envio",
          description: "El reporte ha tenido un error.",
          duration: 10000, // Duración en milisegundos
          isClosable: false,
          position: "top",
          containerStyle: {
            marginTop: "300px", // Ajusta el margen superior con px
          },
        });
      });

    // Mostramos una notificación de éxito después de enviar el formulario

    closeDialog();
  };

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  const handleSelectChangeComputer = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      tipoEquipo: value,
      descripcionEquipo: value !== "Otro" ? "" : prevData.descripcionEquipo,
    }));
  };



  const handleSearchChangeArea = (event) => {
    const { value } = event.target.value; // This is the selected position
    console.log(value);

    setSelectedValue(value); // Update the selected value

    // Find the corresponding value based on selected text
    const foundItem = LISTA_COMBINADA.find((item) => item.text === value);

    console.log(foundItem);

    // If found, extract the number and update formData
    if (foundItem) {
      const [area, extension] = foundItem.value.split(" - "); // Separate into area and extension
      setFormData((prevData) => ({
        ...prevData,
        areaReporte: area, // Store the area
        extension: extension, // Store the extension
      }));
    } else {
      // Optionally handle the case where the item is not found
      setFormData((prevData) => ({
        ...prevData,
        selectedValue: "", // Clear the value if not found
      }));
    }
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
        marginTop="20px"
      >
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(3, 2fr)" }} // Stack items in 1 column on mobile, grid with 3 columns on larger screens
          templateRows="repeat(1, 1fr)"
          gap={{ base: 20, md: 150 }} // Adjust gap for mobile and larger screens
          
        >
          <GridItem w="100%" h="0" color={"black"} colSpan={{ base: 1, md: 1 }} zIndex="1000">
            <CustomTextBox
              title="Quien reporta"
              example="Ejemplo: Sergio"
              required={true}
              name="quienReporta"
              value={formData.quienReporta}
              onChange={handleNormalInputChange}
            />
          </GridItem>

          <GridItem
        w="100%"
        h="0"
        color={"black"}
        colSpan={{ base: 1, md: 2 }}
        marginTop={{ base: 10, md: 10 }}
      >
        <InputGroup>
          <Input
            type="text"
            placeholder="Área de reporte"
            variant="filled"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <InputRightAddon p={5} border="none">
            <SearchIcon />
          </InputRightAddon>
        </InputGroup>
        
      

      {/* Display filtered results */}
      {filteredList.length > 0 && (
        <Box bg="white" borderRadius="md" boxShadow="sm" mt={2} maxH="105px" overflowY="auto">
          <List>
            {filteredList.map((item, index) => (
              <ListItem
                key={index}
                p={2}
                borderBottom="1px solid #e2e8f0"
                cursor="pointer"
                onClick={() => handleItemSelect(item)}
                zIndex={5}
              >
                <Text>{item.text}</Text>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
      </GridItem>

          <GridItem w="100%" h="1" color={"black"} colSpan={{ base: 1, md: 1 }} marginTop={{ base: 20, md: 0 }}>
            <CustomSelect
              placeholder={"Tipo de equipo a revisar"}
              variant={"filled"}
              value={formData.tipoEquipo}
              onChange={handleSelectChangeComputer}
              options={[
                { value: "PC", text: "PC" },
                { value: "PC/Todo en uno", text: "PC/Todo en uno" },
                { value: "Laptop", text: "Laptop" },
                { value: "Terminal", text: "Terminal" },
                { value: "Impresora", text: "Impresora" },
                { value: "Escáner", text: "Escáner" },
                { value: "Multifuncional", text: "Multifuncional" },
                { value: "Otro", text: "Otro" },
              ]}
            />
          </GridItem>

          <GridItem
            w="100%"
            h="20"
            color={"black"}
            colSpan={{ base: 1, md: 2 }}
            zIndex={1}
          >
            <Input
              placeholder='Opción hábil cuando se selecciona "Otro"'
              variant="filled"
              marginTop={2}
              name="descripcionEquipo"
              value={formData.descripcionEquipo}
              isDisabled={formData.tipoEquipo !== "Otro"}
              onChange={handleNormalInputChange}
              
            />
          </GridItem>

          <GridItem
            w="100%"
            h="10"
            color={"black"}
            colSpan={{ base: 1, md: 3 }}
            mt="-20"
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
              onChange={handleNormalInputChange}
            />
          </GridItem>

          <GridItem
            w="100%"
            h="10"
            color={"black"}
            colSpan={{ base: 1, md: 3 }}
            display="flex"
            justifyContent="center"
            marginTop={{ base: 49, md: 42 }} // More margin on mobile to push it down
            padding={{ base: 150, md: 100 }} // Add padding on mobile
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
