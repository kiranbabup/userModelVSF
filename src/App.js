import './App.css';
import CustomeRoutes from './CustomRoutes';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <div>
      <GoogleOAuthProvider clientId="81986630180-f8kuv63ekpo10blsqrmh6ttbjoqkuhrv.apps.googleusercontent.com">
        <CustomeRoutes />
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
