import Container from '../../../../UI/Container/Container'

import FooterTitle, { FooterTitleType } from '../FooterTitle/FooterTitle'
import FooterSubscribe from '../FooterSubscribe/FooterSubscribe'

import { socialLinks } from '../../FooterConsts/socialLinks'

import classes from './Footer.module.scss'
import ContactLink, { ContactLinkType } from '../../../../UI/ContactLink/ContactLink'

export const Footer = () => {

    return (
        <footer className={classes.footer}>
            <Container>
                <div className={classes.footer_inner}>
                    <address className={classes.footer_contact}>
                        <FooterTitle titleType={FooterTitleType.h4}>Наши контакты</FooterTitle>
                        <div className={classes.footer_mailBox}>
                            <ContactLink
                                className={classes.footer_contactLink}
                                href='e.marchenko@ihouse39.ru'
                                linkType={ContactLinkType.email}
                            />
                        </div>
                        <div className={classes.footer_city}>
                            <FooterTitle>Калининград</FooterTitle>
                            <p className={classes.footer_place}>Ул. Фрунзе 6В, офис 604/1</p>
                            <ContactLink
                                className={classes.footer_contactLink}
                                href='89114524472'
                                linkType={ContactLinkType.tel}
                            />
                            <ContactLink
                                className={classes.footer_contactLink}
                                href='84012508539'
                                linkType={ContactLinkType.tel}
                            />
                        </div>
                    </address>
                    <div className={classes.footer_city}>
                            <FooterTitle>Санкт-Петербург</FooterTitle>
                            <p className={classes.footer_place}>Набережная канала Грибоедова, дом 126, лит.А., пом.6-Н.</p>
                            <ContactLink
                                className={classes.footer_contactLink}
                                href='89118511037'
                                linkType={ContactLinkType.tel}
                            />
                        </div>
                    <div className={classes.footer_social}>
                        <FooterTitle titleType={FooterTitleType.h4}>Наши новости</FooterTitle>
                        <div className={classes.footer_socialLinksList}>
                            {socialLinks.map(socialLink => (
                                <ContactLink
                                    className={classes.footer_contactLink}
                                    href={socialLink.href}
                                    linkType={ContactLinkType.social}
                                    imageSrc={socialLink.imageSrc}
                                    key={socialLink.link}
                                >
                                    {socialLink.link}
                                </ContactLink>
                            ))}
                        </div>
                    </div>

                </div>
            </Container>
            <div className={classes.footer_copyrighting}>
                © 2021-2023    Компания iHouse
            </div>
        </footer>
    )
}
/**                    <FooterSubscribe
                        className={classes.footer_subscribe}
                        title='Написать сообщение'
                    /> */