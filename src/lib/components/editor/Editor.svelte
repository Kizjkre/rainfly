<script>
  import {onDestroy, onMount} from 'svelte';
  import {runProcessorCode, runMainCode} from '$lib/actions/audio-host.js'
  import {vimStatus} from '$lib/stores/vim-status';

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

  /** @type {typeof import('./monaco').default} */
  let monaco;
  /** @type {import('./monaco').default.editor.IStandaloneCodeEditor} */
  let editor;
  /** @type {HTMLDivElement} */
  let editorContainer;

  /** @type {typeof import('monaco-vim').initVimMode} */
  let initVimMode;
  /** @type {typeof import('monaco-vim').VimMode} */
  let vimMode;
  /** @type {HTMLDivElement} */
  export let vimBar;

  let isMounted = false;

  $: {
    editorType = id === "processor" ? editorTypes.processor : editorTypes.main;

    if (vimBar && isMounted) {
      $vimStatus ? initVim() : stopVim();
    }
  }

  onMount(async () => {
    monaco = (await import('./monaco')).default;
    initVimMode = (await import('monaco-vim')).initVimMode;

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

    isMounted = true;
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

  export function initVim() {
    console.log(vimBar);
    vimMode = initVimMode(editor, vimBar);
    vimStatus.set(true);
    resizeEditor();
  }

  export function stopVim() {
    vimMode?.dispose();
    vimStatus.set(false);
    resizeEditor();
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
    height: calc(100% - 1.75rem);
  }
</style>
