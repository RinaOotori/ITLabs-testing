import type {RootState} from '../../../../app/store/store.ts';
import './Header-ClientsCounter.css'
import './_type/Header-ClientsCounter_type_present.css'
import './_type/Header-ClientsCounter_type_absent.css'
import {useSelector} from "react-redux";

/* Компонент для вывода количества присутствующих и отсутствующих посетителей */
export function HeaderClientsCounter() {
    const stats = useSelector((state: RootState) => state.stats);
    return (
        <div className='Header-ClientsCounter'>
            <span>Посетители<br/>
                <span className='Header-ClientsCounter_type_present'>{stats.present}</span> / <span
                    className='Header-ClientsCounter_type_absent'>{stats.absent}</span></span>
        </div>
    )
}