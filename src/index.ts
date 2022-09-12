import * as $ from "jquery";

console.log("Hello!");
$("body").css("background-color", "#ececec");
(window as any).jquery = $; // for debugging purpose only
