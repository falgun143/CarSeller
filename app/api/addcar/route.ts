import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";


export async function POST(request: NextRequest) {
    const { carname, manufacturingDate, price,image,userId,} = await request.json();
    try{
         await prisma.cars.create({ 
           data:{
            carname,
            manufacturingyear:manufacturingDate,
            price,
            image,
            userId
           }
        });
       return NextResponse.json({message:"Added Car Successfully"},{status:200},)

    }
    catch(error){
        return NextResponse.json({ message: 'Error while adding car' }, { status: 500 });
    }
 
}
