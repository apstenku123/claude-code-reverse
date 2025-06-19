/**
 * Defines and validates a new package name in the current context.
 *
 * This function ensures that a package name is set only once, validates the name
 * against a regular expression, registers the package, and signals completion.
 *
 * @throws {Error} Throws an error if the package name is already defined or invalid.
 */
function definePackageName() {
  // Check if the package name has already been set
  if (currentPackageName !== undefined) {
    throw createErrorResolver("package");
  }

  // Retrieve the new package name
  currentPackageName = getPackageName();

  // Validate the package name against the required pattern
  if (!packageNameRegex.test(currentPackageName)) {
    throw createErrorResolver(currentPackageName, "name");
  }

  // Register the package name in the namespace
  namespace = namespace.define(currentPackageName);

  // Signal the end of the definition (e.g., by writing a semicolon)
  signalEndOfDefinition(";");
}

module.exports = definePackageName;