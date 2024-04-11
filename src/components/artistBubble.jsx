import styled from '@emotion/styled'

const ArtistBubbleContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 20px;
    margin-bottom: 20px;
    .artistPic, p {
        margin: auto;
    }
    .artistPic {
        width: 160px;
        height: 160px;
        overflow: hidden;
        border-radius: 50%;
        margin-bottom: 5px;
    }
    img {
        width: 100%;
    }
    p {
        font-weight: bold;
    }
`

export default function ArtistBubble({name, pictureUrl}) {
    return(
        <ArtistBubbleContainer>
            <div className='artistPic'>
                <img src={pictureUrl}/>
            </div>
            <p>{name}</p>
        </ArtistBubbleContainer>
    )
}