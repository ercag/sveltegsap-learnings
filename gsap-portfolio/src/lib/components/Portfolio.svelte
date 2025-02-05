<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";

  let portfolioSection: HTMLElement;

  onMount(() => {
    gsap.from(portfolioSection, {
      duration: 1,
      opacity: 0,
      x: -50,
      ease: "power2.out",
    });

    const wrappers = document.querySelectorAll(".portfolio-image-wrapper");

    wrappers.forEach((wrapper) => {
      // Use specific types for better intellisense:
      const turbulence = wrapper.querySelector(
        "feTurbulence"
      ) as SVGFETurbulenceElement;
      const displacement = wrapper.querySelector(
        "feDisplacementMap"
      ) as SVGFEDisplacementMapElement;

      wrapper.addEventListener("mouseenter", () => {
        gsap.to(displacement, {
          attr: { scale: 40 },
          duration: 0.5,
          ease: "power2.out",
        });
        gsap.to(turbulence, {
          attr: { baseFrequency: 0.05 },
          duration: 0.5,
          ease: "power2.out",
        });
      });
      wrapper.addEventListener("mouseleave", () => {
        gsap.to(displacement, {
          attr: { scale: 0 },
          duration: 0.5,
          ease: "power2.out",
        });
        gsap.to(turbulence, {
          attr: { baseFrequency: 0.02 },
          duration: 0.5,
          ease: "power2.out",
        });
      });
    });
  });
</script>

<div class="portfolio" bind:this={portfolioSection}>
  <h2>Portfolio Projects</h2>
  <div class="portfolio-list">
    <!-- Portfolio Item 1 -->
    <article class="portfolio-item">
      <a href="/project-one" class="portfolio-link">
        <div class="portfolio-image-wrapper">
          <!-- Inline unique SVG filter for this portfolio item -->
          <svg
            class="filter-svg"
            style="position: absolute; width: 0; height: 0;"
          >
            <filter id="water-filter-1">
              <feTurbulence
                id="turbulence"
                type="fractalNoise"
                baseFrequency="0.02"
                numOctaves="3"
                result="noise"
              />
              <feDisplacementMap
                id="displacement"
                in="SourceGraphic"
                in2="noise"
                scale="0"
              />
            </filter>
          </svg>
          <img
            src="/images/project1.webp"
            alt="Project One"
            class="distort-image"
            style="filter: url(#water-filter-1);"
          />
        </div>
      </a>
    </article>

    <!-- Portfolio Item 2 -->
    <article class="portfolio-item">
      <a href="/project-two" class="portfolio-link">
        <div class="portfolio-image-wrapper">
          <!-- Inline unique SVG filter for this portfolio item -->
          <svg
            class="filter-svg"
            style="position: absolute; width: 0; height: 0;"
          >
            <filter id="water-filter-2">
              <feTurbulence
                id="turbulence"
                type="fractalNoise"
                baseFrequency="0.02"
                numOctaves="3"
                result="noise"
              />
              <feDisplacementMap
                id="displacement"
                in="SourceGraphic"
                in2="noise"
                scale="0"
              />
            </filter>
          </svg>
          <img
            src="/images/project2.webp"
            alt="Project Two"
            class="distort-image"
            style="filter: url(#water-filter-2);"
          />
        </div>
      </a>
    </article>

    <!-- Add more portfolio items as needed -->
  </div>
</div>

<style>
  .portfolio {
    padding: 1rem;
  }

  .portfolio h2 {
    text-align: center;
    margin-bottom: 1rem;
  }

  .portfolio-item {
    padding: 1rem;
    margin-bottom: 1rem;
  }

  .portfolio-link {
    text-decoration: none;
    color: inherit;
  }

  .portfolio-image-wrapper {
    position: relative;
    overflow: hidden;
  }

  .distort-image {
    display: block;
    width: 100%;
    height: auto;
    transition: transform 0.3s ease;
  }

  .portfolio-image-wrapper:hover .distort-image {
    transform: scale(1.05);
  }
</style>
