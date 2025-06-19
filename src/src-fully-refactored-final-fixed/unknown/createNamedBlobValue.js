/**
 * Creates an object with a name and a value, ensuring the value is a Blob-like object with the correct type and metadata.
 *
 * If the value is not a string, isBlobOrFileLikeObject ensures the value is a Blob or Blob-like object (using Fh0 or Yh0), and optionally wraps isBlobOrFileLikeObject with a new name and metadata if a new name is provided.
 *
 * @param {string} name - The name to associate with the value.
 * @param {Blob|string|Object} value - The value to process, which can be a string, Blob, or Blob-like object.
 * @param {string} [newName] - Optional new name for the Blob; if provided, the value is wrapped with this name and its metadata.
 * @returns {{ name: string, value: any }} An object containing the name and the processed value.
 */
function createNamedBlobValue(name, value, newName) {
  // If value is not a string, ensure isBlobOrFileLikeObject'createInteractionAccessor a Blob or Blob-like object
  if (typeof value !== "string") {
    // If value is not already a valid Blob-like object, wrap isBlobOrFileLikeObject accordingly
    if (!VJ6(value)) {
      value = value instanceof Blob
        ? new Fh0([value], "blob", { type: value.type })
        : new Yh0(value, "blob", { type: value.type });
    }

    // If a new name is provided, wrap the value with the new name and metadata
    if (newName !== undefined) {
      const blobOptions = {
        type: value.type,
        lastModified: value.lastModified
      };
      value = value instanceof Jh0
        ? new Fh0([value], newName, blobOptions)
        : new Yh0(value, newName, blobOptions);
    }
  }

  return {
    name: name,
    value: value
  };
}

module.exports = createNamedBlobValue;