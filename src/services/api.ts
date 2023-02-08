import axios from 'axios';
import { APP_API_URL } from 'react-native-dotenv';

const api = axios.create({
  baseURL:
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      ? 'http://192.168.1.88:3333'
      : APP_API_URL,
});

export default api;
