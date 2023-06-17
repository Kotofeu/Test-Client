import { FC, memo, MouseEvent, useState } from 'react'

import classes from './TotalAmount.module.scss'

interface ITotalAmountr {
    className?: string;
    amountString: string;
    amount?: number;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}
const TotalAmount: FC<ITotalAmountr> = memo((props) => {
    const { className = '', amountString, amount = 0, onClick } = props
    const [test, setTest] = useState<boolean>(false);
    const roundedAmount = Math.round(amount * 100) / 100
    return (
        <div className={[classes.totalAmount, className].join(' ')}>

            <div className={classes.totalAmount_inner}>

                <div className={classes.totalAmount_amount}>
                    {roundedAmount ? `${amountString}${roundedAmount}` : amountString}
                </div>
                <button className={classes.totalAmount_button} onClick={() => setTest(true)}>
                    {test ? "ОТПРАВЛЕНО" : "КУПИТЬ"}
                </button>
            </div>
        </div>
    )
})
export default TotalAmount