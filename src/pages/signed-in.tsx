import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {useRouter} from "next/router";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { useState, useEffect } from "react";

const firebaseConfig = {
  // Enter your own firebase config here
  apiKey: "AIzaSyBIpbFpNhjCj9d8_aS9JfSKoOaFfTRBWkI",
  authDomain: "checkmate-interview-jw.firebaseapp.com",
  projectId: "checkmate-interview-jw",
  storageBucket: "checkmate-interview-jw.appspot.com",
  messagingSenderId: "878090110464",
  appId: "1:878090110464:web:b09acac6e8a7dd08873ae5"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export default function SignedIn({ joke }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [welcome_msg,setwelcome_msg] = useState("");
  const [loggedin,setLoggedin] = useState("loading");
  const router = useRouter();
  useEffect(()=>{
    onAuthStateChanged(auth,function(user) {
      if (user) {
        // User is signed in.
        // console.log("Logged In! " + user.displayName);
        setwelcome_msg(`Welcome ${user.displayName} !`);
        setLoggedin('true');
      } else {
        // User is not signed in (maybe access the page by URL instead of being redirected)
        // console.log("Not logged in");
        setwelcome_msg("You are not logged in!");
        setLoggedin('false');
      }
    });
  },[])
  
  const signout = ()=>{
    signOut(auth).then(()=>{
      // console.log('Signed out successfully');
      router.push({
        pathname: './'
      });
    }).catch((error)=>{console.log(error)})
  }

  const setup = joke.setup;
  const punchline = joke.punchline;
  const refreshpage = () => {
    window.location.reload();
  }
  return (
    <>
      {
      loggedin === 'loading' ? (<div className="loading_container"><h3>Loading</h3></div>)
      :
      loggedin === 'true' ? (
        <div>
          {/* Task 3: Your own presentation of the joke here (Free Style 😉 )*/}
          <h1>Signed In</h1>
          <h2><i>{welcome_msg}</i></h2>
          <div className="container">
          <p className="joke-setup"><i>{setup}</i></p>
          <p className="joke-punchline"><b>{punchline}</b></p>
          <div className="button-container">
            <button className="button" onClick={refreshpage}>New joke~ </button>
            <button className="logout_button" onClick={signout}>Log Out</button>
          </div>
          {/* End of Task 3 */}
        </div>
          
        </div>
      ):
      (
        <div className="container">
          <h1>{welcome_msg}</h1>
          <h2>This page is only for signed-in user</h2>
          <h3>Please go back to the home page and sign in.</h3>
          <a href="/">Click me to go back to Home page!</a>
        </div>
      )}
    </>
  )

}

// Task 2: Fetch random jokes from the API
// https://official-joke-api.appspot.com/jokes/programming/random
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API and pass it to the page via props.joke
  const response = await (await fetch('https://official-joke-api.appspot.com/jokes/programming/random')).json();
  const setup = response[0].setup;
  const punchline = response[0].punchline;
  return {
    props: {
      joke: {
        setup: setup,
        punchline: punchline,
      }
    }, // will be passed to the page component as props
  }
}