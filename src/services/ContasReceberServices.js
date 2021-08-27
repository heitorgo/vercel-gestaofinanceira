import axios from "axios";

const url_base = "http://localhost:8080/contasreceber"

class ContasReceberServices{
    getContaReceber(){
        return axios.get(url_base+"/all");
    }

    createContaReceber(contareceber){
        return axios.post(url_base+"/add", contareceber);
    }

    getContaReceberById(id_receber){
        return axios.get(url_base+"/locate/"+id_receber);
    }

    editContaReceber(contareceber){
        return axios.put(url_base+"/update/"+contareceber.id_receber, contareceber);
    }

    deleteContaReceber(id_receber){
        return axios.delete(url_base+"/delete/"+id_receber);
    }
}

export default new ContasReceberServices();