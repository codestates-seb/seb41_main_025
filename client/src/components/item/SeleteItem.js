import styled from "styled-components";
import { NavLink } from 'react-router-dom'

const Details = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
`

const DeleteBtn = styled.button`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    color: #167E6C;
    border: 0ch;
    :active {
        background-color: #167E6C;
        color : white
    }
`

const DetailFont = styled.div`
  margin: 5px;
`
const EachItem = styled.div `
    margin: 70px 90px 90px 90px;
    .poster {
        width: 300px;
        height: 350px;
        border-radius: 40px;
    }
    `;

const MovieTitle = styled(NavLink)`
  font-size: 25px;
  color: black;
`;

const Item = () => {
  return (
    <EachItem>
    <img src ='/assets/avatar2.jpeg' className='poster' alt="" />
      <Details>
        <DetailFont>
          <MovieTitle to ='/Moviedetail'>Avatar 2 : 물의 길</MovieTitle>
          <h3 className="movieTitle">미국, 2022</h3>
          <h4 className="movieTitle">평점 : 8.4</h4>
        </DetailFont>
      <DeleteBtn>X
      </DeleteBtn>
      </Details>
    </EachItem>
  )
}
export default Item;

