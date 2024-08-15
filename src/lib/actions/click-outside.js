export const nodes = new Map();

const clickOutside = (node, callback) => {
  nodes.set(node, callback);

  return {
    destroy: () => nodes.delete(node)
  };
};

export default clickOutside;
