import { memo, FC, AllHTMLAttributes} from 'react'
import noPhoto from '../../assets/images/NoPhoto.jpg'

interface IServerImage  extends AllHTMLAttributes<HTMLImageElement> {
    src?: string;
    altSrc?: string;
    className?: string;
    alt: string;
    style?: React.CSSProperties
}
const ServerImage: FC<IServerImage> = memo((props) => {
    const { src, className, alt, style, altSrc } = props
    const serverSrc = src ? `${process.env.REACT_APP_API_URL}${src}` : altSrc
    const imgBroke = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        event.currentTarget.src = noPhoto
    }
    return (
        <img
            className={className}
            src={serverSrc || noPhoto}
            alt={alt}
            onError={imgBroke}
            style={{ fontSize: 0, ...style }}
        />
    )
})

export default ServerImage