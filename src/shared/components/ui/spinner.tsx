import { cn } from "cn";

import type React from "react";

import { LoaderIcon } from "@/shared/components/icons/interface-icon";
import { Icon } from "@/shared/components/ui/icon";

type SpinnerProps = Omit<React.ComponentProps<typeof Icon>, "icon">;

export function Spinner({ className }: SpinnerProps): React.ReactElement {
  return (
    <Icon
      icon={LoaderIcon}
      aria-label="Loading"
      className={cn("animate-spin", className)}
      role="status"
    />
  );
}
