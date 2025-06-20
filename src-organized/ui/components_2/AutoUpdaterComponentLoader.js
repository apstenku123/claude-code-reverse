/**
 * Dynamically loads and renders the appropriate AutoUpdater component based on async import.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isUpdating - Indicates if an update is currently in progress.
 * @param {function} props.onChangeIsUpdating - Callback to handle changes to the updating state.
 * @param {function} props.onAutoUpdaterResult - Callback to handle the result of the auto updater.
 * @param {any} props.autoUpdaterResult - The result data from the auto updater.
 * @param {boolean} props.showSuccessMessage - Whether to display a success message after update.
 * @param {boolean} props.verbose - Whether to enable verbose logging or UI.
 * @returns {React.ReactElement|boolean} The dynamically loaded updater component, or true if still loading.
 */
function AutoUpdaterComponentLoader({
  isUpdating,
  onChangeIsUpdating,
  onAutoUpdaterResult,
  autoUpdaterResult,
  showSuccessMessage,
  verbose
}) {
  // Holds the dynamically loaded component (AutoUpdaterStatusDisplay or AutoUpdaterStatusAccessor)
  const [LoadedComponent, setLoadedComponent] = Ck.useState(null);

  // Load the component asynchronously when the loader function changes
  Ck.useEffect(() => {
    initializeSyntaxHighlighting$().then((importedComponent) => {
      setLoadedComponent(importedComponent);
    });
  }, [setLoadedComponent]);

  // While the component is loading, return true (could be used as a loading indicator)
  if (LoadedComponent === null) return true;

  // Render the loaded component (AutoUpdaterStatusDisplay if truthy, otherwise AutoUpdaterStatusAccessor) with all props
  return Ck.createElement(
    LoadedComponent ? AutoUpdaterStatusDisplay : AutoUpdaterStatusAccessor,
    {
      verbose,
      onAutoUpdaterResult,
      autoUpdaterResult,
      isUpdating,
      onChangeIsUpdating,
      showSuccessMessage
    }
  );
}

module.exports = AutoUpdaterComponentLoader;