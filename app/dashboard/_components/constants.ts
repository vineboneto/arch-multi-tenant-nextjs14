import {
  Barcode,
  FileText,
  LayoutDashboard,
  type LucideProps,
} from "lucide-react";

export type StackItem = {
  label: string;
  href?: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  items?: StackItem[];
};

export const SIDEBAR: StackItem[] = [
  {
    label: "Cadastros",
    icon: LayoutDashboard,
    items: [
      {
        label: "Produto",
        icon: Barcode,
        href: "/dashboard/produto",
      },
    ],
  },
  {
    label: "Relatórios",
    icon: FileText,
    items: [
      {
        label: "Produto",
        href: "/produto",
        icon: Barcode,
      },
    ],
  },
];
