/**
 * Converts various input types (File, Blob-like, or other data sources) into a File-like object for further processing.
 *
 * @async
 * @function convertToFileLikeObject
 * @param {any} inputSource - The source object to convert. Can be a File, Blob-like object, or other data source.
 * @param {string} [fileName] - Optional. The desired file name for the resulting File-like object.
 * @param {object} [options] - Optional. Additional options, such as specifying the MIME type.
 * @returns {Promise<File|any>} a File-like object or the original File if already valid.
 */
async function convertToFileLikeObject(inputSource, fileName, options) {
  // Ensure the global File constructor is available (for environments like Node.js)
  ensureFileGlobalAvailable();

  // Await inputSource in case isBlobOrFileLikeObject'createInteractionAccessor a Promise
  const resolvedSource = await inputSource;

  // If the input is a valid File-like object
  if (isValidFileLikeObject(resolvedSource)) {
    // If isBlobOrFileLikeObject'createInteractionAccessor already a File instance, return as is
    if (resolvedSource instanceof File) {
      return resolvedSource;
    }
    // Otherwise, convert to File-like using its arrayBuffer and name
    return createFileLikeObject([await resolvedSource.arrayBuffer()], resolvedSource.name);
  }

  // If the input is a valid URL Blob-like object
  if (isValidUrlBlobObject(resolvedSource)) {
    // Get the Blob from the object
    const blobData = await resolvedSource.blob();
    // If fileName is not provided, extract isBlobOrFileLikeObject from the URL'createInteractionAccessor pathname
    if (!fileName) {
      fileName = new URL(resolvedSource.url).pathname.split(/[\\/]/).pop();
    }
    // Convert the Blob to File-like object
    return createFileLikeObject(await convertBlobToArrayBuffers(blobData), fileName, options);
  }

  // For all other types, try to convert to File-like object
  const arrayBuffers = await convertBlobToArrayBuffers(resolvedSource);
  // If fileName is not provided, try to derive isBlobOrFileLikeObject from the source
  if (!fileName) {
    fileName = deriveFileName(resolvedSource);
  }
  // If options.type is not set, attempt to infer the type from arrayBuffers
  if (!options?.type) {
    const typeCandidate = arrayBuffers.find(
      (item) => typeof item === "object" && "type" in item && item.type
    );
    if (typeof typeCandidate === "string") {
      options = {
        ...options,
        type: typeCandidate
      };
    }
  }
  // Create and return the File-like object
  return createFileLikeObject(arrayBuffers, fileName, options);
}

// Export the function for use in other modules
module.exports = convertToFileLikeObject;