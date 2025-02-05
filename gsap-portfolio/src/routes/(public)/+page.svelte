<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import Portfolio from "$lib/components/Portfolio.svelte";
  import Blog from "$lib/components/Blog.svelte";

  let cursorEl: HTMLDivElement | null = null;
  let prevX: number | null = null; // Stores the previous mouse X-coordinate

  onMount(() => {
    // Listen to mouse move events and animate the custom cursor.
    window.addEventListener("mousemove", (e) => {
      if (cursorEl) {
        // Update the position of the custom cursor
        gsap.to(cursorEl, {
          duration: 0.1,
          x: e.clientX,
          y: e.clientY,
          ease: "power2.out",
        });

        // Check if the mouse is moving to the left
        if (prevX !== null && e.clientX < prevX) {
          // Expand the cursor briefly to emphasize the leftward motion (20% larger)
          gsap.to(cursorEl, {
            scale: 1.2,
            duration: 0.2,
            ease: "power2.out",
            onComplete: () => {
              gsap.to(cursorEl, {
                scale: 1,
                duration: 0.2,
                ease: "power2.out",
              });
            },
          });

          // Create a "mark" element at the current mouse position with adjusted (smaller) size
          const mark = document.createElement("div");
          mark.className = "cursor-mark";
          mark.style.position = "fixed";
          mark.style.top = `${e.clientY}px`;
          mark.style.left = `${e.clientX}px`;
          mark.style.width = "64px"; // 80px decreased by 20% = 64px
          mark.style.height = "64px";
          mark.style.backgroundColor = "red";
          mark.style.borderRadius = "50%";
          mark.style.pointerEvents = "none";
          mark.style.transform = "translate(-50%, -50%)";
          mark.style.filter = "blur(8px)";
          mark.style.opacity = "0.5";

          // Append the mark to the body so that it stays in place
          document.body.appendChild(mark);
          // Animate the mark to fade out and scale up
          gsap.to(mark, {
            duration: 1,
            opacity: 0,
            scale: 1.2,
            ease: "power2.out",
            onComplete: () => {
              mark.remove();
            },
          });
        }
        // Update previous mouse X coordinate for next event
        prevX = e.clientX;
      }
    });

    // Animate the SVG filter's turbulence value to create a liquid effect.
    const turbulence = document.querySelector(
      "#liquid-turbulence"
    ) as SVGFETurbulenceElement;
    if (turbulence) {
      gsap.to(turbulence, {
        attr: { baseFrequency: 0.2 },
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  });
</script>

<!-- SVG Filter for the Liquid Cursor Effect -->
<svg id="liquid-svg" style="position: absolute; width: 0; height: 0">
  <filter id="liquid-filter">
    <feTurbulence
      id="liquid-turbulence"
      type="fractalNoise"
      baseFrequency="0.08"
      numOctaves="2"
      result="noise"
    />
    <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" />
  </filter>
</svg>

<!-- Custom Red Dot -->
<div class="custom-cursor" bind:this={cursorEl}></div>

<div class="mixed-homepage">
  <Portfolio />
  <Blog />
</div>

<style>
  :global(body) {
    background-color: black;
    cursor: none; /* Hide the default system cursor */
    margin: 0;
    padding: 0;
    color: white; /* Ensure your text is visible against the black background */
  }

  .mixed-homepage {
    display: flex;
    gap: 2rem;
    padding: 2rem;
  }

  @media screen and (max-width: 768px) {
    .mixed-homepage {
      flex-direction: column;
    }
  }

  /* Custom Red Dot as Cursor with Liquid Effect */
  .custom-cursor {
    position: fixed;
    top: 0;
    left: 0;
    width: 80px;
    height: 80px;
    background-color: red;
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: 10000;
    /* Apply both the liquid SVG filter and a CSS blur */
    filter: url(#liquid-filter) blur(8px);
  }

  /* Styling for the mark left behind (if needed, additional styling can be added) */
  .cursor-mark {
    z-index: 9999;
  }
</style>
