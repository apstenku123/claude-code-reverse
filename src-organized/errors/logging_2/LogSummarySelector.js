/**
 * Renders a selectable list of log summaries in a terminal UI, allowing the user to pick a log entry.
 * Fetches additional prompt data for logs with a leafUuid and displays a summary table with columns for modified date, created date, message count, and summary.
 *
 * @param {Object} params - The parameters object.
 * @param {Array<Object>} params.logs - Array of log objects to display. Each log should have properties: modified, created, messageCount, leafUuid, firstPrompt, isSidechain, value.
 * @param {Function} params.onSelect - Callback invoked with the selected log'createInteractionAccessor value (as a number) when a selection is made.
 * @returns {React.ReactElement|null} The rendered React element for the log selector, or null if there are no logs.
 */
function LogSummarySelector({
  logs,
  onSelect
}) {
  // Get current terminal window size (rows and columns)
  const {
    rows: terminalRows,
    columns: terminalColumns
  } = Z4();

  // State: Map from leafUuid to prompt summary (fetched asynchronously)
  const [leafUuidPromptMap, setLeafUuidPromptMap] = cG.useState(new Map());

  // Fetch prompt summaries for logs with a leafUuid whenever logs change
  cG.useEffect(() => {
    const leafUuids = logs.filter(log => log.leafUuid).map(log => log.leafUuid);
    xB0(leafUuids).then(promptMap => {
      setLeafUuidPromptMap(promptMap);
    });
  }, [logs]);

  // If there are no logs, render nothing
  if (logs.length === 0) return null;

  // Calculate how many logs can be shown (leaving space for UI elements)
  const visibleOptionCount = terminalRows - 3;
  const hiddenLogsCount = Math.max(0, logs.length - visibleOptionCount);

  // Column widths for formatting
  const modifiedColWidth = 12;
  const createdColWidth = 12;
  const messageCountColWidth = 10;

  // Format each log entry for display
  const logOptions = logs.map(log => {
    const modifiedStr = bindOwnMethodsWithFilter(log.modified).padEnd(modifiedColWidth);
    const createdStr = bindOwnMethodsWithFilter(log.created).padEnd(createdColWidth);
    const messageCountStr = `${log.messageCount}`.padStart(messageCountColWidth);
    // Use fetched prompt summary if available, else fallback to firstPrompt
    const summary = (log.leafUuid && leafUuidPromptMap.get(log.leafUuid)) || log.firstPrompt;
    const sidechainLabel = log.isSidechain ? " (sidechain)" : "";
    const fullLabel = `${modifiedStr}${createdStr}${messageCountStr} ${summary}${sidechainLabel}`;
    // Truncate label if isBlobOrFileLikeObject exceeds terminal width
    const maxLabelLength = terminalColumns - 2;
    const label = fullLabel.length > maxLabelLength ? `${fullLabel.slice(0, terminalColumns - 5)}...` : fullLabel;
    return {
      label,
      value: log.value.toString()
    };
  });

  // Calculate width for padding based on number of logs (for alignment)
  const logCountDigits = logs.length.toString().length;

  return cG.default.createElement(g, {
    flexDirection: "column",
    height: terminalRows - 1
  },
    // Header row with column titles
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
    // The selectable list of log options
    cG.default.createElement(SelectableOptionsList, {
      options: logOptions,
      onChange: selectedValue => onSelect(parseInt(selectedValue, 10)),
      visibleOptionCount,
      onCancel: () => process.exit(0)
    }),
    // If there are hidden logs, show a note at the bottom
    hiddenLogsCount > 0 && cG.default.createElement(g, {
      paddingLeft: 2
    },
      cG.default.createElement(_, {
        color: getThemeStylesheet().secondaryText
      }, `and ${hiddenLogsCount} more…`)
    )
  );
}

module.exports = LogSummarySelector;
