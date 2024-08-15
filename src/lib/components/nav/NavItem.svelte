<script>
  import clickOutside from '$lib/actions/click-outside';

  export let name;

  /** @type {HTMLDialogElement} */
  let dropdown;
  let selected = false;

  const handleOpen = () => {
    if (selected) dropdown.close();
    else dropdown.show();
    selected = !selected;
  };

  const handleClickOutside = () => {
    dropdown.close();
    selected = false;
  };
</script>

<div
  class="flex items-center relative select-none"
  on:click={ handleOpen }
  on:keydown={ handleOpen }
  role="button"
  tabindex="0"
  use:clickOutside={ handleClickOutside }
>
  { name }
  <dialog
    bind:this={ dropdown }
    class="bg-secondary m-0 py-1 rounded-b shadow-md w-max z-50"
    class:hidden={ !$$slots.default }
  >
    <slot />
  </dialog>
</div>

<style lang="postcss">
  dialog {
    top: calc(100% + .25rem);
  }
</style>
