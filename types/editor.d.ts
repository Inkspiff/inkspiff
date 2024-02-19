import React from "react";

export type EditorActionType = "" | "undo" | "redo" | "delete";
export type EditorPopupType =
  | ""
  | "settings"
  | "export"
  | "import"
  | "templates"
  | "settings"
  | "feedback"
  | "github"
  | "updates";

export type TableType = {
  markdown: string;
  size: [number, number];
};

export type CodeType = {
  lang: string;
  text: string;
};

export type ListType = {
  type: "numbered" | "stared" | "dashed";
  items: string[];
};

export interface BlockType {
  html: string;
  tag: string;
  id: string;
}

export interface BlockSelectItemType {
  id: string;
  content: string;
  tag: string;
  label: string;
}

export interface ViewSettingsType {
  fullscreen: boolean;
  sidebar: boolean;
  drawer: boolean;
  blocks: boolean;
  bottomPanel: string;
  popup: EditorPopupType;
}

export interface FileType {
  id: string;
  title: string;
}

export interface SectionType {
  id: string;
  name: string;
  content: string;
}

export interface BlockViewElementType {
  content: string;
  tag: string;
  link?: string;
  type?: string;
  alt?: string;
}

export type FileUpdatesTypeType = "change" | "invite" | "notice";

export type FileUpdateType = {
//   id: string;
  type: FileUpdatesTypeType;
  from: string;
  to: string[];
  message: string;
  sentAt: number;
  image?: string;
  seen: boolean;
  markdownID: string;
};
