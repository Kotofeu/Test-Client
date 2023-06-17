import { memo, FC, HTMLAttributeReferrerPolicy } from 'react'
import classes from './Map.module.scss'
export type loadingTypes = "lazy" | "eager" | undefined
interface IMap {
    className?: string;
    name: string;
    src: string;
    width?: string;
    height?: string;
    allowFullScreen?: boolean;
    loading?: loadingTypes;
    referrerPolicy?: HTMLAttributeReferrerPolicy;
}
const Map: FC<IMap> = memo((props) => {
    const {
        className = '',
        name,
        src,
        width = '100%',
        height = '500px',
        allowFullScreen = false,
        loading = "lazy",
        referrerPolicy = "no-referrer-when-downgrade"
    } = props
    return (
        <iframe
            className={[classes.map, className].join(' ')}
            title={name}
            src={src}
            width={width}
            height={height}
            allowFullScreen={allowFullScreen}
            loading = {loading}
            referrerPolicy= {referrerPolicy}
        />)
})

export default Map