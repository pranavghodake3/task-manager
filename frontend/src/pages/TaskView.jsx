import { useContext, useEffect, useState } from "react";
import api from "../services/api";
import Header from "../compoenets/Header";
import NavBar from "../compoenets/NavBar";
import { NavLink, useParams } from "react-router-dom";
import { formatDate } from "../util";
import { useAuthStore } from "../store/authStore";
import { SocketContext } from "../socket/SocketContext";

function getDisplayName(user) {
  if (!user) return "Unknown user";
  return (
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    user.name ||
    "Unknown user"
  );
}

function getInitials(name) {
  if (!name) return "U";
  const parts = name.split(" ").filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function getCommentIdentity(comment) {
  const content =
    comment?.comment || comment?.content || comment?.message || "";
  const author =
    comment?.user || comment?.creator || comment?.author || comment?.createdBy;
  const authorName = getDisplayName(author);
  const createdAt = comment?.createdAt || comment?.updatedAt || "";

  return (
    comment?.id ||
    comment?._id ||
    comment?.commentId ||
    comment?.clientId ||
    `${createdAt}-${authorName}-${content}`
  );
}

function addUniqueComment(existingComments, incomingComment) {
  const identity = getCommentIdentity(incomingComment);
  if (!identity) return existingComments;

  const alreadyExists = existingComments.some(
    (comment) => getCommentIdentity(comment) === identity,
  );

  if (alreadyExists) return existingComments;

  return [incomingComment, ...existingComments];
}

export default function TaskView() {
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    async function loadTask() {
      try {
        const response = await api.get(`/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setTask(response.data.data);
      } catch (error) {
        console.error("Error loading task: ", error);
        setTask(null);
      }
    }

    if (id) {
      loadTask();
    }
  }, [accessToken, id]);

  useEffect(() => {
    if (!socket) return;
    const handleCommentAdd = (comment) => {
      setComments((oldComments) => addUniqueComment(oldComments, comment));
    };
    socket.on("task_comment_added", handleCommentAdd);

    return () => {
      socket.off("task_comment_added", handleCommentAdd);
    };
  }, [socket]);

  useEffect(() => {
    async function loadComments() {
      if (!id) return;

      setIsLoadingComments(true);
      try {
        let lastError;
        try {
          const response = await api.get(`/tasks/${id}/comments`);

          setComments(response?.data?.data ?? []);
        } catch (error) {
          lastError = error;
          if (error?.response?.status !== 404) {
            throw error;
          }
        }

        if (lastError) {
          throw lastError;
        }
      } catch (error) {
        console.error("Error loading comments: ", error);
        setComments([]);
      } finally {
        setIsLoadingComments(false);
      }
    }

    loadComments();
  }, [accessToken, id]);

  async function handleAddComment(e) {
    e.preventDefault();

    const trimmed = commentText.trim();
    if (!trimmed || !id) return;

    setIsSubmitting(true);
    try {
      let createdComment = null;
      try {
        const response = await api.post(`/tasks/${id}/comments`, {
          comment: trimmed,
        });

        createdComment = response?.data?.data ?? null;
        createdComment = { ...createdComment, user };
      } catch (error) {
        if (error?.response?.status !== 404) {
          throw error;
        }
      }

      if (!createdComment) {
        throw new Error("Comment endpoint not available");
      }

      const localComment = {
        ...createdComment,
        user,
        clientId: `local-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      };

      setComments((oldComments) => addUniqueComment(oldComments, localComment));
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment: ", error);
      alert("Unable to add the comment right now.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <NavBar />

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <Header
          title={task ? task.title : "Task"}
          description="Task Details"
          button={
            <NavLink className="create-btn" to="/tasks">
              Back
            </NavLink>
          }
        />

        {/* Task Details Table */}
        <section className="tasks-table-section">
          <div className="card">
            {task ? (
              <table className="detail-table">
                <tbody>
                  <tr>
                    <td>
                      <b>Id: </b>
                    </td>
                    <td>{task.id}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Title: </b>
                    </td>
                    <td>{task.title}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Description: </b>
                    </td>
                    <td>{task.description}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Assigned To: </b>
                    </td>
                    <td>
                      {task.user?.firstName} {task.user?.lastName}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Created By: </b>
                    </td>
                    <td>
                      {task.creator?.firstName} {task.creator?.lastName}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Status: </b>
                    </td>
                    <td>
                      <div
                        style={{
                          color: task.status?.color,
                        }}
                      >
                        {task.status?.name}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Priority: </b>
                    </td>
                    <td>
                      <div
                        style={{
                          color: task.priority?.color,
                        }}
                      >
                        {task.priority?.name}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Created At:</b>
                    </td>
                    <td>
                      {formatDate(task.createdAt, "DD-MMM-YYYY HH:MM:SS")}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Updated At:</b>
                    </td>
                    <td>
                      {formatDate(task.updatedAt, "DD-MMM-YYYY HH:MM:SS")}
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <h1>Task Not Found</h1>
            )}
          </div>
        </section>

        {/* Comments Section */}
        <section className="comments-section">
          <div className="card comments-card">
            <div className="comments-header">
              <div>
                <h3>Comments</h3>
                <p>Keep the discussion on this issue in one place.</p>
              </div>
              <span className="comment-count">
                {comments.length} comment{comments.length === 1 ? "" : "s"}
              </span>
            </div>

            <form className="comment-form" onSubmit={handleAddComment}>
              <textarea
                rows="4"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
              />
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Comment"}
              </button>
            </form>

            <div className="comments-list">
              {isLoadingComments ? (
                <div className="comment-empty">Loading comments...</div>
              ) : comments.length === 0 ? (
                <div className="comment-empty">
                  No comments yet. Start the conversation.
                </div>
              ) : (
                comments.map((comment, index) => {
                  const author =
                    comment.user ||
                    comment.creator ||
                    comment.author ||
                    comment.createdBy;
                  const authorName = getDisplayName(author);
                  const content =
                    comment.comment || comment.content || comment.message || "";

                  return (
                    <article
                      key={
                        getCommentIdentity(comment) ||
                        `${index}-${comment.createdAt || "comment"}`
                      }
                      className="comment-item"
                    >
                      <div className="comment-avatar">
                        {getInitials(authorName)}
                      </div>
                      <div className="comment-body">
                        <div className="comment-meta">
                          <strong>{authorName}</strong>
                          <span>
                            {formatDate(
                              comment.createdAt || comment.updatedAt,
                              "DD-MMM-YYYY HH:MM",
                            )}
                          </span>
                        </div>
                        <p>{content}</p>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </div>
        </section>
      </main>

      <style>{`
        .comments-section {
          margin-top: 24px;
        }

        .comments-card {
          padding: 20px;
        }

        .comments-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .comments-header h3 {
          margin: 0 0 4px;
          color: #172b4d;
        }

        .comments-header p {
          margin: 0;
          color: #5e6c84;
          font-size: 13px;
        }

        .comment-count {
          background: #f4f5f7;
          color: #172b4d;
          padding: 6px 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
        }

        .comment-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 18px;
        }

        .comment-form textarea {
          width: 100%;
          border: 1px solid #dfe1e6;
          border-radius: 8px;
          padding: 12px;
          resize: vertical;
          font-size: 14px;
          min-height: 90px;
        }

        .comment-form button {
          align-self: flex-start;
          padding: 10px 14px;
          border: none;
          border-radius: 6px;
          background: #0052cc;
          color: white;
          cursor: pointer;
          font-weight: 600;
        }

        .comment-form button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .comments-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .comment-item {
          display: flex;
          gap: 12px;
          padding: 12px 0;
          border-top: 1px solid #ebecf0;
        }

        .comment-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #0052cc;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 12px;
          flex-shrink: 0;
        }

        .comment-body {
          flex: 1;
        }

        .comment-meta {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 6px;
          color: #172b4d;
          font-size: 13px;
        }

        .comment-body p {
          margin: 0;
          color: #344563;
          line-height: 1.5;
          white-space: pre-wrap;
        }

        .comment-empty {
          color: #5e6c84;
          padding: 8px 0;
        }
      `}</style>
    </div>
  );
}
