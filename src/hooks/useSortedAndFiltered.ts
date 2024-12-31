import { useMemo, useState } from "react"
import { SortBy, type User } from "../types.d"

export const useSortedAndFiltered = ({ users }: {users: User[]}) => {
    const [showColors, setShowColors] = useState<boolean>(false)
    const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
    const [filterCountry, setFilterCountry] = useState<string | null>(null)
    
    const toggleColors = () => {
        setShowColors(!showColors)
    }

    const toggleSortByCountry = () => {
        const newSorting = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
        setSorting(newSorting)
    }   

    const handleChangeSort = (sort: SortBy) => {
        setSorting(sort)
    }

    const handleChangeCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterCountry(e.target.value)
    }

    const filteredUsers = useMemo(() => {
        return filterCountry !== null && filterCountry.length > 0
            ?  users.filter((user: User) => {
                return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
            }) 
            :  users
    }, [users, filterCountry])
    
    const sortedUsers = useMemo(() => {
        if(sorting === SortBy.COUNTRY) {
            return filteredUsers.toSorted(
                (a: User, b: User) => a.location.country.localeCompare(b.location.country))
        }

        if(sorting === SortBy.NAME) {
            return filteredUsers.toSorted(
                (a: User, b: User) => a.name.first.localeCompare(b.name.first))
        }

        if (sorting === SortBy.LAST) {
            return filteredUsers.toSorted(
                (a: User, b: User) => a.name.last.localeCompare(b.name.last)
            )
        }

        return filteredUsers
    }, [filteredUsers, sorting])

    return {
        sorting,
        showColors,
        toggleColors,
        toggleSortByCountry,
        handleChangeSort,
        handleChangeCountry,
        filteredUsers,
        sortedUsers
    }
}