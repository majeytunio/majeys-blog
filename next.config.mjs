/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['tachsol.world'], // Only allow image optimization from this domain
        unoptimized: true // Disables optimization
    },
};

export default nextConfig;
