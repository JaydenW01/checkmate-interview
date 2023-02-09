import {GetServerSideProps, InferGetServerSidePropsType} from "next";

export default function SignedIn({ joke }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const setup = joke.setup;
  const punchline = joke.punchline;
  return (
    <div>
      <h1>Signed In</h1>
      {/* Task 3: Your own presentation of the joke here (Free Style 😉 )*/}
      <h2>{setup}</h2>
      <h3>{punchline}</h3>
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