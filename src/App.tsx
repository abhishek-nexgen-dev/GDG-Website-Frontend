import { BrowserRouter } from "react-router";
import PublicRoutes from "./routes/PublicRoutes";
import InternalRoutes from "./routes/InternalRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <PublicRoutes />
        <InternalRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
