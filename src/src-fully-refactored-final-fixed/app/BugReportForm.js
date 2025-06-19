/**
 * Renders and manages the interactive bug report submission form in the CLI UI.
 * Handles user input, confirmation, submission, and feedback display, including git/environment info.
 *
 * @param {Object} props
 * @param {Array} props.messages - The current session transcript/messages to include in the report.
 * @param {Function} props.onDone - Callback invoked when the bug report flow is finished or cancelled.
 * @returns {React.ReactElement} The bug report form UI.
 */
function BugReportForm({ messages, onDone }) {
  // UI state: which step of the form is active
  const [formStep, setFormStep] = KC.useState("userInput"); // 'userInput' | 'consent' | 'submitting' | 'done'
  // Textarea cursor offset
  const [cursorOffset, setCursorOffset] = KC.useState(0);
  // User'createInteractionAccessor bug description input
  const [bugDescription, setBugDescription] = KC.useState("");
  // Feedback updateSnapshotAndNotify returned from backend
  const [feedbackId, setFeedbackId] = KC.useState(null);
  // Error message to display
  const [errorMessage, setErrorMessage] = KC.useState(null);
  // Git state info
  const [gitInfo, setGitInfo] = KC.useState({
    isGit: false,
    gitState: null
  });
  // Validation error from backend
  const [validationError, setValidationError] = KC.useState(null);
  // Calculate textarea width based on terminal columns
  const textareaColumns = Z4().columns - 4;

  // On mount, check if handleMissingDoctypeError're in a git repo and fetch git state
  KC.useEffect(() => {
    async function fetchGitState() {
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
    fetchGitState();
  }, []);

  // Keyboard shortcut state (for exit hints)
  const exitKeyInfo = useCtrlKeyActionHandler();

  // Handles bug report submission
  const handleSubmit = KC.useCallback(async () => {
    setFormStep("submitting");
    setErrorMessage(null);
    setFeedbackId(null);
    const getErrorLogs = xR2();
    const submissionPayload = {
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
      errors: getErrorLogs
    };
    // Submit bug report and validate description in parallel
    const [submitResult, validationResult] = await Promise.all([
      submitClaudeCliFeedback(submissionPayload),
      generateBugReportTitle(bugDescription)
    ]);
    setValidationError(validationResult);
    if (submitResult.success) {
      if (submitResult.feedbackId) {
        setFeedbackId(submitResult.feedbackId);
        logTelemetryEventIfEnabled("tengu_bug_report_submitted", {
          feedback_id: submitResult.feedbackId
        });
      }
      setFormStep("done");
    } else {
      if (submitResult.isZdrOrg) {
        setErrorMessage("Feedback collection is not available for organizations with custom data retention policies.");
      } else {
        setErrorMessage("Could not submit feedback. Please try again later.");
      }
      setFormStep("done");
    }
  }, [bugDescription, gitInfo.isGit, messages]);

  // Keyboard event handler for the bug report flow
  D0((inputKey, event) => {
    if (formStep === "done") {
      // On done, optionally open GitHub issue
      if (event.return && validationError) {
        const githubUrl = generateBugReportUrl(feedbackId ?? "", validationError, bugDescription, xR2());
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
    if (formStep === "consent" && (event.return || inputKey === " ")) {
      handleSubmit();
    }
  });

  // Get current theme colors
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
      x0.createElement(
        _,
        { bold: true, color: theme.permission },
        "Submit Bug Report"
      ),
      formStep === "userInput" &&
        x0.createElement(
          g,
          { flexDirection: "column", gap: 1 },
          x0.createElement(_, null, "Describe the issue below:"),
          x0.createElement(TextInputWithController, {
            value: bugDescription,
            onChange: setBugDescription,
            columns: textareaColumns,
            onSubmit: () => setFormStep("consent"),
            onExitMessage: () => onDone("Bug report cancelled"),
            cursorOffset: cursorOffset,
            onChangeCursorOffset: setCursorOffset
          }),
          errorMessage &&
            x0.createElement(
              g,
              { flexDirection: "column", gap: 1 },
              x0.createElement(_, { color: "red" }, errorMessage),
              x0.createElement(_, { dimColor: true }, "Press any key to close")
            )
        ),
      formStep === "consent" &&
        x0.createElement(
          g,
          { flexDirection: "column" },
          x0.createElement(_, null, "This report will include:"),
          x0.createElement(
            g,
            { marginLeft: 2, flexDirection: "column" },
            x0.createElement(
              _,
              null,
              "- Your bug description: ",
              x0.createElement(_, { dimColor: true }, bugDescription)
            ),
            x0.createElement(
              _,
              null,
              "- Environment info: ",
              x0.createElement(
                _,
                { dimColor: true },
                pA.platform,
                ", ",
                pA.terminal,
                ", createRangeIterator",
                {
                  ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
                  PACKAGE_URL: "@anthropic-ai/claude-code",
                  README_URL: "https://docs.anthropic.com/createInteractionAccessor/claude-code",
                  VERSION: "1.0.19"
                }.VERSION
              )
            ),
            gitInfo.gitState &&
              x0.createElement(
                _,
                null,
                "- Git repo metadata: ",
                x0.createElement(
                  _,
                  { dimColor: true },
                  gitInfo.gitState.branchName,
                  gitInfo.gitState.commitHash
                    ? `, ${gitInfo.gitState.commitHash.slice(0, 7)}`
                    : "",
                  gitInfo.gitState.remoteUrl
                    ? ` @ ${gitInfo.gitState.remoteUrl}`
                    : "",
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
              "We will use your feedback to debug related issues or to improve ",
              m0,
              "'createInteractionAccessor functionality (eg. to reduce the risk of bugs occurring in the future). Anthropic will not train generative models using feedback from ",
              m0,
              "."
            )
          ),
          x0.createElement(
            g,
            { marginTop: 1 },
            x0.createElement(
              _,
              null,
              "Press ",
              x0.createElement(_, { bold: true }, "Enter"),
              " to confirm and submit."
            )
          )
        ),
      formStep === "submitting" &&
        x0.createElement(
          g,
          { flexDirection: "row", gap: 1 },
          x0.createElement(_, null, "Submitting report…")
        ),
      formStep === "done" &&
        x0.createElement(
          g,
          { flexDirection: "column" },
          errorMessage
            ? x0.createElement(_, { color: "red" }, errorMessage)
            : x0.createElement(_, { color: getThemeStylesheet().success }, "Thank you for your report!"),
          feedbackId &&
            x0.createElement(
              _,
              { dimColor: true },
              "Feedback updateSnapshotAndNotify: ",
              feedbackId
            ),
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
        exitKeyInfo.pending
          ? x0.createElement(x0.Fragment, null, "Press ", exitKeyInfo.keyName, " again to exit")
          : formStep === "userInput"
          ? x0.createElement(x0.Fragment, null, "Enter to continue · Esc to cancel")
          : formStep === "consent"
          ? x0.createElement(x0.Fragment, null, "Enter to submit · Esc to cancel")
          : null
      )
    )
  );
}

module.exports = BugReportForm;