
/**
 * Fetch a file from the given URL and return name and text data
 * @param {string} url - URL of the file to fetch
 * @return {Promise<{name: string, data: string}>} - Promise that resolves to
 * an object with the name and data of the file
 */
export async function fetchTextFile(url) {
  let filename = url.split('/').pop();
  if (filename === undefined) {
    filename = url;
  }
  const response = await fetch(url);
  const text = await response.text();
  return {name: filename, data: text};
}
