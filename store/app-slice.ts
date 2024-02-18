import { BlockType, ViewSettingsType, FileType, BlockSelectItemType, EditorActionType, EditorPopupType, FileUpdateType } from "@/types/editor";
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
    updates: FileUpdateType[],
    saveStates: {
        saving: boolean,
        saveFailed: boolean,
    }
    markdownSelected: string,
    templates: TemplateType[],
    viewSettings: ViewSettingsType,
    loadingFile: boolean,
    fileList: FileType[],
    openLoginModal: boolean,
    editorAction: EditorActionType,
}

const initialState: appState = {
    theme: 1,
    ids: [],
    selectedSection: null,
    addedSections: [],
    markdown: {
        id: "",
        title: "",
        content: "",
        currentLine: 1,
        currentHead: 0,
        lastEdited: 0,
        admin: "",
        memberIDs: [],
        visibility: "",
        github: "",
    },
    updates: [],
    saveStates: {
        saving: false,
        saveFailed: false
    },
    markdownSelected: "",
    templates: [],
    viewSettings: {
        fullscreen: false,
        sidebar: false,
        drawer: false,
        blocks: false,
        bottomPanel: "",
        popup: "",
    },
    loadingFile: false,
    fileList: [],
    openLoginModal: false,
    editorAction: "",
}


const appSlice = createSlice( {
    name: "app",
    initialState,
    reducers: {
        /**EDITOR ACTIONS */
        changeTheme(state) {
            state.theme = state.theme + 0.1
        },
        setEditorAction(state, action: PayloadAction<EditorActionType>) {
            state.editorAction = action.payload
        },

        /** MARKDOWN ACTIONS */
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
        insertMarkdown(state, action: PayloadAction<BlockSelectItemType  >){
            const splitContent = state.markdown.content.split("\n")

            splitContent.splice(state.markdown.currentLine, 0, action.payload.content);

            state.markdown = {...state.markdown, content: splitContent.join("\n")}
        },

        changeVisibility(state, action: PayloadAction<string>) {
            state.markdown = {
                ...state.markdown,
                visibility: action.payload
            }
        },


        /* FILE ACTIONS */
        setLoadingFile(state, action: PayloadAction<boolean>){
            state.loadingFile = action.payload
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
        addFile(state, action: PayloadAction< FileType>) {
            state.fileList =  [...state.fileList, action.payload]
        },


        /**SECTIONING ACTIONS */
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
            // state.selectedSection = action.payload
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
            const id = state.selectedSection!.id

            const newSelectedSection = {
                id: state.selectedSection!.id,
                name: state.selectedSection!.name,
                content: action.payload,
            }

            let updatedSections = [...state.addedSections]

            let indexOfSelectedSection = updatedSections.findIndex(section => {
                return section.id === id
            });

            if ( updatedSections[indexOfSelectedSection] ) {
                updatedSections[indexOfSelectedSection] = {
                    ...newSelectedSection
                }
    
                state.addedSections = updatedSections
            }

            state.selectedSection = {
                ...newSelectedSection
            }
        },


        /**UPDATE ACTIONS */
        setUpdates(state, action: PayloadAction<FileUpdateType[]>) {
            state.updates = action.payload
        },


        /**TEMPLATE ACTIONS */
        updateTemplates(state, action: PayloadAction<TemplateType[]>) {
            state.templates = action.payload
        },

        /** VIEW ACTIONS */
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
        closeDrawer(state) {
            state.viewSettings = {
                ...state.viewSettings, 
                drawer: false
            }
        },
        openDrawer(state) {
            state.viewSettings = {
                ...state.viewSettings, 
                drawer: true
            }
        },
        closeBottomPanel(state) {
            state.viewSettings = {
                ...state.viewSettings, 
                bottomPanel: ""
            }
        },
        openBottomPanel(state, action: PayloadAction<string>) {
            state.viewSettings = {
                ...state.viewSettings, 
                bottomPanel: action.payload
            }
        },
        updatedSaveStates(state, action: PayloadAction<{saving: boolean, saveFailed: boolean}>) {
            state.saveStates = {
                saving: action.payload.saving,
                saveFailed: action.payload.saveFailed
            }
        },
        toggleOpenLoginModal(state) {
            state.openLoginModal = !state.openLoginModal
        },
        setPopup(state, action: PayloadAction<EditorPopupType>) {
            state.viewSettings = {
                ...state.viewSettings, 
                popup: action.payload
            }
        },
    }
})

export const appActions = appSlice.actions


export default appSlice;