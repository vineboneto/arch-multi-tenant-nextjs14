import { Header } from "@/components/header";
import { Container } from "../../_components/container";
import { FormProduto } from "./_components/form";

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
