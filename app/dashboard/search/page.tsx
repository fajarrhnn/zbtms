import { GetData } from "@/service/get-data";
import SearchUI from "./list-search";

export default async function SearchUnitPage() {
  const data = await GetData();

  return (
    <>
      <SearchUI data={data} />
    </>
  );
}
