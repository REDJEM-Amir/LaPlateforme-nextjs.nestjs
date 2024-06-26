import { getSession } from '@auth0/nextjs-auth0';
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
    const session = await getSession();
    const token = session?.idToken;
    if (!token) {
        return NextResponse.json({ error: 'Access token not found' }, { status: 401 });
    }
    const response = await axios.get(`http://motus-backend:5556/api/stats/findStats`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return new NextResponse(JSON.stringify(response.data), {
        status: response.status,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}