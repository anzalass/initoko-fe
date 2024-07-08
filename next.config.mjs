/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "flowbite.com",
      "ecs7.tokopedia.net",
      "encrypted-tbn0.gstatic.com",
      "s1.bukalapak.com",
      "images.tokopedia.net",
      "ik.imagekit.io",
      "lh3.googleusercontent.com",
    ],
  },
};

export default nextConfig;
