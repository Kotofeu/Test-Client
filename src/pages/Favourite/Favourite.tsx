import {memo} from 'react'
import Container from '../../UI/Container/Container'
import { FavouriteSection } from '../../modules/FavouriteSection'

export const Favourite = memo(() => {
    return (
        <div>
            <Container>
                <FavouriteSection/>
            </Container>
        </div>
    )
})
