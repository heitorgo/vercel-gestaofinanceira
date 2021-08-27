import React, { Component } from 'react';
import { Container, Row, Button, Form, Col} from 'react-bootstrap';
import DespesasFixasServices from '../services/DespesasFixasServices';

class CreateUpdateDespesasFixas extends Component {

    constructor (props){
        super(props);
        this.state={
            id_despesa_fixa: this.props.match.params.id_despesa_fixa,
            valor_despesa_fixa:"",
            frequencia_despesa:"",
            detalhamento_despesa_fixa:"",
            id_empresa:""
        }

        this.changeValorHandler = this.changeValorHandler.bind(this);
        this.changeFrequenciaHandler = this.changeFrequenciaHandler.bind(this);
        this.changeDetalhamentoHandler = this.changeDetalhamentoHandler.bind(this);
        this.changeEmpresaHandler = this.changeEmpresaHandler.bind(this);
        this.salvarDespesaFixa = this.salvarDespesaFixa.bind(this);
    }

    componentDidMount(){
        if(this.state.id_despesa_fixa === "_add"){
            return false;
        } else{
            return DespesasFixasServices.getDespesaFixaById(this.state.id_despesa_fixa).then(
                (resposta) => {
                    let despesafixa = resposta.data;
                    this.setState({
                        valor_despesa_fixa: despesafixa.valor_despesa_fixa,
                        frequencia_despesa: despesafixa.frequencia_despesa,
                        detalhamento_despesa_fixa: despesafixa.detalhamento_despesa_fixa,
                        id_empresa: despesafixa.id_empresa
                    });
                }
            );
        }
    }

    changeValorHandler(event){
        this.setState({valor_despesa_fixa : event.target.value})
    }

    changeFrequenciaHandler(event){
        this.setState({frequencia_despesa : event.target.value})
    }

    changeDetalhamentoHandler(event){
        this.setState({detalhamento_despesa_fixa : event.target.value})
    }

    changeEmpresaHandler(event){
        this.setState({id_empresa : event.target.value})
    }

    cancelar(){
        this.props.history.push("/despesasfixas");
    }

    salvarDespesaFixa(){
        let despesafixa = {
            valor_despesa_fixa : this.state.valor_despesa_fixa,
            frequencia_despesa : this.state.frequencia_despesa,
            detalhamento_despesa_fixa : this.state.detalhamento_despesa_fixa,
            id_empresa : this.state.id_empresa
        }

        if(this.state.id_despesa_fixa === "_add"){
            DespesasFixasServices.createDespesaFixa(despesafixa).then(
                (resposta) => {
                    alert(resposta.data);
                }
            )
        } else{
            despesafixa.id_despesa_fixa = this.state.id_despesa_fixa;
            DespesasFixasServices.editDespesaFixa(despesafixa).then(
                (resposta) => {console.log(resposta.data)}
            );
        }

        this.props.history.push("/despesasfixas");

    }

    render() {
        return (
            <Container>
                <Row>
                    <h1>Cadastro de despesa fixas</h1>
                </Row>
                <Form>
                    <Form.Group controlId="formValor">
                        <Form.Text className="text-muted">Valor</Form.Text>
                        <Form.Control type="text" placeholder="Digite aqui o valor" value={this.state.valor_despesa_fixa} onChange={this.changeValorHandler}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formFrequencia">
                        <Form.Text className="text-muted">Frequência de pagamento</Form.Text>
                        <Form.Control type="text" placeholder="Digite aqui a frequencia de pagamento" value={this.state.frequencia_despesa} onChange={this.changeFrequenciaHandler}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formDetalhamento">
                        <Form.Text className="text-muted">Detalhamento</Form.Text>
                        <Form.Control type="text" placeholder="Se necessário digite aqui o detalhamento da despesa fixa" value={this.state.detalhamento_despesa_fixa} onChange={this.changeDetalhamentoHandler}></Form.Control>
                    </Form.Group>
                    <Row className="float-right">
                        <Col>
                            <Button variant="success" style={{margin: "25px 0px 0px 0px"}} className="btnSubmit" onClick={this.salvarDespesaFixa}>
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

export default CreateUpdateDespesasFixas;