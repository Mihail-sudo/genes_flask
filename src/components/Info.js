import { StrictMode } from "react"

const Info = ({node}) => {
    if (node === undefined) {
        return (
        <p>Select a node</p>
    )}
    return (
        <div>
            <h2>{node.name}</h2>
            <p>{node.function}</p>
        </div>
    )
}

export default Info
