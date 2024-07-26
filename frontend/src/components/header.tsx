import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
    return (
        <div className='flex py-4 px-7 bg-tempColor/20 justify-between sticky'>
            <div className='flex justify-center items-center'>
                <a className='text-xl text-center'>Drinking Fountain Locator</a>
            </div>
            <div className='flex justify-center items-center'>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        {' '}
                        <Avatar>
                            <AvatarImage src='https://github.com/shadcn.png' />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default Header;
