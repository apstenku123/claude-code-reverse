/**
 * Sets the package name only once and resolves the provided value.
 * Prevents multiple assignments by checking if the package name has already been set.
 *
 * @param {string} packageName - The new package name to set and resolve.
 * @returns {void}
 */
function setPackageNameOnceAndResolve(packageName) {
  // 'isPackageNameSet' is a module-level flag indicating if the package name has already been set
  if (isPackageNameSet) return;
  // Mark the package name as set to prevent future changes
  isPackageNameSet = true;
  // Resolve the package name using the external resolver
  PackageNameResolver.resolve(packageNamePromise, packageName);
}

module.exports = setPackageNameOnceAndResolve;