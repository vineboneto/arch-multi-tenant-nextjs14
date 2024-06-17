"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { StackItem } from "./constants";
import { SIDEBAR } from "./constants";

type NavLinkProps = {
  item: Required<Omit<StackItem, "items">>;
};

type AddStackFn = (stack: MenuStackData) => void;

type NavRootProps = {
  item: StackItem;
  addStack: AddStackFn;
};

type NavParentProps = {
  item: Required<Omit<StackItem, "href" | "items">>;
  renderChildren: () => MenuStackData;
  addStack: AddStackFn;
};

function NavRoot({ item: { items, href, ...rest }, addStack }: NavRootProps) {
  const isMenu = items;

  if (isMenu) {
    return (
      <NavParent
        item={rest}
        addStack={addStack}
        renderChildren={() => ({
          lastMenu: rest.label,
          nested: items.map((e) => (
            <NavRoot key={e.label} item={e} addStack={addStack} />
          )),
        })}
      />
    );
  }

  if (!href) return <></>;

  return <NavLink item={{ ...rest, href }} />;
}

function NavParent({
  item: { icon: Icon, label },
  addStack,
  renderChildren,
}: NavParentProps) {
  return (
    <li
      className="flex hover:bg-stone-800 space-x-2 w-full items-center py-1.5 rounded-lg px-2 cursor-pointer"
      onClick={() => addStack(renderChildren())}
    >
      <Icon className="h-5 w-5" />
      <span className="text-sm">{label}</span>
    </li>
  );
}

function NavLink({ item: { href, icon: Icon, label } }: NavLinkProps) {
  return (
    <li className="flex hover:bg-stone-800 space-x-2 items-center py-1.5 rounded-lg px-2">
      <Icon className="h-5 w-5" />
      <Link href={href} className="text-sm">
        {label}
      </Link>
    </li>
  );
}

type MenuStackData = {
  nested: React.ReactNode;
  lastMenu: string;
};

export function Nav() {
  const [menuStack, setMenuStack] = useState<MenuStackData[]>([]);

  const NestedSidebar = menuStack[menuStack.length - 1];

  const hasNestedSidebar = menuStack.length > 0;

  function handleGoBack() {
    setMenuStack((old) => {
      return old.slice(0, old.length - 1);
    });
  }

  function handleAddStack(stack: MenuStackData) {
    setMenuStack((old) => [...old, stack]);
  }

  return (
    <nav className="px-3">
      <ul>
        {hasNestedSidebar ? (
          <>
            <button
              className="flex hover:bg-stone-800 space-x-2 py-1.5 rounded-lg px-2 w-full items-center"
              onClick={handleGoBack}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="ml-2 text-sm truncate max-w-full">
                Voltar para {NestedSidebar.lastMenu}
              </span>
            </button>

            {NestedSidebar.nested}
          </>
        ) : (
          SIDEBAR.map((item) => (
            <NavRoot key={item.label} item={item} addStack={handleAddStack} />
          ))
        )}
      </ul>
    </nav>
  );
}
