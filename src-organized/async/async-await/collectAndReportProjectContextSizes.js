/**
 * Collects various project context sizes (directory structure, git status, Claude markdown),
 * computes their totals, and reports them for analytics/telemetry purposes.
 * Also calculates a rounded project file count asynchronously with a timeout safeguard.
 *
 * @async
 * @function collectAndReportProjectContextSizes
 * @param {Object} contextData - The context data object containing project information.
 * @param {Array} [contextData.directoryStructure] - Array representing the project'createInteractionAccessor directory structure.
 * @param {Array} [contextData.gitStatus] - Array representing the project'createInteractionAccessor git status.
 * @param {Array} [contextData.claudeMd] - Array representing Claude markdown context.
 * @returns {Promise<void>} Resolves when reporting is complete.
 */
async function collectAndReportProjectContextSizes(contextData) {
  // Calculate the size of each context array, defaulting to 0 if missing
  const directoryStructureSize = contextData.directoryStructure?.length ?? 0;
  const gitStatusSize = contextData.gitStatus?.length ?? 0;
  const claudeMdSize = contextData.claudeMd?.length ?? 0;

  // Compute the total context size
  const totalContextSize = directoryStructureSize + gitStatusSize + claudeMdSize;

  // Retrieve project configuration (may include ignore patterns)
  const projectConfig = getProjectSubscriptionConfig();

  // Create an AbortController to enforce a timeout on the async operation
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), 1000); // Abort after 1 second

  // Calculate the rounded project file count, respecting ignore patterns
  let projectFileCountRounded = await w51(
    iA(),
    abortController.signal,
    projectConfig.ignorePatterns ?? []
  );

  // Report all collected metrics for analytics/telemetry
  logTelemetryEventIfEnabled("tengu_context_size", {
    directory_structure_size: directoryStructureSize,
    git_status_size: gitStatusSize,
    claude_md_size: claudeMdSize,
    total_context_size: totalContextSize,
    project_file_count_rounded: projectFileCountRounded
  });
}

module.exports = collectAndReportProjectContextSizes;