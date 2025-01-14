export default function Input({ label, id, error, classNames, ...props }) {
  return (
    <div className={`control ${classNames}`}>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />

      <div className="control-error">{error && <p>{error}</p>}</div>
    </div>
  );
}
