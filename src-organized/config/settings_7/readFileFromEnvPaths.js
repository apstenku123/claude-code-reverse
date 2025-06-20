/**
 * Reads a file whose path is determined by two environment variables, after resolving the path using a helper function.
 * If the file cannot be read, logs a warning message.
 *
 * @param {string} envVarNamePrimary - Name of the primary environment variable containing a file path or identifier.
 * @param {string} envVarNameSecondary - Name of the secondary environment variable containing a file path or identifier.
 * @param {string} warningMessage - Message to log as a warning if the file cannot be read.
 * @returns {string|undefined} The contents of the file as a string if successful, otherwise undefined.
 */
function readFileFromEnvPaths(envVarNamePrimary, envVarNameSecondary, warningMessage) {
  // Retrieve and trim the values of the specified environment variables
  const primaryEnvValue = process.env[envVarNamePrimary]?.trim();
  const secondaryEnvValue = process.env[envVarNameSecondary]?.trim();

  // Use getFirstNonEmptyValue to determine the file path from the environment variable values
  const resolvedFilePath = getFirstNonEmptyValue(primaryEnvValue, secondaryEnvValue);

  if (resolvedFilePath != null) {
    try {
      // Resolve the absolute path and read the file synchronously
      const absoluteFilePath = aG6.resolve(process.cwd(), resolvedFilePath);
      return nG6.readFileSync(absoluteFilePath);
    } catch {
      // Log a warning if reading the file fails
      qx0.diag.warn(warningMessage);
      return;
    }
  } else {
    // If the resolved file path is null or undefined, return undefined
    return;
  }
}

module.exports = readFileFromEnvPaths;