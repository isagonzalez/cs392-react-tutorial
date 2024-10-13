import "./Navigation.css";
import { signInWithGoogle, signOut, useAuthState } from "../utilities/firebase";

const SignInButton = () => <button onClick={signInWithGoogle}>Sign in</button>;

const SignOutButton = () => (
  <button className="sign-out" onClick={signOut}>
    Sign out
  </button>
);

const AuthButton = () => {
  const [user] = useAuthState();
  return user ? <SignOutButton /> : <SignInButton />;
};

const Navigation = () => (
  <div className="sign-in-btn">
    <AuthButton />
  </div>
);

export default Navigation;
