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
  AUTH = "/#access_token=:token",
}

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={RouteNames.START_PAGE} element={<App />}>
      <Route
        path={RouteNames.START_PAGE}
        element={<Navigate to={RouteNames.PAGE} />}
      />
      <Route path="*" element={<Navigate to={RouteNames.PAGE} />} />
      <Route path={RouteNames.AUTH} element={<Upload />} />
    </Route>
  )
);
// https://uploader-woad.vercel.app/#access_token=y0_AgAAAAARkGX-AApHKwAAAADpPLOCWwLmgGXxQLOU54569cATwOLgrQU&token_type=bearer&expires_in=31441864
