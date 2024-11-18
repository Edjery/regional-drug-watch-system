import Dashboard from "../components/Dashboard";
import List from "../components/List";
import IPath from "./interface/IPath";

// add path here
export const paths: IPath[] = [
  { name: "Form", route: { path: "/", element: <Dashboard /> } },
  { name: "List", route: { path: "/list", element: <List /> } },
];

export const debugPaths: IPath[] = [];
