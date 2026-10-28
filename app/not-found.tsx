import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="content" className="shell flex min-h-[70svh] flex-col justify-center py-24">
        <span id="top" />
        <p className="meta text-ink-soft">404</p>
        <h1 className="display-xl mt-4 max-w-[14ch]">Nothing to decode here.</h1>
        <p className="lede mt-8 text-ink-soft">
          This page doesn’t exist, or it moved. The work is all on the home page.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-solid">
            Back home
            <ArrowRight size={16} className="nudge-x" aria-hidden="true" />
          </Link>
          <Link href="/#projects" className="btn btn-line">
            See the work
          </Link>
        </div>
      </main>
      <Footer subpage />
    </>
  );
}
