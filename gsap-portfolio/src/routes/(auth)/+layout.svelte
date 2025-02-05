<script>
  // This layout will only apply to /login and /register
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  // If user is already logged in, redirect to home
  if ($page.data.user) {
    goto("/");
  }
</script>

<slot />
