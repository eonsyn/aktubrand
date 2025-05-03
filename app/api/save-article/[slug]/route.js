import connectDB from '@/utils/db';
import Article from '@/models/Article';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  try {
    await connectDB();
    const article = await Article.findOne({ slug: params.slug });
    if (!article) {
      return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, article });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
