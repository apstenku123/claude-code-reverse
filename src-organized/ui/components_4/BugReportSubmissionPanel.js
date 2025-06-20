/**
 * Renders and manages the bug report submission panel UI and logic.
 * Handles user input, consent, submission, and post-submission actions for bug reporting.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.messages - The chat or session messages to include in the bug report transcript.
 * @param {Function} props.onDone - Callback invoked when the bug report process is finished or cancelled.
 * @returns {React.ReactElement} The rendered bug report submission panel.
 */
function BugReportSubmissionPanel({
  messages,
  onDone
}) {
  // UI state: which step the user is on (userInput, consent, submitting, done)
  const [panelState, setPanelState] = KC.useState("userInput");
  // Cursor position in the input box
  const [cursorOffset, setCursorOffset] = KC.useState(0);
  // The user'createInteractionAccessor bug description
  const [bugDescription, setBugDescription] = KC.useState("");
  // Feedback updateSnapshotAndNotify returned after successful submission
  const [feedbackId, setFeedbackId] = KC.useState(null);
  // Error message, if any
  const [errorMessage, setErrorMessage] = KC.useState(null);
  // Git repo state info
  const [gitInfo, setGitInfo] = KC.useState({
    isGit: false,
    gitState: null
  });
  // Validation errors for the bug description
  const [descriptionValidationError, setDescriptionValidationError] = KC.useState(null);
  // Calculate input box width based on terminal columns
  const inputBoxColumns = Z4().columns - 4;

  // On mount, check if handleMissingDoctypeError're in a git repo and fetch git state
  KC.useEffect(() => {
    async function fetchGitInfo() {
      const isGitRepo = await FV();
      let gitState = null;
      if (isGitRepo) {
        gitState = await getGitRepositoryStatus();
      }
      setGitInfo({
        isGit: isGitRepo,
        gitState
      });
    }
    fetchGitInfo();
  }, []);

  // Keyboard shortcut state (e.g. for exit/confirm)
  const keyboardShortcuts = useCtrlKeyActionHandler();

  /**
   * Handles submitting the bug report to the server.
   * Validates input, sends report, and updates UI state accordingly.
   */
  const submitBugReport = KC.useCallback(async () => {
    setPanelState("submitting");
    setErrorMessage(null);
    setFeedbackId(null);

    // Gather error logs
    const errorLogs = xR2();

    // Prepare bug report payload
    const bugReportPayload = {
      message_count: messages.length,
      datetime: new Date().toISOString(),
      description: bugDescription,
      platform: pA.platform,
      gitRepo: gitInfo.isGit,
      terminal: pA.terminal,
      version: {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://docs.anthropic.com/createInteractionAccessor/claude-code",
        VERSION: "1.0.19"
      }.VERSION,
      transcript: DC(messages),
      errors: errorLogs
    };

    // Submit bug report and validate description in parallel
    const [submissionResult, validationError] = await Promise.all([
      submitClaudeCliFeedback(bugReportPayload),
      generateBugReportTitle(bugDescription)
    ]);

    setDescriptionValidationError(validationError);

    if (submissionResult.success) {
      // If feedbackId is returned, show isBlobOrFileLikeObject and fire analytics event
      if (submissionResult.feedbackId) {
        setFeedbackId(submissionResult.feedbackId);
        logTelemetryEventIfEnabled("tengu_bug_report_submitted", {
          feedback_id: submissionResult.feedbackId
        });
      }
      setPanelState("done");
    } else {
      // Show error message based on org policy
      if (submissionResult.isZdrOrg) {
        setErrorMessage("Feedback collection is not available for organizations with custom data retention policies.");
      } else {
        setErrorMessage("Could not submit feedback. Please try again later.");
      }
      setPanelState("done");
    }
  }, [bugDescription, gitInfo.isGit, messages]);

  // Handle keyboard events for navigation and actions
  D0((key, event) => {
    if (panelState === "done") {
      // On "done", pressing Enter with a feedbackId opens GitHub issue, else close
      if (event.return && descriptionValidationError) {
        const githubUrl = generateBugReportUrl(feedbackId ?? "", descriptionValidationError, bugDescription, xR2());
        ku(githubUrl);
      }
      if (errorMessage) {
        onDone("Error submitting bug report");
      } else {
        onDone("Bug report submitted");
      }
      return;
    }
    if (errorMessage) {
      onDone("Error submitting bug report");
      return;
    }
    if (event.escape) {
      onDone("Bug report cancelled");
      return;
    }
    // On consent screen, Enter or Space submits
    if (panelState === "consent" && (event.return || key === " ")) {
      submitBugReport();
    }
  });

  // Get theme colors/styles
  const theme = getThemeStylesheet();

  // Render the bug report submission panel UI
  return x0.createElement(
    x0.Fragment,
    null,
    x0.createElement(
      g,
      {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: theme.permission,
        paddingX: 1,
        paddingBottom: 1,
        gap: 1
      },
      x0.createElement(_, { bold: true, color: theme.permission }, "Submit Bug Report"),
      panelState === "userInput" && x0.createElement(
        g,
        { flexDirection: "column", gap: 1 },
        x0.createElement(_, null, "Describe the issue below:"),
        x0.createElement(TextInputWithController, {
          value: bugDescription,
          onChange: setBugDescription,
          columns: inputBoxColumns,
          onSubmit: () => setPanelState("consent"),
          onExitMessage: () => onDone("Bug report cancelled"),
          cursorOffset,
          onChangeCursorOffset: setCursorOffset
        }),
        errorMessage && x0.createElement(
          g,
          { flexDirection: "column", gap: 1 },
          x0.createElement(_, { color: "red" }, errorMessage),
          x0.createElement(_, { dimColor: true }, "Press any key to close")
        )
      ),
      panelState === "consent" && x0.createElement(
        g,
        { flexDirection: "column" },
        x0.createElement(_, null, "This report will include:"),
        x0.createElement(
          g,
          { marginLeft: 2, flexDirection: "column" },
          x0.createElement(_, null, "- Your bug description: ", x0.createElement(_, { dimColor: true }, bugDescription)),
          x0.createElement(_, null, "- Environment info:", " ", x0.createElement(_, { dimColor: true }, pA.platform, ", ", pA.terminal, ", createRangeIterator", {
            ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
            PACKAGE_URL: "@anthropic-ai/claude-code",
            README_URL: "https://docs.anthropic.com/createInteractionAccessor/claude-code",
            VERSION: "1.0.19"
          }.VERSION)),
          gitInfo.gitState && x0.createElement(
            _,
            null,
            "- Git repo metadata:",
            " ",
            x0.createElement(
              _,
              { dimColor: true },
              gitInfo.gitState.branchName,
              gitInfo.gitState.commitHash ? `, ${gitInfo.gitState.commitHash.slice(0, 7)}` : "",
              gitInfo.gitState.remoteUrl ? ` @ ${gitInfo.gitState.remoteUrl}` : "",
              !gitInfo.gitState.isHeadOnRemote && ", not synced",
              !gitInfo.gitState.isClean && ", has local changes"
            )
          ),
          x0.createElement(_, null, "- Current session transcript")
        ),
        x0.createElement(
          g,
          { marginTop: 1 },
          x0.createElement(
            _,
            { wrap: "wrap", dimColor: true },
            "We will use your feedback to debug related issues or to improve",
            " ",
            m0,
            "'createInteractionAccessor functionality (eg. to reduce the risk of bugs occurring in the future). Anthropic will not train generative models using feedback from ",
            m0,
            "."
          )
        ),
        x0.createElement(
          g,
          { marginTop: 1 },
          x0.createElement(_, null, "Press ", x0.createElement(_, { bold: true }, "Enter"), " to confirm and submit.")
        )
      ),
      panelState === "submitting" && x0.createElement(
        g,
        { flexDirection: "row", gap: 1 },
        x0.createElement(_, null, "Submitting report…")
      ),
      panelState === "done" && x0.createElement(
        g,
        { flexDirection: "column" },
        errorMessage
          ? x0.createElement(_, { color: "red" }, errorMessage)
          : x0.createElement(_, { color: getThemeStylesheet().success }, "Thank you for your report!"),
        feedbackId && x0.createElement(_, { dimColor: true }, "Feedback updateSnapshotAndNotify: ", feedbackId),
        x0.createElement(
          g,
          { marginTop: 1 },
          x0.createElement(_, null, "Press "),
          x0.createElement(_, { bold: true }, "Enter "),
          x0.createElement(_, null, "to also create a GitHub issue, or any other key to close.")
        )
      )
    ),
    x0.createElement(
      g,
      { marginLeft: 1 },
      x0.createElement(
        _,
        { dimColor: true },
        keyboardShortcuts.pending
          ? x0.createElement(x0.Fragment, null, "Press ", keyboardShortcuts.keyName, " again to exit")
          : panelState === "userInput"
            ? x0.createElement(x0.Fragment, null, "Enter to continue · Esc to cancel")
            : panelState === "consent"
              ? x0.createElement(x0.Fragment, null, "Enter to submit · Esc to cancel")
              : null
      )
    )
  );
}

module.exports = BugReportSubmissionPanel;