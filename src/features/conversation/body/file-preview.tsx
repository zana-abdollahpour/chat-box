import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";

interface FilePreviewProps {
  url: string;
}

export default function FilePreview({ url }: FilePreviewProps) {
  return (
    <Link href={url} target="_blank">
      <Button variant="secondary">
        <ExternalLink className="mr-2 h-4 w-4" />
        <span>&nbsp;Open File</span>
      </Button>
    </Link>
  );
}
