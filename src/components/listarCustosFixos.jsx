import React, { Component } from "react";
import { Container, Row, Table, Button, Col} from 'react-bootstrap';
import CustosFixosServices from '../services/CustosFixosServices';

class listarCustosFixos extends Component{

    constructor (props){
        super(props);
        this.state = {
            custos_fixos: []
        }

        this.voltar = this.voltar.bind(this);
        this.excluir = this.excluir.bind(this);
        this.editar = this.editar.bind(this);
        this.novoCustoFixo = this.novoCustoFixo.bind(this);
        this.getCustosFixos();

    }

    componentDidMount(){
        this.getCustosFixos();
    }

    getCustosFixos(){
        CustosFixosServices.getCustoFixo().then((resposta) => {
            this.setState({custos_fixos: resposta.data});
            console.log(resposta.data);
        });
    }

    voltar(){
        this.props.history.push("/");
    }

    excluir(id_custo_fixo){
        CustosFixosServices.deleteCusto(id_custo_fixo).then(
            resposta => {
                alert(resposta.data);
                this.getCustosFixos();
            }
        )
    }

    editar(id_custo_fixo){
        this.props.history.push("/custofixo/"+id_custo_fixo);
    }

    novoCustoFixo(){
        this.props.history.push("/custofixo/_add");
    }

    render() {
        return (
            <Container>
                <Row className="float-left">
                    <Button variant="link" onClick={this.voltar}>voltar</Button>
                </Row>
                <Row>
                    <h1>Custos Fixos</h1>
                </Row>
                <Row>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>
                                    Valor
                                </th>
                                <th>
                                    Frequência
                                </th>
                                <th>
                                    Detalhamento
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.custos_fixos.map(
                                    custofixo =>
                                        <tr key = {custofixo.id_custo_fixo}>
                                            <td>
                                                {custofixo.valor_custo_fixo}
                                            </td>
                                            <td>
                                                {custofixo.frequencia_custo}
                                            </td>
                                            <td>
                                                {custofixo.detalhamento_custo_fixo}
                                            </td>
                                            <td>
                                                <Button variant="warning" onClick={()=>this.editar(custofixo.id_custo_fixo)} >Editar</Button>
                                                <Button variant="danger" onClick={()=>this.excluir(custofixo.id_custo_fixo)} >Excluir</Button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </Row>
                <Row >
                    <Col>
                        <Button className="float-left" variant="link" onClick={this.voltar}>voltar</Button>
                    </Col>
                    <Col>
                        <Button  className="float-right" variant="secondary" onClick={this.novoCustoFixo}>Novo Custo</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default listarCustosFixos;