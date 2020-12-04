import React from 'react';
import { Link } from 'react-router-dom';

export const CountriesList = props => <table className="table table-striped">
<thead className="thead-dark">
    <tr>
        <th scope="col">Country</th>
        <th scope="col">Population</th>
        <th scope="col">Num of Cases</th>
        <th scope="col">Num of Deaths</th>
        <th scope="col">Alert Level</th>
        <th scope="col">Alert Desc</th>
        <th> Disabled </th>
        <th>&nbsp;</th>

    </tr>
</thead>
<tbody>
    {
        props.countries.map((country, i) => <tr key={i}>
            <td>
                <Link to={'/admin/'+ props.username + '/stats/country/edit/'+ country.Name} className="text-align"> { country.Name } </Link>
            </td>
            <td> { country.Population.toLocaleString() } </td>
            <td> { country.CaseNum.toLocaleString() } </td>
            <td> { country.DeathNum.toLocaleString() } </td>
            <td> { country.AlertLevel } </td>
            <td> { country.AlertDesc } </td>
            <td className="text-center"> <input type="checkbox" 
                        id="disabled"
                        name="disabled"
                        defaultChecked={country.disabledStatus}
                        onClick={e => props.onDisable(e.target.checked, country.Name)}
                        /> </td>
            <td className="text-center">
                <button type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={ () => props.onDelete(country.Name) }
                        >
                            delete
                </button>
            </td>

        </tr>)
    }
</tbody>
</table>