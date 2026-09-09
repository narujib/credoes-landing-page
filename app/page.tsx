export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <div className="max-w-xl space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Next.js Starter
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 sm:text-lg">
          Projek telah dibersihkan dan siap untuk dibuat. Mulai buat komponen atau edit{" "}
          <code className="rounded bg-zinc-100 px-2 py-1 font-mono text-sm font-semibold text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
            app/page.tsx
          </code>
          .
        </p>
      </div>
    </main>
  );
}
