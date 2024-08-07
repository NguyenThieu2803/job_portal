import {
    createBrowserRouter,
  } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import About from "../Pages/About";
import CreateJobs from "../Pages/CreateJobs";
import MyJobs from "../Pages/MyJobs";
import SalaryPage from "../Pages/SalaryPage";
import UpdateJob from "../Pages/UpdateJob";
import Login from "../Pages/Login";
import JobsDetail from "../Pages/JobsDetail";
import SignUp from "../Pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "post-job", element: <CreateJobs /> },
      { path: "my-job", element: <MyJobs /> },
      { path: "salary", element: <SalaryPage /> },
      {
        path: "edit-job/:id",
        element: <UpdateJob />,
        loader: ({ params }) => fetch(`http://localhost:3000/api/v1/jobs-get/${params.id}`)
      },
      {
        path: "/job-detail/:id",
        element: <JobsDetail />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path:"/signup",
    element:<SignUp/>,
  }
]);
  export default router;