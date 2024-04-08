import styled from "@emotion/styled";
import OrderSummary from "./orderSummary";
import CartList from "./cartList";

const CartContainer = styled.div`
    display: flex;
    .line {
        height: 1px;
        background-color: white;
    }
    margin: auto;
`

export default function Cart() {
    return (
        <CartContainer>
            <div>
                <CartList/>
            </div>
            <div>
                <OrderSummary/>
            </div>
        </CartContainer>
    )
}
