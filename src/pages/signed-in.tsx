import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {useRouter} from "next/router";

export default function SignedIn({ joke }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const username = router.query.name;
  const setup = joke.setup;
  const punchline = joke.punchline;
  const refreshpage = () => {
    window.location.reload();
  }
  return (
    <div>
    {/* Task 3: Your own presentation of the joke here (Free Style 😉 )*/}
      <h1>Signed In</h1>
      <h2><i>Welcome {username}!</i></h2>
      <div className="container">
        <p className="joke-setup"><i>{setup}</i></p>
        <p className="joke-punchline"><b>{punchline}</b></p>
        <div className="button-container">
          <button className="button" onClick={refreshpage}>New joke~ </button>
        </div>
      </div>
    {/* End of Task 3 */}
    </div>
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