import React, {useState, useCallback, useEffect} from 'react'
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { useSession, } from "next-auth/react";
import { useRouter } from "next/router"
import {splitIntoBlocks} from "@/lib/utils"
import BlockText from '@/components/editor/BlockText';
import BlockTable from '@/components/editor/BlockTable';
import BlockListItem from '@/components/editor/BlockListItem';
import BlockImage from '@/components/editor/BlockImage';

const Blocks = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch()
  const app = useSelector((state: RootState) => state.app)
  const {markdown, viewSettings, markdownSelected, saveStates, selectedSection } = app
  const {content, currentLine} = markdown

  const blocks = splitIntoBlocks(content)

  return (
    <Box sx={{
        border: "1px solid red",
        px: 3,
    }}>
        {blocks.map((block, index) => {
            const {tag} = block

            switch (tag) {
                case "heading":
                    return <BlockText block={block} />
                case "table":
                    return <BlockTable table={block} />
                case "list":
                    return <BlockListItem block={block} />
                case "image":
                    return <BlockImage block={block} />
                default:
                    return <BlockText block={block}  />
            }

        })}
    </Box>
  )
}

export default Blocks