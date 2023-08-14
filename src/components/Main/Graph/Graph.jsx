import { Line } from 'react-chartjs-2';
import {Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Filler} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../../App';
import { capitalizeString } from '../../../utils/weatherIcon';
import { motion, AnimatePresence } from "framer-motion";
import { labelsLang } from '../../../utils/dictionary';
ChartJS.register(LineElement, ChartDataLabels, CategoryScale, LinearScale, PointElement, Filler);

const Graph = () => {
    const {data, language, theme, firstAnimation: {setFirstAnimation}, forecastType: {forecastType}} = useContext(MainContext);

    const [labels, setLabels] = useState(getLabels(forecastType, language));

    const graphData = getData(forecastType, data);

    const options = {
        type: 'line',
        radius: 3,
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                border: {
                    display: false
                },
                grid: {
                    display: false,
                    showBorder: false,
                },
                ticks: {
                    color: theme === 'light' ? '#2D4059' : '#ffff',
                    font: {
                        size: window.innerWidth > 1250 ? 14 : 12,
                        family: 'Lexend-SemiBold'
                    }
                },
            },
            y: {
                display: false,
                grid: {
                    drawBorder: false
                },
                min: Math.min(...graphData) - 20,
                max: Math.max(...graphData) + 20,
            }
        },
        legend: {
            display: false
        },
        plugins: {
            legend: {
                display: false,
            },
            datalabels: {
                anchor: 'end',
                align: 'top',
                color: theme === 'light' ? '#2D4059' : '#ffff',
                    font: {
                        size: window.innerWidth > 1250 ? 13 : 11,
                        family: 'Lexend-SemiBold'
                    }
            }
        },
        aniamation: {
            duration: 10000
        }
    }

    const dataGraph = {
        labels: getLabels(forecastType, language),
        datasets: [{
            data: graphData,
            fill: 'start',
            borderColor: theme === 'light' ? '#436085' : '#ffff',
            backgroundColor: (context) => {
                const bgColor = theme === 'light' ? ['rgba(130, 184, 255, 0.6)', 'rgba(130, 184, 255, 0)'] : ['rgba(88, 114, 153, 1)', 'rgba(88, 114, 153, 0)'];

                const { ctx, chartArea: {top, bottom} } = context.chart;
                const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
                
                gradientBg.addColorStop(0, bgColor[0]);
                gradientBg.addColorStop(1, bgColor[1]);

                return gradientBg;
            },
            pointBackgroundColor: theme === 'light' ?  '#ffff' : '#436085',
            tension: 0.4,
        }]
      }

    useEffect(() => {
        function changeLabelsOnResize(){
            setLabels(getLabels(forecastType, language));
        }

        window.addEventListener('resize', changeLabelsOnResize);
        
        return () => {
            window.removeEventListener('resize', changeLabelsOnResize);
        }
    }, [])

    return (
        <AnimatePresence>
            <motion.div className="graph" key={data.id}
                initial={{y: 40, opacity: 0}}
                animate={{y: 0, opacity: 1, transition: {ease:'easeInOut', duration: 0.8, delay: 5.7}}}
                onAnimationComplete={() => {
                    setFirstAnimation(false)
                }}
                exit={{y: 40, opacity: 0, transition: {ease:'easeInOut', duration: 0.5,}}}
            >
                {/* <p>{forecastType === 'today' ? 'Today' : 'Week'}</p> */}
                <Line options={options} data={dataGraph}></Line>
            </motion.div>
        </AnimatePresence>
    )
}

export default Graph

function getLabels(forecastType, language){
    if(forecastType === 'today')
        if(window.innerWidth > 460)
            return labelsLang[language.id].long;
        else
            return labelsLang[language.id].med;
    else{
        let date = new Date();
        date.setDate(date.getDate() + 1)
        let dates = [];

        for(let i = 0; i < 7; date.setDate(date.getDate() + 1), i++){
            dates[i] = capitalizeString(date.toLocaleString(language.id, { weekday: window.innerWidth <= 350 ? 'narrow' : 'short' }));
            if(window.innerWidth > 500)
                dates[i] = dates[i] + ' ' + date.getDate();
        }

        return dates;
    }
}

function getData(forecastType, data){
    if(forecastType === 'today')
        return [
            Math.round(data.data.daily[0].temp.night), 
            Math.round(data.data.daily[0].temp.morn), 
            Math.round(data.data.daily[0].temp.day), 
            Math.round(data.data.daily[0].temp.eve)
        ]
    else{
        let temps = [];
        for(let i = 0; i < 7; i++)
            temps[i] = Math.round((data.data.daily[i + 1].temp.max + data.data.daily[i + 1].temp.min) / 2);

        return temps;
    }
}