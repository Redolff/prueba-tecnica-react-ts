import './ListOfUsers.css'
import { type User } from "../types"

interface Props {
    users: User[],
    showColors: boolean,
    deleteUser: (email: string) => void,
}

export const ListOfUsers = ( {users, showColors, deleteUser}: Props ) => {
    return (
        <>
            <table width={'100%'}>
                <thead>
                    <tr>
                        <th> Foto </th>
                        <th> Nombre </th>
                        <th> Apellido </th>
                        <th> Pais </th>
                        <th> Acciones </th>
                    </tr>
                </thead>

                <tbody className={showColors ? 'table-showColors' : 'table'}>
                {users.map(user => {
                    return (
                        <tr key={user.email}>
                            <td> <img src={user.picture.thumbnail} alt="img-user" /> </td>
                            <td> {user.name.first} </td>
                            <td> {user.name.last} </td>
                            <td> {user.location.country} </td>
                            <td> <button className='table-btn' onClick={() => deleteUser(user.email)}> Borrar </button> </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </>
    )
}