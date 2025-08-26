import type {RootState} from '../../../../app/store/store.ts';
import './ClientsCounter.css'
import './_type/ClientsCounter_type_present.css'
import './_type/ClientsCounter_type_absent.css'
import {useSelector} from "react-redux";
import {useMediaQuery} from "react-responsive";

/* Компонент для вывода количества присутствующих и отсутствующих посетителей */
export function ClientsCounter({classNames}: {classNames?: string}) {
    const isMobile = useMediaQuery({query: '(max-width: 420px)'})
    const { present, absent } = useSelector((state: RootState) => ({
        present: state.stats.present,
        absent: state.stats.absent,
    }));

    return (
        <div className={`ClientsCounter ${classNames}`}>
      <span>
        Посетители
          {isMobile ? <>{' '}</> : <br />}
        <span className="ClientsCounter_type_present">{present}</span> /{' '}
          <span className="ClientsCounter_type_absent">{absent}</span>
      </span>
        </div>
    );
}