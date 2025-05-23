import axiosInstance from './axiosInstance';
import { SignUpRequest, SignInRequest } from '@/types/auth';

interface KakaoSignUpResponse {
  redirectUri: string;
  token: string;
  nickname: string;
}
const PROVIDER = 'kakao';

export const Signup = async (data: SignUpRequest): Promise<SignUpRequest> => {
  try {
    const response = await axiosInstance.post<SignUpRequest>(`/auth/signup`, data);
    return response.data;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

export const Login = async (
  teamId: string,
  formData: SignInRequest,
): Promise<{ accessToken: string }> => {
  try {
    const response = await axiosInstance.post<{ accessToken: string }>(`/auth/signIn`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const KakaoSignUp = async (data: KakaoSignUpResponse) => {
  const url = `/auth/signUp/${PROVIDER}`;
  console.log('🔍 요청 URL:', url);
  console.log('📦 요청 데이터:', data);
  const response = await axiosInstance.post(url, data);
  return response.data;
};

export const kakaoLogin = async (code: string) => {
  const response = await axiosInstance.post(`/auth/signIn/${PROVIDER}`, {
    code,
  });
  return response.data;
};
