import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import View from "@/components/editor/layout/View";
import { useRouter } from "next/router";
import ChooseTemplate from "@/components/create/ChooseTemplate";
import UseAI from "@/components/use-ai/use-ai";
import { TemplateType } from "@/types";
import ChooseCreationMethod from "./ChooseCreationMethod";
import { useSession, signIn, signOut } from "next-auth/react";



const CreateNew = () => {
  const { data: session } = useSession();
  const router = useRouter()
  const dispatch = useDispatch()
  // const app = useSelector((state: RootState) => state.app)
  const [newSelected, setNewSelected] = useState<undefined | number>(undefined) // 0, 1, 2
  const [showCreating, setShowCreating] = useState(false)
  const [openLoginModal, setOpenLoginModal] = useState(false)

  const handleNew = (_newType: number) => {
      
    
    if (_newType === 2) {
      if (session) {
        handleCreateNewMarkdown(
          "New Markdown", ""
          )
      } else {
        router.push("/editor")
      }
     
    } else {
      setNewSelected(_newType)
    }

  }

  const handleSelectedTemplate = (template: TemplateType) => {
    handleCreateNewMarkdown(
      template.name, template.content
      )
    
  }

  const handleBackToCreation = () => {
    setNewSelected(undefined)
  }

  const handleCreateNewMarkdown = async (title: string, content: string) => {
    setShowCreating(true)

    const response = await fetch("/api/db/create-md", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        creator: session!.user,
  
      })

    })

    setShowCreating(false)
    if (!response?.ok) {
      // handle wahalas
    } 

    const json = await response.json()

    router.push(`/editor/${title.trim().split(" ").filter(a => a !== " ").join("-")}-${json.id}`)
  }

  return (
    <>
       {(newSelected === undefined) && <ChooseCreationMethod onHandleNew={handleNew} />}
        {(newSelected === 0) && <UseAI onBack={handleBackToCreation} />}
        {(newSelected === 1) && <ChooseTemplate onSelected={handleSelectedTemplate} onBack={handleBackToCreation} /> }
    </>
  );
};

export default CreateNew;
