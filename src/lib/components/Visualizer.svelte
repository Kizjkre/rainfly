<script>
  import ActionButton from "./ActionButton.svelte";
</script>

<section class="-z-50">
  Visualizer...
  <div id="action-buttons">
    <ActionButton />
  </div>
</section>

<style lang="postcss">
  section {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  #action-buttons {
    position: absolute;
    bottom: .5rem;
    left: .5rem;
  }
</style>
