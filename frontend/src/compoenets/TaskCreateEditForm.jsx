import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuthStore } from "../store/authStore";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOrEditTaskSchema } from "../formSchemas/createOrEditTask";
import { GoogleGenAI } from "@google/genai";
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const AI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export default function UserCreateEditForm({ mode, task }) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const loggedInUser = useAuthStore((state) => state.user);
  const [users, setUsers] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const navigate = useNavigate();
  const [disableDescription, setDescriptionDisabled] = useState(false);
  const [titleEmptyError, settitleEmptyError] = useState("");
  const [AIError, setAIError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    control,
  } = useForm({
    resolver: zodResolver(createOrEditTaskSchema),
    mode: "onChange",
    defaultValues: {
      title: task?.title ?? "",
      description: task?.description ?? "",
      userId: task?.userId ? String(task.userId) : "",
      statusId: task?.statusId ? String(task.statusId) : "",
      priorityId: task?.priorityId ? String(task.priorityId) : "",
    },
  });
  const taskTitle = useWatch({ control, name: "title" });

  useEffect(() => {
    async function loadDropDownsData() {
      try {
        const [userResponse, statusResponse, priorityResponse] =
          await Promise.all([
            api.get("/users?isDropdown=true", {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }),
            api.get("/statuses?isDropdown=true", {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }),
            api.get("/priorities?isDropdown=true", {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }),
          ]);
        const otherUsers = userResponse.data.data
          .filter((u) => u.id != loggedInUser.id)
          .map((u) => {
            return {
              ...u,
              name: `${u.firstName} ${u.lastName}`,
            };
          });
        setUsers([{ ...loggedInUser, name: "Assigned to Me" }, ...otherUsers]);
        setStatuses(statusResponse.data.data);
        setPriorities(priorityResponse.data.data);

        // set form values after dropdown options are loaded (use strings)
        if (task?.statusId) {
          setValue("statusId", String(task.statusId));
        } else if (statusResponse.data.data[0]) {
          setValue("statusId", String(statusResponse.data.data[0].id));
        }

        if (task?.priorityId) {
          setValue("priorityId", String(task.priorityId));
        } else if (priorityResponse.data.data[0]) {
          setValue("priorityId", String(priorityResponse.data.data[0].id));
        }

        if (task?.userId) {
          setValue("userId", String(task.userId));
        }
      } catch (error) {
        console.log(error);
      }
    }
    loadDropDownsData();
  }, [
    accessToken,
    task?.statusId,
    task?.priorityId,
    task?.userId,
    setValue,
    loggedInUser,
  ]);
  async function onSubmit(data) {
    // convert string select values to numbers (or null) before sending
    data.userId =
      data.userId == 0 || data.userId === "" || data.userId == null
        ? null
        : Number(data.userId);

    if (!data.statusId || data.statusId === "") {
      data.statusId = statuses[0]?.id ?? null;
    } else {
      data.statusId = Number(data.statusId);
    }

    if (!data.priorityId || data.priorityId === "") {
      data.priorityId = priorities[0]?.id ?? null;
    } else {
      data.priorityId = Number(data.priorityId);
    }

    try {
      if (mode === "create") {
        const response = await api.post(`/tasks`, data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.data.status) {
          navigate("/tasks");
        }
      } else {
        const response = await api.put(`/tasks/${task.id}`, data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.data.status) {
          navigate("/tasks");
        }
      }
    } catch (error) {
      console.log("User Create Error", error);
      setFormErrorMessage(error.response.data.error.message);
    }
  }
  async function handleAIGeneratedDescr(e) {
    if (!taskTitle) {
      settitleEmptyError("Enter Title first");
      e.target.checked = false;
      return false;
    }
    if (e.target.checked) {
      setDescriptionDisabled(true);
      setValue("description", "Please wait for AI generated Description...", {
        shouldDirty: true,
        shouldValidate: true,
      });
      try {
        const descResponse = await AI.models.generateContent({
          model: "gemini-3.5-flash",
          contents:
            "Give me two lines description of this Task title: " + taskTitle,
        });
        setValue("description", descResponse.text, {
          shouldDirty: true,
          shouldValidate: true,
        });
        setDescriptionDisabled(false);
      } catch (error) {
        console.log(error);
        setValue("description", "", {
          shouldDirty: true,
          shouldValidate: true,
        });
        setDescriptionDisabled(false);
        setAIError(
          "Something went wrong, you need to enter description manually.",
        );
      }
    } else {
      setValue("description", "", { shouldDirty: true, shouldValidate: true });
    }
  }
  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label>Title</label>
        <input type="text" placeholder="Enter title" {...register("title")} />
        {errors.title && <p className="error-text">{errors.title.message}</p>}
      </div>

      <div className="form-group">
        <label>Add AI Generated Description ?</label>
        <input
          type="checkbox"
          name="AIGeneratedDescr"
          id="AIGeneratedDescr"
          onChange={handleAIGeneratedDescr}
        />
        <p className="error-text">{!taskTitle && titleEmptyError}</p>
      </div>
      <p className="error-text">{AIError}</p>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          id="description"
          placeholder="Enter description"
          {...register("description")}
          disabled={disableDescription}
        />
        {errors.description && (
          <p className="error-text">{errors.description.message}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="userId">Select User</label>
        <select id="userId" {...register("userId")}>
          <option value="">UnAssigned</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {errors.userId && <p className="error-text">{errors.userId.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="statusId">Select Status</label>
        <select id="statusId" {...register("statusId")}>
          {statuses.map((status) => (
            <option key={status.id} value={status.id}>
              {status.name}
            </option>
          ))}
        </select>
        {errors.statusId && (
          <p className="error-text">{errors.statusId.message}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="priorityId">Select Priority</label>
        <select id="priorityId" {...register("priorityId")}>
          {priorities.map((priority) => (
            <option key={priority.id} value={priority.id}>
              {priority.name}
            </option>
          ))}
        </select>
        {errors.priorityId && (
          <p className="error-text">{errors.priorityId.message}</p>
        )}
      </div>

      <p className="error-text">{formErrorMessage}</p>

      <button type="submit" className="auth-btn" disabled={isSubmitting}>
        {mode === "create"
          ? isSubmitting
            ? "Submitting..."
            : "Submit"
          : isSubmitting
            ? "Updating..."
            : "Update"}
      </button>
      <button
        type="button"
        className="auth-btn"
        onClick={() => navigate("/tasks")}
      >
        Cancel
      </button>
    </form>
  );
}
