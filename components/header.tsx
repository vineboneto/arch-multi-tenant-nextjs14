export function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className="h-[5rem] py-2">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        {children}
      </h2>
    </header>
  );
}
