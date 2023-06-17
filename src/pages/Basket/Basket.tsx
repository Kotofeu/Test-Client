import { memo } from 'react'
import Container from '../../UI/Container/Container'
import { BasketSection } from '../../modules/BasketSection'

export const Basket = memo(() => {

    return (
        <div>
            <Container>
                <BasketSection/>
            </Container>
        </div>
    )
})
