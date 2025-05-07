import path from 'path';
import fs from 'fs';
import { load } from 'cheerio';
import moment from 'moment';
import { PrismaClient } from '@prisma/client';
import iconv from 'iconv-lite';

const prisma = new PrismaClient();

function parseNumber(value?: string): number {
  if (!value) return 0;
  return parseInt(value.replace(/,/g, '').replace(/원/g, '').trim(), 10);
}

function parseBigInt(value?: string): bigint {
  if (!value) return BigInt(0);
  const cleaned = value.replace(/[^0-9]/g, ''); 
  return cleaned ? BigInt(cleaned) : BigInt(0);
}

interface LottoRow {
  year: number;
  round: number;
  drawDate: Date;
  firstWinners: number;
  firstPrize: bigint;
  secondWinners: number;
  secondPrize: bigint;
  thirdWinners: number;
  thirdPrize: bigint;
  fourthWinners: number;
  fourthPrize: bigint;
  fifthWinners: number;
  fifthPrize: bigint;
  number1: number;
  number2: number;
  number3: number;
  number4: number;
  number5: number;
  number6: number;
  bonusNumber: number;
}

async function run() {
  const filePath = path.join(__dirname, '../data/excel.xls');

  const rawBuffer = fs.readFileSync(filePath);
  const html = iconv.decode(rawBuffer, 'utf8');

  const $ = load(html);
  const tables = $('table');

  console.log(`총 테이블 수: ${tables.length}`);

  let data: LottoRow[] = [];
  let currentYear = 0;

  tables.each((tableIndex, table) => {
    const rows = $(table).find('tr');
  
    rows.each((rowIdx, tr) => {
      const cells: string[] = [];
  
      $(tr).find('td').each((_, td) => {
        const text = $(td).text().trim();
        if (text !== '') cells.push(text);
      });
  
      // 파싱 조건 수정
      if (cells.length === 20 || cells.length === 19) {
        let offset = 0;
  
        if (cells.length === 20) {
          currentYear = parseNumber(cells[0]);
          offset = 1;
        }
  
        if (currentYear === 0) return;
  
        const row = {
          year: currentYear,
          round: parseNumber(cells[0 + offset]),
          drawDate: moment(cells[1 + offset], 'YYYY.MM.DD').toDate(),
          firstWinners: parseNumber(cells[2 + offset]),
          firstPrize: parseBigInt(cells[3 + offset]),
          secondWinners: parseNumber(cells[4 + offset]),
          secondPrize: parseBigInt(cells[5 + offset]),
          thirdWinners: parseNumber(cells[6 + offset]),
          thirdPrize: parseBigInt(cells[7 + offset]),
          fourthWinners: parseNumber(cells[8 + offset]),
          fourthPrize: parseBigInt(cells[9 + offset]),
          fifthWinners: parseNumber(cells[10 + offset]),
          fifthPrize: parseBigInt(cells[11 + offset]),
          number1: parseNumber(cells[12 + offset]),
          number2: parseNumber(cells[13 + offset]),
          number3: parseNumber(cells[14 + offset]),
          number4: parseNumber(cells[15 + offset]),
          number5: parseNumber(cells[16 + offset]),
          number6: parseNumber(cells[17 + offset]),
          bonusNumber: parseNumber(cells[18 + offset]),
        };
  
        data.push(row);
      }
    });
  });

  console.log(`최종 파싱된 데이터: ${data.length}건`);

  data.sort((a, b) => a.round - b.round);

  const BATCH_SIZE = 500;

  try {
    for (let i = 0; i < data.length; i += BATCH_SIZE) {
      const batch = data.slice(i, i + BATCH_SIZE);
      await prisma.lottoResult.createMany({
        data: batch,
        skipDuplicates: true,
      });
      console.log(` ${i + 1} ~ ${i + batch.length}건 삽입 완료`);
    }

    console.log('모든 로또 데이터 삽입 완료');
  } catch (error) {
    console.error('삽입 중 오류 발생:', error);
  } finally {
    await prisma.$disconnect();
  }
}

run();
