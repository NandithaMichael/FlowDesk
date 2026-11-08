function Settings() {
  return (
    <div className="dashboard">
      <div className="welcome-section">
        <div>
          <p className="eyebrow">PREFERENCES</p>
          <h1>Settings</h1>
          <p className="subtitle">Manage your account settings.</p>
        </div>
      </div>

      <section className="tickets-section">
        <h2>Profile Settings</h2>

        <label>Name</label>
        <input type="text" defaultValue="Nanditha Michael" />

        <label>Email</label>
        <input type="email" defaultValue="nanditha@example.com" />

        <button className="primary-button">
          Save Changes
        </button>
      </section>
    </div>
  )
}

export default Settings