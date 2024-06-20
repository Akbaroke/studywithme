import axios from '@/helpers/axios';

export default async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data } = await axios.post('/users/login', {
    email,
    password,
  });
  return data;
}
