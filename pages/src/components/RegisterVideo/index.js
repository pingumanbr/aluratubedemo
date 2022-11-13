import { createClient } from "@supabase/supabase-js";
import React from "react";
import { StyledRegisterVideo } from "./styles";

// get youtube video id
function getVideoId(url){
    const videoId = url.split("v=")[1];
    const ampersandPosition = videoId.indexOf("&");
      if( ampersandPosition !== -1 ){
        return videoId.substring(0,ampersandPosition);
      }
      return videoId;
}

// get youtube thumbnail from video url
function getThumbnail(url){
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hgdefault.jpg`;
}


//Custom Hook
function useForm(propsDoForm){
    const [values, setValues] = React.useState(propsDoForm.initialValues);

    return{
      values,
      handleChange :
        (evento) => {
            const value = evento.target.value;
            console.log(value);
            const name = evento.target.name;
            setValues({
                ...values,
                [name]:value,
            });
        },
        clearForm() {
            setValues({titulo: '',
            url: '',});
        }
    }  
};



export default function RegisterVideo(){
    
    const formCadastro = useForm({
        initialValues: {titulo:"Frost punk", url: "https://youtube.."}
    });

    const [ formVisivel, setformVisivel ] = React.useState(false);
 
    /*
     ## O que precisamos para o form funcionar?
     - pegar os dados, que precisam vir do state
         - titulo
         - url do vídeo 
     - precisamos ter um onSubmit do nosso form
     - Limpar o formulário após o Submit
     */

    return(
        <React.Fragment>
        <StyledRegisterVideo>

            <button type="button"className="ädd-video" onClick={() =>  setformVisivel(true)} >
                  +
            </button>
            <h2>TTTTTTTTTTTTTTTTTTTTTTTTTTGGGGGGGGGGGGGGGGGGGGGGGGGGGG</h2>

            {/* Ternario */}
            {/* Operadores de curto-circuito */}
            {formVisivel 
                ? (
                    <form onSubmit={(evento) => {
                        evento.preventDefault();
                        console.log(formCadastro.values);

                        //Contrato entre o nosso Front e o BackEnd
                        supabase.from("video").insert({
                            title: formCadastro.values.titulo,
                            url: formCadastro.values.url,
                            thumb: getThumbnail(formCadastro.values.url),
                            playlist: "jogos"
                        })
                        .then((oqueveio) => {console.log(oqueveio)})
                        .catch((error) => {console.log(error)})

                        setformVisivel(false);
                        formCadastro.clearForm();
                    }}>
                        <div>
                            <button type="button" className="close-modal" onClick={() => setformVisivel(false)}>
                                X
                            </button>
                            <input 
                                placeholder="Titulo do video"
                                name="titulo"
                                value={formCadastro.values.titulo}
                                onChange={
                                    formCadastro.handleChange
                                } 
                            />
                            <input 
                                placeholder="URL"
                                name="url"
                                value={formCadastro.values.url}
                                onChange={
                                    formCadastro.handleChange
                                        }
                                />
                            <button type="submit" >
                                Cadastrar
                            </button>
                        </div>
                    </form>
                  )
                : false
            }
            
        </StyledRegisterVideo>
        </React.Fragment>
    )
}