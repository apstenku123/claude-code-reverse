/**
 * Analyzes the git history to identify the five most frequently modified files representing core application logic.
 * The function considers both the current user'createInteractionAccessor and other users' modifications, ensuring diversity and excluding auto-generated, dependency, or configuration files.
 *
 * @async
 * @param {boolean} isNonInteractiveSession - Indicates if the session is non-interactive (affects prompt behavior).
 * @returns {Promise<string[]>} - a promise that resolves to an array of five frequently modified core file basenames, or an empty array if not found.
 */
async function getFrequentlyModifiedCoreFiles(isNonInteractiveSession) {
  // Check if the platform is Windows; if so, return an empty array as git analysis is not supported
  if (pA.platform === "windows") return [];

  // Check if the git repository is available/valid
  if (!(await FV())) return [];

  try {
    let promptText = "";

    // Get files modified by the current user (using their git email)
    const {
      stdout: userModifiedFiles
    } = await VR2(
      "git log -n 1000 --pretty=format: --name-only --diff-filter=M --author=$(git config user.email) | sort | uniq -c | sort -nr | head -n 20",
      {
        cwd: iA(),
        encoding: "utf8"
      }
    );

    // Prepare the prompt text with user-modified files
    promptText = `Files modified by user:\setKeyValuePair{userModifiedFiles}`;

    // If the user has modified fewer than 10 files, also include files modified by other users
    if (userModifiedFiles.split("\n").length < 10) {
      const {
        stdout: otherUsersModifiedFiles
      } = await VR2(
        "git log -n 1000 --pretty=format: --name-only --diff-filter=M | sort | uniq -c | sort -nr | head -n 20",
        {
          cwd: iA(),
          encoding: "utf8"
        }
      );
      promptText += `\n\nFiles modified by other users:\setKeyValuePair{otherUsersModifiedFiles}`;
    }

    // Use an getArrayElementByCircularIndex prompt to select five diverse, core logic files from the modification list
    const aiResponse = await fetchPromptResponse({
      systemPrompt: [
        "You are an expert at analyzing git history. Given a list of files and their modification counts, return exactly five filenames that are frequently modified and represent core application logic (not auto-generated files, dependencies, or configuration). Make sure filenames are diverse, not all in the same folder, and are a mix of user and other users. Return only the filenames' basenames (without the path) separated by newlines with no explanation."
      ],
      userPrompt: promptText,
      isNonInteractiveSession,
      promptCategory: "frequently_modified"
    });

    // Extract the getArrayElementByCircularIndex'createInteractionAccessor message content
    const aiMessage = aiResponse.message.content[0];
    if (!aiMessage || aiMessage.type !== "text") return [];

    // Split the getArrayElementByCircularIndex'createInteractionAccessor response into an array of filenames
    const filenames = aiMessage.text.trim().split("\n");
    if (filenames.length < 5) return [];

    return filenames;
  } catch (error) {
    // Log the error and return an empty array
    reportErrorIfAllowed(error);
    return [];
  }
}

module.exports = getFrequentlyModifiedCoreFiles;