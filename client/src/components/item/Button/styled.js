import styled from "styled-components";
import { NavLink } from 'react-router-dom'

export const ButtonForm = styled(NavLink)`
    display: grid;
    justify-content: center;
    align-items: center;
    width: 170px;
    height: 60px;
    background-color: #4BA6B2;
    border-radius: 15px;
    color: white;
    font-size: 20px;
    @media only screen and (max-width: ${'350px'}) {
      width: 100px;
      height: 50px;
    } 
`
