import './ListOfUsers.css'
import { SortBy, type User } from "../types.d"

interface Props {
    users: User[],
    showColors: boolean,
    deleteUser: (email: string) => void,
    handleChangeSort: (sort: SortBy) => void,
}

export const ListOfUsers = ( {users, showColors, deleteUser, handleChangeSort}: Props ) => {
    return (
        <>
            <table width={'100%'}>
                <thead>
                    <tr>
                        <th> Foto </th>
                        <th style={{ cursor: 'pointer' }} onClick={() => handleChangeSort(SortBy.NAME)}> Nombre </th>
                        <th style={{ cursor: 'pointer' }} onClick={() => handleChangeSort(SortBy.LAST)}> Apellido </th>
                        <th style={{ cursor: 'pointer' }} onClick={() => handleChangeSort(SortBy.COUNTRY)}> Pais </th>
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