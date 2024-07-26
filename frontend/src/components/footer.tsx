import React from 'react';

type Props = {};

const Footer = (props: Props) => {
    return (
        <div className='h-12 w-full bg-tempColor/20 flex-center'>
            Created by{' '}
            <a className='ml-1' href='https://www.diogoka.dev' target='_blank'>
                diogoka.dev
            </a>
        </div>
    );
};

export default Footer;
