import React from "react";
import { StyledRegisterVideo } from "./styles";

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