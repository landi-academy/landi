import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Создаем новый объект URL из строки req.url
  const url = new URL(req.url, `http://${req.headers.get('host')}`);
  const session_id = url.searchParams.get('session_id');
  
  if (session_id) {
    // Перенаправляем пользователя на динамический URL курса
    const courseUrl = `/kurs/${session_id}`;
    return NextResponse.redirect(courseUrl);
  } else {
    return new NextResponse('Session ID not provided', { status: 400 });
  }
}