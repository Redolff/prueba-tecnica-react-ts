import { ListOfUsers } from "./components/ListOfUsers"
import { SortBy } from './types.d'
import { useUsers } from "./hooks/useUsers"
import { useSortedAndFiltered } from "./hooks/useSortedAndFiltered"

export default function App() {
    const { users, loading, error, deleteUser, handleReset, handlePage } = useUsers()
    const { sorting, showColors, toggleColors,
        toggleSortByCountry, handleChangeSort, 
        handleChangeCountry, sortedUsers } = useSortedAndFiltered({ users })


    return (
        <>
            <h1> Prueba Tecnica - React y TypeScript </h1>
            <nav>
                <button onClick={() => toggleColors()}>
                    Colorear filas
                </button>
                <button onClick={() => toggleSortByCountry()}>
                    {sorting === SortBy.COUNTRY ? 'No ordenar por pais' : 'Ordenar por pais'}
                </button>
                <button onClick={() => handleReset()}>
                    Resetear estado
                </button>
                <input
                    type="text"
                    placeholder="Filtrar por pais"
                    onChange={(e) => handleChangeCountry(e)}
                />
            </nav>

            <main>
                {users.length > 0 && 
                    <div>
                        <ListOfUsers
                            users={sortedUsers}
                            showColors={showColors}
                            deleteUser={deleteUser}
                            handleChangeSort={handleChangeSort}
                        />
                        <button onClick={() => handlePage()}> Mostrar mas resultados </button>
                    </div>
                }
                {loading &&  <strong> Cargando... </strong>}
                {!loading && error && <p> Ha habido un error. </p>}
                {!loading && !error && users.length === 0 && <p> No hay usuarios. </p>}
            </main>


        </>
    )
}