import React from 'react';
import { Link } from 'react-router-dom';

export const UsersList = props => <table className="table table-striped">
<thead className="thead-dark">
    <tr>
        <th scope="col">Username</th>
        <th scope="col">Password</th>
        <th scope="col">Country</th>
        <th scope="col">Permission</th>
        <th>&nbsp;</th>
    </tr>
</thead>
<tbody>
    {
        props.users.map((user,i) => <tr key={i}>
            <td> 
                <Link to={'/admin/'+ props.username + '/users/edit/'+ user.Username}>
                { user.Username } 
                </Link>
            </td>
            <td> { user.Password } </td>
            <td> { user.HomeCountry } </td>
            <td> { user.UserPerms==1 && 'admin' || user.UserPerms==0 && 'general user'} </td>
            <td className="text-center">
            <button type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={ () => props.onDelete(user.Username) }
                    >
                        delete
            </button>
        </td>
        </tr>)
    }
</tbody>
</table>
    
