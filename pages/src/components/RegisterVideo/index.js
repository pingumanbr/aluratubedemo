import React from "react";
import styled from "styled-components";

import { createClient } from "@supabase/supabase-js";

const StyledRegisterVideo = styled.div`
  .add-video {
    width: 50px;
    height: 50px;
    font-size: 20px;
    color: inherit;
    position: fixed;
    bottom: 16px;
    right: 16px;
    border: 0;
    background-color: red;
    border-radius: 50%;
    z-index: 99;
    cursor: pointer;
  }
  .close-modal {
    width: 25px;
    height: 25px;
    position: absolute;
    top: 8px;
    right: 16px;
    color: inherit;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  button[type="submit"] {
    background-color: red;
    padding: 8px 16px;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    color: inherit;
  }
  form {
    width: 100%;
    padding: 5%;
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    top: 0; bottom: 0;
    left: 0; right: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    & > div {
      flex: 1;
      border-radius: 8px;
      max-width: 320px;
      background-color: ${({ theme }) => theme.backgroundLevel2};
      display: flex;
      flex-direction: column;
      position: relative;
      padding: 16px;
      padding-top: 40px;
    }
  }
  input {
    border-radius: 2px;
    border: 1px solid ${({ theme }) => theme.borderBase};
    padding: 8px 10px;
    margin-bottom: 10px;
    outline: none;
    color: #222222;
    background-color: #f9f9f9;
    color: ${({ theme }) => theme.textColorBase};
    background-color: ${({ theme }) => theme.backgroundBase};
  }
`;




// get youtube video id
// function getVideoId(url){
//     const videoId = url.split("v=")[1];
//     const ampersandPosition = videoId.indexOf("&");
//       if( ampersandPosition !== -1 ){
//         return videoId.substring(0,ampersandPosition);
//       }
//       return videoId;
// }

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

const PROJECT_URL = "https://okstarojudwxmjdcuhea.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rc3Rhcm9qdWR3eG1qZGN1aGVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ4OTU1OTUsImV4cCI6MTk4MDQ3MTU5NX0.shktap50ImF9SqhqcsugSpg38trqKe7aNEP4RvhpQE0";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

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