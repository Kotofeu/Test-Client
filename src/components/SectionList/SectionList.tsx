import { ReactNode } from 'react'


import Title, { TitleType } from '../../UI/Title/Title';
import Loader from '../../UI/Loader/Loader';


import classes from './SectionList.module.scss'

interface ISectionList<T> {
    className?: string;
    listClassName?: string;
    title?: string;
    error: any;
    emptySubtitle: string;
    isLoading: boolean;
    items: T[];
    renderItem: (item: T, index: number) => ReactNode;
    footer?: ReactNode;
    header?: ReactNode;
}
export default function SectionList<T>(props: ISectionList<T>) {
    const {
        className,
        listClassName = '',
        title,
        error,
        emptySubtitle,
        isLoading,
        items,
        renderItem,
        footer,
        header
    } = props
    const sectionClassName = [className, classes.sectionList].join(' ')
    return (
        <section className={sectionClassName}>
            {
                title ? <Title
                    className={classes.sectionList_title}
                    titleType={[TitleType.posCetner, TitleType.sectionTitle]}>
                    {
                        error
                            ? error.message ? error.message : "Нередвиденная ошибка"
                            : title
                    }
                </Title> : null

            }

            {
                isLoading && !items?.length ? <Loader /> : null
            }
            {
                header ?? null
            }
            {
                items.length ?
                    <div className={listClassName}>
                        {items.map(renderItem)}
                    </div>
                    : !isLoading && <Title titleType={[TitleType.posCetner]}>{emptySubtitle}</Title>
            }
            {
                footer ?? null
            }
        </section>
    )
}