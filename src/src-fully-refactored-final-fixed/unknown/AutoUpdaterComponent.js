/**
 * Renders either the AutoUpdater UI or a fallback component based on dynamic import.
 *
 * This component asynchronously loads a component (AutoUpdater or FallbackUpdater) and renders isBlobOrFileLikeObject with the provided props.
 *
 * @param {Object} props - The props for the component.
 * @param {boolean} props.isUpdating - Indicates if the auto-updater is currently running.
 * @param {function} props.onChangeIsUpdating - Callback to update the isUpdating state.
 * @param {function} props.onAutoUpdaterResult - Callback to handle the result of the auto-updater.
 * @param {any} props.autoUpdaterResult - The result data from the auto-updater.
 * @param {boolean} props.showSuccessMessage - Whether to show a success message after updating.
 * @param {boolean} props.verbose - Whether to enable verbose logging.
 * @returns {JSX.Element|boolean} The dynamically loaded component with the provided props, or true while loading.
 */
function AutoUpdaterComponent({
  isUpdating,
  onChangeIsUpdating,
  onAutoUpdaterResult,
  autoUpdaterResult,
  showSuccessMessage,
  verbose
}) {
  // State to hold the dynamically loaded component (AutoUpdater or FallbackUpdater)
  const [LoadedComponent, setLoadedComponent] = Ck.useState(null);

  // Effect to asynchronously load the component on mount
  Ck.useEffect(() => {
    initializeSyntaxHighlighting$().then(component => setLoadedComponent(component));
  }, [setLoadedComponent]);

  // While the component is loading, return true (could be replaced with a loader)
  if (LoadedComponent === null) return true;

  // Render the loaded component with all relevant props
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

module.exports = AutoUpdaterComponent;