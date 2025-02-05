<script>
  import { page } from "$app/stores";
</script>

<nav class="admin-nav">
  <a
    href="/admin/dashboard"
    class:active={$page.url.pathname === "/admin/dashboard"}>Dashboard</a
  >
  <a
    href="/admin/settings"
    class:active={$page.url.pathname === "/admin/settings"}>Settings</a
  >
  <a href="/">View Site</a>
  <form action="/logout" method="POST" style="display:inline;">
    <button
      type="submit"
      style="background:none;border:none;color:white;cursor:pointer;"
      >Log Out</button
    >
  </form>
</nav>

<slot />

<style>
  .admin-nav {
    background: #2c3e50;
    padding: 1rem;
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .admin-nav a {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
  }

  .admin-nav a.active {
    background: #3498db;
  }

  form {
    margin: 0;
  }

  button {
    font-size: 1rem;
    padding: 0.5rem 1rem;
  }
</style>
