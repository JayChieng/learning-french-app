import { Link } from "react-router-dom";
import "./Breadcrumb.scss";

type BreadcrumbItem = {
  label: string;
  path?: string;
};

type BreadcrumbProps = {
  current?: string;
  items?: BreadcrumbItem[];
};

function Breadcrumb({ current, items }: BreadcrumbProps) {
  const breadcrumbItems =
    items && items.length > 0
      ? items
      : [
          { label: "Home", path: "/dashboard" },
          ...(current ? [{ label: current }] : []),
        ];

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1;

        return (
          <span key={`${item.label}-${index}`} className="breadcrumb__item">
            {item.path && !isLast ? (
              <Link to={item.path}>{item.label}</Link>
            ) : (
              <span>{item.label}</span>
            )}

            {!isLast && <span className="breadcrumb__separator">›</span>}
          </span>
        );
      })}
    </nav>
  );
}

export default Breadcrumb;