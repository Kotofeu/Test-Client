import { memo } from 'react'
import { RatingSection } from '../../modules/RatingSection'
import Container from '../../UI/Container/Container'

export const Rating = memo(() => {
    return (
        <div>
            <Container>
                <RatingSection />

            </Container>
        </div>
    )
})
