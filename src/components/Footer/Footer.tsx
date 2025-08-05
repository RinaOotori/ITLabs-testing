import './Footer.css'
import FilterChooseButton from "./FilterChooseButton.tsx";
import {useDispatch, useSelector} from "react-redux";
import {setFilter} from "../../statsSlice.ts";
import type {RootState} from "../../store.ts";

function Footer() {
    const dispatch = useDispatch()
    const {searchQuery, presence} = useSelector((state: RootState) => state.stats.filter)

    function updateFilter(presence: string) {
        dispatch(setFilter({searchQuery: searchQuery, presence: presence}))
    }

    return (
        <footer>
            <span>Фильтровать по: </span>
            <FilterChooseButton tittle='Отсутствующим' onClick={() => {
                updateFilter('false')
            }} isActive={presence === 'false'}/>
            <FilterChooseButton tittle='Присутствующим' onClick={() => {
                updateFilter('true')
            }} isActive={presence === 'true'}/>
            <FilterChooseButton tittle='Без фильтра' onClick={() => {
                updateFilter('')
            }} isActive={presence === ''}/>
        </footer>
    )
}

export default Footer;