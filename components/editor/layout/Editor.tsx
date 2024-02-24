import React, { useCallback, useEffect, useState } from "react";
import { EditorState, Text, EditorSelection } from "@codemirror/state";
// import { EditorView } from '@codemirror/view'
import { undo, redo } from "@codemirror/commands";
import useCodeMirror from "@/hooks/use-codemirror";
import Box from "@mui/material/Box";
import {
  blockRequiresNewLine,
  getCaretCoordinates,
  getSectionFromLine,
} from "@/lib/utils";
import SelectMenu from "@/components/editor/blocks/SelectMenu";
import { BlockSelectItemType } from "@/types/editor";
import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { useRouter } from "next/router";
import BottomPanel from "@/components/editor/layout/BottomPanel";
import { set } from "zod";

interface Props {
  initialDoc: string;
  // onChange: (doc: EditorState) => void,
}

const Editor: React.FC<Props> = (props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const app = useSelector((state: RootState) => state.app);
  const {
    editorAction,
    markdown,
    viewSettings,
    markdownSelected,
    saveStates,
    addedSections,
  } = app;
  const { content, currentLine, currentHead, id } = markdown;
  const { fullscreen } = viewSettings;
  const [selectMenuIsOpen, setSelectMenuIsOpen] = useState<boolean>(false);
  const [selectMenuPosition, setSelectMenuPosition] = useState<{
    x: number | null;
    y: number | null;
  }>({
    x: null,
    y: null,
  });

  const { initialDoc } = props;

  const saveMd = async (
    newContent: string,
    newCurrentLine: number,
    newCurrentHead: number
  ) => {
    dispatch(
      appActions.updatedSaveStates({
        saving: true,
        saveFailed: false,
      })
    );

    console.log("about to fetch save");

    const response = await fetch("/api/db/update-md-content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session!.user.id,
        mdId: id,
        content: newContent,
        currentLine: newCurrentLine,
        currentHead: newCurrentHead,
      }),
    });

    dispatch(
      appActions.updatedSaveStates({
        saving: false,
        saveFailed: false,
      })
    );
    
    setOnDelay(false);

    if (!response?.ok) {
      dispatch(
        appActions.updatedSaveStates({
          saving: false,
          saveFailed: true,
        })
      );
      if (response.status === 402) {
        return;
      }
      return;
    }
  };

  let saveTimeout: NodeJS.Timeout | null = null;

  const handleDocChange = useCallback((newState: EditorState) => {
    const newCurrentLine = newState.doc.lineAt(
      newState.selection.main.head
    ).number;
    const newContent = newState.doc.toString();
    const newCurrentHead = newState.selection.ranges[0].head;

      if (saveTimeout) {
        clearTimeout(saveTimeout);
      }
      saveTimeout = setTimeout(() => {
        saveMd(newContent, newCurrentLine, newCurrentHead);
      }, 3000);
    
  }, [onDelay]);

  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    initialDoc: initialDoc,
    onChange: handleDocChange,
    // extensions: [history()]
  });

  useEffect(() => {
    if (editorView) {
      // Update the editor content when the doc changes
      const state = editorView.state;
      const transaction = state.update({
        changes: {
          from: 0,
          to: state.doc.length,
          insert: content,
        },
      });
      editorView.dispatch(transaction);

      // Set the cursor position
      const newSelection = EditorSelection.single(currentHead);
      editorView.dispatch({
        selection: newSelection,
      });
    }
  }, [content, editorView, onDelay]);

  const updateEditorContent = useCallback(
    (newContent: string, from: number, to: number) => {
      if (editorView) {
        const state = editorView.state;

        const transaction = state.update({
          changes: {
            from: from,
            to: to,
            insert: newContent,
          },
        });

        editorView.dispatch(transaction);
      }
    },
    [editorView]
  );

  const keyUpHandler = (e: React.KeyboardEvent) => {
    if (e.key === "/") {
      openSelectMenuHandler();
    }
  };

  const openSelectMenuHandler = () => {
    const { x, y } = getCaretCoordinates();
    setSelectMenuIsOpen(true);
    setSelectMenuPosition({ x: x!, y: y! });
    document.addEventListener("click", closeSelectMenuHandler);
  };

  const closeSelectMenuHandler = () => {
    setSelectMenuIsOpen(false);
    setSelectMenuPosition({ x: null, y: null });
    document.removeEventListener("click", closeSelectMenuHandler);
  };

  const blockSelectionHandler = (block: BlockSelectItemType) => {
    // get head
    if (editorView) {
      const { from, to, head, anchor } = editorView.state.selection.ranges[0];

      console.log("blockSelectionHandler", { from, to, head, anchor });

      // TODO: Remove the last character -> /
      const splitContent = markdown.content.split("\n");
      console.log({ splitContent });

      if (blockRequiresNewLine(block.tag)) {
        const contentUntilLine = splitContent.slice(0, markdown.currentLine);
        console.log({ contentUntilLine });

        const numberOfCharsUntilLine = contentUntilLine.join("\n").length;
        console.log(numberOfCharsUntilLine);

        const usableFromValue =
          numberOfCharsUntilLine <= 0 ? 0 : numberOfCharsUntilLine - 1;

        updateEditorContent(
          (markdown.content.trim() === "/" ? "" : "\n\n") + block.content,
          usableFromValue,
          numberOfCharsUntilLine
        );
        // Set the cursor position using EditorSelection
        const newSelection = EditorSelection.single(
          numberOfCharsUntilLine == 1
            ? block.content.length
            : numberOfCharsUntilLine + block.content.length + 1 - 1
        );
        editorView.dispatch({
          selection: newSelection,
        });
      } else {
        // splitContent[markdown.currentLine - 1] += block.content
        updateEditorContent(block.content, from - 1, to); // -1 removes the slash

        // Set the cursor position using EditorSelection
        const newSelection = EditorSelection.single(
          to + block.content.length - 1
        );

        editorView.dispatch({
          selection: newSelection,
        });
      }

      closeSelectMenuHandler();
    }
  };

  const handleUndo = () => {
    if (editorView) {
      undo({
        state: editorView.state,
        dispatch: editorView.dispatch,
      });
    }
  };

  const handleRedo = () => {
    if (editorView) {
      redo({
        state: editorView.state,
        dispatch: editorView.dispatch,
      });
    }
  };

  useEffect(() => {
    switch (editorAction) {
      case "undo":
        handleUndo();
        break;
      case "redo":
        handleRedo();
        break;
      default:
        break;
    }

    if (editorAction !== "") {
      dispatch(appActions.setEditorAction(""));
    }
  }, [editorAction]);

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Box
        component="div"
        className="Page"
        sx={{}}
        ref={refContainer}
        onKeyUp={keyUpHandler}
      ></Box>
      <SelectMenu
        open={selectMenuIsOpen}
        position={selectMenuPosition}
        onSelect={blockSelectionHandler}
        close={closeSelectMenuHandler}
      />
      <BottomPanel
        onSelectBlock={blockSelectionHandler}
        onUndo={handleUndo}
        onRedo={handleRedo}
      />
    </Box>
  );
};

export default Editor;
