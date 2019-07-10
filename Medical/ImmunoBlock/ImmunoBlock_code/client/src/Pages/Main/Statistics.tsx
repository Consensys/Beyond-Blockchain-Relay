import React, { Component } from 'react';
import {
    Radar, RadarChart, PolarGrid, Legend, PieChart, Pie, Tooltip,
    PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import './main.css';


const data = [
    {
        subject: 'Math', A: 120, B: 110, fullMark: 150,
    },
    {
        subject: 'Chinese', A: 98, B: 130, fullMark: 150,
    },
    {
        subject: 'English', A: 86, B: 130, fullMark: 150,
    },
    {
        subject: 'Geography', A: 99, B: 100, fullMark: 150,
    },
    {
        subject: 'Physics', A: 85, B: 90, fullMark: 150,
    },
    {
        subject: 'History', A: 65, B: 85, fullMark: 150,
    },
];

const data01 = [
    { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
    { name: 'Group E', value: 278 }, { name: 'Group F', value: 189 },
];

const data02 = [
    { name: 'Group A', value: 2400 }, { name: 'Group B', value: 4567 },
    { name: 'Group C', value: 1398 }, { name: 'Group D', value: 9800 },
    { name: 'Group E', value: 3908 }, { name: 'Group F', value: 4800 },
];


interface IStatisticsState {
    width: number;
    height: number;
}
export default class Statistics extends Component<{}, IStatisticsState> {
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/dpgb3xjq/';

    public render() {
        const style = {
            width: '100%',
        };
        return (
            <table style={style}>
                <tr>
                    <td>
                        <RadarChart cx={175} cy={175} outerRadius={125} width={350} height={350} data={data}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" />
                            <PolarRadiusAxis angle={30} domain={[0, 150]} />
                            <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                            <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                            <Legend />
                        </RadarChart>
                    </td>
                    <td>
                        <PieChart width={350} height={350}>
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={data01}
                                cx={175}
                                cy={175}
                                outerRadius={125}
                                fill="#8884d8"
                                label
                            />
                            <Tooltip />
                        </PieChart>
                    </td>
                </tr>
            </table>
        );
    }
}
