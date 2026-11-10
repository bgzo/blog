import { getArticles } from '../lib/articles';
import { atomResponse, buildAtomFeed } from '../lib/atom';

export async function GET() {
  const entries = (await getArticles()).filter((entry) =>
    ['labs', 'thoughts', 'stories'].includes(entry.section),
  );
  return atomResponse(buildAtomFeed(entries));
}
