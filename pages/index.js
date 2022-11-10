import config from "./config.json";
import styled from "styled-components";

import React from 'react';
import Menu from "./src/components/Menu";
import { StyledTimeline } from "./src/components/Timeline"

function HomePage() {
  const [valorDoFiltro, setValorDoFiltro] = React.useState("");
  
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
          <img src={`https://github.com/${config.github}.png`}/>
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
                  const searchValueNormalized = video.title.toLowerCase();
                  return titleNormalized.includes(searchValueNormalized)
                })
                      .map((video) => {
                  return (
                    <a key={video.url}  href={video.url}>
                      <img src={video.thumb} />
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