import { BlockType, ViewSettingsType, FileType, SelectMenuItemType } from "@/types/editor";
import {MarkdownInterface, TemplateType } from "@/types"
import { uid } from "@/lib/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SectionType } from "@/types/editor";
import { actionAsyncStorage } from "next/dist/client/components/action-async-storage";


export interface appState {
    theme: number,
    ids: string[],
    selectedSection: null | SectionType,
    addedSections: SectionType[],
    markdown: MarkdownInterface,
    saveStates: {
        saving: boolean,
        saveFailed: boolean,
    }
    markdownSelected: string,
    templates: TemplateType[],
    viewSettings: ViewSettingsType,
    fileList: FileType[]
}

const initialState: appState = {
    theme: 1,
    ids: [],
    selectedSection: null,
    addedSections: [],
    markdown: {
        id: "",
        title: "New File",
        content: "",
        currentLine: 1,
        lastEdited: 0,
        admin: "",
        allowedUsers: [],
        visibility: ""
    },
    saveStates: {
        saving: false,
        saveFailed: false
    },
    markdownSelected: "",
    templates: [],
    viewSettings: {
        fullscreen: false,
        sidebar: false,
        drawer: true,
        blocks: false,
    },
    fileList: [{
        id: "",
        title: "New File"
      }]
    
}


const appSlice = createSlice( {
    name: "app",
    initialState,
    reducers: {
        changeTheme(state) {
            state.theme = state.theme + 0.1
        },
        updateMarkdownSelected(state, action: PayloadAction<string>) {
            state.markdownSelected = action.payload
        },
        updateMarkdown(state, action: PayloadAction<MarkdownInterface>) {
            state.markdown =  action.payload
        },
        updateMarkdownTitle(state, action: PayloadAction<string>) {
            state.markdown = {
                ...state.markdown,
                title: action.payload
            }
        },
        updateMarkdownContent(state, action: PayloadAction<string>) {
            state.markdown = {
                ...state.markdown,
                content: action.payload
            }
        },
        changeMarkdown(state, action: PayloadAction<{
            currentLine: number,
            content: string
        }>) {
            state.markdown =  {
                ...state.markdown,
                currentLine: action.payload.currentLine,
                content: action.payload.content
            }
        },
        insertMarkdown(state, action: PayloadAction<SelectMenuItemType  >){
            const splitContent = state.markdown.content.split("\n")

            splitContent.splice(state.markdown.currentLine, 0, action.payload.content);

            state.markdown = {...state.markdown, content: splitContent.join("\n")}
        },
        updateFileList(state, action: PayloadAction<{
            id: string,
            title: string,
        }[]>) {
            state.fileList =  action.payload
        },
        updateFileTitle(state, action: PayloadAction<{
            id: string,
            title: string,
        }>) {
            const updatedFileList = [...state.fileList]

            const fileIndex = updatedFileList.findIndex(obj => obj.id === action.payload.id);

            if (fileIndex !== -1) {
                // Update the title of the object
                updatedFileList[fileIndex].title = action.payload.title;
            }

            console.log("red")
            state.fileList = updatedFileList
        },
        deleteFile(state, action: PayloadAction< string>) {
            
            let updatedFileList = [...state.fileList]
            
            updatedFileList = updatedFileList.filter(obj => obj.id !== action.payload)
             
            state.fileList = updatedFileList
        },
        selectProject(state, action: PayloadAction<{id: string}>) {
            // state.markdown.text =  
            // state.markdown.id =
        },
        updateTemplates(state, action: PayloadAction<TemplateType[]>) {
            state.templates = action.payload
        },


        // SECTIONS METHODS
        selectSection(state, action: PayloadAction<null | SectionType>) {
            state.selectedSection = action.payload
        },
        addSections(state, action: PayloadAction<SectionType[]>) {
            state.addedSections = action.payload
        },
        removeSection(state, action: PayloadAction<{id: string}>) {
            state.addedSections = state.addedSections
            .filter((section) => section.id !== action.payload.id)
        },
        addSection(state, action: PayloadAction<SectionType>) {
            state.addedSections = [...state.addedSections, action.payload]
        },
        updateSectionContent(state, action: PayloadAction<{id: string, content: string}>) {
            let updatedSections = [...state.addedSections]

            let index = updatedSections.findIndex(section => {
                return section.id === action.payload.id
            });

            if ( updatedSections[index] ) {
                updatedSections[index] = {
                    id: updatedSections[index].id,
                    name: updatedSections[index].name,
                    content: action.payload.content,
                }
    
                state.addedSections = updatedSections
            }

        },
        updateSectionName(state, action: PayloadAction<{id: string, name: string}>) {
            let updatedSections = [...state.addedSections]

            let index = updatedSections.findIndex(section => section.id === action.payload.id);

            if (updatedSections[index]) {
                updatedSections[index] = {
                    id: updatedSections[index].id,
                    content: updatedSections[index].content,
                    name: action.payload.name,
                }
    
                state.addedSections = updatedSections
            }
            

        },
        updateSelectedSectionName(state, action: PayloadAction<string>) {
            state.selectedSection = {
                id: state.selectedSection!.id,
                name: action.payload,
                content: state.selectedSection!.content,
            }
        },
        updateSelectedSectionContent(state, action: PayloadAction<string>) {
            
            state.selectedSection = {
                id: state.selectedSection!.id,
                name: state.selectedSection!.name,
                content: action.payload,
            }
        },

        // VIEW METHODS
        toggleFullscreen(state) {
            state.viewSettings = {
                ...state.viewSettings, 
                fullscreen: !state.viewSettings.fullscreen
            }
        },
        toggleBlocksView(state) {
            state.viewSettings = {
                ...state.viewSettings, 
                blocks: !state.viewSettings.blocks
            }
        },
        toggleSidebar(state) {
            state.viewSettings = {
                ...state.viewSettings, 
                sidebar: !state.viewSettings.sidebar
            }
        },
        toggleDrawer(state) {
            state.viewSettings = {
                ...state.viewSettings, 
                drawer: !state.viewSettings.drawer
            }
        },
        updatedSaveStates(state, action: PayloadAction<{saving: boolean, saveFailed: boolean}>) {
            state.saveStates = {
                saving: action.payload.saving,
                saveFailed: action.payload.saveFailed
            }
        }
    }
})

export const appActions = appSlice.actions


export default appSlice;