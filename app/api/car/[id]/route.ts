import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
  // Extract ID from URL path
  const id = parseInt(request.nextUrl.pathname.split('/').pop() || '', 10);
  
  // Check if ID is valid
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  // Parse JSON body
  const { carname, manufacturingdate, price, image } = await request.json();

  try {
    // Update the car record
    const updatedCar = await prisma.cars.update({
      where: { id },
      data: { carname, manufacturingdate, price, image },
    });

    // Return the updated car record
    return NextResponse.json({ car: updatedCar });
  } catch (error) {
    console.error('Error updating car:', error);
    return NextResponse.json({ error: 'Error updating car' }, { status: 500 });
  }
}


export async function GET(request: NextRequest) {
    const id = parseInt(request.nextUrl.pathname.split('/').pop() || '');

  try {
    const course = await prisma.cars.findUnique({
      where: { id: Number(id) },
    });
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }
    return NextResponse.json({ course });
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json({ error: 'Error fetching course' }, { status: 500 });
  }
}
