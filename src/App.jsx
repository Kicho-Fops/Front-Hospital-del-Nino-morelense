import { RouterProvider } from "react-router-dom";
import AppRouter from "./ui/pages/router.jsx";

function App() {
  return (
      <RouterProvider router={AppRouter} />
  );
}

export default App;