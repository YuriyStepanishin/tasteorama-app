import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const cookieStore = await cookies();
        const allCookies = cookieStore.getAll();
        const cookieHeader = cookieStore.toString();

        console.log('====== RECIPE POST DEBUG ======');
        console.log('Всі куки (масив):', allCookies);
        console.log('sessionId:', cookieStore.get('sessionId')?.value || '❌ ВІДСУТНЯ');
        console.log('accessToken:', cookieStore.get('accessToken')?.value?.slice(0, 20) + '...' || '❌ ВІДСУТНЯ');
        console.log('Cookie header що відправляємо на бекенд:', cookieHeader);
        const backendUrl = process.env.NODE_ENV === 'development' 
            ? 'http://localhost:4000' 
            : 'https://tasteorama-server.onrender.com';
        
        console.log('URL бекенду:', `${backendUrl}/api/recipes`);
        console.log('==============================');

        const res = await axios.post(`${backendUrl}/api/recipes`, body, {
            headers: {
                Cookie: cookieHeader,
                'Content-Type': 'application/json',
            },
        });

        return NextResponse.json(res.data, { status: res.status });
    } catch (error: any) {
        console.error('❌ ПОМИЛКА БЕКЕНДУ:', error.response?.data || error.message);

        return NextResponse.json(
            { error: error.message, response: error.response?.data },
            { status: error.response?.status || 500 }
        );
    }
}