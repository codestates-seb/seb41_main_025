import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const ButtonForm = styled(NavLink)`
    display: grid;
    justify-content: center;
    align-items: center;
    width: 170px;
    height: 60px;
    margin-top: 120px;
    margin-left: 60px;
    background-color: #167E6C;
    border-radius: 15px;
    color: white;
    font-size: 20px;
`
//Green button 컴포넌트 분리
const GreenButton = ({ name }) => {


    return (
        <ButtonForm to='/recommend'>{name}</ButtonForm>
        // FIXME : searchNull에서 nevlink가 되지 않음
    )
}

export default GreenButton;