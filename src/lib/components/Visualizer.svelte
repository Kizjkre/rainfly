<script>
  import { onMount } from "svelte";
  import ActionButton from "./ActionButton.svelte";

  /** @type {HTMLCanvasElement} */
  let canvas;
  /** @type {CanvasRenderingContext2D | null} */
  let context;
  /** @type {number} */
  let RATIO;
  /** @type {number} */
  const BAR_THRESHOLD = 250;


  onMount(() => {
    RATIO = window.devicePixelRatio || 1;
    context = canvas.getContext("2d");
    resizeCanvas();
    draw();
  })

  function draw() {
    if (context === null) return;
    context.clearRect(0, 0, canvas.width, canvas.height);

    // visualizer width and height
    const width = canvas.width;
    const height = canvas.height;
    const padding = 0.8;

    // draw x-axis
    context.beginPath();
    context.moveTo(0, height / 2);
    context.lineTo(width, height / 2);
    context.strokeStyle = "red";
    context.lineWidth = 1 * RATIO;
    context.stroke();
    context.closePath();

    // draw dotted lines 
    context.beginPath();
    context.setLineDash([5, 15]);
    context.moveTo(0, height/2 + (height/2 * padding));
    context.lineTo(width, height/2 + (height/2 * padding));
    context.strokeStyle = "red";
    context.stroke();
    context.closePath();

    context.beginPath();
    context.setLineDash([5, 15]);
    context.moveTo(0, height/2 - (height/2 * padding));
    context.lineTo(width, height/2 - (height/2 * padding));
    context.strokeStyle = "red";
    context.stroke();
    context.closePath();

    // reset line dash
    context.setLineDash([]);



    const arr = Array(48000).fill(0).map((_, i) => Math.sin(i / 48000 * 440 * 2 * Math.PI));
    if (arr.length > BAR_THRESHOLD) {
      // display whole sine wav
      const size = arr.length;

      // const downsampleHop = Math.floor(size / width / 10);
      const downsampleHop = 1;
      console.log(downsampleHop);
      

      const increment = width / (size / downsampleHop);
      context.beginPath();
      context.moveTo(0, height / 2);

      let i = 0;
      for (let x = 0; x < width; x += increment, i+=downsampleHop) {
        context.lineTo(x, height/2 - (arr[i] * height/2 * padding));
      }
      context.strokeStyle = "black";
      // stroke thickness
      context.lineWidth = 1.5 * RATIO;
      context.stroke();
      context.closePath();
    } else {
      // display sin wave like audacity does
      const size = arr.length;
      
      // const downsampleHop = Math.floor(size / width / 10);
      const downsampleHop = 1;
      console.log(downsampleHop);
      

      const increment = width / (size / downsampleHop);


      let i = 0;
      context.beginPath();
      for (let x = 0; x < width; x += increment, i+=downsampleHop) {
        context.moveTo(x, height / 2);
        context.lineTo(x, height/2 - (arr[i] * height/2 * padding));
      }
      context.strokeStyle = "black";
      // stroke thickness
      context.lineWidth = 1.5 * RATIO;
      context.stroke();
      context.closePath();

      // draw a little square at top of each bar
      i = 0;
      const squareSize = 4 * RATIO;
      for (let x = 0; x < width; x += increment, i+=downsampleHop) {
        context.fillStyle = "black";
        context.fillRect(x-squareSize / 2, 
            height/2 - (arr[i] * height/2 * padding) - squareSize/2,
            squareSize, 
            squareSize);
      }
    }

  }

  function resizeCanvas() {
    const width = canvas.clientWidth * RATIO;
    const height = canvas.clientHeight * RATIO;
    canvas.width = width;
    canvas.height = height;
    draw();
  }


</script>

<svelte:window on:resize={resizeCanvas} />

<section>
  <canvas id="visualizer" bind:this={canvas}></canvas>
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

  canvas {
    width: 100%;
    height: 100%;
    background-color: #fefefe;
  }

  #action-buttons {
    position: absolute;
    bottom: .5rem;
    left: .5rem;
  }
</style>
