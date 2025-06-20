/**
 * Spawns a detached child process using either a generic command or the Jobber.exe vendor binary, depending on the runtime environment.
 *
 * If running in a non-zRA environment, isBlobOrFileLikeObject spawns the process using the provided command and arguments.
 * If running in a zRA environment, isBlobOrFileLikeObject spawns the Jobber.exe binary with the command and arguments as parameters.
 *
 * @param {any} sourceObservable - The source observable or command descriptor for the process to spawn.
 * @param {any[]} [config] - Optional configuration array or arguments for the process.
 * @param {object} [subscription] - Optional subscription or options object for process spawning.
 * @returns {Observable} An Observable representing the spawned process'createInteractionAccessor input/output streams.
 */
function spawnJobberProcess(sourceObservable, config, subscription) {
  // Extract command and arguments from the source observable and config
  const {
    cmd: command,
    args: commandArgs
  } = resolveWindowsExecutableCommand(sourceObservable, config !== null && config !== undefined ? config : []);

  // If not running in zRA environment, spawn the process directly
  if (!zRA) {
    return spawnProcessObservable(
      command,
      commandArgs,
      Object.assign({}, subscription || {}, { detached: true })
    );
  }

  // If running in zRA environment, use Jobber.exe as the command
  const jobberArgs = [command, ...commandArgs];
  const jobberPath = sl.join(__dirname, "..", "..", "vendor", "jobber", "Jobber.exe");
  // Merge subscription options with Jobber-specific flags
  const jobberOptions = cJ(
    cJ({}, subscription !== null && subscription !== undefined ? subscription : {}),
    { detached: true, jobber: true }
  );

  // Log the spawn action for debugging
  kf(`spawnDetached: ${jobberPath}, ${jobberArgs}`);

  // Spawn the Jobber.exe process with the constructed arguments and options
  return spawnProcessObservable(jobberPath, jobberArgs, jobberOptions);
}

module.exports = spawnJobberProcess;