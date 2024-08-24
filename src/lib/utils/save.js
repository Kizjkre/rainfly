export const save = async (main, processor) => {
  const a1 = document.createElement('a');
  const a2 = document.createElement('a');

  const url1 = URL.createObjectURL(new Blob([main], {type: 'text/javascript'}));
  a1.href = url1;
  a1.download = 'main.js';
  a1.click();

  const url2 = URL.createObjectURL(new Blob([processor], {type: 'text/javascript'}));
  a2.href = url2;
  a2.download = 'processor.js';
  a2.click();

  URL.revokeObjectURL(url1);
  URL.revokeObjectURL(url2);
};

