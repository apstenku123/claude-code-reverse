/**
 * Handles beforeExit and abort events to safely apply edits to a file and open a diff view in the IDE.
 *
 * @param {string} sourceFilePath - The path to the source file to be edited.
 * @param {Array<Object>} fileEdits - Array of edit objects to apply to the file.
 * @param {Object} sessionContext - Session context containing abortController, options, etc.
 * @param {string} tabName - The name of the tab to use when opening the diff in the IDE.
 * @returns {Promise<{oldContent: string, newContent: string}>} - An object containing the original and new file contents.
 * @throws Will throw if the IDE client is not available or if the operation is not accepted.
 */
async function handleBeforeExitForFileDiff(sourceFilePath, fileEdits, sessionContext, tabName) {
  let hasHandledExit = false;
  const fs = f1();
  const normalizedFilePath = f3(sourceFilePath);
  const originalFileContent = fs.existsSync(normalizedFilePath) ? CI(normalizedFilePath) : "";

  // Find the first connected IDE client from the session context
  const connectedIdeClient = findConnectedIdeEntry(sessionContext.options.mcpClients);

  /**
   * Handles cleanup on process exit or abort signal.
   * Ensures this logic only runs once.
   */
  async function cleanupOnExit() {
    if (hasHandledExit) return;
    hasHandledExit = true;
    try {
      await createDebouncedFunction$2(tabName, sessionContext, connectedIdeClient);
    } catch (error) {
      reportErrorIfAllowed(error);
    }
    process.off("beforeExit", cleanupOnExit);
    sessionContext.abortController.signal.removeEventListener("abort", cleanupOnExit);
  }

  // Register cleanup handlers
  sessionContext.abortController.signal.addEventListener("abort", cleanupOnExit);
  process.on("beforeExit", cleanupOnExit);

  try {
    // Apply the edits to the file contents
    const { updatedFile: updatedFileContent } = applyFileEditsWithPatch({
      filePath: normalizedFilePath,
      fileContents: originalFileContent,
      edits: fileEdits
    });

    // Ensure handleMissingDoctypeError have a connected IDE client
    if (!connectedIdeClient || connectedIdeClient.type !== "connected") {
      throw new Error("IDE client not available");
    }

    // Send a request to open a diff in the IDE
    const diffResponse = await mN(
      "openDiff",
      {
        old_file_path: normalizedFilePath,
        new_file_path: normalizedFilePath,
        new_file_contents: updatedFileContent,
        tab_name: tabName
      },
      connectedIdeClient,
      sessionContext.options.isNonInteractiveSession
    );

    // Wrap the response in a result object
    const resultEnvelope = {
      type: "result",
      data: Array.isArray(diffResponse) ? diffResponse : [diffResponse]
    };

    // Handle the result based on its type
    if (isFileSavedResult(resultEnvelope)) {
      // User accepted the diff; return the new content from the diff
      await cleanupOnExit();
      return {
        oldContent: originalFileContent,
        newContent: resultEnvelope.data[1].text
      };
    } else if (isTabClosedResult(resultEnvelope)) {
      // User accepted the patch; return the patched content
      await cleanupOnExit();
      return {
        oldContent: originalFileContent,
        newContent: updatedFileContent
      };
    } else if (isDiffRejectedResult(resultEnvelope)) {
      // User rejected the changes; return the original content
      await cleanupOnExit();
      return {
        oldContent: originalFileContent,
        newContent: originalFileContent
      };
    }

    // If none of the above, throw an error
    throw new Error("Not accepted");
  } catch (error) {
    reportErrorIfAllowed(error);
    await cleanupOnExit();
    throw error;
  }
}

module.exports = handleBeforeExitForFileDiff;
