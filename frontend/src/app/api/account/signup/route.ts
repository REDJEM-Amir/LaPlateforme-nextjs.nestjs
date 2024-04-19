import { getSession } from '@auth0/nextjs-auth0';
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const session = await getSession();
    const token = session?.idToken;
    if (!token) {
        return NextResponse.json({ error: 'Access token not found' }, { status: 401 });
    }
    const body = await request.json();
    const response = await axios.post(`http://localhost:3334/api/account/signup`, body, {
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