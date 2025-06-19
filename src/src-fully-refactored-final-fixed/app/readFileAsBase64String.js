/**
 * Reads a File or Blob object and returns its Base64-encoded string contents (excluding the data URL prefix).
 *
 * @param {File|Blob} file - The File or Blob object to read.
 * @returns {Promise<string>} a promise that resolves with the Base64-encoded string contents of the file (without the data URL prefix), or rejects with an error if reading fails.
 */
function readFileAsBase64String(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    // Handle successful read
    fileReader.onloadend = () => {
      // Ensure the FileReader has finished reading
      if (fileReader.readyState !== FileReader.DONE) {
        return reject(new Error("Reader aborted too early"));
      }

      // Get the result (data URL string), or empty string if null/undefined
      const dataUrl = fileReader.result ?? "";
      // Find the comma separating the metadata from the Base64 data
      const commaIndex = dataUrl.indexOf(",");
      // The Base64 data starts after the comma; if no comma, use the whole string
      const base64StartIndex = commaIndex > -1 ? commaIndex + 1 : dataUrl.length;
      // Extract and resolve with the Base64 string (without the data URL prefix)
      resolve(dataUrl.substring(base64StartIndex));
    };

    // Handle read abort
    fileReader.onabort = () => {
      reject(new Error("Read aborted"));
    };

    // Handle read error
    fileReader.onerror = () => {
      reject(fileReader.error);
    };

    // Start reading the file as a data URL
    fileReader.readAsDataURL(file);
  });
}

module.exports = readFileAsBase64String;