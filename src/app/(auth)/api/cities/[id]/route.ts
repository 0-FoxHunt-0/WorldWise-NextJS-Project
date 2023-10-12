import prisma from "@/lib/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";
import * as z from "zod";

const citySchema = z.object({
  cityName: z
    .string()
    .min(1, "CityName is required")
    .max(100, "CityName is too long"),
  country: z
    .string()
    .min(1, "Country name is required")
    .max(100, "Country name is too long"),
  position: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  emoji: z.string().min(1, "Emoji is required").max(200, "Emoji is too long"),
  date: z.string().min(1, "Date is required").max(100, "Date is too long"),
  notes: z.string().max(1500, "Notes are too long"),
});

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const cities = await prisma.city.findMany({
    where: {
      userId: params.id,
    },
    include: {
      position: { select: { lat: true, lng: true } },
    },
  });

  return NextResponse.json({ cities }, { status: 200 });
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { cityName, country, position, date, emoji, notes } =
      citySchema.parse(body);
    const userId: string = params.id;

    const newCity = await prisma.city.create({
      data: {
        cityName,
        country,
        emoji,
        date,
        notes,
        userId,
        position: {
          create: {
            lat: position.lat,
            lng: position.lng,
          },
        },
      },
      include: {
        position: { select: { lat: true, lng: true } },
      },
    });

    return NextResponse.json(
      {
        newCity,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          {
            message: `An instance of the values ${error.meta.target} already exists`,
          },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { message: "Some error has occurred", error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cityToDeleteId = params.id;
    const deletedCity = await prisma.city.delete({
      where: {
        id: cityToDeleteId,
      },
    });

    console.log(deletedCity);

    return NextResponse.json(
      { message: "City has been deleted" },
      { status: 204 }
    );
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: `A city with the id of: ${params.id} doesn't exist`,
          },
          { status: 404 }
        );
      }
    }

    // return NextResponse.json(
    //   { message: "Some error has occurred", error },
    //   { status: 500 }
    // );
  }
}
