import config from "./config.json";
import styled from "styled-components";
import { createClient } from "@supabase/supabase-js";

import Image from 'next/image';

import React from 'react';
import Menu from "./src/components/Menu";
import { StyledTimeline } from "./src/components/Timeline"

const PROJECT_URL = "https://gusozvtmmqdfrjtmojej.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1c296dnRtbXFkZnJqdG1vamVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzNDIyNzcsImV4cCI6MTk4MzkxODI3N30.GTjZooqbeCNs_6lz4bMstWQP40Fv7-RiKxGSOY2Ar_4"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);


function HomePage() {
  // const service = getAllVideos;
  const [valorDoFiltro, setValorDoFiltro] = React.useState("");
  const [playlists,setPlaylists] = React.useState({});

  //config.playlists
  // const playlists = {
  //   "jogos": []
  // };

  // Evita que o codigo se repita varias vezes, só executando quando 
  // uma variavel seja atualizada
  React.useEffect(() => {
    console.log("Useffect");
    supabase.from("video")               // Tive que reinserir o codigo do videoService aqui !
            .select("*")                  // Ao fazer o build, dava problema de export
            .then((dados) => {
              console.log(dados);
              //Forma imutavel
              //E feito pq o React tem que receber dado novo.
              //Por isso foi criado esse novasPlaylists.
              const novasPlaylists = {...playlists};  
              dados.data.forEach((video) => { 
                if( !novasPlaylists[video.playlist] ) {
                  novasPlaylists[video.playlist] = [];
                }
                novasPlaylists[video.playlist].push(video);
              })
      setPlaylists(novasPlaylists);
    });
  }, [] )

  
  
  console.log("setValorDoFiltro ---> ",setValorDoFiltro);
  console.log("Valor do Filtro ==> ", valorDoFiltro );

    return (
    <React.Fragment>
      
      <div style={{
                 display: "flex",
                 flexDirection: "column",
                 flex: 1
             }}>
      </div>
        <div>
          {/* /* Prop drilling */ }
          <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro}/>
          <Header/>
          
          <Timeline searchValue={valorDoFiltro} playlists={config.playlists}/>
        </div>
    </React.Fragment>
    )
  }
  
  export default HomePage

  // function Menu(){
  //   return(
  //     <div>
  //       Menu
  //     </div>
  //   )
  // }

  const StyleHeader = styled.div`
    background-color: ${({ theme }) => theme.backgroundLevel1};
    img{
      width:80px;
      height: 80px;
      border-radius:50%;
    }
    .user-info{
      display: flex;
      align-items: center;
      width: 100%;
      padding: 16px 32px;
      gap: 16px;
    }
  `;

const StyledBanner = styled.div`
        background-color:blue;
        background-image: url(${({bg}) => bg});
        height: 230px;
`;

  function Header(){
    return(
      <StyleHeader>
        {/* <img src="banner"/> */}
        <StyledBanner bg={config.bg}/>
        <section className="user-info">
          <img width={376} height={190} src={`https://github.com/${config.github}.png`} alt="Imagem_github"/>
          <div>
              <h2>
                {config.name}
              </h2>
              <p>
                {config.job}
              </p>
          </div>
        </section>
      </StyleHeader>
    )
  }


export function Timeline({searchValue, ...propriedades}){
//  console.log("props ",propriedades);
  const playListNames = Object.keys(propriedades.playlists);

  return(
    <StyledTimeline>
      {playListNames.map((playListName) => {
        const videos = propriedades.playlists[playListName];
        // console.log(playListName);
        // console.log(videos);

        return (
          <section key={playListName}>
            <h2>{playListName}</h2>
            <div>
              {
                videos.filter((video) => {
                  const titleNormalized = video.title.toLowerCase();
                  const searchValueNormalized = searchValue.toLowerCase();
                  return titleNormalized.includes(searchValueNormalized)
                })
                      .map((video) => {
                  return (
                    <a key={video.url}  href={video.url}>
                      <img src={video.thumb} alt="Thumbnails"/>
                      <span key={video}>
                        {video.title}
                      </span>
                    </a>
                  )})    
              }
            </div>
          </section>
        )
      })}
    </StyledTimeline>
  )
}