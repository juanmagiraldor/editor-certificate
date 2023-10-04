import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import Paragraph from "@editorjs/paragraph";
import Undo from "editorjs-undo";
import AlignmentTuneTool from "editorjs-text-alignment-blocktune";
import { DEFAULT_EDITOR_DATA } from "./consts";

let undo;
const undoConfig = {
  debounceTimer: 10,
  shortcuts: {
    undo: "CMD+Z",
    redo: "CMD+SHIFT+Z",
  },
};

const editor = new EditorJS({
  // readOnly: true,
  holder: "editorjs",
  tools: {
    paragraph: {
      class: Paragraph,
      inlineToolbar: false,
      tunes: ["anyTuneName"],
    },
    anyTuneName: {
      class: AlignmentTuneTool,
      config: {
        default: "left",
        blocks: {
          header: "left",
          list: "left",
        },
      },
    },
    header: {
      class: Header,
      shortcut: "CMD+SHIFT+R",
    },
    list: {
      class: List,
      inlineToolbar: true,
    },
    embed: {
      class: Embed,
      config: {
        services: {
          youtube: true,
          coub: true,
        },
      },
    },
  },
  data: DEFAULT_EDITOR_DATA,
  onReady: () => {
    undo = new Undo({ editor, undoConfig });
  },
});

const saveBtn = document.getElementById("save");
const printBtn = document.getElementById("print");
const undoButton = document.getElementById("undoButton");
const redoButton = document.getElementById("redoButton");

undoButton.addEventListener("click", () => {
  undo.undo();
});

redoButton.addEventListener("click", () => {
  undo.redo();
});

printBtn.addEventListener("click", () => {
  window.print();
});

saveBtn.addEventListener("click", () => {
  editor.save().then((savedData) => {
    console.log(JSON.stringify(savedData));
  });
});
