import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'unsplash.com', 
      'media.istockphoto.com', 
      'istockphoto.com', 
      'img.freepik.com' // Este é o domínio correto do Freepik para imagens
    ],
  },
};

export default nextConfig;
