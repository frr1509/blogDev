import styled from "styled-components";
import { H2 } from "../H2/h2";

const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
export const Error = ({ error }) =>
    error && (
        <Div>
            <H2>Ошибка</H2>
            <div>{error}</div>
        </Div>
    );
