import './Footer.css'
import './-Content/Footer-Content.css'
import './-Buttons/Footer-Buttons.css'
import './-Title/Footer-Title.css'
import FooterFilterChooseButton from "./-FilterChooseButton/Footer-FilterChooseButton.tsx";
import {useDispatch, useSelector} from "react-redux";
import {setFilter} from "../../../../app/store/statsSlice.ts";
import type {RootState} from "../../../../app/store/store.ts";

export function Footer() {
    const dispatch = useDispatch()
    const {searchQuery, presence} = useSelector((state: RootState) => state.stats.filter)

    function updateFilter(presence: string) {
        dispatch(setFilter({searchQuery: searchQuery, presence: presence}))
    }

    return (
        <footer className='Footer'>
            <div className='Footer-Content'>
                <span className={'Footer-Title'}>Фильтровать по: </span>
                <div className={'Footer-Buttons'}>
                    <FooterFilterChooseButton tittle='Отсутствующим' onClick={() => {
                        updateFilter('false')
                    }} isActive={presence === 'false'}/>
                    <FooterFilterChooseButton tittle='Присутствующим' onClick={() => {
                        updateFilter('true')
                    }} isActive={presence === 'true'}/>
                    <FooterFilterChooseButton tittle='Без фильтра' onClick={() => {
                        updateFilter('')
                    }} isActive={presence === ''}/>
                </div>
            </div>
        </footer>
    )
}