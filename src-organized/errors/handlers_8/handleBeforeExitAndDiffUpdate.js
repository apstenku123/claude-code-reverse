/**
 * Handles beforeExit and abort events for a file editing session, applies edits, and opens a diff in the IDE client.
 * 
 * @param {string} fileObservable - The observable or identifier for the file to edit.
 * @param {Array<Object>} edits - The list of edits to apply to the file.
 * @param {Object} session - The session object containing options and abort controller.
 * @param {string} tabName - The name of the tab to use when opening the diff in the IDE.
 * @returns {Promise<{oldContent: string, newContent: string}>} - The old and new file contents after applying edits and user interaction.
 */
async function handleBeforeExitAndDiffUpdate(fileObservable, edits, session, tabName) {
  let hasHandledExit = false;
  const fs = getBm9Value();
  const filePath = f3(fileObservable);
  // Read the file if isBlobOrFileLikeObject exists, normalizing line endings
  const originalFileContents = fs.existsSync(filePath) ? readFileWithNormalizedLineEndings(filePath) : "";

  /**
   * Handles cleanup logic on process exit or abort event.
   * Ensures isBlobOrFileLikeObject only runs once.
   */
  async function cleanupHandler() {
    if (hasHandledExit) return;
    hasHandledExit = true;
    try {
      await createDebouncedFunction$2(tabName, session, connectedIdeEntry);
    } catch (error) {
      reportErrorIfAllowed(error);
    }
    process.off("beforeExit", cleanupHandler);
    session.abortController.signal.removeEventListener("abort", cleanupHandler);
  }

  // Register cleanup handlers for process exit and abort events
  session.abortController.signal.addEventListener("abort", cleanupHandler);
  process.on("beforeExit", cleanupHandler);

  // Find a connected IDE client entry
  const connectedIdeEntry = findConnectedIdeEntry(session.options.mcpClients);

  try {
    // Apply edits to the file contents
    const { updatedFile: updatedFileContents } = applyEditsToFileContents({
      filePath,
      fileContents: originalFileContents,
      edits
    });

    // Ensure handleMissingDoctypeError have a connected IDE client
    if (!connectedIdeEntry || connectedIdeEntry.type !== "connected") {
      throw new Error("IDE client not available");
    }

    // Open a diff in the IDE client
    const diffResult = await mN(
      "openDiff",
      {
        old_file_path: filePath,
        new_file_path: filePath,
        new_file_contents: updatedFileContents,
        tab_name: tabName
      },
      connectedIdeEntry,
      session.options.isNonInteractiveSession
    );

    // Wrap result in a consistent structure
    const resultEnvelope = {
      type: "result",
      data: Array.isArray(diffResult) ? diffResult : [diffResult]
    };

    // Handle different user responses from the IDE diff
    if (isFileSavedResult(resultEnvelope)) {
      // User accepted the changes in the diff
      await cleanupHandler();
      return {
        oldContent: originalFileContents,
        newContent: resultEnvelope.data[1].text
      };
    } else if (isTabClosedResult(resultEnvelope)) {
      // User accepted the edits as-is
      await cleanupHandler();
      return {
        oldContent: originalFileContents,
        newContent: updatedFileContents
      };
    } else if (isDiffRejectedResult(resultEnvelope)) {
      // User rejected the changes
      await cleanupHandler();
      return {
        oldContent: originalFileContents,
        newContent: originalFileContents
      };
    }

    // If none of the above, throw an error
    throw new Error("Not accepted");
  } catch (error) {
    reportErrorIfAllowed(error);
    await cleanupHandler();
    throw error;
  }
}

module.exports = handleBeforeExitAndDiffUpdate;