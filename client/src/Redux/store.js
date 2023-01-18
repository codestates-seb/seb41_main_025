import { Reducer } from './redicers'
import {createStore} from 'redux'

//컴포넌트의 상태를 관리하는 저장소 ( 하나의 프로젝트에서는 하나의 스토어만 가질 수 있다 )
const store = createStore(Reducer);

export default store;