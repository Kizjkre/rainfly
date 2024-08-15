<script>
  import NavItem from '$lib/components/nav/NavItem.svelte';
  import NavDropdownItem from '$lib/components/nav/NavDropdownItem.svelte';
</script>

<NavItem name="Examples">
  <NavDropdownItem>
    Open
  </NavDropdownItem>
  <NavDropdownItem>
    Save
  </NavDropdownItem>
  <NavDropdownItem>
    Export to <code>.wav</code>
  </NavDropdownItem>
</NavItem>
