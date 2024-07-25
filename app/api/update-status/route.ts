import { PrismaClient } from "@prisma/client";
import { date } from "zod";
export async function POST() {
    const prisma = new PrismaClient();
    try {
        const updatedStatus = await prisma.appointment.update({
            where:{
                patient:"raamka", 
                hospital:"",
                doctor:""
            },
            data{
                date:
                time:
                status:
            }
        })
    } 
}
