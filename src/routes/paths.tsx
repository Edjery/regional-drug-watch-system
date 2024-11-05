import Dashboard from "../components/Dashboard";
import SuspectProfileManager from "../components/SuspectProfileManager";
import IPath from "./interface/IPath";

// add path here
export const paths: IPath[] = [
  { name: "Form", route: { path: "/", element: <Dashboard /> } },

  { name: "List", route: { path: "/list", element: <SuspectProfileManager /> } },

  // { name: "DisplayMarket", route: { path: "/displayMarket", element: <DisplayMarket /> } },
  // { name: "Settings", route: { path: "/settings", element: <Settings /> } },
];

export const debugPaths: IPath[] = [];
