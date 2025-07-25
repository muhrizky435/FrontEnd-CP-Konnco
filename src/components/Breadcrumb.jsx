import { useLocation, useParams } from "react-router-dom";

const useBreadcrumb = (title = "") => {
  const location = useLocation();
  const { id } = useParams();
  const pathParts = location.pathname.split("/").filter(Boolean);

  return pathParts.map((part, idx) => {
    const isLast = idx === pathParts.length - 1;
    let label = part.replaceAll(" ").replaceAll("_", " ");

    if (id && title && part === id) {
      label = `${title.toLowerCase().replaceAll(" ", "-")}-${id}`;
    }

    return (
      <span
        key={idx}
        className={`${
          isLast ? "text-orange-500 font-semibold" : "text-gray-400"
        }`}
      >
        {idx > 0 && " / "}
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </span>
    );
  });
};

export default useBreadcrumb;
