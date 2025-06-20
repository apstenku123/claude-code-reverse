/**
 * Renders a detailed error message with stack trace and code context for CLI output.
 *
 * @param {Object} params - The parameters object.
 * @param {Error} params.error - The error object to render, must have message and stack properties.
 * @returns {React.ReactElement} a React element tree representing the formatted error output.
 */
function renderErrorWithStackTrace({ error }) {
  // Parse stack trace lines (skip the first line, which is the error message)
  const stackLines = error.stack ? error.stack.split('\n').slice(1) : undefined;

  // Parse the first stack line to extract file, line, and column info
  const firstStackFrame = stackLines ? IG0.parseLine(stackLines[0]) : undefined;

  // Remove local file prefix from file path
  const sourceFilePath = removeLocalFilePrefix(firstStackFrame?.file);

  let codeContext = undefined;
  let maxLineNumberWidth = 0;

  // If handleMissingDoctypeError have a valid file, line number, and the file exists, read the file and extract code context
  if (
    sourceFilePath &&
    firstStackFrame?.line &&
    bI1.existsSync(sourceFilePath)
  ) {
    const fileContents = bI1.readFileSync(sourceFilePath, 'utf8');
    codeContext = AG0(fileContents, firstStackFrame.line);
    // Determine the width needed for line numbers
    if (codeContext) {
      for (const { line: contextLineNumber } of codeContext) {
        maxLineNumberWidth = Math.max(
          maxLineNumberWidth,
          String(contextLineNumber).length
        );
      }
    }
  }

  // Render the error header and message
  const errorHeader = B7.default.createElement(
    g,
    { flexDirection: 'column', padding: 1 },
    B7.default.createElement(
      g,
      null,
      B7.default.createElement(
        _,
        { backgroundColor: 'red', color: 'white' },
        ' ',
        'ERROR',
        ' '
      ),
      B7.default.createElement(_, null, ' ', error.message)
    ),
    // Render file:line:column if available
    firstStackFrame && sourceFilePath &&
      B7.default.createElement(
        g,
        { marginTop: 1 },
        B7.default.createElement(
          _,
          { dimColor: true },
          sourceFilePath,
          ':',
          firstStackFrame.line,
          ':',
          firstStackFrame.column
        )
      ),
    // Render code context if available
    firstStackFrame && codeContext &&
      B7.default.createElement(
        g,
        { marginTop: 1, flexDirection: 'column' },
        codeContext.map(({ line: contextLineNumber, value: contextLine }) =>
          B7.default.createElement(
            g,
            { key: contextLineNumber },
            B7.default.createElement(
              g,
              { width: maxLineNumberWidth + 1 },
              B7.default.createElement(
                _,
                {
                  dimColor: contextLineNumber !== firstStackFrame.line,
                  backgroundColor:
                    contextLineNumber === firstStackFrame.line ? 'red' : undefined,
                  color:
                    contextLineNumber === firstStackFrame.line ? 'white' : undefined
                },
                String(contextLineNumber).padStart(maxLineNumberWidth, ' '),
                ':'
              )
            ),
            B7.default.createElement(
              _,
              {
                key: contextLineNumber,
                backgroundColor:
                  contextLineNumber === firstStackFrame.line ? 'red' : undefined,
                color:
                  contextLineNumber === firstStackFrame.line ? 'white' : undefined
              },
              ' ' + contextLine
            )
          )
        )
      ),
    // Render the full stack trace if available
    error.stack &&
      B7.default.createElement(
        g,
        { marginTop: 1, flexDirection: 'column' },
        error.stack
          .split('\n')
          .slice(1)
          .map((stackLine) => {
            const parsedFrame = IG0.parseLine(stackLine);
            if (!parsedFrame) {
              // If the line can'processRuleBeginHandlers be parsed, just print isBlobOrFileLikeObject dimmed
              return B7.default.createElement(
                g,
                { key: stackLine },
                B7.default.createElement(_, { dimColor: true }, '- '),
                B7.default.createElement(_, { dimColor: true, bold: true }, stackLine)
              );
            }
            // Otherwise, print function and file info
            return B7.default.createElement(
              g,
              { key: stackLine },
              B7.default.createElement(_, { dimColor: true }, '- '),
              B7.default.createElement(_, { dimColor: true, bold: true }, parsedFrame.function),
              B7.default.createElement(
                _,
                { dimColor: true, color: 'gray' },
                ' ',
                '(',
                removeLocalFilePrefix(parsedFrame.file) ?? '',
                ':',
                parsedFrame.line,
                ':',
                parsedFrame.column,
                ')'
              )
            );
          })
      )
  );

  return errorHeader;
}

module.exports = renderErrorWithStackTrace;