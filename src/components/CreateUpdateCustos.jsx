import React, { Component } from 'react';
import { Container, Row, Button, Form, Col} from 'react-bootstrap';
import CustosServices from '../services/CustosServices';

class CreateUpdateCustos extends Component {

    constructor (props){
        super(props);
        this.state={
            id_custo: this.props.match.params.id_custo,
            valor_custo:"",
            data_custo:"",
            detalhamento_custo:"",
            id_empresa:""
        }

        this.changeValorHandler = this.changeValorHandler.bind(this);
        this.changeDataHandler = this.changeDataHandler.bind(this);
        this.changeDetalhamentoHandler = this.changeDetalhamentoHandler.bind(this);
        this.changeEmpresaHandler = this.changeEmpresaHandler.bind(this);
        this.salvarCusto = this.salvarCusto.bind(this);
    }

    componentDidMount(){
        if(this.state.id_custo === "_add"){
            return false;
        } else{
            return CustosServices.getCustoById(this.state.id_custo).then(
                (resposta) => {
                    let custo = resposta.data;
                    this.setState({
                        valor_custo: custo.valor_custo,
                        data_custo: custo.data_custo,
                        detalhamento_custo: custo.detalhamento_custo,
                        id_empresa: custo.id_empresa
                    });
                }
            );
        }
    }

    changeValorHandler(event){
        this.setState({valor_custo : event.target.value})
    }

    changeDataHandler(event){
        this.setState({data_custo : event.target.value})
    }

    changeDetalhamentoHandler(event){
        this.setState({detalhamento_custo : event.target.value})
    }

    changeEmpresaHandler(event){
        this.setState({id_empresa : event.target.value})
    }

    cancelar(){
        this.props.history.push("/custos");
    }

    salvarCusto(){
        let custo = {
            valor_custo : this.state.valor_custo,
            data_custo : this.state.data_custo,
            detalhamento_custo : this.state.detalhamento_custo,
            id_empresa : this.state.id_empresa
        }

        if(this.state.id_custo === "_add"){
            CustosServices.createCusto(custo).then(
                (resposta) => {
                    alert(resposta.data);
                }
            )
        } else{
            custo.id_custo = this.state.id_custo;
            CustosServices.editCusto(custo).then(
                (resposta) => {console.log(resposta.data)}
            );
        }

        this.props.history.push("/custos");

    }

    render() {
        return (
            <Container>
                <Row>
                    <h1>Cadastro de custos</h1>
                </Row>
                <Form>
                    <Form.Group controlId="formValor">
                        <Form.Text className="text-muted">Valor</Form.Text>
                        <Form.Control type="text" placeholder="Digite aqui o valor" value={this.state.valor_custo} onChange={this.changeValorHandler}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formData">
                        <Form.Text className="text-muted">Data</Form.Text>
                        <Form.Control type="date" placeholder="Digite aqui a data de pagamento" value={this.state.data_custo} onChange={this.changeDataHandler}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formDetalhamento">
                        <Form.Text className="text-muted">Detalhamento</Form.Text>
                        <Form.Control type="text" placeholder="Se necessário digite aqui o detalhamento do custo" value={this.state.detalhamento_custo} onChange={this.changeDetalhamentoHandler}></Form.Control>
                    </Form.Group>
                    <Row className="float-right">
                        <Col>
                            <Button variant="success" style={{margin: "25px 0px 0px 0px"}} className="btnSubmit" onClick={this.salvarCusto}>
                                Inserir
                            </Button>
                        </Col>
                        <Col>
                            <Button variant="warning" style={{margin: "25px 0px 0px 0px"}} onClick={this.cancelar.bind(this)} >
                                Cancelar
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        );
    }
}

export default CreateUpdateCustos;