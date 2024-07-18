import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "../pages/Home";
import Detail from "../pages/Detail";
import Login from "../pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/detail/:restaurantId",
    element: <Detail />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
