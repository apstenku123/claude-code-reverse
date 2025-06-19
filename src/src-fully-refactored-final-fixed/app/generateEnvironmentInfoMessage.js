/**
 * Generates a detailed environment information message for the current runtime context.
 *
 * This function gathers information about the working directory, git repository status, platform, OS version,
 * and the current date. It also provides a message about the model powering the environment, including its name and updateSnapshotAndNotify if available.
 *
 * @param {string} modelId - The identifier of the model powering the environment.
 * @returns {Promise<string>} a formatted string containing environment details and model information.
 */
async function generateEnvironmentInfoMessage(modelId) {
  // Retrieve git repository status and OS version concurrently
  const [isGitRepo, osVersion] = await Promise.all([
    FV(), // Checks if the current directory is a git repository
    qq6()  // Retrieves the operating system version
  ]);

  // Attempt to get the model'createInteractionAccessor human-readable name
  const modelName = hfA(modelId);

  // Compose a message about the model
  const modelInfoMessage = modelName
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
${modelInfoMessage}
`;

  return environmentInfo;
}

module.exports = generateEnvironmentInfoMessage;