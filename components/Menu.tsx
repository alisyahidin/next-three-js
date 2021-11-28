import { useRouter } from 'next/router'
import Link from 'next/link'

const menus = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Download Zip',
    path: '/download-zip',
  },
  {
    title: 'Material',
    path: '/material',
  },
  {
    title: 'SceneGraph',
    path: '/scenegraph',
  },
  {
    title: 'Shoe',
    path: '/shoe',
  },
  {
    title: 'Texture',
    path: '/texture',
  },
  {
    title: 'React Spring',
    path: '/react-spring',
  },
  {
    title: 'Canon',
    path: '/cannon',
  },
  {
    title: 'Rubik',
    path: '/rubik',
  },
  {
    title: 'Points',
    path: '/points',
  },
]

const Menu = () => {
  const { pathname } = useRouter()
  return (
    <ul className="menu">
      {menus.map(menu => (<li key={menu.path}><Link href={menu.path}><a style={{ textDecoration: pathname === menu.path ? 'underline' : 'none' }}>{menu.title}</a></Link></li>))}
    </ul>
  )
}

export default Menu
