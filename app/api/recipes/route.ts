import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { buildBackendCookieHeader, logErrorResponse } from '../_utils/utils';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();

    const contentType = request.headers.get('content-type') || '';
    const headers: Record<string, string> = {
      Cookie: buildBackendCookieHeader(cookieStore),
    };

    let body: FormData | unknown;

    if (contentType.includes('multipart/form-data')) {
      const incomingFormData = await request.formData();
      const forwardedFormData = new FormData();

      for (const [key, value] of incomingFormData.entries()) {
        forwardedFormData.append(key, value);
      }

      body = forwardedFormData;
    } else {
      body = await request.json();
      headers['Content-Type'] = 'application/json';
    }

    const res = await api.post('/api/recipes', body, { headers });

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
