import React, { Component } from 'react';
import { Container, Row, Button, Form, Col} from 'react-bootstrap';
import UsuarioServices from '../services/UsuarioServices';

class CreateUpdateUsuarios extends Component {

    constructor (props){
        super(props);
        this.state={
            id_usuario: this.props.match.params.id_usuario,
            email_usuario:"",
            senha_usuario:""
        }

        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeSenhaHandler = this.changeSenhaHandler.bind(this);
        this.salvarUsuario = this.salvarUsuario.bind(this);
    }

    componentDidMount(){
        if(this.state.id_usuario === "_add"){
            return false;
        } else{
            return UsuarioServices.getUsuarioById(this.state.id_usuario).then(
                (resposta) => {
                    let usuario = resposta.data;
                    this.setState({
                        email_usuario: usuario.email_usuario,
                        senha_usuario: usuario.senha_usuario
                    });
                }
            );
        }
    }

    changeEmailHandler(event){
        this.setState({email_usuario : event.target.value})
    }

    changeSenhaHandler(event){
        this.setState({senha_usuario : event.target.value})
    }

    cancelar(){
        this.props.history.push("/usuarios");
    }

    salvarUsuario(){
        let usuario = {
            email_usuario : this.state.email_usuario,
            senha_usuario : this.state.senha_usuario
        }

        if(this.state.id_usuario === "_add"){
            UsuarioServices.createUsuario(usuario).then(
                (resposta) => {
                    alert(resposta.data);
                }
            )
        } else{
            usuario.id_usuario = this.state.id_usuario;
            UsuarioServices.editUsuario(usuario).then(
                (resposta) => {console.log(resposta.data)}
            );
        }

        this.props.history.push("/usuarios");

    }

    render() {
        return (
            <Container>
                <Row>
                    <h1>Cadastro de Usuários</h1>
                </Row>
                <Form>
                    <Form.Group controlId="formEmail">
                        <Form.Text className="text-muted">Email</Form.Text>
                        <Form.Control type="email" placeholder="seuemail@dominio.com" value={this.state.email_usuario} onChange={this.changeEmailHandler}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formSenha">
                        <Form.Text className="text-muted">Senha</Form.Text>
                        <Form.Control type="text" placeholder="Digite aqui sua senha" value={this.state.senha_usuario} onChange={this.changeSenhaHandler}></Form.Control>
                    </Form.Group>
                    <Row className="float-right">
                        <Col>
                            <Button variant="success" style={{margin: "25px 0px 0px 0px"}} className="btnSubmit" onClick={this.salvarUsuario}>
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

export default CreateUpdateUsuarios;