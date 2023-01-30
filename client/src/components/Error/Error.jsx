import * as S from "./styled";

const Error = () => {

return (
    <S.Error>
        <S.ErrorText>
        <img src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg" alt="404"/>
        <span>404 error</span>
        <p class="p-a">): Whoops </p>
        <p class="p-b">It seems like we couldn't find the page you were looking for</p>
        {/* <a href='#' class="back">dd</a> */}
        </S.ErrorText>
    </S.Error>

)}

export default Error;