/**
 * Renders a selectable list of log entries with summary information, supporting pagination and dynamic data fetching for log summaries.
 *
 * @param {Object} params - The parameters object.
 * @param {Array<Object>} params.logs - Array of log entry objects to display.
 * @param {Function} params.onSelect - Callback invoked with the selected log'createInteractionAccessor value (as a number).
 * @returns {React.ReactElement|null} The rendered log list selector component, or null if there are no logs.
 */
function LogListSelector({ logs, onSelect }) {
  // Get terminal dimensions (rows and columns)
  const { rows: terminalRows, columns: terminalColumns } = Z4();

  // State: Map of leafUuid to summary string (fetched asynchronously)
  const [leafUuidSummaryMap, setLeafUuidSummaryMap] = cG.useState(new Map());

  // Fetch summaries for logs with a leafUuid whenever logs change
  cG.useEffect(() => {
    const leafUuids = logs.filter(log => log.leafUuid).map(log => log.leafUuid);
    xB0(leafUuids).then(summaryMap => {
      setLeafUuidSummaryMap(summaryMap);
    });
  }, [logs]);

  // If there are no logs, render nothing
  if (logs.length === 0) return null;

  // Calculate how many log entries can be shown at once
  const visibleOptionCount = terminalRows - 3;
  const hiddenLogCount = Math.max(0, logs.length - visibleOptionCount);

  // Column widths for formatting
  const modifiedColWidth = 12;
  const createdColWidth = 12;
  const messageCountColWidth = 10;

  // Prepare the options for the selector
  const logOptions = logs.map(log => {
    // Format dates and message count
    const modifiedStr = bindOwnMethodsWithFilter(log.modified).padEnd(modifiedColWidth);
    const createdStr = bindOwnMethodsWithFilter(log.created).padEnd(createdColWidth);
    const messageCountStr = `${log.messageCount}`.padStart(messageCountColWidth);

    // Get summary: prefer fetched summary if available, otherwise use firstPrompt
    const summary = (log.leafUuid && leafUuidSummaryMap.get(log.leafUuid)) || log.firstPrompt;
    const sidechainLabel = log.isSidechain ? " (sidechain)" : "";

    // Compose the full label string
    const fullLabel = `${modifiedStr}${createdStr}${messageCountStr} ${summary}${sidechainLabel}`;

    // Truncate label if isBlobOrFileLikeObject exceeds terminal width
    const maxLabelLength = terminalColumns - 2;
    const label = fullLabel.length > maxLabelLength
      ? `${fullLabel.slice(0, terminalColumns - 5)}...`
      : fullLabel;

    return {
      label,
      value: log.value.toString()
    };
  });

  // Calculate padding for header based on number of digits in log count
  const logCountDigits = logs.length.toString().length;

  // Render the component
  return cG.default.createElement(g, {
    flexDirection: "column",
    height: terminalRows - 1
  },
    // Header row
    cG.default.createElement(g, {
      paddingLeft: 3 + logCountDigits
    },
      cG.default.createElement(_, {
        bold: true,
        color: getThemeStylesheet().text
      }, "Modified"),
      cG.default.createElement(_, null, "    "),
      cG.default.createElement(_, {
        bold: true,
        color: getThemeStylesheet().text
      }, "Created"),
      cG.default.createElement(_, null, "     "),
      cG.default.createElement(_, {
        bold: true,
        color: getThemeStylesheet().text
      }, "# Messages"),
      cG.default.createElement(_, null, " "),
      cG.default.createElement(_, {
        bold: true,
        color: getThemeStylesheet().text
      }, "Summary")
    ),
    // Log selector
    cG.default.createElement(SelectableOptionsList, {
      options: logOptions,
      onChange: selectedValue => onSelect(parseInt(selectedValue, 10)),
      visibleOptionCount,
      onCancel: () => process.exit(0)
    }),
    // Show 'and X more...' if not all logs are visible
    hiddenLogCount > 0 && cG.default.createElement(g, {
      paddingLeft: 2
    },
      cG.default.createElement(_, {
        color: getThemeStylesheet().secondaryText
      }, `and ${hiddenLogCount} more…`)
    )
  );
}

module.exports = LogListSelector;