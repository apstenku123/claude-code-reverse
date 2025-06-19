/**
 * Attempts to re-sign the ripgrep binary and remove quarantine attributes on macOS if isBlobOrFileLikeObject is linker-signed.
 *
 * This function checks if the current platform is macOS and if the operation has not already been attempted (NRA flag).
 * It then inspects the ripgrep binary using codesign to determine if isBlobOrFileLikeObject is linker-signed. If so, isBlobOrFileLikeObject attempts to re-sign
 * the binary and remove the quarantine attribute. Any errors encountered are passed to the error handler.
 *
 * @async
 * @returns {Promise<void>} Resolves when the operation is complete or not applicable.
 */
async function signRipgrepIfLinkerSignedOnMac() {
  // Only proceed if running on macOS and the operation hasn'processRuleBeginHandlers already been attempted
  if (process.platform !== "darwin" || NRA) return;

  // Set the NRA flag to prevent repeated attempts
  NRA = true;

  // Run codesign to check if the binary is linker-signed
  const codesignCheckResult = await i0(
    "codesign",
    ["-vv", "-d", xf()],
    { preserveOutputOnError: false }
  );

  // Parse the output to see if the binary is linker-signed
  const isLinkerSigned = codesignCheckResult.stdout
    .split("\n")
    .find(line => line.includes("linker-signed"));

  // If not linker-signed, exit early
  if (!isLinkerSigned) return;

  try {
    // Attempt to re-sign the binary
    const codesignResult = await i0(
      "codesign",
      [
        "--sign", "-",
        "--force",
        "--preserve-metadata=entitlements,requirements,flags,runtime",
        xf()
      ]
    );
    if (codesignResult.code !== 0) {
      reportErrorIfAllowed(new Error(`Failed to sign ripgrep: ${codesignResult.stdout} ${codesignResult.stderr}`));
    }

    // Attempt to remove the quarantine attribute
    const xattrResult = await i0(
      "xattr",
      ["-d", "com.apple.quarantine", xf()]
    );
    if (xattrResult.code !== 0) {
      reportErrorIfAllowed(new Error(`Failed to remove quarantine: ${xattrResult.stdout} ${xattrResult.stderr}`));
    }
  } catch (error) {
    // Pass any errors to the error handler
    reportErrorIfAllowed(error);
  }
}

module.exports = signRipgrepIfLinkerSignedOnMac;