import { baseUrl } from "@/lib/url";

export async function GetData() {
  const response = await fetch(`${baseUrl}/api/`, {
    method: "GET",
  });
  const body = await response.json();
  return body.data;
}
