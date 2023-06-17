import { memo } from 'react'
import classes from './OurOffice.module.scss'
import OurOfficeCard from '../OurOfficeCard/OurOfficeCard'
import { kaliningrad_map, peterburg_map } from '../../OurOfficeConst/mapsString'
import Title, { TitleType } from '../../../../UI/Title/Title'

import vanda from '../../../../assets/images/vanda-ofice.jpg'

const universalSchedule = "Шоурум работает с 9.00 до 18.00 \n  Суббота и воскресенье выходной."
export const OurOffice = memo(() => {
    return (
        <section className={classes.ourOffice}>
            <Title
                className={classes.ourOffice_title}
                titleType={[TitleType.posCetner, TitleType.sectionTitle]}
            >
                Ждём вас в гости
            </Title>
            <OurOfficeCard
                className={classes.ourOffice_card}
                mapSrc={kaliningrad_map}
                imageSrc={vanda}
                title="Наш офис в г. Калининград"
                schedule={universalSchedule}
                address="Г. Калининград ул. Фрунзе 6В офис 604/1"
                telNumbers={["89114524472", "84012508539"]}
                email="info@ihouse39.ru"
            />
            <OurOfficeCard
                className={classes.ourOffice_card}
                mapSrc={peterburg_map}
                title="Наш офис в г. Санкт-Петербург"
                schedule={universalSchedule}
                address="г. Санкт-Петербург, набережная канала Грибоедова, дом 126, лит.А., пом.6-Н."
                telNumbers={["+7 (911) 851-10-37"]}
                email="e.marchenko@ihouse39.ru"
            />
        </section>
    )
})

