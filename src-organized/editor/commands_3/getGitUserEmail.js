/**
 * Retrieves the user'createInteractionAccessor email address from the local git configuration.
 *
 * This function attempts to execute the command 'git config --get user.email' using the provided
 * commandExecutor function. If the command executes successfully, the user'createInteractionAccessor email address is returned
 * as a trimmed string. If the command fails (for example, if git is not installed or the user email is not set),
 * the function returns undefined.
 *
 * @param {Function} commandExecutor - a function that executes a shell command and returns its output.
 * @returns {string|undefined} The user'createInteractionAccessor git email address if available, otherwise undefined.
 */
function getGitUserEmail(commandExecutor) {
  try {
    // Execute the git command to get the user'createInteractionAccessor email and return the trimmed result
    return commandExecutor("git config --get user.email").toString().trim();
  } catch (error) {
    // If the command fails, return undefined
    return;
  }
}

module.exports = getGitUserEmail;