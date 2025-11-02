import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ChangeEvent } from "react";

type Params = {
  serialnumber: string;
  title: string;
  changesn: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function InputSN({ serialnumber, title, changesn }: Params) {
  return (
    <section className="w-11/12 mx-auto h-screen flex justify-center items-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>{title} Burn-in Test</CardTitle>
          <CardDescription>
            Please enter the serial number of the unit.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            id="serialNumber"
            placeholder="Enter serial number"
            required
            onChange={changesn}
            value={serialnumber}
          />
        </CardContent>
        <CardFooter>
          <Button type="submit">Submit</Button>
        </CardFooter>
      </Card>
    </section>
  );
}
