import { GetData } from "@/service/get-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import dayjs from "dayjs";

type DataType = {
  serialnumber: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export default async function AdminDashboardPage() {
  const data = await GetData();

  if (data.length === 0) {
    return (
      <>
        <div className="min-h-screen w-full mx-auto flex justify-center items-center">
          <p className="text-2xl font-semibold">
            No unit currently in testing / completed.
          </p>
        </div>
      </>
    );
  }
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Serial Number</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>File Report</TableHead>
            <TableHead>Inputed At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item: DataType, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.serialnumber}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>-</TableCell>
              <TableCell>
                {dayjs(item.created_at).format("YYYY-MM-DD HH:mm:ss")}
              </TableCell>
              <TableCell>
                {dayjs(item.updated_at).format("YYYY-MM-DD HH:mm:ss")}
              </TableCell>
              <TableCell>
                <Button size={"icon"} variant={"ghost"}>
                  <Download />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
