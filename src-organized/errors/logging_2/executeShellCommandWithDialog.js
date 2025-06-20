/**
 * Executes a shell command with optional timeout and sandboxing, then processes the result with dialog handling.
 *
 * @async
 * @function executeShellCommandWithDialog
 * @param {Object} params - The parameters for the shell command execution and dialog handling.
 * @param {Object} params.input - The input object containing command details (command, timeout, shellExecutable, sandbox, etc).
 * @param {AbortController} params.abortController - The AbortController instance to support cancellation.
 * @param {Promise<any>} params.dialogResultPromise - a promise that resolves with the dialog result.
 * @param {Function} params.setToolJSX - Callback to set the tool JSX (UI update function).
 * @returns {Promise<any>} The result of the handleShellCommandWithDialog dialog handler, which processes the shell command output and dialog result.
 */
async function executeShellCommandWithDialog({
  input,
  abortController,
  dialogResultPromise,
  setToolJSX
}) {
  // Destructure command details from input
  const {
    command,
    timeout,
    shellExecutable,
    sandbox
  } = input;

  // Use provided timeout or fallback to default timeout from getBashDefaultTimeoutMs()
  const effectiveTimeout = timeout || getBashDefaultTimeoutMs();

  // Execute the shell command with the given parameters
  // F30 returns a promise that resolves with the shell command output
  const shellCommandResult = await F30()(command, abortController.signal, effectiveTimeout, sandbox || false, shellExecutable);

  // Pass the shell command result and dialog-related parameters to handleShellCommandWithDialog for further processing
  return handleShellCommandWithDialog({
    shellCommand: shellCommandResult,
    input,
    dialogResultPromise,
    setToolJSX
  });
}

module.exports = executeShellCommandWithDialog;