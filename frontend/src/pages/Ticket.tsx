import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"
import { Spinner } from "../components/Spinner"
import { useEffect } from "react"
import { getTicket } from "../features/tickets/ticketSlice"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { BackButton } from "../components/BackButton"


export const Ticket = () => {
	const {ticket, isLoading, isSuccess, isError, message} = useSelector((state: RootState) => state.tickets)
	const dispatch = useDispatch()
	const {ticketId} = useParams()

	useEffect(() => {
		if(isError) {
			toast.error(message)
		}

		dispatch(getTicket(ticketId))
	}, [ticketId, dispatch, isError, message])

	if(isLoading) return <Spinner />
	if(isError) return <h3>Something went wrong</h3>

	return (
		<div className="ticket-page">
			<header className="ticekt-header">
				<BackButton url='/tickets' />
				<h2>
					Ticked ID: {ticket?._id}
					<span className={`status status-${ticket?.status}`}>
						{ticket?.status}
					</span>
				</h2>
				<h3>Date Submitted: {ticket?.createdAt && new Date(ticket?.createdAt).toLocaleString('en-US')}</h3>
				<hr />
				<div className="ticket-desc">
					<h3>Desctiption of Issue</h3>
					<p>{ticket?.description}</p>
				</div>
			</header>
		</div>
	)
}
