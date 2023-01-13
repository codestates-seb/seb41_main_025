import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 40px;

  h2.title {
    margin-bottom: 14px;
  }
  /* .items {
    display: flex;
    overflow: hidden;
  } */

  .item {
    margin-right: 30px;
  }
`;

export const defaultButtonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: calc(50% - 30px);
  translate: (-50%, -50%);
  padding: 0;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 100%;
  background: #d9d9d9;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

export const PrevButton = styled.button`
  ${defaultButtonStyle}
  left: -1.5%;
`;

export const NextButton = styled.button`
  ${defaultButtonStyle}
  right: 0;
`;
