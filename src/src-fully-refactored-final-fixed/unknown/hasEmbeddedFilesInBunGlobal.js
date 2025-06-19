/**
 * Checks if the global Bun object exists and contains a non-empty array of embeddedFiles.
 *
 * @returns {boolean} Returns true if global.Bun.embeddedFiles exists, is an array, and has at least one element; otherwise, false.
 */
function hasEmbeddedFilesInBunGlobal() {
  // Check if the global Bun object exists
  const isBunDefined = typeof global.Bun !== "undefined";

  // Check if embeddedFiles property exists on Bun and is an array
  const hasEmbeddedFilesArray = !!global.Bun?.embeddedFiles && Array.isArray(global.Bun?.embeddedFiles);

  // Check if the embeddedFiles array has at least one element
  const hasNonEmptyEmbeddedFiles = (global.Bun?.embeddedFiles?.length ?? 0) > 0;

  // Return true only if all conditions are met
  return isBunDefined && hasEmbeddedFilesArray && hasNonEmptyEmbeddedFiles;
}

module.exports = hasEmbeddedFilesInBunGlobal;