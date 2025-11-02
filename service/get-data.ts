import { baseUrl } from "@/lib/url";

export async function GetData() {
  const response = await fetch(`${baseUrl}/api/`, {
    cache: "no-store",
    method: "GET",
  });
  const body = await response.json();
  return body.data;
}
