import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GetApi from '../../respositories/BuscaApi'
import './index.css'

export default function Form(){
    const dispatch = useDispatch()
    const urlData = useSelector(state => state.urlReducer.url)
    const {date_init, date_end, block} = useSelector(state => state.searchDateReducer)

    useEffect(() => {
      GetApi(urlData)
        .then(res => {
          let dados = []
          res.data.forEach((dado) => {
            const date = new Date(dado.from)
            let y
            let x
            if(dado.intensity.average){
                y = dado.intensity.average
                x = date.getTime()
            } else {
                y = dado.intensity.forecast
                x = date
            }
            dados.push({x: x, y: y})
          })
          dispatch({type: 'UPDATE_DATA', data: dados})
        })
    }, [dispatch, urlData])

    /**
     * Updates the date state dinamically
     * @param {*} e input event
     */
    function updateData(e){
        const date = new Date(e.target.value)
        const campo = e.target.name.toLowerCase()
        const action = {type: `SET_${e.target.name}`, [campo]: date.toISOString()}
        dispatch(action)
    }

    /**
     * Updates the URL that fetches data from the API
     * @param {*} e form submission
     */
    function updateUrl(e){
        e.preventDefault()
        const newUrl = `https://api.carbonintensity.org.uk/intensity/stats/${date_init}/${date_end}/${block}`
        const action = {type: `UPDATE_URL`, url: newUrl}
        if(date_init !== date_end){
            dispatch(action)
        } else {
            alert('Please select different days')
        }
    }

    /**
     * Gets current carbon emissions
     */
    function getCurrent(){
        
        const action = {type: `UPDATE_URL`, url: 'https://api.carbonintensity.org.uk/intensity'}
        dispatch(action)
        // quando 30min se passam chama a função de novo
        setTimeout(()=>{getCurrent()}, 1800000)
    }

    /**
     * Updates the chart interval
     * @param {*} e form event
     */
    function updateBlock(e){
        const action = {type: 'SET_BLOCK', block: e.target.value}
        dispatch(action)
    }

    return(
        <>
            <form onSubmit={updateUrl} className='form_main'>
                <div className='form_item'>
                    <label for='DATE_INIT'>Initial date: </label>
                    <input name='DATE_INIT' type='date' onChange={updateData} />
                </div>
                <div className='form_item'>
                    <label for='DATE_END'>Final date: </label>
                    <input name='DATE_END' type='date' onChange={updateData} />
                </div>
                <div className='form_item'>
                    <label for='block'>Chart interval: </label>
                    <select name='block' onChange={updateBlock}>
                        <option value={1}>One hour</option>
                        <option value={12}>Twelve hours</option>
                        <option value={24} selected="selected">One day</option>
                    </select>
                </div>
                <div className='form_item'>
                    <button class='btn' type='submit'>Update chart</button>
                </div>
            </form>
            <button class='btn' onClick={getCurrent}>Get current</button>
        </>
    )
}