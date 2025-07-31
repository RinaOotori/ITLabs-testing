import type { RootState } from '../../store';
import './ClientsCounter.css'
import {useSelector} from "react-redux";

export default function ClientsCounter() {
    const stats = useSelector((state: RootState) => state.stats);
    return (
        <div id='clients_counter'>
            <span>Посетители<br/><span id='present'>{stats.present}</span> / <span
                id='absent'>{stats.absent}</span></span>
        </div>
    )
}