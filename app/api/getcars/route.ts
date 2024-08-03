import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const cars = await prisma.cars.findMany();
    return NextResponse.json(
      { cars, message: "Fetched Cars Successfully" },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store', 
        },
      }
    );
  } catch (error) {
    console.error("Error fetching cars:", error); 
    return NextResponse.json({ message: 'Error while getting cars' }, { status: 500 });
  }
}
