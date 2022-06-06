import React from 'react'
import ScatterChart from './ScatterChart'
import Info from './Info'

const Answer = ({nodes, selectNode, selectedNode}) => {
  return (
    <div>
       <h1>The Graph</h1>
          <ScatterChart nodes={nodes} onSelect={selectNode}/>
          <div className="info">
            <Info node={selectedNode}/>
          </div>
    </div>
  )
}

export default Answer
