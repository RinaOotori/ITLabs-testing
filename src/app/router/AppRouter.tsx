import {Outlet, Route, Routes} from "react-router-dom";
import {Home} from "../../pages/Home";
import {Header, HeaderMobile, HeaderTablet} from "../../widgets/Header";
import {Footer} from "../../widgets/Footer";
import {useMediaQuery} from "react-responsive";

export function AppRouter() {
    const isTablet = useMediaQuery({query: '(min-width: 431px) and (max-width: 1024px)'})
    const isMobile = useMediaQuery({query: '(max-width: 430px)'})
    return (
        <>
            <Routes>
                <Route path='/' element={<>
                    <div className='Content'>
                        {isTablet ? <HeaderTablet /> : isMobile ? <HeaderMobile /> : <Header/>}
                        <Outlet/>
                    </div>
                    <Footer/>
                </>}>
                    <Route index element={<Home/>}/>
                </Route>
            </Routes>
        </>
    )
}