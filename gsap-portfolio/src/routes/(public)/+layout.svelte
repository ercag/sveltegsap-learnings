<!-- No auth checks needed -->
<script>
  import { page } from "$app/stores";
</script>

<nav class="public-nav">
  <a href="/">Home</a>
  <a href="/about">About</a>
  {#if !$page.data.user}
    <a href="/login">Login</a>
  {/if}
</nav>

<slot />

<style>
  .public-nav {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    display: flex;
    gap: 1rem;
    padding: 1rem 2rem;
    color: #fff;
  }
  .public-nav a {
    text-decoration: none;
    color: #fff;
    font-weight: 500;
  }
  .public-nav a:hover {
    text-decoration: underline;
  }
</style>
