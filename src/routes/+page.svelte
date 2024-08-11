<script>
  import {resumeContext, stopContext, suspendContext} from "$lib/actions/audio-host";
  import Editor from "$lib/components/editor/Editor.svelte";
  import Nav from "$lib/components/nav/Nav.svelte";
  import Visualizer from "$lib/components/Visualizer.svelte";
  import {status, Status} from "$lib/stores/status"

  /** @type {() => void} */
  let runEditorProcessor;
  /** @type {() => void} */
  let runEditorMain;

  $: {
    switch($status) {
      case Status.play:
        runEditorProcessor();
        runEditorMain();
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

<main class="grid grid-cols-2 grid-rows-main h-full w-full">
  <nav class="col-span-2 border border-red-500">
    <Nav />
  </nav>
  <header class="col-span-2 border border-red-500">
    <Visualizer>
    </Visualizer>
  </header>
  <section class="border border-red-500">
    <Editor id="processor" bind:runEditorCode={runEditorProcessor}/>
  </section>
  <section class="border border-red-500">
    <Editor id="main" bind:runEditorCode={runEditorMain}/>
  </section>
</main>