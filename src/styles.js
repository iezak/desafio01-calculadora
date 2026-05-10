import styled from 'styled-components';

export const Conteiner = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #CACACA;

    display: flex;
    align-items: center;
    justify-content: center;
`

export const Content = styled.div`
    background-color: #ffffff;
    width: 50%;
    min-height: 350px;
`

export const Row = styled.div`
    display: flex;
    width: 100%;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`