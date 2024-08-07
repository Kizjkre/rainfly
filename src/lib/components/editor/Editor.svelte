<script>
  import {onDestroy, onMount} from 'svelte';

  export let id;

  /** @type {typeof import('./monaco').default} */
  let monaco;
  /** @type {import('./monaco').default.editor.IStandaloneCodeEditor} */
  let editor;
  /** @type {HTMLDivElement} */
  let editorContainer;

  onMount(async () => {
    monaco = (await import('./monaco')).default;

    editor = monaco.editor.create(editorContainer, {
      minimap: {enabled: false},
      fontSize: 14,
      // automaticLayout: true,
    });
    const model = monaco.editor.createModel(
      `console.log("Hello World!")`,
      'javascript'
    );
    editor.setModel(model);

    editor.onDidChangeModelContent(() => {
      console.log(getEditorCode())
    });

  });

  onDestroy(() => {
    monaco?.editor.getModels().forEach((model) => model.dispose());
    editor?.dispose();
  })

  function resizeEditor () {
    editor?.layout();
  }

  function getEditorCode() {
    if (editor) {
      return editor.getValue();
    }
    return "";
  }

</script>
<svelte:window on:resize={resizeEditor}/>

<div class="editor-container" bind:this={editorContainer} />

<style>
  .editor-container {
    height: 100%;
  }
</style>
