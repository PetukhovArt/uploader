import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import { Upload } from "@/features/upload-page";
import { App } from "@/app/App.tsx";

export enum RouteNames {
  START_PAGE = "/",
  PAGE = "/page",
  UPLOAD = "/page/#access_token=:token",
  AUTH = "/page/*",
}

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={RouteNames.START_PAGE} element={<App />}>
      <Route path={RouteNames.PAGE} element={<Upload />} />
      <Route path={RouteNames.AUTH} element={<Upload />} />
      <Route path="*" element={<Navigate to={RouteNames.PAGE} />} />
    </Route>
  )
);
