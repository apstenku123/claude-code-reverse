/**
 * Spawns a detached process, using either a direct command or a vendor Jobber executable depending on the environment.
 * Handles process spawning as an Observable, supporting custom arguments and options.
 *
 * @param {any} sourceObservable - The source observable or command configuration for the process.
 * @param {any[]} [args=[]] - Optional array of arguments for the process.
 * @param {object} [spawnOptions={}] - Additional options for process spawning (e.g., environment variables, working directory).
 * @returns {Observable<any>} Observable emitting process output and lifecycle events.
 */
function spawnDetachedProcess(sourceObservable, args = [], spawnOptions = {}) {
  // Extract command and arguments using resolveWindowsExecutableCommand utility
  const { cmd: command, args: commandArgs } = resolveWindowsExecutableCommand(sourceObservable, args);

  // If not running in a restricted environment, spawn the process directly
  if (!zRA) {
    return spawnProcessObservable(
      command,
      commandArgs,
      Object.assign({}, spawnOptions || {}, { detached: true })
    );
  }

  // If running in a restricted environment, use the Jobber executable
  const jobberArgs = [command, ...commandArgs];
  const jobberExecutablePath = sl.join(__dirname, "..", "..", "vendor", "jobber", "Jobber.exe");
  const jobberOptions = cJ(
    cJ({}, spawnOptions || {}),
    { detached: true, jobber: true }
  );

  // Log the spawn action for debugging
  kf(`spawnDetached: ${jobberExecutablePath}, ${jobberArgs}`);

  // Spawn the Jobber process as an Observable
  return spawnProcessObservable(jobberExecutablePath, jobberArgs, jobberOptions);
}

module.exports = spawnDetachedProcess;