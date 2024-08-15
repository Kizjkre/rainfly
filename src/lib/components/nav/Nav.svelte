<script>
  import NavExamples from '$lib/components/nav/items/NavExamples.svelte';
  import NavFile from '$lib/components/nav/items/NavFile.svelte';
  import logo from '$lib/assets/logo.svg';
  import NavHelp from '$lib/components/nav/items/NavHelp.svelte';
  import NavView from '$lib/components/nav/items/NavView.svelte';
</script>

<nav class="bg-secondary border border-x-8 border-y-4 border-white box-border flex gap-8 h-full items-center pl-20 pr-4 py-1 rounded-full w-full">
  <NavFile />
  <NavView />
  <NavExamples />
  <NavHelp />
</nav>

<img alt="rainfly logo" class="absolute left-3 h-12 z-40" src={logo}>
