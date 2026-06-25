import { NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { buildBackendCookieHeader, logErrorResponse } from '../../_utils/utils';
import { isAxiosError } from 'axios';

export async function GET() {
  try {
    const cookieStore = await cookies();

    console.log('USER ROUTE COOKIES', cookieStore.getAll());
    console.log('USER ROUTE STRING', cookieStore.toString());

    const res = await api.get('/api/recipes/user', {
      headers: {
        Cookie: buildBackendCookieHeader(cookieStore),
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
