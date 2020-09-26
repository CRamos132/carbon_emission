import React, { useState, useEffect } from 'react'
import {XYPlot, VerticalBarSeries, XAxis, YAxis, HorizontalGridLines, VerticalGridLines} from 'react-vis';
import {useSelector} from 'react-redux'
import './index.css'

function Chart() {
    const [type, setType] = useState('time')
    const data = useSelector(state => state.dataReducer.data)
    /**
     * Changes the chart to be able to display one value when displaying vurrent emissions
     */
    useEffect(()=>{
        if(data.length > 1){
            setType('time')
        } else {
            setType('ordinal')
        }
    }, [data.length, type])
    
    return(
        <article className='chart_main'>
            <XYPlot xType={type} height={200} width={600} stroke='blue' color='green'>
                <VerticalBarSeries barWidth={.5} animation='gentle' data={data} />
                <HorizontalGridLines />
                <VerticalGridLines />
                <XAxis />
                <YAxis />
            </XYPlot>
        </article>
    )
}

export default Chart