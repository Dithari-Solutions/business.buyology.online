import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap { return [ { url: "https://business.buyology.online/", changeFrequency: "monthly", priority: 1 }, { url: "https://business.buyology.online/become-partner/", changeFrequency: "monthly", priority: 0.9 } ]; }
