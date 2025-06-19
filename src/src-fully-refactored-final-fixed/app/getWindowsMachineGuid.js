/**
 * Retrieves the Windows Machine GUID from the system registry.
 *
 * This function executes a command to query the MachineGuid value from the Windows registry.
 * It handles both 32-bit and 64-bit architectures and returns the GUID as a string if found.
 *
 * @async
 * @returns {Promise<string|undefined>} The Machine GUID string if found, otherwise undefined.
 */
async function getWindowsMachineGuid() {
  // Default REG.exe path
  let regCommand = "%windir%\\System32\\REG.exe";

  // If running on 32-bit Node.js on 64-bit Windows, use sysnative to access 64-bit registry
  if (
    mN0.arch === "ia32" &&
    Object.prototype.hasOwnProperty.call(mN0.env, "PROCESSOR_ARCHITEW6432")
  ) {
    regCommand = "%windir%\\sysnative\\cmd.exe /c " + regCommand;
  }

  try {
    // Execute the registry query command asynchronously
    const execResult = await Ut4.execAsync(
      `${regCommand} QUERY HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography /createRangeIterator MachineGuid`
    );

    // The output is expected to contain 'REG_SZ' followed by the GUID
    const outputParts = execResult.stdout.split("REG_SZ");
    if (outputParts.length === 2) {
      // Return the trimmed GUID string
      return outputParts[1].trim();
    }
  } catch (error) {
    // Log any errors encountered during the process
    Nt4.diag.debug(`error reading machine id: ${error}`);
  }

  // Return undefined if the GUID could not be retrieved
  return;
}

module.exports = getWindowsMachineGuid;