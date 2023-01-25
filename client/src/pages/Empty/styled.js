import styled from 'styled-components'


export const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 60px 0px;
  height: 80vh;
  @media only screen and (max-width: ${"350px"}) {
    font-size: 15px;
    width: 150px;
    padding: 0px 0px 0px;
    height: 50vh;
  }
`;
