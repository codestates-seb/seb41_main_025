import styled from "styled-components";

export const CommentBoxDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 5px ;
  .commentToggleInput{
    width: 100%;
    margin-bottom: 10px;
    padding: 5px;
    font-size: 17px;
    border: 1px solid #D9D9D9;
    border-radius: 5px;
    outline: none;
  }

`;

export const InputButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: #4BA6B2;
  color: #FFFFFF;
  border: none;
  border-radius: 5px;
  margin-right: 5px;
  cursor: pointer;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;


`;
