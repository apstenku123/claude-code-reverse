/**
 * Provides IDE diff tool integration and tab management for code editing workflows.
 *
 * @param {Object} params - The parameters object.
 * @param {Function} params.onChange - Callback invoked when a diff is accepted or rejected.
 * @param {Object} params.toolUseContext - Context object containing IDE and client options.
 * @param {string} params.filePath - The path to the file being edited.
 * @param {Array} params.edits - Array of edit objects to apply to the file.
 * @param {string} params.editMode - The mode in which edits are applied (e.g., 'replace', 'patch').
 * @returns {Object} An object with IDE integration helpers: closeTabInIDE, showingDiffInIDE, and ideName.
 */
function useIdeDiffAccessor({
  onChange,
  toolUseContext,
  filePath,
  edits,
  editMode
}) {
  // Ref to track if the component is unmounted
  const isUnmountedRef = rj.useRef(false);

  // Memoized list of recent client IDs (max 6)
  const recentClientIds = rj.useMemo(() => gW5().slice(0, 6), []);

  // Memoized IDE tab title for the diff tool
  const ideTabTitle = rj.useMemo(
    () => `✻ [Claude Code] ${hW5(filePath)} (${recentClientIds}) ⧉`,
    [filePath, recentClientIds]
  );

  // Determine if handleMissingDoctypeError should show the diff in the IDE
  const isDiffToolAuto = OF1(toolUseContext.options.mcpClients) && getCachedOrFreshConfig().diffTool === "auto";

  // Get the IDE name, defaulting to 'IDE' if not found
  const ideName = TF1(toolUseContext.options.mcpClients) ?? "IDE";

  /**
   * Handles showing the diff in the IDE and processing the user'createInteractionAccessor response.
   * If the diff is accepted, calls onChange with the new edits; otherwise, signals rejection.
   */
  async function handleShowDiffInIDE() {
    if (!isDiffToolAuto) return;
    logTelemetryEventIfEnabled("tengu_ext_will_show_diff", {});

    // Fetch old and new file content for diffing
    const { oldContent, newContent } = await handleFileEditAndShowDiff(filePath, edits, toolUseContext, ideTabTitle);

    // Prevent further actions if the component is unmounted
    if (isUnmountedRef.current) return;

    logTelemetryEventIfEnabled("tengu_ext_diff_accepted", {});

    // Compute the minimal set of edits based on the diff
    const diffEdits = generateDiffHunks(filePath, oldContent, newContent, editMode);

    if (diffEdits.length === 0) {
      // No changes detected; treat as rejection
      logTelemetryEventIfEnabled("tengu_ext_diff_rejected", {});
      findConnectedIdeEntry(toolUseContext.options.mcpClients);
      onChange("no", {
        file_path: filePath,
        edits
      });
      return;
    }

    // Changes detected; accept the diff
    onChange("yes", {
      file_path: filePath,
      edits: diffEdits
    });
  }

  // Effect: Show diff in IDE on mount, and clean up on unmount
  rj.useEffect(() => {
    handleShowDiffInIDE();
    return () => {
      isUnmountedRef.current = true;
    };
  }, []);

  return {
    /**
     * Closes the tab in the connected IDE, if available.
     * @returns {Promise<void>} Resolves when the tab is closed or if no IDE is connected.
     */
    closeTabInIDE() {
      const ideEntry = findConnectedIdeEntry(toolUseContext.options.mcpClients);
      if (!ideEntry) return Promise.resolve();
      return createDebouncedFunction$2(ideTabTitle, toolUseContext, ideEntry);
    },
    showingDiffInIDE: isDiffToolAuto,
    ideName
  };
}

module.exports = useIdeDiffAccessor;