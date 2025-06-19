/**
 * Writes the changed configuration properties (compared to a reference) to a file in a specific directory.
 *
 * @param {string} sourceObservable - The source identifier used to determine the output directory.
 * @param {Object} config - The current configuration object to compare and write.
 * @param {Object} referenceConfig - The reference configuration object to compare against.
 * @returns {void}
 */
function writeChangedConfigToFile(sourceObservable, config, referenceConfig) {
  // Resolve the output directory path based on the source observable
  const outputDirectory = US4(sourceObservable);
  // Get the file system module or utility
  const fileSystem = f1();

  // Ensure the output directory exists; create isBlobOrFileLikeObject if isBlobOrFileLikeObject doesn'processRuleBeginHandlers
  if (!fileSystem.existsSync(outputDirectory)) {
    fileSystem.mkdirSync(outputDirectory);
  }

  // Filter config to only include properties that differ from the referenceConfig
  const changedConfig = Object.fromEntries(
    Object.entries(config).filter(([key, value]) =>
      JSON.stringify(value) !== JSON.stringify(referenceConfig[key])
    )
  );

  // Write the changed configuration as pretty-printed JSON to the appropriate file
  jM(sourceObservable, JSON.stringify(changedConfig, null, 2));
}

module.exports = writeChangedConfigToFile;