import React from 'react';
import { Line } from 'react-chartjs-2'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Chart as ChartJS, registerables } from 'chart.js';
import { useState, useEffect } from 'react';
import { useUser } from 'store/hooks';
import 'chartjs-adapter-moment';

ChartJS.register(...registerables);

const useStyles = makeStyles(() => ({
    selectedItem: {
        backgroundColor: "#36B1BF",
    },
    unSelectedItem: {
        backgroundColor: '#0D0C0C',
    },
}));

function MyPortfolio() {
    const [selectedItem, setSelectedItem] = useState(0);
    const [unit, setUnit] = useState('day');
    const { getPortfolioData, portfolioData } = useUser();
    const classes = useStyles();

    useEffect(() => {
        const init = async () => {
            await getPortfolioData(0);
        }
        init();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    const handleSelect = async (value, unitVal) => {
        setSelectedItem(value);
        setUnit(unitVal);
        await getPortfolioData(value);
    }

    return (
        <div className='w-full secondary-background rounded-8 lg:px-24 lg:py-16 xs:p-12 p-6'>
            <div className='flex w-full justify-between items-center mb-8'>
                <p className='text-12'>My Portfolio</p>
                <div className='flex items-center mr-12'>
                    <div className={clsx(selectedItem === 0 ? classes.selectedItem : classes.unSelectedItem, "text-white cursor-pointer text-sm w-20 flex justify-center py-3 rounded-tl-4 rounded-bl-4")}
                        onClick={() => { handleSelect(0, 'day'); }}>1W</div>
                    <div className={clsx(selectedItem === 1 ? classes.selectedItem : classes.unSelectedItem, "text-white cursor-pointer text-sm w-20 flex justify-center py-3")}
                        onClick={() => { handleSelect(1, 'day'); }}>1M</div>
                    <div className={clsx(selectedItem === 2 ? classes.selectedItem : classes.unSelectedItem, "text-white cursor-pointer text-sm w-20 flex justify-center py-3")}
                        onClick={() => { handleSelect(2, 'week'); }}>3M</div>
                    <div className={clsx(selectedItem === 3 ? classes.selectedItem : classes.unSelectedItem, "text-white cursor-pointer text-sm w-20 flex justify-center py-3")}
                        onClick={() => { handleSelect(3, 'month'); }}>1Y</div>
                    <div className={clsx(selectedItem === 4 ? classes.selectedItem : classes.unSelectedItem, "text-white cursor-pointer text-sm w-20 flex justify-center py-3 rounded-tr-4 rounded-br-4")}
                        onClick={() => { handleSelect(4, 'year'); }}>All</div>
                </div>
            </div>

            <Line
                data={{
                    labels: portfolioData.labels,
                    datasets: [
                        {
                            borderColor: '#36B1BF',
                            borderRadius: 0,
                            backgroundColor: (context) => {
                                const ctx = context.chart.ctx;
                                const gradient = ctx.createLinearGradient(0, 0, 0, 180);
                                gradient.addColorStop(0, "#36B1BF");
                                gradient.addColorStop(1, "rgba(54, 177, 191, 0.025)");
                                return gradient;
                            },
                            fill: true,
                            data: portfolioData.values,
                        }
                    ]
                }}
                options={{
                    responsive: true,
                    hoverMode: 'index',
                    stacked: false,
                    scales: {
                        xAxes: {
                            type: 'time',
                            gridLines: {
                                lineWidth: 2
                            },
                            time: {
                                unit: unit,
                                unitStepSize: 1000,
                                displayFormats: {
                                    millisecond: 'MMM DD',
                                    second: 'MMM DD',
                                    minute: 'MMM DD',
                                    hour: 'MMM DD',
                                    day: 'MMM DD',
                                    week: 'MMM DD',
                                    month: 'MMM',
                                    quarter: 'MMM DD',
                                    year: 'YYYY',
                                }
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    let label = context.dataset.label || '';

                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                                    }
                                    return label;
                                }
                            }
                        }
                    },
                    elements: {
                        point: {
                            borderWidth: 0,
                            radius: 0,
                            backgroundColor: 'rgba(0,0,0,0)'
                        }
                    }
                }}
            />
        </div>
    );
}

export default React.memo(MyPortfolio);
