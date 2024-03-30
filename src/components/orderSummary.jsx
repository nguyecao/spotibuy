import styled from "@emotion/styled"

const OrderSummaryContainer = styled.div`
    background-color: #212121;
    width: 430px;
    form {
        display: flex;
        flex-direction: column;
    }
    form > * {
        margin-left: 20px;
        margin-right: 20px;
    }
    button {
        background-color: #535353;
        border: none;
        color: white;
        margin: 0;
        font-size: 32px;
        font-weight: bold;
        padding: 20px;
        cursor: pointer;
    }
    button:hover {
        background-color: #1db954;
    }
    .summaryItem {
        display: flex;
        margin-bottom: 10px;
    }
    .price {
        margin-left: auto;
    }
    .acknowledgement {
        display: flex;
    }
    label {
        color: #B3B3B3;
        display: flex;
    }
`

export default function OrderSummary() {

    return (
        <OrderSummaryContainer>
            <form onSubmit={ e => {
                e.preventDefault()
            }}>
                <h3>Order Summary</h3>
                { /* render dynamically */ <>
                    <div className='summaryItem'><span>I Forgot That You Existed</span><span className='price'>2:50</span></div>
                    <div className='summaryItem'><span>I Forgot That You Existed</span><span className='price'>2:50</span></div>
                </>}
                <div className='line'></div>
                { /* render dynamically */
                    <h3 className='summaryItem'><span>Order Total:</span><span className='price'>5:00</span></h3>
                }
                <div className='acknowledgement'>
                    <label>
                        <input type='checkbox'/>
                        <p>I understand that checking out will add a new playlist to my Spotify account.</p>
                    </label>
                </div>
                <button type='submit'>Check Out</button>
            </form>
        </OrderSummaryContainer>
    )
}
