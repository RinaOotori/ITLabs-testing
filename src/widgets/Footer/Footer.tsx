import './Footer.css'
import FooterFilterChooseButton from "./-FilterCooseButton/Footer-FilterChooseButton.tsx";
import {useDispatch, useSelector} from "react-redux";
import {setFilter} from "../../app/store/statsSlice.ts";
import type {RootState} from "../../app/store/store.ts";

function Footer() {
    const dispatch = useDispatch()
    const {searchQuery, presence} = useSelector((state: RootState) => state.stats.filter)

    function updateFilter(presence: string) {
        dispatch(setFilter({searchQuery: searchQuery, presence: presence}))
    }

    return (
        <footer className='Footer'>
            <span>Фильтровать по: </span>
            <FooterFilterChooseButton tittle='Отсутствующим' onClick={() => {
                updateFilter('false')
            }} isActive={presence === 'false'}/>
            <FooterFilterChooseButton tittle='Присутствующим' onClick={() => {
                updateFilter('true')
            }} isActive={presence === 'true'}/>
            <FooterFilterChooseButton tittle='Без фильтра' onClick={() => {
                updateFilter('')
            }} isActive={presence === ''}/>
        </footer>
    )
}

export default Footer;