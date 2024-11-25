"use client";
import React, { useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Dynamically import the icons
const LayoutIcon = dynamic(() => import('lucide-react').then((mod) => mod.LayoutIcon));
const GraduationCap = dynamic(() => import('lucide-react').then((mod) => mod.GraduationCap));
const Hand = dynamic(() => import('lucide-react').then((mod) => mod.Hand));
const Settings = dynamic(() => import('lucide-react').then((mod) => mod.Settings));

interface MenuItem {
  id: number;
  name: string;
  icon: React.ComponentType;
  path: string;
}

const SideNav: React.FC = () => {
  const pathname = usePathname(); // Moved inside the component

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  const menuList: MenuItem[] = [
    {
      id: 1,
      name: 'Dashboard',
      icon: LayoutIcon,
      path: '/dashboard',
    },
    {
      id: 2,
      name: 'Students',
      icon: GraduationCap,
      path: '/dashboard/students',
    },
    {
      id: 3,
      name: 'Attendance',
      icon: Hand,
      path: '/dashboard/attendance',
    },
    {
      id: 4,
      name: 'Settings',
      icon: Settings,
      path: '/dashboard/settings',
    },
  ];

  return (
    <div className='border w-full block shadow-md h-screen p-5'>
      <Image 
        src={'https://static.wixstatic.com/media/e869bd_7e52605e338b4673ac89078cbff483a4~mv2_d_2025_2025_s_2.png'}
        width={70}
        height={70}
        alt='logo' 
        className='mx-auto my-auto'
      />

      <hr className='my-5' />

      {menuList.map((menu) => (
        <Link key={menu.id} href={menu.path}>
          <h2 className={`flex items-center gap-3 text-md p-4 text-slate-500 cursor-pointer hover:bg-primary hover:text-white rounded-lg my-2
            ${pathname === menu.path && 'bg-primary text-white'}`}>
            <menu.icon />
            {menu.name}
          </h2>
        </Link>
      ))}

      {/* <div className='flex gap-2 items-center bottom-5 fixed p-2'>
        <Image 
          className='rounded-full'
          src={pictureSrc}
          width={35}
          height={35}
          alt='user'
        /> */}
      
        <div>
          {/* <h2 className='text-sm font-bold'>{user?.given_name} {user?.family_name}</h2>
          <h2 className='text-xs text-slate-400'>{user?.email}</h2> */}
        </div>
      </div>
  );
};

export default SideNav;