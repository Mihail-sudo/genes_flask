import React from 'react'
import ScatterChart from './ScatterChart'
import Info from './Info'

const Answer = ({nodes, selectNode, selectedNode, graphStatus}) => {

  const highestGroup = Math.max(...nodes.map(node => node.group));
  const lowestGroup = Math.min(...nodes.map(node => node.group));
  let genesFile = ''

  for (let i = lowestGroup; i <= highestGroup; i++) {
    let currentGroup = nodes.filter(node => node.group == i).map(node => node.name + ': ' + node.function + '\n')
    genesFile += `Group ${i}\n\n ${currentGroup.join('\n ')}\n\n`
  }

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([genesFile], {
      type: "text/plain"
    });
    element.href = URL.createObjectURL(file);
    element.download = "Genes.txt";
    document.body.appendChild(element);
    element.click();
  }

  return ( graphStatus != 'valid' ?
    <h1>{graphStatus}</h1>
    :
    <div>
          <ScatterChart nodes={nodes} onSelect={selectNode}/>
          <div className="info">
            <Info node={selectedNode}/>
          </div>
          <div>
            <button className='btn' onClick={downloadTxtFile}>Download .txt</button>
          </div>
    </div>
  )
}

export default Answer
