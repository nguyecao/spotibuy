import styled from "@emotion/styled";
import OrderSummary from "./orderSummary";

const CartContainer = styled.div`
    .line {
        height: 1px;
        background-color: white;
    }
`

export default function Cart() {

    return (
        <CartContainer>
            <OrderSummary/>
        </CartContainer>
    )
}
