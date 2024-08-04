import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const cars = await prisma.cars.findMany();
    
    const response = NextResponse.json({ cars, message: "Fetched Cars Successfully" }, { status: 200 });
    
    // Setting the cache header to no store for dynamic data of cars.
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Expires', '0');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Surrogate-Control', 'no-store');

    return response;
  } catch (error) {
    console.error("Error fetching cars:", error); 
    return NextResponse.json({ message: 'Error while getting cars' }, { status: 500 });
  }
}
