import axios from "axios";

const url_base = "http://localhost:8080/despesasfixas"

class DespesasFixasServices{
    getDespesaFixa(){
        return axios.get(url_base+"/all");
    }

    createDespesaFixa(despesafixa){
        return axios.post(url_base+"/add", despesafixa);
    }

    getDespesaFixaById(id_despesa_fixa){
        return axios.get(url_base+"/locate/"+id_despesa_fixa);
    }

    editDespesaFixa(despesafixa){
        return axios.put(url_base+"/update/"+despesafixa.id_despesa_fixa, despesafixa);
    }

    deleteDespesaFixa(id_despesa_fixa){
        return axios.delete(url_base+"/delete/"+id_despesa_fixa);
    }
}

export default new DespesasFixasServices();