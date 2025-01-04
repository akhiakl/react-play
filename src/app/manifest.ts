import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ReactPlay',
    short_name: 'ReactPlay',
    start_url: '.',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#000',
    icons: [
      {
        src: 'favicon.ico',
        sizes: '64x64 32x32 24x24 16x16',
        type: 'image/x-icon'
      },
      {
        src: 'icon.png',
        type: 'image/png',
        sizes: '64x64 32x32 24x24 16x16 512x512 192x192'
      },
      {
        src: 'maskable_icon.png',
        sizes: '64x64 32x32 24x24 16x16 512x512 192x192',
        type: 'image/png',
        purpose: 'maskable'
      }
    ]
  };
}
