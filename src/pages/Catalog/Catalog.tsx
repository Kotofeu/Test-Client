import {memo} from 'react'
import Container from '../../UI/Container/Container'
import { FilterAside } from '../../modules/FilterAside'
import { CatalogSection } from '../../modules/CatalogSection'

import classes from './Catalog.module.scss'
export const Catalog = memo(() => {
  return (
    <div>
        <Container>
            <div className={classes.catalog}>
                <FilterAside/>
                <CatalogSection/>
            </div>
        </Container>
    </div>
  )
})

