import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";

import { App } from "@/app/App.tsx";
import { Page } from "@/features/page_name/page";

export enum RouteNames {
  START_PAGE = "/",
  PAGE = "/page",
  UPLOAD = "/page/#access_token=:token",
}

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={RouteNames.START_PAGE} element={<App />}>
      <Route
        path={RouteNames.START_PAGE}
        element={<Navigate to={RouteNames.PAGE} />}
      />
      <Route path={RouteNames.UPLOAD} element={<Page />} />
      <Route path={RouteNames.PAGE} element={<Page />} />
    </Route>
  )
);
