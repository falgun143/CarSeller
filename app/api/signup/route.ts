import { NextRequest,NextResponse } from "next/server";
import { encode_jwt } from "@falgunpal/jwt-helper-ts";
import prisma from "../../../lib/prisma"
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt"

export async function POST(request:NextRequest) {

    const { username, password, role } = await request.json();

    if (!process.env.NEXT_PUBLIC_JWT_SECRET) {
      return NextResponse.json({ message: 'Secret cannot be empty or undefined' }, { status: 401 });
    }
    
    const user = await prisma.user.findUnique({
      where: { email: username },
    });
    
    if (user) {
      return NextResponse.json({ message: 'User already registered. login' }, { status: 404 });
    }
    
    const userid = uuidv4();
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
    
      const token = encode_jwt(process.env.NEXT_PUBLIC_JWT_SECRET, userid, { username, role });
    
      await prisma.user.create({
        data: { id: userid, email: username, password: hashedPassword, role },
      });
      return NextResponse.json({ token },{status:200});
    } catch (error) {
      return NextResponse.json({ message: 'Error while generating token' }, { status: 500 });
    }
}
