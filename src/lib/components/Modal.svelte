<script>
  import {onMount} from 'svelte';
  import {portal} from '$lib/actions/portal.js';
  import {clickOutside} from '$lib/actions/click-outside.js';

  /** @type {HTMLDialogElement} */
  let id;
  let show = false;

  /**
   * @param {boolean} state
   */
  export function showModal(state) {
    console.log('showModal called with state:', state);
    show = state;
    if (state) {
      console.log('Calling id.showModal()');
      id.showModal();
    } else {
      console.log('Calling id.close()');
      id.close();
    }
  }

  /**
   * Click outside the modal to close
   */
  function closeModal() {
    console.log('closeModal called');
    console.log('modal', show);
    showModal(false);
  }

  onMount(() => {
    console.log('Component mounted');
  });
</script>

<dialog
  class="absolute bg-white w-full h-80 max-w-md cursor-pointer rounded-xl
    shadow-md"
  bind:this={id}
  use:portal
>
  <button class="h-full px-4 py-2 w-full" on:click={() => {
    console.log('button click modal');
    closeModal();
  }}>
    <slot />
  </button>
</dialog>

<style use="postcss">
  dialog {
    transition: display 1s allow-discrete, overlay 1s allow-discrete;
    animation: appear 1s forwards;
  }

  dialog[disappear] {
    animation: open 1s forwards;
  }
</style>
