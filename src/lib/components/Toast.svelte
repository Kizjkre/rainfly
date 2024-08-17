<script>
  let show = false;

  export const handleToggle = toggle => show = toggle;
</script>

<dialog
  class="font-mono text-sm absolute bg-accent bottom-12 cursor-pointer m-0 ml-auto px-4 py-2 right-0 shadow-md text-lg"
  class:toast-in={show}
  class:toast-out={!show}
  on:click={() => handleToggle(false)}
  open
>
  <slot />
</dialog>
