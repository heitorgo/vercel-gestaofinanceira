import axios from "axios";

const url_base = "http://localhost:8080/custosfixos"

class CustosFixosServices{
    getCustoFixo(){
        return axios.get(url_base+"/all");
    }

    createCustoFixo(custofixo){
        return axios.post(url_base+"/add", custofixo);
    }

    getCustoFixoById(id_custo_fixo){
        return axios.get(url_base+"/locate/"+id_custo_fixo);
    }

    editCustoFixo(custofixo){
        return axios.put(url_base+"/update/"+custofixo.id_custo_fixo, custofixo);
    }

    deleteCusto(id_custo_fixo){
        return axios.delete(url_base+"/delete/"+id_custo_fixo);
    }
}

export default new CustosFixosServices();