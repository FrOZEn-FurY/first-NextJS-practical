/** @type {import('next').NextConfig} */
import * as config from './next-i18next.config.js';

const nextConfig = {
    images: {
        remotePatterns: [
            {hostname: 'localhost'},
            {hostname: 'picsum.photos'}
        ], // Every domain that images want to be imported must be added here.
    },
    i18n: config.i18n,
};

export default nextConfig;
