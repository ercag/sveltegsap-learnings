<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import Portfolio from "$lib/components/Portfolio.svelte";
  import Blog from "$lib/components/Blog.svelte";

  let cursorEl: HTMLDivElement | null = null;
  let prevX: number | null = null;
  let prevY: number | null = null; // Store previous Y as well

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

        // Compute movement direction and velocity if previous position is available.
        if (prevX !== null && prevY !== null) {
          const dx = e.clientX - prevX;
          const dy = e.clientY - prevY;
          const angle = Math.atan2(dy, dx) * (180 / Math.PI); // Movement angle in degrees
          const velocity = Math.sqrt(dx * dx + dy * dy);
          // Determine a factor for stretching—clamped to a max of 0.2.
          const factor = Math.min(velocity / 200, 0.2);
          // For the water drop, we stretch along the movement direction.
          // Here, we stretch the major axis and slightly compress the minor axis.
          const stretch = 1 + factor; // e.g., up to 1.2 if factor = 0.2
          const compress = 1 - factor * 0.5; // e.g., down to ~0.9 if factor = 0.2

          // Update the water drop SVG inside the custom cursor
          const waterDropSvg = cursorEl.querySelector("svg");
          if (waterDropSvg) {
            waterDropSvg.style.transform = `rotate(${angle}deg) scale(${stretch}, ${compress})`;
          }

          // If moving to the left (dx negative), leave a mark
          if (dx < 0) {
            const mark = document.createElement("div");
            mark.className = "cursor-mark";
            // Insert the water drop SVG into the mark
            mark.innerHTML = `<svg viewBox="0 0 24 24" class="water-drop-svg">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5 7 13 7 13s7-8 7-13c0-3.87-3.13-7-7-7z" fill="red"/>
            </svg>`;
            mark.style.position = "fixed";
            mark.style.top = `${e.clientY}px`;
            mark.style.left = `${e.clientX}px`;
            mark.style.width = "64px"; // 80px reduced by 20%
            mark.style.height = "64px";
            mark.style.pointerEvents = "none";
            mark.style.transform = "translate(-50%, -50%)";
            mark.style.filter = "url(#liquid-filter) blur(8px)";
            mark.style.opacity = "0.5";
            document.body.appendChild(mark);
            // Animate the mark: fade out and scale up
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
        }
        // Update previous mouse coordinates
        prevX = e.clientX;
        prevY = e.clientY;
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

<!-- Custom Cursor as Water Drop -->
<div class="custom-cursor" bind:this={cursorEl}>
  <svg viewBox="0 0 24 24" class="water-drop-svg">
    <path
      d="M12 2C8.13 2 5 5.13 5 9c0 5 7 13 7 13s7-8 7-13c0-3.87-3.13-7-7-7z"
      fill="red"
    />
  </svg>
</div>

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

  /* Custom Cursor: Water Drop */
  .custom-cursor {
    position: fixed;
    top: 0;
    left: 0;
    width: 80px;
    height: 80px;
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: 10000;
    /* Apply both the liquid SVG filter and a CSS blur */
    filter: url(#liquid-filter) blur(8px);
  }

  /* Setting the water drop SVG to fill the container */
  .water-drop-svg {
    width: 100%;
    height: 100%;
  }
</style>
