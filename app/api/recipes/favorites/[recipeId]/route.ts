import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../../api';
import { cookies } from 'next/headers';
import { logErrorResponse } from '../../../_utils/utils';
import { isAxiosError } from 'axios';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ recipeId: string }> }
) {
  try {
    const { recipeId } = await params;
    const cookieStore = await cookies();

    const res = await api.post(
      `api/recipes/favorites/${recipeId}`,
      {},
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      }
    );

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ recipeId: string }> }
) {
  try {
    const { recipeId } = await params;
    const cookieStore = await cookies();

    const res = await api.delete(`api/recipes/favorites/${recipeId}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
