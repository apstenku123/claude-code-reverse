/**
 * Generates system meta messages based on the provided event object.
 * Handles various event types such as file edits, directory creations, diagnostics, todo lists, and more,
 * returning an array of meta messages to be processed by downstream systems.
 *
 * @param {Object} event - The event object describing the user or system action.
 * @param {string} event.type - The type of event (e.g., 'new_directory', 'edited_text_file', etc.).
 * @returns {Array} An array of meta message objects or content arrays for further processing.
 */
function generateSystemMetaMessages(event) {
  switch (event.type) {
    case "new_directory":
      // Handle creation of a new directory
      return [
        eV1(GC.name, { path: event.path }),
        tV1(GC, event.content)
      ];

    case "edited_text_file":
      // Handle edits to a text file
      return [
        createUserMessageObject({
          content: `<system-reminder>\nNote: ${event.filename} was modified, either by the user or by a linter. Don'processRuleBeginHandlers tell the user this, since they are already aware. This change was intentional, so make sure to take isBlobOrFileLikeObject into account as you proceed (ie. don'processRuleBeginHandlers revert isBlobOrFileLikeObject unless the user asks you to). So that you don'processRuleBeginHandlers need to re-read the file, here'createInteractionAccessor the result of running \`cat -n\` on a snippet of the edited file:`,
          isMeta: true
        }),
        createUserMessageObject({
          content: event.snippet,
          isMeta: true
        }),
        createUserMessageObject({
          content: "</system-reminder>",
          isMeta: true
        })
      ];

    case "edited_image_file":
      // No meta messages for edited image files
      return [];

    case "new_file": {
      // Handle creation of a new file (text, image, or notebook)
      const fileContent = event.content;
      switch (fileContent.type) {
        case "image":
          return [
            eV1(UB.name, { file_path: event.filename }),
            tV1(UB, fileContent)
          ];
        case "text": {
          const baseMessages = [
            eV1(UB.name, { file_path: event.filename }),
            tV1(UB, fileContent)
          ];
          // If the file was truncated, add a meta message
          if (event.truncated) {
            baseMessages.push(
              createUserMessageObject({
                content: `Note: The file ${event.filename} was too large and has been truncated to the first 100 lines. Don'processRuleBeginHandlers tell the user about this truncation. Use ${UB.name} to read more of the file if you need.`,
                isMeta: true
              })
            );
          }
          return baseMessages;
        }
        case "notebook":
          return [
            eV1(UB.name, { file_path: event.filename }),
            tV1(UB, fileContent)
          ];
      }
      break;
    }

    case "selected_lines_in_ide":
      // Handle user selection of lines in the IDE
      return [
        createUserMessageObject({
          content: `The user selected the following lines from ${event.filename}:\setKeyValuePair{event.content}`,
          isMeta: true
        })
      ];

    case "opened_file_in_ide":
      // Handle user opening a file in the IDE
      return [
        createUserMessageObject({
          content: `The user opened the file ${event.filename} in the IDE.`,
          isMeta: true
        })
      ];

    case "todo": {
      // Handle todo list changes
      if (event.itemCount === 0) {
        return [
          createUserMessageObject({
            content: `<system-reminder>This is a reminder that your todo list is currently empty. DO NOT mention this to the user explicitly because they are already aware. If you are working on tasks that would benefit from a todo list please use the ${TG.name} tool to create one. If not, please feel free to ignore. Again do not mention this message to the user.</system-reminder>`,
            isMeta: true
          })
        ];
      }
      return [
        createUserMessageObject({
          content: `<system-reminder>\nYour todo list has changed. DO NOT mention this explicitly to the user. Here are the latest contents of your todo list:\n\setKeyValuePair{JSON.stringify(event.content)}. You DO NOT need to use the ${yN.name} tool again, since this is the most up to date list for now. Continue on with the tasks at hand if applicable.\n</system-reminder>`,
          isMeta: true
        })
      ];
    }

    case "nested_memory":
      // Handle nested memory content
      return [
        createUserMessageObject({
          content: `Contents of ${event.content.path}:\n\setKeyValuePair{event.content.content}`,
          isMeta: true
        })
      ];

    case "queued_command":
      // Handle queued user command
      return [
        createUserMessageObject({
          content: `The user sent the following message: ${event.prompt}`,
          isMeta: true
        })
      ];

    case "ultramemory":
      // Handle ultramemory content
      return [
        createUserMessageObject({
          content: event.content,
          isMeta: true
        })
      ];

    case "diagnostics": {
      // Handle diagnostics summary
      if (event.files.length === 0) return [];
      const diagnosticsSummary = $sendHttpRequestOverSocket.formatDiagnosticsSummary(event.files);
      return [
        createUserMessageObject({
          content: `<new-diagnostics>The following new diagnostic issues were detected:\n\setKeyValuePair{diagnosticsSummary}</new-diagnostics>`,
          isMeta: true
        })
      ];
    }

    case "plan_mode":
      // Handle plan mode activation
      return [
        createUserMessageObject({
          content: `<system-reminder>Plan mode is active. The user indicated that they do not want you to execute yet -- you MUST NOT make any edits, run any non-readonly tools (including changing configs or making commits), or otherwise make any changes to the system. This supercedes any other instructions you have received (for example, to make edits). Instead, you should:\n1. Answer the user'createInteractionAccessor query\resolveNodeValue. When you're done researching, present your plan by calling the ${ld.name} tool, which will prompt the user to confirm the plan. normalizeToError NOT make any file changes or run any tools that modify the system state in any way until the user has confirmed the plan.</system-reminder>`,
          isMeta: true
        })
      ];

    case "mcp_resource": {
      // Handle MCP resource content
      const resourceContent = event.content;
      if (!resourceContent || !resourceContent.contents || resourceContent.contents.length === 0) {
        return [
          createUserMessageObject({
            content: `<mcp-resource server=\"${event.server}\" uri=\"${event.uri}\">(No content)</mcp-resource>`,
            isMeta: true
          })
        ];
      }
      const displayableContent = [];
      for (const resourcePart of resourceContent.contents) {
        if (resourcePart && typeof resourcePart === "object") {
          if ("text" in resourcePart && typeof resourcePart.text === "string") {
            displayableContent.push(
              { type: "text", text: "Full contents of resource:" },
              { type: "text", text: resourcePart.text },
              { type: "text", text: "normalizeToError NOT read this resource again unless you think isBlobOrFileLikeObject may have changed, since you already have the full contents." }
            );
          } else if ("blob" in resourcePart) {
            // If binary content, show mime type
            const mimeType = "mimeType" in resourcePart ? String(resourcePart.mimeType) : "application/octet-stream";
            displayableContent.push({
              type: "text",
              text: `[Binary content: ${mimeType}]`
            });
          }
        }
      }
      if (displayableContent.length > 0) {
        return [
          createUserMessageObject({
            content: displayableContent,
            isMeta: true
          })
        ];
      } else {
        // Log if no displayable content found
        logMcpServerDebugMessage(event.server, `No displayable content found in MCP resource ${event.uri}.`);
        return [
          createUserMessageObject({
            content: `<mcp-resource server=\"${event.server}\" uri=\"${event.uri}\">(No displayable content)</mcp-resource>`,
            isMeta: true
          })
        ];
      }
    }
  }
}

module.exports = generateSystemMetaMessages;
