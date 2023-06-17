import { FC, ReactNode } from 'react'
import classes from './Container.module.scss'
export enum ContainerType {
  'container-fluid' = classes.container___fluid
}
interface IContainerProps {
  children: ReactNode;
  type?: ContainerType;
}
const Container: FC<IContainerProps> = (props) => {
  const { children, type = '' } = props
  return (
    <div className={
      [
        classes.container,
        type
      ].join(' ')
    }>
      {children}
    </div>
  )
}

export default Container