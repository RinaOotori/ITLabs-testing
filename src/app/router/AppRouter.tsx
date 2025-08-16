import { Outlet, Route, Routes } from "react-router-dom";
import { Home } from "../../pages/Home";
import { Header } from "../../widgets/Header";
import Footer from "../../widgets/Footer/Footer.tsx";

export function AppRouter() {
    return (
        <>
            <Routes>
                <Route path='/' element={    <>
                    <Header />
                    <Outlet />
                    <Footer />
                </>}>
                    <Route index element={<Home/>}/>
                </Route>
            </Routes>
        </>
    )
}