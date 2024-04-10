import styled from "@emotion/styled";
import OrderSummary from "./orderSummary";
import CartList from "./cartList";

const CartContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    .line {
        height: 1px;
        background-color: white;
    }
    .cartListContainer {
        max-width: 1000px;
        min-width: 500px;
        width: 100%;
    }
`

export default function Cart() {
    return (
        <CartContainer>
            <div className='cartListContainer'> {/* div for styling purposes */}
                <CartList/>
            </div>
            <div className='orderSummaryContainer'> {/* div for styling purposes */}
                <OrderSummary/>
            </div>
        </CartContainer>
    )
}
