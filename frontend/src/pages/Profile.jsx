import { NavLink } from "react-router-dom";
import NavBar from "../compoenets/NavBar";
import Header from "../compoenets/Header";
import { useAuthStore } from "../store/authStore";

export default function Profile() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <NavBar />

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <Header
          title={user ? user.name : "Profile"}
          description="Profile Details"
          button={
            <NavLink className="create-btn" to="/profile/update">
              Update Profile
            </NavLink>
          }
        />

        <section className="users-table-section">
          <div className="card">
            {user ? (
              <table className="detail-table">
                <tbody>
                  <tr>
                    <td>
                      <b>Id: </b>
                    </td>
                    <td>{user.id}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Name: </b>
                    </td>
                    <td>
                      {user.firstName} {user.lastName}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Email: </b>
                    </td>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Role: </b>
                    </td>
                    <td>{user.globalRole?.name}</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <h1>Profile Not Found</h1>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
