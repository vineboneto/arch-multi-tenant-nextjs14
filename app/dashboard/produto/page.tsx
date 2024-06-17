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
import { Container } from "../_components/container";
import { CircleX, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const products = [
  {
    codigo: "101",
    nome: "Teste",
  },
];

export default function ProdutoPage() {
  return (
    <Container>
      <Header.Container>
        <Header.Title>Cadastro de Produto</Header.Title>
        <div className="flex flex-1 justify-end space-x-2">
          <div>
            <Button
              size="sm"
              asChild
              className="bg-green-900 text-white hover:bg-green-800"
            >
              <Link href="/dashboard/produto/novo">Novo</Link>
            </Button>
          </div>
          <div>
            <Button
              size="sm"
              className="bg-blue-900 text-white hover:bg-blue-800"
            >
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.codigo}>
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
                <TableCell className="font-medium">{product.codigo}</TableCell>
                <TableCell>{product.nome}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Container>
  );
}
