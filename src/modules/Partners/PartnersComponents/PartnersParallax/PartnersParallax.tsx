import { FC, memo } from 'react'
import ScrollParallax from '../../../../components/ScrollParallax/ScrollParallax'
import classes from './PartnersParallax.module.scss'
import { IBrandTable } from '../../../../store/BrandStore'
import ServerImage from '../../../../UI/ServerImage/ServerImage'
interface IPartnersParallaxProps {
    brands: IBrandTable[];
    className: string;
    baseVelocity: number;
}
const PartnersParallax: FC<IPartnersParallaxProps> = memo(({ brands, className, baseVelocity = 3 }) => {
    if (brands.length === 0) {
        return null
    }
    /*
        1920 - ширина Container fluid
        2 - так как в ScrollParallax используется 4 спана,
         для бесшовной склейки необходимо растянуть спан до половины максимального размера экрана
    */
    const imageWidth = 100 / brands.length
    return (
        <ScrollParallax baseVelocity={baseVelocity} className={className}>
            <div className={classes.parallax_inner}>
                {brands.map(brand => (
                    <ServerImage
                        className={classes.partnerImage}
                        style={{ width: `${imageWidth}%` }}
                        src={brand.image}
                        key={brand.name}
                        alt={brand.name}
                    />
                ))}
            </div>
        </ScrollParallax>

    )
})
export default PartnersParallax