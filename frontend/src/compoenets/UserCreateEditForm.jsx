import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuthStore } from "../store/authStore";
import { addUserSchema } from "../formSchemas/addUser";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function UserCreateEditForm({ mode, user }) {
    const accessToken = useAuthStore((state) => state.accessToken);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm({
        resolver: zodResolver(addUserSchema),
        mode: 'onChange',
        defaultValues: {
          firstName: user?.firstName ?? '',
          lastName: user?.lastName ?? '',
          email: user?.email ?? '',
          password: '',
          confirm_password: '',
        },
      });

    async function onSubmit(data) {
        try {
            if (mode === 'create') {
                const response = await api.post(`/users`, data, {
                    headers: {
                    Authorization: `Bearer ${accessToken}`
                }
                });
                if (response.data.status) {
                    navigate('/users');
                }
            }else{
                const response = await api.put(`/users/${user.id}`, data, {
                    headers: {
                    Authorization: `Bearer ${accessToken}`
                }
                });
                if (response.data.status) {
                    navigate('/users');
                }
            }
            
        } catch (error) {
            console.log('User Create Error', error);
            // setFormErrorMessage(error.response.data.error.message);
        }
    }
    return (
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>

            <div className="form-group">
                <label>First Name</label>
                <input type="text" placeholder="Enter your first name" {...register('firstName')} />
                {errors.firstName && <p className="error-text">{errors.firstName.message}</p>}
            </div>

            <div className="form-group">
                <label>Last Name</label>
                <input type="text" placeholder="Enter your last name" {...register('lastName')} />
                {errors.lastName && <p className="error-text">{errors.lastName.message}</p>}
            </div>

            <div className="form-group">
                <label>Email</label>
                <input type="text" placeholder="Enter your email" {...register('email')} />
                {errors.email && <p className="error-text">{errors.email.message}</p>}
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="Create password" {...register('password')} />
                {errors.password && <p className="error-text">{errors.password.message}</p>}
            </div>

            <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" placeholder="Confirm password" {...register('confirm_password')} />
                {errors.confirm_password && <p className="error-text">{errors.confirm_password.message}</p>}
            </div>

            <button type="submit" className="auth-btn" disabled={isSubmitting}>
                {mode === 'create' ? (isSubmitting ? 'Submitting...' : 'Submit') : (isSubmitting ? 'Updating...' : 'Update')}
            </button>
            <button type="button" className="auth-btn" onClick={() => navigate('/users')}>
                Cancel
            </button>
        </form>
    );
}