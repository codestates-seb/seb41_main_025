import * as S from './styled';

//Green button 컴포넌트 분리
const GreenButton = ({ name }) => {

    return (
        <S.ButtonForm >{name}</S.ButtonForm>
    )
}

export default GreenButton;