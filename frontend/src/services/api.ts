import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

// Adding token to each request if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const signIn = (formData: any) => API.post('/user/signin', formData);
export const signUp = (formData: any) => API.post('/user/signup', formData);

export const createTest = (testData: any) => API.post('/test', testData);
export const getTests = () => API.get('/test');
export const getTestById = (id: string) => API.get(`/test/${id}`);
export const submitTest = (submissionData: any) => API.post('/submission', submissionData);
export const getSubmissions = (testId: string) => API.get(`/submission/${testId}`);
export const evaluateSubmission = (submissionId: string, evaluationData: any) => API.post(`/submission/${submissionId}/evaluate`, evaluationData);
export const getQuestionById = (testId: string) => API.get(`/question/${testId}`);
