import {
    memo,
    useState,
    FormEvent,
    ChangeEvent
} from 'react'
import { useNavigate } from 'react-router-dom'
import Form from '../../../../components/Form/From'

import classes from './HeaderSearchForm.module.scss'
import { goodStore } from '../../../../store'
import { CATALOG_ROUTE } from '../../../../utils/const/routes'
const HeaderSearchForm = memo(() => {
    const [searchValue, setSearchValue] = useState<string>('');
    const navigate = useNavigate()
    const searchFormSubmit = (
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            goodStore.setName(searchValue)
            navigate(CATALOG_ROUTE);
            setSearchValue('')
        }
    )
    const searchFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    }
    return (
        <Form
            className={classes.header_searchForm}
            onFormSubmit={searchFormSubmit}
            inputProps={{
                onChange: searchFormChange,
                value: searchValue,
                type: 'text',
                title: 'Поле поиска',
                autoComplete: 'off',
                placeholder: 'Поиск по сайту'
            }}
            buttonProps={{
                buttonTitle: "Поиск"
            }}
        />
    )
})

export default HeaderSearchForm