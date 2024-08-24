export const nodes = new Map();

/**
 * Listen for clicks outside of the node and call the callback.
 * @param {any} node
 * @param {() => void} callback
 * @returns
 */
export const clickOutside = (node, callback) => {
  nodes.set(node, callback);

  return {
    destroy: () => nodes.delete(node),
  };
};
