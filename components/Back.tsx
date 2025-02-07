"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BackProps {
  href: string;
}

export function Back({ href }: BackProps) {
  return (
    <Link href={href}>
      <Button variant="ghost" size="sm" className="gap-2">
        <ChevronLeft className="h-4 w-4" />
        Back
      </Button>
    </Link>
  );
}
