import { useRoutes } from "react-router-dom";
import routesConfig from "./routes-config";


const RouteRender = ()=> {

    const routes = useRoutes(routesConfig);

    return routes;


}

export default RouteRender;