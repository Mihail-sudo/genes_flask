import React from 'react'
import ScatterChart from './ScatterChart'
import Info from './Info'

const Answer = ({nodes, selectNode, selectedNode}) => {
  return ( nodes.length == 0 ?
    <h1>Loading... Please Wait</h1>
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
