import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
    selectedItem: {
        backgroundColor: "#36B1BF",
    },
    unSelectedItem: {
        backgroundColor: '#0D0C0C',
    },
    upStateBox: {
        background: 'rgba(54, 191, 92, 0.1)',
        border: '1px solid rgba(54, 191, 92, 0.2)',
        color: '#36BF5C'
    },
    selectedBox: {
        backgroundColor: '#0D0C0C',
        border: '1px solid #36B1BF'
    },
    unSelectedBox: {
        backgroundColor: '#0D0C0C',
    }
}));

const getData = () => {
    let labels = [];
    let values = [];
    for (let i = Date.parse('2022/01/01'); i <= Date.parse('2022/12/31'); i += 1000 * 60 * 60 * 24 * 4) {
        labels.push(moment(i).format("YYYY/MM/DD"));
        let value = 0;
        if (values.length)
            value = values[values.length - 1] + Math.round(510 + Math.random() * (-1000));
        else
            value = 100;
        if (value < 0)
            value += 1000;
        values.push(value);
    }
    return { labels: labels, data: values };
}
let result = getData();
const data = {
    labels: result.labels,
    datasets: [
        {
            borderColor: '#36B1BF',
            borderRadius: 0,
            backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 180);
                gradient.addColorStop(0, "rgb(54, 177, 191)");
                gradient.addColorStop(1, "rgba(54, 177, 191, 0.25)");
                return gradient;
            },
            fill: true,
            data: result.data,
        }
    ]
}

function TradePerDayBox() {
    const [selectedItem, setSelectedItem] = useState(0);
    const classes = useStyles();

    return (
        <div className='mt-16 secondary-background px-20 py-16 w-full rounded-8'>
            <div className='flex justify-between items-center'>
                <div>
                    <p className='text-white text-11'>Trading Per Day</p>
                    <div className='flex item-center'>
                        <p className='text-sm text-gray'>Profit & Loss</p>
                        <div className={clsx(classes.upStateBox, 'flex items-center px-4 py-1 text-xs rounded-full ml-3')}>
                            25%
                            <img className="ml-1" src="/assets/images/walletUpState.png" alt=""></img>
                        </div>
                    </div>
                </div>
                <div className='flex items-center'>
                    <div className='flex items-center mr-12'>
                        <div className={clsx(selectedItem === 0 ? classes.selectedItem : classes.unSelectedItem, "text-white cursor-pointer text-sm px-6 py-3 rounded-tl-4 rounded-bl-4")}
                            onClick={() => { setSelectedItem(0) }}>24H</div>
                        <div className={clsx(selectedItem === 1 ? classes.selectedItem : classes.unSelectedItem, "text-white cursor-pointer text-sm px-6 py-3")}
                            onClick={() => { setSelectedItem(1) }}>1D</div>
                        <div className={clsx(selectedItem === 2 ? classes.selectedItem : classes.unSelectedItem, "text-white cursor-pointer text-sm px-6 py-3")}
                            onClick={() => { setSelectedItem(2) }}>1W</div>
                        <div className={clsx(selectedItem === 3 ? classes.selectedItem : classes.unSelectedItem, "text-white cursor-pointer text-sm px-6 py-3")}
                            onClick={() => { setSelectedItem(3) }}>1M</div>
                        <div className={clsx(selectedItem === 4 ? classes.selectedItem : classes.unSelectedItem, "text-white cursor-pointer text-sm px-6 py-3 rounded-tr-4 rounded-br-4")}
                            onClick={() => { setSelectedItem(4) }}>1Y</div>
                    </div>
                </div>
            </div>
            <div className='flex items-center mt-16 flex-col md:flex-row'>
                <div className='md:block flex mb-12 md:mb-0'>
                    <div className={clsx(classes.unSelectedBox, 'py-4 sm:py-8 flex flex-col items-center w-60 xs:w-84 rounded-8 h-full md:h-auto')}>
                        <div className='xs:w-20 xs:h-20 w-16 h-16 rounded-full bg-grey-900 flex justify-center items-center'>
                            <img src="/assets/images/trading_volume_icon.png" alt=""></img>
                        </div>
                        <p className='text-xs xs:text-sm text-gray mt-2 sm:mt-3'>Trading volume</p>
                        <p className='text-white mt-2 sm:mt-3 font-medium text-11'>$2500</p>
                    </div>
                    <div className={clsx(classes.selectedBox, 'py-4 sm:py-8 flex flex-col items-center w-60 xs:w-84 rounded-8 h-full md:h-auto ml-8 md:ml-0 md:mt-8')}>
                        <div className='xs:w-20 xs:h-20 w-16 h-16 rounded-full bg-grey-900 flex justify-center items-center'>
                            <img src="/assets/images/trade_number_icon.png" alt=""></img>
                        </div>
                        <p className='text-xs xs:text-sm text-gray mt-2 sm:mt-3'>Number of trades</p>
                        <p className='text-white mt-2 sm:mt-3 font-medium text-11'>12</p>
                    </div>
                    <div className={clsx(classes.unSelectedBox, 'py-4 sm:py-8 flex flex-col items-center w-60 xs:w-84 rounded-8 h-full md:h-auto ml-8 md:ml-0 md:mt-8')}>
                        <div className='xs:w-20 xs:h-20 w-16 h-16 rounded-full bg-grey-900 flex justify-center items-center'>
                            <img src="/assets/images/project_traded_icon.png" alt=""></img>
                        </div>
                        <p className='text-xs xs:text-sm text-gray mt-2 sm:mt-3'>Projects traded</p>
                        <p className='text-white mt-2 sm:mt-3 font-medium text-11'>4</p>
                    </div>
                </div>
                <div className='w-full pl-0 md:pl-40'>
                    <Line
                        data={data}
                        options={{
                            responsive: true,
                            hoverMode: 'index',
                            stacked: false,
                            scales: {
                                y: {
                                    ticks: {
                                        // Include a dollar sign in the ticks
                                        callback: function (value, index, ticks) {
                                            return '$' + value;
                                        }
                                    }
                                },
                                xAxes: {
                                    type: 'time',
                                    gridLines: {
                                        lineWidth: 2
                                    },
                                    time: {
                                        unit: "month",
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
            </div>
        </div>
    );
}

export default React.memo(TradePerDayBox);
