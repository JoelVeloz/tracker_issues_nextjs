'use client'
import React from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { z } from "zod";
import { createIssueSchema } from '../api/validationSchemas'
type IssueForm = z.infer<typeof createIssueSchema>

const IssuePage = () => {
    const [issues, setIssues] = React.useState([] as Array<IssueForm>)
    const getIssues = async () => {
        const response = await fetch('/api/issues')
        const data = await response.json() as Array<IssueForm>
        console.log(data);
        setIssues(data)
    }
    React.useEffect(() => {
        getIssues()
    }, [])

    return (
        <div>
            <h1>Issue Page</h1>
            <Button >
                <Link href="/issues/new">
                    Create Issue
                </Link>
            </Button>

            <div>
                <Table>
                    <TableCaption>A list of your recent issues.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Description</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {issues.map((issue) => (
                            <TableRow key={issue.id}>
                                <TableCell className="font-medium">{issue.id}</TableCell>
                                <TableCell >{issue.title}</TableCell>
                                <TableCell>{issue.description}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
        </div>
    )
}

export default IssuePage