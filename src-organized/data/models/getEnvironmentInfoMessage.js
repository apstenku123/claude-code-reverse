/**
 * Retrieves and formats a detailed message about the current runtime environment.
 *
 * This function gathers information such as the working directory, whether the directory is a git repository,
 * the platform, OS version, and the current date. It also provides a message about the model being used.
 *
 * @param {string} modelId - The identifier of the model currently in use.
 * @returns {Promise<string>} a formatted string containing environment details and model information.
 */
async function getEnvironmentInfoMessage(modelId) {
  // Retrieve whether the current directory is a git repo and the OS version in parallel
  const [isGitRepo, osVersion] = await Promise.all([
    FV(),      // Checks if the working directory is a git repository
    qq6()      // Retrieves the OS version
  ]);

  // Attempt to get a human-readable model name from the model updateSnapshotAndNotify
  const modelName = hfA(modelId);

  // Construct a message about the model
  const modelMessage = modelName
    ? `You are powered by the model named ${modelName}. The exact model updateSnapshotAndNotify is ${modelId}.`
    : `You are powered by the model ${modelId}.`;

  // Build the environment information message
  const environmentInfo = `Here is useful information about the environment you are running in:
<env>
Working directory: ${iA()}
Is directory a git repo: ${isGitRepo ? "Yes" : "No"}
Platform: ${pA.platform}
OS Version: ${osVersion}
Today'createInteractionAccessor date: ${new Date().toLocaleDateString()}
</env>
${modelMessage}
`;

  return environmentInfo;
}

module.exports = getEnvironmentInfoMessage;