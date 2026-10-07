const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://krs-zeta.vercel.app";

export const productionHosts = new Set(["krs.gr", "www.krs.gr"]);

export function hostnameFromHost(host: string | null) {
  return host?.split(":")[0]?.toLowerCase() ?? "";
}

export function isIndexableHost(host: string | null) {
  return productionHosts.has(hostnameFromHost(host));
}

export function originFromHost(host: string | null) {
  const hostname = hostnameFromHost(host);

  if (!hostname) return configuredSiteUrl;
  if (hostname === "localhost" || hostname.startsWith("127.")) return `http://${host}`;

  return `https://${hostname}`;
}

export { configuredSiteUrl };
