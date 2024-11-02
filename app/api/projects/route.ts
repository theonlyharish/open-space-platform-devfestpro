import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        users: {
          include: {
            user: true,
          },
        },
        pendingUsers: true,
        projectImages: true,
      },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}