import { Users, Mail, Ticket } from 'lucide-react'

function Customers({ tickets }) {
  const customers = [...new Set(
    tickets.map((ticket) => ticket.customer)
  )]

  return (
    <div className="dashboard">
      <div className="welcome-section">
        <div>
          <p className="eyebrow">CUSTOMER MANAGEMENT</p>
          <h1>Customers</h1>
          <p className="subtitle">
            Manage your customer relationships.
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <article className="stat-card">
          <div className="stat-icon blue">
            <Users size={21} />
          </div>
          <p>Total Customers</p>
          <h2>{customers.length}</h2>
        </article>
      </div>

      <section className="tickets-section">
        <h2>Customer Directory</h2>

        <div className="customer-grid">
          {customers.map((customer) => {
            const customerTickets = tickets.filter(
              (ticket) => ticket.customer === customer
            )

            return (
              <article className="customer-card" key={customer}>
                <div className="customer-avatar">
                  {customer.charAt(0).toUpperCase()}
                </div>

                <h3>{customer}</h3>

                <p>
                  <Ticket size={15} />
                  {customerTickets.length} Tickets
                </p>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default Customers