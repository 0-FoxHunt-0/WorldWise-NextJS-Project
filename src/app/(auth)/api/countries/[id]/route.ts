import prisma from "@/lib/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";
import * as z from "zod";

const countrySchema = z.object({
  country: z
    .string()
    .min(1, "Country name is required")
    .max(100, "Country name is too long"),
  emoji: z.string().min(1, "Emoji is required").max(200, "Emoji is too long"),
});

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    const countries = await prisma.city.findMany({
      where: {
        userId,
      },
      distinct: "country",
      select: {
        country: true,
        emoji: true,
      },
    });

    return NextResponse.json({ countries }, { status: 200 });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          message: `No cities exist so no countries exist`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Some error has occurred", error },
      { status: 500 }
    );
  }
}
