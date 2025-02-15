import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"
import { Spinner } from "../components/Spinner"
import { useEffect } from "react"
import { getTicket, closeTicket } from "../features/tickets/ticketSlice"
import { getNotes, reset as notesReset } from "../features/notes/noteSlice"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { BackButton } from "../components/BackButton"
import { Button } from "../components/Button"
import { NoteItem } from "../components/NoteItem"


export const Ticket = () => {
	const {ticket, isLoading, isSuccess, isError, message} = useSelector((state: RootState) => state.tickets)
	const {notes, isLoading: notesIsLoading} = useSelector((state: RootState) => state.notes)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const {ticketId} = useParams()

	// Close ticket
	const onTicketClose = () => {
		dispatch(closeTicket(ticketId))
		toast.success('Ticket closed')
		navigate('/tickets')
	}

	useEffect(() => {
		if(isError) {
			toast.error(message)
		}

		dispatch(getTicket(ticketId))
		dispatch(getNotes(ticketId))
	}, [ticketId, dispatch, isError, message])

	if(isLoading || notesIsLoading) return <Spinner />
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
				<h3>Product: {ticket?.product}</h3>
				<hr />
				<div className="ticket-desc">
					<h3>Desctiption of Issue</h3>
					<p>{ticket?.description}</p>
				</div>
				<h2>Notes</h2>
			</header>

			{notes.map((note) => (
				<NoteItem key={note._id} note={note} />
			))}

			{ticket?.status !== 'closed' && (
				<Button className="btn-block btn-danger" onClick={onTicketClose}>Close Ticket</Button>
			)}
		</div>
	)
}
