import React, { Component } from 'react';
import { Container, Row, Button, Form, Col} from 'react-bootstrap';
import DespesasServices from '../services/DespesasServices';

class CreateUpdateDespesas extends Component {

    constructor (props){
        super(props);
        this.state={
            id_despesa: this.props.match.params.id_despesa,
            valor_despesa:"",
            data_despesa:"",
            detalhamento_despesa:"",
            id_empresa:""
        }

        this.changeValorHandler = this.changeValorHandler.bind(this);
        this.changeDataHandler = this.changeDataHandler.bind(this);
        this.changeDetalhamentoHandler = this.changeDetalhamentoHandler.bind(this);
        this.changeEmpresaHandler = this.changeEmpresaHandler.bind(this);
        this.salvarDespesa = this.salvarDespesa.bind(this);
    }

    componentDidMount(){
        if(this.state.id_despesa === "_add"){
            return false;
        } else{
            return DespesasServices.getDespesaById(this.state.id_despesa).then(
                (resposta) => {
                    let despesa = resposta.data;
                    this.setState({
                        valor_despesa: despesa.valor_despesa,
                        data_despesa: despesa.data_despesa,
                        detalhamento_despesa: despesa.detalhamento_despesa,
                        id_empresa: despesa.id_empresa
                    });
                }
            );
        }
    }

    changeValorHandler(event){
        this.setState({valor_despesa : event.target.value})
    }

    changeDataHandler(event){
        this.setState({data_despesa : event.target.value})
    }

    changeDetalhamentoHandler(event){
        this.setState({detalhamento_despesa : event.target.value})
    }

    changeEmpresaHandler(event){
        this.setState({id_empresa : event.target.value})
    }

    cancelar(){
        this.props.history.push("/despesas");
    }

    salvarDespesa(){
        let despesa = {
            valor_despesa : this.state.valor_despesa,
            data_despesa : this.state.data_despesa,
            detalhamento_despesa : this.state.detalhamento_despesa,
            id_empresa : this.state.id_empresa
        }

        if(this.state.id_despesa === "_add"){
            DespesasServices.createDespesa(despesa).then(
                (resposta) => {
                    alert(resposta.data);
                }
            )
        } else{
            despesa.id_despesa = this.state.id_despesa;
            DespesasServices.editDespesa(despesa).then(
                (resposta) => {console.log(resposta.data)}
            );
        }

        this.props.history.push("/despesas");

    }

    render() {
        return (
            <Container>
                <Row>
                    <h1>Cadastro de despesa</h1>
                </Row>
                <Form>
                    <Form.Group controlId="formValor">
                        <Form.Text className="text-muted">Valor</Form.Text>
                        <Form.Control type="text" placeholder="Digite aqui o valor" value={this.state.valor_despesa} onChange={this.changeValorHandler}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formData">
                        <Form.Text className="text-muted">Data</Form.Text>
                        <Form.Control type="date" placeholder="Digite aqui a data de pagamento" value={this.state.data_despesa} onChange={this.changeDataHandler}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formDetalhamento">
                        <Form.Text className="text-muted">Detalhamento</Form.Text>
                        <Form.Control type="text" placeholder="Se necessário digite aqui o detalhamento da despesa" value={this.state.detalhamento_despesa} onChange={this.changeDetalhamentoHandler}></Form.Control>
                    </Form.Group>
                    <Row className="float-right">
                        <Col>
                            <Button variant="success" style={{margin: "25px 0px 0px 0px"}} className="btnSubmit" onClick={this.salvarDespesa}>
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

export default CreateUpdateDespesas;