import React, { Component } from "react";
import { Container, Row, Table, Button, Col} from 'react-bootstrap';
import DespesasServices from '../services/DespesasServices';

class listarDespesas extends Component{

    constructor (props){
        super(props);
        this.state = {
            despesas: []
        }

        this.voltar = this.voltar.bind(this);
        this.excluir = this.excluir.bind(this);
        this.editar = this.editar.bind(this);
        this.novaDespesa = this.novaDespesa.bind(this);
        this.getDespesas();

    }

    componentDidMount(){
        this.getDespesas();
    }

    getDespesas(){
        DespesasServices.getDespesa().then((resposta) => {
            this.setState({despesas: resposta.data});
            console.log(resposta.data);
        });
    }

    voltar(){
        this.props.history.push("/");
    }

    excluir(id_despesa){
        DespesasServices.deleteDespesa(id_despesa).then(
            resposta => {
                alert(resposta.data);
                this.getDespesas();
            }
        )
    }

    editar(id_despesa){
        this.props.history.push("/despesa/"+id_despesa);
    }

    novaDespesa(){
        this.props.history.push("/despesa/_add");
    }

    render() {
        return (
            <Container>
                <Row className="float-left">
                    <Button variant="link" onClick={this.voltar}>voltar</Button>
                </Row>
                <Row>
                    <h1>Despesas</h1>
                </Row>
                <Row>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>
                                    Valor
                                </th>
                                <th>
                                    Data
                                </th>
                                <th>
                                    Detalhamento
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.despesas.map(
                                    despesa =>
                                        <tr key = {despesa.id_despesa}>
                                            <td>
                                                {despesa.valor_despesa}
                                            </td>
                                            <td>
                                                {despesa.data_despesa}
                                            </td>
                                            <td>
                                                {despesa.detalhamento_despesa}
                                            </td>
                                            <td>
                                                <Button variant="warning" onClick={()=>this.editar(despesa.id_despesa)} >Editar</Button>
                                                <Button variant="danger" onClick={()=>this.excluir(despesa.id_despesa)} >Excluir</Button>
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
                        <Button  className="float-right" variant="secondary" onClick={this.novaDespesa}>Nova Despesa</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default listarDespesas;