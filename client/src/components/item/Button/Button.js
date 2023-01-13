import * as S from './styled';

//Green button 컴포넌트 분리
const GreenButton = ({ name }) => {

    return (
        <S.ButtonForm >{name}</S.ButtonForm>
        // FIXME : searchNull에서 nevlink가 되지 않음
    )
}

export default GreenButton;