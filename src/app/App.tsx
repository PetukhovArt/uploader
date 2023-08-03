import { Route, Routes } from "react-router-dom";

import s from "./app.module.scss";
import { Upload } from "@/features/upload-page";
import { RouteNames } from "@/app/routes.tsx";

export function App() {
  return (
    <div className={s.app}>
      <Routes>
        <Route path={RouteNames.START_PAGE} element={<Upload />} />
        <Route path={RouteNames.PAGE} element={<Upload />} />
        <Route path={RouteNames.REDIRECT} element={<Upload />} />
      </Routes>
    </div>
  );
}
