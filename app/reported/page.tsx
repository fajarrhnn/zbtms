"use client";
import { useBurn } from "@/hooks/useBurn";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import InputSN from "@/components/template/input-sn";
import { baseUrl } from "@/lib/url";

export default function ReportBurnPage() {
  const { serialnumber, changesn } = useBurn();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`${baseUrl}/api`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serialnumber }),
    });

    const body = await response.json();

    if (response.ok) {
      toast.success(body.message);
      router.refresh();
    } else {
      toast.error(body.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputSN title="Start" serialnumber={serialnumber} changesn={changesn} />
    </form>
  );
}
