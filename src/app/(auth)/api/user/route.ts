import prisma from "@/lib/db";
import * as bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import * as z from "zod";

const saltRounds: number = 10;

// Define Schema for input validation
const userSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(100, "Username too long"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have at least 8 characters"),
});

export async function GET() {
  return NextResponse.json({ success: true }, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = userSchema.parse(body);

    // Check if email already exists
    const existingUserByEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        {
          user: null,
          message: "User with this email already exists.",
        },
        { status: 409 }
      );
    }

    // Check if username already exists
    const existingUserByUsername = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (existingUserByUsername) {
      return NextResponse.json(
        {
          user: null,
          message: "User with this username already exists.",
        },
        { status: 409 }
      );
    }

    const hashSalt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, hashSalt);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
