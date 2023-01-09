

{
    modal === true ? <Modal /> : null  //기계역할
}


const Modal = () => {
    return(
        <div className='modal'>
          <h4>제목</h4>
          <p>날짜</p>
          <p>상세내용</p>
        </div>
      )

}