"use client";
import { ChangeEvent, useRef, useState } from "react";

export function useSearch() {
  const query = useRef("");
  const [inputValue, setInputValue] = useState("");

  const searchSN = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    query.current = val;
    setInputValue(val);
  };

  return { query, searchSN, inputValue };
}
