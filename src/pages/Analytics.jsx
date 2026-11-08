import { BarChart3 } from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

function Analytics({ tickets }) {
  const data = ['Open', 'Pending', 'Resolved'].map((status) => ({
    status,
    count: tickets.filter((ticket) => ticket.status === status).length
  }))

  return (
    <div className="dashboard">
      <div className="welcome-section">
        <div>
          <p className="eyebrow">REPORTS & INSIGHTS</p>
          <h1>Analytics</h1>
          <p className="subtitle">A quick overview of your support activity.</p>
        </div>
      </div>

      <section className="tickets-section">
        <h2><BarChart3 size={20} /> Ticket Overview</h2>

        <div style={{ width: '100%', height: '320px', minWidth: 0, marginTop: 25 }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#315efb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  )
}

export default Analytics