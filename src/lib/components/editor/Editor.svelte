<script>
  import {onDestroy, onMount} from 'svelte';
  import {runProcessorCode, runMainCode} from '$lib/actions/audio-host.js'

  /**
   * @type {string} - "processor" | "main"
   */
  export let id = "main";
  /**
   * @type {0 | 1} - 0 for processor, 1 for main
   */
  let editorType;
  const editorTypes = Object.freeze({
    "processor": 0,
    "main": 1
  })
  $: editorType = id === "processor" ? editorTypes.processor : editorTypes.main;

  /** @type {typeof import('./monaco').default} */
  let monaco;
  /** @type {import('./monaco').default.editor.IStandaloneCodeEditor} */
  let editor;
  /** @type {HTMLDivElement} */
  let editorContainer;

  onMount(async () => {
    monaco = (await import('./monaco')).default;

    const templateCode = editorType === editorTypes.processor ? 
        await (await fetch("template/processor.js")).text() :
        await (await fetch("template/main.js")).text();


    editor = monaco.editor.create(editorContainer, {
      minimap: {enabled: false},
      fontSize: 14,
      scrollBeyondLastLine: false
      // automaticLayout: true,
    });
    const model = monaco.editor.createModel(
      templateCode || `console.log("Hello World!")`,
      'javascript'
    );
    editor.setModel(model);

    // temp testing
    editor.onDidChangeModelContent(() => {
      // console.log(getEditorCode())
    });

    initKeyBindings();
  });

  onDestroy(() => {
    monaco?.editor.getModels().forEach((model) => model.dispose());
    editor?.dispose();
  })

  function resizeEditor() {
    editor?.layout();
  }

  function getEditorCode() {
    if (editor) {
      return editor.getValue();
    }
    return "";
  }

  /**
   * Update editor contents
   * @param code {string} 
   */
  function setEditorCode(code) {
    editor?.setValue(code);
  }

  /**
   * Run the editor code, passing code to audio host system
   */
  export function runEditorCode() {
    const code = getEditorCode();
    if (code === "") return;

    if (editorType === editorTypes.processor) {
      runProcessorCode(code);
    } else {
      runMainCode(code);
    }
  }

  function initKeyBindings() {
    // editor.addAction({
    //   id: 'runCode',
    //   label: 'runCode',
    //   keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
    //   run: function() {runEditorCode()}
    // });
  }

</script>

<svelte:window on:resize={resizeEditor}/>

<div class="container">
  <div class="header">
    <div class="title">{editorType === editorTypes.processor ?  
        "AudioWorkletProcessor" : "Main"}</div>
  </div>
  <div class="editor-container" bind:this={editorContainer} />
</div>


<style lang="postcss">
  .header {
    @apply px-2 h-7 flex items-center bg-primary;
  }
  .title {
    @apply inline-block font-semibold
  }
  .container {
    width: 100%;
    height: 100%;
  }
  .editor-container {
    height: 100%;
  }
</style>
