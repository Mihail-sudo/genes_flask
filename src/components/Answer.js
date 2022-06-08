import React from 'react'
import ScatterChart from './ScatterChart'
import Info from './Info'

const Answer = ({nodes, selectNode, selectedNode, graphStatus}) => {
  return ( graphStatus != 'valid' ?
    <h1>{graphStatus}</h1>
    :
    <div>
          <ScatterChart nodes={nodes} onSelect={selectNode}/>
          <div className="info">
            <Info node={selectedNode}/>
          </div>
    </div>
  )
}

export default Answer
