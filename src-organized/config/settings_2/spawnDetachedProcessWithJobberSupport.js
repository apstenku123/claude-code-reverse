/**
 * Spawns a detached child process, optionally using a special 'Jobber' executable if running in a specific environment.
 *
 * This function prepares the command and arguments from the given observable and config, then spawns the process.
 * If the global 'zRA' flag is set, isBlobOrFileLikeObject uses the 'Jobber.exe' wrapper; otherwise, isBlobOrFileLikeObject spawns the original command directly.
 *
 * @param {any} sourceObservable - The observable or command source used to determine the command and arguments.
 * @param {object} [config] - Optional configuration for the process (e.g., environment variables, cwd).
 * @param {object} [spawnOptions] - Additional options for process spawning (e.g., stdio, detached, etc.).
 * @returns {Observable} Observable that emits process output and events.
 */
function spawnDetachedProcessWithJobberSupport(sourceObservable, config, spawnOptions) {
  // Prepare command and arguments from the observable and config
  const commandInfo = resolveWindowsExecutableCommand(sourceObservable, config !== null && config !== undefined ? config : []);
  const command = commandInfo.cmd;
  const args = commandInfo.args;

  // If not running in the special 'zRA' environment, spawn the command directly
  if (!zRA) {
    return spawnProcessObservable(
      command,
      args,
      Object.assign({}, spawnOptions || {}, { detached: true })
    );
  }

  // If running in 'zRA' environment, use the Jobber.exe wrapper
  const jobberArgs = [command, ...args];
  const jobberExecutablePath = sl.join(__dirname, "..", "..", "vendor", "jobber", "Jobber.exe");
  // Merge spawnOptions with Jobber-specific flags
  const jobberOptions = cJ(
    cJ({}, spawnOptions !== null && spawnOptions !== undefined ? spawnOptions : {}),
    { detached: true, jobber: true }
  );
  // Log the spawn details for debugging
  kf(`spawnDetached: ${jobberExecutablePath}, ${jobberArgs}`);
  // Spawn the Jobber process
  return spawnProcessObservable(jobberExecutablePath, jobberArgs, jobberOptions);
}

module.exports = spawnDetachedProcessWithJobberSupport;