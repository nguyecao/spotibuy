import styled from "@emotion/styled"

const AboutContainer = styled.div`
    margin-left: 40px;
    max-width: 1000px;
    h1 {
        font-size: 86px;
        margin-bottom: 20px;
    }
    h2 {
        margin-top: 50px;
        margin-bottom: 0;
    }
    h3 {
        margin-bottom: 5px;

    }
    p {
        margin-top: 5px;
    }
    a {
        color: #1db954;
    }
`

export default function About() {

    return (
        <AboutContainer>
            <h1>About Spotibuy</h1>
            <p>Spotibuy lets you "shop" for music on Spotify. Its goal is to create a new way for you to interact with your Spotify music by combining the excitement of online shopping with the joy of discovering new music. Spotibuy recreates the interactions of online shopping from searching for new songs, adding to your cart, and even checking out.</p>
            <p>Spotibuy is powered by <a href='https://developer.spotify.com/' target='_blank'>Spotify's Web API</a>. It utilizes Spotify's extensive library and listening history to tailor it's experience to your taste and recommend similar music to what you regularly listen to.</p>
            <h2>FAQ</h2>
            <h3>Does it cost money?</h3>
            <p>No, Spotibuy does not and will never ask you for money. The order total that you see at check-out it just the total length (in time) of your playlist. Spotibuy aims to elicit the emotional response of online shoppping.</p>
            <h3>Is it safe/secure?</h3>
            <p>Spotibuy uses Spotify to log you in and you are as safe as logging into Spotify itself.</p>
            <h3>How are my recommendations generated?</h3>
            <p>Your recommendations are generated using your top artists and songs which are pulled from your Spotify listening history.</p>
            <h3>Other concerns, questions, or suggestions?</h3>
            <p>Feel free to send me an <a href='mailto: caoduynguyen9399@gmail.com'>email</a>!</p>
        </AboutContainer>
    )
}
