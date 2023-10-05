import AlignmentTuneTool from "editorjs-text-alignment-blocktune";
import BreakLine from "editorjs-break-line";
import ColorPlugin from "editorjs-text-color-plugin";
import Delimiter from '@editorjs/delimiter';
import EditorJS from "@editorjs/editorjs";
import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import Image from "@editorjs/image";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import Undo from "editorjs-undo";
import { DEFAULT_EDITOR_DATA } from "./consts";

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
      inlineToolbar: true,
      tunes: ["anyTuneName"],
    },
    breakLine: {
      class: BreakLine,
      inlineToolbar: true,
      shortcut: "CMD+SHIFT+ENTER",
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
    image: {
      class: Image,
    },
    delimiter: {
      class: Delimiter,
    },
    Color: {
      class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
      config: {
        colorCollections: [
          "#EC7878",
          "#9C27B0",
          "#673AB7",
          "#3F51B5",
          "#0070FF",
          "#03A9F4",
          "#00BCD4",
          "#4CAF50",
          "#8BC34A",
          "#CDDC39",
          "#FFF",
        ],
        defaultColor: "#FF1300",
        type: "text",
        customPicker: true, // add a button to allow selecting any colour
      },
    },
    Marker: {
      class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
      config: {
        defaultColor: "#FFBF00",
        type: "marker",
        icon: `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.6,6L6.9,16.7c-0.2,0.2-0.3,0.4-0.3,0.6L6,23.9c0,0.3,0.1,0.6,0.3,0.8C6.5,24.9,6.7,25,7,25c0,0,0.1,0,0.1,0l6.6-0.6 c0.2,0,0.5-0.1,0.6-0.3L25,13.4L17.6,6z"></path> <path d="M26.4,12l1.4-1.4c1.2-1.2,1.1-3.1-0.1-4.3l-3-3c-0.6-0.6-1.3-0.9-2.2-0.9c-0.8,0-1.6,0.3-2.2,0.9L19,4.6L26.4,12z"></path> </g> <g> <path d="M28,29H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S28.6,29,28,29z"></path> </g> </g></svg>`,
      },
    },
  },
  data: DEFAULT_EDITOR_DATA,
  onReady: () => {
    const undo = new Undo({ editor, undoConfig });
    const saveBtn = document.getElementById("save");
    const printBtn = document.getElementById("print");
    const undoButton = document.getElementById("undoButton");
    const redoButton = document.getElementById("redoButton");

    const addEventListener = (element, event, handler) => {
      element.addEventListener(event, handler);
    };

    addEventListener(undoButton, "click", () => undo.undo());
    addEventListener(redoButton, "click", () => undo.redo());
    addEventListener(printBtn, "click", () => window.print());
    addEventListener(saveBtn, "click", () =>
      editor.save().then((savedData) => console.log(JSON.stringify(savedData)))
    );
  },
});
