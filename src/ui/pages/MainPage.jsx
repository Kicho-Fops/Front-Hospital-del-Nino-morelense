import { Grid, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import QuestionForm from "../components/QuestionForm";
import Logo from "../../assets/hnm_muestra.png";
import { Image, GridItem } from "@chakra-ui/react";
function MainPage() {
  // eslint-disable-next-line no-unused-vars
  const [time, setTime] = useState("");

  useEffect(() => {
    // Running side-effect when component mounted (componentDidMount)
    const myInterval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, [1000]);

    // Clear side-effect when component unmount (componentWillUnmount)
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <>
      <Grid
        container
        alignItems="center" // Align items vertically centered
        justifyContent="center" // Distribute the image and text accordingly
        style={{ minHeight: "5vh" }}
        templateColumns="repeat(1, 1fr)"
      >
        {/* Image on the left */}
        <GridItem
          w="10%"
          h="auto"
          color="black"
          colSpan={{ base: 1, md: 1 }}
          display="flex"
          justifyContent="left" // Align the image to the left
          alignItems={"left"} // Align the image vertically centered
        >
          <Image src={Logo} h={50} w={70} />
        </GridItem>

        {/* Text in the center */}
        <GridItem
          w="90%"
          h="auto"
          color="black"
          colSpan={{ base: 1, md: 1 }}
          display="flex"
          justifyContent="center" // Center the text horizontally
          alignContent={"center"} // Center the text verticallyq
          alignItems={"center"} // Center the text verticallyq
        >
          <Text color="black" textAlign="center" fontSize="4xl">
            Sistema de levantamiento de tickets
          </Text>
        </GridItem>
      </Grid>

      <QuestionForm />
    </>
  );
}

export default MainPage;