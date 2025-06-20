/**
 * Retrieves the Mac machine'createInteractionAccessor IOPlatformUUID by executing the 'ioreg' command.
 *
 * This function runs the 'ioreg' command to fetch hardware information, then parses
 * the output to extract the IOPlatformUUID, which uniquely identifies the Mac hardware.
 *
 * @async
 * @returns {Promise<string|undefined>} The IOPlatformUUID string if found, otherwise undefined.
 */
async function getMacPlatformUUID() {
  try {
    // Execute the ioreg command to get platform expert device info
    const commandResult = await Jt4.execAsync('ioreg -rd1 -c "IOPlatformExpertDevice"');
    // Split the output into lines and find the line containing 'IOPlatformUUID'
    const uuidLine = commandResult.stdout.split('\n').find(line => line.includes('IOPlatformUUID'));
    if (!uuidLine) {
      // UUID line not found in the output
      return;
    }
    // The line is expected to be in the format: ' "IOPlatformUUID" = "<uuid>"'
    const uuidParts = uuidLine.split('" = "');
    if (uuidParts.length === 2) {
      // Remove the trailing quote from the UUID and return
      return uuidParts[1].slice(0, -1);
    }
  } catch (error) {
    // Log the error for diagnostics
    Xt4.diag.debug(`error reading machine id: ${error}`);
  }
  // Return undefined if UUID could not be retrieved
  return;
}

module.exports = getMacPlatformUUID;
