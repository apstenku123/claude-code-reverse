/**
 * Applies a scan operation to the provided observable source with the given configuration,
 * then passes the resulting observable to the operator for further processing.
 *
 * @param {Observable} sourceObservable - The observable source to be scanned.
 * @param {Object} scanConfig - The configuration object for the scan operation.
 * @returns {any} The result of applying the operator to the scanned observable.
 */
function operateOnScannedObservable(sourceObservable, scanConfig) {
  // Determine if the scanConfig parameter was provided (arguments.length >= 2)
  const hasScanConfig = arguments.length >= 2;

  // Perform the scan operation using the scanInternals utility
  // The flags: hasScanConfig, false (do not use seed), true (emit on subscribe)
  const scannedObservable = eT9.scanInternals(
    sourceObservable,
    scanConfig,
    hasScanConfig,
    false,
    true
  );

  // Pass the scanned observable to the operator for further processing
  return AP9.operate(scannedObservable);
}

module.exports = operateOnScannedObservable;