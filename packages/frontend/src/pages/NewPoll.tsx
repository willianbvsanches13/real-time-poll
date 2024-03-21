export function NewPoll(): JSX.Element {
  return (
    <div>
      <h1>Create New Poll</h1>
      <form>
        <div className="form-group h-full w-full flex flex-row items-center justify-between">
          <div className="left-form-group flex flex-col items-start h-full w-5/12">
            <label htmlFor="title">Title</label>
            <input className="h-10 mr-3 border-none rounded-md pl-3" type="text" id="title" name="title" />
            <label htmlFor="question">Question</label>
            <textarea className="h-24 w-72 mr-3 border-none rounded-md pl-3" id="question" name="question" />
            <label htmlFor="option1">Options</label>
            <div className="flex flex-row items-center justify-between w-full">
              <input className="h-10 mr-3 border-none rounded-md pl-3" placeholder="New Option" type="text" id="option1" name="option1" />
              <button className="px-4 py-2 border-none rounded-md bg-red-900" type="button">-</button>
              <button className="px-4 py-2 border-none rounded-md bg-blue-900 ml-1" type="button">+</button>
            </div>
            <div className="flex flex-row items-center justify-between w-full mt-2">
              <input className="h-10 mr-3 border-none rounded-md pl-3" placeholder="New Option" type="text" id="option1" name="option1" />
              <button className="px-4 py-2 border-none rounded-md bg-red-900" type="button">-</button>
              <button className="px-4 py-2 border-none rounded-md bg-blue-900 ml-1" type="button">+</button>
            </div>
          </div>
          <div className="right-form-group flex flex-col items-start h-full w-5/12">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" />
            <label htmlFor="question">Question</label>
            <textarea id="question" name="question" />
          </div>
        </div>
      </form>
    </div>
  );
}
