import EmpListing from "../components/EmpListing";
import EmpForm from "../components/EmpForm";
import EmpDetails from "../components/EmpDetails";
import NotFound from "../components/NotFound";

const routesConfig = [
    {
        path: "/",
        element: <EmpListing/>,
    },

    
    {
        path: "/employeeForm/:empid",
        element: <EmpForm/>,
    },

    {
        path: "/employee/details/:empid",
        element: <EmpDetails/>,
    },
    
    {
        path:'*',
        element: <NotFound/>,
    },
    ];
    
    export default routesConfig;
    