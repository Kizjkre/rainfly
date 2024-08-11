<script>
  import {status, Status} from "$lib/stores/status";

  let showStop = false;
  let playButtonText = "Play"

  function togglePlay() {
    if ($status === Status.stop) {
      status.set(Status.play);
    } else if ($status === Status.play || $status === Status.running) {
      status.set(Status.pause);
    } else if($status === Status.pause) {
      status.set(Status.running);
    }
  }

  function stop() {
    if ($status !== Status.stop) {
      status.set(Status.stop);
    }
  }

  $: {
    switch($status) {
      case Status.play:
      case Status.running:
        showStop = true;
        playButtonText = "Pause";
        break;
      case Status.pause:
        showStop = true;
        playButtonText = "Run";
        break;
      default:
      case Status.stop:
        playButtonText = "Run";
        showStop = false;
    }
  }

</script>

<div>
  <button on:click={togglePlay} id="playButton">{playButtonText}</button>
  {#if showStop}
  <button on:click={stop} id="stopButton">Stop</button>
  {/if}
</div>

<style lang="postcss">
  button {
    @apply p-4 bg-accent rounded-full
  }
</style>