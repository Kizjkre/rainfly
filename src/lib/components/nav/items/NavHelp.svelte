<script>
  import NavItem from '$lib/components/nav/NavItem.svelte';
  import NavDropdownItem from '$lib/components/nav/NavDropdownItem.svelte';
  import Modal from '$lib/components/Modal.svelte';

  /** @type {(state: boolean) => void}*/
  let showAbout;

  function openAbout() {
    showAbout(true);
  }
</script>

<NavItem name="Help">
  <NavDropdownItem on:click={openAbout}>
    About (coming soon)
  </NavDropdownItem>
</NavItem>

<Modal bind:showModal={showAbout}>
  <div>
    <h1 class="font-bold">Rainfly</h1>
    <p>about</p>
  </div>
</Modal>
