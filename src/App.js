import React from 'react';

import {
  RouterProvider,
} from "react-router-dom";

import router from "./routeConfig";

function App() {
  return (
   <RouterProvider router={router} />
  );
}

export default App;
