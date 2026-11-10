import type { Metadata } from "next";

import DesignSystemPage from "../../../apps/design-system/page";

export const metadata: Metadata = {
  title: "Design System | Component Library",
  description: "Interactive previews and implementation examples for the shared UI component library.",
};

export default function Page() {
  return <DesignSystemPage />;
}
