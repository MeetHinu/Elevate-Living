export default function ProcessRow({ step }) {
  return (
    <div className="process-row">
      <span className="process-num">{step.num}</span>
      <div>
        <h4>{step.title}</h4>
        <p>{step.text}</p>
      </div>
    </div>
  );
}
