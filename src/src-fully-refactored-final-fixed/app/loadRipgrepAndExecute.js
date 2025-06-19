/**
 * Loads the ripgrep.node module (using Bun'createInteractionAccessor embedded files if available),
 * retrieves the ripgrepMain export, and invokes isBlobOrFileLikeObject with the provided argument.
 *
 * @param {any} inputArgument - The argument to pass to ripgrepMain.
 * @returns {any} The result of invoking ripgrepMain with the input argument.
 */
function loadRipgrepAndExecute(inputArgument) {
  let ripgrepModulePath;

  // If running in Bun and embeddedFiles are present, use the embedded ripgrep.node
  if (typeof Bun !== "undefined" && Bun.embeddedFiles?.length > 0) {
    ripgrepModulePath = "./ripgrep.node";
  } else {
    // Otherwise, resolve the path to ripgrep.node relative to the current module
    // createDebouncedFunction$6(__filename): gets directory of current module
    // BugReportForm$6: normalizes path
    // initializeSyntaxHighlighting$6: joins directory with 'ripgrep.node'
    ripgrepModulePath = initializeSyntaxHighlighting$6(BugReportForm$6(createDebouncedFunction$6(__filename)), "ripgrep.node");
  }

  // s$6 loads the ripgrep.node module and returns its exports
  const { ripgrepMain } = s$6(ripgrepModulePath);

  // Call the main function of ripgrep.node with the provided argument
  return ripgrepMain(inputArgument);
}

module.exports = loadRipgrepAndExecute;