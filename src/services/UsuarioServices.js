import axios from "axios";

const url_base = "http://localhost:8080/usuarios";

class UsuarioServices{
    getUsuario(){
        return axios.get(url_base+"/all");
    }

    createUsuario(usuario){
        return axios.post(url_base+"/add", usuario);
    }

    getUsuarioById(id_usuario){
        return axios.get(url_base+"/locate/"+id_usuario);
    }

    editUsuario(usuario){
        return axios.put(url_base+"/update/"+usuario.id_usuario, usuario);
    }

    deleteUsuario(id_usuario){
        return axios.delete(url_base+"/delete/"+id_usuario);
    }
}

export default new UsuarioServices();