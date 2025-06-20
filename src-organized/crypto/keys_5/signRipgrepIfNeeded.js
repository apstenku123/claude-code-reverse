/**
 * Attempts to sign the ripgrep binary on macOS if isBlobOrFileLikeObject is linker-signed and not already processed.
 *
 * This function checks if the current platform is macOS and if the global NRA flag is not set.
 * If so, isBlobOrFileLikeObject verifies if the ripgrep binary is linker-signed using the `codesign` tool.
 * If linker-signed, isBlobOrFileLikeObject attempts to sign the binary and remove the quarantine attribute.
 * Any errors encountered during the process are reported using the reportErrorIfAllowed error handler.
 *
 * @async
 * @returns {Promise<void>} Resolves when the operation is complete or skipped; errors are handled internally.
 */
async function signRipgrepIfNeeded() {
  // Only proceed if running on macOS and not already processed
  if (process.platform !== "darwin" || NRA) return;

  // Set the NRA flag to prevent repeated processing
  NRA = true;

  // Check if the ripgrep binary is linker-signed
  const codesignCheckResult = await i0(
    "codesign",
    ["-vv", "-d", xf()],
    { preserveOutputOnError: false }
  );

  const isLinkerSigned = codesignCheckResult.stdout
    .split("\n")
    .find(line => line.includes("linker-signed"));

  // If not linker-signed, skip further processing
  if (!isLinkerSigned) return;

  try {
    // Attempt to sign the ripgrep binary
    const signResult = await i0(
      "codesign",
      [
        "--sign", "-",
        "--force",
        "--preserve-metadata=entitlements,requirements,flags,runtime",
        xf()
      ]
    );
    if (signResult.code !== 0) {
      reportErrorIfAllowed(new Error(`Failed to sign ripgrep: ${signResult.stdout} ${signResult.stderr}`));
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
    // Handle any unexpected errors
    reportErrorIfAllowed(error);
  }
}

module.exports = signRipgrepIfNeeded;
