
import Customers from './pages/Customers'
import Analytics from './pages/Analytics'
import SettingsPage from './pages/Settings'
import TicketDetails from './pages/TicketDetails'

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import {
  LayoutDashboard,
  Ticket,
  Users,
  BarChart3,
  Search,
  Settings,
  Bell,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react'

import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [activePage, setActivePage] = useState('Dashboard')
  const [searchTerm, setSearchTerm] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const [statusFilter, setStatusFilter] = useState('All')
  const [menuOpen, setMenuOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const [newTicket, setNewTicket] = useState({
    customer: '',
    subject: '',
    priority: 'Medium'
  })

  const [tickets, setTickets] = useState(() => {
    const savedTickets = localStorage.getItem('flowdesk-tickets')

    return savedTickets
      ? JSON.parse(savedTickets)
      : [
          {
            id: 'TK-1001',
            customer: 'Olivia Martin',
            subject: 'Unable to access account',
            priority: 'High',
            status: 'Open'
          },
          {
            id: 'TK-1002',
            customer: 'Jackson Lee',
            subject: 'Payment confirmation missing',
            priority: 'Medium',
            status: 'Pending'
          },
          {
            id: 'TK-1003',
            customer: 'Isabella Clark',
            subject: 'Request for account update',
            priority: 'Low',
            status: 'Resolved'
          },
          {
            id: 'TK-1004',
            customer: 'William Brown',
            subject: 'Application loading slowly',
            priority: 'High',
            status: 'Open'
          }
        ]
  })

  useEffect(() => {
    localStorage.setItem('flowdesk-tickets', JSON.stringify(tickets))
  }, [tickets])

  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Tickets', icon: Ticket, path: '/tickets' },
    { name: 'Customers', icon: Users, path: '/customers' },
    { name: 'Analytics', icon: BarChart3, path: '/analytics' },
    { name: 'Settings', icon: Settings, path: '/settings' }
  ]

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === 'All' || ticket.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const stats = [
    {
      title: 'Total Tickets',
      value: tickets.length,
      icon: Ticket,
      color: 'blue'
    },
    {
      title: 'Open Tickets',
      value: tickets.filter(ticket => ticket.status === 'Open').length,
      icon: AlertCircle,
      color: 'orange'
    },
    {
      title: 'Pending Tickets',
      value: tickets.filter(ticket => ticket.status === 'Pending').length,
      icon: Clock,
      color: 'purple'
    },
    {
      title: 'Resolved Tickets',
      value: tickets.filter(ticket => ticket.status === 'Resolved').length,
      icon: CheckCircle2,
      color: 'green'
    }
  ]

  const handleCreateTicket = (event) => {
    event.preventDefault()

    const ticket = {
      id: `TK-${1001 + tickets.length}`,
      customer: newTicket.customer,
      subject: newTicket.subject,
      priority: newTicket.priority,
      status: 'Open'
    }

    setTickets((previousTickets) => [ticket, ...previousTickets])

    setNewTicket({
      customer: '',
      subject: '',
      priority: 'Medium'
    })

    setShowModal(false)
  }

  return (
    <BrowserRouter>
      <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>

        {/* SIDEBAR */}
        <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
          <div className="brand">
            <div className="brand-icon">F</div>
            <span>FlowDesk</span>

            <button
              className="close-menu"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <p className="nav-label">WORKSPACE</p>

          <nav>
            {navigation.map((item) => {
              const Icon = item.icon

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`nav-item ${
                    activePage === item.name ? 'active' : ''
                  }`}
                  onClick={() => {
                    setActivePage(item.name)
                    setMenuOpen(false)
                  }}
                >
                  <Icon size={19} />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          <div className="sidebar-bottom">
            <div className="profile-avatar">NM</div>
            <div>
              <strong>Nanditha Michael</strong>
              <small>Administrator</small>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="main-content">

          {/* SHARED HEADER */}
          <header className="topbar">
            <button
              className="menu-button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>

            <div className="breadcrumb">
              Workspace / <strong>{activePage}</strong>
            </div>

            <div className="topbar-actions">
              <div className="search-box">
                <Search size={18} />
                <input
                  type="search"
                  placeholder="Search tickets..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  aria-label="Search tickets"
                />
              </div>

              <button
                className="theme-button"
                onClick={() => setDarkMode(!darkMode)}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button
                className="notification-button"
                aria-label="Notifications"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={20} />
                <span></span>
              </button>

              {showNotifications && (
                <div className="notification-dropdown">
                  <h3>Notifications</h3>
                  <p>You have new support tickets to review.</p>
                  <p>Check your pending tickets.</p>
                </div>
              )}
            </div>
          </header>

          {/* PAGE ROUTES */}
          <Routes>

            {/* DASHBOARD */}
            <Route
              path="/"
              element={
                <section className="dashboard">

                  <div className="welcome-section">
                    <div>
                      <p className="eyebrow">OVERVIEW</p>
                      <h1>Dashboard</h1>
                      <p className="subtitle">
                        Welcome back! Here's what's happening with your support team.
                      </p>
                    </div>

                    <button
                      className="primary-button"
                      onClick={() => setShowModal(true)}
                    >
                      <Plus size={18} />
                      Create Ticket
                    </button>
                  </div>

                  <div className="stats-grid">
                    {stats.map((stat) => {
                      const Icon = stat.icon

                      return (
                        <article className="stat-card" key={stat.title}>
                          <div className={`stat-icon ${stat.color}`}>
                            <Icon size={21} />
                          </div>

                          <p>{stat.title}</p>
                          <h2>{stat.value}</h2>
                          <span className="stat-change">
                            Live ticket count
                          </span>
                        </article>
                      )
                    })}
                  </div>

                  <section className="tickets-section">
                    <div className="section-heading">
                      <div>
                        <h2>Recent Tickets</h2>

                        <div className="ticket-filters">
                          {['All', 'Open', 'Pending', 'Resolved'].map((status) => (
                            <button
                              key={status}
                              className={
                                statusFilter === status
                                  ? 'filter-btn active'
                                  : 'filter-btn'
                              }
                              onClick={() => setStatusFilter(status)}
                            >
                              {status}
                            </button>
                          ))}
                        </div>

                        <p>Manage and monitor your latest support requests.</p>
                      </div>
                    </div>

                    <div className="table-wrapper">
                      <table>
                        <thead>
                          <tr>
                            <th>Ticket ID</th>
                            <th>Customer</th>
                            <th>Subject</th>
                            <th>Priority</th>
                            <th>Status</th>
                          </tr>
                        </thead>

                        <tbody>
                          {filteredTickets.map((ticket) => (
                            <tr key={ticket.id}>
                              <td>
                                <Link
                                  to={`/tickets/${ticket.id}`}
                                  className="ticket-id"
                                >
                                  {ticket.id}
                                </Link>
                              </td>

                              <td>{ticket.customer}</td>
                              <td>{ticket.subject}</td>
                              <td>{ticket.priority}</td>

                              <td>
                                <select
                                  className={`status-select ${ticket.status.toLowerCase()}`}
                                  value={ticket.status}
                                  onChange={(event) => {
                                    const updatedStatus = event.target.value

                                    setTickets((previousTickets) =>
                                      previousTickets.map((item) =>
                                        item.id === ticket.id
                                          ? { ...item, status: updatedStatus }
                                          : item
                                      )
                                    )
                                  }}
                                >
                                  <option value="Open">Open</option>
                                  <option value="Pending">Pending</option>
                                  <option value="Resolved">Resolved</option>
                                </select>
                              </td>
                            </tr>
                          ))}

                          {filteredTickets.length === 0 && (
                            <tr>
                              <td colSpan="5" className="empty-state">
                                No matching tickets found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </section>
                </section>
              }
            />

            {/* TICKETS LIST PAGE */}
            <Route
              path="/tickets"
              element={
                <section className="dashboard">
                  <section className="tickets-section">
                    <div className="section-heading">
                      <div>
                        <p className="eyebrow">WORKSPACE</p>
                        <h2>Recent Tickets</h2>
                        <p>Manage and monitor your support requests.</p>
                      </div>
                    </div>

                    <div className="ticket-filters">
                      {['All', 'Open', 'Pending', 'Resolved'].map((status) => (
                        <button
                          key={status}
                          className={
                            statusFilter === status
                              ? 'filter-btn active'
                              : 'filter-btn'
                          }
                          onClick={() => setStatusFilter(status)}
                        >
                          {status}
                        </button>
                      ))}
                    </div>

                    <div className="table-wrapper">
                      <table>
                        <thead>
                          <tr>
                            <th>Ticket ID</th>
                            <th>Customer</th>
                            <th>Subject</th>
                            <th>Priority</th>
                            <th>Status</th>
                          </tr>
                        </thead>

                        <tbody>
                          {filteredTickets.map((ticket) => (
                            <tr key={ticket.id}>
                              <td>
                                <Link
                                  to={`/tickets/${ticket.id}`}
                                  className="ticket-id"
                                >
                                  {ticket.id}
                                </Link>
                              </td>

                              <td>{ticket.customer}</td>
                              <td>{ticket.subject}</td>
                              <td>{ticket.priority}</td>

                              <td>
                                <select
                                  className={`status-select ${ticket.status.toLowerCase()}`}
                                  value={ticket.status}
                                  onChange={(event) => {
                                    const updatedStatus = event.target.value

                                    setTickets((previousTickets) =>
                                      previousTickets.map((item) =>
                                        item.id === ticket.id
                                          ? { ...item, status: updatedStatus }
                                          : item
                                      )
                                    )
                                  }}
                                >
                                  <option value="Open">Open</option>
                                  <option value="Pending">Pending</option>
                                  <option value="Resolved">Resolved</option>
                                </select>
                              </td>
                            </tr>
                          ))}

                          {filteredTickets.length === 0 && (
                            <tr>
                              <td colSpan="5" className="empty-state">
                                No matching tickets found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </section>
                </section>
              }
            />

            {/* CUSTOMERS */}
            <Route
              path="/customers"
              element={<Customers tickets={tickets} />}
            />

            {/* ANALYTICS */}
            <Route
              path="/analytics"
              element={<Analytics tickets={tickets} />}
            />

            {/* SETTINGS */}
            <Route
              path="/settings"
              element={<SettingsPage />}
            />

            {/* INDIVIDUAL TICKET DETAILS */}
            <Route
              path="/tickets/:id"
              element={
                <TicketDetails
                  tickets={tickets}
                  setTickets={setTickets}
                />
              }
            />

          </Routes>

          {/* CREATE TICKET MODAL */}
          {showModal && (
            <div className="modal-overlay">
              <div className="modal">
                <div className="modal-header">
                  <h2>Create New Ticket</h2>

                  <button onClick={() => setShowModal(false)}>
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleCreateTicket}>
                  <label>Customer Name</label>
                  <input
                    type="text"
                    required
                    value={newTicket.customer}
                    onChange={(event) =>
                      setNewTicket({
                        ...newTicket,
                        customer: event.target.value
                      })
                    }
                    placeholder="Enter customer name"
                  />

                  <label>Subject</label>
                  <input
                    type="text"
                    required
                    value={newTicket.subject}
                    onChange={(event) =>
                      setNewTicket({
                        ...newTicket,
                        subject: event.target.value
                      })
                    }
                    placeholder="Enter ticket subject"
                  />

                  <label>Priority</label>
                  <select
                    value={newTicket.priority}
                    onChange={(event) =>
                      setNewTicket({
                        ...newTicket,
                        priority: event.target.value
                      })
                    }
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>

                  <button type="submit" className="primary-button">
                    Create Ticket
                  </button>
                </form>
              </div>
            </div>
          )}

        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
