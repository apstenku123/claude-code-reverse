/**
 * Builds a tool permission context object based on allowed and disallowed CLI tools, permission mode, and additional working directories.
 * Validates each additional directory, collecting warnings for invalid paths.
 *
 * @param {Object} options - Configuration options for building the permission context.
 * @param {string[]} options.allowedToolsCli - List of CLI tools that are always allowed.
 * @param {string[]} options.disallowedToolsCli - List of CLI tools that are always denied.
 * @param {string} options.permissionMode - The permission mode to use for the context.
 * @param {string[]} options.addDirs - Additional directories to include as working directories.
 * @returns {Object} An object containing the toolPermissionContext and any warnings encountered during directory validation.
 */
function buildToolPermissionContext({
  allowedToolsCli,
  disallowedToolsCli,
  permissionMode,
  addDirs
}) {
  // Convert allowed and disallowed tool lists to internal rule representations
  const alwaysAllowRules = splitAndTrimCommaSeparatedStrings(allowedToolsCli);
  const alwaysDenyRules = splitAndTrimCommaSeparatedStrings(disallowedToolsCli);

  // Collect warnings for invalid directories
  const warnings = [];

  // Set of additional working directories
  const additionalWorkingDirectories = new Set();

  // Get current working directory from environment
  const currentWorkingDirectory = process.env.PWD;

  // Add current working directory if isBlobOrFileLikeObject exists and is not the default
  if (currentWorkingDirectory && currentWorkingDirectory !== C4()) {
    additionalWorkingDirectories.add(currentWorkingDirectory);
  }

  // Validate and add each additional directory
  for (const dir of addDirs) {
    // If dir is absolute, use as is; otherwise, resolve relative to default
    const resolvedDir = WU5(dir) ? dir : FU5(C4(), dir);
    try {
      // Check if the resolved path exists and is a directory
      if (!f1().statSync(resolvedDir).isDirectory()) {
        warnings.push(`Error: --add-dir path is not a directory: ${dir}`);
        continue;
      }
      additionalWorkingDirectories.add(resolvedDir);
    } catch {
      // Directory does not exist or is inaccessible
      warnings.push(`Error: --add-dir path does not exist: ${dir}`);
      continue;
    }
  }

  // Build the tool permission context using provided rules and directories
  const toolPermissionContext = updateRuleSetsWithBehaviors({
    mode: permissionMode,
    additionalWorkingDirectories,
    alwaysAllowRules: {
      cliArg: alwaysAllowRules
    },
    alwaysDenyRules: {
      cliArg: alwaysDenyRules
    }
  }, getAllowedToolRules());

  return {
    toolPermissionContext,
    warnings
  };
}

module.exports = buildToolPermissionContext;