const Info = ({node}) => {
    if (node === undefined) {
        return (
        <p>Select a node</p>
    )}
    return (
        <div>
            <h2>Node number {node.id}</h2>
            <table>
                <tbody>
                <tr>
                    <td>Name:</td>
                    <td>{node.country}</td>
                </tr>
                <tr>
                    <td>About:</td>
                    <td>{node.desc}</td>
                </tr>
                <tr>
                    <td>Number of things:</td>
                    <td>{node.posX}</td>
                </tr>
                <tr>
                    <td>Amount of stuff:</td>
                    <td>{node.posY}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Info
