<script>
  import { onMount } from 'svelte';
  import gsap from 'gsap';

  let box;

  onMount(() => {
    // Animate the box: fade it in and move it slightly
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
  Hello, GSAP & Svelte!
</div>
