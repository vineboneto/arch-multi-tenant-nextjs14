function Container({ children }: { children: React.ReactNode }) {
  return <header className="h-[5rem] py-2 w-full flex">{children}</header>;
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="scroll-m-20 border-b w-full pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  );
}

export const Header = {
  Container,
  Title,
};
