import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useState } from 'react'
import styles from './AddTransaction.module.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from 'yup';
import Navbar from '../Navbar/Navbar';
import { useHistory } from "react-router-dom";
import { createNewTransaction } from '../../services';

export default function AddExpense() {

    let history = useHistory()
    const [transactionDate, setTransactionDate] = useState(new Date());

    const transactionData = {
        title: '',
        amount: '',
        note: '',
        type: 'expense',
        tag: 'food',
    }

    const transactionValidation = Yup.object({
        title: Yup.string().required('Please enter title'),
        amount: Yup.number().positive("Enter positive amount").required('Please enter amount'),
    })

    const transactionSubmit = async (data, { resetForm }) => {
        resetForm(transactionData);
        console.log(data);
        console.log(transactionDate);
        try {
            const responseData = await createNewTransaction({ ...data, date: transactionDate })
            console.log(responseData);
            history.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    const changeTransactionDate = (selectedDate) => {
        setTransactionDate(selectedDate);
    }

    return (
        <React.Fragment>
            <Navbar />
            <div className={styles.AddTransaction}>
                <Formik className={styles.TransactionForm} initialValues={transactionData} validationSchema={transactionValidation} onSubmit={transactionSubmit}>
                    {
                        (formik) => {
                            return (
                                <Form className={styles.TransactionForm}>
                                    <div className={styles.TransactionInput}>
                                        <Field className={styles.Fields} id="title" type="text" name="title" placeholder="Title" />
                                        <ErrorMessage name='title' component='div' className={styles.ErrorMsg} />
                                    </div>
                                    <div className={styles.TransactionInput}>
                                        <Field className={styles.Fields} id="amount" type="number" name="amount" placeholder="Amount" />
                                        <ErrorMessage name='amount' component='div' className={styles.ErrorMsg} />
                                    </div>
                                    <div className={styles.TransactionInput}>
                                        <Field className={styles.Fields} id="note" type="text" name="note" placeholder="Note" />
                                    </div>
                                    <div className={styles.TransactionInput}>
                                        <Field className={styles.Fields} as="select" name="type">
                                            <option value="expense">Expense</option>
                                            <option value="income">Income</option>
                                        </Field>
                                    </div>
                                    <div className={styles.TransactionInput}>
                                        <Field className={styles.Fields} as="select" name="tag">
                                            <option value="food">Food</option>
                                            <option value="fuel">Fuel</option>
                                            <option value="home">Home</option>
                                            <option value="shopping">Shopping</option>
                                            <option value="others">Others</option>
                                        </Field>
                                    </div>
                                    <div className={styles.TransactionInput}>
                                        <div className={styles.TransactionDate}>
                                            <DatePicker className={styles.DateFields} selected={transactionDate} placeholderText="Date" onChange={changeTransactionDate} />
                                        </div>
                                    </div>
                                    <button type="submit" className={styles.SaveTransaction}>Save Transaction</button>
                                </Form>
                            );
                        }
                    }
                </Formik>
            </div>
        </React.Fragment>
    )
}
