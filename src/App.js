import './App.css';
import NavBarra from './components/NavBarra';
import HomeComponent from './components/HomeComponent';
import FooterComponent from './components/FooterComponent';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import listarUsuarios from './components/listarUsuarios';
import CreateUpdateUsuarios from './components/CreateUpdateUsuarios';
import listarContasPagar from './components/listarContasPagar';
import CreateUpdateContasPagar from './components/CreateUpdateContasPagar';
import listarContasReceber from './components/listarContasReceber';
import CreateUpdateContasReceber from './components/CreateUpdateContasReceber';
import listarCustos from './components/listarCustos';
import CreateUpdateCustos from './components/CreateUpdateCustos';
import listarDespesas from './components/listarDespesas';
import CreateUpdateDespesas from './components/CreateUpdateDespesas';
import listarCustosFixos from './components/listarCustosFixos';
import CreateUpdateCustosFixos from './components/CreateUpdateCustosFixos';
import listarDespesasFixas from './components/listarDespesasFixas';
import CreateUpdateDespesasFixas from './components/CreateUpdateDespesasFixas';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBarra></NavBarra>
        <Switch>
          <Route exact path="/" component={HomeComponent}></Route>
          <Route exact path="/usuarios" component={listarUsuarios}></Route>
          <Route exact path="/contaspagar" component={listarContasPagar}></Route>
          <Route exact path="/contasreceber" component={listarContasReceber}></Route>
          <Route exact path="/custos" component={listarCustos}></Route>
          <Route exact path="/custosfixos" component={listarCustosFixos}></Route>
          <Route exact path="/despesas" component={listarDespesas}></Route>
          <Route exact path="/despesasfixas" component={listarDespesasFixas}></Route>
          <Route path="/usuario/:id_usuario" component={CreateUpdateUsuarios}></Route>
          <Route path="/contapagar/:id_pagar" component={CreateUpdateContasPagar}></Route>
          <Route path="/contareceber/:id_receber" component={CreateUpdateContasReceber}></Route>
          <Route path="/custo/:id_custo" component={CreateUpdateCustos}></Route>
          <Route path="/custofixo/:id_custo_fixo" component={CreateUpdateCustosFixos}></Route>
          <Route path="/despesa/:id_despesa" component={CreateUpdateDespesas}></Route>
          <Route path="/despesafixa/:id_despesa_fixa" component={CreateUpdateDespesasFixas}></Route>
        </Switch>
        <FooterComponent></FooterComponent>
      </Router>
    </div>
  );
}

export default App;
