import './App.css'
import Layout from "./pages/Layout.tsx";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";

function App() {

  return (
    <>
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
            </Route>
        </Routes>

    </>
  )
}

export default App
