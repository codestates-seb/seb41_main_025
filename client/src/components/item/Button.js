import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const ButtonForm = styled(NavLink)`
    display: flex;
    justify-content: center;
    width: 170px;
    height: 60px;
    background-color: #167E6C;
    border-radius: 15px;
    color: white;
    font-size: 20px;
    margin-top: 120px;
    margin-left: 60px;


`

const GreenButton = ({name}) => {


    return (
        <ButtonForm to='/recommend'>{name}</ButtonForm>
    )
}

export default GreenButton;