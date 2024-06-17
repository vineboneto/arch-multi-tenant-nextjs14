"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

type ItemBreadcrump = {
  href: string;
  label: string;
};

export function BreadcrumbContainer() {
  const path = usePathname();

  const itemsUrl = (path.split("/") || []).filter(Boolean);

  const items = itemsUrl.reduce((acc, item, idx) => {
    acc.push({
      href: `/${itemsUrl.slice(0, idx + 1).join("/")}`,
      label: item,
    });
    return acc;
  }, [] as ItemBreadcrump[]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, idx, self) => (
          <Fragment key={item.href}>
            <BreadcrumbItem>
              <Link className="capitalize" href={item.href}>
                {item.label}
              </Link>
            </BreadcrumbItem>
            {idx !== self.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
