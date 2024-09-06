import { createBrowserRouter } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { Navigate } from 'react-router-dom'; // Import Navigate for redirection



function DummyPage() { 
  return (
    <iframe
      width="560"
      height="315"
      src="https://www.youtube-nocookie.com/embed/PH6jE5W_vAg?si=tD6XFC5ZN7uE6Khu&amp;controls=0"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  );
}

const AppRouter = createBrowserRouter([
  {
    path: "/", 
    element: <DummyPage />,
    children: [
      {
        index: true, 
        element: <DummyPage />,
      },
      {
        path: "hola",
        element: <DummyPage />,
      },
    ],
  },
]);

export default AppRouter;