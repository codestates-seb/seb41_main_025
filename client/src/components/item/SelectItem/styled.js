import styled from "styled-components";
import { NavLink } from 'react-router-dom'

export const Details = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
`

export const DeleteBtn = styled.button`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    color: #167E6C;
    border: 0ch;
    :active {
        background-color: #167E6C;
        color : white
    }
`

export const DetailFont = styled.div`
  margin: 5px;
`
export const EachItem = styled.div `
    margin: 70px 90px 90px 90px;
    .poster {
        width: 300px;
        height: 350px;
        border-radius: 40px;
    }
    `;

export const MovieTitle = styled(NavLink)`
  font-size: 25px;
  color: black;
`;
