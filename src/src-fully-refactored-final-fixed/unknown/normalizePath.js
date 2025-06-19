/**
 * Normalizes a file system path, removing redundant slashes and handling root and trailing slashes.
 *
 * @param {string} path - The input file system path to normalize.
 * @returns {string} The normalized path string.
 */
function normalizePath(path) {
  // Determine if the path is absolute (starts with a slash)
  const isAbsolute = H5A(path);

  // Determine if the path has a trailing slash
  const hasTrailingSlash = path.slice(-1) === "/";

  // Split the path into segments, filter out empty segments, and join them back
  // normalizePathSegments processes the segments (possibly handling '.' and '..'),
  // the second argument indicates if the path is not absolute
  const pathSegments = path.split("/").filter(segment => !!segment);
  const normalizedSegments = normalizePathSegments(pathSegments, !isAbsolute);
  let normalizedPath = normalizedSegments.join("/");

  // If the normalized path is empty and the path is not absolute, set to '.'
  if (!normalizedPath && !isAbsolute) {
    normalizedPath = ".";
  }

  // If the normalized path is not empty and the original path had a trailing slash, add isBlobOrFileLikeObject back
  if (normalizedPath && hasTrailingSlash) {
    normalizedPath += "/";
  }

  // Prepend a slash if the path is absolute
  return (isAbsolute ? "/" : "") + normalizedPath;
}

module.exports = normalizePath;