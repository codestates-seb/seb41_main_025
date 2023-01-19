import styled from "styled-components";

export const Wrap = styled.div`
  width: 100%;
  padding-top: 60px;

  .active {
    height:100vh
  }
`

export const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 60px;
`

export const Result = styled.div`
  margin-bottom: 60px;
`

export const ItemList = styled.div`
  display: flex;
  flex-wrap: wrap;

  a { 
    margin-right: 30px;
    margin-bottom: 30px;
  }
  /* a:nth-child(5n) { margin-right: 0px; } */
`