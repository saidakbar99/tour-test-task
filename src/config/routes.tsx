import { ISwitchItem } from "react-declarative";

import UsersListPage from "../pages/UsersListPage";
import UserPage from "../pages/UserPage";

import ErrorPage from "../pages/ErrorPage";

interface IRouteItem extends ISwitchItem {
  sideMenu: string;
}

export const routes: IRouteItem[] = [
  {
    path: "/",
    sideMenu: "root.example_pages.users",
    redirect: "/users",
  },
  {
    path: "/users",
    sideMenu: "root.example_pages.users",
    element: UsersListPage,
  },
  {
    path: "/users/:id",
    sideMenu: "root.example_pages.users",
    element: UserPage,
  },
  {
    path: "/error-page",
    sideMenu: "",
    element: ErrorPage,
  },
  {
    path: "/unauthorized-page",
    sideMenu: "",
    element: ErrorPage,
  },
];

export const sideMenuClickMap: Record<string, string> = {
  "root.example_pages.users": "/users",
};

export default routes;
