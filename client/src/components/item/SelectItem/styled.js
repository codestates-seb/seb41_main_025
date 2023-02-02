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
  @media only screen and (max-width: ${'700px'}) {
    font-size: 20px;
    }
  @media only screen and (max-width: ${'350px'}) {
    font-size: 15px;
    }
`
export const EachItem = styled.div`
  margin: 30px 15px;
  display: flex;
  position: relative;
  flex-direction: column;

    @media only screen and (max-width: ${'700px'}) {
      margin: 20px;
        }
    @media only screen and (max-width: ${'350px'}) {
    margin: 20px 0 10px -40px;
  } 
    .poster {
        /* width: 100%; */
        height: 100%;
        width: 250px;
        border-radius: 40px;
        @media only screen and (max-width: ${'700px'}) {
        max-height: 800px;
        max-width: 800px;
        }
        @media only screen and (max-width: ${'350px'}) {
        height: 200px;
        width: 150px;
        }

    }
    `;

export const MovieTitle = styled(NavLink)`
  font-size: 20px;
  color: black;
  width: 20px;
  overflow: hidden;
  @media only screen and (max-width: ${'350px'}) {
    font-size: 15px;
    }
`;
