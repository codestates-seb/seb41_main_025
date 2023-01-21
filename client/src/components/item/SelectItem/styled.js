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
  @media only screen and (max-width: ${'1200px'}) {
    font-size: 20px;
    }
`
export const EachItem = styled.div`
    margin: 70px 3% 3% 90px;
    @media only screen and (max-width: ${'1200px'}) {
      margin: 20px;
        }
    .poster {
        width: 100%;
        height: auto;
        min-width: 60%;
        border-radius: 40px;
        @media only screen and (max-width: ${'1200px'}) {
        max-height: 800px;
        max-width: 800px;
        }
        @media only screen and (max-width: ${'600px'}) {
        min-height: 300px;
        min-width: 300px;
        }

    }
    `;

export const MovieTitle = styled(NavLink)`
  font-size: 25px;
  color: black;
`;
