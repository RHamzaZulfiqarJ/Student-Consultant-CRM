import { Box, CircularProgress, Tooltip } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { getIncomeAndExpenses } from '../../redux/action/cashbook'

const IncomeAndExpense = () => {

    const dispatch = useDispatch()
    const { incomeAndExpenses, isFetching } = useSelector(state => state.cashbook)
    const currentYear = new Date().getFullYear();
    let incomeSum = incomeAndExpenses.reduce((prev, current) => prev + +current.income, 0);
    let expensesSum = incomeAndExpenses.reduce((prev, current) => prev + +current.expense, 0);

    useEffect(() => {
        dispatch(getIncomeAndExpenses())
    }, [])


    return (
        <Box className="w-7/12 bg-white h-96 rounded-lg p-6 float-left pb-20">

            {
                isFetching
                    ?
                    <div className="flex justify-center items-center w-full h-full ">
                        <CircularProgress />
                    </div>
                    :
                    <>
                        <ResponsiveContainer>
                            <LineChart
                                width={500}
                                height={300}
                                data={incomeAndExpenses}
                                margin={{ top: 20, right: 5, left: 0, bottom: 5, }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="income" stroke="#8884d8" activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="expense" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                        <div className="columns-3 mt-2">
                            <div className="flex justify-center font-extralight text-3xl">{currentYear}</div>
                            <div className="flex justify-center font-extralight text-3xl">${incomeSum}</div>
                            <div className="flex justify-center font-extralight text-3xl">${expensesSum}</div>
                        </div>
                        <div className="columns-3">
                            <div className="flex justify-center text-sm font-thin text-gray-600">Period</div>
                            <div className="flex justify-center text-sm font-thin text-gray-600">Income</div>
                            <div className="flex justify-center text-sm font-thin text-gray-600">Expenses</div>
                        </div>
                    </>
            }
        </Box>
    )
}

export default IncomeAndExpense