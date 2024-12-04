import { useEffect, useMemo, useRef, useState } from "react"
import { ListOfUsers } from "./components/ListOfUsers"
import { User } from './types'

export default function App() {
    const [users, setUsers] = useState<User[]>([])
    const [showColors, setShowColors] = useState<boolean>(false)
    const [sortCountry, setSortCountry] = useState<boolean>(false)
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
        setSortCountry(!sortCountry)
    }
    
    const deleteUser = (email: string) => {
        const filteredUsers = users.filter((user) => user.email !== email)
        setUsers(filteredUsers)
    }

    const handleReset = () => {
       setUsers(originalUsers.current)
    }

    const filteredUsers = useMemo(() => {
        console.log('calculated filteredUsers')
        return filterCountry !== null && filterCountry.length > 0
            ? users.filter((user) => {
                return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
            })
            : users
    }, [users, filterCountry])

    const sortedUsers = useMemo(() => {
        console.log('calculated sortedUsers')

        return sortCountry 
            ? filteredUsers.toSorted((a, b) => {
                return a.location.country.localeCompare(b.location.country)  
            })
            : filteredUsers
    }, [filteredUsers, sortCountry])


    return (    
        <>
            <h1> Prueba Tecnica - React y TypeScript </h1>
            <nav>
                <button onClick={() => toggleColors()}> Colorear filas </button>
                <button onClick={() => toggleSortByCountry()}> {sortCountry ? 'No ordenar por pais' : 'Ordenar por pais'} </button>
                <button onClick={() => handleReset()}> Resetear estado </button>
                <input 
                    type="text" 
                    placeholder="Filtrar por pais"
                    onChange={(e) => {
                        setFilterCountry(e.target.value)
                    }}  
                />
            </nav>

            <main>
                <ListOfUsers 
                    users={sortedUsers} 
                    showColors={showColors} 
                    deleteUser={deleteUser}
                />
            </main>
        </>
    )
}