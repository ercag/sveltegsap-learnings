<div class="dashboard">
  <h1>Admin Dashboard</h1>
  <p>Welcome to the admin panel</p>

  <div class="stats-grid">
    <div class="stat-card">
      <h3>Total Projects</h3>
      <p>0</p>
    </div>
    <div class="stat-card">
      <h3>Blog Posts</h3>
      <p>0</p>
    </div>
    <div class="stat-card">
      <h3>Visitors</h3>
      <p>0</p>
    </div>
  </div>

  <div class="recent-activity">
    <h2>Recent Activity</h2>
    <!-- Add activity feed here -->
  </div>
</div>

<style>
  .dashboard {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin: 2rem 0;
  }

  .stat-card {
    background: #f5f5f5;
    padding: 1.5rem;
    border-radius: 8px;
    text-align: center;
  }
</style>
