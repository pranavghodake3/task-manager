import { useContext, useEffect, useState } from "react";
import Header from "../compoenets/Header";
import NavBar from "../compoenets/NavBar";
import UserCreateEditForm from "../compoenets/UserCreateEditForm";
import { AuthContext } from "../context/AuthContext";
import { NavLink, useParams } from "react-router-dom";
import api from "../services/api";

export default function UserEdit() {
    const AuthContextData = useContext(AuthContext);
    const [user, setUser] = useState({});
    const { id } = useParams();
    useEffect(() => {
        async function getUser() {
            try {
                const response = await api.get(`/users/${id}`, { headers: {
                    Authorization: `Bearer ${AuthContextData.accessToken}`
                }});
                setUser(response.data.data);
            } catch (error) {
                console.log('Error in edit page: ', error);
            }
        }
        getUser();
    }, [AuthContextData.accessToken, id]);
    return (
                <div className="dashboard">
                    {/* Sidebar */}
                    <NavBar />
        
                    {/* Main Content */}
                    <main className="main-content">
                        {/* Header */}
                        <Header title='Edit User' description='' button={
                    <NavLink className='create-btn' to='/users'>Back</NavLink>
                } />
                        
        
                        {/* Users Table */}
                        <section className="users-table-section">
                            <UserCreateEditForm key={user.id || 'user-edit'} mode='edit' user={user} />
                        </section>
                        
                    </main>
                </div>
            );
}