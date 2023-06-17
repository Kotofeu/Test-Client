import { useEffect, memo} from 'react'

import Title from '../../../../UI/Title/Title'


import classes from './PartnersSection.module.scss'
import { IGetAllJSON, brandStore } from '../../../../store'
import { IBrandTable } from '../../../../store/BrandStore'
import { fetchBrand } from '../../../../http/BrandAPI'
import useRequest from '../../../../utils/hooks/useRequest'
import { SliceTableArray } from '../../PartnersHelpers/SliceTableArray'
import PartnersList from '../PartnersList/PartnersList'

export const PartnersSection = memo(() => {
    const
        [
            partners,
            partnersIsLoading,
            partnersError
        ] = useRequest<IGetAllJSON<IBrandTable>>(fetchBrand);

    useEffect(() => {
        if (partners?.rows && !brandStore.brands?.rows) {
            brandStore.setBrands(partners)
        }
    }, [partners])


    if (! partners?.rows) {
        return null
    }
    const slicedBrand = SliceTableArray<IBrandTable>(partners, 3)

    return (
        <section className={classes.partners}>
            <div className={classes.partners_inner}>
                <Title
                    className={classes.partners_title}
                >
                    Наши партнёры
                </Title>
                <PartnersList slicedBrand={slicedBrand} className = {classes.partners_list}/>
            </div>
        </section>

    )
})
/*

*/