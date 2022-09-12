import { FormData } from "../types";

import {
  ensurePositiveInteger,
  ensureValidRegex,
  assert,
  ensureNonEmptyString,
  ensureString,
  safelyQuote,
} from "./assertion";

function buildConditionSegment(formData: FormData) {
  switch (formData.condition) {
    case "all":
      return "";
    case "single": {
      const lineNumber = ensurePositiveInteger(formData["condition-single"]);
      return `${lineNumber}`;
    }
    case "range": {
      const from = ensurePositiveInteger(formData["condition-range-from"]);
      const to = ensurePositiveInteger(formData["condition-range-to"]);
      return `${from},${to}`;
    }
    case "regex": {
      const pattern = ensureValidRegex(formData["condition-regex"]);
      return pattern;
    }
    default:
      assert(false, "unknown condition");
  }
}

function buildCommandSegment(formData: FormData): string {
  switch (formData.command) {
    case "none":
      return "";
    case "delete":
      return "d";
    case "change":
      return "c " + ensureNonEmptyString(formData["command-change"]);
    case "prepend":
      return "i " + ensureNonEmptyString(formData["command-prepend"]);
    case "append":
      return "a " + ensureNonEmptyString(formData["command-append"]);
    case "replace": {
      const pattern = ensureValidRegex(formData["command-replace-pattern"]);
      const replacement = ensureString(formData["command-replace-replacement"]);
      const flags = ensureString(formData["command-replace-flags"]);
      return `s${pattern}${replacement}/${flags}`;
    }
    default:
      assert(false, "unknown command");
  }
}

// returns sed command from formData, or throw an error
export function build(formData: FormData) {
  const conditionSegment = buildConditionSegment(formData);
  const commandSegment = buildCommandSegment(formData);
  const sedCommand = commandSegment ? conditionSegment + commandSegment : "";
  return ["sed", "-e", safelyQuote(sedCommand)].join(" ");
}
