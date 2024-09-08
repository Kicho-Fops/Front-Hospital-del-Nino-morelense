import { Grid } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import QuestionForm from "../components/QuestionForm";



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
        }
      })

    

    return (


    <>
    <Grid container style={{ minHeight: '100vh' }}>

        {/* <p>
         {time}
        </p> */}

        <QuestionForm />



    </Grid>
    </>
  );
}

export default MainPage;