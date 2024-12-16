import Landing from "./components/landing/landing";

export default function Home() {
  return (
    <div className="grid grid-rows-[1fr] w-full items-center justify-items-center min-h-screen pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col w-full gap-8 row-start-2 items-center sm:items-start">
        <Landing />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
