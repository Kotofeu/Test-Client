import { memo } from 'react'

import certificateHDL from '../../../../assets/images/certificate-hdl-buspro.jpg'
import certificateIRidi from '../../../../assets/images/certificate-iridi-pro.jpg'
import certificateKNX from '../../../../assets/images/certificate-knx.jpg'
import Title, { TitleType } from '../../../../UI/Title/Title'

import classes from './Certificate.module.scss'

export const Certificate = memo(() => {
    return (
        <section className={classes.certificate}>
            <Title
                className={classes.certificate_title}
                titleType={[TitleType.posCetner, TitleType.sectionTitle]}
            >
                Наши сертификаты
            </Title>
            <h6
                className={classes.certificate_subtitle}
            >
                Компетентность наших специалистов подтверждена различными сертификатами, в том числе и международными от ассоциации KNX.
            </h6>
            <div className={classes.certificate_list}>
                <img className={classes.certificate_image} src={certificateIRidi} alt="Сертификат IRidium" />
                <img className={classes.certificate_image} src={certificateHDL} alt="Сертификат HDL" />
                <img className={classes.certificate_image} src={certificateKNX} alt="Сертификат KNX" />
            </div>
        </section>
    )
})