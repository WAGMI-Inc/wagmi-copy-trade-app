import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const data = {
    datasets: [{
        data: [90, 10],

        backgroundColor: (context) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 180);
            gradient.addColorStop(0, "#FEFB76");
            gradient.addColorStop(1, "#36B1BF");
            return [gradient, "#494747"];
        },
        borderWidth: 0,
    }],

    labels: [
        'Red', ''
    ]
};

const plugins = [{
    beforeDraw: function (chart) {
        var width = chart.width,
            height = chart.height,
            ctx = chart.ctx;
        ctx.restore();
        var fontSize = parseFloat((height / 160).toFixed(2));
        ctx.font = fontSize + "rem sans-serif";
        ctx.textBaseline = "top";
        ctx.fillStyle = "#ffffff";
        ctx.fontStretch = 'bold';
        var text = "90%",
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2;
        ctx.fillText(text, textX, textY - fontSize * 7);
        ctx.save();
    }
}]


function HandMetricChartBox() {
    return (
        <div className='w-full secondary-background rounded-8 py-16 px-12 md:px-24'>
            <p className='text-white text-12'>Diamond Hand Metric</p>
            <div className='mt-8 flex w-full justify-center items-center my-8'>
                <div className='md:w-1/2 w-2/3'>
                    <Doughnut
                        data={data}
                        plugins={plugins}
                        options={{
                            radius: "90%",
                            plugins: {
                                legend: {
                                    display: false,
                                },
                                tooltip: {
                                    enabled: false // <-- this option disables tooltips
                                }
                            },
                            responsive: true,
                            maintainAspectRatio: true,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default React.memo(HandMetricChartBox);
