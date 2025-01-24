import { AuthContext } from "../context/authContext";
import "./Auth.css";
import { useRef, useState, useContext } from "react";

const AuthPage = () => {
  // two way binding: manage state and bind the values of input to that state and listen to
  // the change event on that
  // or use refs references
  /** old way class based  */
  /*constructor(props){
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  } */

  // toggle between login and signup
  const [isLogin, setIsLogin] = useState(true);

  const authContext = useContext(AuthContext); // access to this AuthContext

  const emailEl = useRef(null);
  const pwEl = useRef(null);

  const switchModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const email = emailEl.current.value;
    const password = pwEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }
    console.log(email, password);

    // ..request to backend
    // you can use axios or any other library for sending http request in react app
    let requestBody = {
      query: `
        query{
          login(email: "${email}", password: "${password}"){
            userId
            token
            tokenExpiration
          }
        }
      `,
    };
    if (!isLogin) {
      requestBody = {
        query: `
      mutation {
        createUser(userInput: {email: "${email}", password: "${password}"}){
          _id
          email 
        }
      }
      `,
      };
    }
    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed");
        }
        return res.json();
      })
      .then((resData) => {
        // if login will have token if(isLogin)
        if (resData.data.login.token) {
          authContext.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
          );
        }
        // get token here
        console.log(resData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className="auth-form" onSubmit={submitHandler}>
      <div className="form-control">
        <label htmlFor="email"> E-mail: </label>
        <input type="email" id="email" ref={emailEl} />
      </div>
      <div className="form-control">
        <label htmlFor="password" className="password">
          Password:
        </label>
        <input type="password" className="password" ref={pwEl} />
      </div>
      <div className="form-actions">
        <button type="submit">Submit</button>
        <button type="button" onClick={switchModeHandler}>
          Switch to {isLogin ? "Signup" : "Login"}
        </button>
      </div>
    </form>
  );
};

export default AuthPage;
