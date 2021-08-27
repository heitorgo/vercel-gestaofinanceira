import React, { Component } from 'react';
import { Container, Row, Button, Form, Col} from 'react-bootstrap';
import ContasReceberServices from '../services/ContasReceberServices';

class CreateUpdateContasReceber extends Component {

    constructor (props){
        super(props);
        this.state={
            id_receber: this.props.match.params.id_receber,
            valor_receber:"",
            data_receber:"",
            detalhamento_receber:"",
            id_empresa:""
        }

        this.changeValorHandler = this.changeValorHandler.bind(this);
        this.changeDataHandler = this.changeDataHandler.bind(this);
        this.changeDetalhamentoHandler = this.changeDetalhamentoHandler.bind(this);
        this.changeEmpresaHandler = this.changeEmpresaHandler.bind(this);
        this.salvarContaReceber = this.salvarContaReceber.bind(this);
    }

    componentDidMount(){
        if(this.state.id_receber === "_add"){
            return false;
        } else{
            return ContasReceberServices.getContaReceberById(this.state.id_receber).then(
                (resposta) => {
                    let contareceber = resposta.data;
                    this.setState({
                        valor_receber: contareceber.valor_receber,
                        data_receber: contareceber.data_receber,
                        detalhamento_receber: contareceber.detalhamento_receber,
                        id_empresa: contareceber.id_empresa
                    });
                }
            );
        }
    }

    changeValorHandler(event){
        this.setState({valor_receber : event.target.value})
    }

    changeDataHandler(event){
        this.setState({data_receber : event.target.value})
    }

    changeDetalhamentoHandler(event){
        this.setState({detalhamento_receber : event.target.value})
    }

    changeEmpresaHandler(event){
        this.setState({id_empresa : event.target.value})
    }

    cancelar(){
        this.props.history.push("/contasreceber");
    }

    salvarContaReceber(){
        let contareceber = {
            valor_receber : this.state.valor_receber,
            data_receber : this.state.data_receber,
            detalhamento_receber : this.state.detalhamento_receber,
            id_empresa : this.state.id_empresa
        }

        if(this.state.id_receber === "_add"){
            ContasReceberServices.createContaReceber(contareceber).then(
                (resposta) => {
                    alert(resposta.data);
                }
            )
        } else{
            contareceber.id_receber = this.state.id_receber;
            ContasReceberServices.editContaReceber(contareceber).then(
                (resposta) => {console.log(resposta.data)}
            );
        }

        this.props.history.push("/contasreceber");

    }

    render() {
        return (
            <Container>
                <Row>
                    <h1>Cadastro de contas a receber</h1>
                </Row>
                <Form>
                    <Form.Group controlId="formValor">
                        <Form.Text className="text-muted">Valor</Form.Text>
                        <Form.Control type="text" placeholder="Digite aqui o valor" value={this.state.valor_receber} onChange={this.changeValorHandler}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formData">
                        <Form.Text className="text-muted">Data</Form.Text>
                        <Form.Control type="date" placeholder="Digite aqui a data de recebimento" value={this.state.data_receber} onChange={this.changeDataHandler}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formDetalhamento">
                        <Form.Text className="text-muted">Detalhamento</Form.Text>
                        <Form.Control type="text" placeholder="Se necessário digite aqui o detalhamento da conta" value={this.state.detalhamento_receber} onChange={this.changeDetalhamentoHandler}></Form.Control>
                    </Form.Group>
                    <Row className="float-right">
                        <Col>
                            <Button variant="success" style={{margin: "25px 0px 0px 0px"}} className="btnSubmit" onClick={this.salvarContaReceber}>
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

export default CreateUpdateContasReceber;