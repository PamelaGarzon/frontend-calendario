import { useContext } from "react";
import { AuthUserContext } from "../../context";

export function Navbar() {
  const { userId } = useContext(AuthUserContext);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <nav className="navbar bg-dark border-bottom border-body">
      <div className="container-fluid">
        <div className="d-flex w-100  justify-content-between align-items-center">
          <a className="navbar-brand text-light" href="#">
            Event Calendar
          </a>
          {userId ? (
            <button className="btn btn-dark " onClick={handleLogout}>
              Logout
            </button>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
