import { useNavigate } from "react-router-dom";
  
function Login() {
  let navigate = useNavigate();
  return (
    <div>
      <LoginForm
        onSubmit={() => {
          navigate('/user/dashboard');
        }}
      />
    </div>
  );
}
export default Login