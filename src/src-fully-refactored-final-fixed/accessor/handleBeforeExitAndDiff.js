/**
 * Handles beforeExit and abort events for a file editing session, applies edits, and opens a diff in the IDE.
 *
 * @param {string} sourceObservable - The source observable or identifier for the file.
 * @param {Array<Object>} edits - The list of edits to apply to the file.
 * @param {Object} session - The session object containing options and abort controller.
 * @param {string} tabName - The name of the tab to use in the IDE.
 * @returns {Promise<{oldContent: string, newContent: string}>} An object containing the original and new file contents.
 */
async function handleBeforeExitAndDiff(sourceObservable, edits, session, tabName) {
  let hasHandledExit = false;
  const fs = f1();
  const filePath = f3(sourceObservable);
  const fileExists = fs.existsSync(filePath);
  const originalFileContents = fileExists ? CI(filePath) : "";

  /**
   * Handles cleanup on beforeExit or abort events.
   * Ensures this logic runs only once.
   */
  async function cleanupHandler() {
    if (hasHandledExit) return;
    hasHandledExit = true;
    try {
      await createDebouncedFunction$2(tabName, session, ideEntry);
    } catch (error) {
      reportErrorIfAllowed(error);
    }
    process.off("beforeExit", cleanupHandler);
    session.abortController.signal.removeEventListener("abort", cleanupHandler);
  }

  // Register cleanup handler for abort and beforeExit events
  session.abortController.signal.addEventListener("abort", cleanupHandler);
  process.on("beforeExit", cleanupHandler);

  // Find the connected IDE client entry
  const ideEntry = findConnectedIdeEntry(session.options.mcpClients);

  try {
    // Apply edits to the file and get the updated contents
    const { updatedFile: updatedFileContents } = applyFileEditsWithPatch({
      filePath,
      fileContents: originalFileContents,
      edits
    });

    // Ensure IDE client is available and connected
    if (!ideEntry || ideEntry.type !== "connected") {
      throw new Error("IDE client not available");
    }

    // Open a diff in the IDE with the old and new file contents
    const diffResult = await mN(
      "openDiff",
      {
        old_file_path: filePath,
        new_file_path: filePath,
        new_file_contents: updatedFileContents,
        tab_name: tabName
      },
      ideEntry,
      session.options.isNonInteractiveSession
    );

    // Wrap the result in a consistent structure
    const resultPayload = {
      type: "result",
      data: Array.isArray(diffResult) ? diffResult : [diffResult]
    };

    // Handle the result based on its type
    if (isFileSavedResult(resultPayload)) {
      // User accepted the diff, return new content from result
      cleanupHandler();
      return {
        oldContent: originalFileContents,
        newContent: resultPayload.data[1].text
      };
    } else if (isTabClosedResult(resultPayload)) {
      // User accepted the patch, return updated file contents
      cleanupHandler();
      return {
        oldContent: originalFileContents,
        newContent: updatedFileContents
      };
    } else if (isDiffRejectedResult(resultPayload)) {
      // User rejected the patch, return original contents
      cleanupHandler();
      return {
        oldContent: originalFileContents,
        newContent: originalFileContents
      };
    }

    // If none of the above, throw an error
    throw new Error("Not accepted");
  } catch (error) {
    reportErrorIfAllowed(error);
    cleanupHandler();
    throw error;
  }
}

module.exports = handleBeforeExitAndDiff;
