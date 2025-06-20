/**
 * Renders and manages the bug report submission form UI, including user input,
 * consent, submission, and completion states. Handles collecting environment
 * and git info, submitting the report, and providing feedback to the user.
 *
 * @param {Object} props - The component props
 * @param {Array<Object>} props.messages - The current session transcript/messages
 * @param {Function} props.onDone - Callback invoked when the bug report flow is finished or cancelled
 * @returns {React.ReactElement} The rendered bug report form component
 */
function BugReportForm({
  messages,
  onDone
}) {
  // UI state: 'userInput' | 'consent' | 'submitting' | 'done'
  const [formState, setFormState] = KC.useState("userInput");
  // Tracks the cursor offset in the textarea
  const [cursorOffset, setCursorOffset] = KC.useState(0);
  // The user'createInteractionAccessor bug description input
  const [bugDescription, setBugDescription] = KC.useState("");
  // The feedback updateSnapshotAndNotify returned after successful submission
  const [feedbackId, setFeedbackId] = KC.useState(null);
  // Error message to display, if any
  const [errorMessage, setErrorMessage] = KC.useState(null);
  // Git info: { isGit: boolean, gitState: object|null }
  const [gitInfo, setGitInfo] = KC.useState({
    isGit: false,
    gitState: null
  });
  // Validation errors for the bug description
  const [descriptionValidationError, setDescriptionValidationError] = KC.useState(null);

  // Calculate textarea width based on terminal columns
  const terminalColumns = Z4().columns - 4;

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

  // Key handler for exiting/cancelling the form
  const exitKeyHandler = useCtrlKeyActionHandler();

  // Handles bug report submission
  const handleSubmit = KC.useCallback(async () => {
    setFormState("submitting");
    setErrorMessage(null);
    setFeedbackId(null);

    // Gather error logs (if any)
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
      // If feedbackId is returned, show isBlobOrFileLikeObject and log event
      if (submissionResult.feedbackId) {
        setFeedbackId(submissionResult.feedbackId);
        logTelemetryEventIfEnabled("tengu_bug_report_submitted", {
          feedback_id: submissionResult.feedbackId
        });
      }
      setFormState("done");
    } else {
      // Show error message based on org policy
      if (submissionResult.isZdrOrg) {
        setErrorMessage("Feedback collection is not available for organizations with custom data retention policies.");
      } else {
        setErrorMessage("Could not submit feedback. Please try again later.");
      }
      setFormState("done");
    }
  }, [bugDescription, gitInfo.isGit, messages]);

  // Keyboard event handler for form navigation and submission
  D0((key, event) => {
    if (formState === "done") {
      // If user presses Enter after submission, open GitHub issue if feedbackId exists
      if (event.return && descriptionValidationError) {
        const githubUrl = generateBugReportUrl(feedbackId ?? "", descriptionValidationError, bugDescription, xR2());
        ku(githubUrl);
      }
      // Notify parent of completion
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
    if (formState === "consent" && (event.return || key === " ")) {
      handleSubmit();
    }
  });

  // Get current theme styles
  const theme = getThemeStylesheet();

  // Render the bug report form UI
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
      x0.createElement(_, {
        bold: true,
        color: theme.permission
      }, "Submit Bug Report"),
      formState === "userInput" && x0.createElement(
        g,
        { flexDirection: "column", gap: 1 },
        x0.createElement(_, null, "Describe the issue below:"),
        x0.createElement(TextInputWithController, {
          value: bugDescription,
          onChange: setBugDescription,
          columns: terminalColumns,
          onSubmit: () => setFormState("consent"),
          onExitMessage: () => onDone("Bug report cancelled"),
          cursorOffset: cursorOffset,
          onChangeCursorOffset: setCursorOffset
        }),
        errorMessage && x0.createElement(
          g,
          { flexDirection: "column", gap: 1 },
          x0.createElement(_, { color: "red" }, errorMessage),
          x0.createElement(_, { dimColor: true }, "Press any key to close")
        )
      ),
      formState === "consent" && x0.createElement(
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
          gitInfo.gitState && x0.createElement(_, null, "- Git repo metadata:", " ", x0.createElement(_, { dimColor: true },
            gitInfo.gitState.branchName,
            gitInfo.gitState.commitHash ? `, ${gitInfo.gitState.commitHash.slice(0, 7)}` : "",
            gitInfo.gitState.remoteUrl ? ` @ ${gitInfo.gitState.remoteUrl}` : "",
            !gitInfo.gitState.isHeadOnRemote && ", not synced",
            !gitInfo.gitState.isClean && ", has local changes"
          )),
          x0.createElement(_, null, "- Current session transcript")
        ),
        x0.createElement(
          g,
          { marginTop: 1 },
          x0.createElement(_, { wrap: "wrap", dimColor: true },
            "We will use your feedback to debug related issues or to improve",
            " ", m0, "'createInteractionAccessor functionality (eg. to reduce the risk of bugs occurring in the future). Anthropic will not train generative models using feedback from ", m0, "."
          )
        ),
        x0.createElement(
          g,
          { marginTop: 1 },
          x0.createElement(_, null, "Press ", x0.createElement(_, { bold: true }, "Enter"), " to confirm and submit.")
        )
      ),
      formState === "submitting" && x0.createElement(
        g,
        { flexDirection: "row", gap: 1 },
        x0.createElement(_, null, "Submitting report…")
      ),
      formState === "done" && x0.createElement(
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
        exitKeyHandler.pending
          ? x0.createElement(x0.Fragment, null, "Press ", exitKeyHandler.keyName, " again to exit")
          : formState === "userInput"
            ? x0.createElement(x0.Fragment, null, "Enter to continue · Esc to cancel")
            : formState === "consent"
              ? x0.createElement(x0.Fragment, null, "Enter to submit · Esc to cancel")
              : null
      )
    )
  );
}

module.exports = BugReportForm;