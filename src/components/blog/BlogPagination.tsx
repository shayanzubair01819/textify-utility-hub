
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function BlogPagination() {
  return (
    <div className="flex items-center justify-between mt-8">
      <Button variant="outline" className="flex items-center gap-2">
        <ChevronLeft className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        <Button variant="secondary" size="sm">1</Button>
        <Button variant="outline" size="sm">2</Button>
        <Button variant="outline" size="sm">3</Button>
        <span className="px-2">...</span>
        <Button variant="outline" size="sm">10</Button>
      </div>
      <Button variant="outline" className="flex items-center gap-2">
        Next <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
