<script>
  import Toast from '$lib/components/Toast.svelte';
  import { onDestroy, onMount } from 'svelte';
  import { runProcessorCode, runMainCode } from '$lib/utils/audio-host.js';
  import { vimStatus } from '$lib/stores/vim-status.js';
  import { status, Status } from '$lib/stores/status.js';

  /**
   * @type {string} - "processor" | "main"
   */
  export let id = 'main';
  /**
   * @type {0 | 1} - 0 for processor, 1 for main
   */
  let editorType;
  const editorTypes = Object.freeze({
    'processor': 0,
    'main': 1
  });

  /** @type {typeof import('../utils/monaco.js').default} */
  let monaco;
  /** @type {import('../utils/monaco.js').default.editor.IStandaloneCodeEditor} */
  let editor;
  /** @type {HTMLDivElement} */
  let editorContainer;

  /** @type {typeof import('monaco-vim').initVimMode} */
  let initVimMode;
  /** @type {typeof import('monaco-vim').VimMode} */
  let vimMode;
  /** @type {HTMLDivElement} */
  export let vimBar;
  /** @type {string} */
  let errorMsg = '';
  /** @type {(state: boolean) => any} */
  let handleError;

  let isMounted = false;

  $: {
    editorType = id === 'processor' ? editorTypes.processor : editorTypes.main;

    if (vimBar && isMounted) {
      $vimStatus ? initVim() : stopVim();
    }
  }

  onMount(async () => {
    monaco = (await import('../utils/monaco.js')).default;
    initVimMode = (await import('monaco-vim')).initVimMode;

    const templateCode = editorType === editorTypes.processor ?
      await (await fetch('template/processor.js')).text() :
      await (await fetch('template/main.js')).text();


    editor = monaco.editor.create(editorContainer, {
      minimap: { enabled: false },
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
  });

  function resizeEditor() {
    editor?.layout();
  }

  function getEditorCode() {
    if (editor) {
      return editor.getValue();
    }
    return '';
  }

  export function initVim() {
    vimMode = initVimMode(editor, vimBar);
    $vimStatus = true;
    resizeEditor();
  }

  export function stopVim() {
    vimMode?.dispose();
    $vimStatus = false;
    resizeEditor();
  }

  /**
   * Update editor contents
   * @param code {string}
   */
  export function setEditorCode(code) {
    editor?.setValue(code);
  }

  /**
   * Run the editor code, passing code to audio host system
   */
  export async function runEditorCode() {
    const code = getEditorCode();
    if (code === '') return;

    if (editorType === editorTypes.processor) {
      runProcessorCode(code);
    } else {
      try {
        await runMainCode(code);
        handleError(false);
      } catch (/** @type {any} */ error) {
        errorMsg = error.message;
        handleError(true);
        throw error;
      }
    }
  }

  function initKeyBindings() {
    editor.addAction({
      id: 'runCode',
      label: 'runCode',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
      run: () => {
        $status === Status.stop && ($status = Status.play)
      }
    });
  }
</script>

<svelte:window on:resize={resizeEditor} />

<div class="container">
  <div class="header">
    <div class="title">{editorType === editorTypes.processor ?
      "AudioWorkletProcessor" : "Main"}</div>
  </div>
  <div class="editor-container" bind:this={editorContainer} />
</div>

<Toast bind:handleToggle={handleError}>{errorMsg}</Toast>


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
