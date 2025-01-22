export default function Input({ label, id, required = 'true', ...props }) {
  return (
    <div className="control">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} required={required} {...props} />
    </div>
  );
}
