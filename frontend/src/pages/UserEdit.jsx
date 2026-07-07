import { useEffect, useState } from "react";
import Header from "../compoenets/Header";
import NavBar from "../compoenets/NavBar";
import UserCreateEditForm from "../compoenets/UserCreateEditForm";
import { NavLink, useParams } from "react-router-dom";
import api from "../services/api";
import { useAuthStore } from "../store/authStore";

export default function UserEdit() {
    const accessToken = useAuthStore((state) => state.accessToken);
    const [user, setUser] = useState({});
    const { id } = useParams();
    useEffect(() => {
        async function getUser() {
            try {
                const response = await api.get(`/users/${id}`, { headers: {
                    Authorization: `Bearer ${accessToken}`
                }});
                setUser(response.data.data);
            } catch (error) {
                console.log('Error in edit page: ', error);
            }
        }
        getUser();
    }, [accessToken, id]);
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