import { Link } from 'react-router-dom';
export function Home(): JSX.Element {
  return (
    <div>
      <Link to="/poll/new" style={{ fontSize: 40 }} >
        <button style={{ fontSize: 40 }} >Create New Poll</button>

      </Link>
    </div>
  );
}
