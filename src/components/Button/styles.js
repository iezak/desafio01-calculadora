import styled from 'styled-components';

export const ButtonConteiner = styled.button`
    padding: 20px;
    border: 1px solid #EAEAEA;
    background-color: #FC4C02;
    color: #ffffff;

    font-size: 24px;
    font-weight: 700;

    box-sizing: border-box;
    width: ${({ $size }) => `${(($size || 1) / 4) * 100}%`};

    &:hover {
        opacity: 0.8;
    }
`;