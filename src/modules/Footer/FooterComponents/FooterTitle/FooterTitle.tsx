import { memo, FC } from 'react'
import classes from './FooterTitle.module.scss'
export enum FooterTitleType {
    h4 = classes.footer_title___h4,
}
interface IFooterTitle {
    children: string;
    titleType?: FooterTitleType;
}
const FooterTitle: FC<IFooterTitle> = memo((props) => {
    const { children, titleType } = props
    if (titleType === FooterTitleType.h4) {
        return (
            <h4 className={
                [
                    classes.footer_title,
                    titleType
                ]
                    .join(' ')
            }>
                {children}
            </h4>
        )
    }
    else {
        return (
            <h5 className={
                [
                    classes.footer_title,
                    classes.footer_title___h4
                ]
                    .join(' ')
            }>
                {children}
            </h5>
        )
    }
})

export default FooterTitle