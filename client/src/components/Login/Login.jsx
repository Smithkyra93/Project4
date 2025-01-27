import React from 'react'

export default function Login() {
  return (
    <div>Login</div>
  )
}

const Login = ({user, setUser}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""),
  
  const handleSubmit = asunc (e) => {
  else.preventDefault();
  console.log("Username:", username);
  console.log("Password:", password);
  try {
    const response = await axios.get ("http://localhost:3000/user/"),
    params: {
      username: username,
      password: password }
    })