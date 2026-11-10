import { getArticles } from '../lib/articles';
import { atomResponse, buildAtomFeed } from '../lib/atom';

// The old site never emitted this entry because its YAML was invalid. Keep the
// published feed stable while the article page itself uses the fixed metadata.
const LEGACY_EXCLUDED_IDS = new Set(['seeds/20260502-know-@liulifox233']);

export async function GET() {
  const entries = (await getArticles()).filter(
    (entry) => !LEGACY_EXCLUDED_IDS.has(entry.id),
  );
  return atomResponse(buildAtomFeed(entries));
}
