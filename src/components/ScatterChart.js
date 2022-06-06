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

  const options = {
    scales: {
      x: {
        ticks: {
          callback: function(value) {
            return Math.ceil(value)
          }
        }
      },
      y: {
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

  const colors = ["#ea5545", "#f46a9b", "#ef9b20", "#edbf33", "#ede15b", "#bdcf32", "#87bc45", "#27aeef", "#b33dc6"]

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
        backgroundColor: colors[readyData.length]
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
  };

  return (
    <Scatter options={options} data={data}/>
  )
}
 
export default ScatterChart
