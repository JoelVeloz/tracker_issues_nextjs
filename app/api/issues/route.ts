import { NextRequest, NextResponse } from "next/server";
// import prisma from "@prisma/client";
// mala practica
import { PrismaClient } from "@prisma/client";
import { createIssueSchema } from "../validationSchemas";
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success) {
    // return new Response(JSON.stringify(validation.error), {
    //   status: 400,
    //   headers: { "Content-Type": "application/json" },
    // });
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: validation.data.title,
      description: validation.data.description,
    },
  });
  return NextResponse.json(newIssue, { status: 201 });
}
export async function GET() {
  const issues = await prisma.issue.findMany();
  return NextResponse.json(issues);
}
