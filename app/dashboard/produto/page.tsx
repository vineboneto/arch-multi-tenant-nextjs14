import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Header } from "@/components/header";
import { Container } from "@/components/dashboard/container";
import { CircleX, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { loadProducts } from "@/lib/actions";

export default async function ProdutoPage() {
  const products = await loadProducts();

  return (
    <Container>
      <Header.Container>
        <Header.Title>Cadastro de Produto</Header.Title>
        <div className="flex flex-1 justify-end space-x-2">
          <div>
            <Button size="sm" asChild className="btn-ok">
              <Link href="/dashboard/produto/novo">Novo</Link>
            </Button>
          </div>
          <div>
            <Button size="sm" className="btn-info">
              Filtros
            </Button>
          </div>
        </div>
      </Header.Container>
      <div className="mt-2">
        <Table>
          <TableCaption>Lista de todos os produtos.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Ação</TableHead>
              <TableHead>Código</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Data Criação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.code}>
                <TableCell className="w-[100px]">
                  <div className="flex space-x-2">
                    <button title="Editar">
                      <Pencil className="w-4 h-4 text-stone-500" />
                    </button>
                    <button title="Excluir">
                      <CircleX className="w-4 h-4 text-red-900" />
                    </button>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.code}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  {new Date(product.created_at).toLocaleString("pt-BR", {
                    dateStyle: "short",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Container>
  );
}
