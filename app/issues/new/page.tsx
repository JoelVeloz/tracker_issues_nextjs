
"use client"; // This is a client component 👈🏽
import { useRouter } from "next/navigation";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { AlertCircle } from "lucide-react"
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/api/validationSchemas";
import { z } from "zod";
type IssueForm = z.infer<typeof createIssueSchema>


const NewIssuePage = () => {
    const router = useRouter();
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({ resolver: zodResolver(createIssueSchema) });
    console.log(register("title"))
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmitting(true);
            const response = await axios.post('/api/issues', data)
            console.log(response);
            router.push('/issues')
        } catch (error) {
            setIsSubmitting(false);
            console.log(error);
            setError("Something went wrong");
        }
    })
    return (
        <div>
            {
                error &&
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {error}
                    </AlertDescription>
                </Alert>
            }
            <div className="flex items-center justify-center">
                <form onSubmit={onSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Report an issue</CardTitle>
                            <CardDescription>
                                What area are you having problems with?
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Input {...register('title')} id="subject" placeholder="I need help with..." />
                                {errors.title && <span className="text-red-500">{errors.title.message}</span>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Controller
                                    name="description"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) =>
                                        <SimpleMDE
                                            {...field}
                                            id="description"
                                            placeholder="Please include all information relevant to your issue."
                                        />
                                    }
                                />
                                {errors.description && <span className="text-red-500">{errors.description.message}</span>}
                                {/* <SimpleMDE
                            id="description"
                            placeholder="Please include all information relevant to your issue."
                        /> */}
                            </div>
                        </CardContent>

                        <CardFooter className="justify-between space-x-2">
                            {/* <Button variant="ghost">Cancel</Button> */}
                            <p></p>
                            <Button disabled={isSubmitting}>
                                {isSubmitting && (
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Create Issue
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </div>

    )
}

export default NewIssuePage
