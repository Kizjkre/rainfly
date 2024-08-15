<script>
  import { resumeContext, stopContext, suspendContext } from '$lib/actions/audio-host';
  import Nav from '$lib/components/nav/Nav.svelte';
  import Visualizer from '$lib/components/Visualizer.svelte';
  import Editor from '$lib/components/editor/Editor.svelte';
  import { status, Status } from '$lib/stores/status';
  import { vimStatus } from '$lib/stores/vim-status';
  import clickOutsideListener from '$lib/utils/clickOutside';

  /** @type {() => void} */
  let runEditorProcessor;
  /** @type {() => void} */
  let runEditorMain;
  /** @type {HTMLDivElement} */
  let vimBar1;
  /** @type {HTMLDivElement} */
  let vimBar2;

  $: {
    switch ($status) {
      case Status.play:
        runEditorProcessor();
        runEditorMain();
        // TODO: check for compile error, set status to stop or something - tzfeng
        break;
      case Status.running:
        resumeContext();
        break;
      case Status.pause:
        suspendContext();
        break;
      default:
      case Status.stop:
        stopContext();
    }
  }
</script>

<svelte:document on:click={ clickOutsideListener } />

<main class="grid grid-cols-2 grid-rows-main h-full w-full">
  <nav class="col-span-2">
    <Nav />
  </nav>
  <header class="col-span-2">
    <Visualizer />
  </header>
  <section class="border-r border-black">
    <Editor id="processor" bind:runEditorCode={runEditorProcessor} bind:vimBar={vimBar1} />
  </section>
  <section class="border-l border-black">
    <Editor id="main" bind:runEditorCode={runEditorMain} bind:vimBar={vimBar2} />
  </section>
  <section class:hidden={!$vimStatus}>
    <div class="vimBar" bind:this={vimBar1}></div>
  </section>
  <section class:hidden={!$vimStatus}>
    <div class="vimBar" bind:this={vimBar2}></div>
  </section>
</main>
