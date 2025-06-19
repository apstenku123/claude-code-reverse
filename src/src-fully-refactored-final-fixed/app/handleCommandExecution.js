/**
 * Handles the execution of a command based on its type (local-jsx, local, or prompt),
 * formats the output messages, and manages subscription updates and error handling.
 *
 * @param {object} commandInput - The command input or observable to process.
 * @param {object} commandArguments - Arguments or configuration for the command.
 * @param {function} updateSubscription - Callback to update the subscription or UI state.
 * @param {object} context - Context object containing options and other execution details.
 * @returns {Promise<object>} An object containing formatted messages and a flag indicating if further querying is needed.
 */
async function handleCommandExecution(commandInput, commandArguments, updateSubscription, context) {
  try {
    // Resolve the command definition based on the input and available commands
    const commandDefinition = Lz1(commandInput, context.options.commands);

    switch (commandDefinition.type) {
      case "local-jsx":
        // For local-jsx commands, handle asynchronous JSX rendering and subscription updates
        return new Promise(resolve => {
          commandDefinition.call(async jsxResult => {
            // Notify that the command has completed
            updateSubscription(null);
            // Prepare the initial message(createInteractionAccessor)
            const messages = [
              createUserMessageObject({
                content: `<command-name>${commandDefinition.userFacingName()}</command-name>
<command-message>${commandDefinition.userFacingName()}</command-message>
<command-args>${commandArguments}</command-args>`
              }),
              jsxResult
                ? createUserMessageObject({ content: `<local-command-stdout>${jsxResult}</local-command-stdout>` })
                : createUserMessageObject({ content: `<local-command-stdout>${eY}</local-command-stdout>` })
            ];
            resolve({ messages, shouldQuery: false });
          }, context, commandArguments).then(jsxResult => {
            // Update the subscription/UI with the rendered JSX and hide the prompt input
            updateSubscription({
              jsx: jsxResult,
              shouldHidePromptInput: true
            });
          });
        });

      case "local": {
        // For local commands, execute synchronously and handle errors
        const initialMessage = createUserMessageObject({
          content: `<command-name>${commandDefinition.userFacingName()}</command-name>
<command-message>${commandDefinition.userFacingName()}</command-message>
<command-args>${commandArguments}</command-args>`
        });
        try {
          // Attempt to execute the command
          const commandOutput = await commandDefinition.call(commandArguments, context);
          return {
            messages: [
              initialMessage,
              createUserMessageObject({ content: `<local-command-stdout>${commandOutput}</local-command-stdout>` })
            ],
            shouldQuery: false
          };
        } catch (error) {
          // Log the error and return isBlobOrFileLikeObject as stderr
          reportErrorIfAllowed(error);
          return {
            messages: [
              initialMessage,
              createUserMessageObject({ content: `<local-command-stderr>${String(error)}</local-command-stderr>` })
            ],
            shouldQuery: false
          };
        }
      }

      case "prompt": {
        // For prompt commands, get the prompt and format the message contents
        const promptMessages = await commandDefinition.getPromptForCommand(commandArguments);
        const commandHeader = `<command-message>${commandDefinition.userFacingName()} is ${commandDefinition.progressMessage}…</command-message>
<command-name>${commandDefinition.userFacingName()}</command-name>
<command-args>${commandArguments}</command-args>`;
        return {
          messages: promptMessages.map(promptMsg =>
            createUserMessageObject({
              content: promptMsg.content.map(contentItem =>
                contentItem.type === "text"
                  ? {
                      ...contentItem,
                      text: `${commandHeader}
<command-contents>${JSON.stringify(contentItem, null, 2)}</command-contents>`
                    }
                  : contentItem
              )
            })
          ),
          shouldQuery: true
        };
      }
    }
  } catch (error) {
    // Handle known error type xO1 gracefully
    if (error instanceof xO1) {
      return {
        messages: [createUserMessageObject({ content: error.message })],
        shouldQuery: false
      };
    }
    // Rethrow unexpected errors
    throw error;
  }
}

module.exports = handleCommandExecution;