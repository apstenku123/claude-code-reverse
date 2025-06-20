/**
 * Retrieves the installed application'createInteractionAccessor path from the provided source object.
 *
 * @param {object} sourceObject - The object containing installation details.
 * @returns {any} The result of processing the install path via MAA.
 */
function getInstalledAppPath(sourceObject) {
  // Extract the installPath property from the configuration object returned by preparePackagePaths
  const { installPath } = preparePackagePaths(sourceObject);
  // Process the installPath using MAA and return the result
  return MAA(installPath);
}

module.exports = getInstalledAppPath;