import { Link } from "react-router-dom";

export default function PhotoCard({ project }) {
  return (
    <Link to={`/portfolio/${project.id}`} className="photo-card">
      <img src={project.img} alt={project.title} loading="lazy" />
      <span className="tag-badge">{project.tag}</span>
    </Link>
  );
}
