/**
 * Applies a set of edits to a file, opens a diff in a connected IDE client, and handles user interaction.
 * Cleans up listeners and returns the old and new file contents based on user action.
 *
 * @param {string} sourceFilePath - The path to the source file to edit.
 * @param {Array<Object>} edits - The list of edits to apply to the file.
 * @param {Object} session - The session object containing options and abort controller.
 * @param {string} tabName - The name of the tab to use in the IDE diff view.
 * @returns {Promise<{oldContent: string, newContent: string}>} The original and resulting file contents after edits and user interaction.
 */
async function applyEditsAndOpenDiffInIde(sourceFilePath, edits, session, tabName) {
  let cleanupTriggered = false;
  const fs = getBm9Value();
  const normalizedFilePath = f3(sourceFilePath);
  const originalFileContents = fs.existsSync(normalizedFilePath)
    ? readFileWithNormalizedLineEndings(normalizedFilePath)
    : "";

  /**
   * Cleans up listeners and aborts the session if not already done.
   */
  async function cleanup() {
    if (cleanupTriggered) return;
    cleanupTriggered = true;
    try {
      await createDebouncedFunction$2(tabName, session, connectedIdeEntry);
    } catch (error) {
      reportErrorIfAllowed(error);
    }
    process.off("beforeExit", cleanup);
    session.abortController.signal.removeEventListener("abort", cleanup);
  }

  // Register cleanup on abort and process exit
  session.abortController.signal.addEventListener("abort", cleanup);
  process.on("beforeExit", cleanup);

  const connectedIdeEntry = findConnectedIdeEntry(session.options.mcpClients);

  try {
    // Apply edits to the file contents
    const { updatedFile: updatedFileContents } = applyEditsToFileContents({
      filePath: normalizedFilePath,
      fileContents: originalFileContents,
      edits: edits
    });

    // Ensure IDE client is connected
    if (!connectedIdeEntry || connectedIdeEntry.type !== "connected") {
      throw new Error("IDE client not available");
    }

    // Request IDE to open a diff view
    const ideResponse = await mN(
      "openDiff",
      {
        old_file_path: normalizedFilePath,
        new_file_path: normalizedFilePath,
        new_file_contents: updatedFileContents,
        tab_name: tabName
      },
      connectedIdeEntry,
      session.options.isNonInteractiveSession
    );

    const result = {
      type: "result",
      data: Array.isArray(ideResponse) ? ideResponse : [ideResponse]
    };

    // Handle user response from IDE
    if (isFileSavedResult(result)) {
      // User accepted the changes (e.g., "Accept Both")
      await cleanup();
      return {
        oldContent: originalFileContents,
        newContent: result.data[1].text
      };
    } else if (isTabClosedResult(result)) {
      // User accepted the new changes
      await cleanup();
      return {
        oldContent: originalFileContents,
        newContent: updatedFileContents
      };
    } else if (isDiffRejectedResult(result)) {
      // User rejected the changes
      await cleanup();
      return {
        oldContent: originalFileContents,
        newContent: originalFileContents
      };
    }

    throw new Error("Not accepted");
  } catch (error) {
    reportErrorIfAllowed(error);
    await cleanup();
    throw error;
  }
}

module.exports = applyEditsAndOpenDiffInIde;