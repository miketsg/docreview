import {
    Files,
    PenLine,
    LucideIcon
} from 'lucide-react'

type MenuItemType = {
    title: string
    url: string
    icon?: LucideIcon

}
type MenuType = MenuItemType[]

export const mainMenu: MenuType = [
    {
        title: 'Review',
        url: '/',
        icon: Files
    },
    {
        title: 'Sign',
        url: '/sign',
        icon: PenLine,
    },
]
