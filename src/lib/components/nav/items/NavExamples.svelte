<script>
  import NavItem from '$lib/components/nav/NavItem.svelte';
  import NavDropdownItem from '$lib/components/nav/NavDropdownItem.svelte';
  import {fetchTextFile} from '$lib/utils/file-loader.js';
  import {
    loadEditorProcessor,
    loadEditorMain,
  } from '$lib/../routes/+page.svelte';

  /**
   * Load processor and main code from URL to Editor
   * @param {string} mainCodeUrl - URL to main code
   * @param {string} processorCodeUrl - URL to processor code
   */
  async function loadExample(mainCodeUrl, processorCodeUrl) {
    loadEditorMain((await fetchTextFile(mainCodeUrl)).data, 'main');
    loadEditorProcessor(
        (await fetchTextFile(processorCodeUrl)).data,
        'processor',
    );
  }
</script>

<NavItem name="Examples">
  <NavDropdownItem
    on:click={() => {
      loadExample('template/main.js', 'template/processor.js');
    }}
  >
    Hello Bypass
  </NavDropdownItem>
  <NavDropdownItem
    on:click={() => {
      loadExample('sine/main.js', 'sine/processor.js');
    }}
  >
    Hello Sine
  </NavDropdownItem>
  <NavDropdownItem
    on:click={() => {
      loadExample('template/main.js', 'template/processor.js');
    }}
  >
    Shimmer Reverb
  </NavDropdownItem>
</NavItem>
