import React, { Component } from "react";
import { Container, Row, Table, Button, Col} from 'react-bootstrap';
import CustosServices from '../services/CustosServices';

class listarCustos extends Component{

    constructor (props){
        super(props);
        this.state = {
            custos: []
        }

        this.voltar = this.voltar.bind(this);
        this.excluir = this.excluir.bind(this);
        this.editar = this.editar.bind(this);
        this.novoCusto = this.novoCusto.bind(this);
        this.getCustos();

    }

    componentDidMount(){
        this.getCustos();
    }

    getCustos(){
        CustosServices.getCusto().then((resposta) => {
            this.setState({custos: resposta.data});
            console.log(resposta.data);
        });
    }

    voltar(){
        this.props.history.push("/");
    }

    excluir(id_custo){
        CustosServices.deleteCusto(id_custo).then(
            resposta => {
                alert(resposta.data);
                this.getCustos();
            }
        )
    }

    editar(id_custo){
        this.props.history.push("/custo/"+id_custo);
    }

    novoCusto(){
        this.props.history.push("/custo/_add");
    }

    render() {
        return (
            <Container>
                <Row className="float-left">
                    <Button variant="link" onClick={this.voltar}>voltar</Button>
                </Row>
                <Row>
                    <h1>Custos</h1>
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
                                this.state.custos.map(
                                    custo =>
                                        <tr key = {custo.id_custo}>
                                            <td>
                                                {custo.valor_custo}
                                            </td>
                                            <td>
                                                {custo.data_custo}
                                            </td>
                                            <td>
                                                {custo.detalhamento_custo}
                                            </td>
                                            <td>
                                                <Button variant="warning" onClick={()=>this.editar(custo.id_custo)} >Editar</Button>
                                                <Button variant="danger" onClick={()=>this.excluir(custo.id_custo)} >Excluir</Button>
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
                        <Button  className="float-right" variant="secondary" onClick={this.novoCusto}>Novo Custo</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default listarCustos;