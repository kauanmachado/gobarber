import { Container, Row, Col, Form } from "react-bootstrap";
import { useState } from "react";
import useEstados from "../hooks/useEstados";
import useCidades from "../hooks/useCidades";

const SelectCidadeEstado = () => {
  const { estados } = useEstados();
  const [selectedEstado, setSelectedEstado] = useState("");
  const { cidades } = useCidades({ uf: selectedEstado });

  const handleEstadoUpdate = (event) => {
    setSelectedEstado(event.target.value);
  };

  const select = {
    fontSize: "14px"
  };

  return (
    <>
      <Container className="mt-3">
        <Row className="d-flex justify-content-center">
          <Col md={6}>
            <Form.Label>Estado</Form.Label>
            <Form.Select
              id="estado"
              name="estado"
              style={select}
              value={selectedEstado}
              onChange={handleEstadoUpdate}
              className="shadow"
            >
              {estados.map((estado) => (
                <option key={estado.id} value={estado.sigla}>
                  {estado.nome}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col md={6}>
            <Form.Label>Cidade</Form.Label>
            <Form.Select
            id="cidade"
              name="cidade"
              style={select}
              className="shadow"
              placeholder="Selecione uma cidade"
            >
              {cidades.map((cidade) => (
                <option key={cidade.codigo_ibge}>{cidade.nome}</option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SelectCidadeEstado;
