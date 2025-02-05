<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import Portfolio from "$lib/components/Portfolio.svelte";
  import Blog from "$lib/components/Blog.svelte";

  interface Star {
    left: number;
    top: number;
    size: number;
    opacity: number;
  }

  let cursorEl: HTMLDivElement | null = null;
  let starfieldEl: HTMLDivElement | null = null;
  let prevX: number | null = null;
  let prevY: number | null = null;
  let stars: Star[] = [];

  onMount(() => {
    // Generate an array of star objects (100–200 stars)
    const numStars = 200;
    stars = Array.from({ length: numStars }, () => ({
      left: Math.random() * 100, // Percentage for responsiveness
      top: Math.random() * 100, // Percentage
      size: Math.random() * 2 + 1, // Star size between 1 and 3px
      opacity: Math.random() * 0.5 + 0.5, // Opacity between 0.5 and 1
    }));

    // Listen to mouse move events and animate the custom cursor.
    window.addEventListener("mousemove", (e) => {
      if (cursorEl) {
        // Move the spaceship cursor with GSAP
        gsap.to(cursorEl, {
          duration: 0.1,
          x: e.clientX,
          y: e.clientY,
          ease: "power2.out",
        });

        if (prevX !== null && prevY !== null) {
          const dx = e.clientX - prevX;
          const dy = e.clientY - prevY;
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          const rocketSvg = cursorEl.querySelector(
            "svg.rocket-svg"
          ) as HTMLElement;
          if (rocketSvg) {
            rocketSvg.style.transform = `rotate(${angle}deg)`;
          }
        }

        // Update previous mouse positions
        prevX = e.clientX;
        prevY = e.clientY;
      }

      // Update the starfield parallax effect relative to the viewport center.
      if (starfieldEl) {
        const offsetX = (e.clientX - window.innerWidth / 2) * 0.03;
        const offsetY = (e.clientY - window.innerHeight / 2) * 0.03;
        gsap.to(starfieldEl, {
          duration: 0.5,
          x: offsetX,
          y: offsetY,
          ease: "power2.out",
        });
      }

      // Calculate motion for transformation of the water-drop cursor.
      if (prevX !== null && prevY !== null && cursorEl) {
        const dx = e.clientX - prevX;
        const dy = e.clientY - prevY;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        const velocity = Math.sqrt(dx * dx + dy * dy);
        const factor = Math.min(velocity / 200, 0.2); // Limit the effect to a max factor of 0.2
        const stretch = 1 + factor; // Stretch up to 1.2 when velocity is high.
        const compress = 1 - factor * 0.5; // Compress slightly along the perpendicular axis.

        // Update the water drop SVG transformation inside the custom cursor.
        const waterDropSvg = cursorEl.querySelector("svg");
        if (waterDropSvg) {
          waterDropSvg.style.transform = `rotate(${angle}deg) scale(${stretch}, ${compress})`;
        }

        // If moving left (dx negative), leave behind a mark.
        if (dx < 0) {
          const mark = document.createElement("div");
          mark.className = "cursor-mark";
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
    });

    // Animate the SVG turbulence for a liquid distortion effect on the cursor and marks.
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

<!-- SVG Filter for Liquid Distortion Effect -->
<svg id="liquid-svg" style="position: absolute; width: 0; height: 0;">
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

<!-- Starfield Background (generated via JavaScript and CSS) -->
<div class="starfield" bind:this={starfieldEl}>
  {#each stars as star}
    <div
      class="star"
      style="left: {star.left}%; top: {star.top}%; width: {star.size}px; height: {star.size}px; opacity: {star.opacity};"
    ></div>
  {/each}
</div>

<!-- Custom Cursor as a Realistic Rocket -->
<div class="custom-cursor" bind:this={cursorEl}>
  <svg viewBox="0 0 512 512" class="rocket-svg">
    <!-- Rocket Body -->
    <path
      d="M100 20 C120 50, 130 90, 100 170 C70 90, 80 50, 100 20"
      fill="#e63946"
      stroke="#333"
      stroke-width="2"
    />

    <!-- Rocket Window -->
    <circle
      cx="100"
      cy="60"
      r="10"
      fill="#f1faee"
      stroke="#333"
      stroke-width="2"
    />

    <!-- Rocket Fins -->
    <polygon
      points="70,130 90,140 85,160 55,160"
      fill="#457b9d"
      stroke="#333"
      stroke-width="2"
    />
    <polygon
      points="130,130 110,140 115,160 145,160"
      fill="#457b9d"
      stroke="#333"
      stroke-width="2"
    />

    <!-- Rocket Flame -->
    <path
      d="M90 170 Q100 190 110 170 Q100 180 90 170"
      fill="#ffbe0b"
      stroke="#333"
      stroke-width="2"
    />
  </svg>
</div>

<div class="mixed-homepage">
  <Portfolio />
  <Blog />
</div>

<style>
  :global(body) {
    /* Fallback background color */
    background-color: black;
    cursor: none; /* Hide the system cursor */
    margin: 0;
    padding: 0;
    color: white;
    overflow-x: hidden;
  }

  /* Starfield container covering the entire viewport */
  .starfield {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent; /* No image used; stars are generated */
    pointer-events: none;
    z-index: -2;
  }

  /* Each star is a small white dot */
  .star {
    position: absolute;
    background-color: white;
    border-radius: 50%;
  }

  .mixed-homepage {
    position: relative;
    display: flex;
    gap: 2rem;
    padding: 2rem;
    z-index: 1;
  }

  @media screen and (max-width: 768px) {
    .mixed-homepage {
      flex-direction: column;
    }
  }

  /* Custom Cursor: A Water Drop with Liquid Distortion & Blur */
  .custom-cursor {
    position: fixed;
    top: 0;
    left: 0;
    width: 80px;
    height: 80px;
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: 10000;
    filter: url(#liquid-filter) blur(8px);
  }

  .rocket-svg {
    width: 100%;
    height: 100%;
  }

  /* Floating image effect with a black gradient border */
  :global(.portfolio-image-wrapper img),
  :global(.blog-image-wrapper img) {
    border: 5px solid;
    border-image: linear-gradient(45deg, black, transparent) 1;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }

  :global(.portfolio-image-wrapper img:hover),
  :global(.blog-image-wrapper img:hover) {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.7);
  }
</style>
