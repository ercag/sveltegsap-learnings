<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";

  let blogSection: HTMLElement;

  onMount(() => {
    gsap.from(blogSection, {
      duration: 1,
      opacity: 0,
      x: 50,
      ease: "power2.out",
    });
  });
</script>

<div class="blog" bind:this={blogSection}>
  <h2>Latest Blog Posts</h2>
  <div class="blog-list">
    <article class="blog-item">
      <h3>Blog Post One</h3>
      <p>Summary of blog post one.</p>
    </article>
    <article class="blog-item">
      <h3>Blog Post Two</h3>
      <p>Summary of blog post two.</p>
    </article>
    <!-- Add more blog posts as needed -->
  </div>
</div>

<style>
  .blog {
    padding: 1rem;
  }

  .blog h2 {
    text-align: center;
    margin-bottom: 1rem;
  }

  .blog-item {
    padding: 1rem;
    margin-bottom: 1rem;
  }
</style>
