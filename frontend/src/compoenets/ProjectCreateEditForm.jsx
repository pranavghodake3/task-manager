import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function ProjectCreateEditForm({ mode, project }) {
    const AuthContextData = useContext(AuthContext);
    const [createNew, selectCreateNew] = useState("0");
    const [users, setUsers] = useState([]);
    const [name, setProjectName] = useState(() => project?.name ?? '');
    const [description, setProjectDescription] = useState(() => project?.description ?? '');
    const [userId, selectUserId] = useState(() => project?.userId ?? '');

    const [firstName, selectFirstName] = useState(() => project?.firstName ?? '');
    const [lastName, selectLastName] = useState(() => project?.lastName ?? '');
    const [email, selectEmail] = useState(() => project?.email ?? '');
    const [password, selectPassword] = useState('');
    const [confirmPassword, selectConfirmPassword] = useState('');
    const [formErrorMessage, setFormErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function loadDropDownsData() {
            try {
                const [userResponse] = await Promise.all([
                    api.get('/users?isDropdown=true', { headers: {
                        Authorization: `Bearer ${AuthContextData.accessToken}`
                    }}),

                ]);
                setUsers(userResponse.data.data);
            } catch (error) {
                console.log(error);
            }
        }
        loadDropDownsData();
    }, [AuthContextData.accessToken])

    function handleCreateNew(e) {
        selectCreateNew(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (mode === 'create') {
                const response = await api.post('/projects', {
                    name,
                    description,
                    createNew,
                    projectAdminId: userId,
                }, {
                    headers: {
                        Authorization: `Bearer ${AuthContextData.accessToken}`
                    }
                });
                if (response.data.status) {
                    navigate('/projects');
                }
            }else{
                const response = await api.put('/projects/'+project.id, {
                    name,
                    description,
                    createNew,
                    projectAdminId: userId,
                }, {
                    headers: {
                        Authorization: `Bearer ${AuthContextData.accessToken}`
                    }
                });
                if (response.data.status) {
                    navigate('/projects');
                }
            }
            
        } catch (error) {
            console.log('Project Create Error', error);
            setFormErrorMessage(error.response.data.error.message);
        }
    }
    return (
        <form className="auth-form project-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Enter project name" value={name} onChange={(e) => setProjectName(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea name="description" id="description" value={description} onChange={(e) => setProjectDescription(e.target.value)} placeholder="Enter Description"></textarea>
              </div>

              <div className="form-group">
                <label>Assign Project Admin: </label>
              </div>

              <div className="form-group">
                <label>Create New ?</label>
                <div className="radio-group">
                  <label>
                    <input type="radio" name="company" checked={createNew === "0"}  value="0" onChange={handleCreateNew} />
                    No
                  </label>
                  <label>
                    <input type="radio" name="company" checked={createNew === "1"}  value="1" onChange={handleCreateNew} />
                    Yes
                  </label>
                </div>
              </div>

              <div className={`form-group ${ createNew === '1' ? 'hide' : 'show' }`}>
                <label htmlFor="userId">Select User</label>
                <select name="userId" id="userId" value={userId ?? project?.userId} onChange={(e) => selectUserId(e.target.value)}>
                    <option value="">Select User</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
                    ))}
                </select>
              </div>

              <div className={`form-group ${ createNew === '0' ? 'hide' : 'show' }`}>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" placeholder="Enter your first name" value={firstName} onChange={(e) => selectFirstName(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" placeholder="Enter your last name" value={lastName} onChange={(e) => selectLastName(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="Enter your email" value={email} onChange={(e) => selectEmail(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" placeholder="Create password" value={password} onChange={(e) => selectPassword(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => selectConfirmPassword(e.target.value)} />
                </div>
              </div>

              <div className={formErrorMessage ? 'error' : 'success'}>
                <label>{formErrorMessage}</label>
            </div>

              <button type="submit" className="auth-btn">
                {mode === 'create' ? 'Submit' : 'Update'}
              </button>
              <button type="button" className="auth-btn" onClick={() => navigate('/projects')}>
                Cancel
              </button>
            </form>
    );
}