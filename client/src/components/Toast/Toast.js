import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  // const notify = () => toast.info("toastify test!");
  // // 성공 알람 ( 초록색 창 )
  // const success = () => toast.success("Success!");
  // // 실패 알람 ( 빨간색 창 )
  // const error = () => toast.error("Error!");
  // // 경고 알람 ( 노란색 창 )
  // const warning = () => toast.warning("Warnning!");
  // // 정보 알람
  // const info = () => toast.info("Info...");
  return (
    <ToastContainer
      position="top-right" // 알람 위치 지정
      autoClose={3000} // 자동 off 시간
      // hideProgressBar={false} // 진행시간바 숨김
      closeOnClick // 클릭으로 알람 닫기
      // rtl={false} // 알림 좌우 반전
      pauseOnFocusLoss // 화면을 벗어나면 알람 정지
      draggable // 드래그 가능
      pauseOnHover // 마우스를 올리면 알람 정지
      theme="light"
      limit={1} // 알람 개수 제한
      style={{ fontSize: 13 }}
    />
  );
};

export default Toast;
