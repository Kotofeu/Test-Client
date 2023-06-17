import { memo, FC } from 'react'

import classes from './OurOfficeCard.module.scss'
import Title from '../../../../UI/Title/Title';
import Map from '../../../../UI/Map/Map';
import ContactLink, { ContactLinkType } from '../../../../UI/ContactLink/ContactLink';
interface IOurOfficeCard {
    className?: string;
    mapSrc: string;
    imageSrc?: string;
    title: string;
    schedule: string;
    address: string;
    telNumbers: string[];
    email?: string;
}

const OurOfficeCard: FC<IOurOfficeCard> = memo((props) => {
    const {
        className = '',
        mapSrc,
        imageSrc,
        title,
        schedule,
        address,
        telNumbers,
        email
    } = props
    return (
        <div className={
            [
                classes.officeCard_card,
                className
            ].join(' ')}
        >
            <address className={
                [
                    classes.officeCard_desc,
                    !imageSrc ? classes.officeCard_desc___inline : ''
                ].join(' ')}
            >
                <div className={classes.officeCard_descContainer}>
                    <Title className={classes.officeCard_title}>
                        {title}
                    </Title>
                    <p className={classes.officeCard_schedule}>
                        {
                            schedule.split('\n').map(item => (
                                <span key={item}>{item}</span>
                            ))
                        }
                    </p>
                    <div className={classes.officeCard_address}>
                        {address}
                    </div>
                    <div className={classes.officeCard_contact}>
                        <div className={classes.officeCard_telNumbers}>
                            {
                                telNumbers.map(number => (
                                    <ContactLink href={number} linkType={ContactLinkType.tel} key={number} />
                                ))
                            }
                        </div>
                        {
                            email
                                ? <ContactLink href={email} linkType={ContactLinkType.email} />
                                : null
                        }
                    </div>
                </div>
                <div className={classes.officeCard_descContainer}>
                    <Map
                        className={classes.officeCard_map}
                        src={mapSrc}
                        width='100%'
                        height='350px'
                        name = {title}
                    />

                </div>

            </address>
            {
                imageSrc
                    ? <div className={classes.officeCard_imageBox}>
                        <img className={classes.officeCard_image} src={imageSrc}  alt={title}/>
                    </div>
                    : null
            }

        </div >
    )
})

export default OurOfficeCard