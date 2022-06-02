import { useState, useEffect } from 'react';
import Chart from './components/Chart';
import ScatterChart from './components/ScatterChart';
import Info from './components/Info';
import './index.css';

function App() {
  

const [nodes, setNodes] = useState([])

  const getData = () => {
    fetch('nodes.json').then(response => response.json()).then(data => setNodes(data))
  }

  const isMobile = ('ontouchstart' in window ) ||
  ( navigator.maxTouchPoints > 0 ) ||
  ( navigator.msMaxTouchPoints > 0 );

  const [dropdown, setDropdown] = useState(false)

  useEffect(()=>{
    getData()
  },[])

  const selectNode = (id) => {
    setNodes(
      nodes.map(node => 
      node.id === id? {...node, selected: true} : {...node, selected: false}
    ))
  }

  const selectedNode = nodes.find(node => node.selected)

    return (
      <div>
        <nav className="navbar">
          <div className="container">
            <a className="logo">Genes</a>
            <a className="search">Search</a>
            <a className="menu-trigger" onClick={() => setDropdown(!dropdown)}>#</a>
            <div className={!isMobile ? "menu" : (dropdown ? "dropped-menu" : "menu")}>
              <a>New post</a>
              <a>My profile</a>
              <a>Logout</a>
            </div>
          </div>
        </nav>
        <div className="container">
          <h1>The Graph</h1>
          {/* <Chart onSelect={selectNode} data={nodes}/> */}
          <ScatterChart nodes={nodes} onSelect={selectNode}/>
          <div className="info">
            <Info node={selectedNode}/>
          </div>
        </div>
      </div>
    );
  }

export default App;
