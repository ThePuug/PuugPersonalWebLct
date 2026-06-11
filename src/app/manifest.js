export const dynamic = 'force-static'

export default function manifest() {
  return {
    name: 'Liars, Cheats, and Thieves',
    short_name: 'Liars, Cheats, and Thieves',
    start_url: '/',
    display: 'standalone',
    icons: [
      {
        src: '/icon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}
