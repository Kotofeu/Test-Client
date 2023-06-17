import { memo } from 'react'
import { GoodSection } from '../../modules/GoodSection'
import Container from '../../UI/Container/Container'

export const Good = memo(() => {
    return (
        <div>
            <Container>
                <GoodSection />
            </Container>
        </div>
    )
})
