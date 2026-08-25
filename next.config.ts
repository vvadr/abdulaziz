import { networkInterfaces } from "node:os";
import type { NextConfig } from "next";

// Every local IPv4 this machine currently answers on. Without these, opening
// the dev server on anything other than http://localhost — 127.0.0.1, or the
// LAN address from a phone — makes Next block its own /_next/webpack-hmr
// socket, HMR dies, and the dev client falls back to full page reloads.
// Derived at startup because the LAN address changes with the network.
const localAddresses = Object.values(networkInterfaces())
  .flat()
  .filter((iface) => iface && iface.family === "IPv4")
  .map((iface) => iface!.address);

const nextConfig: NextConfig = {
  allowedDevOrigins: ["localhost", "127.0.0.1", ...localAddresses],
};

export default nextConfig;
