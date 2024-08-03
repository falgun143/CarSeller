import { NextRequest, NextResponse } from "next/server";
import { encode_jwt } from "@falgunpal/jwt-helper-ts";
import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  if (!process.env.NEXT_PUBLIC_JWT_SECRET) {
    return NextResponse.json({ message: 'Secret cannot be empty or undefined' }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: username },
    });

    if (!user) {
      return NextResponse.json({ message: 'User does not exist. signup' }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }

    const token = encode_jwt(process.env.NEXT_PUBLIC_JWT_SECRET, user.id, { username, role: user.role });

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error during login', error }, { status: 500 });
  }
}
