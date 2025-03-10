import { use } from 'react';
import { OpinionsContext } from '../store/opinions-context';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext);

  const [formState, formAction] = useActionState(handleSubmit, {
    errors: null,
  });

  async function handleSubmit(currentState, formData) {
    const userName = formData.get('userName');
    const title = formData.get('title');
    const body = formData.get('body');

    const errors = [];

    if (!userName.trim()) {
      errors.push('Please enter your name.');
    }

    if (title.trim().length < 5) {
      errors.push('Title must be at least five characters long.');
    }

    if (body.trim().length < 10) {
      errors.push('Opinion must be 10 and 300 characters long.');
    }

    if (errors.length > 0) {
      return {
        errors,
        enteredValues: {
          userName,
          title,
          body,
        },
      };
    }

    await addOpinion({ userName, title, body });
    return { errors: null };
  }

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValues?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValues?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            defaultValue={formState.enteredValues?.body}
            rows={5}
          ></textarea>
        </p>

        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        {/* <p className="actions">
          <button type="submit">Submit</button>
        </p> */}

        <Submit />
      </form>
    </div>
  );
}

function Submit() {
  const { pending } = useFormStatus();

  return (
    <p className="actions">
      <button type="submit" disabled={pending}>
        {pending ? 'Submitting...' : 'Submit'}
      </button>
    </p>
  );
}
