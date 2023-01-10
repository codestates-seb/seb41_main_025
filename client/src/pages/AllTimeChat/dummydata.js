const getRandomNumber = (min, max) => {
  return parseInt(Math.random() * (Number(max) - Number(min) + 2));
};

const dummy = [
  {
    id: "1",
    name: "강성심",
    nickName: "코딩천재",
    memberPicture: `https://randomuser.me/api/portraits/women/${getRandomNumber(
      1,
      98
    )}.jpg`,
    commentBody: `넷플릭스 “에밀리 파리에 가다" 추천해요!`,
  },
  {
    id: "2",
    name: "이영우",
    nickName: "코딩괴물",
    memberPicture: `https://randomuser.me/api/portraits/women/${getRandomNumber(
      1,
      98
    )}.jpg`,
    commentBody: `넷플릭스 “더 글로리" 꿀 잼`,
  },
  {
    id: "3",
    name: "장한나",
    nickName: "코딩괴물",
    memberPicture: `https://randomuser.me/api/portraits/women/${getRandomNumber(
      1,
      98
    )}.jpg`,
    commentBody: `넷플릭스 “외계+인 1부" 별로에요...`,
  },
  {
    id: "4",
    name: "강신찬",
    nickName: "코딩괴물",
    memberPicture: `https://randomuser.me/api/portraits/women/${getRandomNumber(
      1,
      98
    )}.jpg`,
    commentBody: `넷플릭스 “에밀리 파리에 가다" 추천해요!`,
  },
  {
    id: "5",
    name: "김희진",
    nickName: "코딩괴물",
    memberPicture: `https://randomuser.me/api/portraits/women/${getRandomNumber(
      1,
      98
    )}.jpg`,
    commentBody: `넷플릭스 “시스피라시” 문제작... 꼭 보세요 `,
  },
  {
    id: "6",
    name: "박금비",
    nickName: "코딩괴물",
    memberPicture: `https://randomuser.me/api/portraits/women/${getRandomNumber(
      1,
      98
    )}.jpg`,
    commentBody: `넷플릭스 “오징어 게임” 내년에 공개한데요 !`,
  },
];

export default dummy;