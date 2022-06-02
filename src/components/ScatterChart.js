import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import {useState, useEffect} from 'react'

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend, zoomPlugin);

const ScatterChart = ({nodes, onSelect}) => {

  // const [zoomLevel, setZoomLevel] = useState ({
  //   minX: Math.min(...nodes.map(node => Number(node.posX))) - 10,
  //   minY: Math.min(...nodes.map(node => Number(node.posY))) - 10,
  //   maxX: Math.max(...nodes.map(node => Number(node.posX))) + 10,
  //   maxY: Math.max(...nodes.map(node => Number(node.posY))) + 10
  // })

  // useEffect(() =>{
  //   setZoomLevel(
  //     zoomLevel
  //   )
  // }, [onSelect])

  const options = {
    scales: {
      x: {
        // max: zoomLevel.maxX,
        // min: zoomLevel.minX,

        ticks: {
          callback: function(value) {
            return Math.ceil(value)
          }
        }
      },
      y: {
        // max: zoomLevel.maxY,
        // min: zoomLevel.minY,
        ticks: {
          callback: function(value) {
            return Math.ceil(value)
          }
        }
      }
    },
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true
          },
          pinch: {
            enabled: true
          },
          mode: "xy",
          speed: 100,
          // onZoom: () => {
          //   setZoomLevel(
          //     zoomLevel
          //   )
          // }
        },
        pan: {
          enabled: true,
          mode: "xy",
          speed: 100
        },
        limits: {
          y: {min: 'original', max: 'original'},
          x: {min: 'original', max: 'original'}
        },
      }
    },
    onClick: function(evt, element) {
      if (element.length != 0)
        onSelect(data.datasets[element[0].datasetIndex].data[element[0].index].id)
    }
  };

  const colors = ['#bc5090', '#ff6361', '#ffa600', '#333333']

  const formatData = () => {
    let datasets = {}
    let readyData =[]
    nodes.forEach(node => {
      let dataset = node.group
      if (!(dataset in datasets))
      {
        datasets[dataset] = [node]
      }
      else
        datasets[dataset].push(node)
    })
    for (let group in datasets) {
      readyData.push({
        label: `Group ${group}`,
        data: datasets[group].map((node) => (
                {
                  x: node.posX,
                  y: node.posY,
                  id: node.id
                }
              )

        ),
        backgroundColor: colors[Number(group) - 1]
      })
    }
    return readyData
  }

  const [formattedData, setFormattedData] = useState([])

  useEffect(() => {
    setFormattedData(formatData())
  }, [onSelect])

  const data = {
    datasets: formattedData
    // [
    //   {
    //     label: 'Group 1',
    //     data: nodes.filter((node) => (
    //       node.group === 1
    //     )).map((node) => (
    //       {
    //         x: node.posX,
    //         y: node.posY,
    //         id: node.id
    //       }
    //     )),
    //     backgroundColor: '#bc5090',
    //   },
    //   {
    //     label: 'Group 2',
    //     data: nodes.filter((node) => (
    //       node.group === 2
    //     )).map((node) => (
    //       {
    //         x: node.posX,
    //         y: node.posY,
    //         id: node.id
    //       }
    //     )),
    //     backgroundColor: '#ffa600',
    //   },
    // ],
  };

  return (
    <Scatter options={options} data={data}/>
  )
}
 
export default ScatterChart
