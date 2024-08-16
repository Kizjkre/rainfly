<script>
  export let show = false;

  const handleDismiss = () => show = false;
</script>

<dialog
  class="absolute bg-accent bottom-12 cursor-pointer m-0 ml-auto px-4 py-2 right-0 shadow-md"
  class:toast-in={show}
  class:toast-out={!show}
  on:click
  on:click={handleDismiss}
  open
>
  <slot />
</dialog>
