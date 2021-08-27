import React, { Component } from 'react';
import { Container, Row, Table, Button, Col} from 'react-bootstrap';
import UsuarioServices from '../services/UsuarioServices';

class listarUsuarios extends Component {

    constructor (props){
        super(props);
        this.state = {
            usuarios: []
        }

        this.voltar = this.voltar.bind(this);
        this.excluir = this.excluir.bind(this);
        this.editar = this.editar.bind(this);
        this.novoUsuario = this.novoUsuario.bind(this);
        this.getUsuarios();

    }

    componentDidMount(){
        this.getUsuarios();
    }

    getUsuarios(){
        UsuarioServices.getUsuario().then((resposta) => {
            this.setState({usuarios: resposta.data});
            console.log(resposta.data);
        });
    }

    voltar(){
        this.props.history.push("/");
    }

    excluir(id_usuario){
        UsuarioServices.deleteUsuario(id_usuario).then(
            resposta => {
                alert(resposta.data);
                this.getUsuarios();
            }
        )
    }

    editar(id_usuario){
        this.props.history.push("/usuario/"+id_usuario);
    }

    novoUsuario(){
        this.props.history.push("/usuario/_add");
    }

    render() {
        return (
            <Container>
                <Row className="float-left">
                    <Button variant="link" onClick={this.voltar}>voltar</Button>
                </Row>
                <Row>
                    <h1>Usuarios</h1>
                </Row>
                <Row>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>
                                    Email
                                </th>
                                <th>
                                    Senha
                                </th>
                                <th>
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.usuarios.map(
                                    usuario =>
                                        <tr key = {usuario.id_usuario}>
                                            <td>
                                                {usuario.email_usuario}
                                            </td>
                                            <td>
                                                {usuario.senha_usuario}
                                            </td>
                                            <td>
                                                <Button variant="warning" onClick={()=>this.editar(usuario.id_usuario)} >Editar</Button>
                                                <Button variant="danger" onClick={()=>this.excluir(usuario.id_usuario)} >Excluir</Button>
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
                        <Button  className="float-right" variant="secondary" onClick={this.novoUsuario}>Novo Usuario</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default listarUsuarios;
