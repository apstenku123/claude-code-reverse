/**
 * Reads a File or Blob object and returns its Base64-encoded contents as a string (without the data URL prefix).
 * @param {File|Blob} file - The file or blob to read as Base64.
 * @returns {Promise<string>} a promise that resolves with the Base64-encoded string of the file'createInteractionAccessor contents.
 */
function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    // When reading is complete (either success or error)
    fileReader.onloadend = () => {
      // FileReader.DONE === 2; ensure reading is finished
      if (fileReader.readyState !== FileReader.DONE) {
        return reject(new Error("Reader aborted too early"));
      }
      // fileReader.result is a data URL: "data:<mime>;base64,<data>"
      const dataUrl = fileReader.result ?? "";
      const commaIndex = dataUrl.indexOf(",");
      // Extract only the Base64 part after the comma
      const base64StartIndex = commaIndex > -1 ? commaIndex + 1 : dataUrl.length;
      const base64String = dataUrl.substring(base64StartIndex);
      resolve(base64String);
    };

    // Handle abort event
    fileReader.onabort = () => reject(new Error("Read aborted"));
    // Handle error event
    fileReader.onerror = () => reject(fileReader.error);

    // Start reading the file as a data URL
    fileReader.readAsDataURL(file);
  });
}

module.exports = readFileAsBase64;