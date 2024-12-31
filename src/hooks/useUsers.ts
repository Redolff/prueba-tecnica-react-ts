import { useEffect, useRef, useState } from "react"
import { User } from "../types"

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const originalUsers = useRef<User[]>([])

    useEffect(() => {
        const fetchingData = async () => {
            setLoading(true)
            const API = `https://randomuser.me/api/?results=10&seed=redolff&page=${currentPage}`
            try {
                const response = await fetch(API)
                if (!response.ok) {
                    setError(true)
                    throw new Error('Error fetching data')
                }
                const data = await response.json()
                setUsers(prevUsers => {
                    const newUsers = data.results.filter((newUser: { email: string }) => !prevUsers.some(user => user.email === newUser.email));
                    originalUsers.current = newUsers
                    return prevUsers.concat(newUsers)
                });
            }
            catch (error) {
                console.error("Error: ", error)
                setError(true)
            }
            finally {
                setLoading(false)
                setError(false)
            }
        }
        fetchingData()
    }, [currentPage])

    const deleteUser = (email: string) => {
        const filteredUsers = users.filter((user) => user.email !== email)
        setUsers(filteredUsers)
    }

    const handleReset = () => {
        setUsers(originalUsers.current)
    }

    const handlePage = () => {
        setCurrentPage(currentPage + 1)
    }

    return {
        users,
        loading,
        error,
        deleteUser,
        handleReset,
        handlePage
    }
}