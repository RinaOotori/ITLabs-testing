import { type IClient } from "../../../entities/client";
import './ClientsList.css'
import './-THead/ClientsList-THead.css'
import './-TBody/ClientsList-TBody.css'
import './_circle/ClientsList_circle_absent.css'
import './_circle/ClientsList_circle_present.css'
import './-THeadLine/ClientsList-THeadLine.css'
import './-TBodyLine/ClientsList-TBodyLine.css'
import './-Column/_colName/ClientsList-Column_colName_id.css'
import './-Column/_colName/ClientsList-Column_colName_present.css'
import './-Column/_colName/ClientsList-Column_colName_group.css'
import './-Column/_colName/ClientsList-Column_colName_company.css'
import './-Column/_colName/ClientsList-Column_colName_fullName.css'
import './ClientCard/-Present/ClientCard-Present.css'
import './ClientCard/ClientCard.css'
import './ClientCard/-GroupName/ClientCard-GroupName.css'
import classNames from "classnames";
import { useClients } from "../../../features/getClients";
import { useMediaQuery } from "react-responsive";

export function ClientsList({ onClick }: { onClick: (client: IClient) => void }) {
    const isMobile = useMediaQuery({ query: '(max-width: 1023px)' });
    const { clients } = useClients();

    const handleRowClick = (client: IClient) => {
        onClick(client);
    };

    const renderClient = (client: IClient) => {
        if (isMobile) {
            return (
                <div
                    key={client.id}
                    className="ClientCard"
                    onClick={() => handleRowClick(client)}
                >
                    <div className="ClientCard-Info">
                        <p><span className={'ClientCard-GroupName'}>Номер:</span> {client.id}</p>
                        <p><span className={'ClientCard-GroupName'}>ФИО:</span> {client.fullName}</p>
                        <p><span className={'ClientCard-GroupName'}>Компания:</span> {client.company}</p>
                        <p><span className={'ClientCard-GroupName'}>Группа:</span> {client.group}</p>
                    </div>
                    <div className="ClientCard-Present">
                        <div
                            className={
                                client.present
                                    ? 'ClientsList_circle_present'
                                    : 'ClientsList_circle_absent'
                            }
                        />
                    </div>
                </div>
            );
        }

        return (
            <tr
                key={client.id}
                className="ClientsList-TBodyLine"
                onClick={() => handleRowClick(client)}
            >
                <td>{client.id}</td>
                <td>{client.fullName}</td>
                <td>{client.company}</td>
                <td>{client.group}</td>
                <td>
                    <div
                        className={classNames({
                            'ClientsList_circle_present': client.present,
                            'ClientsList_circle_absent': !client.present,
                        })}
                    />
                </td>
            </tr>
        );
    };

    return isMobile ? (
        <div className="ClientsList-Mobile">{clients.map(renderClient)}</div>
    ) : (
        <table className="ClientsList">
            <colgroup>
                <col className="ClientsList-Column_colName_id" />
                <col className="ClientsList-Column_colName_fullName" />
                <col className="ClientsList-Column_colName_company" />
                <col className="ClientsList-Column_colName_group" />
                <col className="ClientsList-Column_colName_present" />
            </colgroup>
            <thead className="ClientsList-THead">
            <tr className="ClientsList-THeadLine">
                <th>Номер</th>
                <th>ФИО</th>
                <th>Компания</th>
                <th>Группа</th>
                <th>Присутствие</th>
            </tr>
            </thead>
            <tbody className="ClientsList-TBody">{clients.map(renderClient)}</tbody>
        </table>
    );
}
