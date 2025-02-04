<!-- src/routes/animation.svelte -->
<script>
  import { onMount } from 'svelte';
  import gsap from 'gsap';

  let box;

  onMount(() => {
    // Since SvelteKit does server-side rendering by default,
    // onMount ensures this code runs only in the browser.
    gsap.from(box, { duration: 1, opacity: 0, y: -50, ease: 'power2.out' });
  });
</script>

<style>
  .box {
    width: 200px;
    height: 200px;
    background-color: #4caf50;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2rem auto;
    border-radius: 8px;
    color: #fff;
    font-size: 1.5rem;
  }
</style>

<div class="box" bind:this={box}>
  Hello, GSAP & SvelteKit!
</div>
