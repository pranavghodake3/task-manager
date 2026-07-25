import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { SocketContext } from "./SocketContext";

export default function SocketProvider({ children }) {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io("http://localhost:5000", {
            autoConnect: true,
        });

        // schedule state update asynchronously to avoid synchronous setState in effect
        // (prevents cascading renders and satisfies the linter rule)
        Promise.resolve().then(() => setSocket(newSocket));

        return () => {
            newSocket.disconnect();
        };
    }, [setSocket]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}
