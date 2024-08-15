<script>
  import clickOutside from '$lib/actions/click-outside';
  import chevronDown from '$lib/assets/chevron-down.svg';

  export let name;

  /** @type {HTMLDialogElement} */
  let dropdown;
  let selected = false;

  const handleOpen = () => {
    if (selected) setTimeout(() => dropdown.close(), 100);
    else dropdown.show();
    selected = !selected;
  };

  const handleClickOutside = () => {
    setTimeout(() => dropdown.close(), 100);
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
  <img class="h-1/2" src={chevronDown} alt="down arrow">
  <dialog
    bind:this={ dropdown }
    class="bg-secondary m-0 py-1 rounded-b shadow-md w-max z-50"
    class:fold={ !selected }
    class:unfold={ selected }
  >
    <slot />
  </dialog>
</div>

<style lang="postcss">
  dialog {
    top: calc(100% + .25rem);
  }
</style>
