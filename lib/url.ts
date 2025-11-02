export const baseUrl =
  `${process.env.NEXT_PUBLIC_BASE_URL}` ||
  `https://${process.env.VERCEL_URL || "localhost:3000"}`;
