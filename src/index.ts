import * as $ from "jquery";
import { build } from "./utils/builder";

console.log("Hello!");
$("body").css("background-color", "#ececec");
(window as any).jquery = $; // for debugging purpose only

const formData: Record<string, string> = {
  condition: "all",
  command: "none",
  "condition-regex": "/.*/",
};

type BuildResult =
  | { ok: true; result: string }
  | { ok: false; message: string };

// return sed command or error
function getBuildResult(): BuildResult {
  try {
    const cmd = build(formData);
    return { ok: true, result: cmd };
  } catch (e) {
    const message = e instanceof Error ? e.message : JSON.stringify(e);
    return { ok: false, message };
  }
}

// update UI to match formData
function render() {
  for (const name in formData) {
    const value = formData[name];
    $(`input[type=radio][name=${name}]`).val([value]);
    $(`input[type=text][name=${name}]`).val(value);
    $(`input[type=number][name=${name}]`).val(value);
  }
  const buildResult = getBuildResult();
  if (buildResult.ok) {
    $("#result-0949").text(buildResult.result).css("color", "inherit");
  } else {
    $("#result-0949").text(buildResult.message).css("color", "red");
  }
}

function setup() {
  $("body")
    .find("input")
    .each((_, element) => {
      $(element).on("input", (event) => {
        const { name, value } = event.target;
        formData[name] = value;
        console.log({ name, value });
        render();
      });
    });
}

window.onload = () => {
  setup();
  render();
};
