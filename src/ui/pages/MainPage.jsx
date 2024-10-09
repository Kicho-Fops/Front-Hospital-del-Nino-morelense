import { Grid, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import QuestionForm from "../components/QuestionForm";
// import Logo from "../../assets/hnm_muestra.png";

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
        alignItems="center" // This aligns the items (text and image) on the same level
        style={{ minHeight: "5vh" }}
        templateRows="repeat(1, 1fr)"
      >
        {/* <GridItem w="100%" h="0" color={"black"} colSpan={{ base: 1, md: 1 }} marginStart={20}>
          <Image src={Logo} h={50} w={70} />
        </GridItem> */}


        <Text color="black" style={{ textAlign: "center" }} fontSize="4xl" mt="30px">
          Sistema de levantamiento de tickets
        </Text>
      </Grid>

      <QuestionForm />
    </>
  );
}

export default MainPage;
