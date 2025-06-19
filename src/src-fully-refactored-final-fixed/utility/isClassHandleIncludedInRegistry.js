/**
 * Checks if a class handle, created from the given class name and options, exists in the specified registry.
 *
 * @param {string} className - The name of the class to create a handle for.
 * @param {object} options - Options used to create the class handle.
 * @param {string} registryKey - The key identifying the registry to check for the class handle.
 * @returns {boolean} True if the class handle exists in the registry, false otherwise.
 */
function isClassHandleIncludedInRegistry(className, options, registryKey) {
  // Perform any required validation or setup for the registry key
  b9(registryKey);

  // Create a class handle using the provided class name and options
  const classHandle = createClassHandle(className, options);

  // Check if the generated class handle exists in the specified registry
  return X0[registryKey].includes(classHandle);
}

module.exports = isClassHandleIncludedInRegistry;