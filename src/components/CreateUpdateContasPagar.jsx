import React, { Component } from 'react';
import { Container, Row, Button, Form, Col} from 'react-bootstrap';
import ContasPagarServices from '../services/ContasPagarServices';

class CreateUpdateContasPagar extends Component {

    constructor (props){
        super(props);
        this.state={
            id_pagar: this.props.match.params.id_pagar,
            valor_pagar:"",
            data_pagar:"",
            detalhamento_pagar:"",
            id_empresa:""
        }

        this.changeValorHandler = this.changeValorHandler.bind(this);
        this.changeDataHandler = this.changeDataHandler.bind(this);
        this.changeDetalhamentoHandler = this.changeDetalhamentoHandler.bind(this);
        this.changeEmpresaHandler = this.changeEmpresaHandler.bind(this);
        this.salvarContaPagar = this.salvarContaPagar.bind(this);
    }

    componentDidMount(){
        if(this.state.id_pagar === "_add"){
            return false;
        } else{
            return ContasPagarServices.getContaPagarById(this.state.id_pagar).then(
                (resposta) => {
                    let contapagar = resposta.data;
                    this.setState({
                        valor_pagar: contapagar.valor_pagar,
                        data_pagar: contapagar.data_pagar,
                        detalhamento_pagar: contapagar.detalhamento_pagar,
                        id_empresa: contapagar.id_empresa
                    });
                }
            );
        }
    }

    changeValorHandler(event){
        this.setState({valor_pagar : event.target.value})
    }

    changeDataHandler(event){
        this.setState({data_pagar : event.target.value})
    }

    changeDetalhamentoHandler(event){
        this.setState({detalhamento_pagar : event.target.value})
    }

    changeEmpresaHandler(event){
        this.setState({id_empresa : event.target.value})
    }

    cancelar(){
        this.props.history.push("/contaspagar");
    }

    salvarContaPagar(){
        let contapagar = {
            valor_pagar : this.state.valor_pagar,
            data_pagar : this.state.data_pagar,
            detalhamento_pagar : this.state.detalhamento_pagar,
            id_empresa : this.state.id_empresa
        }

        if(this.state.id_pagar === "_add"){
            ContasPagarServices.createContaPagar(contapagar).then(
                (resposta) => {
                    alert(resposta.data);
                }
            )
        } else{
            contapagar.id_pagar = this.state.id_pagar;
            ContasPagarServices.editContaPagar(contapagar).then(
                (resposta) => {console.log(resposta.data)}
            );
        }

        this.props.history.push("/contaspagar");

    }

    render() {
        return (
            <Container>
                <Row>
                    <h1>Cadastro de contas a pagar</h1>
                </Row>
                <Form>
                    <Form.Group controlId="formValor">
                        <Form.Text className="text-muted">Valor</Form.Text>
                        <Form.Control type="text" placeholder="Digite aqui o valor" value={this.state.valor_pagar} onChange={this.changeValorHandler}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formData">
                        <Form.Text className="text-muted">Data</Form.Text>
                        <Form.Control type="date" placeholder="Digite aqui a data de pagamento" value={this.state.data_pagar} onChange={this.changeDataHandler}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formDetalhamento">
                        <Form.Text className="text-muted">Detalhamento</Form.Text>
                        <Form.Control type="text" placeholder="Se necessário digite aqui o detalhamento da conta" value={this.state.detalhamento_pagar} onChange={this.changeDetalhamentoHandler}></Form.Control>
                    </Form.Group>
                    <Row className="float-right">
                        <Col>
                            <Button variant="success" style={{margin: "25px 0px 0px 0px"}} className="btnSubmit" onClick={this.salvarContaPagar}>
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

export default CreateUpdateContasPagar;