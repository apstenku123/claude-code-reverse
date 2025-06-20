/**
 * Rebuilds native Node.js modules using node-gyp in the 'src' directory.
 * If the Emscripten compiler is detected, adds the '--nodedir=emscripten' flag.
 * Runs the command synchronously and returns the process exit status.
 *
 * @returns {number|null} The exit status code of the node-gyp rebuild process, or null if the process failed to launch.
 */
const rebuildNativeModules = () => {
  // Import dependencies
  const isEmccCompilerSet = require('./isEmccCompilerSet'); // sK2
  const runCommandSync = require('./runCommandSync'); // yV1
  const baseSpawnOptions = require('./baseSpawnOptions'); // xV1

  // Build the node-gyp command with optional emscripten flag
  const emscriptenFlag = isEmccCompilerSet() ? '--nodedir=emscripten' : '';
  const nodeGypCommand = `node-gyp rebuild --directory=src ${emscriptenFlag}`.trim();

  // Merge base spawn options and set stdio to inherit for real-time output
  const spawnOptions = {
    ...baseSpawnOptions,
    stdio: 'inherit'
  };

  // Run the command synchronously and return the exit status
  const result = runCommandSync(nodeGypCommand, spawnOptions);
  return result.status;
};

module.exports = rebuildNativeModules;
