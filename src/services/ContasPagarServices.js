import axios from "axios";

const url_base = "http://localhost:8080/contaspagar"

class ContasPagarServices{
    getContaPagar(){
        return axios.get(url_base+"/all");
    }

    createContaPagar(contapagar){
        return axios.post(url_base+"/add", contapagar);
    }

    getContaPagarById(id_pagar){
        return axios.get(url_base+"/locate/"+id_pagar);
    }

    editContaPagar(contapagar){
        return axios.put(url_base+"/update/"+contapagar.id_pagar, contapagar);
    }

    deleteContaPagar(id_pagar){
        return axios.delete(url_base+"/delete/"+id_pagar);
    }
}

export default new ContasPagarServices();