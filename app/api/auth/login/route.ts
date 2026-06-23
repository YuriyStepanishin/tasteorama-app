import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';

export async function POST(req: NextRequest) {
  try {
    // console.log('req', req);
    // console.log('api1');

    const body = await req.json();

    const apiRes = await api.post('/auth/login', body);

    const cookieStore = await cookies();
    const setCookie = apiRes.headers['set-cookie'];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

      const skipKeys = new Set(['expires', 'max-age', 'path', 'httponly', 'secure', 'samesite', 'domain']);

      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);

        const maxAge = parsed['Max-Age'] ? Number(parsed['Max-Age']) : undefined;
        const options = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: parsed.Path || '/',
          ...(maxAge !== undefined && { maxAge }),
        };

        // Зберігаємо ВСІ куки від бекенду (PHPSESSID, accessToken, refreshToken тощо)
        for (const [key, value] of Object.entries(parsed)) {
          if (!skipKeys.has(key.toLowerCase()) && value) {
            console.log(`[LOGIN] saving cookie: ${key}=${String(value).slice(0, 20)}...`);
            cookieStore.set(key, String(value), options);
          }
        }
      }

      console.log('[LOGIN] cookieStore after set:', cookieStore.getAll());

      return NextResponse.json(apiRes.data, { status: apiRes.status });
    }

    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
