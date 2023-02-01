import * as S from "./styled";

const Error = () => {

return (
    <S.Error>
        <S.ErrorText>
        <img src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg" alt="404"/>
        <span>404 error</span>
        <p className="p-a">): Whoops </p>
        <p className="p-b">It seems like we couldn't find the page you were looking for</p>
        <a href='/' className="back">HOME</a>
        </S.ErrorText>
    </S.Error>

)}

export default Error;