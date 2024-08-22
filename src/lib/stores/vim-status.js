import {writable} from 'svelte/store';

let defaultVim = true; // TODO: load from local storage

/**
 * @type {import('svelte/store').Writable<boolean>}
 */
export const vimStatus = writable(defaultVim);
