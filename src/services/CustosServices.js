import axios from "axios";

const url_base = "http://localhost:8080/custos"

class CustosServices{
    getCusto(){
        return axios.get(url_base+"/all");
    }

    createCusto(custo){
        return axios.post(url_base+"/add", custo);
    }

    getCustoById(id_custo){
        return axios.get(url_base+"/locate/"+id_custo);
    }

    editCusto(custo){
        return axios.put(url_base+"/update/"+custo.id_custo, custo);
    }

    deleteCusto(id_custo){
        return axios.delete(url_base+"/delete/"+id_custo);
    }
}

export default new CustosServices();