import {memo, FC} from 'react'
import classes from './ContactLink.module.scss'
export enum ContactLinkType {
    email = classes.contact___email,
    tel = classes.contact___tel,
    social = classes.contact___socialLink,
}
interface IContactLink {
    className?: string;
    linkType?: ContactLinkType;
    href: string;
    children?: string;
    imageSrc?: string;
}
const ContactLink: FC<IContactLink> = memo((props) => {
    const { className = '', linkType = '', href, children, imageSrc } = props
    let contactType: string = '';
    const joinClass = [className, classes.contact, linkType].join(' ');
    if (linkType === ContactLinkType.email) contactType = 'mailto:'
    if (linkType === ContactLinkType.tel) contactType = 'tel:'
    if (contactType && linkType) {
        return (
            <a
                className={joinClass}
                href={`${contactType}${href}`}
            >
                {children ?? href}
            </a>
        )
    }
    if (linkType === ContactLinkType.social) {
        return (
            <a
                className={joinClass}
                href={href}
                target="_blank"
            >
                <img
                    className={classes.contact_socialImage}
                    src={imageSrc}
                    alt={children}
                />
                <span>{children}</span>
            </a>
        )
    }
    return (
        <a className={joinClass} href={href}>{children}</a>
    )
})
export default ContactLink