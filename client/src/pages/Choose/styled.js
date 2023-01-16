import styled from "styled-components";

export const Items = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 20px;

  @media only screen and (max-width: ${'600px'}) {
    width: 100%;
    height: 100%;
    display: grid;
  } 
`;

// const Title = styled(MainContainer)`
//   width: 500px;
//   height: 100px;
//   margin: 100px; 
//   .title {
//     font-size: 30px;
//     text-decoration: underline #167e6c;
//     text-decoration-thickness: 4px;
//     text-underline-offset: 20px;
//     @media only screen and (max-width: ${'600px'}) {
//       font-size: 25px;
//     }
//   } 
//   @media only screen and (max-width: ${'600px'}) {
//     margin: 60px 0 -20px -120px;
//     width: 400px;
//   height: 100px;
// }
// `;

export const Item = styled.div`
  margin: 70px 90px 90px 60px;
  .poster {
    width: 300px;
    height: 350px;
    border-radius: 40px;
  }
  .movieTitle {
    margin: 10px 0 0 20px;
  }
`;

export const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

export const DeleteBtn = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  color: #167e6c;
  border: 0ch;
  :active {
    background-color: #167e6c;
    color: white;
  }
`;

export const DetailFont = styled.div``;