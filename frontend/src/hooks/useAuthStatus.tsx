import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../store"

export const useAuthStatus = () => {
	const [loggedIn, setLoggedIn] = useState(false)
	const [checkingStatus, setCheckingStatus] = useState(true)

	const {user} = useSelector((state: RootState) => state.auth)

	useEffect(() => {
		setLoggedIn(!!user)
		setCheckingStatus(false)
	}, [user])

	return {loggedIn, checkingStatus}
}

