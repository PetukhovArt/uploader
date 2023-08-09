import { Route, Routes, useLocation } from "react-router-dom";

import s from "./app.module.scss";
import { Upload } from "@/features/upload-page";
import { RouteNames } from "@/app/routes.tsx";
import { useEffect, useState } from "react";

export function App() {
  const location = useLocation();

  let urlToken = new URLSearchParams(location.hash).get("#access_token");

  const [token, setToken] = useState(urlToken);

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");

    if (token && !localStorageToken) {
      localStorage.setItem("token", token);
    }

    if (!token && localStorageToken) {
      setToken(localStorageToken);
    }
  }, [urlToken]);

  return (
    <div className={s.app}>
      <Routes>
        <Route
          path={RouteNames.START_PAGE}
          element={<Upload token={token} />}
        />
        <Route path={RouteNames.PAGE} element={<Upload token={token} />} />
        <Route path={RouteNames.REDIRECT} element={<Upload token={token} />} />
      </Routes>
    </div>
  );
}
