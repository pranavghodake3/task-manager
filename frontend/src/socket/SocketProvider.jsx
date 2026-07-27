import { useEffect, useRef, useCallback, useState } from "react";
import { io } from "socket.io-client";
import { SocketContext } from "./SocketContext";
import { useAuthStore } from "../store/authStore";
import { getGlobalProjectId } from "../util";

export default function SocketProvider({ children }) {
    const socketRef = useRef(null);
    const [socketState, setSocketState] = useState(null);
    const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
    const accessToken = useAuthStore((s) => s.accessToken);

    const connect = useCallback((globalProjectId) => {
        if (socketRef.current) return socketRef.current;
        const s = io("http://localhost:5000", {
            autoConnect: true,
            auth: { token: accessToken },
        });
        socketRef.current = s;
        setSocketState(s);
        console.log("SocketProv Connect: ", socketRef.current);
        s.emit('join-project', { projectId: globalProjectId });
        return s;
    }, [accessToken]);

    const disconnect = useCallback(() => {
        if (socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current = null;
            setSocketState(null);
        }
    }, []);

    // connect when authenticated, disconnect on logout/unmount
    useEffect(() => {
        console.log("SocketPro isLoggedIn: ",isLoggedIn);
        if (isLoggedIn) {
            connect(getGlobalProjectId());
        } else {
            disconnect();
        }
        return () => {
            disconnect();
        };
    }, [isLoggedIn, connect, disconnect]);

    return (
        <SocketContext.Provider value={{ socket: socketState, connect, disconnect, setSocketState }}>
            {children}
        </SocketContext.Provider>
    );
}
