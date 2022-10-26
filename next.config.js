if (!process.env.WORDPRESS_REST_API_URL) {
  throw new Error(`
    Please provide a valid WordPress instance URL.
    Add to your environment variables WORDPRESS_REST_API_URL.
  `)
}

/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: [
      '1065519-cp39830.tmweb.ru',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '1065519-cp39830.tmweb.ru',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
}
