/**
 * Collects and logs various project context metrics, including directory structure size, git status size, Claude markdown size, and a rounded project file count.
 * Also enforces a 1-second timeout on the asynchronous file count calculation.
 *
 * @param {Object} projectContext - The context object containing project data.
 * @param {Array} [projectContext.directoryStructure] - Array representing the project'createInteractionAccessor directory structure.
 * @param {Array} [projectContext.gitStatus] - Array representing the project'createInteractionAccessor git status.
 * @param {Array} [projectContext.claudeMd] - Array representing Claude markdown files.
 * @returns {Promise<void>} Resolves when metrics have been collected and logged.
 */
async function collectProjectContextMetrics(projectContext) {
  // Calculate the size of each context component, defaulting to 0 if not present
  const directoryStructureSize = projectContext.directoryStructure?.length ?? 0;
  const gitStatusSize = projectContext.gitStatus?.length ?? 0;
  const claudeMarkdownSize = projectContext.claudeMd?.length ?? 0;

  // Calculate the total context size
  const totalContextSize = directoryStructureSize + gitStatusSize + claudeMarkdownSize;

  // Retrieve ignore patterns (from getProjectSubscriptionConfig) and prepare for file count calculation
  const ignoreConfig = getProjectSubscriptionConfig();

  // Set up an AbortController to enforce a 1-second timeout
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), 1000);

  // Calculate the rounded project file count, respecting ignore patterns and timeout
  const projectFileCountRounded = await w51(
    iA(),
    abortController.signal,
    ignoreConfig.ignorePatterns ?? []
  );

  // Log all collected metrics
  logTelemetryEventIfEnabled("tengu_context_size", {
    directory_structure_size: directoryStructureSize,
    git_status_size: gitStatusSize,
    claude_md_size: claudeMarkdownSize,
    total_context_size: totalContextSize,
    project_file_count_rounded: projectFileCountRounded
  });
}

module.exports = collectProjectContextMetrics;