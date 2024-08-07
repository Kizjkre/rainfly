<script>
  import Editor from "$lib/components/editor/Editor.svelte";
  import Nav from "$lib/components/nav/Nav.svelte";
  import Visualizer from "$lib/components/Visualizer.svelte";
</script>

<main class="grid grid-cols-2 grid-rows-main h-full w-full">
  <nav class="col-span-2 border border-red-500">
    <Nav />
  </nav>
  <header class="col-span-2 border border-red-500">
    <Visualizer />
  </header>
  <section class="border border-red-500">
    <Editor id="processor" />
  </section>
  <section class="border border-red-500">
    <Editor id="main" />
  </section>
</main>