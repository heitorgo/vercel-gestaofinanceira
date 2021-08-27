import React, { Component } from "react";
import { Container, Row, Table, Button, Col} from 'react-bootstrap';
import ContasPagarServices from '../services/ContasPagarServices';

class listarContasPagar extends Component{

    constructor (props){
        super(props);
        this.state = {
            contas_pagar: []
        }

        this.voltar = this.voltar.bind(this);
        this.excluir = this.excluir.bind(this);
        this.editar = this.editar.bind(this);
        this.novaContaPagar = this.novaContaPagar.bind(this);
        this.getContasPagar();

    }

    componentDidMount(){
        this.getContasPagar();
    }

    getContasPagar(){
        ContasPagarServices.getContaPagar().then((resposta) => {
            this.setState({contas_pagar: resposta.data});
            console.log(resposta.data);
        });
    }

    voltar(){
        this.props.history.push("/");
    }

    excluir(id_pagar){
        ContasPagarServices.deleteContaPagar(id_pagar).then(
            resposta => {
                alert(resposta.data);
                this.getContasPagar();
            }
        )
    }

    editar(id_pagar){
        this.props.history.push("/contapagar/"+id_pagar);
    }

    novaContaPagar(){
        this.props.history.push("/contapagar/_add");
    }

    render() {
        return (
            <Container>
                <Row className="float-left">
                    <Button variant="link" onClick={this.voltar}>voltar</Button>
                </Row>
                <Row>
                    <h1>Contas a pagar</h1>
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
                                this.state.contas_pagar.map(
                                    contapagar =>
                                        <tr key = {contapagar.id_pagar}>
                                            <td>
                                                {contapagar.valor_pagar}
                                            </td>
                                            <td>
                                                {contapagar.data_pagar}
                                            </td>
                                            <td>
                                                {contapagar.detalhamento_pagar}
                                            </td>
                                            <td>
                                                <Button variant="warning" onClick={()=>this.editar(contapagar.id_pagar)} >Editar</Button>
                                                <Button variant="danger" onClick={()=>this.excluir(contapagar.id_pagar)} >Excluir</Button>
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
                        <Button  className="float-right" variant="secondary" onClick={this.novaContaPagar}>Nova Conta</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default listarContasPagar;