import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json(
      { 
        message: "Hello from the API",
        status: 200 
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { 
        error: "Internal Server Error",
        status: 500 
      },
      { status: 500 }
    );
  }
}

