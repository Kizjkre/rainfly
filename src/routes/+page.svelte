<script>
  import { resumeContext, stopContext, suspendContext } from '$lib/utils/audio-host';
  import Nav from '$lib/components/nav/Nav.svelte';
  import Visualizer from '$lib/components/Visualizer.svelte';
  import Editor from '$lib/components/Editor.svelte';
  import { status, Status } from '$lib/stores/status';
  import clickOutsideListener from '$lib/utils/clickOutside';

  /** @type {(() => Promise<void>)} */
  let runEditorProcessor;
  /** @type {(() => Promise<void>)} */
  let runEditorMain;

  $: {
    switch ($status) {
      case Status.play:
        runCode();
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

  async function runCode() {
    runEditorProcessor();
    try {
      await runEditorMain();
    } catch (error) {
      $status = Status.stop;
      throw error;
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
    <Editor id="processor" bind:runEditorCode={runEditorProcessor} />
  </section>
  <section class="border-l border-black">
    <Editor id="main" bind:runEditorCode={runEditorMain} />
  </section>
</main>
