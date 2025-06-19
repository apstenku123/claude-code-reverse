/**
 * Determines if a given route path is valid based on specific rules and transformations.
 *
 * @param {string} routePath - The route path string to validate.
 * @param {string} basePath - The base path string used for comparison and transformation.
 * @returns {boolean} True if the route path is valid, false otherwise.
 */
function isValidRoutePath(routePath, basePath) {
  // Special case: a single dot is always valid
  if (routePath === ".") return true;

  // Paths starting with '~' are always invalid
  if (routePath.startsWith("~")) return false;

  // Null character in either path is invalid
  if (routePath.includes("\x00") || basePath.includes("\x00")) return false;

  // Transform the routePath relative to basePath
  const transformedRoute = zxA(wxA(), basePath, routePath);
  // Transform the basePath
  const transformedBase = zxA(wxA(), basePath);
  // Get the relative path from base to route
  const relativePath = nO1(transformedBase, transformedRoute);

  // Invalid if the relative path starts with '..' or is otherwise invalid
  return !relativePath.startsWith("..") && !wi(relativePath);
}

module.exports = isValidRoutePath;