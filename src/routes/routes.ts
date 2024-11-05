import { DEBUG_MODE } from "../values/config";
import IPathList from "./interface/IPathList";
import { debugPaths, paths, } from "./paths";

export const pathList: IPathList[] = DEBUG_MODE
    ? [
        { name: "Main", paths: paths },
        { name: "Debug", paths: debugPaths },
    ]
    : [{ name: "Main", paths: paths }];

export const allPaths = pathList.flatMap((item) => item.paths);
export const allRoutes = allPaths.map((item) => item.route);
export const routes = [...allRoutes];   