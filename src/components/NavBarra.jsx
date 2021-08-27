import React, { Component } from 'react';
import {Nav, Navbar, Container} from 'react-bootstrap';

class NavBarra extends Component {
    render() {
        return (
            <header>
                <Navbar bg="dark" variant="dark">
                    <Container>
                    <Navbar.Brand href="#">GF</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/usuarios">Usuario</Nav.Link>
                            <Nav.Link href="/contaspagar">Contas a Pagar</Nav.Link>
                            <Nav.Link href="/contasreceber">Contas a Receber</Nav.Link>
                            <Nav.Link href="/custos">Custos</Nav.Link>
                            <Nav.Link href="/custosfixos">Custos Fixos</Nav.Link>
                            <Nav.Link href="/despesas">Despesas</Nav.Link>
                            <Nav.Link href="/despesasfixas">Despesas Fixas</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </header>
        );
    }
}

export default NavBarra;