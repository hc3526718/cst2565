import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  turbopack: {
    /** Pin workspace root when multiple lockfiles exist (e.g. user home + project). */
    root: process.cwd(),
  },
}

export default nextConfig
