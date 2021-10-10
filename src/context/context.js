import React, { createContext, useState } from 'react'

export const SelectedItemContext = createContext()
export const SelectedItemProvider = (props) => {
    const [selected, setSelected] = useState({})
    return (
        <SelectedItemContext.Provider value={[selected, setSelected]}>
            {props.children}
        </SelectedItemContext.Provider>
    )
}
