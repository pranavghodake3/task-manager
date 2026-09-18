import { useState } from "react";
import { GlobalProjectContext } from "./GlobalProjectContext";
import { getGlobalProjectId } from "../util";

export default function GlobalProjectContextProvider({children}) {
    const [globalProjectId, setGlobalProjectId] = useState(getGlobalProjectId());
    return (
        <GlobalProjectContext.Provider value={{
            globalProjectId, setGlobalProjectId
        }}>
            {children}
        </GlobalProjectContext.Provider>
    )
}
