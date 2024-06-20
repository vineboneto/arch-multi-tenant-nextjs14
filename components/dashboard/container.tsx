import { BreadcrumbContainer } from "./breadcumps";

export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen p-6">
      <BreadcrumbContainer />
      <div>{children}</div>
    </div>
  );
}
