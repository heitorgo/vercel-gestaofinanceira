import React, { Component } from 'react';
import { Container, Row, Button, Form, Col} from 'react-bootstrap';
import CustosFixosServices from '../services/CustosFixosServices';

class CreateUpdateCustosFixos extends Component {

    constructor (props){
        super(props);
        this.state={
            id_custo_fixo: this.props.match.params.id_custo_fixo,
            valor_custo_fixo:"",
            frequencia_custo:"",
            detalhamento_custo_fixo:"",
            id_empresa:""
        }

        this.changeValorHandler = this.changeValorHandler.bind(this);
        this.changeFrequenciaHandler = this.changeFrequenciaHandler.bind(this);
        this.changeDetalhamentoHandler = this.changeDetalhamentoHandler.bind(this);
        this.changeEmpresaHandler = this.changeEmpresaHandler.bind(this);
        this.salvarCustoFixo = this.salvarCustoFixo.bind(this);
    }

    componentDidMount(){
        if(this.state.id_custo_fixo === "_add"){
            return false;
        } else{
            return CustosFixosServices.getCustoFixoById(this.state.id_custo_fixo).then(
                (resposta) => {
                    let custofixo = resposta.data;
                    this.setState({
                        valor_custo_fixo: custofixo.valor_custo_fixo,
                        frequencia_custo: custofixo.frequencia_custo,
                        detalhamento_custo_fixo: custofixo.detalhamento_custo_fixo,
                        id_empresa: custofixo.id_empresa
                    });
                }
            );
        }
    }

    changeValorHandler(event){
        this.setState({valor_custo_fixo : event.target.value})
    }

    changeFrequenciaHandler(event){
        this.setState({frequencia_custo : event.target.value})
    }

    changeDetalhamentoHandler(event){
        this.setState({detalhamento_custo_fixo : event.target.value})
    }

    changeEmpresaHandler(event){
        this.setState({id_empresa : event.target.value})
    }

    cancelar(){
        this.props.history.push("/custosfixos");
    }

    salvarCustoFixo(){
        let custofixo = {
            valor_custo_fixo : this.state.valor_custo_fixo,
            frequencia_custo : this.state.frequencia_custo,
            detalhamento_custo_fixo : this.state.detalhamento_custo_fixo,
            id_empresa : this.state.id_empresa
        }

        if(this.state.id_custo_fixo === "_add"){
            CustosFixosServices.createCustoFixo(custofixo).then(
                (resposta) => {
                    alert(resposta.data);
                }
            )
        } else{
            custofixo.id_custo_fixo = this.state.id_custo_fixo;
            CustosFixosServices.editCustoFixo(custofixo).then(
                (resposta) => {console.log(resposta.data)}
            );
        }

        this.props.history.push("/custosfixos");

    }

    render() {
        return (
            <Container>
                <Row>
                    <h1>Cadastro de custos fixos</h1>
                </Row>
                <Form>
                    <Form.Group controlId="formValor">
                        <Form.Text className="text-muted">Valor</Form.Text>
                        <Form.Control type="text" placeholder="Digite aqui o valor" value={this.state.valor_custo_fixo} onChange={this.changeValorHandler}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formFrequencia">
                        <Form.Text className="text-muted">Frequência de pagamento</Form.Text>
                        <Form.Control type="text" placeholder="Digite aqui a frequencia de pagamento" value={this.state.frequencia_custo} onChange={this.changeFrequenciaHandler}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formDetalhamento">
                        <Form.Text className="text-muted">Detalhamento</Form.Text>
                        <Form.Control type="text" placeholder="Se necessário digite aqui o detalhamento do custo fixo" value={this.state.detalhamento_custo_fixo} onChange={this.changeDetalhamentoHandler}></Form.Control>
                    </Form.Group>
                    <Row className="float-right">
                        <Col>
                            <Button variant="success" style={{margin: "25px 0px 0px 0px"}} className="btnSubmit" onClick={this.salvarCustoFixo}>
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

export default CreateUpdateCustosFixos;