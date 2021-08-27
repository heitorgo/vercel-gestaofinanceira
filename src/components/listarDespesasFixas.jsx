import React, { Component } from "react";
import { Container, Row, Table, Button, Col} from 'react-bootstrap';
import DespesasFixasServices from '../services/DespesasFixasServices';

class listarDespesasFixas extends Component{

    constructor (props){
        super(props);
        this.state = {
            despesas_fixas: []
        }

        this.voltar = this.voltar.bind(this);
        this.excluir = this.excluir.bind(this);
        this.editar = this.editar.bind(this);
        this.novaDespesaFixa = this.novaDespesaFixa.bind(this);
        this.getDespesasFixas();

    }

    componentDidMount(){
        this.getDespesasFixas();
    }

    getDespesasFixas(){
        DespesasFixasServices.getDespesaFixa().then((resposta) => {
            this.setState({despesas_fixas: resposta.data});
            console.log(resposta.data);
        });
    }

    voltar(){
        this.props.history.push("/");
    }

    excluir(id_despesa_fixa){
        DespesasFixasServices.deleteDespesaFixa(id_despesa_fixa).then(
            resposta => {
                alert(resposta.data);
                this.getDespesasFixas();
            }
        )
    }

    editar(id_despesa_fixa){
        this.props.history.push("/despesafixa/"+id_despesa_fixa);
    }

    novaDespesaFixa(){
        this.props.history.push("/despesafixa/_add");
    }

    render() {
        return (
            <Container>
                <Row className="float-left">
                    <Button variant="link" onClick={this.voltar}>voltar</Button>
                </Row>
                <Row>
                    <h1>Despesas Fixas</h1>
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
                                this.state.despesas_fixas.map(
                                    despesafixa =>
                                        <tr key = {despesafixa.id_despesa_fixa}>
                                            <td>
                                                {despesafixa.valor_despesa_fixa}
                                            </td>
                                            <td>
                                                {despesafixa.frequencia_despesa}
                                            </td>
                                            <td>
                                                {despesafixa.detalhamento_despesa_fixa}
                                            </td>
                                            <td>
                                                <Button variant="warning" onClick={()=>this.editar(despesafixa.id_despesa_fixa)} >Editar</Button>
                                                <Button variant="danger" onClick={()=>this.excluir(despesafixa.id_despesa_fixa)} >Excluir</Button>
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
                        <Button  className="float-right" variant="secondary" onClick={this.novaDespesaFixa}>Nova Despesa</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default listarDespesasFixas;