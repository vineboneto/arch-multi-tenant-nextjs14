export function InputError({ children }: { children: React.ReactNode }) {
  return (
    <p aria-live="polite" className="text-sm text-stone-500 pt-1">
      {children}
    </p>
  );
}
