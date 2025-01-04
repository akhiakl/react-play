import FallbackImage from '@/images/play-fallback-cover.png';
import { IMAGE_EXTENSIONS } from './utilsConstants';

/**
 * Tries to dynamically import the image with the given extension for the specified play slug.
 *
 * @param {string} playSlug - The slug of the play.
 * @param {string} extension - The image extension (e.g., 'png', 'jpg').
 * @returns {Promise<string|null>} - A promise that resolves with the image URL or null if not found.
 */
const loadImageForExtension = async (
  playSlug: string,
  extension: string
): Promise<string | null> => {
  try {
    const importFragment = `plays/${playSlug}/cover.${extension}`;
    const imageModule = await import(importFragment);

    return imageModule?.default || null;
  } catch {
    return null;
  }
};

/**
 * Attempts to load the cover image for a play by checking multiple image formats.
 * Falls back to a default image if none of the formats are available.
 *
 * @param {string} playSlug - The slug of the play.
 * @returns {Promise<string>} - A promise that resolves to the cover image or the fallback image.
 */
export const loadCoverImage = async (playSlug: string): Promise<string> => {
  for (const extension of IMAGE_EXTENSIONS) {
    const image = await loadImageForExtension(playSlug, extension);
    if (image) {
      return image;
    }
  }

  return FallbackImage;
};
