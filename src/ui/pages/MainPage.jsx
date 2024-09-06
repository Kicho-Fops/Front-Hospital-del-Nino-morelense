import { Grid } from "@chakra-ui/react";
import { useState, useEffect } from "react";



function MainPage() {

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
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', backgroundColor: '#0053B1' }}>

        <p>
         {time}
        </p>



    </Grid>
    </>
  );
}

export default MainPage;