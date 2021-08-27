import axios from "axios";

const url_base = "http://localhost:8080/despesas"

class DespesasServices{
    getDespesa(){
        return axios.get(url_base+"/all");
    }

    createDespesa(despesa){
        return axios.post(url_base+"/add", despesa);
    }

    getDespesaById(id_despesa){
        return axios.get(url_base+"/locate/"+id_despesa);
    }

    editDespesa(despesa){
        return axios.put(url_base+"/update/"+despesa.id_despesa, despesa);
    }

    deleteDespesa(id_despesa){
        return axios.delete(url_base+"/delete/"+id_despesa);
    }
}

export default new DespesasServices();