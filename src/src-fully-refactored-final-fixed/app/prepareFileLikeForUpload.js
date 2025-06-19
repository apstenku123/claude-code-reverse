/**
 * Prepares a file-like object for upload, handling various input types (Blob, File, URL/blob accessor, etc.).
 * Ensures the global File constructor is available, processes the input accordingly, and returns a standardized file object.
 *
 * @async
 * @param {any} sourceInput - The input to process. Can be a Blob, File, URL/blob accessor object, or other file-like object.
 * @param {string} [fileName] - Optional file name to use for the resulting file object.
 * @param {object} [options] - Optional options object, may include a 'type' property for MIME type.
 * @returns {Promise<any>} - a standardized file object suitable for upload.
 */
async function prepareFileLikeForUpload(sourceInput, fileName, options) {
  // Ensure the global File constructor is available for uploads
  ensureFileGlobalForUploads();

  // Await the source input in case isBlobOrFileLikeObject'createInteractionAccessor a Promise
  const resolvedInput = await sourceInput;

  // If the input is a valid Blob-like object
  if (isValidBlobLikeObject(resolvedInput)) {
    // If isBlobOrFileLikeObject'createInteractionAccessor already a File, return as is
    if (resolvedInput instanceof File) {
      return resolvedInput;
    }
    // Otherwise, convert Blob-like to File using its arrayBuffer and name
    const arrayBuffer = await resolvedInput.arrayBuffer();
    return createFileFromParts([arrayBuffer], resolvedInput.name);
  }

  // If the input is a valid URL/blob accessor object
  if (isValidUrlBlobObject(resolvedInput)) {
    // Get the blob from the accessor
    const blob = await resolvedInput.blob();
    // If no fileName provided, extract from URL path
    if (!fileName) {
      fileName = new URL(resolvedInput.url).pathname.split(/[\\/]/).pop();
    }
    // Convert blob to file
    const blobParts = await convertBlobToParts(blob);
    return createFileFromParts(blobParts, fileName, options);
  }

  // Otherwise, treat as a generic file-like object
  const fileParts = await convertBlobToParts(resolvedInput);
  // If no fileName provided, try to extract from input
  if (!fileName) {
    fileName = extractFileName(resolvedInput);
  }
  // If options.type is not set, attempt to infer type from fileParts
  if (!options?.type) {
    const typeCandidate = fileParts.find(
      part => typeof part === "object" && "type" in part && part.type
    );
    if (typeof typeCandidate === "string") {
      options = {
        ...options,
        type: typeCandidate
      };
    }
  }
  // Create and return the standardized file object
  return createFileFromParts(fileParts, fileName, options);
}

module.exports = prepareFileLikeForUpload;