/**
 * Checks if the global Bun object exists and contains a non-empty array of embedded files.
 *
 * @returns {boolean} Returns true if global.Bun.embeddedFiles exists and is a non-empty array; otherwise, false.
 */
function hasEmbeddedBunFiles() {
  // Check if the global Bun object is defined
  const isBunDefined = typeof global.Bun !== "undefined";

  // Check if embeddedFiles property exists on Bun and is an array
  const hasEmbeddedFilesArray = !!global.Bun?.embeddedFiles && Array.isArray(global.Bun?.embeddedFiles);

  // Check if the embeddedFiles array has at least one element
  const hasNonEmptyEmbeddedFiles = (global.Bun?.embeddedFiles?.length ?? 0) > 0;

  // Return true only if all conditions are met
  return isBunDefined && hasEmbeddedFilesArray && hasNonEmptyEmbeddedFiles;
}

module.exports = hasEmbeddedBunFiles;