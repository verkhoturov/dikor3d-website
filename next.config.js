if (!process.env.WORDPRESS_URL) {
  throw new Error(`
    Please provide a valid WordPress instance URL.
    Add to your environment variables WORDPRESS_URL.
  `)
}

/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: [
      process.env.WORDPRESS_URL.split("//")[1],
    ],
  },
  i18n: {
    locales: ['en', 'ru', 'ro'],
    defaultLocale: 'ro',
  },
}
