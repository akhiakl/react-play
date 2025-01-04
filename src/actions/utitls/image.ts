import { IMAGE_EXTENSIONS } from '@/shared/utils/utilsConstants';
import fs from 'fs';
import path from 'path';

/**
 * Attempts to load the cover image for a play by checking multiple image formats.
 * Falls back to a default image if none of the formats are available.
 *
 */
export async function resolveImageData(playSlug: string): Promise<{ slug: string; image: string }> {
  // Path to the directory where images are stored
  const baseDir = path.resolve(process.cwd(), 'src/plays', playSlug);

  // Iterate over possible extensions to find the file
  for (const extension of IMAGE_EXTENSIONS) {
    const filePath = path.join(baseDir, `cover.${extension}`);
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath);
      const mimeType = `image/${extension}`;

      return {
        slug: playSlug,
        image: decodeURIComponent(`data:${mimeType};base64,${fileData.toString('base64')}`)
      };
    }
  }

  // Fallback to default image in the public folder
  return {
    slug: playSlug,
    image: '/images/play-fallback-cover.png'
  };
}
