import React from "react"
export type TableType = {
    markdown: string,
    size: [number, number]
}

export type CodeType = {
    lang: string,
    text: string
}

export type ListType = {
    type: "numbered" | "stared" | "dashed",
    items: string[]
}


export interface BlockType {
    html: string;
    tag: string;
    id: string;
  }


export  interface SelectMenuItemType {
    id: string;
    content: string;
    tag: string;
    label: string;
}
  
export interface ViewSettingsType {
    fullscreen: boolean,
    sidebar: boolean,
    drawer: boolean,
    blocks: boolean,
}

export interface FileType {
    id: string,
    title: string,
}

export interface SectionType {
    id: string,
    name: string,
    content: string,

}