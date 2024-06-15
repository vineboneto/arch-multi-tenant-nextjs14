export function Title({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
      {children}
    </h1>
  );
}
