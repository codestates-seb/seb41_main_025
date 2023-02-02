import * as S from "./styled"
import Spinner from "./Spinner.svg"

const Loading = () => {
  return (
    <S.LoadingWrap>
      <img src={Spinner} alt="로딩중" />
    </S.LoadingWrap>
  )
}

export default Loading;