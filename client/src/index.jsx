import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //다른 창을 갔다 왔을 떄 api콜을 다시 해줄 것인지(최신화를 시켜줄 것인지)에 대한 옵션 
      refetchOnWindowFocus: false,
      //api 요청에서 error 발생 시 다시 요청을 보내 주는 옵션 (3번 정도 다시 보내 줌)
      retry: false,
      //캐시 결과를 먼저 확인하지 않고 api 요청을 보낼 것인지에 대한 옵션 
      refetchOnMount: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
        <App />
    </React.StrictMode>
  </QueryClientProvider>
);

