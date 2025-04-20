"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterWrapper() {
  const pathname = usePathname();

  // Only render Footer on the home page
  if (pathname !== "/") {
    return null;
  }

  return <Footer />;
}