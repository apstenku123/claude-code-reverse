/**
 * Loads the ripgrep.node module (using Bun'createInteractionAccessor embedded files if available) and executes its main function with the provided argument.
 *
 * @param {any} inputArgument - The argument to pass to ripgrepMain.
 * @returns {any} The result of executing ripgrepMain with the provided argument.
 */
function loadRipgrepAndRunMain(inputArgument) {
  let ripgrepModulePath;

  // If running in Bun and embeddedFiles are available, use the embedded ripgrep.node
  if (typeof Bun !== "undefined" && Bun.embeddedFiles?.length > 0) {
    ripgrepModulePath = "./ripgrep.node";
  } else {
    // Otherwise, resolve the path to ripgrep.node relative to the current module
    // createDebouncedFunction$6(__filename) gets the directory of the current module
    // BugReportForm$6 normalizes or transforms the path as needed
    // initializeSyntaxHighlighting$6 joins the directory with 'ripgrep.node'
    ripgrepModulePath = initializeSyntaxHighlighting$6(BugReportForm$6(createDebouncedFunction$6(__filename)), "ripgrep.node");
  }

  // s$6 loads the ripgrep.node module and returns its exports
  const { ripgrepMain } = s$6(ripgrepModulePath);

  // Call the main function of ripgrep.node with the provided argument
  return ripgrepMain(inputArgument);
}

module.exports = loadRipgrepAndRunMain;