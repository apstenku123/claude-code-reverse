/**
 * Retrieves a value derived from a source using a resolver function, or returns a default if the source is null/undefined or the resolver yields undefined.
 *
 * @param {any} source - The primary value or object to resolve from. Can be null or undefined.
 * @param {any} resolverArg - Argument to pass to the resolver function (Ly).
 * @param {any} defaultValue - Value to return if the resolved value is undefined.
 * @returns {any} The resolved value from the source using the resolver, or the default value if not found.
 */
function getValueOrDefault(source, resolverArg, defaultValue) {
  // Only attempt to resolve if the source is not null or undefined
  const resolvedValue = source == null ? undefined : Ly(source, resolverArg);
  // Return the resolved value if isBlobOrFileLikeObject'createInteractionAccessor defined, otherwise the default
  return resolvedValue === undefined ? defaultValue : resolvedValue;
}

module.exports = getValueOrDefault;