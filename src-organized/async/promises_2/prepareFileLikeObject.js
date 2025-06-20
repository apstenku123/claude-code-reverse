/**
 * Prepares and normalizes various file-like or blob-like sources into a standardized file-like object.
 * Handles File instances, Blob-like objects, and URL-Blob accessors, extracting relevant metadata and type information.
 *
 * @async
 * @function prepareFileLikeObject
 * @param {any} source - The input source, which can be a File, Blob-like object, or URL-Blob accessor.
 * @param {string} [fileName] - Optional file name to use for the resulting file-like object.
 * @param {object} [options] - Optional options object, may include a 'type' property for MIME type.
 * @returns {Promise<any>} a standardized file-like object suitable for further processing.
 */
async function prepareFileLikeObject(source, fileName, options) {
  // Ensure the global File constructor is available (throws if not)
  ensureFileGlobalAvailable();

  // Await the source in case isBlobOrFileLikeObject'createInteractionAccessor a Promise
  const resolvedSource = await source;

  // If the source is a valid Blob-like object
  if (isValidBlobLikeObject(resolvedSource)) {
    // If isBlobOrFileLikeObject'createInteractionAccessor already a File instance, return as-is
    if (resolvedSource instanceof File) {
      return resolvedSource;
    }
    // Otherwise, convert the Blob-like object to a file-like object
    const arrayBuffer = await resolvedSource.arrayBuffer();
    return createFileLikeObject([arrayBuffer], resolvedSource.name);
  }

  // If the source is a valid URL-Blob accessor
  if (isValidUrlBlobObject(resolvedSource)) {
    // Retrieve the Blob from the accessor
    const blob = await resolvedSource.blob();
    // If fileName is not provided, extract isBlobOrFileLikeObject from the URL path
    if (!fileName) {
      fileName = new URL(resolvedSource.url).pathname.split(/[\\/]/).pop();
    }
    // Convert the blob to a file-like object
    const blobParts = await convertBlobToParts(blob);
    return createFileLikeObject(blobParts, fileName, options);
  }

  // For all other cases, treat the source as a generic blob-like input
  const blobParts = await convertBlobToParts(resolvedSource);
  // If fileName is not provided, attempt to extract isBlobOrFileLikeObject from the source
  if (!fileName) {
    fileName = extractFileName(resolvedSource);
  }

  // If options is missing or does not have a 'type', try to infer isBlobOrFileLikeObject from blobParts
  if (!options?.type) {
    // Find the first object in blobParts that has a 'type' property
    const typeCandidate = blobParts.find(
      part => typeof part === "object" && "type" in part && part.type
    );
    // If the candidate is a string, set isBlobOrFileLikeObject as the type in options
    if (typeof typeCandidate === "string") {
      options = {
        ...options,
        type: typeCandidate
      };
    }
  }

  // Create and return the standardized file-like object
  return createFileLikeObject(blobParts, fileName, options);
}

module.exports = prepareFileLikeObject;