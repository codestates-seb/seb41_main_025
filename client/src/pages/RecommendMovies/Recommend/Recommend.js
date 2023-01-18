import SeleteItem from "../../../components/item/SelectItem/SeleteItem";
import * as S from "./styled"

const Recommend = () => {
    return(
    <S.Items>
        {/*TODO: 추천 값이 true인 것들을 filter 해서 뿌려주기 */}
        <SeleteItem />
        <SeleteItem />
        <SeleteItem />
    </S.Items>
    // <S.ContentList>
    //   {dummy.map((item) => {
    //     return (
    //       <S.ContentItem key={item.id}>
    //         <div className="userInfo">
    //           <img
    //             src={item.memberPicture}
    //             className="memberPicture"
    //             alt="사용자 이미지"
    //             style={{}}
    //           ></img>
    //           {item.name}
    //         </div>
    //         <div className="content">{item.commentBody}</div>
    //       </S.ContentItem>
    //     );
    //   })}
    // </S.ContentList>
  );

}
    export default Recommend