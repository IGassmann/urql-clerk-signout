import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

// Proxy to protect the API with authentication
export async function POST(request: Request) {
  const {userId} = auth();

  if(!userId){
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await request.json();

  const response = await fetch('https://swapi-graphql.netlify.app/.netlify/functions/index\n', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = await response.json()

  return NextResponse.json(data)
}
