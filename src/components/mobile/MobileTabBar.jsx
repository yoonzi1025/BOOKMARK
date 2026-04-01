import { useLocation, useNavigate } from "react-router-dom";
import "./MobileTabBar.css";
import { MOBILE_TAB_OPTIONS } from "../../constants/option";

const MobileTabBar = () => {
  const nav = useNavigate();
  const pathname = useLocation().pathname;

  const isActive = (path) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <nav className="mobile-tabbar">
      {MOBILE_TAB_OPTIONS.map((tab) => {
        const active = isActive(tab.path);
        const Icon = tab.icon;
        return (
          <button
            key={tab.key}
            type="button"
            className={`mobile-tabbar-item ${active ? "active" : ""}`}
            onClick={() => nav(tab.path)}
          >
            <span className="mobile-tabbar-icon">
              <Icon />
            </span>
            <span className="mobile-tabbar-label">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default MobileTabBar;
