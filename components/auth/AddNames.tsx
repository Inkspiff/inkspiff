import React from 'react'
import Button from "@mui/material/Button"
import Input from "@mui/material/Input"
import Box from "@mui/material/Box"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { namesSchema } from "@/lib/validations/auth"
import * as z from "zod"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

type FormData = z.infer<typeof namesSchema>

const AddNames = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(namesSchema),
    }) 

    const [loading, setLoading] = React.useState<boolean>(false)


    const onSubmit = async (data: FormData) => {
        setLoading(true)

        if (!session?.user) {
            return
        }

        const response = await fetch("/api/db/user/add-user-names", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: session?.user.id,
                firstName: data.firstName,
                lastName: data.lastName,
            }),
        })
        setLoading(false)

        if (!response?.ok) {
                console.log("failed to save namse");
            if (response.status === 402) {
                console.log("failed 402");
            return
            }
            return
        }

        else {
            router.reload()
        }
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
            <Input
            type="text"
            placeholder="First Name"
            {...register("firstName")}
            />

        </Box>
        <Box>
            <Input
            type="text"
            placeholder="Last Name"
            {...register("lastName")}
            />
        </Box>
        <Button type="submit">Submit</Button>
    </form>
  )
}

export default AddNames