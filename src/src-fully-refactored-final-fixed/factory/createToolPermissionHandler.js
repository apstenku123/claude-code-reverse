/**
 * Factory function that creates a handler for managing tool permission requests and user interactions.
 * The returned callback evaluates tool permissions, handles user prompts, and manages acceptance or rejection flows.
 *
 * @param {Function} updateInteractionEntries - Function to update the list of interaction entries (e.g., React setState).
 * @returns {Function} - a callback to handle tool permission logic for a given tool and context.
 */
function createToolPermissionHandler(updateInteractionEntries) {
  return US2.useCallback(
    /**
     * Handles tool permission evaluation and user interaction.
     *
     * @param {Object} toolConfig - The tool configuration object.
     * @param {any} toolInput - The input provided to the tool.
     * @param {Object} toolUseContext - Context for the tool use, including abort controller and options.
     * @param {Object} assistantMessageContext - Context containing the assistant message and related metadata.
     * @returns {Promise<Object>} - Resolves with the permission result and any updated input.
     */
    async (
      toolConfig,
      toolInput,
      toolUseContext,
      assistantMessageContext
    ) => {
      return new Promise(resolve => {
        /**
         * Handles cancellation of tool use, logs the event.
         */
        function handleToolUseCancelled() {
          logTelemetryEventIfEnabled("tengu_tool_use_cancelled", {
            messageID: assistantMessageContext.message.id,
            toolName: toolConfig.name
          });
        }

        /**
         * Resolves the promise with an 'ask' behavior and aborts the controller.
         */
        function resolveWithAskBehavior() {
          resolve({
            behavior: "ask",
            message: ce
          });
          toolUseContext.abortController.abort();
        }

        // If the tool use was already aborted, handle cancellation and resolve as 'ask'.
        if (toolUseContext.abortController.signal.aborted) {
          handleToolUseCancelled();
          resolveWithAskBehavior();
          return;
        }

        // Evaluate tool permission based on current context and input.
        return evaluateToolPermission(
          toolConfig,
          toolInput,
          toolUseContext,
          assistantMessageContext
        )
          .then(async permissionResult => {
            // If permission is granted directly by config
            if (permissionResult.behavior === "allow") {
              logTelemetryEventIfEnabled("tengu_tool_use_granted_in_config", {
                messageID: assistantMessageContext.message.id,
                toolName: toolConfig.name
              });
              if (HA1(toolConfig.name)) {
                Fy()?.add(1, {
                  decision: "accept",
                  source: "config",
                  tool_name: toolConfig.name
                });
              }
              zA1(toolConfig.name, "accept", "config");
              resolve({
                ...permissionResult,
                updatedInput: toolInput,
                userModified: false
              });
              return;
            }

            // Get tool description for user prompt
            const toolDescription = await toolConfig.description(toolInput, {
              isNonInteractiveSession: toolUseContext.options.isNonInteractiveSession,
              getToolPermissionContext: toolUseContext.getToolPermissionContext,
              tools: toolUseContext.options.tools
            });

            // If aborted during description fetch, handle cancellation
            if (toolUseContext.abortController.signal.aborted) {
              handleToolUseCancelled();
              resolveWithAskBehavior();
              return;
            }

            switch (permissionResult.behavior) {
              case "deny": {
                logTelemetryEventIfEnabled("tengu_tool_use_denied_in_config", {
                  messageID: assistantMessageContext.message.id,
                  toolName: toolConfig.name
                });
                if (HA1(toolConfig.name)) {
                  Fy()?.add(1, {
                    decision: "reject",
                    source: "config",
                    tool_name: toolConfig.name
                  });
                }
                zA1(toolConfig.name, "reject", "config");
                resolve(permissionResult);
                return;
              }
              case "ask": {
                // Add a new interaction entry for user prompt
                updateInteractionEntries(prevEntries => [
                  ...prevEntries,
                  {
                    assistantMessage: assistantMessageContext,
                    tool: toolConfig,
                    description: toolDescription,
                    input: toolInput,
                    toolUseContext,
                    permissionResult,
                    /**
                     * Handler for when the user aborts the prompt.
                     */
                    onAbort() {
                      handleToolUseCancelled();
                      logTelemetryEventIfEnabled("tengu_tool_use_rejected_in_prompt", {
                        messageID: assistantMessageContext.message.id,
                        toolName: toolConfig.name
                      });
                      if (HA1(toolConfig.name)) {
                        Fy()?.add(1, {
                          decision: "reject",
                          source: "user_abort",
                          tool_name: toolConfig.name
                        });
                      }
                      zA1(toolConfig.name, "reject", "user_abort");
                      resolveWithAskBehavior();
                    },
                    /**
                     * Handler for when the user allows tool use.
                     * @param {string} allowType - 'permanent' or 'temporary'
                     * @param {any} updatedInput - The possibly modified input from the user
                     */
                    onAllow(allowType, updatedInput) {
                      if (allowType === "permanent") {
                        logTelemetryEventIfEnabled("tengu_tool_use_granted_in_prompt_permanent", {
                          messageID: assistantMessageContext.message.id,
                          toolName: toolConfig.name
                        });
                      } else {
                        logTelemetryEventIfEnabled("tengu_tool_use_granted_in_prompt_temporary", {
                          messageID: assistantMessageContext.message.id,
                          toolName: toolConfig.name
                        });
                      }
                      if (HA1(toolConfig.name)) {
                        Fy()?.add(1, {
                          decision: "accept",
                          source: allowType === "permanent" ? "user_permanent" : "user_temporary",
                          tool_name: toolConfig.name
                        });
                      }
                      const acceptSource = allowType === "permanent" ? "user_permanent" : "user_temporary";
                      zA1(toolConfig.name, "accept", acceptSource);
                      // Determine if the input was modified by the user
                      const userModified = toolConfig.inputsEquivalent
                        ? !toolConfig.inputsEquivalent(toolInput, updatedInput)
                        : false;
                      resolve({
                        behavior: "allow",
                        updatedInput,
                        userModified
                      });
                    },
                    /**
                     * Handler for when the user rejects tool use in the prompt.
                     */
                    onReject() {
                      logTelemetryEventIfEnabled("tengu_tool_use_rejected_in_prompt", {
                        messageID: assistantMessageContext.message.id,
                        toolName: toolConfig.name
                      });
                      if (HA1(toolConfig.name)) {
                        Fy()?.add(1, {
                          decision: "reject",
                          source: "user_reject",
                          tool_name: toolConfig.name
                        });
                      }
                      zA1(toolConfig.name, "reject", "user_reject");
                      resolveWithAskBehavior();
                    }
                  }
                ]);
                return;
              }
            }
          })
          .catch(error => {
            // If the error is a known abort error, handle as cancellation
            if (error instanceof KG) {
              handleToolUseCancelled();
              resolveWithAskBehavior();
            } else {
              reportErrorIfAllowed(error);
            }
          });
      });
    },
    [updateInteractionEntries]
  );
}

module.exports = createToolPermissionHandler;