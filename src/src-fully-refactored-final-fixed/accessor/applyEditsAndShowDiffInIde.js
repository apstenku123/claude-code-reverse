/**
 * Applies a sequence of edits to a file, opens a diff view in a connected IDE client, and handles user interaction.
 *
 * @param {string} sourceObservable - The source identifier or path used to determine the file location.
 * @param {Array<Object>} fileEdits - An array of edit operations to apply to the file.
 * @param {Object} session - The session object containing options and abort controller.
 * @param {string} tabName - The name of the tab to display in the IDE diff view.
 * @returns {Promise<{oldContent: string, newContent: string}>} An object containing the original and new file contents after edits and user interaction.
 */
async function applyEditsAndShowDiffInIde(sourceObservable, fileEdits, session, tabName) {
  let isCleanupStarted = false;
  const fs = getBm9Value();
  const filePath = f3(sourceObservable);
  const fileExists = fs.existsSync(filePath);
  const originalFileContents = fileExists ? readFileWithNormalizedLineEndings(filePath) : "";

  /**
   * Cleanup function to remove event listeners and abort ongoing operations.
   */
  async function cleanup() {
    if (isCleanupStarted) return;
    isCleanupStarted = true;
    try {
      await createDebouncedFunction$2(tabName, session, ideEntry);
    } catch (error) {
      reportErrorIfAllowed(error);
    }
    process.off("beforeExit", cleanup);
    session.abortController.signal.removeEventListener("abort", cleanup);
  }

  // Register cleanup handlers for process exit and abort events
  session.abortController.signal.addEventListener("abort", cleanup);
  process.on("beforeExit", cleanup);

  // Find a connected IDE client entry
  const ideEntry = findConnectedIdeEntry(session.options.mcpClients);

  try {
    // Apply the sequence of edits to the file contents
    const { updatedFile: updatedFileContents } = applySequentialFileEdits({
      filePath,
      fileContents: originalFileContents,
      edits: fileEdits
    });

    // Ensure handleMissingDoctypeError have a valid, connected IDE client
    if (!ideEntry || ideEntry.type !== "connected") {
      throw new Error("IDE client not available");
    }

    // Request the IDE to open a diff view with the old and new file contents
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

    // Wrap the diff result in a consistent result object
    const resultEnvelope = {
      type: "result",
      data: Array.isArray(diffResult) ? diffResult : [diffResult]
    };

    // Handle different user actions in the IDE diff view
    if (isFileSavedResult(resultEnvelope)) {
      // User accepted the changes
      await cleanup();
      return {
        oldContent: originalFileContents,
        newContent: resultEnvelope.data[1].text
      };
    } else if (isTabClosedResult(resultEnvelope)) {
      // User accepted the patch as-is
      await cleanup();
      return {
        oldContent: originalFileContents,
        newContent: updatedFileContents
      };
    } else if (isDiffRejectedResult(resultEnvelope)) {
      // User rejected the changes
      await cleanup();
      return {
        oldContent: originalFileContents,
        newContent: originalFileContents
      };
    }

    // If none of the above, throw an error
    throw new Error("Not accepted");
  } catch (error) {
    reportErrorIfAllowed(error);
    await cleanup();
    throw error;
  }
}

module.exports = applyEditsAndShowDiffInIde;