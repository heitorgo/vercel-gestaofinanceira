import React, { Component } from "react";
import { Container, Row, Table, Button, Col} from 'react-bootstrap';
import ContasReceberServices from '../services/ContasReceberServices';

class listarContasReceber extends Component{

    constructor (props){
        super(props);
        this.state = {
            contas_receber: []
        }

        this.voltar = this.voltar.bind(this);
        this.excluir = this.excluir.bind(this);
        this.editar = this.editar.bind(this);
        this.novaContaReceber = this.novaContaReceber.bind(this);
        this.getContasReceber();

    }

    componentDidMount(){
        this.getContasReceber();
    }

    getContasReceber(){
        ContasReceberServices.getContaReceber().then((resposta) => {
            this.setState({contas_receber: resposta.data});
            console.log(resposta.data);
        });
    }

    voltar(){
        this.props.history.push("/");
    }

    excluir(id_receber){
        ContasReceberServices.deleteContaReceber(id_receber).then(
            resposta => {
                alert(resposta.data);
                this.getContasReceber();
            }
        )
    }

    editar(id_receber){
        this.props.history.push("/contareceber/"+id_receber);
    }

    novaContaReceber(){
        this.props.history.push("/contareceber/_add");
    }

    render() {
        return (
            <Container>
                <Row className="float-left">
                    <Button variant="link" onClick={this.voltar}>voltar</Button>
                </Row>
                <Row>
                    <h1>Contas a receber</h1>
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
                                this.state.contas_receber.map(
                                    contareceber =>
                                        <tr key = {contareceber.id_receber}>
                                            <td>
                                                {contareceber.valor_receber}
                                            </td>
                                            <td>
                                                {contareceber.data_receber}
                                            </td>
                                            <td>
                                                {contareceber.detalhamento_receber}
                                            </td>
                                            <td>
                                                <Button variant="warning" onClick={()=>this.editar(contareceber.id_receber)} >Editar</Button>
                                                <Button variant="danger" onClick={()=>this.excluir(contareceber.id_receber)} >Excluir</Button>
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
                        <Button  className="float-right" variant="secondary" onClick={this.novaContaReceber}>Nova Conta</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default listarContasReceber;