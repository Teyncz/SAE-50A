import {NextResponse} from 'next/server';
import {getSkiRecommendations} from '@/services/searchEngine';

export async function POST(request: Request) {

    const {answers} = await request.json();

    try {
        const recommendations = await getSkiRecommendations(answers);
        return NextResponse.json(recommendations);
    } catch (error) {
        console.error('Failed to get recommendations', error);
        return NextResponse.json({error: 'could not get recommendations'}, {status: 500});
    }

}