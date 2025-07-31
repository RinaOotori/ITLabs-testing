import './Header.css'
import SearchBar from "./SearchBar.tsx";
import ClientsCounter from "./ClientsCounter.tsx";
export default function Header(){
    return (
        <header>
            <img src='../../../public/logo.svg' alt="Логотип" className='logo'/>
            <SearchBar />
            <ClientsCounter />
        </header>
    )
}