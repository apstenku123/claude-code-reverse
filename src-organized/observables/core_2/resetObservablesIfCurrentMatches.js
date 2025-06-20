/**
 * Resets the current and backup observables if the provided observable matches the current one.
 *
 * @param {object} observableToCheck - The observable instance to compare with the current observable.
 * @returns {void}
 *
 * If the provided observable is the same as the current observable, this function resets both the backup and current observables
 * by calling the external reset function (restoreCurrentFromResourceArray) on each.
 */
function resetObservablesIfCurrentMatches(observableToCheck) {
  // Check if the provided observable is the same as the current observable
  if (processObservable.current === observableToCheck) {
    // Reset the backup observable
    restoreCurrentFromResourceArray(backupObservable);
    // Reset the current observable
    restoreCurrentFromResourceArray(processObservable);
  }
}

module.exports = resetObservablesIfCurrentMatches;