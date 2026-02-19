import {NextResponse} from 'next/server';
import {getSkiRecommendations} from '@/services/searchEngine';

export async function POST(request: Request) {

    const {answers, colors, brands} = await request.json();

    try {
        const recommendations = await getSkiRecommendations(answers, colors, brands);
        return NextResponse.json(recommendations);
    } catch (error) {
        console.error('Failed to get recommendations', error);
        return NextResponse.json({error: 'could not get recommendations'}, {status: 500});
    }

}