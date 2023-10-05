
/** ErrorAlert: presents errors
 *
 * props:
 * - errors: [{ status, message }, ...]
 *
 * { SignupForm, LoginForm, UserProfile }->FormAlert
 */
function ErrorAlert({ errors }) {

  return (
    <div className="ErrorAlert">
      {errors.map(e => <p>{e.message}</p>)}
    </div>
  );
}

export default ErrorAlert;
