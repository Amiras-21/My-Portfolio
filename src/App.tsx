// import { lazy, Suspense } from "react";
// import "./App.css";

// const CharacterModel = lazy(() => import("./components/Character"));
// const MainContainer = lazy(() => import("./components/MainContainer"));
// import { LoadingProvider } from "./context/LoadingProvider";

// const App = () => {
//   return (
//     <>
//       <LoadingProvider>
//         <Suspense>
//           <MainContainer>
//             <Suspense>
//               <CharacterModel />
//             </Suspense>
//           </MainContainer>
//         </Suspense>
//       </LoadingProvider>
//     </>
//   );
// };

// export default App;

import { lazy, Suspense, useEffect } from "react";
import "./App.css";

const MainContainer = lazy(() => import("./components/MainContainer"));

import { LoadingProvider } from "./context/LoadingProvider";
import { initSmoothScroll } from "./components/utils/smoothScroll";

const App = () => {
  useEffect(() => {
    initSmoothScroll();
  }, []);

  return (
    <>
      <LoadingProvider>
        <Suspense fallback={null}>
          <MainContainer />
        </Suspense>
      </LoadingProvider>
    </>
  );
};

export default App;