"use client";
import { ChangeEvent, useState } from "react";

export function useBurn() {
  const [serialnumber, setSerialNumber] = useState("");

  const changesn = (e: ChangeEvent<HTMLInputElement>) => {
    setSerialNumber(e.target.value);
  };

  return { serialnumber, changesn };
}
