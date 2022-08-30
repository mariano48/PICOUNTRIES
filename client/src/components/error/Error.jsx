export default function Error({ error }) {
  console.log(error);
  return <p>{error.message}</p>;
}
