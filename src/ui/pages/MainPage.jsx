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
        justifyContent="center" // Align items horizontally centered
        style={{ minHeight: "5vh" }}
        templateRows="repeat(1, 1fr)"
      >
        <GridItem
          w="100%"
          h="0"
          color="black"
          colSpan={{ base: 1, md: 1 }}
          display="flex"
          justifyContent="center" // Center the image horizontally
        >
          <Image src={Logo} h={50} w={70} />
        </GridItem>

        <GridItem marginTop={50}>
        <Text color="black" textAlign="center" fontSize="4xl" >
          Sistema de levantamiento de tickets
        </Text>
        </GridItem>
      </Grid>

      <QuestionForm />
    </>
  );
}

export default MainPage;
