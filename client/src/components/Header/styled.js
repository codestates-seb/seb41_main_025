import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const HeaderWrap = styled.div`
    position: fixed;
    width: 100%;
    height: 60px;
    color : #d0d0d0;
    border-bottom: 1px solid #d0d0d0;
    background: white;
    z-index: 10;
    @media only screen and (max-width: ${'350px'}) {
        height: 50px;
        max-width: 350px;
    }

`
export const HeaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 1440px;
    height: 60px;
    margin: 0 auto;
    @media only screen and (max-width: ${'350px'}) {
        margin: 0 0;
    }

    .logo {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex: 1;
        margin-left: 20px;
        a {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 120px;
            height: 60px;
            img { width: 100% };
            @media only screen and (max-width: ${'700px'}) {
            max-width: 40%;
            min-width: 100px;
            height: auto;
            }
            @media only screen and (max-width: ${'350px'}) {
            min-width: 60px;
            height: 40px;
            margin-right: 0;
            }
        } 
    }
`

export const SearchBar = styled.div`
    position: relative;
    input {
        width: 512px;
        height: 40px;
        padding-left: 15px;
        border: 1px solid #e5e5e5;
        border-radius: 15px;
        @media only screen and (max-width: ${'700px'}) {
        margin-left: 10px;
        /* max-width: 512px; */
        width: 300px;
        height: 40px;
        } 
        @media only screen and (max-width: ${'350px'}) {
        margin-left: -120px;
        width: 90px;
        height: 30px;
        } 

    }
    input:focus { outline: none; } /* outline 테두리 없애기 */
`;

export const SearchIcon = styled.button`
    position: absolute;
    top: 50%;
    right: 0%;
    transform: translate(-50%,-50%);
    color: #7e7e7e;
    border: 0;
    background-color: white;
    cursor: pointer;
    @media only screen and (max-width: ${'350px'}) {
        top: 50%;
        right: 50%;
        transform: translate(0%,-50%);
    }
`;


export const Sign = styled.ul`
    display: flex;
    justify-content: flex-end;
    position: relative;
    min-width: 150px;
    padding-left: 10px;
    margin: 30px;
    @media only screen and (max-width: ${'350px'}) {
        padding: 0;
        min-width: 100px;
    }
    a {
        font-weight: bold;
        font-size : 16px;
        color: #7E7E7E;
        @media only screen and (max-width: ${'350px'}) {
        width: 0;
        height: 0;
    }
    }

    .signUp {
        margin-left: 24px;
        @media only screen and (max-width: ${'350px'}) {
        width: 0;
        height: 0;
    }
    }

    .modal {
        width: 90px;
        height: 30px;
        margin: 15px;
        background-color: white;
        border: 0;
        font-weight: bold;
        font-size : 16px;
        font-weight: 500;
        cursor: pointer;
        @media only screen and (max-width: ${'350px'}) {
        font-size: 13px;
    }
    }

    .flexEnd {
        display: flex;
        justify-content: flex-end;
    }
`;

export const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    width: 250px;
    height: 300px;
    top: calc(0% + 60px);
    background-color: aliceblue;
    border-radius: 20px 0px 20px 20px;
    z-index: 10;
    @media only screen and (max-width: ${'350px'}) {
    width: 200px;
    height: 250px;
    }

    h5 {
        text-align: end;
        padding: 0px 20px; 
    }
`;

export const NevFont = styled(NavLink)`
    padding: 20px;
    @media only screen and (max-width: ${'350px'}) {
    font-size: 10px;
    }
`;

export const LogoutButton = styled.button`
    font-size: 15px;
    color: gray;
    border: 0;
    cursor: pointer;
    height: 30px;
    :active{
        background-color: aliceblue;
    }
`;