"use client";

import { useSearch } from "@/hooks/useSearch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download } from "lucide-react";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type DataType = {
  serialnumber: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export default function SearchUI({ data }: { data: DataType[] }) {
  const { query, searchSN, inputValue } = useSearch();
  const [filtered, setFiltered] = useState<DataType[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const q = query.current.trim().toLowerCase();

    if (!q) {
      setFiltered([]);
      setHasSearched(false);
      return;
    }

    const result = data.filter((item) =>
      item.serialnumber.toLowerCase().includes(q)
    );

    setFiltered(result);
    setHasSearched(true);
  };

  // Reset ke state awal kalau input dihapus
  useEffect(() => {
    if (inputValue.trim() === "") {
      setFiltered([]);
      setHasSearched(false);
    }
  }, [inputValue]);

  return (
    <>
      <header className="w-full mx-auto">
        <form
          onSubmit={submitSearch}
          className="flex justify-between items-center gap-2"
        >
          <Input
            placeholder="Search Serial Number"
            className="w-full max-w-full"
            onChange={searchSN}
            value={inputValue}
          />
          <Button
            size="icon-lg"
            variant="outline"
            type="submit"
            disabled={!inputValue.trim()}
          >
            <Search />
          </Button>
        </form>
      </header>

      <Separator className="mt-3" />

      <section className="mt-4">
        {/* Belum search */}
        {!hasSearched && filtered.length === 0 && (
          <div className="w-full text-center mt-10 text-muted-foreground">
            <p>Please enter the serial number to search for data.</p>
          </div>
        )}

        {/* Sudah search tapi tidak ada hasil */}
        {hasSearched && filtered.length === 0 && (
          <div className="min-h-[50vh] flex justify-center items-center">
            <p className="text-2xl font-semibold text-center">
              No unit currently in testing / completed.
            </p>
          </div>
        )}

        {/* Sudah search dan ada hasil */}
        {hasSearched && filtered.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Serial Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>File Report</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {item.serialnumber}
                  </TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>
                    <Button size="icon" variant="ghost">
                      <Download />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </section>
    </>
  );
}
