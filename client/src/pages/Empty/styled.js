import styled from 'styled-components'


export const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 60px 0px;
  height: 80vh;
  @media only screen and (max-width: ${"300px"}) {
    display: grid;
    height: 150vh;
  }
`;
