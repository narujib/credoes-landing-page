import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function RootNotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Minimal Branded Header */}
      <header className="sticky top-0 z-40 w-full border-b border-primary/20 bg-primary text-primary-foreground shadow-sm">
        <div className="container mx-auto flex h-20 max-w-7xl items-center px-4 md:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 py-1"
            aria-label="CREdoes Home"
          >
            <Image
              src="/images/logo-full.svg"
              alt="Logo CREdoes"
              width={220}
              height={64}
              className="h-11 md:h-13 w-auto object-contain"
              priority
            />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative flex-1 flex flex-col items-center justify-center min-h-[60vh] py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Decorative Radial Glow */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl dark:bg-primary/15" />
        </div>

        <div className="relative z-10 max-w-xl mx-auto text-center space-y-6 animate-fade-in-up">
          {/* 404 Display */}
          <div className="relative select-none py-1">
            <span className="font-heading font-black text-8xl sm:text-9xl tracking-widest text-foreground/15 dark:text-white/10">
              404
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold tracking-tight text-foreground -mt-6">
            Halaman Tidak{" "}
            <span className="text-[#0e7452] dark:text-[#20b284]">
              Ditemukan
            </span>
          </h1>

          {/* Action */}
          <div className="flex items-center justify-center pt-4">
            <Link
              href="/"
              className={cn(
                buttonVariants({ size: "lg" }),
                "text-xl px-8 h-12 shadow-xs cursor-pointer transition-colors duration-200 hover:bg-primary/90 gap-2",
              )}
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Kembali ke Beranda</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-border/80 bg-muted/40 py-6 text-center text-sm text-muted-foreground">
        <p className="font-medium">
          &copy; {new Date().getFullYear()} CREdoes. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
