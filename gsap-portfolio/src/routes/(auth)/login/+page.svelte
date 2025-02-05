<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { enhance } from "$app/forms";

  let titleEl: HTMLHeadingElement;
  let formEl: HTMLFormElement;

  onMount(() => {
    // Animate the title: fade in and slide from above.
    gsap.from(titleEl, { duration: 1, opacity: 0, y: -50 });

    // Animate the form: fade in and zoom in.
    gsap.from(formEl, { duration: 1, delay: 0.5, opacity: 0, scale: 0.5 });
  });
</script>

<div class="login-container">
  <h2 bind:this={titleEl}>Login</h2>
  <form bind:this={formEl} method="POST" use:enhance>
    <input type="text" name="username" placeholder="Username" required />
    <input type="password" name="password" placeholder="Password" required />
    <button type="submit">Login</button>
  </form>
</div>

<style>
  .login-container {
    max-width: 400px;
    margin: 3rem auto;
    padding: 2rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  form {
    margin-top: 1rem;
  }

  input {
    width: 100%;
    margin-bottom: 1rem;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 0.75rem 1.5rem;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #2980b9;
  }
</style>
