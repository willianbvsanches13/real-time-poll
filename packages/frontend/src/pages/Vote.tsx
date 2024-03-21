import { useParams } from 'react-router-dom';

export function Vote(): JSX.Element {
  const { pollID } = useParams();
  return (
    <div >
      <h1>Vote</h1>
      <p>Poll ID: {pollID}</p>
      <form>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" />
        <label htmlFor="question">Question</label>
        <textarea id="question" name="question" />


        <button type="submit">Vote</button>
      </form>
    </div>
  );
}
