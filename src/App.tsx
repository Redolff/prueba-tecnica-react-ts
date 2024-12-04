import { useEffect, useMemo, useRef, useState } from "react"
import { ListOfUsers } from "./components/ListOfUsers"
import { SortBy, type User } from './types.d'

export default function App() {
    const [users, setUsers] = useState<User[]>([])
    const [showColors, setShowColors] = useState<boolean>(false)
    const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
    const [filterCountry, setFilterCountry] = useState<string|null>(null)

    const originalUsers = useRef<User[]>([])

    useEffect(() => {
        const fetchingData = async() => {
            const API = 'https://randomuser.me/api/?results=100'
            try{
                const response = await fetch(API)
                if(!response.ok){
                    throw new Error('Error fetching data')
                }
                const data = await response.json()
                originalUsers.current = data.results
                setUsers(data.results)
            }
            catch(error){
                console.error("Error: ", error)
            }
        }
        fetchingData()
    }, [])

    const toggleColors = () => {
        setShowColors(!showColors)
    }

    const toggleSortByCountry = () => {
        const newSorting = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
        setSorting(newSorting)
    }

    const handleChangeSort = (sort: SortBy) => {
        setSorting(sort)
    }
    
    const deleteUser = (email: string) => {
        const filteredUsers = users.filter((user) => user.email !== email)
        setUsers(filteredUsers)
    }

    const handleReset = () => {
       setUsers(originalUsers.current)
    }

    const handleChangeCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterCountry(e.target.value)
    }

    const filteredUsers = useMemo(() => {
        return filterCountry !== null && filterCountry.length > 0
            ? users.filter((user) => {
                return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
            })
            : users
    }, [users, filterCountry])

    const sortedUsers = useMemo(() => {        
        if(sorting === SortBy.COUNTRY) {
            return filteredUsers.toSorted(
                (a, b) => a.location.country.localeCompare(b.location.country)
            )
        }

        if(sorting === SortBy.NAME) {
            return filteredUsers.toSorted(
                (a, b) => a.name.first.localeCompare(b.name.first)
            )
        }

        if(sorting === SortBy.LAST) {
            return filteredUsers.toSorted(
                (a, b) => a.name.last.localeCompare(b.name.last)
            )
        }

        return filteredUsers

    }, [filteredUsers, sorting])


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
                <ListOfUsers 
                    users={sortedUsers} 
                    showColors={showColors} 
                    deleteUser={deleteUser}
                    handleChangeSort={handleChangeSort}
                />
            </main>
        </>
    )
}