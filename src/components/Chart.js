import React from 'react'
import {ScatterChart, CartesianGrid, XAxis, YAxis, ZAxis, Tooltip, Legend, Scatter, ResponsiveContainer} from 'recharts'

const Chart = ({data, onSelect}) => {

  const smallWindow = window.matchMedia('(max-width: 480px)').matches
  const isMobile = ('ontouchstart' in window ) ||
           ( navigator.maxTouchPoints > 0 ) ||
           ( navigator.msMaxTouchPoints > 0 );

    const [opacity, setOpacity] = React.useState({
      g1: 1,
      g2: 1,
      g3: 1
    });

    const handleMouseEnter = (o) => {
      const { value } = o;
      setOpacity({g1: 0.3, g2: 0.3, g3: 0.3, ['g' + value.substring(6)]: 1 });
    };
    const handleMouseLeave = (o) => {
      setOpacity({g1: 1, g2: 1, g3: 1});
    };

  return (
    <ResponsiveContainer width="100%" aspect={ smallWindow? 1.5 : 2}>
    <ScatterChart>
        <CartesianGrid/>
        <XAxis stroke="#333333" type="number" dataKey="posX" domain={["dataMin - 20", "dataMax + 20"]}/>
        <YAxis stroke="#333333" type="number" dataKey="posY" domain={["dataMin - 20", "dataMax + 20"]}/>
        <ZAxis range={smallWindow ? [25, 25] : [50,50]}/>
        <Tooltip cursor={false} content={isMobile ?  <></> : <ScatterTooltip/>}/>
        <Legend layout="vertical" verticalAlign="top" align="right" wrapperStyle={{paddingLeft: "10px"}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/>
        <Scatter onClick={node => onSelect(node.id)} name="Group 1" data={data.filter(node => node.group === 1)} fill="#bc5090" style={{opacity: opacity.g1}}/>
        <Scatter onClick={node => onSelect(node.id)} name="Group 2" data={data.filter(node => node.group === 2)} fill="#ffa600" style={{opacity: opacity.g2}}/>
        <Scatter onClick={node => onSelect(node.id)} name="Group 3" data={data.filter(node => node.group === 3)} fill="#ff6361" style={{opacity: opacity.g3}}/>
    </ScatterChart>
    </ResponsiveContainer>
  )
}

const ScatterTooltip = ({active, payload, label}) => {
  if (active) {
    const data = payload[0].payload
      return (
      <div className="tooltip">
          <h4>Node {data.id}</h4>
          <p>{data.country}</p>
      </div>
      )};
  return null
}

export default Chart

