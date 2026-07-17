export default function PhotoCard({ project }) {
  return (
    <div className="photo-card">
      <img src={project.img} alt={project.title} loading="lazy" />
      <span className="tag-badge">{project.tag}</span>
    </div>
  );
}
