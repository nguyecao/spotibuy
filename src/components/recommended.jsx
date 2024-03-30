import styled from "@emotion/styled"
import SongCard from "./songCard"

const RecommendedContainer = styled.div`
`

export default function Recommended() {

    return (
        <RecommendedContainer>
            <h2>Recommended Artists</h2>
            <h2>Recommended Songs</h2>
            { <SongCard/> /* render dynamically */ }
        </RecommendedContainer>
    )
}
