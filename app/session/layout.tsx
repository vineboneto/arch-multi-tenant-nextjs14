export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="md:h-screen flex items-center justify-center">
      <div className="md:max-w-lg w-full space-y-6">{children}</div>
    </main>
  );
}
