/**
 * Handles applying a set of edits to a file, opening a diff in the IDE, and managing abort/exit events.
 *
 * @param {string} sourceObservable - The source identifier or observable for the file.
 * @param {Array<Object>} fileEdits - The list of edits to apply to the file.
 * @param {Object} subscription - The subscription object containing options and abort controller.
 * @param {string} tabName - The name of the tab to use when opening the diff in the IDE.
 * @returns {Promise<{oldContent: string, newContent: string}>} An object containing the old and new file contents after edits.
 */
async function handleFileDiffAndApplyEdits(sourceObservable, fileEdits, subscription, tabName) {
  let isCleanupTriggered = false;
  const fs = f1();
  const filePath = f3(sourceObservable);
  const fileExists = fs.existsSync(filePath);
  const originalFileContents = fileExists ? CI(filePath) : "";

  /**
   * Cleanup handler to abort operations and remove event listeners.
   */
  async function cleanupHandler() {
    if (isCleanupTriggered) return;
    isCleanupTriggered = true;
    try {
      await createDebouncedFunction$2(tabName, subscription, connectedIdeEntry);
    } catch (error) {
      reportErrorIfAllowed(error);
    }
    process.off("beforeExit", cleanupHandler);
    subscription.abortController.signal.removeEventListener("abort", cleanupHandler);
  }

  // Register abort and process exit handlers
  subscription.abortController.signal.addEventListener("abort", cleanupHandler);
  process.on("beforeExit", cleanupHandler);

  // Find the connected IDE client entry
  const connectedIdeEntry = findConnectedIdeEntry(subscription.options.mcpClients);

  try {
    // Apply the edits to the file contents
    const { updatedFile: updatedFileContents } = applyFileEditsWithPatch({
      filePath,
      fileContents: originalFileContents,
      edits: fileEdits
    });

    // Ensure handleMissingDoctypeError have a connected IDE client
    if (!connectedIdeEntry || connectedIdeEntry.type !== "connected") {
      throw new Error("IDE client not available");
    }

    // Send the diff to the IDE client
    const ideResponse = await mN(
      "openDiff",
      {
        old_file_path: filePath,
        new_file_path: filePath,
        new_file_contents: updatedFileContents,
        tab_name: tabName
      },
      connectedIdeEntry,
      subscription.options.isNonInteractiveSession
    );

    // Wrap the response in a result object
    const resultEnvelope = {
      type: "result",
      data: Array.isArray(ideResponse) ? ideResponse : [ideResponse]
    };

    // Handle different result types
    if (isFileSavedResult(resultEnvelope)) {
      // User accepted the diff, return new content from the IDE response
      await cleanupHandler();
      return {
        oldContent: originalFileContents,
        newContent: resultEnvelope.data[1].text
      };
    } else if (isTabClosedResult(resultEnvelope)) {
      // User accepted the patch, return the updated file contents
      await cleanupHandler();
      return {
        oldContent: originalFileContents,
        newContent: updatedFileContents
      };
    } else if (isDiffRejectedResult(resultEnvelope)) {
      // User rejected the changes, return the original contents
      await cleanupHandler();
      return {
        oldContent: originalFileContents,
        newContent: originalFileContents
      };
    }

    // If none of the above, throw an error
    throw new Error("Not accepted");
  } catch (error) {
    // Log the error, cleanup, and rethrow
    reportErrorIfAllowed(error);
    await cleanupHandler();
    throw error;
  }
}

module.exports = handleFileDiffAndApplyEdits;
