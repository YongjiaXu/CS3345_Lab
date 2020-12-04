import React from 'react';
import { Link } from 'react-router-dom';

export const CitiesList = props => <table className="table table-striped">
<thead className="thead-dark">
    <tr>
        <th scope="col">City</th>
        <th scope="col">Country</th>
        <th scope="col">Num of Cases</th>
        <th scope="col">Num of Deaths</th>
        <th>&nbsp;</th>

    </tr>
</thead>
<tbody>
    {
        props.cities.map((city, i) => <tr key={i}>
            <td>
                <Link to={'/admin/'+ props.username + '/stats/city/edit/'+ city.City} className="text-align"> { city.City } </Link>
            </td>
            <td>{ city.Country } </td>
            <td> { city.CaseNum } </td>
            <td> { city.DeathNum } </td>
            <td className="text-center">
                <button type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={ () => props.onDelete(city.City)  }
                        >
                            delete
                </button>
            </td>

        </tr>)
    }
</tbody>
</table>