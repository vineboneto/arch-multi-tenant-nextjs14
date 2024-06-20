import { Header } from "@/components/header";
import { Container } from "@/components/dashboard/container";
import { FormProduto } from "@/components/produto/form";

export default function NovoProdutoPage() {
  return (
    <Container>
      <Header.Container>
        <Header.Title>Cadastro de Produto</Header.Title>
      </Header.Container>

      <FormProduto />
    </Container>
  );
}
