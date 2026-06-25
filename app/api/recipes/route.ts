import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { buildBackendCookieHeader, logErrorResponse } from '../_utils/utils';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();

    const body = await request.json();

    const res = await api.post('/api/recipes', body, {
      headers: {
        Cookie: buildBackendCookieHeader(cookieStore),
        'Content-Type': 'application/json',
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status || 500 }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
