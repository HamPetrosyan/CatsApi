import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "./store/hooks";

import Main from "./pages/Main";
import { Header } from "./components/Header/Header";
import { Menu } from "./components/Menu/Menu";
import { Loader } from "./components/Loader/Loader";

const Category = lazy(() => import("./pages/Category"));

function App() {
  const isActive = useAppSelector((state) => state.cats.isActive);

  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <div className="content">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/:category" element={<Category />} />
          </Routes>
        </div>
      </Suspense>
      {isActive && <Menu />}
    </>
  );
}

export default App;
