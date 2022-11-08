import config from "./config.json";
import styled from "styled-components";
import { CSSReset } from "./src/components/CSSReset";
import React from "react";
import Menu from "./src/components/Menu";
import { StyledTimeline } from "./src/components/Timeline"

function HomePage() {
    return (
    <React.Fragment>
      <CSSReset />
        <div>
          <Menu />
          <Header/>
          <Timeline playlists={config.playlists}/>
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
    img{
      width:80px;
      height: 80px;
      border-radius:50%;
    }
    .user-info{
      margin-top: 50px;
      display: flex;
      align-items: center;
      width: 100%;
      padding: 16px 32px;
      gap: 16px;
    }
  `;

  function Header(){
    return(
      <StyleHeader>
        {/* <img src="banner"/> */}

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


  function Timeline(props){
    //console.log("Dentro do Componente TimeLine", props.playlists)
    const playListNames = Object.keys(props.playlists);

    return(
      <StyledTimeline>
        {playListNames.map((playListName) => {
          const videos = props.playlists[playListName];
          console.log(playListName);
          console.log(videos);

          return (
            <section>
              <h2>{playListName}</h2>
              <div>
                {
                  videos.map((video) => {
                    return (
                      <a href={video.url}>
                        <img src={video.thumb} />
                        <span key={video}>
                          {video.title}
                        </span>
                      </a>
                    )
                    })
        
                }
              </div>
            </section>
          )
        })}
      </StyledTimeline>
    )
  }