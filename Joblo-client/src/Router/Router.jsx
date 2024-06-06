import {
    createBrowserRouter,
  } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import About from "../Pages/About";
import CreateJobs from "../Pages/CreateJobs";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[
        {path:"/", element: <Home/>},                                           
        {path:"/about", element: <About/>},
        {path:"/post-job", element: <CreateJobs/>}
      ],
    },
  ]);
  export default router;