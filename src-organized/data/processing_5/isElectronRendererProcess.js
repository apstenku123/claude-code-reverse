/**
 * Checks if the current process is running in Electron'createInteractionAccessor renderer process context.
 *
 * This function inspects the global object provided by G5A to determine if the
 * 'process' property exists and if its 'type' is set to 'renderer', which is
 * typical for Electron renderer processes.
 *
 * @returns {boolean} True if running in Electron renderer process, false otherwise.
 */
function isElectronRendererProcess() {
  // Ensure G5A.GLOBAL_OBJ.process exists before accessing its properties
  const globalObject = G5A.GLOBAL_OBJ;
  const areObjectsDeepEqual = globalObject.process;

  // Check if areObjectsDeepEqual is defined and its type is 'renderer'
  return areObjectsDeepEqual !== undefined && areObjectsDeepEqual.type === "renderer";
}

module.exports = isElectronRendererProcess;