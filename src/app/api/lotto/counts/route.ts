import { NextRequest, NextResponse  } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse ) {

    const { searchParams } = new URL(req.url);
    const numbersParam = searchParams.get("numbers");
    console.log("numbersParam =", numbersParam);
  
    if (!numbersParam) {
      return NextResponse.json({ error: "numbers 쿼리가 없습니다." }, { status: 400 });
    }
  

    const numbers = numbersParam.split(",").map((n) => parseInt(n, 10));

    const allResults = await prisma.lottoResult.findMany();
    const countMap: Record<number, number> = {};
  
    // Initialize countMap with 0 for all numbers
    for (let num of numbers) {
      countMap[num] = 0;
    }
  
    // Count the occurrences of numbers in the results
    for (const result of allResults) {
      const values = [
        result.number1,
        result.number2,
        result.number3,
        result.number4,
        result.number5,
        result.number6,
        result.bonusNumber,
      ];
      for (const n of numbers) {
        countMap[n] += values.filter((v) => v === n).length;
      }
    }
  
    // Log the countMap to check the data
    console.log("countMap =", countMap);
  
    const resultArray = Object.entries(countMap).map(([number, count]) => ({
      number: parseInt(number),
      count,
    }));
  
    return NextResponse.json(resultArray);
  }