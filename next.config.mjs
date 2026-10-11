/** @type {import('next').NextConfig} */
const nextConfig = {
  // Site statique : des fichiers servis tels quels par nginx, sans processus
  // Node à faire tourner sur le serveur.
  output: 'export',
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
}

export default nextConfig
