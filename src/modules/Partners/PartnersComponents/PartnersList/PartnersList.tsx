import {FC} from 'react'
import classes from './PartnersList.module.scss'
import { IBrandTable } from '../../../../store/BrandStore'
import PartnersParallax from '../PartnersParallax/PartnersParallax'

interface IPartnersList {
    slicedBrand: IBrandTable[][];
    className?: string;
}
const PartnersList: FC<IPartnersList> = (props) => {
    const {slicedBrand, className = ''} = props
    return (
        <div className={[className, classes.partners_parallaxList].join(' ')}>
            {
                slicedBrand.map((brands, index) => {
                    let velocity = 2
                    if (index % 2 === 0) {
                        velocity = -2
                    }
                    else {
                        velocity = 2
                    }
                    return (
                        <PartnersParallax
                            className={classes.partners_parallax}
                            brands={brands}
                            baseVelocity={velocity}
                            key={index}
                        />
                    )
                })
            }
        </div>)
}

export default PartnersList