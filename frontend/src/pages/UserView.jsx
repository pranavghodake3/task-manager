import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import Header from "../compoenets/Header";
import NavBar from "../compoenets/NavBar";
import { NavLink, useParams } from "react-router-dom";
import { formatDate } from "../util";

export default function UserView() {
    const AuthContextData = useContext(AuthContext);
    const { id } = useParams();
    const [user, setUser] = useState({});
    useEffect(() => {
        async function loadUser() {
            const response = await api.get('/users/'+id, {
                headers: {
                    Authorization: `Bearer ${AuthContextData.accessToken}`
                }
            });
            setUser(response.data.data);
        }
        loadUser();
    }, [AuthContextData.accessToken, id]);
    return (
        <div className="dashboard">
            {/* Sidebar */}
            <NavBar />

            {/* Main Content */}
            <main className="main-content">
                {/* Header */}
                <Header title={user ? user.name : 'User'} description='User Details' button={
                    <NavLink className='create-btn' to='/users'>Back</NavLink>
                } />
                

                {/* Users Table */}
                <section className="users-table-section">
          <div className="card">
                { user ? 
                    <table className="projects-table">
                        <tbody>
                            <tr>
                                <td><b>Id: </b></td>
                                <td>{user.id}</td>
                            </tr>
                            <tr>
                                <td><b>Name: </b></td>
                                <td>{user.firstName} {user.lastName}</td>
                            </tr>
                            <tr>
                                <td><b>Email: </b></td>
                                <td>{user.email}</td>
                            </tr>
                            <tr>
                                <td><b>Role: </b></td>
                                <td>{user.roleInfo?.name}</td>
                            </tr>
                            <tr>
                                <td><b>Created At:</b></td>
                                <td>{formatDate(user.createdAt, 'DD-MMM-YYYY')}</td>
                            </tr>
                        </tbody>
                    </table>
                 : <h1>User Not Found</h1>}
                 </div>
                 </section>
                
            </main>
        </div>
    );
};
