import { nodes } from '$lib/actions/click-outside';

const clickOutsideListener = (e) =>
  [...nodes.entries()].forEach(([node, callback]) =>
    node !== e.target && callback({
      ...e,
      currentTarget: node
    })
  );

export default clickOutsideListener;
