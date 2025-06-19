/**
 * Handles applying edits to a file, shows a diff in the IDE, and manages abort/exit events.
 *
 * @param {string} sourceFilePath - The path to the source file to edit.
 * @param {Array<Object>} fileEdits - The list of edits to apply to the file.
 * @param {Object} sessionContext - The session context, including abort controller and options.
 * @param {string} tabName - The name of the tab to use in the IDE for the diff view.
 * @returns {Promise<{oldContent: string, newContent: string}>} An object containing the old and new file contents.
 */
async function handleFileEditAndShowDiff(sourceFilePath, fileEdits, sessionContext, tabName) {
  let hasCleanupRun = false;
  const fs = f1();
  const resolvedFilePath = f3(sourceFilePath);
  const originalFileContents = fs.existsSync(resolvedFilePath) ? CI(resolvedFilePath) : "";

  /**
   * Cleanup function to remove event listeners and abort ongoing operations.
   */
  async function cleanup() {
    if (hasCleanupRun) return;
    hasCleanupRun = true;
    try {
      await createDebouncedFunction$2(tabName, sessionContext, connectedIdeEntry);
    } catch (cleanupError) {
      reportErrorIfAllowed(cleanupError);
    }
    process.off("beforeExit", cleanup);
    sessionContext.abortController.signal.removeEventListener("abort", cleanup);
  }

  // Register cleanup on abort and process exit
  sessionContext.abortController.signal.addEventListener("abort", cleanup);
  process.on("beforeExit", cleanup);

  // Find the first connected IDE client from the session context
  const connectedIdeEntry = findConnectedIdeEntry(sessionContext.options.mcpClients);

  try {
    // Apply edits to the file and get the updated contents
    const { updatedFile: updatedFileContents } = applyFileEditsWithPatch({
      filePath: resolvedFilePath,
      fileContents: originalFileContents,
      edits: fileEdits
    });

    // Ensure handleMissingDoctypeError have a connected IDE client
    if (!connectedIdeEntry || connectedIdeEntry.type !== "connected") {
      throw new Error("IDE client not available");
    }

    // Request the IDE to open a diff view
    const diffResponse = await mN(
      "openDiff",
      {
        old_file_path: resolvedFilePath,
        new_file_path: resolvedFilePath,
        new_file_contents: updatedFileContents,
        tab_name: tabName
      },
      connectedIdeEntry,
      sessionContext.options.isNonInteractiveSession
    );

    // Wrap the response in a result object
    const result = {
      type: "result",
      data: Array.isArray(diffResponse) ? diffResponse : [diffResponse]
    };

    // Handle different result types and return the appropriate content
    if (isFileSavedResult(result)) {
      await cleanup();
      return {
        oldContent: originalFileContents,
        newContent: result.data[1].text
      };
    } else if (isTabClosedResult(result)) {
      await cleanup();
      return {
        oldContent: originalFileContents,
        newContent: updatedFileContents
      };
    } else if (isDiffRejectedResult(result)) {
      await cleanup();
      return {
        oldContent: originalFileContents,
        newContent: originalFileContents
      };
    }

    // If none of the handlers matched, throw an error
    throw new Error("Not accepted");
  } catch (error) {
    reportErrorIfAllowed(error);
    await cleanup();
    throw error;
  }
}

module.exports = handleFileEditAndShowDiff;