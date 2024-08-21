<script>
  export let show = false;

  export const handleToggle = (/** @type {boolean} */ toggle) => show = toggle;
</script>

<dialog
  class="font-mono text-sm absolute bg-accent bottom-12 cursor-pointer m-0 ml-auto right-0 shadow-md"
  class:toast-in={show}
  class:toast-out={!show}
  open
>
  <button class="h-full px-4 py-2 w-full" on:click={() => handleToggle(false)}>
    <slot />
  </button>
</dialog>
