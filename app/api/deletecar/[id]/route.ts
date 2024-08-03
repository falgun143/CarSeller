import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(request: NextRequest) {
  const id = parseInt(request.nextUrl.pathname.split("/").pop() || "", 10);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
        await prisma.cars.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Car Deleted successfully" });
  } catch (error) {
    console.error("Error updating car:", error);
    return NextResponse.json({ error: "Error Deleting the car" }, { status: 500 });
  }
}
