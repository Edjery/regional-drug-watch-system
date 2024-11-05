import { allPaths } from "./routes";

export const getUrl = (name: string) => {
    const path = allPaths.find((item) => item.name === name);
    return path?.route.path ? path.route.path : "/";
};