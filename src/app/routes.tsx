import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";

import { App } from "@/app/App.tsx";
import { Upload } from "@/features/upload-page";

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
      <Route path={RouteNames.UPLOAD} element={<Upload />} />
      <Route path={RouteNames.PAGE} element={<Upload />} />
    </Route>
  )
);
