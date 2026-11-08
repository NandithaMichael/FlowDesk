import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

function TicketDetails({ tickets, setTickets }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const ticket = tickets.find((item) => item.id === id)

  if (!ticket) {
    return <h2>Ticket not found</h2>
  }

  const updateStatus = (newStatus) => {
    setTickets((previousTickets) =>
      previousTickets.map((item) =>
        item.id === id
          ? { ...item, status: newStatus }
          : item
      )
    )
  }

  return (
    <div className="ticket-details">
      <button onClick={() => navigate(-1)}>
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <h1>Ticket Details</h1>

      <div className="details-card">
        <h2>{ticket.subject}</h2>

        <p><strong>Ticket ID:</strong> {ticket.id}</p>
        <p><strong>Customer:</strong> {ticket.customer}</p>
        <p><strong>Priority:</strong> {ticket.priority}</p>

        <label>Status</label>

        <select
          value={ticket.status}
          onChange={(e) => updateStatus(e.target.value)}
        >
          <option value="Open">Open</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>
    </div>
  )
}

export default TicketDetails