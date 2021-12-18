import axios from 'axios'

// 사용자 추가를 위한 엔드포인트를 baseURL로 등록한다
const instance = axios.create({
  baseURL: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
})

// 커스텀 헤더 설정은 제거한다
// instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance